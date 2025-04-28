import { useTranslations } from "next-intl";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import LanguageToggle from "../LanguageToggle";

export function Navbar() {
    const t = useTranslations("NavBar");
    return (
        <div className={"flex justify-between px-5 items-center py-6 sm:px-10 z-50"}>
            <Link
                href={"/"}
                className="scroll-m-20 capitalize text-2xl tracking-tight lg:text-4xl align-baseline cursor-pointer"
            >
                {t("title")}
                <small className={"text-neutral-600"}>.</small>
            </Link>
            <div className={"flex gap-x-3 justify-center items-center"}>
                <ThemeToggle />
                <LanguageToggle />
            </div>
        </div>
    );
}
