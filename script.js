// Replace with your Google Web App URL after deploying the Apps Script below
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Essential for Google Apps Script
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(() => {
            alert('Thank you! Your application has been received. Check your email for confirmation.');
            contactForm.reset();
        })
        .catch(error => console.error('Error!', error.message))
        .finally(() => {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
    });
}
