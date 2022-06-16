import {Button} from "@nxt-ui/components";
import {ipbeCommonActions} from "@nxt-ui/cp-redux";
import {useNotifications} from "@nxt-ui/cp/hooks";
import {EAppGeneralStatus, EChangeStatus, NumericId, Optional} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";

type ComponentProps = {
    appId: Optional<NumericId>;
    status: EAppGeneralStatus;
};

export const StatusIcon: FC<ComponentProps> = ({appId, status}) => {
    const [previousStatus, setPrevStatus] = useState<EAppGeneralStatus | null>(status);
    const dispatch = useDispatch();

    const {add} = useNotifications();

    const handlePlayAction = useCallback(() => {
        if (appId) {
            if (status === EAppGeneralStatus.error || status === EAppGeneralStatus.active) {
                dispatch(ipbeCommonActions.changeStatuses([{id: appId, statusChange: EChangeStatus.stop}]));
            } else {
                dispatch(ipbeCommonActions.changeStatuses([{id: appId, statusChange: EChangeStatus.start}]));
            }
        }
    }, [status, appId, dispatch]);

    useEffect(() => {
        if (previousStatus !== status) {
            add(`Status changed to: ${status}`);
        }
        setPrevStatus(status);
    }, [status]);

    const icon = useMemo(() => {
        if (status === EAppGeneralStatus.error || status === EAppGeneralStatus.active) {
            return <Icon name="pause" />;
        }
        return <Icon name="play" />;
    }, [status]);

    return (
        <Button onClick={handlePlayAction} data-type="btn-icon">
            {icon}
        </Button>
    );
};
