// Libraries
import React, { Component } from 'react';

// Components
import Board from './Board';
import Dashboard from './Dashboard';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Board />
				<Dashboard />
			</div>
		);
	}
}

export default App;
