# Usemodel

[![NPM](https://img.shields.io/npm/v/@datnq/usemodel.svg)](https://www.npmjs.com/package/@datnq/usemodel)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e8cdc12c08644c36a8c672bdd45e049e)](https://www.codacy.com/manual/datnq/usemodel?utm_source=github.com&utm_medium=referral&utm_content=datnq/usemodel&utm_campaign=Badge_Grade)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/dw/@datnq/usemodel)](https://www.npmjs.com/package/@datnq/usemodel)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@datnq/usemodel)

Simplify usage of managing datasource and form's model

## Install

### Dependencies

Engine

```json
{
  "node": ">=8",
  "npm": ">=5"
},
```

Package

```json
{
  "lodash": "^4.17.15",
  "react": "^16.11.0",
  "react-dom": "^16.11.0",
  "sprintf-js": "^1.1.2"
}
```

### Run install

```bash
# NPM
npm install --save @datnq/usemodel

#Yarn
yarn add @datnq/usemodel
```

## Model's pubic interface

```js
class Model {
  // Properties
  data { get; set; } // get/set value of all field in JSON object
  isValid { get; } // get valid state of model, true if all field is tested and valid
  fields { get; } // get all fields
  errors { get; } // get all field's error

  // included all fields as properties

  // Methods
  extractFromEvent(SyntheticEvent: e); // Utility method to set value from input's change event
  setData(data); // set fields' values from JSON object
  clearData(); // set all fields' values to undefined, also clear validation status
  validate(); // Validate all fields
}
```

## Custom model

```js
import { Model } from 'react-hooks-usemodel'

class CustomModel extends Model {
  // ...
}
```

## Field's pubic interface

```js
class Field {
  // Properties
  value { get; set; } // get/set field's value
  isValid { get; } // return valid status
  error { get; } // return field's validationError (undefined if not)
  validated { get; } // checked whether field's validated or not, init with false

  // Also inherit all the property which defined in model's instance

  // Methods
  validate(value); // Run through all validators and return true (if all valid) or validationError. If value is empty then validate current field's value
  clearValue(); // clear field's value and validation
  extractFromEvent(e); // Utility method to set value from input's change event
  setValue(value, conflictCheck = []); // set field's value
}
```

## Custom field's type

```js
// checkboxField.js
import { Field } from 'react-hooks-usemodel'

class CheckboxField extends Field {
  extractFromEvent(e) {
    const {
      target: { value, checked },
    } = e
    this.setValue(checked ? value : null)
  }
}

// Usage, in model
// models/todos.js
export default () => {
  return {
    //...
    completed: {
      label: 'Completed',
      type: CheckboxField, // if we don't set type, model will use base Field class
      validators: [
        // list of validators
      ],
    },
    //...
  }
}
```

## Define a model instance

```js
// models/todos.js
import { required, minlen } from 'react-hooks-usemodel/dist/utils/validators'

export default () => {
  return {
    content: {
      label: 'Todo Content',
      validators: [
        { test: required(), errorMessage: '%(label)s is required' },
        {
          test: minlen(6),
          errorMessage: '%(label)s must be longer than 6 characters',
        },
      ],
    },
    completed: {
      // field with no validators will always be valid
      label: 'Completed',
      type: CheckboxField, // field with custom Field's type
    },
  }
}
```

## Use model in component

```js
// import
import { useModel } from 'react-hooks-usemodel'

// in component
const todo = useModel(todoModel, defaultValue) // default value can be empty

// get Field from Model
const { content, completed } = todo

// Update data of a model, this will update multiple fields
todo.setData({ content: 'Todos content', completed: true })

// Update value of a field
completed.setValue(true)

// After update, state of component will be changed, component will be automatically re-render without manual setState
```

## Validation

### Builtin validators

```js
// import
import {
  required,
  email,
  minlen,
  maxlen,
  equal,
  gt,
  lt,
  gte,
  lte,
  notEqual,
} from '@datnq/usemodel/lib/utils/validators'

// usage
{
  test: required()
} // check if field is required
{
  test: email()
} // check if field's value is email
{
  test: minlen(6)
} // check if field's value is not longer than 6 characters
{
  test: equal(10)
} // check if field's value is equal to 10
```

### Custom validators

```js
// customValidators.js

// validator will always return valid case = true
const strongPassword = () => value => /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g.test(v)

// validator also use it's model as second argument
const retypePasswordMatch = () => (value, model) => {
  return value === model.password.value
}

// usage in model's field
{
  password: {
    // ...
    label: 'Password',
    validators: [
      {
        test: strongPassword(),
        // I'm using `sprintf-js` as error message generator, with parameters is field's properties
        // Error message is: sprintf(errorMessage, { ...field })
        // @see https://www.npmjs.com/package/sprintf-js for usage
        errorMessage: 'Your %(label)s is not strong enough'
      }
    ]
  },
  retypePassword: {
    label: 'Retype password',
    validators: [
      { test: retypePasswordMatch(), errorMessage: '%(label)s must match the Password' }
    ]
  }
}
```

### Custom `ValidationError`

```js
class ValidationError extends Error {
  // extra properties
  field, // instance of Field
  validator, // validator test function
}
```

## Clone from source

```
git clone https://github.com/datnq/usemodel
```

## License

MIT © 2019 by [Joey Nguyen](https://github.com/datnq)
