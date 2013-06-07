
var u, Util = u = new function() {}
u.version = 4;

Util.testURL = function(url) {
	return true;
	return url.match(/http\:\/\/mkn\.|http\:\/\/w\.|\.local/i);
}
Util.debug = function(output) {
	if(Util.testURL(location.href)) {
		var element, br;
		if(Util.debugWindow && Util.debugWindow.document) {
			element = Util.debugWindow.document.createTextNode(output);
			br = Util.debugWindow.document.createElement('br');
			Util.debugWindow.document.body.appendChild(element);
			Util.debugWindow.document.body.appendChild(br);
			Util.debugWindow.scrollBy(0,1000);
		}
		else {
			Util.openDebugger();
			if(!Util.debugWindow) {
				alert("Disable popup blocker!");
			}
			else {
				Util.debug(output);
			}
		}
	}
}
Util.debugWindow = false;
Util.openDebugger = function() {
	Util.debugWindow = window.open("", "debugWindow", "width=600, height=400, scrollbars=yes, resizable=yes");
	Util.debugWindow.document.body.style.fontFamily = "Courier";
	var element = Util.debugWindow.document.createTextNode("--- new session ---");
	var br = Util.debugWindow.document.createElement('br');
	Util.debugWindow.document.body.appendChild(br);
	Util.debugWindow.document.body.appendChild(element);
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
}
Util.tracePointer = function(e) {
	if(Util.testURL(location.href)) {
		var position = document.createElement("div");
		document.body.appendChild(position);
		position.id = "debug_pointer";
		position.style.position = "absolute";
		position.style.backgroundColor = "#ffffff";
		position.style.color = "#000000";
		this.trackMouse = function(event) {
			u.ge("debug_pointer").innerHTML = event.pageX+"x"+event.pageY;
			u.ge("debug_pointer").style.left = 7+event.pageX+"px";
			u.ge("debug_pointer").style.top = 7+event.pageY+"px";
		}
		u.e.addEvent(e, "mousemove", this.trackMouse);
	}
}
Util.bug = function(target, message) {
	if(Util.testURL(location.href)) {
		var option, options = new Array(new Array(0, "auto", "auto", 0), new Array(0, 0, "auto", "auto"), new Array("auto", 0, 0, "auto"), new Array("auto", "auto", 0, 0));
		if(!message) {
			message = target;
			target = options[0];
		}
		if(!u.ge("debug_"+target)) {
			for(var i = 0; option = options[i]; i++) {
				if(!u.ge("debug_id_"+i)) {
					var d_target = document.createElement("div");
					document.body.appendChild(d_target);
					d_target.style.position = "absolute";
					d_target.style.zIndex = 100;
					d_target.style.top = option[0];
					d_target.style.right = option[1];
					d_target.style.bottom = option[2];
					d_target.style.left = option[3];
					d_target.style.backgroundColor = "#ffffff";
					d_target.style.color = "#000000";
					d_target.style.padding = "3px";
					d_target.id = "debug_id_"+i;
					d_target.className = "debug_"+target;
					break;
				}
			}
		}
		u.ge("debug_"+target).innerHTML += message+"<br>";
	}
}

Util.getVar = function(s) {
	var p = location.search;
	var start_index = (p.indexOf("&" + s + "=") > -1) ? p.indexOf("&" + s + "=") + s.length + 2 : ((p.indexOf("?" + s + "=") > -1) ? p.indexOf("?" + s + "=") + s.length + 2 : false);
	var end_index = (p.substring(start_index).indexOf("&") > -1) ? p.substring(start_index).indexOf("&") + start_index : false;
	var return_string = start_index ? p.substring(start_index,(end_index ? end_index : p.length)): "";
	return return_string;
}
Util.getHashVar = function(s) {
	var h = location.hash;
	var values, index, list;
	values = h.substring(1).split("&");
	for(index in values) {
		list = values[index].split("=");
		if(list[0] == s) {
			return list[1];
		}
	}
	return false;
}
Util.getUniqueId = function() {
	return ("id" + Math.random() * Math.pow(10, 17) + Math.random());
}
Util.getHashPath = function(n) {
	var h = location.hash;
	var values;
	if(h.length) {
		values = h.substring(2).split("/");
		if(n && values[n]) {
			return values[n];
		}
	}
	return values ? values : false;
}
Util.setHashPath = function(path) {
	location.hash = path;
	return Util.getHashPath();
}

