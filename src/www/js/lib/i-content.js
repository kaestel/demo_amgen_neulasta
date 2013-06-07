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

		// initialize sliders
		e.sl_a = u.ge("sliderA", e);
		u.e.transform(e.sl_a, 0, 0)
		// no dragging for slider a
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

		// remember e
		e.sl_a.e = e.sl_b.e = e.sl_c.e = e.sl_d.e = e.sl_e.e = e;

		// avoid double drag
		var no_drag = u.ge("no_drag", e);
		no_drag.e = e;
		u.e.drag(no_drag, no_drag, true);
		no_drag.picked = e.sl_a.picked = e.sl_b.picked = e.sl_c.picked = e.sl_d.picked = e.sl_e.picked = function(event) {
//			u.bug(this.className);
			u.e.kill(event);
			u.e.resetEvents(this.e.p);
			u.addClass(this, "move");
		}

		no_drag.clickMoved = function() {
			u.e.resetEvents(this.e.p);
		}
		u.e.click(no_drag);

		e.sl_a.dropped = e.sl_a.picked = function() {
//			u.bug("drop")
			u.e.resetEvents(this.e.p);
		}
		

		// start update cycle when slider is moved
		e.sl_b.moved = e.sl_c.moved = e.sl_d.moved = e.sl_e.moved = function() {
			this.e.moveSlider(this);
			this.e.drawGraph();
		}
		// remove slider state, when slider is dropped
		e.sl_a.dropped = e.sl_b.dropped = e.sl_c.dropped = e.sl_d.dropped = e.sl_e.dropped = function() {
			u.removeClass(this, "move");
		}

		// execute chained movement
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

		// update tumor
		e.tumor = u.ge("tumor", e);
		e.updateTumor = function(scale) {
			this.tumor.style.MozTransform = "scale(" + (1-scale) + ")";
			this.tumor.style.webkitTransform = "scale(" + (1-scale) + ")";
		}

		// dose reduction
		e.r = u.ge("reduction", e);
		e.r.e = e;
		u.e.drag(e.r, e.r, true);
		e.r.picked = function(event) {
			u.e.kill(event);
			u.e.resetEvents(this.e.p);
		}

		// reduction factor index
		e.r_f_i = 0;
		// reduction factors
		e.r_f = new Array();
		e.r_f[0] = [75, 10];
		e.r_f[1] = [67.5, 9];
		e.r_f[2] = [63.75, 8.5];
		e.r_f[3] = [60, 8];
		e.r_f[4] = [56.25, 7.5];

		// dose reduction slider
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

		// graph (canvas drawing)
		e.graph = u.ge("graph", e);
		e.graph.e = e;

		// no dragging
		e.graph.clickMoved = function() {
			u.e.resetEvents(this.e.p);
		}
		u.e.click(e.graph);

		e.graph.width = e.graph.offsetWidth;
		e.graph.height = e.graph.offsetHeight;

		e.ctx = e.graph.getContext("2d");
		e.ctx.strokeStyle = "#006cb6";
		e.ctx.lineWidth = 2;

		// up factor
		e.u_f = 100/25;

		// canvas draw graph
		// manually draws line between sliders
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

			// if cy is still inside viewable area, continue line
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
		/*
		var matches = u.ge("matches", e)
		matches.e = e;
		matches.clicked = function() {
			u.toggleClass(this.e, "ice");
		}
		u.e.click(matches);
		*/
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
		
		/*
		var matches = u.ge("matches", e)
		matches.e = e;
		matches.clicked = function() {
			u.toggleClass(this.e, "ice");
		}
		u.e.click(matches);
		*/
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
/*
Util.Objects["moaVideo"] = new function() {
	this.init = function(e) {
		var dvideo_a = u.ge("dvideo_a", e);
		dvideo_a.e = e;
		u.e.click(dvideo_a);
		dvideo_a.clicked = function() {
			u.bug("dvideo_a clicked")
			if(u.ge("canvas", this.e).className.match(/video_b/i)) {
				u.removeClass(u.ge("canvas", this.e), "video_b");
				var o_video = u.ge("video", u.ge("dvideo_b", this.e));
				o_video.pause();
			}
			if(u.ge("canvas", this.e).className.match(/video_a/i)) {
				u.removeClass(u.ge("canvas", this.e), "video_a");
				this.firstChild.pause();
			}
			else {
				u.addClass(u.ge("canvas", this.e), "video_a");
				var video = u.ge("video", this);
				video.src = "video/animation_a.mp4";
				video.load();
				video.play();
			}
		}

		var dvideo_b = u.ge("dvideo_b", e);
		dvideo_b.e = e;
		u.e.click(dvideo_b);
		dvideo_b.clicked = function() {
			u.bug("dvideo_b clicked")
			if(u.ge("canvas", this.e).className.match(/video_a/i)) {
				u.removeClass(u.ge("canvas", this.e), "video_a");
				var o_video = u.ge("video", u.ge("dvideo_a", this.e));
				o_video.pause();
			}
			if(u.ge("canvas", this.e).className.match(/video_b/i)) {
				u.removeClass(u.ge("canvas", this.e), "video_b");
				this.firstChild.pause();
			}
			else {
				u.addClass(u.ge("canvas", this.e), "video_b");
				var video = u.ge("video", this);
				video.src = "video/animation_b.mp4";
				video.load();
				video.play();
			}
		}

	}
}
*/

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