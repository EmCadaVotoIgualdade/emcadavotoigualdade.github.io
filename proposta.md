---
layout: default
title: A Proposta
description: Uma proposta de reforma do sistema eleitoral português baseada no princípio constitucional da representação proporcional.
custom_scripts:
  - custo-votos
  - votos-desperdicados
---

# A Proposta de Reforma

Sobre o sistema eleitoral, a nossa Constituição é categórica ao estabelecer:

> **“A conversão dos votos em mandatos far-se-á de harmonia com o princípio da representação proporcional.”**
> — Constituição da República Portuguesa, Artigo 149.º, n.º 1

Este princípio basilar da nossa democracia foi detalhado de forma lapidar pelos constitucionalistas J. J. Gomes Canotilho e Vital Moreira na sua *Constituição Anotada*[[1]](#ref-1):

> *“À face da Constituição, e de acordo com o princípio democrático, o sistema eleitoral é um meio de fazer da Assembleia da República um espelho político do país e não um meio de fabricar maiorias lá onde elas não existem.”*

Este espelho cada vez distorce mais a realidade, e em 2022 aconteceram alguns casos extremos pela primeira vez:
* Um partido não está na Assembleia da República apesar de ter tido mais votos totais do que outros com esse direito;
* Um grupo parlamentar tem menos deputados do que outro que obteve menos votos;
* O limiar da maioria absoluta baixou para apenas 41% dos votos;
* Os dois maiores partidos elegem deputados com metade dos votos por mandato, face aos restantes.

Tudo isto acontece porque não é feita uma distribuição dos mandatos a nível nacional, o que origina muitos votos desperdiçados e "custos" de votos por mandato muito desproporcionais.

---

### O Custo do Voto em Portugal
Abaixo podes analisar de forma interactiva como o sistema actual inflaciona o custo de cada deputado para os partidos mais pequenos e como a nossa proposta equilibra esta balança.

{% include graph.html id="custo-deputados" type="custo-votos" %}

---

No maior debate sobre este tema, o governo apresentou em 1998 uma proposta inspirada no sistema alemão, onde António Costa explicava[[2]](#ref-2) assim dois objectivos:

1. *“a proporcionalidade é reforçada porque (...) com a criação do círculo nacional, devolve-se utilidade a todos os votos, de todos os partidos, em todo o territory nacional”*;
2. *“o eleitor ganha maior liberdade, deixa de estar limitado à escolha do partido, passando a poder escolher também o seu Deputado. O partido terá de se abrir à sociedade, terá de partilhar com os cidadãos a escolha dos seus representantes.”*

O PSD, liderado por Marcelo Rebelo de Sousa, respondia numa proposta semelhante onde *“a proporcionalidade será sempre assegurada de acordo com o resultado obtido no apuramento do voto nacional”*[[2]](#ref-2).

Apesar desses pontos democráticos, o sistema alemão é muito complexo e frágil: foi declarado inconstitucional pelo Tribunal Constitucional alemão duas vezes. Além disso, quando foi adoptado em Itália em 2001 foram logo usadas tácticas para corromper o sistema (durando apenas uma eleição), e o mesmo cenário repetiu-se na Coreia do Sul em 2020, entre outros problemas.

Assim, partilhamos os dois objectivos dessas propostas PS/PSD, mas para os concretizar propomos um sistema mais sólido e intuitivo, inspirado nos sistemas eleitorais dos países nórdicos[[3]](#ref-3), onde tem uma grande aceitação.

### 1º objectivo: proporcionalidade e igualdade de voto

A proporcionalidade será sempre assegurada ao aplicar o método de Hondt ao total dos votos nacionais, o que em 2022 resultaria num "custo" de 22 mil votos por mandato (44 mil votos davam dois mandatos, 66 mil votos davam três, etc).

Os mandatos são depois totalmente distribuídos pelos círculos actuais, de forma a reflectir o apoio de cada partido pelo país, sem centralizar o sistema com uma lista de círculo nacional.

Comparando com o sistema actual, em 2022, nenhum partido perde representação territorial, e a maioria dos círculos elege pelo menos mais um partido, aumentando a pluralidade.

Outra consequência de tratar de forma igual os votos em todo o país é que diminuem muito os votos "desperdiçados" que não contribuem para o partido eleger.

**Votos "desperdiçados" por círculo eleitoral:**

{% include graph.html id="votos-desperdicados" type="votos-desperdicados" %}

### 2º objectivo: ligação entre eleitos e eleitores

Os eleitores votam num partido e, opcionalmente, nomeiam candidatos da lista. Os eleitos são os mais nomeados, em vez de serem escolhidos exclusivamente pela ordem definida pelo partido.

A possibilidade de escolher candidatos está associada a uma maior responsabilização dos eleitos, bem como a uma maior satisfação e participação dos eleitores. Esta prática é comum nos países europeus, sendo o nosso sistema e o espanhol das raras excepções.

Os detalhes de ambos os objectivos podem ser consultados [aqui](detalhes.html).

---

> 📖 **Estudo Exaustivo (Tempo de leitura: ~55 minutes)**
> Se pretendes aprofundar a discussão, analisar em detalhe o funcionamento do sistema eleitoral em países como Espanha, Reino Unido, Alemanha, Países Baixos e Dinamarca, e consultar toda a fundamentação técnica e histórica, podes ler o nosso [Documento Completo](https://docs.google.com/document/d/1NxZX4EXWl3y77qbcE1pW2d-RBM3WFRZ90aI6AAQplYw/edit?usp=sharing).

---

<div class="my-8 space-y-4">
    <p class="font-medium text-slate-700">Visualização da distribuição dos mandatos pelos círculos para os resultados de 2022:</p>
    <div class="relative pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-sm border border-slate-200">
        <iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/Ohk58KunGIA" title="Visualização da distribuição dos mandatos pelos círculos" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>

---

<div class="text-xs text-slate-500 space-y-3 font-mono">
  <p class="font-bold text-slate-700">REFERÊNCIAS:</p>
  <p id="ref-1"><strong>[1]</strong> “Constituição da República Portuguesa anotada”, J.J. Gomes Canotilho, Vital Moreira, Coimbra Editora, 2007.</p>
  <p id="ref-2"><strong>[2]</strong> Diário da Assembleia da República - Debate Parlamentar sobre Reforma Eleitoral de 23 de abril de 1998 (Disponível em <a href="https://debates.parlamento.pt/catalogo/r3/dar/01/07/03/061/1998-04-23?sft=true" target="_blank">debates.parlamento.pt</a>).</p>
  <p id="ref-3"><strong>[3]</strong> Ministry of the Interior and Social Affairs of Denmark - "The Parliamentary Electoral System in Denmark" (Disponível para consulta em <a href="https://elections.im.dk/media/15737/parliamentary-system-dk.pdf" target="_blank">elections.im.dk</a>).</p>
</div>
