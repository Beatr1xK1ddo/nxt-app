import {BitrateMonitoringThumbnail} from "@nxt-ui/cp/components";
import {IListItemDestination, NumericId} from "@nxt-ui/cp/types";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import clsx from "clsx";
import "./index.css";
import {useMemo} from "react";

type Props = {
    nodeId: NumericId;
    destination: IListItemDestination;
};

const Destination = ({nodeId, destination}: Props) => {
    const {monitoring, errors, initial} = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    const bitrate = useMemo(() => {
        return monitoring?.bitrate || initial?.[initial.length - 1].monitoring.bitrate;
    }, [monitoring, initial]);

    return (
        <div className="bitrate-log-box">
            <a href="/">{`${destination.outputIp}:${destination.outputPort}`}</a>
            <strong
                //   if (bitrate === 0): className="signal-lost"
                //   if (errors): className="signal-errors"
                //   if (!errors): className="signal-good"
                className={clsx(
                    "bitrate-log",
                    errors?.cc && "signal-errors",
                    !errors?.cc && "signal-good",
                    (!bitrate || bitrate === 0) && "signal-lost"
                )}
            >
                {bitrate || ""}
            </strong>
            <BitrateMonitoringThumbnail data={monitoring} />
        </div>
    );
};

export default Destination;
