const audio = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playButton');
  
    let startTime = 0;
    let lastSessionTimeSpent = 0;
  
    // Check if there's a stored last session time spent in the localStorage
    const storedLastSessionTimeSpent = localStorage.getItem('lastSessionTimeSpent');
    if (storedLastSessionTimeSpent !== null) {
      lastSessionTimeSpent = parseFloat(storedLastSessionTimeSpent);
    }
  
    // Function to log the time spent in the last session
    const logTimeSpent = () => {
      if (startTime !== 0) {
        const endTime = new Date().getTime() / 1000;
        const timeSpentInSeconds = endTime - startTime;
  
        // Add the time spent in the current session to the last session's time
        lastSessionTimeSpent += timeSpentInSeconds;
  
        // Save the updated last session time spent in the localStorage
        localStorage.setItem('lastSessionTimeSpent', lastSessionTimeSpent);
  
        console.log('Last session time spent listening:', lastSessionTimeSpent.toFixed(2), 'seconds');
  
        startTime = 0;
      }
    };
  
    // Event listener for beforeunload event
    window.addEventListener('beforeunload', logTimeSpent);
  
    // Function to start audio playback and record the start time
    const playAudio = () => {
      audio.play();
      playButton.disabled = true;
      playButton.style.opacity = '1';
      playButton.style.background = 'rgb(243, 16, 0)';
      playButton.style.border = '0';
  
      // Record the start time for the current session
      startTime = new Date().getTime() / 1000;
    };
  
    playButton.addEventListener('click', playAudio);
  
    // Function to log time spent when the audio is paused
    audio.addEventListener('pause', logTimeSpent);
  
    // Check if the audio has ended to disable the play button
    audio.addEventListener('ended', () => {
      playButton.disabled = true;
    });

    // Log last session's time spent after page reload (DOMContentLoaded event)
    window.addEventListener('DOMContentLoaded', () => {
      console.log('Last session time spent after reload:', lastSessionTimeSpent.toFixed(2), 'seconds');
      audio.currentTime =lastSessionTimeSpent;
    });