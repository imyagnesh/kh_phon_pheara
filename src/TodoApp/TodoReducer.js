export const initialState = {
  isFetching: false,
  fetchingError: false,
  isCreating: false,
  creatingError: false,
  isUpdating: false,
  updatingError: false,
  isDeleting: false,
  deletingError: false,
  todoList: [],
  filteredList: [],
  filterType: 'all',
};

const filterList = ({ list, filterType }) =>
  list.filter((todo) => {
    if (filterType === 'pending') {
      return !todo.isDone;
    }
    if (filterType === 'completed') {
      return !!todo.isDone;
    }
    return true;
  });

export const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOAD_TODO_REQUEST':
      return { ...state, isFetching: true };
    case 'LOAD_TODO_SUCCESS':
      return {
        ...state,
        isFetching: false,
        todoList: payload,
        filteredList: payload,
      };
    case 'LOAD_TODO_FAIL':
      return { ...state, isFetching: false, fetchingError: payload };
    case 'CREATE_TODO_REQUEST':
      return { ...state, isCreating: true };
    case 'CREATE_TODO_SUCCESS':
      return {
        ...state,
        isCreating: false,
        todoList: [...state.todoList, payload],
        filteredList: filterList({ list: [...state.todoList, payload], filterType: 'all' }),
        filterType: 'all',
      };
    case 'CREATE_TODO_FAIL':
      return { ...state, isCreating: false, creatingError: payload };
    case 'UPDATE_TODO_REQUEST':
      return { ...state, isUpdating: payload ? [...(state.isUpdating || []), payload] : true };
    case 'UPDATE_TODO_SUCCESS': {
      const index = state.todoList.findIndex((x) => x.id === payload.id);
      const updatedTodoList = [
        ...state.todoList.slice(0, index),
        payload,
        ...state.todoList.slice(index + 1),
      ];
      return {
        ...state,
        isUpdating: Array.isArray(state.isUpdating)
          ? state.isUpdating.filter((x) => x.id !== payload.id)
          : false,
        todoList: updatedTodoList,
        filteredList: filterList({ list: updatedTodoList, filterType: state.filterType }),
      };
    }
    case 'UPDATE_TODO_FAIL':
      return {
        ...state,
        isUpdating: Array.isArray(state.isUpdating)
          ? state.isUpdating.filter((x) => x.id !== payload.id)
          : false,
        updatingError: payload,
      };
    case 'DELETE_TODO_REQUEST':
      return { ...state, isDeleting: payload ? [...(state.isDeleting || []), payload] : true };
    case 'DELETE_TODO_SUCCESS': {
      const index = state.todoList.findIndex((x) => x.id === payload.id);
      const updatedTodoList = [
        ...state.todoList.slice(0, index),
        ...state.todoList.slice(index + 1),
      ];
      return {
        ...state,
        isDeleting: Array.isArray(state.isDeleting)
          ? state.isDeleting.filter((x) => x.id !== payload.id)
          : false,
        todoList: updatedTodoList,
        filteredList: filterList({ list: updatedTodoList, filterType: state.filterType }),
      };
    }
    case 'DELETE_TODO_FAIL':
      return {
        ...state,
        isDeleting: Array.isArray(state.isDeleting)
          ? state.isDeleting.filter((x) => x.id !== payload.id)
          : false,
        deletingError: payload,
      };
    case 'FILTER_TODO': {
      return {
        ...state,
        filterType: payload,
        filteredList: filterList({ list: state.todoList, filterType: payload }),
      };
    }

    default:
      return state;
  }
};
