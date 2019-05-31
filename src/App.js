import React, {Component} from 'react'
import './App.css'
import {Board} from 'react-trello'
import Clock from 'react-live-clock'
//import { Button } from 'reactstrap';
import {storiesOf} from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';


const data = require('./data.json')
//test commit
//sumi test commit
const handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
}

class App extends Component {
    state = {boardData: {lanes: []}}

    setEventBus = eventBus => {
        this.setState({eventBus})
    }

    async componentWillMount() {
        const response = await this.getBoard()
        this.setState({boardData: response})
    }

    getBoard() {
        return new Promise(resolve => {
            resolve(data)
        })
    }

    completeCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'COMPLETED',
            card: {id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app'}
        })
        this.state.eventBus.publish({type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk'})
    }

    addCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'BLOCKED',
            card: {id: 'Ec2Error', title: 'EC2 Instance Down', label: '30 mins', description: 'Main EC2 instance down'}
        })
    }

    shouldReceiveNewData = nextData => {
        console.log('New card has been added')
        console.log(nextData)
    }

	handleCardAdd = (card, laneId) => {
		console.log(`New card added to lane ${laneId}`)
		console.dir(card)
	}

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h3>스마트 PLM팀
                    storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
                    storiesOf('Button', module)
                    .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
                    .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
                    </h3>
                </div>
                <div className="App-intro">

                    <h4>
                     <Clock format={'YYYY년 MM월 DD일 HH:mm:ss 입니다.'}
                     ticking={true}
                
                     />
                     
                    </h4>
                    <div className="sc-bZQynM iTzKeC">
                    <Board
                        editable
					    onCardAdd={this.handleCardAdd}
                        data={this.state.boardData}
                        draggable
                        onDataChange={this.shouldReceiveNewData}
                        eventBusHandle={this.setEventBus}
                        handleDragStart={handleDragStart}
                        handleDragEnd={handleDragEnd}
                    /> </div>
                </div>
            </div>
        )
    }
}

export default App
