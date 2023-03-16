
// utility function
function runFuncEveryAmountOfTime(
  fn,
  time,
  timeCheckerInterval = 50,
  functionToRunAfterTimeChecker = () => {},
  stopAfterNumberOfRuns = Infinity,
  stopAfterTime = Infinity
) {
  let startRunTime = Date.now();
  let lastRunTime = Date.now();
  let runs = 0;

  const intervalId = setInterval(timeChecker, timeCheckerInterval);

  function timeChecker() {
    if (Date.now() - lastRunTime >= time) {
      fn();
      lastRunTime = Date.now();
      runs++;

      if (runs === stopAfterNumberOfRuns) {
        stop();
      }
      if (startRunTime + stopAfterTime < Date.now()) {
        stop();
      }
    }
    functionToRunAfterTimeChecker(getRemainingTime());
  }

  function stop() {
    clearInterval(intervalId);
  }

  function getRemainingTime() {
    return time - (Date.now() - lastRunTime);
  }

  return { stop, getRemainingTime };
}

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}
