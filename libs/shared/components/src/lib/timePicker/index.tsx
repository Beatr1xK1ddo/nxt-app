import {FC, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {InputText} from "../text";
import enLocale from "date-fns/locale/en-GB";

export interface ITimePickerInputProps {
    value: Date | null;
    onChange(value: Date | null, keyboardInputValue?: string): void;
    showToolbar?: boolean;
    label?: string;
    className?: string;
}

export const TimePickerInput: FC<ITimePickerInputProps> = ({value, onChange, label, showToolbar, className}) => {
    return (
        <div className={className}>
            <LocalizationProvider adapterLocale={enLocale} dateAdapter={AdapterDateFns}>
                <TimePicker
                    className={className}
                    showToolbar={showToolbar}
                    label={label}
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => <InputText {...params} error={false} />}
                />
            </LocalizationProvider>
        </div>
    );
};
