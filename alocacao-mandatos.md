---
layout: default
title: Métodos de alocação dos mandatos nacionais
description: Método de Zurique e método de tipo dinamarquês para alocar mandatos nacionais aos círculos locais.
---

## Sistemas europeus com compensação global de mandatos

Na Europa há vários sistemas eleitorais que procuram conciliar a existência de círculos locais com a igualdade de voto a nível nacional. Alguns garantem a igualdade de voto, outros apenas se aproximam desse ideal em função dos resultados concretos.


### Áustria, Alemanha e Açores

Nestes sistemas há círculos locais e mandatos de compensação alocados a um nível superior. Os mandatos locais dependem apenas dos votos nesse círculo, enquanto os de compensação dependem dos votos totais de cada partido e do seu número de mandatos nos círculos locais.

Este sistema tem duas desvantagens que foram mencionadas em debates parlamentares sobre propostas deste género:
* **Criação de duas categorias de deputados:** os eleitos diretamente pelos círculos locais e os eleitos pelas listas centrais de compensação.
* **Erosão da representação local:** para criar um círculo de compensação sem aumentar o número total de deputados, é necessário retirar mandatos aos círculos actuais.


### Dinamarca e Suécia

Estes sistemas resolvem as duas desvantagens anteriores com um passo adicional que aloca os mandatos de compensação aos círculos locais em função da distribuição de votos dos vários partidos. Neste passo é possível que um círculo mais pequeno que outro (por exemplo com menos eleitores) acabe com mais mandatos, se for aí que um ou mais partidos com direito a mandatos de compensação tiverem a sua maior votação.


### Noruega

Na Noruega os mandatos totais de cada círculo (base mais compensação) estão fixos à partida. Este tipo de distribuição é compatível com a exigência da nossa Constituição para que o número de mandatos de cada círculo seja proporcional ao seu número de eleitores.


### Cantões Suíços (Zurique e outros)

Neste sistema não existem mandatos de compensação. Em vez disso, o número de mandatos de cada círculo é fixado à partida, e o número de mandatos de cada partido é calculado com base na sua votação total.
A distribuição destes mandatos pelos círculos é feita de modo a garantir que os totais de cada partido e de cada círculo são os calculados anteriormente.

---

## Igualdade de voto e mandatos nacionais

Para que um sistema com mandatos de compensação garanta a igualdade de voto, é preciso que esses mandatos sejam em número suficiente. Nos Açores, por exemplo, o pequeno número de mandatos de compensação nunca permitiu atingir uma proporcionalidade perfeita. Já na Dinamarca, onde os mandatos de compensação são mais, esse problema aconteceu na eleição de 2022, pela primeira vez em 70 anos, e deu lugar a várias propostas para evitar o problema em eleições futuras.

A excepção ao ponto anterior são sistemas como o da Alemanha e da Suécia, onde os mandatos dos círculos locais podem ser revogados caso o respectivo partido não tenha cobertura para eles a nível nacional.

Assim a forma mais simples de garantir a igualdade de voto, é calcular os mandatos nacionais de cada partido com base na sua votação nacional, deixando a sua distribuição pelos círculos para uma fase posterior, como no sistema de Zurique.


### A distribuição dos mandatos nacionais pelos círculos

A Constituição exige que o número de mandatos de cada círculo do território nacional seja proporcional ao número de eleitores, pelo que a distribuição dos mandatos tem de ser definida antes da eleição.
É precisamente assim que funciona o sistema de Zurique, e o sistema usado na Dinamarca também pode ser adaptado para cumprir esta exigência.

Aqui não vão ser apresentados os detalhes técnicos de cada sistema, apenas os seus efeitos quando aplicados aos resultados das eleições legislativas de 2015, 2019, 2022, 2024 e 2025.

> Para cada eleição foram simuladas 5 mil variantes, onde cada partido tem a sua votação global a variar até $\pm 8\%$ de forma aleatória, bem como uma variação local em cada círculo até $\pm 2\%$, de forma independente.
>
> Este procedimento gerou 25 mil resultados eleitorais possíveis, que permitem uma análise mais robusta das consequências de cada método do que analisando apenas os cinco resultados históricos.
> *(os detalhes técnicos de cada sistema, os resultados detalhados das simulações, bem como o código para as reproduzir será apresentado neste site no futuro, e até lá poderá ser solicitado em emcadavotoigualdade@gmail.com)*

---

### Resumo Comparativo das Métricas

| Métrica Analisada | Sistema Atual | Método Dinamarquês | Método de Zurique | Objetivo |
| :--- | :---: | :---: | :---: | :---: |
| **Proporcionalidade (Gallagher)** | 12,0 | 10,1 | **9,7** | Quanto menor, melhor |
| **Pluralidade Territorial** | 64,8 | **86,2** | 82,5 | Quanto maior, melhor |
| **Inversões Locais** | **0,0** | 0,8 | 1,9 | Quanto menor, melhor |
| **Inversões Globais** | 71,5 | 60,1 | **53,4** | Quanto menor, melhor |

---

### Análise Detalhada das 4 Métricas

#### 1. Proporcionalidade entre votos e mandatos, círculo a círculo

Nesta métrica é calculado o índice de Gallagher círculo a círculo, quanto mais baixo o valor mais proporcional é o método.
Aqui o método de Zurique ganha claramente, com uma média de 9.7, contra 10.1 do método dinamarquês e 12.0 do sistema actual.


#### 2. Pluralidade da representação territorial

Aqui somamos o número de partidos representados em cada distrito.
O método dinamarquês foi criado em parte para responder a esta métrica, e com o ajuste que fizemos para o adaptar aos círculos portugueses torna-se imbatível, com uma média de 86.2, contra 82.5 do método de Zurique e apenas 64.8 do sistema actual.


#### 3. Inversões de pares mandatos/votos no mesmo círculo

Estas inversões acontecem quando num círculo um partido tem mais votos que outro mas menos mandatos.

No sistema actual, e em todos onde os círculos estão isolados, nunca há inversões dentro do mesmo círculo. No método de Zurique há em média 1.9 inversões e no dinamarquês 0.8, em cada eleição. Nas eleições reais da Dinamarca, Suécia, Noruega e Zurique estas inversões acontecem com regularidade. Este efeito é visto como o custo a pagar para garantir a igualdade de voto a nível nacional e por consequência evitar as mais graves inversões de mandatos/votos a nível nacional.


#### 4. Inversões de pares mandatos/votos entre os vários círculos

Quando alargamos a análise para inversões também entre círculos diferentes, entre o mesmo partido ou partidos diferentes, obtemos menos inversões no método de Zurique, com 53.4 pares em média, contra 60.1 do método dinamarquês e 71.5 do sistema actual.

---

## Conclusão

A adopção de um sistema como o de Zurique, ou de uma variante do sistema dinamarquês permitem garantir a igualdade de voto a nível nacional; manter o número de mandatos em todos os círculos, mas aumentar a pluralidade de representação, particularmente importante nos círculos mais pequenos; e tornar a distribuição dos mandatos pelos círculos mais proporcional em relação às percentagens de votos.