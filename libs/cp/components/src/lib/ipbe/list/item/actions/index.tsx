import {MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {commonActions, ipbeEditActions} from "@nxt-ui/cp-redux";
import {DeleteModal} from "@nxt-ui/cp/components";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {EAppGeneralStatus, EAppType, EAppGeneralStatusChange, IIpbeListItem} from "@nxt-ui/cp/types";
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
    const {status} = useRealtimeAppData(ipbe, nodeId);

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
        return status === EAppGeneralStatus.error || status === EAppGeneralStatus.active;
    }, [status]);

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
            dispatch(ipbeEditActions.cloneIpbe({id: [id], appName: name}));
        }
    }, [onClose, id, dispatch, name]);

    const handleMigrateIpbe = useCallback(() => {
        onClose?.();
        console.log("Migrate");
    }, [onClose]);

    const handleAddToFavouritesIpbe = useCallback(() => {
        onClose?.();
        console.log("Add to favourites");
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

    const handleMonitoringIpbe = useCallback(() => {
        onClose?.();
        console.log("Monitoring");
    }, [onClose]);

    const handleChannelViewIpbe = useCallback(() => {
        onClose?.();
        console.log("Channel view");
    }, [onClose]);

    const handleViewHistoryIpbe = useCallback(() => {
        onClose?.();
        console.log("View history");
    }, [onClose]);

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
        console.log("Probe Sdi");
    }, [onClose]);

    const handleViewLogsIpbe = useCallback(() => {
        onClose?.();
        console.log("View logs");
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
                className="test"
            >
                <MenuItemStyled onClick={handleProbeSdiIpbe}>Probe SDI</MenuItemStyled>
                <MenuItemStyled onClick={handleViewLogsIpbe}>View logs</MenuItemStyled>
                <MenuItemStyled onClick={handleChannelViewIpbe}>Channel view</MenuItemStyled>
                <MenuItemStyled onClick={handleViewHistoryIpbe}>View history</MenuItemStyled>
                {started ? (
                    <MenuItemStyled onClick={handleStopIpbe}>Stop</MenuItemStyled>
                ) : (
                    <MenuItemStyled onClick={handleStartIpbe}>Start</MenuItemStyled>
                )}
                <MenuItemStyled onClick={handleRestartIpbe}>Restart</MenuItemStyled>
                <MenuItemStyled onClick={handleMonitoringIpbe}>Monitoring</MenuItemStyled>
                <MenuItemStyled onClick={handleAddToFavouritesIpbe}>Add to favourites</MenuItemStyled>
                <MenuItemStyled onClick={handleMigrateIpbe}>Migrate</MenuItemStyled>
                <MenuItemStyled onClick={handleCloneIpbe}>Clone</MenuItemStyled>
                <MenuItemStyled onClick={handleEditIpbe}>Edit</MenuItemStyled>
                <MenuItemStyled onClick={handleMenuOpen}>Delete</MenuItemStyled>
            </MenuComponent>
            <DeleteModal
                text="Delete ipbe"
                title="Confirm action"
                open={open}
                onAprove={handleDeleteIpbe}
                onClose={handleMenuClose}
            />
        </>
    );
});
