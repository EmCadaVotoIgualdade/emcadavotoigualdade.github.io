---
layout: default
content_width: 90rem
title: Mapa eleitoral experimental
description: Mapa experimental dos círculos eleitorais portugueses, com dados eleitorais e comparação entre o sistema atual e a proposta.
permalink: /mapa-teste.html
sitemap: false
preview_noindex: true
custom_scripts:
  - mapa-teste
---

# Mapa eleitoral experimental

<link rel="stylesheet" href="{{ '/assets/css/mapa-teste.css' | relative_url }}">

<section id="mapa-teste" class="not-prose" aria-label="Explorar o mapa eleitoral experimental" data-map-url="{{ '/assets/images/mapa-teste.svg' | relative_url }}" data-metrics-url="{{ '/assets/data/mapa-teste-metricas.json' | relative_url }}">
  <div class="mapa-teste-controls">
    <fieldset data-control="year" disabled>
      <legend>Ano da eleição</legend>
      <div class="mapa-teste-buttons" data-buttons="year"></div>
    </fieldset>
    <fieldset data-control="model" disabled>
      <legend>Sistema eleitoral</legend>
      <div class="mapa-teste-buttons" data-buttons="model"></div>
    </fieldset>
    <fieldset class="mapa-teste-indicators" data-control="metric" disabled>
      <legend>Indicador eleitoral</legend>
      <div class="mapa-teste-buttons" data-buttons="metric"></div>
    </fieldset>
  </div>
  <p class="mapa-teste-status" data-status role="status">A carregar o mapa e os dados eleitorais…</p>
  <noscript><p>Active o JavaScript para explorar o mapa. Pode consultar o <a href="{{ '/assets/images/mapa-teste.svg' | relative_url }}">mapa geográfico</a> e os <a href="{{ '/assets/data/mapa-teste-metricas.json' | relative_url }}">dados eleitorais em JSON</a>.</p></noscript>
  <div class="mapa-teste-content" data-content hidden>
    <div class="mapa-teste-visual">
      <button type="button" class="mapa-teste-option mapa-teste-size-toggle" data-map-size aria-pressed="false" aria-controls="mapa-teste-map" hidden disabled>Tornar maior</button>
      <aside class="mapa-teste-legend" aria-label="Legenda das cores">
        <h2 data-legend-title></h2>
        <ul data-legend></ul>
      </aside>
      <div id="mapa-teste-map" class="mapa-teste-map" data-map></div>
      <p class="mapa-teste-hover" data-hover hidden aria-live="off"></p>
    </div>
    <section id="mapa-teste-history" class="mapa-teste-history" aria-labelledby="mapa-teste-history-title">
      <div class="mapa-teste-history-heading">
        <h2 id="mapa-teste-history-title" data-history-title></h2>
        <p role="status" aria-atomic="true"><strong data-history-region></strong></p>
      </div>
      <ul class="mapa-teste-history-legend" data-history-legend aria-label="Sistemas eleitorais"></ul>
      <div class="mapa-teste-history-chart" data-history-chart></div>
      <p class="mapa-teste-history-info" data-history-info role="status" aria-atomic="true" hidden></p>
      <label class="mapa-teste-region-control" for="mapa-teste-region">Círculo eleitoral
        <select id="mapa-teste-region" disabled><option>A carregar…</option></select>
      </label>
    </section>
  </div>
  <dl class="mapa-teste-explanations">
    <div><dt>Votos desperdiçados</dt><dd>Percentagem de votos que não contribuíram para o partido eleger deputados. No sistema atual, refere-se a partidos sem deputados eleitos no círculo; na proposta, a partidos sem deputados eleitos a nível nacional.</dd></div>
  </dl>
  <p class="mapa-teste-source"><span data-source></span> <a href="{{ '/assets/data/mapa-teste-metricas.json' | relative_url }}">Fonte e hipóteses dos dados</a>.</p>
  <p class="mapa-teste-attribution">Geografia: <a href="https://www.dgterritorio.gov.pt/atividades/cartografia/cartografia-tematica/caop">Direção-Geral do Território — CAOP2025</a>, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. Limites reprojetados, agregados e simplificados para este mapa.</p>
</section>
