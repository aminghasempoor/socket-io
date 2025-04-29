"use client";
import { Action, State } from "@/lib/utils/types";
import React, { useEffect, useReducer } from "react";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { socket } from "@/lib/socketClient";
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
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        socket.on("user_joined", (data) => {
            console.log(data);
            dispatch({ type: "SET_MESSAGE", payload: [...state.message, { sender: "system", message: data }] });
        });
        return () => {
            socket.off("user_joined");
            socket.off("message");
        };
    }, [state.message]);
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
            </div>
        </div>
    );
}

export default ChatComponent;
