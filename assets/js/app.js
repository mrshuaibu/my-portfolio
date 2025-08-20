'use strict';

// ------------------ MENU TOGGLE ------------------
const menuIcon = document.querySelector('.menu-icon');
const getInTouchButton = document.querySelector('.get-in-touch-button');

function closeActiveElements() {
    menuIcon.classList.remove('active');
    getInTouchButton.classList.remove('active');
}

menuIcon.addEventListener('click', function (event) {
    menuIcon.classList.toggle('active');
    getInTouchButton.classList.toggle('active');
    event.stopPropagation();
});

document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target)) closeActiveElements();
});

// ------------------ TYPEWRITER EFFECT ------------------
const subheading = document.querySelector('.subheading');
if (subheading) {
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
if (languagesSection) {
    const heading = languagesSection.querySelector('h3');
    const subheading2 = languagesSection.querySelector('.subheading2');
    const techCards = document.querySelectorAll('.tech-card');
    const showMoreBtn = document.querySelector('.show-more-btn');
    let techExpanded = false;

    // Animate heading and subheading
    const languagesObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heading.classList.add('active');
                setTimeout(() => subheading2.classList.add('active'), 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    languagesObserver.observe(languagesSection);

    function animateTechCard(card) {
        if (card.dataset.animated) return;
        card.style.animation = 'fadeSlideIn 0.6s forwards';
        const progressBar = card.querySelector('.progress-bar');
        const level = progressBar.dataset.level;
        setTimeout(() => progressBar.style.width = level, 100);
        card.dataset.animated = "true";
    }

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.style.display !== 'none') {
                animateTechCard(entry.target);
            }
        });
    }, { threshold: 0.2 });

    techCards.forEach(card => cardObserver.observe(card));

    function updateVisibleTechCards() {
        const initialVisible = 3;
        techCards.forEach((card, index) => {
            if (techExpanded) {
                card.style.display = 'flex';
            } else {
                card.style.display = index < initialVisible ? 'flex' : 'none';
            }
        });
        showMoreBtn.textContent = techExpanded ? 'Show Less' : 'See More';
    }

    showMoreBtn.addEventListener('click', () => {
        techExpanded = !techExpanded;
        updateVisibleTechCards();
    });

    window.addEventListener('load', updateVisibleTechCards);
    window.addEventListener('resize', () => {
        if (!techExpanded) updateVisibleTechCards();
    });
}

// ------------------ PROJECTS SECTION ------------------
const projectsSection = document.querySelector('.projects');
if (projectsSection) {
    const projectCardsAll = document.querySelectorAll('.project-card');
    const projectsShowMoreBtn = document.querySelector('.projects-show-more-btn');
    const projectGrid = document.querySelector('.projects-grid');
    let projectsExpanded = false;

    function animateProjectCard(card) {
        if (card.dataset.animated) return;
        card.classList.add('active');
        card.dataset.animated = "true";
    }

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('hidden')) {
                animateProjectCard(entry.target);
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

    function updateVisibleProjectCards() {
        const cardsPerRow = window.innerWidth <= 450 ? 1 : Math.min(4, projectCardsAll.length);
        projectCardsAll.forEach((card, index) => {
            if (projectsExpanded) {
                card.classList.remove('hidden');
            } else {
                card.classList.toggle('hidden', index >= cardsPerRow);
            }
        });
        projectsShowMoreBtn.textContent = projectsExpanded ? 'Show Less' : 'See More';
    }

    projectsShowMoreBtn.addEventListener('click', () => {
        projectsExpanded = !projectsExpanded;
        updateVisibleProjectCards();
    });

    window.addEventListener('load', updateVisibleProjectCards);
    window.addEventListener('resize', () => {
        if (!projectsExpanded) updateVisibleProjectCards();
    });
}

// ------------------ GENERAL ANIMATE ON SCROLL ------------------
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
