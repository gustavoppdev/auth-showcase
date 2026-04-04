import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { TabsDashboard } from "@/constants";
import { CheckCircle2, Terminal } from "lucide-react";
import { useTranslations } from "next-intl";

const TabMainContent = () => {
  const t = useTranslations("Dashboard.tabs");

  return TabsDashboard.map((tab) => (
    <TabsContent
      key={tab.value}
      value={tab.value}
      className="space-y-6 animate-in fade-in-50 duration-500"
    >
      <h2 className="text-xl font-semibold">{t(tab.subtitle)}</h2>

      <Accordion
        type="single"
        collapsible
        className="w-full bg-card/30 border border-border/50 rounded-lg overflow-hidden"
      >
        {tab.content.map((suite, index) => (
          <AccordionItem
            key={index}
            value={`test-${index}`}
            className="border-b-0 px-4"
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3 text-left">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <h2 className="font-medium text-sm">{t(suite.title)}</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className=" pb-6 pl-9 h-fit">
              <p className="mb-4 text-sm leading-relaxed max-w-3xl text-muted-foreground">
                {t(suite.description)}
              </p>

              {suite.tests.map((test) => (
                <div key={test.title} className="flex flex-col gap-2 my-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{t(test.title)}</h3>
                    <Badge
                      variant="outline"
                      className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
                    >
                      {t("passed")} ✓
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed max-w-3xl text-muted-foreground">
                    {t(test.description)}
                  </p>

                  <div className="bg-zinc-950 rounded-md border border-zinc-900 border-l-4 border-l-stone-600 p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <div className="flex items-center gap-2 mb-3 text-zinc-500">
                      <Terminal className="w-3 h-3" />
                      <span>{suite.archive}</span>
                    </div>
                    <pre>{test.code}</pre>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}

        <div className="h-px w-full bg-border/50" />
      </Accordion>
    </TabsContent>
  ));
};

export default TabMainContent;
