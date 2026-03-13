// 1. Video ma'lumotlari
const videos = [
    { id: "1", title: "Mini", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "trending" },
    { id: "2", title: "Fu", url: "https://www.youtube.com/watch?v=ysz5S6PUM-U", category: "library" },
    { id: "3", title: "A", url: "https://www.youtube.com/watch?v=jNQXAC9IVRw", category: "trending" }
];

const shorts = [
    { id: "s1", title: "Python in 60s", url: "https://www.youtube.com/shorts/s5Ijz7FIKdE" },
    { id: "s2", title: "New Desk Setup", url: "https://www.youtube.com/shorts/s5Ijz7FIKdE" },
    { id: "s3", title: "CSS Trick", url: "https://www.youtube.com/shorts/s5Ijz7FIKdE" },
    { id: "s4", title: "Morning Routine", url: "https://www.youtube.com/shorts/s5Ijz7FIKdE" }
];


// 2. YouTube video ID olish
function extractID(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}


// 3. Videolarni chiqarish
function renderVideos(category = 'all', filterText = "") {

    const grid = document.getElementById('video-grid');
    if (!grid) return;

    grid.innerHTML = "";

    let data = videos;

    if (category !== 'all') {
        data = data.filter(v => v.category === category);
    }

    if (filterText) {
        data = data.filter(v =>
            v.title.toLowerCase().includes(filterText.toLowerCase())
        );
    }

    data.forEach(v => {

        const videoId = extractID(v.url);
        if (!videoId) return;

        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <div class="thumb"
            style="
            background-image:url('https://img.youtube.com/vi/${videoId}/hqdefault.jpg');
            background-size:cover;
            aspect-ratio:16/9;
            border-radius:12px;">
            </div>

            <div class="info-title"
            style="margin-top:10px;font-weight:600;">
            ${v.title}
            </div>
        `;

        card.onclick = () => {
            window.location.href = `video.html?id=${v.id}`;
        };

        grid.appendChild(card);
    });
}


// 4. Search tizimi
const searchInput = document.getElementById('search-input');

if (searchInput) {

    searchInput.addEventListener('input', (e) => {
        renderVideos('all', e.target.value);
    });

}


// 5. Shorts player
function openShortsFeed() {

    const container = document.getElementById('shorts-player-container');
    const wrapper = document.getElementById('shorts-wrapper');

    if (!container || !wrapper) return;

    container.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    wrapper.innerHTML = "";

    const randomShorts = [...shorts].sort(() => Math.random() - 0.5);

    randomShorts.forEach(s => {

        const videoId = extractID(s.url);

        const slide = document.createElement('div');
        slide.className = 'short-video-slide';

        slide.innerHTML = `
        <iframe
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen>
        </iframe>
        `;

        wrapper.appendChild(slide);
    });
}


// 6. Shorts yopish
const closeBtn = document.querySelector('.close-shorts');

if (closeBtn) {

    closeBtn.addEventListener('click', () => {

        document.getElementById('shorts-player-container').classList.add('hidden');
        document.body.style.overflow = 'auto';

        document.getElementById('shorts-wrapper').innerHTML = "";

    });

}


// 7. Sidebar
document.querySelectorAll('.sidebar a').forEach(link => {

    link.onclick = function(e) {

        const cat = this.getAttribute('data-cat');

        if (cat === 'shorts') {

            e.preventDefault();
            openShortsFeed();

        } else {

            renderVideos(cat);

        }

    };

});


// 8. Video page
function displayVideo() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const item = videos.find(v => v.id === id);

    if (!item) return;

    const videoId = extractID(item.url);

    const wrapper = document.getElementById('player-wrapper');

    if (wrapper) {

        wrapper.innerHTML = `
        <iframe
        src="https://www.youtube.com/embed/${videoId}?autoplay=1"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen>
        </iframe>
        `;

    }

    const title = document.getElementById('video-title');

    if (title) {
        title.innerText = item.title;
    }

}


// 9. Sahifa yuklanganda
window.onload = () => {

    if (document.getElementById('video-grid')) {
        renderVideos();
    }

    if (document.getElementById('player-wrapper')) {
        displayVideo();
    }

};