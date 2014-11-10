function one(){
	var prev = document.getElementById("navprev");
	prev.className = "previous disabled";
	prev.setAttribute("disabled", "");
	var last = document.getElementById("navnext");
	last.className = "next";
	last.removeAttribute("disabled");

	//Also we must make the first one active 
	var a1 = document.getElementById("a1");
	var a2 = document.getElementById("a2");
	var a3 = document.getElementById("a3");
	a1.className = "active";
	a2.className = "";
	a3.className = "last";

	ul = document.getElementById("m0").parentNode;
	listLi = ul.getElementsByTagName("li");
	listLength = listLi.length;
	for (var i = 0; i < listLength; i++) {
		var movie = document.getElementById("m" + i);
		if(i < 30)
			movie.setAttribute("style", "display: list-item");
		else
			movie.setAttribute("style", "display: none");

	}
}

function two(){

	var prev = document.getElementById("navprev");
	prev.className = "previous";
	prev.removeAttribute("disabled");
	var last = document.getElementById("navnext");
	last.className = "next";
	last.removeAttribute("disabled");

	//Also we must make the first one active 
	var a2 = document.getElementById("a2");
	var a1 = document.getElementById("a1");
	var a3 = document.getElementById("a3");
	a2.setAttribute("class", "active");
	a1.removeAttribute("class");
	a3.setAttribute("class", "last");

	ul = document.getElementById("m0").parentNode;
	listLi = ul.getElementsByTagName("li");
	listLength = listLi.length;
	for (var i = 0; i < listLength; i++) {
		var movie = document.getElementById("m" + i);
		if (i < 30) 
			movie.setAttribute("style", "display: none");
		else if (i < 60)
			movie.setAttribute("style", "display: list-item");
		else
			movie.setAttribute("style", "display: none");
	}
}

function three(){
	var prev = document.getElementById("navprev");
	prev.className = "previous";
	prev.removeAttribute("disabled");
	var last = document.getElementById("navnext");
	last.className = "next disabled";
	last.setAttribute("disabled", "");

	//Also we must make the first one active 
	var a2 = document.getElementById("a2");
	var a1 = document.getElementById("a1");
	var a3 = document.getElementById("a3");
	a3.setAttribute("class", "active last");
	a1.removeAttribute("class");
	a2.removeAttribute("class");

	ul = document.getElementById("m0").parentNode;
	listLi = ul.getElementsByTagName("li");
	listLength = listLi.length;
	for (var i = 0; i < listLength; i++) {
		var movie = document.getElementById("m" + i);
		if (i < 60) 
			movie.setAttribute("style", "display: none");
		else 
			movie.setAttribute("style", "display: list-item");
	}
}

function prev(){
	var a2 = document.getElementById("a2");
	if (a2.className === "active")
		one();
	else
		two();
}

function nextThing(){
	var a2 = document.getElementById("a2");
	if (a2.className === "active")
		three();
	else
		two();
}