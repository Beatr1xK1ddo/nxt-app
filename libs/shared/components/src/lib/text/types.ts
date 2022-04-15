import { TextFieldProps } from '@mui/material/TextField/TextField';
import { IIconNames } from '@nxt-ui/icons';
import { FormEvent } from 'react';

export type IInputTextProps = TextFieldProps & {
    icon?: IIconNames;
    onClick?(e: FormEvent<HTMLInputElement>): void;
};
