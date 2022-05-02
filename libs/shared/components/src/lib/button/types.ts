import {IIconNames} from "@nxt-ui/icons";
import {EColors} from "@nxt-ui/colors";
import {CSSProperties, MouseEventHandler} from "react";

export type IButtonProps = {
    bgColor?: EColors;
    iconBefore?: boolean;
    iconAfter?: boolean;
    icon?: IIconNames;
    style?: CSSProperties;
    onClick?(): void;
    //onClick?(): MouseEventHandler<HTMLButtonElement> | undefined;
};
