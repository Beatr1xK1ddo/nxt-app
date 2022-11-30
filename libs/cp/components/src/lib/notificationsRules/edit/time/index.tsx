import {Accordion, CheckboxComponent, RadioButtonsStyled, TimePickerInput} from "@nxt-ui/components";
import {FlexHolder} from "@nxt-ui/cp/components";
import {FC, useState} from "react";

export const NotificationRuleTime: FC = () => {
    const [value, setValue] = useState<Date | null>(null);
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
            <CheckboxComponent className="label-left" checkId="check-range" labelText="Set range" />
            <FlexHolder justify="flex-start" className="time-picker-holder">
                <RadioButtonsStyled defaultValue="" name="radioDay" aria-labelledby="radio-days" radioArr={radioDay} />
                <TimePickerInput
                    PopperProps={{
                        placement: "bottom-start",
                        disablePortal: true,
                    }}
                    showToolbar={true}
                    label="FROM, TIME"
                    value={value}
                    onChange={(newValue: any) => {
                        setValue(newValue);
                    }}
                />
                <TimePickerInput
                    PopperProps={{
                        placement: "bottom-start",
                        disablePortal: true,
                    }}
                    showToolbar={true}
                    label="TO, TIME"
                    value={value}
                    onChange={(newValue: any) => {
                        setValue(newValue);
                    }}
                />
            </FlexHolder>
        </Accordion>
    );
};
