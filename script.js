const $ = (selector) => document.querySelector(selector);
        const $$ = (selector) => document.querySelectorAll(selector);

        const downloadButton = $('.download');
        const downloadGithubButton = $('.download-github');
        const githubButton = $('.github');

        downloadButton.addEventListener('click', () => {
            window.open('https://microblock.lanzouo.com/b026xegc5a')
        });

        downloadGithubButton.addEventListener('click', () => {
            window.open('https://github.com/std-microblock/breeze-shell/releases/latest')
        });

        githubButton.addEventListener('click', () => {
            window.open('https://github.com/std-microblock/breeze-shell/')
        });

        // Add click event for config block
        const configBlock = document.querySelector('.config-block');
        if (configBlock) {
            configBlock.addEventListener('click', () => {
                window.open('config_index.html', '_blank');
            });
        }