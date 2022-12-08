import {Accordion, CheckboxComponent, RadioButtonsStyled, TimePickerInput} from "@nxt-ui/components";
import {userNotificationFormActions, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {FlexHolder} from "@nxt-ui/cp/components";
import {ChangeEvent, FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";

export const NotificationRuleTime: FC = () => {
    const dispatch = useDispatch();
    const dayTime = useSelector(userNotificationSelectors.dayTime);

    const setRange = useCallback(() => {
        dispatch(userNotificationFormActions.setRange());
    }, [dispatch]);

    const setStartTime = useCallback(
        (value: Date | null, keyboardInputValue?: string) => {
            if (value) {
                dispatch(userNotificationFormActions.setStartTime(value.toString()));
            }
        },
        [dispatch]
    );

    const setEndTime = useCallback(
        (value: Date | null, keyboardInputValue?: string) => {
            if (value) {
                dispatch(userNotificationFormActions.setEndTime(value.toString()));
            }
        },
        [dispatch]
    );

    const setDayTimeDay = useCallback(
        (event: ChangeEvent<HTMLInputElement>, value: string) => {
            dispatch(userNotificationFormActions.setDayTimeDay(value));
        },
        [dispatch]
    );

    const radioDay = [
        {id: 1, value: "monday", label: "Mo"},
        {id: 2, value: "tuesday", label: "Tu"},
        {id: 3, value: "wednesday", label: "We"},
        {id: 4, value: "thursday", label: "Th"},
        {id: 5, value: "friday", label: "Fr"},
        {id: 6, value: "saturday", label: "Sa"},
        {id: 7, value: "sunsday", label: "Su"},
    ];
    return (
        <Accordion className="accordion-ui" active header={"DAY AND TIME RANGE"} defaultExpanded>
            <CheckboxComponent
                checked={dayTime.setRange}
                onChange={setRange}
                className="label-left"
                checkId="check-range"
                labelText="Set range"
            />
            <FlexHolder justify="flex-start" className="time-picker-holder">
                <RadioButtonsStyled
                    onChange={setDayTimeDay}
                    value={dayTime.day}
                    name="radioDay"
                    aria-labelledby="radio-days"
                    radioArr={radioDay}
                />
                <TimePickerInput
                    showToolbar={true}
                    label="FROM, TIME"
                    value={new Date(dayTime.timeStart)}
                    onChange={setStartTime}
                />
                <TimePickerInput
                    showToolbar={true}
                    label="TO, TIME"
                    value={new Date(dayTime.timeEnd)}
                    onChange={setEndTime}
                />
            </FlexHolder>
        </Accordion>
    );
};
