import {EAppGeneralStatus} from "@nxt-ui/cp/types";
import {FC, useMemo, useEffect, useState} from "react";
import styles from "./status.module.scss";
import {useNotifications} from "@nxt-ui/cp/hooks";

type INodeStatusProps = {
    status?: EAppGeneralStatus;
    name?: string;
};

export const AppStatusDisplay: FC<INodeStatusProps> = ({status, name}) => {
    const {add} = useNotifications();

    const [prevStatus, setPrevStatus] = useState<EAppGeneralStatus>();

    useEffect(() => {
        status !== EAppGeneralStatus.new && setPrevStatus(status);
    }, [status]);

    useEffect(() => {
        prevStatus && prevStatus !== status && add(`${name || ""} status changed to: ${status}`);
    }, [status, prevStatus, add, name]);

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
