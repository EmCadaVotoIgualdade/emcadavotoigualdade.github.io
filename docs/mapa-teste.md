# Mapa eleitoral experimental — M5

Página isolada em `/mapa-teste.html`. Conserva `layout: default`, `custom_scripts`, `relative_url`, `sitemap: false`, `preview_noindex: true` e ausência de metadados de navegação. A largura específica continua ajustável em `content_width: 90rem`, no início de `mapa-teste.md`. O layout comum, o cabeçalho, o rodapé, os artigos e as dependências não foram alterados.

## Dados eleitorais

O JSON fornecido tem `schema_version: 2`, dois modelos (`current` e `proposal`), cinco eleições (2015, 2019, 2022, 2024, 2025), 20 círculos e dois indicadores: `wasted_votes_pct` e `represented_parties_count`. São **400 valores**, produzidos e validados no repositório de análise independente. A integração não altera o ficheiro nem recalcula os resultados no navegador.

Os modelos, indicadores, nomes, unidades, paletas, definições e valores são lidos do JSON. Os anos de `years` são convertidos em chaves textuais e ordenados cronologicamente; o ano inicial é o mais recente. Para acrescentar uma eleição, basta adicioná-la a `years` e preencher `values[model][year][region][metric]` nos dois modelos e em todos os círculos. O botão e os pontos do gráfico aparecem automaticamente, sem editar o JavaScript.

`source` conserva a proveniência e as hipóteses. A página apresenta o ficheiro de origem, a base dos votos válidos e o âmbito territorial, juntamente com a hipótese sobre listas omitidas; o link para o JSON permite consultar os metadados completos. Nesta fonte:

- `data_Portugal.csv` é a origem; `Totais` contém todos os votos válidos, incluindo listas omitidas.
- O âmbito nacional inclui os 18 distritos, Açores e Madeira; exclui os círculos da emigração.
- As listas omitidas são consideradas sem deputados nos dois modelos. Os seus votos válidos contam como desperdiçados, mas a atribuição de mandatos utiliza apenas as listas incluídas. Os resultados dependem desta hipótese.

Votos desperdiçados são votos que não contribuíram para o partido eleger deputados: **no círculo**, no sistema atual; **a nível nacional**, na proposta. Esta é a única explicação de indicador abaixo das visualizações. A definição de contagem das listas/coligações continua disponível nos metadados e no título do botão.

## Controlos, cores e histórico

A ordem visual e de teclado é **ano, sistema, indicador**. Os botões conservam `aria-pressed`, foco visível e altura mínima de 44 pixels. O círculo inicial continua escolhido uma única vez, uniformemente entre os 20 círculos.

As escalas são comuns a todos os modelos, anos e círculos. Os votos desperdiçados usam intervalos fixos; a escala das contagens é calculada uma vez usando os valores globais. Mudar o ano, sistema ou círculo não as recalcula. Valores inválidos recebem cinzento e uma mensagem de indisponibilidade; não existe uma classe permanente de dados em falta.

- **Votos desperdiçados:** classes fixas `0-5`, `5-10`, `10-20`, `20-30`, `30-50`, `50+`. O limite inferior pertence à classe e o superior à seguinte; a última inclui todos os valores válidos de 50% a 100%. Os rótulos não usam desigualdades.
- **Partidos representados:** uma classe por inteiro de 1 a 10, com interpolação entre as cores da paleta teal.

O histórico mostra simultaneamente os dois modelos, com posições horizontais igualmente espaçadas por eleição. A escala vertical depende dos valores do círculo e indicador; as contagens usam marcas inteiras. O modelo seleccionado tem linha mais espessa. Os valores exactos usam `Intl.NumberFormat("pt-PT", { maximumSignificantDigits: 21 })` e são acessíveis por rato, clique, foco, Enter/Espaço e toque. A lista de círculos fica abaixo do gráfico e sincroniza com o mapa. Não há painel de resumo, parágrafo de instruções nem tabela de dados.

## Composição e geografia

