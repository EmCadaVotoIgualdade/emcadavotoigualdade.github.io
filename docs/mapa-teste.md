# Mapa eleitoral experimental

Protótipo isolado em `/mapa-teste.html`, com o layout `default`, sem metadados de navegação, com `sitemap: false` e `preview_noindex: true`. O único ficheiro preexistente alterado é `_layouts/default.html`: acrescenta uma meta robots `noindex, nofollow` apenas quando `preview_noindex` é exactamente `true`. Não há alterações aos restantes conteúdos, menus, scripts ou estilos do site.

Depois de uma publicação feita pelo responsável do site, o endereço será **https://emcadavotoigualdade.github.io/mapa-teste.html**. Não foi efectuado qualquer commit, push ou deploy.

## Ficheiros

- `mapa-teste.md`: página, avisos, controlos e atribuição geográfica.
- `assets/images/mapa-teste.svg`: geometria estática, sem valores eleitorais.
- `assets/data/mapa-teste-metricas.json`: valores fictícios e definições dos indicadores.
- `assets/js/mapa-teste.js`: carregamento, cores, legenda e interacções.
- `assets/css/mapa-teste.css`: regras limitadas a `#mapa-teste`.
- `docs/mapa-teste.md`: esta documentação, sem front matter Jekyll.

O JavaScript usa o mecanismo existente `custom_scripts`. Os três recursos da página usam `relative_url`, incluindo os endereços de descarga do SVG e do JSON. Não há novas dependências de execução, serviços de mapas, tiles, plugins Jekyll ou backend.

## Geografia, licença e versão

