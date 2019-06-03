import React from 'react';
import './App.css';
import ReactDOM from'react-dom'

class Clock extends React.Component {
  constructor(props) {
      super(props)
      this.state = {date: new Date()}
  }

  componentDidMount() {
      this.timerID = setInterval(
          () => this.tick(),
          1000
      )
  }
  
  componentWillUnmount() {
      clearInterval(this.timerID)
  }

  tick() {
      this.setState({
          date: new Date()
      })
  }
  render() {
    let hour = this.state.date.getHours()
    let statement
    if(hour<9 && hour>17)
    {
      statement = "퇴근하세요."
    }
    else{
      statement = "근무시간입니다."
    }
      return (
          <div>
              <h4>현재시간은 {this.state.date.toLocaleTimeString()}입니다.</h4>
              <h5>{statement}</h5>
          </div>
      )
  }
}
export default Clock

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)

