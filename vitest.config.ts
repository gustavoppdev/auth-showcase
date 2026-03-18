import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()], // Adiciona o "tradutor" de React
  test: {
    environment: "jsdom", // Define que o ambiente PADRÃO simula um navegador
    globals: true, // Permite usar 'describe' e 'it' sem importar em todo arquivo
    setupFiles: ["./src/test/setup.ts"], // Onde vamos colocar as extensões do jest-dom
    alias: {
      "@": path.resolve(__dirname, "./src"), // Faz o Vitest entender o '@/' do Next.js
    },
  },
});
