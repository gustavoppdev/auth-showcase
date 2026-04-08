"use client";

// Next.js & Next-Intl
import { usePathname } from "@/i18n/navigation";

// Components
import LanguageSwitcher from "../common/LanguageSwitcher";
import { Button } from "../ui/button";
import { ModeToggle } from "../common/ModeToggle";

// Lucide Icons
import { LogOut } from "lucide-react";

// Hooks
import { useAuthForm } from "@/hooks/useAuthForm";
import { useTranslations } from "next-intl";

const NavigationBar = () => {
  const { handleLogout } = useAuthForm();
  const pathname = usePathname();
  const t = useTranslations("NavigationBar");

  const isDashboardPage = pathname.includes("/dashboard");

  return (
    <header>
      <nav className="py-4 border-b">
        <div className="section-container flex flex-wrap justify-end gap-1">
          <ModeToggle layout="textOnly" />
          <LanguageSwitcher layout="textOnly" />
          {isDashboardPage && (
            <Button variant={"ghost"} onClick={handleLogout}>
              {t("logout")}
              <LogOut className="size-4" />
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
