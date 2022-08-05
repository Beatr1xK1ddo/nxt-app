//@ts-ignore
import * as Plot from "@observablehq/plot";
import {useRef, useEffect} from "react";
import * as d3 from "d3";
import {bitrateLine} from "./bitrate/line";
import {bitrateArea} from "./bitrate/area";
import {muxrateLine} from "./muxrate/line";
import {muxrateArea} from "./muxrate/area";
import {bitrateFormatter} from "@nxt-ui/cp/utils";

const DURATION_TIME = 1000;

const barChart = Plot.plot({
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
    ],
    y: {
        domain: [0, 160000000],
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
    marginTop: 20,
    marginBottom: 20,
    width: 280,
    height: 198,
    style: {
        background: "none",
    },
});

const generateEmptyData = (data: any) =>
    d3
        .range(30)
        .map((item, index) => ({
            moment: data.moment - index * 1000,
            muxrate: data.muxrate,
            bitrate: 0,
        }))
        .reverse();

const MyPlot = ({data}: any) => {
    const ref = useRef();
    const liveData = useRef<Array<{}>>([]);

    useEffect(() => {
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
        barChart.updateBitrateLine([liveData.current]);
        barChart.updateBitrateArea([liveData.current]);
        barChart.updateMuxrateArea([liveData.current]);
        barChart.updateMaxrateLine([liveData.current]);
    }, [data]);

    //@ts-ignore
    useEffect(() => {
        if (ref.current) {
            //@ts-ignore
            ref.current.append(barChart);
            return () => {
                barChart.remove();
            };
        }
    }, []);

    return (
        //@ts-ignore
        <div ref={ref}></div>
    );
};

export default MyPlot;
