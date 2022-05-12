import {EventList, EventBox, FlexHolder} from "@nxt-ui/cp/components";
import {RadioButtonsStyled, Dropdown, InputText} from "@nxt-ui/components";
import {FC} from "react";
import {Button} from "@nxt-ui/components";

export const Ibpe4: FC = () => {
    const eventList = [
        {id: 1, heading: "Re-start", content: "Mo, Tu, We, Every 35 mins 00 secs"},
        {id: 2, heading: "Stop", content: "03 Jan, 2022, Mo 1:30 AM (UTC+04:00)"},
    ];
    const radioDate = [
        {id: 1, value: "date", label: "Date"},
        {id: 2, value: "period", label: "Period"},
    ];
    const radioTime = [
        {id: 1, value: "time", label: "Exact time, AT"},
        {id: 2, value: "interval", label: "Interval, EVERY"},
    ];

    return (
        <>
            <EventBox heading="AWE_from_Herring_PAL, events list">
                <h3>No event set here yet.</h3>
                <p>
                    Please click the button above to add future single or periodic event, to happen
                    once or several times.
                </p>
            </EventBox>
            <EventBox btnFooter heading="AWE_from_Herring_PAL, events list">
                <EventList posts={eventList} />
            </EventBox>
            <EventBox btnFooter heading="AWE_from_Herring_PAL, events list">
                <RadioButtonsStyled
                    defaultValue="date"
                    name="radioDate"
                    aria-labelledby="buttons-group"
                    radioArr={radioDate}
                />
                <RadioButtonsStyled
                    defaultValue="time"
                    name="radioTime"
                    aria-labelledby="buttons-group"
                    radioArr={radioTime}
                    row={true}
                />
                <FlexHolder>
                    <InputText label="SET TIME" />
                    <Dropdown label="TIME ZONE" />
                </FlexHolder>
                <FlexHolder>
                    <Dropdown label="ACTION" />
                    <Button>Create event</Button>
                    <Button
                    // style={{color: "var(--action)"}}
                    >
                        Cancel
                    </Button>
                </FlexHolder>
            </EventBox>
        </>
    );
};
