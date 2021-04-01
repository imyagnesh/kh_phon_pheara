import React from 'react';

const index = ({ todoList, filterType, completeTodo, deleteTodo }) => {
  console.log('todoList');
  return (
    <div className="todoListContainer">
      {todoList
        .filter((todo) => {
          if (filterType === 'pending') {
            return !todo.isDone;
          }
          if (filterType === 'completed') {
            return !!todo.isDone;
          }
          return true;
        })
        .map((todo) => (
          <div key={todo.id} className="todoList">
            <input type="checkbox" checked={todo.isDone} onChange={() => completeTodo(todo)} />
            <span style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button type="button" onClick={() => deleteTodo(todo)}>
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default index;