Fonte utilizada: **Direção-Geral do Território (DGT), Carta Administrativa Oficial de Portugal, CAOP2025**, obtida directamente dos GeoPackages oficiais. A [página oficial da CAOP](https://www.dgterritorio.gov.pt/atividades/cartografia/cartografia-tematica/caop) identifica esta versão e a sua aprovação em 28 de Janeiro de 2026. Os `last_change` das camadas nos quatro GeoPackages datam de 9 de Janeiro de 2026. Consulta e preparação do protótipo: 9 de Outubro de 2026.

Descargas utilizadas:

- [CAOP_Continente_2025-gpkg.zip](https://geo2.dgterritorio.gov.pt/caop/CAOP_Continente_2025-gpkg.zip): `Continente_CAOP2025.gpkg`, camada `cont_distritos`.
- [CAOP_RAA_2025-gpkg.zip](https://geo2.dgterritorio.gov.pt/caop/CAOP_RAA_2025-gpkg.zip): `ArqAcores_GCentral_GOriental_CAOP2025.gpkg`, camada `raa_cen_ori_nuts1`, e `ArqAcores_GOcidental_CAOP2025.gpkg`, camada `raa_oci_nuts1`.
- [CAOP_RAM_2025-gpkg.zip](https://geo2.dgterritorio.gov.pt/caop/CAOP_RAM_2025-gpkg.zip): `ArqMadeira_CAOP2025.gpkg`, camada `ram_nuts1`.

A [política de dados abertos da DGT](https://www.dgterritorio.gov.pt/dados-abertos) estabelece a licença [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). Manter a identificação da DGT como proprietária, a referência à CAOP2025, o link da licença e a indicação das adaptações. A página e os metadados do SVG incluem essa atribuição. A licença diz respeito à geografia; os valores eleitorais são inventados para este protótipo.

O repositório solicitado, [nmota/caop_GeoJSON](https://github.com/nmota/caop_GeoJSON), foi consultado e os seus ficheiros foram descarregados e inspeccionados temporariamente, na revisão `a13791dd9639304a9f033789b391420ee6684afd` (30 de Maio de 2025). Declara origem no WFS da DGT e os CRS EPSG:3763, 5014, 5015 e 5016. Não contém um ficheiro de licença e não identifica inequivocamente a edição CAOP das geometrias. Por isso, o SVG final utiliza exclusivamente os GeoPackages oficiais com versão conhecida.

A consulta da API OGC da DGT identificou a CAOP2025, mas a resposta de todos os distritos veio truncada e uma consulta NUTS devolveu HTTP 502. As descargas directas dos três ZIP oficiais foram bem-sucedidas; nenhuma geometria truncada foi usada.

SHA-256 dos ZIP usados, para identificar exactamente as entradas:

```text
Continente: 87cd67f4b1fbadf23d9324e6fb231ff05531e4db347af36ccc7c6cbabe3ecd1d
Açores:    b0e3b4fe5544647eb4593e0222c6430fae7e50c97f953d8ceae10707c4df9dcf
Madeira:   ae568ca2006e91205601309ff46bc8ae0cc73236165f095f8aa99a5b9a17e5d6
```

## Preparação do SVG

Foram usados Python 3.13, SQLite da biblioteca padrão, Shapely 2.2 e pyproj 3.8, apenas em armazenamento temporário, fora do repositório. Não é necessário executar essas ferramentas para publicar ou usar o site.

1. Ler as geometrias WKB das camadas GeoPackage, removendo o cabeçalho e envelope GeoPackage e verificando o `srs_id` em `gpkg_geometry_columns`.
2. No continente, conservar a projecção métrica oficial **EPSG:3763, ETRS89 / PT-TM06**. Simplificar os 18 distritos em conjunto com `shapely.coverage_simplify(..., 200, simplify_boundary=True)`, em metros. A cobertura é válida antes e depois; os limites partilhados permanecem coincidentes. A maior alteração de área de um distrito foi inferior a 0,026%.
3. Nos Açores, converter as geometrias do grupo ocidental de **EPSG:5014, PTRA08 / UTM 25N**, e as dos grupos central e oriental de **EPSG:5015, PTRA08 / UTM 26N**, para **EPSG:4326** com `Transformer.from_crs(..., always_xy=True)`. Reprojectar ambas para uma projecção azimutal equivalente local: `+proj=laea +lat_0=38.5 +lon_0=-28 +datum=WGS84 +units=m +no_defs`. Só então agregar com união geométrica. A operação PTRA08 → WGS84 usada pelo PROJ indica precisão de 1 metro.
4. Na Madeira, converter **EPSG:5016, PTRA08 / UTM 28N** para EPSG:4326 e depois para `+proj=laea +lat_0=32.7 +lon_0=-16.9 +datum=WGS84 +units=m +no_defs`. Usar o limite NUTS I regional, que inclui Madeira, Porto Santo, Desertas e Selvagens. Separar as Selvagens apenas para o enquadramento visual (latitude inferior a 31°), conservando o mesmo identificador eleitoral.
5. Simplificar os Açores com tolerância de 80 metros, Madeira/Porto Santo/Desertas com 60 metros e Selvagens com 20 metros, usando `preserve_topology=True`. O número de componentes geográficos mantém-se após simplificação: 10 nos Açores (incluindo as nove ilhas principais e um componente menor) e 485 na Madeira (incluindo pequenos ilhéus e rochedos).
6. Ajustar os limites métricos a rectângulos SVG mantendo a proporção de cada enquadramento e invertendo o eixo vertical. O `viewBox` é `0 0 400 945`: continente em cima, Açores e Madeira em enquadramentos menores abaixo. As escalas são distintas, tal como informa a página; as ilhas dos Açores mantêm a sua disposição relativa.
7. Serializar os anéis como caminhos SVG com `fill-rule="evenodd"` e coordenadas com duas casas decimais. Remover pontos consecutivos coincidentes após arredondamento e anéis que não chegam a ter três pontos distintos nessa resolução. São limites oficiais simplificados, sem desenho manual de polígonos.

Cada círculo é um único `<g id="mapa-teste-IDENTIFICADOR" data-region="IDENTIFICADOR">`; os caminhos interiores, incluindo todas as ilhas e os dois enquadramentos da Madeira, herdam o mesmo valor e estado de selecção. Não existem círculos Europa ou Fora da Europa.

Para regenerar, descarregar os mesmos ZIP numa pasta temporária, instalar Shapely/pyproj nessa pasta e repetir estes passos. Para uma nova versão CAOP, verificar novamente camadas, CRS e licença antes de substituir o SVG. Manter os identificadores abaixo e actualizar a atribuição. Os ficheiros brutos, scripts de preparação, bibliotecas, caches e capturas de teste ficam fora do repositório.

## Identificadores

Os identificadores são independentes dos nomes apresentados e ligam `data-region` no SVG às chaves de `regions` e `values` no JSON. `geography_code` serve apenas para documentar a correspondência com a fonte.

| Código da fonte | Identificador | Círculo |
| --- | --- | --- |
| 01 | `aveiro` | Aveiro |
| 02 | `beja` | Beja |
| 03 | `braga` | Braga |
| 04 | `braganca` | Bragança |
| 05 | `castelo-branco` | Castelo Branco |
| 06 | `coimbra` | Coimbra |
| 07 | `evora` | Évora |
| 08 | `faro` | Faro |
| 09 | `guarda` | Guarda |
| 10 | `leiria` | Leiria |
| 11 | `lisboa` | Lisboa |
| 12 | `portalegre` | Portalegre |
| 13 | `porto` | Porto |
| 14 | `santarem` | Santarém |
| 15 | `setubal` | Setúbal |
| 16 | `viana-do-castelo` | Viana do Castelo |
| 17 | `vila-real` | Vila Real |
| 18 | `viseu` | Viseu |
| 2 (NUTS I, PT2) | `acores` | Região Autónoma dos Açores |
| 3 (NUTS I, PT3) | `madeira` | Região Autónoma da Madeira |

## Dados e actualizações

O JSON contém `schema_version: 1`, `demo: true`, um aviso explícito, os anos em `years`, as definições em `metrics`, os nomes em `regions` e os números em `values[ano][identificador][métrica]`. Estão guardados **160 valores explícitos**: 20 círculos × quatro anos (2019, 2022, 2024 e 2025) × dois indicadores. Não há números aleatórios nem cálculos a partir de eleições reais.

Exemplo real do ficheiro, ainda com valores fictícios:

```json
{
  "2025": {
    "lisboa": {
      "wasted_votes_pct": 15.2,
      "effective_threshold_pct": 2.1
    }
  }
}
```

Os números representam pontos percentuais: `15.2` aparece como `15,2%` (com o espaçamento definido por `Intl.NumberFormat('pt-PT')`), nunca como 1520%. `null`, uma chave ausente ou um número inválido recebem cinzento e «Sem dados disponíveis». Zero é um valor válido.

Cada métrica tem `label`, `unit: "percent"`, `domain` e **cinco limites crescentes em `breaks`**, que definem os seis tons verde/teal. Estes limites são iguais em todos os anos. O limite inferior pertence ao intervalo; a primeira e a última classe são abertas, para também representar valores futuros fora do domínio sugerido. As percentagens válidas situam-se entre 0 e 100.

- Votos desperdiçados: domínio sugerido 0–60%; limites 10, 20, 30, 40, 50.
- Limiar efectivo: domínio sugerido 0–30%; limites 5, 10, 15, 20, 25.

Para **actualizar valores**, editar as entradas de `values` mantendo as chaves dos círculos e das métricas. Geografia e valores são independentes.

Para **acrescentar um ano**, juntar a sua chave, por exemplo `"2028"`, ao fim de `years`, e criar `values["2028"]` com os 20 círculos e todas as métricas. A página escolhe inicialmente o último ano da lista.

Para **acrescentar uma métrica percentual**, criar uma chave estável em `metrics`, atribuir o nome português, `unit: "percent"`, um domínio entre 0 e 100 e cinco limites estritamente crescentes dentro dele. Preencher essa chave em cada círculo de cada ano. Os controlos e a legenda são gerados automaticamente; não é necessário alterar o JavaScript ou o SVG. Este protótipo suporta indicadores em percentagem e seis classes de cor.

Para **usar dados reais no futuro**, substituir os valores e respectivas descrições/proveniência no JSON, marcar `demo: false` apenas depois de os verificar e actualizar os textos de apresentação da página que referem dados fictícios. O motor JavaScript e o SVG podem manter-se. Até essa revisão, conservar o aviso «PROTÓTIPO: DADOS FICTÍCIOS».

## Validação e limites

Verificações efectuadas com ferramentas temporárias:

- Correspondência exacta entre os 20 identificadores SVG/JSON, todos os 18 distritos e os dois círculos regionais; cobertura completa dos 160 valores.
- Todas as oito combinações de ano/indicador: cores dos 20 círculos, valores e etiquetas, percentagens portuguesas e legenda constante entre anos.
- Rato: passagem do ponteiro e clique nos 20 círculos; clique nas nove ilhas principais dos Açores com o mesmo círculo seleccionado.
- Teclado: Tab percorre os 20 círculos; Enter e Espaço seleccionam; a lista de círculos funciona; a selecção mantém-se ao mudar ano/indicador e o painel actualiza-se.
- Edge/Chromium com toque emulado: toques em círculos continentais e nos dois arquipélagos, listas e mudanças de indicador/ano; larguras de 390 e 320 pixels sem transbordo horizontal. Não houve teste num telemóvel físico nem auditoria com leitor de ecrã.
- Testes com respostas JSON temporárias: `null`, valor ausente, ano ausente, zero, identificadores incompatíveis e erro HTTP. Os cenários de ausência usam a cor neutra; falhas de carregamento mostram uma mensagem e mantêm os controlos desactivados.
- Adição de um ano e de uma métrica alterando apenas uma resposta JSON de teste; recursos com `relative_url` sob `/subsite`.
- Renderização alternativa Liquid/Markdown das 15 páginas com front matter; comparação dos menus antes/depois, incluindo desktop, mobile e rodapé; ausência do protótipo nos links da homepage; meta robots exclusiva desta página.
- Os dois gráficos existentes em `proposta.html` carregaram e responderam às mudanças de ano e modo, sem erros JavaScript. O script e os estilos do mapa não são carregados nessa página nem na homepage.
- Verificação da sintaxe JavaScript com `node --check`; confirmação de que nenhum Markdown preexistente foi alterado; `git diff --check` sem erros.

**Não foi executado um build Jekyll completo:** Ruby, Bundler e Jekyll não estão disponíveis neste ambiente, e o checkout não tem `_config.yml`. A renderização alternativa não substitui o build real do GitHub Pages. Antes de publicar, o responsável pode executar `bundle exec jekyll build` num ambiente com as dependências do `Gemfile`.

O SVG tem aproximadamente **231 kB** (230 624 bytes; cerca de 81 kB com gzip, se o servidor usar essa compressão) e o JSON cerca de **11 kB**. Não é carregada geometria GIS bruta pelo navegador. A simplificação e o arredondamento destinam-se a visualização estatística, não a medições cartográficas. Ilhas pequenas podem ser seleccionadas pela lista, sem exigir zoom.
