import {EventList, EventBox} from "@nxt-ui/cp/components";
import {RadioButtons} from "@nxt-ui/components";
import {FC} from "react";

export const Ibpe4: FC = () => {
    const eventList = [
        {id: 1, heading: "Re-start", content: "Mo, Tu, We, Every 35 mins 00 secs"},
        {id: 2, heading: "Stop", content: "03 Jan, 2022, Mo 1:30 AM (UTC+04:00)"},
    ];
    const radioArr1 = [
        {id: 1, value: "female", label: "Female"},
        {id: 2, value: "male", label: "Male"},
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
                <RadioButtons defaultValue="female" name="radio1" radioArr={radioArr1} />
                <EventList posts={eventList} />
            </EventBox>
        </>
    );
};
