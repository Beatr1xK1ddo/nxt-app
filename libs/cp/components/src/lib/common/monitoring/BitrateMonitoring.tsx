import {useEffect, useRef} from "react";
import {v4} from "uuid";

import {bitrateFormatter, BitrateMonitoringChart, BitrateMonitoringChartOptions} from "@nxt-ui/cp/utils";

import "./BitrateMonitoring.css";
import {IMonitoringData, Optional} from "@nxt-ui/cp/types";

const bitrateOptions: Partial<BitrateMonitoringChartOptions> = {
    // curve: d3.curveBasis,
    marginLeft: 60,
    yPadding: 0.3,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 12,
    color: "red",
    yAxisTicksFormatter: bitrateFormatter,
};

type Props = {
    data: Optional<IMonitoringData>;
};

const BitrateMonitoring = ({data}: Props) => {
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
        if (data && chartRef.current) {
            if (initialDataReceived.current) {
                [data].forEach((item) => {
                    chartRef.current?.addData(item);
                });
            } else {
                chartRef.current?.setData([data]);
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

export default BitrateMonitoring;
