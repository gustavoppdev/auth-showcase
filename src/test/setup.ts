import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Limpa o DOM simulado após cada teste para evitar poluição de dados
afterEach(() => {
  cleanup();
});
