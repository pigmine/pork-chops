Chops.mixins.event: {
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
	}
};