async function loadVideoData() {
    const response = await fetch('data.txt');
    const data = await response.text();

    const videoData = data
        .split('\n')
        .filter(line => line.trim() !== "") // Boş satırları filtrele
        .map(line => {
            const [id, views, brand, brandig, link] = line.split(','); // Dördüncü sütun video linki
            return { id, views, brand, brandig, link };
        });

    const gallery = document.getElementById('videoGallery');
    videoData.forEach(video => {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        
        const videoElement = document.createElement('video');
        videoElement.src = `videos/${video.id}.mp4`;
        videoElement.controls = true;
        
        const videoInfo = document.createElement('div');
        videoInfo.className = 'video-info';

        // Marka, görüntülenme sayısı ve linki alt alta ekle
        videoInfo.innerHTML = `<a href="https://instagram.com/${video.brandig}" target="_blank">${video.brand}</a><br>${video.views} views<br><a href="${video.link}" target="_blank">watch on IG</a>`;

        videoContainer.appendChild(videoElement);
        videoContainer.appendChild(videoInfo);
        gallery.appendChild(videoContainer);
    });
}


loadVideoData();
