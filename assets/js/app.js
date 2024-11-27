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
