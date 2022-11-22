import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {BasicApplication, EAppGeneralStatus, EAppGeneralStatusChange, Optional} from "@nxt-ui/cp/types";
import {FC, useEffect, useMemo, useRef, useState} from "react";
import styles from "./status.module.scss";
import clsx from "clsx";
import {useDispatch} from "react-redux";
import {ipbeEditActions} from "@nxt-ui/cp-redux";

type ComponentProps = {
    app: BasicApplication;
    nodeId: Optional<number>;
};

export const AppStatusDisplay: FC<ComponentProps> = ({app, nodeId}) => {
    const {status, statusChange} = useRealtimeAppData(app, nodeId);
    const dispatch = useDispatch();
    const timerRef = useRef<NodeJS.Timer>();

    const [prevStatusChange, setPrevStatusChange] = useState<Optional<EAppGeneralStatusChange>>(app.statusChange);

    const activeApp = useMemo(() => {
        return status === EAppGeneralStatus.active || status === EAppGeneralStatus.error;
    }, [status]);

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
        if (statusChange === EAppGeneralStatusChange.start && activeApp) {
            return "Restarting";
        }
        if (statusChange === EAppGeneralStatusChange.stop && status === EAppGeneralStatus.stopped) {
            return "Stopped";
        }
        return status;
    }, [status, statusChange, activeApp]);

    // useEffect(() => {
    //     if (title?.slice(-3) === "ing") {
    //         timerRef.current = setTimeout(() => {
    //             if (app.id) {
    //                 dispatch(ipbeEditActions.updateStatus(app.id));
    //             }
    //         }, 30000);
    //     }
    // }, [dispatch, app.id, title]);

    // useEffect(() => {
    //     if (statusChange !== prevStatusChange && timerRef.current) {
    //         clearInterval(timerRef.current);
    //         setPrevStatusChange(statusChange);
    //     }
    // }, [statusChange, prevStatusChange]);

    return <span className={clsx(styles["card-status"], status && styles[status])}>{title}</span>;
};
