import {FC, useMemo} from "react";
import {Icon} from "@nxt-ui/icons";
import {EPortStatus} from "@nxt-ui/cp/types";
import "../index.css";

interface ComponentProps {
    status?: EPortStatus;
    index: number;
}

export const NodePort: FC<ComponentProps> = ({status, index}) => {
    const portIcon = useMemo(() => {
        switch (status) {
            case EPortStatus.available:
                return <Icon className="available" name="port1" />;
            case EPortStatus.free:
                return <Icon className="free" name="port" />;
            case EPortStatus.neutral:
                return <Icon name="port" />;
            case EPortStatus.unavailable:
                return <span className="port-unavailable"></span>;
            default:
                return <Icon name="input" />;
        }
    }, [status]);

    return (
        <>
            {portIcon}
            <p>{index}</p>
        </>
    );
};
