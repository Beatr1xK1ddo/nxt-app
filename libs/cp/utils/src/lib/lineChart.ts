import * as d3 from "d3";

//https://bl.ocks.org/valex/9b27aa1644bd80e9f306633f56a8f09b
//https://bl.ocks.org/pjsier/fbf9317b31f070fd540c5523fef167ac
//https://bl.ocks.org/jonsadka/19f1366db3ff25195e650ec90d404092
//https://www.demo2s.com/javascript/javascript-d3-js-line-chart-animated-with-live-data.html

export type BaseChartOptions = {
    x: (dataItem: any) => any; // given d in data, returns the (temporal) x-value
    y: (dataItem: any) => any; // given d in data, returns the (quantitative) y-value
    defined: (dataItem: any, index: number) => boolean; // for gaps in data
    curve: d3.CurveFactory; // method of interpolation between points
    marginTop: number; // top margin, in pixels
    marginRight: number; // right margin, in pixels
    marginBottom: number; // bottom margin, in pixels
    marginLeft: number; // left margin, in pixels
    width: number; // outer width, in pixels
    height: number; // outer height, in pixels
    xType: any; // the x-scale type
    xDomain: [number, number] | [undefined, undefined]; // [xmin, xmax]
    xRange: [number, number] | [undefined, undefined]; // [left, right]
    yType: any; // the y-scale type
    yDomain: [number, number] | [undefined, undefined]; // [ymin, ymax]
    yRange: [number, number] | [undefined, undefined]; // [bottom, top]
    yFormat: any; // a format specifier string for the y-axis
    xLabel: string; // a label for the x-axis
    yLabel: string; // a label for the y-axis
    color: string; // stroke color of line
    strokeLinecap: string; // stroke line cap of the line
    strokeLinejoin: string; // stroke line join of the line
    strokeWidth: number; // stroke width of line, in pixels
    strokeOpacity: number; // stroke opacity of line
};

export type LineChartOptions = BaseChartOptions & {
    area: boolean;
    boundaryTicks: boolean;
    maxItemsDisplayed: number;
    xPadding: number;
    yPadding: number;
    animateAxis: boolean;
    animateLines: boolean;
    xAxis: boolean;
    yAxis: boolean;
    xAxisTicksFormatter: (domainValue: d3.AxisDomain, index: number) => string;
    yAxisTicksFormatter: (domainValue: d3.AxisDomain, index: number) => string;
};

export class LineChart {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // shall make partial options
    static DEFAULT_OPTIONS: LineChartOptions = {
        boundaryTicks: false,
        maxItemsDisplayed: 0,
        xAxis: true,
        yAxis: true,
        xAxisTicksFormatter: (value) => value.toString(),
        yAxisTicksFormatter: (value) => value.toString(),
        x: ([x]) => x, // given d in data, returns the (temporal) x-value
        y: ([, y]) => y, // given d in data, returns the (quantitative) y-value
        curve: d3.curveLinear, // method of interpolation between points
        marginTop: 20, // top margin, in pixels
        marginRight: 30, // right margin, in pixels
        marginBottom: 30, // bottom margin, in pixels
        marginLeft: 40, // left margin, in pixels
        width: 640, // outer width, in pixels
        height: 400, // outer height, in pixels
        xType: d3.scaleLinear, // the x-scale type
        xRange: [40, 640 - 30], // [left, right] [marginLeft, width - marginRight]
        yType: d3.scaleLinear, // the y-scale type
        yRange: [400 - 30, 20], // [bottom, top] [height - marginBottom, marginTop]
        color: "currentColor", // stroke color of line
        strokeLinecap: "round", // stroke line cap of the line
        strokeLinejoin: "round", // stroke line join of the line
        strokeWidth: 1.5, // stroke width of line, in pixels
        strokeOpacity: 1, // stroke opacity of line
    };

    root: string | HTMLDivElement;
    options: LineChartOptions;

    data: Array<any>;
    xValues: Array<any>;
    yValues: Array<any>;
    itemsDefinedState: Array<boolean>;
    itemsIndexes: Array<number>;

