import React from 'react';

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

export default class Home extends React.Component {
    render() {
        return (
            <div>Admin Home</div>
        )
    }
}