# Muhammed Esat Demir — Kişisel Portfolyo

[muhammedesatdemir.com](https://muhammedesatdemir.com)

Tek sayfalık, tamamen bağımsız ve yapıtaşı (vanilla) teknolojilerle yazılmış kişisel
portfolyo sitesi. Üç farklı ekosistemde (kamu, kurumsal, start-up) geliştirilmiş
projeleri, deneyimleri ve AI entegrasyonlu ürünleri tek bir anlatıda sunar.

---

## Öne Çıkan Özellikler

- **Tam iki dilli (TR / EN) i18n** — runtime'da `data-i18n` / `data-i18n-html`
  attribute'ları üzerinden çalışan, kendi yazdığım minimal sözlük tabanlı sistem.
  Dil tercihi `localStorage` içinde saklanır.
- **Açık / koyu tema** — kullanıcı tercihi `localStorage` ile kalıcılaştırılır.
  Varsayılan: dark.
- **Hero parçacık efekti** — `<canvas>` üzerinde çalışan, DPR-aware, sayfa görünmez
  olduğunda (`visibilitychange` + `IntersectionObserver`) duraklayan hafif bir
  animasyon motoru. `prefers-reduced-motion` desteği mevcut.
- **Scroll-reveal ve aktif nav takibi** — her ikisi de `IntersectionObserver`
  tabanlı, JS dependency yok.
- **Sticky nav, mobil hamburger menü, back-to-top** — hepsi tek `main.js` içinde.
- **Faz tabanlı proje anlatısı** — Faz 01 (ürün), Faz 02 (kurumsal mimari),
  Faz 03 (AI & veri).
- **Collapsible bölümler** — native `<details>` ile JS'siz genişletme.
- **SEO-ready** — `og:*`, `twitter:card` ve anlamlı `meta description` dahil.

---

## Teknoloji Yığını

| Alan | Kullanılanlar |
| --- | --- |
| Markup | HTML5 (semantic) |
| Stil | Pure CSS3 (custom properties, `clamp()`, responsive grid) |
| Betik | Vanilla JavaScript (ES2020, tek IIFE, ~460 satır) |
| Fontlar | Inter + JetBrains Mono (Google Fonts) |
| İkonlar | Font Awesome 6.5 (CDN) |
| Hosting | GitHub Pages (custom domain: `muhammedesatdemir.com`) |

Build step, bundler, framework **yok**. İlgili hiçbir klasör yayına paket
çıkarma adımı gerektirmez; `index.html`'i doğrudan açmak yeterlidir.

---

## Proje Yapısı

```
.
├── index.html                    # Ana sayfa — tüm bölümler burada
├── index.old.html                # Eski Bootstrap 3 tabanlı sürüm (arşiv)
├── CNAME                         # GitHub Pages için custom domain
├── README.md                     # Bu dosya
├── assets/
│   ├── css-new/
│   │   └── style.css             # Mevcut sürümün stilleri
│   ├── js-new/
│   │   └── main.js               # i18n, theme, particles, observers
│   ├── css/, js/                 # Eski sürümün asset'leri (arşiv)
│   ├── images/                   # Proje görselleri
│   ├── logo/                     # Favicon & logo
│   ├── fonts/                    # Lokal font yedekleri
│   └── download/                 # CV ve indirilebilir dosyalar
└── bilgilerim/                   # İçerik kaynak dosyaları (CV, GitHub dump)
```

---

## İçerik Bölümleri

1. **Hero** — İsim, unvan, müsaitlik durumu, hızlı CTA'lar.
2. **Hakkımda** — Üç ekosistem anlatısı, teknoloji vurgusu, müsaitlik.
3. **Deneyim** — Timeline formatında stajlar ve ekip üyelikleri.
4. **Yetenekler** — 6 kategoriye ayrılmış chip listesi (Diller, Frontend &
   Mobil, Backend, Veritabanı, AI & Veri, Mimari & DevOps).
5. **Projeler** — 11 öne çıkan proje (3 faz) + collapsible "Kurumsal Araç
   Geliştirme" alt bölümü.
6. **Eğitim & Sertifikalar** — Üniversite, bursiyerlik programları,
   kategorilere ayrılmış 15+ sertifika.
7. **Referanslar** — 3 mentor kartı (Dr. Buğra Ayan · Dr. İlkay Yelmen ·
   Oğuzhan Nari).
8. **İletişim** — E-posta, LinkedIn, GitHub kartları.

---

## Yerel Geliştirme

Site pure static olduğundan basit bir HTTP sunucusu yeterlidir:

```bash
# Python
python -m http.server 8000

# ya da Node
npx serve .
```

Ardından tarayıcıda `http://localhost:8000` adresine gidin.

---

## i18n — Çeviri Nasıl Çalışır?

`assets/js-new/main.js` içindeki `I18N` sözlüğü TR ve EN anahtarlarını tutar.
Sayfa yüklendiğinde ve dil butonu tıklandığında `applyI18n(lang)` çalışır:

- `data-i18n="key"` → elementin `textContent`'i anahtarın değeriyle güncellenir.
- `data-i18n-html="key"` → elementin `innerHTML`'i güncellenir (HTML etiketleri
  dahil).

> **Önemli:** `index.html` içindeki bir i18n'li metni değiştirirken `main.js`
> içindeki ilgili TR + EN anahtarlarını da güncellemek gerekir, aksi halde
> sayfa yüklendiğinde JS sözlükteki eski değeri baskılar.

---

## Tasarım Kararları

- **Framework'süz** tercihi, bundle boyutunu (~20 KB CSS + ~15 KB JS) minimumda
  tutar ve her tarayıcıda hızlı açılış sağlar.
- **Dark-first** palet, geliştirici portfolyosu için tanıdık bir görsel dil
  oluşturur; açık tema alternatif olarak mevcuttur.
- **Accessibility:** `prefers-reduced-motion` desteği, `aria-*` nitelikleri,
  skip-link ve semantik landmark'lar kullanıldı.
- **Performance:** Lazy animation (canvas yalnızca hero görünürken çalışır),
  `requestAnimationFrame` tabanlı render, passive scroll listener'lar.

---

## Deploy

`main` branch'i otomatik olarak GitHub Pages tarafından servis edilir.
`CNAME` dosyası `muhammedesatdemir.com` alan adını bağlar.

---

## Kaynaklar

- [Font Awesome 6](https://fontawesome.com/) — ikonlar (CDN).
- [Google Fonts](https://fonts.google.com/) — Inter, JetBrains Mono.
- Eski sürüm (`index.old.html` + `assets/css/`, `assets/js/`) **Browny** adlı
  Bootstrap 3 tabanlı şablona dayanıyordu ([ThemeSINE](https://www.themesine.com/)).
  Yeni sürüm sıfırdan yazılmıştır ve bu şablonla kod bazında bir bağlantısı yoktur.

---

## İletişim

- **E-posta:** demirmuhammedesat@gmail.com
- **LinkedIn:** [muhammed-esat-demir](https://www.linkedin.com/in/muhammed-esat-demir)
- **GitHub:** [@muhammedesatdemir](https://github.com/muhammedesatdemir)
