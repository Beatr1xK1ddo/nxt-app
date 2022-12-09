import {Accordion, CheckboxComponent, RadioButtonsStyled, TimePickerInput} from "@nxt-ui/components";
import {userNotificationFormActions, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {FlexHolder} from "@nxt-ui/cp/components";
import {ChangeEvent, FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DaysList} from "./style";

export const NotificationRuleTime: FC = () => {
    const dispatch = useDispatch();
    const dayTime = useSelector(userNotificationSelectors.dayTime);

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
    return (
        <Accordion className="accordion-ui" active header={"DAY AND TIME RANGE"} defaultExpanded>
            <FlexHolder justify="flex-start" className="time-picker-holder">
                <DaysList>
                    <CheckboxComponent labelText="Mo" checkId="daysMo" />
                    <CheckboxComponent labelText="Tu" checkId="daysTu" />
                    <CheckboxComponent labelText="We" checkId="daysWe" />
                    <CheckboxComponent labelText="Th" checkId="daysTh" />
                    <CheckboxComponent labelText="Fr" checkId="daysFr" />
                    <CheckboxComponent labelText="Sa" checkId="daysSa" />
                    <CheckboxComponent labelText="Su" checkId="daysSu" />
                </DaysList>
                {/* <RadioButtonsStyled
                    onChange={setDayTimeDay}
                    value={dayTime.day}
                    name="radioDay"
                    aria-labelledby="radio-days"
                    radioArr={radioDay}
                /> */}
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
