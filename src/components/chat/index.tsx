"use client";
import { Action, State } from "@/lib/utils/types";
import React, { useReducer } from "react";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { Button } from "../ui/button";
const initialState: State = {
    room: "",
    joined: false,
    message: [],
    userName: "",
};
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_ROOM":
            return { ...state, room: action.payload };
        case "SET_JOINED":
            return { ...state, joined: action.payload };
        case "SET_MESSAGE":
            return { ...state, message: action.payload };
        case "SET_USERNAME":
            return { ...state, userName: action.payload };
        default:
            return state;
    }
}

function ChatComponent() {
    // @typescript-eslint/no-unused-vars
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div>
            <div className="w-full max-w-3xl mx-auto">
                <div className="h-[500px] overflow-y-auto p-4 mb-4 border-2 rounded-lg bg-foreground/10">
                    {state.message.map((msg, index) => {
                        return (
                            <ChatMessage
                                key={index}
                                sender={msg.sender}
                                message={msg.message}
                                isOwnMessage={msg.sender === state.userName}
                            />
                        );
                    })}
                </div>
                <ChatForm />
                <Button onClick={() => dispatch({ type: "SET_USERNAME", payload: "amin" })}>Hello</Button>
            </div>
        </div>
    );
}

export default ChatComponent;
