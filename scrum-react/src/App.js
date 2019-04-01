import React, { Component } from 'react';
import './App.css';

import CreateTask from './components/createTask/CreateTask';

class App extends Component {
  state = {
   showCreate : false
  }
  // toggleCreateTask = () => {
  //   const currentStateCreate = this.state.showCreate;
  //   this.setState({
  //     showCreate: !currentStateCreate
  //   })
  // }
  
  render() {
    // let createTask = null;
    // let classes = 'addButton';
    // if(this.state.showCreate === true){
    //   createTask = <CreateTask />
    //   classes = 'addButton red';
    // }
    
      
    
    

    return (
      <div className="App">
        {/* <button  className={classes} onClick = {this.toggleCreateTask}>Add</button>
        {createTask} */}
        <CreateTask />
      </div>
    );
  }
}

export default App;
