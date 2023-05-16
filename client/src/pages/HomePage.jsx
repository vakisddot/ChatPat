import { useState } from "react";
import { Input, Button, Avatar } from "@chakra-ui/react";
import isNullOrWhitespace from "../utils.ts";

const HomePage = () => {
    const endpoint = "/api/new-user";

    const [avatarUrl, setAvatarUrl] = useState("");
    const [nickname, setNickname] = useState("");

    return (
        <div>
            <h1>ChatPat</h1>

            <div>
                <Avatar size="xl" src={avatarUrl || null} />
                <br />
                <label htmlFor="inAvatar">Avatar</label>
                <br />
                <Input
                    size="md"
                    type="file"
                    id="inAvatar"
                    onChange={(e) => {
                        const newAvatar = e.target.files[0];

                        if (newAvatar == null) return;

                        setAvatarUrl(URL.createObjectURL(newAvatar));
                    }}
                />
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
                    colorScheme="blue"
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
                        })
                            .then((res) => console.log(res))
                            .catch((err) => console.log(err.message));
                    }}
                >
                    Join Chat
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
