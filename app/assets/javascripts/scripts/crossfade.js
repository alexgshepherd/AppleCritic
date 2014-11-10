/**
* The old API calls usually look something like this:
* 	InitCrossFade('crossfade_2',
* 	'<a href="http://phobos.apple.com/WebObjects/MZStore.woa/wa/viewTVSeason?id=200649328&amp;s=143441" class="fader2"><img src="http://a1.phobos.apple.com/r10/Features/c1/4d/e9/dj.qctmxhhq.jpg" alt="Flavor of Love" width="248" height="140" border="0"></a>',
* 	'<a href="http://phobos.apple.com/WebObjects/MZStore.woa/wa/viewMovie?id=201202523&amp;s=143441" class="fader2"><img src="http://a1.phobos.apple.com/r10/Features/a0/d8/c2/dj.uddjpmoe.jpg" alt="25th Hour" width="248" height="140" border="0"><\/a>',
* 	'<a href="http://phobos.apple.com/WebObjects/MZStore.woa/wa/viewAlbum?id=200656424&amp;s=143441" class="fader2"><img src="http://a1.phobos.apple.com/r10/Features/28/77/8f/dj.exsxnhqu.jpg" alt="Lemony Snicket" width="248" height="140" border="0"><\/a>',
* 	'<a href="http://phobos.apple.com/WebObjects/MZStore.woa/wa/viewAlbum?id=201813288&amp;s=143441" class="fader2"><img src="http://a1.phobos.apple.com/r10/Features/55/d7/b2/dj.zfzfvwdz.jpg" alt="Robbie Williams" width="248" height="140" border="0"><\/a>'
* 	);
* 
* we're trying to get away from that format in favor of the blissfully simple:
*
* 	new AC.CrossfadeQueue(nodesArray, container, displayTime, queueName);
*
* where 
* - nodes is an array of HTML to crossfade between	
* - container is a reference to any block element to use as a container in the DOM
* - displayTime is a float specifying how long (in seconds) to hold when displaying each node
* - queueName is a specification for an independent animation queue
*
* 
* AC.CrossfadeQueue wraps this old call (see below) and deals with it but use the new call wherever possible
*
*
* TODO
* - create a generic crossfadable container object that you can make and drop into the queue?
*
* - there is still an occasional BUG on mouse out where the element can re-enter the queue after itself 
*   creating a double fade effect...
*
*/

// Custom additions to the Effect namespace in scriptaculous

Effect.Wait = Class.create();
Object.extend(Object.extend(Effect.Wait.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    if(!this.element) throw(Effect._elementDoesNotExistError);    
	var options = Object.extend({}, arguments[1] || {});
    this.start(options);
  }
});


if (typeof(AC) == "undefined") AC = {};


