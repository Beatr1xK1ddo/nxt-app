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

    const activeApp = useMemo(() => {
        return status === EAppGeneralStatus.active || status === EAppGeneralStatus.error;
    }, [status]);

    const title = useMemo(() => {
        console.log("status statusChange", status, statusChange);
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

    useEffect(() => {
        console.log("status statusChange", status, statusChange);
    }, [status, statusChange]);

    // useEffect(() => {
    //     console.log("title ", title);
    //     if (title?.slice(-3) === "ing") {
    //         console.log("inside ING");
    //         timerRef.current = setTimeout(() => {
    //             console.log("EXE");
    //             if (timerRef.current) {
    //                 clearInterval(timerRef.current);
    //             }
    //             if (app.id) {
    //                 dispatch(ipbeEditActions.updateStatus(app.id));
    //             }
    //         }, 6000);
    //     } else {
    //         if (timerRef.current) {
    //             console.log("remove Timeeout");
    //             clearInterval(timerRef.current);
    //         }
    //     }
    // }, [dispatch, app.id, title]);

    // useEffect(() => {
    //     console.log("statusChange prevStatusChange, event =", statusChange, prevStatusChange, event);
    //     if ((!statusChange && event) || (statusChange !== prevStatusChange && event)) {
    //         if (timerRef.current) {
    //             console.log("remove Timeeout");
    //             clearInterval(timerRef.current);
    //         }
    //         setEvent(false);
    //     }
    // }, [statusChange, prevStatusChange, event]);

    // useEffect(() => {
    //     return () => {
    //         setPrevStatusChange((prev) => (prev !== statusChange ? statusChange : prev));
    //     };
    // }, [statusChange]);

    // useEffect(() => {
    //     console.log("prevStatusChange ", prevStatusChange);
    // }, [prevStatusChange]);

    return <span className={clsx(styles["card-status"], status && styles[status])}>{title}</span>;
};
