"use client";
import { toast } from "@/lib/hooks/use-toast";
import { Check } from "lucide-react";
import React from "react";
// import {ToastAction} from "@/components/ui/toast";
type ToastType = "pending" | "error" | "warning" | "success";

const SuccessNotification = (
    pushToastList: (toast_type: ToastType, toast_id: string) => void,
    notificationType: "pending" | "warning" | "error" | "success",
    t: (key: string) => string,
    status?: number
) => {
    const toastId = toast({
        title: `${t("Notifications.title")}`,
        description: (
            <div className="flex flex-col items-start justify-start">
                <div className="flex items-center">
                    <Check />
                    <div className="flex">
                        <h1 className="text-xl">
                            {t("Notifications.success")} : {status}
                        </h1>
                    </div>
                </div>
            </div>
        ) as React.ReactNode, // Cast to React.ReactNode here
    });
    pushToastList(notificationType, toastId.id);
};
export default SuccessNotification;
