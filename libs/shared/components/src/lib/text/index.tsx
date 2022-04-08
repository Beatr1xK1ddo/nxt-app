import styled from '@emotion/styled';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FC } from 'react';

export const TextComponent: FC<TextFieldProps> = styled(TextField)`
    & .MuiOutlinedInput-input {
        padding-top: 14px;
        padding-bottom: 14px;
    }
`;
