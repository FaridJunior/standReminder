// constants
const waitTime = 1000 * 60 * 40; // 40 minutes
const reminderAudioURL = "./reminder_to_call.mp3";
const appEvents = {
  startReminder: "tttttt",
  stopReminder: "rrrrr",
  timeUpdate: "qqqq",
  sessionEnded: "vvvv",
};

document.addEventListener("DOMContentLoaded", function () {
  const reminder = new Reminder(
    reminderAudioURL,
    waitTime,
    onSessionEnded,
    OnTimeUpdate
  );

  const UI = {
    document: document,
    startButton: document.querySelector("#start"),
    stopButton: document.querySelector("#stop"),
    status: document.querySelector("#status"),
    timeScreen: document.querySelector("#stop"),
    numberOfCompletedSessions: document.querySelector(
      "#number-of-completed-sessions"
    ),
    app: document.querySelector("#app"),
  };

  UI.startButton.addEventListener("click", handleStartButtonClick);
  UI.stopButton.addEventListener("click", handleStopButtonClick);

  // user actions
  UI.app.addEventListener(appEvents.startReminder, handleReminderStart);
  UI.app.addEventListener(appEvents.stopReminder, handleReminderStop);

  // system actions
  UI.app.addEventListener(appEvents.timeUpdate, handleTimeUpdate);
  UI.app.addEventListener(appEvents.sessionEnded, handleSessionEnded);

  function handleTimeUpdate(e){
    updateScreenTime(e.detail.time);
    UI.document.title = msToTime(e.detail.time);
  }

  function handleSessionEnded() {
    UI.numberOfCompletedSessions.textContent =
      Number(UI.numberOfCompletedSessions.textContent) + 1;
  }

  function handleReminderStart() {
    reminder.start(OnTimeUpdate);
    UI.status.style.background = "green";
    UI.startButton.style.display = "none";
    UI.stopButton.style.display = "block";
  }

  function OnTimeUpdate(time) {
    const timeUpdateEvent = new CustomEvent(appEvents.timeUpdate, {
      detail: { time },
    });
    UI.app.dispatchEvent(timeUpdateEvent);
  }

  function onSessionEnded() {
    const oneSessionEndedEvent = new Event(appEvents.sessionEnded);
    UI.app.dispatchEvent(oneSessionEndedEvent);
  }

  function handleReminderStop() {
    reminder.stop();
    UI.status.style.background = "gray";
    UI.startButton.style.display = "block";
    UI.stopButton.style.display = "none";
  }

  function handleStartButtonClick() {
    const startReminderEvent = new Event(appEvents.startReminder);
    UI.app.dispatchEvent(startReminderEvent);
  }

  function handleStopButtonClick() {
    const stopReminderEvent = new Event(appEvents.stopReminder);
    UI.app.dispatchEvent(stopReminderEvent);
  }

  function updateScreenTime(time) {
    UI.timeScreen.textContent = msToTime(time);
  }
});