AC.CrossfadeQueue = Class.create();
AC.CrossfadeQueue.prototype = {
	nextIndex: 0, queue: null, container: null, scope: null, safetyDiv: null, delay: 6.0,
	fadeInTime: 0.5, fadeOutTime: 0.5,
	defaultQueueName: "defaultXFadeQueue",
	currentNode: null,
	stopped: false,
	
	pauseTimeStamp: null,
	
	initialize: function(nodes, container, delay, queueName, fadeInTime, fadeOutTime, delegate) {
		
		this.container = $(container);
		this.scope = container.toString();
		this.queue = $A(nodes);
	
		if (delay != null) this.delay = delay;
		
		if (queueName != null) this.defaultQueueName = queueName;
		if (fadeInTime != null) this.fadeInTime = fadeInTime;
		if (fadeOutTime != null) this.fadeOutTime = fadeOutTime;
		
		//when given an array of markup strings, empty out the container of
		//any placeholder elements
		if (typeof(this.queue[0]) == "string") {
			this.container.innerHTML = "";
		} else { 
			for (var i = 0; i < this.queue.length; i++) {
				$(this.queue[i]).remove();
			}
		}
		
		this.delegate = delegate;

		this.next();
		
	},
	
	pause: function() {
		this.pauseTimeStamp = new Date().getTime();
		var queue = Effect.Queues.get(this.defaultQueueName);

		// clear the animation's interval to stop it
		if (queue.interval) {
			clearInterval(queue.interval);
		}
		this.currentNode.setStyle({opacity: 1.0});
		
		//auto resume after some period 
		setTimeout(this.resume.bind(this), 2000);
	},

	stop: function() {
		this.stopped = true;
		this.pause();
	},
	
	play: function() {
		this.stopped = false;
		this.resume();
	},

	resume: function() {
		
		if (this.stopped || !this.pauseTimeStamp) {
			return;
		}

		var delay = new Date().getTime() - this.pauseTimeStamp;
		this.pauseTimeStamp = null;
		
		// kickstart the queue again, delaying each by however long the user has lingered...
		var queue = Effect.Queues.get(this.defaultQueueName);
		
		queue.each(function(e) {
			e.startOn  += delay;
		    e.finishOn += delay;
		});
		
		queue.interval = setInterval(queue.loop.bind(queue), 40);
	},
		
	next: function() {
		if (this.nextIndex > this.queue.length-1) {
			this.nextIndex = 0; // just to loop back to the start
		}
		
		
			var afterFinish = function(newNode) {
				return function() {
					if(this.currentNode) this.currentNode.remove();
					this.currentNode = newNode;
					
					this.nextIndex++;
					
					new Effect.Wait( this.currentNode, { duration: this.delay, 
						queue: {
							position:'end', 
							scope: this.defaultQueueName},
							
						afterFinish: this.next.bind(this)
					});
				}
			}

		
		if (this.currentNode) {
			
			//ensure current node is on top
			this.currentNode.setStyle({zIndex: '2'});
			//insert new node below
			var newNode = this.createNode();
			
			
			//Consult the delegate
			var shouldDisplayNext = true;
			if(this.delegate && this.delegate.crossfadeQueueWillDisplayNextItem) {
				shouldDisplayNext = this.delegate.crossfadeQueueWillDisplayNextItem(this,newNode);
			}

			if(shouldDisplayNext === false || (newNode === this.currentNode)) {
				afterFinish(newNode).bind(this);
				return;
			}
			else {
				new Effect.Opacity(this.currentNode, { duration: this.fadeOutTime, 
					transition: Effect.Transitions.linear, 
					from: 1.0, to: 0.0, // queue: { position:'end', scope: this.defaultQueueName },
					afterFinish: afterFinish(newNode).bind(this)
				});
			}
			
	 	} else {
			//no node yet, so create one
			this.currentNode = this.createNode();
			
			if(this.delegate && this.delegate.crossfadeQueueWillDisplayNextItem) {
				shouldDisplayNext = this.delegate.crossfadeQueueWillDisplayNextItem(this,this.currentNode);
			}
			if(shouldDisplayNext === false) {
				this.currentNode = null;
				this.nextIndex++;
				this.next();
				return;
			}
			else {

				this.nextIndex++;

				new Effect.Wait(this.currentNode, { duration: this.delay, 
					queue: {
						position:'end', 
						scope: this.defaultQueueName},
						
					afterFinish: this.next.bind(this)
				});
			}

		}
	},
	
	createNode: function() {
		do {
			var node = this.queue[this.nextIndex];
				
			var shouldCreateNode = true;
			if(typeof(node) == 'string') {
				node = document.createElement('div');
				node.innerHTML = this.queue[this.nextIndex];
				this.queue[this.nextIndex] = node; //replace so we don't need to do this everytime
				node.isCreated = true;
			}
			else if(typeof node.isCreated === "undefined") {
				if(this.delegate && this.delegate.crossfadeQueueShouldCreateNode) {
					shouldCreateNode = this.delegate.crossfadeQueueShouldCreateNode(this,node);
				}
				if(shouldCreateNode === false) {
					this.queue.splice(this.nextIndex,1)
					this.nextIndex++;
					if (this.nextIndex > this.queue.length-1) {
						this.nextIndex = 0; // just to loop back to the start
					}
				}
				else {
					node.isCreated = true;
				}
			}
		} while(!shouldCreateNode && this.nextIndex<this.queue.length)
		
		node = $(node);
		node.setStyle({position: 'absolute', opacity: 1.0, zIndex: 1.0});
		node.addClassName('ACCrossfadeQueueElement');
		
		node.onmouseover = this.pause.bind(this);
		node.onmouseout = this.resume.bind(this);
		
		this.container.appendChild(node);
		
		return node;
	}
}

// maintains the old API, called with a DOM object as the first arg
// then 1 or more HTML snippets as strings
function InitCrossFade() {
	if(arguments.length > 0) {		
		var nodes = $A(InitCrossFade.arguments);
		var objectReference = nodes.shift();
		var holdTime = (typeof(nodes[nodes.length-1]) == "number") ? nodes.pop(): Math.floor(Math.random()*5) + 3;
		
		new AC.CrossfadeQueue(nodes, objectReference, holdTime); // last arg is queue name		
	}
}
