// const sound = document.querySelectorAll('sound')
// const times = []

// times.push({
//     key: 'a',
//     time: 123
// })

const sounds = {
  a: document.querySelector("#s1"),
  s: document.querySelector("#s2"),
  d: document.querySelector("#s3"),
  e: document.querySelector("#s4"),
  f: document.querySelector("#s5"),
  z: document.querySelector("#s6"),
  x: document.querySelector("#s7"),
  c: document.querySelector("#s8"),
  q: document.querySelector("#s9"),
};

// addEventListener('keypress',(ev) => {
//     const key = ev.key
//     const sound = sounds[key]
//     console.dir(sound.dataset.key)
//     sound.currentTime= 0
//     sound.play()

// })

const recordedChannels = [[], [], [], []];
let selectedChannelIndex = 0;
let isRecording = false;

document.addEventListener("keypress", (ev) => {
  const sound = sounds[ev.key];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
    if (isRecording) {
      const channelIndex = 0;
      recordedChannels[selectedChannelIndex].push({ time: Date.now(), key: ev.key });
    }
  }
});

document.getElementById("recordButton").addEventListener("click", () => {
  isRecording = !isRecording;
  if (isRecording) {
    console.log("Recording started");
  } else {
    console.log("Recording stopped");
  }
  if (isRecording) {
    recordedChannels.forEach((channel) => {
      channel.length = 0;
    });
  }

  selectedChannelIndex = parseInt(
    document.getElementById("channelSelect").value
  );
});

document.getElementById("playButton").addEventListener("click", () => {
  recordedChannels.forEach((channel) => {
    let startTime = null;
    channel.forEach((note) => {
      if (!startTime) {
        startTime = note.time;
      }
      const playTime = note.time - startTime;
      setTimeout(() => {
        const sound = sounds[note.key];
        sound.currentTime = 0;
        sound.play();
      }, playTime);
    });
  });
});





