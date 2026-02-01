document.addEventListener('DOMContentLoaded', () => {
    if (typeof products === 'undefined') return;

    const container = document.getElementById('liste-produits');
    const navBar = document.getElementById('category-bar');
    const searchInput = document.getElementById('search');

    let currentCategory = 'Tous';

    const categoryPhotos = {
        'Tous': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200',
        'Ordinateur': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200',
        'Tablette': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200',
        'Smartphone': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200',
        'Accessoires': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'
    };

    window.filterBy = (cat) => {
        currentCategory = cat;
        updateMenu();
        render();
    };

    const updateMenu = () => {
        if (!navBar) return;
        const cats = ['Tous', ...new Set(products.map(p => p.category))];
        navBar.innerHTML = cats.map(cat => `
            <button onclick="filterBy('${cat}')" class="flex flex-col items-center min-w-[90px] transition-all ${currentCategory === cat ? 'active-cat' : 'opacity-60 hover:opacity-100'}">
                <img src="${categoryPhotos[cat] || categoryPhotos['Tous']}" class="cat-photo shadow-lg">
                <span class="cat-text">${cat}</span>
            </button>
        `).join('');
    };

    const render = () => {
        if (!container) return;
        const term = (searchInput?.value || "").toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term) && (currentCategory === 'Tous' || p.category === currentCategory));

        container.innerHTML = filtered.map(p => {
            let discount = "";
            if (p.oldPrice && p.oldPrice > p.price) {
                const perc = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
                discount = `<span class="promo-badge">-${perc}%</span>`;
            }
            
            return `
            <div class="bg-white p-6 rounded-[2.5rem] flex flex-col h-full relative group hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 border border-slate-100">
                ${discount}
                <div class="mb-4 bg-slate-50 rounded-[2rem] h-48 flex items-center justify-center overflow-hidden">
                    <a href="${p.link}" target="_blank" class="w-full h-full flex items-center justify-center p-4">
                        <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700" onerror="this.src='https://via.placeholder.com/150?text=Image+Indisponible'">
                    </a>
                </div>
                
                <div class="flex flex-col flex-grow">
                    <h3 class="text-[13px] font-extrabold text-slate-900 mb-2 leading-tight min-h-[38px] line-clamp-2">${p.name}</h3>
                    
                    <p class="text-[12px] text-black mb-4 leading-relaxed line-clamp-3 font-semibold flex-grow">
                        ${p.description || ''}
                    </p>

                    <div class="mt-auto pt-3 border-t border-slate-100">
                        <div class="flex items-baseline gap-2">
                            <span class="text-xl font-black text-slate-900">${p.price.toFixed(2)}€</span>
                            ${p.oldPrice ? `<span class="text-[10px] text-red-600 line-through font-bold">${p.oldPrice.toFixed(2)}€</span>` : ''}
                        </div>
                        <a href="${p.link}" target="_blank" class="block w-full bg-red-600 text-white text-center py-3 mt-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                            Acheter
                        </a>
                    </div>
                </div>
            </div>`;
        }).join('');
    };

    updateMenu();
    render();
    if (searchInput) searchInput.addEventListener('input', render);
});
