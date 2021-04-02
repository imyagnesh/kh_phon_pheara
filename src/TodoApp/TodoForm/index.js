import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

const TodoForm = ({ onSubmit, todoInput, disabled }) => {
  const [hasText, setHasText] = useState(false);
  const [error, setError] = useState(false);

  const onChnageText = (event) => {
    setHasText(event.target.value.length > 0);
    if (event.target.value.length > 100) {
      setError('Text should not more then 100 char');
    } else {
      setError('');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="input-container">
        <input type="text" ref={todoInput} onChange={onChnageText} />
        {error && <span className="error">{error}</span>}
      </div>
      <input type="submit" value="Add Todo" disabled={!hasText || disabled} />
    </form>
  );
};

// class TodoForm extends PureComponent {
//   state = {
//     hasText: false,
//   };

//   onChnageText = (event) => {
//     this.setState({
//       hasText: event.target.value.length > 0,
//     });
//   };

//   render() {
//     const { onSubmit, todoInput } = this.props;
//     const { hasText } = this.state;
//     return (
//       <form onSubmit={onSubmit}>
//         <input type="text" ref={todoInput} onChange={this.onChnageText} />
//         <input type="submit" value="Add Todo" disabled={!hasText} />
//       </form>
//     );
//   }
// }

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TodoForm;
