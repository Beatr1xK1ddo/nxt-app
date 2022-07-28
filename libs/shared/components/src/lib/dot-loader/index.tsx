import {FC, useEffect, useState} from "react";

// import clsx from "clsx";
// import "./index.css";

export const NxDotLoader: FC = () => {
    const [text, set] = useState<string>("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (text.length >= 3) {
                set(".");
            } else {
                set((prev) => prev + ".");
            }
        }, 400);

        return () => {
            clearInterval(intervalId);
        };
    });

    return <div style={{width: 12}}>{text}</div>;
};
