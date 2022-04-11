import { IIconNames } from '@nxt-ui/icons';
import { EColors } from '@nxt-ui/colors';
import {ButtonUnstyledProps} from '@mui/base/ButtonUnstyled';
import { CSSProperties } from 'react';

export type IButtonProps =  {
    default?: ButtonUnstyledProps;
    bgColor?: EColors;
    iconBefore?: boolean;
    iconAfter?: boolean;
    icon?: IIconNames;
    style?: CSSProperties;
}