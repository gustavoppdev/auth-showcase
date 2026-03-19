import { describe, it, expect } from "vitest";
import {
  emailSchema,
  passwordSchema,
  signInSchema,
  signUpSchema,
} from "./schemas";

// Testes Unitários - Schemas
describe("Conjunto de Testes: Schemas de Autenticação", () => {
  describe("emailSchema", () => {
    // Aprova um email válido
    it("should approve a valid email", () => {
      const result = emailSchema.safeParse("email@gmail.com");
      expect(result.success).toBe(true);
    });
    // Rejeita um email inválido
    it("should reject an invalid email and return 'invalidEmailError'.", () => {
      const result = emailSchema.safeParse("email.com");
      expect(result.success).toBe(false);
      // Verifica a mensagem de erro
      if (!result.success) {
        expect(result.error?.issues[0].message).toBe("invalidEmailError");
      }
    });
    // Rejeita um email vazio
    it("should reject an empty email and return 'minEmailError'.", () => {
      const result = emailSchema.safeParse("");
      expect(result.success).toBe(false);
      // Verifica a mensagem de erro
      if (!result.success) {
        expect(result.error?.issues[0].message).toBe("minEmailError");
      }
    });
    // Deve remover espaços vazios no início e no fim do email (trim)
    it("should remove empty spaces at the beginning and end of the email (trim)", () => {
      const result = emailSchema.safeParse("  email@gmail.com  ");
      expect(result.data).toBe("email@gmail.com");
      expect(result.success).toBe(true);
    });
  });
  describe("passwordSchema", () => {
    // Aprova uma senha válida
    it("should approve a valid password", () => {
      const result = passwordSchema.safeParse("Senha123!");
      expect(result.success).toBe(true);
    });
    // Rejeita uma senha e retorna 'minPasswordError' se tiver menos de 6 caracteres
    it("should reject a password and return 'minPasswordError' if it has less than 6 characters", () => {
      const result = passwordSchema.safeParse("123");
      expect(result.success).toBe(false);
      // Verifica a mensagem de erro
      if (!result.success) {
        expect(result.error?.issues[0].message).toBe("minPasswordError");
      }
    });
    // Rejeita uma senha e retorna 'maxPasswordError' se tiver mais de 20 caracteres
    it("should reject a password and return 'maxPasswordError' if it has more than 20 characters", () => {
      const result = passwordSchema.safeParse("123456789012345678901");
      expect(result.success).toBe(false);
      // Verifica a mensagem de erro
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("maxPasswordError");
      }
    });
    // Rejeita uma senha e retorna 'mustContainUppercase' se não tiver letra maiúscula
    it("should reject a password and return 'mustContainUppercase' if it doesn't have an uppercase letter", () => {
      const result = passwordSchema.safeParse("senha123!");
      expect(result.success).toBe(false);
      // Verifica a mensagem de erro
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("mustContainUppercase");
      }
    });
    // Rejeita uma senha e retorna 'mustContainLowercase' se não tiver letra minúscula
    it("should reject a password and return 'mustContainLowercase' if it doesn't have a lowercase letter", () => {
      const result = passwordSchema.safeParse("SENHA123!");
      expect(result.success).toBe(false);
      // Verifica a mensagem de erro
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("mustContainLowercase");
      }
    });
    // Rejeita uma senha e retorna 'mustContainNumber' se não tiver número
    it("should reject a password and return 'mustContainNumber' if it doesn't have a number", () => {
      const result = passwordSchema.safeParse("SenhaABC!");
      expect(result.success).toBe(false);
      // Verifica a mensagem de erro
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("mustContainNumber");
      }
    });
    // Rejeita uma senha e retorna 'mustContainSpecialCharacter' se não tiver caractere especial
    it("should reject a password and return 'mustContainSpecialCharacter' if it doesn't have a special character", () => {
      const result = passwordSchema.safeParse("Senha123");
      expect(result.success).toBe(false);
      // Verifica a mensagem de erro
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "mustContainSpecialCharacter",
        );
      }
    });
  });
  describe("signInSchema", () => {
    // Deve aprovar um objeto signIn válido
    it("should approve a valid signIn object", () => {
      const result = signInSchema.safeParse({
        email: "email@gmail.com",
        password: "Senha123!",
      });
      expect(result.success).toBe(true);
    });
    // Deve acumular múltiplos erros caso ambos email e senha estejam inválidos
    it("should accumulate multiple errors if both email and password are invalid", () => {
      const result = signInSchema.safeParse({
        email: "email.com",
        password: "123",
      });
      expect(result.success).toBe(false);
      // Verifica o numero de erros
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });
  });
  describe("signUpSchema", () => {
    // Deve aprovar um objeto signUp válido
    it("should approve a valid signUp object", () => {
      const result = signUpSchema.safeParse({
        email: "email@gmail.com",
        password: "Senha123!",
        confirmPassword: "Senha123!",
      });
      expect(result.success).toBe(true);
    });
    // Deve rejeitar e retornar 'passwordsDoNotMatch' no campo 'confirmPassword' caso as senhas sejam diferentes
    it("should reject and return 'passwordsDoNotMatch' in the 'confirmPassword' field if the passwords are different", () => {
      const result = signUpSchema.safeParse({
        email: "email@gmail.com",
        password: "Senha123!",
        confirmPassword: "OutraSenha123!",
      });
      expect(result.success).toBe(false);
      // Verifica a mensagem de erro
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("passwordsDoNotMatch");
        expect(result.error.issues[0].path).toEqual(["confirmPassword"]);
      }
    });
  });
});