O SVG estático tem `viewBox="0 41 580 553"`, recortando o espaço que o título do continente ocupava; esse título foi removido. O continente está em `x=260, y=0`; os Açores em `x=0, y=282.743442`; a Madeira em `x=0, y=480.743442`. Os painéis insulares mantêm a largura de **240 unidades SVG**, com molduras de largura 238. Os Açores mantêm a altura de 180; a Madeira usa 110.256558, com moldura de altura 108.256558. A moldura da Madeira termina exactamente em `y=590`, o limite sul da geometria continental, em vez de seguir o limite do viewport. A legenda ocupa a área superior esquerda acima dos Açores, fora das regiões clicáveis.

Até 600 pixels, o mapa mantém por defeito a composição compacta, com as ilhas à esquerda e o continente à direita. A legenda mostra apenas cores e valores, sem repetir o indicador seleccionado imediatamente acima do mapa; o nome continua disponível no rótulo acessível da legenda. As contagens usam três colunas para caberem no espaço disponível. A altura real da legenda determina a posição dos Açores, seguidos pela Madeira mais curta. O botão `Tornar maior`, com 30 pixels de altura, fica centrado na coluna das ilhas e com a base alinhada com o limite sul do continente. Se futuras classes precisarem de mais espaço, a composição ganha apenas a altura necessária, sem alterar a escala. Os controlos mantêm alvos de pelo menos 44 pixels e os cinco anos numa linha.

O botão empilha os três painéis, mantendo as suas dimensões e os seus `viewBox` individuais; passa a `Tornar menor` para regressar à vista compacta. Na vista ampliada, a legenda fica acima e o botão continua abaixo da Madeira. Apenas as posições e o `viewBox` exterior mudam, com aumento uniforme de todo o mapa. O botão tem `aria-pressed`, controlo por teclado e toque e não altera as selecções eleitorais. Ao reduzir o mapa depois de percorrer a vista ampliada, a página volta a mostrar os controlos. No desktop, o botão está oculto.

A partir de 1000 pixels, o mapa e o histórico ficam lado a lado, separados por 16 pixels. A coluna do mapa ocupa até 34rem e o histórico utiliza a largura restante, com a mesma altura do mapa. O SVG do gráfico acompanha a largura e a altura disponíveis; o valor inspeccionado aparece numa caixa flutuante para não deslocar os pontos. A lista de círculos continua abaixo do gráfico. Abaixo de 1000 pixels, o mapa e o histórico ficam empilhados.

Os **29 caminhos e respectivas transformações individuais são idênticos aos anteriores**, incluindo os 18 distritos, as nove ilhas dos Açores, Madeira e Porto Santo. Um grupo adicional desloca conjuntamente Madeira e Porto Santo em `y=-37.601202`, sem escala ou rotação: o espaço entre o título e as ilhas e o espaço entre as ilhas e a base da moldura ficam iguais aos dos Açores. Preservam-se os contornos, orientações, tamanhos relativos, espaçamento compacto e escala geográfica comum de **0.0009454098185717809 unidades SVG por metro**. Não houve regeneração nem redimensionamento independente de ilhas. Cada arquipélago continua a ser um único grupo `data-region`, incluindo moldura, nome e ilhas.

