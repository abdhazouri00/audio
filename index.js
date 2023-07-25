const audio = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playButton');
  
    let startTime = 0;
    let lastSessionTimeSpent = 0;
  
    const storedLastSessionTimeSpent = localStorage.getItem('lastSessionTimeSpent');
    if (storedLastSessionTimeSpent !== null) {
      lastSessionTimeSpent = parseFloat(storedLastSessionTimeSpent);
    }
  
    const logTimeSpent = () => {
      if (startTime !== 0) {
        const endTime = new Date().getTime() / 1000;
        const timeSpentInSeconds = endTime - startTime;
  
        lastSessionTimeSpent += timeSpentInSeconds;
  
        localStorage.setItem('lastSessionTimeSpent', lastSessionTimeSpent);
  
        console.log('Last session time spent listening:', lastSessionTimeSpent.toFixed(2), 'seconds');
  
        startTime = 0;
      }
    };
  
    window.addEventListener('beforeunload', logTimeSpent);
  
    const playAudio = () => {
      audio.play();
      playButton.disabled = true;
      playButton.style.opacity = '1';
      playButton.style.background = 'rgb(243, 16, 0)';
      playButton.style.border = '0';
  
      startTime = new Date().getTime() / 1000;
    };
  
    playButton.addEventListener('click', playAudio);
  
    audio.addEventListener('pause', logTimeSpent);
  
    audio.addEventListener('ended', () => {
      playButton.disabled = true;
    });

    window.addEventListener('DOMContentLoaded', () => {
      console.log('Last session time spent after reload:', lastSessionTimeSpent.toFixed(2), 'seconds');
      audio.currentTime =lastSessionTimeSpent;
    });