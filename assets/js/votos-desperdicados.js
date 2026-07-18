function render() {
        const yearData = database[activeYear];
        if (!yearData || yearData.length === 0) {
            container.innerHTML = `<p class="text-xs text-amber-600 text-center py-4">⚠️ Dados territoriais indisponíveis para o ano ${activeYear}.</p>`;
            return;
        }

        // Inverte completamente a ordem para começar em Portalegre e acabar nos Açores
        const reversedData = [...yearData].reverse();

        // 1. Encontrar o valor máximo para criar a escala correta da barra
        let maxVal = 0;
        reversedData.forEach(item => {
            const pctDhondt = (item.dhondt / item.valid) * 100;
            const pctProposta = (item.proposta / item.valid) * 100;

            if (activeDisplay === "absolute") {
                const localMax = Math.max(item.dhondt, item.proposta);
                if (localMax > maxVal) maxVal = localMax;
            } else {
                const localMax = Math.max(pctDhondt, pctProposta);
                if (localMax > maxVal) maxVal = localMax;
            }
        });

        container.innerHTML = "";

        // 2. Desenhar as barras com a nova ordem invertida
        reversedData.forEach(item => {
            const pctDhondt = (item.dhondt / item.valid) * 100;
            const pctProposta = (item.proposta / item.valid) * 100;

            let widthDhondt = 0;
            let widthProposta = 0;
            let labelDhondt = "";
            let labelProposta = "";

            if (activeDisplay === "absolute") {
                widthDhondt = maxVal > 0 ? (item.dhondt / maxVal) * 100 : 0;
                widthProposta = maxVal > 0 ? (item.proposta / maxVal) * 100 : 0;
                labelDhondt = `${item.dhondt.toLocaleString('pt-PT')} <span class="text-[10px] text-slate-400 font-normal">votos</span>`;
                labelProposta = `${item.proposta.toLocaleString('pt-PT')} <span class="text-[10px] text-slate-400 font-normal">votos</span>`;
            } else {
                widthDhondt = maxVal > 0 ? (pctDhondt / maxVal) * 100 : 0;
                widthProposta = maxVal > 0 ? (pctProposta / maxVal) * 100 : 0;
                labelDhondt = `${pctDhondt.toFixed(1)}%`;
                labelProposta = `${pctProposta.toFixed(1)}%`;
            }

            const block = document.createElement("div");
            block.className = "border-b border-slate-100 pb-3 last:border-0 block w-full";

            block.innerHTML = `
                <div class="text-sm font-bold text-brand-navy mb-1.5 block w-full">${item.district}</div>
                <div class="space-y-1.5 w-full block">
                    <div class="flex items-center gap-3 w-full">
                        <div class="flex-grow bg-slate-100 rounded h-4 overflow-hidden border border-slate-200/50 relative">
                            <div class="h-full bg-blue-600 transition-all duration-500 ease-out shadow-inner" style="width: ${widthDhondt}%"></div>
                        </div>
                        <span class="text-xs font-mono font-bold text-slate-600 w-24 shrink-0 text-right inline-block">
                            ${labelDhondt}
                        </span>
                    </div>
                    <div class="flex items-center gap-3 w-full">
                        <div class="flex-grow bg-slate-100 rounded h-4 overflow-hidden border border-slate-200/50 relative">
                            <div class="h-full bg-red-500 transition-all duration-500 ease-out shadow-inner" style="width: ${widthProposta}%"></div>
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
