import React, { useEffect, useState } from "react";
import { Avatar } from "@chakra-ui/react";

const ChatMessage = ({ nickname, message, avatarUrl }) => {
    return (
        <div className="chatMessage">
            <Avatar id="avatar" size="md" src={avatarUrl || null} />
            <div id="content">
                <p id="nickname">@{nickname}</p>
                <p id="message">{message}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
