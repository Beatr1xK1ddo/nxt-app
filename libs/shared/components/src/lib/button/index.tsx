import ButtonUnstyled, {buttonUnstyledClasses} from '@mui/base/ButtonUnstyled';
import { Icon } from '@nxt-ui/icons';
import { styled } from '@mui/system';
import { EColors } from '@nxt-ui/colors';
import { FC } from 'react';
import { IButtonProps } from './types';

console.log(buttonUnstyledClasses)

const ButtonContent = styled('div')`
    display: flex;
    align-items: center;
`;

const CustomButtonRoot = styled('div')<IButtonProps>(({ bgColor, iconAfter, iconBefore }) => `
    cursor: pointer;
    position: relative;
    padding: 11px;
    display: inline-block;
    color: ${EColors.white};

    &:after {
        content: '';
        position: absolute;
        background: ${bgColor || EColors.blue};
        border-radius: 4px;
        top: 0; bottom: 0;
        right: 0; left: 0;
        z-index: -1;
        transition: .2s;
    }

    &:hover:after {
        opacity: .8;
    }

    & svg {
        fill: ${EColors.white};
        margin-left: ${iconAfter && '5px'};
        margin-right: ${iconBefore && '5px'};
    }
`)

export const Button: FC<IButtonProps> = (props) => {
    const {icon, iconBefore, iconAfter, children} = props
    const iconElement = icon && <Icon name={icon} />

    return (
        <ButtonUnstyled 
            {...props}
            components={{Root: CustomButtonRoot}}
        >
            <ButtonContent>
                {iconBefore && iconElement}
                {children}
                {iconAfter && iconElement}
            </ButtonContent>
        </ButtonUnstyled>
    )
}