document.addEventListener("DOMContentLoaded", () => {
    const chartElements = document.querySelectorAll('.interactive-chart[data-chart-type="votos-desperdicados"]');
    if (chartElements.length === 0) return;

    const baseUrl = window.siteBaseUrl || "";
    const path = (baseUrl + "/assets/data/votos-desperdicados.json").replace(/\/+/g, '/');

    fetch(path)
        .then(res => { if (!res.ok) throw new Error("Status: " + res.status); return res.json(); })
        .then(data => {
            chartElements.forEach(chartEl => initVotosDesperdicadosChart(chartEl, data));
        })
        .catch(err => {
            console.error("Erro no votos-desperdicados:", err);
            chartElements.forEach(chartEl => {
                const container = chartEl.querySelector(".chart-container");
                if (container) {
                    container.innerHTML = `<p class="text-xs text-red-500 text-center py-4">⚠️ Falha ao carregar o ficheiro de dados territoriais.</p>`;
                }
            });
        });
});

function initVotosDesperdicadosChart(chartElement, database) {
    const container = chartElement.querySelector(".chart-container");
    if (!container) return;

    let activeYear = "2022";
    let activeDisplay = "absolute"; // Pode ser 'absolute' ou 'percent'

    function render() {
        const yearData = database[activeYear];
        if (!yearData || yearData.length === 0) {
            container.innerHTML = `<p class="text-xs text-amber-600 text-center py-4">⚠️ Dados territoriais indisponíveis para o ano ${activeYear}.</p>`;
            return;
        }

        container.innerHTML = "";

        yearData.forEach(item => {
            const pctDhondt = (item.dhondt / item.valid) * 100;
            const pctProposta = (item.proposta / item.valid) * 100;

            const block = document.createElement("div");
            block.className = "border-b border-slate-100 pb-3 last:border-0 block w-full";

            // Decide o formato do texto de acordo com o botão ativo
            const labelDhondt = activeDisplay === "absolute" 
                ? `${item.dhondt.toLocaleString('pt-PT')} <span class="text-[10px] text-slate-400 font-normal">votos</span>`
                : `${pctDhondt.toFixed(1)}%`;

            const labelProposta = activeDisplay === "absolute" 
                ? `${item.proposta.toLocaleString('pt-PT')} <span class="text-[10px] text-slate-400 font-normal">votos</span>`
                : `${pctProposta.toFixed(1)}%`;

            block.innerHTML = `
                <div class="text-sm font-bold text-brand-navy mb-1.5 block w-full">${item.district}</div>
                <div class="space-y-1.5 w-full block">
                    <!-- Linha D'Hondt -->
                    <div class="flex items-center gap-3 w-full">
                        <div class="flex-grow bg-slate-100 rounded h-4 overflow-hidden border border-slate-200/50 relative">
                            <div class="h-full bg-blue-600 transition-all duration-500 ease-out shadow-inner" style="width: ${pctDhondt}%"></div>
                        </div>
                        <span class="text-xs font-mono font-bold text-slate-600 w-24 shrink-0 text-right inline-block">
                            ${labelDhondt}
                        </span>
                    </div>
                    <!-- Linha Proposta -->
                    <div class="flex items-center gap-3 w-full">
                        <div class="flex-grow bg-slate-100 rounded h-4 overflow-hidden border border-slate-200/50 relative">
                            <div class="h-full bg-red-500 transition-all duration-500 ease-out shadow-inner" style="width: ${pctProposta}%"></div>
                        </div>
                        <span class="text-xs font-mono font-bold text-slate-600 w-24 shrink-0 text-right inline-block">
                            ${labelProposta}
                        </span>
                    </div>
                </div>
            `;
            container.appendChild(block);
        });
    }

    // Eventos dos botões de Ano
    const yearButtons = chartElement.querySelectorAll(".chart-year-btn");
    yearButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            activeYear = btn.getAttribute("data-year");
            yearButtons.forEach(b => b.className = "chart-year-btn px-3 py-1.5 text-xs font-semibold rounded-md transition text-slate-600 hover:text-brand-navy");
            btn.className = "chart-year-btn px-3 py-1.5 text-xs font-semibold rounded-md transition bg-brand-navy text-white shadow-sm";
            render();
        });
    });

    // Eventos dos botões de Alternância (Absoluto vs Percentagem)
    const displayButtons = chartElement.querySelectorAll(".chart-display-btn");
    displayButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            activeDisplay = btn.getAttribute("data-display");
            displayButtons.forEach(b => b.className = "chart-display-btn px-4 py-1.5 text-xs font-semibold rounded-md transition text-slate-600 hover:text-brand-navy");
            btn.className = "chart-display-btn px-4 py-1.5 text-xs font-semibold rounded-md transition bg-brand-navy text-white shadow-sm";
            render();
        });
    });

    render();
}
