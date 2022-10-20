//@ts-ignore
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {Scales} from "../helper";

export function bitrateArea(options: any, duration: number) {
    const plot = Plot.areaY([], options);
    const {render} = plot;
    //@ts-ignore
    plot.render = function (I, scales, channels, dimensions) {
        const g = render.apply(this, arguments);
        setTimeout(() => {
            g.ownerSVGElement.updateBitrateArea = update;
        }, 1);
        const {height, marginBottom} = dimensions;
        return g;
        //@ts-ignore
        function update(v) {
            const {x: xScale, y: yScale} = Scales(v[0], dimensions);
            const xValues = d3.map(v[0], (item: any) => item.moment);
            //@ts-ignore
            const area = d3
                .area()
                .x((d: any) => xScale(d.moment))
                .y0(height - marginBottom)
                .y1((d: any) => yScale(d.bitrate));

            function tick() {
                // Redraw the line.
                d3.select(g)
                    .selectAll("path")
                    //@ts-ignore
                    .attr("d", area)
                    .attr("transform", null);

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
                        .attr("transform", "translate(" + -xDelta + ",0)")
                        .transition();
            }

            d3.select(g)
                .selectAll("path")
                .data(v)
                .join("path")
                //@ts-ignore
                .attr("d", area)
                .transition()
                .duration(duration)
                .ease(d3.easeLinear)
                .on("start", tick);
        }
    };
    return plot;
}
