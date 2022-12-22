import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import {Icon} from "@nxt-ui/icons";
import {styled} from "@mui/system";
import {FC} from "react";
import {IButtonProps} from "./types";
import {EColors} from "@nxt-ui/colors";

const ButtonContent = styled("span")`
    display: flex;
    align-items: center;
`;
const CustomButtonRoot = styled("button")<{
    bgcolor?: EColors;
    iconafter?: string;
    iconbefore?: string;
    disabled?: boolean;
}>(
    ({bgcolor, iconafter, iconbefore, disabled}) => `
    cursor: pointer;
    position: relative;
    padding: 0.3125rem 0.75rem;
    display: inline-flex;
    border: none;
    height: 2.5rem;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font:var(--font);
    font-size: var(--fz);
    font-weight: 500;
    background: ${bgcolor || "var(--action)"};
    transition: .2s;
    border-radius: 0.25rem;
    flex-shrink: 0;
    &:hover {
        opacity: .8;
    }
    &.Mui-disabled {
        opacity: 0.5;
        pointer-evetns: none;
    }
    & svg {
        fill: var(--white);
        margin-left: ${iconafter === "true" && "0.3125rem"};
        margin-right: ${iconbefore === "true" && "0.3125rem"};
    }
    &[data-type="no-bg"] {
        width: auto;
        color: var(--action);
        padding: 0;
        background: none;
    }
    &[data-type="btn-icon"] {
        color: var(--action);
        width: 2.5rem;
        padding: 0.3125rem;
        background: none;
    }
    &[data-type="btn-border"] {
        color: var(--action);
        background: none;
        border: 0.1875rem solid var(--pale-str);
    }
    &[data-type="btn-gray"] {
        color: var(--blacked);
        background: var(--grey);
        opacity:  ${disabled ? 0.5 : 1};
        &:hover {
            background: var(--grey-light: #c6cacc);
            border:none;
        }
    }
    &[data-type="btn-green"] {
        background: var(--ok);
    }
    .counter {
        position: absolute;
        width: 0.75rem;
        height: 0.75rem;
        top: 0;
        right: 0;
        background: var(--grey-black);
        border-radius: 50%;
        font-size: calc(var(--fz) - 0.4375rem);
        color: #fff;
        text-align: center;
        line-height: 0.75rem;
    }
`
);

export const Button: FC<IButtonProps> = (props) => {
    const {icon, iconbefore, iconafter, children, bgcolor, btnRef, onClick, disabled, ...args} = props;
    const iconElement = icon && <Icon name={icon} />;

    return (
        <ButtonUnstyled
            ref={btnRef}
            {...args}
            onClick={onClick}
            disabled={disabled}
            components={{Root: CustomButtonRoot}}
            // @ts-ignore
            componentsProps={{root: {iconbefore: iconbefore?.toString(), iconafter: iconafter?.toString(), bgcolor}}}>
            <ButtonContent>
                {iconbefore && iconElement}
                {children}
                {iconafter && iconElement}
            </ButtonContent>
        </ButtonUnstyled>
    );
};
