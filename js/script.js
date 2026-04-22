document.addEventListener('DOMContentLoaded', function() {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal, .info-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Stagger animation for cards
                const cards = document.querySelectorAll('.info-card');
                const cardIndex = Array.from(cards).indexOf(entry.target);
                
                if (cardIndex !== -1) {
                    setTimeout(function() {
                        entry.target.classList.add('visible');
                    }, cardIndex * 150);
                } else {
                    entry.target.classList.add('visible');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(function(el) {
        observer.observe(el);
    });

    // Subtle parallax on orbs for mouse movement
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');

    if (orb1 && orb2) {
        document.addEventListener('mousemove', function(e) {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }

            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            orb1.style.transform = 'translate(' + (mouseX * 30) + 'px, ' + (mouseY * 30) + 'px)';
            orb2.style.transform = 'translate(' + (-mouseX * 20) + 'px, ' + (-mouseY * 20) + 'px)';
        });
    }
});
