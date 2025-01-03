import test, { expect } from "@playwright/test";

test.describe("Home Page not Authorized", () => {
  test("should redirect to login page when not authenticated", async ({
    page,
  }) => {
    // 1. Go to home page
    await page.goto("/");

    // 2. Redirect to login page
    await page.waitForURL("/login");
    expect(page.url()).toBe("http://localhost:3000/login");
  });

  test("should redirect to login page when token expired", async ({ page }) => {
    // Mock time for checking expiredAt
    await page.clock.setFixedTime(new Date("2024-02-02T10:30:00.000Z"));

    // Set localStorage before each test
    await page.addInitScript(() => {
      localStorage.setItem("token", "mock-token");
      localStorage.setItem("expired_at", "2024-02-02T10:00:00.000Z");
    });

    // 1. Go to home page
    await page.goto("/");

    // 2. Redirect to login page
    await page.waitForURL("/login");
    expect(page.url()).toBe("http://localhost:3000/login");
  });
});

const mockPosts = {
  meta: {
    pagination: {
      total: 2900,
      pages: 290,
      page: 1,
      limit: 2,
      links: {
        previous: null,
        current: "**/*/v1/posts?page=1",
        next: "**/*/v1/posts?page=2",
      },
    },
  },
  data: [
    {
      id: 184751,
      user_id: 7614609,
      title: "sdadasda",
      body: "sadasdas",
    },
    {
      id: 184741,
      user_id: 7614444,
      title:
        "Ust elit laboris commodo nostrud enim est aliquip laboris fugiat excepteur",
      body: "Vseniam elit mollit ex aliquip exercitation commodo aliqua ipsum eu amet et. Sunt exercitation cillum id aute reprehenderit ut deserunt laboris. Eu magna qui esse eu esse anim nisi magna anim. Amet aliqua reprehenderit consequat pariatur sit exercitation aliqua tempor commodo ut sint ea aliquip. \n\nMagna ad Lorem ad minim et. Ut elit laboris commodo nostrud enim est aliquip laboris fugiat excepteur. Velit fugiat voluptate est exercitation officia duis id deserunt ut esse incididunt aute.",
    },
  ],
};

const mockUsers = {
  data: {
    id: 7614609,
    name: "Rizki 5",
    email: "Rizki.5@email.com",
    gender: "male",
    status: "active",
  },
  meta: null,
};

