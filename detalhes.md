---
layout: default
title: Detalhes Técnicos da Proposta
description: O modelo de cálculo matemático e a simulação detalhada da distribuição de mandatos por círculo político.
---

O sistema eleitoral proposto procura resolver as distorções da democracia portuguesa respeitando a diversidade territorial e promovendo o poder direto de decisão do eleitor.

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

O ponto de partida é a distribuição a nível nacional de mandatos por partido, e a distribuição prévia de mandatos totais pelos círculos (Lisboa 48, até Portalegre 2).

A regra para a distribuição de mandatos pelos partidos/círculos tem os seguintes passos:
1. Os votos de cada partido em cada círculo são divididos por **1, 3, 6, 10, 15, etc.** (incrementos de +2, +3, +4, etc., para aumentar o efeito “distributivo” do sistema)
2. Os mandatos são atribuídos começando pelos maiores quocientes (calculados no ponto 1)
3. Quando o limite de mandatos de um partido ou círculo é atingido os restantes quocientes desse partido ou círculo são ignorados

#### Exemplificando com alguns quocientes:
* **1º quociente:** PS em Lisboa (483.034 votos)
* **2º:** PS no Porto (418.958)
* **3º:** PSD no Porto (318.390)
* **4º:** PSD em Lisboa (285.646)
* **5º:** PS em Braga (207.837)
* **6º:** PS em Setúbal (198.126)
* **7º:** PSD em Braga (172.021)
* **8º:** Segundo mandato PS em Lisboa (161.011 = 483.034 votos / 3)

#### Os primeiros mandatos dos pequenos partidos:
* **15º:** IL em Lisboa (93.567)
* **16º:** CH em Lisboa (92.001)
* **29º:** CDU em Lisboa (59.899)
* **32º:** BE em Lisboa (55.802)
* **36º:** IL no Porto (50.389), o primeiro de um pequeno partido fora de Lisboa
* **65º:** L em Lisboa (28.854)
* **84º:** PAN em Lisboa (23.577)

#### Os primeiros mandatos dos partidos em círculos sem representação actual:
* **98º:** CDS em Lisboa (19.558)
* **103º:** BE em Braga (18.550)
* **110º:** PAN no Porto (16.722)
* **112º:** IL em Aveiro (16.294)
* **126º:** CH em Viseu (14.383)
* **140º:** CDU em Braga (13.018)
* **144º:** PSD em Portalegre (12.433)
* **154º:** L no Porto (11.438)
* **226º:** RIR no Porto (7.212)

#### Primeiro quociente ignorado por ser atingido o limite de um círculo:
* **151º:** 2º mandato PS em Évora (34.700 / 3 = 11.567). É o 3º e último mandato de Évora, passando os restantes quocientes de Évora a ser ignorados.
* **152º:** CDU em Évora, (11.494), ignorado. A CDU não elege em Évora por 74 votos, e assim esse mandato da CDU será alocado a outro círculo.

#### Primeiro quociente ignorado por ser atingido o limite de um partido:
* **162º:** BE em Leiria (10.709), último dos 10 mandatos do BE.
* **165º:** BE em Santarém (10.011), ignorado, sendo o mandato de Santarém alocado a outro partido. Com mais 700 votos em Santarém seria aí que o BE teria representação, perdendo-a em Leiria.

Comparando com o sistema actual, nenhum partido perde representação num círculo, e 12 dos 20 círculos passam a estar representados por pelo menos mais um partido.

---

### Distribuição Simulada por Círculo (2022)

Para cada círculo, o número de deputados de cada partido, com as novas presenças assinaladas com um asterisco (`*`):

* **Açores:** PS 3, PSD 2
* **Madeira:** PS 3, PSD 3
* **Porto:** PS 17, PSD 11, CH 2, IL 2, BE 2, CDU 2, \*CDS 1, \*PAN 1, \*L 1, \*RIR 1
* **Lisboa:** PS 21, PSD 10, CH 4, IL 4, BE 2, CDU 3, \*CDS 1, PAN 1, L 2
* **Braga:** PS 7, PSD 7, CH 2, IL 1, \*BE 1, \*CDU 1
* **Viana do Castelo:** PS 3, PSD 3
* **Vila Real:** PS 3, PSD 2
* **Bragança:** PS 2, PSD 1
* **Aveiro:** PS 6, PSD 6, CH 1, \*IL 1, \*BE 1, \*CDS 1
* **Viseu:** PS 4, PSD 3, \*CH 1
* **Guarda:** PS 2, PSD 1
* **Castelo Branco:** PS 2, PSD 2
* **Coimbra:** PS 4, PSD 3, \*CH 1, \*BE 1
* **Leiria:** PS 4, PSD 3, CH 1, \*IL 1, \*BE 1
* **Santarém:** PS 4, PSD 3, CH 1, \*CDU 1
* **Setúbal:** PS 7, PSD 4, CH 2, IL 1, BE 1, CDU 2, \*PAN 1
* **Faro:** PS 3, PSD 2, CH 2, \*IL 1, \*BE 1
* **Évora:** PS 2, PSD 1
* **Beja:** PS 1, \*PSD 1, CDU 1
* **Portalegre:** PS 1, \*PSD 1

---

### c) Uso do voto preferencial na atribuição dos mandatos aos candidatos

A proposta é que cada partido possa escolher, de forma independente, a liberdade que dá aos seus eleitores para definir a ordem final das listas do partido, com três alternativas:

1. Apresentar a lista por ordem alfabética e os candidatos mais votados vão para o topo
2. Apresentar listas ordenadas, sem possibilidade de ser alterada pelos eleitores, como actualmente
3. Uma opção intermédia, onde é apresentada uma lista ordenada, e os candidatos que recebem acima de um determinado número de votos pessoais vão para o topo da lista

Quanto à opção 3, é preciso definir um valor mínimo de votos para os candidatos poderem subir na lista. Propomos um valor simples, como 5.000 votos, e que pode ser ajustado à medida que os portugueses se habituam ao voto preferencial.

Na Dinamarca também existe esta flexibilidade (opção 1 ou 3), e ao longo do tempo os partidos estão a adotar cada vez mais a opção 1, que dá aos eleitores todo o poder.
