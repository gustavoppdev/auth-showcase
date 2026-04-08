"use client";

// React
import { startTransition } from "react";

// Next.js & Next-Intl
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

// Components
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Lucide Icons & Utils
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

// Constants
import { LocalesArray } from "@/constants";
import { LocaleType } from "@/i18n/routing";

type Props = {
  layout?: "iconOnly" | "textOnly";
};

export default function LanguageSwitcher({ layout = "iconOnly" }: Props) {
  const t = useTranslations("Others.LanguageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const localeActive = useLocale();

  const handleLocaleChange = (locale: LocaleType) => {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={layout === "iconOnly" ? "outline" : "ghost"}
          className={cn(
            "cursor-pointer w-fit gap-2",
            layout === "textOnly" && "w-fit",
          )}
          aria-label={t("changeLanguage")}
        >
          {layout === "textOnly" ? (
            t("changeLanguage")
          ) : (
            <Languages className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LocalesArray.map((locale) => (
          <DropdownMenuItem
            key={locale.key}
            disabled={localeActive === locale.key}
            onClick={() => handleLocaleChange(locale.key)}
          >
            {t(locale.labelKey)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
