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
    const links = document.querySelectorAll('a, .piece, .gallery-img');

    // Make cursors follow mouse
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // The tiny cursor snaps exactly
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        
        // The trailer has a slight lag effect natively by easing the translate, but we can do a simple version:
        // Due to performance, a simple css transition on transform handles the "trail" effect reasonably well,
        // but for exact perfection we do animate requestAnimationFrame.
        trailer.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    });

    // Hover interactions
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            trailer.classList.add('hover');
        });
        link.addEventListener('mouseleave', () => {
            trailer.classList.remove('hover');
        });
    });

    // 3. Fix viewport resizing for Locomotive
    new ResizeObserver(() => scroll.update()).observe(document.querySelector('[data-scroll-container]'));
});
