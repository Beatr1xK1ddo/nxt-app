import * as d3 from "d3";
import {v4} from "uuid";
import {BaseChartOptions} from "./lineChart";

interface BitrateMonitoringItem {
    moment: number;
    bitrate: number;
    muxrate: number;
}

export interface BitrateMonitoringChartOptions extends BaseChartOptions {
    xPadding: number;
    yPadding: number;
    x: (dataItem: BitrateMonitoringItem) => number;
    y1: (dataItem: BitrateMonitoringItem) => number;
    y2: (dataItem: BitrateMonitoringItem) => number;
    xAxisTicksFormatter: (domainValue: d3.AxisDomain, index: number) => string;
    yAxisTicksFormatter: (domainValue: d3.AxisDomain, index: number) => string;
    colors: readonly string[];
    stroke: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const BitrateMonitoringChartDefaultOptions: BitrateMonitoringChartOptions = {
    x: (dataItem) => dataItem.moment,
    y1: (dataItem) => dataItem.muxrate,
    y2: (dataItem) => dataItem.bitrate,
    curve: d3.curveLinear,
    marginTop: 20,
    marginRight: 30,
    marginBottom: 30,
    marginLeft: 40,
    width: 640,
    height: 400,
    xType: d3.scaleUtc,
    yType: d3.scaleLinear,
    xRange: [40, 640 - 30],
    yRange: [400 - 30, 20],
    colors: d3.schemePiYG[3],
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    strokeOpacity: 1,
    yFormat: undefined,
    xLabel: "",
    yLabel: "",
    color: "",
};

export class BitrateMonitoringChart {
    root: string | HTMLDivElement;
    options: BitrateMonitoringChartOptions;

    svg: any;

    data: Array<any>;

    xRange: Array<number>;
    yRange: Array<number>;
    xValues: Array<any>;
    y1Values: Array<any>;
    y2Values: Array<any>;
    itemsIndexes: Array<number>;
    itemsDefinedState: Array<boolean>;
    xDomain: Array<number>;
    yDomain: Array<number>;
    xScale: any;
    yScale: any;
    xAxis: any;
    yAxis: any;

    x: any;
    y: any;
    muxrateArea: any;
    muxrateLine: any;
    bitrateArea: any;
    bitrateLine: any;
    bitrateClipPath: any;

    constructor(
        root: string | HTMLDivElement,
        initialData: Array<any>,
        options: Partial<BitrateMonitoringChartOptions>
    ) {
        this.root = root;
        this.options = {...BitrateMonitoringChartDefaultOptions, ...options};
        this.data = initialData;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.xRange = this.options.xRange;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.yRange = this.options.yRange;
        if (options.width || options.marginLeft || options.marginRight) {
            const width = options.width || this.options.width;
            const marginLeft = options.marginLeft || this.options.marginLeft;
            const marginRight = options.marginRight || this.options.marginRight;
            this.xRange = [marginLeft, width - marginRight];
        }
        if (options.height || options.marginBottom || options.marginTop) {
            const height = options.height || this.options.height;
            const marginBottom = options.marginBottom || this.options.marginBottom;
            const marginTop = options.marginTop || this.options.marginTop;
            this.yRange = [height - marginBottom, marginTop];
        }
        this.xValues = [];
        this.y1Values = [];
        this.y2Values = [];
        this.itemsIndexes = [];
        this.itemsDefinedState = [];
        this.xDomain = [];
        this.yDomain = [];
        this.xScale = null;
        this.yScale = null;
        this.xAxis = null;
        this.yAxis = null;

        this.svg = d3
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .select(`#${this.root}`)
            .append("svg")
            .attr("width", this.options.width)
            .attr("height", this.options.height)
            .attr("viewBox", [0, 0, this.options.width, this.options.height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

        this.x = null;
        this.y = null;
        this.muxrateLine = null;
        this.muxrateArea = null;
        this.bitrateLine = null;
        this.bitrateArea = null;
        this.bitrateClipPath = null;
    }

    private computeValues = () => {
        const data = this.data;
        this.xValues = d3.map(data, this.options.x);
        this.y1Values = d3.map(data, this.options.y1);
        this.y2Values = d3.map(data, this.options.y2);
        this.itemsIndexes = d3.range(data.length);
        const isItemDefinedFunction =
            this.options.defined ||
            ((d, i) => !isNaN(this.xValues[i]) && !isNaN(this.y1Values[i]) && !isNaN(this.y2Values[i]));
        this.itemsDefinedState = d3.map(data, isItemDefinedFunction);
        return this;
    };

    private computeDomain = (values: Array<number>, padding: number) => {
        let domain;
        const extremes = d3.extent(values);
        if (padding && extremes[0]) {
            domain = [extremes[0] * (1 - padding), extremes[1] * (1 + padding)];
        } else {
            domain = extremes;
        }
        return domain;
    };

    private computeDomains = () => {
        if (this.options.xDomain === undefined) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.xDomain = this.computeDomain(this.xValues, this.options.xPadding);
        }
        if (this.options.yDomain === undefined) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.yDomain = this.computeDomain([...this.y1Values, ...this.y2Values], this.options.yPadding);
        }
        return this;
    };

