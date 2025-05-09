document.addEventListener('DOMContentLoaded', function() {
    // Contoh 1: Animasi Fade-In pada bagian-bagian
    const sections = document.querySelectorAll('.fade-in');
    sections.forEach(section => {
        section.style.opacity = 0;
        let delay = section.offsetTop * 0.001;
        setTimeout(() => {
            section.style.transition = 'opacity 1s ease-in-out';
            section.style.opacity = 1;
        }, delay);
    });

    // Contoh 2: Efek Hover pada Logo
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseover', () => {
        logo.style.transform = 'scale(1.1)';
    });
    logo.addEventListener('mouseout', () => {
        logo.style.transform = 'scale(1)';
    });

    // Contoh 3: Efek Hover pada Judul
    const title = document.querySelector('h1');
    title.addEventListener('mouseover', () => {
        title.style.color = '#4CAF50';
    });
    title.addEventListener('mouseout', () => {
        title.style.color = '#2c3e50';
    });

    // Contoh 4: Toggle Daftar Pengalaman dengan Animasi
    const experienceListItems = document.querySelectorAll('.experience ul li');
    const toggleButton = document.querySelector('.toggle-button');
    let isExpanded = false;

    if (experienceListItems.length > 1) {
        for (let i = 1; i < experienceListItems.length; i++) {
            experienceListItems[i].classList.add('hidden');
        }

        toggleButton.addEventListener('click', function() {
            isExpanded = !isExpanded;
            for (let i = 1; i < experienceListItems.length; i++) {
                if (isExpanded) {
                    experienceListItems[i].classList.remove('hidden');
                    experienceListItems[i].classList.add('fade-in');
                } else {
                    experienceListItems[i].classList.remove('fade-in');
                    experienceListItems[i].classList.add('hidden');
                }
            }
            this.textContent = isExpanded
                ? 'Tampilkan Lebih Sedikit Pengalaman'
                : 'Tampilkan Lebih Banyak Pengalaman';
        });
    }

    // Contoh 5: Efek Hover pada Keahlian dan Bahasa
    const skillItems = document.querySelectorAll('.skills ul li, .languages ul li');
    skillItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.backgroundColor = '#4CAF50';
            item.style.color = 'white';
            item.style.transform = 'translateY(-2px)';
        });
        item.addEventListener('mouseout', () => {
            item.style.backgroundColor = '#e0f2f7';
            item.style.color = '#1a237e';
            item.style.transform = 'translateY(0)';
        });
    });
});