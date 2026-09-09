// ===== Modpacks =====
const modpackCategories = document.getElementById('modpacksCategories');
const modpacksCount = document.getElementById('modpacksCount');
const modpackDetailTitle = document.getElementById('modpackDetailTitle');
const modpackDetail = document.getElementById('modpackDetail');

// Total modpacks count
modpacksCount.textContent =
    '(' +
    MODPACKS.length +
    ' modpack' +
    (MODPACKS.length === 1 ? '' : 's') +
    ')';

// Get all existing categories from modpacks.js
const MODPACK_CATEGORIES = [...new Set(
    MODPACKS
        .map(function (modpack) {
            return modpack.category;
        })
        .filter(Boolean)
)];

// Generate category sections
MODPACK_CATEGORIES.forEach(function (category) {

    const categoryModpacks = MODPACKS.filter(function (modpack) {
        return modpack.category === category;
    });

    // Don't show empty categories
    if (categoryModpacks.length === 0) return;

    const section = document.createElement('div');
    section.className = 'modpack-category-section';

    const header = document.createElement('div');
    header.className = 'modpack-category-header';

    const title = document.createElement('h3');
    title.className = 'modpack-category-title';
    title.textContent = category;

    header.appendChild(title);

    const categoryInfo = MODPACK_CATEGORY_INFO[category];

    if (categoryInfo && categoryInfo.description) {
        const description = document.createElement('span');
        description.className = 'modpack-category-description';
        description.textContent = categoryInfo.description;

        header.appendChild(description);
    }

    const grid = document.createElement('div');
    grid.className = 'modpacks-grid';

    categoryModpacks.forEach(function (modpack, index) {
        const item = document.createElement('div');

        item.className = 'modpack-card stagger-in';
        item.style.animationDelay = (index * 0.08) + 's';

        item.innerHTML = `
            <img class="modpack-icon" src="${modpack.icon}" alt="${modpack.title}">
            <span class="modpack-name">${modpack.title}</span>
            <span class="modpack-arrow">→</span>
        `;

        item.addEventListener('click', function () {
            openModpackDetail(modpack);
        });

        grid.appendChild(item);
    });

    section.appendChild(header);
    section.appendChild(grid);

    modpackCategories.appendChild(section);
});
function openModpackDetail(modpack) {
    modpackDetailTitle.textContent = modpack.title;
    let imagesHtml = '';
    modpack.images.forEach(function (img, imgIndex) {
        imagesHtml += `
                    <div class="modpack-image stagger-in" style="animation-delay: ${imgIndex * 0.1}s" onclick="openLightbox('${img}', ${imgIndex + 1})">
                        <img src="${img}" alt="${modpack.title} - Imagine ${imgIndex + 1}" loading="lazy">
                    </div>
                `;
    });
    if (modpack.youtubeId) {
        const videoIndex = modpack.images.length;

        imagesHtml += `
        <div class="modpack-video-thumb stagger-in"
             style="animation-delay: ${videoIndex * 0.1}s"
             onclick="openVideoLightbox('${modpack.youtubeId}', '${modpack.title.replace(/'/g, "\\'")}')">

            <img
                src="https://img.youtube.com/vi/${modpack.youtubeId}/hqdefault.jpg"
                alt="${modpack.title} - Video"
                loading="lazy"
            >

            <div class="modpack-video-play">▶</div>
        </div>
    `;
    }
    // Convert newlines to <br> for proper multi-line descriptions
    const descriptionHtml = (modpack.description || '').replace(/\n/g, '<br>');
    let html = `
                <div class="modpack-images">
                    ${imagesHtml}
                </div>
                <div class="modpack-info">
                    <p>${descriptionHtml}</p>
                </div>
                <a class="modpack-download-btn" href="${modpack.downloadUrl.trim()}" target="_blank" rel="noopener noreferrer">
                    <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    ${modpack.downloadLabel || 'Descarcă'}
                </a>
            `;
    modpackDetail.innerHTML = html;
    showModpackDetail();
}
function openVideoLightbox(videoId, title) {
    let videoLightbox = document.getElementById('videoLightbox');

    if (!videoLightbox) {
        videoLightbox = document.createElement('div');
        videoLightbox.id = 'videoLightbox';
        videoLightbox.className = 'video-lightbox';

        videoLightbox.innerHTML = `
            <button class="video-lightbox-close" type="button">×</button>

            <div class="video-lightbox-player">
                <iframe
                    id="videoLightboxFrame"
                    src=""
                    title=""
                    allowfullscreen>
                </iframe>
            </div>
        `;

        document.body.appendChild(videoLightbox);

        videoLightbox.addEventListener('click', function (event) {
            if (event.target === videoLightbox) {
                closeVideoLightbox();
            }
        });

        videoLightbox
            .querySelector('.video-lightbox-close')
            .addEventListener('click', closeVideoLightbox);
    }

    const frame = document.getElementById('videoLightboxFrame');

    frame.src =
        'https://www.youtube-nocookie.com/embed/' +
        videoId +
        '?autoplay=1&rel=0';

    frame.title = title + ' - Video';

    videoLightbox.classList.add('open');

    document.body.style.overflow = 'hidden';
}

function closeVideoLightbox() {
    const videoLightbox = document.getElementById('videoLightbox');

    if (!videoLightbox) return;

    const frame = document.getElementById('videoLightboxFrame');

    if (frame) {
        frame.src = '';
    }

    videoLightbox.classList.remove('open');

    document.body.style.overflow = '';
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeVideoLightbox();
    }
});