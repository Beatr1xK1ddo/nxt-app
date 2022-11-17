import {useEffect, useState, useCallback} from "react";
import BitrateMonitoringIcon, {EMonitoringType} from "./monitoringIcon";
import {bitrateFormatter} from "@nxt-ui/cp/utils";
import "./style.scss";

type IMonitoring = {
    bitrate: number;
    muxrate: number;
    data: string;
};

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

    const calculateStatistics = useCallback(() => {
        if (!data.length) return;
        let minBitrate = data[0].bitrate;
        let maxBitrate = data[0].bitrate;
        let minMuxrate = data[0].muxrate;
        let maxMuxrate = data[0].muxrate;
        data.length > 0 &&
            data.forEach((item: IMonitoring) => {
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

    useEffect(() => {
        const intervalId = setInterval(() => {
            calculateStatistics();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [calculateStatistics]);

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
