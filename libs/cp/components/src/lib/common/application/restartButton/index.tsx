import {BasicApplication, EAppGeneralStatus, EAppType, EChangeStatus, Optional} from "@nxt-ui/cp/types";
import {FC, useCallback, useMemo} from "react";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {useDispatch} from "react-redux";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {commonActions} from "@nxt-ui/cp-redux";
import {styled} from "@mui/system";

const RestartIcon = styled(Icon)<{active: boolean}>`
    & path {
        fill: ${({active}) => (active ? "(--action)" : "#919699")};
    }
`;

type ComponentProps = {app: BasicApplication; nodeId: Optional<number>; appType: EAppType};
export const AppRestartButton: FC<ComponentProps> = ({app, nodeId, appType}) => {
    const dispatch = useDispatch();

    const {status} = useRealtimeAppData(app, nodeId);

    const active = useMemo(() => {
        return status === EAppGeneralStatus.error || status === EAppGeneralStatus.active;
    }, [status]);

    const handleClick = useCallback(() => {
        if (app.id && appType && active) {
            dispatch(
                commonActions.applicationActions.changeStatuses({
                    statuses: {id: app.id, statusChange: EChangeStatus.start},
                    appType,
                    restart: true,
                })
            );
        }
    }, [app.id, appType, dispatch, active]);

    return (
        <Button data-type="btn-icon" onClick={handleClick}>
            <RestartIcon name="loop" active={active} />
        </Button>
    );
};
