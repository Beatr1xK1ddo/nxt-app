//@ts-ignore
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
export function muxrateLine(options: any, duration: number) {
    const plot = Plot.lineX([], options);
    const {render} = plot;
    //@ts-ignore
    plot.render = function (index, scales, channels, dimensions, context) {
        const g = render.apply(this, arguments);
        const {width, height, marginLeft, marginBottom} = dimensions;
        setTimeout(() => (g.ownerSVGElement.updateMaxrateLine = update), 1);
        return g;

        function update(data: any) {
            const xValues = d3.map(data[0], (item: any) => item.moment);
            const domain = d3.extent(xValues);
            const range = [marginLeft, width];
            //@ts-ignore
            const xScale = d3.scaleUtc(domain, range);
            const line = d3
                .line()
                .x((d: any) => xScale(d.moment))
                .y((d: any) => scales.y(d.muxrate));

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
                .data(data)
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
