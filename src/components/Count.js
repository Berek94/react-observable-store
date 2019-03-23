import React from 'react';
import {connect} from '../state-manager/react-connect';

class Count extends React.Component {
	render() {
		return <span>Количество задач: {this.props.todosCount}</span>
	}
}

export default connect(store => ({todosCount: store.todos.length}))(Count);
