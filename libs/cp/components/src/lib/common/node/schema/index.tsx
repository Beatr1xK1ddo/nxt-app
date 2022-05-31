import {FC} from "react";

import {TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {IPort} from "./types";

import "./index.css";

interface INodeSchema {
    inputsImgs: IPort[];
    className?: string;
}

export const NodeSchema: FC<INodeSchema> = ({inputsImgs, className}) => {
    return (
        <ul className={className ? `${className} signal-box` : "signal-box"}>
            {inputsImgs.map((inputsImg) => (
                <TooltipComponent arrow title={inputsImg.portAlert}>
                    <li key={inputsImg.id}>
                        {inputsImg.status === "available" ? (
                            <Icon className="available" name="port1" />
                        ) : inputsImg.status === "free" ? (
                            <Icon className="free" name="port" />
                        ) : inputsImg.status === "neutral" ? (
                            <Icon name="port" />
                        ) : inputsImg.status === "unavailable" ? (
                            <span className="port-unavailable"></span>
                        ) : (
                            <Icon name="input" />
                        )}
                        <p>{inputsImg.id}</p>
                    </li>
                </TooltipComponent>
            ))}
        </ul>
    );
};
