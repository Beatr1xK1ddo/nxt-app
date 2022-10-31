//@ts-ignore
import * as Plot from "@observablehq/plot";
import {useRef, useEffect, MouseEventHandler} from "react";
import * as d3 from "d3";
import {bitrateLine} from "./bitrate/line";
import {bitrateArea} from "./bitrate/area";
import {muxrateLine} from "./muxrate/line";
import {muxrateArea} from "./muxrate/area";
import {xLine} from "./ticks/ticksX";
import {yLine} from "./ticks/ticksY";
import {bitrateFormatter} from "@nxt-ui/cp/utils";
import {useSelector} from "react-redux";
import {commonSelectors} from "@nxt-ui/cp-redux";
import {IMonitoringOptions} from "@nxt-ui/cp/types";
import BitrateMonitoringStatistics from "./statistics";

const DURATION_TIME = 1000;

const defaultOptions = {
    size: {
        width: 280,
        height: 198,
    },
    margin: {
        top: 10,
        left: 70,
        right: 10,
        bottom: 20,
    },
    showMuxrate: {
        area: true,
        line: true,
    },
    showBitrate: {
        area: true,
        line: true,
    },
    showStatistic: false,
    ticks: {
        x: {
            format: "%H:%M:%S",
            time: 10,
        },
    },
};

const bitrateSettings = (options: IMonitoringOptions) => ({
    marks: [
        options.showBitrate?.area &&
            bitrateArea(
                {
                    x: "moment",
                    y: "bitrate",
                    curve: "basis",
                    fill: "#F1796F",
                    fillOpacity: 0.5,
                    clip: true,
                },
                DURATION_TIME
            ),
        options.showMuxrate?.area &&
            muxrateArea(
                {
                    x: "moment",
                    y: "muxrate",
                    curve: "basis",
                    fill: "#B2FAC5",
                    fillOpacity: 0.25,
                    clip: true,
                },
                DURATION_TIME
            ),
        options.showBitrate?.line &&
            bitrateLine(
                {
                    strokeWidth: 1,
                    stroke: "#EA3D2F",
                    x: "moment",
                    y: "bitrate",
                    clip: true,
                },
                DURATION_TIME
            ),
        options.showMuxrate?.line &&
            muxrateLine(
                {
                    strokeWidth: 2,
                    stroke: "#0C7E2B",
                    y: "muxrate",
                    clip: true,
                },
                DURATION_TIME
            ),
        //@ts-ignore
        xLine(options.ticks.x),
        yLine(),
    ],
    y: {
        grid: true,
        ticks: 7,
        label: "",
        tickFormat: bitrateFormatter,
    },
    x: {
        type: "utc",
        label: "",
        grid: true,
    },
    marginLeft: options.margin?.left,
    marginRight: options.margin?.right,
    marginTop: options.margin?.top,
    marginBottom: options.margin?.bottom,
    width: options?.size?.width,
    height: options?.size?.height,
    style: {
        background: "none",
        color: "#919699",
    },
});

type IBitrateMonitoringPlot = {
    data: any;
    options: IMonitoringOptions;
    onClick?: MouseEventHandler<HTMLDivElement>;
};

const BitrateMonitoringPlot = ({data, options, onClick}: IBitrateMonitoringPlot) => {
    const ref = useRef(null);
    const refMoment = useRef();
    const visible = useSelector(commonSelectors.baseApp.selectTabVisible);
    const monitoringOptions = {...defaultOptions, ...options};
    const barChart = useRef(Plot.plot(bitrateSettings(monitoringOptions)));
    useEffect(() => {
        if (data) {
            if (visible && barChart.current.updateBitrateLine) {
                monitoringOptions.showBitrate?.line && barChart.current.updateBitrateLine([data]);
                monitoringOptions.showBitrate?.area && barChart.current.updateBitrateArea([data]);
                monitoringOptions.showMuxrate?.area && barChart.current.updateMuxrateArea([data]);
                monitoringOptions.showMuxrate?.line && barChart.current.updateMuxrateLine([data]);
                barChart.current.updateXline([data]);
                barChart.current.updateYline([data]);
            }
        }
    }, [data, refMoment, visible, barChart]);

    //@ts-ignore
    useEffect(() => {
        if (ref.current) {
            const bar = barChart.current;
            //@ts-ignore
            ref.current.append(bar);
            return () => {
                bar.remove();
            };
        }
    }, [ref]);

    return (
        <>
            <div onClick={onClick} ref={ref} className={"plot"}></div>
            <BitrateMonitoringStatistics data={data} />
        </>
    );
};

export default BitrateMonitoringPlot;
