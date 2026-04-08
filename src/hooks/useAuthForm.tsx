// Next-Intl & Next.js
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

// React
import { useState } from "react";

// Zod
import z from "zod";

// Schemas
import { signInSchema, signUpSchema } from "@/app/[locale]/(home)/schemas";

export const useAuthForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const formType =
    searchParams.get("type") === "sign-in" ? "sign-in" : "sign-up";
  const isSignUp = formType === "sign-up";

  const formSchema = isSignUp ? signUpSchema : signInSchema;

  const toggleFormType = () => {
    const newType = isSignUp ? "sign-in" : "sign-up";
    router.push(`${pathname}?type=${newType}`);
  };

  //
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values) {
        setIsLoading(true);

        new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
          setIsLoading(false);
          // Grava o cookie que será lido pelo middleware
          document.cookie = "showcase-auth=true; path=/; SameSite=Lax";

          // Pequeno delay para garantir que o WebKit (Safari) registre o cookie
          // antes do Next.js disparar o fetch de navegação interna (RSC)
          setTimeout(() => {
            router.push("/dashboard");
          }, 50);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleLogout = () => {
    document.cookie = "showcase-auth=; path=/; SameSite=Lax";
    router.push("/");
  };

  return {
    isLoading,
    setIsLoading,
    formSchema,
    isSignUp,
    toggleFormType,
    onSubmit,
    handleLogout,
  };
};
