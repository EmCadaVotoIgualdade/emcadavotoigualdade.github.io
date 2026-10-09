# Mapa eleitoral experimental — M2

Página isolada em **https://emcadavotoigualdade.github.io/mapa-teste.html**, depois de publicação pelo responsável. Mantém `layout: default`, `custom_scripts`, `relative_url`, `sitemap: false`, `preview_noindex: true` e ausência de metadados de navegação. A M2 altera apenas os seis ficheiros do protótipo; o layout, os menus, os conteúdos editoriais, os gráficos existentes e as dependências ficam intactos. Não foi efectuado commit, push ou deploy.

## Interface e estrutura

`mapa-teste.md` contém os botões de sistema, ano e indicador, a lista de círculos, o painel seleccionado, a legenda e a atribuição. `assets/css/mapa-teste.css` limita todas as regras a `#mapa-teste`. `assets/js/mapa-teste.js` carrega dois recursos locais: a geometria em `assets/images/mapa-teste.svg` e os números em `assets/data/mapa-teste-metricas.json`.

Os botões são gerados a partir do JSON, têm `aria-pressed`, sublinhado na opção activa, foco visível e altura mínima de 44 pixels. As dimensões são independentes; mudar uma preserva as outras e o círculo. Inicialmente: `current`, `2025`, `wasted_votes_pct` e um dos 20 círculos escolhido uniformemente com uma única chamada a `Math.random()`. Não há persistência nem novas escolhas aleatórias durante as interacções.

O SVG estático tem três painéis com `data-map-part`: continente, Açores e Madeira. O JavaScript coloca-os numa grelha CSS, sem recalcular limites. No desktop, a legenda vertical e os dois enquadramentos ficam ao lado do continente. Até 600 pixels, a legenda passa para cima e os enquadramentos ficam lado a lado abaixo do continente. Um pré-visualizador temporário mostra o valor sob o ponteiro/foco; não altera a selecção persistente nem faz anúncios automáticos. O painel seleccionado usa uma única região `aria-live="polite"`.

## JSON, versão 2

Há **480 valores eleitorais fictícios explícitos**: dois sistemas × quatro anos × 20 círculos × três indicadores. Nenhum é calculado a partir de resultados reais ou gerado aleatoriamente na página. Também os valores de `current` são fictícios.

```text
schema_version: 2
demo: true
models: current / proposal, cada um com label
years: ["2019", "2022", "2024", "2025"]
metrics: identificador → label, unit, palette, definition
regions: identificador → name, geography_code
values[model][year][region][metric]: número
```

Exemplo do acesso: `values["proposal"]["2025"]["portalegre"]["represented_parties_count"]` é `2`. Os identificadores dos círculos continuam iguais aos do SVG. `geography_code` conserva os códigos distritais 01–18 e os códigos NUTS I 2/3, apenas para rastrear a fonte.

| Indicador | Unidade | Paleta |
| --- | --- | --- |
| `wasted_votes_pct` | `percent` | `red` |
| `effective_threshold_pct` | `percent` | `amber` |
| `represented_parties_count` | `count` | `teal` |

Nas percentagens, `15.2` significa 15,2%, não 0,152%. A apresentação usa `Intl.NumberFormat('pt-PT')`, com uma casa decimal. As contagens são inteiros sem `%`. Valores ausentes, `null`, negativos, percentagens superiores a 100 ou contagens fraccionárias/fora do intervalo de inteiros seguros são inválidos: recebem cinzento e uma mensagem apenas quando relevantes. Não existe uma classe permanente «sem dados» na legenda.

**Partidos representados** significa o número de partidos políticos distintos com pelo menos um deputado eleito no círculo. Para manter os exemplos possíveis, os dois modelos assumem, apenas nesta demonstração, a mesma quantidade de mandatos locais por círculo e ano. Esta hipótese não implementa nem define a distribuição de mandatos da proposta.

