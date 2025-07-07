document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('is-active'); // For hamburger to X animation
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('is-active');
                }
            });
        });

        // Close menu if clicked outside of it
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('is-active');
            }
        });
    }

    // Theme Switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    // Function to apply the saved theme or default to light
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeSwitcher.textContent = '☀️'; // Sun icon for light mode
        } else {
            body.classList.remove('dark-mode');
            themeSwitcher.textContent = '🌙'; // Moon icon for dark mode
        }
    };

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('light'); // Default to light theme
    }

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            let newTheme;
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                themeSwitcher.textContent = '🌙';
                newTheme = 'light';
            } else {
                body.classList.add('dark-mode');
                themeSwitcher.textContent = '☀️';
                newTheme = 'dark';
            }
            localStorage.setItem('theme', newTheme); // Save the new theme preference
        });
    }
});

// Note: The CSS for the 'is-active' state of the hamburger menu (transforming to an X)
// is in css/style.css.
