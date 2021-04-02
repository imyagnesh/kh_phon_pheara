import React, { useState, useRef, useEffect } from 'react';
import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import './style.css';

const TodoApp = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [hasError, setHasError] = useState(false);
  const todoInput = useRef();

  const fetchData = async () => {
    try {
      setIsFetching(true);
      const res = await fetch('http://localhost:3000/todoList');
      const list = await res.json();
      setTodoList(list);
    } catch (error) {
      setHasError(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (event) => {
    try {
      setIsCreating(true);
      event.preventDefault();
      const {
        current: { value },
      } = todoInput;
      todoInput.current.value = '';
      const res = await fetch('http://localhost:3000/todoList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          text: value,
          isDone: false,
        }),
      });
      const newTodo = await res.json();
      setTodoList([...todoList, newTodo]);
      setFilterType('all');
    } catch (error) {
      setHasError(error);
    } finally {
      setIsCreating(false);
    }
  };

  const completeTodo = async (todo) => {
    try {
      setIsUpdating(todo);
      const res = await fetch(`http://localhost:3000/todoList/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ ...todo, isDone: !todo.isDone }),
      });

      const updatedTodo = await res.json();

      const index = todoList.findIndex((x) => x.id === todo.id);

      const updatedTodoList = [
        ...todoList.slice(0, index),
        updatedTodo,
        ...todoList.slice(index + 1),
      ];
      setTodoList(updatedTodoList);
    } catch (error) {
      setHasError(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteTodo = async (todo) => {
    try {
      setIsDeleting(Array.isArray(isDeleting) ? [...isDeleting, todo] : [todo]);
      await fetch(`http://localhost:3000/todoList/${todo.id}`, {
        method: 'DELETE',
      });
      const index = todoList.findIndex((x) => x.id === todo.id);
      const updatedTodoList = [...todoList.slice(0, index), ...todoList.slice(index + 1)];
      setTodoList(updatedTodoList);
    } catch (error) {
      setHasError(error);
    } finally {
      setIsDeleting(isDeleting.filter((x) => x.id !== todo.id));
    }
  };

  const filterTodo = (filter) => {
    setFilterType(filter);
  };

  if (hasError) {
    return <h1>Something went wrong.... Please try again</h1>;
  }

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
          todoList={todoList}
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
