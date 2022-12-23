import {Dropdown} from "@nxt-ui/components";
import {ChangeEventHandler, FC, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CpDispatch, CpRootState, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {userNotificationFormActions} from "@nxt-ui/cp-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {INotificationApp} from "@nxt-ui/cp/api";

export const NotificationAppSelect: FC = () => {
    const dispatch = useDispatch<CpDispatch>();
    const [filterApps, setAppsFilter] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const where = useSelector(userNotificationSelectors.where);
    const appsList = useSelector<CpRootState, Array<INotificationApp>>((state) =>
        userNotificationSelectors.appsListWithFilter(state, filterApps)
    );
    const app = useSelector<CpRootState, INotificationApp | undefined>((state) =>
        userNotificationSelectors.appsListById(state, where?.apps)
    );

    const blocked = useMemo(() => !(where?.nodeId && where?.appType), [where?.nodeId, where?.appType]);

    const setApps = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            if (!e.target.value) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore todo: damn ts build bug
                dispatch(userNotificationFormActions.setApps(null));
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore todo: damn ts build bug
                dispatch(userNotificationFormActions.setApps(e.target.value as number));
            }
        },
        [dispatch]
    );

    const handleAppsFilterChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((event) => {
        event.stopPropagation();
        setAppsFilter(event.currentTarget.value);
    }, []);

    const renderApps = useCallback((value) => {
        console.log("value ", value);
        return value ? `${value.name}` : "";
    }, []);

    useEffect(() => {
        if (where.appType && where.nodeId) {
            console.log("1 where.appType, where.nodeId = ", where.appType, where.nodeId);
            dispatch(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore todo: damn ts build bug
                userNotificationFormActions.fetchNotificationApps({appType: where.appType, nodeId: where.nodeId})
            ).then(() => {
                setLoading(false);
            });
        } else if (where.appType) {
            console.log("2 where.appType = ", where.appType);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            dispatch(userNotificationFormActions.fetchNotificationApps({appType: where.appType})).then(() => {
                setLoading(false);
            });
        }
    }, [dispatch, where.appType, where.nodeId]);

    useEffect(() => {
        const appListValues = appsList.map((item) => item.id);
        if (where.apps && !loading) {
            if (!appListValues.includes(where.apps) || (blocked && where.apps)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore todo: damn ts build bug
                dispatch(userNotificationFormActions.setApps(null));
            }
        }
    }, [appsList, where.apps, dispatch, loading, blocked]);
    return (
        <Dropdown
            focused={false}
            disabled={blocked}
            renderValue={renderApps}
            onSearch={handleAppsFilterChange}
            withSearch
            searchValue={filterApps}
            onChange={setApps}
            value={app || ""}
            label="APPS">
            <MenuItem key={137} value={0} selected={null === where?.apps}>
                Select all applications
            </MenuItem>
            {appsList.map((item) => (
                <MenuItem key={item.id} value={item.id} selected={item.id === where?.apps}>
                    {item.name}
                </MenuItem>
            ))}
        </Dropdown>
    );
};
