import {MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {commonActions} from "@nxt-ui/cp-redux";
import {DeleteModal} from "@nxt-ui/cp/components";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {EAppGeneralStatus, EAppType, EAppGeneralStatusChange, ITxrListItem, EApiAppType} from "@nxt-ui/cp/types";
import {useCallback, forwardRef, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

type ITxrItemActions = {
    open: boolean;
    onClose?(): void;
    nodeId: number;
    item: ITxrListItem;
};

export const TxrItemActions = forwardRef<HTMLDivElement | null, ITxrItemActions>((props, ref) => {
    const {onClose, item, nodeId} = props;
    const {id, name} = item;
    const {status, statusChange} = useRealtimeAppData(item, nodeId);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>(false);

    const reference = useMemo(() => {
        if (typeof ref === "function") {
            return null;
        }
        return ref;
    }, [ref]);

    const started = useMemo(() => {
        const activeApp = status === EAppGeneralStatus.error || status === EAppGeneralStatus.active;
        if (statusChange === EAppGeneralStatusChange.start && !activeApp) {
            return true;
        }
        return activeApp;
    }, [status, statusChange]);

    const handleMenuClose = useCallback(() => {
        onClose?.();
        setOpen(false);
    }, [onClose]);

    const handleMenuOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleDelete = useCallback(() => {
        onClose?.();
        setOpen(false);
        dispatch(commonActions.applicationActions.removeApplications({data: {id, name}, appType: EAppType.TXR}));
    }, [dispatch, id, onClose, name]);

    const handleEdit = useCallback(() => {
        onClose?.();
        navigate(`/txr/${id}`);
    }, [id, navigate, onClose]);

    const handleRestart = useCallback(() => {
        onClose?.();
        dispatch(
            commonActions.applicationActions.changeStatuses({
                statuses: {id, statusChange: EAppGeneralStatusChange.start},
                appType: EAppType.TXR,
            })
        );
    }, [onClose, id, dispatch]);

    const handleStart = useCallback(() => {
        onClose?.();
        dispatch(
            commonActions.applicationActions.changeStatuses({
                statuses: {id, statusChange: EAppGeneralStatusChange.start},
                appType: EAppType.TXR,
            })
        );
    }, [onClose, id, dispatch]);

    const handleStop = useCallback(() => {
        onClose?.();
        dispatch(
            commonActions.applicationActions.changeStatuses({
                statuses: {id, statusChange: EAppGeneralStatusChange.stop},
                appType: EAppType.TXR,
            })
        );
    }, [onClose, id, dispatch]);

    const handleClone = useCallback(() => {
        onClose?.();
        setOpen(false);
        if (id) {
            dispatch(
                commonActions.applicationActions.cloneApplications({ids: [id], appType: EAppType.TXR, appName: name})
            );
        }
    }, [onClose, id, dispatch, name]);

    const handleAddToFavourites = useCallback(() => {
        onClose?.();
    }, [onClose]);

    const handleMigrate = useCallback(() => {
        onClose?.();
    }, [onClose]);

    return (
        <>
            <MenuComponent
                anchorEl={reference?.current}
                open={props.open}
                onClose={props.onClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                className="test">
                <MenuItemStyled>
                    <a
                        href={`${window.location.origin}/log/list?log_filter[entityId]=${id}&log_filter[entityType]=Nl\\DavinciBundle\\Entity\\Txr”`}>
                        View logs
                    </a>
                </MenuItemStyled>
                <MenuItemStyled>
                    <a href={`${window.location.origin}/channel/tree/txr2/${id}`}>Channel view</a>
                </MenuItemStyled>
                {!started && <MenuItemStyled onClick={handleStart}>Start</MenuItemStyled>}
                {started && <MenuItemStyled onClick={handleStop}>Stop</MenuItemStyled>}
                {started && <MenuItemStyled onClick={handleRestart}>Restart</MenuItemStyled>}
                <MenuItemStyled>
                    <a href={`${window.location.origin}/monitor/history/${EApiAppType.TXR}/${id}`}>
                        Monitoring history
                    </a>
                </MenuItemStyled>
                <MenuItemStyled onClick={handleAddToFavourites}>Add to favourites</MenuItemStyled>
                <MenuItemStyled onClick={handleMigrate}>Migrate</MenuItemStyled>
                <MenuItemStyled onClick={handleClone}>Clone</MenuItemStyled>
                <MenuItemStyled onClick={handleEdit}>Edit</MenuItemStyled>
                <MenuItemStyled onClick={handleMenuOpen}>Delete</MenuItemStyled>
            </MenuComponent>
            <DeleteModal
                text="Delete transfer"
                title="Confirm action"
                open={open}
                onAprove={handleDelete}
                onClose={handleMenuClose}
            />
        </>
    );
});
