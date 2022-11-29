import React from "react";
import {Icon} from "@nxt-ui/icons";

export const InitializationScreen = () => (
    <div
        style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
        }}>
        <div style={{margin: "auto", paddingBottom: "5rem"}}>
            <Icon name="logo" width={"30rem"} height={"5rem"} />
        </div>
    </div>
);
