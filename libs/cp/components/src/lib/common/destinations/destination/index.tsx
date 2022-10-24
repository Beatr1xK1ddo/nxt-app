import {BitrateMonitoringThumbnail, BitrateLineMonitoring, TsMonitoring} from "@nxt-ui/cp/components";
import {BasicApplication, EAppType, IDestination, NumericId, Optional} from "@nxt-ui/cp/types";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import clsx from "clsx";
import "./index.css";
import {useCallback, useMemo, useState} from "react";
import {ModalComponent} from "@nxt-ui/components";

type Props = {
    nodeId: NumericId;
    destination: IDestination;
    app: BasicApplication;
};

const Destination = ({nodeId, destination, app}: Props) => {
    const [openTsMonitoring, setOpenTsMonitoring] = useState<boolean>(false);
    const {monitoring: monitoringData, errors} = useRealtimeMonitoring(
        nodeId,
        destination.outputIp,
        destination.outputPort
    );
    const monitoring = monitoringData.at(-1);

    const bitrateValue = useMemo(() => {
        return typeof monitoring?.bitrate === "number"
            ? `${((monitoring.muxrate || monitoring.bitrate) / 1000000).toFixed(2)} Mbps`
            : "";
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

    const closeTsHandler = useCallback(() => openTsMonitoring && setOpenTsMonitoring(false), [openTsMonitoring]);

    const openTsHandler = useCallback(() => setOpenTsMonitoring(true), []);

    return (
        <>
            <div className="bitrate-log-box">
                <a
                    className="bitrate-destination-link"
                    onClick={openTsHandler}>{`${destination.outputIp}:${destination.outputPort}`}</a>
                <strong className={clsx("bitrate-log", errorValue && "signal-errors")}>{bitrateValue}</strong>
                {monitoring && <BitrateLineMonitoring data={monitoringData} />}
            </div>
            <ModalComponent
                className="thumbnail-modal"
                open={openTsMonitoring}
                onClose={closeTsHandler}
                aria-labelledby="thumbnail-modal">
                <TsMonitoring nodeId={nodeId} app={app} destination={destination} />
            </ModalComponent>
        </>
    );
};

export default Destination;
