import {Children, FC} from "react";

import {TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {IPost} from "@nxt-ui/cp/types";

import "./index.css";

interface INodeSchema {
    inputsImgs: IPost[];
    className?: string;
}

export const NodeSchema: FC<INodeSchema> = ({inputsImgs, className}) => {
    return (
        <ul className={className ? `${className} signal-box` : "signal-box"}>
            {inputsImgs.map((inputsImg) => (
                <li key={inputsImg.id}>{inputsImg.content}</li>
            ))}
            <li className="input-ok">
                <Icon className="input-digital" name="input6" />
            </li>
            <li className="input-ok">
                <Icon className="input-digital" name="input" />
            </li>
            <li>
                <Icon className="input-digital" name="input" />
            </li>
            <TooltipComponent title="1080i59.94, No signal and Taken ">
                <li className="input-error">
                    <Icon className="input-digital" name="input" />
                    <Icon className="icon-error" style={{color: "var(--danger)"}} name="attention" />
                </li>
            </TooltipComponent>
        </ul>
    );
};
