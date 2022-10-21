//@ts-ignore
import * as Plot from "@observablehq/plot";
import {useRef, useEffect} from "react";
import * as d3 from "d3";
import {bitrateLine} from "./bitrate/line";
import {bitrateFormatter} from "@nxt-ui/cp/utils";
import {xLine} from "./ticks/ticksX";
import {yLine} from "./ticks/ticksY";

const DURATION_TIME = 1000;

const defaultOptions = {
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
        xLine(),
        yLine(),
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
    marginLeft: 70,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 0,
    width: 186,
    height: 75,
    style: {
        background: "none",
        color: "#919699",
    },
};

const BitrateLineGraph = ({data}: any) => {
    const ref = useRef();
    const barChart = useRef(Plot.plot(defaultOptions));

    useEffect(() => {
        if (data) {
            if (barChart.current.updateBitrateLine) {
                barChart.current.updateBitrateLine([data]);
                barChart.current.updateXline([data]);
                barChart.current.updateYline([data]);
            }
        }
    }, [data, barChart]);

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

export default BitrateLineGraph;
