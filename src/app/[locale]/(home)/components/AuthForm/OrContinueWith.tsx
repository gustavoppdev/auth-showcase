// Next.js & Next-Intl
import { useTranslations } from "next-intl";
import Image from "next/image";

// Assets
import { githubIcon, googleIcon } from "@/assets";

// Components
import { Button } from "@/components/ui/button";

const OrContinueWith = () => {
  const t = useTranslations("AuthForm");
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex justify-between items-center gap-4 w-full">
        <span className="w-full h-px bg-border" />
        <h2 className="whitespace-nowrap text-neutral-700 text-sm">
          {t("continueWith")}
        </h2>
        <span className="w-full h-px bg-border" />
      </div>

      <div className="grid grid-cols-2 w-full gap-4">
        <Button
          variant={"secondary"}
          size={"lg"}
          className="h-11 lg:13 text-neutral-700 gap-4 w-full"
        >
          <Image
            src={googleIcon}
            alt="Google"
            width={22}
            height={22}
            className="object-cover"
          />
          <span>Google</span>
        </Button>

        <Button
          variant={"secondary"}
          size={"lg"}
          className="h-11 lg:13 text-neutral-700 gap-4"
        >
          <Image
            src={githubIcon}
            alt="GitHub"
            width={22}
            height={22}
            className="object-cover"
          />
          <span>GitHub</span>
        </Button>
      </div>
    </div>
  );
};

export default OrContinueWith;
