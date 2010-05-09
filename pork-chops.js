(function (window) {
	//save the current Chops variable in case we are overwriting someone else's chops
	var old_Chops = window.Chops;
	
	//Chops namespace - call noConflict to remove from global namespace
	var Chops = window.Chops = {
		//pass in objects or functions as arguments
		//objects (without their prototypes) and objects returned by functions passed in as arguments are mixed
		//the properties of the first argument takes precedence over the next, and so on
		mix: function() {
			var obj = {} //the new object we mix into
				,property //holds the string for looping properties of objects
				,i //holds the array counter for looping through arguments
				,cur; //holds the current argument in the arguments loop for speed
			
			for (i = arguments.length; i >= 0; i -= 1) {
				cur = arguments[i];
				if (typeof cur === 'function')
					cur = cur();
				for (property in cur) {
					//Chops does not mix in prototyped properties of an object
					if (cur.hasOwnProperty(property))
						obj[property] = cur[property];
				}
			}
			
			return obj;
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