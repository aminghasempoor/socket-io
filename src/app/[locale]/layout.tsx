import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";

const myFont = localFont({
    src: "../../fonts/Doran-Medium.woff2",
});
export const metadata = {
    title: {
        template: "%s | socket-io",
        default: "socket-io",
    },
};
export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html className={myFont.className} dir={locale === "fa" ? "rtl" : "ltr"} lang={locale} suppressHydrationWarning>
            <body>
                <NextIntlClientProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <Navbar />
                        <main className="px-5 py-2">{children}</main>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
