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
    <p>Valores inventados para os dois sistemas e todos os anos. Não representam resultados eleitorais nem garantias da proposta.</p>
  </div>
  <div class="mapa-teste-controls">
    <fieldset data-control="model" disabled>
      <legend>Sistema eleitoral</legend>
      <div class="mapa-teste-buttons" data-buttons="model"></div>
    </fieldset>
    <fieldset data-control="year" disabled>
      <legend>Ano da eleição</legend>
      <div class="mapa-teste-buttons" data-buttons="year"></div>
    </fieldset>
    <fieldset class="mapa-teste-indicators" data-control="metric" disabled>
      <legend>Indicador eleitoral</legend>
      <div class="mapa-teste-buttons" data-buttons="metric"></div>
    </fieldset>
  </div>
  <label class="mapa-teste-region-control" for="mapa-teste-region">Círculo eleitoral
    <select id="mapa-teste-region" disabled><option>A carregar…</option></select>
  </label>
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
    <div class="mapa-teste-visual">
      <aside class="mapa-teste-legend" aria-label="Legenda das cores">
        <h2 data-legend-title></h2>
        <ul data-legend></ul>
      </aside>
      <div class="mapa-teste-map" data-map></div>
      <p class="mapa-teste-hover" data-hover hidden aria-live="off"></p>
    </div>
  </div>
  <p class="mapa-teste-attribution">Geografia: <a href="https://www.dgterritorio.gov.pt/atividades/cartografia/cartografia-tematica/caop">Direção-Geral do Território — CAOP2025</a>, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. Limites reprojetados, agregados e simplificados para este protótipo. Os valores eleitorais são inteiramente fictícios.</p>
</section>
