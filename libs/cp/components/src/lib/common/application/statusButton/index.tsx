import {Button, TooltipComponent} from "@nxt-ui/components";
import {commonActions} from "@nxt-ui/cp-redux";
import {BasicApplication, EAppGeneralStatus, EAppType, EAppGeneralStatusChange, Optional} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, useCallback, useMemo} from "react";
import {useDispatch} from "react-redux";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {styled} from "@mui/system";

const StatusIcon = styled(Icon)<{active: number; name: string}>`
    && {
        cursor: ${({active}) => (active ? "pointer" : "default")};
    }
    & path {
        stroke: ${({active, name}) =>
            active && name === "play" ? "(--action)" : !active && name === "play" ? "#919699" : "transparent"};
        fill: ${({active, name}) =>
            active && name === "stop" ? "(--action)" : !active && name === "stop" ? "#919699" : "transparent"};
    }
    & path:last-child {
        fill: ${({active, name}) =>
            active && name === "stop" ? "(--action)" : !active && name === "stop" ? "#919699" : "transparent"};
    }
`;

type ComponentProps = {app: BasicApplication; nodeId: Optional<number>; appType: EAppType};

export const AppStatusButton: FC<ComponentProps> = ({app, nodeId, appType}) => {
    const dispatch = useDispatch();

    const {status, statusChange} = useRealtimeAppData(app, nodeId);

    const displayStatus = useMemo(() => {
        return status === EAppGeneralStatus.error || status === EAppGeneralStatus.active
            ? EAppGeneralStatusChange.stop
            : EAppGeneralStatusChange.start;
    }, [status]);

    const icon = useMemo(() => {
        return displayStatus === EAppGeneralStatusChange.start ? "play" : "stop";
    }, [displayStatus]);

    const active = useMemo(() => !statusChange || displayStatus !== statusChange, [displayStatus, statusChange]);

    const handleClick = useCallback(() => {
        if (active && app.id && appType) {
            dispatch(
                commonActions.applicationActions.changeStatuses({
                    statuses: {id: app.id, statusChange: displayStatus},
                    appType,
                })
            );
        }
    }, [app.id, appType, dispatch, displayStatus, active]);

    const tooltipTitle = useMemo(() => {
        if (!active) {
            return "Waiting for app status response";
        }
        return icon === "stop" ? "Stop" : "Play";
    }, [icon, active]);

    return (
        <TooltipComponent className="card-text" arrow={true} title={<div>{tooltipTitle}</div>}>
            <div>
                <Button data-type="btn-icon" onClick={handleClick}>
                    <StatusIcon name={icon} active={active ? 1 : 0} />
                </Button>
            </div>
        </TooltipComponent>
    );
};
