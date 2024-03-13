const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
});

const animatedElements = document.querySelectorAll('.set_to_animate');
animatedElements.forEach((element) => observer.observe(element));