import React, { createRef } from 'react';
import PropTypes from 'prop-types';

// follwing scenario we can use class component
// 1. Data manipulation -> using hooks you can manipulate data in function conmponet as well
// 2. to use life cycle methods -> we can use lifecycle method in FC
// 3. if you want to use state data -> we can use state data in FC

// life cycle methods
// 1. Mounting
//    -> constructor
//    -> getDerivedStateFromProps
//    -> render
//    -> componentDidMount
// 2. Updating
//    -> getDerivedStateFromProps
//    -> shouldComponentUpdate
//    -> render
//    -> getSnapshotBeforeUpdate
//    -> componentDidUpdate
// 3. unmounting
//   -> componentWillUnmount
// 4. error
//    -> getDerivedStateFromError
//    -> componentDidCatch

// component will update only in 2 scenarios
// 1. when your state value change
// 2. when your prop value change

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greet: 'yagnesh',
      msg: 'How are you?',
    };
    this.title = createRef();
    console.log('constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    console.log(props);
    console.log(state);
    return {
      ...state,
      greet: `${props.text}, ${state.greet}`,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true;
  }

  componentDidMount() {
    const title = this.title.current;
    title.style = 'color:red;';
    document.addEventListener('mousemove', () => {
      console.log('mousemove');
    });

    this.interval = setInterval(() => {
      console.log('timer started');
    }, 1000);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return 'hello';
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(snapshot);
    console.log('componentDidUpdate');
  }

  static getDerivedStateFromError() {}

  componentWillUnmount() {
    document.removeEventListener('mousemove');
    clearInterval(this.interval);
  }

  changeGreetMessage = () => {
    this.setState({ greet: 'ola' });
  };

  render() {
    console.log('render');
    const { text, desc } = this.props;
    const { greet, msg } = this.state;
    return (
      <>
        <h1 ref={this.title}>{text}</h1>
        <h1>{desc}</h1>
        <p>{greet}</p>
        <p>{msg}</p>
        <button onClick={this.changeGreetMessage} type="button">
          Change Greet Message
        </button>
      </>
    );
  }
}

App.propTypes = {
  text: PropTypes.string.isRequired,
  desc: PropTypes.string,
};

App.defaultProps = {
  desc: '',
};

export default App;
