'use strict';

const menuIcon = document.querySelector('.menu-icon');
const getInTouchButton = document.querySelector('.get-in-touch-button');

menuIcon.addEventListener('click', function() {
    menuIcon.classList.toggle('active');
    getInTouchButton.classList.toggle('active'); // Toggles visibility of the "Get in touch" button
});
