const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
const pause = document.querySelector(".pause");
const counter = document.querySelector(".counter");
const clear = document.querySelector(".clear");

const cycle = document.querySelector(".cycle");
const done = document.querySelector(".mgs-done");
const mgsBreak = document.querySelector(".mgs-break");
const title = document.querySelector(".title-start");

const dingBegin = new Audio("songs/StartRing.mp3");
const dingStop = new Audio("songs/StopRing.mp3");

const clock = document.querySelector(".click")
const clockTotal = document.querySelector(".clock")


let score = 0;
score = localStorage.getItem("ciclo", score) || 0;
cycle.innerHTML = ` Ciclos completados: ${score}`;

let minute = 25;
let second = "00";

start.classList.remove("hidden");
counter.textContent = `${minute}:${second}`;

const started = start.addEventListener("click", () => {
  clockTotal.classList.remove("vibrate-1");

  start.classList.add("hidden");
  pause.classList.add("hidden");
  reset.classList.remove("hidden");

  mgsBreak.classList.add("hidden");
  done.classList.add("hidden");
  title.style.display = "none";

  dingBegin.play();
  dingStop.pause()

  minute = 24;
  second = 59;
  counter.textContent = `${minute}:${second}`;

  count()
  animar()
});

function count() {
  let minutes_interval = setInterval(minutesCount, 60000);
  let seconds_interval = setInterval(secondsCount, 1000);

  function minutesCount() {
    minute--;
    counter.textContent = `${minute}:${second}`;
  }

  function secondsCount() {
    second--;
    counter.textContent = `${minute}:${second}`;

    if (second <= 0) {
      if (minute <= 0) {
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);

        score++;
        cycle.innerHTML = ` Ciclos completados: ${score}`;

        reset.classList.add("hidden");        
        start.classList.remove("hidden");        
        pause.classList.remove("hidden");
       
        done.classList.remove("hidden");
        clock.classList.remove("animar");       
        dingStop.play();        
        vibrate()

        localStorage.setItem("ciclo", score);
      }
      second = 60;
    }
   }
};

const breaked = pause.addEventListener('click', () => {
  clockTotal.classList.remove("vibrate-1");

  minute = 4;
  second = 59;
  counter.textContent = `${minute}:${second}`;

  start.classList.add("hidden");
  pause.classList.add("hidden");
  reset.classList.remove("hidden");
  done.classList.add("hidden");
  title.style.display = "none";
  

  countBreak()
  animar()
  dingBegin.play();
  dingStop.pause()
})

function countBreak() {
  let minutes_interval = setInterval(minutesCount, 60000);
  let seconds_interval = setInterval(secondsCount, 1000);

  function minutesCount() {
    minute--;
    counter.textContent = `${minute}:${second}`;
  }

  function secondsCount() {
    second--;
    counter.textContent = `${minute}:${second}`;

    if (second <= 0) {
      if (minute <= 0) {
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);

        start.classList.remove("hidden");
        reset.classList.add("hidden");
       
        mgsBreak.classList.remove("hidden");       
        title.style.display = "block";
        clock.classList.remove("animar");

        dingStop.play();
        vibrate()
      
      }
      second = 60;
    }
   }
};

const clearLocalStorage = clear.addEventListener('click', () => {
  let alert = confirm('Tem certeza que deseja apagar seu registro?')
  if (alert == true) {
     score = 0
  localStorage.setItem('ciclo', score);
  cycle.innerHTML = ` Ciclos completados: ${score}`;
  } 
})

clock.classList.remove("animar");
clockTotal.classList.remove("vibrate-1");

function animar() {
  clock.classList.add("animar");
}

function vibrate() {
  clockTotal.classList.add("vibrate-1");
}