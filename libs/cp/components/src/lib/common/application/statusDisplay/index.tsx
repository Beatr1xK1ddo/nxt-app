import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {BasicApplication, EAppGeneralStatus, EAppGeneralStatusChange, Optional} from "@nxt-ui/cp/types";
import {FC, useEffect, useMemo} from "react";
import styles from "./status.module.scss";
import clsx from "clsx";

type ComponentProps = {
    app: BasicApplication;
    nodeId: Optional<number>;
};

export const AppStatusDisplay: FC<ComponentProps> = ({app, nodeId}) => {
    const {status, statusChange} = useRealtimeAppData(app, nodeId);

    const activeApp = useMemo(() => {
        return status === EAppGeneralStatus.active || status === EAppGeneralStatus.error;
    }, [status]);

    // useEffect(() => {
    //     console.log("status ", status);
    //     console.log("statusChange ", statusChange);
    //     console.log("-------------------------");
    // }, [status, statusChange]);

    const title = useMemo(() => {
        if (!statusChange) {
            return status;
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
        if (statusChange === EAppGeneralStatusChange.stop && status === EAppGeneralStatus.stopped) {
            return "Stopped";
        }
        return status;
    }, [status, statusChange, activeApp]);

    return <span className={clsx(styles["card-status"], status && styles[status])}>{title}</span>;
};
