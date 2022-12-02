import {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {InputText} from "../../text";
import enLocale from "date-fns/locale/en-GB";
import "../datepicker.css";

import TextField from "@mui/material/TextField";

export const DatePickerInput = ({...rest}) => {
    const [value, setValue] = useState<Date | null>(null);

    return (
        <LocalizationProvider adapterLocale={enLocale} dateAdapter={AdapterDateFns}>
            <DatePicker
                {...rest}
                value={value}
                onChange={(newValue: any) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <InputText {...params} />}
            />
        </LocalizationProvider>
    );
};
