import React, { PureComponent, createRef } from 'react';
import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import './style.css';

export default class TodoApp extends PureComponent {
  static propTypes = {};

  todoInput = createRef();

  state = {
    isFetching: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    todoList: [],
    filterType: 'all',
    hasError: false,
  };

  async componentDidMount() {
    try {
      this.setState({ isFetching: true });
      const res = await fetch('http://localhost:3000/todoList');
      const todoList = await res.json();
      this.setState({ todoList });
    } catch (error) {
      this.setState({ hasError: error });
    } finally {
      this.setState({ isFetching: false });
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: error,
    };
  }

  onSubmit = async (event) => {
    try {
      this.setState({ isCreating: true });
      event.preventDefault();
      const { todoList } = this.state;
      const {
        current: { value },
      } = this.todoInput;
      this.todoInput.current.value = '';
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

      this.setState({
        todoList: [...todoList, newTodo],
        filterType: 'all',
      });
    } catch (error) {
      this.setState({ hasError: error });
    } finally {
      this.setState({ isCreating: false });
    }
  };

  completeTodo = async (todo) => {
    try {
      this.setState({ isUpdating: todo });
      const res = await fetch(`http://localhost:3000/todoList/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ ...todo, isDone: !todo.isDone }),
      });

      const updatedTodo = await res.json();

      const { todoList } = this.state;
      const index = todoList.findIndex((x) => x.id === todo.id);

      const updatedTodoList = [
        ...todoList.slice(0, index),
        updatedTodo,
        ...todoList.slice(index + 1),
      ];
      // const updatedTodoList = todoList.map((item) => {
      //   if (item.id === todo.id) {
      //     return { ...item, isDone: !item.isDone };
      //   }
      //   return item;
      // });
      this.setState({ todoList: updatedTodoList });
    } catch (error) {
      this.setState({ hasError: error });
    } finally {
      this.setState({ isUpdating: false });
    }
  };

  deleteTodo = async (todo) => {
    const { isDeleting } = this.state;
    try {
      this.setState({ isDeleting: Array.isArray(isDeleting) ? [...isDeleting, todo] : [todo] });
      await fetch(`http://localhost:3000/todoList/${todo.id}`, {
        method: 'DELETE',
      });
      const { todoList } = this.state;
      const index = todoList.findIndex((x) => x.id === todo.id);
      const updatedTodoList = [...todoList.slice(0, index), ...todoList.slice(index + 1)];
      this.setState({ todoList: updatedTodoList });
    } catch (error) {
      this.setState({ hasError: error });
    } finally {
      this.setState({ isDeleting: isDeleting.filter((x) => x.id !== todo.id) });
    }
  };

  filterTodo = (filterType) => {
    this.setState({ filterType });
  };

  render() {
    console.log('Todo App');
    const {
      todoList,
      filterType,
      hasError,
      isFetching,
      isCreating,
      isUpdating,
      isDeleting,
    } = this.state;
    if (hasError) {
      return <h1>Something went wrong... Please try after sometime</h1>;
    }
    return (
      <div className="container">
        <TodoHeader />
        <TodoForm onSubmit={this.onSubmit} todoInput={this.todoInput} disabled={isCreating} />
        {isFetching ? (
          <div className="todoListContainer">
            <h1>Loading...</h1>
          </div>
        ) : (
          <TodoList
            todoList={todoList}
            filterType={filterType}
            completeTodo={this.completeTodo}
            deleteTodo={this.deleteTodo}
            isDeleting={isDeleting}
            isUpdating={isUpdating}
          />
        )}
        <TodoFilter filterTodo={this.filterTodo} />
      </div>
    );
  }
}
