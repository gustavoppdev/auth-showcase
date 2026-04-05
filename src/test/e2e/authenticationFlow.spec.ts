import { test, expect } from "@playwright/test";
import messages from "@/../messages/en.json";

test.describe("End-to-End: Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/en");
  });

  test("should successfully log in and redirect to the dashboard", async ({
    page,
  }) => {
    const emailInput = page.getByRole("textbox", {
      name: messages.AuthForm.email,
      exact: true,
    });
    await emailInput.waitFor({ state: "visible" });

    await emailInput.click();

    await emailInput.fill("tester@showcase.com");

    await page
      .getByRole("textbox", { name: messages.AuthForm.password, exact: true })
      .fill("SenhaForte123!");

    await page
      .getByRole("textbox", {
        name: messages.AuthForm.confirmPassword,
        exact: true,
      })
      .fill("SenhaForte123!");

    await page
      .getByRole("button", { name: messages.AuthForm.signUpBtn })
      .click();

    await expect(page).toHaveURL(/.*\/dashboard/);

    await expect(page.getByText("Testing Showcase")).toBeVisible();
  });

  test("should prevent access to dashboard without authentication", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/en/dashboard");

    const currentUrl = page.url();
    expect(currentUrl.endsWith("/en") || currentUrl.endsWith("/")).toBeTruthy();
    await expect(
      page.getByRole("button", { name: messages.AuthForm.signUpBtn }),
    ).toBeVisible();
  });

  test("should display Zod validation errors on invalid submit", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign Up" }).click();

    await expect(page).not.toHaveURL(/.*\/dashboard/);

    await expect(
      page.getByText(messages.AuthForm.Errors.minEmailError),
    ).toBeVisible();
    await expect(
      page.getByText(messages.AuthForm.Errors.minPasswordError),
    ).toBeVisible();
  });

  test("should toggle between Sign Up and Sign In modes via URL", async ({
    page,
  }) => {
    await expect(
      page.getByRole("textbox", {
        name: messages.AuthForm.confirmPassword,
        exact: true,
      }),
    ).toBeVisible();

    await page.getByRole("link", { name: messages.AuthForm.signInBtn }).click();

    await expect(page).toHaveURL(/.*type=sign-in/);

    await expect(
      page.getByRole("textbox", {
        name: messages.AuthForm.confirmPassword,
        exact: true,
      }),
    ).not.toBeVisible();
  });
});
