// Libraries
import React, { Component } from 'react';

// Components
import Board from './Board';
import Dashboard from './Dashboard';

class App extends Component {
	state = {
		gameStarted: false
	};
	render() {
		return (
			<div className="App">
				<Board gameStarted={this.state.gameStarted} />
				<Dashboard onStartGame={() => this.setState({ gameStarted: true })} />
			</div>
		);
	}
}

export default App;
