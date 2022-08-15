//@ts-ignore
import * as Plot from "@observablehq/plot";
import {useRef, useEffect} from "react";
import * as d3 from "d3";
import {bitrateLine} from "./bitrate/line";
import {bitrateFormatter} from "@nxt-ui/cp/utils";

const DURATION_TIME = 1000;

const barChart = Plot.plot({
    marks: [
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
    ],
    y: {
        domain: [0, 160000000],
        grid: false,
        ticks: 0,
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
    marginLeft: 0,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 0,
    width: 86,
    height: 25,
    style: {
        background: "none",
    },
});

const generateEmptyData = (data: any) =>
    d3
        .range(30)
        .map((_, index) => ({
            moment: data.moment - index * 1000,
            muxrate: data.muxrate,
            bitrate: 0,
        }))
        .reverse();

const BitrateLineGraph = ({data}: any) => {
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

export default BitrateLineGraph;
