import React from 'react';

const GridItem = ({ filled }) => {
	const classList = ['GridItem'];
	filled && classList.push('filled');
	return <div className={classList.join(' ')} />;
};

export default GridItem;
