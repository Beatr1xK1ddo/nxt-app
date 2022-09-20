import {Button, TooltipComponent} from "@nxt-ui/components";
import {commonActions} from "@nxt-ui/cp-redux";
import {BasicApplication, EAppGeneralStatus, EAppType, EAppGeneralStatusChange, Optional} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, useCallback, useEffect, useMemo} from "react";
import {useDispatch} from "react-redux";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {styled} from "@mui/system";

const StatusIcon = styled(Icon)<{active: boolean; icon: string}>`
    && {
        cursor: ${({active}) => (active ? "pointer" : "default")};
    }
    & path {
        fill: ${({active, icon}) =>
            active && icon === "pause" ? "(--action)" : !active && icon === "pause" ? "#919699" : "transparent"};
        stroke: ${({active, icon}) =>
            active && icon === "play" ? "(--action)" : !active && icon === "play" ? "#919699" : "transparent"};
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
        return displayStatus === EAppGeneralStatusChange.start ? "play" : "pause";
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
        return icon === "pause" ? "Pause" : "Play";
    }, [icon, active]);

    return (
        <TooltipComponent
            className="white-tooltip"
            arrow={true}
            title={
                <div>
                    <p className="heading">{tooltipTitle}</p>
                </div>
            }>
            <div>
                <Button onClick={handleClick} data-type="btn-icon">
                    <StatusIcon name={icon} active={active} icon={icon} />
                </Button>
            </div>
        </TooltipComponent>
    );
};
