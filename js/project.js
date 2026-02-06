// Get project slug from URL
function getProjectSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get('slug');
}

// Load project data
async function loadProject() {
    const slug = getProjectSlug();
    
    if (!slug) {
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const response = await fetch(`/projects/${slug}.json`);
        const project = await response.json();
        
        displayProject(project);
    } catch (error) {
        console.error('Error loading project:', error);
        // If project doesn't exist, redirect to home
        // window.location.href = 'index.html';
    }
}

function displayProject(project) {
    // Update page title
    document.getElementById('page-title').textContent = `${project.title} - LLC`;
    
    // Update project header
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-subtitle').textContent = project.subtitle || project.short_description;
    
    // Update hero image
    const heroImage = document.getElementById('project-hero-image');
    heroImage.src = project.hero_image || project.thumbnail;
    heroImage.alt = project.title;
    
    // Update project description (supports HTML/Markdown)
    const descriptionContainer = document.getElementById('project-description');
    descriptionContainer.innerHTML = formatDescription(project.description);
}

function formatDescription(description) {
    // Convert markdown-style formatting to HTML
    let formatted = description
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^(.+)$/gm, '<p>$1</p>');
    
    // Handle headings
    formatted = formatted
        .replace(/<p>## (.+?)<\/p>/g, '<h2>$1</h2>')
        .replace(/<p>### (.+?)<\/p>/g, '<h3>$1</h3>');
    
    // Handle bold
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic
    formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    return formatted;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadProject);
