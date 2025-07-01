# 🎨 Config Store - Breeze Shell Themes

> **Automated marketplace for Breeze Shell configurations with beautiful Apple-style design**

![Config Store Preview](https://via.placeholder.com/800x400/007AFF/FFFFFF?text=Config+Store+Preview)

## ✨ Features

- 🍎 **Apple-style Design** - Beautiful, responsive interface inspired by the App Store
- 🤖 **Zero-Maintenance Publishing** - Automated config processing via GitHub Issues
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🔄 **Real-time Updates** - Site automatically updates when new configs are approved
- 📦 **One-Click Downloads** - Direct JSON file downloads for easy installation
- 🎯 **Professional Showcase** - Each config includes name, description, screenshots, and stats

## 🚀 Quick Setup (5 Minutes)

### 1. Fork/Clone This Repository
```bash
# Option A: Fork this repository on GitHub (recommended)
# Option B: Clone and push to your own repo
git clone https://github.com/myst-25/config-store.git
cd config-store
```

### 2. Enable GitHub Pages
1. Go to **Settings** → **Pages**
2. Set **Source** to **"GitHub Actions"**
3. Save settings

### 3. Update Repository URLs
✅ **Already configured** for `myst-25`! All URLs are ready to go.

### 4. Enable Discussions (Optional)
Go to **Settings** → **Features** → Check **"Discussions"**

### 5. Test Your Site! 🎉
Visit: `https://myst-25.github.io/config-store/`

## 📝 How to Submit Configs

### For Admins/Publishers

1. **Click "Submit Theme"** on your live site
2. **Fill out the form** with:
   - Config name and description
   - Author information  
   - Category (dark, light, colorful, etc.)
   - Valid Breeze Shell JSON configuration
   - Preview image URL (upload to imgur.com)
   - Additional screenshots (optional)

3. **Submit the issue** - Automation starts immediately!

4. **Review the auto-generated PR** and merge when ready

### Automation Process

```mermaid
graph LR
    A[Submit Issue] → B[Validate JSON] → C[Download Images] → D[Create PR] → E[Merge] → F[Site Updates]
```

1. **GitHub Actions validates** your JSON and downloads images
2. **Creates organized folder structure** in `configs/`
3. **Generates pull request** for review
4. **Auto-updates site** once merged (2-3 minutes)

## 📁 Project Structure

```
config-store/
├── index.html                 # Main website
├── style.css                 # Apple-style CSS
├── script.js                 # Site functionality  
├── configs/
│   ├── configs.json          # Database of all configs
│   └── [config-id]/
│       ├── config.json       # Breeze Shell configuration
│       ├── preview.png       # Main preview image
│       └── screenshots/      # Additional screenshots
└── .github/
    ├── workflows/
    │   ├── deploy.yml        # GitHub Pages deployment
    │   └── process-config.yml # Config submission processing
    └── ISSUE_TEMPLATE/
        └── config-submission.yml # Submission form template
```

## 🎨 Customization

### Change Branding
Edit `index.html`:
```html
<h1>Your Store Name</h1>
<p class="header-subtitle">Your custom subtitle</p>
```

### Update Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #007AFF;    /* Change primary color */
    --secondary-color: #5856D6;  /* Change secondary color */
}
```

### Add Categories
1. **Update issue template** (`.github/ISSUE_TEMPLATE/config-submission.yml`):
```yaml
options:
  - dark
  - light
  - colorful
  - your-new-category  # Add here
```

2. **Add filter button** in `index.html`:
```html
<button class="filter-btn" data-filter="your-new-category">Your Category</button>
```

## 🔧 Configuration Options

### Featured Configs
Set `"featured": true` in `configs/configs.json` to highlight specific themes.

### Download Tracking
Download counts are automatically tracked and displayed.

### Image Hosting
- **Recommended**: imgur.com (reliable, permanent)
- **Alternative**: GitHub raw URLs, Discord attachments
- **Requirements**: Direct image URLs ending in .png, .jpg, etc.

## 🧪 Testing New Submissions

1. **Submit a test config** using your live form
2. **Check Actions tab** - should see "Process Config Submission" running
3. **Review auto-generated PR** 
4. **Merge PR** and verify site updates
5. **Test download** of the new config

## 🐛 Troubleshooting

### Site Not Loading
- ✅ Repository is public
- ✅ Pages set to "GitHub Actions"
- ✅ Check Actions tab for deployment status

### Config Submission Failed
- ✅ JSON is valid (test at jsonlint.com)
- ✅ Image URLs are direct links
- ✅ All required fields filled

### Images Not Showing
- ✅ Use direct image URLs
- ✅ Test URLs in incognito browser
- ✅ Upload to imgur.com for reliability

## 📊 Analytics & Monitoring

- **Download counts** automatically tracked
- **GitHub Actions logs** for submission processing  
- **Issues tab** for community feedback
- **Discussions** for community questions

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make improvements
4. Submit pull request

## 📄 License

Open source - modify and adapt as needed!

## 🔗 Links

- **Breeze Shell**: https://github.com/std-microblock/breeze-shell
- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **JSON Validator**: https://jsonlint.com/

---

**Made with ❤️ for the Breeze Shell community**

> Your Config Store URL: `https://myst-25.github.io/config-store/`