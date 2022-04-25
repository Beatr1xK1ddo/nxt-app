import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { Icon } from '@nxt-ui/icons';
import { styled } from '@mui/system';
import { EColors } from '@nxt-ui/colors';
import { FC } from 'react';
import { IButtonProps } from './types';

const ButtonContent = styled('div')`
    display: flex;
    align-items: center;
`;

const CustomButtonRoot = styled('button')<IButtonProps>(
    ({ bgColor, iconAfter, iconBefore }) => `
    cursor: pointer;
    position: relative;
    padding: 5px 12px;
    display: inline-flex;
    border: none;
    height: 40px;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font:var(--font);
    font-weight: 500;
    background: ${bgColor || EColors.blue};
    transition: .2s;
    border-radius: 4px;
    // &:after {
    //     content: '';
    //     position: absolute;
    //     background: ${bgColor || EColors.blue};
        
    //     top: 0; bottom: 0;
    //     right: 0; left: 0;
    //     z-index: -1;
    //     transition: .2s;
    // }
    &:hover {
        opacity: .8;
    }
    & svg {
        fill: var(--white);
        margin-left: ${iconAfter && '5px'};
        margin-right: ${iconBefore && '5px'};
    }
`
);

export const Button: FC<IButtonProps> = (props) => {
    const { icon, iconBefore, iconAfter, children, bgColor, ...args  } = props;
    const iconElement = icon && <Icon name={icon} />;

    return (
        <ButtonUnstyled {...args} 
            components={{ Root: CustomButtonRoot }} 
            componentsProps={{ root: { iconBefore, iconAfter, bgColor } }}
        >
            <ButtonContent>
                {iconBefore && iconElement}
                {children}
                {iconAfter && iconElement}
            </ButtonContent>
        </ButtonUnstyled>
    );
};
