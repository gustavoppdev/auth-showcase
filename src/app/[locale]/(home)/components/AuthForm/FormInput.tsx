"use client";

// React
import { useState } from "react";

// Next-Intl & React Hook Form
import { useTranslations } from "next-intl";
import { Control, Controller, FieldValues } from "react-hook-form";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

// Lucide Icons
import { Eye, EyeOff } from "lucide-react";

type Props<T extends FieldValues> = {
  control: Control<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any;
  label: string;
  placeholder: string;
  password?: boolean;
  type?: string;
};

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  password,
  type = "text",
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("AuthForm");

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <div className="relative">
            <Input
              {...field}
              id={field.name}
              placeholder={placeholder}
              className="p-4 h-10.5 lg:h-12 text-sm"
              value={field.value ?? ""}
              type={password ? (showPassword ? "text" : "password") : type}
            />
            {password && (
              <div className="absolute right-1.5 bottom-1.5">
                <Button
                  variant={"ghost"}
                  size={"icon-sm"}
                  onClick={handleShowPassword}
                  type="button"
                  aria-label={t(showPassword ? "hidePassword" : "showPassword")}
                  className="text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
          {fieldState.invalid && (
            <FieldError
              errors={[{ message: t(`Errors.${fieldState.error?.message}`) }]}
            />
          )}
        </Field>
      )}
    />
  );
};

export default FormInput;
