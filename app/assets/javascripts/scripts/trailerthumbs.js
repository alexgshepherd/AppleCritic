preload = function(imageUrls) {
	if (document.images) {
		imagePreload = new Image();
		for (var i=0; i<imageUrls.length; i++) {
			imagePreload.src = imageUrls[i];
		}
	}
};
TrailerThumbs = Class.create();
TrailerThumbs.prototype = {
	
	initialize: function() {},
	
	createNodes: function(trailer) {
		var hovercontent = [];
		
		var title = trailer.getElementsByTagName('h3')[0];
		var details = trailer.getElementsByTagName('p')[0];
		var trailerList = trailer.getElementsByTagName('ul')[0];

		hovercontent.push(title);
		hovercontent.push(details);
		hovercontent.push(trailerList);
		
		var hover = document.createElement('div');
		Element.addClassName(hover, 'hover');
		hover.setStyle({display: 'none'});
		
		var contentContainer = document.createElement('div');
		Element.addClassName(contentContainer, 'hovercontent');
		
		for (var i = 0; i < hovercontent.length; i++) {
			
			hovercontent[i].parentNode.removeChild(hovercontent[i]);
			contentContainer.appendChild(hovercontent[i]);
		}
		
		//need to leave the title in place in the main listing
		trailer.appendChild(title.cloneNode(true));
		
		hover.appendChild(contentContainer);
		
		var bottom = document.createElement('div');
		Element.addClassName(bottom, 'hovercontentbottom');
		hover.appendChild(bottom);
				
		var posterLink = trailer.getElementsByTagName('a')[0];
		trailer.insertBefore(hover, posterLink.nextSibling);

		// add events
		trailer.timeout = null;
		Event.observe(trailer, 'mouseover', this.mouseover.bind(this, trailer, hover), false);
		Event.observe(trailer, 'mouseout', this.mouseout.bind(this, trailer, hover), false);
	},
	
	mouseover: function(trailer, hover) {
		// clear timeout if it's running
		if (trailer.timeout) { 
			clearTimeout(trailer.timeout);
			trailer.timeout = false;
		}
		trailer.timeout = setTimeout(this.show.bind(hover), 120);
	},
	
	mouseout: function(trailer, hover) {
		if (trailer.timeout) { 
			clearTimeout(trailer.timeout);
			trailer.timeout = null;
		}
		trailer.timeout = setTimeout(this.hide.bind(hover), 30);
	},
	
	show: function() {
		Effect.Appear(this, {
			duration: 0.2, 
			beforeStart: function() {
				this.style.zIndex = '10';
			}.bind(this.parentNode)});
	},
	
	hide: function() {
		Effect.Fade(this, {
			duration: 0.1, 
			afterFinish: function() {
				this.style.zIndex = '0';
			}.bind(this.parentNode)});
	}
};

/*Event.observe(window, 'load', function() {
	preload(['http://trailers.apple.com/trailers/images/hovercontent_bottom.png', 'http://trailers.apple.com/trailers/images/hovercontent_top.png', 'http://trailers.apple.com/trailers/images/hovercontent_arrow.gif']);
	thumbFactory = new TrailerThumbs();
}, false);*/
thumbFactory = null;
