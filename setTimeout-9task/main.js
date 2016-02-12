//Написать функцию с использованием setTimeout, которая выводит в консоль таймер вида 00:00, 00:01, …, 00:59, 01:00, …, 59:59, 00:00 который обновляется каждую секунду (такие часики простые).

var seconds = 0;

var clockTimeout = setTimeout (
  function tickTack() {
    seconds = seconds + 1;
    console.log (clock(seconds));
    clockTimeout = setTimeout(tickTack, 1000)
  }, 1000
);


function clock(totalSeconds) {
  var minutes = 0, seconds = 0;
  minutes = Math.floor(totalSeconds / 60);
  seconds = totalSeconds - 60*minutes;
  if (minutes > 59) {
    minutes = 0;
  }
  return pad(minutes) + ":" + pad(seconds);
};


function pad(num) {
  return ("00" + num).slice(-2);
}