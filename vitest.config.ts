import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()], // "tradutor" do React
  test: {
    exclude: [...configDefaults.exclude, "src/test/e2e/**"],
    environment: "jsdom", // Define que o ambiente PADRÃO simula um navegador
    globals: true, // Permite usar 'describe' e 'it' sem importar em todo arquivo
    setupFiles: ["./src/test/setup.ts"], // Onde vamos colocar as extensões do jest-dom
    alias: {
      "@": path.resolve(__dirname, "./src"), // Faz o Vitest entender o '@/' do Next.js
    },
    coverage: {
      provider: "v8",
    },
  },
});
