---
layout: default
title: Próximos Passos
description: O roteiro de desenvolvimento técnico e simulações científicas para o futuro do projecto Em Cada Voto Igualdade.
---

# Próximos Passos & Desenvolvimento

O nosso objectivo é manter este espaço em constante evolução técnica, servindo como um laboratório aberto para a engenharia eleitoral em Portugal. Abaixo encontras as funcionalidades, simulações e ferramentas visuais que estamos a planear e a desenvolver activamente.

---

### 1. Laboratório de Simulação Eleitoral

Queremos testar a robustez e a estabilidade dos diferentes métodos europeus de distribuição de mandatos quando aplicados à realidade portuguesa (usando as eleições de 2019, 2022, 2024 e 2025 como ponto de partida). 

Iremos simular milhares de variantes realistas (ex: um partido cresce 10% num círculo e desce 15% noutro) para testar os seguintes modelos de alocação:
* **Modelo Nórdico (Dinamarca, Suécia e Noruega):** Ajuste baseado em mandatos de compensação nacionais atribuídos directamente a listas locais.
* **Modelo Suíço (Biproporcionalidade de Zurique / Método Pukelsheim):** Um algoritmo de dupla proporcionalidade que resolve em simultâneo a proporcionalidade partidária global e a representação mínima territorial.
* **A Nossa Proposta:** O modelo simplificado de distribuição nacional em círculos actuais.

O objectivo desta análise de sensibilidade é medir o alinhamento efectivo entre a percentagem de votos e a percentagem de mandatos de cada partido em cada cenário.

---

### 2. Painel Dinâmico de Votos Desperdiçados

Desenvolvimento de gráficos dinâmicos para mapear a percentagem de votos "desperdiçados" (votos que não contribuíram para eleger qualquer deputado) ao nível local e nacional:
* Comparação interactiva entre o sistema real e cada uma das variantes de simulação.
* Histórico visual do desperdício de voto por círculo eleitoral ao longo das últimas eleições.

---

### 3. Mapa de Representação Territorial Interactiva

Construção de um mapa interactivo de Portugal que permita visualizar, partido a partido ou de forma global:
* Quem são os eleitos reais e simulados em cada região do território nacional.
* Como se altera a pluralidade da representação territorial em cada cenário simulado, em particular na melhoria dos círculos mais pequenos.
