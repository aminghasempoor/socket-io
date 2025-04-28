import React from "react";

function ChatMessage({ isOwnMessage, sender, message }: { isOwnMessage: boolean; sender: string; message: string }) {
    const isSystemMessage = sender === "system";
    return (
        <div
            className={`flex ${isSystemMessage ? "justify-center" : isOwnMessage ? "justify-end " : "justify-start"} mb-3`}
        >
            <div
                className={`max-w-xs px-4 py-2 rounded-lg ${isSystemMessage ? "bg-foreground text-accent-foreground text-center text-xs" : isOwnMessage ? "text-green-700" : "text-blue-800"}`}
            >
                {!isSystemMessage && <p className="text-sm font-bold">{sender}</p>}
                <p>{message}</p>
            </div>
            ChatMessage
        </div>
    );
}

export default ChatMessage;
