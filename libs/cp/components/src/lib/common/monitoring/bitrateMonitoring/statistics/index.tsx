import {useEffect, useState, useCallback} from "react";
import BitrateMonitoringIcon, {EMonitoringType} from "./monitoringIcon";
import {bitrateFormatter} from "@nxt-ui/cp/utils";
import "./style.scss";
import {TooltipComponent} from "@nxt-ui/components";

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
        minBitrate: -1,
        minMuxrate: -1,
        maxBitrate: -1,
        maxMuxrate: -1,
        averageBitrate: -1,
        averageMuxrate: -1,
    });

    const calculateStatistics = useCallback(() => {
        if (!data.length) return;
        let minBitrate = statistic.minBitrate > -1 ? statistic.minBitrate : data[0].bitrate;
        let maxBitrate = statistic.maxBitrate > -1 ? statistic.maxBitrate : data[0].bitrate;
        let minMuxrate = statistic.minMuxrate > -1 ? statistic.minMuxrate : data[0].muxrate;
        let maxMuxrate = statistic.maxMuxrate > -1 ? statistic.maxMuxrate : data[0].muxrate;
        let sumBitrate = 0;
        let sumMuxrate = 0;
        data.length > 0 &&
            data.forEach((item: IMonitoring) => {
                if (item.bitrate < statistic.minBitrate) {
                    minBitrate = item.bitrate;
                }
                if (item.bitrate > statistic.maxBitrate) {
                    maxBitrate = item.bitrate;
                }
                if (item.muxrate < statistic.minMuxrate) {
                    minMuxrate = item.muxrate;
                }
                if (item.muxrate > statistic.maxMuxrate) {
                    maxMuxrate = item.muxrate;
                }
                sumBitrate += item.bitrate;
                sumMuxrate += item.muxrate;
            });
        setStatistic({
            minBitrate: minBitrate,
            maxBitrate: maxBitrate,
            maxMuxrate: maxMuxrate,
            minMuxrate: minMuxrate,
            averageBitrate: (minBitrate + maxBitrate) / 2,
            averageMuxrate: (minMuxrate + maxMuxrate) / 2,
        });
    }, [statistic, data]);

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
            <div className="bitrate row">
                <div className="col">
                    <TooltipComponent className="card-text" arrow title={<div>Bitrate</div>}>
                        <div>
                            <BitrateMonitoringIcon type={EMonitoringType.bitrate} />
                        </div>
                    </TooltipComponent>
                </div>
                <div className="col">{getData(statistic.minBitrate, data[0].bitrate)}</div>
                <div className="col">{getData(statistic.averageBitrate, data[0].bitrate)}</div>
                <div className="col">{getData(statistic.maxBitrate, data[0].bitrate)}</div>
                <div className="col">{bitrateFormatter(data.at(-1)?.bitrate)}</div>
            </div>
            <div className="muxrate row">
                <div className="col">
                    <TooltipComponent className="card-text" arrow title={<div>Muxrate</div>}>
                        <div>
                            <BitrateMonitoringIcon type={EMonitoringType.muxrate} />
                        </div>
                    </TooltipComponent>
                </div>
                <div className="col">{getData(statistic.minMuxrate, data[0].muxrate)}</div>
                <div className="col">{getData(statistic.averageMuxrate, data[0].muxrate)}</div>
                <div className="col">{getData(statistic.maxMuxrate, data[0].muxrate)}</div>
                <div className="col">{bitrateFormatter(data.at(-1)?.muxrate)}</div>
            </div>
        </div>
    );
};

export default BitrateMonitoringStatistics;
