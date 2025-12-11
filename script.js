// ======= CONFIG =======

// Metric definitions with actual CSV column names
const metrics = [
  { id: "gdp_per_capita", label: "GDP PER CAPITA", col: "GDP per capita in $ (PPP)" },
  { id: "health_spend", label: "HEALTH $ PER CAPITA", col: "health expenditure \nper person" },
  { id: "education_spend", label: "EDUCATION AS % GDP", col: "Education as % of GDP" },
  { id: "electricity_access", label: "ELECTRICITY ACCESS", col: "% of population with access to electricity" },
  { id: "infant_mortality", label: "INFANT MORTALITY", col: "infant mortality" },
  { id: "co2_emissions", label: "CO2E EMISSIONS", col: "CO2e emissions per capita" },
  { id: "unemployment", label: "UNEMPLOYMENT", col: "unemployment (%)" },
  { id: "extreme_poverty", label: "EXTREME POVERTY", col: "% of population in extreme poverty" },
  { id: "rule_of_law", label: "RULE OF LAW", col: "rule of law" },
  { id: "gini", label: "GINI", col: "GINI index" }
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

  // Region mapping
  const regionByCountry = {
    // --- Americas ---
    "United States": "Americas",
    "Canada": "Americas",
    "Mexico": "Americas",
    "Argentina": "Americas",
    "Brazil": "Americas",
    "Chile": "Americas",
    "Colombia": "Americas",
    "Peru": "Americas",
    "Bolivia": "Americas",
    "Ecuador": "Americas",
    "Uruguay": "Americas",
    "Paraguay": "Americas",
    "Venezuela": "Americas",
    "Costa Rica": "Americas",
    "Panama": "Americas",
    "Guatemala": "Americas",
    "Honduras": "Americas",
    "El Salvador": "Americas",
    "Nicaragua": "Americas",
    "Dominican Republic": "Americas",
    "Haiti": "Americas",
    "Cuba": "Americas",
    "Jamaica": "Americas",
    "Trinidad and Tobago": "Americas",
    "Bahamas": "Americas",
    "Barbados": "Americas",
    "Belize": "Americas",
    "Guyana": "Americas",
    "Suriname": "Americas",

    // --- East Asia & Pacific ---
    "China": "East Asia & Pacific",
    "Mongolia": "East Asia & Pacific",
    "Japan": "East Asia & Pacific",
    "South Korea": "East Asia & Pacific",
    "North Korea": "East Asia & Pacific",
    "Hong Kong SAR, China": "East Asia & Pacific",
    "Taiwan": "East Asia & Pacific",
    "Vietnam": "East Asia & Pacific",
    "Thailand": "East Asia & Pacific",
    "Cambodia": "East Asia & Pacific",
    "Laos": "East Asia & Pacific",
    "Myanmar": "East Asia & Pacific",
    "Malaysia": "East Asia & Pacific",
    "Singapore": "East Asia & Pacific",
    "Indonesia": "East Asia & Pacific",
    "Philippines": "East Asia & Pacific",
    "Brunei": "East Asia & Pacific",
    "Timor-Leste": "East Asia & Pacific",
    "Australia": "East Asia & Pacific",
    "New Zealand": "East Asia & Pacific",
    "Fiji": "East Asia & Pacific",
    "Papua New Guinea": "East Asia & Pacific",
    "Solomon Islands": "East Asia & Pacific",
    "Vanuatu": "East Asia & Pacific",

    // --- Europe & Central Asia ---
    "Albania": "Europe & Central Asia",
    "Andorra": "Europe & Central Asia",
    "Armenia": "Europe & Central Asia",
    "Austria": "Europe & Central Asia",
    "Azerbaijan": "Europe & Central Asia",
    "Belarus": "Europe & Central Asia",
    "Belgium": "Europe & Central Asia",
    "Bosnia and Herzegovina": "Europe & Central Asia",
    "Bulgaria": "Europe & Central Asia",
    "Croatia": "Europe & Central Asia",
    "Cyprus": "Europe & Central Asia",
    "Czech Republic": "Europe & Central Asia",
    "Denmark": "Europe & Central Asia",
    "Estonia": "Europe & Central Asia",
    "Finland": "Europe & Central Asia",
    "France": "Europe & Central Asia",
    "Georgia": "Europe & Central Asia",
    "Germany": "Europe & Central Asia",
    "Greece": "Europe & Central Asia",
    "Hungary": "Europe & Central Asia",
    "Iceland": "Europe & Central Asia",
    "Ireland": "Europe & Central Asia",
    "Italy": "Europe & Central Asia",
    "Kazakhstan": "Europe & Central Asia",
    "Kosovo": "Europe & Central Asia",
    "Kyrgyz Republic": "Europe & Central Asia",
    "Latvia": "Europe & Central Asia",
    "Lithuania": "Europe & Central Asia",
    "Luxembourg": "Europe & Central Asia",
    "Malta": "Europe & Central Asia",
    "Moldova": "Europe & Central Asia",
    "Montenegro": "Europe & Central Asia",
    "Netherlands": "Europe & Central Asia",
    "North Macedonia": "Europe & Central Asia",
    "Norway": "Europe & Central Asia",
    "Poland": "Europe & Central Asia",
    "Portugal": "Europe & Central Asia",
    "Romania": "Europe & Central Asia",
    "Russia": "Europe & Central Asia",
    "Serbia": "Europe & Central Asia",
    "Slovak Republic": "Europe & Central Asia",
    "Slovenia": "Europe & Central Asia",
    "Spain": "Europe & Central Asia",
    "Sweden": "Europe & Central Asia",
    "Switzerland": "Europe & Central Asia",
    "Turkey": "Europe & Central Asia",
    "Turkiye": "Europe & Central Asia",
    "Ukraine": "Europe & Central Asia",
    "United Kingdom": "Europe & Central Asia",
    "Uzbekistan": "Europe & Central Asia",
    "Turkmenistan": "Europe & Central Asia",
    "Tajikistan": "Europe & Central Asia",

    // --- Middle East & North Africa ---
    "Algeria": "Middle East & North Africa",
    "Bahrain": "Middle East & North Africa",
    "Egypt": "Middle East & North Africa",
    "Iran": "Middle East & North Africa",
    "Iraq": "Middle East & North Africa",
    "Israel": "Middle East & North Africa",
    "Jordan": "Middle East & North Africa",
    "Kuwait": "Middle East & North Africa",
    "Lebanon": "Middle East & North Africa",
    "Libya": "Middle East & North Africa",
    "Morocco": "Middle East & North Africa",
    "Oman": "Middle East & North Africa",
    "Qatar": "Middle East & North Africa",
    "Saudi Arabia": "Middle East & North Africa",
    "Syrian Arab Republic": "Middle East & North Africa",
    "Tunisia": "Middle East & North Africa",
    "United Arab Emirates": "Middle East & North Africa",
    "Yemen": "Middle East & North Africa",
    "West Bank and Gaza": "Middle East & North Africa",

    // --- South Asia ---
    "Afghanistan": "South Asia",
    "Bangladesh": "South Asia",
    "Bhutan": "South Asia",
    "India": "South Asia",
    "Nepal": "South Asia",
    "Pakistan": "South Asia",
    "Sri Lanka": "South Asia",
    "Maldives": "South Asia",

    // --- Sub-Saharan Africa ---
    "Angola": "Sub-Saharan Africa",
    "Benin": "Sub-Saharan Africa",
    "Botswana": "Sub-Saharan Africa",
    "Burkina Faso": "Sub-Saharan Africa",
    "Burundi": "Sub-Saharan Africa",
    "Cabo Verde": "Sub-Saharan Africa",
    "Cameroon": "Sub-Saharan Africa",
    "Central African Republic": "Sub-Saharan Africa",
    "Chad": "Sub-Saharan Africa",
    "Comoros": "Sub-Saharan Africa",
    "Congo (Dem. Rep.)": "Sub-Saharan Africa",
    "Congo (Rep.)": "Sub-Saharan Africa",
    "Cote d'Ivoire": "Sub-Saharan Africa",
    "Djibouti": "Sub-Saharan Africa",
    "Equatorial Guinea": "Sub-Saharan Africa",
    "Eritrea": "Sub-Saharan Africa",
    "Eswatini": "Sub-Saharan Africa",
    "Ethiopia": "Sub-Saharan Africa",
    "Gabon": "Sub-Saharan Africa",
    "Gambia, The": "Sub-Saharan Africa",
    "Ghana": "Sub-Saharan Africa",
    "Guinea": "Sub-Saharan Africa",
    "Guinea-Bissau": "Sub-Saharan Africa",
    "Kenya": "Sub-Saharan Africa",
    "Lesotho": "Sub-Saharan Africa",
    "Liberia": "Sub-Saharan Africa",
    "Madagascar": "Sub-Saharan Africa",
    "Malawi": "Sub-Saharan Africa",
    "Mali": "Sub-Saharan Africa",
    "Mauritania": "Sub-Saharan Africa",
    "Mauritius": "Sub-Saharan Africa",
    "Mozambique": "Sub-Saharan Africa",
    "Namibia": "Sub-Saharan Africa",
    "Niger": "Sub-Saharan Africa",
    "Nigeria": "Sub-Saharan Africa",
    "Rwanda": "Sub-Saharan Africa",
    "Senegal": "Sub-Saharan Africa",
    "Sierra Leone": "Sub-Saharan Africa",
    "Somalia": "Sub-Saharan Africa",
    "South Africa": "Sub-Saharan Africa",
    "South Sudan": "Sub-Saharan Africa",
    "Sudan": "Sub-Saharan Africa",
    "Tanzania": "Sub-Saharan Africa",
    "Togo": "Sub-Saharan Africa",
    "Uganda": "Sub-Saharan Africa",
    "Zambia": "Sub-Saharan Africa",
    "Zimbabwe": "Sub-Saharan Africa"
  };
  
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
  
  // group for rank lines
  const linesGroup = g.append("g").attr("class", "rank-lines");
  
  // angle scale over metrics
  let angleScale = d3.scaleBand()
    .domain(metrics.map(m => m.id))
    .range([ -Math.PI / 2, 3 * Math.PI / 2 ])   // semi-circle to full circle look
    .paddingInner(0.05);
  
  // per-metric radius scales (each metric gets its own scale)
  let radiusScales = {};
  
  // arc generator for purple "better" arc
  const arcGen = d3.arc()
    .innerRadius(outerRadius + 10)
    .outerRadius(outerRadius + 16);
  
  // placeholder for processed per-metric stats
  let metricStats = [];   // [{id, label, regionValues: {Americas: ..}, betterFor: 'Americas' }, ...]
  
  // Helper function to parse numeric values
  function toNumber(value) {
    if (value == null) return NaN;
    const s = String(value).trim();
    if (!s || s === "..." || s.toLowerCase() === "na" || s.toLowerCase() === "n/a") {
      return NaN;
    }
    const cleaned = s.replace(/,/g, "").replace(/%/g, "");
    const num = +cleaned;
    return isNaN(num) ? NaN : num;
  }

  // ======= LOAD DATA =======
  d3.csv("assignment 3 & 4 dataset - assignment 3 and 4.csv").then(raw => {
    // Filter out metadata rows
    const data = raw.filter(d =>
      d.indicator &&
      !["source", "URL", "notes", "data year"].includes(d.indicator)
    );

    // Attach regions to countries
    const withRegion = data
      .map(d => {
        const region = regionByCountry[d.indicator];
        return region ? { ...d, region } : null;
      })
      .filter(d => d !== null);
  
    // compute region averages per metric
    metricStats = computeRegionAverages(withRegion);
  
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
    const dataByRegion = d3.group(data, d => d.region);
  
    const stats = metrics.map(m => {
      const regionValues = {};
      regions.forEach(r => {
        const rows = dataByRegion.get(r) || [];
        const vals = rows.map(d => toNumber(d[m.col])).filter(v => !isNaN(v));
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
  
    // create per-metric radius scales
    radiusScales = {};
    sortedStats.forEach(metric => {
      const vals = regions
        .map(r => metric.regionValues[r])
        .filter(v => !isNaN(v));
      
      if (vals.length > 0) {
        const extent = d3.extent(vals);
        let [min, max] = extent;
        if (max === min) max = min + 1; // avoid zero-range
        
        radiusScales[metric.id] = d3.scaleLinear()
          .domain([min, max])
          .range([innerRadius, outerRadius]);
      }
    });
  
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
  
    // ------- DRAW RANK LINES (connecting regions from least to greatest) -------
    const linesData = sortedStats.map(metric => {
      const angle = angleScale(metric.id) - Math.PI / 2;
      const scale = radiusScales[metric.id];
      
      if (!scale) return null;
      
      // Get all region values for this metric
      const regionPoints = regions
        .map(region => {
          const value = metric.regionValues[region];
          if (isNaN(value)) return null;
          
          const r = scale(value);
          return {
            region,
            value,
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r
          };
        })
        .filter(p => p !== null)
        .sort((a, b) => a.value - b.value); // Sort least to greatest
      
      return {
        metricId: metric.id,
        points: regionPoints
      };
    }).filter(d => d && d.points.length > 1);
  
    const rankLines = linesGroup.selectAll(".rank-line")
      .data(linesData, d => d.metricId);
  
    rankLines.enter()
      .append("path")
      .attr("class", "rank-line")
      .merge(rankLines)
      .attr("d", d => {
        const lineGenerator = d3.line()
          .x(p => p.x)
          .y(p => p.y);
        return lineGenerator(d.points);
      });
  
    rankLines.exit().remove();
  
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
        const scale = radiusScales[metric.id];
  
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
          .attr("cx", d => {
            if (!scale || isNaN(d.value)) return 0;
            return Math.cos(angle) * scale(d.value);
          })
          .attr("cy", d => {
            if (!scale || isNaN(d.value)) return 0;
            return Math.sin(angle) * scale(d.value);
          })
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
  