import {
  LocalesArrayType,
  OverviewStatType,
  TabDashboard,
  TestType,
} from "@/types";
import { Activity, CheckCircle2, LayoutTemplate } from "lucide-react";

export const LocalesArray: LocalesArrayType[] = [
  {
    key: "pt",
    labelKey: "portuguese",
  },
  {
    key: "en",
    labelKey: "english",
  },
];

export const IntegrationTests: TestType[] = [
  {
    title: "integration.tests.formSuite.title",
    description: "integration.tests.formSuite.description",
    archive: "AuthForm.test.tsx",
    tests: [
      {
        title: "integration.tests.formSuite.test1.title",
        description: "integration.tests.formSuite.test1.description",
        code: `it("should render email and password inputs", () => {
      renderWithIntl(<AuthForm />);

      expect(
        screen.getByLabelText(messages.AuthForm.email),
      ).toBeInTheDocument();

      expect(
        screen.getByLabelText(messages.AuthForm.password),
      ).toBeInTheDocument();
    });`,
      },
      {
        title: "integration.tests.formSuite.test2.title",
        description: "integration.tests.formSuite.test2.description",
        code: `it("should not render the confirm password input", () => {
      renderWithIntl(<AuthForm />);

      const inputConfirmPassword = screen.queryByLabelText(
        messages.AuthForm.confirmPassword,
      );

      expect(inputConfirmPassword).not.toBeInTheDocument();
    });`,
      },
      {
        title: "integration.tests.formSuite.test3.title",
        description: "integration.tests.formSuite.test3.description",
        code: ` it("should render the 'forgot password' button", () => {
      renderWithIntl(<AuthForm />);

      const forgotPasswordButton = screen.getByRole("button", {
        name: messages.AuthForm.forgotPassword,
      });

      expect(forgotPasswordButton).toBeInTheDocument();
    });`,
      },
    ],
  },
  {
    title: "integration.tests.signUpSuite.title",
    description: "integration.tests.signUpSuite.description",
    archive: "AuthForm.test.tsx",
    tests: [
      {
        title: "integration.tests.signUpSuite.test1.title",
        description: "integration.tests.signUpSuite.test1.description",
        code: `it("should render the confirm password input when in sign-up mode", () => {
      // Altera o estado para simular tela de cadastro
      searchParamsValue = "sign-up";
      renderWithIntl(<AuthForm />);

      const inputConfirmPassword = screen.getByLabelText(
        messages.AuthForm.confirmPassword,
      );
      expect(inputConfirmPassword).toBeInTheDocument();
    });`,
      },
      {
        title: "integration.tests.signUpSuite.test2.title",
        description: "integration.tests.signUpSuite.test2.description",
        code: `it("should not render the 'forgot password' button when in sign-up mode", () => {
      searchParamsValue = "sign-up";
      renderWithIntl(<AuthForm />);

      const forgotPasswordButton = screen.queryByRole("button", {
        name: messages.AuthForm.forgotPassword,
      });

      expect(forgotPasswordButton).not.toBeInTheDocument();
    });`,
      },
    ],
  },
  {
    title: "integration.tests.uiInteractiveSuite.title",
    description: "integration.tests.uiInteractiveSuite.description",
    archive: "AuthForm.test.tsx",
    tests: [
      {
        title: "integration.tests.uiInteractiveSuite.test1.title",
        description: "integration.tests.uiInteractiveSuite.test1.description",
        code: `it("should toggle password visibility from 'password' to 'text' when clicking the eye icon", () => {
      searchParamsValue = "sign-in";

      renderWithIntl(<AuthForm />);

      const inputPassword = screen.getByLabelText(messages.AuthForm.password);
      expect(inputPassword.getAttribute("type")).toBe("password");

      const eyeIcon = screen.getByRole("button", {
        name: messages.AuthForm.showPassword,
      });

      // Simula a interação do usuário para mostrar a senha
      fireEvent.click(eyeIcon);

      expect(inputPassword.getAttribute("type")).toBe("text");
    });`,
      },
      {
        title: "integration.tests.uiInteractiveSuite.test2.title",
        description: "integration.tests.uiInteractiveSuite.test2.description",
        code: `it("should call the navigation function (push) when clicking 'create an account'", () => {
      searchParamsValue = "sign-in";

      // Criamos um mock para monitorar a navegação
      const pushMock = vi.fn();

      vi.mocked(i18nNavigation.useRouter).mockReturnValue({
        push: pushMock,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      renderWithIntl(<AuthForm />);

      const ctaLink = screen.getByRole("link", {
        name: "Sign up",
      });

      fireEvent.click(ctaLink);

      // Verifica se o roteador foi instruído a mudar para a URL de cadastro
      expect(pushMock).toHaveBeenCalledWith("/?type=sign-up");
    });`,
      },
    ],
  },
  {
    title: "integration.tests.zodSubmissionSuite.title",
    description: "integration.tests.zodSubmissionSuite.description",
    archive: "AuthForm.test.tsx",
    tests: [
      {
        title: "integration.tests.zodSubmissionSuite.test1.title",
        description: "integration.tests.zodSubmissionSuite.test1.description",
        code: `it("should display Zod error messages when fields are invalid", async () => {
      searchParamsValue = "sign-in";
      renderWithIntl(<AuthForm />);

      const emailInput = screen.getByLabelText(messages.AuthForm.email);
      const passwordInput = screen.getByLabelText(messages.AuthForm.password);

      // Limpa os campos para forçar erro de validação 'required' ou 'min'
      fireEvent.change(emailInput, { target: { value: "" } });
      fireEvent.change(passwordInput, { target: { value: "" } });

      const submitButton = screen.getByRole("button", {
        name: messages.AuthForm.signInBtn,
      });

      fireEvent.click(submitButton);

      // Aguarda as mensagens assíncronas de erro aparecerem na tela
      expect(
        await screen.findByText(messages.AuthForm.Errors.minEmailError),
      ).toBeInTheDocument();
      expect(
        await screen.findByText(messages.AuthForm.Errors.minPasswordError),
      ).toBeInTheDocument();
    });`,
      },
      {
        title: "integration.tests.zodSubmissionSuite.test2.title",
        description: "integration.tests.zodSubmissionSuite.test2.description",
        code: `it("should call the onSubmit function when the form is valid", async () => {
      searchParamsValue = "sign-in";

      const pushMock = vi.fn();
      vi.mocked(i18nNavigation.useRouter).mockReturnValue({
        push: pushMock,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      renderWithIntl(<AuthForm />);

      const emailInput = screen.getByLabelText(messages.AuthForm.email);
      const passwordInput = screen.getByLabelText(messages.AuthForm.password);

      fireEvent.change(emailInput, { target: { value: "teste@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "SenhaSegura123!" } });

      const submitButton = screen.getByRole("button", {
        name: messages.AuthForm.signInBtn,
      });

      fireEvent.click(submitButton);

      await waitFor(
        () => {
          expect(pushMock).toHaveBeenCalledWith("/dashboard");
        },
        { timeout: 2000 },
      );
    });`,
      },
    ],
  },
];

