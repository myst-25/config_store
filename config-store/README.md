# Config Store - Breeze Shell Themes

An Apple-style marketplace for Breeze Shell configurations with automated publishing via GitHub Issues and Actions.

## 🌟 Features

- **Beautiful Apple-style Design**: Modern, responsive interface inspired by the App Store
- **Zero-Maintenance Publishing**: Automated config processing via GitHub Issues
- **Real-time Updates**: Site automatically updates when new configs are approved
- **Professional Showcase**: Each config includes name, description, screenshots, and download stats
- **One-Click Downloads**: Direct JSON file downloads for easy theme installation

## 🚀 Quick Setup

### 1. Create Your Repository

1. Create a new GitHub repository (e.g., `your-username/config-store`)
2. Upload all the files from this project to your repository
3. Ensure the repository is public (required for GitHub Pages)

### 2. Enable GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. Save the settings

### 3. Update Configuration

Edit the following files to customize for your repository:

**In `index.html`:**
```html
<!-- Line 47: Update the GitHub issue URL -->
<a href="https://github.com/YOUR_USERNAME/config-store/issues/new?assignees=&labels=config-submission&projects=&template=config-submission.yml" class="submit-btn" target="_blank">

<!-- Lines 76-77: Update footer links -->
<a href="https://github.com/YOUR_USERNAME/config-store">GitHub</a>
<a href="https://github.com/YOUR_USERNAME/config-store/issues">Report Issue</a>
<a href="https://github.com/YOUR_USERNAME/config-store/discussions">Discussions</a>
```

**Replace `YOUR_USERNAME` with your actual GitHub username.**

### 4. Enable GitHub Actions

GitHub Actions should be enabled by default. The workflows will:
- **Deploy**: Automatically deploy your site to GitHub Pages
- **Process Configs**: Automatically process new config submissions

## 📝 How It Works

### For Admins (Config Publishers)

1. **Submit New Config**:
   - Go to your repository's Issues tab
   - Click "New Issue" → "Submit Config Theme"
   - Fill out the form with:
     - Config name and description
     - Author information
     - Category (dark, light, colorful, etc.)
     - JSON configuration
     - Preview image URL (upload to imgur.com or similar)
     - Additional screenshots (optional)

2. **Automatic Processing**:
   - GitHub Actions validates the JSON
   - Downloads and processes all images
   - Creates a folder structure in `configs/`
   - Updates the `configs.json` database
   - Creates a pull request for review

3. **Review & Publish**:
   - Review the auto-generated pull request
   - Merge to publish the config live
   - Site updates automatically within minutes

### For Users (Config Downloaders)

1. **Browse Configs**: Visit your GitHub Pages site to see all available themes
2. **Preview**: Click on any config to see details, screenshots, and description
3. **Download**: Click "Download JSON" to get the configuration file
4. **Install**: Apply the config to Breeze Shell according to its documentation

## 📁 File Structure

```
config-store/
├── index.html              # Main website
├── style.css              # Apple-style CSS
├── script.js              # Site functionality
├── configs/
│   ├── configs.json       # Database of all configs
│   └── [config-id]/
│       ├── config.json    # Breeze Shell configuration
│       ├── preview.png    # Main preview image
│       └── screenshots/   # Additional screenshots
└── .github/
    ├── workflows/
    │   ├── deploy.yml     # GitHub Pages deployment
    │   └── process-config.yml # Config processing
    └── ISSUE_TEMPLATE/
        └── config-submission.yml # Issue template
```

## 🎨 Customization

### Adding Categories

Edit the issue template in `.github/ISSUE_TEMPLATE/config-submission.yml`:

```yaml
- type: dropdown
  id: category
  attributes:
    label: Category
    options:
      - dark
      - light
      - colorful
      - minimal
      - professional
      - gaming
      - your-new-category  # Add here
```

Update the filter buttons in `index.html`:

```html
<button class="filter-btn" data-filter="your-new-category">Your Category</button>
```

### Changing Colors/Branding

Edit CSS variables in `style.css`:

```css
:root {
    --primary-color: #007AFF;      /* Change primary color */
    --secondary-color: #5856D6;    /* Change secondary color */
    /* ... other variables ... */
}
```

Update the site title and description in `index.html`:

```html
<h1>Your Store Name</h1>
<p class="header-subtitle">Your custom subtitle</p>
```

## 🛠️ Advanced Configuration

### Custom Validation

Modify `.github/workflows/process-config.yml` to add custom JSON validation rules:

```bash
# Add after the basic JSON validation
if ! jq -e '.context_menu.theme' /tmp/config.json > /dev/null; then
    echo "Config must have context_menu.theme structure"
    exit 1
fi
```

### Featured Configs

Set `"featured": true` in `configs/configs.json` to highlight specific configs.

### Download Analytics

The system tracks download counts automatically. You can extend this by:
1. Adding analytics services
2. Creating download reports
3. Implementing user ratings

## 🔧 Troubleshooting

### Config Submission Issues

**JSON Validation Failed**:
- Use [JSONLint](https://jsonlint.com/) to validate your JSON
- Ensure all brackets and quotes are properly closed
- Remove trailing commas

**Image Download Failed**:
- Use direct image URLs (ending in .png, .jpg, etc.)
- Ensure images are publicly accessible
- Try uploading to imgur.com for reliable hosting

**GitHub Actions Not Running**:
- Check if Actions are enabled in repository settings
- Ensure the repository is public
- Check the Actions tab for error logs

### Site Not Updating

**GitHub Pages Not Deploying**:
- Verify Pages is set to "GitHub Actions" source
- Check the Actions tab for deployment status
- Ensure the repository is public

**Configs Not Appearing**:
- Check if the PR was merged to main/master branch
- Verify `configs/configs.json` was updated correctly
- Clear browser cache and refresh

## 📄 License

This project is open source. Feel free to modify and adapt for your needs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

- **Issues**: Use GitHub Issues for bug reports
- **Discussions**: Use GitHub Discussions for questions
- **Breeze Shell**: Visit the [official repository](https://github.com/std-microblock/breeze-shell)

---

**Config Store** - Making Breeze Shell customization accessible to everyone! 🎨