import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {BasicApplication, EAppGeneralStatus, Optional} from "@nxt-ui/cp/types";
import {FC, useMemo} from "react";

type ComponentProps = {
    app: BasicApplication;
    nodeId: Optional<number>;
};

export const AppRuntimeDisplay: FC<ComponentProps> = ({app, nodeId}) => {
    const {status, runTime} = useRealtimeAppData(app, nodeId);

    const title = useMemo(() => {
        switch (status) {
            case EAppGeneralStatus.active:
            case EAppGeneralStatus.error:
                return runTime;
            default:
                return "Runtime not available";
        }
    }, [runTime, status]);

    return (
        <span className="text-small">
            <p className="text-small">{title}</p>
        </span>
    );
};
