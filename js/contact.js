// Load contact information from CMS
async function loadContactInfo() {
    try {
        const response = await fetch('/content/contact.json');
        const data = await response.json();
        
        const contactContainer = document.getElementById('contact-info');
        contactContainer.innerHTML = `
            <p>${data.intro || 'Let\'s work together.'}</p>
            ${data.email ? `<p>Email: <a href="mailto:${data.email}">${data.email}</a></p>` : ''}
            ${data.phone ? `<p>Phone: <a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
            ${data.linkedin ? `<p>LinkedIn: <a href="${data.linkedin}" target="_blank">View Profile</a></p>` : ''}
        `;
    } catch (error) {
        console.error('Error loading contact info:', error);
        // Keep default if file doesn't exist yet
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadContactInfo);
