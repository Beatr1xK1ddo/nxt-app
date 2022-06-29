import {Button} from "@nxt-ui/components";
import {ipbeCommonActions} from "@nxt-ui/cp-redux";
import {EAppGeneralStatus, EChangeStatus, Optional} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, useCallback, useMemo} from "react";
import {useDispatch} from "react-redux";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

type ComponentProps = {
    initialStatus: EAppGeneralStatus;
    appId: Optional<number>;
    startedAtMs: Optional<number>;
    nodeId: Optional<number>;
    appType: string;
};

export const StatusChangeButton: FC<ComponentProps> = ({appId, startedAtMs, nodeId, initialStatus, appType}) => {
    const dispatch = useDispatch();
    const {status} = useRealtimeAppData(nodeId, appType, appId, startedAtMs);

    const statusChange = useMemo(() => {
        const value = status ? status : initialStatus;
        const result =
            value === EAppGeneralStatus.error || value === EAppGeneralStatus.active
                ? EChangeStatus.stop
                : EChangeStatus.start;
        return result;
    }, [initialStatus, status]);

    const icon = useMemo(() => {
        return statusChange === EChangeStatus.start ? "play" : "pause";
    }, [statusChange]);

    const handleClick = useCallback(() => {
        if (appId) {
            dispatch(ipbeCommonActions.changeStatuses({statuses: {id: appId, statusChange}}));
        }
    }, [appId, dispatch, statusChange]);

    return (
        <Button onClick={handleClick} data-type="btn-icon">
            <Icon name={icon} />
        </Button>
    );
};
