import {useEffect, useState} from "react";
import BitrateMonitoringIcon, {EMonitoringType} from "./monitoringIcon";
import {bitrateFormatter} from "@nxt-ui/cp/utils";
import {MONITORING_SIZE} from "@nxt-ui/cp/constants";
import "./style.scss";

type IMonitoring = {
    bitrate: number;
    muxrate: number;
    data: string;
};

// This count for cut points. Need for synchronization with graphic animation
const DELAY_COUNT = 2;

const getData = (currentValue: number, initialValue: number) => {
    return bitrateFormatter(currentValue > -1 ? currentValue : initialValue);
};

const BitrateMonitoringStatistics = ({data}: any) => {
    const [statistic, setStatistic] = useState({
        minBitrate: 0,
        minMuxrate: 0,
        maxBitrate: 0,
        maxMuxrate: 0,
        averageBitrate: 0,
        averageMuxrate: 0,
    });

    useEffect(() => {
        if (!data.length) return;
        let minBitrate = data[DELAY_COUNT].bitrate;
        let maxBitrate = data[DELAY_COUNT].bitrate;
        let minMuxrate = data[DELAY_COUNT].muxrate;
        let maxMuxrate = data[DELAY_COUNT].muxrate;
        data.length > 0 &&
            data.slice(-MONITORING_SIZE + DELAY_COUNT).forEach((item: IMonitoring) => {
                if (item.bitrate < minBitrate) {
                    minBitrate = item.bitrate;
                }
                if (item.bitrate > maxBitrate) {
                    maxBitrate = item.bitrate;
                }
                if (item.muxrate < minMuxrate) {
                    minMuxrate = item.muxrate;
                }
                if (item.muxrate > maxMuxrate) {
                    maxMuxrate = item.muxrate;
                }
            });
        setStatistic({
            minBitrate: minBitrate,
            maxBitrate: maxBitrate,
            maxMuxrate: maxMuxrate,
            minMuxrate: minMuxrate,
            averageBitrate: (minBitrate + maxBitrate) / 2,
            averageMuxrate: (minMuxrate + maxMuxrate) / 2,
        });
    }, [data]);

    if (!data[0]) return null;

    return (
        <div className="bitrateMonitoringStatistics">
            <div className="statisticHeader row">
                <div className="col"></div>
                <div className="col">Min</div>
                <div className="col">Average</div>
                <div className="col">Max</div>
                <div className="col">Now</div>
            </div>
            <div className="muxrate row">
                <div className="col">
                    <BitrateMonitoringIcon type={EMonitoringType.muxrate} />
                    Muxrate
                </div>
                <div className="col">{getData(statistic.minMuxrate, data[0].muxrate)}</div>
                <div className="col">{getData(statistic.averageMuxrate, data[0].muxrate)}</div>
                <div className="col">{getData(statistic.maxMuxrate, data[0].muxrate)}</div>
                <div className="col">{bitrateFormatter(data.at(-1)?.muxrate)}</div>
            </div>
            <div className="bitrate row">
                <div className="col">
                    <BitrateMonitoringIcon type={EMonitoringType.bitrate} />
                    Bitrate
                </div>
                <div className="col">{getData(statistic.minBitrate, data[0].bitrate)}</div>
                <div className="col">{getData(statistic.averageBitrate, data[0].bitrate)}</div>
                <div className="col">{getData(statistic.maxBitrate, data[0].bitrate)}</div>
                <div className="col">{bitrateFormatter(data.at(-1)?.bitrate)}</div>
            </div>
        </div>
    );
};

export default BitrateMonitoringStatistics;
