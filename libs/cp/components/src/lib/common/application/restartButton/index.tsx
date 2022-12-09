import {BasicApplication, EAppGeneralStatus, EAppGeneralStatusChange, EAppType, Optional} from "@nxt-ui/cp/types";
import {FC, useCallback, useMemo} from "react";
import {Button, TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {commonActions} from "@nxt-ui/cp-redux";
import {styled} from "@mui/system";
import {useDispatch} from "react-redux";

const RestartIcon = styled(Icon)<{active: number}>`
    && {
        cursor: ${({active}) => (active ? "pointer" : "initial")};

        path {
            fill: ${({active}) => (active ? "(--action)" : "#919699")};
        }
    }
`;

type ComponentProps = {
    app: BasicApplication;
    nodeId: Optional<number>;
    appType: EAppType;
};
export const AppRestartButton: FC<ComponentProps> = ({app, nodeId, appType}) => {
    const dispatch = useDispatch();

    const {status} = useRealtimeAppData(app, nodeId);

    const active = useMemo(() => {
        return status === EAppGeneralStatus.active || status === EAppGeneralStatus.error;
    }, [status]);

    const handleClick = useCallback(() => {
        if (app.id && appType && active) {
            dispatch(
                commonActions.applicationActions.changeStatuses({
                    statuses: {id: app.id, statusChange: EAppGeneralStatusChange.start},
                    appType,
                    restart: true,
                })
            );
        }
    }, [app.id, appType, dispatch, active]);

    return (
        <TooltipComponent className="card-text" arrow title={<div>Restart</div>}>
            <div>
                <Button data-type="btn-icon" onClick={handleClick}>
                    <RestartIcon name="loop" active={active ? 1 : 0} />
                </Button>
            </div>
        </TooltipComponent>
    );
};
