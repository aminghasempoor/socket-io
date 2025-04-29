import SuccessNotification from "./SuccessNotification";
import ErrorNotification from "./ErrorNotification";
import PendingNotification from "./PendingNotification";
import WarningNotification from "./WarningNotification";
type ToastType = "pending" | "error" | "warning" | "success";
const Notifications = (
    pushToastList: (toast_type: ToastType, toast_id: string) => void,
    notificationType: "pending" | "warning" | "error" | "success",
    t: (key: string) => string,
    status?: number,
    message?: string
): void => {
    switch (notificationType) {
        case "pending":
            PendingNotification(pushToastList, notificationType, t);
            break;
        case "warning":
            WarningNotification(pushToastList, notificationType, t, status);
            break;
        case "error":
            if (message) {
                ErrorNotification(pushToastList, notificationType, t, status, message);
            } else {
                ErrorNotification(pushToastList, notificationType, t, status);
            }
            break;
        case "success":
            SuccessNotification(pushToastList, notificationType, t, status);
            break;
    }
};

export default Notifications;
