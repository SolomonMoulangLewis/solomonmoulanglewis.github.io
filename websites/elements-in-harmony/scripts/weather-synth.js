//Scale
let synthScale = [
  "G2",
  "C2",
  "G3",
  "A#3",
  "C3",
  "D3",
  "F3",
  "G4",
  "A#4",
  "C4",
  "D4",
  "F4",
  "G5",
  "A#5",
  "C5",
  "F5",
];

//p5 Variables for the Pattern Sequencer
let part;
let phrase;
let phrase2;

//Amplitude variable
let amplitude;

//Variable for the p5 Synthesiser
let synth;

//Variables for the p5 Audio FX
let d;
let lp;
let r;
let delay;

//Pattern
let seq = 0;

//Variable to store scale
//Note: I was going to have different scales dependent on weather variables
let scaley = synthScale;

//Variables to store audio files
let atmosphere, clearSky, clouds, drizzle, rain, snow, thunderstorm;

//Preload function loads audio before project start
function preload() {
  atmosphere = loadSound("audio/atmosphere.mp3");
  clearSky = loadSound("audio/clear.mp3");
  clouds = loadSound("audio/clouds.mp3");
  drizzle = loadSound("audio/drizzle.mp3");
  rain = loadSound("audio/rain.mp3");
  snow = loadSound("audio/snow.mp3");
  thunderstorm = loadSound("audio/thunderstorm.mp3");
}

//Initialising synth variables
function synthSetup() {
  // Synths
  synth = new p5.PolySynth();
  // FX
  r = new p5.Reverb();
  d = new p5.Distortion(0.001);
  lp = new p5.LowPass();
  delay = new p5.Delay();

  // FX Settings
  lp.freq(600);
  r.drywet(0.7);

  // FX Routing
  synth.disconnect();
  synth.connect(d);
  d.disconnect();
  d.connect(lp);
  lp.disconnect();
  lp.connect(r);

  // Setting up Sequencer
  phrase = new p5.Phrase("s1", playPattern, seq);
  part = new p5.Part();
  part.addPhrase(phrase);
}

//Function to play Synth
function playPatterns() {
  userStartAudio();
  part.loop();
}

function playPattern() {
  //random attack and release on each note play
  let atk = random(0.01, 1);
  let rel = random(0.01, 1);

  //Set velocity (volume)
  let vel = 0.8;

  //Update Sequencer
  //At each Beat 50,50 chance of note playing
  seq = round(random(0, 1));

  //Synth plays random note of the scale on each beat
  synth.play(scaley[round(random(scaley.length))], vel, atk, rel);
}

//Function to play audio file according to function argument
function playAudioFile(description) {
  switch (description) {
    case "Atmosphere":
      atmosphere.play();
      atmosphere.loop();
      break;

    case "Clear":
      clearSky.play();
      clearSky.loop();
      break;

    case "Clouds":
      clouds.play();
      clouds.loop();
      break;

    case "Rain":
      rain.play();
      rain.loop();
      break;

    case "Drizzle":
      drizzle.play();
      drizzle.loop();
      break;

    case "Snow":
      snow.play();
      snow.loop();
      break;

    case "Thunderstorm":
      thunderstorm.play();
      thunderstorm.loop();
      break;
  }
}

function stopAllAudioFiles() {
  atmosphere.stop();
  clearSky.stop();
  clouds.stop();
  drizzle.stop();
  rain.stop();
  snow.stop();
  thunderstorm.stop();
}
