/* Local SVG geometry, JSON values and ordinary JavaScript; no runtime GIS. */
(function () {
  "use strict";
  const root = document.getElementById("mapa-teste");
  if (!root) return;
  const regionSelect = root.querySelector("#mapa-teste-region");
  const mapContainer = root.querySelector("[data-map]");
  const status = root.querySelector("[data-status]");
  const preview = root.querySelector("[data-hover]");
  const percentFormatter = new Intl.NumberFormat("pt-PT", {
    style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1
  });
  const integerFormatter = new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 0 });
  const exactFormatter = new Intl.NumberFormat("pt-PT", { maximumSignificantDigits: 21 });
  const palettes = {
    red: ["#fee5d9", "#fcbba1", "#fc9272", "#ef6548", "#cb181d", "#99000d"],
    amber: ["#fff0b3", "#ffdc73", "#f9bc38", "#e69a17", "#bd710a", "#874700"],
    teal: ["#e2f5ec", "#b7e1d4", "#7bc3b1", "#3b9f90", "#14796f", "#08584f"]
  };
  const missingColor = "#cbd5e1";

  async function fetchAsset(url, format) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Falha ao carregar " + url + ": HTTP " + response.status);
    if (format === "json") return response.json();
    return response.text();
  }

  function validValue(value, metric) {
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return false;
    if (metric.unit === "percent") return value <= 100;
    return Number.isSafeInteger(value);
  }

  function buildScale(values, metric, metricId) {
    const scale = { minimum: null, maximum: null, classes: [], step: 1 };
    if (values.length === 0) return scale;
    let minimum = values[0];
    let maximum = values[0];
    for (let valueIndex = 1; valueIndex < values.length; valueIndex++) {
      minimum = Math.min(minimum, values[valueIndex]);
      maximum = Math.max(maximum, values[valueIndex]);
    }
    const palette = palettes[metric.palette];
    if (metricId === "represented_parties_count") {
      scale.minimum = minimum;
      scale.maximum = maximum;
      const classCount = maximum - minimum + 1;
      // One class per integer, with shades interpolated across the teal palette.
      for (let classIndex = 0; classIndex < classCount; classIndex++) {
        let color;
        if (classCount === 1) {
          color = palette[2];
        } else {
          const palettePosition = classIndex * (palette.length - 1) / (classCount - 1);
          const paletteIndex = Math.floor(palettePosition);
          const fraction = palettePosition - paletteIndex;
          const startColor = palette[paletteIndex];
          const endColor = palette[Math.min(paletteIndex + 1, palette.length - 1)];
          color = "#";
          for (let channelOffset = 1; channelOffset < 7; channelOffset += 2) {
            const startChannel = parseInt(startColor.slice(channelOffset, channelOffset + 2), 16);
            const endChannel = parseInt(endColor.slice(channelOffset, channelOffset + 2), 16);
            const channel = Math.round(startChannel + (endChannel - startChannel) * fraction);
            color += channel.toString(16).padStart(2, "0");
          }
        }
        const count = minimum + classIndex;
        scale.classes.push({ lower: count, upper: count, color: color, label: integerFormatter.format(count) });
      }
      return scale;
    }
    const isCount = metric.unit === "count";
    let lower = Math.floor(minimum);
    let upper = Math.ceil(maximum);
    let chosenStep = 1;
    let classCount = 1;
    if (minimum !== maximum) {
      let bestScore = Infinity;
      const naturalSteps = [1, 2, 5];
      // Integer steps only; consider natural multiples covering the complete range.
      for (let magnitude = 1; magnitude <= Math.max(100, maximum * 10); magnitude *= 10) {
        for (let stepIndex = 0; stepIndex < naturalSteps.length; stepIndex++) {
          const step = magnitude * naturalSteps[stepIndex];
          let candidateLower;
          let candidateUpper;
          let candidateCount;
          if (isCount) {
            candidateLower = minimum;
            candidateCount = Math.ceil((maximum - minimum + 1) / step);
            candidateUpper = candidateLower + candidateCount * step - 1;
          } else {
            candidateLower = Math.floor(minimum / step) * step;
            candidateUpper = Math.ceil(maximum / step) * step;
            candidateCount = Math.round((candidateUpper - candidateLower) / step);
          }
          if (candidateCount < 1 || candidateCount > palette.length) continue;
          const occupancy = new Array(candidateCount).fill(0);
          for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            const bin = Math.min(candidateCount - 1, Math.floor((values[valueIndex] - candidateLower) / step));
            occupancy[bin]++;
          }
          let emptyClasses = 0;
          for (let binIndex = 0; binIndex < occupancy.length; binIndex++) {
            if (occupancy[binIndex] === 0) emptyClasses++;
          }
          const padding = (minimum - candidateLower + candidateUpper - maximum) / Math.max(1, maximum - minimum);
          let score = Math.abs(candidateCount - 5) + emptyClasses * 3 + padding;
          if (candidateCount < 3) score += 3;
          if (score < bestScore) {
            bestScore = score;
            chosenStep = step;
            lower = candidateLower;
            upper = candidateUpper;
            classCount = candidateCount;
          }
        }
      }
    }
    scale.minimum = lower;
    scale.maximum = upper;
    scale.step = chosenStep;
    for (let classIndex = 0; classIndex < classCount; classIndex++) {
      let paletteIndex = Math.round(classIndex * (palette.length - 1) / Math.max(1, classCount - 1));
      if (classCount === 1) paletteIndex = 2;
      const classLower = lower + classIndex * chosenStep;
      let classUpper = classLower + chosenStep;
      if (isCount) classUpper--;
      if (classCount === 1) classUpper = upper;
      let label;
      if (classLower === classUpper) label = integerFormatter.format(classLower);
      else label = integerFormatter.format(classLower) + "-" + integerFormatter.format(classUpper);
      scale.classes.push({ lower: classLower, upper: classUpper, color: palette[paletteIndex], label: label });
    }
    return scale;
  }

  function svgElement(name, attributes, text) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", name);
    const names = Object.keys(attributes);
    for (let index = 0; index < names.length; index++) {
      element.setAttribute(names[index], String(attributes[names[index]]));
    }
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function buildHistoryScale(values, metric) {
    if (values.length === 0) return null;
    let minimum = values[0];
    let maximum = values[0];
    for (let index = 1; index < values.length; index++) {
      minimum = Math.min(minimum, values[index]);
      maximum = Math.max(maximum, values[index]);
    }
    const span = maximum - minimum;
    let padding;
    if (metric.unit === "count") {
      if (span === 0) padding = 2;
      else padding = Math.max(.5, span * .1);
    } else {
      if (span === 0) padding = Math.max(1, minimum * .05);
      else padding = Math.max(.1, span * .1);
    }
    const paddedMinimum = Math.max(0, minimum - padding);
    let paddedMaximum = maximum + padding;
    if (metric.unit === "percent") paddedMaximum = Math.min(100, paddedMaximum);
    const targetStep = (paddedMaximum - paddedMinimum) / 4;
    const magnitude = Math.pow(10, Math.floor(Math.log10(targetStep)));
    const fraction = targetStep / magnitude;
    let step;
    if (fraction <= 1) step = magnitude;
    else if (fraction <= 2) step = 2 * magnitude;
    else if (fraction <= 2.5) step = 2.5 * magnitude;
    else if (fraction <= 5) step = 5 * magnitude;
    else step = 10 * magnitude;
    if (metric.unit === "count") step = Math.max(1, Math.ceil(step));
    const lower = Number((Math.floor(paddedMinimum / step) * step).toPrecision(12));
    let upper = Number((Math.ceil(paddedMaximum / step) * step).toPrecision(12));
    if (metric.unit === "percent") upper = Math.min(100, upper);
    const ticks = [];
    const intervals = Math.round((upper - lower) / step);
    for (let index = 0; index <= intervals; index++) {
      ticks.push(Number((lower + index * step).toPrecision(12)));
    }
    return { minimum: lower, maximum: upper, ticks: ticks };
  }

  function initialise(data, svgText) {
    const svgDocument = new DOMParser().parseFromString(svgText, "image/svg+xml");
    const svg = svgDocument.documentElement;
    if (svg.localName !== "svg" || svgDocument.querySelector("parsererror")) throw new Error("O ficheiro do mapa não é um SVG válido.");
    const regionIds = Object.keys(data.regions || {});
    const modelIds = Object.keys(data.models || {});
    const metricIds = Object.keys(data.metrics || {});
    const years = data.years || [];
    const shapes = svg.querySelectorAll("[data-region]");
    const seenIds = new Set();
    for (let shapeIndex = 0; shapeIndex < shapes.length; shapeIndex++) seenIds.add(shapes[shapeIndex].dataset.region);
    if (data.schema_version !== 2 || typeof data.demo !== "boolean" ||
        regionIds.length !== 20 || shapes.length !== 20 || seenIds.size !== 20 ||
        modelIds.length !== 2 || !data.models.current || !data.models.proposal ||
        !Array.isArray(years) || years.length === 0 || new Set(years).size !== years.length || metricIds.length === 0) {
      throw new Error("Os identificadores ou o formato dos dados não correspondem ao mapa.");
    }
    for (let regionIndex = 0; regionIndex < regionIds.length; regionIndex++) {
      if (!seenIds.has(regionIds[regionIndex])) throw new Error("Um círculo não corresponde à geometria.");
    }

    // Cache each scale once, including every model, year and region in the JSON.
    const scales = {};
    for (let metricIndex = 0; metricIndex < metricIds.length; metricIndex++) {
      const metricId = metricIds[metricIndex];
      const metric = data.metrics[metricId];
      if ((metric.unit !== "percent" && metric.unit !== "count") || !Object.hasOwn(palettes, metric.palette)) throw new Error("A unidade ou a paleta de um indicador é inválida.");
      const values = [];
      for (let modelIndex = 0; modelIndex < modelIds.length; modelIndex++) {
        for (let yearIndex = 0; yearIndex < years.length; yearIndex++) {
          for (let regionIndex = 0; regionIndex < regionIds.length; regionIndex++) {
            const value = data.values?.[modelIds[modelIndex]]?.[years[yearIndex]]?.[regionIds[regionIndex]]?.[metricId];
            if (validValue(value, metric)) values.push(value);
          }
        }
      }
      scales[metricId] = buildScale(values, metric, metricId);
    }

    // Keep all panels inside one responsive SVG so every viewport shares the
    // same geographic scale. Static transforms only reposition island outlines.
    const parts = svg.querySelectorAll("svg[data-map-part]");
    if (parts.length !== 3) throw new Error("Os enquadramentos do mapa são inválidos.");
    mapContainer.replaceChildren(document.importNode(svg, true));
    const regionShapes = mapContainer.querySelectorAll("[data-region]");
    const selection = {
      model: "current", year: "2025", metric: "wasted_votes_pct",
      region: regionIds[Math.floor(Math.random() * regionIds.length)]
    };
    if (!years.includes(selection.year)) selection.year = String(years[years.length - 1]);
    if (!Object.hasOwn(data.metrics, selection.metric)) selection.metric = metricIds[0];
    let demonstration = "Valor eleitoral";
    if (data.demo) demonstration = "Valor fictício de demonstração";
    root.querySelector(".mapa-teste-warning").hidden = !data.demo;
    const historyContainer = root.querySelector("[data-history-chart]");
    const historyInfo = root.querySelector("[data-history-info]");
    const historyStyles = {
      current: { color: "#1e293b", dash: "" },
      proposal: { color: "#0f766e", dash: "6 4" }
    };
    let historyView = null;
    let selectedHistoryPoint = null;

    function historyValue(modelId, year) {
      const value = data.values?.[modelId]?.[year]?.[selection.region]?.[selection.metric];
      if (validValue(value, data.metrics[selection.metric])) return value;
      return null;
    }

    function formatHistoryValue(value) {
      if (value === null) return "Dados indisponíveis";
      if (data.metrics[selection.metric].unit === "percent") return exactFormatter.format(value) + "\u00a0%";
      return integerFormatter.format(value);
    }

    function historyPointLabel(point) {
      return point.year + " · " + data.models[point.model].label + " · " + data.regions[selection.region].name + ": " + formatHistoryValue(historyValue(point.model, point.year));
    }

    function showHistoryPoint(point, persist) {
      if (persist) {
        selectedHistoryPoint = point;
        const markers = historyContainer.querySelectorAll("[data-history-model]");
        for (let index = 0; index < markers.length; index++) {
          const marker = markers[index];
          marker.setAttribute("aria-pressed", String(marker.dataset.historyModel === point.model && marker.dataset.historyYear === String(point.year)));
        }
      }
      historyInfo.textContent = historyPointLabel(point);
      historyInfo.hidden = false;
    }

    function restoreHistoryInfo() {
      if (selectedHistoryPoint !== null) {
        historyInfo.textContent = historyPointLabel(selectedHistoryPoint);
        historyInfo.hidden = false;
      } else {
        historyInfo.textContent = "";
        historyInfo.hidden = true;
      }
    }

    function nearestHistoryMarker(event) {
      if (event.type === "click" && event.detail === 0) return event.currentTarget;
      const markers = historyContainer.querySelectorAll("[data-history-model]");
      let nearest = event.currentTarget;
      let distance = Infinity;
      for (let index = 0; index < markers.length; index++) {
        const marker = markers[index];
        const bounds = marker.getBoundingClientRect();
        const dx = event.clientX - (bounds.left + bounds.right) / 2;
        const dy = event.clientY - (bounds.top + bounds.bottom) / 2;
        const candidateDistance = dx * dx + dy * dy;
        if (candidateDistance < distance || (candidateDistance === distance && marker.dataset.historyModel === selection.model)) {
          distance = candidateDistance;
          nearest = marker;
        }
      }
      return nearest;
    }

    function historyMarker(modelId, year, x, y) {
      const point = { model: modelId, year: year };
      const marker = svgElement("g", {
        class: "mapa-teste-history-point", transform: "translate(" + x + " " + y + ")",
        role: "button", tabindex: "0", "aria-label": historyPointLabel(point),
        "aria-pressed": "false", "data-history-model": modelId, "data-history-year": year
      });
      marker.append(svgElement("circle", { r: 12, class: "mapa-teste-history-hit" }));
      marker.append(svgElement("circle", { r: 8, class: "mapa-teste-history-focus" }));
      let radius = 4.5;
      if (modelId === "proposal") radius = 3.5;
      marker.append(svgElement("circle", { r: radius, class: "mapa-teste-history-dot" }));
      marker.addEventListener("pointermove", function (event) {
        if (event.pointerType !== "touch") {
          const nearest = nearestHistoryMarker(event);
          showHistoryPoint({ model: nearest.dataset.historyModel, year: nearest.dataset.historyYear }, false);
        }
      });
      marker.addEventListener("pointerleave", function () {
        if (document.activeElement !== marker) restoreHistoryInfo();
      });
      marker.addEventListener("focus", function () { showHistoryPoint(point, false); });
      marker.addEventListener("blur", restoreHistoryInfo);
      marker.addEventListener("click", function (event) {
        const nearest = nearestHistoryMarker(event);
        nearest.focus({ preventScroll: true });
        showHistoryPoint({ model: nearest.dataset.historyModel, year: nearest.dataset.historyYear }, true);
      });
      marker.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          showHistoryPoint(point, true);
        }
      });
      return marker;
    }

    function historyX(index, plot) {
      if (years.length === 1) return plot.left + plot.width / 2;
      return plot.left + index * plot.width / (years.length - 1);
    }

    function historyY(value, scale, plot) {
      return plot.bottom - (value - scale.minimum) * (plot.bottom - plot.top) / (scale.maximum - scale.minimum);
    }

    function drawHistoryAxes(chart, scale, plot, labelRows) {
      if (scale !== null) {
        for (let index = 0; index < scale.ticks.length; index++) {
          const tick = scale.ticks[index];
          const y = historyY(tick, scale, plot);
          chart.append(svgElement("line", { x1: plot.left, x2: plot.left + plot.width, y1: y, y2: y, class: "mapa-teste-history-grid" }));
          let label = exactFormatter.format(tick);
          if (data.metrics[selection.metric].unit === "percent") label += "%";
          chart.append(svgElement("text", { x: plot.left - 8, y: y, "text-anchor": "end", "dominant-baseline": "middle", class: "mapa-teste-history-axis" }, label));
        }
      }
      for (let index = 0; index < years.length; index++) {
        chart.append(svgElement("text", { x: historyX(index, plot), y: plot.bottom + 20 + (index % labelRows) * 15, "text-anchor": "middle", class: "mapa-teste-history-year" }, String(years[index])));
      }
    }

    function drawHistorySeries(chart, scale, plot) {
      for (let modelIndex = 0; modelIndex < modelIds.length; modelIndex++) {
        const modelId = modelIds[modelIndex];
        const style = historyStyles[modelId];
        const group = svgElement("g", { "data-history-series": modelId, stroke: style.color, "stroke-dasharray": style.dash });
        const markers = svgElement("g", { "stroke-dasharray": "none" });
        let path = "";
        let connected = false;
        for (let yearIndex = 0; yearIndex < years.length; yearIndex++) {
          const value = historyValue(modelId, years[yearIndex]);
          if (value === null || scale === null) {
            connected = false;
          } else {
            const x = historyX(yearIndex, plot);
            const y = historyY(value, scale, plot);
            if (connected) path += " L " + x + " " + y;
            else path += " M " + x + " " + y;
            connected = true;
            markers.append(historyMarker(modelId, years[yearIndex], x, y));
          }
        }
        group.append(svgElement("path", { d: path, class: "mapa-teste-history-line" }), markers);
        chart.append(group);
      }
    }

    function updateHistoryEmphasis() {
      const series = historyContainer.querySelectorAll("[data-history-series]");
      for (let index = 0; index < series.length; index++) {
        series[index].dataset.selected = String(series[index].dataset.historySeries === selection.model);
      }
    }

    function updateHistoryChart() {
      const width = Math.floor(historyContainer.getBoundingClientRect().width);
      if (width === 0) return;
      if (historyView !== null && historyView.region === selection.region && historyView.metric === selection.metric && historyView.width === width) {
        updateHistoryEmphasis();
        return;
      }
      const focused = document.activeElement;
      let focusPoint = null;
      if (historyView !== null && historyView.region === selection.region && historyView.metric === selection.metric) {
        if (historyContainer.contains(focused) && focused.dataset.historyModel) {
          focusPoint = { model: focused.dataset.historyModel, year: focused.dataset.historyYear };
        }
      } else {
        selectedHistoryPoint = null;
      }
      historyView = { region: selection.region, metric: selection.metric, width: width };
      const metric = data.metrics[selection.metric];
      const heading = "Evolução de " + metric.label.charAt(0).toLowerCase() + metric.label.slice(1);
      root.querySelector("[data-history-title]").textContent = heading;
      root.querySelector("[data-history-region]").textContent = data.regions[selection.region].name;
      if (data.demo) root.querySelector("[data-history-note]").textContent = " · Dados fictícios";
      else root.querySelector("[data-history-note]").textContent = "";
      const values = [];
      const legend = root.querySelector("[data-history-legend]");
      legend.replaceChildren();
      for (let modelIndex = 0; modelIndex < modelIds.length; modelIndex++) {
        const modelId = modelIds[modelIndex];
        const item = document.createElement("li");
        const swatch = document.createElement("span");
        swatch.className = "mapa-teste-history-key";
        swatch.style.borderColor = historyStyles[modelId].color;
        if (modelId === "proposal") swatch.style.borderTopStyle = "dashed";
        swatch.setAttribute("aria-hidden", "true");
        item.append(swatch, document.createTextNode(data.models[modelId].label));
        legend.append(item);
        for (let yearIndex = 0; yearIndex < years.length; yearIndex++) {
          const value = historyValue(modelId, years[yearIndex]);
          if (value !== null) values.push(value);
        }
      }
      const scale = buildHistoryScale(values, metric);
      const plot = { left: 44, width: Math.max(1, width - 62), top: 18, bottom: Math.round(Math.min(300, Math.max(204, width * .5))) };
      let labelRows = 1;
      if (years.length > 1) labelRows = Math.max(1, Math.ceil(34 / (plot.width / (years.length - 1))));
      const chart = svgElement("svg", { viewBox: "0 0 " + width + " " + (plot.bottom + 28 + (labelRows - 1) * 15), role: "group", "aria-labelledby": "mapa-teste-history-svg-title mapa-teste-history-svg-description" });
      chart.append(svgElement("title", { id: "mapa-teste-history-svg-title" }, heading + " · " + data.regions[selection.region].name));
      chart.append(svgElement("desc", { id: "mapa-teste-history-svg-description" }, "Comparação dos dois sistemas em todos os anos eleitorais, igualmente espaçados. Linha contínua: " + data.models.current.label + ". Linha tracejada: " + data.models.proposal.label + ". Cada ponto permite consultar o valor exato com rato, toque ou teclado. Valores em falta interrompem as linhas."));
      drawHistoryAxes(chart, scale, plot, labelRows);
      drawHistorySeries(chart, scale, plot);
      if (scale === null) chart.append(svgElement("text", { x: width / 2, y: 110, "text-anchor": "middle", class: "mapa-teste-history-axis" }, "Dados indisponíveis"));
      historyContainer.replaceChildren(chart);
      updateHistoryEmphasis();
      restoreHistoryInfo();
      const markers = historyContainer.querySelectorAll("[data-history-model]");
      for (let index = 0; index < markers.length; index++) {
        const marker = markers[index];
        if (selectedHistoryPoint !== null && marker.dataset.historyModel === selectedHistoryPoint.model && marker.dataset.historyYear === String(selectedHistoryPoint.year)) marker.setAttribute("aria-pressed", "true");
        if (focusPoint !== null && marker.dataset.historyModel === focusPoint.model && marker.dataset.historyYear === focusPoint.year) marker.focus({ preventScroll: true });
      }
    }

    function valueFor(regionId) {
      const value = data.values?.[selection.model]?.[selection.year]?.[regionId]?.[selection.metric];
      if (validValue(value, data.metrics[selection.metric])) return value;
      return null;
    }

    function formatValue(value) {
      if (value === null) return "Dados indisponíveis";
      if (data.metrics[selection.metric].unit === "percent") return percentFormatter.format(value / 100);
      return integerFormatter.format(value);
    }

    function colorFor(value) {
      const scale = scales[selection.metric];
      if (value === null || scale.classes.length === 0) return missingColor;
      const classIndex = Math.min(scale.classes.length - 1, Math.floor((value - scale.minimum) / scale.step));
      return scale.classes[classIndex].color;
    }

    function regionLabel(regionId) {
      let valueLabel = formatValue(valueFor(regionId));
      if (data.metrics[selection.metric].unit === "count" && valueFor(regionId) !== null) {
        if (valueFor(regionId) === 1) valueLabel += " partido";
        else valueLabel += " partidos";
      }
      return data.regions[regionId].name + ": " + valueLabel + " — " + demonstration + "; " + data.models[selection.model].label + ", " + selection.year + ", " + data.metrics[selection.metric].label;
    }

    function selectRegion(regionId) {
      selection.region = regionId;
      regionSelect.value = regionId;
      for (let shapeIndex = 0; shapeIndex < regionShapes.length; shapeIndex++) {
        const shape = regionShapes[shapeIndex];
        shape.setAttribute("aria-pressed", String(shape.dataset.region === regionId));
      }
      updateHistoryChart();
    }

    function updateLegend() {
      const scale = scales[selection.metric];
      root.querySelector("[data-legend-title]").textContent = data.metrics[selection.metric].label;
      const legend = root.querySelector("[data-legend]");
      legend.replaceChildren();
      for (let classIndex = 0; classIndex < scale.classes.length; classIndex++) {
        const entry = scale.classes[classIndex];
        const item = document.createElement("li");
        const swatch = document.createElement("span");
        swatch.className = "mapa-teste-swatch";
        swatch.style.backgroundColor = entry.color;
        swatch.setAttribute("aria-hidden", "true");
        item.dataset.lower = String(entry.lower);
        item.dataset.upper = String(entry.upper);
        item.append(swatch, document.createTextNode(entry.label));
        legend.append(item);
      }
      if (scale.classes.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Não existem valores válidos para este indicador.";
        legend.append(item);
      }
    }

    function showPreview(regionId) {
      preview.textContent = data.regions[regionId].name + ": " + formatValue(valueFor(regionId)) + " · " + demonstration;
      preview.hidden = false;
    }

    function render() {
      const buttons = root.querySelectorAll("button[data-dimension]");
      for (let buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
        const button = buttons[buttonIndex];
        button.setAttribute("aria-pressed", String(selection[button.dataset.dimension] === button.value));
      }
      for (let shapeIndex = 0; shapeIndex < regionShapes.length; shapeIndex++) {
        const shape = regionShapes[shapeIndex];
        const regionId = shape.dataset.region;
        shape.style.setProperty("--region-fill", colorFor(valueFor(regionId)));
        shape.setAttribute("aria-label", regionLabel(regionId));
        shape.querySelector("title").textContent = regionLabel(regionId);
      }
      preview.hidden = true;
      updateLegend();
      selectRegion(selection.region);
    }

    function addButton(dimension, id, label, definition) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mapa-teste-option";
      button.dataset.dimension = dimension;
      button.value = String(id);
      button.textContent = label;
      button.setAttribute("aria-pressed", "false");
      if (definition) button.title = definition;
      button.addEventListener("click", function () {
        selection[dimension] = button.value;
        render();
      });
      root.querySelector('[data-buttons="' + dimension + '"]').append(button);
    }
    for (let modelIndex = 0; modelIndex < modelIds.length; modelIndex++) {
      const modelId = modelIds[modelIndex];
      addButton("model", modelId, data.models[modelId].label);
    }
    for (let yearIndex = 0; yearIndex < years.length; yearIndex++) addButton("year", years[yearIndex], String(years[yearIndex]));
    for (let metricIndex = 0; metricIndex < metricIds.length; metricIndex++) {
      const metricId = metricIds[metricIndex];
      addButton("metric", metricId, data.metrics[metricId].label, data.metrics[metricId].definition);
    }
    regionSelect.replaceChildren();
    for (let regionIndex = 0; regionIndex < regionIds.length; regionIndex++) {
      const regionId = regionIds[regionIndex];
      regionSelect.append(new Option(data.regions[regionId].name, regionId));
    }
    for (let shapeIndex = 0; shapeIndex < regionShapes.length; shapeIndex++) {
      const shape = regionShapes[shapeIndex];
      const regionId = shape.dataset.region;
      shape.classList.add("mapa-teste-region");
      shape.setAttribute("role", "button");
      shape.setAttribute("tabindex", "0");
      shape.setAttribute("aria-controls", "mapa-teste-history");
      shape.addEventListener("click", function () { selectRegion(regionId); });
      shape.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectRegion(regionId);
        }
      });
      shape.addEventListener("pointerenter", function (event) {
        if (event.pointerType !== "touch") showPreview(regionId);
      });
      shape.addEventListener("pointerleave", function () { preview.hidden = true; });
      shape.addEventListener("focus", function () { showPreview(regionId); });
      shape.addEventListener("blur", function () { preview.hidden = true; });
    }
    regionSelect.addEventListener("change", function () {
      preview.hidden = true;
      selectRegion(regionSelect.value);
    });
    render();
    const controls = root.querySelectorAll("fieldset[data-control]");
    for (let controlIndex = 0; controlIndex < controls.length; controlIndex++) controls[controlIndex].disabled = false;
    regionSelect.disabled = false;
    root.querySelector("[data-content]").hidden = false;
    status.hidden = true;
    updateHistoryChart();
    if (typeof ResizeObserver === "function") {
      const historyResize = new ResizeObserver(updateHistoryChart);
      historyResize.observe(historyContainer);
    } else {
      window.addEventListener("resize", updateHistoryChart);
    }
  }

  Promise.all([
    fetchAsset(root.dataset.metricsUrl, "json"),
    fetchAsset(root.dataset.mapUrl, "text")
  ]).then(function (assets) {
    initialise(assets[0], assets[1]);
  }).catch(function (error) {
    console.error("Mapa experimental:", error);
    status.textContent = "Não foi possível carregar este protótipo. Recarregue a página para tentar novamente. Os valores dos dois sistemas são fictícios.";
  });
})();
