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
        setTimeout(typeWriter, 40);  // speed of typing in ms
    }
}

window.addEventListener('load', typeWriter);

// About Me 
// About Me scroll animation
const aboutElements = document.querySelectorAll('.animate-on-scroll');

const aboutObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('active');

            // Animate paragraphs inside
            const paragraphs = el.querySelectorAll('.stagger');
            paragraphs.forEach((p, i) => {
                setTimeout(() => p.classList.add('active'), i * 200);
            });

            observer.unobserve(el); // animate only once
        }
    });
}, { threshold: 0.3 });

// Observe all elements
aboutElements.forEach(el => aboutObserver.observe(el));

//SKILLS SECTION

// Core Languages Section Animation
const languagesSection = document.querySelector('.technologies');
const heading = languagesSection.querySelector('h3');
const subheading2 = languagesSection.querySelector('.subheading2');

const languagesObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            // Animate heading
            heading.classList.add('active');

            // Animate subheading with a small delay
            setTimeout(() => {
                subheading2.classList.add('active');
            }, 200); // 0.2s delay

            observer.unobserve(entry.target); // animate only once
        }
    });
}, { threshold: 0.3 });

languagesObserver.observe(languagesSection);


// Animate tech cards and progress bars on scroll
const techCards = document.querySelectorAll('.tech-card');
const showMoreBtn = document.querySelector('.show-more-btn');

// Intersection Observer for scroll-triggered animation
const observerOptions = { threshold: 0.3 };
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry, index) => {
    if(entry.isIntersecting) {
      const card = entry.target;

      // Animate card
      card.style.animation = `fadeSlideIn 0.6s forwards`;
      card.style.animationDelay = `${index * 0.1}s`;

      // Animate progress bar
      const progressBar = card.querySelector('.progress-bar');
      const level = progressBar.dataset.level;
      setTimeout(() => progressBar.style.width = level, index * 100);

      obs.unobserve(card);
    }
  });
}, observerOptions);

techCards.forEach(card => observer.observe(card));

// Show More functionality
showMoreBtn.addEventListener('click', () => {
  const hiddenCards = document.querySelectorAll('.tech-card:nth-child(n+4)');
  const isHidden = hiddenCards[0].style.display === 'none' || !hiddenCards[0].style.display;

  hiddenCards.forEach((card, index) => {
    if(isHidden) {
      card.style.display = 'flex';
      setTimeout(() => observer.observe(card), 50 * index); // trigger animation
    } else {
      card.style.display = 'none';
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

// Projects section
const projectsSection = document.querySelector('.projects');
const projectsHeading = projectsSection.querySelector('h4');
const projectsSubheading = projectsSection.querySelector('.subheading2');

const projectsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate heading
            projectsHeading.classList.add('active');

            // Animate subheading with a small delay
            setTimeout(() => {
                projectsSubheading.classList.add('active');
            }, 200);

            observer.unobserve(entry.target); // animate only once
        }
    });
}, { threshold: 0.3 });

projectsObserver.observe(projectsSection);
