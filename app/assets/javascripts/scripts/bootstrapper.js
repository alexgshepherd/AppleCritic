if (typeof(AC) == 'undefined') { AC = {}; }
if (typeof(AC.Detector) == 'undefined') { AC.Detector = {}; }

AC.bootstrapper = Class.create({
	options: {
		calls: [
			'globalfooter',
			'productheaders',
			'playlists',
			'scripts'
		],

		includes: {
			globalfooter: {
				container: 'globalfooter',
				paths: {
					'ipad': '/trailers/global/includes/globalfooter_ipad.inc',
					'itunes': '/trailers/global/includes/globalfooter.inc',
					'else': '/trailers/global/includes/globalfooter.inc'
				}
			},
			productheaders: {
				container: 'productheader',
				paths: {
					'ipad': '/trailers/global/includes/productheader_ipad.inc',
					'itunes': '/trailers/global/includes/productheader.inc',
					'else': '/trailers/global/includes/productheader.inc'
				}
			},
			playlists: {
				container: 'trailers',
				paths: {
					'ipad': 'includes/playlists/ipad.inc',
					'itunes': 'includes/playlists/itunes.inc',
					'else': 'includes/playlists/web.inc'
				}
			},
			scripts: {
				container: 'head',
				paths: {
					'ipad': '/trailers/global/includes/scripts_ipad.inc',
					'itunes': '/trailers/global/includes/scripts_itunes.inc',
					'else': '/trailers/global/includes/scripts_trailers.inc'
				}
			}
		}
	},

	whatIs: 'else',
	hasRun: {},

	initialize: function(options) {
		if(!options) options = {};
		Object.extend(this.options,options);

		if (navigator.userAgent.match(/AppleWebKit/i) && navigator.userAgent.match(/Mobile/i)){
		//if(1 == 1) {
			this.whatIs = 'ipad';
			AC.Detector._isIpad = true;

			window.onorientationchange = function(){this.setOrientation(window.orientation); }.bind(this);
		} else if(navigator.userAgent.match('iTunes')){
			AC.Detector._isItunes = true;
			AC.Detector._isItunes9 = (navigator.userAgent.match('iTunes/9'))? true : false;

			this.whatIs = 'itunes';
		} else {
			this.whatIs = 'else';
		}


		this.triggerReady();
		Event.onDOMReady(function() { this.domReady(); }.bind(this));
	},

	triggerReady: function(){
		if ( this.checkHasRun() ){
			var fireReady = function(){ document.fire('bootstrap:finished'); }
			fireReady.delay(.05);
		} else {
			this.triggerReady.bind(this).delay(.05);
		}
	},

	checkHasRun: function(){
		var bool = true;

		this.options.calls.each(function(call){
			bool = (this.hasRun[call]) ? true : false;
			if(bool === false) { throw $break; }
		}.bind(this));
		
		return bool;
	},

	setOrientation: function(angle){
		if(angle == 0 || angle == 90 || angle == -90 || angle == 180){
			document.body.removeClassName('angle' + this.orientation);
			document.body.addClassName('angle' + angle);
			this.orientation = angle;
		}
	},

	addInclude: function(call, container, fadein){
		var inc = this.options.includes[call].paths;
		inc = inc[this.whatIs];
		
		new Ajax.Request(inc, {
			'method': 'get',
			'onComplete': function(e){
				if(fadein) container.setOpacity(0);

				if(container) container.insert(e.responseText);
				else $$('head')[0].insert(e.responseText);
				
				this.hasRun[call] = true;

				if(fadein) container.appear({ duration: .4 });
			}.bind(this)
		});
	},
	
	domReady: function(){
		if(this.whatIs != 'else') document.body.addClassName(this.whatIs);
		this.setOrientation(window.orientation);
		
		
		this.options.calls.each(function(call){
			if(this.options.includes[call]){
				var container = (this.options.includes[call].container == 'head' || this.options.includes[call].container === false) ? false : this.options.includes[call].container;
				if(container !== false) { container = ($(container) == undefined) ? $$(container)[0] : $(container); }

				var fadein = (container === false || this.options.includes[call].fadein === false) ? false : true;

				this.addInclude(call, container, fadein);
			}
		}.bind(this));
	}
});
