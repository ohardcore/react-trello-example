import React from 'react';
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
    let hour 
    let minutes 
    let statement
    let worktime
    if(this.state.date.getHours()<9 && this.state.date.getHours()>17)
    {
      statement = "퇴근하세요."
    }
    else{
      statement = "근무시간입니다."
    }
    if(statement==="근무시간입니다.")
    if(this.state.date.getMinutes()>0)
    {
        hour=17-this.state.date.getHours()
        minutes=60-this.state.date.getMinutes()
        worktime=hour+"시간"+minutes+"분 남았습니다."
    }
    else{
        hour=18-this.state.date.getHours()
        minutes=0
        worktime=hour+"시간"+minutes+"분 남았습니다."
    }

     return (
          <div>
              <h4>현재시간은 {this.state.date.toLocaleTimeString()}입니다.</h4>
              <h5>{statement}</h5>
              <h6>{worktime}</h6>
              
          </div>
      )
  }
}
export default Clock

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)

