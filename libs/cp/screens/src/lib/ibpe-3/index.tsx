import {IpbeListFilter, StatePanel, AppList, FlexHolder} from "@nxt-ui/cp/components";
import {Button} from "@nxt-ui/components";
import {FC} from "react";

export const Ibpe3: FC = () => {
    return (
        <>
            <IpbeListFilter />
            {/* <PageHeading textH1="App list">
                <ul className="view-list">
                    <li>
                        <Button style={{color: "var(--grey-black)"}}>View all</Button>
                    </li>
                    <li>
                        <Button style={{color: "var(--action)"}}>Subscribed</Button>
                    </li>
                </ul>
            </PageHeading> */}
            <FlexHolder className="heading-section" justify="flex-start">
                <h1>App list</h1>
                <Button style={{color: "var(--grey-black)"}}>View all</Button>
                <span className="divider">|</span>
                <Button style={{color: "var(--action)"}}>Subscribed</Button>
                <Button data-type="btn-border" icon="plusBig" iconbefore style={{color: "var(--ok)"}}>
                    Add new
                </Button>
            </FlexHolder>

            <AppList>
                <StatePanel />
                <StatePanel />
                <StatePanel />
                <StatePanel />
                <StatePanel />
            </AppList>
        </>
    );
};
