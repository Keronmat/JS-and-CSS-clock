const secondHand = document.querySelector(".secondhand");
const minuteHand = document.querySelector(".minutehand");
const hourHand = document.querySelector(".hourhand");
const time = document.querySelector(".time");
const day = document.querySelector(".day");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const amPm = document.querySelector(".amPm");

const setTime = () => {
  const now = new Date();

  //update second hand
  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 270;
  //console.log(now);
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  //update minute hand
  const minutes = now.getMinutes();
  const minutesDegrees = (minutes / 60) * 360 + 270;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  //update hour hand

  const hours = now.getHours();
  const hoursDegrees = (hours / 12) * 360 + 270;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  //console.log(hours);
  //adds digital time to clock
  let newMins = minutes.toString().length > 1 ? minutes : `0${minutes}`;
  time.innerHTML = `${convertHours(hours)}:${newMins}`;

  //check to see if its AM or PM
  const timeOfTheDay = hours < 12 || hours === 24 ? "AM" : "PM";
  amPm.innerHTML = timeOfTheDay;
  changeBackGroundImg(hours);
  playSound();
};

// convert 24 hours time to 12 hour time
const convertHours = hours => {
  let newHours = hours % 12 || 12;
  newHours = newHours.length = 2 ? newHours : `0${newHours}`;
  return newHours;
};
// changes background image depending the hour of the day
const changeBackGroundImg = hours => {
  const body = document.querySelector("body");

  if (hours >= 6 && hours < 12) {
    body.style.backgroundImage = "url('../img/morning.jpg')";
  } else if (hours >= 12 && hours < 17) {
    body.style.backgroundImage = "url('../img/afternoon.jpg')";
  } else if (hours >= 17 && hours < 22) {
    body.style.backgroundImage = "url('../img/evening.jpg')";
  } else {
    body.style.backgroundImage = "url('../img/night.jpg')";
  }
};

//add ticking sound to the clock
function playSound() {
  const audio = document.querySelector(`audio`);

  if (!audio) return;
  audio.currentTime = 0;
  audio.volume = 0.01;
  audio.play();
}
setInterval(setTime, 1000);
//change style of clock
