import test, { expect } from "@playwright/test";

import type { Response } from "@/services/base";
import type { User } from "@/services/user";

test.describe("Login Page", () => {
  test("should login successfully", async ({ page }) => {
    // Mock time for checking expiredAt
    await page.clock.setFixedTime(new Date("2024-02-02T10:00:00.000Z"));

    // Mock api call create user
    const mockLoginResponse: Response<User> = {
      data: {
        email: "test@email.com",
        gender: "male",
        id: 1,
        name: "test",
        status: "active",
      },
      meta: null,
    };

    await page.route("**/*/v1/users", async (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockLoginResponse),
      });
    });

    // 1. Go to login page
    await page.goto("/login");

    // 2. Fill name and token
    await page.fill("#login_name", "test");
    await page.fill("#login_token", "mock-token");
    await page.click("button[type='submit']");

    // 3. Redirect to home page
    await page.waitForURL("/");
    expect(page.url()).toBe("http://localhost:3000/");

    // 4. Check login data is set on localStorage
    const expiredAt = await page.evaluate(() =>
      localStorage.getItem("expired_at"),
    );
    const profile = await page.evaluate(() => localStorage.getItem("profile"));
    const token = await page.evaluate(() => localStorage.getItem("token"));

    expect(expiredAt).toBe("2024-02-02T10:30:00.000Z");
    expect(profile).toBe(JSON.stringify(mockLoginResponse.data));
    expect(token).toBe("mock-token");

    // 5. cleanup localStorage
    await page.evaluate(() => localStorage.clear());
  });

  test("should show error on empty field", async ({ page }) => {
    await page.goto("/login");

    // 1. Click submit without filled inputs
    await page.click("button[type='submit']");

    // 2. check error helper on inputs
    const nameHelp = page.locator("#login_name_help");
    const tokenHelp = page.locator("#login_token_help");
    await expect(nameHelp).toContainText("Please enter name");
    await expect(tokenHelp).toContainText("Please enter token");
  });

  test("should show error helper when token is invalid", async ({ page }) => {
    // Mock api call create user
    const mockLoginResponse: Response = {
      meta: null,
      data: {
        message: "Invalid token",
      },
    };

    await page.route("**/*/v1/users", async (route) => {
      route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify(mockLoginResponse),
      });
    });

    // 1. Go to login page
    await page.goto("/login");

    // 2. Fill name and token
    await page.fill("#login_name", "test");
    await page.fill("#login_token", "mock-token");
    await page.click("button[type='submit']");

    // 3. Check error helper token
    const tokenHelp = page.locator("#login_token_help");
    await expect(tokenHelp).toContainText("Token is invalid");
  });

  test("should show error helper when name already taken", async ({ page }) => {
    // Mock api call create user
    const mockLoginResponse: Response = {
      meta: null,
      data: [
        {
          field: "email",
          message: "has already been taken",
        },
      ],
    };

    await page.route("**/*/v1/users", async (route) => {
      route.fulfill({
        status: 422,
        contentType: "application/json",
        body: JSON.stringify(mockLoginResponse),
      });
    });

    // 1. Go to login page
    await page.goto("/login");

    // 2. Fill name and token
    await page.fill("#login_name", "test");
    await page.fill("#login_token", "mock-token");
    await page.click("button[type='submit']");

    // 3. Check error helper name
    const nameHelp = page.locator("#login_name_help");
    await expect(nameHelp).toContainText("Name has already been taken");
  });

  test("should redirect to homepage if has token and not expired in localStorage", async ({
    page,
  }) => {
    // Mock time for checking expiredAt
    await page.clock.setFixedTime(new Date("2024-02-02T10:00:00.000Z"));

    // Mock localStorage data
    await page.addInitScript(() => {
      localStorage.setItem("token", "mock-token");
      localStorage.setItem("expired_at", "2024-02-02T10:30:00.000Z");
    });

    // 1. Go to login page
    await page.goto("/login");

    // 2. Redirect to home page
    await page.waitForURL("/");
    expect(page.url()).toBe("http://localhost:3000/");

    await page.evaluate(() => localStorage.clear());
  });
});
