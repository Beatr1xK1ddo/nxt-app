import {FlexHolder} from "@nxt-ui/cp/components";
import {TabComponent, TabPanel, TabsComponent, Dropdown} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {FC, SyntheticEvent, useState} from "react";

export const NotificationRuleComposition: FC = () => {
    const [valueApps, setValueApps] = useState(1);
    const handleChangeApps = (event: SyntheticEvent, newValue: number) => {
        setValueApps(newValue);
    };
    return (
        <>
            <TabsComponent
                className="notification-tabs"
                value={valueApps}
                onChange={handleChangeApps}
                aria-label="Apps tabs">
                <TabComponent label="WHERE (DEVICES / APPS)" />
                <TabComponent label="WHOM (COMPANY / EMPLOYEES)" />
            </TabsComponent>
            <TabPanel value={valueApps} index={0}>
                <FlexHolder justify="flex-start" className="notification-elements">
                    <Dropdown label="DEVICE ID" />
                    <Icon name="arrRight" />
                    <Dropdown label="APP TYPE" />
                    <Icon name="arrRight" />
                    <Dropdown label="APPS" />
                </FlexHolder>
            </TabPanel>
            <TabPanel value={valueApps} index={1}>
                <FlexHolder justify="flex-start" className="notification-elements">
                    <Dropdown inputWidth={430} label="COMPANY" />
                    <Dropdown inputWidth={430} label="EMPLOYEE" />
                </FlexHolder>
            </TabPanel>
        </>
    );
};
