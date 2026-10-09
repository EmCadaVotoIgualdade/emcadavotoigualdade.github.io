---
layout: default
title: Mapa eleitoral experimental
description: Protótipo de um mapa dos círculos eleitorais portugueses, exclusivamente com dados fictícios de demonstração.
permalink: /mapa-teste.html
sitemap: false
preview_noindex: true
custom_scripts:
  - mapa-teste
---

# Mapa eleitoral experimental

<link rel="stylesheet" href="{{ '/assets/css/mapa-teste.css' | relative_url }}">

<section id="mapa-teste" class="not-prose" aria-label="Explorar o mapa eleitoral experimental" data-map-url="{{ '/assets/images/mapa-teste.svg' | relative_url }}" data-metrics-url="{{ '/assets/data/mapa-teste-metricas.json' | relative_url }}">
  <div class="mapa-teste-warning">
    <strong>PROTÓTIPO: DADOS FICTÍCIOS</strong>
    <p>Todos os valores são inventados para testar o mapa. Não representam resultados eleitorais nem estimativas.</p>
  </div>
  <p class="mapa-teste-intro">Explore os 18 distritos e as duas regiões autónomas. Compare anos com a mesma escala de cores para cada indicador.</p>
  <div class="mapa-teste-controls">
    <label for="mapa-teste-year">Ano da eleição
      <select id="mapa-teste-year" disabled><option>A carregar…</option></select>
    </label>
    <label for="mapa-teste-metric">Indicador eleitoral
      <select id="mapa-teste-metric" disabled><option>A carregar…</option></select>
    </label>
    <label for="mapa-teste-region">Círculo eleitoral
      <select id="mapa-teste-region" disabled><option>A carregar…</option></select>
    </label>
  </div>
  <p id="mapa-teste-help" class="mapa-teste-help">Clique ou toque num círculo para o seleccionar. Pode também usar a lista de círculos ou percorrer o mapa com Tab e seleccionar com Enter ou Espaço.</p>
  <p class="mapa-teste-status" data-status role="status">A carregar o mapa e os dados fictícios…</p>
  <noscript><p class="mapa-teste-warning">Active o JavaScript para explorar este protótipo. Pode consultar o <a href="{{ '/assets/images/mapa-teste.svg' | relative_url }}">mapa geográfico</a> e os <a href="{{ '/assets/data/mapa-teste-metricas.json' | relative_url }}">dados fictícios em JSON</a>.</p></noscript>
  <div class="mapa-teste-content" data-content hidden>
    <div id="mapa-teste-selection" class="mapa-teste-panel" role="status" aria-live="polite" aria-atomic="true">
      <div>
        <span class="mapa-teste-eyebrow">Círculo seleccionado</span>
        <h2 data-selected-name></h2>
        <p data-selected-context></p>
      </div>
      <div class="mapa-teste-result">
        <strong data-selected-value></strong>
        <span data-value-note>Valor fictício de demonstração</span>
      </div>
    </div>
    <figure class="mapa-teste-figure" aria-describedby="mapa-teste-help mapa-teste-caption">
      <div class="mapa-teste-map" data-map></div>
      <figcaption id="mapa-teste-caption">Os Açores e a Madeira são, cada um, um único círculo eleitoral. Os mapas das ilhas usam escalas diferentes da do continente e entre si; as Selvagens surgem num enquadramento separado. Não se incluem os círculos da emigração.</figcaption>
    </figure>
    <p class="mapa-teste-hover" data-hover aria-live="off">Passe o ponteiro sobre um círculo para consultar o seu valor fictício.</p>
    <div class="mapa-teste-legend" aria-label="Legenda das cores">
      <h2 data-legend-title></h2>
      <ul data-legend></ul>
      <p class="mapa-teste-help">Intervalos em percentagem; o limite inferior pertence ao intervalo. A escala mantém-se em todos os anos. <span class="mapa-teste-missing-key"></span> Sem dados disponíveis.</p>
    </div>
  </div>
  <p class="mapa-teste-attribution">Geografia: <a href="https://www.dgterritorio.gov.pt/atividades/cartografia/cartografia-tematica/caop">Direção-Geral do Território — CAOP2025</a>, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. Limites reprojetados, agregados e simplificados para este protótipo. Os valores eleitorais são inteiramente fictícios.</p>
</section>
