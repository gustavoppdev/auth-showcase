// Next-Intl
import { useTranslations } from "next-intl";

// Lucide Icons
import { FlaskConical } from "lucide-react";

// Components
import OverviewStats from "./components/OverviewStats";
import { TestsTab } from "./components/Tabs";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  return (
    <main className="grow bg-background">
      <div className="section-container max-w-6xl py-12">
        {/* Header Section */}
        <header className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <FlaskConical className="size-7 text-primary" />
            <h1 className="text-2xl font-light tracking-tight">{t("title")}</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl font-light">
            {t("description")}
          </p>
        </header>

        {/* Overview Stats */}
        <OverviewStats />

        {/* Main Content / Tabs */}
        <TestsTab />
      </div>
    </main>
  );
}