    private constructScalesAndAxes = () => {
        const {xType, yType, yAxisTicksFormatter} = this.options;
        this.xScale = xType(this.xDomain, this.xRange);
        this.yScale = yType(this.yDomain, this.yRange);
        this.xAxis = d3
            .axisBottom(this.xScale)
            // .tickValues([this.data[this.data.length - 1]?.timestamp])
            .ticks(d3.timeSecond.every(10))
            // @ts-ignore
            .tickFormat(d3.timeFormat("%M:%S"));
        // .tickSizeOuter(0);
        this.yAxis = d3.axisLeft(this.yScale).ticks(6).tickFormat(yAxisTicksFormatter);
        return this;
    };

    private createLine = (y: any) =>
        d3
            .line()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .defined((i) => this.itemsDefinedState[i])
            .curve(this.options.curve)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .x((i) => this.xScale(this.xValues[i]))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .y(y)(this.itemsIndexes);
    private createArea = (y0: any, y1: any) =>
        d3
            .area()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .defined((i) => this.itemsDefinedState[i])
            .curve(this.options.curve)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .x((i) => this.xScale(this.xValues[i]))
            .y0(y0)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .y1(y1)(this.itemsIndexes);

    private render = () => {
        const {width, height, marginRight, marginLeft, marginBottom, yLabel} = this.options;
        const id = v4();

        this.y = this.svg
            .append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(this.yAxis)
            .call((g: any) => g.select(".domain").remove())
            .call((g: any) =>
                g
                    .selectAll(".tick line")
                    .clone()
                    .attr("x2", width - marginLeft - marginRight)
                    .attr("stroke-opacity", 0.1)
            )
            .call((g: any) =>
                g
                    .append("text")
                    .attr("x", -marginLeft)
                    .attr("y", 10)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .text(yLabel)
            );

        this.bitrateClipPath = this.svg
            .append("clipPath")
            .attr("id", `bitrate-clip-path-${id}`)
            .append("path")
            .attr(
                "d",
                this.createArea(0, (i: any) => this.yScale(this.y2Values[i]))
            );

        this.muxrateArea = this.svg
            .append("path")
            .attr("clip-path", `url(${new URL(`#bitrate-clip-path-${id}`, window.location.href)})`)
            .attr("fill", this.options.colors[1])
            .attr("opacity", 0.5)
            .attr(
                "d",
                this.createArea((i: any) => this.yScale(this.y1Values[i]), height)
            );

        this.bitrateArea = this.svg
            .append("path")
            // .attr("clip-path", `url(${new URL(`#${id}-below`, window.location.href)})`)
            .attr("fill", this.options.colors[0])
            .attr("opacity", 0.5)
            .attr(
                "d",
                this.createArea(height - marginBottom, (i: any) => this.yScale(this.y2Values[i]))
            );

        this.x = this.svg
            .append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(this.xAxis);
        // .call((g: any) => g.select(".domain").remove());

        this.bitrateLine = this.svg
            .append("path")
            .attr("fill", "none")
            .attr("stroke", this.options.stroke)
            .attr("stroke-width", this.options.strokeWidth)
            .attr("stroke-linecap", this.options.strokeLinecap)
            .attr("stroke-linejoin", this.options.strokeLinejoin)
            .attr("stroke-opacity", this.options.strokeOpacity)
            .attr(
                "d",
                this.createLine((i: any) => this.yScale(this.y2Values[i]))
            );

        this.muxrateLine = this.svg
            .append("path")
            .attr("fill", "none")
            .attr("stroke", this.options.stroke)
            .attr("stroke-width", this.options.strokeWidth)
            .attr("stroke-linecap", this.options.strokeLinecap)
            .attr("stroke-linejoin", this.options.strokeLinejoin)
            .attr("stroke-opacity", this.options.strokeOpacity)
            .attr(
                "d",
                this.createLine((i: any) => this.yScale(this.y1Values[i]))
            );

        return this.svg.node();
    };

    public setData = (data: Array<any>) => {
        this.data = data;
        this.computeValues().computeDomains().constructScalesAndAxes().render();
    };

    public addData = (dataItem: any) => {
        const {x, marginBottom, height} = this.options;
        if (this.data.length) {
            const lastX = x(this.data[this.data.length - 1]);
            const newX = x(dataItem);
            if (lastX === newX || lastX > newX) return;
            this.data.push(dataItem);
            if (this.data.length > 30) this.data.shift();
        } else {
            this.data.push(dataItem);
        }
        this.computeValues().computeDomains().constructScalesAndAxes();

        this.bitrateClipPath.attr(
            "d",
            this.createArea(0, (i: any) => this.yScale(this.y2Values[i]))
        );
        this.muxrateArea.attr(
            "d",
            this.createArea((i: any) => this.yScale(this.y1Values[i]), height)
        );
        this.bitrateArea.attr(
            "d",
            this.createArea(height - marginBottom, (i: any) => this.yScale(this.y2Values[i]))
        );
        this.muxrateLine.attr(
            "d",
            this.createLine((i: any) => this.yScale(this.y1Values[i]))
        );
        this.bitrateLine.attr(
            "d",
            this.createLine((i: any) => this.yScale(this.y2Values[i]))
        );
        this.y.call(this.yAxis);
        this.x.call(this.xAxis);

        return this;
    };
}
