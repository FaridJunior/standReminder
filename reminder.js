class Reminder {
  /**
   * @typedef {function} onTimeUpdate
   * @param {number} time - the remaining time in milliseconds
   * @returns {void}
   */

  /**
   * @typedef {function} onOneSessionEnd
   * @returns {void}
   */

  /**
   * @typedef {function} onStart
   * @returns {void}
   */

  /**
   * @typedef {function} onStop
   * @returns {void}
   */

  /**
   * @constructor
   * @param {string} url - the url of the audio file to play
   * @param {number} interval - the interval in milliseconds to play the audio file
   * @param {onOneSessionEnd} onOneSessionEnd - a function to run when one session ends
   * @param {onTimeUpdate} onTimeUpdate  - a function to run every time the time is updated
   * @param {onStart} onStart - a function to run when the reminder starts
   * @param {onStop} onStop - a function to run when the reminder stops
   * @returns {void}
   * @description creates a new Reminder object
   * @example
   * const reminder = new Reminder("./reminder_to_call.mp3", 3600000);
   * reminder.start();
   * // the reminder will play the audio file every hour
   * // to stop the reminder
   * reminder.stop();
   * // to start the reminder again
   * reminder.start();
   */
  constructor(
    url,
    interval = waitTime,
    onOneSessionEnd = () => {},
    onTimeUpdate = () => {},
    onStart = () => {},
    onStop = () => {}
  ) {
    this.reminderAudio = new Audio(url);
    this.stop = () => {};
    this.interval = interval;
    this.onOneSessionEnd = onOneSessionEnd;
    this.onTimeUpdate = onTimeUpdate;
    this.onStart = onStart;
    this.onStop = onStop;
  }

  /**
   * @private
   * @description plays the reminder sound if it is not already playing
   * @returns {void}
   */
  playTheReminderSound() {
    if (this.reminderAudio.paused) {
      this.reminderAudio.play();
      this.onOneSessionEnd();
    }
  }

  start() {
    const { stop, getRemainingTime } = runFuncEveryAmountOfTime(
      this.playTheReminderSound.bind(this),
      this.interval,
      50,
      () => this.onTimeUpdate(this.getRemainingTime())
    );

    this.stop = stop;
    this.getRemainingTime = getRemainingTime;
    this.onStart();
  }

  stop() {
    this.stop();
    this.onStop();
  }

  getRemainingTime() {
    return this.getRemainingTime();
  }
}
