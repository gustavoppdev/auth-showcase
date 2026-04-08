"use client";

// Next-Intl & React
import { useTranslations } from "next-intl";
import { useEffect } from "react";

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

// Lucide Icons & Hooks
import { Loader2 } from "lucide-react";
import { useAuthForm } from "@/hooks/useAuthForm";

export const AuthForm = () => {
  const { formSchema, toggleFormType, isLoading, isSignUp, onSubmit } =
    useAuthForm();
  const t = useTranslations("AuthForm");

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
  }, [form, isSignUp]);

  const translatedKey = isSignUp ? "signUp" : "signIn";

  const greeting = t(`${translatedKey}.greeting`);
  const greetingDescription = t(`${translatedKey}.greetingDescription`);
  const buttonText = t(`${translatedKey}Btn`);

  const ctaText = t.rich(`${translatedKey}.cta`, {
    link: (chunks) => (
      <Button
        variant={"link"}
        className="text-indigo-600 dark:text-indigo-500 font-normal"
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
        <h1 className="text-2xl lg:text-3xl font-medium">{greeting}</h1>
        <p className="text-muted-foreground lg:text-lg">
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
            className="text-indigo-600 dark:text-indigo-500 self-end font-normal"
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

      {isLoading && (
        <div className="absolute inset-0 bg-background/50 z-10 grid place-content-center">
          <Loader2 className="animate-spin size-10" />
        </div>
      )}
    </form>
  );
};
