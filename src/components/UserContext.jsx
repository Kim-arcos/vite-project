import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    const handleLogin = (token, username) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUsername("");
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, username, handleLogin, handleLogout, setIsLoggedIn, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;