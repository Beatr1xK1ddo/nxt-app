//@ts-ignore
import * as Plot from "@observablehq/plot";
import {useRef, useEffect} from "react";
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

const DURATION_TIME = 1000;

const plotOptions = {
    marks: [
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
        muxrateLine(
            {
                strokeWidth: 2,
                stroke: "#0C7E2B",
                y: "muxrate",
                clip: true,
            },
            DURATION_TIME
        ),
        xLine(),
        yLine(),
    ],
    y: {
        grid: true,
        ticks: 7,
        label: "",
        tickFormat: bitrateFormatter,
    },
    x: {
        ticks: d3.timeSecond.every(10),
        tickFormat: d3.timeFormat("%M:%S"),
        type: "utc",
        label: "",
        grid: true,
    },
    marginLeft: 70,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20,
    width: 280,
    height: 198,
    style: {
        background: "none",
    },
};

const BitrateMonitoringPlot = ({data}: any) => {
    const ref = useRef();
    const refMoment = useRef();
    const visible = useSelector(commonSelectors.baseApp.selectTabVisible);
    const barChart = useRef(Plot.plot(plotOptions));

    useEffect(() => {
        if (data) {
            if (visible && barChart.current.updateBitrateLine) {
                barChart.current.updateBitrateLine([data]);
                barChart.current.updateBitrateArea([data]);
                barChart.current.updateMuxrateArea([data]);
                barChart.current.updateMaxrateLine([data]);
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
        //@ts-ignore
        <div ref={ref}></div>
    );
};

export default BitrateMonitoringPlot;
