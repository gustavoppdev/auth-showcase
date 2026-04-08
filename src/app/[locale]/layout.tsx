// Next.js
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";

// Next-Intl
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";

// Components
import { ThemeProvider } from "@/components/theme-provider";

// Global Styles
import "./globals.css";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";

const sfProDisplay = localFont({
  src: [
    {
      path: "../../assets/font/sf-pro-display/SFPRODISPLAYREGULAR.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/font/sf-pro-display/SFPRODISPLAYMEDIUM.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/font/sf-pro-display/SFPRODISPLAYBOLD.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    // metadataBase: new URL(""),
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      // url: "",
      images: [
        {
          url: "/og-image.webp",
          width: 1200,
          height: 630,
          alt: "Auth Showcase",
        },
      ],
      siteName: t("openGraph.site_name"),
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      // images: ["https:///og-image.webp"],
    },
    authors: [{ name: "Gustavo Henrique" }],
    creator: "Gustavo Henrique",
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html suppressHydrationWarning lang={locale}>
      <body
        className={`${sfProDisplay.className} antialiased flex flex-col min-h-dvh`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <NextIntlClientProvider>
            <NavigationBar />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
