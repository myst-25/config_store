// Config Store JavaScript
class ConfigStore {
    constructor() {
        this.configs = [];
        this.currentFilter = 'all';
        this.currentConfig = null;
        this.init();
    }

    async init() {
        await this.loadConfigs();
        this.setupEventListeners();
        this.renderConfigs();
        this.updateStats();
    }

    async loadConfigs() {
        try {
            const response = await fetch('configs/configs.json');
            if (response.ok) {
                const data = await response.json();
                this.configs = data.configs || [];
            } else {
                // If no configs.json exists, use sample data
                this.configs = this.getSampleConfigs();
            }
        } catch (error) {
            console.warn('Failed to load configs, using sample data:', error);
            this.configs = this.getSampleConfigs();
        }
    }

    getSampleConfigs() {
        return [
            {
                id: 'modern-dark',
                name: 'Modern Dark',
                author: 'DesignPro',
                category: 'dark',
                description: 'A sleek dark theme with subtle animations and modern design elements. Perfect for developers who work in low-light environments.',
                featured: true,
                preview_image: 'https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Modern+Dark',
                screenshots: [
                    'https://via.placeholder.com/200x150/1a1a1a/ffffff?text=Screen+1',
                    'https://via.placeholder.com/200x150/1a1a1a/ffffff?text=Screen+2'
                ],
                download_url: 'configs/modern-dark/config.json',
                download_count: 892
            },
            {
                id: 'light-minimal',
                name: 'Light Minimal',
                author: 'MinimalStudio',
                category: 'light',
                description: 'Clean and minimal light theme that reduces visual clutter while maintaining functionality.',
                featured: true,
                preview_image: 'https://via.placeholder.com/400x300/f5f5f5/333333?text=Light+Minimal',
                screenshots: [
                    'https://via.placeholder.com/200x150/f5f5f5/333333?text=Screen+1'
                ],
                download_url: 'configs/light-minimal/config.json',
                download_count: 643
            },
            {
                id: 'vibrant-colors',
                name: 'Vibrant Colors',
                author: 'ColorMaster',
                category: 'colorful',
                description: 'Bold and vibrant theme with beautiful gradient effects and eye-catching animations.',
                featured: false,
                preview_image: 'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Vibrant+Colors',
                screenshots: [
                    'https://via.placeholder.com/200x150/ff6b6b/ffffff?text=Screen+1',
                    'https://via.placeholder.com/200x150/4ecdc4/ffffff?text=Screen+2',
                    'https://via.placeholder.com/200x150/45b7d1/ffffff?text=Screen+3'
                ],
                download_url: 'configs/vibrant-colors/config.json',
                download_count: 421
            },
            {
                id: 'professional-blue',
                name: 'Professional Blue',
                author: 'CorpDesign',
                category: 'light',
                description: 'Professional blue theme perfect for business environments with subtle animations.',
                featured: false,
                preview_image: 'https://via.placeholder.com/400x300/2196f3/ffffff?text=Professional+Blue',
                screenshots: [
                    'https://via.placeholder.com/200x150/2196f3/ffffff?text=Screen+1'
                ],
                download_url: 'configs/professional-blue/config.json',
                download_count: 234
            },
            {
                id: 'neon-dark',
                name: 'Neon Dark',
                author: 'NeonStudio',
                category: 'dark',
                description: 'Futuristic dark theme with neon accents and glowing effects for a cyberpunk feel.',
                featured: false,
                preview_image: 'https://via.placeholder.com/400x300/0a0a0a/00ff41?text=Neon+Dark',
                screenshots: [
                    'https://via.placeholder.com/200x150/0a0a0a/00ff41?text=Screen+1',
                    'https://via.placeholder.com/200x150/0a0a0a/ff0080?text=Screen+2'
                ],
                download_url: 'configs/neon-dark/config.json',
                download_count: 567
            }
        ];
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderConfigs();
            });
        });

        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeJsonModal();
            }
        });
    }

    renderConfigs() {
        const featuredGrid = document.getElementById('featured-grid');
        const configsGrid = document.getElementById('configs-grid');
        
        const filteredConfigs = this.currentFilter === 'all' 
            ? this.configs 
            : this.configs.filter(config => config.category === this.currentFilter);

        const featuredConfigs = filteredConfigs.filter(config => config.featured);
        const allConfigs = filteredConfigs;

        featuredGrid.innerHTML = featuredConfigs.map(config => this.createConfigCard(config, true)).join('');
        configsGrid.innerHTML = allConfigs.map(config => this.createConfigCard(config, false)).join('');

        // Add click listeners to cards
        document.querySelectorAll('.config-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.config-actions')) {
                    const configId = card.dataset.configId;
                    this.showConfigModal(configId);
                }
            });
        });

        // Add download button listeners
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const configId = btn.dataset.configId;
                this.downloadConfig(configId);
            });
        });

        // Add preview button listeners
        document.querySelectorAll('.preview-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const configId = btn.dataset.configId;
                this.previewConfig(configId);
            });
        });
    }

    createConfigCard(config, isFeatured = false) {
        const shortDescription = config.description.length > 120 
            ? config.description.substring(0, 120) + '...' 
            : config.description;
            
        return `
            <div class="config-card ${isFeatured ? 'featured' : ''}" data-config-id="${config.id}">
                <img src="${config.preview_image}" alt="${config.name}" class="config-image" loading="lazy">
                <div class="config-info">
                    <div class="config-header">
                        <div class="config-title-section">
                            <h3 class="config-title">${config.name}</h3>
                            <p class="config-author">by ${config.author}</p>
                        </div>
                        <span class="config-category">${config.category}</span>
                    </div>
                    <p class="config-description" title="${config.description}">
                        ${shortDescription}
                        ${config.description.length > 120 ? '<span class="read-more">Read more...</span>' : ''}
                    </p>
                    <div class="config-stats">
                        <span class="download-count">📥 ${this.formatDownloadCount(config.download_count || 0)} downloads</span>
                        ${config.featured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
                    </div>
                    <div class="config-actions">
                        <button class="download-btn primary" data-config-id="${config.id}">
                            Download JSON
                        </button>
                        <button class="preview-btn" data-config-id="${config.id}">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    showConfigModal(configId) {
        const config = this.configs.find(c => c.id === configId);
        if (!config) return;

        this.currentConfig = config;

        // Update modal content
        document.getElementById('modal-title').textContent = config.name;
        document.getElementById('modal-author').textContent = `by ${config.author}`;
        document.getElementById('modal-category').textContent = config.category;
        document.getElementById('modal-description').textContent = config.description;
        document.getElementById('modal-main-image').src = config.preview_image;
        document.getElementById('modal-main-image').alt = config.name;

        // Update download button
        const downloadBtn = document.getElementById('modal-download-btn');
        downloadBtn.dataset.configId = config.id;
        downloadBtn.textContent = `Download (${config.download_count || 0})`;

        // Update screenshots
        const screenshotsContainer = document.getElementById('modal-screenshots');
        if (config.screenshots && config.screenshots.length > 0) {
            screenshotsContainer.innerHTML = config.screenshots.map(screenshot => 
                `<img src="${screenshot}" alt="Screenshot" loading="lazy">`
            ).join('');
        } else {
            screenshotsContainer.innerHTML = '';
        }

        // Show modal
        document.getElementById('config-modal').classList.add('active');
        document.body.style.overflow = 'hidden';

        // Add download listener
        downloadBtn.onclick = () => this.downloadConfig(config.id);
    }

    closeModal() {
        document.getElementById('config-modal').classList.remove('active');
        document.body.style.overflow = '';
        this.currentConfig = null;
    }

    async previewConfig(configId) {
        const config = this.configs.find(c => c.id === configId);
        if (!config) return;

        try {
            const response = await fetch(config.download_url);
            if (response.ok) {
                const configData = await response.json();
                document.getElementById('json-preview').textContent = JSON.stringify(configData, null, 2);
            } else {
                // Show sample config if file doesn't exist
                const sampleConfig = this.getSampleConfigData(config);
                document.getElementById('json-preview').textContent = JSON.stringify(sampleConfig, null, 2);
            }
        } catch (error) {
            const sampleConfig = this.getSampleConfigData(config);
            document.getElementById('json-preview').textContent = JSON.stringify(sampleConfig, null, 2);
        }

        document.getElementById('json-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeJsonModal() {
        document.getElementById('json-modal').classList.remove('active');
        document.body.style.overflow = '';
    }

    async downloadConfig(configId) {
        const config = this.configs.find(c => c.id === configId);
        if (!config) return;

        try {
            const response = await fetch(config.download_url);
            if (response.ok) {
                const blob = await response.blob();
                this.downloadBlob(blob, `${config.name.toLowerCase().replace(/\s+/g, '-')}.config.json`);
            } else {
                // Generate sample config if file doesn't exist
                const sampleConfig = this.getSampleConfigData(config);
                const blob = new Blob([JSON.stringify(sampleConfig, null, 2)], { type: 'application/json' });
                this.downloadBlob(blob, `${config.name.toLowerCase().replace(/\s+/g, '-')}.config.json`);
            }
            
            // Update download count (in a real app, this would be handled by the backend)
            config.download_count = (config.download_count || 0) + 1;
            this.renderConfigs();
            this.updateStats();
            
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        }
    }

    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    getSampleConfigData(config) {
        const baseConfig = {
            context_menu: {
                theme: {
                    use_dwm_if_available: true,
                    acrylic: true,
                    radius: 16.0,
                    font_size: 14.0,
                    item_height: 28.0,
                    item_gap: 2.0,
                    item_radius: 8.0,
                    margin: 8.0,
                    padding: 12.0,
                    text_padding: 16.0,
                    icon_padding: 8.0,
                    right_icon_padding: 12.0,
                    multibutton_line_gap: -4.0,
                    background_opacity: 0.95
                }
            }
        };

        // Customize based on theme
        switch (config.category) {
            case 'dark':
                baseConfig.context_menu.theme.acrylic_color_light = "#1a1a1a";
                baseConfig.context_menu.theme.acrylic_color_dark = "#0a0a0a";
                break;
            case 'light':
                baseConfig.context_menu.theme.acrylic_color_light = "#ffffff";
                baseConfig.context_menu.theme.acrylic_color_dark = "#f5f5f5";
                break;
            case 'colorful':
                baseConfig.context_menu.theme.acrylic_color_light = "#ff6b6b";
                baseConfig.context_menu.theme.acrylic_color_dark = "#4ecdc4";
                baseConfig.context_menu.theme.radius = 20.0;
                break;
        }

        return baseConfig;
    }

    formatDownloadCount(count) {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        } else {
            return count.toString();
        }
    }
    
    updateStats() {
        const configCount = this.configs.length;
        const totalDownloads = this.configs.reduce((sum, config) => sum + (config.download_count || 0), 0);
        
        document.getElementById('config-count').textContent = configCount;
        document.getElementById('download-count').textContent = this.formatDownloadCount(totalDownloads) + '+';
    }
}

// Global functions for modal controls
window.closeModal = function() {
    configStore.closeModal();
};

window.closeJsonModal = function() {
    configStore.closeJsonModal();
};

window.previewConfig = function() {
    if (configStore.currentConfig) {
        configStore.previewConfig(configStore.currentConfig.id);
    }
};

// Initialize the Config Store
const configStore = new ConfigStore();

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
});

// Add loading states
function showLoading(element) {
    element.innerHTML = '<div class="loading">Loading configs...</div>';
}

// Add error handling for images
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.src = 'https://via.placeholder.com/400x300/f0f0f0/999999?text=Image+Not+Found';
        }
    }, true);
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = Math.random() * 0.3 + 's';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe config cards when they're created
const originalRenderConfigs = ConfigStore.prototype.renderConfigs;
ConfigStore.prototype.renderConfigs = function() {
    originalRenderConfigs.call(this);
    
    // Observe new cards
    document.querySelectorAll('.config-card').forEach(card => {
        observer.observe(card);
    });
};