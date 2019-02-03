import React, { Component } from 'react';
import './App.css';
import Timer from "react-compound-timer";

import ReactDOM from 'react-dom'


class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskname: this.props.value,
      time: 900000, // 90,000 seconds in 25 min
    }

  }
  render() {
    return (
      <div className="tasks" value={this.state.taskname}>
        <p>Taskname: {this.state.taskname}</p>
        <Timer
          initialTime={this.state.time}
          startImmediately={false}
          onStart={() => console.log('onStart hook')}
          onResume={() => console.log('onResume hook')}
          onPause={() => console.log('onPause hook')}
          onStop={() => console.log('onStop hook')}
          onReset={() => console.log('onReset hook')}
        >
          {({ start, resume, pause, stop, reset, timerState }) => (
            <React.Fragment>
              <div>
                {/* <Timer.Days /> days */}
                <Timer.Hours /> hours
                <Timer.Minutes /> minutes
                <Timer.Seconds /> seconds
                <Timer.Milliseconds /> milliseconds
            </div>
              <div>{timerState}</div>
              <br />
              <div>
                <button onClick={start}>Start</button>
                <button onClick={pause}>Pause</button>
                <button onClick={resume}>Resume</button>
                <button onClick={stop}>Stop</button>
                <button onClick={reset}>Reset</button>
              </div>
            </React.Fragment>
          )}
        </Timer>
      
      </div>
    )
  }
}

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
      <div className="pomodro-timer">
        <InputTaskName handlerFromParant={this.handleData} />
        {
          this.state.tasks.map(function(text, i) {
            return (<Task value={text} key={i}></Task>)
          })
        }
      </div>
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
