import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const arama = document.getElementById("arama");
const kategoriFiltre = document.getElementById("kategori-filtre");
const sonucSatiri = document.getElementById("sonuc");

function createCard(event) {
    const tarih = new Date(event.date).toLocaleDateString("tr-TR");
    
    // Resim adresini data.js içindeki event.image'den alıyoruz
    return `
    <article class="kart">
        <img src="${event.image}" alt="${event.title} Afişi" style="width: 100%; height: 180px; object-fit: cover; border-radius: 4px; margin-bottom: 1rem;">
        <h3 style="margin-top: 0;">${event.title}</h3>
        <p>${event.category} · ${tarih}</p>
        <p>${event.location}</p>
        <a href="etkinlik-detay.html?id=${event.id}">Detayları gör →</a>
    </article>`;
}

function render(dizi) {
    if (!list) return;
    list.innerHTML = dizi.map(createCard).join("");
    if (sonucSatiri) {
        sonucSatiri.textContent = dizi.length === 0 ? "Bulunamadı" : `${dizi.length} etkinlik listeleniyor.`;
    }
}

if (kategoriFiltre && arama) {
    const kategoriler = [...new Set(events.map(e => e.category))];
    kategoriler.forEach(kat => {
        kategoriFiltre.innerHTML += `<option value="${kat}">${kat}</option>`;
    });

    const filtrele = () => {
        const aranan = arama.value.toLocaleLowerCase("tr-TR");
        const secilenKategori = kategoriFiltre.value;
        
        const sonuc = events.filter((e) => {
            const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
            const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
            return metinUyuyor && kategoriUyuyor;
        });
        render(sonuc);
    };

    arama.addEventListener("input", filtrele);
    kategoriFiltre.addEventListener("change", filtrele);
    document.getElementById("filtre-formu").addEventListener("submit", (e) => e.preventDefault());
}

if (list && list.dataset.limit) {
    const yaklasan = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, Number(list.dataset.limit));
    render(yaklasan);
} else if (list) {
    render(events);
}