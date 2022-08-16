import {Button} from "@nxt-ui/components";
import {commonActions} from "@nxt-ui/cp-redux";
import {BasicApplication, EAppGeneralStatus, EAppType, EChangeStatus, Optional} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, useCallback, useMemo} from "react";
import {useDispatch} from "react-redux";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

type ComponentProps = {app: BasicApplication; nodeId: Optional<number>; appType: EAppType};

export const AppStatusButton: FC<ComponentProps> = ({app, nodeId, appType}) => {
    const dispatch = useDispatch();

    const {status} = useRealtimeAppData(app, nodeId);

    const statusChange = useMemo(() => {
        return status === EAppGeneralStatus.error || status === EAppGeneralStatus.active
            ? EChangeStatus.stop
            : EChangeStatus.start;
    }, [status]);

    const icon = useMemo(() => {
        return statusChange === EChangeStatus.start ? "play" : "pause";
    }, [statusChange]);

    const handleClick = useCallback(() => {
        if (app.id && appType) {
            dispatch(
                commonActions.applicationActions.changeStatuses({
                    statuses: {id: app.id, statusChange},
                    appType: appType,
                })
            );
        }
    }, [app.id, appType, dispatch, statusChange]);

    return (
        <Button onClick={handleClick} data-type="btn-icon">
            <Icon name={icon} />
        </Button>
    );
};
