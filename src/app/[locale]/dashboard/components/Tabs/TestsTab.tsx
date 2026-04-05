// Components
import TabHeader from "./TabHeader";
import TabMainContent from "./TabMainContent";
import { Tabs } from "@/components/ui/tabs";

export const TestsTab = () => {
  return (
    <Tabs defaultValue="integration" className="w-full">
      <TabHeader />

      <TabMainContent />
    </Tabs>
  );
};
