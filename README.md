[README.md](https://github.com/user-attachments/files/25139449/README.md)
# LLC Portfolio Site

A beautiful, minimal portfolio website with an integrated CMS for easy content management.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Theme**: Elegant dark design matching your Figma layouts
- **Easy Content Management**: Update projects, resume, and contact info through a simple admin interface
- **Fast & Secure**: Static site hosted on Netlify with no server required
- **SEO Friendly**: Clean HTML structure and meta tags

## Site Structure

```
portfolio-site/
├── index.html          # Homepage with project grid
├── project.html        # Project detail template
├── resume.html         # Resume page
├── contact.html        # Contact page with form
├── css/
│   └── style.css       # All styling
├── js/
│   ├── main.js         # Homepage logic
│   ├── project.js      # Project detail page logic
│   ├── resume.js       # Resume page logic
│   └── contact.js      # Contact page logic
├── admin/
│   ├── index.html      # CMS admin interface
│   └── config.yml      # CMS configuration
├── projects/           # Project JSON files
├── content/            # Page content JSON files
└── images/             # Your images
```

## Deployment Instructions

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new account (if you don't have one)
2. Click "New Repository"
3. Name it something like `portfolio` or `my-portfolio`
4. Keep it public
5. Don't initialize with README (we'll add our files)

### Step 2: Upload Your Files

**Option A: Using GitHub Desktop (Easier)**
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in with your GitHub account
3. Clone your new repository to your computer
4. Copy all the files from this `portfolio-site` folder into the cloned repository folder
5. In GitHub Desktop, commit the changes with a message like "Initial commit"
6. Click "Push origin"

**Option B: Using Git Command Line**
```bash
# Navigate to the portfolio-site folder
cd portfolio-site

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your GitHub repository as remote (replace with your URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Netlify

1. Go to [Netlify](https://www.netlify.com/) and sign up (use your GitHub account)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your portfolio repository
5. Leave all settings as default and click "Deploy"
6. Your site will be live in 1-2 minutes at a URL like `your-site-name.netlify.app`

### Step 4: Enable CMS Authentication

1. In your Netlify site dashboard, go to "Site settings" → "Identity"
2. Click "Enable Identity"
3. Under "Registration preferences", select "Invite only"
4. Under "External providers", enable any you want (GitHub recommended)
5. Go to "Services" → "Git Gateway" and click "Enable Git Gateway"

### Step 5: Add Yourself as a CMS User

1. Go to the "Identity" tab in your Netlify dashboard
2. Click "Invite users"
3. Enter your email address
4. Check your email and click the invite link
5. Set a password

### Step 6: Access Your CMS

1. Go to `https://your-site-name.netlify.app/admin`
2. Log in with your email and password
3. You can now add, edit, and delete projects!

## Using the CMS

### Adding a New Project

1. Go to `/admin` on your live site
2. Click "Projects" in the sidebar
3. Click "New Project"
4. Fill in the details:
   - **Title**: Full project title (e.g., "PME COMPASS - COMPLEX DATA INTO MEANINGFUL INSIGHT")
   - **Slug**: URL-friendly version (e.g., "pme-compass")
   - **Short Description**: Brief description for the homepage card
   - **Subtitle**: Optional subtitle for the project detail page
   - **Thumbnail Image**: Image for the homepage card (recommended: 1200x800px)
   - **Hero Image**: Large image for the project detail page (recommended: 1600x900px)
   - **Description**: Full project description (use `##` for headings)
   - **Order**: Lower numbers appear first (0, 1, 2, etc.)
   - **Published**: Toggle on to show on the site
5. Click "Publish" → "Publish now"

### Editing Your Resume

1. Go to `/admin`
2. Click "Pages" → "Resume"
3. Edit the content using markdown:
   - `## Heading` for main sections
   - `### Sub-heading` for subsections
   - `**bold text**` for emphasis
4. Click "Publish" → "Publish now"

### Updating Contact Info

1. Go to `/admin`
2. Click "Pages" → "Contact Info"
3. Update your email, phone, LinkedIn, etc.
4. Click "Publish" → "Publish now"

## Customization Tips

### Changing Colors

Edit `css/style.css` and modify the CSS variables at the top:
```css
:root {
    --dark-bg: #0a0e14;        /* Main background */
    --lighter-dark: #151922;    /* Form inputs background */
    --cream: #f5f3ef;           /* Text color */
    --accent: #8b8b8b;          /* Secondary text */
    --border-color: #2a2e36;    /* Border color */
}
```

### Changing Your Name/Logo

Replace "LLC" throughout the site:
1. Edit HTML files (search for "LLC" and replace)
2. Update the hero title in `index.html`
3. Update the logo in navigation

### Custom Domain

1. Buy a domain from [Namecheap](https://www.namecheap.com/), [Google Domains](https://domains.google/), etc.
2. In Netlify, go to "Domain settings" → "Add custom domain"
3. Follow Netlify's instructions to point your domain to their servers

## Troubleshooting

**CMS login doesn't work**
- Make sure you've enabled Identity and Git Gateway in Netlify
- Make sure you've invited yourself as a user
- Try the "Forgot password" flow

**Images don't show up**
- Check that image paths in your JSON files are correct
- Make sure images are uploaded through the CMS (not manually)
- Check browser console for errors

**Changes don't appear on the site**
- After publishing in the CMS, wait 1-2 minutes for Netlify to rebuild
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

**Projects don't load**
- Check that `projects/index.json` exists and has valid JSON
- Check browser console for errors
- Make sure project JSON files are properly formatted

## Support

Need help? Here are some resources:
- [Netlify Docs](https://docs.netlify.com/)
- [Decap CMS Docs](https://decapcms.org/docs/)
- [GitHub Docs](https://docs.github.com/)

## Future Enhancements

Once you're comfortable with the basics, you can add:
- Blog section
- Image galleries for projects
- Testimonials section
- Dark/light mode toggle
- Animations and transitions
- Analytics (Google Analytics, Plausible, etc.)
- Newsletter signup

---

Built with love and modern web standards. No frameworks, no bloat, just clean HTML, CSS, and JavaScript.
