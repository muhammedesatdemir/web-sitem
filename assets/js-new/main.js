(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------- i18n dictionary ----------- */
  const I18N = {
    tr: {
      'skip': 'İçeriğe atla',
      'nav.about': 'Hakkımda',
      'nav.experience': 'Deneyim',
      'nav.skills': 'Yetenekler',
      'nav.projects': 'Projeler',
      'nav.education': 'Eğitim',
      'nav.references': 'Referanslar',
      'nav.contact': 'İletişim',

      'hero.badge': 'Tam zamanlı rollere açık · Junior',
      'hero.role': 'Yazılım Mühendisi · <span class="accent">Ürün & AI Entegrasyonu</span>',
      'hero.lede': 'Üç farklı ekosistemde (kamu, kurumsal, start-up) <strong>gerçek kullanıcıyla buluşmaya hazır</strong> sistemler kurdum. Clean Architecture, React/React Native, FastAPI ve .NET 8 tarafında ölçeklenebilir sistemler; Gemini ve Whisper tabanlı orkestrasyonlarla çoklu-model fallback\'li AI pipeline\'ları tasarlıyorum.',
      'hero.cta.projects': 'Öne Çıkan Projeleri Gör',
      'hero.cta.contact': 'İletişime Geç',
      'hero.meta.location': 'İstanbul, Türkiye',
      'hero.meta.edu': 'İstinye Üniversitesi · AGNO 3.62',
      'hero.meta.work': 'Kamu · Kurumsal · Start-up Deneyimi',
      'hero.meta.availability': 'Tam zamanlı rollere açık',

      'about.kicker': '01 — Hakkımda',
      'about.title': 'Kod yazmaktan çok, <span class="accent">ürün çıkarmaktan</span> keyif alıyorum.',
      'about.p1': 'Kamu (T.C. İletişim Başkanlığı), kurumsal (Merzigo) ve start-up (Afinitem) olmak üzere üç farklı ekosistemde backend\'den mobile uçtan uca geliştirme tecrübesi edinmiş, canlıya çıkmış ürünler inşa etmiş bir Yazılım Mühendisiyim.',
      'about.availability': '<strong>Müsaitlik:</strong> Yazılım Mühendisliği lisansımdan Haziran 2026\'da mezun oldum; <strong>tam zamanlı</strong> rollere açığım.',
      'about.p2': 'Kurumsal süreçlerde <strong>.NET 8, Clean Architecture ve CQRS</strong> ile ölçeklenebilir API\'ler; web ve mobilde <strong>React / React Native ve TypeScript</strong> ile modern arayüzler geliştiriyorum. Ayrıca <strong>FastAPI ve PostgreSQL</strong> ile algoritmik servisler kuruyor; <strong>Gemini, Whisper ve Together AI</strong> ile hata toleransı ve model fallback\'i olan AI pipeline\'ları tasarlıyorum.',
      'about.stat.gpa': 'AGNO · 4.00',
      'about.stat.intern': 'Farklı Ekosistem<br><em class="stat__sub">Kamu · Kurumsal · Start-up</em>',
      'about.stat.shipped': 'Canlıya Çıkan Ürün',
      'about.stat.certs': 'Sertifika & Program',

      'exp.kicker': '02 — Deneyim',
      'exp.title': 'Üç ekosistem · <span class="accent">backend\'den mobile</span>.',
      'exp.role.intern': 'Yazılım Stajyeri',
      'exp.role.gdg': 'Proje Koordinatörü · Core Team',
      'date.mar2026now': 'Mart 2026 — Haziran 2026',
      'date.oct2025now': 'Ekim 2025 — Haziran 2026',

      /* --- experience items --- */
      'exp.merzigo.loc': 'İstanbul · Hibrit · Part-time',
      'exp.merzigo.company': 'Merzigo',
      'exp.merzigo.desc': '.NET 8, C# ve PostgreSQL ile Clean Architecture ve CQRS prensiplerine uygun intranet uygulamalarının backend mikroservis mimarisini ve RESTful API süreçlerini geliştirdim. Ocelot API Gateway üzerinde çoklu ortam (Development · Test · Staging · Production) konfigürasyonlarını yönetip mikroservis endpoint\'lerinin güvenli, yetkilendirilmiş (<code>[Permission]</code>) ve optimize edilmiş upstream/downstream route tanımlamalarını ve refactoring süreçlerini gerçekleştirdim. SuccessFactors API kurumsal entegrasyonunda asenkron veri senkronizasyonunu, karmaşık veri yapılarının güvenli parse (helper) mekanizmalarını ve EF Core 8 ile veritabanı operasyonlarını (migration, veri güncelliği koruma) yönettim. Kullanıcı Rehberi ve Anasayfa Yönetimi modüllerinde pagination, arama/filtreleme, veri gizliliği katmanları ve dinamik kurumsal akışların (new-joiners, birthday-celebrations, service-anniversaries) backend iş mantığını ve query/handler süreçlerini kurguladım. Rol Yönetimi modülünde rollere dinamik permission ekleme ve yetkiye göre Treeview tabanlı filtreleme sağlayan ölçeklenebilir endpoint\'ler tasarladım. Azure DevOps ortamında git akışlarını (pull request, kod incelemesi, conflict çözümü) yönetip StyleCop standartlarına uygun, statik kod analizinden geçen temiz kod (clean code) pratikleri uyguladım.',
      'exp.afinitem.loc': 'İstanbul · Ofiste · Part-time',
      'exp.afinitem.company': 'Afinitem LLC',
      'exp.afinitem.desc': 'Hızlı tempolu bir start-up ortamında; Kura platformu (FastAPI + React Native + Web), otonom WhatsApp CRM asistanı (n8n + OpenAI + Supabase) ve otonom YouTube içerik fabrikası (n8n + Gemini) olmak üzere üç farklı ürünün backend / API mimarisini ve mobil deneyimini uçtan uca geliştirdim.',
      'exp.cb.date': 'Temmuz 2025 — Eylül 2025',
      'exp.cb.loc': 'Ankara · Ofiste · Tam Zamanlı',
      'exp.cb.company': 'T.C. İletişim Başkanlığı — Bilgi İşlem Dairesi',
      'exp.cb.desc': 'React, TypeScript ve Node.js kullanarak kurumsal ihtiyaçlara yönelik, ölçeklenebilir web uygulamaları geliştirdim. Rol tabanlı yetkilendirme, kimlik doğrulama ve güvenli veri işleme süreçleri üzerinde çalıştım. Dosya işleme, veri dönüştürme ve otomasyon odaklı yardımcı araçlar tasarlayıp sistemlere entegre ettim.',
      'exp.gdg.date': 'Ekim 2024 — Haziran 2025',
      'exp.gdg.loc': 'İstinye Üniversitesi',
      'exp.gdg.company': 'Google Developer Groups on Campus · İstinye Üniversitesi',
      'exp.gdg.desc': 'SQL ve AI odaklı teknik etkinlikleri organize ettim; TechNova Zirvesi organizasyon ekibinde görev aldım.',
      'exp.bogazici.date': 'Ağustos 2024 — Eylül 2024',
      'exp.bogazici.loc': 'Boğaziçi Üniversitesi × AVD Consultancy',
      'exp.bogazici.company': 'Boğaziçi Üniversitesi · Feed Forward Talent',
      'exp.bogazici.desc': 'AI destekli KPI hesaplama ve analiz süreçlerine ekip içinde katkı sağladım. Streamlit tabanlı kullanıcı arayüzü, Altair / Pandas / SQLite ile veri işleme ve raporlama çalışmalarında görev aldım.',
      'exp.chip.securedata': 'Güvenli Veri İşleme',
      'exp.chip.pm': 'Proje Yönetimi',
      'exp.chip.event': 'Etkinlik Organizasyonu',
      'exp.chip.content': 'İçerik Üretimi',

      'skills.kicker': '03 — Yetenekler',
      'skills.title': 'Kullandığım <span class="accent">teknoloji yığını</span>.',
      'skills.cat.langs': 'Diller',
      'skills.cat.frontend': 'Frontend & Mobil',
      'skills.cat.backend': 'Backend',
      'skills.cat.db': 'Veritabanı & Cache',
      'skills.cat.ai': 'AI & Veri',
      'skills.cat.arch': 'Mimari & DevOps',
      'skills.langs': 'Diller:',
      'skills.lang.tr': '<strong>Türkçe</strong> · Ana dil',
      'skills.lang.en': '<strong>İngilizce</strong> · B2',
      'skills.lang.de': '<strong>Almanca</strong> · A1',

      'proj.kicker': '04 — Projeler',
      'proj.title': 'Öne çıkan projeler · <span class="accent">ürün, kurumsal, derin teknoloji</span>.',
      'proj.lede': 'Faz 01: canlıya çıkan ürünler · Faz 02: kurumsal mimari · Faz 03: AI pipeline\'ları ve veri işleme.',
      'proj.disclaimer': '<strong>Not:</strong> Aşağıda listelenen projelerin bir kısmı ticari ürün (SaaS) statüsünde olduğundan veya kamu/kurumsal gizlilik sözleşmeleri (NDA) gereğince kapalı kaynaktır. Mimarilerini detaylıca dokümante ettiğim açık kaynaklı projelerimi ve kodlama pratiklerimi incelemek isterseniz, <a href="https://github.com/muhammedesatdemir" target="_blank" rel="noopener">GitHub profilimi</a> ziyaret edebilirsiniz.',

      'minor.title': 'Diğer Çalışmalar',
      'minor.lede': 'Full-Stack uygulamalardan kurumsal araçlara — çeşitli problemler için geliştirdiğim çözümler.',
      'minor.cat.fullstack': 'Full-Stack Uygulamalar',
      'minor.cat.tooling': 'Kurumsal Araç Geliştirme',
      'minor.cat.toolingSub': '· T.C. İletişim Başkanlığı',
      'minor.cat.toolingHint': '(10 araç · göster)',

      'edu.kicker': '05 — Eğitim & Sertifikalar',
      'edu.title': 'Akademik temel ve <span class="accent">sürekli öğrenme</span>.',
      'edu.col.education': 'Eğitim',
      'edu.col.certs': 'Sertifikalar & Programlar',

      /* --- education items --- */
      'edu.isu.name': 'İstinye Üniversitesi',
      'edu.isu.role': 'Lisans · Yazılım Mühendisliği',
      'edu.isu.meta': '2022 — Haziran 2026 (Mezun) <br> AGNO: <strong>3.62 / 4.00</strong>',
      'edu.aia.name': 'Yapay Zeka ve Teknoloji Akademisi',
      'edu.aia.role': 'Bursiyer Programı · Yapay Zeka',
      'edu.aia.meta': 'T.C. Sanayi ve Teknoloji Bakanlığı · Google · T3 · Girişimcilik Vakfı<br>Aralık 2025 — Haziran 2026',
      'edu.das.name': 'Veri Analizi Okulu',
      'edu.das.role': 'Yapay Zeka ve Makine Öğrenmesi Modülü',
      'edu.das.meta': 'YÖK · Marmara Üni. (NSAE) · ODTÜ · İTÜ · Boğaziçi<br>Ekim 2025 — Haziran 2026',

      /* --- certificate group titles --- */
      'edu.cert.grp.tech': 'AI & Teknik',
      'edu.cert.grp.biz': 'Girişimcilik & İş',
      'edu.cert.grp.lead': 'Liderlik & Soft Skills',

      /* --- certificates --- */
      'cert.mcp': '<strong>AI Agent Geliştirme ve MCP Temelleri</strong><em>Siber Kulüpler Birliği · 2026</em>',
      'cert.garanti': '<strong>Garanti BBVA — Teknoloji Serisi (GenAI · ML · Prompt)</strong><em>Coderspace · 2025</em>',
      'cert.clouddevops': '<strong>Cloud & DevOps MiniCamp</strong><em>Globally Check · 2025</em>',
      'cert.devsecops': '<strong>DevSecOps Eğitimi — 2025 Siber Yaz Kampı</strong><em>Siber Kulüpler Birliği · 2025</em>',
      'cert.ttt': '<strong>Train the Trainer: AI & ML on Google Cloud</strong><em>Google for Developers · 2024</em>',
      'cert.foundations': '<strong>Foundations: Data, Data, Everywhere</strong><em>Google · Coursera · 2026</em>',
      'cert.webdev': '<strong>Web Uygulamaları Geliştirme Eğitimi</strong><em>Yapay Zeka ve Teknoloji Akademisi · 2026</em>',
      'cert.entrep': '<strong>Temel Girişimcilik Eğitimi</strong><em>Yapay Zeka ve Teknoloji Akademisi · 2026</em>',
      'cert.finance': '<strong>Girişimciler için Finans Eğitimi</strong><em>Yapay Zeka ve Teknoloji Akademisi · 2026</em>',
      'cert.law': '<strong>Girişimciler için Hukuk Eğitimi</strong><em>Yapay Zeka ve Teknoloji Akademisi · 2026</em>',
      'cert.hr': '<strong>Girişimciler için İK Eğitimi</strong><em>Yapay Zeka ve Teknoloji Akademisi · 2026</em>',
      'cert.pm': '<strong>Proje Yönetiminin Temelleri</strong><em>Google · Coursera · 2026</em>',
      'cert.leadership': '<strong>Temel Liderlik Programı</strong><em>BireBir İnsan Akademisi · 2026</em>',
      'cert.technova': '<strong>TechNova Zirvesi Organizasyon Sertifikası</strong><em>GDG on Campus İstinye · 2025</em>',

      'ref.kicker': '06 — Referanslar',
      'ref.title': 'Birlikte çalıştığım <span class="accent">kıymetli isimler</span>.',
      'ref.lede': 'Staj ve proje süreçlerinde mentorluğundan faydalandığım, kurumsal ekip liderliği yapan referanslarım. Detaylı iletişim ve değerlendirme için talep üzerine bilgi paylaşılır.',
      'ref.ba.role': 'Bilgi İşlem Daire Başkanı · T.C. İletişim Başkanlığı',
      'ref.ba.meta': 'Öğretim Görevlisi · Ankara & Gazi Üniversitesi',
      'ref.ba.ctx': 'Cumhurbaşkanlığı İletişim Başkanlığı Bilgi İşlem Dairesi stajı süresince doğrudan yönetiminde kurumsal yazılım projelerinde görev aldım.',
      'ref.iy.role': 'Teknoloji Ekibi Lideri · Merzigo',
      'ref.iy.meta': 'Öğretim Üyesi · İstinye Üniversitesi',
      'ref.iy.ctx': 'Merzigo\'daki .NET 8 · Clean Architecture · CQRS odaklı stajımın teknik liderliğini yürütüyor.',
      'ref.on.role': 'Genel Müdür · Afinitem',
      'ref.on.meta': 'Yazılım Mühendisi',
      'ref.on.ctx': 'Afinitem\'deki start-up çevikliği içinde ürün odaklı mühendislik vizyonunu kendisinden edindim.',
      'ref.note': 'Referans iletişim bilgileri başvuru sürecinde talep üzerine paylaşılır.',

      'contact.kicker': '07 — İletişim',
      'contact.title': 'Birlikte çalışalım mı? <span class="accent">Açığım.</span>',
      'contact.lede': 'Junior, freelance ya da teknik işbirliği — en hızlı ulaşmak için e-posta. Tam zamanlı rollere açığım.',
      'contact.label.email': 'E-posta',
      'contact.label.phone': 'Telefon',

      'footer.copy': '© <span id="year"></span> Muhammed Esat Demir. Tüm hakları saklıdır.',
      'footer.built': 'İstanbul, Türkiye',

      /* --- projects: shared phase labels --- */
      'proj.phase.live': 'Faz 01 · Canlıda',
      'proj.phase.soon': 'Faz 01 · Yakında Canlıya',
      'proj.phase.ent': 'Faz 02 · Kurumsal Mimari',
      'proj.phase.deep': 'Faz 03 · Derin Teknoloji',

      /* --- DerbyGoal --- */
      'proj.derby.subtitle': '8.912 futbolculuk veri üzerinde 10 oyun modlu futbol kart & tahmin oyunu · Web · derbygoal.com',
      'proj.derby.badge': 'Canlı · Online Multiplayer',
      'proj.derby.desc': '8.912 futbolcu ve 6.240 kulüplük veri seti üzerinde <strong>10 oyun modu</strong> sunan; hot-seat, bota karşı <strong>ve gerçek zamanlı online</strong> oynanabilen bir dijital futbol oyunu. Dokuz mod <strong>sunucu-otoriteli</strong> online çalışır (doğru cevap reveal\'a kadar client\'a sızmaz = hile koruması); Neon Postgres + Ably hibrit push üzerine kurulu mod-agnostik bir multiplayer altyapısına sahiptir.',
      'proj.derby.h1': 'Next.js 14 App Router · TypeScript · saf TS event-sourced oyun motoru (seedable PRNG)',
      'proj.derby.h2': 'Sunucu-otoriteli online: atomik matchmaking, optimistic-lock (version), versiyon-tabanlı GET',
      'proj.derby.h3': 'Ably hibrit push + Neon Postgres + Better-Auth · arkadaşını davet et (özel maç linki)',
      'proj.derby.h4': 'Veri pipeline: Transfermarkt JSON API\'den ~34K istekle çekilmiş, doğrulanmış veri seti',

      /* --- Vardiya Planı --- */
      'proj.vardiya.subtitle': 'Vardiyalı çalışanlar için local-first mobil uygulama · Google Play\'de yayında',
      'proj.vardiya.badge': 'Google Play · Android',
      'proj.vardiya.desc': 'Google Play\'de yayında olan, yerel-öncelikli (local-first) ve ağ bağımlılığı olmayan bir React Native / Expo uygulaması. Döngüsel şablonlardan ay bazında vardiya üretimi, ay geçişlerinde cycle süreklilik matematiği, aralık revize / kilitli gün koruması ve Vitest ile yazılmış birim testler içeriyor.',
      'proj.vardiya.h1': 'Zustand store · dosya repository\'den senkron hidrasyon',
      'proj.vardiya.h2': 'Özel zamanlama motoru: döngü ofseti (cycle offset) matematiği, gece aşan vardiya kuralı',
      'proj.vardiya.h3': 'Açık / koyu tema, Türkçeye duyarlı dizge işleme ve CSV dışa aktarım',
      'proj.vardiya.h4': 'Vitest birim testleri ve arayüz tabanlı repository (File + Memory)',

      /* --- Kura — Afinitem --- */
      'proj.kura.name': 'Kura — Afinitem',
      'proj.kura.subtitle': 'Aile Hekimliği ek yerleştirme (kura) platformu · Web + Mobil',
      'proj.kura.badge': 'Web + iOS + Android',
      'proj.kura.desc': 'Resmi hekim listesi ve boş pozisyon listesini içeri alıp, hekimlerden sıralı tercihleri toplayan ve <strong>cascading (zincirleme) atama</strong> mantığıyla dinamik bir yerleştirme simülasyonu çalıştıran uçtan uca bir platform. FastAPI backend, web ve React Native mobil olmak üzere üç uygulama paketinden oluşan tek bir monorepo.',
      'proj.kura.h1': 'Monorepo: FastAPI backend · Web frontend · React Native mobil',
      'proj.kura.h2': 'Dinamik cascading yerleştirme algoritması',
      'proj.kura.h3': 'CSV + PDF admin içeri aktarımları, dönem yaşam döngüsü yönetimi',
      'proj.kura.h4': 'Async SQLAlchemy + httpx ile I/O-bound istekler için asenkron iş akışı',

      /* --- Orbacle --- */
      'proj.orbacle.subtitle': 'Minimalist mistik kehanet mobil uygulaması · iOS / Android',
      'proj.orbacle.badge': 'iOS + Android',
      'proj.orbacle.desc': 'Expo SDK 54 ve katı tipli (strict) TypeScript ile geliştirilmiş, tamamen çevrim-dışı çalışan bir mobil ürün. Reanimated tabanlı animasyonlu kristal küre, tam i18n (TR/EN), AsyncStorage geçmişi, erişilebilirlik öznitelikleri ve EAS derleme hattı ile mağazaya çıkmaya hazır.',
      'proj.orbacle.h1': 'Expo SDK 54 · React 19 · katı tipli (strict) TypeScript',
      'proj.orbacle.h2': 'Reanimated 4 ile katmanlı animasyonlu küre (idle nabız + açılış sekansı)',
      'proj.orbacle.h3': 'İki dilli, AsyncStorage üzerinde yerel geçmiş, tam erişilebilirlik',
      'proj.orbacle.h4': 'EAS derleme profilleri (geliştirme / ön izleme / canlı)',

      /* --- YouTube Kanal Yönetimi API --- */
      'proj.ytapi.name': 'YouTube Kanal Yönetimi API',
      'proj.ytapi.subtitle': 'Merzigo · İçerik yönetimi için kurumsal REST API',
      'proj.ytapi.badge': 'Kurumsal / Merzigo',
      'proj.ytapi.desc': 'YouTube kanallarının veritabanında listelenmesi, filtrelenmesi, sıralanması ve Excel / CSV import-export işlemlerini sağlayan RESTful API. <strong>Clean Architecture</strong> prensipleriyle API · Application · Domain · Infrastructure katmanlı mimari; FluentValidation, CsvHelper, ClosedXML ve Swagger entegrasyonları.',
      'proj.ytapi.h1': 'DI · Repository pattern · xUnit birim testleri',
      'proj.ytapi.h2': 'Dosya ve klasör bazlı toplu CSV / Excel import, filtreli export',
      'proj.ytapi.h3': 'FluentValidation ile veri doğrulama; global hata middleware\'i',
      'proj.ytapi.h4': '12 endpoint, sayfalama + arama + filtreleme + sıralama',

      /* --- Sosyal Yardım Takip Sistemi --- */
      'proj.sosyalyardim.name': 'Sosyal Yardım Takip Sistemi',
      'proj.sosyalyardim.subtitle': 'T.C. İletişim Başkanlığı · Full-Stack başvuru yönetimi',
      'proj.sosyalyardim.badge': 'Devlet / Cumhurbaşkanlığı',
      'proj.sosyalyardim.desc': 'Cumhurbaşkanlığı İletişim Başkanlığı Bilgi İşlem Dairesi stajımda geliştirdiğim; sosyal yardım başvurularının dijital yönetimi için Django REST Framework + React + Material-UI tabanlı <strong>full-stack uygulama</strong>. Admin / Sosyal Çalışan / Yardım Alan / Gönüllü olmak üzere dört rol, JWT kimlik doğrulama ve başvuru yaşam döngüsü yönetimi.',
      'proj.sosyalyardim.h1': 'Django 5 · DRF · PostgreSQL · JWT · rol tabanlı yetkilendirme (RBAC)',
      'proj.sosyalyardim.h2': 'React 18 · Material-UI · Context API · Axios',
      'proj.sosyalyardim.h3': 'Başvuru yaşam döngüsü: Beklemede → İncelemede → Onay / Red / İade',
      'proj.sosyalyardim.h4': 'Kurum içi kullanım için teslim edildi (kamu altyapısında dağıtım dairece yönetilir)',

      /* --- Belgem --- */
      'proj.belgem.subtitle': 'T.C. İletişim Başkanlığı için güvenli WYSIWYG editör',
      'proj.belgem.badge': 'Devlet / Cumhurbaşkanlığı',
      'proj.belgem.desc': 'Cumhurbaşkanlığı İletişim Başkanlığı için geliştirilen, <strong>saf JavaScript (Vanilla JS)</strong> tabanlı, sunucu bağımsız (client-side) ve güvenli bir WYSIWYG metin editörü. Kurumsal veri güvenliği ve dijital belge yönetimi ihtiyaçları için tasarlandı.',
      'proj.belgem.h1': 'Sunucu bağımsız, client-side çalışan güvenli editör',
      'proj.belgem.h2': 'Kurumsal ihtiyaçlara göre özelleştirilmiş UI ve metin işleme',
      'proj.belgem.h3': 'Bağımlılık minimumu — bakım ve güvenlik avantajı',

      /* --- İçerik Fabrikası --- */
      'proj.icerikfabrikasi.name': 'İçerik Fabrikası — Video Üretim Pipeline\'ı',
      'proj.icerikfabrikasi.subtitle': 'Senaryodan MP4\'e uçtan uca AI orkestrasyonu',
      'proj.icerikfabrikasi.badge': 'Uçtan Uca AI',
      'proj.icerikfabrikasi.desc': '9:16 dikey kısa-form video bölümlerinin üretimini otomatikleştiren Streamlit uygulaması. Gemini 2.5 Flash yazar, Together AI FLUX.1 Schnell görsel üreteci, InsightFace yüz değişimi, Playwright / HTML konuşma balonu kompozitörü ve MoviePy video birleştiricisini zincirler.',
      'proj.icerikfabrikasi.h1': 'Story Bible → Screenwriter → Render Engine → Video Assembler (4 sekme)',
      'proj.icerikfabrikasi.h2': '3 API anahtarlı Gemini rotasyonu + retry/backoff mimarisi',
      'proj.icerikfabrikasi.h3': 'Per-episode manifest.json, atomik YAML yazımı, Türkçe slug',
      'proj.icerikfabrikasi.h4': 'Opsiyonel InsightFace inswapper_128 yüz değişimi (CPU)',

      /* --- Script-to-Sub --- */
      'proj.scripttosub.subtitle': 'Türkçe video içerikleri için iki modlu altyazı orkestrasyonu',
      'proj.scripttosub.badge': 'Hata Toleranslı AI',
      'proj.scripttosub.desc': '<strong>Mod A</strong> (script-aware): Whisper sadece zamanlama kaynağı, görüntülenen metin her zaman kullanıcının yazdığı script. <strong>Mod B</strong> (autonomous): Whisper transkribe eder, Gemini Flash fonetik/TDK/sayı düzeltmesi yapar, kelime timestamp\'leri ile yeniden hizalanır. Demucs vokal izolasyonu + ASS render + FFmpeg libass ile piksel-mükemmel çıktı.',
      'proj.scripttosub.h1': '3 anahtar × 3 model = 9 kombinasyonlu Gemini fallback matrisi',
      'proj.scripttosub.h2': 'Akıllı hata sınıflandırması: 429 quota / 503 overload / 401 auth',
      'proj.scripttosub.h3': 'Türkçe stemmer + yabancı kökenli özel isimler için genişletilebilir fonetik sözlük',
      'proj.scripttosub.h4': '9 alt modüllü modüler yapı · tek kaynak yapılandırma',

      /* --- Otonom WhatsApp CRM --- */
      'proj.whatsappcrm.name': 'Otonom WhatsApp CRM & Satış Asistanı',
      'proj.whatsappcrm.subtitle': 'Afinitem · n8n orkestrasyonlu, FastAPI\'ye taşınabilir otonom AI iş akışı',
      'proj.whatsappcrm.badge': 'Otonom AI · Canlıda',
      'proj.whatsappcrm.desc': 'Standart bir "soru-cevap" botundan öte; <strong>CRM ile entegre</strong>, asenkron çalışan ve kendi inisiyatifiyle ancak <strong>sıfır halüsinasyonla</strong> satış kapatabilen bir yapay zeka ekosistemi. Eksik veride fiyat uydurmaz — profili tamamlayana kadar müşteriyi yönlendirir ve CRM\'den doğrulanmış teklifi sunar.',
      'proj.whatsappcrm.h1': '<strong>Şartlı satış + sıfır halüsinasyon:</strong> CRM doğrulamasıyla fiyat ve teklif üretir',
      'proj.whatsappcrm.h2': '<strong>Asenkron veri madencisi:</strong> Ana sohbeti yavaşlatmadan arka planda karar değişikliklerini veritabanına işler',
      'proj.whatsappcrm.h3': '<strong>Vision AI + belge tanıma:</strong> Dekont ve belgeleri okur, hukuki sınırları bilerek onayı insana bırakır',
      'proj.whatsappcrm.h4': '<strong>Admin override:</strong> Bir temsilci sohbete dahil olduğunda AI kendini 45 dk askıya alır',

      /* --- Otonom YouTube İçerik Fabrikası --- */
      'proj.youtubefactory.name': 'Otonom YouTube İçerik Fabrikası',
      'proj.youtubefactory.subtitle': 'Afinitem · Uçtan uca video üretim & yayınlama pipeline\'ı',
      'proj.youtubefactory.badge': 'Uçtan Uca AI · Otomasyon',
      'proj.youtubefactory.desc': 'İnsan müdahalesi olmadan çalışan, senaryo üretiminden YouTube\'a yayınlamaya kadar tüm süreci otomatize eden bir içerik üretim mimarisi. Gemini, Pixabay, TTS ve YouTube Data API\'ları <strong>tek bir n8n orkestrasyonunda</strong> zincirlenerek günlük/haftalık kadrajda kanal beslemesi gerçekleştirilir.',
      'proj.youtubefactory.h1': 'AI destekli senaryo üretimi + TTS ile seslendirme ve segment zamanlama',
      'proj.youtubefactory.h2': 'Gemini anahtar-kelime çıkarımı → Pixabay API üzerinden konuya uygun stok video toplama',
      'proj.youtubefactory.h3': 'Döngüsel (loop) video birleştirme + altyazı + arka plan müziği entegrasyonu',
      'proj.youtubefactory.h4': 'SEO uyumlu metadata (başlık, açıklama, etiket) + YouTube Data API ile otomatik yayınlama',

      /* --- BERTurk --- */
      'proj.berturk.name': 'BERTurk — Türkçe Duygu Analizi (Bitirme Projesi)',
      'proj.berturk.subtitle': 'Otel yorumları · çok-modelli karşılaştırma · metrik bütünlüğü · XAI',
      'proj.berturk.badge': 'Ar-Ge · Tamamlandı',
      'proj.berturk.desc': 'Türkçe otel yorumları üzerinde üç sınıflı (negatif / nötr / pozitif) duygu analizi ve <strong>açıklanabilir AI (XAI)</strong> üzerine, iki kişilik tamamlanmış lisans bitirme projesi. Odak noktası yalnızca yüksek doğruluk değil; <strong>veri sızıntısını engelleyen dürüst bir değerlendirme çerçevesi</strong> kurmaktı: sentetik (yapay zekâ üretimi) örnekler yalnızca eğitim setinde tutuldu, test seti %100 gerçek kullanıcı yorumuyla izole edildi. Sentetik veri teste karıştığında metriğin yapay biçimde şiştiği (<em>metric leakage</em>) deneysel olarak gösterildi.',
      'proj.berturk.h1': 'Dört Transformer mimarisinin eş protokolde karşılaştırılması (BERTurk · ELECTRA-tr · mBERT · XLM-RoBERTa)',
      'proj.berturk.h2': '<code>ai_only_in_train</code> izolasyonu + üç yöntemli sızıntı denetimi (exact-match · normalized · Jaccard)',
      'proj.berturk.h3': 'Sınıf dengesizliği için Weighted Cross Entropy + karşıtlık bağlaçlı 751 insan-yazımı nötr yorum',
      'proj.berturk.h4': 'İstatistiksel doğrulama (multi-seed · McNemar · 5-fold CV) + LIME / SHAP ile dilbilimsel açıklanabilirlik',
      'proj.berturk.h5': 'FastAPI + React tabanlı uçtan uca demo (tek yorum tahmini, LIME açıklaması, metrik panosu)',

      /* --- Full-Stack minor cards --- */
      'fs.intranet.name': 'Kurumsal İntranet Platformu',
      'fs.intranet.desc': 'Merzigo · .NET 8 + PostgreSQL · Clean Architecture / CQRS mikroservis ekibinde geliştirici olarak; Ocelot API Gateway route\'ları, SuccessFactors API entegrasyonu, EF Core 8 ve Rol Yönetimi (RBAC + Treeview filtreleme) backend süreçlerine katkı verdim.',
      'fs.ocr.name': 'Akıllı OCR Sistemi',
      'fs.ocr.desc': 'TensorFlow / Keras ile eğitilmiş derin öğrenme modeli + OpenCV görüntü işleme (binarizasyon, contour detection, gürültü azaltma) · Flask Web-OCR arayüzü ile görüntüden anlamlı metin ayıklama.',
      'fs.castlyo.name': 'Castlyo Platform',
      'fs.castlyo.desc': 'Next.js 14 + NestJS + Drizzle ORM + Redis + Docker · monorepo mimarisiyle geliştirdiğim, casting ve yetenek eşleştirme platformu.',
      'fs.insaat.name': 'İnşaat Yönetim Sistemi',
      'fs.insaat.desc': 'Flask + MySQL · token tabanlı güvenlik, otomatik PDF raporlama, kaynak yönetimi.',
      'fs.imza.name': 'Kurum İçi Belge İmza Süreci Yönetim Sistemi',
      'fs.imza.desc': 'T.C. İletişim Başkanlığı · Node.js + Express + MySQL + React · dinamik imza sırası, JWT rol tabanlı yetkilendirme, PDF önizleme ve e-posta bildirimleri ile dijital imza iş akışı.',
      'fs.evrak.name': 'Evrak Takip Sistemi',
      'fs.evrak.desc': 'T.C. İletişim Başkanlığı · Flask + MySQL tabanlı full-stack evrak yönetimi · evrak yaşam döngüsü (kayıt → onay / red / iade), RBAC ve istatistik dashboard\'u.',
      'fs.kpi.name': 'AI Destekli KPI Asistanı',
      'fs.kpi.desc': 'Gemini API + Streamlit · şirket verilerini analiz edip görsel KPI önerileri sunar.',
      'fs.tts.name': 'AI Tabanlı Seslendirme Aracı',
      'fs.tts.desc': 'Gemini Generative AI ile çoklu ses seçeneği ve dinamik dosya yönetimi sunan TTS uygulaması.',

      /* --- Corporate tooling --- */
      'tool.textcleaner.name': 'Metin Temizleyici / Standardlaştırıcı',
      'tool.textcleaner.desc': 'Veri kalitesi için Türkçe-duyarlı metin normalize aracı · Tkinter GUI, kurumsal kimlik paleti.',
      'tool.locker.name': 'Salt Okunur Belge Kilitleyici',
      'tool.locker.desc': '.docx ve .xlsx dosyalarını parola korumalı salt okunur sürümlere dönüştüren masaüstü aracı.',
      'tool.masking.name': 'Kişisel Veri Maskeleme Aracı',
      'tool.masking.desc': 'TXT / PDF / DOCX\'te TCKN, IBAN, telefon, e-posta tespiti ve PDF redaction (karartma).',
      'tool.videologo.name': 'Video Logo & İçerik Ekleme Aracı',
      'tool.videologo.desc': 'MoviePy + PIL · kurumsal videolara otomatik logo, tarih ve başlık ekleme; ses korumalı.',
      'tool.survey.name': 'Anket Sonuç Analizcisi',
      'tool.survey.desc': 'Excel / CSV\'den otomatik istatistiksel analiz · dinamik Bar / Pie grafik, Excel + PNG dışa aktarım.',
      'tool.xmljson.name': 'XML / JSON Veri Dönüştürücü',
      'tool.xmljson.desc': 'Kurumlar arası veri alışverişi için XML ve JSON dosyalarını CSV / Excel\'e dönüştüren GUI aracı.',
      'tool.pdfsplitter.name': 'PDF Ayrıştırıcı',
      'tool.pdfsplitter.desc': 'GUI ile sayfa aralığı seçip yeni PDF üretme aracı · orijinal dosya bozulmadan çıktı üretir.',
      'tool.scheduler.name': 'Zamanlayıcı / Hatırlatıcı',
      'tool.scheduler.desc': 'Sistem tepsisi ikonuyla çalışan; zamanlanmış görevler, sesli + görsel bildirim, JSON kalıcılık.',
      'tool.barcode.name': 'Barkod Oluşturucu',
      'tool.barcode.desc': 'CLI üzerinden EAN13 / Code128 / ISBN13 destekli PNG barkod üretici.',
      'tool.docconverter.name': 'Belge / PDF Dönüştürücü',
      'tool.docconverter.desc': 'Word, Excel, PowerPoint ve görselleri PDF\'e dönüştüren Flask + Tailwind tabanlı araç.'
    },
    en: {
      'skip': 'Skip to content',
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.education': 'Education',
      'nav.references': 'References',
      'nav.contact': 'Contact',

      'hero.badge': 'Open to full-time roles · Junior',
      'hero.role': 'Software Engineer · <span class="accent">Product & AI Integration</span>',
      'hero.lede': 'I\'ve built <strong>production-ready</strong> products across three ecosystems (public, corporate, start-up). I design scalable systems with Clean Architecture, React/React Native, FastAPI and .NET 8; and multi-model fallback AI pipelines with Gemini, Whisper and Together AI.',
      'hero.cta.projects': 'View Featured Projects',
      'hero.cta.contact': 'Get in Touch',
      'hero.meta.location': 'Istanbul, Türkiye',
      'hero.meta.edu': 'Istinye University · GPA 3.62',
      'hero.meta.work': 'Public · Corporate · Start-up Experience',
      'hero.meta.availability': 'Open to full-time roles',

      'about.kicker': '01 — About',
      'about.title': 'I enjoy shipping products <span class="accent">more than writing code</span>.',
      'about.p1': 'I\'m a Software Engineer with end-to-end development experience across three different ecosystems — public sector (T.C. Presidential Communications), corporate (Merzigo), and start-up (Afinitem) — having built products that shipped to production, from backend to mobile.',
      'about.availability': '<strong>Availability:</strong> I graduated from my Software Engineering degree in June 2026 and am open to <strong>full-time</strong> roles.',
      'about.p2': 'In corporate environments, I build scalable APIs with <strong>.NET 8, Clean Architecture, and CQRS</strong>; modern web and mobile interfaces with <strong>React / React Native and TypeScript</strong>. I also craft algorithmic services with <strong>FastAPI and PostgreSQL</strong>, and design fault-tolerant AI pipelines with <strong>Gemini, Whisper, and Together AI</strong> using multi-model fallback architectures.',
      'about.stat.gpa': 'GPA · 4.00',
      'about.stat.intern': 'Ecosystems<br><em class="stat__sub">Public · Corporate · Start-up</em>',
      'about.stat.shipped': 'Shipping Products',
      'about.stat.certs': 'Certificates & Programs',

      'exp.kicker': '02 — Experience',
      'exp.title': 'Three ecosystems · <span class="accent">backend to mobile</span>.',
      'exp.role.intern': 'Software Intern',
      'exp.role.gdg': 'Project Coordinator · Core Team',
      'date.mar2026now': 'Mar 2026 — Jun 2026',
      'date.oct2025now': 'Oct 2025 — Jun 2026',

      /* --- experience items --- */
      'exp.merzigo.loc': 'Istanbul · Hybrid · Part-time',
      'exp.merzigo.company': 'Merzigo',
      'exp.merzigo.desc': 'Built the backend microservice architecture and RESTful API layers of intranet applications following Clean Architecture and CQRS principles with .NET 8, C#, and PostgreSQL. On the Ocelot API Gateway, I managed multi-environment configurations (Development · Test · Staging · Production) and handled secure, authorized (<code>[Permission]</code>) and optimized upstream/downstream route definitions and refactoring for microservice endpoints. For the SuccessFactors API enterprise integration, I managed asynchronous data synchronization, secure parse (helper) mechanisms for complex data structures, and database operations with EF Core 8 (migrations, data-consistency safeguards). In the User Directory and Homepage Management modules, I designed the backend business logic and query/handler flows for pagination, search/filtering, data-privacy layers, and dynamic corporate flows (new-joiners, birthday-celebrations, service-anniversaries). In the Role Management module, I designed scalable endpoints enabling dynamic permission assignment to roles and authorization-based Treeview filtering. In Azure DevOps, I managed git workflows (pull requests, code reviews, conflict resolution) and applied clean-code practices passing StyleCop standards and static code analysis.',
      'exp.afinitem.loc': 'Istanbul · On-site · Part-time',
      'exp.afinitem.company': 'Afinitem LLC',
      'exp.afinitem.desc': 'In a fast-paced start-up environment, I built the backend / API architecture and mobile experience of three different products end to end: the Kura platform (FastAPI + React Native + Web), an autonomous WhatsApp CRM assistant (n8n + OpenAI + Supabase), and an autonomous YouTube content factory (n8n + Gemini).',
      'exp.cb.date': 'Jul 2025 — Sep 2025',
      'exp.cb.loc': 'Ankara · On-site · Full-time',
      'exp.cb.company': 'T.C. Presidential Communications — IT Department',
      'exp.cb.desc': 'Built scalable web applications for corporate needs using React, TypeScript, and Node.js. Worked on role-based authorization, authentication, and secure data-processing flows. Designed and integrated file-processing, data-transformation, and automation-focused utility tools into the systems.',
      'exp.gdg.date': 'Oct 2024 — Jun 2025',
      'exp.gdg.loc': 'Istinye University',
      'exp.gdg.company': 'Google Developer Groups on Campus · Istinye University',
      'exp.gdg.desc': 'Organized SQL- and AI-focused technical events; served on the organizing team of the TechNova Summit.',
      'exp.bogazici.date': 'Aug 2024 — Sep 2024',
      'exp.bogazici.loc': 'Boğaziçi University × AVD Consultancy',
      'exp.bogazici.company': 'Boğaziçi University · Feed Forward Talent',
      'exp.bogazici.desc': 'Contributed within the team to AI-powered KPI computation and analysis processes. Worked on a Streamlit-based user interface and on data-processing and reporting with Altair / Pandas / SQLite.',
      'exp.chip.securedata': 'Secure Data Processing',
      'exp.chip.pm': 'Project Management',
      'exp.chip.event': 'Event Organization',
      'exp.chip.content': 'Content Creation',

      'skills.kicker': '03 — Skills',
      'skills.title': 'My <span class="accent">technology stack</span>.',
      'skills.cat.langs': 'Languages',
      'skills.cat.frontend': 'Frontend & Mobile',
      'skills.cat.backend': 'Backend',
      'skills.cat.db': 'Database & Cache',
      'skills.cat.ai': 'AI & Data',
      'skills.cat.arch': 'Architecture & DevOps',
      'skills.langs': 'Languages:',
      'skills.lang.tr': '<strong>Turkish</strong> · Native',
      'skills.lang.en': '<strong>English</strong> · B2',
      'skills.lang.de': '<strong>German</strong> · A1',

      'proj.kicker': '04 — Projects',
      'proj.title': 'Featured work · <span class="accent">product, corporate, deep tech</span>.',
      'proj.lede': 'Phase 01: products shipping soon · Phase 02: corporate architecture · Phase 03: AI pipelines and data processing.',
      'proj.disclaimer': '<strong>Note:</strong> Some of the projects below are closed-source due to their status as commercial products (SaaS) or corporate/public-sector non-disclosure agreements (NDAs). To explore my open-source work and coding practices — where I\'ve documented architectures in detail — please visit my <a href="https://github.com/muhammedesatdemir" target="_blank" rel="noopener">GitHub profile</a>.',

      'minor.title': 'Other Work',
      'minor.lede': 'From full-stack apps to internal tooling — solutions I\'ve built for a wide range of problems.',
      'minor.cat.fullstack': 'Full-Stack Applications',
      'minor.cat.tooling': 'Corporate Tooling',
      'minor.cat.toolingSub': '· T.C. Presidential Communications',
      'minor.cat.toolingHint': '(10 tools · show)',

      'edu.kicker': '05 — Education & Certificates',
      'edu.title': 'Academic foundation and <span class="accent">continuous learning</span>.',
      'edu.col.education': 'Education',
      'edu.col.certs': 'Certificates & Programs',

      /* --- education items --- */
      'edu.isu.name': 'Istinye University',
      'edu.isu.role': 'B.Sc. · Software Engineering',
      'edu.isu.meta': '2022 — Jun 2026 (Graduated) <br> GPA: <strong>3.62 / 4.00</strong>',
      'edu.aia.name': 'AI & Technology Academy',
      'edu.aia.role': 'Scholarship Program · Artificial Intelligence',
      'edu.aia.meta': 'Ministry of Industry and Technology · Google · T3 · Entrepreneurship Foundation<br>Dec 2025 — Jun 2026',
      'edu.das.name': 'Data Analysis School',
      'edu.das.role': 'AI & Machine Learning Module',
      'edu.das.meta': 'YÖK (CoHE) · Marmara Univ. (NSAE) · METU · ITU · Boğaziçi<br>Oct 2025 — Jun 2026',

      /* --- certificate group titles --- */
      'edu.cert.grp.tech': 'AI & Technical',
      'edu.cert.grp.biz': 'Entrepreneurship & Business',
      'edu.cert.grp.lead': 'Leadership & Soft Skills',

      /* --- certificates --- */
      'cert.mcp': '<strong>AI Agent Development & MCP Fundamentals</strong><em>Cyber Clubs Association · 2026</em>',
      'cert.garanti': '<strong>Garanti BBVA — Technology Series (GenAI · ML · Prompt)</strong><em>Coderspace · 2025</em>',
      'cert.clouddevops': '<strong>Cloud & DevOps MiniCamp</strong><em>Globally Check · 2025</em>',
      'cert.devsecops': '<strong>DevSecOps Training — 2025 Cyber Summer Camp</strong><em>Cyber Clubs Association · 2025</em>',
      'cert.ttt': '<strong>Train the Trainer: AI & ML on Google Cloud</strong><em>Google for Developers · 2024</em>',
      'cert.foundations': '<strong>Foundations: Data, Data, Everywhere</strong><em>Google · Coursera · 2026</em>',
      'cert.webdev': '<strong>Web Application Development Training</strong><em>AI & Technology Academy · 2026</em>',
      'cert.entrep': '<strong>Fundamentals of Entrepreneurship</strong><em>AI & Technology Academy · 2026</em>',
      'cert.finance': '<strong>Finance for Entrepreneurs</strong><em>AI & Technology Academy · 2026</em>',
      'cert.law': '<strong>Law for Entrepreneurs</strong><em>AI & Technology Academy · 2026</em>',
      'cert.hr': '<strong>HR for Entrepreneurs</strong><em>AI & Technology Academy · 2026</em>',
      'cert.pm': '<strong>Foundations of Project Management</strong><em>Google · Coursera · 2026</em>',
      'cert.leadership': '<strong>Fundamentals of Leadership Program</strong><em>BireBir Human Academy · 2026</em>',
      'cert.technova': '<strong>TechNova Summit Organization Certificate</strong><em>GDG on Campus Istinye · 2025</em>',

      'ref.kicker': '06 — References',
      'ref.title': 'People I\'ve <span class="accent">worked closely with</span>.',
      'ref.lede': 'My corporate references from internships and projects — team leads and mentors whose guidance I\'ve benefited from. Contact details available on request.',
      'ref.ba.role': 'IT Department Director · T.C. Presidential Communications',
      'ref.ba.meta': 'Lecturer · Ankara & Gazi University',
      'ref.ba.ctx': 'During my internship at the Presidential Communications IT Department, I worked on corporate software projects directly under his supervision.',
      'ref.iy.role': 'Tech Lead · Merzigo',
      'ref.iy.meta': 'Lecturer · Istinye University',
      'ref.iy.ctx': 'Currently leading the technical side of my Merzigo internship focused on .NET 8 · Clean Architecture · CQRS.',
      'ref.on.role': 'General Manager · Afinitem',
      'ref.on.meta': 'Software Engineer',
      'ref.on.ctx': 'At Afinitem, I\'ve absorbed his product-driven engineering vision within start-up agility.',
      'ref.note': 'Reference contact details will be shared upon request during the application process.',

      'contact.kicker': '07 — Contact',
      'contact.title': 'Want to work together? <span class="accent">I\'m open.</span>',
      'contact.lede': 'Junior, freelance, or technical collaboration — email is the fastest way to reach me. Open to full-time roles.',
      'contact.label.email': 'Email',
      'contact.label.phone': 'Phone',

      'footer.copy': '© <span id="year"></span> Muhammed Esat Demir. All rights reserved.',
      'footer.built': 'Istanbul, Türkiye',

      /* --- projects: shared phase labels --- */
      'proj.phase.live': 'Phase 01 · Live',
      'proj.phase.soon': 'Phase 01 · Coming Soon',
      'proj.phase.ent': 'Phase 02 · Enterprise Architecture',
      'proj.phase.deep': 'Phase 03 · Deep Tech',

      /* --- DerbyGoal --- */
      'proj.derby.subtitle': 'A football card & prediction game with 10 game modes built on a dataset of 8,912 players · Web · derbygoal.com',
      'proj.derby.badge': 'Live · Online Multiplayer',
      'proj.derby.desc': 'A digital football game offering <strong>10 game modes</strong> on a dataset of 8,912 players and 6,240 clubs, playable hot-seat, against bots, <strong>and in real-time online</strong>. Nine modes run <strong>server-authoritative</strong> online (the correct answer never leaks to the client until reveal = anti-cheat protection), built on a mode-agnostic multiplayer backbone combining Neon Postgres + Ably hybrid push.',
      'proj.derby.h1': 'Next.js 14 App Router · TypeScript · pure-TS event-sourced game engine (seedable PRNG)',
      'proj.derby.h2': 'Server-authoritative online: atomic matchmaking, optimistic-lock (version), version-based GET',
      'proj.derby.h3': 'Ably hybrid push + Neon Postgres + Better-Auth · invite a friend (private match link)',
      'proj.derby.h4': 'Data pipeline: a validated dataset scraped from the Transfermarkt JSON API across ~34K requests',

      /* --- Vardiya Planı --- */
      'proj.vardiya.subtitle': 'A local-first mobile app for shift workers · live on Google Play',
      'proj.vardiya.badge': 'Google Play · Android',
      'proj.vardiya.desc': 'A local-first, network-independent React Native / Expo app live on Google Play. It generates monthly shifts from cyclic templates, handles cycle-continuity math across month transitions, supports range revision / locked-day protection, and ships with unit tests written in Vitest.',
      'proj.vardiya.h1': 'Zustand store · synchronous hydration from a file repository',
      'proj.vardiya.h2': 'Custom scheduling engine: cycle-offset math, overnight (past-midnight) shift rule',
      'proj.vardiya.h3': 'Light / dark theme, Turkish-aware string handling and CSV export',
      'proj.vardiya.h4': 'Vitest unit tests and an interface-based repository (File + Memory)',

      /* --- Kura — Afinitem --- */
      'proj.kura.name': 'Kura — Afinitem',
      'proj.kura.subtitle': 'Family-medicine supplementary placement (lottery) platform · Web + Mobile',
      'proj.kura.badge': 'Web + iOS + Android',
      'proj.kura.desc': 'An end-to-end platform that ingests the official physician list and the open-position list, collects ranked preferences from physicians, and runs a dynamic placement simulation using <strong>cascading assignment</strong> logic. A single monorepo of three application packages: a FastAPI backend, a web frontend, and a React Native mobile app.',
      'proj.kura.h1': 'Monorepo: FastAPI backend · Web frontend · React Native mobile',
      'proj.kura.h2': 'Dynamic cascading placement algorithm',
      'proj.kura.h3': 'CSV + PDF admin imports, term lifecycle management',
      'proj.kura.h4': 'Async workflow for I/O-bound requests with Async SQLAlchemy + httpx',

      /* --- Orbacle --- */
      'proj.orbacle.subtitle': 'A minimalist mystical divination mobile app · iOS / Android',
      'proj.orbacle.badge': 'iOS + Android',
      'proj.orbacle.desc': 'A fully offline mobile product built with Expo SDK 54 and strict TypeScript. Store-ready with a Reanimated-based animated crystal ball, full i18n (TR/EN), AsyncStorage history, accessibility attributes, and an EAS build pipeline.',
      'proj.orbacle.h1': 'Expo SDK 54 · React 19 · strict TypeScript',
      'proj.orbacle.h2': 'Layered animated orb with Reanimated 4 (idle pulse + opening sequence)',
      'proj.orbacle.h3': 'Bilingual, local history on AsyncStorage, full accessibility',
      'proj.orbacle.h4': 'EAS build profiles (development / preview / production)',

      /* --- YouTube Kanal Yönetimi API --- */
      'proj.ytapi.name': 'YouTube Channel Management API',
      'proj.ytapi.subtitle': 'Merzigo · Enterprise REST API for content management',
      'proj.ytapi.badge': 'Enterprise / Merzigo',
      'proj.ytapi.desc': 'A RESTful API for listing, filtering, sorting YouTube channels in a database and handling Excel / CSV import-export operations. A layered API · Application · Domain · Infrastructure architecture following <strong>Clean Architecture</strong> principles, with FluentValidation, CsvHelper, ClosedXML, and Swagger integrations.',
      'proj.ytapi.h1': 'DI · Repository pattern · xUnit unit tests',
      'proj.ytapi.h2': 'Bulk file- and folder-based CSV / Excel import, filtered export',
      'proj.ytapi.h3': 'Data validation with FluentValidation; global error middleware',
      'proj.ytapi.h4': '12 endpoints, pagination + search + filtering + sorting',

      /* --- Sosyal Yardım Takip Sistemi --- */
      'proj.sosyalyardim.name': 'Social Aid Tracking System',
      'proj.sosyalyardim.subtitle': 'T.C. Presidential Communications · Full-stack application management',
      'proj.sosyalyardim.badge': 'Government / Presidency',
      'proj.sosyalyardim.desc': 'A <strong>full-stack application</strong> I built during my internship at the Presidential Communications IT Department, based on Django REST Framework + React + Material-UI for the digital management of social aid applications. Four roles (Admin / Social Worker / Aid Recipient / Volunteer), JWT authentication, and application lifecycle management.',
      'proj.sosyalyardim.h1': 'Django 5 · DRF · PostgreSQL · JWT · role-based access control (RBAC)',
      'proj.sosyalyardim.h2': 'React 18 · Material-UI · Context API · Axios',
      'proj.sosyalyardim.h3': 'Application lifecycle: Pending → Under Review → Approved / Rejected / Returned',
      'proj.sosyalyardim.h4': 'Delivered for internal use (deployment on public infrastructure is managed by the department)',

      /* --- Belgem --- */
      'proj.belgem.subtitle': 'A secure WYSIWYG editor for T.C. Presidential Communications',
      'proj.belgem.badge': 'Government / Presidency',
      'proj.belgem.desc': 'A secure, client-side, server-independent WYSIWYG text editor built on <strong>pure JavaScript (Vanilla JS)</strong> for the Presidential Communications office. Designed for corporate data security and digital document management needs.',
      'proj.belgem.h1': 'A secure, server-independent editor running fully client-side',
      'proj.belgem.h2': 'UI and text processing customized to corporate needs',
      'proj.belgem.h3': 'Minimal dependencies — a maintenance and security advantage',

      /* --- İçerik Fabrikası --- */
      'proj.icerikfabrikasi.name': 'Content Factory — Video Production Pipeline',
      'proj.icerikfabrikasi.subtitle': 'End-to-end AI orchestration from script to MP4',
      'proj.icerikfabrikasi.badge': 'End-to-End AI',
      'proj.icerikfabrikasi.desc': 'A Streamlit app that automates the production of 9:16 vertical short-form video episodes. It chains Gemini 2.5 Flash as the writer, the Together AI FLUX.1 Schnell image generator, InsightFace face swapping, a Playwright / HTML speech-bubble compositor, and a MoviePy video assembler.',
      'proj.icerikfabrikasi.h1': 'Story Bible → Screenwriter → Render Engine → Video Assembler (4 tabs)',
      'proj.icerikfabrikasi.h2': 'Gemini rotation across 3 API keys + retry/backoff architecture',
      'proj.icerikfabrikasi.h3': 'Per-episode manifest.json, atomic YAML writes, Turkish slugs',
      'proj.icerikfabrikasi.h4': 'Optional InsightFace inswapper_128 face swap (CPU)',

      /* --- Script-to-Sub --- */
      'proj.scripttosub.subtitle': 'Dual-mode subtitle orchestration for Turkish video content',
      'proj.scripttosub.badge': 'Fault-Tolerant AI',
      'proj.scripttosub.desc': '<strong>Mode A</strong> (script-aware): Whisper is used only as a timing source, while the displayed text is always the user-written script. <strong>Mode B</strong> (autonomous): Whisper transcribes, Gemini Flash applies phonetic/TDK/number corrections, and the result is re-aligned using word timestamps. Pixel-perfect output via Demucs vocal isolation + ASS rendering + FFmpeg libass.',
      'proj.scripttosub.h1': '3 keys × 3 models = a 9-combination Gemini fallback matrix',
      'proj.scripttosub.h2': 'Smart error classification: 429 quota / 503 overload / 401 auth',
      'proj.scripttosub.h3': 'Turkish stemmer + an extensible phonetic dictionary for foreign-origin proper nouns',
      'proj.scripttosub.h4': 'Modular structure with 9 sub-modules · single-source configuration',

      /* --- Otonom WhatsApp CRM --- */
      'proj.whatsappcrm.name': 'Autonomous WhatsApp CRM & Sales Assistant',
      'proj.whatsappcrm.subtitle': 'Afinitem · An autonomous AI workflow orchestrated with n8n, portable to FastAPI',
      'proj.whatsappcrm.badge': 'Autonomous AI · Live',
      'proj.whatsappcrm.desc': 'More than a standard "Q&A" bot; an AI ecosystem that is <strong>integrated with the CRM</strong>, runs asynchronously, and can close sales on its own initiative yet <strong>with zero hallucination</strong>. It never makes up a price when data is missing — it guides the customer until the profile is complete, then presents a CRM-verified offer.',
      'proj.whatsappcrm.h1': '<strong>Conditional selling + zero hallucination:</strong> generates prices and offers with CRM verification',
      'proj.whatsappcrm.h2': '<strong>Asynchronous data miner:</strong> writes decision changes to the database in the background without slowing down the main chat',
      'proj.whatsappcrm.h3': '<strong>Vision AI + document recognition:</strong> reads receipts and documents, and — aware of legal boundaries — leaves approval to a human',
      'proj.whatsappcrm.h4': '<strong>Admin override:</strong> when an agent joins the chat, the AI suspends itself for 45 minutes',

      /* --- Otonom YouTube İçerik Fabrikası --- */
      'proj.youtubefactory.name': 'Autonomous YouTube Content Factory',
      'proj.youtubefactory.subtitle': 'Afinitem · End-to-end video production & publishing pipeline',
      'proj.youtubefactory.badge': 'End-to-End AI · Automation',
      'proj.youtubefactory.desc': 'A content production architecture that runs without human intervention, automating the entire process from script generation to publishing on YouTube. The Gemini, Pixabay, TTS, and YouTube Data APIs are chained <strong>within a single n8n orchestration</strong> to feed a channel on a daily/weekly cadence.',
      'proj.youtubefactory.h1': 'AI-assisted script generation + TTS voiceover and segment timing',
      'proj.youtubefactory.h2': 'Gemini keyword extraction → collecting topic-relevant stock video via the Pixabay API',
      'proj.youtubefactory.h3': 'Looped video assembly + subtitles + background music integration',
      'proj.youtubefactory.h4': 'SEO-friendly metadata (title, description, tags) + automatic publishing via the YouTube Data API',

      /* --- BERTurk --- */
      'proj.berturk.name': 'BERTurk — Turkish Sentiment Analysis (Capstone Project)',
      'proj.berturk.subtitle': 'Hotel reviews · multi-model comparison · metric integrity · XAI',
      'proj.berturk.badge': 'R&D · Completed',
      'proj.berturk.desc': 'A completed two-person undergraduate capstone project on three-class (negative / neutral / positive) sentiment analysis and <strong>explainable AI (XAI)</strong> over Turkish hotel reviews. The focus was not only high accuracy but <strong>building an honest evaluation framework that prevents data leakage</strong>: synthetic (AI-generated) samples were kept only in the training set, and the test set was isolated with 100% real user reviews. We experimentally demonstrated that when synthetic data leaks into the test set, the metric is artificially inflated (<em>metric leakage</em>).',
      'proj.berturk.h1': 'Comparing four Transformer architectures under an identical protocol (BERTurk · ELECTRA-tr · mBERT · XLM-RoBERTa)',
      'proj.berturk.h2': '<code>ai_only_in_train</code> isolation + three-method leakage audit (exact-match · normalized · Jaccard)',
      'proj.berturk.h3': 'Weighted Cross Entropy for class imbalance + 751 human-written neutral reviews with contrastive conjunctions',
      'proj.berturk.h4': 'Statistical validation (multi-seed · McNemar · 5-fold CV) + linguistic explainability with LIME / SHAP',
      'proj.berturk.h5': 'End-to-end FastAPI + React demo (single-review prediction, LIME explanation, metric dashboard)',

      /* --- Full-Stack minor cards --- */
      'fs.intranet.name': 'Corporate Intranet Platform',
      'fs.intranet.desc': 'Merzigo · .NET 8 + PostgreSQL · As a developer on the Clean Architecture / CQRS microservice team, I contributed to backend processes including Ocelot API Gateway routes, SuccessFactors API integration, EF Core 8, and Role Management (RBAC + Treeview filtering).',
      'fs.ocr.name': 'Smart OCR System',
      'fs.ocr.desc': 'A deep learning model trained with TensorFlow / Keras + OpenCV image processing (binarization, contour detection, noise reduction) · extracting meaningful text from images via a Flask Web-OCR interface.',
      'fs.castlyo.name': 'Castlyo Platform',
      'fs.castlyo.desc': 'A casting and talent-matching platform I built with a Next.js 14 + NestJS + Drizzle ORM + Redis + Docker · monorepo architecture.',
      'fs.insaat.name': 'Construction Management System',
      'fs.insaat.desc': 'Flask + MySQL · token-based security, automatic PDF reporting, resource management.',
      'fs.imza.name': 'Internal Document Signing Workflow System',
      'fs.imza.desc': 'T.C. Presidential Communications · Node.js + Express + MySQL + React · a digital signing workflow with a dynamic signature order, JWT role-based access control, PDF preview, and email notifications.',
      'fs.evrak.name': 'Document Tracking System',
      'fs.evrak.desc': 'T.C. Presidential Communications · A full-stack document management system based on Flask + MySQL · document lifecycle (registration → approval / rejection / return), RBAC, and a statistics dashboard.',
      'fs.kpi.name': 'AI-Powered KPI Assistant',
      'fs.kpi.desc': 'Gemini API + Streamlit · analyzes company data and offers visual KPI recommendations.',
      'fs.tts.name': 'AI-Based Voiceover Tool',
      'fs.tts.desc': 'A TTS app offering multiple voice options and dynamic file management with Gemini Generative AI.',

      /* --- Corporate tooling --- */
      'tool.textcleaner.name': 'Text Cleaner / Standardizer',
      'tool.textcleaner.desc': 'A Turkish-aware text normalization tool for data quality · Tkinter GUI, corporate identity palette.',
      'tool.locker.name': 'Read-Only Document Locker',
      'tool.locker.desc': 'A desktop tool that converts .docx and .xlsx files into password-protected, read-only versions.',
      'tool.masking.name': 'Personal Data Masking Tool',
      'tool.masking.desc': 'Detection of national IDs, IBANs, phone numbers, and emails in TXT / PDF / DOCX, plus PDF redaction.',
      'tool.videologo.name': 'Video Logo & Overlay Tool',
      'tool.videologo.desc': 'MoviePy + PIL · automatically adds logos, dates, and titles to corporate videos; audio preserved.',
      'tool.survey.name': 'Survey Result Analyzer',
      'tool.survey.desc': 'Automatic statistical analysis from Excel / CSV · dynamic Bar / Pie charts, Excel + PNG export.',
      'tool.xmljson.name': 'XML / JSON Data Converter',
      'tool.xmljson.desc': 'A GUI tool that converts XML and JSON files to CSV / Excel for inter-agency data exchange.',
      'tool.pdfsplitter.name': 'PDF Splitter',
      'tool.pdfsplitter.desc': 'A tool to select a page range via GUI and produce a new PDF · outputs without corrupting the original file.',
      'tool.scheduler.name': 'Scheduler / Reminder',
      'tool.scheduler.desc': 'Runs with a system tray icon; scheduled tasks, audible + visual notifications, JSON persistence.',
      'tool.barcode.name': 'Barcode Generator',
      'tool.barcode.desc': 'A CLI PNG barcode generator supporting EAN13 / Code128 / ISBN13.',
      'tool.docconverter.name': 'Document / PDF Converter',
      'tool.docconverter.desc': 'A Flask + Tailwind tool that converts Word, Excel, PowerPoint, and images to PDF.'
    }
  };

  const applyI18n = (lang) => {
    const dict = I18N[lang] || I18N.tr;
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });
    $$('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.documentElement.setAttribute('lang', lang);

    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    $$('.lang-switch__btn').forEach(btn => {
      const active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    document.title = lang === 'en'
      ? 'Muhammed Esat Demir — Software Engineer'
      : 'Muhammed Esat Demir — Yazılım Mühendisi';
  };

  const storedLang = localStorage.getItem('med-lang') || 'tr';
  applyI18n(storedLang);

  $$('.lang-switch__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (!lang) return;
      localStorage.setItem('med-lang', lang);
      applyI18n(lang);
    });
  });

  /* ----------- Year in footer ----------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------- Theme toggle ----------- */
  const root = document.documentElement;
  const themeBtn = $('#themeToggle');
  const storedTheme = localStorage.getItem('med-theme');
  if (storedTheme) root.setAttribute('data-theme', storedTheme);

  const setThemeIcon = () => {
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('i');
    if (!icon) return;
    const isDark = root.getAttribute('data-theme') === 'dark';
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  };
  setThemeIcon();

  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('med-theme', next);
    setThemeIcon();
  });

  /* ----------- Mobile nav ----------- */
  const navLinks = $('#navLinks');
  const burger   = $('#navBurger');

  const closeMenu = () => {
    if (!navLinks || !burger) return;
    navLinks.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });

  $$('#navLinks a').forEach(a => a.addEventListener('click', closeMenu));

  /* ----------- Sticky nav shadow ----------- */
  const nav = $('#nav');
  const onScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle('is-scrolled', y > 10);
    toTop?.classList.toggle('is-visible', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----------- Back to top ----------- */
  const toTop = $('#toTop');
  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });

  /* ----------- Scroll-reveal (IntersectionObserver) ----------- */
  const revealTargets = [
    '.section__head',
    '.about__text',
    '.about__stats',
    '.timeline__item',
    '.skill-card',
    '.langs',
    '.project',
    '.minor-card',
    '.edu-item',
    '.cert',
    '.contact-card'
  ].join(',');

  $$(revealTargets).forEach(el => el.classList.add('reveal'));

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    $$('.reveal').forEach(el => io.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  /* ----------- Active nav link on scroll ----------- */
  const sections = $$('main section[id]');
  const linkMap = new Map();
  $$('#navLinks a').forEach(a => {
    const id = a.getAttribute('href')?.replace('#', '');
    if (id) linkMap.set(id, a);
  });

  if ('IntersectionObserver' in window) {
    const navIo = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = linkMap.get(id);
        if (!link) return;
        if (entry.isIntersecting) {
          linkMap.forEach(l => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(s => navIo.observe(s));
  }

  /* ----------- Hero particles (lightweight custom canvas) ----------- */
  const canvas = $('#particles');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let rafId = null;
    let running = true;

    const DENSITY = 0.00007;
    const MAX_PARTICLES = 70;
    const LINK_DIST = 130;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width  = rect.width;
      height = rect.height;
      canvas.width  = Math.floor(width  * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(MAX_PARTICLES, Math.max(18, Math.floor(width * height * DENSITY)));
      particles = Array.from({ length: count }, () => spawn());
    };

    const spawn = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.6
    });

    const getAccent = () => {
      const styles = getComputedStyle(root);
      return (styles.getPropertyValue('--primary') || '#7C8CFF').trim();
    };

    const hexToRgb = (hex) => {
      const h = hex.replace('#', '');
      const full = h.length === 3
        ? h.split('').map(c => c + c).join('')
        : h;
      const v = parseInt(full, 16);
      return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      const { r, g, b } = hexToRgb(getAccent().startsWith('#') ? getAccent() : '#7C8CFF');

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.55)`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b2 = particles[j];
          const dx = a.x - b2.x;
          const dy = a.y - b2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.22;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b2.x, b2.y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafId) return;
      running = true;
      tick();
    };
    const stop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    };

    resize();
    start();

    let rto = null;
    window.addEventListener('resize', () => {
      clearTimeout(rto);
      rto = setTimeout(resize, 150);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else start();
    });

    const heroEl = $('#hero');
    if (heroEl && 'IntersectionObserver' in window) {
      const heroIo = new IntersectionObserver(entries => {
        entries.forEach(e => { e.isIntersecting ? start() : stop(); });
      }, { threshold: 0.01 });
      heroIo.observe(heroEl);
    }
  }

})();
