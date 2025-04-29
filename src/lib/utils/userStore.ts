"use client";
import { create } from "zustand";
import axios from "axios";
import { GET_USER_ROUTE } from "@/lib/utils/apiRoutes";

interface UserStoreState {
    isAuth: boolean;
    errorState: boolean;
    userChangedLanguage: boolean;
    initAuthState: boolean;
    token: string | null;
    user: Record<string, string>;
    clearUser: () => void;
    changeUser: (user: Record<string, string>) => void;
    changeUserLanguage: (language: string) => void;
    changeAuthState: (isAuth: boolean) => void;
    changeInitAuth: (initAuthState: boolean) => void;
    changeLanguageState: (userChangedLanguage: boolean) => void;
    clearToken: () => void;
    setToken: (token: string) => void;
    getUser: () => Promise<void>;
    initialize: () => Promise<void>;
}

const useUserStore = create<UserStoreState>((set, get) => ({
    isAuth: false,
    userChangedLanguage: false,
    initAuthState: false,
    errorState: false,
    token: null,
    user: {},

    clearUser: () => set({ user: {} }),

    changeUser: (user: Record<string, string>) => set({ user }),

    changeUserLanguage: (language: string) =>
        set((state) => ({
            user: { ...state.user, user_language: language },
        })),

    changeAuthState: (isAuth: boolean) => set({ isAuth }),

    changeInitAuth: (initAuthState: boolean) => set({ initAuthState }),

    changeLanguageState: (userChangedLanguage: boolean) => set({ userChangedLanguage }),

    clearToken: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("_token");
        }
        set({ token: null });
        set({ initAuthState: true });
    },

    setToken: (token: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("_token", token);
        }
        set({ token });
        set({ initAuthState: true });
    },

    logout: () => {
        get().clearUser();
        get().changeAuthState(false);
        get().changeInitAuth(true);
        get().clearToken();
    },

    getUser: async () => {
        const token = get().token;
        try {
            const { data } = await axios.get(GET_USER_ROUTE, {
                headers: { authorization: `Bearer ${token}` },
            });
            set({ user: data, isAuth: true, initAuthState: true, errorState: false });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    get().clearToken();
                }
            }
            set({
                isAuth: true,
                initAuthState: true,
                errorState: true,
            });
        }
    },

    initialize: async () => {
        if (typeof window === "undefined") return;

        const token = localStorage.getItem("_token");
        if (token) {
            set({ token });
            await get().getUser();
        } else {
            get().clearUser();
            get().changeAuthState(false);
            get().changeInitAuth(true);
            get().changeLanguageState(false);
        }
    },
}));

export default useUserStore;
