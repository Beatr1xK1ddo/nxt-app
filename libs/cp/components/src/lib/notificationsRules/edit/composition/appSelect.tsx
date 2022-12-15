import {Dropdown} from "@nxt-ui/components";
import {ChangeEventHandler, FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CpRootState, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {userNotificationFormActions} from "@nxt-ui/cp-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {INotificationApp} from "@nxt-ui/cp/api";

export const NotificationAppSelect: FC = () => {
    const dispatch = useDispatch();
    const [filterApps, setAppsFilter] = useState<string>("");
    const where = useSelector(userNotificationSelectors.where);
    const appsList = useSelector<CpRootState, Array<INotificationApp>>((state) =>
        userNotificationSelectors.appsListWithFilter(state, filterApps)
    );
    const app = useSelector<CpRootState, INotificationApp | undefined>((state) =>
        userNotificationSelectors.appsListById(state, where?.apps)
    );

    const setApps = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(userNotificationFormActions.setApps(e.target.value as number));
        },
        [dispatch]
    );

    const handleAppsFilterChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((event) => {
        event.stopPropagation();
        setAppsFilter(event.currentTarget.value);
    }, []);

    useEffect(() => {
        if (where.appType) {
            dispatch(userNotificationFormActions.fetchNotificationApps(where.appType));
        }
    }, [dispatch, where.appType]);

    const renderApps = useCallback(
        (value) => {
            if (app) {
                return `${app?.name}`;
            } else {
                return "Select all apps";
            }
        },
        [app]
    );

    return (
        <Dropdown
            renderValue={renderApps}
            emptyValue={"Select all apps"}
            onSearch={handleAppsFilterChange}
            withSearch
            searchValue={filterApps}
            onChange={setApps}
            value={app || ""}
            label="APPS">
            {appsList.map((item) => (
                <MenuItem key={item.id} value={item.id} selected={item.id === where?.apps}>
                    {item.name}
                </MenuItem>
            ))}
        </Dropdown>
    );
};
