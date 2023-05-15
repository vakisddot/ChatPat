import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Button } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" Component={HomePage}></Route>
                <Route path="/chat" Component={ChatPage}></Route>
            </Routes>
            <ul type="none">
                <li>Hello</li>
                <li>World</li>
            </ul>

            <Button colorScheme="blue">Click on me!</Button>
        </div>
    );
}

export default App;
