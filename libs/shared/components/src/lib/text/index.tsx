import styled from "@emotion/styled";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import InputAdornment, {InputAdornmentProps} from "@mui/material/InputAdornment";
import {EColors} from "@nxt-ui/colors";
import {FC} from "react";
import {Icon} from "@nxt-ui/icons";
import {IInputTextProps} from "./types";

const TextComponent: FC<TextFieldProps> = styled(TextField)`
    .MuiInput-input {
        height: 40px;
    }
    .MuiInputBase-root {
        font: var(--font);
        color: var(--grey-dark);
    }
    .MuiInputBase-root.Mui-error {
        border: 1px solid var(--danger);
    }
    .MuiFormHelperText-root.Mui-error {
        color: var(--danger);
    }
    .Mui-error .MuiOutlinedInput-notchedOutline {
        border: none;
    }

    .MuiOutlinedInput-input {
        padding: 10px 15px;
    }
    .MuiInputBase-sizeSmall .MuiOutlinedInput-input {
        padding: 6px 15px;
    }
    .MuiInputLabel-formControl {
        font: var(--font);
        color: var(--grey-dark);
        margin-top: auto;
        transform: translate(14px, 11px) scale(1);
        &.MuiFormLabel-filled,
        &.Mui-focused {
            transform: translate(14px, -7px) scale(0.75);
            background: var(--white);
            padding: 0 3px;
        }
    }
    .MuiInputLabel-sizeSmall {
        transform: translate(14px, 7px) scale(1);
    }
    .MuiInputLabel-sizeSmall.MuiFormLabel-filled,
    .MuiInputLabel-sizeSmall.Mui-focused {
        transform: translate(14px, -7px) scale(0.75);
    }
    .adornment-text {
        font-size: calc(var(--fz) - 4px);
        color: var(--grey-black );
    }
`;

const AdornmentComponent: FC<InputAdornmentProps> = styled(InputAdornment)`
    & svg {
        width: 24px;
        height: 24px;
        // fill: ${EColors.greyBorder};
        // cursor: pointer;
    }
`;

export const InputText: FC<IInputTextProps> = (props) => {
    const {icon, value, ...args} = props;

    console.log("value", value);

    const adornElement = (
        <AdornmentComponent position="end">{icon && <Icon name={icon} />}</AdornmentComponent>
    );

    return <TextComponent {...args} value={value} />;
    //return <TextComponent {...args} value={value} InputProps={{endAdornment: adornElement}} />;
};
