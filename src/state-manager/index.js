import Observable from './Observable';
import {computeStoreKey, isObject} from './utils';

window.__$currentComponent = null;
window.__$componentDependencies = new Map();

function setCurrentComponent(Component) {
	__$currentComponent = Component;
}

function getComponentDependencies() {
	return __$componentDependencies.get(__$currentComponent) || [];
}

function setComponentDependencies(dependencies = []) {
	__$componentDependencies.set(__$currentComponent, dependencies);
}

function subscribeComponentToField(field) {
	field.observable.subscribe(__$currentComponent);
}

function unsubscribeComponentFromAllDependencies() {
	getComponentDependencies().forEach(dependency => {
		dependency.observable.unsubscribe(__$currentComponent);
	});
	setComponentDependencies([]);
}

function observable(target, loggerFunc) {
	if (!isObject(target)) {
		throw Error(`Target must be a object, received ${typeof target}`);
	}

	const keys = Object.keys(target);

	const updatedTarget = keys.reduce((result, key) => {
		result[computeStoreKey(key)] = {
			value: target[key],
			observable: new Observable(),
		}
		result[key] = target[key];

		return result;
	}, {});


	keys.forEach(key => {
		Object.defineProperty(updatedTarget, key, {
			configurable: false,
			get() {
				const field = this[computeStoreKey(key)];
				subscribeComponentToField(field);
				setComponentDependencies([...getComponentDependencies(), field]);

				return field.value;
			},
			set(newValue) {
				const field = this[computeStoreKey(key)];
				if (field.value !== newValue) {
					if (loggerFunc) {
						loggerFunc({
							field: key,
							oldValue: field.value,
							newValue,
						});
					}
					field.value = newValue;
					field.observable.notify(Component => {
						Component.forceUpdate();
					});
				}
			},
		});
	});

	return updatedTarget;
}

function observer(Component) {
	const oldRender = Component.prototype.render;
	const oldComponentWillUnmount = Component.prototype.componentWillUnmount;

	Component.prototype.render = function() {
		setCurrentComponent(this)
		unsubscribeComponentFromAllDependencies();

		return oldRender.call(this);
	}

	Component.prototype.componentWillUnmount = function() {
		unsubscribeComponentFromAllDependencies();

		oldComponentWillUnmount.call(this);
	}

	return Component;
}

export {observable, observer};
