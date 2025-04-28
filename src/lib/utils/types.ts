import { z } from "zod";
import { chatFormSchema, loginFormSchema } from "@/lib/utils/schemas";

export type LoginFormType = z.infer<ReturnType<typeof loginFormSchema>>;

export type ChatFormType = z.infer<ReturnType<typeof chatFormSchema>>;

export type State = {
    room: string;
    joined: boolean;
    message: { sender: string; message: string }[];
    userName: string;
};

export type Action =
    | { type: "SET_ROOM"; payload: string }
    | { type: "SET_JOINED"; payload: boolean }
    | { type: "SET_MESSAGE"; payload: { sender: string; message: string }[] }
    | { type: "SET_USERNAME"; payload: string };
