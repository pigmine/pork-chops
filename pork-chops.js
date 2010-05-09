(function () {
	//save the current Chops variable in case we are overwriting someone else's chops
	var old_Chops = this.Chops;
	
	//Chops namespace - call noConflict to remove from global namespace
	this.Chops = {
		//pass in objects or functions as arguments
		//objects (without their prototypes) and objects returned by functions passed in as arguments are mixed
		//the properties of the first argument takes precedence over the next, and so on
		mix: function() {
			var o = {}
				,property
				,i
				,c;
			
			for (i = arguments.length; i >= 0; i -= 1) {
				c = arguments[i];
				if (typeof c === 'function')
					c = c();
				for (property in c) {
					if (c.hasOwnProperty(property))
						o[property] = c[property];
				}
			}
			
			return o;
		},
		
		//removes Chops from the global namespace and restores any previous value for Chops
		noConflict: function () {
			var c = Chops;
			Chops = old_Chops;
			return c;
		},
		
		//serves as a namespace for prepared functions as an extension to Chops
		mixins: {}
	};
})();