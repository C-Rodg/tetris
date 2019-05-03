import React from 'react';

const Dashboard = ({ onStartGame }) => {
	return (
		<div className="Dashboard">
			<div onClick={onStartGame}>Start Game or Quit Game</div>
			<div>Pause</div>
			<div>Score</div>
			<div>Level</div>
			<div>Lines</div>
		</div>
	);
};

export default Dashboard;
