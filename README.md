<div align="center">

# Auth Showcase

### Test Suites & Authentication Flow

_Uma aplicação demonstrando fluxos de autenticação em Next.js, construída como base para praticar e exibir testes automatizados (Unitários, de Integração e E2E)._

#### [Link da demo](https://auth-showcase-sigma.vercel.app/)

---

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-729B1B?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-1.59-2EAD33?style=flat-square&logo=playwright)](https://playwright.dev/)
[![Zod](https://img.shields.io/badge/Zod-3.2-3068b7?style=flat-square&logo=zod)](https://zod.dev/)

</div>

---

## ✨ Sobre o Projeto

**Auth Showcase** serve principalmente como um ambiente central focado na demonstração técnica de validações de software com foco em:

- **Quality Assurance**: 84%+ de cobertura (Coverage) atestando e garantindo a segurança do domínio em múltiplas frentes de testes de software.
- **Middlewares Seguros**: Proxy de rotas interceptando submissões simuladas nativamente bloqueando usuários não autenticados.
- **Validação de Formulários**: Regras assíncronas estritas do `Zod` via `hookform/resolvers` para checagem da integridade de senhas e submissão cruzada.
- **Internacionalização**: next-intl fluindo de forma integrada pelos sub-middlewares SSR com suporte nativo e paramétrico (`pt` e `en`).
- **Ecossistema de Testes**: Vitest (Unitários e Integração com RTL) e Playwright (Automação Browser interactiva).

## 🛠️ Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · next-intl · Zod · Vitest · Playwright

## 📄 Tipos de Testes Aplicados

- **Testes Unitários (Vitest)** — Validação individual dos schemas base de formulário usando `Zod` (cenários exigindo força na criação de senhas e formatos condicionados).
- **Testes de Integração (RTL)** — Simulação do DOM React. Cobre requisições simuladas completas ativando loaders assíncronos e verificação correta dos Spans dinâmicos de erros de formulário.
- **Testes E-2-E (Playwright)** — Teste automatizado com o próprio navegador reproduzindo ações manuais (teclado, cursor) realizando o registro de conta e ultrapassando as checagens do middleware bloqueador.

## 🏗️ Arquitetura

```text
src/
├── app/[locale]/       # Rotas suportando inglês (en) e portugês (pt)
├── components/         # Blocos visuais da UI genéricos
├── constants/          # Constantes estáticas da aplicação (Relatório dos Testes UI)
├── hooks/              # Regras de negócios do formulário e estados
├── i18n/               # Arquivos básicos de parametrização e dicionários globais
├── proxy.ts            # Configuração e lógica do Middleware
└── test/               # Setups globais de mocks para os testes
```

## 🚀 Getting Started

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gustavoppdev/auth-showcase.git

# Entre no diretório
cd auth-showcase

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Rodando os Testes

```bash
# Rodar todos os testes Unitários e de Integração (Vitest)
npm run test

# Verificar a cobertura e estatísticas do código localmente (Coverage)
npm run coverage

# Iniciar o dashboard visual de simulação do Playwright (Testes End-to-End no Nav)
npm run playwright:ui
```

## 📄 Licença

Este projeto é open source e está disponível sob a [MIT License](LICENSE).

---

## 👨‍💻 Autor

**Gustavo Henrique**

Desenvolvedor Front-end especializado em interfaces fluídas e arquiteturas resilientes. Este projeto demonstra habilidades tangíveis em:

- Engenharia e Arquitetura de Testes Automatizados
- Type safety puro e Controle de Qualidade (QA)
- Manipulação assíncrona de middlewares de rota 
- Componentização Moderna e Design Systems
- Internacionalização paramétrica
- Cobertura de Testes local

---

<div align="center">

**[⬆ Voltar ao topo](#auth-showcase)**

Feito com ❤️ e TypeScript

</div>
