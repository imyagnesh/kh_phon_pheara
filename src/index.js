import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import TodoApp from './TodoApp';
// import Chart from './Chart';
import ShoppingCart from './ShoppingCart';
import './rootStyle.css';

// const App = () => {
//   const [name, setName] = useState('yagnesh');
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((newVal) => newVal + 1);
//     }, 1000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   useEffect(() => {
//     console.log('useEffect call on change Name');
//   }, [name]);

//   useEffect(() => {
//     console.log('useEffect call on change Index');
//   }, [index]);

//   useEffect(() => {
//     console.log('useEffect call on change Index or name');
//   }, [name, index]);

//   const changeIndex = () => {
//     setIndex(index + 1);
//   };

//   const changeName = () => {
//     setName('Rohit');
//   };

//   return (
//     <>
//       <h1>{name}</h1>
//       <button onClick={changeName}>Change Name</button>

//       <h1>{index}</h1>
//       <button onClick={changeIndex}>change Index</button>
//     </>
//   );
// };

ReactDOM.render(<ShoppingCart />, document.getElementById('root'));
