"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { LogIn } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { loginFormSchema } from "@/lib/utils/schemas";
import { LoginFormType } from "@/lib/utils/types";
import { useRouter } from "next/navigation";
import useRequest from "@/lib/hooks/useRequest";
import useUserStore from "@/lib/utils/userStore";
import { GET_LOGIN_ROUTE } from "@/lib/utils/apiRoutes";

export function LoginForm() {
    const t = useTranslations();
    const { setToken, getUser } = useUserStore();
    const requestServer = useRequest({ notification: true });
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(loginFormSchema(t)),
        mode: "onBlur",
        defaultValues: {
            user_name: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginFormType) {
        try {
            const response = (await requestServer(GET_LOGIN_ROUTE, "post", {
                data: {
                    username: values.user_name,
                    password: values.password,
                },
                success: {
                    notification: { show: true },
                },
            })) as { data: { token: string } };
            console.log(response);

            setToken(response.data.token);
            await getUser();
            router.push("/chat");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 max-w-md capitalize">
                <Card className="w-full">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-3xl font-black">{t("Global.appName")}</CardTitle>
                        <CardDescription>{t("Global.motto")}</CardDescription>
                    </CardHeader>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="user_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder={t("LoginPage.user_name")} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="password" placeholder={t("LoginPage.password")} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="remember" />
                                    <label htmlFor="remember" className="cursor-pointer">
                                        {t("LoginPage.remember")}
                                    </label>
                                </div>
                                <Link href="" className="hover:underline">
                                    {t("LoginPage.forget")}
                                </Link>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 pt-4">
                            <Button type="submit" className="w-full">
                                {t("LoginPage.login")}
                                <LogIn className="ml-2" />
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </Form>
    );
}
