import styled from '@emotion/styled';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment, {InputAdornmentProps} from '@mui/material/InputAdornment';
import { EColors } from '@nxt-ui/colors';
import { FC } from 'react';
import { Icon } from '@nxt-ui/icons';
import { IInputTextProps } from './types';

const TextComponent: FC<TextFieldProps> = styled(TextField)`
    & .MuiOutlinedInput-input {
        padding-top: 8px;
        padding-bottom: 9px;
    }

    & .MuiInputLabel-root {
        top: -3px;
        font-size: .7rem;
    }

    & .MuiInputLabel-root.Mui-focused {
        color: ${EColors.greyBorder};
    }

    & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border: 2px solid ${EColors.greyBorder};
    }
`;

const AdornmentComponent: FC<InputAdornmentProps> = styled(InputAdornment)`
    & svg {
        width: 24px;
        height: 24px;
        fill: ${EColors.greyBorder};
        cursor: pointer;
    }
    & svg:hover {
        fill: ${EColors.black};
    }
`

export const InputText: FC<IInputTextProps> = (props) => {
    const {defaultProps, icon} = props;

    const adornElement = (
        <AdornmentComponent position="end">
            {icon && <Icon name={icon} /> }
        </AdornmentComponent>
    )

    return (
        <TextComponent 
            {...defaultProps} 
            InputProps={{ endAdornment: adornElement }}
        />
    )
}