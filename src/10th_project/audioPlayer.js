const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//Song Titles
const songs = ['hey', 'summer', 'ukulele'];

//Keep track of a song
let songIndex = 2;

//Initially load song details into dom
loadSongs(songs[songIndex]);

//Update song details
function loadSongs(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;

    musicContainer.classList.add('play');
}

//Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();

}
//Pause the song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();

}

//Swtich to the previous song
function playPrev() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = (songs.length) - 1;
    }
    loadSongs(songs[songIndex]);

    playSong();
}

//Swtich to the next song
function playNext() {
    songIndex++;
    if (songIndex > (songs.length) - 1) {
        songIndex = 0;
    }
    loadSongs(songs[songIndex]);

    playSong();
}

//Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

//Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
})
prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);

audio.addEventListener('timeupdate', updateProgress);

//Click on progress bar
progressContainer.addEventListener('click', setProgress);

//Song ends 
audio.addEventListener('ended', playNext);