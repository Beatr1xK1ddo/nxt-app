import {Button} from "@nxt-ui/components";
import {commonActions} from "@nxt-ui/cp-redux";
import {BasicApplication, EAppGeneralStatus, EAppType, EChangeStatus, Optional} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, useCallback, useMemo} from "react";
import {useDispatch} from "react-redux";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {styled} from "@mui/system";

const StatusIcon = styled(Icon)<{active: boolean}>`
    & path {
        fill: transparent;
        stroke: ${({active}) => (active ? "(--action)" : "#919699")};
    }
`;

const StatusButton = styled(Button)<{active: boolean}>`
    && {
        cursor: ${({active}) => (active ? "pointer" : "default")};
    }
`;

type ComponentProps = {app: BasicApplication; nodeId: Optional<number>; appType: EAppType};

export const AppStatusButton: FC<ComponentProps> = ({app, nodeId, appType}) => {
    const dispatch = useDispatch();

    const {status, statusChange} = useRealtimeAppData(app, nodeId);

    const displayStatus = useMemo(() => {
        return status === EAppGeneralStatus.error || status === EAppGeneralStatus.active
            ? EChangeStatus.stop
            : EChangeStatus.start;
    }, [status]);

    const icon = useMemo(() => {
        return displayStatus === EChangeStatus.start ? "play" : "pause";
    }, [displayStatus]);

    const active = useMemo(() => status === statusChange, [status, statusChange]);

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

    return (
        <StatusButton active={active} onClick={handleClick} data-type="btn-icon">
            <StatusIcon name={icon} active={active} />
        </StatusButton>
    );
};
