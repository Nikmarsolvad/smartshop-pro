// --- LOGIQUE DE ZOOM SPÉCIFIQUE ---
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Zoom pour téléphone (plus grand pour la lisibilité)
    document.body.style.zoom = "80%"; 
} else {
    // Zoom pour PC (ton réglage actuel)
    document.body.style.zoom = "96%";
}

const navBar = document.getElementById('category-bar');
const container = document.getElementById('liste-produits');

let itemsLoaded = 0;
const step = 40; 
let currentProducts = [];
let isLoading = false;
let isDataShuffled = false; // Pour ne mélanger qu'une seule fois

// Fonction de mélange rapide (Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function buildMenu() {
    if (typeof valisesData === 'undefined') { setTimeout(buildMenu, 100); return; }
    let html = "";
    Object.entries(valisesData).forEach(([name, subs]) => {
        html += `<div class="valise-group"><span class="valise-title">${name}</span><div class="submenu">${subs.map(c => `<div onclick="filterBy('${c.nom}')" class="flex flex-col items-center"><div class="cat-photo-round"><img src="${c.img}"></div><span class="cat-label">${c.nom}</span></div>`).join('')}</div></div>`;
    });
    navBar.insertAdjacentHTML('beforeend', html);
}

function appendProducts() {
    if (isLoading || itemsLoaded >= currentProducts.length) return;
    isLoading = true;

    const nextBatch = currentProducts.slice(itemsLoaded, itemsLoaded + step);
    const html = nextBatch.map(p => {
        const ratingMatch = p.ratingText ? p.ratingText.match(/[\d,.]+/) : null;
        const ratingNum = ratingMatch ? parseFloat(ratingMatch[0].replace(',', '.')) : 0;
        const starPercentage = (ratingNum / 5) * 100;

        let oldPriceHtml = (p.oldPrice && parseFloat(p.oldPrice) > 0) 
            ? `<span class="text-red-500 line-through text-[11px] font-black">${parseFloat(p.oldPrice).toFixed(2)}€</span>` 
            : "";

        let descPure = (p.description || "")
            .replace(/^(Le |La |Ce |Cet |Cette |C'est |Cest )/i, "");
        descPure = descPure.charAt(0).toUpperCase() + descPure.slice(1);

        return `
        <div class="product-card" style="display: flex; flex-direction: column; justify-content: space-between; background: white !important;">
            <div>
                <a href="${p.link}" target="_blank" class="img-container">
                    <img src="${p.image}" alt="${p.name}" loading="lazy">
                </a>
                <div class="flex items-center gap-2 mb-1">
                    <div class="stars-outer"><div class="stars-inner" style="width: ${starPercentage}%"></div></div>
                    <span class="text-[10px] text-slate-400 font-bold">${ratingNum}</span>
                </div>
                <h3 class="product-title" style="font-weight: 900 !important; color: #000 !important; font-size: 13px !important; margin-bottom: 8px; line-height: 1.3; height: 34px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; text-overflow: ellipsis;">
                    ${p.name}
                </h3>
                <div style="margin: 5px 0 10px 0; height: 60px; overflow: hidden;">
                    <p style="font-size: 11.5px; color: #334155; line-height: 1.4; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; font-weight: 500;">
                        ${descPure}
                    </p>
                </div>
            </div>
            <div class="pt-3 border-t border-slate-100 flex justify-between items-center">
                <div>${oldPriceHtml}<div class="text-xl font-black text-red-600 leading-none">${p.price.toFixed(2)}€</div></div>
                <a href="${p.link}" target="_blank" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-colors">ACHETER</a>
            </div>
        </div>`;
    }).join('');

    container.insertAdjacentHTML('beforeend', html);
    itemsLoaded += step;
    
    setTimeout(() => { isLoading = false; }, 50);
}

window.renderProducts = (cat = 'Tous', search = '') => {
    if (typeof products === 'undefined') { setTimeout(() => renderProducts(cat, search), 100); return; }
    
    container.innerHTML = ""; 
    itemsLoaded = 0;
    
    let filtered = products.filter(p => (cat === 'Tous' || p.category === cat) && p.name.toLowerCase().includes(search.toLowerCase()));

    // Mélange unique pour l'accueil
    if (cat === 'Tous' && search === '' && !isDataShuffled) {
        currentProducts = shuffleArray([...filtered]);
        isDataShuffled = true; 
    } else {
        currentProducts = filtered;
    }
    
    appendProducts();
};

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 1500) {
        appendProducts();
    }
});

window.filterBy = (n) => { 
    isDataShuffled = false;
    window.scrollTo(0,0); 
    renderProducts(n, document.getElementById('search').value); 
};

document.getElementById('search').oninput = (e) => renderProducts('Tous', e.target.value);

buildMenu();
renderProducts();
