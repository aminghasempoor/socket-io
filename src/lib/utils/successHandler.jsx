import Notifications from "@/components/notifications";

export const successRequest = (pushToastList, dismissToastList, response, t, options) => {
    if (options.notification && options.success.notification.show) {
        dismissToastList(["pending", "warning", "error", "success"]);
        Notifications(pushToastList, "success", t, response.status);
    }
};
