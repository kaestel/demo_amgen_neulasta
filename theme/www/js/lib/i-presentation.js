Util.Objects["presentation"] = new function() {
	this.init = function(e) {
		var slide, nav_index, nav_references, nav_track, i, tracks, o, ref, refs, track, li;
		// get presentation elements
		e.display = u.ge("display");
		e.slides = u.ges("slide");
		e.nav = u.ge("navigation")
		// calculate presentation sizes
		e.slide_width = e.slides[0].offsetWidth;
		e.display_width = e.display.offsetWidth;

		e.w = (e.slides.length * e.display_width);
		e.style.width = e.w + "px";

		e.h = e.display.offsetHeight;

		// initialization of presentation navigation

		// regular H2 based navigation
		nav_index = u.ge("index", e.nav);
		if(nav_index) {
			nav_index.e = e;
			nav_index.clicked = function() {u.toggleClass(this.e.nav, "index");}
			u.e.click(nav_index);
			e.nav_index = e.nav.appendChild(document.createElement("ul"));
			u.addClass(e.nav_index, "index");
		}
		// regular H2 based navigation
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
	//					u.ge("progress").className = "progress p"+((this.slide.offsetLeft/this.e.slide_width)+1);

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
		// initialize slides
		for(i = 0; slide = e.slides[i]; i++) {

			slide.style.width = e.slide_width+"px";
			u.addClass(slide, "ready");

			if(e.nav_index && u.ge("h2", slide)) {

//				if(i == 4 || i == 8 || i == 12) {
//					e.index = e.nav.appendChild(document.createElement("ul"));
//				}
				tracks = u.ges("track", slide);

//				u.bug(2, "tr:"+ tracks);
				if(tracks.length) {

					for(o = 0; track = tracks[o]; o++) {
//						u.bug(2, track.className);
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
//							u.ge("progress").className = "progress p"+((this.slide.offsetLeft/this.e.slide_width)+1);

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
//					u.bug(2, slide.className);
					li = e.nav_index.appendChild(document.createElement("li"));
					li.innerHTML = u.ge("h2", slide).innerHTML;
					li.e = e;
					li.slide = slide;

					li.clicked = function() {
						u.e.transition(this.e, "all 1s ease-out");
						u.e.transform(this.e, -this.slide.offsetLeft, 0);

						u.removeClass(document.body, "p[0-9]");
						u.addClass(document.body, "p"+((this.slide.offsetLeft/this.e.slide_width)+1));
//						u.ge("progress").className = "progress p"+((this.slide.offsetLeft/this.e.slide_width)+1);

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
//			u.ge("progress").className = "progress p"+(-current_slide+1);
		}
		e.swipedRight = function() {
			current_slide = Math.floor(this.element_x/this.display_width)+1;
//			current_slide = Math.floor(this.element_x/this.display_width);
			eta = Math.abs(Math.round((((current_slide * this.display_width) - this.element_x) / this.current_xps) * 10) / 10);
			eta = eta > 0.5 ? 0.5 : eta < 0.2 ? 0.2 : eta;
			u.e.transition(this, "all "+eta+"s ease-out");
//			u.e.transform(this, (current_slide+1)*this.display_width, 0);
			u.e.transform(this, current_slide*this.display_width, 0);
			u.removeClass(document.body, "p[0-9]");
			u.addClass(document.body, "p"+(-current_slide));
		}

		u.e.swipe(e, new Array(e.display.offsetWidth - e.w, 0, e.w, e.h));

		// goto slide
		if(u.getVar("slide")) {
			u.e.transition(e, "all 0.5s ease-out");
			u.e.transform(e, -((u.getVar("slide")-1)*e.display_width), 0);
			u.removeClass(document.body, "p[0-9]");
			u.addClass(document.body, "p"+(u.getVar("slide")-1));
		}

	}
}
