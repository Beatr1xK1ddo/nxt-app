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
        // domain: [0, 160000000],
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

const generateEmptyData = (data: any) =>
    d3
        .range(30)
        .map((_, index) => ({
            moment: data.moment - index * 1000,
            muxrate: data.muxrate,
            bitrate: 0,
        }))
        .reverse();

const BitrateMonitoringPlot = ({data}: any) => {
    const ref = useRef();
    const liveData = useRef<Array<{}>>([]);
    const refMoment = useRef();
    const visible = useSelector(commonSelectors.baseApp.selectTabVisible);
    const barChart = useRef(Plot.plot(plotOptions));

    useEffect(() => {
        if (data.moment === refMoment.current) return;
        if (data) {
            if (liveData.current.length > 30) {
                liveData.current.shift();
            }
            if (liveData.current.length === 0) {
                liveData.current = generateEmptyData(data);
            }
            liveData.current.push({
                moment: data.moment,
                bitrate: data.bitrate,
                muxrate: data.muxrate,
            });
            if (visible && barChart.current.updateBitrateLine) {
                barChart.current.updateBitrateLine([liveData.current]);
                barChart.current.updateBitrateArea([liveData.current]);
                barChart.current.updateMuxrateArea([liveData.current]);
                barChart.current.updateMaxrateLine([liveData.current]);
                barChart.current.updateXline([liveData.current]);
                barChart.current.updateYline([liveData.current]);
            }
        }
        refMoment.current = data.moment;
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
