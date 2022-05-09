import {FC} from "react";
import {Button, TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {SignalBoxProps} from "./types";
import "./signal-box.css";

export const SignalBox: FC<SignalBoxProps> = (props) => {
    const {children, ...other} = props;
    return (
        <ul className="signal-box">
            <li>
                <Icon name="input1" />
            </li>
            <li>
                <Icon name="input2" />
            </li>
            <li>
                <Icon name="input3" />
            </li>
            <li>
                <Icon name="input4" />
            </li>
            <li>
                <Icon name="input5" />
            </li>
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
                    <Icon
                        className="icon-error"
                        style={{color: "var(--danger)"}}
                        name="attention"
                    />
                </li>
            </TooltipComponent>
        </ul>
    );
};
