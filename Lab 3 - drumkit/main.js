// Panda 4

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

const recordedChannels = [[], [], [], []];
let selectedChannelIndex = 0;
let isRecording = false;

// Metronome
let metronomeInterval = null;
let isMetronomeOn = false;
let beatsPerMinute = 120;

document.addEventListener("keypress", (ev) => {
  const sound = sounds[ev.key];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
    if (isRecording) {
      recordedChannels[selectedChannelIndex].push({
        time: Date.now(),
        key: ev.key,
      });
    }
  }
});

document.getElementById("recordButton").addEventListener("click", () => {
  isRecording = !isRecording;

  selectedChannelIndex = parseInt(
    document.getElementById("channelSelect").value
  );

  if (isRecording) {
    console.log("Recording started");
    recordedChannels[selectedChannelIndex] = [];
  } else {
    console.log("Recording stopped");
  }
});

document
  .getElementById("playSingleChannelButton")
  .addEventListener("click", () => {
    const selectedChannel = recordedChannels[selectedChannelIndex];
    playChannel(selectedChannel);
  });

document
  .getElementById("playAllChannelsButton")
  .addEventListener("click", () => {
    recordedChannels.forEach((channel) => {
      playChannel(channel);
    });
  });

function playChannel(channel) {
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
}

function startMetronome() {
  if (isMetronomeOn) return;
  let intervalTime = 60000 / beatsPerMinute;
  metronomeInterval = setInterval(() => {
    let metronomeSound = new Audio("./sounds/snare.wav");
    metronomeSound.play();
  }, intervalTime);
  isMetronomeOn = true;
}

function stopMetronome() {
  clearInterval(metronomeInterval);
  isMetronomeOn = false;
}

document
  .getElementById("metronomeToggleButton")
  .addEventListener("click", () => {
    if (isMetronomeOn) {
      stopMetronome();
    } else {
      startMetronome();
    }
  });

document.getElementById("bpmInput").addEventListener("change", (event) => {
  beatsPerMinute = parseInt(event.target.value);
  if (isMetronomeOn) {
    stopMetronome();
    startMetronome();
  }
});
