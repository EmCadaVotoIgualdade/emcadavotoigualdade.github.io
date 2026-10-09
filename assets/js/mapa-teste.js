/* The geometry and electoral values are separate, local static assets. */
(() => {
  "use strict";

  const root = document.getElementById("mapa-teste");
  if (!root) return;

  const yearSelect = root.querySelector("#mapa-teste-year");
  const metricSelect = root.querySelector("#mapa-teste-metric");
  const regionSelect = root.querySelector("#mapa-teste-region");
  const mapContainer = root.querySelector("[data-map]");
  const status = root.querySelector("[data-status]");
  const hover = root.querySelector("[data-hover]");
  const hoverHint = hover.textContent;
  const percent = new Intl.NumberFormat("pt-PT", {
    style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1
  });
  const number = new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 1 });
  const palette = ["#e2f5ec", "#b7e1d4", "#7bc3b1", "#3b9f90", "#14796f", "#08584f"];
  const missingColor = "#cbd5e1";

  async function fetchAsset(url, format) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Falha ao carregar ${url}: HTTP ${response.status}`);
    return format === "json" ? response.json() : response.text();
  }

  function options(select, entries) {
    select.replaceChildren(...entries.map(([value, label]) => new Option(label, value)));
  }

  function initialise(data, svgText) {
    const documentSvg = new DOMParser().parseFromString(svgText, "image/svg+xml");
    const svg = documentSvg.documentElement;
    if (svg.localName !== "svg" || documentSvg.querySelector("parsererror")) {
      throw new Error("O ficheiro do mapa não é um SVG válido.");
    }

    const regions = Object.entries(data.regions || {});
    const metrics = Object.entries(data.metrics || {});
    const years = data.years || [];
    const shapes = Array.from(svg.querySelectorAll("[data-region]"));
    const ids = shapes.map(shape => shape.dataset.region);
    if (data.schema_version !== 1 || typeof data.demo !== "boolean" ||
        regions.length !== 20 || ids.length !== 20 || new Set(ids).size !== 20 ||
        ids.some(id => !Object.hasOwn(data.regions, id)) ||
        !years.length || new Set(years).size !== years.length || !metrics.length) {
      throw new Error("Os identificadores ou o formato dos dados não correspondem ao mapa.");
    }
    metrics.forEach(([, metric]) => {
      const { domain, breaks } = metric;
      if (metric.unit !== "percent" || !Array.isArray(domain) || domain.length !== 2 ||
          !domain.every(Number.isFinite) || domain[0] < 0 || domain[1] > 100 || domain[0] >= domain[1] ||
          !Array.isArray(breaks) || breaks.length !== palette.length - 1 ||
          breaks.some((value, index) => !Number.isFinite(value) || value <= (index ? breaks[index - 1] : domain[0]) || value >= domain[1])) {
        throw new Error("A escala de uma métrica é inválida.");
      }
    });

    mapContainer.replaceChildren(document.importNode(svg, true));
    const regionShapes = Array.from(mapContainer.querySelectorAll("[data-region]"));
    options(yearSelect, years.map(year => [String(year), String(year)]));
    options(metricSelect, metrics.map(([id, metric]) => [id, metric.label]));
    options(regionSelect, regions.map(([id, region]) => [id, region.name]));
    yearSelect.value = String(years[years.length - 1]);
    let selected = Object.hasOwn(data.regions, "lisboa") ? "lisboa" : regions[0][0];
    const demonstration = data.demo ? "Valor fictício de demonstração" : "Valor eleitoral";
    const valueNote = root.querySelector("[data-value-note]");
    const warning = root.querySelector(".mapa-teste-warning");
    warning.hidden = !data.demo;

    function valueFor(id) {
      const value = data.values?.[yearSelect.value]?.[id]?.[metricSelect.value];
      return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100 ? value : null;
    }

    function format(value) {
      return value === null ? "Sem dados disponíveis" : percent.format(value / 100);
    }

    function color(value) {
      if (value === null) return missingColor;
      // Fixed breaks belong to the metric, never to the selected year's distribution.
      return palette[data.metrics[metricSelect.value].breaks.filter(boundary => value >= boundary).length];
    }

    function regionLabel(id) {
      return `${data.regions[id].name}: ${format(valueFor(id))} — ${demonstration}; ${data.metrics[metricSelect.value].label}, ${yearSelect.value}`;
    }

    function updatePanel() {
      root.querySelector("[data-selected-name]").textContent = data.regions[selected].name;
      root.querySelector("[data-selected-context]").textContent = `${data.metrics[metricSelect.value].label} · ${yearSelect.value}`;
      root.querySelector("[data-selected-value]").textContent = format(valueFor(selected));
      valueNote.textContent = valueFor(selected) === null ? "Não existe um valor para este círculo, ano e indicador." : demonstration;
    }

    function selectRegion(id) {
      selected = id;
      regionSelect.value = id;
      regionShapes.forEach(shape => shape.setAttribute("aria-pressed", String(shape.dataset.region === id)));
      updatePanel();
    }

    function updateLegend() {
      const metric = data.metrics[metricSelect.value];
      root.querySelector("[data-legend-title]").textContent = `${metric.label}${data.demo ? " — dados fictícios" : ""}`;
      const boundaries = [metric.domain[0], ...metric.breaks, metric.domain[1]];
      const entries = palette.map((colorValue, index) => {
        const item = document.createElement("li");
        const swatch = document.createElement("span");
        swatch.className = "mapa-teste-swatch";
        swatch.style.backgroundColor = colorValue;
        swatch.setAttribute("aria-hidden", "true");
        // Open-ended end bins also explain any later values outside the suggested domain.
        let label = `${number.format(boundaries[index])}–<${number.format(boundaries[index + 1])} %`;
        if (index === 0) label = `<${number.format(boundaries[1])} %`;
        if (index === palette.length - 1) label = `≥${number.format(boundaries[index])} %`;
        item.append(swatch, document.createTextNode(label));
        return item;
      });
      root.querySelector("[data-legend]").replaceChildren(...entries);
    }

    function render() {
      regionShapes.forEach(shape => {
        const id = shape.dataset.region;
        shape.style.setProperty("--region-fill", color(valueFor(id)));
        shape.setAttribute("aria-label", regionLabel(id));
        shape.querySelector("title").textContent = regionLabel(id);
      });
      hover.textContent = hoverHint;
      updateLegend();
      selectRegion(selected);
    }

    regionShapes.forEach(shape => {
      const id = shape.dataset.region;
      shape.classList.add("mapa-teste-region");
      shape.setAttribute("role", "button");
      shape.setAttribute("tabindex", "0");
      shape.setAttribute("aria-controls", "mapa-teste-selection");
      shape.addEventListener("click", () => selectRegion(id));
      shape.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectRegion(id);
        }
      });
      shape.addEventListener("pointerenter", event => {
        if (event.pointerType !== "touch") hover.textContent = regionLabel(id);
      });
      shape.addEventListener("pointerleave", () => { hover.textContent = hoverHint; });
      shape.addEventListener("focus", () => { hover.textContent = regionLabel(id); });
      shape.addEventListener("blur", () => { hover.textContent = hoverHint; });
    });

    yearSelect.addEventListener("change", render);
    metricSelect.addEventListener("change", render);
    regionSelect.addEventListener("change", () => selectRegion(regionSelect.value));
    render();
    [yearSelect, metricSelect, regionSelect].forEach(select => { select.disabled = false; });
    root.querySelector("[data-content]").hidden = false;
    status.hidden = true;
  }

  Promise.all([
    fetchAsset(root.dataset.metricsUrl, "json"),
    fetchAsset(root.dataset.mapUrl, "text")
  ]).then(([data, svg]) => initialise(data, svg)).catch(error => {
    console.error("Mapa experimental:", error);
    status.textContent = "Não foi possível carregar este protótipo. Recarregue a página para tentar novamente. Os valores deste mapa são fictícios.";
  });
})();
