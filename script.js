const videos = [
    { id: "1", title: "Minimalist Coding 2024", url: "https://www.youtube.com", category: "trending" },
    { id: "2", title: "Future of JavaScript", url: "https://www.youtube.com", category: "library" },
    { id: "3", title: "Aesthetic Night Walk", url: "https://www.youtube.com", category: "trending" },
    { id: "4", title: "Minimalist Room Tour", url: "https://www.youtube.com", category: "home" },
    { id: "5", title: "Clean Desk Setup", url: "https://www.youtube.com", category: "home" }
];

const grid = document.getElementById('video-grid');

// YouTube ID ni URL ichidan ajratib olish (Xatosiz usul)
function extractID(url) {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart.split('?')[0]; // ID ni oladi
}

function renderVideos(category = 'all', filterText = "") {
    if (!grid) return;
    grid.innerHTML = "";

    let filtered = videos;

    // Toifa bo'yicha saralash
    if (category !== 'all') {
        filtered = videos.filter(v => v.category === category);
    }

    // Qidiruv bo'yicha saralash
    if (filterText) {
        filtered = filtered.filter(v => v.title.toLowerCase().includes(filterText.toLowerCase()));
    }

    filtered.forEach(v => {
        const videoId = extractID(v.url);
        const thumbUrl = `https://img.youtube.com{videoId}/mqdefault.jpg`;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="thumb" style="background-image: url('${thumbUrl}'); background-size: cover; background-position: center; height: 180px; border-radius: 10px; border: 1px solid #222;"></div>
            <div class="info-title" style="margin-top: 10px; font-weight: 600;">${v.title}</div>
            <div class="info-meta" style="color: #666; font-size: 0.8rem;">Minimalist • 2026</div>
        `;
        card.onclick = () => window.location.href = `video.html?id=${v.id}`;
        grid.appendChild(card);
    });
}

// Sidebardagi tugmalarni ishlashi
document.querySelectorAll('.sidebar a').forEach(link => {
    link.onclick = function(e) {
        e.preventDefault();
        
        // Aktiv rangni o'zgartirish
        document.querySelectorAll('.sidebar a').forEach(a => a.style.color = '#888');
        this.style.color = '#fff';

        const cat = this.getAttribute('data-cat') || 'all';
        renderVideos(cat);
    };
});

// Qidiruv inputi
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.oninput = (e) => renderVideos('all', e.target.value);
}

// Sahifa yuklanganda videolarni ko'rsatish
window.onload = () => {
    if (grid) renderVideos();
    if (document.getElementById('player-wrapper')) displayVideo();
};

// Video sahifasi uchun (video.html)
function displayVideo() {
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get('id');
    const videoData = videos.find(v => v.id === videoId);

    if (videoData) {
        const wrapper = document.getElementById('player-wrapper');
        if (wrapper) {
            wrapper.innerHTML = `
                <iframe src="${videoData.url}?autoplay=1&modestbranding=1" 
                        width="100%" height="100%" frameborder="0" 
                        allow="autoplay; encrypted-media" allowfullscreen>
                </iframe>`;
        }
        const titleElem = document.getElementById('video-title');
        if (titleElem) titleElem.innerText = videoData.title;
    }
}
