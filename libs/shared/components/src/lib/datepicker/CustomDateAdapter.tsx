// import DateIOAdapter from "@mui/lab/AdapterMoment";

// export default function CustomDateAdapter(options: object) {
//     const adapter = new DateIOAdapter(options);

//     // const constructUpperObject = (text: object) => ({toUpperCase: () => text});
//     // const constructDayObject = (day: object) => ({
//     //     charAt: () => constructUpperObject(day),
//     // });

//     return {
//         ...adapter,

//         getWeekdays() {
//             // Feel free to replace this with your custom value
//             // e.g const customWeekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
//             const customWeekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
//             return customWeekdays;
//             // const customWeekdays = adapter.getWeekdays();

//             // return customWeekdays.map((day) => constructDayObject(day));
//         },
//     };
// }

import AdapterDateFns from "@mui/lab/AdapterDateFns";

class CustomString extends String {
    charAt(_: number): string {
        return this.valueOf();
    }
}

const weekDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const customWeekDays = weekDays.map((day) => new CustomString(day) as string);

export class DateAdapter extends AdapterDateFns {
    getWeekdays = (): string[] => customWeekDays;
}
