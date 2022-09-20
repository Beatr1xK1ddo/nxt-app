import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {BasicApplication, EAppGeneralStatus, EAppGeneralStatusChange, Optional} from "@nxt-ui/cp/types";
import {FC, useMemo} from "react";
import styles from "./status.module.scss";
import clsx from "clsx";

type ComponentProps = {
    app: BasicApplication;
    nodeId: Optional<number>;
};

export const AppStatusDisplay: FC<ComponentProps> = ({app, nodeId}) => {
    const {status, statusChange} = useRealtimeAppData(app, nodeId);

    const activeApp = useMemo(() => {
        const currentStatus = status || app.status;
        return currentStatus === EAppGeneralStatus.active || currentStatus === EAppGeneralStatus.error;
    }, [status, app.status]);

    const title = useMemo(() => {
        const currentStatusChange = statusChange || app.statusChange;
        if (!currentStatusChange) {
            return status;
        }
        if (currentStatusChange === EAppGeneralStatusChange.start && !activeApp) {
            return "Starting";
        }
        if (currentStatusChange === EAppGeneralStatusChange.stop && activeApp) {
            return "Stopping";
        }
        if (currentStatusChange === EAppGeneralStatusChange.restart) {
            return "Restarting";
        }
        if (currentStatusChange === EAppGeneralStatusChange.stop && status === EAppGeneralStatus.stopped) {
            return "Stopped";
        }
        return status;
    }, [activeApp, statusChange, app.statusChange, status]);

    const derivedStatus = useMemo(() => {
        return status || app.status;
    }, [status, app.status]);

    return <span className={clsx(styles["card-status"], derivedStatus && styles[derivedStatus])}>{title}</span>;
};
