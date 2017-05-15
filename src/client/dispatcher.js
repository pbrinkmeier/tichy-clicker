'use strict';

module.exports = {
	listeners: [],
	register: function (listener) {
		this.listeners.push(listener);
	},
	dispatch: function (action) {
		this.listeners.forEach(function (listener) {
			listener(action);
		});
	}
};
