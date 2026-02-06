// Load resume content from CMS
async function loadResume() {
    try {
        const response = await fetch('/content/resume.json');
        const data = await response.json();
        
        const resumeContainer = document.getElementById('resume-text');
        resumeContainer.innerHTML = formatContent(data.content);
    } catch (error) {
        console.error('Error loading resume:', error);
        // Keep default content if file doesn't exist yet
    }
}

function formatContent(content) {
    // Convert markdown-style formatting to HTML
    let formatted = content
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
document.addEventListener('DOMContentLoaded', loadResume);
