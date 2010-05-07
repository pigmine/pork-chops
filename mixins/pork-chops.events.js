Chops.mixins.event: {
		_events_Chops_: {},
		
		addEvent: function (name, fn) {
			if (!this._events_Chops_[name])
				this._events_Chops_[name] = [];
			
			function f() {
				fn.apply(this);
			}
			
			f._fn_Chops_ = fn;
			
			this._events_Chops_.push(f);
			return this;
		},
		
		removeEvent: function (name, fn) {
			var a = this._events_Chops_[name];
			if (!!a && a.length) {
				for (var i = 0, len = a.length; i < len; i++) {
					if (a[i]._fn_Chops_ === fn)
						a.splice(i, 1);
						break;
				}
			}
			this._events_Chops_[name] = a;
		},
		
		fireEvent: function (name) {
			var a = this._events_Chops_[name];
			if (!!a && a.length) {
				for (var i = 0, len = a.length; i < len; i++) {
					a[i]();
				}
			}
		},
		
		addEvents: function (obj) {
			for (var property in obj) {
				if (obj.hasOwnProperty(property))
					this.addEvent(property, obj[property]);
			}
		},
		
		removeEvents: function (obj) {
			for (var property in obj) {
				if (obj.hasOwnProperty(property))
					this.removeEvent(property, obj[property]);
			}
		},
		
		fireEvents: function () {
			for (var property in obj) {
				if (obj.hasOwnProperty(property))
					this.addEvent(property, obj[property]);
			}
		}
	}
};