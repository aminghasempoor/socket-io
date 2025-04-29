import Notifications from "@/components/notifications";

type ToastType = "pending" | "error" | "warning" | "success";

interface ApiResponse {
    status: number;
    data?: {
        message?: string | string[];
        errors?: Record<string, string[]>;
        type?: string;
    };
}

type TranslationFunction = (key: string) => string;

type DismissToastFunction = (toast_types: ToastType[]) => void;
type PushToastFunction = (type: ToastType, message: string) => void;
type ClearTokenFunction = () => void;

export const errorSetting = (
    dismissToastList: DismissToastFunction,
    t: TranslationFunction,
    notification: boolean
): void => {
    if (notification) {
        dismissToastList(["pending", "warning", "error", "success"]);
    }
};

export const errorRequest = (
    dismissToastList: DismissToastFunction,
    t: TranslationFunction,
    notification: boolean
): void => {
    if (notification) {
        dismissToastList(["pending", "warning", "error", "success"]);
    }
};

export const errorResponse = (
    pushToastList: PushToastFunction,
    dismissToastList: DismissToastFunction,
    response: ApiResponse,
    clearToken: ClearTokenFunction,
    t: TranslationFunction,
    notification: boolean
): void => {
    if (notification) {
        dismissToastList(["pending", "warning", "error", "success"]);
    }

    if (isServerError(response.status)) {
        errorServer(pushToastList, response, t, notification);
    } else if (isClientError(response.status)) {
        errorClient(pushToastList, response, clearToken, t, notification);
    }
};

const errorServer = (
    pushToastList: PushToastFunction,
    response: ApiResponse,
    t: TranslationFunction,
    notification: boolean
): void => {
    if (notification) Notifications(pushToastList, "warning", t, response.status);
};

const errorClient = (
    pushToastList: PushToastFunction,
    response: ApiResponse,
    clearToken: ClearTokenFunction,
    t: TranslationFunction,
    notification: boolean
): void => {
    switch (response.status) {
        case 401:
            clearToken();
            if (notification) Notifications(pushToastList, "error", t, response.status);
            break;
        case 422:
            if (response.data?.message) {
                Notifications(pushToastList, "error", t, response.status, response.data.message as string);
                break;
            }
            errorValidation(pushToastList, response, t, notification);
            break;
        case 429:
            if (notification) Notifications(pushToastList, "error", t, response.status);
            break;
        default:
            if (notification) Notifications(pushToastList, "error", t, response.status);
            break;
    }
};

const isServerError = (status: number): boolean => status >= 500 && status <= 599;
const isClientError = (status: number): boolean => status >= 400 && status <= 499;

// const errorLogic = (
//     pushToastList: PushToastFunction,
//     response: ApiResponse,
//     t: TranslationFunction,
//     notification: boolean
// ): void => {
//     if (notification && response.data?.message) {
//         if (Array.isArray(response.data.message)) {
//             response.data.message.forEach((item) => {
//                 Notifications(pushToastList, "error", t, response.status, item);
//             });
//         } else {
//             Notifications(pushToastList, "error", t, response.status, response.data.message);
//         }
//     }
// };

const errorValidation = (
    pushToastList: PushToastFunction,
    response: ApiResponse,
    t: TranslationFunction,
    notification: boolean
): void => {
    if (notification && response.data?.errors) {
        Object.keys(response.data.errors).forEach((key) => {
            const errorMessage = response.data?.errors?.[key]?.[0] ?? "";
            if (errorMessage) {
                Notifications(pushToastList, "error", t, response.status, errorMessage);
            }
        });
    }
};
