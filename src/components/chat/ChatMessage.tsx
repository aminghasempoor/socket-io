import React from "react";

function ChatMessage({ isOwnMessage, sender, message }: { isOwnMessage: boolean; sender: string; message: string }) {
    const isSystemMessage = sender === "system";

    return (
        <div
            className={`flex ${isSystemMessage ? "justify-center" : isOwnMessage ? "justify-end " : "justify-start"} mb-3`}
        >
            <div
                className={`max-w-xs px-4 py-2 rounded-lg ${isSystemMessage ? "text-accent-foreground text-center text-xs" : isOwnMessage ? "text-green-700" : "text-blue-800"}`}
            >
                {!isSystemMessage && <p className="text-sm font-bold text-foreground">{sender}</p>}
                <p className="text-foreground font-bold">{message}</p>
            </div>
        </div>
    );
}

export default ChatMessage;
