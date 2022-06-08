import Checkbox, {CheckboxProps} from "@mui/material/Checkbox";
import {FC, useState} from "react";
import {styled} from "@mui/material/styles";
import {string} from "yargs";

interface ICheckProps extends CheckboxProps {
    labelText?: React.ReactChild | React.ReactNode;
    checkId?: string;
    className?: string;
    isCheck?: boolean;
}
const CheckboxCustom: FC<ICheckProps> = ({labelText, isCheck, className, checkId, ...props}) => {
    const [checked, setChecked] = useState(null);
    const handleChange = (event: any) => {
        setChecked(event.target.checked);
    };
    return (
        <div className={`${className}`} data-check={checked}>
            <Checkbox id={checkId} {...props} onChange={handleChange} />
            {labelText ? <label htmlFor={checkId}>{labelText}</label> : null}
        </div>
    );
};

export const CheckboxComponent = styled(CheckboxCustom)`
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
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
            color: var(--white);
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
