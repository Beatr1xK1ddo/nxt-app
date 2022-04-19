import styled from '@emotion/styled';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment, {
    InputAdornmentProps,
} from '@mui/material/InputAdornment';
import { EColors } from '@nxt-ui/colors';
import { FC } from 'react';
import { Icon } from '@nxt-ui/icons';
import { IInputTextProps } from './types';

const TextComponent: FC<TextFieldProps> = styled(TextField)`
    .MuiInput-input {
        height: 40px;
    }
    .MuiInputBase-root {
        font: var(--font);
        color: var(--grey-dark);
    }
    .MuiOutlinedInput-input {
        padding: 11px 15px;
    }
    .MuiInputLabel-formControl {
        font: var(--font);
        color: var(--grey-dark);
        margin-top: auto;
        transform: translate(14px, 11px) scale(1);
        &.MuiFormLabel-filled,
        &.Mui-focused {
            transform: translate(14px, -7px) scale(0.75);
            background: var(--white);
            padding: 0 3px;
        }
    }
`;

const AdornmentComponent: FC<InputAdornmentProps> = styled(InputAdornment)`
    & svg {
        width: 24px;
        height: 24px;
        // fill: ${EColors.greyBorder};
        // cursor: pointer;
    }
`;

export const InputText: FC<IInputTextProps> = (props) => {
    const { icon, onClick, ...args } = props;

    console.log('args', args);

    const adornElement = (
        <AdornmentComponent position="end">
            {icon && <Icon name={icon} />}
        </AdornmentComponent>
    );

    return (
        <TextComponent
            {...args}
            InputProps={{ endAdornment: adornElement }}
        />
    );
};
