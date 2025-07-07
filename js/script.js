document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Optional: Change hamburger icon to an X
            menuToggle.classList.toggle('is-active');
        });
    }

    // Optional: Close menu when a link is clicked (useful for single-page apps or if nav covers content)
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('is-active');
            }
        });
    });

    // Optional: Close menu if clicked outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('is-active');
        }
    });
});

// Note: The CSS for the 'is-active' state of the hamburger menu (transforming to an X)
// has been moved to css/style.css for better organization.
