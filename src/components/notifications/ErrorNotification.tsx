"use client";
import { toast } from "@/lib/hooks/use-toast";
import { Check } from "lucide-react";
import React from "react";
type ToastType = "pending" | "error" | "warning" | "success";

const ErrorNotification = (
    pushToastList: (toast_type: ToastType, toast_id: string) => void,
    notificationType: "pending" | "warning" | "error" | "success",
    t: (key: string) => string,
    status?: number,
    message?: string
) => {
    const toastId = toast({
        title: `${t("Notifications.title")}`,
        description: (
            <div className="flex flex-col items-start justify-start text-red-600">
                <div className="flex items-center">
                    <Check />
                    <div>
                        <h1 className="text-xl">
                            {t("Notifications.error")} : {status}
                        </h1>
                        <h6 className={"pr-2"}>{message}</h6>
                    </div>
                </div>
            </div>
        ) as React.ReactNode, // Cast to React.ReactNode here
    });
    pushToastList(notificationType, toastId.id);
};
export default ErrorNotification;
