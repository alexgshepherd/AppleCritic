// = Apple.com SwapView Library =
//
// Library for swapping between content in a single container element
// by triggers in the document, programmatically, or automatically over time.
if (typeof(AC) === 'undefined') { AC = {}; }

if (typeof(document.event) === 'undefined') { document.event = {}; }

if (Event.Publisher) { Object.extend(document.event, Event.Publisher); }

// == AC.SwapView ==
//
// Class that manages inserting, replacing, and removing content from a single
// element in the DOM.
//
// ==== Delegate Methods ====
// * {{{willClose(swapView, currentContent)}}}: The swap view is about to
//      swap out the specified content.
//
// * {{{isContentLoaded(swapView, content)}}}: Is the specified content
//      loaded and ready for insertion into the DOM?
//
// * {{{loadContent(swapView, content)}}}: Load the specified content such that
//      it is displayable within the DOM. The delegate is expected to call
//      {{{setLoadedContent}}} when finished to let the swapView know when
//      the content is ready.
//
// * {{{didAppendContent}}}
// 
// * {{{shouldAnimateContentChange}}}
// 
// * {{{willAnimate}}}
// 
// * {{{didShow}}}
AC.SwapView = Class.create({

    _view: null,
    currentContent: null,
    delegate: null,

    // ** {{{AC.SwapView.initialize(view)}}}
    //
    // Initializes a swap view object that will allow swapping content within
    // the specified {{{view}}} element.
    // 
    // {{{view}}}: the element or ID of an element to interact with.
    // This element will have the classname {{{swapView}}} appended.
    initialize: function(view)
    {
        if(typeof view === "string") {
            this._viewId = view;
        } else {
            this._view = $(view);
            this._resetView();
        }

    },

    // ** {{{AC.SwapView.view()}}}
    // 
    // Returns the receiver's view element or null if there is none available.
    view: function()
    {
        if (!this._view) {
            this._view = $(this._viewId);
            this._resetView();
        }
        return this._view;
    },

    // Removes child nodes from the view and applies any relevant classNames
    _resetView: function()
    {
        if (!this._view) {
            return;
        }

        var childNodes = this._view.childNodes, aChildNode;
        while (aChildNode = childNodes[0]) {
            this._view.removeChild(aChildNode);
        }
        this._view.addClassName('swapView');
    },

    // ** {{{AC.SwapView.setDelegate(delegate)}}} **
    //
    // Sets the delegate of the receiver.
    // 
    // {{{delegate}}}: The object to set as the receiver's delegate
    setDelegate: function(delegate)
    {
        this.delegate = delegate;
    },

    // ** {{{AC.SwapView.setContent(content)}}} **
    // 
    // Initiates showing the specified content in the receiver's view element.
    // 
    //  {{{content}}}: The content to show in the receiver's view element.
    // 
    // 
    // If there is any current content the delegate will receive
    // a {{{willClose}}} message.
    // 
    // If content is specified and there is no delegate, or if content is
    // provided and the delegate reports {{{isContentLoaded}}} as true, then
    // setLoadedContent is immediatley called to actually load the content
    // into the view.
    // 
    // If content is specified but the delegate reports {{{isContentLoaded}}}
    // as false the delegate is sent the {{{loadContent}}} message. It is
    // then up to the delegate to load the content and call
    // {{{setLoadedContent}}}.
    setContent: function(content)
    {
        if (content === this.currentContent) {
            return;
        }

        if (this.currentContent && typeof(this.delegate.willClose) === 'function') {
            this.delegate.willClose(this, this.currentContent);
        }

        if (content && typeof(this.delegate.isContentLoaded) === 'function') {
            if (!this.delegate.isContentLoaded(this, content)) {
                if (typeof(this.delegate.loadContent) === 'function') {
                    this.delegate.loadContent(this, content);
                    // Stop if delegate needs to actually load content
                    return;
                }
            }
        }
        this.setLoadedContent(content);
    },

    // ** {{{AC.SwapView.setLoadedContent(content)}}} **
    //
    // Actually shows the specified content in the receiver's view element.
    //
    //  {{{content}}}: The content to show in the receiver's view element.
    //
    // If the delegate responds to {{{shouldAnimateContentChange}}} as true,
    // it is usually a good idea to position the content of the swap view
    // absolutley so the animations have free reign to position and animate
    // the content.
    //
    // willClose is called when initiating a content swap so we can inform
    // a section it's about to close prior to trying to load the remote content
    // which can take a while and make this feel slower than it is.
    //
    // This does mean that if the new content fails to load we need to handle
    // that pretty well becasue the existing content was already told it was
    // going to close.
    //
    // //TODO//
    // Additionally you will only get the willClose call by going through
    // setContent. This indicates to me that setLoadedContent should never
    // be exposed as part of the public API. I'd suggest prefixing
    // it with an underscore to purvey the "private" nature of this method.
	setLoadedContent: function(content) {

        if (typeof(this.delegate.willShow) === 'function') {
            content = this.delegate.willShow(this, this.currentContent, content);
        }

        var shouldAnimate = true,
            animation;
        if (typeof(this.delegate.shouldAnimateContentChange) === 'function') {
            shouldAnimate = this.delegate.shouldAnimateContentChange(this, this.currentContent, content);
        }

        if (shouldAnimate && typeof(this.delegate.willAnimate) === 'function') {
            //While animating we can assume we'll need both outgoing and
            //incoming content in the view at the same time, so just
            //append the incoming content prior to the animation

            //Note that in this case the content of the swapview should be
            //positioned absolutely so we can layer them on top of each other
            //if you can't accommodate that then respond with a false for
            // shouldAnimateContentChange in your delegate and you'll rely
            // on the immediate swapping
            this.didAnimate = true;
            if (this.view() && content && this.currentContent !== content) {
                this.view().appendChild(content);
            }

            if (typeof(this.delegate.didAppendContent) === 'function') {
                this.delegate.didAppendContent(this, content);
            }

            animation = this.delegate.willAnimate(this, this.currentContent, content, this.didShow.bind(this, content));
        } else {

            this.didAnimate = false;
            //With no animation we don't assume both nodes are ever in the view at the same time
            //so remove the current content before appending the incoming content
            if(this.currentContent !== content) {
                if (this.currentContent && this.currentContent.parentNode) {
                    this.currentContent.parentNode.removeChild(this.currentContent);
                }

                if(content) {
                    this.view().appendChild(content);
                }

                if (typeof(this.delegate.didAppendContent) === 'function') {
                    this.delegate.didAppendContent(this, content);
                }
            }

            if(content) {
                $(content).setOpacity(1.0);
            }

            this.didShow(content);
        }
    },

    // ** {{{AC.SwapView.didShow(content)}}} **
    //
    // Acknowledges the reciever did show the specified content.
    // 
    // {{{content}}}: The content that has just been shown.
    // 
    // This is done immediately after the content was inserted with no
    // animation or immediately after the animation has finished.
    didShow: function(content)
    {
        //Pull the existing content out of the DOM, if it hasn't been already
        if (this.currentContent && (this.currentContent !== content) && this.currentContent.parentNode) {
            this.currentContent.parentNode.removeChild(this.currentContent);
        }

        if (typeof(this.delegate.didShow) === 'function') {
            this.delegate.didShow(this, this.currentContent, content);
        }

        this.currentContent = content;
    }

});


// == AC.ViewMaster ==
//
// The ViewMaster listens for triggers being activated on the page to show
// the trigger's content inside a {{{swapView}}}
//
//
// === Delegate Methods & Notifications ===
// * {{{willShow(sender, outgoingView, incomingView)}}} method and {{{ViewMasterWillShowNotification}}} event
//
// * {{{didShow(sender, outgoingView, incomingView)}}} method and {{{ViewMasterDidShowNotification}}} event
//
// * {{{willClose(sender, outgoingView, incomingView)}}} method and {{{ViewMasterWillCloseNotification}}} event
//
// * {{{shouldAnimateContentChange(sender, outgoingView, incomingView)}}} method
//
// * {{{willAnimate(sender, outgoingView, incomingView, afterFinish, queueScope)}}} method
//
// * {{{didAppendContent(sender, content)}}} method
if (typeof(AC.ViewMaster) === 'undefined') { AC.ViewMaster = {}; }

