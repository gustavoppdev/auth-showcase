"use client";

// Next-Themes
import { useTheme } from "next-themes";

// Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Lucide Icons & Next-Intl
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  layout?: "iconOnly" | "textOnly";
};

export function ModeToggle({ layout = "iconOnly" }: Props) {
  const t = useTranslations("Others.Theme");
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={layout === "iconOnly" ? "outline" : "ghost"}
          className={`${layout === "textOnly" && "w-fit"}`}
          aria-label={t("toggleTheme")}
        >
          {layout === "iconOnly" ? (
            <>
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon
                className={`absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 ${
                  layout !== "iconOnly" && "left-6.5"
                } `}
              />
            </>
          ) : (
            <span>{t("toggleTheme")}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {t("light")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {t("dark")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {t("system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
