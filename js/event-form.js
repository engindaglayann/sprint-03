import { events } from "./data.js";

const form = document.getElementById("etkinlik-formu");
const mesajKutusu = document.getElementById("form-mesaj");

if (form) {
    // Güncelleme modundaysa verileri doldur
    if (form.dataset.mode === "guncelle") {
        const id = new URLSearchParams(location.search).get("id");
        const etkinlik = events.find((e) => e.id === id);
        
        if (etkinlik) {
            form.elements.ad.value = etkinlik.title;
            form.elements.kategori.value = etkinlik.category;
            form.elements.tarih.value = etkinlik.date;
            form.elements.saat.value = etkinlik.time;
            form.elements.yer.value = etkinlik.location;
            form.elements.kontenjan.value = etkinlik.capacity;
            form.elements.aciklama.value = etkinlik.description;
        } else {
            form.outerHTML = `<div class="hata-kutu">Geçersiz Etkinlik ID!</div><br><a href="etkinlikler.html">Etkinliklere git</a>`;
        }
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        form.querySelectorAll("input, select").forEach(el => el.removeAttribute("aria-invalid"));
        form.querySelectorAll(".hata-mesaj").forEach(el => el.textContent = "");
        if(mesajKutusu) mesajKutusu.innerHTML = "";

        const fd = new FormData(form);
        const data = {
            title: fd.get("ad").trim(),
            category: fd.get("kategori"),
            date: fd.get("tarih"),
            time: fd.get("saat"),
            location: fd.get("yer").trim(),
            capacity: fd.get("kontenjan"),
            description: fd.get("aciklama")
        };

        const errors = {};

        if (data.title.length < 3) errors.ad = "En az 3 karakter olmalı.";
        if (!data.category) errors.kategori = "Lütfen bir kategori seçin.";
        if (!data.date) errors.tarih = "Tarih alanı zorunludur.";
        if (!data.time) errors.saat = "Saat alanı zorunludur.";
        if (!data.location) errors.yer = "Yer alanı zorunludur.";
        if (data.capacity) {
            const cap = Number(data.capacity);
            if (cap < 1 || cap > 1000) errors.kontenjan = "1 ile 1000 arasında olmalı.";
        }

        if (Object.keys(errors).length > 0) {
            for (const [alanId, mesaj] of Object.entries(errors)) {
                const element = document.getElementById(alanId);
                if(element) element.setAttribute("aria-invalid", "true");
                const hataSpan = document.getElementById(`${alanId}-hata`);
                if(hataSpan) hataSpan.textContent = mesaj;
            }
            return;
        }

        const modMesaj = form.dataset.mode === "guncelle" ? "Güncellendi" : "Kaydedildi";
        mesajKutusu.innerHTML = `
            <div class="basari-kutu">
                <strong>Başarıyla ${modMesaj}!</strong>
                <pre style="margin-top:0.5rem; background:transparent;">${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
    });
}