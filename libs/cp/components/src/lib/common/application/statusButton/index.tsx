import {Button} from "@nxt-ui/components";
import {ipbeCommonActions} from "@nxt-ui/cp-redux";
import {BasicApplication, EAppGeneralStatus, EChangeStatus, NumericId, Optional} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, useCallback, useMemo} from "react";
import {useDispatch} from "react-redux";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

type ComponentProps = {
    nodeId: Optional<NumericId>;
    appType: string;
    app: BasicApplication;
};

export const AppStatusButton: FC<ComponentProps> = ({nodeId, appType, app}) => {
    const dispatch = useDispatch();
    const {status} = useRealtimeAppData(nodeId, appType, app.id, app.status, app.startedAtMs);

    const statusChange =
        status === EAppGeneralStatus.error || status === EAppGeneralStatus.active
            ? EChangeStatus.stop
            : EChangeStatus.start;

    const icon = useMemo(() => {
        return statusChange === EChangeStatus.start ? "play" : "pause";
    }, [statusChange]);

    const handleClick = useCallback(() => {
        if (app.id) {
            dispatch(ipbeCommonActions.changeStatuses({statuses: {id: app.id, statusChange}}));
        }
    }, [app.id, dispatch, statusChange]);

    return (
        <Button onClick={handleClick} data-type="btn-icon">
            <Icon name={icon} />
        </Button>
    );
};
