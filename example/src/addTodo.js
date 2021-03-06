/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react'
import { subscribe } from '@datnq/unidata'
import { useModel } from '@datnq/usemodel'
import todoModel from './model/todos'

const AddTodo = ({ dataSetter }) => {
  const inputRef = useRef(null)
  const todo = useModel(todoModel)
  const { content, completed } = todo

  const change = e => {
    todo.extractFromEvent(e)
  }

  const addtodo = e => {
    e.preventDefault()
    if (!todo.isValid) return
    dataSetter.add('todos', todo.data)
    todo.clearData()
  }

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        onChange={change}
        name={content.name}
        value={content.value}
      />
      <label>
        <input
          type="checkbox"
          name={completed.name}
          checked={completed.value === 'completed'}
          value="completed"
          onChange={change}
        />{' '}
        Completed
      </label>
      <button type="button" onClick={addtodo}>
        Add todo
      </button>
      <br />
      {content.isValid ? null : <p>{content.error.message}</p>}
    </div>
  )
}
export default subscribe({
  todos: [],
})(AddTodo)
