import styled from "@emotion/styled";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import InputAdornment, {InputAdornmentProps} from "@mui/material/InputAdornment";
import {EColors} from "@nxt-ui/colors";
import {FC} from "react";
import {Icon} from "@nxt-ui/icons";
import {IInputTextProps} from "./types";

const TextComponent: FC<TextFieldProps> = styled(TextField)`
    .MuiInput-input {
        height: 2.5rem;
    }
    .MuiInputBase-root {
        font: var(--font);
        color: var(--grey-dark);
    }
    .MuiInputBase-root.Mui-error {
        border: 0.0625rem solid var(--danger);
    }

    .MuiFormHelperText-root.Mui-error {
        color: var(--danger);
    }
    .Mui-error .MuiOutlinedInput-notchedOutline {
        border: none;
    }

    .MuiOutlinedInput-input {
        padding: 0.625rem 0.9375rem;
    }
    .MuiInputBase-sizeSmall .MuiOutlinedInput-input {
        padding: 0.375rem 0.9375rem;
    }
    .Mui-focused {
        .MuiOutlinedInput-notchedOutline {
            border-color: var(--accent);
        }
    }
    .MuiInputLabel-formControl {
        font: var(--font);
        color: var(--grey-dark);
        margin-top: auto;
        transform: translate(0.875rem, 0.6875rem) scale(1);
        &.MuiFormLabel-filled,
        &.Mui-focused {
            transform: translate(0.875rem, -0.4375rem) scale(0.75);
            background: var(--white);
            padding: 0 0.1875rem;
            color: var(--grey-black);
            + .MuiInputBase-root {
                color: var(--grey-black);
                .MuiOutlinedInput-notchedOutline {
                    border-color: var(--grey-black);
                }
            }
        }
        @media (max-width: 75rem) {
            & {
                font-size: calc(var(--fz) - 0.3125rem);
                margin-top: 0.1875rem;
            }
        }
    }
    &:hover {
        .MuiInputLabel-formControl {
            color: var(--black) !important;
            + .MuiInputBase-root {
                color: var(--black) !important;
            }
        }
        .MuiInputBase-root .MuiOutlinedInput-notchedOutline {
            border-color: var(--black) !important;
        }
    }
    .MuiOutlinedInput-root.Mui-disabled,
    .MuiInputLabel-formControl.Mui-disabled {
        opacity: 0.5;
        color: var(--grey-black) !important;
        + .MuiInputBase-root {
            color: var(--grey-black) !important;
        }
    }
    .MuiInputBase-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
        opacity: 0.5 !important;
        border-color: var(--black) !important;
    }
    &.Mui-disabled {
        .MuiInputLabel-formControl.Mui-disabled {
            color: green;
            + .MuiInputBase-root {
                color: green !important;
            }
        }
        .MuiInputBase-root .MuiOutlinedInput-notchedOutline {
            border-color: var(--black) !important;
        }
    }
    .MuiInputLabel-sizeSmall {
        transform: translate(0.875rem, 0.4375rem) scale(1);
    }
    .MuiInputLabel-sizeSmall.MuiFormLabel-filled,
    .MuiInputLabel-sizeSmall.Mui-focused {
        transform: translate(0.875rem, -0.4375rem) scale(0.75);
    }
    .adornment-text {
        font-size: calc(var(--fz) - 0.25rem);
        color: var(--grey-black);
    }
    legend {
        font-size: 0.4375rem;
    }
`;

const AdornmentComponent: FC<InputAdornmentProps> = styled(InputAdornment)`
    & svg {
        width: 1.5rem;
        height: 1.5rem;
        // fill: ${EColors.greyBorder};
        // cursor: pointer;
    }
`;

export const InputText: FC<IInputTextProps> = (props) => {
    const {icon, value, ...args} = props;

    const adornElement = <AdornmentComponent position="end">{icon && <Icon name={icon} />}</AdornmentComponent>;

    return <TextComponent {...args} value={value} />;
    //return <TextComponent {...args} value={value} InputProps={{endAdornment: adornElement}} />;
};
