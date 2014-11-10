if(typeof(Trailers)=="undefined"){Trailers={}}Trailers.reportError=function(l,b,g){try{console.log("exception: ",l,b)
}catch(d){}if(!g&&b){g={message:"",fileName:"",lineNumber:""};g.message=b.message;
if(b.lineNumber){g.lineNumber=b.lineNumber}if(b.fileName){g.fileName=b.fileName
}}var h=$("trailers");h.removeClassName("loading");h.removeClassName("init");h.innerHTML="";
var c=document.createDocumentFragment(),i=$(document.createElement("p"));i.addClassName("error");
i.appendChild(document.createTextNode(l));var k=document.createElement("h2");k.appendChild(document.createTextNode("We’re sorry"));
c.appendChild(k);var f=document.createElement("p");f.appendChild(document.createTextNode("It looks like you need to reset your browser cookie for iTunes Trailers. We suggest you delete your trailers.apple.com and apple.com browser cookie(s) and then restart your browser."));
c.appendChild(f);c.appendChild(i);h.appendChild(c);var a="";for(var j in g){a+=j[0]+":["+g[j]+"]"
}AC.Tracking.trackClick({prop2:a},this,"o",AC.Tracking.pageName()+" error");if(b){throw (b)
}};Trailers.MovieRenderStrategy={Poster:{template:(function(){var b=document.createElement("li");
var c=document.createElement("a");c.appendChild(document.createElement("img"));
b.appendChild(c);var a=document.createElement("h3");a.appendChild(document.createElement("a"));
b.appendChild(a);return b})(),exclusiveFlag:(function(){var a=$(document.createElement("span"));
a.addClassName("exclusive");a.appendChild(document.createTextNode("Exclusive"));
return a})(),hdFlag:(function(){var a=$(document.createElement("span"));a.addClassName("hd");
a.appendChild(document.createTextNode("HD"));return a})(),iTunesFlag:(function(){var a=$(document.createElement("span"));
a.addClassName("itunes");a.appendChild(document.createTextNode("See it in iTunes"));
return a})(),render:function(a){var f=$(this.template.cloneNode(true));var g=f.getElementsByTagName("img")[0];
g.src=a.poster;g.alt=a.title;var b=f.getElementsByTagName("a");for(var d=0,e;(e=b[d]);
d++){e.href=a.location}var c=f.getElementsByTagName("h3")[0].getElementsByTagName("a")[0];
a.title=unescape(a.title);if(a.title.length>23){c.innerHTML=a.title.unescapeHTML().truncate(23).escapeHTML()
}else{c.innerHTML=a.title}if(a.hasExclusive()){f.appendChild(this.exclusiveFlag.cloneNode(true));
f.className+=" exclusive"}if(a.hasHD()){f.appendChild(this.hdFlag.cloneNode(true));
f.className+=" hd"}if(a.hasiTunes()){f.appendChild(this.iTunesFlag.cloneNode(true));
f.className+=" itunes"}return f},createTrailersList:function(e){var d=document.createElement("ul");
for(var b=0;b<e.length;b++){var c=e[b];var a='<li><a href="'+c.url+'">'+c.type+"</a></li>";
d.innerHTML+=a}return d}},Text:{render:function(b){var c=[];var a=0;c[a++]='<a href="';
c[a++]=b.location;c[a++]='">';c[a++]=b.title;c[a++]="</a>";c=c.join("");var d=document.createElement("li");
d.innerHTML+=c;if(b.trailers.length>1){d.innerHTML+=this.createMultiFlag(b.trailers.length)
}if(b.hasHD()){d.innerHTML+=this.createHDFlag(b.location)}if(b.hasiTunes()){d.innerHTML+=this.createiTunesFlag(b.location)
}return d},createMultiFlag:function(b){var c='<img alt="More Trailers" src="http://trailers.apple.com/trailers/home/images/icon_multi20070611.gif">';
var a='<span class="multi">('+b+")</span>";return c+" "+a},createHDFlag:function(c){var a='<img alt="HD" src="http://trailers.apple.com/trailers/home/images/icon_hd20070611.gif">';
var b='<a href="'+c+'">'+a+"</a>";return b},createiTunesFlag:function(a){var b='<a class="itunes" href="'+a+'">See it on iTunes</a>';
return b}},FullText:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],render:function(b){var c=[];
var a=0;c[a++]='<a href="';c[a++]=b.location;c[a++]='">';c[a++]=b.title;c[a++]="</a>";
c=c.join("");var e=document.createElement("li");e.innerHTML+=c;if(b.trailers.length>1){e.innerHTML+=this.createMultiFlag(b.trailers.length)
}if(b.hasHD()){e.innerHTML+=this.createHDFlag(b.location)}if(b.hasiTunes()){e.innerHTML+=this.createiTunesFlag(b.location)
}var f=new Date(b.trailers[0].postdate);e.innerHTML+="<small>Posted "+this.months[f.getMonth()]+" "+f.getDate()+", "+f.getFullYear()+"</small>";
return e},createMultiFlag:function(c){var b=[];var a=0;b[a++]='<img alt="More Trailers" src="http://trailers.apple.com/trailers/home/images/icon_multi20070611.gif"> ';
b[a++]='<span class="multi">(';b[a++]=c;b[a++]=")</span>";return b.join("")},createHDFlag:function(c){var b=[];
var a=0;b[a++]='<a href="';b[a++]=c;b[a++]='">';b[a++]='<img alt="HD" src="http://trailers.apple.com/trailers/home/images/icon_hd20070611.gif">';
b[a++]="</a>";return b.join("")},createiTunesFlag:function(a){var b='<a class="itunes" href="'+a+'">See it on iTunes</a>';
return b}}};Trailers.ViewTypes={PosterView:{id:"PosterView",name:"Poster View",className:"view-poster",defaultStrategy:function(){return this.strategies.Poster
},strategies:{Poster:{name:"Poster",render:function(b){var a=[];b.eachSlice(this.selectPageSize()).each(function(f){var e=document.createElement("ul");
var g=document.createDocumentFragment();for(var d=0,c;(c=f[d]);d++){g.appendChild(Trailers.MovieRenderStrategy.Poster.render(c))
}e.appendChild(g);a.push(e)});return a},selectPageSize:function(){return (navigator.userAgent.match(/AppleWebKit/i) && navigator.userAgent.match(/Mobile/i))?35:30
}}}},TextView:{id:"TextView",name:"Text View",className:"view-textfourcolumn",defaultStrategy:function(){return this.strategies.TextFourColumn
},strategies:{GroupTextFourColumn:{name:"GroupedText",columns:4,render:function(e){var a=[];
var l=this.getMovieCount(e);var h=Math.ceil(l/this.columns);var f=$(document.createElement("div"));
f.addClassName("studiolist grid4col");var k=null;var j=0;var m=0;for(var d=0;d<this.columns;
d++){var b=$(document.createElement("div"));b.addClassName("column");if(d==0){Element.addClassName(b,"first")
}if(d==this.columns-1){Element.addClassName(b,"last")}if(k&&e[j]&&k.movies[m]){this.addGroupContinued(e[j],b)
}var g=0;var c=null;while(e[j]&&g<h){if(k!=e[j]){this.addGroupHeader(e[j],b);k=e[j];
c=null}if(k.movies[m]){if(!c){c=document.createElement("ul");b.appendChild(c)}this.addMovie(k.movies[m],c);
m++;g++}else{m=0;j++}}f.appendChild(b)}a.push(f);return a},getMovieCount:function(b){var a=0;
b.each(function(c){a+=c.movies.length});return a},addGroupHeader:function(b,a){if(b.url){a.innerHTML+='<h4><a href="'+b.url.replace(/\/iphone/,"")+'">'+b.name+"</a></h4>"
}else{a.innerHTML+="<h4>"+b.name+"</h4>"}},addGroupContinued:function(b,a){a.innerHTML+="<h4>"+b.name+" continued…</h4>"
},addMovie:function(a,b){b.appendChild(Trailers.MovieRenderStrategy.Text.render(a))
}},TextFourColumn:{name:"Text",columns:3,render:function(b){var a=[];this.rows=Math.ceil(b.length/this.columns);
b.eachSlice(this.columns*this.rows).each(function(e){var c=0;var d=document.createElement("div");
Element.addClassName(d,"textview");Element.addClassName(d,"grid3col");e.eachSlice(this.rows,function(h){var g=document.createElement("div");
Element.addClassName(g,"column");if(c==0){Element.addClassName(g,"first")}if(c==this.columns-1){Element.addClassName(g,"last")
}var f=document.createElement("ul");g.appendChild(f);h.each(function(i){f.appendChild(Trailers.MovieRenderStrategy.FullText.render(i))
});c++;d.appendChild(g)}.bind(this));a.push(d)}.bind(this));return a}}}}};Trailers.ViewTypeControls=Class.create();
Object.extend(Trailers.ViewTypeControls.prototype,Event.Listener);Object.extend(Trailers.ViewTypeControls.prototype,{_delegate:null,_container:null,_controls:null,initialize:function(){this._container=$(document.createElement("div"));
Event.observe(this._container,"click",function(b){b.preventDefault();var a=null,d,c=b.element();
if(!c.href){return}for(d in Trailers.ViewTypes){if(c.hasClassName(Trailers.ViewTypes[d].className)){a=Trailers.ViewTypes[d]
}}this.setViewType(a,true)}.bindAsEventListener(this));this._render()},setDelegate:function(a){if(this._delegate===a){return
}if(this._delegate){this.stopListeningForEvent(this._delegate,"willShowSection",false,this._refresh)
}this._delegate=a;if(this._delegate){this.listenForEvent(this._delegate,"willShowSection",false,this._refresh)
}},_render:function(){var c,a,b;for(c in Trailers.ViewTypes){a=Trailers.ViewTypes[c];
b=document.createElement("a");b.setAttribute("title",a.name);b.setAttribute("href","#"+a.className);
b.innerHTML=a.name;Element.addClassName(b,a.className);this._container.appendChild(b)
}this._refresh();this._render=Prototype.emptyFunction},_refresh:function(){var d,a,c,b,e,f=false;
for(d in Trailers.ViewTypes){a=Trailers.ViewTypes[d];c=$(this._container.getElementsByClassName(a.className)[0]);
b=false;e=false;if(this._delegate&&typeof this._delegate.shouldActivateTriggerForViewType==="function"){e=this._delegate.shouldActivateTriggerForViewType(this,a)
}if(e){c.addClassName("active");f=true}else{c.removeClassName("active")}if(this._delegate&&typeof this._delegate.shouldEnableTriggerForViewType==="function"){b=this._delegate.shouldEnableTriggerForViewType(this,a)
}if(b){c.removeClassName("disabled")}else{c.addClassName("disabled")}c=null}},setViewType:function(a,b){if(!a){return
}if(this._delegate&&typeof this._delegate.willSetViewType==="function"){if(this._delegate.willSetViewType(this,a,b)){this._refresh()
}}}});Trailers.Navigator=Class.create();Object.extend(Trailers.Navigator.prototype,Event.Listener);
Object.extend(Trailers.Navigator.prototype,{container:null,delegate:null,previousControl:null,nextControl:null,currentPageControl:null,pageControls:[],initialize:function(){this._layout();
this.container.observe("click",function(a){if(!this.delegate){return}var b=a.element();
while(b.tagName!="A"&&b.tagName!="BODY"){b=b.parentNode}if(!b.href){return}if(b.hasClassName("disabled")){a.preventDefault();
return}if(b.hasClassName("next")&&typeof(this.delegate.showNextPage)==="function"){this.delegate.showNextPage()
}else{if(b.hasClassName("previous")&&typeof(this.delegate.showPreviousPage)==="function"){this.delegate.showPreviousPage()
}else{var c=b.href.match(/page=(\d+)/);if(c&&c[1]){if((c[1]-1)===this.delegate.currentPageIndex()){a.preventDefault();
return}this.delegate.showPageAtIndex(c[1]-1)}}}}.bind(this))},setDelegate:function(a){if(this.delegate===a){return
}this.delegate=a},_layout:function(){this.container=$(document.createElement("div"));
this.container.addClassName("pagenav");this.previousControl=this._createControl("previous");
this.container.appendChild(this.previousControl);this.pageControlContainer=$(document.createElement("div"));
this.pageControlContainer.addClassName("pages");this.container.appendChild(this.pageControlContainer);
this.nextControl=this._createControl("next");this.container.appendChild(this.nextControl);
this._layout=Prototype.emptyFunction},refresh:function(){if(this.delegate&&this.delegate.pageCount()>0){this._createPageControls()
}else{this.pageControlContainer.innerHTML=""}var b=NaN;if(this.delegate){b=this.delegate.currentPageIndex()
}if(this.delegate&&this.delegate.hasPreviousPage()){this.previousControl.removeClassName("disabled");
var c=b}else{this.previousControl.addClassName("disabled")}if(this.delegate&&this.delegate.hasNextPage()){this.nextControl.removeClassName("disabled");
var a=(b+2)}else{this.nextControl.addClassName("disabled")}if(this.currentPageControl){Element.removeClassName(this.currentPageControl,"active")
}if(this.pageControls[b]){this.currentPageControl=this.pageControls[b];Element.addClassName(this.currentPageControl,"active")
}setTimeout(function(){this.previousControl.setAttribute("href","#section="+this.delegate.currentSection.id+"&page="+c);
this.nextControl.setAttribute("href","#section="+this.delegate.currentSection.id+"&page="+a)
}.bind(this),0)},_createControl:function(a){var b=$(document.createElement("a"));
b.setAttribute("href","#");Element.addClassName(b,a);b.innerHTML=a.capitalize();
return b},_createPageControls:function(){this.pageControlContainer.innerHTML="";
this.pageControls=[];for(var b=0;b<this.delegate.pageCount();b++){var a=document.createElement("a");
a.setAttribute("href","#section="+this.delegate.currentSection.id+"&page="+(b+1));
a.innerHTML=b+1;if(b===0){this.currentPageControl=a}else{if((b+1)==this.delegate.pageCount()){Element.addClassName(a,"last")
}}this.pageControls.push(a);this.pageControlContainer.appendChild(a)}},hide:function(){this.container.hide()
},show:function(){Element.show(this.container)}});Trailers.Movie=Class.create({releasedate:new Date(this.release_date),hasExclusive:function(){return this._hasTrailerWith("exclusive")
},hasHD:function(){return this._hasTrailerWith("hd")},hasiTunes:function(){return(this.urltype=="itunes")
},_hasTrailerWith:function(c){var b=false;var a=this.trailers.length-1;while(a>=0&&!b){b=this.trailers[a][c];
a--}return b}});Trailers.Gallery=Class.create();Object.extend(Trailers.Gallery.prototype,Event.Publisher);
Object.extend(Trailers.Gallery.prototype,Event.Listener);Object.extend(Trailers.Gallery.prototype,{sections:null,sectionMaster:null,currentSection:null,_currentViewType:null,initialize:function(a){this.sections=$H();
this._currentViewType=this.savedViewType()||Trailers.ViewTypes.PosterView;this.viewTypeChooser=new Trailers.ViewTypeControls();
this.viewTypeChooser.setDelegate(this);$(a).appendChild(this.viewTypeChooser._container);
this.sectionMaster=new AC.ViewMaster.Viewer(null,"trailers","trailers-link",{sectionRegExp:/#section=(.*)$/});
this.sectionMaster.setDelegate(this)},addSection:function(a){this.sectionMaster.sections.set(a.id,a);
this.sections.set(a.id,a);a.setDelegate(this);if(!this.initialSection){this.initialSection=a
}},contentDidLoad:function(a){this.sectionMaster.view.setLoadedContent(a);this._showContentDidLoad=false
},contentFailedLoading:function(d,c,b){var a=null;var e={message:"",fileName:"",lineNumber:""};
if(c&&c.status&&c.status!==200){a="Trailers data missing.";e.message="Failed Request: ("+c.status+") "+c.request.url
}else{if(b){a="Unexpected error.";if(b.message.match(/^Parse error: /)){a="Unable to parse Trailers data."
}e.message=b.message;if(b.lineNumber){e.lineNumber=b.lineNumber}if(b.fileName){e.fileName=b.fileName
}}}Trailers.reportError(a,b,e)},willShow:function(b,d,c){var a=b.view.view();if(a.hasClassName("init")){a.innerHTML="";
a.removeClassName("init")}this.previousSection=d;this.currentSection=c;if(this.previousSection==this.currentSection){this.sectionMaster.options.shouldAnimateContentChange=false
}this.dispatchEvent("willShowSection",this);return this.currentSection.content},willClose:function(b,c,a){if(c&&c!=a){c.hide()
}},didShow:function(a){if(this.sectionMaster){if(this.sectionMaster.previousSection){this.sectionMaster.previousSection.content.style.display=""
}this.sectionMaster.options.alwaysShowSection=false;this.sectionMaster.options.shouldAnimateContentChange=true
}},pageCount:function(){if(this.currentSection){return this.currentSection.pageCount()
}else{return 0}},currentPageIndex:function(){if(this.currentSection){return this.currentSection.currentPageIndex
}else{return NaN}},hasPreviousPage:function(){if(this.currentSection){return isFinite(this.currentSection.previousPageIndex())
}else{return false}},showPreviousPage:function(){if(!this.currentSection){return
}var a=this.currentSection.previousPageIndex();this.showPageAtIndex(a)},hasNextPage:function(){if(this.currentSection){return isFinite(this.currentSection.nextPageIndex())
}else{return false}},showNextPage:function(){if(!this.currentSection){return}var a=this.currentSection.nextPageIndex();
this.showPageAtIndex(a)},showPageAtIndex:function(a){if(!this.currentSection||!isFinite(a)||this.currentPageIndex()==a){return
}this.currentSection.showPage(a);this.currentSection.currentPageIndex=a;this.dispatchEvent("didShowPage",this)
},shouldEnableTriggerForViewType:function(b,a){return this.currentSection&&!!this.currentSection.viewStrategyForViewType(a)
},shouldActivateTriggerForViewType:function(b,a){return a&&a===this._currentViewType
},willSetViewType:function(b,a,c){this.setViewType(a,c)},setViewType:function(a,b){if(this._currentViewType===a||!this.currentSection.viewStrategyForViewType(a)){return false
}this._currentViewType=a;if(this.currentSection.pages.length>0){this.currentSection.clear();
this.sectionMaster.options.alwaysShowSection=true;this.sectionMaster.show(this.currentSection)
}if(b){this._setCookie()}return true},viewType:function(){return this._currentViewType
},savedViewType:function(){var a=this._readCookie();if(a){return Trailers.ViewTypes[a]
}return null},_readCookie:function(){return document.cookie.replace(/\?/g,"+").replace(/;/g,"&").replace(/\s/g,"").toQueryParams()["trailers_viewType"]
},_setCookie:function(){document.cookie="trailers_viewType="+escape(this._currentViewType.id)+";expires="+new Date(new Date().getTime()+31536000000).toGMTString()
}});Trailers.Section=Class.create();Object.extend(Trailers.Section.prototype,Event.Listener);
Object.extend(Trailers.Section.prototype,AC.ViewMaster.Section.prototype);Object.extend(Trailers.Section.prototype,{container:null,feedUrl:null,_loading:false,movies:null,pages:[],cache:{},currentPageIndex:0,locked:false,delegate:null,initialize:function(a,b){this.id=a;
this.feedUrl=b;this.movies=[];this.content=$(document.createElement("div"))},setDelegate:function(a){this.delegate=a;
this.viewMaster=a.sectionMaster},acceptedViewStrategies:function(){var c=[],b,a;
for(b in Trailers.ViewTypes){a=Trailers.ViewTypes[b];c.push(a.defaultStrategy())
}return c},acceptsViewStrategy:function(a){return this.acceptedViewStrategies().include(a)
},viewStrategyForViewType:function(a){if(Trailers.ViewTypes.TextView==a){return Trailers.ViewTypes.TextView.strategies.TextFourColumn
}else{return Trailers.ViewTypes.PosterView.strategies.Poster}},isContentLoaded:function(){return this.movies.length>0
},isContentRendered:function(){if(this.pages.length===0){return false}if(this.delegate&&this.delegate.viewType()!==this._currentViewType){this.clear();
return false}return true},loadContent:function(){if(this._loading){return}this._loading=true;
if(this.delegate&&typeof this.delegate.willLoadContent==="function"){this.delegate.willLoadContent(this)
}var a=this._remoteContentFailedLoading.bind(this);new Ajax.Request(this.feedUrl,{method:"GET",evalJSON:false,onSuccess:this._remoteContentDidLoad.bind(this),onException:a,onFailure:a})
},_remoteContentDidLoad:function(remoteContent){try{var movies=eval("("+remoteContent.responseText+")")
}catch(e){throw new Error("Parse error: "+remoteContent.request.url)}for(var i=0,movie;
(movie=movies[i]);i++){Object.extend(movie,Trailers.Movie.prototype);this.movies.push(movie)
}this._isContentLoaded=true;if(this.delegate&&typeof this.delegate.contentDidLoad==="function"){this.delegate.contentDidLoad(this)
}this._loading=false},_remoteContentFailedLoading:function(b,a){if(this.delegate&&typeof this.delegate.contentFailedLoading==="function"){this.delegate.contentFailedLoading(this,b,a)
}this._loading=false},listToRender:function(){return this.movies},render:function(a){if(typeof(this.beforeRender)=="function"){this.beforeRender()
}this._currentViewType=this.delegate.viewType();var c=this.viewStrategyForViewType(this._currentViewType);
if(!c){c=this.acceptedViewStrategies()[0]}this.pages=c.render(this.listToRender());
var b=document.createDocumentFragment();this.pages.each(function(d){b.appendChild(d);
Element.hide(d)}.bind(this));this.content.appendChild(b);this.createNav();if(this.currentPageIndex>=this.pages.length){this.currentPageIndex=0
}},willShow:function(){if(!this.isContentRendered()){this.render()}this.showPage(this.currentPageIndex||0,true);
return this.content},show:function(){if(this.loading){return}},hide:function(){var a=$("sn-"+this.id);
if(a){a.down().removeClassName("active")}this.content.parentNode.removeChild(this.content)
},clear:function(){this.content.innerHTML="";this.pages=[]},showPage:function(a,c){if(!c&&(this.locked||a==this.currentPageIndex)){return
}this.locked=true;if(typeof(this.currentPageIndex)!=="undefined"){var b=this.pages[this.currentPageIndex];
if(b){b.hide()}}if(typeof(a)!=="undefined"){var b=this.pages[a];if(b){Element.show(b)
}}this.currentPageIndex=a;if(this.topPageNav){this.topPageNav.refresh()}if(this.bottomPageNav){this.bottomPageNav.refresh()
}this.locked=false},pageCount:function(){return this.pages.length},nextPageIndex:function(){if(this.pages.length==0||(this.pages.length-1)==this.currentPageIndex){return NaN
}else{return this.currentPageIndex+1}},previousPageIndex:function(){if(0==this.currentPageIndex){return NaN
}else{return this.currentPageIndex-1}},createNav:function(){if(this.pages.length>1){this.topPageNav=new Trailers.Navigator();
this.topPageNav.setDelegate(this.delegate);this.content.insert({top:this.topPageNav.container});
this.bottomPageNav=new Trailers.Navigator();this.bottomPageNav.setDelegate(this.delegate);
this.content.appendChild(this.bottomPageNav.container)}}});Trailers.SearchSection=Class.create(Trailers.Section,{initialize:function(a,b){this.id=a;
this._trigger=$(a);this._searching=new Element("div",{className:"searching"});this._trigger.appendChild(this._searching);
this._input=this._trigger.down("input");this._input.observe("focus",this.handler.bind(this));
this._input.observe("blur",this.handler.bind(this));this._input.observe("keyup",this.handler.bind(this));
this.showCallout=!this._readCookie();this.movies=[];this.feedUrl=b;this.content=$(document.createElement("div"))
},_indicateLoadingStatus:function(b){if(this.delegate&&this.delegate.sectionMaster&&this.delegate.sectionMaster.container){var a=this.delegate.sectionMaster.container
}if(b){this.loading=true;this.content.addClassName("loading");this._indicateSearchingStatus(true);
if(a){a.addClassName("loading")}}else{this.loading=false;this.content.removeClassName("loading");
this._indicateSearchingStatus(false);if(a){a.removeClassName("loading")}}},_indicateSearchingStatus:function(a){if(a){this._trigger.addClassName("searching")
}else{this._trigger.removeClassName("searching")}},callout:function(){if(this.showCallout&&(this._input.value==""||this._input.value=="Quick Find")){if(!this._callout){this._callout=new Element("div",{id:"quickfind_callout",className:"callout"});
this._callout.innerHTML='<div class="relative"><div class="padder"><p>Find Movie Trailers by keyword including Title, Director, and Cast.</p><span class="noshow">Don’t show this again</span></div><div class="bottomcap"></div></div>';
this._trigger.appendChild(this._callout);this._callout.down("span.noshow").observe("click",this.handler.bind(this))
}this._callout.show()}},hideCallout:function(){if(this._callout){if(this._callout.parentNode){this._callout.hide()
}}},dontShowAgain:function(){this.hideCallout();this.showCallout=false;this._setCookie()
},clearTimeout:function(){if(this.timeout){window.clearTimeout(this.timeout);this.timeout=null
}},handler:function(a){this.clearTimeout();if(a.type=="click"){if(typeof(a.findElement)=="function"){var c=a.findElement("span.noshow");
if(c){this.dontShowAgain()}}}else{if(a.type=="blur"){this.timeout=window.setTimeout(function(){this.hideCallout();
this._didShowInitial=false}.bind(this),200)}else{if(a.type=="focus"){this.timeout=window.setTimeout(function(){this.callout()
}.bind(this),200)}else{if(a.type=="keyup"){if(this._input.value==this.previousPartial){return
}var b=(this._didShowInitial)?400:50;if(a.keyCode==Event.KEY_RETURN){b=50}this.timeout=window.setTimeout(this.sendRequest.bind(this),b)
}}}}},isContentRendered:function(){return false},isContentLoaded:function(){if(this.partial==""&&this.partial=="Quick Find"){return true
}if(this.partial==this.previousPartial){return true}return false},sendRequest:function(){if(this.loading){return
}this.callout();this.partial=this._input.value;if(this.partial&&this.partial.length>1){this.loadContent()
}},loadContent:function(){if(this.loading){return}this._indicateLoadingStatus(true);
this.clear();this.hideCallout();this.movies=[];this.currentPageIndex=0;searchCallback=this.remoteContentDidLoad.bind(this);
if(this.scriptNode){Element.remove(this.scriptNode)}this.scriptNode=document.createElement("script");
this.scriptNode.setAttribute("charset","utf-8");this.scriptNode.setAttribute("type","text/javascript");
this.scriptNode.setAttribute("src",this.feedUrl+this.partial+"&="+new Date());var a=document.getElementsByTagName("head")[0];
a.appendChild(this.scriptNode);this._didShowInitial=true;this.previousPartial=this.partial
},remoteContentDidLoad:function(c){var a=c.results;for(var b=0;b<a.length;b++){Object.extend(a[b],Trailers.Movie.prototype);
this.movies.push(a[b])}if(this.delegate&&this.delegate.sectionMaster){this.delegate.sectionMaster._locked=false;
this.delegate.sectionMaster.options.alwaysShowSection=true}this._indicateLoadingStatus(false);
this.delegate.sectionMaster.show(this)},willClose:function(){},beforeRender:function(){if(this.content){this.content.innerHTML=""
}if(this.movies.length<1){this.content.innerHTML='<div id="nomatch">No Match Found. Please try again.</div>';
this._didShowInitial=false}},_readCookie:function(){return document.cookie.replace(/;/g,"&").replace(/\s/g,"").toQueryParams()["trailers_quickFindCallout"]
},_setCookie:function(){document.cookie="trailers_quickFindCallout=true;expires="+new Date(new Date().getTime()+31536000000).toGMTString()
}});Trailers.PosterSection=Class.create();Object.extend(Trailers.PosterSection.prototype,Trailers.Section.prototype);
Trailers.StudioSection=Class.create();Object.extend(Trailers.StudioSection.prototype,Trailers.Section.prototype);
Object.extend(Trailers.StudioSection.prototype,Event.Listener);Object.extend(Trailers.StudioSection.prototype,{studios:[],acceptedViewStrategies:function(){return[Trailers.ViewTypes.TextView.strategies.GroupTextFourColumn]
},viewStrategyForViewType:function(a){if(Trailers.ViewTypes.TextView==a){return Trailers.ViewTypes.TextView.strategies.GroupTextFourColumn
}else{return null}},beforeRender:function(){var d={};var c=[];for(var b=0;b<this.movies.length;
b++){var a=this.movies[b].studio;if(!d[a]){c.push(a);d[a]={name:a,url:this.movies[b].location.replace(/([a-zA-Z0-9_]*\/)$/g,""),movies:[]}
}d[a].movies.push(this.movies[b])}this.studios=c.collect(function(e){return d[e]
})},listToRender:function(){return this.studios}});Trailers.GenreSection=Class.create(Trailers.Section,{genres:[],acceptedViewStrategies:function(){return[Trailers.ViewTypes.TextView.strategies.GroupTextFourColumn]
},viewStrategyForViewType:function(a){if(Trailers.ViewTypes.TextView==a){return Trailers.ViewTypes.TextView.strategies.GroupTextFourColumn
}else{return null}},beforeRender:function(){var d={};var c=[];for(var b=0;b<this.movies.length;
b++){var a=this.movies[b].genre[0];if(!d[a]){c.push(a);d[a]={name:a,url:"/trailers/genres/"+a.toLowerCase().replace(/\s/g,"_")+"/",movies:[]}
}d[a].movies.push(this.movies[b])}this.genres=c.collect(function(e){return d[e]
})},listToRender:function(){return this.genres}});
