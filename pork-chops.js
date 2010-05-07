(function (window) {
	var old_Chops = window.Chops;
	
	function mergeObjects(destination, source) {
		for (var property in source) {
			if (source.hasOwnProperty(property))
				destination[property] = source[property];
		}
		return destination;
	}
	
	window.Chops = {
		mix: function() {
			var o;
			
			for (var i = arguments.length - 1; i >= 0; i -= 1) {
				if (typeof arguments[i] === 'function')
					o = mergeObjects(o, arguments[i]());
				else
					o = mergeObjects(o, arguments[i]);
			}
			
			return F;
		},
		
		noConflict: function () {
			var c = window.Chops;
			window.Chops = old_Class;
			return c;
		},
		
		mixins: {}
	};
})(this);