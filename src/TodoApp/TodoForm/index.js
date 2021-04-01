import React from 'react';
import PropTypes from 'prop-types';

const index = ({ onSubmit, todoInput }) => {
  console.log('Todo Form');
  return (
    <form onSubmit={onSubmit}>
      <input type="text" ref={todoInput} />
      <input type="submit" value="Add Todo" />
    </form>
  );
};

index.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default index;
