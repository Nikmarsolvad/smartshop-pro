document.addEventListener('DOMContentLoaded', () => {
    if (typeof products === 'undefined') return;

    const container = document.getElementById('liste-produits');
    const navBar = document.getElementById('category-bar');
    const searchInput = document.getElementById('search');
    const footerContainer = document.getElementById('main-footer');

    let currentCategory = 'Tous';

    const categoryPhotos = {
        'Tous': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200',
        'Ordinateurs portables': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200',
        'Tablettes tactiles': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200',
        'Ordinateurs de bureau & écrans': 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=200',
        'Stockage': 'https://images.pexels.com/photos/3563627/pexels-photo-3563627.jpeg?auto=compress&cs=tinysrgb&w=200',
        'Réseaux': 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=200',
        'Composants PC': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200',
        'Logiciels': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200',
        'Serveurs': 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=200',
        'Smartphone': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200',
        'Accessoires': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200'
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
            <button onclick="filterBy('${cat}')" class="flex flex-col items-center min-w-[100px] transition-all ${currentCategory === cat ? 'active-cat' : 'opacity-60 hover:opacity-100'}">
                <img src="${categoryPhotos[cat] || categoryPhotos['Tous']}" class="cat-photo shadow-lg" onerror="this.src='https://via.placeholder.com/200?text=Tech'">
                <span class="cat-text" style="font-size: 9px; margin-top: 8px; font-weight: 800; color: white; text-align: center;">${cat}</span>
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

            const note = parseFloat(p.ratingText?.replace(',', '.') || "5");
            const stars = Array(5).fill(0).map((_, i) => 
                `<i class="fa-solid fa-star ${i < Math.floor(note) ? 'text-yellow-400' : 'text-slate-200'} text-[10px]"></i>`
            ).join('');
            
            return `
            <div class="bg-white p-5 rounded-[2.5rem] flex flex-col h-full relative group hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 border border-slate-100">
                ${discount}
                <div class="mb-4 bg-slate-50 rounded-[2rem] h-48 flex items-center justify-center overflow-hidden">
                    <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700">
                </div>
                <div class="flex flex-col flex-grow">
                    <div class="flex gap-1 mb-2">${stars}</div>
                    <h3 class="text-[13px] font-extrabold text-slate-900 mb-2 leading-tight overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; min-height: 34px;">${p.name}</h3>
                    <p class="text-[11px] text-slate-500 mb-4 leading-relaxed flex-grow overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; min-height: 48px;">${p.description || ''}</p>
                    <div class="mt-auto pt-3 border-t border-slate-100">
                        <div class="flex items-baseline gap-2">
                            <span class="text-xl font-black text-slate-900">${p.price.toFixed(2)}€</span>
                            ${p.oldPrice ? `<span class="text-[10px] text-red-600 line-through font-bold">${p.oldPrice.toFixed(2)}€</span>` : ''}
                        </div>
                        <a href="${p.link}" target="_blank" class="block w-full bg-red-600 text-white text-center py-3 mt-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all">Acheter sur Amazon</a>
                    </div>
                </div>
            </div>`;
        }).join('');
    };

    const renderFooter = () => {
        if (!footerContainer) return;
        footerContainer.className = "bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-white/5 mt-20";
        footerContainer.innerHTML = `
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10 text-left">
                    <div><div class="text-xl font-black text-white mb-4 uppercase italic">Smart<span class="text-red-500">Shop</span></div><p class="text-[10px]">Sélection Premium Amazon.</p></div>
                    <div><h4 class="text-white font-bold text-[10px] uppercase mb-4">Amazon</h4><p class="text-[9px] italic bg-white/5 p-3 rounded-lg">Partenaire Amazon.</p></div>
                </div>
                <div class="pt-8 border-t border-white/5 text-center"><p class="text-[9px] font-bold text-white/20">© 2026 SMARTSHOP SYSTEM</p></div>
            </div>`;
    };

    updateMenu();
    render();
    renderFooter();
    if (searchInput) searchInput.addEventListener('input', render);
});                <img src="${categoryPhotos[cat] || categoryPhotos['Tous']}" 
                     class="cat-photo shadow-lg" 
                     onerror="this.src='https://via.placeholder.com/200?text=Tech'">
                <span class="cat-text" style="font-size: 9px; margin-top: 8px; font-weight: 800; color: white; text-align: center;">${cat}</span>
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

            const note = parseFloat(p.ratingText?.replace(',', '.') || "5");
            const stars = Array(5).fill(0).map((_, i) => 
                `<i class="fa-solid fa-star ${i < Math.floor(note) ? 'text-yellow-400' : 'text-slate-200'} text-[10px]"></i>`
            ).join('');
            
            return `
            <div class="bg-white p-5 rounded-[2.5rem] flex flex-col h-full relative group hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 border border-slate-100">
                ${discount}
                <div class="mb-4 bg-slate-50 rounded-[2rem] h-48 flex items-center justify-center overflow-hidden">
                    <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700">
                </div>
                
                <div class="flex flex-col flex-grow">
                    <div class="flex gap-1 mb-2">${stars}</div>
                    <h3 class="text-[13px] font-extrabold text-slate-900 mb-2 leading-tight overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; min-height: 34px;">
                        ${p.name}
                    </h3>
                    <p class="text-[11px] text-slate-500 mb-4 leading-relaxed flex-grow overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; min-height: 48px;">
                        ${p.description || ''}
                    </p>
                    <div class="mt-auto pt-3 border-t border-slate-100">
                        <div class="flex items-baseline gap-2">
                            <span class="text-xl font-black text-slate-900">${p.price.toFixed(2)}€</span>
                            ${p.oldPrice ? `<span class="text-[10px] text-red-600 line-through font-bold">${p.oldPrice.toFixed(2)}€</span>` : ''}
                        </div>
                        <a href="${p.link}" target="_blank" class="block w-full bg-red-600 text-white text-center py-3 mt-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all">
                            Acheter sur Amazon
                        </a>
                    </div>
                </div>
            </div>`;
        }).join('');
    };

    const renderFooter = () => {
        if (!footerContainer) return;
        footerContainer.className = "bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-white/5 mt-20";
        footerContainer.innerHTML = `
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
                    <div>
                        <div class="text-xl font-black text-white mb-4 uppercase italic">Smart<span class="text-red-500">Shop</span></div>
                        <p class="text-[10px]">Sélection Premium des meilleures offres Amazon.</p>
                    </div>
                    <div>
                        <h4 class="text-white font-bold text-[10px] uppercase mb-4">Amazon</h4>
                        <p class="text-[9px] italic bg-white/5 p-3 rounded-lg">En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions requises.</p>
                    </div>
                </div>
                <div class="pt-8 border-t border-white/5 text-center">
                    <p class="text-[9px] font-bold text-white/20 uppercase tracking-widest">© 2026 SMARTSHOP SYSTEM</p>
                </div>
            </div>`;
    };

    updateMenu();
    render();
    renderFooter();
    if (searchInput) searchInput.addEventListener('input', render);
});                <img src="${categoryPhotos[cat] || categoryPhotos['Tous']}" 
                     class="cat-photo shadow-lg" 
                     onerror="this.src='https://via.placeholder.com/200?text=Tech'">
                <span class="cat-text" style="font-size: 9px; margin-top: 8px; font-weight: 800; color: white; text-align: center;">${cat}</span>
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

            const note = parseFloat(p.ratingText?.replace(',', '.') || "5");
            const stars = Array(5).fill(0).map((_, i) => 
                `<i class="fa-solid fa-star ${i < Math.floor(note) ? 'text-yellow-400' : 'text-slate-200'} text-[10px]"></i>`
            ).join('');
            
            return `
            <div class="bg-white p-5 rounded-[2.5rem] flex flex-col h-full relative group hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 border border-slate-100">
                ${discount}
                <div class="mb-4 bg-slate-50 rounded-[2rem] h-48 flex items-center justify-center overflow-hidden">
                    <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700">
                </div>
                
                <div class="flex flex-col flex-grow">
                    <div class="flex gap-1 mb-2">${stars}</div>
                    <h3 class="text-[13px] font-extrabold text-slate-900 mb-2 leading-tight overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; min-height: 34px;">
                        ${p.name}
                    </h3>
                    <p class="text-[11px] text-slate-500 mb-4 leading-relaxed flex-grow overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; min-height: 48px;">
                        ${p.description || ''}
                    </p>
                    <div class="mt-auto pt-3 border-t border-slate-100">
                        <div class="flex items-baseline gap-2">
                            <span class="text-xl font-black text-slate-900">${p.price.toFixed(2)}€</span>
                            ${p.oldPrice ? `<span class="text-[10px] text-red-600 line-through font-bold">${p.oldPrice.toFixed(2)}€</span>` : ''}
                        </div>
                        <a href="${p.link}" target="_blank" class="block w-full bg-red-600 text-white text-center py-3 mt-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all">
                            Acheter sur Amazon
                        </a>
                    </div>
                </div>
            </div>`;
        }).join('');
    };

    const renderFooter = () => {
        if (!footerContainer) return;
        footerContainer.className = "bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-white/5 mt-20";
        footerContainer.innerHTML = `
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
                    <div>
                        <div class="text-xl font-black text-white mb-4 uppercase italic">Smart<span class="text-red-500">Shop</span></div>
                        <p class="text-[10px]">Sélection Premium des meilleures offres Amazon.</p>
                    </div>
                    <div>
                        <h4 class="text-white font-bold text-[10px] uppercase mb-4">Amazon</h4>
                        <p class="text-[9px] italic bg-white/5 p-3 rounded-lg">En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions requises.</p>
                    </div>
                </div>
                <div class="pt-8 border-t border-white/5 text-center">
                    <p class="text-[9px] font-bold text-white/20 uppercase tracking-widest">© 2026 SMARTSHOP SYSTEM</p>
                </div>
            </div>`;
    };

    updateMenu();
    render();
    renderFooter();
    if (searchInput) searchInput.addEventListener('input', render);
});                <img src="${categoryPhotos[cat] || categoryPhotos['Tous']}" 
                     class="cat-photo shadow-lg" 
                     onerror="this.src='https://via.placeholder.com/200?text=Tech'">
                <span class="cat-text" style="font-size: 9px; margin-top: 8px; font-weight: 800; color: white; text-align: center;">${cat}</span>
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

            const note = parseFloat(p.ratingText?.replace(',', '.') || "5");
            const stars = Array(5).fill(0).map((_, i) => 
                `<i class="fa-solid fa-star ${i < Math.floor(note) ? 'text-yellow-400' : 'text-slate-200'} text-[10px]"></i>`
            ).join('');
            
            return `
            <div class="bg-white p-5 rounded-[2.5rem] flex flex-col h-full relative group hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 border border-slate-100">
                ${discount}
                <div class="mb-4 bg-slate-50 rounded-[2rem] h-48 flex items-center justify-center overflow-hidden">
                    <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700">
                </div>
                
                <div class="flex flex-col flex-grow">
                    <div class="flex gap-1 mb-2">${stars}</div>
                    <h3 class="text-[13px] font-extrabold text-slate-900 mb-2 leading-tight overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; min-height: 34px;">
                        ${p.name}
                    </h3>
                    <p class="text-[11px] text-slate-500 mb-4 leading-relaxed flex-grow overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; min-height: 48px;">
                        ${p.description || ''}
                    </p>
                    <div class="mt-auto pt-3 border-t border-slate-100">
                        <div class="flex items-baseline gap-2">
                            <span class="text-xl font-black text-slate-900">${p.price.toFixed(2)}€</span>
                            ${p.oldPrice ? `<span class="text-[10px] text-red-600 line-through font-bold">${p.oldPrice.toFixed(2)}€</span>` : ''}
                        </div>
                        <a href="${p.link}" target="_blank" class="block w-full bg-red-600 text-white text-center py-3 mt-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all">
                            Acheter sur Amazon
                        </a>
                    </div>
                </div>
            </div>`;
        }).join('');
    };

    const renderFooter = () => {
        if (!footerContainer) return;
        footerContainer.className = "bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-white/5 mt-20";
        footerContainer.innerHTML = `
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
                    <div>
                        <div class="text-xl font-black text-white mb-4 uppercase italic">Smart<span class="text-red-500">Shop</span></div>
                        <p class="text-[10px]">Sélection Premium des meilleures offres Amazon.</p>
                    </div>
                    <div>
                        <h4 class="text-white font-bold text-[10px] uppercase mb-4">Amazon</h4>
                        <p class="text-[9px] italic bg-white/5 p-3 rounded-lg">En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions requises.</p>
                    </div>
                </div>
                <div class="pt-8 border-t border-white/5 text-center">
                    <p class="text-[9px] font-bold text-white/20 uppercase tracking-widest">© 2026 SMARTSHOP SYSTEM</p>
                </div>
            </div>`;
    };

    updateMenu();
    render();
    renderFooter();
    if (searchInput) searchInput.addEventListener('input', render);
});        const term = (searchInput?.value || "").toLowerCase();
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
