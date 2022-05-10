import {FlexHolder, EventList, EventBox} from "@nxt-ui/cp/components";
import {Button} from "@nxt-ui/components";
import {FC} from "react";

export const Ibpe4: FC = () => {
    const eventList = [{id: 1, heading: "Re-start", content: "Mo, Tu, We, Every 35 mins 00 secs"}];
    return (
        <>
            <EventBox heading="AWE_from_Herring_PAL, events list">
                <p>
                    No event set here yet. Please click the button above to add future single or
                    periodic event, to happen once or several times.
                </p>
            </EventBox>
            <EventBox btnFooter heading="AWE_from_Herring_PAL, events list">
                <EventList posts={eventList} />
            </EventBox>
        </>
    );
};
