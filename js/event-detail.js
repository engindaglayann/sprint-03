import { events } from "./data.js";

const container = document.getElementById("detay");
const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
    container.innerHTML = `
        <div class="hata-kutu">Etkinlik bulunamadı veya geçersiz ID.</div>
        <br><a href="etkinlikler.html">← Listeye dön</a>`;
} else {
    document.title = event.title;
    const tarih = new Date(event.date).toLocaleDateString("tr-TR");
    
    // Detay sayfası için afiş resmini ekliyoruz
    container.innerHTML = `
        <h2>${event.title}</h2>
        <section class="detay-grid">
            <div class="afis-alani">
                <img src="${event.image}" alt="Etkinlik Afişi" style="width: 100%; height: 100%; max-height: 400px; object-fit: cover; border-radius: var(--kose); box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            </div>
            <div class="kunye-alani">
                <dl class="kunye-listesi">
                    <dt>Tarih ve Saat</dt><dd>${tarih}, ${event.time}</dd>
                    <dt>Yer</dt><dd>${event.location}</dd>
                    <dt>Kategori</dt><dd>${event.category}</dd>
                    <dt>Kontenjan</dt><dd>${event.capacity}</dd>
                </dl>
                <p>${event.description}</p>
                <br>
                <a href="etkinlikler.html" style="margin-right: 1rem; color: var(--renk-ana); text-decoration:none;">← Listeye dön</a>
                <a href="etkinlik-guncelle.html?id=${event.id}" style="color: var(--renk-ana); font-weight:bold;">Bu etkinliği güncelle</a>
            </div>
        </section>
    `;
}