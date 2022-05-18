import Checkbox, {CheckboxProps} from "@mui/material/Checkbox";
import {FC} from "react";
import {styled} from "@mui/material/styles";
import {string} from "yargs";

// const CheckboxComponent: FC<CheckboxProps> = styled(Checkbox)`
//     padding: 0;
//     &.switcher {
//     }
// `;
interface ICheckProps extends CheckboxProps {
    labelText?: string;
    checkId?: string;
    className?: string;
}
const CheckboxCustom: FC<ICheckProps> = ({labelText, className, checkId, ...props}) => {
    return (
        <div className={className}>
            <Checkbox id={checkId} {...props} />
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
    &.switch {
        .MuiCheckbox-root {
            width: 32px;
            height: 14px;
            border-radius: 7px;
            background: rgba(145, 140, 153, 0.5);
            position: relative;
            &::after {
                width: 18px;
                height: 18px;
                background: var(--grey-dark);
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
                background: var(--grey-black);
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
