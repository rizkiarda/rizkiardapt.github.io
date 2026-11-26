/**
 * Mulan Resume / CV Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavigation();
  initPortfolioFilter();
  initPortfolioModal();
  initContactForm();
  initCounters();
});

/* ----------------------------------------------------
   1. Theme Management (Dark / Light Mode)
   ---------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
    updateThemeIcon(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeIcon(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    });
  }

  function updateThemeIcon(isDark) {
    if (!themeIcon) return;
    if (isDark) {
      themeIcon.innerHTML = `<svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path></svg>`;
    } else {
      themeIcon.innerHTML = `<svg class="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`;
    }
  }
}

/* ----------------------------------------------------
   2. Typing Animation Effect (Mulan Signature Header)
   ---------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const words = [
    'UI/UX Design & Prototyping',
    'Editorial & Book Layout Design',
    'Graphic & Brand Visual Design'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const delayBetweenWords = 1800;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
      typingElement.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      typingElement.textContent = currentWord.substring(0, charIndex);
    }

    let speed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ----------------------------------------------------
   3. Tab Navigation System
   ---------------------------------------------------- */
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Update active nav button
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Update active pane
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `tab-${targetTab}`) {
          pane.classList.add('active');
          
          // Re-trigger skill bars if resume tab
          if (targetTab === 'resume') {
            animateSkillBars();
          }
        }
      });

      // On mobile screens, scroll down to content
      if (window.innerWidth < 1024) {
        const contentArea = document.getElementById('main-content');
        if (contentArea) {
          contentArea.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Direct trigger buttons (e.g., "Hire Me" or "Contact Me" in profile)
  document.querySelectorAll('[data-goto-tab]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const target = trigger.getAttribute('data-goto-tab');
      const targetBtn = document.querySelector(`.nav-btn[data-tab="${target}"]`);
      if (targetBtn) targetBtn.click();
    });
  });
}

function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  bars.forEach(bar => {
    const target = bar.getAttribute('data-percent') || '80%';
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = target;
    }, 150);
  });
}

/* ----------------------------------------------------
   4. Portfolio Filtering System
   ---------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-indigo-600', 'text-white'));
      filterBtns.forEach(b => b.classList.add('text-slate-600', 'dark:text-slate-400', 'bg-slate-100', 'dark:bg-slate-800'));

      btn.classList.add('active', 'bg-indigo-600', 'text-white');
      btn.classList.remove('text-slate-600', 'dark:text-slate-400', 'bg-slate-100', 'dark:bg-slate-800');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const categories = (item.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
   5. Portfolio Modal (Preview Details)
   ---------------------------------------------------- */
