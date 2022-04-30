import {Filter, AppLog, PageHeading, AppList} from "@nxt-ui/cp/components";
import {Button} from "@nxt-ui/components";
import {FC} from "react";
import { properties } from "libs/shared/icons/src/lib/icon-list";

export const Ibpe3: FC = () => {
    return (
        <>
            <Filter />
            <PageHeading  textH1="App list" >
                <ul className="view-list">
                    <li>
                        <Button style={{color: "var(--grey-black)"}}>View all</Button>
                    </li>
                    <li>
                        <Button style={{color: "var(--action)"}}>Subscribed</Button>
                    </li>
                </ul>
            </PageHeading>

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
