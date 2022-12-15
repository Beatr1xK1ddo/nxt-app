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

    useEffect(() => {
        dispatch(userNotificationFormActions.fetchNotificationAppTypes());
    }, [dispatch]);

    const renderAppType = useCallback(
        (value) => {
            if (appType) {
                return `${appType?.title}`;
            } else {
                return "Select all app types";
            }
        },
        [appType]
    );

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
