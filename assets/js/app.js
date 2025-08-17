'use strict';

const menuIcon = document.querySelector('.menu-icon');
const getInTouchButton = document.querySelector('.get-in-touch-button');

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

// TYPEWRITER EFFECT
const subheading = document.querySelector('.subheading');
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

// ABOUT ME
const aboutElements = document.querySelectorAll('.animate-on-scroll');
const aboutObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('active');
            const paragraphs = el.querySelectorAll('.stagger');
            paragraphs.forEach((p, i) => {
                setTimeout(() => p.classList.add('active'), i * 200);
            });
            observer.unobserve(el);
        }
    });
}, { threshold: 0.3 });
aboutElements.forEach(el => aboutObserver.observe(el));

// SKILLS SECTION
const languagesSection = document.querySelector('.technologies');
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

// TECH CARDS - SHOW MORE / SHOW LESS
const showMoreBtn = document.querySelector('.show-more-btn');
const techCards = document.querySelectorAll('.tech-card');
const grid = document.querySelector('.grid');

const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const card = entry.target;
            card.style.animation = 'fadeSlideIn 0.6s forwards';
            const progressBar = card.querySelector('.progress-bar');
            const level = progressBar.dataset.level;
            setTimeout(() => progressBar.style.width = level, 100);
            observer.unobserve(card);
        }
    });
}, { threshold: 0.2 });

techCards.forEach(card => cardObserver.observe(card));

// Show 3 cards initially for tech section
function updateVisibleCards() {
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

window.addEventListener('load', updateVisibleCards);
window.addEventListener('resize', updateVisibleCards);

showMoreBtn.addEventListener('click', () => {
    const isHidden = Array.from(techCards).some(card => card.style.display === 'none');

    techCards.forEach((card) => {
        if(isHidden) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            cardObserver.observe(card);
        } else {
            updateVisibleCards();
        }
    });

    showMoreBtn.textContent = isHidden ? 'Show Less' : 'See More';
});

// PROJECTS SECTION
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if(entry.isIntersecting) {
            const card = entry.target;
            setTimeout(() => card.classList.add('active'), index * 150);
            observer.unobserve(card);
        }
    });
}, { threshold: 0.3 });
projectCards.forEach(card => projectObserver.observe(card));

const projectsSection = document.querySelector('.projects');
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

// Projects Show More / Show Less
const projectGrid = document.querySelector('.projects-grid');
const projectCardsAll = document.querySelectorAll('.project-card');
const projectsShowMoreBtn = document.querySelector('.projects .show-more-btn');

function updateVisibleProjectCards() {
    const gridWidth = projectGrid.clientWidth;
    const cardWidth = projectCardsAll[0].getBoundingClientRect().width;
    const gap = parseInt(getComputedStyle(projectGrid).gap) || 0;

    // Determine number of cards per row based on screen width
    let cardsPerRow = Math.floor((gridWidth + gap) / (cardWidth + gap));

    if(window.innerWidth <= 450) {
        cardsPerRow = 1; // show at least 1 card on phones
    } else if(window.innerWidth < 1500) {
        cardsPerRow = Math.min(cardsPerRow, 4); // tablets / medium screens
    } else {
        cardsPerRow = Math.min(cardsPerRow, 4); // large screens
    }

    let hiddenExists = false;

    projectCardsAll.forEach((card, index) => {
        if(index < cardsPerRow) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
            hiddenExists = true;
        }
    });

    if(hiddenExists) {
        projectsShowMoreBtn.parentElement.style.display = 'flex';
        projectsShowMoreBtn.textContent = 'See More';
    } else {
        projectsShowMoreBtn.parentElement.style.display = 'none';
    }
}

window.addEventListener('load', updateVisibleProjectCards);
window.addEventListener('resize', updateVisibleProjectCards);

projectsShowMoreBtn.addEventListener('click', () => {
    const isHidden = Array.from(projectCardsAll).some(card => card.classList.contains('hidden'));

    projectCardsAll.forEach((card) => {
        if(isHidden) {
            card.classList.remove('hidden');
            projectObserver.observe(card);
        } else {
            updateVisibleProjectCards();
        }
    });

    projectsShowMoreBtn.textContent = isHidden ? 'Show Less' : 'See More';
});
