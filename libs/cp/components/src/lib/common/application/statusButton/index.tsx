import {Button} from "@nxt-ui/components";
import {commonActions} from "@nxt-ui/cp-redux";
import {BasicApplication, EAppGeneralStatus, EAppType, EChangeStatus, Optional} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, useCallback, useMemo} from "react";
import {useDispatch} from "react-redux";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

type ComponentProps = {nodeId: Optional<number>; appType: EAppType; app: BasicApplication};

export const AppStatusButton: FC<ComponentProps> = ({nodeId, appType, app}) => {
    const dispatch = useDispatch();
    const {status} = useRealtimeAppData(nodeId, appType, app.id, app.startedAtMs);

    const statusChange = useMemo(() => {
        const value = status ? status : app.status;
        const result =
            value === EAppGeneralStatus.error || value === EAppGeneralStatus.active
                ? EChangeStatus.stop
                : EChangeStatus.start;
        return result;
    }, [app.status, status]);

    const icon = useMemo(() => {
        return statusChange === EChangeStatus.start ? "play" : "pause";
    }, [statusChange]);

    const handleClick = useCallback(() => {
        if (app.id) {
            dispatch(commonActions.statusesActions.changeStatuses({statuses: {id: app.id, statusChange}, appType}));
        }
    }, [app.id, dispatch, statusChange]);

    return (
        <Button onClick={handleClick} data-type="btn-icon">
            <Icon name={icon} />
        </Button>
    );
};
