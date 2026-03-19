import { renderWithIntl } from "@/test/render-with-intl";
import { AuthForm } from "./AuthForm/index";
import { describe, expect, it, vi } from "vitest";
import messages from "@/../messages/en.json";
import { fireEvent, screen } from "@testing-library/react";

// MOCK: Fingindo o comportamento do Next.js Navigation
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("type=sign-in"),
  usePathname: () => "/",
}));

// MOCK: Fingindo o arquivo de navegação i18n
vi.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(), // Uma função vazia que apenas "anota" se foi clicada
  }),
  usePathname: () => "/",
}));

describe("AuthForm - integração", () => {
  it("Deve renderizar o título de Login corretamente", () => {
    renderWithIntl(<AuthForm />);

    // Pegamos a tradução exata do JSON para comparar
    const expectedTitle = messages.AuthForm.signIn.greeting;

    // Verificamos se o texto apareceu na tela
    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });

  it("Deve exibir o erro de validação do Zod ao clicar em enviar com campos vazios", async () => {
    renderWithIntl(<AuthForm />);

    // 1. Acha o botão de entrar
    const submitButton = screen.getByRole("button", {
      name: messages.AuthForm.signInBtn,
    });

    // 2. Simula o clique
    fireEvent.click(submitButton);

    // 3. O Zod é assincrono, então o recomendado pelo Testing Library é usar "findByText"
    // Observação: enviando vazio, o Zod costuma disparar o erro de campo obrigatório (minEmailError)
    const erroEmail = messages.AuthForm.Errors.minEmailError;
    expect(await screen.findByText(erroEmail)).toBeInTheDocument();
  });
});