export const UnitTests: TestType[] = [
  {
    title: "unit.tests.emailSchemaSuite.title",
    description: "unit.tests.emailSchemaSuite.description",
    archive: "schemas.test.ts",
    tests: [
      {
        title: "unit.tests.emailSchemaSuite.test1.title",
        description: "unit.tests.emailSchemaSuite.test1.description",
        code: `it("should approve a valid email", () => {
      const result = emailSchema.safeParse("email@gmail.com");
      expect(result.success).toBe(true);
    });`,
      },
      {
        title: "unit.tests.emailSchemaSuite.test2.title",
        description: "unit.tests.emailSchemaSuite.test2.description",
        code: `it("should reject an invalid email and return 'invalidEmailError'.", () => {
      const result = emailSchema.safeParse("email.com");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error?.issues[0].message).toBe("invalidEmailError");
      }
    });`,
      },
      {
        title: "unit.tests.emailSchemaSuite.test3.title",
        description: "unit.tests.emailSchemaSuite.test3.description",
        code: `it("should reject an empty email and return 'minEmailError'.", () => {
      const result = emailSchema.safeParse("");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error?.issues[0].message).toBe("minEmailError");
      }
    });`,
      },
      {
        title: "unit.tests.emailSchemaSuite.test4.title",
        description: "unit.tests.emailSchemaSuite.test4.description",
        code: `it("should remove empty spaces at the beginning and end of the email (trim)", () => {
      const result = emailSchema.safeParse("  email@gmail.com  ");

      expect(result.data).toBe("email@gmail.com");
      expect(result.success).toBe(true);
    });`,
      },
    ],
  },
  {
    title: "unit.tests.passwordSchemaSuite.title",
    description: "unit.tests.passwordSchemaSuite.description",
    archive: "schemas.test.ts",
    tests: [
      {
        title: "unit.tests.passwordSchemaSuite.test1.title",
        description: "unit.tests.passwordSchemaSuite.test1.description",
        code: `it("should approve a valid password", () => {
      const result = passwordSchema.safeParse("Senha123!");
      expect(result.success).toBe(true);
    });`,
      },
      {
        title: "unit.tests.passwordSchemaSuite.test2.title",
        description: "unit.tests.passwordSchemaSuite.test2.description",
        code: `it("should reject a password and return 'minPasswordError' if it has less than 6 characters", () => {
      const result = passwordSchema.safeParse("123");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error?.issues[0].message).toBe("minPasswordError");
      }
    });`,
      },
      {
        title: "unit.tests.passwordSchemaSuite.test3.title",
        description: "unit.tests.passwordSchemaSuite.test3.description",
        code: `it("should reject a password and return 'maxPasswordError' if it has more than 20 characters", () => {
      const result = passwordSchema.safeParse("123456789012345678901");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("maxPasswordError");
      }
    });`,
      },
      {
        title: "unit.tests.passwordSchemaSuite.test4.title",
        description: "unit.tests.passwordSchemaSuite.test4.description",
        code: `it("should reject a password and return 'mustContainUppercase' if it doesn't have an uppercase letter", () => {
      const result = passwordSchema.safeParse("senha123!");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("mustContainUppercase");
      }
    });`,
      },
      {
        title: "unit.tests.passwordSchemaSuite.test5.title",
        description: "unit.tests.passwordSchemaSuite.test5.description",
        code: `it("should reject a password and return 'mustContainLowercase' if it doesn't have a lowercase letter", () => {
      const result = passwordSchema.safeParse("SENHA123!");

      expect(result.success).toBe(false);      
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("mustContainLowercase");
      }
    });`,
      },
      {
        title: "unit.tests.passwordSchemaSuite.test6.title",
        description: "unit.tests.passwordSchemaSuite.test6.description",
        code: `it("should reject a password and return 'mustContainNumber' if it doesn't have a number", () => {
      const result = passwordSchema.safeParse("SenhaABC!");

      expect(result.success).toBe(false); 
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("mustContainNumber");
      }
    });`,
      },
      {
        title: "unit.tests.passwordSchemaSuite.test7.title",
        description: "unit.tests.passwordSchemaSuite.test7.description",
        code: `it("should reject a password and return 'mustContainSpecialCharacter' if it doesn't have a special character", () => {
      const result = passwordSchema.safeParse("Senha123");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "mustContainSpecialCharacter",
        );
      }
    });`,
      },
    ],
  },
  {
    title: "unit.tests.signInSchemaSuite.title",
    description: "unit.tests.signInSchemaSuite.description",
    archive: "schemas.test.ts",
    tests: [
      {
        title: "unit.tests.signInSchemaSuite.test1.title",
        description: "unit.tests.signInSchemaSuite.test1.description",
        code: `it("should approve a valid signIn object", () => {
      const result = signInSchema.safeParse({
        email: "email@gmail.com",
        password: "Senha123!",
      });
      expect(result.success).toBe(true);
    });`,
      },
      {
        title: "unit.tests.signInSchemaSuite.test2.title",
        description: "unit.tests.signInSchemaSuite.test2.description",
        code: `it("should accumulate multiple errors if both email and password are invalid", () => {
      const result = signInSchema.safeParse({
        email: "email.com",
        password: "123",
      });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });`,
      },
    ],
  },
  {
    title: "unit.tests.signUpSchemaSuite.title",
    description: "unit.tests.signUpSchemaSuite.description",
    archive: "schemas.test.ts",
    tests: [
      {
        title: "unit.tests.signUpSchemaSuite.test1.title",
        description: "unit.tests.signUpSchemaSuite.test1.description",
        code: `it("should approve a valid signUp object", () => {
      const result = signUpSchema.safeParse({
        email: "email@gmail.com",
        password: "Senha123!",
        confirmPassword: "Senha123!",
      });
      expect(result.success).toBe(true);
    });`,
      },
      {
        title: "unit.tests.signUpSchemaSuite.test2.title",
        description: "unit.tests.signUpSchemaSuite.test2.description",
        code: `it("should reject and return 'passwordsDoNotMatch' in the 'confirmPassword' field if the passwords are different", () => {
      const result = signUpSchema.safeParse({
        email: "email@gmail.com",
        password: "Senha123!",
        confirmPassword: "OutraSenha123!",
      });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("passwordsDoNotMatch");
        expect(result.error.issues[0].path).toEqual(["confirmPassword"]);
      }
    });`,
      },
    ],
  },
];

