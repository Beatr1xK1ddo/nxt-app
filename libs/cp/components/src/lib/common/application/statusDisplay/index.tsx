import {NxDotLoader} from "@nxt-ui/components";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {BasicApplication, EAppGeneralStatus, Optional} from "@nxt-ui/cp/types";
import {FC, useMemo} from "react";
import styles from "./status.module.scss";

type ComponentProps = {
    app: BasicApplication;
    nodeId: Optional<number>;
};

export const AppStatusDisplay: FC<ComponentProps> = ({app, nodeId}) => {
    const {status} = useRealtimeAppData(nodeId, app.type, app.id);

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

    if (status) {
        return <span className={`${styles["card-status"]} ${status && styles[status]}`}>{title}</span>;
    }

    return <NxDotLoader />;
};
