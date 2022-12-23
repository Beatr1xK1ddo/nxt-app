import {Dropdown} from "@nxt-ui/components";
import {ChangeEventHandler, FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CpDispatch, CpRootState, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {userNotificationFormActions} from "@nxt-ui/cp-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {INotificationEmploye} from "@nxt-ui/cp/api";

export const NotificationEmployeSelector: FC = () => {
    const dispatch = useDispatch<CpDispatch>();
    const [filterEmployes, setEmployesFilter] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const whome = useSelector(userNotificationSelectors.whome);
    const employes = useSelector<CpRootState, Array<INotificationEmploye>>((state) =>
        userNotificationSelectors.employesWithFilter(state, filterEmployes)
    );

    const employe = useSelector<CpRootState, INotificationEmploye | undefined>((state) =>
        userNotificationSelectors.employesById(state, whome?.employe)
    );

    const setEmploye = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(userNotificationFormActions.setEmploye(e.target.value as number));
        },
        [dispatch]
    );

    const handleEmployesFilterChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (event) => {
            event.stopPropagation();
            setEmployesFilter(event.currentTarget.value);
        },
        []
    );

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore todo: damn ts build bug
        dispatch(userNotificationFormActions.fetchNotificationEmploye(whome?.company)).then(() => setLoading(false));
        setLoading(true);
    }, [dispatch, whome?.company]);

    useEffect(() => {
        const appListValues = employes.map((item) => item.id);
        if (whome.company) {
            if (!appListValues.includes(whome.company)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore todo: damn ts build bug
                dispatch(userNotificationFormActions.setEmploye(null));
            }
        }
    }, [employes, whome.company, dispatch]);

    const renderEmploye = useCallback(
        (value) => (employe ? `${employe?.email}` : !whome?.company ? "" : ""),
        [employe, whome?.company]
    );

    return (
        <Dropdown
            focused={false}
            disabled={!whome?.company || loading}
            onSearch={handleEmployesFilterChange}
            withSearch
            searchValue={filterEmployes}
            onChange={setEmploye}
            value={employe}
            renderValue={renderEmploye}
            inputWidth={430}
            label="EMPLOYEE">
            {employes.map((item) => (
                <MenuItem key={item.id} value={item.id} selected={item.id === whome.employe}>
                    {item.email}
                </MenuItem>
            ))}
        </Dropdown>
    );
};
