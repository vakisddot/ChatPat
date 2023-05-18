import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Input, Button } from "@chakra-ui/react";
import ChatMessage from "../components/ChatMessage";
import config from "../config";
import ParticlesBackground from "../components/ParticlesBackground";

const ChatPage = () => {
    const endpoint = "/api/all-messages";

    // States
    const { state } = useLocation();
    const [currMessage, setCurrMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ws = useRef(null);

    // Get all messages that were sent before
    useEffect(() => {
        fetch(endpoint)
            .then((res) => {
                return res.json();
            })
            .then((messages) => {
                console.log(messages);
                setMessages(messages);
            });
    }, []);

    // WSS
    useEffect(() => {
        ws.current = new WebSocket(`ws://${config.wssHost}:${config.wssPort}`);

        ws.current.addEventListener("open", () => {
            console.log("Connected to the WSS!");
        });

        ws.current.addEventListener("message", (e) => {
            const parsedMessage = JSON.parse(e.data);
            console.log(`New message received! Data: ${e.data}`);
            setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        });

        return () => {
            ws.current.close();
        };
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
                            timestamp={
                                msg.createdAt
                                    ? msg.createdAt
                                          .slice(0, -5)
                                          .split("T")
                                          .join(" ")
                                    : null
                            }
                            key={msg._id}
                        />
                    ))
                ) : (
                    <h2>No messages to display :/</h2>
                )}
                <div id="anchor" />
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
                    colorScheme="teal"
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
