(function (window) {
	//save the current Chops variable in case we are overwriting someone else's chops
	var old_Chops = window.Chops;
	
	//serves as the basis of object mixing
	//overwrites properties in one object with a different's object's properties
	//does NOT include prototypes of objects in copying
	function mergeObjects(destination, source) {
		for (var property in source) {
			if (source.hasOwnProperty(property))
				destination[property] = source[property];
		}
		return destination;
	}
	
	//Chops namespace - call noConflict to remove from global namespace
	window.Chops = {
		//pass in objects or functions as arguments
		//objects (without their prototypes) and objects returned by functions passed in as arguments are mixed
		//the properties of the first argument takes precedence over the next, and so on
		mix: function() {
			var o;
			
			for (var i = arguments.length - 1; i >= 0; i -= 1) {
				if (typeof arguments[i] === 'function')
					o = mergeObjects(o, arguments[i]());
				else
					o = mergeObjects(o, arguments[i]);
			}
			
			return o;
		},
		
		//removes Chops from the global namespace and restores any previous value for Chops
		noConflict: function () {
			var c = window.Chops;
			window.Chops = old_Chops;
			return c;
		},
		
		//serves as a namespace for prepared functions as an extension to Chops
		mixins: {}
	};
})(this);