import {MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {commonActions} from "@nxt-ui/cp-redux";
import {DeleteModal} from "@nxt-ui/cp/components";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {EAppGeneralStatus, EAppType, EAppGeneralStatusChange, IIpbeListItem, EApiAppType} from "@nxt-ui/cp/types";
import {useCallback, forwardRef, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

type IIpbeItemActions = {
    open: boolean;
    onClose?(): void;
    nodeId: number;
    ipbe: IIpbeListItem;
};

export const IpbeItemActions = forwardRef<HTMLDivElement | null, IIpbeItemActions>((props, ref) => {
    const {onClose, ipbe, nodeId} = props;
    const {id, name} = ipbe;
    const {status, statusChange} = useRealtimeAppData(ipbe, nodeId);

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

    const handleDeleteIpbe = useCallback(() => {
        onClose?.();
        setOpen(false);
        dispatch(commonActions.applicationActions.removeApplications({data: {id, name}, appType: EAppType.IPBE}));
    }, [dispatch, id, onClose, name]);

    const handleEditIpbe = useCallback(() => {
        onClose?.();
        navigate(`/ipbe/${id}`);
    }, [id, navigate, onClose]);

    const handleCloneIpbe = useCallback(() => {
        onClose?.();
        setOpen(false);
        if (id) {
            dispatch(
                commonActions.applicationActions.cloneApplications({ids: [id], appType: EAppType.IPBE, appName: name})
            );
        }
    }, [onClose, id, dispatch, name]);

    const handleMigrateIpbe = useCallback(() => {
        onClose?.();
    }, [onClose]);

    const handleAddToFavouritesIpbe = useCallback(() => {
        onClose?.();
    }, [onClose]);

    const handleRestartIpbe = useCallback(() => {
        onClose?.();
        dispatch(
            commonActions.applicationActions.changeStatuses({
                statuses: {id, statusChange: EAppGeneralStatusChange.start},
                appType: EAppType.IPBE,
            })
        );
    }, [onClose, id, dispatch]);

    const handleStartIpbe = useCallback(() => {
        onClose?.();
        dispatch(
            commonActions.applicationActions.changeStatuses({
                statuses: {id, statusChange: EAppGeneralStatusChange.start},
                appType: EAppType.IPBE,
            })
        );
    }, [onClose, id, dispatch]);

    const handleStopIpbe = useCallback(() => {
        onClose?.();
        dispatch(
            commonActions.applicationActions.changeStatuses({
                statuses: {id, statusChange: EAppGeneralStatusChange.stop},
                appType: EAppType.IPBE,
            })
        );
    }, [onClose, id, dispatch]);

    const handleProbeSdiIpbe = useCallback(() => {
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
                <MenuItemStyled onClick={handleProbeSdiIpbe}>Probe SDI</MenuItemStyled>
                <MenuItemStyled>
                    <a
                        href={`${window.location.origin}/log/list?log_filter[entityId]=${id}&log_filter[entityType]=Nl\\DavinciBundle\\Entity\\Ipbe”`}>
                        View logs
                    </a>
                </MenuItemStyled>
                <MenuItemStyled>
                    <a href={`${window.location.origin}/channel/tree/ipbe2/${id}`}>Channel view</a>
                </MenuItemStyled>
                {!started && <MenuItemStyled onClick={handleStartIpbe}>Start</MenuItemStyled>}
                {started && <MenuItemStyled onClick={handleStopIpbe}>Stop</MenuItemStyled>}
                {started && <MenuItemStyled onClick={handleRestartIpbe}>Restart</MenuItemStyled>}
                <MenuItemStyled>
                    <a href={`${window.location.origin}/monitor/history/${EApiAppType.IPBE}/${id}`}>
                        Monitoring history
                    </a>
                </MenuItemStyled>
                <MenuItemStyled onClick={handleAddToFavouritesIpbe}>Add to favourites</MenuItemStyled>
                <MenuItemStyled onClick={handleMigrateIpbe}>Migrate</MenuItemStyled>
                <MenuItemStyled onClick={handleCloneIpbe}>Clone</MenuItemStyled>
                <MenuItemStyled onClick={handleEditIpbe}>Edit</MenuItemStyled>
                <MenuItemStyled onClick={handleMenuOpen}>Delete</MenuItemStyled>
            </MenuComponent>
            <DeleteModal
                text="Delete SDI to IP encoder"
                title="Confirm action"
                open={open}
                onAprove={handleDeleteIpbe}
                onClose={handleMenuClose}
            />
        </>
    );
});