AC.ViewMaster.Viewer = Class.create({
    view: null,
    triggerClassName: null,
    currentSection: null,
    requestedSection: null,
    sections: null,
    orderedSections: null,

    _locked: false,
    _didShowInitial: false,

    options: null,

    // ** {{{AC.ViewMaster.Viewer.initialize(contents, view, triggerClassName, options)}}} **
    //
    // Initializes a new ViewMaster instance.
    //
    // {{{contents}}}: The elements to make available for swapping in and out
    // of the viewmaster. Can be, and often is, set to null for lazy and remote loading.
    //
    // {{{view}}}: The view element to use for swapping content into and out of.
    //
    // {{{triggerClassName}}}: The class name trigger links are expected to have.
    // Each ViewMaster instance on a document needs to have its own unique
    // triggerClassName.
    //
    // {{{options}}}: optional associative array of configuration options
    //
    //
    // TODO the animation stuff should probably be moved out into the swap_view...
    //
    // === Allowed Options ===
    // * {{{triggerEvent}}}: The name of the event to listen for from valid
    //   triggers.
    //
    // * {{{initialId}}}: The Id of the initial section to load and show.
    //   Note that this is overridden if an id is specified in the URL hash.
    //   If neither is found, the first section discovered in {{{contents}}}
    //   is shown initially.
    //
    // * {{{silentTriggers}}}: Whether or not to suppress following activated
    //   triggers such that their #target does not appear in the URL.
    //
    // * {{{sectionRegExp}}}: The regex to use when trying to identify the
    //   section specified in the trigger's href attribute.
    // 
    // * {{{ensureInView}}}: Whether or not to ensure a section is made
    //   visible in the viewport if it wouldn't normally be within the
    //   viewport after opening.
    //
    // * {{{shouldAnimateContentChange}}}: Whether or not to animate content
    //   transitions.
    //
    // * {{{animationDuration}}}: The duration of the default animation.
    // 
    // * {{{silentPreviousSelection}}}: Whether or not to suppress
    // triggers of the form href="SwapViewPreviousSelection" to show the
    // previous selection
    initialize: function(contents, view, triggerClassName, options)
    {
        if (triggerClassName) {
            this.triggerClassName = triggerClassName;
        }
        this.sections = $H();
        this.orderedSections = [];

        this.options = options || {};
        this.silentPreviousSelection(this.options.silentPreviousSelection);

        this.triggerEvent = this.options.triggerEvent || 'click';

        var initialSection = null,
            section,
            i;
        if (contents) {
            for (i = 0; i < contents.length; i++) {
                //contents could be a NodeList, so we're going to use that API
                //I added an item method to Array in apple_core
                section = this.addSection(contents.item(i));

                if (!initialSection) {
                    initialSection = section;
                }
            }
        }
        //Moved down to workaround a bug: in Safari, the results of getElementsByClassName is a NodeList.
        //If we do new AC.SwapView(view) before looping on the NodeList, the NodeList get emptied....
        this.view = new AC.SwapView(view);
        this.view.setDelegate(this);

        var hashInitialId = document.location.hash,
            hashSection,
            hashSectionIdMatch;

        this.sectionRegExp = this.options.sectionRegExp || new RegExp(/#(.*)$/);

        // TODO the default regex may need some stricter ending, much like the trigger matching

        // Inspect the URL for what appears to be the specified section ID according to the sectionRegExp
        hashSectionIdMatch = hashInitialId.match(this.sectionRegExp);

        if (hashSectionIdMatch && hashSectionIdMatch[1]) {
            // if we find a group that matches the id within the hash, use it as the id
            hashInitialId = hashSectionIdMatch[1];
        }

        if (hashInitialId !== this.view._viewId) {

            // To prevent loading an arbitrary element into the viewmaster
            // check to see if any of the valid triggers on the page at this 
            // time reference that id
            // if no triggerlinks reference this id, we ignore this initial id
            // TODO determine effect on remote sections which may not have
            // triggers linking to them in the page yet
            // Theoretically you can still show a section with no referencing
            // triggers manually, this jsut prevents false positives
            var triggerLinks = document.getElementsByClassName(this.triggerClassName),
                trigger;
            for (i = 0, trigger; (trigger = triggerLinks[i]); i++) {
                if (trigger.getAttribute('href').match(new RegExp("#" +hashInitialId+ "(?![\_\w\-])"))) {

                    hashSection = this.sectionWithId(hashInitialId);

                    if (hashSection) {
                        initialSection = hashSection;
                    }

                    break;
                }
            }
        }

        // If no section requested or found from the id in the URL hash,
        // but one was requested via the options parameter, load that one
        if (!hashSection && typeof this.options.initialId === "string" && this.options.initialId.length > 0) {
            initialSection = this.sectionWithId(this.options.initialId);
        }

        //TODO do we want to show the initial section right away? seems like
        // we have to but if no delegates are set yet this will be a bit 
        // different than subsequent calls to show
        this.show(initialSection);

		// If there is more than one type of trigger event observe all
		// If there's a better way to do this, let me know
		if (typeof this.triggerEvent === 'object') {
			for (var i=0, evt; evt = this.triggerEvent[i]; i++) {
				Event.observe(document, evt, this._triggerClicked.bindAsEventListener(this));
			}
		} else {
			Event.observe(document, this.triggerEvent, this._triggerClicked.bindAsEventListener(this));
		}
		
		//In IE click event isn't sent when there is no text/image physically under the mouse, but the mouseup is, so we need to listen to that
        // TODO so is this behavior preserved when the event is something other than click?
        if (AC.Detector.isIEStrict()) {
            Event.observe(document, 'mouseup', this._triggerClicked.bindAsEventListener(this));
        }

        //To allow event based section selection
        if (typeof(this.listenForEvent) === 'function') {
            this.selectSectionFromEventHandler = this.selectSectionFromEvent.bind(this);
            this.listenForEvent(AC.ViewMaster, 'ViewMasterSelectSectionWithIdNotification', true, this.selectSectionFromEventHandler);
            this.listenForEvent(AC.ViewMaster, 'ViewMasterWillShowNotification', true, this.stopMovieIfItsPlaying);
            this.listenForEvent(document.event, 'replayMovie', false, this.stopMovieIfItsPlaying.bind(this));

            if (this.options.parentSectionId) {
                this.listenForEvent(AC.ViewMaster, 'ViewMasterWillCloseNotification', false, function(evt) {
                    var data = evt.event_data.data;

                    if(this === data.sender) {
                        return;
                    }

                    if(data.outgoingView && data.outgoingView.id === this.options.parentSectionId) {
                        this.willClose(this.view,this.currentSection);
                    }
                });
            }
        }
    },

    // ** {{{AC.ViewMaster.Viewer.initialSectionFromId(initialId)}}} **
    //
    //
    // //TODO I really don't understand why this is a publicly exposed function...//
    initialSectionFromId: function(initialId)
    {
        return this.sectionWithId(initialId);
    },

    // ** {{{AC.ViewMaster.Viewer.sectionWithId}}} **
    //
    sectionWithId: function(sectionId)
    {
        if(!sectionId) {
            return null;
        }

        var section = null;
        if (sectionId && this.sections.get(sectionId)) {
            section = this.sections.get(sectionId);
        }

        if (section) {
            return section;
        }

        // TODO clean up the following and verify that it actually does what we would expect
        // right now it's commented to document what it does.
        var candidate, result = null;

        // Try to find a candiate for the requested section id
        candidate = document.getElementById(sectionId);

        // if the candidate is our swap view element, ignore it
        if(candidate === this.view._view) {
            candidate = null;
        }


        // if no candidates in the page, find a trigger targetting a remote section by that id
        if (!candidate) {
            candidate = document.body.down('a.'+this.triggerClassName+'[href*=#'+sectionId+']');
        }

        // if no candidate was found by ID within the DOM, assume the
        // specified ID is actually a tag name
        // TODO is that really what we want to look for?
        if(!candidate) {
            result = document.getElementsByName(sectionId);

            if(result && result.length > 0) {
                candidate = result[0];
            }

            if(candidate === this.view._view) {
                candidate = null;
            }
        }

        // Regardless of how we found the candidate...
        if(candidate) {

            // if it's a link it needs to be a trigger for this viewmaster...
            if(candidate.tagName.toLowerCase() === "a") {
                if(Element.hasClassName(candidate, this.triggerClassName)) {
                    section = this.addSection(candidate)
                }
            }
            // or not a link at all.
            else {
                section = this.addSection(candidate);
            }
        }

        return section;
    },

    // ** {{{AC.ViewMaster.Viewer.indexOfSection(aSection)}}} **
    //
    // Returns the index of the specified section
    indexOfSection: function(aSection)
    {
        return this.orderedSections.indexOf(aSection.id);
    },

    // ** {{{AC.ViewMaster.Viewer.selectSectionFromEvent(evt)}}} **
    //
    //
    selectSectionFromEvent: function(evt)
    {
        // Ignore events emitted by this viewmaster instance
        if (evt.event_data.data.sender === this) {
            return;
        }
        // Ignore events where the trigger class name does not match this
        // viewmaster instance's own trigger className
        if (evt.event_data.data.parentTriggerClassName !== this.triggerClassName) {
            return;
        }

        //Now that should be something we need to take care of:
        this.selectSectionWithIdEvent(evt.event_data.data.parentSectionId, evt.event_data.data.event);
    },

    // ** {{{AC.ViewMaster.Viewer.selectSectionWithIdEvent(sectionId, event)}}} **
    //
    // 
    selectSectionWithIdEvent: function(sectionId, event)
    {
        var aSection = this.sectionWithId(sectionId),
            triggers = null,
            i,
            iTrigger,
            triggerFound = false;

        if(aSection) {
            triggers = aSection.triggers();
            if(triggers && triggers.length > 0) {
                for(i=0;(iTrigger = triggers[i]);i++) {
                    if(Element.Methods.hasClassName(iTrigger, this.triggerClassName)) {
                        triggerFound = true;
                        //I just need to simulate 1:
                        break;
                    }
                }
            }

            //Let's create one!
            if(!triggerFound) {
                iTrigger = document.createElement("a");
                iTrigger.className = this.triggerClassName;
                iTrigger.href = "#"+sectionId;
                iTrigger.style.display = "none";
                document.body.appendChild(iTrigger);
                //save this trigger for the 2nd click
                aSection._triggers.push(iTrigger);
            }

            //This should trigger _triggerClicked()
            this.triggerClicked(event, $(iTrigger));

        }
    },

    // ** {{{AC.ViewMaster.Viewer.setDelegate(delegate)}}} **
    //
    // Sets the delegate of the receiver.
    // 
    // {{{delegate}}}: The object to set as the receiver's delegate.
    setDelegate: function(delegate)
    {
        this.delegate = delegate;

        // If the delegate cares and there is a current section already
        // being shown, inform the delegate immediately so it can handle
        // itself appropriately.
        if (this.delegate && typeof(this.delegate.didShow) === 'function' &&
            this.currentSection && this.currentSection.isContentLoaded())
        {
            this.delegate.didShow(this, this.previousSection, this.currentSection);
        }
    },
    
    createSectionForContent: function(content) {
		return new AC.ViewMaster.Section(content,this);
    },

    // ** {{{AC.ViewMaster.Viewer.addSection(contentNode)}}} **
    //
    // Adds a section object wrapping the specified {{{contentNode}}} to 
    // the ViewMaster's collection. The newly created section is returned.
    // 
    // {{{contentNode}}}: The element to wrap with the new {{{Section}}}
    // object.
    addSection: function(contentNode)
    {
        var section = this.createSectionForContent(contentNode);
        //add keyed entry into hash
        this.sections.set(section.id, section);
        //add key into ordered array for prev/next functionality
        this.orderedSections.push(section.id);
        return section;
    },

    // ** {{{AC.ViewMaster.Viewer.silentPreviousSelection(value)}}} **
    //
    // Sets the silentPreviousSelection option.
    // 
    // {{{value}}} [**boolean**]: The value for which set the silentPreviousSelection flag.
    silentPreviousSelection: function(value) {
        if (typeof(value) == 'boolean') {
            this._silentPreviousSelection = value;
        }
        return this._silentPreviousSelection;
    },

    currentTrigger: function() {
        return this._currentTrigger;
    },
    // ** {{{AC.ViewMaster.Viewer.triggerClicked(evt, element)}}} **
    //
    // TODO should this method be public?
    // TODO should this method expose the fact that it usually handles a 'clicked' trigger
    triggerClicked: function(evt, element)
    {
        //set the clicked trigger active as soon as possible to reduce apparent lag
        element.addClassName('active');
        
        this._currentTrigger = element;

        if (evt && this.options.silentTriggers) {
            Event.stop(evt);
        }

        var section = null,
            contentId;

        if (!!element.href.match(/#previous/)) {
            section = this.getPreviousSection();
        } else if (!!element.href.match(/#next/)) {
            section = this.getNextSection();
        } else {
            var matches = element.href.match(this.sectionRegExp);
            if (matches) {
                contentId = matches[1];
            } else {
                contentId = element.name;
            }
            section = this.sections.get(contentId);
        }

        //No section means either a lazy initialization of sections
        //or a section for which the content is remote.
        if (!section) {
            section = this.addSection(element);
        }

        if (section.isContentRemote()) {
            if (section.isContentLoaded()) {
               section.clearTrigger(element);
            }
            if (evt) {
                Event.stop(evt);
            }
        }

        //stop if the trigger is trying to open the current section
        if (section === this.currentSection) {
            if (evt) {
                Event.stop(evt);
            }

            //We don't have to do anything but we still need to post an event saying it's all good:
            //To trigger event based section selection
            //Send notification:
            if (typeof(AC.ViewMaster.dispatchEvent) === 'function') {
                AC.ViewMaster.dispatchEvent('ViewMasterDidShowNotification', {
                    sender: this,
                    outgoingView: this.previousSection,
                    incomingView: this.currentSection,
                    trigger: element});
            }
            return;
        } else if (!section) {
            return;
        }

        this._didShowInitial = true;
        // Give the DOM a moment to update the clicked trigger as active, and then go onto the expensive show method
        setTimeout(this.show.bind(this,section), 1);
    },

    _triggerClicked: function(evt) {
        // If this section is passive, don't act on any event observed
        if (this.options.passive) {
            return;
        }

        var trigger = evt.element();

        if(AC.Detector.isIEStrict() && evt.type === "mouseup") {
            if(trigger && trigger.nodeName.toUpperCase() === 'A' ) {
                trigger = trigger.down("."+this.triggerClassName);
            }
        } else {
            while (trigger && trigger.nodeName.toUpperCase() !== 'A' && trigger.nodeName.toUpperCase() !== 'BODY') {
                trigger = trigger.parentNode;
            }
        }

        // if we're a SwapViewPreviousSelection link, show the previous Selection section
        // NOTE: we could have put this in this.triggerClicked, however 
        // reduce regressions and new issues regaurding nested swap views,
        // it's separated out from the trigger.hasClassName(triggerClassName)
        if (this._silentPreviousSelection !== true && !this._locked) {
            if (trigger && trigger.href && trigger.href.toString().match(/SwapViewPreviousSelection$/)) {
                trigger = $(trigger);
                if (trigger.hasClassName(this.triggerClassName) || trigger.descendantOf(this.view.view())) {
                    Event.stop(evt);
                    this.showPreviousSelection();
                    return;
                }
            }
        }

        // ignore if the element is not a trigger
        if (trigger && trigger.href && Element.Methods.hasClassName(trigger, this.triggerClassName)) {
            // Stop as early as possible if we're in the middle of an animation,
            // and this seems to be as early as possible
            if (this._locked) {
                Event.stop(evt);
                return;
            }

            if(this.options.parentSectionId && (typeof(this.stopListeningForEvent) === 'function') && (typeof(this.listenForEvent) === 'function') && (typeof(AC.ViewMaster.dispatchEvent) === 'function')){
                var self = this;
                //Stop event now: We need to streamline the stoping of events between _triggerClicked and triggerClicked
                Event.stop(evt);

                //Remove observer so we don't listen to ourself:
                 this.stopListeningForEvent(AC.ViewMaster, 'ViewMasterSelectSectionWithIdNotification', true, this.selectSectionFromEventHandler);

                 this.listenForEvent(AC.ViewMaster, 'ViewMasterDidShowNotification', false, function(evt) {
                     //Complete the selection of my section when I, as a section of another viewMaster, am in place.
                     this.stopListeningForEvent(AC.ViewMaster, 'ViewMasterDidShowNotification', false, arguments.callee);
                     self.triggerClicked(evt, trigger);

                     this.listenForEvent(AC.ViewMaster, 'ViewMasterSelectSectionWithIdNotification', true, this.selectSectionFromEventHandler);
                 });

                //To trigger event based section selection
                AC.ViewMaster.dispatchEvent('ViewMasterSelectSectionWithIdNotification', {sender: this, parentSectionId: this.options.parentSectionId, parentTriggerClassName:this.options.parentTriggerClassName, event:evt, trigger:trigger});
            } else {
                this.triggerClicked(evt, trigger);
            }
        }
    },

    // ** {{{AC.ViewMaster.Viewer.isContentLoaded(swapView, content)}}} **
    //
    // Returns whether or not the specified content has loaded.
    //
    // TODO why is the swapView a parameter at all?
    // TODO why is this a public method?
    isContentLoaded: function(swapView, content)
    {
        //content here is a Section instance
        return content.isContentLoaded();
    },

    // ** {{{AC.ViewMaster.Viewer.loadContent(swapView, content)}}} **
    //
    // Instructs the specified content to load itself.
    //
    // TODO why is the swapView a parameter at all?
    // TODO why is this a public method?
    loadContent: function(swapView, content)
    {
        if (content) {
            content.loadContent();
        }
    },

    _showContentDidLoad: false,

    // ** {{{AC.ViewMaster.Viewer.contentDidLoad(section, scriptFragment, context)}}} **
    //
    // 
    contentDidLoad: function(section, scriptFragment, context)
    {
        if (scriptFragment && scriptFragment.firstChild) {
            this._showContentDidLoad = true;
        }

        this.view.setLoadedContent(section);
        AC.loadRemoteContent.insertScriptFragment(scriptFragment);

        this.scrollSectionToVisible(section);

        if (this._showContentDidLoad && this.delegate && typeof(this.delegate.didShow) === 'function') {
            this.delegate.didShow(this, this.previousSection, this.currentSection);
        }
        this._showContentDidLoad = false;
    },

    //  ** {{{AC.ViewMaster.Viewer.show(section)}}} **
    // 
    // Show a section
    show: function(section, force)
    {

        // causes problems with overlays, where show(null) seems to be crucial,
        // so we are now passing in a force argument:
        // if (this._locked || !section) return;
        if (this._locked || (!section && !force)) {
            return;
        }

        if (!this.options.alwaysShowSection && section === this.currentSection) {
            return;
        }

        this._locked = true;

	    if (this.delegate && typeof(this.delegate.willShowSection) === 'function') {
            var delegateOverride = this.delegate.willShowSection(this, this.previousSection, section);
            if(delegateOverride instanceof AC.ViewMaster.Section) {
                section = delegateOverride;
            }
        }

        this.previousSection = this.currentSection;

        this.currentSection = section;
        this.view.setContent(section);

        this.scrollSectionToVisible(section);
    },


    // ** {{{AC.ViewMaster.Viewer.scrollSectionToVisible(aSection)}}} **
    //
    // 
    scrollSectionToVisible: function(aSection)
    {
        if (typeof this.options.ensureInView === "boolean" && this.options.ensureInView) {
            if (this._didShowInitial) {
                if (aSection._isContentLoaded) {
                    var yOffset = aSection.content.viewportOffset()[1];
                    //if the content is above viewport to pretty far down the page bring it into view
                    if (yOffset < 0 || yOffset > (document.viewport.getHeight() * .75)) {
                        new Effect.ScrollTo(aSection.content, {duration: 0.3});
                    }
                }

            } else {
                //ensure we're at the top of the page when the page has 
                //'loaded' otherwise a requested anchor is followed and the 
                //page may have started where the element was prior to styling
                $(document.body).scrollTo();
            }

            return true;
        }

        return false;
    },

    // ** {{{AC.ViewMaster.Viewer.showFirst()}}} **
    //
    // Shows the first section in the receiver's ordered collection.
    showFirst: function()
    {
        this.show(this.getFirstSection());
    },

    // ** {{{AC.ViewMaster.Viewer.getFirstSection()}}} **
    //
    // Returns the first section in the receiver's ordered collection
    getFirstSection: function()
    {
        return this.sections.get(this.orderedSections[0]);
    },

    // ** {{{AC.ViewMaster.Viewer.showNext()}}} **
    //
    // Shows the receiver's next section.
    showNext: function()
    {
        this.show(this.getNextSection());
    },

    // ** {{{AC.ViewMaster.Viewer.getNextSection()}}} **
    //
    // Returns the receiver's next section
    getNextSection: function()
    {
        var currentIndex = this.orderedSections.indexOf(this.currentSection.id);
        var nextIndex = (this.orderedSections.length - 1) === currentIndex ? 0 : currentIndex + 1;
        return this.sections.get(this.orderedSections[nextIndex]);
    },

    // ** {{{AC.ViewMaster.Viewer.showPrevious()}}} **
    //
    // Shows the receiver's previous section.
    showPrevious: function()
    {
        this.show(this.getPreviousSection());
    },

    // ** {{{AC.ViewMaster.Viewer.getPreviousSection()}}} **
    //
    // Returns the receiver's previous section.
    getPreviousSection: function() {
        var currentIndex = this.orderedSections.indexOf(this.currentSection.id);
        var previousIndex = 0 === currentIndex ? this.orderedSections.length - 1 : currentIndex - 1;
        return this.sections.get(this.orderedSections[previousIndex]);
    },

    // ** {{{AC.ViewMaster.Viewer.showPreviousSelection()}}} **
    //
    // Shows the receiver's previously selected (viewed) section.
    showPreviousSelection: function()
    {
        this.show(this.getPreviousSelection());
    },

    // ** {{{AC.ViewMaster.Viewer.getPreviousSelection()}}} **
    //
    // Returns the receiver's previously selected (viewed) section.
    getPreviousSelection: function()
    {
        if (this.previousSection) {
            return this.previousSection;
        }

        var orderedSectionsLength = this.orderedSections.length;
        for (i=0; i<orderedSectionsLength; i++) {
            if (this.orderedSections[i] != this.currentSection.id) {
                return this.sections.get(this.orderedSections[i]);
            }
        }

        return false;
    },

    // Delegated method from the internal SwapView
    //
    // Responds to the SwapView notifying its delegate that it will show
    // the specified incoming section.
    willShow: function(view, outgoing, incoming)
    {
        //swap view only deals with nodes once we give it the node to show 
        //so we need to keep track of which section was requested if we ever
        //need to know about the incoming section and not the incoming node
        if (this.delegate && typeof(this.delegate.willShow) === 'function') {
            this.delegate.willShow(this, this.previousSection, this.currentSection);
        }

        //Send notification:
        if (typeof(AC.ViewMaster.dispatchEvent) === 'function') {
            AC.ViewMaster.dispatchEvent('ViewMasterWillShowNotification', {sender:this, outgoingView:this.previousSection, incomingView:this.currentSection} );
        }

        this._repaintTriggers(this.previousSection, this.currentSection);

        if (this._didShowInitial && incoming && incoming != this.previousSection) {
            $(incoming.content).setOpacity(0.0);
            $(incoming.content).removeClassName('hidden')
        }

        if(incoming) {
            return incoming.willShow(this);
        }
        return null;
    },

    // Delegated method from the internal SwapView
    //
    // Responds to the SwapView notifying its delegate that it is about to close
    // the specified outgoing section.
    //
    // TODO should the delegate method and notification provide different information?
    willClose: function(view, outgoing)
    {

        if (this.delegate && typeof(this.delegate.willClose) === 'function') {
            this.delegate.willClose(this, this.previousSection, this.currentSection);
        }
        //Send notification:
        if (typeof(AC.ViewMaster.dispatchEvent) === 'function') {
            AC.ViewMaster.dispatchEvent('ViewMasterWillCloseNotification', {sender:this, outgoingView:outgoing} );
        }
        if (this.previousSection) {
            this.previousSection.willClose(this);
        }
    },

    // Whether or not the content should be animated
    shouldAnimateContentChange: function(swapView, swapViewCurrentContent, swapViewNextContent)
    {
        var result = true;
        if (this.delegate && typeof(this.delegate.shouldAnimateContentChange) === 'function') {
            result = this.delegate.shouldAnimateContentChange(this, this.previousSection, this.currentSection);
        } else {
            result = (typeof this.options.shouldAnimateContentChange === "boolean") ? this.options.shouldAnimateContentChange : true;
        }
        // TODO why does this return true for anything that is not a boolean??
        return (typeof result === "boolean") ? result : true;
    },

    willAnimate: function(view, outgoing, incoming, afterFinish)
    {
        var duration = this.options.animationDuration || 0.4;
        var queueScope = Math.random() + 'Queue'; //TODO probalby need a unique id for this component we use for queue names

        //if the user hasn't interacted with this yet, jsut continue on
        if (!this._didShowInitial && typeof(afterFinish) == 'function') {
            afterFinish();
            return;
        }

        if (this.delegate && typeof this.delegate.willAnimate == 'function') {
            return this.delegate.willAnimate(this, outgoing, incoming, afterFinish, queueScope);
        }

        if (outgoing) {
            return new Effect.Parallel([
                new Effect.Opacity(outgoing, {sync: true, from: 1.0, to: 0.0}),
                new Effect.Opacity(incoming, {sync: true, from: 0.0, to: 1.0})], {
                    duration: duration,
                    afterFinish: afterFinish,
                    queue: {scope: queueScope}});
        } else {
            return new Effect.Opacity(incoming, {
                from: 0.0,
                to: 1.0,
                duration: duration,
                afterFinish: afterFinish,
                queue: {scope: queueScope}});
        }
    },

    // Acknowledges content appended in the view, and informs delegate
    // if the delegate is interested
    // TODO not expose publicly
    didAppendContent: function(view, content)
    {
        if (this.delegate && typeof this.delegate.didAppendContent === "function") {
            this.delegate.didAppendContent(this, content);
        }
    },

    // ** {{{AC.ViewMaster.Viewer.hidePreviousSelectionLinks()}}} **
    //
    // If {{{this.previousSection.id}}} doesn't exist, updates all links of the
    // format {{{href="#SwapViewPreviousSelection"}}} to be {{{display:none;}}}.
    hidePreviousSelectionLinks: function(content)
    {
        var section = this.getPreviousSelection();

        if (!section || this._silentPreviousSelection === true) {
            var links = content.select('a[href$="SwapViewPreviousSelection"]');
            if (links.length > 0) {
                if (!this._previousSectionLinks) this._previousSectionLinks = [];
                for (var i=links.length-1; i>=0; i--) {
                    links[i].style.display = 'none';
                    this._previousSectionLinks.push(links[i]);
                }
            }
        }

        if (section && this._silentPreviousSelection !== true && this._previousSectionLinks && this._previousSectionLinks.length > 0) {
            for (var i=this._previousSectionLinks.length-1; i>=0; i--) {
                this._previousSectionLinks[i].style.display = '';
                this._previousSectionLinks.splice(i, 1);
            }
        }
    },

    // ** {{{AC.ViewMaster.Viewer.stopMovieIfItsPlaying()}}} **
    //
    // Prevent 2 movies from playing on the same page in 2 different swap views
    stopMovieIfItsPlaying: function(evt)
    {
        // note IE7 was crashing on the next line, so I'm referencing directly
        if (AC.ViewMaster.Viewer.allowMultipleVideos() !== true) {
            if (evt.event_data.data.incomingView) {
                var view = evt.event_data.data.sender, incoming = evt.event_data.data.incomingView, replay = false;
            } else {
                var view = this, incoming = evt.event_data.data, replay = true;
            }
            if (view != this || replay) {
                if (incoming && this.currentSection && this.currentSection.isMoviePlaying() && incoming.content && incoming.content.getElementsByClassName('movieLink')[0]) {
                    this.currentSection.stopMovie();
                }
            }
        }
    },

    // ** {{{AC.ViewMaster.Viewer.didShow()}}} **
    // 
    // Delegated method from the internal SwapView
    // 
    // Responds to the SwapView notifying its delegate that it did show
    // the specified incoming section.
    didShow: function(view, outgoing, incoming)
    {
        if (incoming) {
            this.hidePreviousSelectionLinks(incoming);
        }

        if (this.currentSection) {
            this.currentSection.didShow(this);
        }

        this._didShowInitial = true;
        this._locked = false;

        // want to only alert our delegate that we're done after unlocked
        if (!this._showContentDidLoad && this.delegate && typeof(this.delegate.didShow) == 'function') {
            this.delegate.didShow(this, this.previousSection, this.currentSection);
        }

        //Send notification:
        if (typeof(AC.ViewMaster.dispatchEvent) == 'function') {
            AC.ViewMaster.dispatchEvent('ViewMasterDidShowNotification', {
				sender:this,
				outgoingView:this.previousSection,
				incomingView:this.currentSection,
				trigger: this._currentTrigger
			} );
        }
    },

    // Resets the class names for all the triggers associtated with both
    // the incoming and outgoing sections so that they are waht they should
    // be given the status of their associated section.
    _repaintTriggers: function(outgoingSection, incomingSection)
    {
        if(outgoingSection) {
            var outgoingTriggers = outgoingSection.triggers();
            for(var i=0, iTrigger;(iTrigger = outgoingTriggers[i]);i++) {
                iTrigger.removeClassName('active');
            }

            outgoingTriggers = outgoingSection.relatedElements();
            for(var i=0, iTrigger;(iTrigger = outgoingTriggers[i]);i++) {
                iTrigger.removeClassName('active');
            }
        }

        if(incomingSection) {
            var incomingTriggers = incomingSection.triggers();
            for(var i=0, iTrigger;(iTrigger = incomingTriggers[i]);i++) {
                iTrigger.addClassName('active');
            }

            incomingTriggers = incomingSection.relatedElements();
            for(var i=0, iTrigger;(iTrigger = incomingTriggers[i]);i++) {
                iTrigger.addClassName('active');
            }
        }
    }
});

// ** {{{AC.ViewMaster.Viewer.allowMultipleVideos(value)}}} **
//
// Sets the allowMultipleVideos option.
// 
// {{{value}}} [**boolean**]: The value for which set the allowMultipleVideos flag.
AC.ViewMaster.Viewer.allowMultipleVideos = function(value) {
    if (typeof(value) == 'boolean') {
        this._allowMultipleVideos = value;
    }
    return this._allowMultipleVideos;
};


if (Event.Publisher) {
    Object.extend(AC.ViewMaster, Event.Publisher);
}

if (Event.Listener) {
    Object.extend(AC.ViewMaster.Viewer.prototype, Event.Listener);
}

//  == AC.ViewMaster.Section ==
// Class that wraps DOM content to swap into and out of a ViewMaster

AC.ViewMaster.Section = Class.create({

	content: null,
	
	moviePanel: null,
	controllerPanel: null,
	movie: null,
	_movieController: null,
	movieLink: null,
	endState: null,
	
	hasShown: false,
	_isContentRemote: false,
	isContentRemote: function() {
		return this._isContentRemote;
	},
	_isContentLoaded: true,
	isContentLoaded: function() {
		return this._isContentLoaded;
	},

	_onMoviePlayable: Prototype.EmptyFunction,
	_onMovieFinished: Prototype.EmptyFunction,

	id: null,

	triggers: function() {
		if(!this._triggers) {
			this._triggers = [];

			var sectionRegExp = new RegExp('#' + this.id + '$');
			if (this.viewMaster.sectionRegExp || this.viewMaster.options.sectionRegExp) {
				sectionRegExp = this.viewMaster.sectionRegExp || this.viewMaster.options.sectionRegExp;
				sectionRegExp = sectionRegExp.toString().replace(/^\//, '').replace(/\/$/, '');
				sectionRegExp = new RegExp(sectionRegExp.replace('(.*)', this.id));
			}

			var triggers = document.getElementsByClassName(this.viewMaster.triggerClassName);
			for (var i=0, iTrigger;(iTrigger = $(triggers[i]));i++) {
				if (iTrigger.tagName.toLowerCase() !== "a") continue;
				if (iTrigger.href.match(sectionRegExp)) {
					this._triggers.push(iTrigger);
				}
			}

			// in the special (rare) case that we have a trigger to itself
			// within this section's content, make sure that those are
			// included in this triggers array
			var embeddedTriggers = this.content.getElementsByClassName(this.viewMaster.triggerClassName);
			for (var i=0, iTrigger;(iTrigger = $(embeddedTriggers[i]));i++) {
				if (iTrigger.tagName.toLowerCase() !== "a") continue;
				if (iTrigger.href.match(sectionRegExp)) {
					this._triggers.push(iTrigger);
				}
			}
		}
		return this._triggers;
	},

	relatedElements: function() {
		if(!this._relatedElements) {
			this._relatedElements = document.getElementsByClassName(this.id);
			//this._dependentElements = [];
			//var triggers = document.getElementsByClassName(this.id);
			//for(var i=0, iTrigger;(iTrigger = $(triggers[i]));i++) {
			//	this._dependentElements.push(iTrigger);
			//}
		}
		return this._relatedElements;
	},

	initialize: function(content, viewMaster) {
		
		this.content = $(content);
		
		//Special casing for remote content / lazy initialization
		if(this.content.tagName.toLowerCase() === "a") {
			var href = this.content.getAttribute("href");
			var parts = href.split("#");
			this._contentURL = parts[0];
			var windowLocationParts = window.location.href.split("#");
			var contentClassName = content.className;
            var baseTag = document.getElementsByTagName("base")[0];
            var baseHref = baseTag ? baseTag.href : null;
			
			if(parts.length === 2) {
				this.id = parts[1];
			}
			
			if(this._contentURL.length > 0 && (!baseHref || this._contentURL != baseHref) && (this._contentURL !== windowLocationParts[0]) && (!this._contentURL.startsWith("#") || this._contentURL !== href)) {				
				//We should assess wether the link is an external html, an image or a movie.
				//For now I'm going to assume an external HTML, but we'll have to revisit that.
				this._isContentRemote = true;
				this._isContentLoaded = false;
			}
			//This is an inner document reference:
			else {
				var loadedContent = $(this.id) || $('MASKED-'+this.id);
				if(loadedContent) this.content = loadedContent;
			}
			
			
			if(!this.id) this.id = this.content.name;

		
		}
		else {
			this.id = content.id;
		}
		//disguise the contentAnchor so trigger links don't jump to it
		//of course trigger links need to know their target is now prefixed 
		//with "MASKED-"
		if(!this._isContentRemote || this._isContentLoaded) {
			this.content.setAttribute('id', 'MASKED-' + this.id);
		}
		
		//set up the viewMaster
		if(viewMaster) this.viewMaster = viewMaster;
		
		//use found node if it has content class
		if (!this._isContentRemote && this._isContentLoaded && !this.content.hasClassName('content')) {
			//otherwise search the node for the first child flagged as content
			var contentChild = this.content.getElementsByClassName('content')[0];
			if(contentChild) this.content = contentChild;
		}
		
		this.isMobile = AC.Detector.isMobile();
	},
	clearTrigger: function(trigger) {
        if(trigger.href === ("#"+this.id)) return;
        
		trigger.href = "#"+this.id;
		
		//Set the content to be the remote one
		//Remove the id/name that was on the link:
		trigger.removeAttribute("id");
		trigger.removeAttribute("name");
    },
	remoteContentDidLoad: function(remoteContentNode,scriptFragment) {
		//update the href to be #id
		this.clearTrigger(this.content);

		this.content = $(remoteContentNode);

		//this.content.id = this.id;
		this.content.setAttribute('id', 'MASKED-' + this.id);
		this._isContentLoaded = true;
		this.viewMaster.contentDidLoad(this,scriptFragment);
	},

	loadContent: function() {
		if(this._isContentLoaded) {
			var self = this;
			self.viewMaster.contentDidLoad(self,null);
			//setTimeout(function(){self.viewMaster.contentDidLoad(self);},0);
		}
		else if (this.content.className.indexOf("imageLink") !== -1) {
            		var aDiv = document.createElement('div');
                    aDiv.appendChild(this.content.cloneNode(true));
                    this.remoteContentDidLoad(aDiv);
        }
        else if( (this.content.className.indexOf("movieLink") !== -1) || (this.content.className.indexOf("audioLink") !== -1) ) {
            		var aDiv = document.createElement('div');
              		aDiv.appendChild(this.content.cloneNode(true));
              		this.remoteContentDidLoad(aDiv);
        }
        else {
			AC.loadRemoteContent(this._contentURL,true,true,this.remoteContentDidLoad.bind(this),null,this);
		}
	},
	shouldImportScriptForContentURL: function(iScript,contentURL,context) {
		var iScriptHasSrc = false;
		if(iScript.hasAttribute) {
			iScriptHasSrc = iScript.hasAttribute("src");
		}
		else {
			src = iScript.getAttribute("src");
			iScriptHasSrc = ((src != null) && (src !== ""));
		}
		
		if(!iScriptHasSrc) {
			var ua = navigator.userAgent.toLowerCase(),
				isAppleWebKit = (ua.indexOf('applewebkit') != -1), 
				version = parseInt(parseFloat( ua.substring( ua.lastIndexOf('safari/') + 7 ) )),
				isSafari2x = (isAppleWebKit && version >= 419), scriptText;

             if(isSafari2x) {
                 scriptText = iScript.innerHTML;
             }
             else {
                 scriptText = iScript.text;
             }
			
			//We want to filter out inline scripts that do like
			//window.location.replace('/itunes/tutorials/index.html#tips-rightclick');
			//Which is used for external page fragments to re-direct to their host page
			if(scriptText.search(/.*\.location\.replace\(.*\).*/) !== -1) {
				return false;
			}
			return true;
		}
		else {
			return true;
		}
	},
	mediaType: function() {
		return this.movieLink ? "video/quicktime" : "text/html"
	},
	
	willShow: function() {
		
		if (!this.hasShown) {
			this.hasShown = true;
			var images = this.content.getElementsByClassName('imageLink');
			for (var i = 0; i < images.length; i++) {
				this._loadImage(images[i]);
			}
		
			if (!this.moviePanel) {
				this.movieLink = this.content.getElementsByClassName('movieLink')[0];
				this.posterLink = this.content.getElementsByClassName('posterLink')[0];

				if (this.movieLink) {
					this._loadMovie();
				}
			}
		}
		
		return this.content;
	},

	_loadImage: function(imageLink) {
		var image = document.createElement('img');

		 // IE turns an <a> tag's relative URL starting with a / into an about:..., so assuming we'll never use about:/ ...
		if (imageLink.protocol === "about:") {
			imageLink.href = '/'+imageLink.pathname; // IE7
			imageLink.href = imageLink.href.replace(/^\/blank/, ''); // IE6
		}

		image.setAttribute('src', imageLink.href);
		image.setAttribute('alt', imageLink.title);

		imageLink.parentNode.replaceChild(image, imageLink);
	},

	_loadMovie: function() {
		var isACMedia = this.isACMediaAvailable();
		
		this.moviePanel = $(document.createElement('div'));
		this.moviePanel.addClassName("moviePanel");
		
		this.movieLink.parentNode.replaceChild(this.moviePanel, this.movieLink);

		this.controllerPanel = $(document.createElement('div'));
		//if(!isACMedia) {
			this.controllerPanel.addClassName('controllerPanel');
		//}
		
		if (isACMedia === false) {
		} else {
		    this.moviePanel.appendChild(this.controllerPanel);
		}
		
		if (isACMedia === false) {
			this.moviePanel.parentNode.insertBefore(this.controllerPanel, this.moviePanel.nextSibling);
		} else {
		    this.moviePanel.appendChild(this.controllerPanel);
		}
		
		this.endState = $(this.content.getElementsByClassName('endState')[0]);
		if (this.endState) {
			this.endState.parentNode.removeChild(this.endState);
			
			var replay = $(this.endState.getElementsByClassName('replay')[0])
			if (replay) replay.observe('click', function(evt) {
				Event.stop(evt);
				this.replayMovie();
			}.bindAsEventListener(this))
			
		}
	},
	_forceACQuicktime: false,
	isACMediaAvailable: function() {
		return (typeof(Media)!="undefined" && this._forceACQuicktime === false);
	},
	
	setShouldForceACQuicktime: function(force) {
		this._forceACQuicktime = force;
	},
	
    newMovieController: function() {
        return new AC.QuicktimeController();
    },
    
	didShow: function(viewer) {
		var needsController = this.hasMovie() && !this.isMobile,
			isACMedia = this.isACMediaAvailable();
		
		if (isACMedia) {
			if (needsController) {
		        this._movieControls = this._movieControls || new Media.ControlsWidget(this.controllerPanel);
		        this._playMovie();
		        if (this._movieController) {
        		    this._movieController.setControlPanel(this._movieControls);
        		    this.onMovieFinished = this.didFinishMovie.bind(this);
        		    this._movieController.setDelegate(this);
        		} else {
        		    this.controllerPanel.innerHTML = '';
        		}
		    } else {
		        this._playMovie();
		    }
		} else {
    		if (needsController) {
				this._movieController = this.newMovieController();
				this.controllerPanel.innerHTML = '';
				this.controllerPanel.appendChild(this._movieController.render());
			}

			this._playMovie();
		
			if (needsController) {
				this._onMoviePlayable = this._movieController.monitorMovie.bind(this._movieController);
				this._onMovieFinished = this.didFinishMovie.bind(this);
			
				this._movieController.attachToMovie(this.movie, {
					onMoviePlayable: this._onMoviePlayable,
					onMovieFinished: this._onMovieFinished});
			}
    	}
	},
	
	willClose: function(viewer) {
		this._closeController();
		this._closeMovie();
	},
	
	_closeMovie: function() {
		if (this.movie && this.moviePanel) {

			if(!this.isACMediaAvailable()) {
				this.moviePanel.removeChild(this.movie);
				this.movie = null;
				this.moviePanel.innerHTML = '';
			} else {
				if (AC.Detector.isIEStrict()) {
					this.moviePanel.removeChild(this.movie);
					this.controllerPanel.hide();
				} else {
					this.moviePanel.innerHTML = '';
				}
				this.movie = null;
			}
		}
	},
	
	_closeController: function(){

	    if (this.isACMediaAvailable()) {
	        if (this._movieController && this.hasMovie() && !this.isMobile) {
	            this._movieController.stop();
	            this._movieController.setControlPanel(null);
	            
				if (AC.Detector.isIEStrict()) this.controllerPanel.hide(); 
	            this.controllerPanel.addClassName('inactive');
	            //this.movie._replay = this.replayMovie.bind(this);
	            //this.controllerPanel.observe('click', this.movie._replay);
	        }
	    } else {
		if (this._movieController && this._movieController.movie && this.hasMovie() && !this.isMobile) {
			//TODO this prevents the audio from lingering in safari for the most part, but is probably jsut masking a problem somewhere
			this._movieController.Stop();
			this._movieController.detachFromMovie();

    			//set the controller as inactive for styling purposes?
    			this.controllerPanel.addClassName('inactive');
    			this._movieController.replay = this.replayMovie.bind(this);
    			this.controllerPanel.observe('click', this._movieController.replay);
    		}   
	    }	    
	    	    
	},
	
	hasMovie: function() {
		return !!this.movieLink;
	},

    // ** {{{AC.ViewMaster.Section.isMoviePlaying()}}} **
    //
    // Returns true there is a movie, controller, and if that movie is playing
    isMoviePlaying: function() {
        if (this._movieController) {
            return this._movieController.playing();
        }
    },

    // ** {{{AC.ViewMaster.Section.stopMovie()}}} **
    //
    // Stops the movie it is playing, and displays the endstate.
    // Doesn't close the section.
    stopMovie: function() {
        if (!this.hasMovie()) {
            return;
        }

        this._closeController();
        this._closeMovie();

        if (this.endState) {
            this.moviePanel.appendChild(this.endState);
        }
    },

    didFinishMovie: function() {
        if (!this.hasMovie()) {
            return;
        }

        this.stopMovie();

        if (typeof(document.event.dispatchEvent) == 'function') {
            document.event.dispatchEvent('didFinishMovie', this);
        }
    },

	defaultMovieWidth: function() {
        return 640;
    },
	defaultMovieHeight: function() {
        return 480;
    },
	_playMovie: function() {
	    
		if (this.movieLink && this.moviePanel) {
			var isACMedia = this.isACMediaAvailable();

			if(!isACMedia) {
				this.moviePanel.innerHTML = '';
			} else {
				if (this.movie && this.movie.parentNode == this.moviePanel) {
					this.moviePanel.removeChild(this.movie);
					this.controllerPanel.hide();
				}
			
				if (this.endState && this.endState.parentNode == this.moviePanel) {
					this.moviePanel.removeChild(this.endState);
				}
			
				if (this.controllerPanel && Element.hasClassName(this.controllerPanel, 'inactive')) {
					this.controllerPanel.show();
					Element.removeClassName(this.controllerPanel, 'inactive');
				}
			}
			
			if (this.posterLink && this.posterLink.href) {
				var posterFrame = this.posterLink.href;
			}
			
			// pass through the query string parameters to the QuickTime object
 			var movieParams = this.movieLink.getAttribute('href', 2).toQueryParams(),
			defaultOptions = {
				width: this.defaultMovieWidth(),
				height: this.defaultMovieHeight(),
				controller: false,
				posterFrame: posterFrame,
				showlogo: false,
				autostart: true,
				cache: true,
				bgcolor: 'black',
				aggressiveCleanup: false
			},
			options = Object.extend(defaultOptions, movieParams);
			
			//need some unique id for these guys
			if (isACMedia === true) {
				this._movieController = Media.create(this.moviePanel, this.movieLink.getAttribute('href', 2), options);
			
				if (this._movieController)
					this.movie = this._movieController.video().object();
			} else {
				this.movie = AC.Quicktime.packageMovie(this.movieLink.id + "movieId", this.movieLink.getAttribute('href', 2), options, this.moviePanel);

    			//movie will already be appended if it is flash
    			if(!AC.Quicktime.movieIsFlash) {
					this.moviePanel.appendChild(this.movie);
    			}
			}
			
			// this.moviePanel.id = "toto";

			if(isACMedia === true && !this.isMobile && this.movie) {
			    this._movieControls.reset();
			    this.moviePanel.appendChild(this.controllerPanel);
			}
			
			 if (typeof(document.event.dispatchEvent) == 'function') {
				 document.event.dispatchEvent('didStart', this);
			}
		}
	},
	
	replayMovie: function() {
		var isACMedia = this.isACMediaAvailable();

		if (typeof(document.event.dispatchEvent) == 'function') {
			document.event.dispatchEvent('replayMovie', this);
		}

		if(isACMedia) {
			if (this.moviePanel && this.endState) {
				this.moviePanel.removeChild(this.endState);
			}
		}
		this._playMovie();

		if(isACMedia) this.controllerPanel.show();

		this.controllerPanel.removeClassName('inactive');

        if (isACMedia) {
            this._movieController.setControlPanel(this._movieControls);
			this._movieController.setDelegate(this);
        } else {
			this.controllerPanel.stopObserving('click', this._movieController.replay);
			this._movieController.replay = null;

			this._movieController.attachToMovie(this.movie, {
				onMoviePlayable: this._onMoviePlayable,
				onMovieFinished: this._onMovieFinished});
		}
	}

});

AC.ViewMaster.SlideshowViewer = Class.create();
Object.extend(AC.ViewMaster.SlideshowViewer.prototype, AC.ViewMaster.Viewer.prototype);
Object.extend(AC.ViewMaster.SlideshowViewer.prototype, {

    _superInitialize: AC.ViewMaster.Viewer.prototype.initialize,

    initialize: function(contents, view, triggerClassName, slideShowTriggerClassName, options) {
        this._superInitialize(contents, view, triggerClassName, options);

        this.slideshow = new AC.ViewMaster.Slideshow(this, slideShowTriggerClassName, options);
    },

	setDelegate: function(delegate) {
		this.delegate = delegate;	
	},
	
    start: function() {
        this.slideshow.start();
    },

    stop: function() {
        this.slideshow.stop();
    },

    // Show the first frame in the slideshow and reset progress to zero
    // At the moment this does not pause the slideshow
    reset: function() {
        if(this._isLocked) {
            this._needsReset = true;
        }
        else {
        this.slideshow.reset();
        }
    },

    superDidShow: AC.ViewMaster.Viewer.prototype.didShow,
	didShow: function(view, outgoing, incoming) {

		this.superDidShow(view, outgoing, incoming);
        if(this._needsReset) {
            this._needsReset = false;
            this.slideshow.reset();
        }
	},	

    // Show the next slide in the slideshow
    next: function() {
        this.slideshow.next();
    },

    // Show the previous slide in the slideshow
    previous: function() {
        this.slideshow.previous();
    }

});


// TODO extract this from this code, eventually should build this on top of
// our animation framework as it approaches a more generic animation timer
AC.ViewMaster.Slideshow = Class.create();
if (Event.Listener) Object.extend(AC.ViewMaster.Slideshow.prototype, Event.Listener);
if (Event.Publisher) Object.extend(AC.ViewMaster.Slideshow.prototype, Event.Publisher);

Object.extend(AC.ViewMaster.Slideshow.prototype, {

    contentController: null,
	animationTimeout: null,
	options: null,

	_playing: false,
	_active: false,
	
	_progress: 0,
    setProgress: function(value) {
        this._progress = value;
    },
    progress: function() {
        return this._progress;
    },

    initialize: function(contentController, triggerClassName, options) {
		
        this.contentController = contentController;

		this.triggerClassName = triggerClassName;
		
		this.options = options || {};
		
        // If the addNoListeners is set to true, then it is up to the person
        // instantiating the slideshowto attach listeners
        // otherwise the slideshow assumes you're using a viewmaster so it 
        // listens for notifications
        if (!this.options.addNoListeners) {
            this.listenForEvent(AC.ViewMaster, 'ViewMasterWillShowNotification',
                true, this.willShow);

            this.listenForEvent(AC.ViewMaster, 'ViewMasterDidShowNotification',
                true, this.didShow);
        }

        if (this.options.autoplay) {
		this.start();
        }
		
        if (this.triggerClassName) {
		Event.observe(document, 'click', this._triggerHandler.bindAsEventListener(this));
        }
	},
	
    // Start the slideshow if the slideshow is not already active
    // Progress is reset to zero if the wipeProgress option is set to "always" or "on start"
	start: function() {
		if (this._active) {
			return;
		}
		
		this._active = true;
		if (this.options.wipeProgress == "always" || this.options.wipeProgress == "on start") {
			this._progress = 0;
		}
		this.play(true);
		this._repaintTriggers();
		  if (typeof(document.event.dispatchEvent) == 'function') {
			  document.event.dispatchEvent('didStart', this);
		  }
	},
	
    // Stop the slideshow if the slideshow is active
	stop: function() {
		if (!this._active) {
			return
		}
		
		this._active = false;
		this.pause();
		this._repaintTriggers();
		  if (typeof(document.event.dispatchEvent) == 'function') {
			  document.event.dispatchEvent('didEnd', this);
		  }
	},
	
    // Starts playing the slideshow if the slideshow is not already active
    // Progress is reset to zero if the wipeProgress option is set to "always" or "on play"
	play: function(wasStart) {
		if (!this._active) {
			return;
		}
		
		if (this.options.wipeProgress == "always" || (this.options.wipeProgress == "on play" && !wasStart)) {
			this._progress = 0;
		}
		
		this.animationTimeout = setTimeout(this._update.bind(this), this._heartbeatDelay());
		this._playing = true;
	},
	
    // Handles progress made within the slideshow
	_update: function() {
		
		if (typeof(this.options.onProgress) == 'function') {
			this.options.onProgress(this._progress, this.delay());
		}
		
		if (this._progress >= this.delay()) {
			this._progress = 0;
			this.next();
		} else {
			this._progress += this._heartbeatDelay();
			this.animationTimeout = setTimeout(this._update.bind(this), this._heartbeatDelay());
		}
	},
	
    // The between slides in milliseconds
	delay: function() {
 		return this.options.delay || 5000;
	},
	
    // The delay between progress made which does not trigger a slide
    // transition in milliseconds
	_heartbeatDelay: function() {
		return this.options.heartbeatDelay || 100;
	},
	
    // Pause the slideshow
	pause: function() {
		clearTimeout(this.animationTimeout);
		this._playing = false;
	},
	
    // Have the contentController show the next slide
	next: function() {
        if (this.options.willEnd && (this.contentController.getNextSection() == this.contentController.getFirstSection())) {
            if (typeof(document.event.dispatchEvent) == 'function') {
                document.event.dispatchEvent('didEnd', this);
            }
            return;
        }
        this.contentController.showNext();
	},
	
    // Have the contentController show the previous slide
	previous: function() {
        this.contentController.showPrevious();
	},
	
    reset: function() {
        this.contentController.showFirst();
        this.setProgress(0);
    },

    // Acknowledge that the contentController will show a slide
    willShow: function(evt) {
        // ignore if event was not sent from our contentController
        if (evt.event_data.data.sender != this.contentController) {
            return;
        }
		this.pause();
	},
	
    // Acknowledge that the contentController did show a slide
    didShow: function(evt) {
        // ignore if event was not sent from our contentController
        if (evt.event_data.data.sender != this.contentController) {
            return;
        }

		this.play();
	},
	
    // Handle mousedown events in the document to check for explicit
    // play/pause control events
	_triggerHandler: function(evt) {
		var element = evt.element();
		var section = null;
		
		//ignore if the element is not a trigger
		if (element.hasClassName(this.triggerClassName) && element.href.match(/#slideshow-toggle/)) {
			Event.stop(evt);
			
			if (this._active) {
				this.stop();
			} else {
				this.start();
			}
		}
	},
	
    // Repaints the triggers associated with controlling this slideshow
	_repaintTriggers: function() {
        if(!this.triggerClassName) return;
		var triggers = document.getElementsByClassName(this.triggerClassName);
		for (var i = triggers.length - 1; i >= 0; i--){
			this._repaintTrigger(triggers[i])
		}
	},

    // Repaint an individual trigger associated with this slideshow
	_repaintTrigger: function(trigger) {
		var trig = $(trigger);
		if (this._active) {
			trig.addClassName('playing');
		} else {
			trig.removeClassName('playing');
		}
	}
	
});


AC.loadRemoteContent = function(contentURL,importScripts,importCSS,callback,context,delegate) {
	if(typeof contentURL !== "string") return;
	if(typeof importScripts !== "boolean") importScripts = true;
	if(typeof importCSS !== "boolean") importCSS = true;
	var callee = arguments.callee;
	var registeredArguments = callee._loadArgumentsByUrl[contentURL];
	if(!registeredArguments) {
		callee._loadArgumentsByUrl[contentURL] = {
			contentURL:contentURL,
			importScripts:importScripts,
			importCSS:importCSS,
			callback:callback,
			context:context,
			delegate:delegate
			};

		new Ajax.Request(contentURL, {
		  method:'get',
		  requestHeaders: {Accept: 'text/xml'},
		  onSuccess: arguments.callee.loadTemplateHTMLFromRequest,
		  onFailure: arguments.callee.failedToadTemplateHTMLFromRequest,
		  onException: function(r,e) { throw(e); }, // FIXME remove me
		  onCreate: function(response) {
			response.request.overrideMimeType('text/xml');
		  }
		  
		});
		
	}
}

AC.loadRemoteContent._loadArgumentsByUrl = {};

AC.loadRemoteContent.loadTemplateHTMLFromRequest = function(httpResponse) {
	var reqURL = httpResponse.request.url;
	var callee = arguments.callee;
	var registeredArguments = AC.loadRemoteContent._loadArgumentsByUrl[reqURL];

	var windowDocument = window.document;
	var xmlDocument = httpResponse.responseXMLValue().documentElement;

	if(AC.Detector.isIEStrict()) {
		xmlDocument = xmlDocument.ownerDocument;
	}

	var windowDocument = window.document;
	var scriptFragment = document.createDocumentFragment();

	if(registeredArguments.importScripts) {
		AC.loadRemoteContent.importScriptsFromXMLDocument(xmlDocument,scriptFragment,registeredArguments);
	}
	if(registeredArguments.importCSS) {
		AC.loadRemoteContent.importCssFromXMLDocumentAtLocation(xmlDocument,reqURL,registeredArguments);
	}

	//var result = xmlDocument.getElementsByTagName("body")[0].clonedInnerDocumentFragment();
	//Apparently, importing a document fragment doesn't cut it. However, importing nodes and adding them to a document fragment does!
	var result = null;
	var rootElement = null;
	var body = xmlDocument.getElementsByTagName("body")[0];
	
	if(!body) {
		return;
	}
	
	body.normalize();
	var rootElement = Element.Methods.childNodeWithNodeTypeAtIndex(body, Node.ELEMENT_NODE,0);
	
    var isSafari2 = AC.Detector.isSafari2();
	if(rootElement) {
        if(isSafari2) {
            result = windowDocument._importNode(rootElement, true);
        }
        else {
            result = windowDocument.importNode(rootElement, true);
        }
		//We can live without that for now
		if(result.cleanSpaces) result.cleanSpaces(true);
	}
	else {
		if(body.cleanSpaces) body.cleanSpaces(true);
		else if(typeof body.normalize === "function") body.normalize();

		var bodyChildNodes = body.childNodes;
		result = windowDocument.createDocumentFragment();
		var notSpace = /\S/;
		for(var i=0,iBodyChildNode=0;(iBodyChildNode = bodyChildNodes[i]);i++) {
			var importedNode = (isSafari2) ? windowDocument._importNode(iBodyChildNode, true) : windowDocument.importNode(iBodyChildNode, true);
			result.appendChild(importedNode);
		}
	}
	
	//invoke the callback with result:
	var callback = registeredArguments.callback;
	callback(result,scriptFragment,registeredArguments.context);

}
AC.loadRemoteContent.javascriptTypeValueRegExp = new RegExp("text/javascript","i");
AC.loadRemoteContent.javascriptLanguageValueRegExp = new RegExp("javascript","i");

AC.loadRemoteContent.documentScriptsBySrc = function() {
	if(!AC.loadRemoteContent._documentScriptsBySrc) {
		AC.loadRemoteContent._documentScriptsBySrc = {};
		var scripts = document.getElementsByTagName('script');
		if(!scripts || scripts.length === 0) {
			return AC.loadRemoteContent._documentScriptsBySrc;
		}
		
		for(var i=0,iScript=null;(iScript = scripts[i]);i++) {
			var type = iScript.getAttribute("type");
			var src = null;

			var language = iScript.getAttribute("language");
			if(!this.javascriptTypeValueRegExp.test(type) && !this.javascriptLanguageValueRegExp.test(language)) continue;

			if(iScript.hasAttribute) {
				var iScriptHasSrc = iScript.hasAttribute("src");
			}
			else {
				var iScriptHasSrc = Element.Methods.hasAttribute(iScript,"src");
			}

			if(iScriptHasSrc) {
				var src = iScript.getAttribute("src");
				AC.loadRemoteContent._documentScriptsBySrc[src] = src;
			}

		}
	}
	return AC.loadRemoteContent._documentScriptsBySrc;
}

AC.loadRemoteContent.importScriptsFromXMLDocument = function(xmlDocument,frag,registeredArguments) {
		var scripts = xmlDocument.getElementsByTagName('script'),
			type,
			src,
			language,
			iScriptHasSrc,
            contentURL = registeredArguments.contentURL,
            delegate = registeredArguments.delegate,
            context = registeredArguments.context,
            hasShouldImportScript = (delegate && typeof delegate.shouldImportScriptForContentURL === "function"),
            shouldImportScript = true;
		if(!frag) frag = document.createDocumentFragment();
		var documentScriptsBySrc = AC.loadRemoteContent.documentScriptsBySrc();
		for(var i=0,iScript=null;(iScript = scripts[i]);i++) {
			type = iScript.getAttribute("type");
			src = null;
            shouldImportScript = true;
            

			language = iScript.getAttribute("language");
			if(!this.javascriptTypeValueRegExp.test(type) && !this.javascriptLanguageValueRegExp.test(language)) continue;

			if(iScript.hasAttribute) {
				iScriptHasSrc = iScript.hasAttribute("src");
				src = iScript.getAttribute("src");
			}
			else {
				src = iScript.getAttribute("src");
				iScriptHasSrc = ((src != null) && (src !== ""));
			}

			//var localScript = window.document.importNode(iScript, true);
			//frag.appendChild(localScript);
            if(iScript.getAttribute("id") === "Redirect" ||  (hasShouldImportScript && !delegate.shouldImportScriptForContentURL(iScript,contentURL,context))) {
                    continue
            }
            
			if(iScriptHasSrc) {
				if( !documentScriptsBySrc.hasOwnProperty(src)) {
					var localScript = document.createElement('script');
					localScript.setAttribute("type","text/javascript");
					
					if(AC.Detector.isIEStrict()) {
						//This twisted construction is to work around a bug where IE immediately execute
						//a script whith it's text property initialized, so an "inline" script, when appended to
						//a document fragment.
						localScript.tmp_src = src;
						localScript.onreadystatechange = function() {
								var target = window.event.srcElement, src;
								if ( !target.isLoaded && ((target.readyState == 'complete') || (target.readyState == 'loaded'))) {
									src = target.tmp_src;
									if(src) {
										target.tmp_src = null;
										target.src = src;
										target.isLoaded = false;
									}
									else {
										target.onreadystatechange = null;
										target.isLoaded = true;
									}
								}
							}
					}
					else {
				
						localScript.src = src;
					}
					AC.loadRemoteContent._documentScriptsBySrc[src] = src;
					frag.appendChild(localScript);
				}
			}
			//Inline string
			else {
				
				var localScript = document.createElement('script');
				localScript.setAttribute("type","text/javascript");
				if(AC.Detector.isIEStrict()) {
					//This twisted construction is to work around a bug where IE immediately execute
					//a script whith it's text property initialized, so an "inline" script, when appended to
					//a document fragment.
					var contentFunction = new Function(iScript.text);
					localScript.onreadystatechange = function() {
							var target = window.event.srcElement;
							if ( !target.isLoaded && ((target.readyState == 'complete') || (target.readyState == 'loaded'))) {
								target.onreadystatechange = null;
								target.isLoaded = true;
								contentFunction();
							}
						}
				}
				else {
                   var ua = navigator.userAgent.toLowerCase(); 
                   var isAppleWebKit = (ua.indexOf('applewebkit') != -1);
                   var version = parseInt(parseFloat( ua.substring( ua.lastIndexOf('safari/') + 7 ) ));
                   var isSafari2x = (isAppleWebKit && version >= 419);

                    if(isSafari2x) {
                        localScript.innerHTML = iScript.innerHTML;
                    }
                    else {
                        localScript.text = iScript.text;
                    }
				}
				AC.loadRemoteContent._documentScriptsBySrc[src] = src;
				frag.appendChild(localScript);

		}

		}
		return frag;
};

AC.loadRemoteContent.insertScriptFragment = function(scriptFragment) {
	
	if(!scriptFragment) return;
	//Prevent immediate execution of onDOMReady()
	AC.isDomReady = false;
	Event._domReady.done = false;
	var head = document.getElementsByTagName("head")[0], childNodes = scriptFragment.childNodes, iChild, i,
		loadCallback = function() {
			var target;
			if(!window.event || ((target = window.event.srcElement) && (target.isLoaded || ( (typeof target.isLoaded === "undefined") && ((target.readyState == 'complete') || (target.readyState == 'loaded'))) ) )) {
				arguments.callee.loadedCount++;
				if(target && !target.isLoaded) {
					target.onreadystatechange = null;
					target.isLoaded = true;
				}
				
				if(arguments.callee.loadedCount === arguments.callee.loadingCount) {
					Event._domReady();
				}
			}
		};
		
		loadCallback.loadedCount = 0;
		loadCallback.loadingCount = scriptFragment.childNodes.length;
	
	for(i=0;(iChild = childNodes[i]);i++) {
		if(iChild.addEventListener) {
			iChild.addEventListener("load",loadCallback,false);
		}
		else {
			//For IE, the real code is executed from inside the onreadystatechange for inline scripts, see importScriptsFromXMLDocument() for details, 
			//so we need to make sure this get executed if there's already one in place.
			if(typeof iChild.onreadystatechange === "function") {
				var currentOnreadystatechange = iChild.onreadystatechange;
				iChild.onreadystatechange = function(event) {
					var target = window.event.srcElement;
						currentOnreadystatechange.call(target);
						loadCallback();
				}
			}
			else iChild.onreadystatechange = loadCallback;
		}
	}
	
	head.appendChild(scriptFragment);
	head=null;
}

AC.loadRemoteContent.documentLinksByHref = function() {
	if(!AC.loadRemoteContent._documentLinksByHref) {
		AC.loadRemoteContent._documentLinksByHref = {};
		var links = document.getElementsByTagName('link');
		if(!links || links.length === 0) {
			return AC.loadRemoteContent._documentLinksByHref;
		}
		
		for(var i=0,iLink=null;(iLink = links[i]);i++) {
			var type = iLink.getAttribute("type");
			if(iLink.type.toLowerCase() !== "text/css") {
				continue;
			}
			var src = null;

			if(iLink.hasAttribute) {
				var iLinkHasSrc = iLink.hasAttribute("href");
			}
			else {
				var iLinkHasSrc = Element.hasAttribute(iLink,"href");
			}

			if(iLinkHasSrc) {
				var src = iLink.getAttribute("href");
				AC.loadRemoteContent._documentLinksByHref[src] = src;
			}

		}
	}
	return AC.loadRemoteContent._documentLinksByHref;
}

AC.loadRemoteContent.__importCssElementInHeadFromLocation = function(iNode,head,url) {
    //I'm going to prepend the component's url
	var isLink = (iNode.tagName.toUpperCase() === "LINK");
    if(isLink) {
		var type = iNode.getAttribute("type");
		if(!type || type && type.toLowerCase() !== "text/css") {
			return;
		}
        var href = iNode.getAttribute("href");
        if(!href.startsWith("http") && !href.startsWith("/")) {
            var hrefOriginal = href;
			if(url.pathExtension().length > 0) {
				url = url.stringByDeletingLastPathComponent();
			}
            href = url.stringByAppendingPathComponent(hrefOriginal);
        }
		if(AC.Detector.isIEStrict()) {
			var stylesheet = window.document.createStyleSheet(href,1);
		}
		else 
		{
			var importedNode = window.document.importNode(iNode, true);
            importedNode.href = href;
		}
		AC.loadRemoteContent.documentLinksByHref()[href] = href;
    }
	if(!AC.Detector.isIEStrict() || (AC.Detector.isIEStrict() && !isLink)) {
		head.insertBefore(importedNode,head.firstChild);
	}
};

AC.loadRemoteContent.importCssFromXMLDocumentAtLocation = function(xmlDocument,url,registeredArguments) {
	//CSS can be linked using either a <style> tag or a <link> tag. I'm going to import them, and only looking at the head child nodes.
	var head = window.document.getElementsByTagName("head")[0];	
	var candidateNodes = [];
	candidateNodes.addObjectsFromArray(xmlDocument.getElementsByTagName("style"));
	candidateNodes.addObjectsFromArray(xmlDocument.getElementsByTagName("link"));
	if(candidateNodes) {
		var documentLinksByHref = AC.loadRemoteContent.documentLinksByHref();
		for(var i=0,iNode=null;(iNode = candidateNodes[i]);i++) {
			var href = iNode.getAttribute("href");
			if(documentLinksByHref.hasOwnProperty(href)) {
				continue;
			}
			this.__importCssElementInHeadFromLocation(iNode,head,url);
		}
	}

};

Ajax.Request.prototype._overrideMimeType = null;
Ajax.Request.prototype.overrideMimeType = function(overrideMimeTypeValue) {
	this._overrideMimeType = overrideMimeTypeValue;
	if (this.transport.overrideMimeType) {
		this.transport.overrideMimeType(overrideMimeTypeValue);
	}
};

Ajax.Request.prototype._doesOverrideXMLMimeType = function() {
	return (this._overrideMimeType === "text/xml");
};

Ajax.Response.prototype.responseXMLValue = function() {
	if(AC.Detector.isIEStrict()) {
		var xmlDocument = this.transport.responseXML.documentElement;
		if(!xmlDocument && this.request._doesOverrideXMLMimeType()) {
			this.transport.responseXML.loadXML(this.transport.responseText);
		}
	}
	return this.transport.responseXML;
};


