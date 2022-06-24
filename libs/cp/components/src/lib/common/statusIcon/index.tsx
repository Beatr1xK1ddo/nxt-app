import {Button} from "@nxt-ui/components";
import {ipbeCommonActions} from "@nxt-ui/cp-redux";
import {EAppGeneralStatus, EChangeStatus, NumericId, Optional, ENotificationType} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, useCallback, useMemo, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNotifications} from "@nxt-ui/cp/hooks";

type ComponentProps = {
    appId: Optional<NumericId>;
    status: EAppGeneralStatus;
    name: string;
};

export const StatusIcon: FC<ComponentProps> = ({appId, status, name}) => {
    const {add} = useNotifications();

    const dispatch = useDispatch();
    const statusChange =
        status === EAppGeneralStatus.error || status === EAppGeneralStatus.active
            ? EChangeStatus.stop
            : EChangeStatus.start;

    const icon = useMemo(() => {
        return statusChange === EChangeStatus.start ? "play" : "pause";
    }, [statusChange]);

    const handleClick = useCallback(() => {
        appId && dispatch(ipbeCommonActions.changeStatus({id: appId, statusChange: statusChange, name: name}));
    }, [appId, statusChange, name]);

    const [prevStatus, setPrevStatus] = useState<string | undefined>();

    useEffect(() => {
        status !== EAppGeneralStatus.new && setPrevStatus(status);
    }, [status]);

    useEffect(() => {
        prevStatus && prevStatus !== status && add(`Status changed to: ${status}`);
    }, [status, prevStatus]);

    return (
        <Button onClick={handleClick} data-type="btn-icon">
            <Icon name={icon} />
        </Button>
    );
};
