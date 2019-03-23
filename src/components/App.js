import React from 'react';
import Input from './Input';
import Count from './Count';
import TodoLis from './TodoLis';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Input />
				<Count />
				<hr />
				<TodoLis />
			</div>
		);
	}
}