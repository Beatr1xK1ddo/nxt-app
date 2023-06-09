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
            console.log("value ", e.target.value);
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

    const renderEmploye = useCallback(
        (value) => {
            return employe ? `${employe?.email}` : !whome?.company ? "" : "Any User";
        },
        [employe, whome?.company]
    );

    useEffect(() => {
        setLoading(true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore todo: damn ts build bug
        dispatch(userNotificationFormActions.fetchNotificationEmploye(whome?.company))
            .unwrap()
            .finally(() => setLoading(false));
    }, [dispatch, whome?.company]);

    useEffect(() => {
        const appListValues = employes.map((item) => item.id);
        if (whome.employe && !appListValues.includes(whome.employe) && !loading) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            dispatch(userNotificationFormActions.setEmploye(null));
        }
    }, [employes, whome.employe, dispatch, loading]);

    return (
        <Dropdown
            focused={false}
            disabled={!whome?.company || loading}
            onSearch={handleEmployesFilterChange}
            withSearch
            searchValue={filterEmployes}
            onChange={setEmploye}
            value={whome.employe}
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
