import {MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {ipbeCommonActions} from "@nxt-ui/cp-redux";
import {EChangeStatus} from "@nxt-ui/cp/types";
import {useCallback, forwardRef, useMemo} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

type IIpbeItemActions = {
    open: boolean;
    onClose?(): void;
    id: number;
    name: string;
};

export const IpbeItemActions = forwardRef<HTMLDivElement | null, IIpbeItemActions>((props, ref) => {
    const {onClose, id, name} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const reference = useMemo(() => {
        if (typeof ref === "function") {
            return null;
        }
        return ref;
    }, [ref]);

    const handleDeleteIpbe = useCallback(() => {
        onClose?.();
        dispatch(ipbeCommonActions.removeIpbes([id]));
    }, [dispatch, id, onClose]);

    const handleEditIpbe = useCallback(() => {
        onClose?.();
        navigate(`/ipbe/${id}`);
    }, [id, navigate, onClose]);

    const handleCloneIpbe = useCallback(() => {
        onClose?.();
        console.log("clone");
    }, [onClose]);

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
        dispatch(ipbeCommonActions.changeStatuses([{id, statusChange: EChangeStatus.start}]));
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
        dispatch(ipbeCommonActions.changeStatuses([{id, statusChange: EChangeStatus.start}]));
    }, [onClose, id, dispatch]);

    const handleStopIpbe = useCallback(() => {
        onClose?.();
        dispatch(ipbeCommonActions.changeStatuses([{id, statusChange: EChangeStatus.stop}]));
    }, [onClose, id, dispatch]);

    const handleProbeSdiIpbe = useCallback(() => {
        onClose?.();
        console.log("Probe SDI");
    }, [onClose]);

    const handleViewLogsIpbe = useCallback(() => {
        onClose?.();
        console.log("View logs");
    }, [onClose]);

    return (
        <MenuComponent
            anchorEl={reference?.current}
            open={props.open}
            onClose={props.onClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
            className="test">
            <MenuItemStyled onClick={handleProbeSdiIpbe}>Probe SDI</MenuItemStyled>
            <MenuItemStyled onClick={handleViewLogsIpbe}>View logs</MenuItemStyled>
            <MenuItemStyled onClick={handleChannelViewIpbe}>Channel view</MenuItemStyled>
            <MenuItemStyled onClick={handleViewHistoryIpbe}>View history</MenuItemStyled>
            <MenuItemStyled onClick={handleStartIpbe}>Start</MenuItemStyled>
            <MenuItemStyled onClick={handleStopIpbe}>Stop</MenuItemStyled>
            <MenuItemStyled onClick={handleRestartIpbe}>Restart</MenuItemStyled>
            <MenuItemStyled onClick={handleMonitoringIpbe}>Monitoring</MenuItemStyled>
            <MenuItemStyled onClick={handleAddToFavouritesIpbe}>Add to favourites</MenuItemStyled>
            <MenuItemStyled onClick={handleMigrateIpbe}>Migrate</MenuItemStyled>
            <MenuItemStyled onClick={handleCloneIpbe}>Clone</MenuItemStyled>
            <MenuItemStyled onClick={handleEditIpbe}>Edit</MenuItemStyled>
            <MenuItemStyled onClick={handleDeleteIpbe}>Delete</MenuItemStyled>
        </MenuComponent>
    );
});
