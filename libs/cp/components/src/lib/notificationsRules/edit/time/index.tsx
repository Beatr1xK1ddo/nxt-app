import {Accordion, CheckboxComponent, ITimePickerInputProps, TimePickerInput} from "@nxt-ui/components";
import {userNotificationFormActions, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {FlexHolder} from "@nxt-ui/cp/components";
import {FC, MouseEventHandler, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DaysList} from "./style";
import FormHelperText from "@mui/material/FormHelperText";
import {styled} from "@mui/system";
import Button from "@mui/material/Button/Button";

interface ITimePicker extends ITimePickerInputProps {
    error?: boolean;
}

export const TimePicker = styled(TimePickerInput)<ITimePicker>`
    & .MuiOutlinedInput-notchedOutline {
        border-color: ${({error}) => (error ? "var(--danger)" : "rgba(0, 0, 0, 0.87)")} !important;
    }
    & input,
    & label {
        color: ${({error}) => (error ? "var(--danger)" : "rgba(0, 0, 0, 0.87)")} !important;
    }
    & .MuiFormControl-root:hover .MuiOutlinedInput-notchedOutline {
        border-color: ${({error}) => (error ? "var(--danger)" : "rgba(0, 0, 0, 0.87)")} !important;
    }
    & .MuiFormControl-root:hover label {
        color: ${({error}) => (error ? "var(--danger)" : "rgba(0, 0, 0, 0.87)")} !important;
    }
`;

type INotificationTimePickerProps = {
    error?: boolean;
    label: string;
    value: Date | null;
    onChange(value: Date | null, keyboardInputValue?: string): void;
};

const NotificationTimePicker: FC<INotificationTimePickerProps> = ({error, label, value, onChange}) => {
    const [fromOpen, setFromOpen] = useState(false);

    const closeHandler = useCallback(
        (e) => {
            onChange(null);
        },
        [onChange]
    ) as MouseEventHandler;

    return (
        <TimePicker
            open={fromOpen}
            onClose={() => setFromOpen(false)}
            onOpen={() => setFromOpen(true)}
            error={error}
            label={label}
            value={value}
            showToolbar={true}
            ToolbarComponent={() => (
                <FlexHolder className="datepicker-toolbar">
                    <Button onClick={closeHandler}>Clear</Button>
                </FlexHolder>
            )}
            onChange={onChange}
        />
    );
};

export const NotificationRuleTime: FC = () => {
    const dispatch = useDispatch();
    const dayTime = useSelector(userNotificationSelectors.dayTime);
    const dayTimeErrors = useSelector(userNotificationSelectors.dayTimeErrors);

    const setStartTime = useCallback(
        (value: Date | null, keyboardInputValue?: string) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            dispatch(userNotificationFormActions.setStartTime(value?.toString() ?? null));
        },
        [dispatch]
    );

    const setEndTime = useCallback(
        (value: Date | null, keyboardInputValue?: string) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            dispatch(userNotificationFormActions.setEndTime(value?.toString() ?? null));
        },
        [dispatch]
    );

    const setDayTimeDay = useCallback(
        (value: string) => () => {
            dispatch(userNotificationFormActions.setDayTimeDay(value));
        },
        [dispatch]
    );

    const radioDay = [
        {id: 1, value: "monday", label: "Mon"},
        {id: 2, value: "tuesday", label: "Tue"},
        {id: 3, value: "wednesday", label: "Wed"},
        {id: 4, value: "thursday", label: "Thu"},
        {id: 5, value: "friday", label: "Fri"},
        {id: 6, value: "saturday", label: "Sat"},
        {id: 7, value: "sunsday", label: "Sun"},
    ];
    return (
        <Accordion className="accordion-ui" active header={"DAY AND TIME RANGE"} defaultExpanded>
            <FlexHolder justify="flex-start" className="time-picker-holder">
                <DaysList>
                    {radioDay.map((item) => (
                        <CheckboxComponent
                            checked={dayTime.weekdays.includes(item.label)}
                            onClick={setDayTimeDay(item.label)}
                            key={item.id}
                            labelText={item.label}
                            checkId={item.value}
                        />
                    ))}
                    <div className="time-holder">
                        <NotificationTimePicker
                            error={dayTimeErrors?.timeStart?.error}
                            label="FROM, TIME"
                            value={dayTime.timerange.start ? new Date(dayTime.timerange.start) : null}
                            onChange={setStartTime}
                        />
                        {dayTimeErrors?.timeStart?.helperText && (
                            <FormHelperText style={{color: "var(--danger)"}}>
                                {dayTimeErrors.timeStart.helperText}
                            </FormHelperText>
                        )}
                    </div>
                    <div className="time-holder">
                        <NotificationTimePicker
                            error={dayTimeErrors?.timeEnd?.error}
                            label="TO, TIME"
                            value={dayTime.timerange.end ? new Date(dayTime.timerange.end) : null}
                            onChange={setEndTime}
                        />
                        {dayTimeErrors?.timeEnd?.helperText && (
                            <FormHelperText style={{color: "var(--danger)"}}>
                                {dayTimeErrors.timeEnd.helperText}
                            </FormHelperText>
                        )}
                    </div>
                </DaysList>
            </FlexHolder>
        </Accordion>
    );
};
