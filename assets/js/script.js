document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1.2,
        class: 'is-reveal'
    });

    // 2. Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const trailer = document.querySelector('.cursor-trailer');
    const links = document.querySelectorAll('a, .piece, .gallery-img, .item, .mobile-menu-toggle');

    // Navigation Scrolling
    document.querySelectorAll('.item[href]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('href');
            if (target) {
                scroll.scrollTo(target);
            }
        });
    });

    // Make cursors follow mouse
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // The tiny cursor snaps exactly
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        
        // The trailer has a slight lag effect natively by easing the translate
        trailer.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    });

    // Hover interactions
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            trailer.classList.add('hover');
            trailer.innerHTML = "<span style='font-family: sans-serif; font-size: 14px; font-weight: bold; color: #1a160d; white-space: nowrap; pointer-events: none;'>M ❤️ F</span>";
        });
        link.addEventListener('mouseleave', () => {
            trailer.classList.remove('hover');
            trailer.innerHTML = "";
        });
    });

    // 3. Fix viewport resizing for Locomotive
    new ResizeObserver(() => scroll.update()).observe(document.querySelector('[data-scroll-container]'));

    // 4. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if(menuToggle && mobileMenu) {
        // Default to hide
        mobileMenu.classList.remove('show');
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
            if(mobileMenu.classList.contains('show')) {
                menuToggle.textContent = 'Close';
            } else {
                menuToggle.textContent = 'Menu';
            }
        });
        
        // click links to close menu
        const menuItems = mobileMenu.querySelectorAll('.item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
                menuToggle.textContent = 'Menu';
            });
        });
    }

    // 5. Inject styles for the cursor trailer hover manually for parity
    const style = document.createElement('style');
    style.innerHTML = `
        .cursor-trailer {
            transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1), height 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .cursor-trailer.hover {
            width: 80px !important;
            height: 80px !important;
            background-color: #e29e84 !important;
            border-radius: 50%;
            border: none !important;
            z-index: 99999;
        }
        .mobile-menu {
            transition: transform 0.5s ease, opacity 0.5s ease;
            transform-origin: top;
        }
        .mobile-menu:not(.show) {
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
        }
        .mobile-menu.show {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }
        .mobile-menu-toggle {
            cursor: pointer;
            z-index: 10000;
            position: relative;
        }
    `;
    document.head.appendChild(style);
});
