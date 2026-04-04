import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewStatsDashboard } from "@/constants";
import { useTranslations } from "next-intl";

const OverviewStats = () => {
  const t = useTranslations("Dashboard.overviewStats");
  return (
    <div className="grid gap-6 md:grid-cols-3 mb-12">
      {OverviewStatsDashboard.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className="border-border/50 shadow-sm bg-card/50"
          >
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t(stat.title)}
              </CardTitle>
              <Icon className={`w-4 h-4 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {t(stat.description)}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OverviewStats;
