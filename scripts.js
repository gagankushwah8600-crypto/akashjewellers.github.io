/* ================================
   AJ JEWELLERS – FINAL SCRIPT
   (Stable, No UI Change)
================================ */

/* BASIC CONFIG */
const whatsappNumber = "919009066685";
const siteName = "Akash Jewellers";

/* CATEGORY → FIXED SAMPLE IMAGES */
const categoryImages = {
  "Bangles": [
    "https://i.ibb.co/KxMNyPg1/IMG-20251130-WA0015.jpg",
    "https://i.ibb.co/vvPkRKY8/IMG-20251130-WA0016.jpg",
    "https://i.ibb.co/gMSx8493/IMG-20251130-WA0017.jpg"
  ],
  "Rings": [
    "https://i.ibb.co/hxnQ5Sw2/IMG-20251130-WA0034.jpg",
    "https://i.ibb.co/Nn1HKJSp/IMG-20251130-WA0035.jpg",
    "https://i.ibb.co/DfCgtSnN/IMG-20251130-WA0037.jpg"    
  ],
  "Necklace": [
    "https://i.ibb.co/PZ2vHjWh/IMG-20251130-WA0011.jpg",
    "https://i.ibb.co/Wvncttxt/IMG-20251130-WA0012.jpg",
    "https://i.ibb.co/vnCr8cK/IMG-20251130-WA0013.jpg"
  ],
  "Bridal Set": [
    "https://i.ibb.co/s9S0WCht/Whats-App-Image-2025-11-30-at-18-03-20-fd7f89ff.jpg",
    "https://i.ibb.co/gZvW2fq0/Whats-App-Image-2025-11-30-at-18-16-38-af36a361.jpg",
    
  ],
  "Kids Jewellery": [
    "https://i.ibb.co/cXQCGgM0/IMG-20251130-WA0030.jpg",
    "https://i.ibb.co/3m0LCdfy/IMG-20251130-WA0032.jpg"
  ],
  "Mangalsutra": [
    "https://i.ibb.co/BVHqzLfC/IMG-20251130-WA0020.jpg",
    "https://i.ibb.co/0pkyr6SV/IMG-20251130-WA0021.jpg",
    "https://i.ibb.co/HTycdZ76/IMG-20251130-WA0075.jpg",
    "https://i.ibb.co/RTskCKd7/IMG-20251130-WA0078.jpg",
    "https://i.ibb.co/PRL6x10/IMG-20251130-WA0080.jpg",
    "https://i.ibb.co/dwM4fC9z/IMG-20251130-WA0081.jpg",
    "https://i.ibb.co/20jQd75W/Whats-App-Image-2025-11-30-at-18-03-20-57f035ce.jpg",
    
  ],
  "Bracelets": [
    "https://i.ibb.co/fG8dRJtx/Whats-App-Image-2025-11-30-at-17-52-09-744922ac.jpg",
    "https://i.ibb.co/Jjx4p72P/Whats-App-Image-2025-11-30-at-17-52-10-18ec51ee.jpg"
  ],
  "Earrings": [
    "https://i.ibb.co/G3Vx42rM/Whats-App-Image-2025-11-30-at-17-54-11-78da8e43.jpg",
    "https://i.ibb.co/fYDLPbX6/Whats-App-Image-2025-11-30-at-17-54-11-fd845db6.jpg"
  ],
  "Silver items": [
    "https://i.ibb.co/276fLHmk/Whats-App-Image-2025-11-30-at-17-56-41-43d69eff.jpg",
    "https://i.ibb.co/0ypkc5y3/Whats-App-Image-2025-11-30-at-17-57-15-229f8742.jpg"
  ]
};

/* PRICE GENERATOR */
function generatePrice(cat) {
  switch (cat) {
    case "Bangles": return "₹45,000";
    case "Rings": return "₹12,500";
    case "Necklace": return "₹85,000";
    case "Bridal Set": return "₹1,50,000";
    case "Kids Jewellery": return "₹2,500";
    case "Mangalsutra": return "₹18,000";
    case "Bracelets": return "₹9,500";
    case "Earrings": return "₹6,000";
    case "Silver items": return "₹1,200";
    default: return "₹5,000";
  }
}

/* BUILD PRODUCTS (SEPARATE IMAGES) */
let products = [];
let id = 1;

