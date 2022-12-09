import {FC, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

import {DatePicker, DatePickerProps} from "@mui/x-date-pickers/DatePicker";
import {InputText} from "../../text";
import enLocale from "date-fns/locale/en-GB";
import "../datepicker.css";

import TextField from "@mui/material/TextField";

type IDatePickerInputProps = Omit<DatePickerProps<any, any>, "renderInput">;

export const DatePickerInput: FC<IDatePickerInputProps> = ({...rest}) => {
    return (
        <LocalizationProvider adapterLocale={enLocale} dateAdapter={AdapterDateFns}>
            <DatePicker {...rest} renderInput={(params) => <InputText {...params} />} />
        </LocalizationProvider>
    );
};
