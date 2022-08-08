//@ts-ignore
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
export function bitrateLine(options: any, duration: number) {
    const plot = Plot.line([], options);
    const {render} = plot;
    //@ts-ignore
    plot.render = function (index, scales, channels, dimensions, context) {
        const g = render.apply(this, arguments);
        const {width, marginLeft} = dimensions;
        setTimeout(() => (g.ownerSVGElement.updateBitrateLine = update), 1);
        return g;

        //@ts-ignore
        function update(v) {
            //@ts-ignore
            const xValues = d3.map(v[0], (data) => data.moment);
            const domain = d3.extent(xValues);
            const range = [marginLeft, width];
            //@ts-ignore
            const xScale = d3.scaleUtc(domain, range);
            //@ts-ignore
            const line = d3
                .line()
                .x((d: any) => xScale(d.moment))
                .y((d: any) => scales.y(d.bitrate));

            function tick() {
                // Redraw the line.
                d3.select(g)
                    .selectAll("path")
                    //@ts-ignore
                    .attr("d", line)
                    .attr("transform", null);

                // Slide it to the left.
                let xDelta = xScale(xValues[1]) - xScale(xValues[0]);
                //@ts-ignore
                g &&
                    //@ts-ignore
                    d3.active(this) &&
                    //@ts-ignore
                    d3
                        //@ts-ignore
                        .active(this)
                        .attr("transform", "translate(" + -xDelta + ",0)")
                        .transition();
            }

            d3.select(g)
                .selectAll("path")
                .data(v)
                .join("path")
                //@ts-ignore
                .attr("d", line)
                .transition()
                .duration(duration)
                .ease(d3.easeLinear)
                .on("start", tick);
        }
    };
    return plot;
}
