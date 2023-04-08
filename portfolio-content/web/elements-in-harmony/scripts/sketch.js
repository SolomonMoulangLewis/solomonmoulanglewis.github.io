//--------------------------------------------------------
//Weather Data Variables
//
let windDir = 0;
let windSpd = 0;

let sunrise = 0;
let sunset = 0;
//
//--------------------------------------------------------
//FFT Variables
//
let fft;
let wave;
let circWave;
//
//--------------------------------------------------------
//Visual Variables
//
let circArr = [];
let circNum = 0;

let sunMoon;
let SMDrawTog = false;

let noiseScale = 0.01;
//
//--------------------------------------------------------
//API Variables
//
var weather;

var api = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&appid=29021a84b15a271b070033ab33e78ed9";
var units = "&units=metric";

var inputCity;
var inputCountry;
//
//--------------------------------------------------------
//p5 Setup & Draw
//
function setup() {
  //p5 Canvas
  let cnv = createCanvas(windowWidth, windowHeight);
  //Chnaging Canvas parent container -> for positioning
  cnv.parent("sketch-holder");
  //Setting p5 project framerate
  frameRate(60);
  userStartAudio();

  //p5 FFT analyser
  fft = new p5.FFT();

  //Assigning button to variable
  var button = select("#submit");
  button.mousePressed(startApp);

  //Input field variables
  inputCity = select("#city");
  inputCountry = select("#country");

  //Function Call to weather-synth.js synth setup function
  synthSetup();
}
//------------------------------------------------
//p5 Draw Function
function draw() {
  //Background Draw
  background(10, 30);

  //Update FFT
  fft.analyze();
  wave = fft.waveform();
  circWave = fft.getEnergy("mid");

  //Draw Sun/Moon
  if (SMDrawTog) {
    sunMoon.drawSunMoon(fft.getEnergy("lowMid") - 200);
  }

  //Draw Clouds
  for (var i = 0; i < circArr.length; i++) {
    circArr[i].display();
  }
}

//--------------------------------------------------------
function startApp() {
  weatherAsk();
  moveHeaderFooter();
}

//--------------------------------------------------------
//Loads JSON data from user input fields
function weatherAsk() {
  var city = inputCity.value();
  var country = inputCountry.value();
  var url = api + city + "," + country + apiKey + units;
  loadJSON(url, gotData);
}

//Loads JSON weather data into variable
function gotData(data) {
  weather = data;

  startWeatherFuncs();
}
//--------------------------------------------------------
//Function Calls functions to start visuals and music
function startWeatherFuncs() {
  //Functions call if weather data has loaded
  if (weather) {
    //Initialises variables from weather JSON data
    setWeatherVars();

    //Sets weather visuals
    createVisuals();

    //Plays Music Synth and audio files
    playPatterns();
    playPattern();
    playAudioFile(weather.weather[0].main);

    //Sets BPM of weatherSynth sequencer
    part.setBPM(windSpd * 4);

    //Logs JSON weather data to console
    console.log(weather);
  }
}
//--------------------------------------------------------
function createVisuals() {
  //Create circles
  for (var i = 0; i < circNum / 2; i++) {
    circArr.push(new circMaker(windDir, windSpd));
  }
  for (var i = 0; i < circNum / 2; i++) {
    circArr.push(
      new circMaker(windDir + random(-0.3, 0.3), windSpd * random(0, 0.2))
    );
  }

  //Creates sun/Moon
  sunMoon = new SunMoon();
  SMDrawTog = true;
}
//--------------------------------------------------------
//Function sets up weather variables from JSON data
function setWeatherVars() {
  circNum = weather.clouds.all;
  windDir = weather.wind.deg;
  windSpd = weather.wind.speed;

  sunrise = weather.sys.sunrise;
  sunset = weather.sys.sunset;
}
//--------------------------------------------------------
