// Update videos speed

const videos = document.querySelectorAll ("video");

for (i=0; i<videos.length; i++) {
    console.log(videos[i])
    videos[i].playbackRate = 4;
}
