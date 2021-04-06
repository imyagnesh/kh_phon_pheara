import { useCallback, useEffect, useReducer, useRef } from 'react';
import { todoReducer, initialState } from './TodoReducer';

const useTodo = () => {
  const [todoState, dispatchTodo] = useReducer(todoReducer, initialState);
  const todoInput = useRef();

  const fetchData = useCallback(async () => {
    try {
      dispatchTodo({
        type: 'LOAD_TODO_REQUEST',
      });
      const res = await fetch('http://localhost:3000/todoList');
      const list = await res.json();
      dispatchTodo({
        type: 'LOAD_TODO_SUCCESS',
        payload: list,
      });
    } catch (error) {
      dispatchTodo({
        type: 'LOAD_TODO_FAIL',
        payload: error,
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (event) => {
    try {
      dispatchTodo({
        type: 'CREATE_TODO_REQUEST',
      });
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
      dispatchTodo({
        type: 'CREATE_TODO_SUCCESS',
        payload: newTodo,
      });
    } catch (error) {
      dispatchTodo({
        type: 'CREATE_TODO_FAIL',
        payload: error,
      });
    }
  };

  const completeTodo = async (todo) => {
    try {
      dispatchTodo({
        type: 'UPDATE_TODO_REQUEST',
        payload: todo,
      });
      const res = await fetch(`http://localhost:3000/todoList/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ ...todo, isDone: !todo.isDone }),
      });
      const updatedTodo = await res.json();
      dispatchTodo({
        type: 'UPDATE_TODO_SUCCESS',
        payload: updatedTodo,
      });
    } catch (error) {
      dispatchTodo({
        type: 'UPDATE_TODO_FAIL',
        payload: error,
      });
    }
  };

  const deleteTodo = async (todo) => {
    try {
      dispatchTodo({
        type: 'DELETE_TODO_REQUEST',
        payload: todo,
      });
      await fetch(`http://localhost:3000/todoList/${todo.id}`, {
        method: 'DELETE',
      });
      dispatchTodo({
        type: 'DELETE_TODO_SUCCESS',
        payload: todo,
      });
    } catch (error) {
      dispatchTodo({
        type: 'DELETE_TODO_FAIL',
        payload: error,
      });
    }
  };

  const filterTodo = (filter) => {
    dispatchTodo({
      type: 'FILTER_TODO',
      payload: filter,
    });
  };

  return {
    fetchData,
    onSubmit,
    completeTodo,
    deleteTodo,
    filterTodo,
    todoState,
    todoInput
  };
};

export default useTodo;
