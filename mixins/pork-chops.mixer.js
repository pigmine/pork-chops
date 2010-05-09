Chops.mixins.mixer = {
	mixin: function () {
		var property, i, c;
		for (i = arguments.length; i >= 0; i -= 1) {
			c = arguments[i];
			if (typeof c === 'function')
				c = c();
			for (property in c) {
				if (c.hasOwnProperty(property))
					this[property] = c[property];
			}
		}
	}
};