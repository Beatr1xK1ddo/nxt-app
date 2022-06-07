import {EAppGeneralStatus} from "@nxt-ui/cp/types";
import {FC, useMemo} from "react";
import styles from "./status.module.scss";

type INodeStatusProps = {
    status: EAppGeneralStatus;
};

export const AppStatus: FC<INodeStatusProps> = (props) => {
    const {status} = props;

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

    return <span className={`${styles["card-status"]} ${styles[status]}`}>{title}</span>;
};
