import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input, Button } from "@chakra-ui/react";
import ChatMessage from "../components/ChatMessage";
import isNullOrWhitespace from "../utils.ts";

const ChatPage = () => {
    const { state } = useLocation();
    const { nickname, avatarUrl } = state || { nickname: "", avatarUrl: "" };
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        "Hello",
        "How are you?",
        "I'm fine, thanks.",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "Hello",
        "How are you?",
        "I'm fine, thanks.",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "Hello",
        "How are you?",
        "I'm fine, thanks.",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "Hello",
        "How are you?",
        "I'm fine, thanks.",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "Hello",
        "How are you?",
        "I'm fine, thanks.",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "Hello",
        "How are you?",
        "I'm fine, thanks.",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "Hello",
        "How are you?",
        "I'm fine, thanks.",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "Hello",
        "How are you?",
        "I'm fine, thanks.",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    ]);

    return (
        <div id="chatPage">
            <ul id="chatContainer">
                {messages.map((message) => (
                    <ChatMessage
                        className="chatMessage"
                        nickname={nickname}
                        message={message}
                        avatarUrl={avatarUrl}
                    />
                ))}
            </ul>

            <div id="chatInput">
                <Input
                    placeholder="Enter a message"
                    size="md"
                    id="inChat"
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                <Button
                    colorScheme="purple"
                    onClick={() => {
                        if (isNullOrWhitespace(message)) {
                            alert("Invalid message!");
                            return;
                        }
                        // const newUser = {
                        //     nickname: nickname,
                        //     avatarUrl: avatarUrl,
                        // };
                        // console.log(newUser);
                        // fetch(endpoint, {
                        //     method: "POST",
                        //     headers: {
                        //         "Content-Type": "application/json",
                        //     },
                        //     body: JSON.stringify(newUser),
                        // }).then(navigate("/chat", { state: newUser }));
                    }}
                >
                    Send
                </Button>
            </div>
        </div>
    );
};

export default ChatPage;