Object.keys(categoryImages).forEach(cat => {
  categoryImages[cat].forEach((imgURL, index) => {
    products.push({
      id: id++,
      name: `${cat} ${index + 1}`,
      category: cat,
      img: imgURL,
      price: generatePrice(cat),
      desc: `Premium ${cat}, crafted by ${siteName}`
    });
  });
});

/* ================================
   RENDER CATALOG GRID
================================ */
function renderCatalog() {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;

  grid.innerHTML = products
    .map(
      p => `
    <div class="card" data-id="${p.id}">
      <div class="frame"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
      <div class="info">
        <div class="meta">
          <div class="name">${p.name}</div>
          <div class="cat">${p.category}</div>
        </div>
        <div class="price">${p.price}</div>
      </div>
      <div class="actions">
        <button class="btn outline" onclick="openQuick(${p.id})">Quick View</button>
        <button class="btn primary" onclick="orderWhatsapp(${p.id})">Order via WhatsApp</button>
      </div>
    </div>
  `
    )
    .join("");
}

/* ================================
   COLLECTIONS PAGE PREVIEW BLOCKS
================================ */
function renderCollectionsOverview() {
  const container = document.getElementById("collectionsOverview");
  if (!container) return;

  container.innerHTML = Object.keys(categoryImages)
    .map(cat => {
      const firstImg = categoryImages[cat][0];
      return `
      <a href="catalogue.html#${cat}" class="collection-tile" style="text-decoration:none;">
        <div class="card">
          <div class="frame">
            <img src="${firstImg}" alt="${cat}" loading="lazy">
          </div>
          <div class="info">
            <div class="meta">
              <div class="name">${cat}</div>
            </div>
            <div class="price">View Collection</div>
          </div>
        </div>
      </a>`;
    })
    .join("");
}

/* ================================
   QUICK VIEW POPUP
================================ */
function openQuick(id) {
  const p = products.find(x => x.id === id);
  const modal = document.getElementById("modal");
  if (!p || !modal) return;

  modal.querySelector(".box img").src = p.img;
  modal.querySelector(".right h3").textContent = p.name;
  modal.querySelector(".right .price").textContent = p.price;
  modal.querySelector(".right p").textContent = p.desc;
  modal.classList.add("open");

  modal.querySelector(".order-now").onclick = () => orderWhatsapp(id);
}

function closeModal() {
  document.getElementById("modal").classList.remove("open");
}

/* WHATSAPP ORDER LINK */
function orderWhatsapp(id) {
  const p = products.find(x => x.id === id);
  const msg = `Hello ${siteName}, I want to order *${p.name}* (${p.price}).`;
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
}

/* ================================
   FILTER + SEARCH
================================ */
function populateCategoryFilter() {
  const sel = document.getElementById("categoryFilter");
  if (!sel) return;

  Object.keys(categoryImages).forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    sel.appendChild(opt);
  });
}

function applyFilter() {
  const q = (document.getElementById("searchBox")?.value || "")
    .toLowerCase();
  const cat = document.getElementById("categoryFilter")?.value || "";

  const grid = document.getElementById("catalogGrid");
  if (!grid) return;

  const filtered = products.filter(p => {
    const matchQ =
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);

    const matchC = cat ? p.category === cat : true;

    return matchQ && matchC;
  });

  grid.innerHTML = filtered
    .map(
      p => `
    <div class="card" data-id="${p.id}">
      <div class="frame"><img src="${p.img}" alt="${p.name}"></div>
      <div class="info">
        <div class="meta"><div class="name">${p.name}</div><div class="cat">${p.category}</div></div>
        <div class="price">${p.price}</div>
      </div>
      <div class="actions">
        <button class="btn outline" onclick="openQuick(${p.id})">Quick View</button>
        <button class="btn primary" onclick="orderWhatsapp(${p.id})">Order via WhatsApp</button>
      </div>
    </div>
  `
    )
    .join("");
}

function resetFilter() {
  document.getElementById("searchBox").value = "";
  document.getElementById("categoryFilter").value = "";
  renderCatalog();
}

/* ================================
   ON PAGE LOAD
================================ */
window.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  renderCollectionsOverview();
  populateCategoryFilter();

  const modal = document.getElementById("modal");
  if (modal)
    modal.addEventListener("click", e => {
      if (e.target.id === "modal") closeModal();
    });

  if (location.hash) {
    const cat = location.hash.replace("#", "");
    const sel = document.getElementById("categoryFilter");
    sel.value = cat;
    applyFilter();
    setTimeout(
      () => document.getElementById("catalogGrid").scrollIntoView(),
      200
    );
  }
});
