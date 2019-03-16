const secondHand = document.querySelector(".secondhand");
const minuteHand = document.querySelector(".minutehand");
const hourHand = document.querySelector(".hourhand");
const time = document.querySelector(".time");
const digiTime = document.querySelector(".digital-time");
const digiSeconds = document.querySelector(".digital-seconds");
const day = document.querySelector(".day");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const amPm = document.querySelector(".amPm");
const digitalDate = document.querySelector(".digital-date");
const digitalOpenAlarmButton = document.querySelector(".open-alarm");
const snoozeButton = document.querySelector(".snoozeButton");
const closeAlarm = document.querySelector(".close-alarm");
const setAlarmButton = document.querySelector("#alarmButton");
const bellButtonOff = document.querySelector(".fa-bell-slash");
const alarmForm = document.querySelector(".alarm-details");

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

  //adds digital time to analog clock and digital clock
  let newMins = minutes.toString().length > 1 ? minutes : `0${minutes}`;
  time.innerHTML = `${convertHours(hours)}:${newMins}`;
  digiTime.innerHTML = `${convertHours(hours)}:${newMins}`;

  digiSeconds.innerHTML = `:${convertSeconds(seconds)}`;

  //check to see if its AM or PM
  const timeOfTheDay = hours < 12 || hours === 24 ? "AM" : "PM";
  amPm.innerHTML = timeOfTheDay;
  addAmPmToDigital(timeOfTheDay);

  //get date to add to digital clock'

  addDateToDigital(
    now.getDay(),
    now.getDate(),
    now.getMonth(),
    now.getFullYear()
  );

  changeBackGroundImg(hours);
  playSound();
};

// convert 24 hours time to 12 hour time
const convertHours = hours => {
  let newHours = hours % 12 || 12;
  newHours = newHours.length = 2 ? newHours : `0${newHours}`;
  return newHours;
};
const convertSeconds = secs => {
  let newSecs = secs.toString();
  newSecs = newSecs.length == 1 ? `0${newSecs}` : newSecs;

  return newSecs;
};

//add AM and PM to digital clock
const addAmPmToDigital = timeOfTheDay => {
  const AM = document.querySelector("#am");
  const PM = document.querySelector("#pm");
  if (timeOfTheDay === "PM") {
    PM.classList.add("digital-pm");
  } else if (timeOfTheDay === "AM") {
    AM.classList.add("digital-am");
  }
};

// Add date to digital clock

const addDateToDigital = (day, date, monIndex, year) => {
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let end = "";

  if (date > 3 && date < 21) end = "th";
  switch (date % 10) {
    case 1:
      end = "st";
    case 2:
      end = "nd";
    case 3:
      end = "rd";
    default:
      end = "th";
  }
  const daySpans = Array.from(
    document.querySelectorAll(".digital-weekdays>span")
  );
  daySpans[day].classList.add("today");
  digitalDate.innerHTML = `${date}${end.sup()} ${month[monIndex]}, ${year}`;
};

//  alarm clock setup starts
let alarmTimer; //

const openAlarm = () => {
  const x = document.querySelector(".alarm-details");
  const offBell = document.querySelector(".close-alarm");
  if (x.style.display === "none") {
    x.style.display = "block";
    offBell.style.display = "inline-block";
  } else {
    x.style.display = "none";
    offBell.style.display = "none";
  }
};

const playAlarmSound = () => {
  const audio = document.querySelector(`#alarmSound`);
  audio.play();
};

const setAlarm = () => {
  const setAlarmTimeInMs = document.getElementById("alarmTime").valueAsNumber;
  const bellButtonOn = document.querySelector(".fa-bell");
  const alarmOptionsButton = document.querySelector("#alarmOptions");

  if (isNaN(setAlarmTimeInMs)) {
    alert("Invalid Date");
    return;
  }
  const alarm = new Date(setAlarmTimeInMs);
  const alarmTime = new Date(
    alarm.getUTCFullYear(),
    alarm.getUTCMonth(),
    alarm.getUTCDate(),
    alarm.getUTCHours(),
    alarm.getUTCMinutes(),
    alarm.getUTCSeconds()
  );

  const differenceInTime = alarmTime.getTime() - new Date().getTime();

  if (differenceInTime < 0) {
    alert("Time has already passed");
    return;
  } else {
    bellButtonOn.style.color = "var(--alarmOn)";
    alarmTimer = setTimeout(initAlarm, differenceInTime);
    alarmOptionsButton.style.display = "inline-block";
  } //
};

const initAlarm = () => {
  const audio = document.querySelector(`#alarmSound`);
  audio.play();

  document.querySelector(".open-alarm>i").classList.add("alarmGoing");
};

const stopCancelAlarm = () => {
  const bellButtonOn = document.querySelector(".fa-bell");
  const alarmOptions = document.getElementById("alarmOptions");
  const audio = document.querySelector(`#alarmSound`);

  audio.pause();
  audio.crrentTime = 0;

  alarmOptions.style.display = "none";
  clearTimeout(alarmTimer);
  alarmForm.reset();
  bellButtonOn.style.color = "var(--platinum)";
  document.querySelector(".open-alarm>i").classList.remove("alarmGoing");
  openAlarm();
};

function snooze() {
  const bellButtonOn = document.querySelector(".fa-bell");
  const alarmOptions = document.getElementById("alarmOptions");

  stopCancelAlarm();
  bellButtonOn.style.color = "var(--gold)";
  alarmOptions.style.display = "inline-block";

  setTimeout(initAlarm, 300000);
}

digitalOpenAlarmButton.addEventListener("click", openAlarm);
snoozeButton.addEventListener("click", snooze);
setAlarmButton.addEventListener("click", setAlarm);
closeAlarm.addEventListener("click", stopCancelAlarm);
//end alarm
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
  const audio = document.querySelector(`#tickingSound`);

  if (!audio) return;
  audio.currentTime = 0;
  audio.volume = 0.02;
  audio.play();
}
setInterval(setTime, 1000);
//change style of clock

/*
if (hours >= 6 && hours < 12) {
  body.style.backgroundImage =
    "url('https://github.com/Keronmat/JS-and-CSS-clock/blob/master/img/morning.jpg?raw=true')";
} else if (hours >= 12 && hours < 17) {
  body.style.backgroundImage =
    "url('https://github.com/Keronmat/JS-and-CSS-clock/blob/master/img/afternoon.jpg?raw=true')";
} else if (hours >= 17 && hours < 22) {
  body.style.backgroundImage =
    "url('https://github.com/Keronmat/JS-and-CSS-clock/blob/master/img/evening.jpg?raw=true')";
} else {
  body.style.backgroundImage =
    "url('https://github.com/Keronmat/JS-and-CSS-clock/blob/master/img/night.jpg?raw=true')";
}*/
