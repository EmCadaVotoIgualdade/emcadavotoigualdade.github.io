// assets/js/charts.js
document.addEventListener("DOMContentLoaded", () => {
    const chartElements = document.querySelectorAll(".interactive-chart");
    if (chartElements.length === 0) return;

    // Constrói o caminho correto de forma dinâmica baseado na raiz do site no GitHub Pages
    const baseUrl = window.siteBaseUrl || "";
    const jsonPath = (baseUrl + "/assets/data/eleicoes.json").replace(/\/+/g, '/');

    // 1. Carrega a base de dados em JSON
    fetch(jsonPath)
        .then(response => {
            if (!response.ok) throw new Error("Não foi possível carregar os dados eleitorais.");
            return response.json();
        })
        .then(data => {
            // 2. Orquestrador: Deteta o tipo de cada gráfico e ativa a função correta
            chartElements.forEach(chartEl => {
                const chartType = chartEl.getAttribute("data-chart-type");

                if (chartType === "custo-votos") {
                    initCustoVotosChart(chartEl, data);
                } 
                else if (chartType === "votos-desperdicados") {
                    // initVotosDesperdicadosChart(chartEl, data); <-- Pronto para o futuro!
                }
            });
        })
        .catch(error => {
            console.error("Erro no motor de orquestração de gráficos:", error);
        });
});

// =========================================================================
// LÓGICA ESPECÍFICA: GRÁFICO DE CUSTO DE VOTOS POR DEPUTADO
// =========================================================================
function initCustoVotosChart(chartElement, allData) {
    const container = chartElement.querySelector(".chart-container");
    if (!container) return;

    let activeYear = "2022";
    let activeMode = "real";

    function render() {
        const rawData = allData[activeYear];
        if (!rawData) return;

        const sortedData = [...rawData].sort((a, b) => b.votos - a.votos);

        let maxValOfYear = 0;
        sortedData.forEach(item => {
            const valReal = item.seatsReal > 0 ? Math.round(item.votos / item.seatsReal) : item.votos;
            const valProposta = item.seatsProposta > 0 ? Math.round(item.votos / item.seatsProposta) : item.votos;
            const localMax = Math.max(valReal, valProposta);
            if (localMax > maxValOfYear) maxValOfYear = localMax;
        });

        const electingParties = rawData.filter(p => (activeMode === "real" ? p.seatsReal : p.seatsProposta) > 0);
        const minVotesOfElecting = electingParties.length > 0 ? Math.min(...electingParties.map(p => p.votos)) : Infinity;

        container.innerHTML = "";

        sortedData.forEach(item => {
            const seats = activeMode === "real" ? item.seatsReal : item.seatsProposta;
            const val = seats > 0 ? Math.round(item.votos / seats) : item.votos;
            const percent = (val / maxValOfYear) * 100;
            const isZero = seats === 0;

            const isTracejado = isZero && activeMode === "real" && item.votos > minVotesOfElecting;

            const row = document.createElement("div");
            row.className = "space-y-1";

            let mandatosBadge = isZero 
                ? `<span class="text-[10px] font-extrabold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">0 mandatos</span>`
                : `<span class="text-[10px] font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-md">${seats} ${seats === 1 ? 'mandato' : 'mandatos'}</span>`;

            row.innerHTML = `
                <div class="flex flex-wrap justify-between items-end gap-x-2 text-sm">
                    <div class="flex items-center gap-1.5 flex-wrap">
                        <span class="font-extrabold text-brand-navy min-w-[35px] inline-block">${item.party}</span>
                        ${mandatosBadge}
                        <span class="text-[11px] text-slate-400 font-medium">(${item.votos.toLocaleString('pt-PT')} votos)</span>
                    </div>
                    <span class="font-bold text-slate-700 text-right whitespace-nowrap">
                        ${val.toLocaleString('pt-PT')} <span class="text-xs font-normal text-slate-400">votos/dep</span>
                    </span>
                </div>
                <div class="w-full bg-slate-100/70 rounded-md h-5 flex items-center overflow-hidden border border-slate-200/40 relative">
                    ${isZero ? 
                        (isTracejado ? 
                            `<div class="h-full border-t-2 border-b-2 border-r-2 border-dashed border-black ${item.color}/50 border-l-0 rounded-r transition-all duration-300 ease-out" style="width: ${percent}%"></div>` : 
                            `<div class="h-full ${item.color}/40 opacity-40 rounded-l transition-all duration-300 ease-out" style="width: ${percent}%"></div>`
                        ) : 
                        `<div class="h-full rounded-l ${item.color} transition-all duration-300 ease-out shadow-inner" style="width: ${percent}%"></div>`
                    }
                </div>
            `;
            container.appendChild(row);
        });
    }

    const yearButtons = chartElement.querySelectorAll(".chart-year-btn");
    const modeButtons = chartElement.querySelectorAll(".chart-mode-btn");

    yearButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            activeYear = btn.getAttribute("data-year");
            yearButtons.forEach(b => b.className = "chart-year-btn px-3 py-1.5 text-xs font-semibold rounded-md transition text-slate-600 hover:text-brand-navy");
            btn.className = "chart-year-btn px-3 py-1.5 text-xs font-semibold rounded-md transition bg-brand-navy text-white shadow-sm";
            render();
        });
    });

    modeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            activeMode = btn.getAttribute("data-mode");
            modeButtons.forEach(b => b.className = "chart-mode-btn px-4 py-1.5 text-xs font-semibold rounded-md transition text-slate-600 hover:text-brand-navy");
            btn.className = "chart-mode-btn px-4 py-1.5 text-xs font-semibold rounded-md transition bg-brand-navy text-white shadow-sm";
            render();
        });
    });

    render();
}
