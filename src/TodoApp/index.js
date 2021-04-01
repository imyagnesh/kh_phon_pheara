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
    todoList: [],
    filterType: 'all',
    hasError: false,
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { todoList } = this.state;
    const {
      current: { value },
    } = this.todoInput;
    this.setState(
      {
        todoList: [...todoList, { id: new Date().valueOf(), text: value, isDone: false }],
        filterType: 'all',
      },
      () => {
        this.todoInput.current.value = '';
      },
    );
  };

  completeTodo = (todo) => {
    const { todoList } = this.state;
    const index = todoList.findIndex((x) => x.id === todo.id);
    const updatedTodoList = [
      ...todoList.slice(0, index),
      { ...todoList[index], isDone: !todoList[index].isDone },
      ...todoList.slice(index + 1),
    ];
    // const updatedTodoList = todoList.map((item) => {
    //   if (item.id === todo.id) {
    //     return { ...item, isDone: !item.isDone };
    //   }
    //   return item;
    // });
    this.setState({ todoList: updatedTodoList });
  };

  deleteTodo = (todo) => {
    const { todoList } = this.state;
    const index = todoList.findIndex((x) => x.id === todo.id);
    const updatedTodoList = [...todoList.slice(0, index), ...todoList.slice(index + 1)];
    this.setState({ todoList: updatedTodoList });
  };

  filterTodo = (filterType) => {
    this.setState({ filterType });
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: error,
    };
  }

  render() {
    console.log('Todo App');
    const { todoList, filterType, hasError } = this.state;
    if (hasError) {
      return <h1>Something went wrong... Please try after sometime</h1>;
    }
    return (
      <div className="container">
        <TodoHeader />
        <TodoForm onSubmit={this.onSubmit} todoInput={this.todoInput} />
        <TodoList
          todoList={todoList}
          filterType={filterType}
          completeTodo={this.completeTodo}
          deleteTodo={this.deleteTodo}
        />
        <TodoFilter filterTodo={this.filterTodo} />
      </div>
    );
  }
}
