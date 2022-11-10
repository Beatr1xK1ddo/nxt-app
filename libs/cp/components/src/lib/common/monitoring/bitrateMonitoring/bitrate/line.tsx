//@ts-ignore
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {Scales} from "../helper";
export function bitrateLine(options: any, duration: number) {
    const plot = Plot.line([], options);
    const {render} = plot;
    //@ts-ignore
    plot.render = function (index, scales, channels, dimensions, context) {
        const g = render.apply(this, arguments);
        setTimeout(() => (g.ownerSVGElement.updateBitrateLine = update), 1);
        return g;

        //@ts-ignore
        function update(v) {
            const {x: xScale, y: yScale} = Scales(v[0], dimensions);
            const xValues = d3.map(v[0], (item: any) => item.moment);
            //@ts-ignore
            const line = d3
                .line()
                .x((d: any) => xScale(d.moment || 0))
                .y((d: any) => yScale(d.bitrate || 0));

            function tick() {
                // Redraw the line.
                d3.select(g)
                    .selectAll("path")
                    //@ts-ignore
                    .attr("d", line)
                    .attr("transform", null);

                // Slide it to the left.
                const xDelta = xScale(xValues[1] || 0) - xScale(xValues[0] || 0);
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
