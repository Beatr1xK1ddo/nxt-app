import {BitrateMonitoringThumbnail, BitrateLineMonitoring} from "@nxt-ui/cp/components";
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
    const {monitoring: monitoringData, errors} = useRealtimeMonitoring(
        nodeId,
        destination.outputIp,
        destination.outputPort
    );
    const monitoring = monitoringData.at(-1);
    const mbpsValue = useMemo(() => {
        return monitoring?.bitrate ? `${(monitoring.bitrate / 1000000).toFixed(2)} Mbps` : "";
    }, [monitoring]);

    const errorValue = useMemo(() => {
        if (!errors) {
            return "";
        }
        const errTime = errors.cc.time;
        const date = +new Date() - +new Date(errTime);
        if (date > 60000) {
            return "";
        }
        return errors.cc.amount;
    }, [errors]);

    return (
        <div className="bitrate-log-box">
            <a href="/">{`${destination.outputIp}:${destination.outputPort}`}</a>
            <strong className={clsx("bitrate-log", "signal-good", !errorValue && "signal-errors")}>{mbpsValue}</strong>
            {monitoring && <BitrateLineMonitoring data={monitoringData} />}
        </div>
    );
};

export default Destination;
