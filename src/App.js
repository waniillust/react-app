import logo from './logo.svg';
import './App.css';
import { Card, Space } from 'antd';
import React from 'react';
import MyTable from './MyTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Space direction="vertical" size={20}>
        <Card title="Test Table" extra={<a href="#">More</a>}  style={{ width: 800 }}>
        <MyTable/>
        </Card>
      </Space>

        {/* <MyTable/> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
    </div>
  );
}

export default App;
