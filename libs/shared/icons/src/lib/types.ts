import {SvgIconProps} from "@mui/material/SvgIcon";
import {SVGAttributes, CSSProperties} from "react";
import * as icons from "./icon-list";
import {EColors} from "@nxt-ui/colors";

export type IIconNames = keyof typeof icons;

export type IIconProps = SvgIconProps & {
    name: IIconNames;
    color?: EColors;
    style?: CSSProperties;
} & SVGAttributes<SVGSVGElement>;
