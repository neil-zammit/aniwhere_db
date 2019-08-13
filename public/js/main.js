/*jshint esversion:6 */

// Add Slider Functionality //
// Create variables for slides & buttons
const slides = document.querySelectorAll('.slide');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
console.log(prev);


// Functions
const nextSlide = () => {
  // Get slide current class
  const current = document.querySelector('.current');
  // Remove current class from slide
  current.classList.remove('current');
  // Check for next slide
  if(current.nextElementSibling) {
    // Add current class to next slide or sibling
    current.nextElementSibling.classList.add('current');
  } else {   // if on last slide and no remaining slides siblings
    // Add current to start or first slide
     slides[0].classList.add('current');
  }
  // // Remove the current class with timeout so it can be added to another slide
  setTimeout(() => current.classList.remove('current'));
};

const prevSlide = () => {
  // Get slide with current class
  const current = document.querySelector('.current');
  // Remove current class from slide
  current.classList.remove('current');
  // Check for next slide
  if(current.previousElementSibling) {
    // Add current class to the next slide or sibling
    current.previousElementSibling.classList.add('current');
  } else { // if on last slide and no remaining slides or siblings
    // Add current to start or first slide
    slides[slides.length - 1].classList.add('current');
  }
  // Remove the current class with timeout so it can be added to another slide
  setTimeout(() => current.classList.remove('current'));
};

// Add Button Events
next.addEventListener('click', nextSlide);

prev.addEventListener('click', prevSlide);


// Add Smooth Scroll to navbar //
var scroll = new SmoothScroll('#nav-menu a[href*="#"]');
