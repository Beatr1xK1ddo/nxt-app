import { SVGAttributes, CSSProperties } from 'react';
import * as icons from './icon-list';
import { EColors } from '@nxt-ui/colors';

export type IIconNames = keyof typeof icons;

export type IIconProps = {
    name: IIconNames;
    color?: EColors;
    style?: CSSProperties;
} & SVGAttributes<SVGSVGElement>;
