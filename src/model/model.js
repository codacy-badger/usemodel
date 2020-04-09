import _ from 'lodash'
import EventEmitter from '../utils/eventEmitter'
import { initFields } from './initFields'

class Model extends EventEmitter {
  get data() {
    return _.mapValues(this._fields, f => f.value)
  }

  set data(value) {
    this.setData(value)
  }

  get isValid() {
    return Object.keys(this._fields).every(
      name => this._fields[name].validated && this._fields[name].isValid
    )
  }

  get fields() {
    return this._fields
  }

  get errors() {
    if (
      !Object.keys(this._fields).every(name => this._fields[name].validated)
    ) {
      this.validate()
    }
    const errors = _.mapValues(
      _.pickBy(this._fields, field => !!field.error),
      field => field.error
    )
    return Object.keys(errors).length ? errors : null
  }

  constructor(model, defaultData) {
    super()
    this.initEvents(['change'])
    this._model = model(this)
    initFields.call(this, defaultData)
    if (!this._fields) throw new Error('Model is empty')
  }

  extractFromEvent(e) {
    const {
      target: { name },
    } = e
    if (!this._fields[name]) return
    this._fields[name].extractFromEvent(e)
  }

  setData(data) {
    if (!data || typeof data !== 'object') return
    let changed = false
    Object.keys(data).forEach(name => {
      const value = data[name]
      const field = this._fields[name]
      if (value === undefined || !field || field.value === value) return

      this._fields[name].setValue(value)
      changed = true
    })
    if (changed) this.trigger('change', this)
  }

  clearData() {
    let changed = false
    Object.keys(this._fields).forEach(name => {
      const field = this._fields[name]
      if (field.value !== undefined) {
        this._fields[name].clearValue()
        changed = true
      }
    })
    if (changed) this.trigger('change', this)
  }

  validate() {
    _.mapValues(this._fields, f => f.validate())
    this.trigger('change', this)
    return this.isValid
  }
}

export default Model
