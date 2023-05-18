import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Input, Button } from "@chakra-ui/react";
import ChatMessage from "../components/ChatMessage";

const ChatPage = () => {
    const endpoint = "/api/all-messages";

    // States
    const { state } = useLocation();
    const [currMessage, setCurrMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ws = useRef(null);

    useEffect(() => {
        fetch(endpoint)
            .then((res) => {
                return res.json();
            })
            .then((messages) => {
                console.log(messages);
                setMessages(messages);
            });

        ws.current = new WebSocket("ws://localhost:3002");

        ws.current.addEventListener("open", () => {
            console.log("Connected to the WSS!");
        });

        ws.current.addEventListener("message", (e) => {
            const parsedMessage = JSON.parse(e.data);
            console.log(`New message received! Data: ${e.data}`);
            setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        });
    }, []);

    const sendMessage = () => {
        const newMsg = {
            message: currMessage,
            sentBy: state,
        };

        try {
            ws.current.send(JSON.stringify(newMsg));
        } catch (err) {
            console.log(err);
        }
        setCurrMessage("");
    };

    // Rendering
    return (
        <div id="chatPage">
            <div id="chatContainer">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <ChatMessage
                            className="chatMessage"
                            nickname={msg.sentBy.nickname}
                            message={msg.message}
                            avatarUrl={msg.sentBy.avatarUrl}
                            key={msg._id}
                        />
                    ))
                ) : (
                    <h2>No messages to display :/</h2>
                )}
                <div id="anchor"></div>
            </div>

            <div id="chatInput">
                <Input
                    placeholder="Enter a message"
                    size="md"
                    id="inChat"
                    value={currMessage}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                    onChange={(e) => {
                        setCurrMessage(e.target.value);
                    }}
                />
                <Button
                    colorScheme="purple"
                    onClick={() => {
                        sendMessage();
                    }}
                >
                    Send
                </Button>
            </div>
        </div>
    );
};

export default ChatPage;