Util.ge = function(id, target) {
	var e, i, regexp, t;
	t = target ? target : document;
	if(document.getElementById(id)) {
		return document.getElementById(id);
	}
	regexp = new RegExp("(^|\\s)" + id + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			return e;
		}
	}
	return t.getElementsByTagName(id).length ? t.getElementsByTagName(id)[0] : false;
}
Util.ges = function(id, target) {
	var e, i, regexp, t;
	var elements = new Array();
	t = target ? target : document;
	regexp = new RegExp("(^|\\s)" + id + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			elements.push(e);
		}
	}
	return elements.length ? elements : t.getElementsByTagName(id);
}
Util.gs = function(e, direction) {
	try {
		var node_type = e.nodeType;
		var ready = false;
		var prev_node = false
		for(var i = 0; node = e.parentNode.childNodes[i]; i++) {
			if(node.nodeType == node_type) {
				if(ready) {
					return node;
				}
				if(node == e) {
					if(direction == "next") {
						ready = true;
					}
					else {
						return prev_node;
					}
				}
				else {
					prev_node = node;
				}
			}
		}
		return false;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.gs, called from: "+arguments.callee.caller);
	}
}
Util.qs = function(query, target) {
	t = target ? target : document;
	return t.querySelector(query);
}
Util.qsa = function(query, target) {
	t = target ? target : document;
	return t.querySelectorAll(query);
}
Util.previousSibling = u.ps = function(e, exclude) {
	var node = e.previousSibling;
	if(exclude) {
		while(node && (node.nodeType == 3 || node.className.match("(^|\\s)" + exclude + "(\\s|$)") || node.nodeName.match(exclude.toUpperCase()))) {
			node = node.previousSibling;
		}
	}
	else {
		while(node && node.nodeType == 3) {
			node = node.previousSibling;
		}
	}
	return node;
}
Util.nextSibling = u.ns = function(e, exclude) {
	var node = e.nextSibling;
	if(exclude) {
		while(node && (node.nodeType == 3 || node.className.match("(^|\\s)" + exclude + "(\\s|$)") || node.nodeName.match(exclude.toUpperCase()))) {
			node = node.nextSibling;
		}
	}
	else {
		while(node && node.nodeType == 3) {
			node = node.nextSibling;
		}
	}
	return node;
}
Util.ae = function(e, node_type, attributes) {
	try {
		var node = e.appendChild(document.createElement(node_type));
		if(attributes) {
			if(typeof(attributes) == "object") {
				for(attribute in attributes) {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
			else {
				u.addClass(node, attributes)
			}
		}
		node.e = e;
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.ae, called from: "+arguments.callee.caller.name);
	}
}
Util.ie = function(e, node_type, attributes) {
	var node = e.insertBefore(document.createElement(node_type), e.firstChild);
	if(attributes) {
		if(typeof(attributes) == "object") {
			for(attribute in attributes) {
				node.setAttribute(attribute, attributes[attribute]);
			}
		}
		else {
			u.addClass(node, attributes)
		}
	}
	node.e = e;
	return node;
}
Util.getIJ = function(e, id) {
	try {
		var regexp = new RegExp(id + ":[?=\\w/\\#~:.?+=?&%@!\\-]*");
		if(e.className.match(regexp)) {
			return e.className.match(regexp)[0].replace(id + ":", "");
		}
		return false;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.removeClass, called from: "+arguments.callee.caller);
	}
}
Util.setClass = u.sc = function(e, classname) {
	try {
		e.className = classname;
		e.offsetTop;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.removeClass, called from: "+arguments.callee.caller);
	}
}
Util.addClass = u.ac = function(e, classname) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
			if(!regexp.test(e.className)) {
				e.className += e.className ? " " + classname : classname;
				e.offsetTop;
			}
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.addClass, called from: "+arguments.callee.caller);
	}
}
Util.removeClass = u.rc = function(e, classname) {
	try {
		if(classname) {
			var regexp = new RegExp(classname + " | " + classname + "|" + classname);
			e.className = e.className.replace(regexp, "");
			e.offsetTop;
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.removeClass, called from: "+arguments.callee.caller);
	}
}
Util.toggleClass = u.tc = function(e, classname, second_classname) {
	try {
		var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
		if(regexp.test(e.className)) {
			Util.removeClass(e, classname);
			if(second_classname) {
				Util.addClass(e, second_classname);
			}
		}
		else {
			Util.addClass(e, classname);
			if(second_classname) {
				Util.removeClass(e, second_classname);
			}
		}
		e.offsetTop;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.removeClass, called from: "+arguments.callee.caller);
	}
}
Util.applyStyle = u.as = function(e, style, value) {
	e.style[style] = value;
	e.offsetHeight;
}
Util.getComputedStyle = u.gcs = function(e, attribute) {
	e.offsetHeight;
	if(document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(e, null).getPropertyValue(attribute);
	}
	return false;
}
Util.wrapElement = u.we = function(e, wrap) {
	wrap = e.parentNode.insertBefore(document.createElement(wrap), e);
	wrap.appendChild(e);
	return wrap;
}

Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" ? "mouse" : "touch";
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
	this.addEvent = function(e, type, action) {
		try {
			e.addEventListener(type, action, false);
		}
		catch(exception) {
			if(document.all) {
				u.bug("exception:" + e + "," + type + ":" + exception);
			}
			else {
				u.bug("exception:" + e + "," + type + ":" + exception);
			}
		}
	}
	this.removeEvent = function(e, type, action) {
		try {
			e.removeEventListener(type, action, false);
		}
		catch(exception) {
		}
	}
	this.onStart = this.onDown = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.removeOnStart = this.removeOnDown = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.onMove = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchmove" : "mousemove"), action);
	}
	this.onEnd = this.onUp = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchend" : "mouseup"), action);
		if(e.snapback && u.e.event_pref == "mouse") {
			u.e.addEvent(e, "mouseout", this._snapback);
		}
		else if(e.drag && u.e.event_pref == "mouse") {
		}
	}
	this.transform = function(e, x, y) {
		if(typeof(e.style.MozTransition) != "undefined" || typeof(e.style.webkitTransition) != "undefined") {
			e.style.MozTransform = "translate("+x+"px, "+y+"px)";
			e.style.webkitTransform = "translate3d("+x+"px, "+y+"px, 0)";
			e.element_x = x;
			e.element_y = y;
		}
		else {
			e.style.position = "absolute";
			u.bug("duration:" + e.duration);
			if(!e.duration) {
				e.style.left = x+"px";
				e.style.top = y+"px";
				e.element_x = x;
				e.element_y = y;
			}
			else {
				e.transitions = 15;
				e.transition_progress = 0;
				e.element_x = e.element_x ? e.element_x : 0;
				e.element_y = e.element_y ? e.element_y : 0;
				e.transitionTo = function() {
						++this.transition_progress;
						this.style.left =  this.end_x-(this.distance_x - (this.interval_x*this.transition_progress))+"px";
						this.style.top =  this.end_y-this.distance_y - this.interval_y*this.transition_progress+"px";
						this.element_x = this.end_x-(this.distance_x - (this.interval_x*this.transition_progress));
						this.element_y = this.end_y-(this.distance_y - (this.interval_y*this.transition_progress));
				}
				e.end_x = x;
				e.end_y = y;
				if(e.end_x > e.element_x) {
					if(e.end_x > 0 && e.element_x >= 0 || e.end_x >= 0 && e.element_x < 0) {
						e.distance_x = e.end_x - e.element_x;
					}
					else {
						e.distance_x = e.element_x - e.end_x;
					}
				}
				else if(e.end_x < e.element_x) {
					if(e.end_x <= 0 && e.element_x > 0 || e.end_x < 0 && e.element_x <= 0) {
						e.distance_x = e.end_x - e.element_x;
					}
					else {
						e.distance_x = e.element_x - e.end_x;
					}
				}
				else {
					e.distance_x = 0;
				}
				if(e.end_y > e.element_y) {
					if(e.end_y > 0 && e.element_y >= 0 || e.end_y >= 0 && e.element_y < 0) {
						e.distance_y = e.end_y - e.element_y;
					}
					else {
						e.distance_y = e.element_y - e.end_y;
					}
				}
				else if(e.end_y < e.element_y) {
					if(e.end_y <= 0 && e.element_y > 0 || e.end_y < 0 && e.element_y <= 0) {
						e.distance_y = e.end_y - e.element_y;
					}
					else {
						e.distance_y = e.element_y - e.end_y;
					}
				}
				else {
					e.distance_y = 0;
				}
				e.interval_x = e.distance_x/e.transitions;
				e.interval_y = e.distance_y/e.transitions;
				for(var i = 0; i < e.transitions; i++) {
					u.t.setTimer(e, e.transitionTo, (e.duration/e.transitions)*i);
				}
				if(typeof(e.transitioned) == "function") {
					u.t.setTimer(e, e.transitioned, e.duration);
				}
			}
		}
	}
	this.transition = function(e, transition) {
		if(typeof(e.style.MozTransition) != "undefined" || typeof(e.style.webkitTransition) != "undefined") {
			e.style.MozTransition = transition;
			e.style.webkitTransition = transition;
			if(typeof(e.transitioned) == "function") {
				this.onTransitionEnd(e, e.transitioned);
			}
		}
		else {
			var duration = transition.match(/[0-9.]+[ms]/g) ? transition.match(/[0-9.]+[ms]/g).toString() : false;
			e.duration = duration ? (duration.match("ms") ? parseFloat(duration) : parseFloat(duration) * 1000) : false;
		}
	}
	this.overlap = function(element, target, strict) {
		if(target.constructor.toString().match("Array")) {
			var target_start_x = Number(target[0]);
			var target_start_y = Number(target[1]);
			var target_end_x = Number(target[2]);
			var target_end_y = Number(target[3]);
		}
		else {
			var target_start_x = target.element_x ? target.element_x : 0;
			var target_start_y = target.element_y ? target.element_y : 0;
			var target_end_x = Number(target_start_x + target.offsetWidth);
			var target_end_y = Number(target_start_y + target.offsetHeight);
		}
		var element_start_x = Number(element.element_x);
		var element_start_y = Number(element.element_y);
		var element_end_x = Number(element_start_x + element.offsetWidth);
		var element_end_y = Number(element_start_y + element.offsetHeight);
		if(strict && element_start_x >= target_start_x && element_start_y >= target_start_y && element_end_x <= target_end_x && element_end_y <= target_end_y) {
			return true;
		}
		else if(strict) {
			return false;
		}
		else if(element_end_x < target_start_x || element_start_x > target_end_x || element_end_y < target_start_y || element_start_y > target_end_y) {
			return false;
		}
		return true;
	}
	this.resetEvents = function(e) {
		u.t.resetTimer(e.t_held);
		u.t.resetTimer(e.t_clicked);
		this.removeEvent(e, "mouseup", this._dblclicked);
		this.removeEvent(e, "touchend", this._dblclicked);
		this.removeEvent(e, "mousemove", this._inputClickMove);
		this.removeEvent(e, "touchmove", this._inputClickMove);
		this.removeEvent(e, "mousemove", this._pick);
		this.removeEvent(e, "touchmove", this._pick);
		this.removeEvent(e, "mousemove", this._drag);
		this.removeEvent(e, "touchmove", this._drag);
		this.removeEvent(e, "mouseup", this._drop);
		this.removeEvent(e, "touchend", this._drop);
		this.removeEvent(e, "mouseout", this._snapback);
		this.removeEvent(e, "mouseout", this._drop);
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.input_timestamp = new Date().getTime();
		this.current_xps = 0;
		this.current_yps = 0;
		this.swiped = false;
		if(this.e_click || this.e_dblclick || this.e_hold) {
			u.e.onMove(this, u.e._inputClickMove);
			u.e.onEnd(this, u.e._dblclicked);
		}
		if(this.e_hold) {
			this.t_held = u.t.setTimer(this, u.e._held, 750);
		}
		if(this.e_drag || this.e_swipe) {
			u.e.onMove(this, u.e._pick);
			u.e.onEnd(this, u.e._drop);
		}
		if(typeof(this.inputStarted) == "function") {
			this.inputStarted(event);
		}
	}
	this._inputClickMove = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.clickMoved) == "function") {
			this.clickMoved(event);
		}
		if(typeof(this.moved) == "function") {
			this.moved(event);
		}
	}
	this.hold = function(e) {
		e.e_hold = true;
		u.e.onStart(e, this._inputStart);
	}
	this._held = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.held) == "function") {
			this.held(event);
		}
	}
	this.click = this.tap = function(e) {
		e.e_click = true;
		u.e.onStart(e, this._inputStart);
	}
	this._clicked = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.clicked) == "function") {
			this.clicked(event);
		}
	}
	this.dblclick = this.doubletap = function(e) {
		e.e_dblclick = true;
		u.e.onStart(e, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			u.e.resetEvents(this);
			if(typeof(this.dblclicked) == "function") {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(!event) {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
	this.drag = function(e, target, strict, snapback) {
		e.e_drag = true;
		e.strict = strict ? true : false;
		e.allowed_offset = e.strict ? 0 : 250;
		e.elastica = 2;
		e.snapback = snapback ? true : false;
		if(target.constructor.toString().match("Array")) {
			e.start_drag_x = Number(target[0]);
			e.start_drag_y = Number(target[1]);
			e.end_drag_x = Number(target[2]);
			e.end_drag_y = Number(target[3]);
		}
		else {
			e.start_drag_x = target.element_x ? target.element_x : 0;
			e.start_drag_y = target.element_y ? target.element_y : 0;
			e.end_drag_x = Number(e.start_drag_x + target.offsetWidth);
			e.end_drag_y = Number(e.start_drag_y + target.offsetHeight);
		}
		e.element_x = e.element_x ? e.element_x : 0;
		e.element_y = e.element_y ? e.element_y : 0;
		e.locked = ((e.end_drag_x - e.start_drag_x == e.offsetWidth) && (e.end_drag_y - e.start_drag_y == e.offsetHeight));
		e.vertical = (!e.locked && e.end_drag_x - e.start_drag_x == e.offsetWidth);
		e.horisontal = (!e.locked && e.end_drag_y - e.start_drag_y == e.offsetHeight);
		u.e.onStart(e, this._inputStart);
	}
	this._pick = function(event) {
	    u.e.kill(event);
		this.move_timestamp = new Date().getTime();
		this.current_xps = 0;
		this.current_yps = 0;
		this.start_input_x = u.eventX(event) - this.element_x; // - u.absLeft(this);//(event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
		this.start_input_y = u.eventY(event) - this.element_y; // - u.absTop(this);//.targetTouches ? event.targetTouches[0].pageY : event.pageY);
		u.e.transition(this, "none");
		if(typeof(this.picked) == "function") {
			this.picked(event);
		}
		u.e.resetEvents(this);
		u.e.onMove(this, u.e._drag);
		u.e.onEnd(this, u.e._drop);
	}
	this._drag = function(event) {
			this.new_move_timestamp = new Date().getTime();
				var offset = false;
				this.current_x = u.eventX(event) - this.start_input_x;
				this.current_y = u.eventY(event) - this.start_input_y;
					this.current_xps = Math.round(((this.current_x - this.element_x) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
					this.current_yps = Math.round(((this.current_y - this.element_y) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
				this.move_timestamp = this.new_move_timestamp;
				if(this.vertical) {
					this.element_y = this.current_y;
				}
				else if(this.horisontal) {
					this.element_x = this.current_x;
				}
				else if(!this.locked) {
					this.element_x = this.current_x;
					this.element_y = this.current_y;
				}
				if(!this.locked) {
					if(u.e.overlap(this, new Array(this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y), true)) {
						if(this.current_xps && (Math.abs(this.current_xps) > Math.abs(this.current_yps) || this.horisontal)) {
							if(this.current_xps < 0) {
								this.swiped = "left";
							}
							else {
								this.swiped = "right";
							}
						}
						else if(this.current_yps && (Math.abs(this.current_xps) < Math.abs(this.current_yps) || this.vertical)) {
							if(this.current_yps < 0) {
								this.swiped = "up";
							}
							else {
								this.swiped = "down";
							}
						}
						u.a.translate(this, this.element_x, this.element_y);
					}
					else {
						this.swiped = false;
						this.current_xps = 0;
						this.current_yps = 0;
						if(this.element_x < this.start_drag_x && !this.vertical) {
							offset = this.element_x < this.start_drag_x - this.allowed_offset ? - this.allowed_offset : this.element_x - this.start_drag_x;
							this.element_x = this.start_drag_x;
							this.current_x = this.element_x + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else if(this.element_x + this.offsetWidth > this.end_drag_x && !this.vertical) {
							offset = this.element_x + this.offsetWidth > this.end_drag_x + this.allowed_offset ? this.allowed_offset : this.element_x + this.offsetWidth - this.end_drag_x;
							this.element_x = this.end_drag_x - this.offsetWidth;
							this.current_x = this.element_x + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else {
							this.current_x = this.element_x;
						}
						if(this.element_y < this.start_drag_y && !this.horisontal) {
							offset = this.element_y < this.start_drag_y - this.allowed_offset ? - this.allowed_offset : this.element_y - this.start_drag_y;
							this.element_y = this.start_drag_y;
							this.current_y = this.element_y + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else if(this.element_y + this.offsetHeight > this.end_drag_y && !this.horisontal) {
							offset = (this.element_y + this.offsetHeight > this.end_drag_y + this.allowed_offset) ? this.allowed_offset : (this.element_y + this.offsetHeight - this.end_drag_y);
							this.element_y = this.end_drag_y - this.offsetHeight;
							this.current_y = this.element_y + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else {
							this.current_y = this.element_y;
						}
						if(offset) {
							u.a.translate(this, this.current_x, this.current_y);
						}
					}
				}
			if(typeof(this.moved) == "function") {
				this.moved(event);
			}
	}
	this._drop = function(event) {
		u.e.resetEvents(this);
		if(this.e_swipe && this.swiped) {
			if(this.swiped == "left") {
				if(typeof(this.swipedLeft) == "function") {
					this.swipedLeft(event);
				}
			}
			else if(this.swiped == "right") {
				if(typeof(this.swipedRight) == "function") {
					this.swipedRight(event);
				}
			}
			else if(this.swiped == "down") {
				if(typeof(this.swipedDown) == "function") {
					this.swipedDown(event);
				}
			}
			else if(this.swiped == "up") {
				if(typeof(this.swipedUp) == "function") {
					this.swipedUp(event);
				}
			}
		}
		else if(!this.locked && this.start_input_x && this.start_input_y) {
			this.start_input_x = false;
			this.start_input_y = false;
			this.current_x = this.element_x + (this.current_xps/2);
			this.current_y = this.element_y + (this.current_yps/2);
			if(this.current_x < this.start_drag_x) {
				this.current_x = this.start_drag_x;
			}
			else if(this.current_x + this.offsetWidth > this.end_drag_x) {
				this.current_x = this.end_drag_x - this.offsetWidth;
			}
			if(this.current_y < this.start_drag_y) {
				this.current_y = this.start_drag_y;
			}
			else if(this.current_y + this.offsetHeight > this.end_drag_y) {
				this.current_y = this.end_drag_y - this.offsetHeight;
			}
			if(!this.strict && (this.current_xps || this.current_yps)) {
				u.a.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
			}
			else {
				u.a.transition(this, "all 0.1s cubic-bezier(0,0,0.25,1)");
			}
			u.a.translate(this, this.current_x, this.current_y);
		}
		if(typeof(this.dropped) == "function") {
			this.dropped(event);
		}
	}
	this.swipe = function(e, target, strict) {
		e.e_swipe = true;
		u.e.drag(e, target, strict);
	}
	this._swipe = function(event) {
	}
	this._snapback = function(event) {
	    u.e.kill(event);
		u.bug(2, "snap")
		if(this.start_input_x && this.start_input_y) {
			input_x = event.targetTouches ? event.targetTouches[0].pageX : event.pageX;
			input_y = event.targetTouches ? event.targetTouches[0].pageY : event.pageY;
			offset_x = 0;
			offset_y = 0;
			if(this.vertical) {
				offset_y = input_y - this.current_y;
			}
			else if(this.horisontal) {
				offset_x = input_x - this.current_x;
			}
			else {
				offset_x = input_x - this.current_x;
				offset_y = input_y - this.current_y;
			}
			u.e.transform(this, (this.element_x+offset_x), (this.element_y+offset_y));
		}
	}
}

Util.absoluteX = u.absX = function(e) {
	if(e.offsetParent) {
		return e.offsetLeft + u.absX(e.offsetParent);
	}
	return e.offsetLeft;
}
Util.absoluteY = u.absY = function(e) {
	if(e.offsetParent) {
		return e.offsetTop + u.absY(e.offsetParent);
	}
	return e.offsetTop;
}
Util.relativeOffsetX = u.relOffsetX = function(e) {
	if(e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absoute/) != null) {
		return u.absX(e.offsetParent); // - e.offsetLeft u.relOffsetX(e.offsetParent);
	}
	return 0; //u.absX(e) - e.offsetLeft;
}
Util.relativeOffsetY = u.relOffsetY = function(e) {
	if(e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absoute/) != null) {
		return u.absY(e.offsetParent);
	}
	return 0; // u.absY(e) - e.offsetTop;
}
Util.actualWidth = function(e) {
	return parseInt(u.gcs(e, "width"));
}
Util.actualHeight = function(e) {
	return parseInt(u.gcs(e, "height"));
}
Util.eventX = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageY : event.pageY);
}
Util.browserWidth = u.browserW = function() {
	return document.documentElement.clientWidth;
}
Util.browserHeight = u.browserH = function() {
	return document.documentElement.clientHeight;
}
Util.htmlWidth = u.htmlW = function() {
	return document.documentElement.offsetWidth;
}
Util.htmlHeight = u.htmlH = function() {
	return document.documentElement.offsetHeight;
}
Util.pageScrollX = u.scrollX = function() {
	return window.pageXOffset;
}
Util.pageScrollY = u.scrollY = function() {
	return window.pageYOffset;
}

Util.Animation = u.a = new function() {
	this.variant = function(e) {
		if(this.implementation == undefined) {
			if(document.body.style.webkitTransition != undefined) {
				this.implementation = "webkit";
			}
			else if(document.body.style.MozTransition != undefined) {
				this.implementation = "Moz";
			}
			else if(document.body.style.oTransition != undefined) {
				this.implementation = "o";
			}
			else {
				this.implementation = "";
			}
		}
		return this.implementation;
	}
	this.translate = function(e, x, y) {
		e.style[this.variant() + "Transform"] = "translate("+x+"px, "+y+"px)";
		e.element_x = x;
		e.element_y = y;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.rotate = function(e, deg) {
		e.style[this.variant() + "Transform"] = "rotate("+deg+"deg)";
		e.rotation = deg;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.scale = function(e, scale) {
		e.style[this.variant() + "Transform"] = "scale("+scale+")";
		e.scale = scale;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.rotateTranslate = function(e, deg, x, y) {
		e.style[this.variant() + "Transform"] = "rotate("+deg+"deg) translate("+x+"px, "+y+"px)";
		e.rotation = deg;
		e.element_x = x;
		e.element_y = y;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.translateRotate = function(e, x, y, deg) {
		e.style[this.variant() + "Transform"] = "translate("+x+"px, "+y+"px) rotate("+deg+"deg)";
		e.element_x = x;
		e.element_y = y;
		e.rotation = deg;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.transition = function(e, transition) {
		e.style[this.variant() + "Transition"] = transition;
		u.e.addEvent(e, this.variant() + "TransitionEnd", this._transitioned);
		u.e.addEvent(e, "transitionend", u.a._transitioned);
		var duration = transition.match(/[0-9.]+[ms]/g);
		if(duration) {
			var d = duration[0];
			e.duration = d.match("ms") ? parseFloat(d) : (parseFloat(d) * 1000);
		}
		else {
			e.duration = false;
		}
	}
	this._transitioned = function(event) {
		if(event.target == this && typeof(this.transitioned) == "function") {
			this.transitioned(event);
		}
	}
	this.fadeIn = function(e, duration) {
		duration = duration == undefined ? "0.5s" : duration;
		u.as(e, "opacity", 0);
		if(u.gcs(e, "display") == "none") {
			u.as(e, "display", "block");
		}
		u.a.transition(e, "all "+duration+" ease-in");
		u.as(e, "opacity", 1);
	}
}

Util.Timer = u.t = new function() {
	this.actions = new Array();
	this.objects = new Array();
	this.timers = new Array();
	this.setTimer = function(object, action, timeout) {
		var id = this.actions.length;
		this.actions[id] = action;
		this.objects[id] = object;
		this.timers[id] = setTimeout("u.t.execute("+id+")", timeout);
		return id;
	}
	this.resetTimer = function(id) {
		clearTimeout(this.timers[id]);
		this.objects[id] = false;
	}
	this.execute = function(id) {
		this.objects[id].exe = this.actions[id];
		this.objects[id].exe();
		this.objects[id].exe = null;
		this.actions[id] = null;
		this.objects[id] = false;
		this.timers[id] = null;
	}
	this.valid = function(id) {
		return this.objects[id] ? true : false;
	}
}

Util.Objects = u.o = new Array();
Util.init = function() {
	var i, e, elements, ij_value;
	elements = u.ges("i\:([_a-zA-Z0-9])+");
	for(i = 0; e = elements[i]; i++) {
		while((ij_value = u.getIJ(e, "i"))) {
			u.removeClass(e, "i:"+ij_value);
			if(ij_value && typeof(u.o[ij_value]) == "object") {
				u.o[ij_value].init(e);
			}
		}
	}
}
window.onload = u.init;

Util.Objects["presentation"] = new function() {
	this.init = function(e) {
		var slide, nav_index, nav_references, nav_track, i, tracks, o, ref, refs, track, li;
		e.display = u.ge("display");
		e.slides = u.ges("slide");
		e.nav = u.ge("navigation")
		e.slide_width = e.slides[0].offsetWidth;
		e.display_width = e.display.offsetWidth;
		e.w = (e.slides.length * e.display_width);
		e.style.width = e.w + "px";
		e.h = e.display.offsetHeight;
		nav_index = u.ge("index", e.nav);
		if(nav_index) {
			nav_index.e = e;
			nav_index.clicked = function() {u.toggleClass(this.e.nav, "index");}
			u.e.click(nav_index);
			e.nav_index = e.nav.appendChild(document.createElement("ul"));
			u.addClass(e.nav_index, "index");
		}
		nav_references = u.ge("references", e.nav);
		if(nav_references) {
			nav_references.e = e;
			nav_references.clicked = function() {u.toggleClass(this.e.nav, "references");}
			u.e.click(nav_references);
			refs = u.ges("li", u.ge("ul", e.nav));
			for(i = 0; ref = refs[i]; i++) {
				ref.e = e;
				if(u.getIJ(ref, "id")) {
					u.e.click(ref);
					ref.clicked = function() {
						var id = u.getIJ(this, "id");
						u.e.transition(this.e, "all 1s ease-out");
						u.e.transform(this.e, -u.ge(id).offsetLeft, 0);
						u.removeClass(document.body, "p[0-9]");
						u.addClass(document.body, "p"+((u.ge(id).offsetLeft/this.e.slide_width)+1));
						u.toggleClass(this.e.nav, "references");
					}
				}
			}
		}
		nav_track = u.ge("track", e.nav);
		if(nav_track) {
			nav_track.e = e;
			nav_track.clicked = function() {u.toggleClass(document.body, "track_b");}
			u.e.click(nav_track);
		}
		for(i = 0; slide = e.slides[i]; i++) {
			slide.style.width = e.slide_width+"px";
			u.addClass(slide, "ready");
			if(e.nav_index && u.ge("h2", slide)) {
				tracks = u.ges("track", slide);
				if(tracks.length) {
					for(o = 0; track = tracks[o]; o++) {
						li = e.nav_index.appendChild(document.createElement("li"));
						li.innerHTML = u.ge("h2", track).innerHTML;
						li.e = e;
						li.slide = slide;
						li.track = track;
						if(o > 0) {
							u.addClass(li, "track");
						}
						li.clicked = function() {
							u.e.transition(this.e, "all 1s ease-out");
							u.e.transform(this.e, -this.slide.offsetLeft, 0);
							u.removeClass(document.body, "p[0-9]");
							u.addClass(document.body, "p"+((this.slide.offsetLeft/this.e.slide_width)+1));
							u.toggleClass(this.e.nav, "index");
							if(this.track.className.match("track_a")) {
								u.removeClass(document.body, "track_b");
							}
							else {
								u.addClass(document.body, "track_b");
							}
						}
						u.e.click(li);
					}
				}
				else {
					li = e.nav_index.appendChild(document.createElement("li"));
					li.innerHTML = u.ge("h2", slide).innerHTML;
					li.e = e;
					li.slide = slide;
					li.clicked = function() {
						u.e.transition(this.e, "all 1s ease-out");
						u.e.transform(this.e, -this.slide.offsetLeft, 0);
						u.removeClass(document.body, "p[0-9]");
						u.addClass(document.body, "p"+((this.slide.offsetLeft/this.e.slide_width)+1));
						u.toggleClass(this.e.nav, "index");
					}
					u.e.click(li);
				}
			}
		}
		u.addClass(e.nav, "ready");
		e.swipedLeft = function() {
			current_slide = Math.floor(this.element_x/this.display_width);
			eta = Math.abs(Math.round(((this.element_x - (current_slide * this.display_width)) / this.current_xps) * 10) / 10);
			eta = eta > 0.5 ? 0.5 : eta < 0.2 ? 0.2 : eta;
			u.e.transition(this, "all "+eta+"s ease-out");
			u.e.transform(this, current_slide*this.display_width, 0);
			u.removeClass(document.body, "p[0-9]");
			u.addClass(document.body, "p"+(-current_slide+1));
		}
		e.swipedRight = function() {
			current_slide = Math.floor(this.element_x/this.display_width)+1;
			eta = Math.abs(Math.round((((current_slide * this.display_width) - this.element_x) / this.current_xps) * 10) / 10);
			eta = eta > 0.5 ? 0.5 : eta < 0.2 ? 0.2 : eta;
			u.e.transition(this, "all "+eta+"s ease-out");
			u.e.transform(this, current_slide*this.display_width, 0);
			u.removeClass(document.body, "p[0-9]");
			u.addClass(document.body, "p"+(-current_slide));
		}
		u.e.swipe(e, new Array(e.display.offsetWidth - e.w, 0, e.w, e.h));
		if(u.getVar("slide")) {
			u.e.transition(e, "all 0.5s ease-out");
			u.e.transform(e, -((u.getVar("slide")-1)*e.display_width), 0);
			u.removeClass(document.body, "p[0-9]");
			u.addClass(document.body, "p"+(u.getVar("slide")-1));
		}
	}
}

Util.Objects["neulastaClose"] = new function() {
	this.init = function(e) {
		var close_button = u.ge("close_button", e)
		close_button.e = e;
		close_button.clicked = function() {
			u.removeClass(this.e, "show");
		}
		u.e.click(close_button);
	}
}
Util.Objects["neulastaMoveOn"] = new function() {
	this.init = function(e) {
		var move_on_button = u.ge("move_on_button", e);
		u.e.click(move_on_button);
		move_on_button.clicked = function() {
			var id = u.getIJ(this, "id");
			u.addClass(u.ge(id), "show");
		}
	}
}
Util.Objects["neulastaE1"] = new function() {
	this.init = function(e) {
		e.p = u.ge("presentation");
		e.sl_a = u.ge("sliderA", e);
		u.e.transform(e.sl_a, 0, 0)
		u.e.drag(e.sl_a, e.sl_a, true);
		e.sl_b = u.ge("sliderB", e);
		u.e.transform(e.sl_b, 0, 0)
		u.e.drag(e.sl_b, new Array(0, 0, 550, 373), true, true);
		e.sl_c = u.ge("sliderC", e);
		u.e.transform(e.sl_c, 0, 0)
		u.e.drag(e.sl_c, new Array(0, 0, 550, 373), true, true);
		e.sl_d = u.ge("sliderD", e);
		u.e.transform(e.sl_d, 0, 0)
		u.e.drag(e.sl_d, new Array(0, 0, 550, 373), true, true);
		e.sl_e = u.ge("sliderE", e);
		u.e.transform(e.sl_e, 0, 0)
		u.e.drag(e.sl_e, new Array(0, 0, 550, 373), true, true);
		e.sl_a.e = e.sl_b.e = e.sl_c.e = e.sl_d.e = e.sl_e.e = e;
		var no_drag = u.ge("no_drag", e);
		no_drag.e = e;
		u.e.drag(no_drag, no_drag, true);
		no_drag.picked = e.sl_a.picked = e.sl_b.picked = e.sl_c.picked = e.sl_d.picked = e.sl_e.picked = function(event) {
			u.e.kill(event);
			u.e.resetEvents(this.e.p);
			u.addClass(this, "move");
		}
		no_drag.clickMoved = function() {
			u.e.resetEvents(this.e.p);
		}
		u.e.click(no_drag);
		e.sl_a.dropped = e.sl_a.picked = function() {
			u.e.resetEvents(this.e.p);
		}
		e.sl_b.moved = e.sl_c.moved = e.sl_d.moved = e.sl_e.moved = function() {
			this.e.moveSlider(this);
			this.e.drawGraph();
		}
		e.sl_a.dropped = e.sl_b.dropped = e.sl_c.dropped = e.sl_d.dropped = e.sl_e.dropped = function() {
			u.removeClass(this, "move");
		}
		e.moveSlider = function(s) {
			var next = u.gs(s, "next");
			var prev = u.gs(s, "prev");
			if(next && s.element_x > next.element_x) {
				u.e.transform(next, s.element_x, 0);
				this.moveSlider(next);
			}
			if(prev && s.element_x < prev.element_x) {
				u.e.transform(prev, s.element_x, 0);
				this.moveSlider(prev);
			}
		}
		e.tumor = u.ge("tumor", e);
		e.updateTumor = function(scale) {
			this.tumor.style.MozTransform = "scale(" + (1-scale) + ")";
			this.tumor.style.webkitTransform = "scale(" + (1-scale) + ")";
		}
		e.r = u.ge("reduction", e);
		e.r.e = e;
		u.e.drag(e.r, e.r, true);
		e.r.picked = function(event) {
			u.e.kill(event);
			u.e.resetEvents(this.e.p);
		}
		e.r_f_i = 0;
		e.r_f = new Array();
		e.r_f[0] = [75, 10];
		e.r_f[1] = [67.5, 9];
		e.r_f[2] = [63.75, 8.5];
		e.r_f[3] = [60, 8];
		e.r_f[4] = [56.25, 7.5];
		e.sl_r = u.ge("slider", e.r);
		e.sl_ri = u.ge("slider_imitation", e.r);
		e.sl_ri.e = e;
		u.e.drag(e.sl_ri, e.r, true);
		e.sl_ri.moved = function(event) {
			u.e.transform(this.e.sl_r, Math.round(this.element_x/109)*109, 0);
			this.e.r_f_i = Math.round(this.element_x/109);
			this.e.drawGraph();
		}
		e.sl_ri.dropped = function(event) {
			u.e.transform(this, this.e.sl_r.element_x, 0);
			this.e.r_f_i = Math.round(this.element_x/109);
			this.e.drawGraph();
		}
		e.graph = u.ge("graph", e);
		e.graph.e = e;
		e.graph.clickMoved = function() {
			u.e.resetEvents(this.e.p);
		}
		u.e.click(e.graph);
		e.graph.width = e.graph.offsetWidth;
		e.graph.height = e.graph.offsetHeight;
		e.ctx = e.graph.getContext("2d");
		e.ctx.strokeStyle = "#006cb6";
		e.ctx.lineWidth = 2;
		e.u_f = 100/25;
		e.drawGraph = function() {
			var cx = 15;
			var cy = 0;
			this.ctx.beginPath();
			this.ctx.clearRect(0,0,this.graph.offsetWidth,this.graph.offsetHeight);
			this.ctx.moveTo(cx, cy);
			cx = cx + this.r_f[this.r_f_i][1];
			cy = cy + this.r_f[this.r_f_i][0];
			this.ctx.lineTo(cx, cy);
			this.ctx.stroke();
			var b = 79 + this.sl_b.element_x;
			cx = 15 + b;
			cy = cy - (b/this.u_f);
			this.ctx.lineTo(cx, cy);
			this.ctx.stroke();
			cx = cx + this.r_f[this.r_f_i][1];
			cy = cy + this.r_f[this.r_f_i][0];
			this.ctx.lineTo(cx, cy);
			this.ctx.stroke();
			var c = 79 + this.sl_c.element_x;
			cx = 15 + c + 79;
			cy = cy - ((c-this.sl_b.element_x)/this.u_f);
			this.ctx.lineTo(cx, cy);
			this.ctx.stroke();
			cx = cx + this.r_f[this.r_f_i][1];
			cy = cy + this.r_f[this.r_f_i][0];
			this.ctx.lineTo(cx, cy);
			this.ctx.stroke();
			var d = 79 + this.sl_d.element_x;
			cx = 15 + d + 158;
			cy = cy - ((d-this.sl_c.element_x)/this.u_f);
			this.ctx.lineTo(cx, cy);
			this.ctx.stroke();
			cx = cx + this.r_f[this.r_f_i][1];
			cy = cy + this.r_f[this.r_f_i][0];
			this.ctx.lineTo(cx, cy);
			this.ctx.stroke();
			var e = 79 + this.sl_e.element_x;
			cx = 15 + e + 237;
			cy = cy - ((e-this.sl_d.element_x)/this.u_f);
			this.ctx.lineTo(cx, cy);
			this.ctx.stroke();
			cx = cx + this.r_f[this.r_f_i][1];
			cy = cy + this.r_f[this.r_f_i][0];
			this.ctx.lineTo(cx, cy);
			this.ctx.stroke();
			if(cy < this.graph.offsetHeight) {
				cx = cx + 200;
				cy = cy - (200/this.u_f);
				this.ctx.lineTo(cx, cy);
				this.ctx.stroke();
				this.updateTumor(cy/this.graph.offsetHeight);
			}
			else {
				this.updateTumor(1);
			}
			this.ctx.closePath();
		}
		e.drawGraph();
	}
}
Util.Objects["neulastaE2"] = new function() {
	this.init = function(e) {
		var slider = u.ge("slider", e);
		slider.e = e;
		slider.picked = function() {u.e.resetEvents(u.ge("presentation"));}
		slider.moved = function() {
			if(this.element_x > 134) {
				u.addClass(this.e, "show");
			}
			else {
				u.removeClass(this.e, "show");
			}
		}
		u.e.drag(slider, new Array(0, 0, 416, 373), true, true);
	}
}
Util.Objects["neulastaE3"] = new function() {
	this.init = function(e) {
		var green_button = u.ge("green_button", e)
		green_button.e = e;
		green_button.clicked = function() {
			u.toggleClass(this.e, "green_graph");
		}
		u.e.click(green_button);
		var yellow_button = u.ge("yellow_button", e)
		yellow_button.e = e;
		var red_button = u.ge("red_button", e)
		red_button.e = e;
		yellow_button.clicked = function() {
			u.toggleClass(this.e, "yellow_graph");
		}
		u.e.click(yellow_button);
		red_button.clicked = function() {
			u.toggleClass(this.e, "red_graph");
		}
		u.e.click(red_button);
	}
}
Util.Objects["neulastaE4"] = new function() {
	this.init = function(e) {
		var clinical = u.ge("clinical", e);
		clinical.e = e;
		u.e.click(clinical);
		clinical.clicked = function() {
			u.removeClass(document.body, "track_b");
			u.removeClass(document.body, "p[0-9]");
			u.addClass(document.body, "p"+((-(-this.e.offsetLeft-1024)/ u.ge("presentation").slide_width)+1));
			u.e.transition(u.ge("presentation"), "all 1s ease-out");
			u.e.transform(u.ge("presentation"), -this.e.offsetLeft-1024, 0);
		}
		var economic = u.ge("economic", e);
		economic.e = e;
		u.e.click(economic);
		economic.clicked = function() {
			u.addClass(document.body, "track_b");
			u.removeClass(document.body, "p[0-9]");
			u.addClass(document.body, "p"+((-(-this.e.offsetLeft-1024)/ u.ge("presentation").slide_width)+1));
			u.e.transition(u.ge("presentation"), "all 1s ease-out");
			u.e.transform(u.ge("presentation"), -this.e.offsetLeft-1024, 0);
		}
	}
}
Util.Objects["neulasta1B"] = new function() {
	this.init = function(e) {
		var left_graph = u.ge("left_graph", e);
		left_graph.e = e;
		var right_graph = u.ge("right_graph", e);
		right_graph.e = e;
		var click_area_blue = u.ge("click_area_blue", e);
		click_area_blue.e = e;
		var click_area_red = u.ge("click_area_red", e);
		click_area_red.e = e;
		var click_area_orange = u.ge("click_area_orange", e);
		click_area_orange.e = e;
		var click_area_green = u.ge("click_area_green", e);
		click_area_green.e = e;
		e.shown = 0; 
		click_area_blue.clicked = function() {
			if(u.ge("blue", this.e)) {
				left_graph.removeChild(u.ge("blue", this.e));
				right_graph.removeChild(u.ge("blue", this.e));
				this.e.shown--;
			}
			else {
				left_graph.appendChild(document.createElement("div")).className = "blue";
				right_graph.appendChild(document.createElement("div")).className = "blue";
				this.e.shown++;
			}
			this.e.complete();
		}
		u.e.click(click_area_blue);
		click_area_red.clicked = function() {
			if(u.ge("red", this.e)) {
				left_graph.removeChild(u.ge("red", this.e));
				right_graph.removeChild(u.ge("red", this.e));
				this.e.shown--;
			}
			else {
				left_graph.appendChild(document.createElement("div")).className = "red";
				right_graph.appendChild(document.createElement("div")).className = "red";
				this.e.shown++;
			}
			this.e.complete();
		}
		u.e.click(click_area_red);
		click_area_orange.clicked = function() {
			if(u.ge("orange", this.e)) {
				left_graph.removeChild(u.ge("orange", this.e));
				right_graph.removeChild(u.ge("orange", this.e));
				this.e.shown--;
			}
			else {
				left_graph.appendChild(document.createElement("div")).className = "orange";
				right_graph.appendChild(document.createElement("div")).className = "orange";
				this.e.shown++;
			}
			this.e.complete();
		}
		u.e.click(click_area_orange);
		click_area_green.clicked = function() {
			if(u.ge("green", this.e)) {
				left_graph.removeChild(u.ge("green", this.e));
				right_graph.removeChild(u.ge("green", this.e));
				this.e.shown--;
			}
			else {
				left_graph.appendChild(document.createElement("div")).className = "green";
				right_graph.appendChild(document.createElement("div")).className = "green";
				this.e.shown++;
			}
			this.e.complete();
		}
		u.e.click(click_area_green);
		e.complete = function() {
			if(this.shown == 4) {
				u.addClass(this, "complete")
			}
			else {
				u.removeClass(this, "complete")
			}
		}
		Util.Objects.neulastaMoveOn.init(e);
	}
}
Util.Objects["neulasta2A1"] = new function() {
	this.init = function(e) {
		var m_a = u.ge("matchesA", e)
		m_a.m_b = u.ge("matchesB", e)
		u.e.drag(m_a, m_a, true);
		m_a.picked = function(event) {
			u.e.kill(event);
			u.e.resetEvents(u.ge("presentation"));
		}
		m_a.moved = function(event) {
			var input_x = event.targetTouches ? event.targetTouches[0].pageX : event.pageX;
			this.m_b.style.width = (input_x - 125) + "px";
		}
		Util.Objects.neulastaMoveOn.init(e);
	}
}
Util.Objects["neulasta2A12"] = new function() {
	this.init = function(e) {
		Util.Objects.neulastaMoveOn.init(e);
	}
}
Util.Objects["neulasta2B1"] = new function() {
	this.init = function(e) {
		var m_a = u.ge("matchesA", e)
		m_a.m_b = u.ge("matchesB", e)
		u.e.drag(m_a, m_a, true);
		m_a.picked = function(event) {
			u.e.kill(event);
			u.e.resetEvents(u.ge("presentation"));
		}
		m_a.moved = function(event) {
			var input_x = event.targetTouches ? event.targetTouches[0].pageX : event.pageX;
			this.m_b.style.width = (input_x - 125) + "px";
		}
		Util.Objects.neulastaMoveOn.init(e);
	}
}
Util.Objects["neulasta3A1"] = new function() {
	this.init = function(e) {
		var incidence = u.ge("incidence", e)
		incidence.e = e;
		u.e.click(incidence);
		incidence.clicked = function() {
			u.addClass(this.e, "slide_3_a_1_2");
		}
		var reduces = u.ge("reduces", e)
		reduces.e = e;
		u.e.click(reduces);
		reduces.clicked = function() {
			u.addClass(this.e, "slide_3_a_1_3");
		}
		var close_reduses = u.ge("close_reduses", e)
		close_reduses.e = e;
		u.e.click(close_reduses);
		close_reduses.clicked = function() {
			u.removeClass(this.e, "slide_3_a_1_3");
		}
		var close_incidence = u.ge("close_incidence", e)
		close_incidence.e = e;
		u.e.click(close_incidence);
		close_incidence.clicked = function() {
			u.removeClass(this.e, "slide_3_a_1_2");
		}
	}
}
Util.Objects["neulasta3A12"] = new function() {
	this.init = function(e) {
		Util.Objects.neulastaMoveOn.init(e);
	}
}
Util.Objects["neulasta3B1"] = new function() {
	this.init = function(e) {
		var hospital = u.ge("hospital", e)
		hospital.e = e;
		u.e.click(hospital);
		hospital.clicked = function() {
			u.addClass(this.e, "slide_3_b_1_2");
		}
		var antibio = u.ge("antibio", e)
		antibio.e = e;
		u.e.click(antibio);
		antibio.clicked = function() {
			u.addClass(this.e, "slide_3_b_1_4");
		}
		var close_hospital = u.ge("close_hospital", e)
		close_hospital.e = e;
		u.e.click(close_hospital);
		close_hospital.clicked = function() {
			u.removeClass(this.e, "slide_3_b_1_2");
		}
		var close_antibio = u.ge("close_antibio", e)
		close_antibio.e = e;
		u.e.click(close_antibio);
		close_antibio.clicked = function() {
			u.removeClass(this.e, "slide_3_b_1_4");
		}
	}
}
Util.Objects["neulasta3B13"] = new function() {
	this.init = function(e) {
		var pills = u.ge("pills", e)
		pills.e = e;
		pills.clicked = function() {
			u.toggleClass(this, "reduced");
		}
		u.e.click(pills);
		Util.Objects.neulastaMoveOn.init(e);
	}
}
Util.Objects["neulasta4a"] = new function() {
	this.init = function(e) {
		var couple = u.ge("couple", e)
		couple.e = e;
		var couple_text = u.ge("couple_text", e)
		couple_text.e = e;
		var nurse = u.ge("nurse", e)
		nurse.e = e;
		var nurse_text = u.ge("nurse_text", e)
		nurse_text.e = e;
		var doctor = u.ge("doctor", e)
		doctor.e = e;
		var doctor_text = u.ge("doctor_text", e)
		doctor_text.e = e;
		couple.clicked = function() {
			u.toggleClass(this.e, "couple_show");
		}
		u.e.click(couple);
		couple_text.clicked = function() {
			u.toggleClass(this.e, "couple_show");
		}
		u.e.click(couple_text);
		nurse.clicked = function() {
			u.toggleClass(this.e, "nurse_show");
		}
		u.e.click(nurse);
		nurse_text.clicked = function() {
			u.toggleClass(this.e, "nurse_show");
		}
		u.e.click(nurse_text);
		doctor.clicked = function() {
			u.toggleClass(this.e, "doctor_show");
		}
		u.e.click(doctor);
		doctor_text.clicked = function() {
			u.toggleClass(this.e, "doctor_show");
		}
		u.e.click(doctor_text);
	}
}
Util.Objects["neulasta6A_"] = new function() {
	this.init = function(e) {
		var anc = u.ge("anc", e)
		anc.e = e;
		var anc_arrow = u.ge("anc_arrow", e)
		anc_arrow.e = e;
		var fn = u.ge("fn", e)
		fn.e = e;
		var fn_arrow = u.ge("fn_arrow", e)
		fn_arrow.e = e;
		var rdi = u.ge("rdi", e)
		rdi.e = e;
		var rdi_arrow = u.ge("rdi_arrow", e)
		rdi_arrow.e = e;
		var survival = u.ge("survival", e)
		survival.e = e;
		anc.clicked = function() {
			u.toggleClass(this.e, "anc_show");
		}
		u.e.click(anc);
		anc_arrow.clicked = function() {
			if(u.ge("fn", this.e)) {
				u.addClass(this.e, "fn")
			}
			else {
				u.removeClass(this.e, "fn")
			}
		}
		u.e.click(anc_arrow);
		fn.clicked = function() {
			u.toggleClass(this.e, "fn_show");
		}
		u.e.click(fn);
		fn_arrow.clicked = function() {
			if(u.ge("rdi", this.e)) {
				u.addClass(this.e, "rdi")
			}
			else {
				u.removeClass(this.e, "rdi")
			}
		}
		u.e.click(fn_arrow);
		rdi.clicked = function() {
			u.toggleClass(this.e, "rdi_show");
		}
		u.e.click(rdi);
		rdi_arrow.clicked = function() {
			if(u.ge("survival", this.e)) {
				u.addClass(this.e, "survival")
			}
			else {
				u.removeClass(this.e, "survival")
			}
		}
		u.e.click(rdi_arrow);
		survival.clicked = function() {
			u.toggleClass(this.e, "survival_show");
		}
		u.e.click(survival);
	}
}
Util.Objects["neulasta7A"] = new function() {
	this.init = function(e) {
		var study_button = u.ge("study_button", e)
		study_button.e = e;
		var close_study_button = u.ge("close_study_button", e)
		close_study_button.e = e;
		study_button.clicked = function() {
			u.toggleClass(this.e, "show");
		}
		u.e.click(study_button);
		close_study_button.clicked = function() {
			u.removeClass(this.e, "show");
		}
		u.e.click(close_study_button);
	}
}
Util.Objects["neulasta8A"] = new function() {
	this.init = function(e) {
		var show_more = u.ge("show_more", e)
		show_more.e = e;
		show_more.clicked = function() {
			u.toggleClass(this.e, "show");
		}
		u.e.click(show_more);
	}
}
Util.Objects["neulasta9A"] = new function() {
	this.init = function(e) {
		var sweden = u.ge("sweden", e)
		sweden.e = e;
		var text = u.ge("text", e)
		text.e = e;
		sweden.clicked = function() {
			u.toggleClass(this.e, "sweden");
		}
		u.e.click(sweden);
		text.clicked = function() {
			u.removeClass(this.e, "sweden");
		}
		u.e.click(text);
	}
}
Util.Objects["moa1"] = new function() {
	this.init = function(e) {
		Util.Objects.neulastaMoveOn.init(e);
	}
}
Util.Objects["moa11"] = new function() {
	this.init = function(e) {
		var switch_area = u.ge("switch_area", e);
		u.e.click(switch_area);
		switch_area.clicked = function() {
			var id = u.getIJ(this, "id");
			u.addClass(u.ge(id), "show");
		}
	}
}
Util.Objects["videos"] = new function() {
	this.init = function(e) {
		var i, thumb;
		var thumbs = u.ges("thumb");
		var video = u.ge("video");
		for(i = 0; thumb = thumbs[i]; i++) {
			thumb.e = e;
			thumb.video = video;
			u.e.click(thumb);
			thumb.clicked = function() {
				this.video.src = u.getIJ(this, "src");
				this.video.load();
				this.video.play();
			}
		}
	}
}
Util.Objects["moa2"] = new function() {
	this.init = function(e) {
		var switch_area = u.ge("switch_area", e)
		switch_area.e = e;
		switch_area.clicked = function() {
			u.toggleClass(this.e, "show");
		}
		u.e.click(switch_area);
	}
}
Util.Objects["validdevice"] = new function() {
	this.init = function(e) {
		var wrapper = document.createElement("div");
		wrapper.className = "desktop_wrapper";
		var mask = document.createElement("div");
		mask.className = "desktop_mask";
		while(child = e.childNodes[0]) {
			mask.appendChild(child);
		}
		wrapper.appendChild(mask);
		e.appendChild(wrapper);
		var warning_displayed = u.getCookie("warning");
		if(!warning_displayed) {
			var warning = u.ae(e, "div", "warning");
			warning.innerHTML = "<h1>Warning</h1><p>This site is designed for touch interaction - using a pointer such as a mouse or trackpad might have unitented side effects. Move the mouse slowly when dragging to minimize errors.</p><p>Click to continue.</p>"
			u.e.click(warning);
			warning.clicked = function(event) {
				this.parentNode.removeChild(this);
				u.saveCookie("warning", "true");
			}
		}
	}
}

Util.saveCookie = function(name, value) {
	document.cookie = name + "=" + value +";"
}
Util.getCookie = function(name) {
	var matches;
	return (matches = document.cookie.match(name + "=([^;]+)")) ? matches[1] : false;
}
Util.delCookie = function(name) {
	document.cookie = name + "=;expires=Thu, 01-Jan-70 00:00:01 GMT";
}
