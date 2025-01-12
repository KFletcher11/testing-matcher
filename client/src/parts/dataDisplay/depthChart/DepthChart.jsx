import React, { useEffect } from "react";
//import type * as d3Types from "./d3Types";
import * as d3 from "d3";
import dataStyle from "../dataDisplay.module.css";
import { formatData, cumulateData } from "./formatData";

export const DepthChart = (props) => {
  const { data, width, height } = props;

  useEffect(() => {
    drawChart();
  }, [data, width, height]);

  function drawChart() {
    d3.select("#depthContainer").select("svg").remove();
    d3.selectAll(".dataDisplay_tooltip__2OtE5").remove();

    const formattedData = formatData(data);

    const margin = { top: 0, bottom: 18, left: 28, right: 15 };

    const xMinValue = 0; //d3.min(formattedData.buyData, (d) => d.price) - 1;
    const xMaxValue = d3.max(formattedData.sellData, (d) => d.price) + 1;

    const buyPoints = cumulateData(
      formattedData.buyData,
      xMinValue,
      xMaxValue,
      "Buy"
    );

    const sellPoints = cumulateData(
      formattedData.sellData,
      xMinValue,
      xMaxValue,
      "Sell"
    );

    const alldata = buyPoints.concat(sellPoints);
    const yMinValue = 0;
    const yMaxValue = d3.max(alldata, (d) => d.volume) + 5;

    const buyStripped = buyPoints.filter((d) => d.volume !== 0);
    const sellStripped = sellPoints.filter((d) => d.volume !== 0);
    const maxBuyPrice = buyStripped[buyStripped.length - 1]?.price || 0.1;
    const minSellPrice = sellStripped[0]?.price || 9.9;
    const marketPrice =
      Math.round(((maxBuyPrice + minSellPrice) * 100) / 2) / 100;

    const offsetx = xMaxValue / width;
    const offsety = yMaxValue / height;

    const buyPointsHigh = buyPoints.map((point) => {
      return {
        ...point,
        price: point.price + offsetx,
        volume: point.volume + offsety,
      };
    });

    const buyPointsLow = buyPoints.map((point) => {
      return {
        ...point,
        price: point.price - offsetx,
        volume: point.volume - offsety,
      };
    });

    const sellPointsHigh = sellPoints.map((point) => {
      return {
        ...point,
        price: point.price - 2 * offsetx,
        volume: point.volume + offsety,
      };
    });

    const sellPointsLow = sellPoints.map((point) => {
      return {
        ...point,
        vprice: point.price + offsetx,
        volume: point.volume - offsety,
      };
    });

    const svg = d3
      .select("#depthContainer")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain([xMinValue, xMaxValue]);

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([yMinValue, yMaxValue]);

    const line = d3
      .line()
      .x((d) => xScale(d.price))
      .y((d) => yScale(d.volume));

    const area = d3
      .area()
      .x((d) => xScale(d.price))
      .y0(height)
      .y1((d) => yScale(d.volume));

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", dataStyle.tooltip)
      .style("left", "100px")
      .style("top", "100px")
      .style("opacity", 0);

    const focus = svg
      //.select("#depthContainer")
      .append("g")
      .attr("class", "focus");

    focus
      .append("circle")
      .attr("r", 5)
      .attr("class", "circle")
      .attr("r", 3)
      .style("fill", "#f0fff0");

    function mousemove(event) {
      const bisect = d3.bisector((d) => d.price).left;
      const xPos = d3.pointer(event)[0];
      const x0 = bisect(buyPoints, xScale.invert(xPos));
      const buyPoint = buyPoints[x0];
      const sellPoint = sellPoints[x0];

      if (sellPoint.volume > buyPoint.volume) {
        const d0 = sellPoint;

        focus.style("opacity", 1).raise();

        focus.style(
          "transform",
          `translate(${xScale(d0.price)}px,${yScale(d0.volume)}px)`
        );

        tooltip.transition().duration(50).style("opacity", 0.9);
        tooltip
          .classed(dataStyle.buy, false)
          .classed(dataStyle.sell, true)
          .html(d0.tooltipContent || d0.price)
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 35 + "px");
      } else {
        const d0 = buyPoint;

        focus.style("opacity", 1);

        focus.style(
          "transform",
          `translate(${xScale(d0.price)}px,${yScale(d0.volume)}px)`
        );

        tooltip.transition().duration(50).style("opacity", 0.9);
        tooltip
          .classed(dataStyle.sell, false)
          .classed(dataStyle.buy, true)
          .html(d0.tooltipContent || d0.price)
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 35 + "px");
      }
    }

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .scale(xScale)
          .ticks(width / 50)
      );

    svg
      .append("g")
      .attr("class", "y-axis")
      .call(
        d3
          .axisLeft(yScale)
          .ticks(height / 25)
          .tickSizeOuter(0)
      );

    /*svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 3)
      .style("text-anchor", "middle")
      .style("fill", "#f0fff0")
      .text("Price [GBP]");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 10)
      .style("text-anchor", "middle")
      .style("fill", "#f0fff0")
      .text("Cum. Volume");*/

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 7 + 15)
      .style("text-anchor", "middle")
      .style("font-size", "18px")
      .style("fill", "honeydew")
      .text("£" + marketPrice.toFixed(2));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 9)
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .style("fill", "#707070")
      .text("Mid-market price");

    svg
      .append("path")
      .datum(sellPointsLow)
      .attr("d", area)
      .attr("fill", "#ff7b7b88");

    svg
      .append("path")
      .datum(buyPointsLow)
      .attr("d", area)
      .attr("fill", "#7bff7b88");

    svg
      .append("path")
      .datum(sellPointsHigh)
      .attr("fill", "none")
      .attr("stroke", "#ff7b7b")
      .attr("stroke-width", 1)
      .attr("d", line);

    svg
      .append("path")
      .datum(sellPointsLow)
      .attr("fill", "none")
      .attr("stroke", "#ff7b7b")
      .attr("stroke-width", 1)
      .attr("d", line);

    svg
      .append("path")
      .datum(buyPointsHigh)
      .attr("fill", "none")
      .attr("stroke", "#7bff7b")
      .attr("stroke-width", 1)
      .attr("class", "line")
      .attr("d", line);

    svg
      .append("path")
      .datum(buyPointsLow)
      .attr("fill", "none")
      .attr("stroke", "#7bff7b")
      .attr("stroke-width", 1)
      .attr("class", "line")
      .attr("d", line);

    svg
      .append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .style("opacity", 0)
      .on("mouseover", () => {
        focus.style("opacity", 1);
      })
      .on("mouseout", () => {
        focus.style("opacity", 0);
        tooltip.transition().duration(300).style("opacity", 0);
      })
      .on("mousemove", mousemove);
  }

  return <div id="depthContainer" />;
};

/*export const Svg = () => {
  const ref = useRef();

  useEffect(() => {}, []);
  return (
    <svg ref={ref} style={{ border: "2px solid honeydew" }}>
      <circle cx="150" cy="70" r="50" fill="honeydew" />
    </svg>
  );
};*/
