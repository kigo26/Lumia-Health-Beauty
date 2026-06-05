import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'motion/react';

interface DataPoint {
  date: Date;
  stress: number;
  sleep: number;
  energy: number;
  tension: number;
}

const generateMockData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date,
      stress: Math.floor(Math.random() * 4) + 3,
      sleep: Math.floor(Math.random() * 4) + 5,
      energy: Math.floor(Math.random() * 5) + 4,
      tension: Math.floor(Math.random() * 4) + 2,
    });
  }
  return data;
};

export const MetricChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const data = generateMockData();
    const container = containerRef.current;
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear existing content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, 10])
      .range([height, 0]);

    // Grid lines
    svg.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.05)
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(() => "")
      );

    // Axes
    const xAxis = d3.axisBottom(x)
      .ticks(6)
      .tickFormat(d3.timeFormat("%b %d") as any);

    const yAxis = d3.axisLeft(y)
      .ticks(5);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .attr("font-family", "Inter")
      .attr("font-size", "10px")
      .call(g => g.select(".domain").attr("stroke", "#eee"))
      .call(g => g.selectAll(".tick line").attr("stroke", "#eee"));

    svg.append("g")
      .call(yAxis)
      .attr("font-family", "Inter")
      .attr("font-size", "10px")
      .call(g => g.select(".domain").attr("stroke", "transparent"))
      .call(g => g.selectAll(".tick line").attr("stroke", "#eee"));

    const metrics: (keyof Omit<DataPoint, 'date'>)[] = ["stress", "sleep", "energy", "tension"];
    const colors = ["#E11D48", "#0EA5E9", "#F59E0B", "#10B981"];

    metrics.forEach((metric, i) => {
      const line = d3.line<DataPoint>()
        .x(d => x(d.date))
        .y(d => y(d[metric]))
        .curve(d3.curveMonotoneX);

      const path = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", colors[i])
        .attr("stroke-width", 2)
        .attr("opacity", 0.7)
        .attr("d", line);

      const totalLength = path.node()?.getTotalLength() || 0;

      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeCubicOut)
        .attr("stroke-dashoffset", 0);
    });

    // Tooltip area
    const focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus.append("line")
      .attr("class", "x-hover-line hover-line")
      .attr("y1", 0)
      .attr("stroke", "#eee")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3,3");

    const overlay = svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => focus.style("display", null))
      .on("mouseout", () => focus.style("display", "none"))
      .on("mousemove", mousemove);

    function mousemove(event: any) {
      const x0 = x.invert(d3.pointer(event)[0]);
      const bisectDate = d3.bisector((d: DataPoint) => d.date).left;
      const i = bisectDate(data, x0, 1);
      const d0 = data[i - 1];
      const d1 = data[i];
      const d = x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime() ? d1 : d0;

      focus.select(".x-hover-line").attr("transform", `translate(${x(d.date)},0)`).attr("y2", height);
    }

  }, []);

  return (
    <div className="bg-white border border-black/5 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-tranquil-teal/70">Biological Resonance Trend</p>
          <h3 className="text-2xl font-serif text-tranquil-text italic">30-Day Ritual Optimization</h3>
        </div>
        <div className="flex flex-wrap gap-6">
          {[
            { label: 'Stress', color: 'bg-rose-500' },
            { label: 'Sleep', color: 'bg-sky-500' },
            { label: 'Energy', color: 'bg-amber-500' },
            { label: 'Tension', color: 'bg-emerald-500' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div ref={containerRef} className="w-full overflow-hidden">
        <svg ref={svgRef} className="w-full h-auto"></svg>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-black/5 pt-8">
        <p className="text-[10px] text-gray-600 font-light leading-relaxed max-w-sm">
          Metrics analyzed via Lumia Protocol™ 4.2. Recommended ritual synchronization: <span className="text-tranquil-teal font-bold uppercase tracking-tighter">Every 72 Hours</span>
        </p>
        <button className="text-[10px] font-bold uppercase tracking-widest text-tranquil-teal border-b border-tranquil-teal/20 hover:border-tranquil-teal transition-all">
          Download PDF Report
        </button>
      </div>
    </div>
  );
};
