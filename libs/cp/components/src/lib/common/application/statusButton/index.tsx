import {Button} from "@nxt-ui/components";
import {commonActions} from "@nxt-ui/cp-redux";
import {BasicApplication, EAppGeneralStatus, EChangeStatus} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, useCallback, useMemo} from "react";
import {useDispatch} from "react-redux";

type ComponentProps = {app: BasicApplication; status?: EAppGeneralStatus};

export const AppStatusButton: FC<ComponentProps> = ({app, status}) => {
    const dispatch = useDispatch();

    const statusChange = useMemo(() => {
        const value = status ? status : app.status;
        const result =
            value === EAppGeneralStatus.error || value === EAppGeneralStatus.active
                ? EChangeStatus.stop
                : EChangeStatus.start;
        return result;
    }, [status, app.status]);

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
