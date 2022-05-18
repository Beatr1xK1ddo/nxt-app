import {FC, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {CalendarPicker, CalendarPickerProps} from "@mui/x-date-pickers/CalendarPicker";
import enLocale from "date-fns/locale/en-GB";
import "./datepicker.css";

// class LocalizedUtils extends DateFnsUtils {
//     getDatePickerHeaderText(date) {
//         return format(date, "d MMM yyyy", {locale: this.locale});
//     }
// }

// class CustomString extends String {
//     charAt(_: number): string {
//         return this.valueOf();
//     }
// }
// const weekDays = ["mo", "tu", "we", "th", "fr", "sa", "su"];
// const customWeekDays = weekDays.map((day) => new CustomString(day) as string);
// export class DateAdapter extends AdapterDateFns {
//     getWeekdays = (): string[] => customWeekDays;
// }

export const DatePicker: FC<CalendarPickerProps<Date>> = ({...rest}) => {
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
