export function isObject(value) {
	return typeof value === 'object' && value.constructor === Object;
}

export function isEmpty(value) {
	if (isObject(value) || Array.isArray(value)) {
		return !Object.keys(value).length;
	}

	return !value;
}

export function computeStoreKey(key) {
	return `$__${key}`;
}
