import {Button} from "@nxt-ui/components";
import {commonActions} from "@nxt-ui/cp-redux";
import {BasicApplication, EAppGeneralStatus, EChangeStatus, Optional} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, useCallback, useMemo} from "react";
import {useDispatch} from "react-redux";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

type ComponentProps = {app: BasicApplication; nodeId: Optional<number>};

export const AppStatusButton: FC<ComponentProps> = ({app, nodeId}) => {
    const dispatch = useDispatch();

    const {status} = useRealtimeAppData(nodeId, app.type, app.id);

    const statusChange = useMemo(() => {
        const result =
            status === EAppGeneralStatus.error || status === EAppGeneralStatus.active
                ? EChangeStatus.stop
                : EChangeStatus.start;
        return result;
    }, [status]);

    const icon = useMemo(() => {
        return statusChange === EChangeStatus.start ? "play" : "pause";
    }, [statusChange]);

    const handleClick = useCallback(() => {
        if (app.id && app.type) {
            dispatch(
                commonActions.applicationActions.changeStatuses({
                    statuses: {id: app.id, statusChange},
                    appType: app.type,
                })
            );
        }
    }, [app, dispatch, statusChange]);

    return (
        <Button onClick={handleClick} data-type="btn-icon">
            <Icon name={icon} />
        </Button>
    );
};
