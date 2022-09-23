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

    const derivedStatus = useMemo(() => {
        return status || app.status;
    }, [status, app.status]);

    const activeApp = useMemo(() => {
        return derivedStatus === EAppGeneralStatus.active || derivedStatus === EAppGeneralStatus.error;
    }, [derivedStatus]);

    const title = useMemo(() => {
        if (!statusChange) {
            return derivedStatus;
        }
        if (statusChange === EAppGeneralStatusChange.start && !activeApp) {
            return "Starting";
        }
        if (statusChange === EAppGeneralStatusChange.stop && activeApp) {
            return "Stopping";
        }
        if (statusChange === EAppGeneralStatusChange.restart) {
            return "Restarting";
        }
        if (statusChange === EAppGeneralStatusChange.stop && derivedStatus === EAppGeneralStatus.stopped) {
            return "Stopped";
        }
        return derivedStatus;
    }, [derivedStatus, statusChange, activeApp]);

    return <span className={clsx(styles["card-status"], derivedStatus && styles[derivedStatus])}>{title}</span>;
};
