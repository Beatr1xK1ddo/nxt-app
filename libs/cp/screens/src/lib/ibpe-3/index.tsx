import {Filter, AppLog, AppList, FlexHolder} from "@nxt-ui/cp/components";
import {Button} from "@nxt-ui/components";
import {FC} from "react";

export const Ibpe3: FC = () => {
    return (
        <>
            <Filter />
            <FlexHolder className="heading-section" justify="flex-start">
                <h1>App list</h1>
                <Button style={{color: "var(--grey-black)"}}>View all</Button>
                <span className="divider">|</span>
                <Button style={{color: "var(--action)"}}>Subscribed</Button>
                <Button
                    data-type="btn-border"
                    icon="plusBig"
                    iconBefore
                    style={{color: "var(--ok)"}}>
                    Add new
                </Button>
            </FlexHolder>

            <AppList>
                <AppLog />
                <AppLog />
                <AppLog />
                <AppLog />
                <AppLog />
            </AppList>
        </>
    );
};
