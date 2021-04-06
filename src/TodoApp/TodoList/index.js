import React from 'react';

const index = ({ todoList, completeTodo, deleteTodo, isDeleting, isUpdating }) => (
  <div className="todoListContainer">
    {todoList.map((todo) => (
      <div key={todo.id} className="todoList">
        <input
          type="checkbox"
          checked={todo.isDone}
          disabled={isUpdating && isUpdating.some((x) => x.id === todo.id)}
          onChange={() => completeTodo(todo)}
        />
        <span style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>{todo.text}</span>
        <button
          type="button"
          onClick={() => deleteTodo(todo)}
          disabled={isDeleting && isDeleting.some((x) => x.id === todo.id)}>
          {isDeleting && isDeleting.some((x) => x.id === todo.id) ? 'Deleting' : 'Delete'}
        </button>
      </div>
    ))}
  </div>
);

export default index;
