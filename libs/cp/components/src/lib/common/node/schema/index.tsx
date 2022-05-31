import {Children, FC} from "react";

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
                        {inputsImg.content}
                        <p>{inputsImg.id}</p>
                    </li>
                </TooltipComponent>
            ))}
            {/* <li>
                <em className="port"></em>
            </li>
            <li>
                <Icon className="input-digital" name="input" />
            </li>
            <li>
                <Icon className="input-digital" name="input" />
            </li>
            <TooltipComponent arrow title="1080i59.94, No signal and Taken ">
                <li className="input-error">
                    <Icon className="input-digital" name="input" />
                    <Icon className="icon-error" style={{color: "var(--danger)"}} name="attention" />
                </li>
            </TooltipComponent> */}
        </ul>
    );
};
