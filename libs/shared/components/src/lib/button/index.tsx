import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import {Icon} from "@nxt-ui/icons";
import {styled} from "@mui/system";
import {FC} from "react";
import {IButtonProps} from "./types";
import {EColors} from "@nxt-ui/colors";

const ButtonContent = styled("div")`
    display: flex;
    align-items: center;
`;
const CustomButtonRoot = styled("button")<{bgcolor?: EColors; iconafter?: string; iconbefore?: string}>(
    ({bgcolor, iconafter, iconbefore}) => `
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
    background: ${bgcolor || "var(--action)"};
    transition: .2s;
    border-radius: 4px;
    flex-shrink: 0;
    &:hover {
        opacity: .8;
    }
    & svg {
        fill: var(--white);
        margin-left: ${iconafter === "true" && "5px"};
        margin-right: ${iconbefore === "true" && "5px"};
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
    &[data-type="btn-gray"] {
        color: var(--blacked);
        background: var(--grey);
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
    const {icon, iconbefore, iconafter, children, bgcolor, btnRef, onClick, ...args} = props;
    const iconElement = icon && <Icon name={icon} />;

    return (
        <ButtonUnstyled
            ref={btnRef}
            {...args}
            onClick={onClick}
            components={{Root: CustomButtonRoot}}
            //@ts-ignore
            componentsProps={{root: {iconbefore: iconbefore?.toString(), iconafter: iconafter?.toString(), bgcolor}}}>
            <ButtonContent>
                {iconbefore && iconElement}
                {children}
                {iconafter && iconElement}
            </ButtonContent>
        </ButtonUnstyled>
    );
};
