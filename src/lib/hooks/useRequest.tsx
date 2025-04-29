"use client";
import axios from "axios";
import Notifications from "@/components/notifications";
import { successRequest } from "@/lib/utils/successHandler";
import { errorRequest, errorResponse, errorSetting } from "@/lib/utils/errorHandler";
import { useTranslations } from "next-intl";
import useUserStore from "@/lib/utils/userStore";
import ToastStore from "@/lib/utils/ToastStore";

interface RequestOptions {
    auth?: boolean;
    data?: Record<string, string> | FormData;
    requestOptions?: {
        headers?: Record<string, string>;
    };
    notification?: boolean;
    pending?: boolean;
    success?: {
        notification: {
            show: boolean;
        };
    };
    failed?: {
        notification: {
            show: boolean;
        };
    };
}

const defaultOptions: RequestOptions = {
    auth: false,
    data: {},
    requestOptions: {
        headers: {},
    },
    notification: true,
    pending: true,
    success: {
        notification: {
            show: true,
        },
    },
    failed: {
        notification: {
            show: true,
        },
    },
};

const useRequest = (initOptions: RequestOptions) => {
    const t = useTranslations();
    const { token, clearToken } = useUserStore();
    const { pushToastList, dismissToastList } = ToastStore();

    // Merge options with default options
    let _options = { ...defaultOptions, ...initOptions };

    function requestServer(url: string, method: string = "get", options?: RequestOptions) {
        _options = { ..._options, ...options };

        if (_options.auth) {
            const isFormData = _options.data instanceof FormData;
            _options = {
                ..._options,
                requestOptions: {
                    ...(_options.requestOptions || {}),
                    headers: {
                        ...(_options.requestOptions?.headers || {}),
                        ...(isFormData ? {} : { "Content-Type": "application/json" }), // فقط اگه FormData نیست
                        authorization: `Bearer ${token}`,
                    },
                },
            };
        }

        return new Promise((resolve) => {
            if (
                (_options.notification ?? true) &&
                (_options.failed?.notification?.show ?? true) &&
                (_options.pending ?? true)
            ) {
                dismissToastList(["pending", "warning", "error", "success"]);
                Notifications(pushToastList, "pending", t);
            }

            axios({
                url: url,
                method: method,
                data: _options.data,
                ..._options.requestOptions,
            })
                .then((response) => {
                    successRequest(pushToastList, dismissToastList, response, t, _options);
                    resolve(response);
                })
                .catch((error) => {
                    if (error.response) {
                        errorResponse(
                            pushToastList,
                            dismissToastList,
                            error.response,
                            clearToken,
                            t,
                            (_options.notification ?? true) && (_options.failed?.notification?.show ?? true)
                        );
                    } else if (error.request) {
                        errorRequest(
                            dismissToastList,
                            t,
                            (_options.notification ?? true) && (_options.failed?.notification?.show ?? true)
                        );
                    } else {
                        errorSetting(
                            dismissToastList,
                            t,
                            (_options.notification ?? true) && (_options.failed?.notification?.show ?? true)
                        );
                    }
                });
        });
    }

    return requestServer;
};

export default useRequest;
