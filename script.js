async function loadVideoData() {
    const response = await fetch('datas.txt');
    const data = await response.text();

    const videoData = data.split('\n').map(line => {
        const [id, views, brand] = line.split(',');
        return { id, views, brand };
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
        videoInfo.innerText = `${video.brand} - ${video.views} izlenme`;

        videoContainer.appendChild(videoElement);
        videoContainer.appendChild(videoInfo);
        gallery.appendChild(videoContainer);
    });
}

loadVideoData();
