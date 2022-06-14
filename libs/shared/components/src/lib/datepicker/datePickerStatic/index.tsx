import {FC, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {CalendarPicker, CalendarPickerProps} from "@mui/x-date-pickers/CalendarPicker";
import enLocale from "date-fns/locale/en-GB";
import "../datepicker.css";

export const DatePickerStatic: FC<CalendarPickerProps<Date>> = ({...rest}) => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
        <LocalizationProvider locale={enLocale} dateAdapter={AdapterDateFns}>
            <CalendarPicker
                {...rest}
                showDaysOutsideCurrentMonth={true}
                className="datepicker-custom"
                date={date}
                onChange={(newDate) => setDate(newDate)}
            />
        </LocalizationProvider>
    );
};
