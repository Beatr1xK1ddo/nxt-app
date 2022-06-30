import {EAppGeneralStatus} from "@nxt-ui/cp/types";
import {FC, useMemo, useEffect, useState} from "react";
import styles from "./status.module.scss";
import {useNotifications} from "@nxt-ui/cp/hooks";

type ComponentProps = {
    initialStatus?: EAppGeneralStatus;
    status?: EAppGeneralStatus;
    name?: string;
};

export const AppStatusDisplay: FC<ComponentProps> = (props) => {
    const {add} = useNotifications();
    const {status, initialStatus, name} = props;
    const [prevStatus, setPrevStatus] = useState<EAppGeneralStatus | undefined>(initialStatus);

    const appName = name ? `"${name}"` : "";

    const currentStatus = useMemo(() => {
        return status || initialStatus;
    }, [status, initialStatus]);

    useEffect(() => {
        if (!status) {
            setPrevStatus(initialStatus);
        }
    }, [initialStatus]);

    useEffect(() => {
        if (status && status !== prevStatus) {
            add(`Status ${appName} changed to: ${status}`);
            setPrevStatus(status);
        }
    }, [status]);

    const title = useMemo(() => {
        switch (currentStatus) {
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
    }, [currentStatus]);

    return <span className={`${styles["card-status"]} ${currentStatus && styles[currentStatus]}`}>{title}</span>;
};
