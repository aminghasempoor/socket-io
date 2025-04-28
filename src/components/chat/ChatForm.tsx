"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { chatFormSchema } from "@/lib/utils/schemas";
import { useTranslations } from "next-intl";
import { ChatFormType } from "@/lib/utils/types";

export default function ChatForm() {
    const t = useTranslations();
    const form = useForm<ChatFormType>({
        resolver: zodResolver(chatFormSchema(t)),
        defaultValues: {
            message: "",
        },
    });

    function onSubmit(values: ChatFormType) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-8 w-full">
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input placeholder={t("ChatForm.placeHolder")} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{t("ChatForm.submit")}</Button>
            </form>
        </Form>
    );
}
