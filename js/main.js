// Load projects from CMS
async function loadProjects() {
    try {
        const response = await fetch('/projects/index.json');
        const projects = await response.json();
        
        const projectsGrid = document.getElementById('projects-grid');
        
        projects.forEach(project => {
            const card = createProjectCard(project);
            projectsGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback: create sample project cards
        createSampleProjects();
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.onclick = () => window.location.href = `project.html?slug=${project.slug}`;
    
    card.innerHTML = `
        <div class="project-image-wrapper">
            <img src="${project.thumbnail}" alt="${project.title}" class="project-image">
            <div class="project-overlay">
                <h2 class="project-card-title">${project.title}</h2>
                <p class="project-card-description">${project.short_description}</p>
                <a href="project.html?slug=${project.slug}" class="cta-button">SEE THE CASE</a>
            </div>
        </div>
    `;
    
    return card;
}

function createSampleProjects() {
    const sampleProjects = [
        {
            slug: 'pme-compass',
            title: 'PME - COMPLEX DATA INTO MEANINGFUL INSIGHT',
            short_description: 'Next-generation digital platform developed exclusively for PME, its artists, and key stakeholders.',
            thumbnail: 'images/pme-thumbnail.jpg'
        },
        {
            slug: 'posti',
            title: 'POSTI - SMALL PARCEL TO DOOR',
            short_description: 'Posti Small Parcel to door, a new delivery model for consumers in Finland.',
            thumbnail: 'images/posti-thumbnail.jpg'
        },
        {
            slug: 'sok',
            title: 'SOK - S-KAUPAT, DELIVERY FULFILLMENT',
            short_description: 'Grocery Delivery. A flagship feature connecting to production deployment, in close partnership with the development team.',
            thumbnail: 'images/sok-thumbnail.jpg'
        }
    ];
    
    const projectsGrid = document.getElementById('projects-grid');
    sampleProjects.forEach(project => {
        const card = createProjectCard(project);
        projectsGrid.appendChild(card);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadProjects);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
