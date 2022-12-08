import {FlexHolder, SelectCompany, SelectNode} from "@nxt-ui/cp/components";
import {TabComponent, TabPanel, TabsComponent, Dropdown} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {FC, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userNotificationSelectors} from "@nxt-ui/cp-redux";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";
import {EAppType} from "@nxt-ui/cp/types";
import {userNotificationFormActions} from "@nxt-ui/cp-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";

export const NotificationRuleComposition: FC = () => {
    const dispatch = useDispatch();
    useNodesList(EAppType.IPBE, true);
    useCompaniesList();
    const where = useSelector(userNotificationSelectors.where);
    const whome = useSelector(userNotificationSelectors.whome);
    const whereErrors = useSelector(userNotificationSelectors.whereErrors);
    const whomeErrors = useSelector(userNotificationSelectors.whomeErrors);
    const appTypes = useSelector(userNotificationSelectors.appTypes);
    const employes = useSelector(userNotificationSelectors.employes);

    const [valueApps, setValueApps] = useState(1);

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

    const setAppType = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(userNotificationFormActions.setAppType(e.target.value as string));
        },
        [dispatch]
    );

    useEffect(() => {
        dispatch(userNotificationFormActions.fetchNotificationAppTypes());
        dispatch(userNotificationFormActions.fetchNotificationEmploye());
    }, [dispatch]);

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
                    <SelectNode
                        error={whereErrors?.nodeId?.error}
                        helperText={whereErrors?.nodeId?.helperText}
                        value={where.nodeId}
                        onChange={changeNodeIdHandler}
                    />
                    <Icon name="arrRight" />
                    <Dropdown onChange={setAppType} value={where?.appType} label="APP TYPE">
                        {appTypes.map((item) => (
                            <MenuItem key={item.type} value={item.type} selected={item.type === where?.appType}>
                                {item.title}
                            </MenuItem>
                        ))}
                    </Dropdown>
                    <Icon name="arrRight" />
                    <Dropdown label="APPS" />
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
                    <Dropdown value={whome?.employe} inputWidth={430} label="EMPLOYEE">
                        {employes.map((item) => (
                            <MenuItem key={item.id} value={item.id} selected={item.id === whome.employe}>
                                {item.email}
                            </MenuItem>
                        ))}
                    </Dropdown>
                </FlexHolder>
            </TabPanel>
        </>
    );
};
