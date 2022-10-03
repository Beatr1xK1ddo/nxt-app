import {BitrateMonitoringThumbnail} from "@nxt-ui/cp/components";
import {IDestination, NumericId} from "@nxt-ui/cp/types";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import clsx from "clsx";
import "./index.css";
import {useMemo} from "react";

type Props = {
    nodeId: NumericId;
    destination: IDestination;
};

const Destination = ({nodeId, destination}: Props) => {
    const {monitoring, errors} = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    const mbpsValue = useMemo(() => {
        return monitoring?.bitrate ? `${(monitoring.bitrate / 1000000).toFixed(2)} Mbps` : "";
    }, [monitoring]);

    return (
        <div className="bitrate-log-box">
            <a href="/">{`${destination.outputIp}:${destination.outputPort}`}</a>
            <strong
                className={clsx(
                    "bitrate-log",
                    "signal-good",
                    errors?.syncLosses.amount && "signal-errors",
                    (!monitoring?.bitrate || errors?.syncLosses.amount) && "signal-lost"
                )}>
                {mbpsValue}
            </strong>
            <BitrateMonitoringThumbnail data={monitoring} />
        </div>
    );
};

export default Destination;
