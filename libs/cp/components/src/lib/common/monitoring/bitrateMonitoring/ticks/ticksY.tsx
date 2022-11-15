//@ts-ignore
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {bitrateFormatter} from "@nxt-ui/cp/utils";
import {Scales} from "../helper";
type Props = {
    showGrid?: boolean;
};
export const yLine = ({showGrid}: Props) => {
    const plot = Plot.tickY([], {
        y: bitrateFormatter,
    });
    const {render} = plot;
    //@ts-ignore
    plot.render = function (I, scales, channels, dimensions) {
        const g = render.apply(this, arguments);
        setTimeout(() => {
            g.ownerSVGElement.updateYline = update;
        }, 1);
        return g;
        //@ts-ignore
        function update(v) {
            const {marginLeft, marginRight, width} = dimensions;
            const {x: xScale, y: yScale} = Scales(v[0], dimensions);
            const xValues = d3.map(v[0], (item: any) => item.moment);
            const ticks = d3
                .axisLeft(yScale)
                .ticks(10)
                .tickFormat(bitrateFormatter)
                .tickSize(showGrid ? -width + marginLeft + marginRight : 0);
            function tick() {
                //@ts-ignore
                d3.select(this)
                    .select('g[aria-label="y-axis"]')
                    //@ts-ignore
                    .call(ticks);

                //@ts-ignore
                d3.select(this).selectAll("line").attr("stroke", "#DBDCEE").style("stroke-dasharray", "2, 3");

                // Redraw the line.
                // d3.select(g)
                //     .attr("transform", `translate(${marginLeft},0)`)
                //     .call(ticks);

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
                        .attr("transform", `translate(${marginLeft},0)`)
                        .transition();
            }
            //@ts-ignore
            d3.select(this)
                .select('g[aria-label="y-axis"]')
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
