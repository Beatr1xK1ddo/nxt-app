import * as d3 from "d3";
export const computeDomain = (values: Array<number>, padding: number) => {
    let domain;
    const extremes = d3.extent(values);
    if (padding) {
        const min = extremes[0] || 0;
        const max = extremes[1] || 14000000;
        domain = [Math.round(min * (1 - padding)), Math.round(max * (1 + padding))];
    } else {
        domain = extremes;
    }
    return domain;
};

export const Scales = (data: any, dimensions: any) => {
    const {width, height, marginLeft, marginBottom, marginTop} = dimensions;
    const yPadding = 0.3;
    const xValues = d3.map(data, (item: any) => item.moment);
    const y1Values = d3.map(data, (item: any) => item.bitrate);
    const y2Values = d3.map(data, (item: any) => item.muxrate);
    const xDomain = d3.extent(xValues);
    const xRange = [marginLeft, width];
    const yRange = [height - marginBottom, marginTop];
    //@ts-ignore
    const xScale = d3.scaleUtc(xDomain, xRange);
    //@ts-ignore
    const yDomain = computeDomain([...y1Values, ...y2Values], yPadding);
    //@ts-ignore
    const yScale = d3.scaleLinear(yDomain, yRange);

    return {
        x: xScale,
        y: yScale,
    };
};
