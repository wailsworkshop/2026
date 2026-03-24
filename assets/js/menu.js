// Fix hamburger menu functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById("hamburgerbtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const body = document.body;
  const dropdowns = document.querySelectorAll('.dropdown');

  // Handle hamburger menu for mobile
  if (hamburger) {
    // Clear any previous event listeners
    hamburger.replaceWith(hamburger.cloneNode(true));
    const refreshedHamburger = document.getElementById("hamburgerbtn");
    
    refreshedHamburger.addEventListener("click", function(e) {
      e.preventDefault();
      mobileMenu.classList.toggle("open");
      body.classList.toggle("scroll-lock");
      
      // Toggle between menu and close icons
      const iconSpan = refreshedHamburger.querySelector('.material-icons');
      if (iconSpan) {
        if (mobileMenu.classList.contains('open')) {
          iconSpan.textContent = 'close';
        } else {
          iconSpan.textContent = 'menu';
        }
      }
    });
  }

  // Handle dropdown functionality
  dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
      // Desktop: show/hide dropdown on hover
      if (window.innerWidth >= 1024) { // lg breakpoint
        dropdown.addEventListener('mouseenter', () => {
          dropdownMenu.classList.remove('hidden');
        });
        
        dropdown.addEventListener('mouseleave', () => {
          dropdownMenu.classList.add('hidden');
        });
      }
      
      // For both mobile and desktop: toggle on click
      dropdownToggle.addEventListener('click', (e) => {
        // If it has a URL and we're on desktop, allow the link to work
        if (dropdownToggle.getAttribute('href') !== '#' && window.innerWidth >= 1024) {
          return;
        }
        
        e.preventDefault();
        dropdownMenu.classList.toggle('hidden');
        
        // Toggle dropdown arrow ONLY in mobile view
        const arrow = dropdownToggle.querySelector('.dropdown-arrow');
        if (arrow && window.innerWidth < 1024) { // Only change arrow in mobile view
          if (dropdownMenu.classList.contains('hidden')) {
            arrow.textContent = 'arrow_drop_down';
          } else {
            arrow.textContent = 'arrow_drop_up';
          }
        }
      });
    }
  });

  // Close mobile menu when clicking outside of it
  document.addEventListener('click', function(e) {
    const refreshedHamburger = document.getElementById("hamburgerbtn");
    
    // Close mobile menu when clicking outside
    if (mobileMenu && mobileMenu.classList.contains('open') && 
        !mobileMenu.contains(e.target) && 
        e.target !== refreshedHamburger && 
        !refreshedHamburger.contains(e.target)) {
      
      mobileMenu.classList.remove('open');
      body.classList.remove('scroll-lock');
      
      // Reset hamburger icon
      const iconSpan = refreshedHamburger.querySelector('.material-icons');
      if (iconSpan) {
        iconSpan.textContent = 'menu';
      }
    }
    
    // Close all dropdowns when clicking outside
    dropdowns.forEach(dropdown => {
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      if (dropdownMenu && !dropdown.contains(e.target) && !dropdownMenu.classList.contains('hidden')) {
        dropdownMenu.classList.add('hidden');
        
        // Reset dropdown arrow ONLY in mobile view
        const arrow = dropdown.querySelector('.dropdown-arrow');
        if (arrow && window.innerWidth < 1024) { // Only change arrow in mobile view
          arrow.textContent = 'arrow_drop_down';
        }
      }
    });
  });
});