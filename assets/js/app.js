'use strict';

const menuIcon = document.querySelector('.menu-icon');
const getInTouchButton = document.querySelector('.get-in-touch-button');

// ------------------ MENU TOGGLE ------------------
function closeActiveElements(event) {
    menuIcon.classList.remove('active');
    getInTouchButton.classList.remove('active');
    removeEventListeners();
}

function addEventListeners() {
    document.addEventListener('click', closeActiveElements);
    document.addEventListener('scroll', closeActiveElements);
}

function removeEventListeners() {
    document.removeEventListener('click', closeActiveElements);
    document.removeEventListener('scroll', closeActiveElements);
}

menuIcon.addEventListener('click', function (event) {
    menuIcon.classList.toggle('active');
    getInTouchButton.classList.toggle('active');

    if (menuIcon.classList.contains('active') || getInTouchButton.classList.contains('active')) {
        addEventListeners();
    } else {
        removeEventListeners();
    }

    event.stopPropagation();
});

// ------------------ TYPEWRITER EFFECT ------------------
const subheading = document.querySelector('.subheading');
if(subheading) {
    const text = subheading.textContent;
    subheading.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            subheading.textContent += text[index];
            index++;
            setTimeout(typeWriter, 40);
        }
    }

    window.addEventListener('load', typeWriter);
}

// ------------------ SKILLS SECTION ------------------
const languagesSection = document.querySelector('.technologies');
if(languagesSection) {
    const heading = languagesSection.querySelector('h3');
    const subheading2 = languagesSection.querySelector('.subheading2');

    const languagesObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                heading.classList.add('active');
                setTimeout(() => subheading2.classList.add('active'), 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    languagesObserver.observe(languagesSection);

    // Tech cards
    const techCards = document.querySelectorAll('.tech-card');
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const card = entry.target;
            if(entry.isIntersecting && card.style.display !== 'none') {
                card.style.animation = 'fadeSlideIn 0.6s forwards';
                const progressBar = card.querySelector('.progress-bar');
                const level = progressBar.dataset.level;
                setTimeout(() => progressBar.style.width = level, 100);
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.2 });

    techCards.forEach(card => cardObserver.observe(card));

    // Show More / Show Less
    const showMoreBtn = document.querySelector('.show-more-btn');

    function updateVisibleTechCards() {
        const initialVisible = 3;
        let hiddenExists = false;

        techCards.forEach((card, index) => {
            if(index < initialVisible) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                hiddenExists = true;
            }
        });

        if(hiddenExists) {
            showMoreBtn.parentElement.style.display = 'block';
            showMoreBtn.textContent = 'See More';
        } else {
            showMoreBtn.parentElement.style.display = 'none';
        }
    }

    window.addEventListener('load', updateVisibleTechCards);
    window.addEventListener('resize', updateVisibleTechCards);

    showMoreBtn.addEventListener('click', () => {
        const anyHidden = Array.from(techCards).some(card => card.style.display === 'none');
        techCards.forEach(card => {
            if(anyHidden) {
                card.style.display = 'flex';
                cardObserver.observe(card);
            } else {
                updateVisibleTechCards();
            }
        });
        showMoreBtn.textContent = anyHidden ? 'Show Less' : 'See More';
    });
}

// ------------------ PROJECTS SECTION ------------------
const projectsSection = document.querySelector('.projects');
if(projectsSection) {
    const projectCardsAll = document.querySelectorAll('.project-card');
    const projectsShowMoreBtn = document.querySelector('.projects-show-more-btn');
    const projectGrid = document.querySelector('.projects-grid');

    // IntersectionObserver for project cards (only animate visible)
    const projectObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            const card = entry.target;
            if(entry.isIntersecting && !card.classList.contains('hidden')) {
                setTimeout(() => card.classList.add('active'), index * 150);
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.3 });

    projectCardsAll.forEach(card => projectObserver.observe(card));

    // Animate heading/subheading
    const projectsHeading = projectsSection.querySelector('h4');
    const projectsSubheading = projectsSection.querySelector('.subheading2');

    const projectsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectsHeading.classList.add('active');
                setTimeout(() => projectsSubheading.classList.add('active'), 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    projectsObserver.observe(projectsSection);

    // Show More / Show Less logic
    function updateVisibleProjectCards() {
        const gridWidth = projectGrid.clientWidth;
        const cardWidth = projectCardsAll[0].getBoundingClientRect().width;
        const gap = parseInt(getComputedStyle(projectGrid).gap) || 0;

        let cardsPerRow = Math.floor((gridWidth + gap) / (cardWidth + gap));
        if(window.innerWidth <= 450) cardsPerRow = 1;
        else cardsPerRow = Math.min(cardsPerRow, 4);

        projectCardsAll.forEach((card, index) => {
            if(index < cardsPerRow) card.classList.remove('hidden');
            else card.classList.add('hidden');
        });

        const hiddenExists = Array.from(projectCardsAll).some(card => card.classList.contains('hidden'));
        projectsShowMoreBtn.parentElement.style.display = hiddenExists ? 'flex' : 'none';
        projectsShowMoreBtn.textContent = 'See More';
    }

    window.addEventListener('load', updateVisibleProjectCards);
    window.addEventListener('resize', updateVisibleProjectCards);

    projectsShowMoreBtn.addEventListener('click', () => {
        const anyHidden = Array.from(projectCardsAll).some(card => card.classList.contains('hidden'));
        if(anyHidden) projectCardsAll.forEach(card => card.classList.remove('hidden'));
        else updateVisibleProjectCards();
        projectsShowMoreBtn.textContent = anyHidden ? 'Show Less' : 'See More';
    });
}

// ------------------ ANIMATE ON SCROLL (GENERAL) ------------------
const aboutElements = document.querySelectorAll('.animate-on-scroll');
const aboutObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('active');
            const paragraphs = el.querySelectorAll('.stagger');
            paragraphs.forEach((p, i) => setTimeout(() => p.classList.add('active'), i * 200));
            observer.unobserve(el);
        }
    });
}, { threshold: 0.3 });

aboutElements.forEach(el => aboutObserver.observe(el));
