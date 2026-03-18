import { describe, it, expect } from "vitest";
import { signInSchema, signUpSchema } from "./schemas";

// DESCRIBE: Define o "Suíte de Testes".
// É um agrupador para organizar testes de um mesmo tema (ex: Autenticação).
describe("Conjunto de Testes: Schemas de Autenticação", () => {
  // DESCRIBE aninhado: Organiza sub-temas dentro do tema principal.
  describe("Validação do Login (signInSchema)", () => {
    // IT: Define o "Caso de Teste".
    // Deve descrever um comportamento esperado de forma clara ("Ele deve fazer X").
    it("deve rejeitar um e-mail com formato inválido", () => {
      // safeParse: Método do Zod que tenta validar o objeto.
      // Diferente do .parse(), ele não quebra o código se der erro,
      // ele retorna um objeto { success: boolean, error?: ZodError }.
      const result = signInSchema.safeParse({
        email: "usuario-sem-arroba",
        password: "Senha123!",
      });

      // EXPECT + TOBE: É a "Asserção".
      // É onde você afirma o que o resultado TEM que ser.
      // Se result.success não for false, o Vitest marca como falha.
      expect(result.success).toBe(false);
    });

    it("deve aceitar dados que seguem todas as regras do Regex", () => {
      const dadosValidos = {
        email: "dev@exemplo.com",
        password: "SenhaForte2026!",
      };

      const result = signInSchema.safeParse(dadosValidos);

      // Aqui esperamos que a validação passe com sucesso.
      expect(result.success).toBe(true);
    });
  });

  describe("Validação do Cadastro (signUpSchema)", () => {
    it("deve invalidar quando as senhas são diferentes (Refine)", () => {
      const dadosComSenhasDiferentes = {
        email: "teste@teste.com",
        password: "Senha123!",
        confirmPassword: "OUTRASENHA", // Diferente da de cima
      };

      const result = signUpSchema.safeParse(dadosComSenhasDiferentes);

      expect(result.success).toBe(false);

      // Verificação Profunda:
      // Além de falhar, verificamos se a mensagem de erro é exatamente
      // a que definimos no .refine() do nosso arquivo de schema.
      if (!result.success) {
        // Acessamos o array de erros do Zod para checar o "code" ou "message"
        expect(result.error.issues[0].message).toBe("passwordsDoNotMatch");
      }
    });
  });
});
