"use client";

// Next.js & Next-Intl
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

// Zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// React Hook Form
import { useForm } from "react-hook-form";

// Components
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import FormInput from "./FormInput";
import OrContinueWith from "./OrContinueWith";

// Schemas
import { signInSchema, signUpSchema } from "@/app/[locale]/(home)/schemas";
import { useEffect } from "react";

export const AuthForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("AuthForm");

  const formType =
    searchParams.get("type") === "sign-in" ? "sign-in" : "sign-up";

  const isSignUp = formType === "sign-up";

  const formSchema = isSignUp ? signUpSchema : signInSchema;

  const toggleFormType = () => {
    const newType = isSignUp ? "sign-in" : "sign-up";
    router.push(`${pathname}?type=${newType}`);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      ...(isSignUp && { confirmPassword: "" }),
    },
  });

  useEffect(() => {
    form.reset({
      email: "",
      password: "",
      ...(isSignUp && { confirmPassword: "" }),
    });
  }, [formType, form, isSignUp]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    alert(JSON.stringify({ values }));
  }

  const greeting = t(`${isSignUp ? "signUp" : "signIn"}.greeting`);
  const greetingDescription = t(
    `${isSignUp ? "signUp" : "signIn"}.greetingDescription`,
  );
  const buttonText = t(isSignUp ? "signUpBtn" : "signInBtn");
  const ctaText = t.rich(`${isSignUp ? "signUp" : "signIn"}.cta`, {
    link: (chunks) => (
      <Button
        variant={"link"}
        className="text-indigo-600 font-normal"
        onClick={toggleFormType}
        type="button"
        role="link"
      >
        {chunks}
      </Button>
    ),
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6 lg:gap-12 lg:max-w-sm lg:mx-auto my-auto"
    >
      {/* Greetings */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl lg:text-4xl font-medium">{greeting}</h1>
        <p className="text-muted-foreground lg:text-xl">
          {greetingDescription}
        </p>
      </div>

      {/* Inputs */}
      <FieldGroup className="flex flex-col gap-4 lg:gap-6">
        <FormInput
          control={form.control}
          name="email"
          label={t("email")}
          placeholder={t("emailPlaceholder")}
          type="email"
        />
        <FormInput
          control={form.control}
          name="password"
          label={t("password")}
          placeholder={t("passwordPlaceholder")}
          type="password"
          password
        />
        {isSignUp && (
          <FormInput
            control={form.control}
            name="confirmPassword"
            label={t("confirmPassword")}
            placeholder={t("confirmPasswordPlaceholder")}
            type="password"
            password
          />
        )}

        {!isSignUp && (
          <Button
            variant={"link"}
            type="button"
            className="text-indigo-600 self-end font-normal"
          >
            {t("forgotPassword")}
          </Button>
        )}

        <Button type="submit" size={"lg"} className="h-11 lg:13">
          {buttonText}
        </Button>
      </FieldGroup>

      {/* Google - GitHub */}
      <OrContinueWith />

      {/* Already have an account? Sign in - Sign Up */}
      <p className="self-center text-sm">{ctaText}</p>
    </form>
  );
};