Os limites de capacidade usados na validação foram consultados nos mapas de mandatos da CNE, sem usar resultados eleitorais: [2019](https://www.cne.pt/sites/default/files/dl/2019_ar_mapa_deputados.pdf), [2022](https://www.cne.pt/sites/default/files/dl/ar2022-mapa-deputados-1-c-2021.pdf), [2024](https://www.cne.pt/sites/default/files/dl/eleicoes/2024_ar/docs_geral/2024_ar_mapa_deputados.pdf) e [2025](https://www.cne.pt/sites/default/files/dl/eleicoes/2025_ar/docs_geral/2025_ar_mapa_deputados.pdf).

| Círculos | Mandatos locais assumidos |
| --- | --- |
| Portalegre | 2 |
| Beja, Bragança, Évora, Guarda | 3 |
| Castelo Branco | 4 |
| Vila Real, Açores | 5 |
| Madeira | 6 |
| Viseu | 8 |
| Coimbra, Faro, Santarém | 9 |
| Leiria | 10 |
| Aveiro | 16 |
| Braga | 19 |
| Porto | 40 |
| Lisboa | 48 |
| Setúbal | 18 em 2019/2022; 19 em 2024/2025 |
| Viana do Castelo | 6 em 2019/2022; 5 em 2024/2025 |

As contagens fictícias respeitam estes limites, incluindo 1 ou 2 em Portalegre. A proposta tem geralmente menos votos desperdiçados, menor barreira efectiva e mais partidos representados, mas inclui resultados iguais e piores. Não são garantias. A contagem de partidos integrantes de coligações e a distribuição precisa de mandatos na proposta permanecem por definir quando existirem simulações reais.

## Escalas comuns aos modelos e anos

No carregamento, o JavaScript recolhe todos os valores válidos de cada indicador, em todos os modelos, anos e círculos: **160 valores por indicador** neste ficheiro. Calcula mínimo e máximo globais e guarda uma escala por indicador. A selecção de sistema, ano ou círculo nunca recalcula a escala; assim, valores iguais têm sempre a mesma cor.

São considerados passos inteiros naturais `1, 2, 5` multiplicados por potências de dez. As percentagens arredondam os extremos para múltiplos do passo. As contagens começam no mínimo inteiro e formam categorias/intervalos inteiros. Entre alternativas com até seis classes, a escolha favorece cerca de cinco, penaliza classes vazias e extensão excessiva da escala. Gamas estreitas podem precisar de menos de três classes; dados todos iguais usam uma única classe. Sem valores válidos, a escala fica vazia e as regiões ficam neutras.

Nas percentagens, o limite inferior pertence à classe e o superior não, excepto na última classe, que inclui o máximo. A legenda distingue `0–<10` de `50–60`. Nas contagens, os intervalos são fechados: `1–2`, `3–4`, etc. Todos os limites são inteiros; as unidades só aparecem no título da legenda.

Com os dados fornecidos:

- Votos desperdiçados: gama observada 3,4–54,1; escala 0–60, passo 10, seis vermelhos de `#fee5d9` a `#99000d`.
- Limiar efectivo: gama observada 0,7–27,6; escala 0–30, passo 5, seis amarelos/âmbares de `#fff0b3` a `#874700`.
- Partidos: gama observada 1–8; quatro classes 1–2, 3–4, 5–6 e 7–8, de verde claro `#e2f5ec` a verde/teal escuro `#08584f`.

Os arrays de cores ficam no JavaScript; o JSON guarda apenas o nome da paleta como metadado do indicador. Foram removidos os antigos `domain` e `breaks`.

## Actualizar os dados

- **Valores:** editar `values` conservando as chaves dos modelos, anos, círculos e indicadores.
- **Novo ano:** acrescentar a chave textual a `years` e preencher, nos dois modelos, os 20 círculos e todos os indicadores. O botão surge automaticamente; 2025 continua a ser o ano inicial se estiver disponível.
- **Novo indicador:** acrescentar a `metrics` um identificador estável, nome português, `unit: "percent"` ou `"count"`, `palette: "red"`, `"amber"` ou `"teal"` e uma definição. Preencher o valor em cada modelo/ano/círculo. O botão, a formatação e a escala surgem sem alterar o SVG ou criar tabelas de valores no JavaScript.
- **Dados reais:** definir primeiro coligações, atribuição de mandatos, cálculo e fontes. Substituir os números/proveniência, validar e só então alterar `demo` e os textos de apresentação que referem dados fictícios. Geografia e motor de interacção podem manter-se.

## Geografia e atribuição

Fonte: **Direção-Geral do Território (DGT), CAOP2025**, [página oficial](https://www.dgterritorio.gov.pt/atividades/cartografia/cartografia-tematica/caop). Versão aprovada em 28 de Janeiro de 2026; `last_change` das camadas de 9 de Janeiro de 2026; preparação inicial em 9 de Outubro de 2026. Manter a atribuição à DGT, versão, link da licença [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) e indicação das adaptações, conforme a [política de dados abertos](https://www.dgterritorio.gov.pt/dados-abertos). A página e os metadados SVG conservam esses elementos.

Entradas originais:

- [Continente](https://geo2.dgterritorio.gov.pt/caop/CAOP_Continente_2025-gpkg.zip): `Continente_CAOP2025.gpkg`, camada `cont_distritos`, EPSG:3763.
- [Açores](https://geo2.dgterritorio.gov.pt/caop/CAOP_RAA_2025-gpkg.zip): camadas `raa_cen_ori_nuts1` em EPSG:5015 e `raa_oci_nuts1` em EPSG:5014.
- [Madeira](https://geo2.dgterritorio.gov.pt/caop/CAOP_RAM_2025-gpkg.zip): `ArqMadeira_CAOP2025.gpkg`, camada `ram_nuts1`, EPSG:5016.

SHA-256 dos ZIP, por essa ordem:

```text
87cd67f4b1fbadf23d9324e6fb231ff05531e4db347af36ccc7c6cbabe3ecd1d
b0e3b4fe5544647eb4593e0222c6430fae7e50c97f953d8ceae10707c4df9dcf
ae568ca2006e91205601309ff46bc8ae0cc73236165f095f8aa99a5b9a17e5d6
```

A preparação inicial usou Python, SQLite, Shapely e pyproj temporariamente. O continente foi simplificado como cobertura conjunta em EPSG:3763, tolerância 200 m, preservando os limites comuns; alteração de área máxima inferior a 0,026%. As ilhas foram transformadas com `always_xy=True` para EPSG:4326 e projecções LAEA locais (Açores: latitude 38,5°, longitude −28°; Madeira: 32,7°, −16,9°). Só depois se agregaram os diferentes fusos dos Açores. Tolerâncias: 80 m nos Açores, 60 m no grupo principal da Madeira e 20 m nas Selvagens originalmente preparadas. Os caminhos SVG foram arredondados a duas casas decimais, com `fill-rule="evenodd"`.

Na M2, os caminhos dos **18 distritos e dos Açores são exactamente os mesmos**. Na Madeira, foram conservados os dois maiores contornos do caminho existente — Madeira e Porto Santo — e ajustados conjuntamente ao enquadramento, preservando proporção e disposição relativa. Desertas, Selvagens, pequenos componentes exteriores e o enquadramento separado das Selvagens deixaram de ser apresentados. Isto é uma simplificação visual: a região autónoma não se limita às duas ilhas mostradas.

Cada círculo tem um único grupo `data-region`. Nos Açores e na Madeira, o rectângulo, o nome e as ilhas pertencem a esse grupo: clique/toque em qualquer ponto do rectângulo selecciona o círculo; Tab/Enter/Espaço e a lista produzem o mesmo realce. Não há focos separados para ilhas. Escalas geográficas distintas são identificadas nas descrições acessíveis do SVG. Não se incluem círculos da emigração.

O repositório [nmota/caop_GeoJSON](https://github.com/nmota/caop_GeoJSON), revisão `a13791dd9639304a9f033789b391420ee6684afd`, foi inspeccionado inicialmente; o mapa usa exclusivamente os GeoPackages oficiais com versão conhecida. Nenhum arquivo GIS, biblioteca, script de preparação ou relatório temporário é acrescentado ao repositório. Não há serviços externos de mapas nem dependências novas no site.

## Validação

Passaram as verificações locais da cobertura dos 480 valores e limites das contagens, identificadores/XML, preservação dos caminhos, 24 combinações, cores/legendas comuns, valores iguais, limites exactos, dados constantes/em falta, escolha aleatória única, botões, mapa, teclado, rato, toque emulado e larguras de 320/390 pixels. Também foram verificados `relative_url` com `/subsite`, ausência de links nos menus/homepage, `noindex`, ficheiros fora do âmbito intactos, sintaxe JavaScript e `git diff --check`. Os dois gráficos existentes continuam a responder aos controlos e não houve erros de consola nos percursos normais. Relatórios e capturas ficam na pasta temporária.

**Sem build Jekyll completo:** Ruby/Bundler/Jekyll não estão instalados e este checkout não tem `_config.yml`. A renderização alternativa Liquid/Markdown e os testes Edge/Chromium não substituem `bundle exec jekyll build` num ambiente preparado. O toque é emulado; não há teste em telemóvel físico ou auditoria com leitor de ecrã. A geografia é para visualização estatística, não para medições cartográficas.
