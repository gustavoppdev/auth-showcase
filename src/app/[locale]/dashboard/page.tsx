import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  FlaskConical,
  LayoutTemplate,
  Activity,
  Terminal,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto py-12 px-4 md:px-6">
        {/* Header Section */}
        <header className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-light tracking-tight">
              Test Showcase
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl text-lg font-light">
            Bem-vindo ao painel de resultados. Aqui você encontra um relatório
            detalhado das suítes de testes aplicadas neste projeto, garantindo a
            qualidade e confiabilidade da aplicação.
          </p>
        </header>

        {/* Overview Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="border-border/50 shadow-sm bg-card/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Testes
              </CardTitle>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                100% passando atualmente
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm bg-card/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cobertura (Coverage)
              </CardTitle>
              <Activity className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Linhas de código base
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm bg-card/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tipos Implementados
              </CardTitle>
              <LayoutTemplate className="w-4 h-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <p className="text-xs text-muted-foreground mt-1">
                Unitários e Integração
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content / Tabs */}
        <Tabs defaultValue="integration" className="w-full">
          <TabsList className="mb-8 w-full flex flex-nowrap justify-start border-b rounded-none h-auto bg-transparent p-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <TabsTrigger
              value="integration"
              className="rounded-none whitespace-nowrap shrink-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 sm:px-6 py-3 font-medium"
            >
              Componentes & Integração
            </TabsTrigger>
            <TabsTrigger
              value="unit"
              className="rounded-none whitespace-nowrap shrink-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 sm:px-6 py-3 font-medium"
            >
              Unitários (Schemas)
            </TabsTrigger>
            <TabsTrigger
              value="e2e"
              className="rounded-none whitespace-nowrap shrink-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 sm:px-6 py-3 font-medium text-muted-foreground"
            >
              E2E (Em breve)
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="integration"
            className="space-y-6 animate-in fade-in-50 duration-500"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Testes do Componente de Autenticação
              </h2>
              <Badge
                variant="outline"
                className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
              >
                Passed ✓
              </Badge>
            </div>

            <Accordion
              type="single"
              collapsible
              className="w-full bg-card/30 border border-border/50 rounded-lg overflow-hidden"
            >
              <AccordionItem value="test-1" className="border-b-0 px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-left">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-medium text-sm">
                      Deve renderizar o título de Login corretamente
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 pl-9">
                  <p className="mb-4 text-sm leading-relaxed max-w-3xl">
                    Verifica a renderização inicial do componente React de forma
                    isolada, mockando a navegação e o contexto de
                    internacionalização (i18n). Garante que a interface não
                    quebre no primeiro &apos;paint&apos;.
                  </p>

                  <div className="bg-zinc-950 rounded-md border border-zinc-900 border-l-4 border-l-stone-600 p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <div className="flex items-center gap-2 mb-3 text-zinc-500">
                      <Terminal className="w-3 h-3" />
                      <span>AuthForm.test.tsx</span>
                    </div>
                    <pre>
                      {`it("Deve renderizar o título de Login corretamente", () => {
  renderWithIntl(<AuthForm />);
  const expectedTitle = messages.AuthForm.signIn.greeting;
  expect(screen.getByText(expectedTitle)).toBeInTheDocument();
});`}
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <div className="h-px w-full bg-border/50" />

              <AccordionItem value="test-2" className="border-b-0 px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-left">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-medium text-sm">
                      Deve exibir o erro de validação do Zod ao clicar em enviar
                      vazio
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 pl-9">
                  <p className="mb-4 text-sm leading-relaxed max-w-3xl">
                    Testa a integração entre a UI (botão de submit) e o schema
                    de validação (Zod). Aguarda de forma assíncrona o estado do
                    erro refletir na tela após uma tentativa de submissão
                    inválida.
                  </p>

                  <div className="bg-zinc-950 rounded-md border border-zinc-900 border-l-4 border-l-stone-600 p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <div className="flex items-center gap-2 mb-3 text-zinc-500">
                      <Terminal className="w-3 h-3" />
                      <span>AuthForm.test.tsx</span>
                    </div>
                    <pre>
                      {`it("Deve exibir o erro de validação do Zod...", async () => {
  renderWithIntl(<AuthForm />);
  
  const submitButton = screen.getByRole("button", { name: messages.AuthForm.signInBtn });
  fireEvent.click(submitButton);

  const erroEmail = messages.AuthForm.Errors.invalidEmailError;
  expect(await screen.findByText(erroEmail)).toBeInTheDocument();
});`}
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent
            value="unit"
            className="space-y-6 animate-in fade-in-50 duration-500"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Testes Unitários de Schemas (Zod)
              </h2>
              <Badge
                variant="outline"
                className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
              >
                Passed ✓
              </Badge>
            </div>

            <Accordion
              type="single"
              collapsible
              className="w-full bg-card/30 border border-border/50 rounded-lg overflow-hidden"
            >
              <AccordionItem value="schema-1" className="border-b-0 px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-left">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-medium text-sm">
                      Validações do esquema de Autenticação
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 pl-9">
                  <p className="mb-4 text-sm leading-relaxed max-w-3xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam in odio ultricies, varius nisl ac, iaculis sem.
                    Praesent ac quam vitae magna accumsan viverra sed sit amet
                    quam.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent
            value="e2e"
            className="space-y-6 animate-in fade-in-50 duration-500"
          >
            <div className="flex flex-col flex-1 h-[300px] items-center justify-center rounded-xl border border-dashed border-border/50 bg-card/20 p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <FlaskConical className="h-6 w-6 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-medium mb-2">Testes End-to-End</h2>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                A camada de testes E2E utilizando Playwright será implementada
                nesta seção, cobrindo todo o fluxo do usuário em navegadores
                reais.
              </p>
              <Badge variant="secondary" className="font-normal opacity-80">
                Em desenvolvimento
              </Badge>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