test.describe("Home Page Authorized", () => {
  test.beforeEach(async ({ page }) => {
    // Mock time for checking expiredAt
    await page.clock.setFixedTime(new Date("2024-02-02T10:00:00.000Z"));

    // Set localStorage before each test
    await page.addInitScript(() => {
      localStorage.setItem("token", "mock-token");
      localStorage.setItem(
        "profile",
        JSON.stringify({
          id: 7614609,
          name: "Rizki 5",
          email: "Rizki.5@email.com",
          gender: "male",
          status: "active",
        }),
      );
      localStorage.setItem("expired_at", "2024-02-02T10:30:00.000Z");
    });
  });

  test.afterEach(async ({ page }) => {
    // Cleanup localStorage after test
    await page.evaluate(() => localStorage.clear());
  });

  test("should show empty state when posts is empty", async ({ page }) => {
    // Mock api get posts
    await page.route("**/*/v1/posts**", async (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: [],
          meta: {
            pagination: {
              total: 0,
              pages: 0,
              page: 1,
              limit: 10,
              links: {
                previous: null,
                current: null,
                next: null,
              },
            },
          },
        }),
      });
    });

    // Go to home page
    await page.goto("/");

    // 1. wait for list posts visible
    await page.waitForSelector("#posts-empty");
    page.locator("#posts-empty");
  });

  test("should get posts data correctly", async ({ page }) => {
    // Mock api get posts
    await page.route("**/*/v1/posts**", async (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockPosts),
      });
    });

    // Mock api get users
    await page.route("**/*/v1/users/*", async (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockUsers),
      });
    });

    // Go to home page
    await page.goto("/");

    // 1. wait for list posts visible
    await page.waitForSelector("#title-article");
    const titleArticles = page.locator("#title-article");
    expect(await titleArticles.count()).toBe(mockPosts.data.length);

    // 1. wait for author visible
    await page.waitForSelector("#author-name");
    const authorNames = page.locator("#author-name");
    expect(await authorNames.count()).toBe(mockPosts.data.length);
  });

  test("should get own posts data correctly", async ({ page }) => {
    // Mock api get posts
    await page.route("**/*/v1/users/*/posts**", async (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockPosts),
      });
    });

    // Mock api get users
    await page.route("**/*/v1/users/*", async (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockUsers),
      });
    });

    // Go to home page
    await page.goto("/?filter=me");

    // 1. wait for list posts visible
    await page.waitForSelector("#title-article");
    const titleArticles = page.locator("#title-article");
    expect(await titleArticles.count()).toBe(mockPosts.data.length);

    // 2. wait for author visible
    await page.waitForSelector("#author-name");
    const authorNames = page.locator("#author-name");
    expect(await authorNames.count()).toBe(mockPosts.data.length);

    // 3. wait post update button visible
    const updateBtn = page.locator("#btn-update");
    expect(await updateBtn.count()).toBe(mockPosts.data.length);

    // 4. wait post delete button visible
    const deleteBtn = page.locator("#btn-delete");
    expect(await deleteBtn.count()).toBe(mockPosts.data.length);
  });

  test.describe("Create New Posts journey", () => {
    test("should change page to New Post page", async ({ page }) => {
      // Mock api get posts
      await page.route("**/*/v1/posts*", async (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockPosts),
        });
      });

      // Mock api get users
      await page.route("**/*/v1/users/*", async (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockUsers),
        });
      });

      // Go to home page
      await page.goto("/");

      // 1. Click link button to new posts page
      await page.getByLabel("new-btn").click();

      // 2. Check if changed to new posts page
      await page.waitForURL("/posts/new");
      expect(page.url()).toBe("http://localhost:3000/posts/new");
    });

    test("should create new post successfully", async ({ page }) => {
      // Mock api create posts
      await page.route("**/*/v1/posts", async (route) => {
        route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({
            meta: null,
            data: {
              id: 184917,
              user_id: 7614609,
              title: "mock-title",
              body: "mock-body",
            },
          }),
        });
      });

      // Go to new post page
      await page.goto("/posts/new");

      // 2. Fill title and article body
      await page.fill("#post_title", "mock-title");
      await page.fill("#post_body", "mock-body");
      await page.click("button[type='submit']");

      // 3. Redirect to detail post page
      await page.waitForURL("/posts/184917");
      expect(page.url()).toBe("http://localhost:3000/posts/184917");
    });
  });

  test.describe("Update Post journey", () => {
    test("should change page to Update Post page", async ({ page }) => {
      // Mock api get posts
      await page.route("**/*/v1/posts/*", async (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            meta: null,
            data: {
              id: 184917,
              user_id: 7614609,
              title: "mock-title",
              body: "mock-body",
            },
          }),
        });
      });

      // Mock api get users
      await page.route("**/*/v1/users/*", async (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockUsers),
        });
      });

      // Go to home page
      await page.goto("/posts/184917");

      // 1. Click link button to new posts page
      await page.locator("#btn-update").click();

      // 2. Check if changed to new posts page
      await page.waitForURL("/posts/update/184917");
      expect(page.url()).toBe("http://localhost:3000/posts/update/184917");
    });

    test("should update post successfully", async ({ page }) => {
      // Mock api get posts
      await page.route("**/*/v1/posts/*", async (route, request) => {
        if (request.method() === "GET") {
          route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              meta: null,
              data: {
                id: 184917,
                user_id: 7614609,
                title: "mock-title",
                body: "mock-body",
              },
            }),
          });
        } else if (request.method() === "PATCH") {
          route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              meta: null,
              data: {
                id: 184917,
                user_id: 7614609,
                title: "mock-title-updated",
                body: "mock-body-updated",
              },
            }),
          });
        }
      });

      // Go to new post page
      await page.goto("/posts/update/184917");

      // 2. Fill title and article body
      await page.fill("#post_title", "mock-title-updated");
      await page.fill("#post_body", "mock-body-updated");
      await page.click("button[type='submit']");

      // Mock api get posts
      await page.route("**/*/v1/posts/*", async (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            meta: null,
            data: {
              id: 184917,
              user_id: 7614609,
              title: "mock-title-updated",
              body: "mock-body-updated",
            },
          }),
        });
      });

      // Mock api get users
      await page.route("**/*/v1/users/*", async (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockUsers),
        });
      });

      // 3. Redirect to detail post page
      await page.waitForURL("/posts/184917");
      expect(page.url()).toBe("http://localhost:3000/posts/184917");
    });
  });

  test.describe("Delete Posts journey", () => {
    test("should create new post successfully", async ({ page }) => {
      // Mock api get posts
      await page.route("**/*/v1/posts/*", async (route, request) => {
        if (request.method() === "GET") {
          route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              meta: null,
              data: {
                id: 184917,
                user_id: 7614609,
                title: "mock-title",
                body: "mock-body",
              },
            }),
          });
        } else if (request.method() === "DELETE") {
          route.fulfill({
            status: 204,
          });
        }
      });

      // Mock api get users
      await page.route("**/*/v1/users/*", async (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockUsers),
        });
      });

      // Go to home page
      await page.goto("/posts/184917");

      // 1. Click link button to open delete modal
      await page.locator("#btn-delete").click();

      // 2. Wait delete modal open and click delete modal confirmation
      (await page.waitForSelector("#btn-delete-confirmation")).click();

      // 4. Check if changed to home page
      await page.waitForURL("/");
      expect(page.url()).toBe("http://localhost:3000/");
    });
  });
});
