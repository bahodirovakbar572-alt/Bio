// 1. Ma'lumotlar bazasi (IDlar qo'shildi, chunki YouTube rasmlari uchun ID shart)
const videos = [
    { id: "1", title: "Minimalist Coding 2024", url: "https://www.youtube.com", category: "trending" },
    { id: "2", title: "Future of JavaScript", url: "https://www.youtube.com", category: "library" },
    { id: "3", title: "Aesthetic Night Walk", url: "https://www.youtube.com", category: "trending" }
];

const shorts = [
    { id: "s1", title: "Python in 60s", url: "https://www.youtube.com" },
    { id: "s2", title: "New Desk Setup", url: "https://www.youtube.com" },
    { id: "s3", title: "CSS Glassmorphism", url: "https://www.youtube.com" },
    { id: "s4", title: "Morning Routine", url: "https://www.youtube.com" },
    { id: "s5", title: "Coding Life", url: "https://www.youtube.com" }
];

// 2. YouTube ID ni aniq olish funksiyasi
function extractID(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "dQw4w9WgXcQ";
}

// 3. Tasodifiy aralashtirish (Shuffle)
function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

// 4. Shorts Pleerni ochish (TikTok uslubida)
function openShortsFeed() {
    const container = document.getElementById('shorts-player-container');
    const wrapper = document.getElementById('shorts-wrapper');
    
    if (!container || !wrapper) return;

    container.classList.remove('hidden'); 
    document.body.style.overflow = 'hidden'; // Asosiy sahifa skrollini to'xtatish
    wrapper.innerHTML = ""; 

    const randomShorts = shuffle(shorts);

    randomShorts.forEach(s => {
        const videoId = extractID(s.url);
        const slide = document.createElement('div');
        slide.className = 'short-video-slide';
        
        // autoplay=1 va playlist=ID (loop bo'lishi uchun)
        slide.innerHTML = `
            <iframe src="https://www.youtube.com{videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
            </iframe>
        `;
        wrapper.appendChild(slide);
    });
}

// 5. Sidebar tugmalari boshqaruvi
document.querySelectorAll('.sidebar a').forEach(link => {
    link.onclick = function(e) {
        const cat = this.getAttribute('data-cat');
        
        if (cat === 'shorts') {
            e.preventDefault();
            openShortsFeed(); // Shorts bo'limini ochish
        } else {
            // Home yoki Library bosilganda oddiy gridni ko'rsatish
            if(window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                renderVideos(cat);
            } else {
                window.location.href = 'index.html';
            }
        }
    };
});

// 6. Shorts yopish tugmasi
document.querySelector('.close-shorts')?.addEventListener('click', () => {
    document.getElementById('shorts-player-container').classList.add('hidden');
    document.body.style.overflow = 'auto';
    document.getElementById('shorts-wrapper').innerHTML = ""; 
});

// 7. Oddiy Videolarni chiqarish (Home uchun)
function renderVideos(category = 'all') {
    const grid = document.getElementById('video-grid');
    if (!grid) return;
    grid.innerHTML = "";

    const filtered = (category === 'all') ? videos : videos.filter(v => v.category === category);

    filtered.forEach(v => {
        const videoId = extractID(v.url);
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="thumb" style="background-image: url('https://img.youtube.com{videoId}/hqdefault.jpg'); background-size: cover; background-position: center;"></div>
            <div class="info-title">${v.title}</div>
        `;
        card.onclick = () => window.location.href = `video.html?id=${v.id}`;
        grid.appendChild(card);
    });
}

// 8. Video sahifasi uchun (video.html)
function displayVideo() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const videoData = videos.find(v => v.id === id);

    if (videoData) {
        const videoId = extractID(videoData.url);
        const wrapper = document.getElementById('player-wrapper');
        if (wrapper) {
            wrapper.innerHTML = `<iframe src="https://www.youtube.com{videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
        }
        document.getElementById('video-title').innerText = videoData.title;
    }
}

// Sahifa yuklanganda
window.onload = () => {
    if (document.getElementById('video-grid')) renderVideos();
    if (document.getElementById('player-wrapper')) displayVideo();
};
