import {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {InputText} from "../text";
import enLocale from "date-fns/locale/en-GB";

export const TimePickerInput = ({...rest}) => {
    const [value, setValue] = useState<Date | null>(null);

    return (
        <LocalizationProvider adapterLocale={enLocale} dateAdapter={AdapterDateFns}>
            <TimePicker
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
