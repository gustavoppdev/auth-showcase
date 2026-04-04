// Next-Intl
import { useTranslations } from "next-intl";

// Components
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsDashboard } from "@/constants";

const TabHeader = () => {
  const t = useTranslations("Dashboard.tabs");

  return (
    <TabsList className="mb-8 w-full flex flex-nowrap justify-start border-b rounded-none h-auto bg-transparent p-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {TabsDashboard.map((tab) => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 py-3"
        >
          {t(tab.title)}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabHeader;
