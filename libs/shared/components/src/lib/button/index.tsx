import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { FC } from 'react';
import { IButtonComponentProps } from './types';

export const Btn: FC<ButtonProps> = styled(Button)();

export const ButtonComponent: FC<IButtonComponentProps> = (props) => {
    const { label, ...args } = props;

    return (
        <Btn variant="contained" disableElevation {...args} >
            {label}
        </Btn>
    );
};
