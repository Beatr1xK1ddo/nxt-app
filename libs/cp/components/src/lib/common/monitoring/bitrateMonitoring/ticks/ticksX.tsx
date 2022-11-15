//@ts-ignore
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import "./style.scss";
type Props = {
    showGrid?: boolean;
    format: string;
    time: number; // TODO Kate: this works with problems
};
export const xLine = ({format, showGrid}: Props) => {
    const plot = Plot.tickX([], {
        x: d3.timeFormat(format),
        clip: true,
    });
    const {render} = plot;
    //@ts-ignore
    plot.render = function (I, scales, channels, dimensions) {
        const g = render.apply(this, arguments);
        setTimeout(() => {
            g.ownerSVGElement.updateXline = update;
        }, 1);
        const {width, height, marginLeft, marginRight, marginBottom} = dimensions;

        return g;
        //@ts-ignore
        function update(v) {
            //@ts-ignore
            const xValues = d3.map(v[0], (data) => data.moment);
            const domain = d3.extent(xValues);
            const range = [marginLeft + 7, width - marginRight];
            //@ts-ignore
            const xScale = d3.scaleUtc(domain, range);
            //@ts-ignore
            const ticks = d3
                .axisBottom(xScale)
                .ticks(d3.timeSecond.every(15))
                // @ts-ignore
                .tickFormat(d3.timeFormat(format))
                .tickSize(showGrid ? -height : 0);
            function tick() {
                //@ts-ignore
                d3.select(this).attr("transform", `translate(0,${height - marginBottom})`);
                showGrid &&
                    //@ts-ignore
                    d3.select(this).selectAll("line").attr("stroke", "#DBDCEE").style("stroke-dasharray", "2, 3");

                // Slide it to the left.
                const xDelta = xScale(xValues[1]) - xScale(xValues[0]);
                //@ts-ignore
                g &&
                    //@ts-ignore
                    d3.active(this) &&
                    //@ts-ignore
                    d3
                        //@ts-ignore
                        .active(this)
                        .attr("transform", `translate(${-xDelta},${height - marginBottom})`)
                        .transition();
            }
            //@ts-ignore
            d3.select(this)
                .select('g[aria-label="x-axis"]')
                //@ts-ignore
                .call(ticks)
                .transition()
                .duration(1000)
                .ease(d3.easeLinear)
                .on("start", tick);
        }
    };

    return plot;
};
