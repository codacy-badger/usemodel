import _ from 'lodash'
import Field from './field'

function createField(model, modelField) {
  if (!modelField.name) throw new Error('Models name is required')
  const { type } = modelField
  const XField =
    type && type.prototype && type.prototype instanceof Field ? type : Field
  return new XField(model, modelField)
}

function defineFieldsAsProperties() {
  Object.defineProperties(
    this,
    _.mapValues(this._fields, field => {
      return {
        enumerable: true,
        configurable: true,
        get() {
          return field
        },
      }
    })
  )
}

export function initFields(defaultData) {
  this._fields = _.mapValues(this._model, (modelField, name) => {
    const value = _.get(defaultData, name, undefined)
    const field = createField(this, { ...modelField, name })

    field.on('change', f => {
      this.trigger('change', this, f)
    })

    if (value === undefined) return field

    field.initValue(value)
    return field
  })
  defineFieldsAsProperties.call(this)
}
