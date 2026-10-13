---
layout: default
title: Detalhes Técnicos da Proposta
description: O modelo de cálculo matemático e a simulação detalhada da distribuição de mandatos por círculo político.
nav_section: proposta
nav_level: 2
nav_order: 10
nav_label: Detalhes da Reforma
nav_footer_label: Detalhes Técnicos
---

### A nossa proposta para Portugal (aplicada a 2022)

A reforma assenta em três pilares fundamentais:
* **a) Distribuição de mandatos com base na votação nacional**, garantindo a justiça proporcional do resultado global;
* **b) Distribuição de todos os mandatos pelos círculos locais**, evitando a centralização do sistema por via de uma lista nacional fechada;
* **c) Uso do voto preferencial** para dar aos eleitores a possibilidade de escolher individualmente os candidatos da lista, estreitando a ligação entre eleitos e eleitores.

---

### a) Cálculo dos mandatos totais com base na votação nacional total

Esta distribuição será feita segundo o método de Hondt, e para os 226 mandatos do território nacional resulta num “custo” de **22.544 votos por mandato**.

Isso resulta na seguinte distribuição:
* **PS:** 99
* **PSD:** 69
* **CH:** 17
* **IL:** 11
* **BE:** 10
* **CDU:** 10
* **CDS:** 3
* **PAN:** 3
* **L:** 3
* **RIR:** 1

Uma curiosidade é que o RIR, com os seus 22.559 votos, passaria a estar presente no Parlamento por apenas 16 votos. Até os seus 123 votos em Portalegre teriam sido fundamentais para a eleição.

---

### b) Distribuição de todos os mandatos pelos círculos locais

O ponto de partida é o número de mandatos atribuído a cada partido a nível nacional, calculado na secção anterior, e o número de mandatos de cada círculo, tal como no sistema actual (de 48 em Lisboa a 2 em Portalegre, em 2022).

Para cada partido, em cada círculo, dividem-se os votos obtidos pela sequência de divisores 1, 4, 7, 10, …, (+3).
Os quocientes de todos os partidos e círculos são reunidos numa única lista e ordenados do maior para o menor. Apenas participam nesta distribuição os partidos aos quais tenham sido atribuídos mandatos no cálculo nacional.

#### Primeira fase: distribuição com limite de quatro mandatos

Percorrem-se os quocientes por ordem decrescente, atribuindo um mandato sempre que estejam simultaneamente satisfeitas três condições:
1. O partido ainda não atingiu o seu total de mandatos definido a nível nacional;
2. O círculo ainda não recebeu todos os mandatos que lhe cabem;
3. O partido ainda não recebeu **quatro mandatos** nesse círculo, durante esta primeira fase.

Quando uma destas condições deixa de se verificar, o quociente correspondente é ignorado nessa fase. A primeira fase prossegue até se esgotarem os quocientes elegíveis ou até todos os mandatos terem sido distribuídos.

Este limite inicial procura favorecer uma distribuição mais alargada da representação pelos diferentes círculos, sem alterar o total nacional de deputados de cada partido.

#### Segunda fase: distribuição dos mandatos restantes

Se ainda houver mandatos por atribuir, percorrem-se novamente os quocientes que não deram origem a mandatos na primeira fase, mantendo a mesma ordem e a mesma sequência de divisores.

Nesta segunda fase, deixa de existir o limite de quatro mandatos por partido em cada círculo. Mantêm-se apenas duas condições:
1. O partido não pode ultrapassar o número de mandatos que lhe foi atribuído a nível nacional;
2. O círculo não pode ultrapassar o número de mandatos que lhe cabe eleger.

O processo termina quando todos os mandatos estão distribuídos. Desta forma, mantém-se a proporcionalidade nacional entre partidos e a distribuição territorial de todos os deputados, sem recorrer a uma lista nacional de candidatos.

---

### c) Uso do voto preferencial na atribuição dos mandatos aos candidatos

A proposta é que cada partido possa escolher, de forma independente, a liberdade que dá aos seus eleitores para definir a ordem final das listas do partido, com três alternativas:

1. Apresentar a lista por ordem alfabética e os candidatos mais votados vão para o topo
2. Apresentar listas ordenadas, sem possibilidade de ser alterada pelos eleitores, como actualmente
3. Uma opção intermédia, onde é apresentada uma lista ordenada, e os candidatos que recebem acima de um determinado número de votos pessoais vão para o topo da lista

Quanto à opção 3, é preciso definir um valor mínimo de votos para os candidatos poderem subir na lista. Propomos um valor simples, como 5.000 votos, e pode ser ajustado à medida que os portugueses se habituam ao voto preferencial.

Na Dinamarca também existe esta flexibilidade (opção 1 ou 3), e ao longo do tempo os partidos estão a adotar cada vez mais a opção 1, que dá aos eleitores todo o poder.
