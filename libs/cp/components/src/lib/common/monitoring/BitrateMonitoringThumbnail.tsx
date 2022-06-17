import React, {useEffect, useRef} from "react";
import * as d3 from "d3";
import {v4} from "uuid";

import {IBitrateMonitoring} from "@nxt-ui/cp/types";
import {LineChart, LineChartOptions} from "@nxt-ui/cp/utils";

import "./BitrateMonitoring.css";

const smallOptions: Partial<LineChartOptions> = {
    maxItemsDisplayed: 60,
    x: (dataItem) => dataItem.timestamp,
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

type Props = {
    data: IBitrateMonitoring | null;
};

const BitrateMonitoringThumbnail = ({data}: Props) => {
    const chartContainerRef = useRef<null | HTMLDivElement>(null);
    const chartRef = useRef<null | LineChart>(null);
    const chartIdRef = useRef<string>(`A${v4()}`);

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
        if (chartRef.current) {
            data?.data?.forEach((item) => {
                chartRef.current?.addData(item);
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
