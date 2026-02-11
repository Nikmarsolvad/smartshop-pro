// --- CONFIGURATION ZOOM ET GRILLE ÉQUILIBRÉE ---
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.style.zoom = "50%"; 
    const styleMobile = document.createElement('style');
    styleMobile.innerHTML = `
        #liste-produits {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important; 
            gap: 12px !important;
            padding: 10px !important;
            width: 100% !important;
            box-sizing: border-box !important;
            grid-auto-flow: row !important;
        }
        .product-card { 
            background: white !important;
            border-radius: 25px !important; 
            padding: 20px !important; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.08) !important;
            min-width: 0 !important; 
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
        }
        .img-container { 
            height: 130px !important; 
            display: flex !important; 
            align-items: center !important; 
            justify-content: center !important; 
            overflow: hidden !important;
        }
    `;
    document.head.appendChild(styleMobile);
} else {
    document.body.style.zoom = "96%";
    const stylePC = document.createElement('style');
    stylePC.innerHTML = `
        #liste-produits {
            display: grid !important;
            grid-template-columns: repeat(5, 1fr) !important; 
            gap: 25px !important;
            padding: 30px !important;
            width: 98% !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
        }
        .product-card {
            min-width: 0 !important;
            width: 100% !important;
            min-height: 500px !important;
            transition: all 0.3s ease !important;
            display: flex !important;
            flex-direction: column !important;
            background: white !important;
            border-radius: 25px !important;
            padding: 20px !important;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08) !important;
        }
        .img-container {
            height: 200px !important;
            margin-bottom: 10px !important;
            flex-shrink: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            overflow: hidden !important;
        }
        .product-card:hover {
            transform: translateY(-8px) !important;
            box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important;
        }
        
        .valise-title { 
            font-size: 18px !important; 
            color: #ffffff !important; 
            font-weight: 900 !important;
            text-transform: uppercase !important;
        }
        .cat-label { 
            font-size: 13px !important; 
            color: #ffffff !important; 
            font-weight: 700 !important; 
            margin-top: 5px !important;
        }

        #search {
            width: 400px !important;
            background-color: #232f3e !important;
            color: #ffffff !important;
            border: 1px solid #3a4553 !important;
            padding: 12px 20px !important;
            border-radius: 8px !important;
            font-size: 18px !important;
            font-weight: 600 !important;
            outline: none !important;
        }
    `;
    document.head.appendChild(stylePC);
}

const extraStyle = document.createElement('style');
extraStyle.innerHTML = `
    .img-container img {
        transition: transform 0.4s ease !important;
        max-width: 100% !important;
        max-height: 100% !important;
        object-fit: contain !important;
    }
    .stars-outer { font-size: 12px; }
`;
document.head.appendChild(extraStyle);

const navBar = document.getElementById('category-bar');
const container = document.getElementById('liste-produits');

let itemsLoaded = 0;
const step = 40; 
let currentProducts = [];
let isLoading = false;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function buildMenu() {
    if (typeof valisesData === 'undefined') { setTimeout(buildMenu, 100); return; }
    let html = `
    <div class="valise-group">
        <span class="valise-title" onclick="renderProducts('Tous')" style="cursor:pointer">ACCUEIL</span>
    </div>`;
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
    navBar.innerHTML = html;
}

function appendProducts() {
    if (isLoading || itemsLoaded >= currentProducts.length) return;
    isLoading = true;

    const nextBatch = currentProducts.slice(itemsLoaded, itemsLoaded + step);
    const html = nextBatch.map(p => {
        const ratingMatch = p.ratingText ? p.ratingText.match(/[0-9,.]+/) : null;
        const ratingNum = ratingMatch ? parseFloat(ratingMatch[0].replace(',', '.')) : 0;
        const starPercentage = (ratingNum / 5) * 100;

        let oldPriceHtml = (p.oldPrice && parseFloat(p.oldPrice) > 0) 
            ? `<span class="text-red-500 line-through text-[12px] font-bold">${parseFloat(p.oldPrice).toFixed(2)}€</span>` 
            : `<span style="visibility:hidden; font-size:12px;">0.00€</span>`;

        return `
        <div class="product-card">
            <a href="${p.link}" target="_blank" class="img-container">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </a>
            <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="margin-top: 10px;">
                    <div class="flex items-center gap-1 mb-1">
                        <div class="stars-outer"><div class="stars-inner" style="width: ${starPercentage}%"></div></div>
                    </div>
                    <h3 class="product-title" style="font-weight: 900 !important; color: #0f172a !important; font-size: 16px !important; margin-bottom: 8px; line-height: 1.2; height: 38px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                        ${p.name}
                    </h3>
                    <div style="margin-bottom: 10px; height: 68px; overflow: hidden;">
                        <p style="font-size: 14px; color: #000000; line-height: 1.5; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; font-weight: 600;">
                            ${p.description || ""}
                        </p>
                    </div>
                </div>
                <div class="pt-3 border-t border-slate-100 flex flex-col">
                    ${oldPriceHtml}
                    <div class="flex justify-between items-center w-full mt-1">
                        <div class="text-2xl font-black text-red-600 leading-none">${p.price.toFixed(2)}€</div>
                        <a href="${p.link}" target="_blank" class="bg-red-600 text-white px-4 py-2 rounded-xl text-[11px] font-black uppercase">ACHETER</a>
                    </div>
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
    container.innerHTML = ""; itemsLoaded = 0;
    let filtered = products.filter(p => (cat === 'Tous' || p.category === cat) && p.name.toLowerCase().includes(search.toLowerCase()));
    if (cat === 'Tous' && search === '') {
        currentProducts = shuffleArray([...filtered]);
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
    window.scrollTo(0,0); 
    renderProducts(n, document.getElementById('search').value); 
};

document.getElementById('search').oninput = (e) => renderProducts('Tous', e.target.value);

buildMenu();
renderProducts();
