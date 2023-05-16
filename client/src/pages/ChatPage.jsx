import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
    const [userData, setUserData] = useState("");

    const fetchData = async () => {
        const endpoint = "/api/temp";
        const data = await axios.get(endpoint);

        console.log(data.data);
        setUserData(data.data);
    };

    useEffect(() => {
        fetchData();
    });

    return (
        <div>
            <p>This is where the chat will be displayed eventually</p>

            {userData ? (
                <ul>
                    <li>{userData.name}</li>
                    <li>{userData.age}</li>
                </ul>
            ) : (
                <span>No userdata found</span>
            )}
        </div>
    );
};

export default ChatPage;
