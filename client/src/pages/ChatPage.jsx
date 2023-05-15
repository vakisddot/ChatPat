import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
    const [userData, setUserData] = useState("");

    const fetchData = async () => {
        const endpoint = "/api/temp";
        const data = await axios.get(endpoint);

        console.log(data);
        setUserData(data);
    };

    useEffect(() => {
        fetchData();
    });

    return (
        <div>
            <p>This is where the chat will be displayed eventually</p>

            <ul>
                <li>{userData.data.name}</li>
                <li>{userData.data.age}</li>
            </ul>
        </div>
    );
};

export default ChatPage;
