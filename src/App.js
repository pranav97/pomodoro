import React, { Component } from 'react';
import './App.css';
import Timer from "react-compound-timer";



// class Task extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       time: 5400000, // 90,000 seconds in 25 min
//     }
//   }
//   render() {
//     return (
//       <div className="tasks">
//         <Timer
//           initialTime={this.state.time}
//           direction="backward"
//         >
//           {() => (
//             <React.Fragment>
//             <Timer.Minutes /> m
//             <Timer.Seconds /> s
//         </React.Fragment>
//           )}
//         </Timer>
      
//       </div>
//     )
//   }
// }

class Pomodoro extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    }
    this.handleData = this.handleData.bind(this);
  }

  handleData(data) {
    this.setState({
      tasks: this.state.tasks.concat([data])
    });
  }

  render() {
    return (
      <InputTaskName handlerFromParant={this.handleData}/>
    );
  }

}
class InputTaskName extends Component {
  constructor() {
    super()
    this.state = {
      value : "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // pass the input field value to the event handler passed
    // as a prop by the parent (App)
    this.props.handlerFromParant(this.state.value);

    this.setState({
      value : ''
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Task Name: 
          <input 
            type="text"
            name="taskname"
            value={this.state.value}
            onChange={this.handleChange} 
            ></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Pomodoro Application</h1>
          <Pomodoro/>
        </header>
      </div>
    );
  }
}

export default App;
