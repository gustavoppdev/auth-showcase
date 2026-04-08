// Vitest
import { describe, expect, it, vi } from "vitest";

// React Testing Library
import { fireEvent, screen, waitFor } from "@testing-library/react";

// Next-Intl
import { renderWithIntl } from "@/test/render-with-intl";

// Components
import { AuthForm } from "./AuthForm";

// Messages
import messages from "@/../messages/en.json";

let searchParamsValue: "sign-in" | "sign-up" = "sign-in";

// MOCK: Fingindo o comportamento do Next.js Navigation
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(`type=${searchParamsValue}`),
  usePathname: () => "/",
}));

// Importamos tudo de navigation para o Vitest poder usar o mockReturnValue nele
import * as i18nNavigation from "@/i18n/navigation";

// MOCK: Fingindo o arquivo de navegação i18n
vi.mock("@/i18n/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: () => "/",
}));

describe("Conjunto de Testes: AuthForm", () => {
  describe("Sign In", () => {
    it("should render email and password inputs", () => {
      renderWithIntl(<AuthForm />);

      expect(
        screen.getByLabelText(messages.AuthForm.email),
      ).toBeInTheDocument();

      expect(
        screen.getByLabelText(messages.AuthForm.password),
      ).toBeInTheDocument();
    });

    it("should not render the confirm password input", () => {
      renderWithIntl(<AuthForm />);

      const inputConfirmPassword = screen.queryByLabelText(
        messages.AuthForm.confirmPassword,
      );

      expect(inputConfirmPassword).not.toBeInTheDocument();
    });

    it("should render the 'forgot password' button", () => {
      renderWithIntl(<AuthForm />);

      const forgotPasswordButton = screen.getByRole("button", {
        name: messages.AuthForm.forgotPassword,
      });

      expect(forgotPasswordButton).toBeInTheDocument();
    });
  });

  describe("Sign Up", () => {
    it("should render the confirm password input when in sign-up mode", () => {
      // Altera o estado para simular tela de cadastro
      searchParamsValue = "sign-up";
      renderWithIntl(<AuthForm />);

      const inputConfirmPassword = screen.getByLabelText(
        messages.AuthForm.confirmPassword,
      );
      expect(inputConfirmPassword).toBeInTheDocument();
    });

    it("should not render the 'forgot password' button when in sign-up mode", () => {
      searchParamsValue = "sign-up";
      renderWithIntl(<AuthForm />);

      const forgotPasswordButton = screen.queryByRole("button", {
        name: messages.AuthForm.forgotPassword,
      });

      expect(forgotPasswordButton).not.toBeInTheDocument();
    });
  });

  describe("Interatividade da UI", () => {
    it("should toggle password visibility from 'password' to 'text' when clicking the eye icon", () => {
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
    });

    it("should call the navigation function (push) when clicking 'create an account'", () => {
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
    });
  });

  describe("Integração com Zod E Submissão", () => {
    it("should display Zod error messages when fields are invalid", async () => {
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
    });

    it("should call the onSubmit function when the form is valid", async () => {
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
    });
  });
});
