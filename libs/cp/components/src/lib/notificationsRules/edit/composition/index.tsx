import {FlexHolder, SelectCompany, SelectNode} from "@nxt-ui/cp/components";
import {TabComponent, TabPanel, TabsComponent, Dropdown} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {ChangeEventHandler, FC, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CpRootState, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";
import {EAppType} from "@nxt-ui/cp/types";
import {userNotificationFormActions} from "@nxt-ui/cp-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {INotificationApp, INotificationAppType, INotificationEmploye} from "@nxt-ui/cp/api";

export const NotificationRuleComposition: FC = () => {
    const dispatch = useDispatch();
    useNodesList(EAppType.IPBE, true);
    useCompaniesList();
    const [filterAppType, setAppTypeFilter] = useState<string>("");
    const [filterApps, setAppsFilter] = useState<string>("");
    const [filterEmployes, setEmployesFilter] = useState<string>("");
    const where = useSelector(userNotificationSelectors.where);
    const whome = useSelector(userNotificationSelectors.whome);
    const whereErrors = useSelector(userNotificationSelectors.whereErrors);
    const whomeErrors = useSelector(userNotificationSelectors.whomeErrors);
    const appsList = useSelector<CpRootState, Array<INotificationApp>>((state) =>
        userNotificationSelectors.appsListWithFilter(state, filterApps)
    );
    const employes = useSelector<CpRootState, Array<INotificationEmploye>>((state) =>
        userNotificationSelectors.employesWithFilter(state, filterApps)
    );
    const appType = useSelector<CpRootState, Array<INotificationAppType>>((state) =>
        userNotificationSelectors.appTypesWithFilter(state, filterAppType)
    );

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

    const setAppType = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(userNotificationFormActions.setAppType(e.target.value as string));
        },
        [dispatch]
    );

    const setApps = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(userNotificationFormActions.setApps(e.target.value as number));
        },
        [dispatch]
    );

    const setEmploye = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(userNotificationFormActions.setEmploye(e.target.value as number));
        },
        [dispatch]
    );

    const handleAppTypeFilterChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (event) => {
            event.stopPropagation();
            setAppTypeFilter(event.currentTarget.value);
        },
        []
    );

    const handleEmployesFilterChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (event) => {
            event.stopPropagation();
            setEmployesFilter(event.currentTarget.value);
        },
        []
    );

    const handleAppsFilterChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((event) => {
        event.stopPropagation();
        setAppsFilter(event.currentTarget.value);
    }, []);

    useEffect(() => {
        dispatch(userNotificationFormActions.fetchNotificationAppTypes());
        dispatch(userNotificationFormActions.fetchNotificationEmploye());
    }, [dispatch]);

    useEffect(() => {
        dispatch(userNotificationFormActions.fetchNotificationApps(where.appType || ""));
    }, [dispatch, where.appType]);

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
                    <Dropdown
                        withSearch
                        searchValue={filterAppType}
                        onSearch={handleAppTypeFilterChange}
                        onChange={setAppType}
                        value={where?.appType}
                        label="APP TYPE">
                        {appType.map((item) => (
                            <MenuItem key={item.type} value={item.type} selected={item.type === where?.appType}>
                                {item.title}
                            </MenuItem>
                        ))}
                    </Dropdown>
                    {!!appsList.length && (
                        <>
                            <Icon name="arrRight" />
                            <Dropdown
                                onSearch={handleAppsFilterChange}
                                withSearch
                                searchValue={filterApps}
                                onChange={setApps}
                                value={where?.apps}
                                label="APPS">
                                {appsList.map((item) => (
                                    <MenuItem key={item.id} value={item.id} selected={item.id === where?.apps}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Dropdown>
                        </>
                    )}
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
                    <Dropdown
                        onSearch={handleEmployesFilterChange}
                        withSearch
                        searchValue={filterEmployes}
                        onChange={setEmploye}
                        value={whome?.employe}
                        inputWidth={430}
                        label="EMPLOYEE">
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
