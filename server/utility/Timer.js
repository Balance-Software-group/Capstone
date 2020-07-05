//Timer class used to make a simple server-side Timer that runs when you call .start() on the timer
//currently it only console.logs the time, but the intention is for us to use this to send a socket broadcast
//to all players in a particular room that updates their state
class Timer {
  constructor(time) {
    this.time = time
    this.interval = undefined
    this.start = this.start.bind(this)
    this.tick = this.tick.bind(this)
    this.stop = this.stop.bind(this)
  }

  start() {
    if (this.interval) return
    this.interval = setInterval(this.tick, 1000)
  }

  tick() {
    console.log(this.time) //<-------- put socket emit here
    this.time--
    if (this.time === 0) {
      this.stop()
    }
  }

  stop() {
    clearInterval(this.interval)
  }
}

module.exports = Timer
