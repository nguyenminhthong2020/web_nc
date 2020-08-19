import React from 'react';
import logo from './logo.svg';
import './App.css';

function App1() {
  return (
    <div>
          <b>Please Login</b>
      </div>
  );
}
function App2() {
  return (
    <div>
          <b>Please Sign in</b>
      </div>
  );
}
function Dashboard() {
  return (
    <div style={{textAlign: 'center'}}>
      <b>-------------</b>
      <div></div>
      <b>Dashboard</b>
      <div></div>
      <b>----------------------</b>
    </div>    
  );
}

export default {App1,App2,Dashboard};
