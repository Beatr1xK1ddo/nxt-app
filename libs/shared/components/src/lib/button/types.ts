import {IIconNames} from "@nxt-ui/icons";
import {EColors} from "@nxt-ui/colors";
import {CSSProperties, MouseEventHandler, MutableRefObject} from "react";
import {ButtonUnstyledProps} from "@mui/base/ButtonUnstyled";

export interface IButtonProps extends ButtonUnstyledProps {
    bgcolor?: EColors;
    iconbefore?: boolean;
    iconafter?: boolean;
    icon?: IIconNames;
    style?: CSSProperties;
    btnRef?: MutableRefObject<HTMLDivElement | null>;
    onClick?: MouseEventHandler;
    disabled?: boolean;
}
