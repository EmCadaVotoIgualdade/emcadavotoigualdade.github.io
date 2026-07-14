---
layout: default
title: Cálculo dos Índices
description: A formulação matemática do Índice de Gallagher (LSq) e do Índice de Custo Adicional (CAd).
---

# Cálculo dos Índices

Neste espaço detalha-se a formulação matemática e o conceito por trás dos dois indicadores estatísticos utilizados para medir a desproporcionalidade e a tendência ao bipartidarismo do sistema eleitoral.

---

## Índice de Gallagher (LSq)

O Índice de Gallagher, também conhecido por "least squares index", ou LSq, é a métrica mais utilizada internacionalmente pela ciência política para medir a desproporcionalidade de sistemas eleitorais.

A sua fórmula matemática é definida por:

$$LSq = \sqrt{\frac{1}{2} \sum_{i=1}^{n} (V_i - L_i)^2}$$

Para cada partido, calcula-se a diferença entre a percentagem de votos ($V_i$) e a percentagem de lugares ($L_i$), eleva-se esta diferença ao quadrado, e soma-se o resultado para todos os partidos. De modo a enquadrar o resultado divide-se o somatório por dois, e finalmente calcula-se a raiz quadrada. O índice seria zero caso todos os partidos obtivessem uma percentagem de lugares exactamente igual à sua percentagem de votos, e cresce à medida que os resultados começam a divergir.

O LSq não dá informação sobre o “sentido da desproporcionalidade”, ou seja, não distingue entre um sistema em que são beneficiados os grandes partidos em prejuízo dos pequenos, ou beneficiados os partidos regionais em prejuízo dos nacionais, ou prejudicados os partidos que não atingem uma cláusula barreira nacional, em benefício de todos os que a ultrapassam.

---

## Custo Adicional (CAd)

Por sua vez o CAd mede especificamente a tendência do sistema eleitoral para beneficiar os dois maiores partidos, incentivando assim ao bipartidarismo, como acontece tradicionalmente nos sistemas maioritários. Nesses sistemas a competição para muitos dos mandatos apenas existe verdadeiramente entre os dois maiores partidos, o que leva os restantes partidos a ter muitos círculos onde os seus votos não têm impacto, e portanto um pior rácio entre votos e mandatos a nível global.

O índice mede o custo adicional, em votos por mandato, que os partidos parlamentares menos votados precisam em relação aos dois mais votados, em percentagem.

A fórmula para o cálculo do CAd baseia-se nas seguintes variáveis:

*   **$V_{3m}$** = Votos dos partidos parlamentares, excepto os dois maiores
*   **$M_{3m}$** = Mandatos dos partidos parlamentares, excepto os dois maiores
*   **$V_{12}$** = Votos dos dois maiores partidos
*   **$M_{12}$** = Mandatos dos dois maiores partidos

A fórmula matemática é definida por:

$$CAd = \left( \frac{\frac{V_{3m}}{M_{3m}}}{\frac{V_{12}}{M_{12}}} - 1 \right) \times 100$$

### Exemplo Prático: Portugal em 2022
Como exemplo, em Portugal em 2022 este valor foi de +100%, porque PS e PSD elegeram com uma média de 20 mil votos por mandato, e os restantes partidos parlamentares elegeram com uma média de 40 mil votos por mandato, ou seja, mais 100%.
