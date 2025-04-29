"use client";
import { Action, State } from "@/lib/utils/types";
import React, { useEffect, useReducer } from "react";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { socket } from "@/lib/socketClient";
import useUserStore from "@/lib/utils/userStore";

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
    const { user } = useUserStore();
    const initialState: State = {
        room: "2",
        joined: user.id ? true : false,
        message: [],
        userName: user.name || "",
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        handleJoinRoom();
        socket.on("chat_message", (data) => {
            console.log("chat_message", data);
            dispatch({ type: "SET_MESSAGE", payload: [...state.message, data] });
        });
        socket.on("user_joined", (msg) => {
            console.log("user_joined", msg);
            dispatch({ type: "SET_MESSAGE", payload: [...state.message, { sender: "system", message: msg }] });
        });
        return () => {
            socket.off("user_joined");
            socket.off("chat_message");
        };
    }, []);

    const handleJoinRoom = () => {
        if (user) {
            socket.emit("join-room", state.room, state.userName);
        }
    };

    const handleSendMessage = (value: string) => {
        const data = { sender: state.userName, message: value };
        dispatch({ type: "SET_MESSAGE", payload: [...state.message, data] });
        socket.on("chat_message", (data) => {
            console.log("chat_message", data);
            dispatch({ type: "SET_MESSAGE", payload: [...state.message, data] });
        });
        socket.emit("chat_message", state.room, value, state.userName);
    };
    console.log(state.message);

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
                <ChatForm handleSendMessage={handleSendMessage} />
            </div>
        </div>
    );
}

export default ChatComponent;
