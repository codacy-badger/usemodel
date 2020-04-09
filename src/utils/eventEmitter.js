const hasOwnProperty = (obj, prop) =>
  Object.prototype.hasOwnProperty.call(obj, prop)

export default class EventEmitter {
  constructor() {
    this._events = {}
  }

  initEvents(events) {
    events.forEach(e => {
      this._events[e] = []
    })
  }

  on(event, handler) {
    if (!hasOwnProperty(this._events, event))
      throw new Error('Event is not implemented')
    this._events[event].push(handler)
  }

  off(event, handler) {
    if (!hasOwnProperty(this._events, event))
      throw new Error('Event is not implemented')
    this._events[event] = this._events[event].filter(h => h !== handler)
  }

  trigger(event, ...payload) {
    if (!hasOwnProperty(this._events, event))
      throw new Error('Event is not implemented')
    this._events[event].forEach(handler => {
      if (typeof handler === 'function') handler.call(this, ...payload)
    })
  }
}