const projectData = {
  'cert-fcc': {
    title: 'Responsive Web Design Developer Certification',
    category: 'Sertifikasi Internasional / freeCodeCamp',
    date: '17 Juli 2025',
    client: 'freeCodeCamp.org (Quincy Larson, Executive Director)',
    image: 'assets/images/portfolio/cert_fcc_rwd.png',
    description: 'Sertifikasi resmi penguasaan Responsive Web Design dari freeCodeCamp.org yang merepresentasikan kurikulum intensif ~300 jam pembelajaran dan pengerjaan 5 proyek web mandiri: Survey Form, Tribute Page, Technical Documentation Page, Product Landing Page, dan Personal Portfolio Webpage. Menguasai HTML5 semantik, modern CSS3, CSS Grid, Flexbox, media query responsif, serta kaidah Web Content Accessibility Guidelines (WCAG).',
    techStack: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox', 'CSS Grid', 'Web Accessibility (a11y)'],
    features: [
      'Representasi ~300 jam kurikulum intensif dan proyek praktik coding mandiri',
      'Penyelesaian 5 proyek aplikasi web responsif teruji sesuai spesifikasi W3C',
      'Penerapan tata letak modern Flexbox, CSS Grid, dan Media Queries',
      'Kredensial resmi terverifikasi secara global di platform freecodecamp.org'
    ],
    liveUrl: 'https://www.freecodecamp.org/certification/rizki_arda/responsive-web-design',
    githubUrl: 'https://github.com/rizkiarda'
  },
  'psd-1': {
    title: 'Poster Kejuaraan Karate Terbuka Series I FORKI 2025',
    category: 'Design Grafis (PSD) / Event Poster',
    date: '2025',
    client: 'FORKI Kota Pontianak & Disporapar Prov. Kalbar',
    image: 'assets/images/portfolio/poster_karate_forki.jpg',
    description: 'Desain poster promosi resmi Kejuaraan Karate Terbuka Series I FORKI Kota Pontianak 2025. Mengusung konsep visual dinamis dengan brush splatter effect, kombinasi foto atlet bertekstur monokrom, serta hierarki tipografi tegas untuk kategori usia tanding.',
    techStack: ['Adobe Photoshop (PSD)', 'Graphic Design', 'Visual Hierarchy', 'Print CMYK'],
    features: [
      'Penerapan efek brush & texture splatter dinamis',
      'Penataan hierarki informasi kategori kejuaraan (Pra Usia Dini s.d. Senior)',
      'Integrasi logo resmi Pemkot Pontianak, Disporapar, KONI, FORKI, dan Mandiri',
      'Layout standar publikasi media cetak & banner promosi digital'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/rizkiarda'
  },
  'psd-2': {
    title: 'Banner Promosi Rumah Makan Masakan Padang Cahayo Minang',
    category: 'Design Grafis (PSD) / Commercial Banner',
    date: '2024',
    client: 'Rumah Makan Cahayo Minang (Singkawang)',
    image: 'assets/images/portfolio/banner_padang_cahayo.jpg',
    description: 'Desain spanduk dan banner promosi komersial untuk rumah makan khas Minang "Cahayo Minang" di Jalan Veteran, Singkawang. Menampilkan ornamen etnik Rumah Gadang, foto hidangan kuliner beresolusi tinggi, badge promo harga Rp13.000, serta CTA nomor pemesanan yang kontras.',
    techStack: ['Adobe Photoshop (PSD)', 'Advertising Design', 'Photo Manipulation', 'Outdoor Print'],
    features: [
      'Komposisi visual hidangan kuliner menggugah selera',
      'Badge promosi mencolok (Paket Nasi Ayam 13RB)',
      'Aksen latar belakang ornamen khas Minangkabau',
      'Penempatan call-to-action (CTA) kontak WhatsApp dan titik lokasi yang jelas'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/rizkiarda'
  },
  'psd-3': {
    title: 'Desain Cover & 3D Mockup Buku RPPM Kurikulum Merdeka',
    category: 'Design Grafis (PSD) / Book & Editorial Cover',
    date: '2025 / 2026',
    client: 'Drs. Nurul Muhson, M.Pd (SMP Kelas IX)',
    image: 'assets/images/portfolio/cover_buku_rppm.jpg',
    description: 'Desain sampul buku dan visualisasi 3D mockup buku Rencana Pelaksanaan Pembelajaran Mendalam (RPPM) Mata Pelajaran PAI & Budi Pekerti SMP Kelas IX Tahun Ajaran 2025/2026. Menampilkan infografis alur tahapan pembelajaran (Identifikasi, Desain, Pengalaman, Asesmen) dan grid galeri aktivitas pembelajaran.',
    techStack: ['Adobe Photoshop (PSD)', '3D Mockup', 'Editorial Layout', 'Educational Media'],
    features: [
      'Visualisasi 3D book mockup profesional dengan bayangan & pantulan realistis',
      'Layout infografis terstruktur pada sampul belakang (4 Langkah RPPM)',
      'Aksen geometris modern berpadu dengan logo resmi Kurikulum Merdeka',
      'Format siap cetak standar penerbitan buku pendidikan nasional'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/rizkiarda'
  },
  'psd-4': {
    title: 'Konten Media Sosial Edukasi Beasiswa LPDP (alf.id)',
    category: 'Design Grafis (PSD) / Social Media Design',
    date: '2024',
    client: 'alf.id (Abroad Learning Fellowship)',
    image: 'assets/images/portfolio/story_beasiswa_lpdp.jpg',
    description: 'Desain konten visual format story Instagram vertikal (9:16) bertema edukasi beasiswa pascasarjana: "Keunggulan Beasiswa LPDP Selain Benefit Finance". Menghadirkan desain minimalis, tipografi clean, badge 3D medal, serta palet warna oranye khas identitas brand alf.id.',
    techStack: ['Adobe Photoshop (PSD)', 'Social Media Design', 'Typography', 'Branding Kit'],
    features: [
      'Rasio aspek 9:16 (1080x1920) optimal untuk Instagram Stories & TikTok',
      'Penataan tipografi teks bertingkat dengan keterbacaan tinggi di layar HP',
      'Pemanfaatan elemen 3D badge penghargaan & latar belakang bokeh halus',
      'Konsistensi identitas warna korporat brand edukasi'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/rizkiarda'
  },
  'uiux-1': {
    title: 'Food Delivery App Interactive Prototype',
    category: 'UI/UX & App Prototype',
    date: '2024',
    client: 'Proyek Perancangan Interaksi Mobile',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
    description: 'Perancangan antarmuka dan purwarupa interaktif aplikasi pemesanan makanan berbasis mobile. Berfokus pada perancangan alur pemesanan (user flow), tata letak navigasi yang intuitif, arsitektur informasi menu kuliner, serta simulasi checkout dan pelacakan pesanan.',
    techStack: ['Figma', 'UI/UX Design', 'Interactive Prototyping', 'User Flow', 'Design System'],
    features: [
      'Perancangan alur pemesanan (user flow) dari pemilihan menu hingga checkout',
      'Desain wireframe dan High-Fidelity Interactive Prototype',
      'Penyusunan arsitektur informasi dan hierarki visual menu kuliner',
      'Pengujian navigasi antarmuka berbasis kemudahan pengguna'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/rizkiarda'
  },
  'uiux-2': {
    title: 'Studi Kasus UI/UX Aplikasi Edukasi Anak Interaktif (Skripsi)',
    category: 'UI/UX Case Study & Penelitian',
    date: '2024 - 2025',
    client: 'Tugas Akhir / Skripsi - S1 Sistem Informasi UNU Kalbar',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
    description: 'Riset dan perancangan antarmuka pengguna untuk aplikasi pembelajaran anak interaktif menggunakan metode User-Centered Design (UCD). Mengakomodasi karakteristik psikomotorik anak usia dini melalui navigasi visual ramah anak, pemilihan palet warna edukatif, serta mekanisme reward gamifikasi.',
    techStack: ['Figma', 'User-Centered Design (UCD)', 'Wireframing', 'Interactive Prototype', 'Usability Testing (SUS)'],
    features: [
      'Riset kebutuhan pengguna (anak & pendamping) melalui observasi dan persona',
      'Perancangan alur gamifikasi pembelajaran interaktif dengan feedback visual instan',
      'Pembuatan design system khusus ramah anak (ikon besar, tipografi keterbacaan tinggi)',
      'Evaluasi kegunaan sistem terukur dengan metode System Usability Scale (SUS)'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/rizkiarda'
  },
  'uiux-3': {
    title: 'Perancangan Alur Sistem B2B: Order & Work Order Management',
    category: 'System Analysis & PRD Documentation',
    date: '2024',
    client: 'Studi Kasus Analisis & Perancangan Sistem Informasi Bisnis',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    description: 'Analisis kebutuhan sistem dan dokumentasi spesifikasi produk (PRD) untuk pengelolaan rantai pesanan B2B hingga penerbitan surat perintah kerja operasional (Work Order). Menghubungkan proses approval antar departemen dengan dashboard backoffice terintegrasi.',
    techStack: ['Product Requirement Document (PRD)', 'BPMN Process Flow', 'UML / Use Case Diagram', 'Database Schema (ERD)', 'Backoffice UI Design'],
    features: [
      'Pemetaan proses bisnis end-to-end menggunakan diagram BPMN & flowchart alur kerja',
      'Penyusunan dokumen PRD lengkap: Functional Requirements, Non-Functional, & User Stories',
      'Perancangan skema relasi basis data (ERD) untuk status Order dan Work Order',
      'Rancangan purwarupa antarmuka dashboard monitoring tim operasional di Figma'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/rizkiarda'
  },
  1: {
    title: 'Food Delivery App Interactive Prototype',
    category: 'UI/UX & App Prototype',
    date: '2024',
    client: 'Proyek Perancangan Interaksi Mobile',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
    description: 'Perancangan antarmuka dan purwarupa interaktif aplikasi pemesanan makanan berbasis mobile. Berfokus pada perancangan alur pemesanan (user flow), tata letak navigasi yang intuitif, arsitektur informasi menu kuliner, serta simulasi checkout dan pelacakan pesanan.',
    techStack: ['Figma', 'UI/UX Design', 'Interactive Prototyping', 'User Flow', 'Design System'],
    features: [
      'Perancangan alur pemesanan (user flow) dari pemilihan menu hingga checkout',
      'Desain wireframe dan High-Fidelity Interactive Prototype',
      'Penyusunan arsitektur informasi dan hierarki visual menu kuliner',
      'Pengujian navigasi antarmuka berbasis kemudahan pengguna'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/rizkiarda'
  },
  4: {
    title: 'Layout Buku & Majalah Program Nasional POP 2021',
    category: 'Editorial & Graphic Design',
    date: '2021 - 2022',
    client: 'Yayasan Forum Indonesia Menulis',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
    description: 'Proyek tata letak buku, majalah cetak, dan perancangan cover buku publikasi resmi Program Organisasi Penggerak (POP) Nasional Kementerian Pendidikan.',
    techStack: ['Adobe InDesign', 'Adobe Photoshop', 'Tipografi Editorial', 'Print Pre-press'],
    features: [
      'Tata letak naskah buku ratusan halaman berstandar penerbitan',
      'Desain cover buku eye-catching beresolusi cetak tinggi (CMYK)',
      'Pembuatan template grid dan master page majalah',
      'Pelatihan tutor freelancer dan koordinasi divisi humas'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/rizkiarda'
  }
};

function initPortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  if (!modal) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const data = projectData[id];
      if (!data) return;

      document.getElementById('modal-image').src = data.image;
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-category').textContent = data.category;
      document.getElementById('modal-date').textContent = data.date;
      document.getElementById('modal-client').textContent = data.client;
      document.getElementById('modal-description').textContent = data.description;

      // Tech Stack Badges
      const techContainer = document.getElementById('modal-tech');
      techContainer.innerHTML = '';
      data.techStack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60';
        span.textContent = tech;
        techContainer.appendChild(span);
      });

      // Features List
      const featuresContainer = document.getElementById('modal-features');
      featuresContainer.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.className = 'flex items-center text-sm text-slate-600 dark:text-slate-300';
        li.innerHTML = `
          <svg class="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
          </svg>
          ${feat}
        `;
        featuresContainer.appendChild(li);
      });

      // Links
      const githubLink = document.getElementById('modal-github');
      if (githubLink) githubLink.href = data.githubUrl;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });
}

/* ----------------------------------------------------
   6. Contact Form & Feedback Toast
   ---------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('contact-toast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !message) {
      alert('Harap lengkapi semua kolom formulir.');
      return;
    }

    // Optional direct WhatsApp redirect option
    const btnSubmit = form.querySelector('button[type="submit"]');
    const originalText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = '<span>Mengirim...</span>';
    btnSubmit.disabled = true;

    setTimeout(() => {
      btnSubmit.innerHTML = originalText;
      btnSubmit.disabled = false;
      form.reset();

      if (toast) {
        toast.classList.remove('hidden');
        setTimeout(() => {
          toast.classList.add('hidden');
        }, 5000);
      } else {
        alert('Terima kasih! Pesan Anda telah terkirim.');
      }
    }, 1000);
  });
}

/* ----------------------------------------------------
   7. Animated Stat Counters
   ---------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const step = Math.ceil(target / 40);

      const updateCount = () => {
        count += step;
        if (count < target) {
          counter.innerText = count;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }

  // Trigger on load
  runCounters();
}
