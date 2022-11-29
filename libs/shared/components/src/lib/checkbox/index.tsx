import Checkbox, {CheckboxProps} from "@mui/material/Checkbox";
import {FC} from "react";
import {styled} from "@mui/material/styles";

interface ICheckProps extends CheckboxProps {
    labelText?: React.ReactChild | React.ReactNode;
    checkId?: string;
    className?: string;
    isCheck?: boolean;
}
const CheckboxCustom: FC<ICheckProps> = ({labelText, isCheck, className, checkId, ...props}) => {
    return (
        <div className={`${className}`} data-check={isCheck}>
            <Checkbox id={checkId} checked={isCheck} {...props} />
            {labelText ? <label htmlFor={checkId}>{labelText}</label> : null}
        </div>
    );
};

export const CheckboxComponent = styled(CheckboxCustom)`
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    .card-table & .MuiCheckbox-root,
    .card-wrap & .MuiCheckbox-root {
        color: var(--grey-dark);
    }
    .card-table & .MuiCheckbox-root.Mui-checked,
    .card-wrap & .MuiCheckbox-root.Mui-checked {
        color: var(--action);
    }
    &.label-start {
        .MuiCheckbox-root {
            order: 1;
            margin: 0 0 0 15px;
        }
    }
    #menu-top & {
        svg {
            width: 16px;
            height: 16px;
            color: var(--blacked);
        }
        label {
            cursor: default;
        }
    }
    &.label-top {
        flex-direction: column-reverse;
        .MuiCheckbox-root {
            margin: 4px 0 0;
        }
    }
    &.valign-center {
        align-self: center;
    }
    &.switch {
        .MuiCheckbox-root {
            width: 32px;
            height: 14px;
            border-radius: 7px;
            background: rgba(219, 220, 238, 0.5);
            position: relative;
            &::after {
                width: 18px;
                height: 18px;
                background: var(--pale-str);
                border-radius: 50%;
                content: "";
                display: block;
                position: absolute;
                top: -2px;
                left: 50%;
                transform: translateX(-50%);
                transition: all 300ms ease-out;
                margin: 0 0 0 -10px;
            }
            &.Mui-checked {
                background: var(--grey-light);
                &::after {
                    margin-left: 10px;
                    background: var(--r-premium);
                }
            }
        }
        svg {
            display: none;
        }
    }
    .MuiCheckbox-root {
        padding: 0;
        margin: 0 5px 0 0;
    }
    label {
        cursor: pointer;
    }
`;
