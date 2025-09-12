document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const extraFeedback = document.querySelector('.extra-feedback');
    const stars = document.querySelectorAll('input[name="rating"]');

    stars.forEach(star => {
        star.addEventListener('change', () => {
            extraFeedback.style.display = 'flex';
            setTimeout(() => extraFeedback.classList.add('active'), 10);
        });
    });

    form.addEventListener('submit', (e) => {
        const confirmation = document.querySelector('.confirmation');
        confirmation.textContent = 'Envoi en cours...';
        confirmation.style.display = 'block';
    });
});