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
    'Mobile App Developer',
    'UI / UX Designer (Figma)',
    'Graphic & Layout Designer',
    'Mahasiswa Teknik Informatika UNU Kalbar'
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
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
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
  1: {
    title: 'Food Delivery Mobile App',
    category: 'Mobile Application',
    date: '2024',
    client: 'Kuliah Pemrograman Mobile',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
    description: 'Aplikasi mobile pemesanan makanan berbasis Android/Flutter dengan tampilan modern, katalog hidangan, keranjang belanja, serta simulasi checkout terintegrasi.',
    techStack: ['Android', 'Java', 'Flutter', 'UI/UX', 'SQLite/REST API'],
    features: [
      'Antarmuka pengguna interaktif dan responsif',
      'Katalog menu makanan berdasarkan kategori',
      'Keranjang belanja dan kalkulasi total harga',
      'Desain modern mengikuti pedoman Material Design'
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
