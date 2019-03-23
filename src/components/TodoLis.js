import React from 'react';
import {connect} from '../state-manager/react-connect';

class TodoLis extends React.Component {
	handleDeleteTodo(id) {
		this.props.deleteTodo(id);
	}

	render() {
		return (
			<ul>
				{this.props.todos.map(todo => (
					<li
						key={todo.id}
						onClick={this.handleDeleteTodo.bind(this, todo.id)}
					>
						{todo.text}
					</li>
				))}
			</ul>
		);
	}
};

export default connect(store => ({
	todos: store.todos,
	deleteTodo: store.deleteTodo,
}))(TodoLis);