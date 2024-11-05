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

        // Linki tıklanabilir yap
        const linkElement = document.createElement('a');
        linkElement.href = video.link;
        linkElement.target = '_blank'; // Yeni sekmede açılacak
        linkElement.innerText = `Link: ${video.link}`;

        // Video bilgilerini güncelle
        videoInfo.innerHTML = `${video.brand}\n${video.views} views\n`;
        videoInfo.appendChild(linkElement); // Linki info kısmına ekle

        videoContainer.appendChild(videoElement);
        videoContainer.appendChild(videoInfo);
        gallery.appendChild(videoContainer);
    });
}


loadVideoData();
