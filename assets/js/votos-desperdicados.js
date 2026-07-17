document.addEventListener("DOMContentLoaded", () => {
    const chartElements = document.querySelectorAll('.interactive-chart[data-chart-type="votos-desperdicados"]');
    if (chartElements.length === 0) return;

    const baseUrl = window.siteBaseUrl || "";
    const path = (baseUrl + "/assets/data/votos-desperdicados.json").replace(/\/+/g, '/');

    fetch(path)
        .then(res => { 
            if (!res.ok) throw new Error("Código de resposta: " + res.status); 
            return res.json(); 
        })
        .then(data => {
            chartElements.forEach(chartEl => initVotosDesperdicadosChart(chartEl, data));
        })
        .catch(err => {
            console.error("Erro nos votos desperdiçados:", err);
            chartElements.forEach(chartEl => {
                const container = chartEl.querySelector(".chart-container");
                if (container) {
                    container.innerHTML = `<p class="text-xs text-red-500 text-center py-4">⚠️ Erro ao carregar dados territoriais. Garante que o ficheiro existe em: <strong>${path}</strong></p>`;
                }
            });
        });
});

function initVotosDesperdicadosChart(chartElement, database) {
    const container = chartElement.querySelector(".chart-container");
    if (!container) return;

    let activeYear = "2022";

    function render() {
        const yearData = database[activeYear];
        if (!yearData) {
            container.innerHTML = `<p class="text-xs text-amber-600 text-center py-4">⚠️ Dados indisponíveis para o ano ${activeYear}.</p>`;
            return;
        }

        container.innerHTML = "";

        yearData.forEach(item => {
            const pctDhondt = (item.dhondt / item.valid) * 100;
            const pctProposta = (item.proposta / item.valid) * 100;

            const block = document.createElement("div");
            block.className = "border-b border-slate-100 pb-3 last:border-0";

            block.innerHTML = `
                <div class="text-sm font-bold text-brand-navy mb-1.5">${item.district}</div>
                <div class="space-y-1.5 pl-1">
                    <!-- Linha do Sistema Atual (D'Hondt) -->
                    <div class="flex items-center gap-2">
                        <div class="flex-1 bg-slate-100 rounded h-4 overflow-hidden border border-slate-200/40 relative">
                            <div class="h-full bg-blue-600 transition-all duration-500 ease-out shadow-inner" style="width: ${pctDhondt}%"></div>
                        </div>
                        <span class="text-xs font-mono font-bold text-slate-600 w-28 shrink-0 text-right">
                            ${item.dhondt.toLocaleString('pt-PT')} <span class="text-[10px] font-normal text-slate-400">(${pctDhondt.toFixed(1)}%)</span>
                        </span>
                    </div>
                    <!-- Linha da Proposta (Pool Triangular) -->
                    <div class="flex items-center gap-2">
                        <div class="flex-1 bg-slate-100 rounded h-4 overflow-hidden border border-slate-200/40 relative">
                            <div class="h-full bg-red-500 transition-all duration-500 ease-out shadow-inner" style="width: ${pctProposta}%"></div>
                        </div>
                        <span class="text-xs font-mono font-bold text-slate-600 w-28 shrink-0 text-right">
                            ${item.proposta.toLocaleString('pt-PT')} <span class="text-[10px] font-normal text-slate-400">(${pctProposta.toFixed(1)}%)</span>
                        </span>
                    </div>
                </div>
            `;
            container.appendChild(block);
        });
    }

    const yearButtons = chartElement.querySelectorAll(".chart-year-btn");
    yearButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            activeYear = btn.getAttribute("data-year");
            yearButtons.forEach(b => b.className = "chart-year-btn px-3 py-1.5 text-xs font-semibold rounded-md transition text-slate-600 hover:text-brand-navy");
            btn.className = "chart-year-btn px-3 py-1.5 text-xs font-semibold rounded-md transition bg-brand-navy text-white shadow-sm";
            render();
        });
    });

    render();
}
