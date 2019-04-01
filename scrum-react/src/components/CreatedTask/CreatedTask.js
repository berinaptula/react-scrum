import React from 'react';
import './CreatedTask.css';


const CreatedTask = (props) => {
    return (
        <div className="CreatedTask" draggable="true" onDragStart={props.onDragStart} style={props.styling} >
            
            <h1>{props.member}<button onClick={props.onClick} className="x">X</button></h1>
            <h2>TO DO</h2>
            <p >{props.todo}</p>
            <h2>Definiton of done</h2>
            <p className="width">{props.dod}</p>
            <h2>Time required <span>{props.time}</span> hrs.</h2>
        </div>
    );
}
export default CreatedTask;
