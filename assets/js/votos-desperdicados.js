document.addEventListener("DOMContentLoaded", () => {
    const chartElements = document.querySelectorAll('.interactive-chart[data-chart-type="votos-desperdicados"]');
    if (chartElements.length === 0) return;

    const baseUrl = window.siteBaseUrl || "";
    const path = (baseUrl + "/assets/data/votos-desperdicados.json").replace(/\/+/g, '/');

    fetch(path)
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .then(data => {
            chartElements.forEach(chartEl => initVotosDesperdicadosChart(chartEl, data));
        })
        .catch(() => console.error("Erro ao carregar votos desperdiçados."));
});

function initVotosDesperdicadosChart(chartElement, database) {
    const container = chartElement.querySelector(".chart-container");
    if (!container) return;

    let activeYear = "2022";

    function render() {
        const yearData = database[activeYear];
        if (!yearData) return;

        container.innerHTML = "";

        yearData.forEach(item => {
            const pctDhondt = (item.dhondt / item.valid) * 100;
            const pctProposta = (item.proposta / item.valid) * 100;

            const block = document.createElement("div");
            block.className = "border-b border-slate-100/80 pb-3 last:border-0";

            block.innerHTML = `
                ${item.district}
                
                    
                        
                            
                        
                        
                            ${item.dhondt.toLocaleString('pt-PT')} (${pctDhondt.toFixed(1)}%)
                        
                    
                    
                        
                            
                        
                        
                            ${item.proposta.toLocaleString('pt-PT')} (${pctProposta.toFixed(1)}%)
                        
                    
                
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
