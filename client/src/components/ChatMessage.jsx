import { Avatar } from "@chakra-ui/react";

const ChatMessage = ({ nickname, message, avatarUrl, timestamp }) => {
    return (
        <div className="chatMessage">
            <Avatar id="avatar" size="md" src={avatarUrl || null} />
            <div id="content">
                <p id="nickname">
                    @{nickname} <span id="timestamp">{timestamp}</span>
                </p>
                <p id="message">{message}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
