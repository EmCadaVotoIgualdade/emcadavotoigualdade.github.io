---
layout: default
title: Próximos Passos
description: O roteiro de desenvolvimento técnico e simulações científicas para o futuro do projecto Em Cada Voto Igualdade.
nav_section: proximos-passos
nav_level: 1
nav_order: 50
nav_label: Próximos Passos
nav_mobile_label: Próximos Passos & Simulações
nav_footer_label: Próximos Passos & Simulações
---

# Próximos Passos & Desenvolvimento

O objectivo é manter este espaço em constante evolução técnica, servindo como um laboratório aberto para a engenharia eleitoral em Portugal. Abaixo encontras as funcionalidades já disponíveis e as simulações e ferramentas visuais que estamos a planear e a desenvolver activamente.

---

### 1. Laboratório de Simulação Eleitoral

Queremos testar a robustez e a estabilidade dos diferentes métodos europeus de distribuição de mandatos quando aplicados à realidade portuguesa (usando as eleições de 2019, 2022, 2024 e 2025 como ponto de partida). 

Iremos simular milhares de variantes realistas (ex: cada partido pode variar até +-10% a nível nacional, e +-2% adicionais em cada distrito) para testar os seguintes modelos de alocação:
* **Modelo Nórdico (Dinamarca, Suécia e Noruega):** Ajuste baseado em mandatos de compensação nacionais atribuídos directamente a listas locais.
* **Modelo Suíço (Biproporcionalidade de Zurique / Método Pukelsheim):** Um algoritmo de dupla proporcionalidade que resolve em simultâneo a proporcionalidade partidária global e a representação territorial.
* **A Nossa Proposta:** O modelo simplificado de distribuição de mandatos nacionais em círculos locais.

O objectivo desta análise de sensibilidade é medir o alinhamento efectivo entre a percentagem de votos e a percentagem de mandatos de cada partido em cada cenário, bem como a representação geográfica de cada partido e outros indicadores.

---

### 2. Painel Dinâmico de Votos Desperdiçados

Na página **[Mapa e gráficos]({{ '/mapa.html' | relative_url }})**, já estão disponíveis visualizações da percentagem de votos "desperdiçados" (votos que não contribuíram para o partido eleger deputados):
* Comparação interactiva entre o sistema actual, considerando a representação no círculo, e o sistema proposto, considerando a representação nacional.
* Gráfico histórico do desperdício de voto por círculo eleitoral nas eleições de 2015, 2019, 2022, 2024 e 2025.

Como desenvolvimentos futuros, pretendemos alargar a comparação a outros sistemas eleitorais e integrar resultados de simulações e cenários alternativos, além de outros indicadores e ferramentas de exploração.

---

### 3. Mapa de Representação Territorial Interactiva

O mapa geográfico interactivo de Portugal já está disponível na página **[Mapa e gráficos]({{ '/mapa.html' | relative_url }})** e permite:
* Comparar o sistema actual e o sistema proposto nos 18 distritos continentais, Açores e Madeira.
* Visualizar os votos desperdiçados e o número de listas representadas em cada círculo, com selecção pelo mapa ou pela lista de círculos.
* Consultar a evolução histórica destes indicadores ao longo de várias eleições.

Como possíveis desenvolvimentos futuros, queremos acrescentar:
* Visualização pormenorizada dos mandatos de cada partido em cada círculo.
* Identificação das alterações de representação partido a partido, incluindo os resultados de cenários simulados e a evolução da pluralidade nos círculos mais pequenos.
