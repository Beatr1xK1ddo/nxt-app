import {FC, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {InputText} from "../text";
import enLocale from "date-fns/locale/en-GB";

interface ITimePickerInputProps {
    value: Date | null;
    onChange(value: Date | null, keyboardInputValue?: string): void;
    showToolbar?: boolean;
    label?: string;
}

export const TimePickerInput: FC<ITimePickerInputProps> = ({value, onChange, label, showToolbar}) => {
    return (
        <LocalizationProvider adapterLocale={enLocale} dateAdapter={AdapterDateFns}>
            <TimePicker
                showToolbar={showToolbar}
                label={label}
                value={value}
                onChange={onChange}
                renderInput={(params) => <InputText {...params} error={false} />}
            />
        </LocalizationProvider>
    );
};
