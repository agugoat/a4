// ======= CONFIG =======

// change these to match your actual CSV column names
const metrics = [
    { id: "gdp_per_capita", label: "GDP PER CAPITA" },
    { id: "health_spend", label: "HEALTH $ PER CAPITA" },
    { id: "education_spend", label: "EDUCATION AS % GDP" },
    { id: "electricity_access", label: "ELECTRICITY ACCESS" },
    { id: "infant_mortality", label: "INFANT MORTALITY" },
    { id: "co2_emissions", label: "CO2E EMISSIONS" },
    { id: "unemployment", label: "UNEMPLOYMENT" },
    { id: "extreme_poverty", label: "EXTREME POVERTY" },
    { id: "rule_of_law", label: "RULE OF LAW" },
    { id: "gini", label: "GINI" }
    // add more if you like
  ];
  
  // decide what your regions are
  const regions = [
    "Americas",
    "East Asia & Pacific",
    "Europe & Central Asia",
    "Middle East & North Africa",
    "South Asia",
    "Sub-Saharan Africa"
  ];
  
  const selectedRegionColor = "#7b3fe4";
  
  // ======= SVG SETUP =======
  
  const width = 700;
  const height = 700;
  const innerRadius = 80;
  const outerRadius = 280;
  
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  
  const g = svg.append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);
  
  const tooltip = d3.select("#tooltip");
  
  // center text
  const centerGroup = g.append("g");
  centerGroup.append("text")
    .attr("id", "center-text")
    .attr("y", -6);
  centerGroup.append("text")
    .attr("id", "center-subtext")
    .attr("y", 14);
  
  // angle scale over metrics
  let angleScale = d3.scaleBand()
    .domain(metrics.map(m => m.id))
    .range([ -Math.PI / 2, 3 * Math.PI / 2 ])   // semi-circle to full circle look
    .paddingInner(0.05);
  
  // radius scale (you may later use per-metric scales if needed)
  const radiusScale = d3.scaleLinear()
    .range([innerRadius, outerRadius]);
  
  // arc generator for purple "better" arc
  const arcGen = d3.arc()
    .innerRadius(outerRadius + 10)
    .outerRadius(outerRadius + 16);
  
  // placeholder for processed per-metric stats
  let metricStats = [];   // [{id, label, regionValues: {Americas: ..}, betterFor: 'Americas' }, ...]
  
  // ======= LOAD DATA =======
  // point this to your CSV (same as A3, or a pre-aggregated one)
  d3.csv("data.csv").then(raw => {
    // convert numeric fields
    raw.forEach(d => {
      metrics.forEach(m => {
        d[m.id] = +d[m.id];
      });
    });
  
    // compute region averages per metric
    metricStats = computeRegionAverages(raw);
  
    // populate dropdown
    initDropdown();
  
    // initial draw with first region
    const initialRegion = regions[0];
    d3.select("#region-select").property("value", initialRegion);
    updateVisualization(initialRegion);
  });
  
  // ======= DATA PROCESSING =======
  
  function computeRegionAverages(data) {
    // group by region
    const dataByRegion = d3.group(data, d => d.Region);
  
    const stats = metrics.map(m => {
      const regionValues = {};
      regions.forEach(r => {
        const rows = dataByRegion.get(r) || [];
        const vals = rows.map(d => d[m.id]).filter(v => !isNaN(v));
        regionValues[r] = vals.length ? d3.mean(vals) : NaN;
      });
  
      // find which region is max (better) for this metric
      const entries = Object.entries(regionValues).filter(([r, v]) => !isNaN(v));
      const maxEntry = d3.max(entries, e => e[1]);
      const bestRegion = entries.find(([r, v]) => v === maxEntry)?.[0];
  
      return {
        id: m.id,
        label: m.label,
        regionValues,
        betterFor: bestRegion
      };
    });
  
    return stats;
  }
  
  // ======= DROPDOWN =======
  
  function initDropdown() {
    const select = d3.select("#region-select");
    select.selectAll("option")
      .data(regions)
      .enter()
      .append("option")
      .attr("value", d => d)
      .text(d => d);
  
    select.on("change", (event) => {
      const region = event.target.value;
      updateVisualization(region);
    });
  }
  
  // ======= MAIN UPDATE FUNCTION =======
  
  function updateVisualization(selectedRegion) {
    // sort metrics so that the ones where selectedRegion is best come first
    const sortedStats = metricStats.slice().sort((a, b) => {
      const aBetter = a.betterFor === selectedRegion ? -1 : 1;
      const bBetter = b.betterFor === selectedRegion ? -1 : 1;
      return aBetter - bBetter;
    });
  
    // update angle scale domain in new order
    angleScale.domain(sortedStats.map(d => d.id));
  
    // update radius scale domain using global min/max for clarity
    const allVals = [];
    sortedStats.forEach(m => {
      regions.forEach(r => {
        const v = m.regionValues[r];
        if (!isNaN(v)) allVals.push(v);
      });
    });
    radiusScale.domain(d3.extent(allVals));
  
    // ------- DRAW METRIC SLICES (for hover background) -------
    const sliceAngle = angleScale.bandwidth();
  
    const slices = g.selectAll(".metric-slice")
      .data(sortedStats, d => d.id);
  
    slices.enter()
      .append("path")
      .attr("class", "metric-slice")
      .merge(slices)
      .attr("d", d => {
        const start = angleScale(d.id);
        const end = start + sliceAngle;
        return d3.arc()
          .innerRadius(innerRadius - 20)
          .outerRadius(outerRadius + 30)
          .startAngle(start)
          .endAngle(end)();
      })
      .on("mouseover", function (event, d) {
        d3.select(this).classed("hovered", true);
      })
      .on("mouseout", function () {
        d3.select(this).classed("hovered", false);
      });
  
    slices.exit().remove();
  
    // ------- DRAW AXIS LINES -------
    const axes = g.selectAll(".axis-line")
      .data(sortedStats, d => d.id);
  
    axes.enter()
      .append("line")
      .attr("class", "axis-line")
      .merge(axes)
      .attr("x1", d => Math.cos(angleScale(d.id) - Math.PI / 2) * innerRadius)
      .attr("y1", d => Math.sin(angleScale(d.id) - Math.PI / 2) * innerRadius)
      .attr("x2", d => Math.cos(angleScale(d.id) - Math.PI / 2) * outerRadius)
      .attr("y2", d => Math.sin(angleScale(d.id) - Math.PI / 2) * outerRadius);
  
    axes.exit().remove();
  
    // ------- METRIC LABELS -------
    const labels = g.selectAll(".metric-label")
      .data(sortedStats, d => d.id);
  
    labels.enter()
      .append("text")
      .attr("class", "metric-label")
      .merge(labels)
      .attr("transform", d => {
        const angle = angleScale(d.id) - Math.PI / 2;
        const x = Math.cos(angle) * (outerRadius + 40);
        const y = Math.sin(angle) * (outerRadius + 40);
        return `translate(${x},${y}) rotate(${angle * 180 / Math.PI})`;
      })
      .text(d => d.label);
  
    labels.exit().remove();
  
    // ------- REGION CIRCLES -------
    // create one group per metric, then circles within it
    const metricGroups = g.selectAll(".metric-group")
      .data(sortedStats, d => d.id);
  
    const metricGroupsEnter = metricGroups.enter()
      .append("g")
      .attr("class", "metric-group");
  
    metricGroupsEnter.merge(metricGroups)
      .each(function (metric) {
        const angle = angleScale(metric.id) - Math.PI / 2;
  
        const regionData = regions.map(r => ({
          metric: metric,
          region: r,
          value: metric.regionValues[r]
        }));
  
        const circles = d3.select(this).selectAll("circle")
          .data(regionData, d => d.region);
  
        circles.enter()
          .append("circle")
          .attr("class", "region-circle")
          .merge(circles)
          .attr("cx", d => Math.cos(angle) * radiusScale(d.value))
          .attr("cy", d => Math.sin(angle) * radiusScale(d.value))
          .attr("r", d => d.region === selectedRegion ? 7 : 4)
          .classed("selected-region", d => d.region === selectedRegion)
          .on("mouseover", (event, d) => {
            tooltip
              .classed("hidden", false)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY + 10) + "px")
              .html(`
                <strong>${d.value.toFixed(1)}</strong><br/>
                METRIC: ${d.metric.label}<br/>
                REGION: ${d.region}
              `);
          })
          .on("mouseout", () => {
            tooltip.classed("hidden", true);
          });
  
        circles.exit().remove();
      });
  
    metricGroups.exit().remove();
  
    // ------- PURPLE ARC FOR "BETTER" METRICS -------
    const betterMetrics = sortedStats.filter(m => m.betterFor === selectedRegion);
    let arcSelection = g.selectAll(".better-arc").data(betterMetrics.length ? [betterMetrics] : []);
  
    arcSelection.enter()
      .append("path")
      .attr("class", "better-arc")
      .merge(arcSelection)
      .attr("d", metricsArray => {
        const ids = metricsArray.map(m => m.id);
        const startMetric = ids[0];
        const endMetric = ids[ids.length - 1];
        const start = angleScale(startMetric);
        const end = angleScale(endMetric) + angleScale.bandwidth();
        return arcGen.startAngle(start).endAngle(end)();
      });
  
    arcSelection.exit().remove();
  
    const pct = Math.round((betterMetrics.length / sortedStats.length) * 100);
    d3.select("#center-text").text(`${pct}%`);
    d3.select("#center-subtext")
      .text("of metrics are stronger than the average of other regions.");
  }
  