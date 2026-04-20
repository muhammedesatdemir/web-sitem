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

      'hero.badge': 'Yeni fırsatlara açık · Junior',
      'hero.role': 'Yazılım Mühendisi · <span class="accent">Ürün & AI Entegrasyonu</span>',
      'hero.lede': 'Üç farklı ekosistemde (kamu, kurumsal, start-up) <strong>gerçek kullanıcıyla buluşmaya hazır</strong> sistemler kurdum. Clean Architecture, React/React Native, FastAPI ve .NET 8 tarafında ölçeklenebilir sistemler; Gemini ve Whisper tabanlı orkestrasyonlarla çoklu-model fallback\'li AI pipeline\'ları tasarlıyorum.',
      'hero.cta.projects': 'Öne Çıkan Projeleri Gör',
      'hero.cta.contact': 'İletişime Geç',
      'hero.meta.location': 'İstanbul, Türkiye',
      'hero.meta.edu': 'İstinye Üniversitesi · AGNO 3.58',
      'hero.meta.work': 'Kamu · Kurumsal · Start-up Deneyimi',
      'hero.meta.availability': 'Haziran 2026\'dan itibaren tam zamanlı',

      'about.kicker': '01 — Hakkımda',
      'about.title': 'Kod yazmaktan çok, <span class="accent">ürün çıkarmaktan</span> keyif alıyorum.',
      'about.p1': 'Kamu (T.C. İletişim Başkanlığı), kurumsal (Merzigo) ve start-up (Afinitem) olmak üzere üç farklı ekosistemde backend\'den mobile uçtan uca geliştirme tecrübesi edinmiş, canlıya çıkmaya hazır üç ürün inşa etmiş bir Yazılım Mühendisliği son sınıf öğrencisiyim.',
      'about.availability': '<strong>Müsaitlik:</strong> Şu an iki stajı haftayı bölerek paralel yürütüyorum (Merzigo + Afinitem, gönüllü). Haziran 2026 ortasından itibaren <strong>tam zamanlı</strong> rollere açığım.',
      'about.p2': 'Kurumsal süreçlerde <strong>.NET 8, Clean Architecture ve CQRS</strong> ile ölçeklenebilir API\'ler; web ve mobilde <strong>React / React Native ve TypeScript</strong> ile modern arayüzler geliştiriyorum. Ayrıca <strong>FastAPI ve PostgreSQL</strong> ile algoritmik servisler kuruyor; <strong>Gemini, Whisper ve Together AI</strong> ile hata toleransı ve model fallback\'i olan AI pipeline\'ları tasarlıyorum.',
      'about.stat.gpa': 'AGNO · 4.00',
      'about.stat.intern': 'Farklı Ekosistem<br><em class="stat__sub">Kamu · Kurumsal · Start-up</em>',
      'about.stat.shipped': 'Canlıya Çıkan Ürün',
      'about.stat.certs': 'Sertifika & Program',

      'exp.kicker': '02 — Deneyim',
      'exp.title': 'Üç ekosistem · <span class="accent">backend\'den mobile</span>.',
      'exp.role.intern': 'Yazılım Stajyeri',
      'exp.role.gdg': 'Proje Koordinatörü · Core Team',
      'date.mar2026now': 'Mart 2026 — Devam Ediyor',
      'date.oct2025now': 'Ekim 2025 — Devam Ediyor',

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
      'contact.lede': 'Junior, freelance ya da teknik işbirliği — en hızlı ulaşmak için e-posta. Haziran 2026 ortasından itibaren tam zamanlı uygun.',
      'contact.label.email': 'E-posta',
      'contact.label.phone': 'Telefon',

      'footer.copy': '© <span id="year"></span> Muhammed Esat Demir. Tüm hakları saklıdır.',
      'footer.built': 'İstanbul, Türkiye'
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

      'hero.badge': 'Open to new opportunities · Junior',
      'hero.role': 'Software Engineer · <span class="accent">Product & AI Integration</span>',
      'hero.lede': 'I\'ve built <strong>production-ready</strong> products across three ecosystems (public, corporate, start-up). I design scalable systems with Clean Architecture, React/React Native, FastAPI and .NET 8; and multi-model fallback AI pipelines with Gemini, Whisper and Together AI.',
      'hero.cta.projects': 'View Featured Projects',
      'hero.cta.contact': 'Get in Touch',
      'hero.meta.location': 'Istanbul, Türkiye',
      'hero.meta.edu': 'Istinye University · GPA 3.58',
      'hero.meta.work': 'Public · Corporate · Start-up Experience',
      'hero.meta.availability': 'Available full-time from June 2026',

      'about.kicker': '01 — About',
      'about.title': 'I enjoy shipping products <span class="accent">more than writing code</span>.',
      'about.p1': 'I\'m a senior-year Software Engineering student with end-to-end development experience across three different ecosystems — public sector (T.C. Presidential Communications), corporate (Merzigo), and start-up (Afinitem) — having built three products ready to launch, from backend to mobile.',
      'about.availability': '<strong>Availability:</strong> Currently splitting the week between two voluntary internships (Merzigo + Afinitem). Open to <strong>full-time</strong> roles starting mid-June 2026.',
      'about.p2': 'In corporate environments, I build scalable APIs with <strong>.NET 8, Clean Architecture, and CQRS</strong>; modern web and mobile interfaces with <strong>React / React Native and TypeScript</strong>. I also craft algorithmic services with <strong>FastAPI and PostgreSQL</strong>, and design fault-tolerant AI pipelines with <strong>Gemini, Whisper, and Together AI</strong> using multi-model fallback architectures.',
      'about.stat.gpa': 'GPA · 4.00',
      'about.stat.intern': 'Ecosystems<br><em class="stat__sub">Public · Corporate · Start-up</em>',
      'about.stat.shipped': 'Shipping Products',
      'about.stat.certs': 'Certificates & Programs',

      'exp.kicker': '02 — Experience',
      'exp.title': 'Three ecosystems · <span class="accent">backend to mobile</span>.',
      'exp.role.intern': 'Software Intern',
      'exp.role.gdg': 'Project Coordinator · Core Team',
      'date.mar2026now': 'Mar 2026 — Present',
      'date.oct2025now': 'Oct 2025 — Present',

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
      'contact.lede': 'Junior, freelance, or technical collaboration — email is the fastest way to reach me. Available full-time from mid-June 2026.',
      'contact.label.email': 'Email',
      'contact.label.phone': 'Phone',

      'footer.copy': '© <span id="year"></span> Muhammed Esat Demir. All rights reserved.',
      'footer.built': 'Istanbul, Türkiye'
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