    svg: any;
    yAxisG: any;
    linePath: any;
    xScale: any;
    yScale: any;
    xAxis: any;
    yAxis: any;
    line: any;

    constructor(
        root: string | HTMLDivElement,
        initialData: Array<any>,
        options: LineChartOptions | Partial<LineChartOptions>
    ) {
        this.root = root;
        this.options = {...LineChart.DEFAULT_OPTIONS, ...options};

        if (options.width || options.marginLeft || options.marginRight) {
            const width = options.width || this.options.width;
            const marginLeft = options.marginLeft || this.options.marginLeft;
            const marginRight = options.marginRight || this.options.marginRight;
            this.options.xRange = [marginLeft, width - marginRight];
        }
        if (options.height || options.marginBottom || options.marginTop || !options.xAxis) {
            const height = options.height || this.options.height;
            const marginBottom = options.marginBottom || this.options.marginBottom;
            const marginTop = options.marginTop || this.options.marginTop;
            if (this.options.xAxis || marginBottom || marginTop) {
                this.options.yRange = [height - marginBottom, marginTop];
            } else {
                this.options.yRange = [height, 0];
            }
        }

        this.data = initialData || [];
        this.xValues = [];
        this.yValues = [];
        this.itemsDefinedState = [];
        this.itemsIndexes = [];

        this.svg = null;
        this.yAxisG = null;
        this.linePath = null;
        this.xScale = null;
        this.yScale = null;
        this.xAxis = null;
        this.yAxis = null;
        this.line = null;

        this.init();
    }

