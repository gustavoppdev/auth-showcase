// Components
import TabHeader from "./TabHeader";
import TabMainContent from "./TabMainContent";
import { Tabs } from "@/components/ui/tabs";

export const TestsTab = () => {
  return (
    <Tabs defaultValue="integration" className="w-full">
      <TabHeader />

      <TabMainContent />

      {/* <TabsContent
        value="e2e"
        className="space-y-6 animate-in fade-in-50 duration-500"
      >
        <div className="flex flex-col flex-1 h-[300px] items-center justify-center rounded-xl border border-dashed border-border/50 bg-card/20 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <FlaskConical className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-medium mb-2">Testes End-to-End</h2>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            A camada de testes E2E utilizando Playwright será implementada nesta
            seção, cobrindo todo o fluxo do usuário em navegadores reais.
          </p>
          <Badge variant="secondary" className="font-normal opacity-80">
            Em desenvolvimento
          </Badge>
        </div>
      </TabsContent> */}
    </Tabs>
  );
};
