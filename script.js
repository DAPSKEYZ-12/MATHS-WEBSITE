document.addEventListener('DOMContentLoaded', () => {
    // --- PREVIOUS LOGIC (Scroll, Counters, etc.) ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- GOOGLE SHEETS & EMAIL AUTOMATION ---
    const SCRIPT_URL = 'YOUR_DEPLOYED_GOOGLE_APP_SCRIPT_URL'; // Paste your URL here
    const paymentForm = document.getElementById('paymentForm');

    if (paymentForm) {
        paymentForm.addEventListener('submit', e => {
            e.preventDefault();
            const btn = paymentForm.querySelector('button');
            btn.innerText = "Processing...";
            btn.disabled = true;

            const formData = new FormData(paymentForm);
            const data = Object.fromEntries(formData.entries());

            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', 
                body: JSON.stringify(data)
            })
            .then(() => {
                alert('Success! Your payment details have been submitted. A confirmation email is being sent to ' + data.email);
                paymentForm.reset();
            })
            .catch(error => alert('Error submitting payment: ' + error.message))
            .finally(() => {
                btn.innerText = "Verify Payment";
                btn.disabled = false;
            });
        });
    }
});
