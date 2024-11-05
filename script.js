async function loadVideoData() {
    const response = await fetch('datas.txt');
    const data = await response.text();

    const videoData = data
        .split('\n')
        .filter(line => line.trim() !== "") // Boş satırları filtrele
        .map(line => {
            const [id, views, brand, link] = line.split(','); // Dördüncü sütun video linki
            return { id, views, brand, link };
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
        videoInfo.innerText = `${video.brand}\n${video.views} views\nLink: ${video.link}`; // Linki göster

        videoContainer.appendChild(videoElement);
        videoContainer.appendChild(videoInfo);
        gallery.appendChild(videoContainer);
    });
}

loadVideoData();
