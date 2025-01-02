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
      localStorage.setItem("expired_at", "2024-02-02T10:30:00.000Z");
    });
  });

  test.afterEach(async ({ page }) => {
    // Cleanup localStorage after test
    await page.evaluate(() => localStorage.clear());
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
    await page.route("**/*/v1/users/**", async (route) => {
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

    // 1. wait for author visible
    await page.waitForSelector("#author-name");
    const authorNames = page.locator("#author-name");
    expect(await authorNames.count()).toBe(mockPosts.data.length);
  });
});
