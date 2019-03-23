import {observable} from './state-manager';

const loggerFunc = console.log;

const store = observable({
	input: 'test todo',
	todos: [{id: Date.now(), text: 'Some todo'}],
}, loggerFunc);

store.changeInput = function(newValue) {
	this.input = newValue;
}

store.addTodo = function() {
	const newInputValue = this.input.trim();

	if (newInputValue) {
		this.todos = [{id: Date.now(), text: newInputValue}, ...this.todos];
		this.input = '';
	}
}

store.deleteTodo = function(id) {
	this.todos = this.todos.filter(todo => todo.id !== id);
}

store.changeInput = store.changeInput.bind(store);
store.addTodo = store.addTodo.bind(store);
store.deleteTodo = store.deleteTodo.bind(store);

window.store = store;

export default store;