import React, {useEffect, useRef} from "react";
import {v4} from "uuid";

import {IBitrateMonitoring} from "@nxt-ui/cp/types";
import {bitrateFormatter, BitrateMonitoringChart, BitrateMonitoringChartOptions} from "@nxt-ui/cp/utils";

import "./BitrateMonitoring.css";

const bitrateOptions: Partial<BitrateMonitoringChartOptions> = {
    // curve: d3.curveBasis,
    marginLeft: 55,
    yPadding: 0.3,
    marginTop: 20,
    marginBottom: 20,
    color: "red",
    yAxisTicksFormatter: bitrateFormatter,
};

type Props = {
    data: IBitrateMonitoring | null;
};

const BitrateMonitoringThumbnail = ({data}: Props) => {
    const chartContainerRef = useRef<null | HTMLDivElement>(null);
    const chartRef = useRef<null | BitrateMonitoringChart>(null);
    const chartIdRef = useRef<string>(`NXT${v4()}`);
    const initialDataReceived = useRef<boolean>(false);

    useEffect(() => {
        if (chartContainerRef.current) {
            const width = chartContainerRef.current.offsetWidth;
            const height = chartContainerRef.current.offsetHeight;
            chartRef.current = new BitrateMonitoringChart(chartIdRef.current, [], {
                ...bitrateOptions,
                colors: ["red", "green"],
                width,
                height,
            });
        }
    }, []);

    useEffect(() => {
        if (data && data.data && chartRef.current) {
            if (initialDataReceived.current) {
                data.data.forEach((item) => {
                    chartRef.current?.addData(item);
                });
            } else {
                chartRef.current?.setData(data.data);
                initialDataReceived.current = true;
            }
        }
    }, [data]);

    return (
        <div className="bitrateMonitoringContainer">
            <div ref={chartContainerRef} id={chartIdRef.current} style={{width: "100%", height: "100%"}} />
        </div>
    );
};

export default BitrateMonitoringThumbnail;
