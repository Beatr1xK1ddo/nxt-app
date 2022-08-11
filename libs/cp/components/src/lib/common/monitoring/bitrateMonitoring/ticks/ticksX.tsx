//@ts-ignore
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
export const xLine = () => {
    const plot = Plot.tickX([], {
        x: d3.timeFormat("%M:%S"),
    });
    const {render} = plot;
    //@ts-ignore
    plot.render = function (I, scales, channels, dimensions) {
        const g = render.apply(this, arguments);
        setTimeout(() => {
            g.ownerSVGElement.updateXline = update;
        }, 1);
        const {width, height, marginLeft, marginBottom} = dimensions;
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
            const ticks = d3
                .axisBottom(xScale)
                .ticks(d3.timeSecond.every(10))
                // @ts-ignore
                .tickFormat(d3.timeFormat("%M:%S"));
            function tick() {
                // Redraw the line.
                d3.select(g)
                    .attr("transform", `translate(0,${height - marginBottom})`)
                    .call(ticks);

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
                        .attr("transform", `translate(${-xDelta},${height - marginBottom})`)
                        .transition();
            }
            d3.select(g).call(ticks).transition().duration(1000).ease(d3.easeLinear).on("start", tick);
        }
    };

    return plot;
};
