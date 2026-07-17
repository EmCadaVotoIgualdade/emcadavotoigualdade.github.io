document.addEventListener("DOMContentLoaded", () => {
    const chartElements = document.querySelectorAll('.interactive-chart[data-chart-type="custo-votos"]');
    if (chartElements.length === 0) return;

    const baseUrl = window.siteBaseUrl || "";
    const path = (baseUrl + "/assets/data/custo-votos.json").replace(/\/+/g, '/');

    fetch(path)
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .then(data => {
            chartElements.forEach(chartEl => initCustoVotosChart(chartEl, data));
        })
        .catch(() => console.error("Erro ao carregar custos de mandatos."));
});

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
                ? `0 mandatos`
                : `${seats} ${seats === 1 ? 'mandato' : 'mandatos'}`;

            row.innerHTML = `
                
                    
                        ${item.party}
                        ${mandatosBadge}
                        (${item.votos.toLocaleString('pt-PT')} votos)
                    
                    
                        ${val.toLocaleString('pt-PT')} votos/dep
                    
                
                
                    ${isZero ? 
                        (isTracejado ? 
                            `` : 
                            ``
                        ) : 
                        ``
                    }
                
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
