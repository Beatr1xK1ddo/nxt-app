import {IIconNames} from "@nxt-ui/icons";
import {EColors} from "@nxt-ui/colors";
import {CSSProperties, MutableRefObject} from "react";

export type IButtonProps = {
    bgcolor?: EColors;
    iconbefore?: boolean;
    iconafter?: boolean;
    icon?: IIconNames;
    style?: CSSProperties;
    btnRef?: MutableRefObject<HTMLDivElement | null>;
    onClick?(): void;
};