    private init = () => {
        //const bb = d3.select('#graph').node().getBoundingClientRect();
        const {width, height} = this.options;

        this.svg = d3
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .select(`#${this.root}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    };

    private computeData = () => {
        const {x, y, defined} = this.options;
        this.xValues = d3.map(this.data, x);
        this.yValues = d3.map(this.data, y);
        const isItemDefinedFunction = defined || ((d, i) => !isNaN(this.xValues[i]) && !isNaN(this.yValues[i]));
        this.itemsDefinedState = d3.map(this.data, isItemDefinedFunction);
        this.itemsIndexes = this.options.maxItemsDisplayed
            ? d3.range(this.options.maxItemsDisplayed)
            : d3.range(this.xValues.length);
    };

    private computeDomain = (values: Array<number>, padding: number) => {
        let domain;
        const extremes = d3.extent(values);
        if (padding && extremes[0]) {
            domain = [extremes[0] * (1 - padding), extremes[1] * (1 + padding)];
        } else {
            domain = d3.extent(values);
        }
        return domain;
    };

    private createAxis = () => {
        const {
            width,
            height,
            xDomain: defaultXDomain,
            yDomain: defaultYDomain,
            xPadding,
            yPadding,
            xType,
            yType,
            xRange,
            yRange,
            xAxisTicksFormatter,
            yAxisTicksFormatter,
        } = this.options;
        // Compute default domains.
        const xDomain = defaultXDomain || this.computeDomain(this.xValues, xPadding);
        const yDomain = defaultYDomain || this.computeDomain(this.yValues, yPadding);

        // Construct scales and axes.
        this.xScale = xType(xDomain, xRange);
        this.yScale = yType(yDomain, yRange);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.xAxis = d3
            .axisBottom(this.xScale)
            .ticks(width / 80)
            .tickFormat(xAxisTicksFormatter)
            .tickSizeOuter(0);
        this.yAxis = d3
            .axisLeft(this.yScale)
            .ticks(height / 40)
            .tickFormat(yAxisTicksFormatter);
    };

    private createLine = () => {
        // Construct a line generator.
        if (this.options.area) {
            this.line = d3
                .area()
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                .defined((i) => this.itemsDefinedState[i])
                .curve(this.options.curve)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                .x((i) => this.xScale(this.xValues[i]))
                .y0(this.yScale(0))
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                .y1((i) => this.yScale(this.yValues[i]));
        } else {
            this.line = d3
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
                .y((i) => this.yScale(this.yValues[i]));
        }
    };

    private renderOnce = () => {
        const {
            width,
            height,
            marginLeft,
            marginRight,
            marginBottom,
            yLabel,
            xLabel,
            color,
            strokeWidth,
            strokeLinecap,
            strokeLinejoin,
            strokeOpacity,
        } = this.options;

        this.options.yAxis &&
            this.svg
                .append("g")
                .attr("transform", `translate(${marginLeft},0)`)
                .attr("class", "axis y")
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
                        .attr("x", 0)
                        .attr("y", 10)
                        .attr("fill", "currentColor")
                        .attr("text-anchor", "end")
                        .text(yLabel)
                );

        this.options.xAxis &&
            this.svg
                .append("g")
                .attr("transform", `translate(0, ${height - marginBottom})`)
                .attr("class", "axis x")
                .call(this.xAxis)
                .call((g: any) =>
                    g
                        .append("text")
                        .attr("x", width - marginLeft)
                        .attr("y", 30)
                        .attr("fill", "currentColor")
                        .attr("text-anchor", "start")
                        .text(xLabel)
                );

        // .call((g: any) => g.select('.domain').remove());

        const path = this.svg
            .append("path")
            .attr("class", `${this.root}-line`)
            .attr("stroke", color)
            .attr("stroke-width", strokeWidth)
            .attr("stroke-linecap", strokeLinecap)
            .attr("stroke-linejoin", strokeLinejoin)
            .attr("stroke-opacity", strokeOpacity)
            .attr("d", this.line(this.itemsIndexes));

        if (this.options.area) {
            path.attr("fill", color);
            path.attr("fill-opacity", "0.5");
        } else {
            path.attr("fill", "none");
        }
    };

    private renderUpdate = () => {
        const {width, marginLeft, marginRight, color} = this.options;

        const yAxisGroup = this.svg.select("g.axis.y").attr("class", "axis y");
        if (this.options.animateAxis) {
            yAxisGroup
                .transition()
                .duration(500)
                .call(this.yAxis)
                .call((g: any) =>
                    g
                        .selectAll(".tick line")
                        .attr("x2", width - marginLeft - marginRight)
                        .attr("stroke-opacity", 0.1)
                );
        } else {
            yAxisGroup.call(this.yAxis).call((g: any) =>
                g
                    .selectAll(".tick line")
                    .attr("x2", width - marginLeft - marginRight)
                    .attr("stroke-opacity", 0.1)
            );
        }

        this.svg
            .select("g.axis.x")
            .attr("class", "axis x")
            .call(this.xAxis)
            .call((g: any) =>
                g
                    .append("text")
                    .attr("x", width - marginLeft)
                    .attr("y", 30)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
            );

        const path = this.svg.selectAll(`.${this.root}-line`);
        if (this.options.animateLines) {
            path.transition().duration(500).attr("d", this.line(this.itemsIndexes));
            // path.transition()
            //     .duration(500)
            //     .attr("d", this.line(this.itemsIndexes))
            //     .attr("transform", "translate(" + this.yScale(this.yValues[this.data.length - 1]) + ")");
        } else {
            path.attr("d", this.line(this.itemsIndexes));
        }
        if (this.options.area) {
            path.attr("fill", color).attr("fill-opacity", "0.5");
        } else {
            path.attr("fill", "none");
        }
    };

    private computeAll = () => {
        this.computeData();
        this.createAxis();
        this.createLine();
    };

    render = () => {
        this.computeAll();
        this.renderOnce();
    };

    update = (data: Array<any>) => {
        this.data = data;
        if (this.options.maxItemsDisplayed && this.data.length > this.options.maxItemsDisplayed) this.data.shift();
        this.computeAll();
        this.renderUpdate();
    };

    addData = (dataItem: any) => {
        const {x} = this.options;
        if (this.data.length) {
            const lastX = x(this.data[this.data.length - 1]);
            const newX = x(dataItem);
            if (lastX === newX || lastX > newX) return;
            this.data.push(dataItem);
            if (this.options.maxItemsDisplayed && this.data.length > this.options.maxItemsDisplayed) this.data.shift();
        } else {
            this.data.push(dataItem);
        }
        this.computeAll();
        this.renderUpdate();
    };
}
