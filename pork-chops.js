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
		mixins: {
			event: {
				_events_Chops_: {},
				
				bind: function (name, fn) {
					if (!this._events_Chops_[name])
						this._events_Chops_[name] = [];
					
					function f() {
						fn.apply(this);
					}
					
					f._fn_Chops_ = fn;
					
					this._events_Chops_.push(f);
					
					return this;
				},
				
				unbind: function (name, fn) {
					var a = this._events_Chops_[name];
					if (!!a && a.length) {
						for (var i = 0, len = a.length; i < len; i++) {
							if (a[i]._fn_Chops_ === fn)
								a.splice(i, 1);
								break;
						}
					}
					this._events_Chops_[name] = a;
					
					return this;
				},
				
				trigger: function (name) {
					var a = this._events_Chops_[name];
					if (!!a && a.length) {
						for (var i = 0, len = a.length; i < len; i++) {
							a[i]();
						}
					}
					
					return this;
				}
			},
			
			mixer: {
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
			}
		}
	};
})(this);