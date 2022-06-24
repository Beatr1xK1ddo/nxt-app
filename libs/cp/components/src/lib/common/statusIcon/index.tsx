import {Button} from "@nxt-ui/components";
import {ipbeCommonActions} from "@nxt-ui/cp-redux";
import {EAppGeneralStatus, EChangeStatus, NumericId, Optional} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

export const StatusChangeButton: FC = () => {
    const dispatch = useDispatch();
    const nodeId = useSelector(ipbeEditSelectors.main.node);
    const ipbe = useSelector(ipbeEditSelectors.selectBasicApplication);
    const {status} = useRealtimeAppData(nodeId, "ipbe2", ipbe.id, ipbe.status, ipbe.startedAtMs);

    const statusChange =
        status === EAppGeneralStatus.error || status === EAppGeneralStatus.active
            ? EChangeStatus.stop
            : EChangeStatus.start;

    const icon = useMemo(() => {
        return statusChange === EChangeStatus.start ? "play" : "pause";
    }, [statusChange]);

    const handleClick = useCallback(() => {
        ipbe.id && dispatch(ipbeCommonActions.changeStatuses({statuses: {id: ipbe.id, statusChange: statusChange}}));
    }, [ipbe.id, dispatch, statusChange]);

    return (
        <Button onClick={handleClick} data-type="btn-icon">
            <Icon name={icon} />
        </Button>
    );
};
