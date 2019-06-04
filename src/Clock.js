import React from 'react';
import ReactDOM from'react-dom'

const timeToString=(hour, minute)=>{
    let statement
    if(hour<9 ||hour>17)
    {
      statement = "퇴근하세요."
    }
    else{
      statement = "근무시간입니다."
        if(minute>0)
        {
            statement=statement+(17-hour)+"시간 " +(60-minute)+"분 남았습니다."
        }
        else{
            statement=statement+(18-hour)+"시간 남았습니다."
        }
    }
    
    return(
        <div>
            {statement}
        </div>
    )

}

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
    
     return (
          <div>
              <h4>현재시간은 {this.state.date.toLocaleTimeString()}입니다.</h4>
              <h5>{timeToString(this.state.date.getHours(),this.state.date.getMinutes())}</h5>
              
          </div>
      )
  }
}
export default Clock

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)

