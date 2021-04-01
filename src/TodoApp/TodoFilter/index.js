import React, { memo } from 'react';

const index = ({ filterTodo }) => {
  console.log('Todo Filter');
  return (
    <div className="filterTodo">
      <button type="button" onClick={() => filterTodo('all')}>
        All
      </button>
      <button type="button" onClick={() => filterTodo('pending')}>
        Pending
      </button>
      <button type="button" onClick={() => filterTodo('completed')}>
        Completed
      </button>
    </div>
  );
};

index.propTypes = {};

export default memo(index);