Fonte geográfica: **Direção-Geral do Território, CAOP2025**, [página oficial](https://www.dgterritorio.gov.pt/atividades/cartografia/cartografia-tematica/caop), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). A atribuição, a descrição e os metadados SVG permanecem intactos. As adaptações anteriores incluem reprojecção, agregação e simplificação; na Madeira são mostradas apenas Madeira e Porto Santo. A geografia serve para visualização estatística.

Entradas geográficas originais:

- [Continente](https://geo2.dgterritorio.gov.pt/caop/CAOP_Continente_2025-gpkg.zip): camada `cont_distritos`, EPSG:3763.
- [Açores](https://geo2.dgterritorio.gov.pt/caop/CAOP_RAA_2025-gpkg.zip): camadas `raa_cen_ori_nuts1` e `raa_oci_nuts1`, EPSG:5015/5014.
- [Madeira](https://geo2.dgterritorio.gov.pt/caop/CAOP_RAM_2025-gpkg.zip): camada `ram_nuts1`, EPSG:5016.

## Validação e limites

A validação em **Edge/Chromium** passou: 400 valores do JSON real, 20 combinações de controlos, histórico nos 20 círculos para ambos os indicadores, cinco pontos por modelo com espaçamento igual, marcas inteiras nas contagens, valores exactos por foco/teclado/rato/toque emulado, sincronização mapa/lista e interacções nos enquadramentos e ilhas. Foram verificadas ambas as métricas a 320, 390, 768, 1024 e 1440 pixels, sem transbordamento horizontal nem sobreposição da legenda com as regiões. As escalas geográficas dos três painéis são iguais em todas essas larguras.

Uma eleição futura, acrescentada apenas à resposta em memória do teste, apareceu automaticamente nos controlos e no histórico; anos numéricos e fora de ordem foram normalizados correctamente. Passaram também a comparação dos caminhos/transformações e metadados SVG, a confirmação de que o JSON permaneceu intacto, a renderização inalterada das outras 14 páginas, os caminhos com base `/subsite`, a ausência de erros JavaScript, `node --check assets/js/mapa-teste.js` e `git diff --check`. O ajuste posterior da escala dos votos desperdiçados substitui os intervalos automáticos pelos seis intervalos fixos acima; a contagem de partidos mantém o algoritmo anterior.

A validação usa o JSON real. Relatórios, código auxiliar e capturas ficam em `%TEMP%/igualdade-m5-validation`, sem novas dependências no site. A renderização local usa Liquid/Markdown em Python e o layout existente; **não substitui um build Jekyll**, pois Ruby/Bundler/Jekyll não estão instalados e este checkout não contém `_config.yml`. O toque é emulado, sem teste num telemóvel físico ou com leitor de ecrã.

O ajuste dos intervalos e do botão móvel foi validado separadamente em Edge/Chromium, com relatórios e capturas em `%TEMP%/igualdade-m5-mobile`: os 400 valores reais, todos os limites e valores imediatamente inferiores, incluindo 0%, 50% e 100%; vistas compacta e ampliada a 320/390/600 pixels; composição de desktop a 601/768/1024/1440 pixels; botão por rato, teclado e toque; interacções nas ilhas em ambas as vistas; preservação das selecções e do ponto inspeccionado; escala comum, ausência de transbordamento e legenda fora das regiões. As dimensões do mapa no desktop, o JSON e o SVG ficaram intactos. Passaram a sintaxe JavaScript e `git diff --check`.

A revisão do espaçamento foi validada em Edge/Chromium, com capturas e relatório em `%TEMP%/igualdade-m5-spacing`: legenda e botão fora das regiões, composição compacta/ampliada, ambas as métricas a 320/390/600/601/768/1000/1024/1440 pixels, escala comum e enquadramentos iguais, pontos exactos sem deslocamento durante a inspecção, redimensionamento vertical, teclado/rato/toque emulado e sincronização das selecções. Os controlos e o mapa compacto completo cabem sem deslocar a página nos viewports testados de 320 × 740 e 390 × 844 pixels. A redução da vista ampliada volta a mostrar os controlos. Passaram também a alternativa sem `ResizeObserver`, a base `/subsite`, a preservação do JSON/SVG e das outras páginas, a sintaxe JavaScript e `git diff --check`. Não houve build Jekyll.

A revisão das molduras foi validada em Edge/Chromium, com capturas e relatório em `%TEMP%/igualdade-m5-trim`: padding vertical da Madeira igual ao dos Açores, larguras iguais e altura reduzida, base da moldura desktop e do botão móvel alinhadas com a geometria real do continente, legenda móvel sem título repetido, todos os caminhos e transformações individuais preservados, escala comum, ambos os indicadores, vistas compacta/ampliada e larguras 320/390/600/601/768/1024/1440 pixels. Os controlos e o mapa completo cabem nos viewports testados de 320 × 667 e 390 × 844 pixels. Passaram também teclado/rato/toque emulado, selecção dos enquadramentos e das ilhas, gráfico e sincronização, base `/subsite`, preservação do JSON e das outras páginas, sintaxe JavaScript e `git diff --check`. Não houve build Jekyll.

As alterações ficam no working tree, sem commit, push ou deploy.
