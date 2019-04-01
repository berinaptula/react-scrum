import React, { Component } from "react";
import "./CreateTask.css";
import CreatedTask from "../CreatedTask/CreatedTask";

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.submitTask = this.submitTask.bind(this);
    this.state = {
      tasks: [],
      showTask: false,
      memberValue: "",
      toDoValue: "",
      dodValue: "",
      timeValue: "",
      members: [
        {member:"Berin"},
        {member:"Cristian"},
        {member:"Raddy"},
        {member:"Ventsislav"},
      ],
      showCreate : false

    };
  }

  toggleCreateTask = () => {
    const currentStateCreate = this.state.showCreate;
    this.setState({
      showCreate: !currentStateCreate
    })
  }

  changeMember = event => {
    this.setState({
      memberValue: event.target.value
    });
  };
  changeToDo = event => {
    this.setState({
      toDoValue: event.target.value
    });
  };
  changeDod = event => {
    this.setState({
      dodValue: event.target.value
    });
  };
  changeTime = event => {
    this.setState({
      timeValue: event.target.value
    });
  };
  submitTask = event => {
    let tasks = this.state.tasks;
    let memberVal = this.state.memberValue;
    let toDoVal = this.state.toDoValue;
    let dodVal = this.state.dodValue;
    let timeVal = this.state.timeValue;
    tasks.push({
      member: memberVal,
      toDo: toDoVal,
      dod: dodVal,
      time: timeVal,
      category: "todo",
      styling:{backgroundColor:"rgb(62, 86, 221)"}
    });
    this.setState({
      member: '',
      toDo: '',
      dod: '',
      time: '',
      memberValue : '',
      toDoValue : '',
     dodValue : '',
      timeValue : ''
      
    });
    event.preventDefault();
  };
  onDragOver = (e) => {
    let event = e;
    event.stopPropagation();
    event.preventDefault();
  }
  onDragStart = (e,id) => {
    console.log("dragstart ",id);
    e.dataTransfer.setData("id",id);
  }
 
  onDrop = (e,cat) =>{
    let id = e.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter((task)=>{
      if((task.dod+task.member+task.toDo+task.time) === id) {
        task.category = cat;

        // SETTING BACKGROUND COLOR
        if(cat === "todo"){
          task.styling = {backgroundColor:"rgb(62, 86, 221)"}
        }
        if(cat === "busy"){
          task.styling = {backgroundColor:"rgb(146, 50, 50)"}
        }
        if(cat === "complete"){
          task.styling = {backgroundColor:"rgb(96, 157, 96)"}
        }
       
      }
      
      return task;
      
    });
      
    this.setState({
      ...this.state,
      tasks
    }) 

  }
  addMember = (e) => {
    let input = prompt("Enter the name");
    let members = this.state.members;
    members.push({member:input})
    e.preventDefault();
    this.setState({
      ...this.state,
      members
    }) 
  }

  removeTask =(index)=>{
     const tasks = this.state.tasks;
     tasks.splice(index,1);
     this.setState({tasks:tasks})
  }
  render() {
    let tasksInBoard = {
      todo : [],
      busy : [],
      complete:[],
      removed : []
    }
    this.state.tasks.forEach((t,index)=>{
      tasksInBoard[t.category].push(
                <CreatedTask
                  key = {index}
                  member={t.member}
                  todo={t.toDo}
                  dod={t.dod}
                  time={t.time}
                  draggable = "true"
                  onDragStart={(e)=> this.onDragStart(e,(t.dod+t.member+t.toDo+t.time))}
                  styling = {t.styling}
                  onClick = {()=> {this.removeTask(index)}}
                />  
            )
      }
    )
    let members = this.state.members.map((member,index)=>{
      return <option value={member.member} key={index}>{member.member}</option>
    })
 

    let createTask = null;
    let classes = 'addButton';
    if(this.state.showCreate === true){
      createTask = <form>
      <div className="CreateTask">
        <label for="member">Group Member</label>
          <select id="groupMember" onChange={this.changeMember} name="member" required>
              <option defaultValue="" selected disabled>Select group member</option>
              {members}
          </select>
          <button id="add" type="button" onClick={(e)=>this.addMember(e)}>
            +
          </button>
          <label for="toDo">To do</label>
              <input
                  type="text"
                  id="toDo"
                  name="toDo"
                  required
                  maxLength="30"
                  value={this.state.toDo}
                  onChange={this.changeToDo}
              />
          <label  for="dod">Definiton of done</label>
              <textarea
                  id="dod"
                  required
                  name="dod"
                  value={this.state.dod}
                  onChange={this.changeDod}
              />
          <label for="time">Time required ( hours )</label>
              <input
                  value={this.state.time}
                  onChange={this.changeTime}
                  type="number"
                  min="0"
                  id="time"
                  name="time"
                  required
              />
        <div>
          <button id="cancel" type="reset">Clear</button>
          <button id="submit" type="submit" onClick={this.submitTask}>
            Create
          </button>
        </div>
      </div>
      </form>
      classes = 'addButton red';
    }

    return (
      <div>
        <button  className={classes} onClick = {this.toggleCreateTask}>Add</button>
        {createTask}
        <div className="container">
          <div className="todos" 
            onDrop={(e)=>this.onDrop(e,"todo")}
            onDragOver={(e)=>this.onDragOver(e)}>
            <header> <h1>TO DO</h1></header>
            {tasksInBoard.todo}
          </div>
          <div className="busy" 
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>this.onDrop(e,"busy")}
          >
            <header> <h1>BUSY</h1></header>
            {tasksInBoard.busy}
          </div>
          <div className="done"
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>this.onDrop(e,"complete")} >
              <header> <h1>DONE</h1></header>
              {tasksInBoard.complete}
          </div>
          <div className="trashCan"
          onDrop={(e)=>this.onDrop(e,"removed")}
          onDragOver={(e)=>this.onDragOver(e)}>
         </div>
        </div> {/* container */} 
        
      </div>
    );
  }
}
export default CreateTask;
