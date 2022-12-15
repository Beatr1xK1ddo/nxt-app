import {FlexHolder, SelectCompany, SelectNode} from "@nxt-ui/cp/components";
import {TabComponent, TabPanel, TabsComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {FC, SyntheticEvent, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userNotificationSelectors} from "@nxt-ui/cp-redux";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";
import {EAppType} from "@nxt-ui/cp/types";
import {userNotificationFormActions} from "@nxt-ui/cp-redux";
import {NotificationAppSelect} from "./appSelect";
import {NotificationAppTypeSelector} from "./appTypesSelect";
import {NotificationEmployeSelector} from "./employesSelect";

export const NotificationRuleComposition: FC = () => {
    const dispatch = useDispatch();
    useNodesList(EAppType.IPBE, true);
    useCompaniesList();
    const where = useSelector(userNotificationSelectors.where);
    const whome = useSelector(userNotificationSelectors.whome);
    const whereErrors = useSelector(userNotificationSelectors.whereErrors);
    const whomeErrors = useSelector(userNotificationSelectors.whomeErrors);

    const [valueApps, setValueApps] = useState(0);

    const handleChangeApps = (event: SyntheticEvent, newValue: number) => {
        setValueApps(newValue);
    };

    const changeCompanyHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(userNotificationFormActions.setCompany(e.target.value as number));
        },
        [dispatch]
    );

    const changeNodeIdHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(userNotificationFormActions.setNode(e.target.value as number));
        },
        [dispatch]
    );

    return (
        <>
            <TabsComponent
                className="notification-tabs"
                value={valueApps}
                onChange={handleChangeApps}
                aria-label="Apps tabs">
                <TabComponent value={0} label="WHERE (DEVICES / APPS)" />
                <TabComponent value={1} label="WHOM (COMPANY / EMPLOYEES)" />
            </TabsComponent>
            <TabPanel value={valueApps} index={0}>
                <FlexHolder justify="flex-start" className="notification-elements">
                    <SelectNode
                        error={whereErrors?.nodeId?.error}
                        helperText={whereErrors?.nodeId?.helperText}
                        value={where.nodeId}
                        onChange={changeNodeIdHandler}
                    />
                    <Icon name="arrRight" />
                    <NotificationAppTypeSelector />
                    <Icon name="arrRight" />
                    <NotificationAppSelect />
                </FlexHolder>
            </TabPanel>
            <TabPanel value={valueApps} index={1}>
                <FlexHolder justify="flex-start" className="notification-elements">
                    <SelectCompany
                        inputWidth={430}
                        error={whomeErrors?.company?.error}
                        helperText={whomeErrors?.company?.helperText}
                        value={whome.company}
                        onChange={changeCompanyHandler}
                    />
                    <NotificationEmployeSelector />
                </FlexHolder>
            </TabPanel>
        </>
    );
};
