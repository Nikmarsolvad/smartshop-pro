// --- LOGIQUE DE ZOOM ET GRILLE 3 COLONNES MOBILE ---
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Zoom à 60% pour le téléphone comme demandé
    document.body.style.zoom = "50%"; 
    
    // On force l'affichage sur 3 colonnes pour le mobile
    const styleMobile = document.createElement('style');
    styleMobile.innerHTML = `
        #liste-produits {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important; /* 3 COLONNES ICI */
            gap: 8px !important;
            padding: 8px !important;
        }
        .product-card {
            border-radius: 15px !important; /* Légèrement réduit pour le 3 colonnes */
            padding: 10px !important;
        }
        .product-title {
            font-size: 11px !important; /* Texte un peu plus petit pour tenir à 3 */
        }
    `;
    document.head.appendChild(styleMobile);
} else {
    // PARAMÈTRES PC ORIGINAUX (On ne touche à rien)
    document.body.style.zoom = "96%";
}

const navBar = document.getElementById('category-bar');
const container = document.getElementById('liste-produits');

let itemsLoaded = 0;
const step = 40; 
let currentProducts = [];
let isLoading = false;
let isDataShuffled = false;

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
        html += `
        <div class="valise-group">
            <span class="valise-title">${name}</span>
            <div class="submenu">
                ${subs.map(c => `
                    <div onclick="filterBy('${c.nom}')" class="flex flex-col items-center">
                        <div class="cat-photo-round">
                            <img src="${c.img}">
                        </div>
                        <span class="cat-label">${c.nom}</span>
                    </div>`).join('')}
            </div>
        </div>`;
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
            ? `<span class="text-red-500 line-through text-[9px] font-black">${parseFloat(p.oldPrice).toFixed(2)}€</span>` 
            : "";

        let descPure = (p.description || "").replace(/^(Le |La |Ce |Cet |Cette |C'est |Cest )/i, "");
        descPure = descPure.charAt(0).toUpperCase() + descPure.slice(1);

        return `
        <div class="product-card" style="display: flex; flex-direction: column; justify-content: space-between; background: white !important; border-radius: 25px; padding: 15px; border: 1px solid #eee;">
            <div>
                <a href="${p.link}" target="_blank" class="img-container" style="height: 100px; display: flex; align-items: center; justify-content: center;">
                    <img src="${p.image}" alt="${p.name}" loading="lazy" style="max-height: 100%; width: auto;">
                </a>
                <div class="flex items-center gap-1 mb-1">
                    <div class="stars-outer" style="font-size: 8px;"><div class="stars-inner" style="width: ${starPercentage}%"></div></div>
                </div>
                <h3 class="product-title" style="font-weight: 900 !important; color: #000 !important; font-size: 12px !important; margin-bottom: 4px; line-height: 1.2; height: 28px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                    ${p.name}
                </h3>
                <div style="margin: 2px 0 5px 0; height: 45px; overflow: hidden;">
                    <p style="font-size: 10px; color: #334155; line-height: 1.3; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                        ${descPure}
                    </p>
                </div>
            </div>
            <div class="pt-2 border-t border-slate-100 flex flex-col items-start">
                ${oldPriceHtml}
                <div class="flex justify-between items-center w-full">
                    <div class="text-lg font-black text-red-600 leading-none">${p.price.toFixed(2)}€</div>
                    <a href="${p.link}" target="_blank" class="bg-red-600 text-white px-2 py-1 rounded-lg text-[8px] font-black uppercase">VOIR</a>
                </div>
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
