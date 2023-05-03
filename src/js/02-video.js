import throttle from 'lodash.throttle';

import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  const playTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', JSON.stringify(playTime));
}

const savedPlay = () => {
  const savedPlayTime = localStorage.getItem('videoplayer-current-time');
  if (savedPlayTime) {
    player.setCurrentTime(JSON.parse(savedPlayTime));
  }
};

savedPlay();
