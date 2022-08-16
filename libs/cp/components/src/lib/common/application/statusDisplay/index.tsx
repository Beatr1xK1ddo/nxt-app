import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {BasicApplication, EAppGeneralStatus, Optional} from "@nxt-ui/cp/types";
import {FC, useMemo} from "react";
import styles from "./status.module.scss";

type ComponentProps = {
    app: BasicApplication;
    nodeId: Optional<number>;
};

export const AppStatusDisplay: FC<ComponentProps> = ({app, nodeId}) => {
    const {status} = useRealtimeAppData(app, nodeId);

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
                return app.status;
        }
    }, [app, status]);

    return <span className={`${styles["card-status"]} ${styles[status || app.status]}`}>{title}</span>;
};
