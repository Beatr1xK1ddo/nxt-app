import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { Icon } from '@nxt-ui/icons';
import { styled } from '@mui/system';
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
    background: ${bgColor || 'var(--action)'};
    transition: .2s;
    border-radius: 4px;
    &:hover {
        opacity: .8;
    }
    & svg {
        fill: var(--white);
        margin-left: ${iconAfter && '5px'};
        margin-right: ${iconBefore && '5px'};
    }
    &[data-type="btn-icon"] {
        color: var(--action);
        width: 40px;
        padding: 5px;
        background: none;
    }
    &[data-type="btn-border"] {
        color: var(--action);
        background: none;
        border: 3px solid var(--pale-str);
    }
    .counter {
        position: absolute;
        width: 12px;
        height: 12px;
        top: 0;
        right: 0;
        background: var(--grey-black);
        border-radius: 50%;
        font-size: calc(var(--fz) - 7px);
        color: #fff;
        text-align: center;
        line-height: 12px;
    }
`
);

export const Button: FC<IButtonProps> = (props) => {
    const { icon, iconBefore, iconAfter, children, bgColor, ...args } = props;
    const iconElement = icon && <Icon name={icon} />;

    return (
        <ButtonUnstyled
            {...args}
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
