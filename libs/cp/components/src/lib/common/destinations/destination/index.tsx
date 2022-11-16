import {BitrateMonitoring, TsMonitoring} from "@nxt-ui/cp/components";
import {BasicApplication, IDestination, IMonitoringOptions, NumericId} from "@nxt-ui/cp/types";
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

const monitoringOptions: IMonitoringOptions = {
    margin: {
        left: 0,
        bottom: 0,
        right: 10,
        top: 0,
    },
    size: {
        width: 163,
        height: 60,
    },
    showStatistics: false,
    showGrid: false,
};

const Destination = ({nodeId, destination, app}: Props) => {
    const [openTsMonitoring, setOpenTsMonitoring] = useState<boolean>(false);
    const {monitoring: monitoringData, errors} = useRealtimeMonitoring(
        nodeId,
        destination.outputIp,
        destination.outputPort
    );
    const monitoring = useMemo(() => monitoringData.at(-1), [monitoringData]);

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
                <div className="bitrate-info">
                    <a
                        className="bitrate-destination-link"
                        onClick={openTsHandler}>{`${destination.outputIp}:${destination.outputPort}`}</a>
                    {monitoring && (
                        <strong className={clsx("bitrate-log", errorValue && "signal-errors")}>{bitrateValue}</strong>
                    )}
                </div>

                {monitoring && (
                    <div className="monitoringWrapper">
                        <BitrateMonitoring data={monitoringData} options={monitoringOptions} />
                    </div>
                )}
            </div>
            <ModalComponent
                className="thumbnail-modal"
                open={openTsMonitoring}
                onClose={closeTsHandler}
                aria-labelledby="thumbnail-modal">
                <TsMonitoring
                    closeMonitoringWrap={closeTsHandler}
                    nodeId={nodeId}
                    app={app}
                    destination={destination}
                />
            </ModalComponent>
        </>
    );
};

export default Destination;
