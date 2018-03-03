import Barba from 'barba.js'

export default class Page {
  constructor () {
    this.active = false
    this.intervals = []
    this.timeouts = []
    this.$els = {}
  }

  initializeBarba (namespace) {
    Barba.BaseView.extend({
      namespace: namespace,
      onEnter: this.onEnter.bind(this),
      onEnterCompleted: this.onEnterCompleted.bind(this),
      onLeave: this.onLeave.bind(this),
      onLeaveCompleted: this.onLeaveCompleted.bind(this)
    }).init()
  }

  onEnter () {
    this.active = true
    this.initializeElements()
    this.initializeEvents()
  }

  onEnterCompleted () {
  }

  onLeave () {
    this.active = false
  }

  onLeaveCompleted () {
    this.clearIntervals()
    this.clearTimeouts()
  }

  /**
   * Return
   * @param options contains el (<a> element) and data attributes
   */
  getTransition (options) {
    return {
      start: function () {
        this.newContainerLoading
          .then(this.transition.bind(this))
      },
      transition: function () {
        new TimelineMax()
          .to('.overflow-transition', 0.5, {width: window.innerWidth})
          .set('.overflow-transition', {left: 0})
          .set(this.oldContainer, {autoAlpha: 0})
          .set(this.newContainer, {autoAlpha: 1})
          .to('.overflow-transition', 0.5, {width: 0})
          .set('.overflow-transition', {right: 0, left: 'auto'})
          .call(() => {
            this.done()
          })
      }
    }
  }

  /**
   * Fill $els with body and window elements
   * called on enter
   */
  initializeElements () {
    this.$els = {
      window,
      body: document.body
    }
  }

  /**
   * Initialize all events
   * called on enter, after initializeElements()
   */
  initializeEvents () {
  }

  /**
   * Add interval and timeout ids, they will be cleared on leave
   */

  addInterval (intervalId) {
    this.intervals.push(intervalId)
  }

  clearIntervals () {
    this.intervals.forEach((intervalId) => {
      clearInterval(intervalId)
    })
  }

  addTimeout (timeoutId) {
    this.timeouts.push(timeoutId)
  }

  clearTimeouts () {
    this.timeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId)
    })
  }
}
