import {FC, useMemo} from "react";

import styles from "./status.module.scss";

type INodeStatusProps = {
    status: boolean;
};

export const NodeStatus: FC<INodeStatusProps> = (props) => {
    const {status} = props;

    const title = useMemo(() => {
        if (status) {
            return "Online";
        } else {
            return "Offline";
        }
    }, [status]);

    return <span className={`${styles["card-status"]} ${styles[status ? "online" : "offline"]}`}>{title}</span>;
};
