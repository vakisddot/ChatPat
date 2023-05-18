import { useState } from "react";
import { Input, Button, Avatar } from "@chakra-ui/react";
import isNullOrWhitespace from "../utils.ts";
import { useNavigate } from "react-router-dom";
import ParticlesBackground from "../components/ParticlesBackground.jsx";

const HomePage = () => {
    const endpoint = "/api/new-user";

    const [avatarUrl, setAvatarUrl] = useState("");
    const [nickname, setNickname] = useState("");

    const navigate = useNavigate();

    return (
        <div id="homePage">
            <ParticlesBackground />
            <h1>ChatPat</h1>
            <div id="loginForm">
                <Avatar size="xl" src={avatarUrl || null} />
                <br />
                <label htmlFor="inAvatar">Avatar</label>
                <br />
                <div id="inAvatar">
                    <Input
                        size="md"
                        type="file"
                        id="inAvatarFile"
                        onChange={(e) => {
                            const newAvatar = e.target.files[0];

                            if (newAvatar == null) return;

                            setAvatarUrl(URL.createObjectURL(newAvatar));
                        }}
                    />
                    <Input
                        size="md"
                        type="text"
                        id="inAvatarUrl"
                        placeholder="Paste avatar URL"
                        onChange={(e) => {
                            const newAvatar = e.target.value;

                            if (newAvatar == null) return;

                            setAvatarUrl(e.target.value);
                        }}
                    />
                </div>

                <br />

                <label htmlFor="inNickname">Nickname</label>
                <Input
                    placeholder="Nickname"
                    size="md"
                    id="inNickname"
                    onChange={(e) => {
                        setNickname(e.target.value);
                    }}
                />

                <Button
                    colorScheme="teal"
                    onClick={() => {
                        if (isNullOrWhitespace(nickname)) {
                            alert("Invalid nickname!");
                            return;
                        }

                        const newUser = {
                            nickname: nickname,
                            avatarUrl: avatarUrl,
                        };

                        console.log(newUser);

                        fetch(endpoint, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newUser),
                        }).then(navigate("/chat", { state: newUser }));
                    }}
                >
                    Join Chat
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
