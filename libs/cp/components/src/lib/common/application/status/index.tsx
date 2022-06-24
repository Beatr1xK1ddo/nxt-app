import {EAppGeneralStatus} from "@nxt-ui/cp/types";
import {FC, useMemo, useEffect, useState} from "react";
import styles from "./status.module.scss";
import {useNotifications} from "@nxt-ui/cp/hooks";

type INodeStatusProps = {
    status?: EAppGeneralStatus;
    name?: string;
};

export const AppStatus: FC<INodeStatusProps> = (props) => {
    const {add} = useNotifications();
    const {status, name} = props;
    const [prevStatus, setPrevStatus] = useState<string>();

    useEffect(() => {
        if (!prevStatus) {
            setPrevStatus(status);
        }
    }, [status]);

    const appName = name ? `"${name}"` : "";

    useEffect(() => {
        prevStatus && prevStatus !== status && add(`Status ${appName} changed to: ${status}`);
    }, [status, prevStatus]);

    const title = useMemo(() => {
        switch (status) {
            case EAppGeneralStatus.new:
                return "New";
            case EAppGeneralStatus.error:
                return "Error";
            case EAppGeneralStatus.active:
                return "Active";
            case EAppGeneralStatus.stopped:
                return "Stopped";
            default:
                return "";
        }
    }, [status]);

    return <span className={`${styles["card-status"]} ${status && styles[status]}`}>{title}</span>;
};
