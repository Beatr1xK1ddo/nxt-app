import {Dropdown} from "@nxt-ui/components";
import {ChangeEventHandler, FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CpRootState, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {userNotificationFormActions} from "@nxt-ui/cp-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {INotificationAppType} from "@nxt-ui/cp/api";

export const NotificationAppTypeSelector: FC = () => {
    const dispatch = useDispatch();
    const [filterAppType, setAppTypeFilter] = useState<string>("");
    const where = useSelector(userNotificationSelectors.where);
    const appTypes = useSelector<CpRootState, Array<INotificationAppType>>((state) =>
        userNotificationSelectors.appTypesWithFilter(state, filterAppType)
    );
    const appType = useSelector<CpRootState, INotificationAppType | undefined>((state) =>
        userNotificationSelectors.appTypesById(state, where?.appType)
    );
    const setAppType = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(userNotificationFormActions.setAppType(e.target.value as string));
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

    const renderAppType = useCallback((value) => (appType ? `${appType?.title}` : "Select all app types"), [appType]);

    useEffect(() => {
        const appListValues = appTypes.map((item) => item.type);
        if (typeof where.appType === "string" && !appListValues.includes(where.appType)) {
            dispatch(userNotificationFormActions.setAppType(""));
        }
    }, [dispatch, where, appTypes]);

    useEffect(() => {
        dispatch(userNotificationFormActions.fetchNotificationAppTypes(null));
    }, [dispatch]);

    useEffect(() => {
        if (where.nodeId) {
            dispatch(userNotificationFormActions.fetchNotificationAppTypes(where.nodeId));
        }
    }, [dispatch, where.nodeId]);

    return (
        <Dropdown
            renderValue={renderAppType}
            emptyValue={"Select all app types"}
            withSearch
            searchValue={filterAppType}
            onSearch={handleAppTypeFilterChange}
            onChange={setAppType}
            value={appType}
            label="APP TYPE">
            {appTypes.map((item) => (
                <MenuItem key={item.type} value={item.type} selected={item.type === where?.appType}>
                    {item.title}
                </MenuItem>
            ))}
        </Dropdown>
    );
};
