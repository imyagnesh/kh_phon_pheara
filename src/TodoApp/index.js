import React, { useRef } from 'react';
import useTodo from './useTodo';
import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';

import './style.css';
// hello yagnesh

const TodoApp = () => {
  // const [state, setstate] = useState(`hello ${name}`);

  const {
    onSubmit,
    completeTodo,
    deleteTodo,
    filterTodo,
    todoInput,
    todoState: { isCreating, isFetching, filteredList, filterType, isDeleting, isUpdating },
  } = useTodo();

  // if (hasError) {
  //   return <h1>Something went wrong.... Please try again</h1>;
  // }

  return (
    <div className="container">
      <TodoHeader />
      <TodoForm onSubmit={onSubmit} todoInput={todoInput} disabled={isCreating} />
      {isFetching ? (
        <div className="todoListContainer">
          <h1>Loading...</h1>
        </div>
      ) : (
        <TodoList
          todoList={filteredList}
          filterType={filterType}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
          isDeleting={isDeleting}
          isUpdating={isUpdating}
        />
      )}
      <TodoFilter filterTodo={filterTodo} />
    </div>
  );
};

export default TodoApp;
