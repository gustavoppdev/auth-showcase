import { LocaleType } from "@/i18n/routing";
import { LucideIcon } from "lucide-react";

type TranslationKey = string;

export type LocalesArrayType = {
  key: LocaleType;
  labelKey: string;
};

export type DashboardStats = {
  title: TranslationKey;
  value: string;
  description: TranslationKey;
  icon: LucideIcon;
  iconColor: string;
};
export type TabDashboard = {
  value: "integration" | "unit" | "e2e";
  title: TranslationKey;
  subtitle: TranslationKey;
  content: TestType[];
};

export type TestType = {
  title: TranslationKey;
  description: TranslationKey;
  archive: string;
  tests: {
    title: TranslationKey;
    description: TranslationKey;
    code: string;
  }[];
};

export type OverviewStatType = {
  title: TranslationKey;
  value: string;
  description: TranslationKey;
  icon: LucideIcon;
  iconColor: string;
};
