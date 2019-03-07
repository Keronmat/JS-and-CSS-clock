const secondHand = document.querySelector(".secondhand");
const minuteHand = document.querySelector(".minutehand");
const hourHand = document.querySelector(".hourhand");

const setDate = () => {
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
  console.log(seconds, minutes, hours);
};
setInterval(setDate, 1000);
