import { useState } from "react";
import { Input, Button, Avatar } from "@chakra-ui/react";
import isNullOrWhitespace from "../utils.ts";

const HomePage = () => {
    const [avatar, setAvatar] = useState(null);
    const [nickname, setNickname] = useState("");

    return (
        <div>
            <h1>ChatPat</h1>

            <div>
                <Avatar
                    size="xl"
                    src={avatar ? URL.createObjectURL(avatar) : null}
                />
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

                        setAvatar(newAvatar);
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
                    }}
                >
                    Join Chat
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
