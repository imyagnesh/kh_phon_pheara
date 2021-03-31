import React from 'react';
import PropTypes from 'prop-types';

// component
// text descriptions are the props
// function component

// follwing scenario we can use class component
// 1. for the static UI
const App = ({ text, desc }) => (
  <>
    <h1>{text}</h1>
    <h4>{desc}</h4>
  </>
);

// https://reactjs.org/docs/typechecking-with-proptypes.html
App.propTypes = {
  text: PropTypes.number.isRequired,
  desc: PropTypes.string,
};

App.defaultProps = {
  desc: 'NO DESC',
};

export default App;