export const EndToEndTests: TestType[] = [
  {
    title: "e2e.tests.authFlowSuite.title",
    description: "e2e.tests.authFlowSuite.description",
    archive: "authenticationFlow.spec.ts",
    tests: [
      {
        title: "e2e.tests.authFlowSuite.beforeEach.title",
        description: "e2e.tests.authFlowSuite.beforeEach.description",
        code: `test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:3000/en");
    });`,
      },
      {
        title: "e2e.tests.authFlowSuite.test1.title",
        description: "e2e.tests.authFlowSuite.test1.description",
        code: `test("should successfully log in and redirect to the dashboard", async ({
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
          });`,
      },
      {
        title: "e2e.tests.authFlowSuite.test2.title",
        description: "e2e.tests.authFlowSuite.test2.description",
        code: `test("should prevent access to dashboard without authentication", async ({ page }) => {
      await page.goto("http://localhost:3000/en/dashboard");
      
      const currentUrl = page.url();
      expect(currentUrl.endsWith("/en") || currentUrl.endsWith("/")).toBeTruthy();
      
      await expect(page.getByRole("button", { name: messages.AuthForm.signUpBtn })).toBeVisible();
    });`,
      },
      {
        title: "e2e.tests.authFlowSuite.test3.title",
        description: "e2e.tests.authFlowSuite.test3.description",
        code: `test("should display Zod validation errors on invalid submit", async ({ page }) => {
      await page.getByRole("button", { name: "Sign Up" }).click();
      
      await expect(page).not.toHaveURL(/.*\\/dashboard/);
      await expect(page.getByText(messages.AuthForm.Errors.minEmailError)).toBeVisible();
      await expect(page.getByText(messages.AuthForm.Errors.minPasswordError)).toBeVisible();
    });`,
      },
      {
        title: "e2e.tests.authFlowSuite.test4.title",
        description: "e2e.tests.authFlowSuite.test4.description",
        code: `test("should toggle between Sign Up and Sign In modes via URL", async ({ page }) => {
      await expect(page.getByRole("textbox", { name: messages.AuthForm.confirmPassword, exact: true })).toBeVisible();
      
      await page.getByRole("link", { name: messages.AuthForm.signInBtn }).click();
      
      await expect(page).toHaveURL(/.*type=sign-in/);
      await expect(page.getByRole("textbox", { name: messages.AuthForm.confirmPassword, exact: true })).not.toBeVisible();
    });`,
      },
    ],
  },
];

export const TabsDashboard: TabDashboard[] = [
  {
    value: "integration",
    title: "integration.title",
    subtitle: "integration.subtitle",
    content: IntegrationTests,
  },
  {
    value: "unit",
    title: "unit.title",
    subtitle: "unit.subtitle",
    content: UnitTests,
  },
  {
    value: "e2e",
    title: "e2e.title",
    subtitle: "e2e.subtitle",
    content: EndToEndTests,
  },
];

const totalTestsCount = TabsDashboard.reduce((acc, tab) => {
  return (
    acc +
    (tab.content?.reduce((sum, suite) => sum + suite.tests.length, 0) || 0)
  );
}, 0);

export const OverviewStatsArray: OverviewStatType[] = [
  {
    title: "totalTests.title",
    value: totalTestsCount.toString(),
    description: "totalTests.description",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
  },
  {
    title: "coverage.title",
    value: "84.04%",
    description: "coverage.description",
    icon: Activity,
    iconColor: "text-blue-500",
  },
  {
    title: "implementedTypes.title",
    value: TabsDashboard.length.toString(),
    description: "implementedTypes.description",
    icon: LayoutTemplate,
    iconColor: "text-purple-500",
  },
];
