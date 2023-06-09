import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {v4} from "uuid";

import {LineChart, LineChartOptions} from "@nxt-ui/cp/utils";

import "./BitrateMonitoring.css";
import {IMonitoringState, Optional} from "@nxt-ui/cp/types";

const smallOptions: Partial<LineChartOptions> = {
    maxItemsDisplayed: 60,
    x: (dataItem) => dataItem.moment,
    y: (dataItem) => dataItem.bitrate,
    curve: d3.curveBasis,
    animateAxis: true,
    animateLines: true,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    xAxis: false,
    yAxis: false,
    yPadding: 0.1,
    color: "currentColor",
};

// export interface IBitrateMonitoringDataItem {
//     timestamp: number;
//     bitrate: number;
//     muxrate: number;
// }

// export interface IBitrateMonitoring {
//     data: Array<IBitrateMonitoringDataItem>;
//     errors: any;
//     lastClearTime: any;
// }

type Props = {
    data: Optional<IMonitoringState>;
};

const BitrateMonitoringThumbnail = ({data}: Props) => {
    const chartContainerRef = useRef<null | HTMLDivElement>(null);
    const chartRef = useRef<null | LineChart>(null);
    const chartIdRef = useRef<string>(`A${v4()}`);

    const [values, setValues] = useState<Array<IMonitoringState>>([]);

    useEffect(() => {
        if (chartContainerRef.current) {
            const width = chartContainerRef.current.offsetWidth;
            const height = chartContainerRef.current.offsetHeight;
            chartRef.current = new LineChart(chartIdRef.current, [], {
                ...smallOptions,
                width,
                height,
                marginBottom: 10,
                marginTop: 10,
            });
            chartRef.current.render();
        }
    }, []);

    useEffect(() => {
        if (chartRef.current && values.length) {
            values.forEach((item) => {
                chartRef.current?.addData(item);
            });
        }
    }, [values]);

    useEffect(() => {
        if (data) {
            setValues((prev) => {
                const newValue = [...prev, data];
                return newValue;
            });
        }
    }, [data]);

    return (
        <div className="bitrateMonitoringContainer small">
            <div ref={chartContainerRef} id={chartIdRef.current} style={{width: "100%", height: "100%"}} />
        </div>
    );
};

export default BitrateMonitoringThumbnail;
