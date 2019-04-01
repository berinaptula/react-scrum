import React, { Component } from 'react';
import './App.css';

import CreateTask from './components/createTask/CreateTask';

class App extends Component {
  state = {
   showCreate : false
  }
  
  render() {
    return (
      <div className="App">
        <CreateTask />
      </div>
    );
  }
}

export default App;
