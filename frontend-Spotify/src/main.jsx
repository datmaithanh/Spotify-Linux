import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import PlayerContextProvider from "./context/PlayerContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={"192020305894-iucse0efj9ln05pf995i3et1352nk6j1.apps.googleusercontent.com"}>
            <BrowserRouter>
                <PlayerContextProvider>
                    <App />
                </PlayerContextProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
