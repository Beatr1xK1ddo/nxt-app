import React, {useEffect, useRef} from "react";
import * as d3 from "d3";
import {v4} from "uuid";

import {IBitrateMonitoring} from "@nxt-ui/cp/types";
import {bitrateFormatter, LineChart, LineChartOptions} from "@nxt-ui/cp/utils";

const options: Partial<LineChartOptions> = {
    maxItemsDisplayed: 60,
    x: (dataItem) => dataItem.timestamp,
    y: (dataItem) => dataItem.bitrate,
    curve: d3.curveBasis,
    animateAxis: true,
    marginLeft: 55,
    xAxis: false,
    yPadding: 0.2,
    color: "#f12253",
    yAxisTicksFormatter: bitrateFormatter,
    area: true,
};

type Props = {
    data: IBitrateMonitoring | null;
};

const BitrateMonitoring = ({data}: Props) => {
    const chartContainerRef = useRef<null | HTMLDivElement>(null);
    const chartRef = useRef<null | LineChart>(null);
    const chartIdRef = useRef<string>(`A${v4()}`);

    useEffect(() => {
        if (chartContainerRef.current) {
            const width = chartContainerRef.current.offsetWidth;
            const height = chartContainerRef.current.offsetHeight;
            chartRef.current = new LineChart(chartIdRef.current, [], {
                ...options,
                width,
                height,
            });
            chartRef.current.render();
        }
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            data?.data?.forEach((item) => {
                chartRef.current?.addData(item);
            });
        }
    }, [data]);

    return (
        <div style={{position: "relative", width: "100%", aspectRatio: "16/9"}}>
            <div ref={chartContainerRef} id={chartIdRef.current} style={{width: "100%", height: "100%"}} />
        </div>
    );
};

export default BitrateMonitoring;
