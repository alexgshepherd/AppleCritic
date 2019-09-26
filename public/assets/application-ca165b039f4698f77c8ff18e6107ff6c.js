/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  createDocument = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.querySelector('head').childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var buildTestsUsing, createDocumentUsingDOM, createDocumentUsingFragment, createDocumentUsingParser, createDocumentUsingWrite, docTest, docTests, e, _i, _len;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    createDocumentUsingFragment = function(html) {
      var body, doc, head, htmlWrapper, _ref, _ref1;
      head = ((_ref = html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)) != null ? _ref[0] : void 0) || '<head></head>';
      body = ((_ref1 = html.match(/<body[^>]*>([\s\S.]*)<\/body>/i)) != null ? _ref1[0] : void 0) || '<body></body>';
      htmlWrapper = document.createElement('html');
      htmlWrapper.innerHTML = head + body;
      doc = document.createDocumentFragment();
      doc.appendChild(htmlWrapper);
      return doc;
    };
    buildTestsUsing = function(createMethod) {
      var buildTest, formNestingTest, structureTest;
      buildTest = function(fallback, passes) {
        return {
          passes: passes(),
          fallback: fallback
        };
      };
      structureTest = buildTest(createDocumentUsingWrite, (function(_this) {
        return function() {
          var _ref, _ref1;
          return ((_ref = createMethod('<html><body><p>test')) != null ? (_ref1 = _ref.body) != null ? _ref1.childNodes.length : void 0 : void 0) === 1;
        };
      })(this));
      formNestingTest = buildTest(createDocumentUsingFragment, (function(_this) {
        return function() {
          var _ref, _ref1;
          return ((_ref = createMethod('<html><body><form></form><div></div></body></html>')) != null ? (_ref1 = _ref.body) != null ? _ref1.childNodes.length : void 0 : void 0) === 2;
        };
      })(this));
      return [structureTest, formNestingTest];
    };
    try {
      if (window.DOMParser) {
        docTests = buildTestsUsing(createDocumentUsingParser);
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      docTests = buildTestsUsing(createDocumentUsingDOM);
      return createDocumentUsingDOM;
    } finally {
      for (_i = 0, _len = docTests.length; _i < _len; _i++) {
        docTest = docTests[_i];
        if (!docTest.passes) {
          return docTest.fallback;
        }
      }
    }
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = __bind(this._trickle, this);
      this.value = 0;
      this.opacity = 1;
      this.content = '';
      this.speed = 300;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var _ref;
      if ((value > (_ref = this.value) && _ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = 1;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return "" + this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
(function() {


}).call(this);
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
;
if(typeof(AC)==="undefined"){AC={}}AC.Detector={getAgent:function(){return navigator.userAgent.toLowerCase()
},isMac:function(c){var d=c||this.getAgent();return !!d.match(/mac/i)},isSnowLeopard:function(c){if(typeof console!="undefined"){console.warn('Instead of AC.Detector.isSnowLeopard, please use AC.Detector.macOSAtLeastVersion("10.6").')
}var d=c||this.getAgent();return !!d.match(/mac os x 10_6/i)},macOSVersion:function(g){var h=g||this.getAgent();
if(!this.isMac(h)){return null}var f=h.match(/(mac os x )([\d\._]*)/i);if(f==null){return f
}if(!!f[2].match(/\./)){f=f[2].split(".")}else{f=f[2].split("_")}for(var e=0;e<f.length;
e++){f[e]=parseInt(f[e])}return f},macOSAtLeastVersion:function(h,i){if(typeof h=="undefined"){return false
}var g=this.macOSVersion(i);if(g==null){return false}if(typeof h=="string"){h=h.replace(".","_").split("_")
}for(var j=0;j<h.length;j++){var f=parseInt(g[j]);if(isNaN(f)){f=0}if(parseInt(h[j])>f){return false
}}return true},isWin:function(c){var d=c||this.getAgent();return !!d.match(/win/i)
},winVersion:function(f){var d=f||this.getAgent();if(this.isWin(d)){var e=d.match(/nt\s*([\d\.]*)/);
if(e&&e[1]){return parseFloat(e[1])}return true}return false},winAtLeastVersion:function(f,d){if(typeof f=="undefined"){return false
}f=parseFloat(f);if(f===NaN){return false}var e=this.winVersion(d);if(e===null||e===false||e===true){return false
}return(f<=e)},isWin2k:function(c){var d=c||this.getAgent();return this.isWin(d)&&(d.match(/nt\s*5/i))
},isWinVista:function(c){var d=c||this.getAgent();return this.isWin(d)&&(d.match(/nt\s*6\.0([0-9]{0,2})?/i))
},isWebKit:function(c){if(this._isWebKit===undefined){var d=c||this.getAgent();
this._isWebKit=!!d.match(/AppleWebKit/i);this.isWebKit=function(){return this._isWebKit
}}return this._isWebKit},isSafari2:function(f){if(typeof console!="undefined"){console.warn("Instead of AC.Detector.isSafari2(), please use AC.Detector.isWebKit().")
}var d=f||this.getAgent();if(this._isSafari2===undefined){if(!this.isWebKit(d)){this._isSafari2=false
}else{var e=parseInt(parseFloat(d.substring(d.lastIndexOf("safari/")+7)),10);this._isSafari2=(e>=419)
}this.isSafari2=function(){return this._isSafari2}}return this._isSafari2},isChrome:function(c){if(this._isChrome===undefined){var d=c||this.getAgent();
this._isChrome=!!d.match(/Chrome/i);this.isChrome=function(){return this._isChrome
}}return this._isChrome},isiPhone:function(c){if(typeof console!="undefined"){console.warn("Instead of AC.Detector.isiPhone(), please use AC.Detector.isMobile().")
}var d=c||this.getAgent();return this.isMobile(d)},iPhoneOSVersion:function(k){if(typeof console!="undefined"){console.warn("Instead of AC.Detector.iPhoneOSVersion(), please use AC.Detector.iOSVersion().")
}var l=k||this.getAgent(),h=this.isMobile(l),j,i,g;if(h){var j=l.match(/.*CPU ([\w|\s]+) like/i);
if(j&&j[1]){i=j[1].split(" ");g=i[2].split("_");return g}else{return[1]}}return null
},isiPad:function(c){var d=c||this.getAgent();return !!(this.isWebKit(d)&&d.match(/ipad/i))
},isMobile:function(c){var d=c||this.getAgent();return this.isWebKit(d)&&(d.match(/Mobile/i)&&!this.isiPad(d))
},_iOSVersion:null,iOSVersion:function(){if(this._iOSVersion===null){this._iOSVersion=(AC.Detector.isMobile()||AC.Detector.isiPad())?parseFloat(navigator.userAgent.match(/os ([\d_]*)/i)[1].replace("_",".")):false
}return this._iOSVersion},isOpera:function(c){var d=c||this.getAgent();return !!d.match(/opera/i)
},isIE:function(c){var d=c||this.getAgent();return !!d.match(/msie/i)},isIEStrict:function(c){var d=c||this.getAgent();
return d.match(/msie/i)&&!this.isOpera(d)},isIE8:function(g){var h,e,f;h=g||this.getAgent();
e=h.match(/msie\D*([\.\d]*)/i);f=-1;if(e&&e[1]){f=e[1]}return(+f>=8)},isFirefox:function(c){var d=c||this.getAgent();
return !!d.match(/firefox/i)},isiTunesOK:function(c){var d=c||this.getAgent();if(this.isMac(d)){return true
}if(this.winAtLeastVersion(5.1,d)){return true}return false},_isQTInstalled:undefined,isQTInstalled:function(){if(this._isQTInstalled===undefined){var e=false;
if(navigator.plugins&&navigator.plugins.length){for(var d=0;d<navigator.plugins.length;
d++){var f=navigator.plugins[d];if(f.name.indexOf("QuickTime")>-1){e=true}}}else{if(typeof(execScript)!="undefined"){qtObj=false;
execScript('on error resume next: qtObj = IsObject(CreateObject("QuickTimeCheckObject.QuickTimeCheck.1"))',"VBScript");
e=qtObj}}this._isQTInstalled=e}return this._isQTInstalled},getQTVersion:function(){var f="0";
if(navigator.plugins&&navigator.plugins.length){for(var h=0;h<navigator.plugins.length;
h++){var g=navigator.plugins[h];var e=g.name.match(/quicktime\D*([\.\d]*)/i);if(e&&e[1]){f=e[1]
}}}else{if(typeof(execScript)!="undefined"){ieQTVersion=null;execScript('on error resume next: ieQTVersion = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1").QuickTimeVersion',"VBScript");
if(ieQTVersion){f=ieQTVersion.toString(16);f=[f.charAt(0),f.charAt(1),f.charAt(2)].join(".")
}}}return f},isQTCompatible:function(j,h){function f(c,a){var d=parseInt(c[0],10);
if(isNaN(d)){d=0}var b=parseInt(a[0],10);if(isNaN(b)){b=0}if(d===b){if(c.length>1){return f(c.slice(1),a.slice(1))
}else{return true}}else{if(d<b){return true}else{return false}}}var i=j.split(/\./);
var g=h?h.split(/\./):this.getQTVersion().split(/\./);return f(i,g)},isValidQTAvailable:function(b){return this.isQTInstalled()&&this.isQTCompatible(b)
},isSBVDPAvailable:function(b){return false},_svgAsBackground:null,svgAsBackground:function(f){if(this._svgAsBackground===null){var d=function(){AC.Detector._svgAsBackground=true;
if(typeof(f)=="function"){f()}};var e=document.createElement("img");e.setAttribute("src","data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzUiIGhlaWdodD0iMjc1Ij48L3N2Zz4%3D");
if(e.complete){e.style.visibility="hidden";e.style.position="absolute";document.body.appendChild(e);
window.setTimeout(function(){AC.Detector._svgAsBackground=false;if(e.width>=100){document.body.removeChild(e);
d()}else{document.body.removeChild(e)}},1)}else{this._svgAsBackground=false;e.onload=d
}}else{if(this._svgAsBackground&&typeof(f)=="function"){f()}}return this._svgAsBackground
},_style:null,_prefixes:null,_preFixes:null,_css:null,isCSSAvailable:function(i){if(!this._style){this._style=document.createElement("browserdetect").style
}if(!this._prefixes){this._prefixes="-webkit- -moz- -o- -ms- -khtml- ".split(" ")
}if(!this._preFixes){this._preFixes="Webkit Moz O ms Khtml ".split(" ")}if(!this._css){this._css={}
}i=i.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/,"").toLowerCase();
switch(i){case"gradient":if(this._css.gradient!==undefined){return this._css.gradient
}var i="background-image:",l="gradient(linear,left top,right bottom,from(#9f9),to(white));",m="linear-gradient(left top,#9f9, white);";
this._style.cssText=(i+this._prefixes.join(l+i)+this._prefixes.join(m+i)).slice(0,-i.length);
this._css.gradient=(this._style.backgroundImage.indexOf("gradient")!==-1);return this._css.gradient;
case"inset-box-shadow":if(this._css["inset-box-shadow"]!==undefined){return this._css["inset-box-shadow"]
}var i="box-shadow:",j="#fff 0 1px 1px inset;";this._style.cssText=this._prefixes.join(i+j);
this._css["inset-box-shadow"]=(this._style.cssText.indexOf("inset")!==-1);return this._css["inset-box-shadow"];
default:var n=i.split("-"),r=n.length,o,p,q;if(n.length>0){i=n[0];for(p=1;p<r;p++){i+=n[p].substr(0,1).toUpperCase()+n[p].substr(1)
}}o=i.substr(0,1).toUpperCase()+i.substr(1);if(this._css[i]!==undefined){return this._css[i]
}for(q=this._preFixes.length-1;q>=0;q--){if(this._style[this._preFixes[q]+i]!==undefined||this._style[this._preFixes[q]+o]!==undefined){this._css[i]=true;
return true}}return false}return false},_supportsThreeD:false,supportsThreeD:function(){try{this._supportsThreeD=false;
if("styleMedia" in window){this._supportsThreeD=window.styleMedia.matchMedium("(-webkit-transform-3d)")
}else{if("media" in window){this._supportsThreeD=window.media.matchMedium("(-webkit-transform-3d)")
}}if(!this._supportsThreeD){if(!document.getElementById("supportsThreeDStyle")){var d=document.createElement("style");
d.id="supportsThreeDStyle";d.textContent="@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
document.querySelector("head").appendChild(d)}if(!(div=document.querySelector("#supportsThreeD"))){div=document.createElement("div");
div.id="supportsThreeD";document.body.appendChild(div)}this._supportsThreeD=(div.offsetHeight===3)
}return this._supportsThreeD}catch(c){return false}},_hasGyro:null,_testingForGyro:false,hasGyro:function(){if(this._hasGyro!==null){return this._hasGyro
}if("DeviceOrientationEvent" in window&&window.DeviceOrientationEvent!==null){if(this._testingForGyro===false){this._testingForGyro=true;
var b=this;this.boundTestingForGyro=function(a){b.testingForGyro(a)};window.addEventListener("deviceorientation",this.boundTestingForGyro,true);
this._testGyroTimeout=window.setTimeout(function(){this._hasGyro=false}.bind(this),250)
}return this._hasGyro}else{return this._hasGyro=false}},testingForGyro:function(b){if(this._hasGyro===false){return this._hasGyro
}else{if(typeof b.gamma!=="undefined"&&typeof b.beta!=="undefined"){this._hasGyro=true
}else{this._hasGyro=false}window.clearTimeout(this._testGyroTimeout);window.removeEventListener("deviceorientation",this.boundTestingForGyro,true);
delete this.boundTestingForGyro}},_isiPadWithGyro:null,isiPadWithGyro:function(){if(this._isiPadWithGyro===false||!this.isiPad()){return false
}else{return this._isiPadWithGyro=this.hasGyro()}},_hasLocalStorage:null,hasLocalStorage:function(){if(this._hasLocalStorage!==null){return this._hasLocalStorage
}try{if(typeof localStorage!=="undefined"&&"setItem" in localStorage){localStorage.setItem("ac_browser_detect","test");
this._hasLocalStorage=true;localStorage.removeItem("ac_browser_detect","test")}else{this._hasLocalStorage=false
}}catch(b){this._hasLocalStorage=false}return this._hasLocalStorage},_hasSessionStorage:null,hasSessionStorage:function(){if(this._hasSessionStorage!==null){return this._hasSessionStorage
}try{if(typeof sessionStorage!=="undefined"&&"setItem" in sessionStorage){sessionStorage.setItem("ac_browser_detect","test");
this._hasSessionStorage=true;sessionStorage.removeItem("ac_browser_detect","test")
}else{this._hasSessionStorage=false}}catch(b){this._hasSessionStorage=false}return this._hasSessionStorage
},_hasCookies:null,hasCookies:function(){if(this._hasCookies!==null){return this._hasCookies
}this._hasCookies=("cookie" in document&&!!navigator.cookieEnabled)?true:false;
return this._hasCookies}};
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if(typeof document!=="undefined"&&!("classList" in document.createElement("a"))){(function(t){if(!("HTMLElement" in t)&&!("Element" in t)){return
}var C="classList",x="prototype",q=(t.HTMLElement||t.Element)[x],B=Object,s=String[x].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},A=Array[x].indexOf||function(a){var b=0,c=this.length;for(;b<c;b++){if(b in this&&this[b]===a){return b
}}return -1},p=function(b,a){this.name=b;this.code=DOMException[b];this.message=a
},w=function(a,b){if(b===""){throw new p("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(b)){throw new p("INVALID_CHARACTER_ERR","String contains an invalid character")
}return A.call(a,b)},z=function(a){var b=s.call(a.className),c=b?b.split(/\s+/):[],d=0,f=c.length;
for(;d<f;d++){this.push(c[d])}this._updateClassName=function(){a.className=this.toString()
}},y=z[x]=[],u=function(){return new z(this)};p[x]=Error[x];y.item=function(a){return this[a]||null
};y.contains=function(a){a+="";return w(this,a)!==-1};y.add=function(){var a=arguments,b=0,d=a.length,c,f=false;
do{c=a[b]+"";if(w(this,c)===-1){this.push(c);f=true}}while(++b<d);if(f){this._updateClassName()
}};y.remove=function(){var a=arguments,b=0,f=a.length,c,g=false;do{c=a[b]+"";var d=w(this,c);
if(d!==-1){this.splice(d,1);g=true}}while(++b<f);if(g){this._updateClassName()}};
y.toggle=function(c,b){c+="";var d=this.contains(c),a=d?b!==true&&"remove":b!==false&&"add";
if(a){this[a](c)}return !d};y.toString=function(){return this.join(" ")};if(B.defineProperty){var r={get:u,enumerable:true,configurable:true};
try{B.defineProperty(q,C,r)}catch(v){if(v.number===-2146823252){r.enumerable=false;
B.defineProperty(q,C,r)}}}else{if(B[x].__defineGetter__){q.__defineGetter__(C,u)
}}}(self))}if(document.createEvent){try{new window.CustomEvent("click")}catch(err){window.CustomEvent=(function(){function b(g,f){f=f||{bubbles:false,cancelable:false,detail:undefined};
var a=document.createEvent("CustomEvent");a.initCustomEvent(g,f.bubbles,f.cancelable,f.detail);
return a}b.prototype=window.Event.prototype;return b}())}}if(!Function.prototype.bind){Function.prototype.bind=function(h){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
}var i=Array.prototype.slice.call(arguments,1);var j=this;var g=function(){};var k=function(){return j.apply((this instanceof g&&h)?this:h,i.concat(Array.prototype.slice.call(arguments)))
};g.prototype=this.prototype;k.prototype=new g();return k}}if(!Array.isArray){Array.isArray=function isArray(b){return(b&&typeof b==="object"&&"splice" in b&&"join" in b)
}}if(!Array.prototype.every){Array.prototype.every=function every(i,j){var k=Object(this);
var h=k.length>>>0;var g;if(typeof i!=="function"){throw new TypeError(i+" is not a function")
}for(g=0;g<h;g+=1){if(g in k&&!i.call(j,k[g],g,k)){return false}}return true}}if(!Array.prototype.filter){Array.prototype.filter=function filter(j,k){var l=Object(this);
var i=l.length>>>0;var m;var h=[];if(typeof j!=="function"){throw new TypeError(j+" is not a function")
}for(m=0;m<i;m+=1){if(m in l&&j.call(k,l[m],m,l)){h.push(l[m])}}return h}}if(!Array.prototype.forEach){Array.prototype.forEach=function forEach(i,j){var k=Object(this);
var h;var g;if(typeof i!=="function"){throw new TypeError("No function object passed to forEach.")
}for(h=0;h<this.length;h+=1){g=k[h];i.call(j,g,h,k)}}}if(!Array.prototype.indexOf){Array.prototype.indexOf=function indexOf(f,i){var h=i||0;
var g=0;if(h<0){h=this.length+i-1;if(h<0){throw"Wrapped past beginning of array while looking up a negative start index."
}}for(g=0;g<this.length;g++){if(this[g]===f){return g}}return(-1)}}if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=function lastIndexOf(i,j){var g=Object(this);
var h=g.length>>>0;var k;j=parseInt(j,10);if(h<=0){return -1}k=(typeof j==="number")?Math.min(h-1,j):h-1;
k=k>=0?k:h-Math.abs(k);for(;k>=0;k-=1){if(k in g&&i===g[k]){return k}}return -1
}}if(!Array.prototype.map){Array.prototype.map=function map(j,k){var m=Object(this);
var h=m.length>>>0;var l;var i=new Array(h);if(typeof j!=="function"){throw new TypeError(j+" is not a function")
}for(l=0;l<h;l+=1){if(l in m){i[l]=j.call(k,m[l],l,m)}}return i}}if(!Array.prototype.reduce){Array.prototype.reduce=function reduce(j,m){var l=Object(this);
var h=l.length>>>0;var k=0;var i;if(typeof j!=="function"){throw new TypeError(j+" is not a function")
}if(typeof m==="undefined"){if(!h){throw new TypeError("Reduce of empty array with no initial value")
}i=l[0];k=1}else{i=m}while(k<h){if(k in l){i=j.call(undefined,i,l[k],k,l);k+=1}}return i
}}if(!Array.prototype.reduceRight){Array.prototype.reduceRight=function reduceRight(j,m){var l=Object(this);
var h=l.length>>>0;var k=h-1;var i;if(typeof j!=="function"){throw new TypeError(j+" is not a function")
}if(m===undefined){if(!h){throw new TypeError("Reduce of empty array with no initial value")
}i=l[h-1];k=h-2}else{i=m}while(k>=0){if(k in l){i=j.call(undefined,i,l[k],k,l);
k-=1}}return i}}if(!Array.prototype.some){Array.prototype.some=function some(i,j){var g=Object(this);
var h=g.length>>>0;var k;if(typeof i!=="function"){throw new TypeError(i+" is not a function")
}for(k=0;k<h;k+=1){if(k in g&&i.call(j,g[k],k,g)===true){return true}}return false
}}if(!Date.now){Date.now=function now(){return new Date().getTime()}}if(!Date.prototype.toISOString){Date.prototype.toISOString=function toISOString(){if(!isFinite(this)){throw new RangeError("Date.prototype.toISOString called on non-finite value.")
}var d={year:this.getUTCFullYear(),month:this.getUTCMonth()+1,day:this.getUTCDate(),hours:this.getUTCHours(),minutes:this.getUTCMinutes(),seconds:this.getUTCSeconds(),mseconds:(this.getUTCMilliseconds()/1000).toFixed(3).substr(2,3)};
var g;var f;for(g in d){if(d.hasOwnProperty(g)&&g!=="year"&&g!=="mseconds"){d[g]=String(d[g]).length===1?"0"+String(d[g]):String(d[g])
}}if(d.year<0||d.year>9999){f=d.year<0?"-":"+";d.year=f+String(Math.abs(d.year/1000000)).substr(2,6)
}return d.year+"-"+d.month+"-"+d.day+"T"+d.hours+":"+d.minutes+":"+d.seconds+"."+d.mseconds+"Z"
}}if(!Date.prototype.toJSON){Date.prototype.toJSON=function(j){var i=Object(this);
var h;var k=function(c){var a=typeof c;var b=[null,"undefined","boolean","string","number"].some(function(d){return d===a
});if(b){return true}return false};var g=function(b){var a;if(k(b)){return b}a=(typeof b.valueOf==="function")?b.valueOf():(typeof b.toString==="function")?b.toString():null;
if(a&&k(a)){return a}throw new TypeError(b+" cannot be converted to a primitive")
};h=g(i);if(typeof h==="number"&&!isFinite(h)){return null}if(typeof i.toISOString!=="function"){throw new TypeError("toISOString is not callable")
}return i.toISOString.call(i)}}if(!String.prototype.trim){String.prototype.trim=function trim(){return this.replace(/^\s+|\s+$/g,"")
}}if(!Object.keys){Object.keys=function keys(d){var f=[];var g;if((!d)||(typeof d.hasOwnProperty!=="function")){throw"Object.keys called on non-object."
}for(g in d){if(d.hasOwnProperty(g)){f.push(g)}}return f}}if(typeof JSON=="undefined"||!("stringify" in JSON&&"parse" in JSON)){if(!this.JSON){this.JSON={}
}(function(){function f(n){return n<10?"0"+n:n}if(typeof String.prototype.toJSON!=="function"){String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()
}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);
case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;
i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space
}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)
}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")
}}}())}window.matchMedia=window.matchMedia||(function(m,l){var o,j=m.documentElement,i=j.firstElementChild||j.firstChild,n=m.createElement("body"),k=m.createElement("div");
k.id="mq-test-1";k.style.cssText="position:absolute;top:-100em";n.style.background="none";
n.appendChild(k);return function(a){k.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width:42px; }</style>';
j.insertBefore(n,i);o=k.offsetWidth===42;j.removeChild(n);return{matches:o,media:a}
}}(document));(function(){var d=0;var g=["ms","moz","webkit","o"];for(var f=0;f<g.length&&!window.requestAnimationFrame;
++f){window.requestAnimationFrame=window[g[f]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[g[f]+"CancelAnimationFrame"]||window[g[f]+"CancelRequestAnimationFrame"]
}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(a,j){var k=Date.now();
var c=Math.max(0,16-(k-d));var b=window.setTimeout(function(){a(k+c)},c);d=k+c;
return b}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(a){clearTimeout(a)
}}}());window.XMLHttpRequest=window.XMLHttpRequest||function(){var c;try{c=new ActiveXObject("Msxml2.XMLHTTP")
}catch(d){try{c=new ActiveXObject("Microsoft.XMLHTTP")}catch(d){c=false}}return c
};!function(){var c,d,a,b;!function(){var f={},g={};c=function(i,l,h){f[i]={deps:l,callback:h}
},b=a=d=function(m){function n(s){if("."!==s.charAt(0)){return s}for(var p=s.split("/"),t=m.split("/").slice(0,-1),o=0,q=p.length;
q>o;o++){var r=p[o];if(".."===r){t.pop()}else{if("."===r){continue}t.push(r)}}return t.join("/")
}if(b._eak_seen=f,g[m]){return g[m]}if(g[m]={},!f[m]){throw new Error("Could not find module "+m)
}for(var x,y=f[m],z=y.deps,h=y.callback,i=[],j=0,k=z.length;k>j;j++){"exports"===z[j]?i.push(x={}):i.push(d(n(z[j])))
}var l=h.apply(this,i);return g[m]=x||l}}(),c("promise/all",["./utils","exports"],function(h,i){function o(j){var k=this;
if(!f(j)){throw new TypeError("You must pass an array to all.")}return new k(function(l,m){function n(p){return function(q){v(p,q)
}}function v(p,q){x[p]=q,0===--y&&l(x)}var w,x=[],y=j.length;0===y&&l([]);for(var z=0;
z<j.length;z++){w=j[z],w&&g(w.then)?w.then(n(z),m):v(z,w)}})}var f=h.isArray,g=h.isFunction;
i.all=o}),c("promise/asap",["exports"],function(x){function y(){return function(){process.nextTick(f)
}}function z(){var m=0,n=new j(f),l=document.createTextNode("");return n.observe(l,{characterData:!0}),function(){l.data=m=++m%2
}}function A(){return function(){k.setTimeout(f,1)}}function f(){for(var n=0;n<w.length;
n++){var o=w[n],l=o[0],m=o[1];l(m)}w=[]}function g(m,n){var l=w.push([m,n]);1===l&&h()
}var h,i="undefined"!=typeof window?window:{},j=i.MutationObserver||i.WebKitMutationObserver,k="undefined"!=typeof global?global:void 0===this?window:this,w=[];
h="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?y():j?z():A(),x.asap=g
}),c("promise/config",["exports"],function(g){function h(i,j){return 2!==arguments.length?f[i]:(f[i]=j,void 0)
}var f={instrument:!1};g.config=f,g.configure=h}),c("promise/polyfill",["./promise","./utils","exports"],function(h,i,p){function q(){var j;
j="undefined"!=typeof global?global:"undefined"!=typeof window&&window.document?window:self;
var k="Promise" in j&&"resolve" in j.Promise&&"reject" in j.Promise&&"all" in j.Promise&&"race" in j.Promise&&function(){var l;
return new j.Promise(function(m){l=m}),g(l)}();k||(j.Promise=f)}var f=h.Promise,g=i.isFunction;
p.polyfill=q}),c("promise/promise",["./config","./utils","./all","./race","./resolve","./reject","./asap","exports"],function(A,B,C,D,E,af,ag,ah){function ai(F){if(!v(F)){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
}if(!(this instanceof ai)){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
}this._subscribers=[],aj(F,this)}function aj(H,I){function J(K){j(I,K)}function F(K){m(I,K)
}try{H(J,F)}catch(G){F(G)}}function f(N,O,F,G){var H,I,J,K,L=v(F);if(L){try{H=F(G),J=!0
}catch(M){K=!0,I=M}}else{H=G,J=!0}i(O,H)||(L&&J?j(O,H):K?m(O,I):N===r?j(O,H):N===t&&m(O,H))
}function g(H,I,J,K){var F=H._subscribers,G=F.length;F[G]=I,F[G+r]=J,F[G+t]=K}function h(H,I){for(var J,K,L=H._subscribers,F=H._detail,G=0;
G<L.length;G+=3){J=L[G],K=L[G+I],f(I,J,K,F)}H._subscribers=null}function i(H,I){var J,F=null;
try{if(H===I){throw new TypeError("A promises callback cannot return that same promise.")
}if(u(I)&&(F=I.then,v(F))){return F.call(I,function(K){return J?!0:(J=!0,I!==K?j(H,K):k(H,K),void 0)
},function(K){return J?!0:(J=!0,m(H,K),void 0)}),!0}}catch(G){return J?!0:(m(H,G),!0)
}return !1}function j(F,G){F===G?k(F,G):i(F,G)||k(F,G)}function k(F,G){F._state===n&&(F._state=p,F._detail=G,s.async(o,F))
}function m(F,G){F._state===n&&(F._state=p,F._detail=G,s.async(q,F))}function o(F){h(F,F._state=r)
}function q(F){h(F,F._state=t)}var s=A.config,u=(A.configure,B.objectOrFunction),v=B.isFunction,w=(B.now,C.all),x=D.race,y=E.resolve,z=af.reject,l=ag.asap;
s.async=l;var n=void 0,p=0,r=1,t=2;ai.prototype={constructor:ai,_state:void 0,_detail:void 0,_subscribers:void 0,then:function(H,I){var J=this,F=new this.constructor(function(){});
if(this._state){var G=arguments;s.async(function(){f(J._state,F,G[J._state-1],J._detail)
})}else{g(this,F,H,I)}return F},"catch":function(F){return this.then(null,F)}},ai.all=w,ai.race=x,ai.resolve=y,ai.reject=z,ah.Promise=ai
}),c("promise/race",["./utils","exports"],function(h,i){function f(j){var k=this;
if(!g(j)){throw new TypeError("You must pass an array to race.")}return new k(function(l,m){for(var q,r=0;
r<j.length;r++){q=j[r],q&&"function"==typeof q.then?q.then(l,m):l(q)}})}var g=h.isArray;
i.race=f}),c("promise/reject",["exports"],function(f){function g(h){var i=this;
return new i(function(k,j){j(h)})}f.reject=g}),c("promise/resolve",["exports"],function(f){function g(h){if(h&&"object"==typeof h&&h.constructor===this){return h
}var i=this;return new i(function(j){j(h)})}f.resolve=g}),c("promise/utils",["exports"],function(h){function i(j){return o(j)||"object"==typeof j&&null!==j
}function o(j){return"function"==typeof j}function f(j){return"[object Array]"===Object.prototype.toString.call(j)
}var g=Date.now||function(){return(new Date).getTime()};h.objectOrFunction=i,h.isFunction=o,h.isArray=f,h.now=g
}),d("promise/polyfill").polyfill()}();require=(function e(h,j,l){function m(a,c){if(!j[a]){if(!h[a]){var d=typeof require=="function"&&require;
if(!c&&d){return d(a,!0)}if(i){return i(a,!0)}throw new Error("Cannot find module '"+a+"'")
}var b=j[a]={exports:{}};h[a][0].call(b.exports,function(g){var f=h[a][1][g];return m(f?f:g)
},b,b.exports,e,h,j,l)}return j[a].exports}var i=typeof require=="function"&&require;
for(var k=0;k<l.length;k++){m(l[k])}return m})({1:[function(f,h,g){var i=f("./ac-ajax/Ajax");
h.exports=new i();h.exports.Ajax=i},{"./ac-ajax/Ajax":2}],2:[function(k,i,h){var g=k("ac-deferred").Deferred;
var j=function(){};j.prototype={_Deferred:g,_defaults:{timeout:5000},_addReadyStateChangeHandler:function(a){a.xhr.onreadystatechange=function(b){if(a.xhr.readyState===4){clearTimeout(a.timeout);
if(a.xhr.status>=200&&a.xhr.status<300){a.deferred.resolve(a.xhr)}else{a.deferred.reject(a.xhr)
}}}},_addTimeout:function(b,a){if(a){b.timeout=setTimeout(function(){b.xhr.abort();
b.deferred.reject()},a)}},_extend:function(){for(var a=1;a<arguments.length;a++){for(var b in arguments[a]){if(arguments[a].hasOwnProperty(b)){arguments[0][b]=arguments[a][b]
}}}return arguments[0]},_getOptions:function(b,a){return this._extend({},this._defaults,a,b)
},_sendRequest:function(a){var b=this._validateConfiguration(a);if(b){throw b}var c={xhr:new XMLHttpRequest()};
c.deferred=new g();c.xhr.open(a.method,a.url);this._setRequestHeaders(c,a.headers);
this._addTimeout(c,a.timeout);this._addReadyStateChangeHandler(c);c.xhr.send(a.data);
return c.deferred.promise()},_setRequestHeaders:function(b,a){if(a){a.forEach(function(c){b.xhr.setRequestHeader(c.name,c.value)
})}},_validateConfiguration:function(a){if(!a){return"Must provide a configuration object"
}var b=[];var c=a.headers;if(!a.url){b.push("Must provide a url")}if(c){if(!Array.isArray(c)){return"Must provide an array of headers"
}this._validateHeaders(c,b)}return b.join(", ")},_validateHeaders:function(b,a){for(var c=0,d=b.length;
c<d;c++){if(!b[c].hasOwnProperty("name")||!b[c].hasOwnProperty("value")){a.push("Must provide a name and value key for all headers");
break}}},checkURL:function(a){a=this._getOptions({method:"head"},a);return this._sendRequest(a)
},get:function(a){a=this._getOptions({method:"get"},a);return this._sendRequest(a)
},post:function(a){a=this._getOptions({method:"post"},a);return this._sendRequest(a)
}};i.exports=j},{"ac-deferred":26}],3:[function(k,j,g){var i=k("./Environment/Browser");
var h={};h.toArray=function(a){return Array.prototype.slice.call(a)};h.flatten=function(a){var c=[];
var b=function(d){if(Array.isArray(d)){d.forEach(b)}else{c.push(d)}};a.forEach(b);
return c};h.without=function(f,a){var c;var d=f.indexOf(a);var b=f.length;if(d>=0){if(d===(b-1)){c=f.slice(0,(b-1))
}else{if(d===0){c=f.slice(1)}else{c=f.slice(0,d);c=c.concat(f.slice(d+1))}}}else{return f
}return c};if(i.name==="IE"){k("./shims/ie/Array")(h,i)}j.exports=h},{"./Environment/Browser":9,"./shims/ie/Array":16}],j0qjr8:[function(u,w,t){var q=u("./Viewport");
var p=u("./log");var n=u("./Element/events");var m=u("./Element/vendorTransformHelper");
var v=u("./Environment/Browser");var r={addEventListener:n.addEventListener,removeEventListener:n.removeEventListener,addVendorPrefixEventListener:n.addVendorPrefixEventListener,removeVendorPrefixEventListener:n.removeVendorPrefixEventListener,addVendorEventListener:function(d,c,b,a){p("ac-base.Element.addVendorEventListener is deprecated. Please use ac-base.Element.addVendorPrefixEventListener.");
return this.addVendorPrefixEventListener(d,c,b,a)},removeVendorEventListener:function(d,c,b,a){p("ac-base.Element.removeVendorEventListener is deprecated. Please use ac-base.Element.removeVendorPrefixEventListener.");
return this.removeVendorPrefixEventListener(d,c,b,a)}};u("./Element/EventDelegate")(r);
r.getElementById=function(a){if(typeof a==="string"){a=document.getElementById(a)
}if(r.isElement(a)){return a}else{return null}};r.selectAll=function(a,b){if(typeof b==="undefined"){b=document
}else{if(!r.isElement(b)&&b.nodeType!==9&&b.nodeType!==11){throw new TypeError("ac-base.Element.selectAll: Invalid context nodeType")
}}if(typeof a!=="string"){throw new TypeError("ac-base.Element.selectAll: Selector must be a string")
}return Array.prototype.slice.call(b.querySelectorAll(a))};r.select=function(a,b){if(typeof b==="undefined"){b=document
}else{if(!r.isElement(b)&&b.nodeType!==9&&b.nodeType!==11){throw new TypeError("ac-base.Element.select: Invalid context nodeType")
}}if(typeof a!=="string"){throw new TypeError("ac-base.Element.select: Selector must be a string")
}return b.querySelector(a)};var s=window.Element?(function(a){return a.matches||a.matchesSelector||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector
}(Element.prototype)):null;r.matchesSelector=function(b,a){return r.isElement(b)?s.call(b,a):false
};r.matches=function(b,a){p("ac-base.Element.matches is deprecated. Use ac-base.Element.filterBySelector instead.");
return r.filterBySelector(a,b)};r.filterBySelector=function(b,f){var a=[];for(var c=0,d=b.length;
c<d;c++){if(r.isElement(b[c])&&s.call(b[c],f)){a[a.length]=b[c]}}return a};r.setOpacity=function(a,b){p("ac-base.Element.setOpacity is deprecated. Use ac-base.Element.setStyle instead.");
return r.setStyle(a,{opacity:b})};r.setStyle=function(f,d){if((typeof d!=="string"&&typeof d!=="object")||Array.isArray(d)){throw new TypeError("styles argument must be either an object or a string")
}f=r.getElementById(f);var a;var c;var b;a=r.setStyle.__explodeStyleStringToObject(d);
for(b in a){if(a.hasOwnProperty(b)){c=b.replace(/-(\w)/g,r.setStyle.__camelCaseReplace);
r.setStyle.__setStyle(f,c,a,a[b])}}return f};r.setStyle.__explodeStyleStringToObject=function(c){var f=(typeof c==="object")?c:{};
var b;var d;var a;var g;if(typeof c==="string"){b=c.split(";");a=b.length;for(g=0;
g<a;g+=1){d=b[g].indexOf(":");if(d>0){f[b[g].substr(0,d).trim()]=b[g].substr(d+1).trim()
}}}return f};r.setStyle.__setStyle=function(c,b,d,a){if(typeof c.style[b]!=="undefined"){c.style[b]=a
}};r.setStyle.__camelCaseReplace=function(d,c,b,a){return(b===0)&&(a.substr(1,3)!=="moz")?c:c.toUpperCase()
};r.getStyle=function(d,c,a){var b;c=c.replace(/-(\w)/g,r.setStyle.__camelCaseReplace);
d=r.getElementById(d);c=(c==="float")?"cssFloat":c;a=a||window.getComputedStyle(d,null);
b=a?a[c]:null;if(c==="opacity"){return b?parseFloat(b):1}return b==="auto"?null:b
};r.cumulativeOffset=function(d){var c=r.getBoundingBox(d);var a=q.scrollOffsets();
var b=[c.top+a.y,c.left+a.x];b.top=b[0];b.left=b[1];return b};r.getBoundingBox=function(d){d=r.getElementById(d);
var b=d.getBoundingClientRect();var a=b.width||b.right-b.left;var c=b.height||b.bottom-b.top;
return{top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:a,height:c}};r.getInnerDimensions=function(f){var b=r.getBoundingBox(f);
var a=b.width;var c=b.height;var d;var h;var g=window.getComputedStyle?window.getComputedStyle(f,null):null;
["padding","border"].forEach(function(i){["Top","Right","Bottom","Left"].forEach(function(j){d=i==="border"?i+j+"Width":i+j;
h=parseFloat(r.getStyle(f,d,g));h=isNaN(h)?0:h;if(j==="Right"||j==="Left"){a-=h
}if(j==="Top"||j==="Bottom"){c-=h}})});return{width:a,height:c}};r.getOuterDimensions=function(f){var b=r.getBoundingBox(f);
var a=b.width;var d=b.height;var c;var g=window.getComputedStyle?window.getComputedStyle(f,null):null;
["margin"].forEach(function(h){["Top","Right","Bottom","Left"].forEach(function(i){c=parseFloat(r.getStyle(f,h+i,g));
c=isNaN(c)?0:c;if(i==="Right"||i==="Left"){a+=c}if(i==="Top"||i==="Bottom"){d+=c
}})});return{width:a,height:d}};r.hasClassName=function(b,c){var a=r.getElementById(b);
if(a&&a.className!==""){return new RegExp("(\\s|^)"+c+"(\\s|$)").test(a.className)
}else{return false}};r.addClassName=function(b,c){var a=r.getElementById(b);if(a.classList){a.classList.add(c)
}else{if(!r.hasClassName(a,c)){a.className+=" "+c}}};r.removeClassName=function(c,d){var a=r.getElementById(c);
if(r.hasClassName(a,d)){var b=new RegExp("(\\s|^)"+d+"(\\s|$)");a.className=a.className.replace(b,"$1").trim()
}};r.toggleClassName=function(b,c){var a=r.getElementById(b);if(a.classList){a.classList.toggle(c)
}else{if(r.hasClassName(a,c)){r.removeClassName(a,c)}else{r.addClassName(a,c)}}};
r.isElement=function(a){return !!(a&&a.nodeType===1)};r.setVendorPrefixStyle=function(a,d,f){if(typeof d!=="string"){throw new TypeError("ac-base.Element.setVendorPrefixStyle: property must be a string")
}if(typeof f!=="string"&&typeof f!=="number"){throw new TypeError("ac-base.Element.setVendorPrefixStyle: value must be a string or a number")
}f+="";a=r.getElementById(a);var g=["","webkit","Moz","ms","O"];var b;var c;d=d.replace(/-(webkit|moz|ms|o)-/i,"");
d=d.replace(/^(webkit|Moz|ms|O)/,"");d=d.charAt(0).toLowerCase()+d.slice(1);d=d.replace(/-(\w)/,function(i,h){return h.toUpperCase()
});f=f.replace(/-(webkit|moz|ms|o)-/,"-vendor-");g.forEach(function(h){b=(h==="")?d:h+d.charAt(0).toUpperCase()+d.slice(1);
c=(h==="")?f.replace("-vendor-",""):f.replace("-vendor-","-"+h.charAt(0).toLowerCase()+h.slice(1)+"-");
if(b in a.style){r.setStyle(a,b+":"+c)}})};r.getVendorPrefixStyle=function(a,b){if(typeof b!=="string"){throw new TypeError("ac-base.Element.getVendorPrefixStyle: property must be a string")
}a=r.getElementById(a);var c=["","webkit","Moz","ms","O"];var d;b=b.replace(/-(webkit|moz|ms|o)-/i,"");
b=b.replace(/^(webkit|Moz|ms|O)/,"").charAt(0).toLowerCase()+b.slice(1);b=b.replace(/-(\w)/,function(g,f){return f.toUpperCase()
});c.some(function(g,h){var f=(g==="")?b:g+b.charAt(0).toUpperCase()+b.slice(1);
if(f in a.style){d=r.getStyle(a,f);return true}});return d};r.insert=function(c,b,a){if(!c||!(c.nodeType===1||c.nodeType===3||c.nodeType===11)){throw new TypeError("ac-base.Element.insert: element must be a valid node of type element, text, or document fragment")
}if(!b||!(b.nodeType===1||b.nodeType===11)){throw new TypeError("ac-base.Element.insert: target must be a valid node of type element or document fragment")
}switch(a){case"before":if(b.nodeType===11){throw new TypeError("ac-base.Element.insert: target cannot be nodeType of documentFragment when using placement ‘before’")
}b.parentNode.insertBefore(c,b);break;case"after":if(b.nodeType===11){throw new TypeError("ac-base.Element.insert: target cannot be nodeType of documentFragment when using placement ‘after’")
}b.parentNode.insertBefore(c,b.nextSibling);break;case"first":b.insertBefore(c,b.firstChild);
break;default:b.appendChild(c)}};r.insertAt=function(c,b,g){var d;var a;var f;c=r.getElementById(c);
b=r.getElementById(b);if(!r.isElement(c)||!r.isElement(b)){throw new TypeError("ac-base.Element.insertAt: element must be a valid DOM element")
}d=r.children(b);if(g<0&&d.length){g+=d.length}if(b.contains(c)&&g>d.indexOf(c)){g++
}if(d&&g<=d.length-1){for(f=0,a=d.length;f<a;f++){if(f===g){b.insertBefore(c,d[f]);
break}}}else{b.appendChild(c)}};r.children=function(d){var c,b;d=r.getElementById(d);
if(!r.isElement(d)){throw new TypeError("ac-base.Element.children: element must be a valid DOM element")
}if(d.children){c=[];for(var f=0,a=d.children.length;f<a;f++){b=d.children[f];if(b&&b.nodeType===1){c.push(b)
}}}return c.length?c:null};r.remove=function(a,b){if(!r.isElement(a)){throw new TypeError("ac-base.Element.remove: element must be a valid DOM element")
}if(b===true){var c=a.parentNode.removeChild(a);return c}else{a.parentNode.removeChild(a)
}};r.viewportOffset=function(a){var b=r.getBoundingBox(a);return{x:b.left,y:b.top}
};r.pixelsInViewport=function(d,f){var c;if(!r.isElement(d)){throw new TypeError("ac-base.Element.pixelsInViewport : element must be a valid DOM element")
}var b=q.dimensions();f=f||r.getBoundingBox(d);var a=f.top;if(a>=0){c=b.height-a;
if(c>f.height){c=f.height}}else{c=f.height+a}if(c<0){c=0}if(c>b.height){c=b.height
}return c};r.percentInViewport=function(c){var a=r.getBoundingBox(c);var b=r.pixelsInViewport(c,a);
return b/a.height};r.isInViewport=function(c,b){if(typeof b!=="number"||1<b||b<0){b=0
}var a=r.percentInViewport(c);return(a>b||a===1)};var o=function(c,b){c=r.getElementById(c);
var a=c.parentNode;while(a&&r.isElement(a)){if(typeof b==="function"){if(b(a)===false){break
}}if(a!==document.body){a=a.parentNode}else{a=null}}};r.ancestors=function(a,c){var b=[];
o(a,function(d){if(c===undefined||r.matchesSelector(d,c)){b.push(d)}});return b
};r.ancestor=function(c,b){c=r.getElementById(c);var a=null;if(c!==null&&b===undefined){return c.parentNode
}o(c,function(d){if(r.matchesSelector(d,b)){a=d;return false}});return a};r.setVendorPrefixTransform=function(a,b){if((typeof b!=="string"&&typeof b!=="object")||Array.isArray(b)||b===null){throw new TypeError("ac-base.Element.setVendorPrefixTransform: transformFunctions argument must be either an object or a string")
}r.setVendorPrefixStyle(a,"transform",m.convert2dFunctions(b))};if(v.name==="IE"){u("./shims/ie/Element")(r,v)
}w.exports=r},{"./Element/EventDelegate":6,"./Element/events":7,"./Element/vendorTransformHelper":8,"./Environment/Browser":9,"./Viewport":14,"./log":15,"./shims/ie/Element":17}],"ac-element":[function(d,g,f){g.exports=d("j0qjr8")
},{}],6:[function(d,g,f){g.exports=function(a){function b(c,i){this.element=c;this.options=i||{}
}b.prototype={__findMatchingTarget:function(c){var i=null;if(a.matchesSelector(c,this.options.selector)){i=c
}else{i=a.ancestor(c,this.options.selector)}return i},__generateDelegateMethod:function(){var i=this;
var c=i.options.handler;return function(o){var h=o.target||o.srcElement;var m=i.__findMatchingTarget(h);
var n;if(m!==null){n=new b.Event(o);n.setTarget(m);c(n)}}},attachEventListener:function(){this.__delegateMethod=this.__generateDelegateMethod();
a.addEventListener(this.element,this.options.eventType,this.__delegateMethod);return this.__delegateMethod
},unbind:function(){a.removeEventListener(this.element,this.options.eventType,this.__delegateMethod);
this.__delegateMethod=undefined}};b.instances=[];b.filterInstances=function(i){var c=[];
b.instances.forEach(function(h){if(i(h)===true){c.push(h)}});return c};b.Event=function(c){this.originalEvent=c
};b.Event.prototype.setTarget=function(c){this.target=c;this.currentTarget=c};a.addEventDelegate=function(l,m,n,c){var o=new a.__EventDelegate(l,{eventType:m,selector:n,handler:c});
b.instances.push(o);return o.attachEventListener()};a.removeEventDelegate=function(l,m,n,c){var o=a.__EventDelegate.filterInstances(function(i){var h=i.options;
return i.element===l&&h.selector===n&&h.eventType===m&&h.handler===c});o.forEach(function(h){h.unbind()
})};a.__EventDelegate=b}},{}],7:[function(f,h,g){var i={};i.addEventListener=function(a,c,b,d){if(a.addEventListener){a.addEventListener(c,b,d)
}else{if(a.attachEvent){a.attachEvent("on"+c,b)}else{a["on"+c]=b}}return a};i.dispatchEvent=function(a,b){if(document.createEvent){a.dispatchEvent(new CustomEvent(b))
}else{a.fireEvent("on"+b,document.createEventObject())}return a};i.removeEventListener=function(a,c,b,d){if(a.removeEventListener){a.removeEventListener(c,b,d)
}else{a.detachEvent("on"+c,b)}return a};i.addVendorPrefixEventListener=function(c,b,a,d){if(b.match(/^webkit/i)){b=b.replace(/^webkit/i,"")
}else{if(b.match(/^moz/i)){b=b.replace(/^moz/i,"")}else{if(b.match(/^ms/i)){b=b.replace(/^ms/i,"")
}else{if(b.match(/^o/i)){b=b.replace(/^o/i,"")}else{b=b.charAt(0).toUpperCase()+b.slice(1)
}}}}if(/WebKit/i.test(window.navigator.userAgent)){return i.addEventListener(c,"webkit"+b,a,d)
}else{if(/Opera/i.test(window.navigator.userAgent)){return i.addEventListener(c,"O"+b,a,d)
}else{if(/Gecko/i.test(window.navigator.userAgent)){return i.addEventListener(c,b.toLowerCase(),a,d)
}else{b=b.charAt(0).toLowerCase()+b.slice(1);return i.addEventListener(c,b,a,d)
}}}};i.removeVendorPrefixEventListener=function(c,b,a,d){if(b.match(/^webkit/i)){b=b.replace(/^webkit/i,"")
}else{if(b.match(/^moz/i)){b=b.replace(/^moz/i,"")}else{if(b.match(/^ms/i)){b=b.replace(/^ms/i,"")
}else{if(b.match(/^o/i)){b=b.replace(/^o/i,"")}else{b=b.charAt(0).toUpperCase()+b.slice(1)
}}}}i.removeEventListener(c,"webkit"+b,a,d);i.removeEventListener(c,"O"+b,a,d);
i.removeEventListener(c,b.toLowerCase(),a,d);b=b.charAt(0).toLowerCase()+b.slice(1);
return i.removeEventListener(c,b,a,d)};h.exports=i},{}],8:[function(i,h,f){var g={__objectifiedFunctions:{},__paramMaps:{translate:"p1, p2, 0",translateX:"p1, 0, 0",translateY:"0, p1, 0",scale:"p1, p2, 1",scaleX:"p1, 1, 1",scaleY:"1, p1, 1",rotate:"0, 0, 1, p1",matrix:"p1, p2, 0, 0, p3, p4, 0, 0, 0, 0, 1, 0, p5, p6, 0, 1"},convert2dFunctions:function(c){var d;
this.__init(c);for(var b in this.__objectifiedFunctions){if(this.__objectifiedFunctions.hasOwnProperty(b)){d=this.__objectifiedFunctions[b].replace(" ","").split(",");
if(b in this.__paramMaps){for(var a in this.__paramMaps){if(b===a){this.valuesToSet.push(this.__stripFunctionAxis(b)+"3d("+this.__map2DTransformParams(d,this.__paramMaps[b])+")")
}}}else{this.valuesToSet.push(b+"("+this.__objectifiedFunctions[b]+")")}}}return this.valuesToSet.join(" ")
},__init:function(a){this.valuesToSet=[];this.__objectifiedFunctions=(typeof a==="object")?a:{};
if(typeof a==="string"){this.__objectifiedFunctions=this.__objectifyFunctionString(a)
}},__map2DTransformParams:function(b,a){b.forEach(function(c,d){a=a.replace("p"+(d+1),c)
});return a},__splitFunctionStringToArray:function(a){return a.match(/[\w]+\(.+?\)/g)
},__splitFunctionNameAndParams:function(a){return a.match(/(.*)\((.*)\)/)},__stripFunctionAxis:function(a){return a.match(/([a-z]+)(|X|Y)$/)[1]
},__objectifyFunctionString:function(c){var b=this;var a;this.__splitFunctionStringToArray(c).forEach(function(d){a=b.__splitFunctionNameAndParams(d);
b.__objectifiedFunctions[a[1]]=a[2]});return this.__objectifiedFunctions}};h.exports=g
},{}],9:[function(g,k,h){var j=g("./Browser/BrowserData");var i=j.create();i.isWebKit=function(b){var a=b||window.navigator.userAgent;
return a?!!a.match(/applewebkit/i):false};i.lowerCaseUserAgent=navigator.userAgent.toLowerCase();
if(i.name==="IE"){g("../shims/ie/Environment/Browser")(i)}k.exports=i},{"../shims/ie/Environment/Browser":18,"./Browser/BrowserData":10}],10:[function(m,l,h){var k=m("./data");
var i=m("../../RegExp");function j(){}j.prototype={__getBrowserVersion:function(d,c){if(!d||!c){return
}var a=k.browser.filter(function(g){return g.identity===c})[0];var f=a.versionSearch||c;
var b=d.indexOf(f);if(b>-1){return parseFloat(d.substring(b+f.length+1))}},__getName:function(a){return this.__getIdentityStringFromArray(a)
},__getIdentity:function(a){if(a.string){return this.__matchSubString(a)}else{if(a.prop){return a.identity
}}},__getIdentityStringFromArray:function(d){for(var a=0,c=d.length,b;a<c;a++){b=this.__getIdentity(d[a]);
if(b){return b}}},__getOS:function(a){return this.__getIdentityStringFromArray(a)
},__getOSVersion:function(d,a){if(!d||!a){return}var b=k.os.filter(function(o){return o.identity===a
})[0];var g=b.versionSearch||a;var c=new RegExp(g+" ([\\d_\\.]+)","i");var f=d.match(c);
if(f!==null){return f[1].replace(/_/g,".")}},__matchSubString:function(b){var c=b.subString;
var a;if(c){a=i.isRegExp(c)&&!!b.string.match(c);if(a||b.string.indexOf(c)>-1){return b.identity
}}}};j.create=function(){var b=new j();var a={};a.name=b.__getName(k.browser);a.version=b.__getBrowserVersion(k.versionString,a.name);
a.os=b.__getOS(k.os);a.osVersion=b.__getOSVersion(k.versionString,a.os);return a
};l.exports=j},{"../../RegExp":13,"./data":11}],11:[function(d,g,f){g.exports={browser:[{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],12:[function(j,i,g){var h=null;i.exports=function k(){if(h===null){h=!!(window.localStorage&&window.localStorage.non_existent!==null)
}return h}},{}],13:[function(i,h,f){var g={};g.isRegExp=function(a){return window.RegExp?a instanceof RegExp:false
};h.exports=g},{}],14:[function(f,i,g){var h={};h.scrollOffsets=function(){return{x:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop}
};h.dimensions=function(){return{height:window.innerHeight||document.documentElement.clientHeight,width:window.innerWidth||document.documentElement.clientWidth}
};i.exports=h},{}],15:[function(m,l,i){var n=m("./Environment/Feature/localStorageAvailable");
var j="f7c9180f-5c45-47b4-8de4-428015f096c0";var o=(n()&&!!window.localStorage.getItem(j));
l.exports=function k(a){if(window.console&&typeof console.log==="function"&&o){console.log(a)
}}},{"./Environment/Feature/localStorageAvailable":12}],16:[function(d,g,f){g.exports=function(b,a){if(a.IE.documentMode<=8){b.toArray=function(l){var c=[];
var m=l.length;var i;if(m>0){for(i=0;i<m;i+=1){c.push(l[i])}}return c}}}},{}],17:[function(k,j,g){var h=k("../../Array");
var i=k("../../vendor/Sizzle");j.exports=function(a,b,c){var d=b.IE.documentMode;
c=c||i;if(d<8){a.selectAll=function(p,o){if(typeof o==="undefined"){o=document}else{if(!a.isElement(o)&&o.nodeType!==9&&o.nodeType!==11){throw new TypeError("ac-base.Element.selectAll: Invalid context nodeType")
}}if(typeof p!=="string"){throw new TypeError("ac-base.Element.selectAll: Selector must be a string")
}if(o.nodeType===11){var q=[];var f;h.toArray(o.childNodes).forEach(function(l){if(c.matchesSelector(l,p)){q.push(l)
}if(f=c(p,l).length>0){q.concat(f)}});return q}return c(p,o)}}else{if(d<9){a.selectAll=function(m,f){if(typeof f==="undefined"){f=document
}else{if(!a.isElement(f)&&f.nodeType!==9&&f.nodeType!==11){throw new TypeError("ac-base.Element.selectAll: Invalid context nodeType")
}}if(typeof m!=="string"){throw new TypeError("ac-base.Element.selectAll: Selector must be a string")
}return h.toArray(f.querySelectorAll(m))}}}if(d<8){a.select=function(p,f){if(typeof f==="undefined"){f=document
}else{if(!a.isElement(f)&&f.nodeType!==9&&f.nodeType!==11){throw new TypeError("ac-base.Element.select: Invalid context nodeType")
}}if(typeof p!=="string"){throw new TypeError("ac-base.Element.select: Selector must be a string")
}if(f.nodeType===11){var o=[];var q;h.toArray(f.childNodes).some(function(l){if(c.matchesSelector(l,p)){o=l;
return true}else{if(q=c(p,l).length>0){o=q[0];return true}}});return o}return c(p,f)[0]
}}if(d<9){a.matchesSelector=function(f,m){return c.matchesSelector(f,m)};a.filterBySelector=function(f,m){return c.matches(m,f)
}}if(d<9&&typeof window.getComputedStyle!=="function"){a.getStyle=function(f,s,p){f=a.getElementById(f);
var q;var r;p=p||f.currentStyle;if(p){s=s.replace(/-(\w)/g,a.setStyle.__camelCaseReplace);
s=s==="float"?"styleFloat":s;if(s==="opacity"){q=f.filters["DXImageTransform.Microsoft.Alpha"]||f.filters.Alpha;
if(q){return parseFloat(q.Opacity/100)}return 1}r=p[s]||null;return r==="auto"?null:r
}}}if(d<=8){a.setStyle.__superSetStyle=a.setStyle.__setStyle;a.setStyle.__setStyle=function(f,q,o,p){if(q==="opacity"){a.setStyle.__setOpacity(f,p)
}else{a.setStyle.__superSetStyle(f,q,o,p)}};a.setStyle.__setOpacity=function(n,f){f=(f>1)?1:((f<0.00001)?0:f)*100;
var o=n.filters["DXImageTransform.Microsoft.Alpha"]||n.filters.Alpha;if(o){o.Opacity=f
}else{n.style.filter+=" progid:DXImageTransform.Microsoft.Alpha(Opacity="+f+")"
}}}if(b.version<8){a.getBoundingBox=function(p){p=a.getElementById(p);var r=p.offsetLeft;
var s=p.offsetTop;var q=p.offsetWidth;var f=p.offsetHeight;return{top:s,right:r+q,bottom:s+f,left:r,width:q,height:f}
}}}},{"../../Array":3,"../../vendor/Sizzle":19}],18:[function(d,g,f){g.exports=function(a){function b(){var c;
if(document.documentMode){c=parseInt(document.documentMode,10)}else{c=5;if(document.compatMode){if(document.compatMode==="CSS1Compat"){c=7
}}}return c}a.IE={documentMode:b()}}},{}],19:[function(d,g,f){
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(a2,bc){var aS,a0,bd,bq,bk,bm=a2.document,bj=bm.documentElement,aK="undefined",bi=false,bl=true,be=0,a9=[].slice,aU=[].push,aM=("sizcache"+Math.random()).replace(".",""),aE="[\\x20\\t\\r\\n\\f]",ba="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])",bb="(?:[\\w#_-]|[^\\x00-\\xa0]|\\\\.)",aC="([*^$|!~]?=)",a7="\\["+aE+"*("+ba+"+)"+aE+"*(?:"+aC+aE+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+bb+"+)|)|)"+aE+"*\\]",az=":("+ba+"+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|(.*))\\)|)",aA=":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",bf=aE+"*([\\x20\\t\\r\\n\\f>+~])"+aE+"*",bg="(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|"+a7+"|"+az.replace(2,7)+"|[^\\\\(),])+",aP=new RegExp("^"+aE+"+|((?:^|[^\\\\])(?:\\\\.)*)"+aE+"+$","g"),av=new RegExp("^"+bf),aQ=new RegExp(bg+"?(?="+aE+"*,|$)","g"),b=new RegExp("^(?:(?!,)(?:(?:^|,)"+aE+"*"+bg+")*?|"+aE+"*(.*?))(\\)|$)"),aG=new RegExp(bg.slice(19,-6)+"\\x20\\t\\r\\n\\f>+~])+|"+bf,"g"),a=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,aZ=/[\x20\t\r\n\f]*[+~]/,aJ=/:not\($/,aY=/h\d/i,a6=/input|select|textarea|button/i,aR=/\\(?!\\)/g,aw={ID:new RegExp("^#("+ba+"+)"),CLASS:new RegExp("^\\.("+ba+"+)"),NAME:new RegExp("^\\[name=['\"]?("+ba+"+)['\"]?\\]"),TAG:new RegExp("^("+ba.replace("[-","[-\\*")+"+)"),ATTR:new RegExp("^"+a7),PSEUDO:new RegExp("^"+az),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+aE+"*(even|odd|(([+-]|)(\\d*)n|)"+aE+"*(?:([+-]|)"+aE+"*(\\d+)|))"+aE+"*\\)|)","i"),POS:new RegExp(aA,"ig"),needsContext:new RegExp("^"+aE+"*[>+~]|"+aA,"i")},aW={},aV=[],a5={},aO=[],aI=function(h){h.sizzleFilter=true;
return h},bp=function(h){return function(i){return i.nodeName.toLowerCase()==="input"&&i.type===h
}},aT=function(h){return function(i){var j=i.nodeName.toLowerCase();return(j==="input"||j==="button")&&i.type===h
}},at=function(h){var k=false,i=bm.createElement("div");try{k=h(i)}catch(j){}i=null;
return k},a1=at(function(i){i.innerHTML="<select></select>";var h=typeof i.lastChild.getAttribute("multiple");
return h!=="boolean"&&h!=="string"}),bs=at(function(i){i.id=aM+0;i.innerHTML="<a name='"+aM+"'></a><div name='"+aM+"'></div>";
bj.insertBefore(i,bj.firstChild);var h=bm.getElementsByName&&bm.getElementsByName(aM).length===2+bm.getElementsByName(aM+0).length;
bk=!bm.getElementById(aM);bj.removeChild(i);return h}),bn=at(function(h){h.appendChild(bm.createComment(""));
return h.getElementsByTagName("*").length===0}),ax=at(function(h){h.innerHTML="<a href='#'></a>";
return h.firstChild&&typeof h.firstChild.getAttribute!==aK&&h.firstChild.getAttribute("href")==="#"
}),ay=at(function(h){h.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";
if(!h.getElementsByClassName||h.getElementsByClassName("e").length===0){return false
}h.lastChild.className="e";return h.getElementsByClassName("e").length!==1});var a4=function(i,l,p,m){p=p||[];
l=l||bm;var o,k,n,j,h=l.nodeType;if(h!==1&&h!==9){return[]}if(!i||typeof i!=="string"){return p
}n=a8(l);if(!n&&!m){if((o=a.exec(i))){if((j=o[1])){if(h===9){k=l.getElementById(j);
if(k&&k.parentNode){if(k.id===j){p.push(k);return p}}else{return p}}else{if(l.ownerDocument&&(k=l.ownerDocument.getElementById(j))&&aB(l,k)&&k.id===j){p.push(k);
return p}}}else{if(o[2]){aU.apply(p,a9.call(l.getElementsByTagName(i),0));return p
}else{if((j=o[3])&&ay&&l.getElementsByClassName){aU.apply(p,a9.call(l.getElementsByClassName(j),0));
return p}}}}}return aN(i,l,p,m,n)};var au=a4.selectors={cacheLength:50,match:aw,order:["ID","TAG"],attrHandle:{},createPseudo:aI,find:{ID:bk?function(i,j,k){if(typeof j.getElementById!==aK&&!k){var h=j.getElementById(i);
return h&&h.parentNode?[h]:[]}}:function(i,j,k){if(typeof j.getElementById!==aK&&!k){var h=j.getElementById(i);
return h?h.id===i||typeof h.getAttributeNode!==aK&&h.getAttributeNode("id").value===i?[h]:bc:[]
}},TAG:bn?function(h,i){if(typeof i.getElementsByTagName!==aK){return i.getElementsByTagName(h)
}}:function(h,j){var k=j.getElementsByTagName(h);if(h==="*"){var i,l=[],m=0;for(;
(i=k[m]);m++){if(i.nodeType===1){l.push(i)}}return l}return k}},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(h){h[1]=h[1].replace(aR,"");
h[3]=(h[4]||h[5]||"").replace(aR,"");if(h[2]==="~="){h[3]=" "+h[3]+" "}return h.slice(0,4)
},CHILD:function(h){h[1]=h[1].toLowerCase();if(h[1]==="nth"){if(!h[2]){a4.error(h[0])
}h[3]=+(h[3]?h[4]+(h[5]||1):2*(h[2]==="even"||h[2]==="odd"));h[4]=+((h[6]+h[7])||h[2]==="odd")
}else{if(h[2]){a4.error(h[0])}}return h},PSEUDO:function(h){var j,i=h[4];if(aw.CHILD.test(h[0])){return null
}if(i&&(j=b.exec(i))&&j.pop()){h[0]=h[0].slice(0,j[0].length-i.length-1);i=j[0].slice(0,-1)
}h.splice(2,3,i||h[3]);return h}},filter:{ID:bk?function(h){h=h.replace(aR,"");
return function(i){return i.getAttribute("id")===h}}:function(h){h=h.replace(aR,"");
return function(i){var j=typeof i.getAttributeNode!==aK&&i.getAttributeNode("id");
return j&&j.value===h}},TAG:function(h){if(h==="*"){return function(){return true
}}h=h.replace(aR,"").toLowerCase();return function(i){return i.nodeName&&i.nodeName.toLowerCase()===h
}},CLASS:function(h){var i=aW[h];if(!i){i=aW[h]=new RegExp("(^|"+aE+")"+h+"("+aE+"|$)");
aV.push(h);if(aV.length>au.cacheLength){delete aW[aV.shift()]}}return function(j){return i.test(j.className||(typeof j.getAttribute!==aK&&j.getAttribute("class"))||"")
}},ATTR:function(i,j,h){if(!j){return function(k){return a4.attr(k,i)!=null}}return function(l){var m=a4.attr(l,i),k=m+"";
if(m==null){return j==="!="}switch(j){case"=":return k===h;case"!=":return k!==h;
case"^=":return h&&k.indexOf(h)===0;case"*=":return h&&k.indexOf(h)>-1;case"$=":return h&&k.substr(k.length-h.length)===h;
case"~=":return(" "+k+" ").indexOf(h)>-1;case"|=":return k===h||k.substr(0,h.length+1)===h+"-"
}}},CHILD:function(l,j,i,k){if(l==="nth"){var h=be++;return function(p){var o,n,q=0,m=p;
if(i===1&&k===0){return true}o=p.parentNode;if(o&&(o[aM]!==h||!p.sizset)){for(m=o.firstChild;
m;m=m.nextSibling){if(m.nodeType===1){m.sizset=++q;if(m===p){break}}}o[aM]=h}n=p.sizset-k;
if(i===0){return n===0}else{return(n%i===0&&n/i>=0)}}}return function(m){var n=m;
switch(l){case"only":case"first":while((n=n.previousSibling)){if(n.nodeType===1){return false
}}if(l==="first"){return true}n=m;case"last":while((n=n.nextSibling)){if(n.nodeType===1){return false
}}return true}}},PSEUDO:function(i,j,l,h){var k=au.pseudos[i]||au.pseudos[i.toLowerCase()];
if(!k){a4.error("unsupported pseudo: "+i)}if(!k.sizzleFilter){return k}return k(j,l,h)
}},pseudos:{not:aI(function(h,j,k){var i=bh(h.replace(aP,"$1"),j,k);return function(l){return !i(l)
}}),enabled:function(h){return h.disabled===false},disabled:function(h){return h.disabled===true
},checked:function(h){var i=h.nodeName.toLowerCase();return(i==="input"&&!!h.checked)||(i==="option"&&!!h.selected)
},selected:function(h){if(h.parentNode){h.parentNode.selectedIndex}return h.selected===true
},parent:function(h){return !!h.firstChild},empty:function(h){return !h.firstChild
},contains:aI(function(h){return function(i){return(i.textContent||i.innerText||bt(i)).indexOf(h)>-1
}}),has:aI(function(h){return function(i){return a4(h,i).length>0}}),header:function(h){return aY.test(h.nodeName)
},text:function(i){var j,h;return i.nodeName.toLowerCase()==="input"&&(j=i.type)==="text"&&((h=i.getAttribute("type"))==null||h.toLowerCase()===j)
},radio:bp("radio"),checkbox:bp("checkbox"),file:bp("file"),password:bp("password"),image:bp("image"),submit:aT("submit"),reset:aT("reset"),button:function(i){var h=i.nodeName.toLowerCase();
return h==="input"&&i.type==="button"||h==="button"},input:function(h){return a6.test(h.nodeName)
},focus:function(h){var i=h.ownerDocument;return h===i.activeElement&&(!i.hasFocus||i.hasFocus())&&!!(h.type||h.href)
},active:function(h){return h===h.ownerDocument.activeElement}},setFilters:{first:function(i,j,h){return h?i.slice(1):[i[0]]
},last:function(i,j,k){var h=i.pop();return k?i:[h]},even:function(i,j,k){var l=[],m=k?1:0,h=i.length;
for(;m<h;m=m+2){l.push(i[m])}return l},odd:function(i,j,k){var l=[],m=k?0:1,h=i.length;
for(;m<h;m=m+2){l.push(i[m])}return l},lt:function(i,j,h){return h?i.slice(+j):i.slice(0,+j)
},gt:function(i,j,h){return h?i.slice(0,+j+1):i.slice(+j+1)},eq:function(i,j,k){var h=i.splice(+j,1);
return k?i:h}}};au.setFilters.nth=au.setFilters.eq;au.filters=au.pseudos;if(!ax){au.attrHandle={href:function(h){return h.getAttribute("href",2)
},type:function(h){return h.getAttribute("type")}}}if(bs){au.order.push("NAME");
au.find.NAME=function(h,i){if(typeof i.getElementsByName!==aK){return i.getElementsByName(h)
}}}if(ay){au.order.splice(1,0,"CLASS");au.find.CLASS=function(i,j,h){if(typeof j.getElementsByClassName!==aK&&!h){return j.getElementsByClassName(i)
}}}try{a9.call(bj.childNodes,0)[0].nodeType}catch(aD){a9=function(j){var i,h=[];
for(;(i=this[j]);j++){h.push(i)}return h}}var a8=a4.isXML=function(h){var i=h&&(h.ownerDocument||h).documentElement;
return i?i.nodeName!=="HTML":false};var aB=a4.contains=bj.compareDocumentPosition?function(i,h){return !!(i.compareDocumentPosition(h)&16)
}:bj.contains?function(k,h){var i=k.nodeType===9?k.documentElement:k,j=h.parentNode;
return k===j||!!(j&&j.nodeType===1&&i.contains&&i.contains(j))}:function(i,h){while((h=h.parentNode)){if(h===i){return true
}}return false};var bt=a4.getText=function(i){var j,l="",k=0,h=i.nodeType;if(h){if(h===1||h===9||h===11){if(typeof i.textContent==="string"){return i.textContent
}else{for(i=i.firstChild;i;i=i.nextSibling){l+=bt(i)}}}else{if(h===3||h===4){return i.nodeValue
}}}else{for(;(j=i[k]);k++){l+=bt(j)}}return l};a4.attr=function(i,j){var h,k=a8(i);
if(!k){j=j.toLowerCase()}if(au.attrHandle[j]){return au.attrHandle[j](i)}if(a1||k){return i.getAttribute(j)
}h=i.getAttributeNode(j);return h?typeof i[j]==="boolean"?i[j]?j:null:h.specified?h.value:null:null
};a4.error=function(h){throw new Error("Syntax error, unrecognized expression: "+h)
};[0,0].sort(function(){return(bl=0)});if(bj.compareDocumentPosition){bd=function(i,h){if(i===h){bi=true;
return 0}return(!i.compareDocumentPosition||!h.compareDocumentPosition?i.compareDocumentPosition:i.compareDocumentPosition(h)&4)?-1:1
}}else{bd=function(n,o){if(n===o){bi=true;return 0}else{if(n.sourceIndex&&o.sourceIndex){return n.sourceIndex-o.sourceIndex
}}var q,k,j=[],l=[],h=n.parentNode,p=o.parentNode,m=h;if(h===p){return bq(n,o)}else{if(!h){return -1
}else{if(!p){return 1}}}while(m){j.unshift(m);m=m.parentNode}m=p;while(m){l.unshift(m);
m=m.parentNode}q=j.length;k=l.length;for(var i=0;i<q&&i<k;i++){if(j[i]!==l[i]){return bq(j[i],l[i])
}}return i===q?bq(n,l[i],-1):bq(j[i],o,1)};bq=function(k,h,j){if(k===h){return j
}var i=k.nextSibling;while(i){if(i===h){return -1}i=i.nextSibling}return 1}}a4.uniqueSort=function(j){var i,h=1;
if(bd){bi=bl;j.sort(bd);if(bi){for(;(i=j[h]);h++){if(i===j[h-1]){j.splice(h--,1)
}}}}return j};function a3(m,i,j,l){var k=0,h=i.length;for(;k<h;k++){a4(m,i[k],j,l)
}}function c(h,n,i,l,o,j){var m,k=au.setFilters[n.toLowerCase()];if(!k){a4.error(n)
}if(h||!(m=o)){a3(h||"*",l,(m=[]),o)}return m.length>0?k(m,i,j):[]}function aX(v,u,x,q,n){var j,s,m,k,y,l,w,p,t=0,r=n.length,o=aw.POS,i=new RegExp("^"+o.source+"(?!"+aE+")","i"),h=function(){var z=1,A=arguments.length-2;
for(;z<A;z++){if(arguments[z]===bc){j[z]=bc}}};for(;t<r;t++){o.exec("");v=n[t];
k=[];m=0;y=q;while((j=o.exec(v))){p=o.lastIndex=j.index+j[0].length;if(p>m){w=v.slice(m,j.index);
m=p;l=[u];if(av.test(w)){if(y){l=y}y=q}if((s=aJ.test(w))){w=w.slice(0,-5).replace(av,"$&*")
}if(j.length>1){j[0].replace(i,h)}y=c(w,j[1],j[2],l,y,s)}}if(y){k=k.concat(y);if((w=v.slice(m))&&w!==")"){a3(w,k,x,q)
}else{aU.apply(x,k)}}else{a4(v,u,x,q)}}return r===1?x:a4.uniqueSort(x)}function br(t,j,q){var o,p,n,h=[],s=0,r=b.exec(t),l=!r.pop()&&!r.pop(),k=l&&t.match(aQ)||[""],m=au.preFilter,i=au.filter,u=!q&&j!==bm;
for(;(p=k[s])!=null&&l;s++){h.push(o=[]);if(u){p=" "+p}while(p){l=false;if((r=av.exec(p))){p=p.slice(r[0].length);
l=o.push({part:r.pop().replace(aP," "),captures:r})}for(n in i){if((r=aw[n].exec(p))&&(!m[n]||(r=m[n](r,j,q)))){p=p.slice(r.shift().length);
l=o.push({part:n,captures:r})}}if(!l){break}}}if(!l){a4.error(t)}return h}function aH(i,j,k){var h=j.dir,l=be++;
if(!i){i=function(m){return m===k}}return j.first?function(m,n){while((m=m[h])){if(m.nodeType===1){return i(m,n)&&m
}}}:function(q,n){var p,o=l+"."+a0,m=o+"."+aS;while((q=q[h])){if(q.nodeType===1){if((p=q[aM])===m){return false
}else{if(typeof p==="string"&&p.indexOf(o)===0){if(q.sizset){return q}}else{q[aM]=m;
if(i(q,n)){q.sizset=true;return q}q.sizset=false}}}}}}function aL(h,i){return h?function(j,k){var l=i(j,k);
return l&&h(l===true?j:l,k)}:i}function aF(i,k,h){var l,j,m=0;for(;(l=i[m]);m++){if(au.relative[l.part]){j=aH(j,au.relative[l.part],k)
}else{l.captures.push(k,h);j=aL(j,au.filter[l.part].apply(null,l.captures))}}return j
}function bo(h){return function(j,k){var i,l=0;for(;(i=h[l]);l++){if(i(j,k)){return true
}}return false}}var bh=a4.compile=function(h,l,n){var i,j,m,k=a5[h];if(k&&k.context===l){k.dirruns++;
return k}j=br(h,l,n);for(m=0;(i=j[m]);m++){j[m]=aF(i,l,n)}k=a5[h]=bo(j);k.context=l;
k.runs=k.dirruns=0;aO.push(h);if(aO.length>au.cacheLength){delete a5[aO.shift()]
}return k};a4.matches=function(i,h){return a4(i,null,null,h)};a4.matchesSelector=function(h,i){return a4(i,null,null,[h]).length>0
};var aN=function(i,o,w,s,t){i=i.replace(aP,"$1");var q,r,v,p,m,k,l,j,x,u=i.match(aQ),n=i.match(aG),h=o.nodeType;
if(aw.POS.test(i)){return aX(i,o,w,s,u)}if(s){q=a9.call(s,0)}else{if(u&&u.length===1){if(n.length>1&&h===9&&!t&&(u=aw.ID.exec(n[0]))){o=au.find.ID(u[1],o,t)[0];
if(!o){return w}i=i.slice(n.shift().length)}j=((u=aZ.exec(n[0]))&&!u.index&&o.parentNode)||o;
x=n.pop();k=x.split(":not")[0];for(v=0,p=au.order.length;v<p;v++){l=au.order[v];
if((u=aw[l].exec(k))){q=au.find[l]((u[1]||"").replace(aR,""),j,t);if(q==null){continue
}if(k===x){i=i.slice(0,i.length-x.length)+k.replace(aw[l],"");if(!i){aU.apply(w,a9.call(q,0))
}}break}}}}if(i){r=bh(i,o,t);a0=r.dirruns;if(q==null){q=au.find.TAG("*",(aZ.test(i)&&o.parentNode)||o)
}for(v=0;(m=q[v]);v++){aS=r.runs++;if(r(m,o)){w.push(m)}}}return w};if(bm.querySelectorAll){(function(){var j,i=aN,k=/'|\\/g,m=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,n=[],h=[":active"],l=bj.matchesSelector||bj.mozMatchesSelector||bj.webkitMatchesSelector||bj.oMatchesSelector||bj.msMatchesSelector;
at(function(o){o.innerHTML="<select><option selected></option></select>";if(!o.querySelectorAll("[selected]").length){n.push("\\["+aE+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
}if(!o.querySelectorAll(":checked").length){n.push(":checked")}});at(function(o){o.innerHTML="<p test=''></p>";
if(o.querySelectorAll("[test^='']").length){n.push("[*^$]="+aE+"*(?:\"\"|'')")}o.innerHTML="<input type='hidden'>";
if(!o.querySelectorAll(":enabled").length){n.push(":enabled",":disabled")}});n=n.length&&new RegExp(n.join("|"));
aN=function(r,v,q,o,p){if(!o&&!p&&(!n||!n.test(r))){if(v.nodeType===9){try{aU.apply(q,a9.call(v.querySelectorAll(r),0));
return q}catch(s){}}else{if(v.nodeType===1&&v.nodeName.toLowerCase()!=="object"){var t=v.getAttribute("id"),w=t||aM,u=aZ.test(r)&&v.parentNode||v;
if(t){w=w.replace(k,"\\$&")}else{v.setAttribute("id",w)}try{aU.apply(q,a9.call(u.querySelectorAll(r.replace(aQ,"[id='"+w+"'] $&")),0));
return q}catch(s){}finally{if(!t){v.removeAttribute("id")}}}}}return i(r,v,q,o,p)
};if(l){at(function(o){j=l.call(o,"div");try{l.call(o,"[test!='']:sizzle");h.push(au.match.PSEUDO)
}catch(p){}});h=new RegExp(h.join("|"));a4.matchesSelector=function(q,o){o=o.replace(m,"='$1']");
if(!a8(q)&&!h.test(o)&&(!n||!n.test(o))){try{var r=l.call(q,o);if(r||j||q.document&&q.document.nodeType!==11){return r
}}catch(p){}}return a4(o,null,null,[q]).length>0}}})()}if(typeof g==="object"&&g.exports){g.exports=a4
}else{a2.Sizzle=a4}})(window)},{}],20:[function(n,m,i){var l=n("./ac-browser/BrowserData");
var j=/applewebkit/i;var k=n("./ac-browser/IE");var o=l.create();o.isWebKit=function(b){var a=b||window.navigator.userAgent;
return a?!!j.test(a):false};o.lowerCaseUserAgent=navigator.userAgent.toLowerCase();
if(o.name==="IE"){o.IE={documentMode:k.getDocumentMode()}}m.exports=o},{"./ac-browser/BrowserData":21,"./ac-browser/IE":22}],21:[function(g,k,h){var j=g("./data");
function i(){}i.prototype={__getBrowserVersion:function(d,c){if(!d||!c){return}var a=j.browser.filter(function(m){return m.identity===c
})[0];var f=a.versionSearch||c;var b=d.indexOf(f);if(b>-1){return parseFloat(d.substring(b+f.length+1))
}},__getName:function(a){return this.__getIdentityStringFromArray(a)},__getIdentity:function(a){if(a.string){return this.__matchSubString(a)
}else{if(a.prop){return a.identity}}},__getIdentityStringFromArray:function(d){for(var a=0,c=d.length,b;
a<c;a++){b=this.__getIdentity(d[a]);if(b){return b}}},__getOS:function(a){return this.__getIdentityStringFromArray(a)
},__getOSVersion:function(d,a){if(!d||!a){return}var b=j.os.filter(function(l){return l.identity===a
})[0];var m=b.versionSearch||a;var c=new RegExp(m+" ([\\d_\\.]+)","i");var f=d.match(c);
if(f!==null){return f[1].replace(/_/g,".")}},__matchSubString:function(b){var c=b.subString;
if(c){var a=c.test?!!c.test(b.string):b.string.indexOf(c)>-1;if(a){return b.identity
}}}};i.create=function(){var b=new i();var a={};a.name=b.__getName(j.browser);a.version=b.__getBrowserVersion(j.versionString,a.name);
a.os=b.__getOS(j.os);a.osVersion=b.__getOSVersion(j.versionString,a.os);return a
};k.exports=i},{"./data":23}],22:[function(d,g,f){g.exports={getDocumentMode:function(){var a;
if(document.documentMode){a=parseInt(document.documentMode,10)}else{a=5;if(document.compatMode){if(document.compatMode==="CSS1Compat"){a=7
}}}return a}}},{}],23:[function(d,g,f){g.exports=d(11)},{}],24:[function(d,g,f){(function(b,a){if(typeof f==="object"&&f){g.exports=a
}else{if(typeof define==="function"&&define.amd){define(a)}else{b.Deferred=a}}}(this,(function(){var s={};
var t,c,a,u,o,p,b,r;t={0:"pending",1:"resolved",2:"rejected"};c=function(k,i){var l,h,j,m,n;
if(this._status!==0){if(console&&console.warn){console.warn("Trying to fulfill more than once.")
}return false}this.data=i;h=this.pending;j=h.length;for(l=0;l<j;l++){m=h[l];if(m[k]){n=m[k](i)
}if(typeof n==="object"&&n.hasOwnProperty("then")&&n.hasOwnProperty("status")){n.then(function(w){m.deferred.resolve(w)
},function(w){m.deferred.reject(w)},function(w){m.deferred.progress(w)})}else{m.deferred[k](n||undefined)
}}if(k!=="progress"){h=[]}return true};p=function(h,i){this.then=h;this.status=i
};b=p.prototype;r=function(h){return h};b.success=function(h,i){return this.then(h.bind(i),r,r)
};b.fail=function(h,i){return this.then(r,h.bind(i),r)};b.progress=function(h,i){return this.then(r,r,h.bind(i))
};u=function(h){if(typeof h!=="function"){return function(){}}return h};a=function(h,i,j){this.resolve=u(h);
this.reject=u(i);this.progress=u(j);this.deferred=new o()};o=function(){this.pending=[];
this._status=0;this._promise=new p(this.then.bind(this),this.status.bind(this))
};o.prototype={status:function(){return t[this._status]},promise:function(){return this._promise
},progress:function(h){c.call(this,"progress",h);return this._promise},resolve:function(h){c.call(this,"resolve",h);
if(this._status===0){this._status=1}return this._promise},reject:function(h){c.call(this,"reject",h);
if(this._status===0){this._status=2}return this._promise},then:function(h,j,k){var l,i;
i=new a(h,j,k);if(this._status===0){this.pending.push(i)}else{if(this._status===1&&typeof h==="function"){l=h(this.data);
if(typeof l==="object"&&l.hasOwnProperty("then")&&l.hasOwnProperty("status")){l.then(function(m){i.deferred.resolve(m)
},function(m){i.deferred.reject(m)},function(m){i.deferred.progress(m)})}else{i.deferred.resolve(l)
}}else{if(this._status===2&&typeof j==="function"){l=j(this.data);i.deferred.reject(l)
}}}return i.deferred.promise()}};var q=function(){var j,k,h,i,l;j=[].slice.call(arguments);
k=new o();h=0;i=function(m){h--;var n=j.indexOf(this);j[n]=m;if(h===0){k.resolve(j)
}};l=function(m){k.reject(m)};j.forEach(function(m){if(m.then){h++}});j.forEach(function(m){if(m.then){m.then(i.bind(m),l)
}});return k.promise()};o.when=q;s.Deferred=o;return s}())))},{}],25:[function(q,r,p){function n(){}n.prototype={resolve:function m(){this._defer.resolve.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},reject:function k(){this._defer.reject.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},progress:function s(){var a="ac-defer.progress is deprecated since it is not part of the A+ spec. Recommend using ac-event-emitter for progress signaling";
console.warn(a);this._defer.progress.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},then:function o(){this._defer.then.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},promise:function l(){return this._defer.promise.apply(this._defer,Array.prototype.slice.call(arguments))
}};r.exports=n},{}],26:[function(q,p,k){var m=new (q("./ac-deferred/Deferred"))(),n=q("smartsign-deferred").Deferred;
function j(){this._defer=new n()}j.prototype=m;p.exports.join=function l(){return n.when.apply(null,[].slice.call(arguments))
};p.exports.all=function o(a){return n.when.apply(null,a)};p.exports.Deferred=j
},{"./ac-deferred/Deferred":25,"smartsign-deferred":24}],27:[function(g,j,h){var k={};
k.addEventListener=function(a,c,b,d){if(a.addEventListener){a.addEventListener(c,b,d)
}else{if(a.attachEvent){a.attachEvent("on"+c,b)}else{a["on"+c]=b}}return a};k.dispatchEvent=function(a,b){if(document.createEvent){a.dispatchEvent(new CustomEvent(b))
}else{a.fireEvent("on"+b,document.createEventObject())}return a};k.removeEventListener=function(a,c,b,d){if(a.removeEventListener){a.removeEventListener(c,b,d)
}else{a.detachEvent("on"+c,b)}return a};var i=/^(webkit|moz|ms|o)/i;k.addVendorPrefixEventListener=function(a,c,b,d){if(i.test(c)){c=c.replace(i,"")
}else{c=c.charAt(0).toUpperCase()+c.slice(1)}if(/WebKit/i.test(window.navigator.userAgent)){return k.addEventListener(a,"webkit"+c,b,d)
}else{if(/Opera/i.test(window.navigator.userAgent)){return k.addEventListener(a,"O"+c,b,d)
}else{if(/Gecko/i.test(window.navigator.userAgent)){return k.addEventListener(a,c.toLowerCase(),b,d)
}else{c=c.charAt(0).toLowerCase()+c.slice(1);return k.addEventListener(a,c,b,d)
}}}};k.removeVendorPrefixEventListener=function(a,c,b,d){if(i.test(c)){c=c.replace(i,"")
}else{c=c.charAt(0).toUpperCase()+c.slice(1)}k.removeEventListener(a,"webkit"+c,b,d);
k.removeEventListener(a,"O"+c,b,d);k.removeEventListener(a,c.toLowerCase(),b,d);
c=c.charAt(0).toLowerCase()+c.slice(1);return k.removeEventListener(a,c,b,d)};k.stop=function(a){if(!a){a=window.event
}if(a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}if(a.preventDefault){a.preventDefault()
}a.stopped=true;a.returnValue=false};k.target=function(a){return(typeof a.target!=="undefined")?a.target:a.srcElement
};j.exports=k},{}],28:[function(d,g,f){g.exports.EventEmitter=d("./ac-event-emitter/EventEmitter")
},{"./ac-event-emitter/EventEmitter":29}],29:[function(r,s,q){var o="EventEmitter:propagation";
var l=function(a){if(a){this.context=a}};var p=l.prototype;var n=function(){if(!this.hasOwnProperty("_events")&&typeof this._events!=="object"){this._events={}
}return this._events};var u=function(a,f){var d=a[0];var c=a[1];var g=a[2];if((typeof d!=="string"&&typeof d!=="object")||d===null||Array.isArray(d)){throw new TypeError("Expecting event name to be a string or object.")
}if((typeof d==="string")&&!c){throw new Error("Expecting a callback function to be provided.")
}if(c&&(typeof c!=="function")){if(typeof d==="object"&&typeof c==="object"){g=c
}else{throw new TypeError("Expecting callback to be a function.")}}if(typeof d==="object"){for(var b in d){f.call(this,b,d[b],g)
}}if(typeof d==="string"){d=d.split(" ");d.forEach(function(h){f.call(this,h,c,g)
},this)}};var m=function(d,c){var b;var a;var f;b=n.call(this)[d];if(!b||b.length===0){return
}b=b.slice();for(a=0,f=b.length;a<f;a++){if(c(b[a],a)){break}}};var t=function(a,d,c){var b=-1;
m.call(this,d,function(f,g){if(f.callback===c){b=g;return true}});if(b===-1){return
}a[d].splice(b,1)};p.on=function(){var a=n.call(this);u.call(this,arguments,function(d,c,b){a[d]=a[d]||(a[d]=[]);
a[d].push({callback:c,context:b})});return this};p.once=function(){u.call(this,arguments,function(a,c,b){var d=function(f){c.call(b||this,f);
this.off(a,d)};this.on(a,d,this)});return this};p.off=function(f,c){var a=n.call(this);
if(arguments.length===0){this._events={}}else{if(!f||(typeof f!=="string"&&typeof f!=="object")||Array.isArray(f)){throw new TypeError("Expecting event name to be a string or object.")
}}if(typeof f==="object"){for(var d in f){t.call(this,a,d,f[d])}}if(typeof f==="string"){var b=f.split(" ");
if(b.length===1){if(c){t.call(this,a,f,c)}else{a[f]=[]}}else{b.forEach(function(g){a[g]=[]
})}}return this};p.trigger=function(a,c,b){if(!a){throw new Error("trigger method requires an event name")
}if(typeof a!=="string"){throw new TypeError("Expecting event names to be a string.")
}if(b&&typeof b!=="boolean"){throw new TypeError("Expecting doNotPropagate to be a boolean.")
}a=a.split(" ");a.forEach(function(d){m.call(this,d,function(f){f.callback.call(f.context||this.context||this,c)
}.bind(this));if(!b){m.call(this,o,function(f){var g=d;if(f.prefix){g=f.prefix+g
}f.emitter.trigger(g,c)})}},this);return this};p.propagateTo=function(a,c){var b=n.call(this);
if(!b[o]){this._events[o]=[]}b[o].push({emitter:a,prefix:c})};p.stopPropagatingTo=function(d){var a=n.call(this);
if(!d){a[o]=[];return}var c=a[o];var f=c.length;var b;for(b=0;b<f;b++){if(c[b].emitter===d){c.splice(b,1);
break}}};p.has=function(b,c,g){var h=n.call(this);var a=h[b];if(arguments.length===0){return Object.keys(h)
}if(!c){return(a&&a.length>0)?true:false}for(var i=0,f=a.length;i<f;i++){var d=a[i];
if(g&&c&&d.context===g&&d.callback===c){return true}else{if(c&&!g&&d.callback===c){return true
}}}return false};s.exports=l},{}],30:[function(k,i,g){var j={cssPropertyAvailable:k("./ac-feature/cssPropertyAvailable"),localStorageAvailable:k("./ac-feature/localStorageAvailable")};
var h=Object.prototype.hasOwnProperty;j.threeDTransformsAvailable=function(){if(typeof this._threeDTransformsAvailable!=="undefined"){return this._threeDTransformsAvailable
}var a,c;try{this._threeDTransformsAvailable=false;if(h.call(window,"styleMedia")){this._threeDTransformsAvailable=window.styleMedia.matchMedium("(-webkit-transform-3d)")
}else{if(h.call(window,"media")){this._threeDTransformsAvailable=window.media.matchMedium("(-webkit-transform-3d)")
}}if(!this._threeDTransformsAvailable){if(!(c=document.getElementById("supportsThreeDStyle"))){c=document.createElement("style");
c.id="supportsThreeDStyle";c.textContent="@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
document.querySelector("head").appendChild(c)}if(!(a=document.querySelector("#supportsThreeD"))){a=document.createElement("div");
a.id="supportsThreeD";document.body.appendChild(a)}this._threeDTransformsAvailable=(a.offsetHeight===3)||c.style.MozTransform!==undefined||c.style.WebkitTransform!==undefined
}return this._threeDTransformsAvailable}catch(b){return false}};j.canvasAvailable=function(){if(typeof this._canvasAvailable!=="undefined"){return this._canvasAvailable
}var a=document.createElement("canvas");this._canvasAvailable=!!(typeof a.getContext==="function"&&a.getContext("2d"));
return this._canvasAvailable};j.sessionStorageAvailable=function(){if(typeof this._sessionStorageAvailable!=="undefined"){return this._sessionStorageAvailable
}try{if(typeof window.sessionStorage!=="undefined"&&typeof window.sessionStorage.setItem==="function"){window.sessionStorage.setItem("ac_browser_detect","test");
this._sessionStorageAvailable=true;window.sessionStorage.removeItem("ac_browser_detect","test")
}else{this._sessionStorageAvailable=false}}catch(a){this._sessionStorageAvailable=false
}return this._sessionStorageAvailable};j.cookiesAvailable=function(){if(typeof this._cookiesAvailable!=="undefined"){return this._cookiesAvailable
}this._cookiesAvailable=(h.call(document,"cookie")&&!!navigator.cookieEnabled)?true:false;
return this._cookiesAvailable};j.__normalizedScreenWidth=function(){if(typeof window.orientation==="undefined"){return window.screen.width
}return window.screen.width<window.screen.height?window.screen.width:window.screen.height
};j.touchAvailable=function(){return !!(("ontouchstart" in window)||window.DocumentTouch&&document instanceof window.DocumentTouch)
};j.isDesktop=function(){if(!this.touchAvailable()&&!window.orientation){return true
}return false};j.isHandheld=function(){return !this.isDesktop()&&!this.isTablet()
};j.isTablet=function(){return !this.isDesktop()&&this.__normalizedScreenWidth()>480
};j.isRetina=function(){var b=["min-device-pixel-ratio:1.5","-webkit-min-device-pixel-ratio:1.5","min-resolution:1.5dppx","min-resolution:144dpi","min--moz-device-pixel-ratio:1.5"];
var a;if(window.devicePixelRatio!==undefined){if(window.devicePixelRatio>=1.5){return true
}}else{for(a=0;a<b.length;a+=1){if(window.matchMedia("("+b[a]+")").matches===true){return true
}}}return false};j.svgAvailable=function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
};i.exports=j},{"./ac-feature/cssPropertyAvailable":31,"./ac-feature/localStorageAvailable":32}],31:[function(o,m,i){var l=null;
var k=null;var j=null;var n=null;m.exports=function(u){if(l===null){l=document.createElement("browserdetect").style
}if(k===null){k=["-webkit-","-moz-","-o-","-ms-","-khtml-",""]}if(j===null){j=["Webkit","Moz","O","ms","Khtml",""]
}if(n===null){n={}}u=u.replace(/([A-Z]+)([A-Z][a-z])/g,"$1\\-$2").replace(/([a-z\d])([A-Z])/g,"$1\\-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/,"").toLowerCase();
switch(u){case"gradient":if(n.gradient!==undefined){return n.gradient}u="background-image:";
var b="gradient(linear,left top,right bottom,from(#9f9),to(white));";var c="linear-gradient(left top,#9f9, white);";
l.cssText=(u+k.join(b+u)+k.join(c+u)).slice(0,-u.length);n.gradient=(l.backgroundImage.indexOf("gradient")!==-1);
return n.gradient;case"inset-box-shadow":if(n["inset-box-shadow"]!==undefined){return n["inset-box-shadow"]
}u="box-shadow:";var a="#fff 0 1px 1px inset;";l.cssText=k.join(u+a);n["inset-box-shadow"]=(l.cssText.indexOf("inset")!==-1);
return n["inset-box-shadow"];default:var d=u.split("-");var t=d.length;var f;var g;
var h;if(d.length>0){u=d[0];for(g=1;g<t;g+=1){u+=d[g].substr(0,1).toUpperCase()+d[g].substr(1)
}}f=u.substr(0,1).toUpperCase()+u.substr(1);if(n[u]!==undefined){return n[u]}for(h=j.length-1;
h>=0;h-=1){if(l[j[h]+u]!==undefined||l[j[h]+f]!==undefined){n[u]=true;return true
}}return false}}},{}],32:[function(j,i,g){var h=null;i.exports=function k(){if(h===null){h=!!(window.localStorage&&window.localStorage.non_existent!==null)
}return h}},{}],33:[function(P,U,A){var F=Object.prototype.toString;var M=Object.prototype.hasOwnProperty;
var V=typeof Array.prototype.indexOf==="function"?function(b,a){return b.indexOf(a)
}:function(b,c){for(var a=0;a<b.length;a++){if(b[a]===c){return a}}return -1};var N=Array.isArray||function(a){return F.call(a)=="[object Array]"
};var C=Object.keys||function(c){var b=[];for(var a in c){if(c.hasOwnProperty(a)){b.push(a)
}}return b};var D=typeof Array.prototype.forEach==="function"?function(b,a){return b.forEach(a)
}:function(b,c){for(var a=0;a<b.length;a++){c(b[a])}};var L=function(d,b,a){if(typeof d.reduce==="function"){return d.reduce(b,a)
}var c=a;for(var f=0;f<d.length;f++){c=b(c,d[f])}return c};var z=/^[0-9]+$/;function T(c,d){if(c[d].length==0){return c[d]={}
}var a={};for(var b in c[d]){if(M.call(c[d],b)){a[b]=c[d][b]}}c[d]=a;return a}function H(c,g,a,b){var f=c.shift();
if(M.call(Object.prototype,a)){return}if(!f){if(N(g[a])){g[a].push(b)}else{if("object"==typeof g[a]){g[a]=b
}else{if("undefined"==typeof g[a]){g[a]=b}else{g[a]=[g[a],b]}}}}else{var d=g[a]=g[a]||[];
if("]"==f){if(N(d)){if(""!=b){d.push(b)}}else{if("object"==typeof d){d[C(d).length]=b
}else{d=g[a]=[g[a],b]}}}else{if(~V(f,"]")){f=f.substr(0,f.length-1);if(!z.test(f)&&N(d)){d=T(g,a)
}H(c,d,f,b)}else{if(!z.test(f)&&N(d)){d=T(g,a)}H(c,d,f,b)}}}}function S(f,h,b){if(~V(h,"]")){var c=h.split("["),g=c.length,d=g-1;
H(c,f,"base",b)}else{if(!z.test(h)&&N(f.base)){var i={};for(var a in f.base){i[a]=f.base[a]
}f.base=i}K(f.base,h,b)}return f}function J(c){if("object"!=typeof c){return c}if(N(c)){var b=[];
for(var d in c){if(M.call(c,d)){b.push(c[d])}}return b}for(var a in c){c[a]=J(c[a])
}return c}function R(a){var b={base:{}};D(C(a),function(c){S(b,c,a[c])});return J(b.base)
}function Q(a){var b=L(String(a).split("&"),function(i,d){var c=V(d,"="),f=E(d),h=d.substr(0,f||c),g=d.substr(f||c,d.length),g=g.substr(V(g,"=")+1,g.length);
if(""==h){h=d,g=""}if(""==h){return i}return S(i,I(h),I(g))},{base:{}}).base;return J(b)
}A.parse=function(a){if(null==a||""==a){return{}}return"object"==typeof a?R(a):Q(a)
};var G=A.stringify=function(a,b){if(N(a)){return O(a,b)}else{if("[object Object]"==F.call(a)){return B(a,b)
}else{if("string"==typeof a){return W(a,b)}else{return b+"="+encodeURIComponent(String(a))
}}}};function W(a,b){if(!b){throw new TypeError("stringify expects an object")}return b+"="+encodeURIComponent(a)
}function O(c,b){var a=[];if(!b){throw new TypeError("stringify expects an object")
}for(var d=0;d<c.length;d++){a.push(G(c[d],b+"["+d+"]"))}return a.join("&")}function B(b,c){var a=[],d=C(b),g;
for(var h=0,f=d.length;h<f;++h){g=d[h];if(""==g){continue}if(null==b[g]){a.push(encodeURIComponent(g)+"=")
}else{a.push(G(b[g],c?c+"["+encodeURIComponent(g)+"]":encodeURIComponent(g)))}}return a.join("&")
}function K(d,a,c){var b=d[a];if(M.call(Object.prototype,a)){return}if(undefined===b){d[a]=c
}else{if(N(b)){b.push(c)}else{d[a]=[b,c]}}}function E(d){var c=d.length,f,b;for(var a=0;
a<c;++a){b=d[a];if("]"==b){f=false}if("["==b){f=true}if("="==b&&!f){return a}}}function I(a){try{return decodeURIComponent(a.replace(/\+/g," "))
}catch(b){return a}}},{}],34:[function(d,g,f){g.exports={clone:d("./ac-object/clone"),defaults:d("./ac-object/defaults"),extend:d("./ac-object/extend"),getPrototypeOf:d("./ac-object/getPrototypeOf"),isEmpty:d("./ac-object/isEmpty"),toQueryParameters:d("./ac-object/toQueryParameters")}
},{"./ac-object/clone":35,"./ac-object/defaults":36,"./ac-object/extend":37,"./ac-object/getPrototypeOf":38,"./ac-object/isEmpty":39,"./ac-object/toQueryParameters":40}],35:[function(g,k,h){var i=g("./extend");
k.exports=function j(a){return i({},a)}},{"./extend":37}],36:[function(g,k,h){var i=g("./extend");
k.exports=function j(a,b){if(typeof a!=="object"||typeof b!=="object"){throw new TypeError("defaults: must provide a defaults and options object")
}return i({},a,b)}},{"./extend":37}],37:[function(k,j,g){var h=Object.prototype.hasOwnProperty;
j.exports=function i(){var a;var b;if(arguments.length<2){a=[{},arguments[0]]}else{a=[].slice.call(arguments)
}b=a.shift();a.forEach(function(c){if(c!=null){for(var d in c){if(h.call(c,d)){b[d]=c[d]
}}}});return b}},{}],38:[function(k,j,g){var h=Object.prototype.hasOwnProperty;
j.exports=function i(a){if(Object.getPrototypeOf){return Object.getPrototypeOf(a)
}else{if(typeof a!=="object"){throw new Error("Requested prototype of a value that is not an object.")
}else{if(typeof this.__proto__==="object"){return a.__proto__}else{var c=a.constructor;
var b;if(h.call(a,"constructor")){b=c;if(!(delete a.constructor)){return null}c=a.constructor;
a.constructor=b}return c?c.prototype:null}}}}},{}],39:[function(k,j,g){var h=Object.prototype.hasOwnProperty;
j.exports=function i(b){var a;if(typeof b!=="object"){throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
}for(a in b){if(h.call(b,a)){return false}}return true}},{}],40:[function(k,i,g){var h=k("qs");
i.exports=function j(a){if(typeof a!=="object"){throw new TypeError("toQueryParameters error: argument is not an object")
}return h.stringify(a)}},{qs:33}],41:[function(d,g,f){g.exports=(function(){var u=d("ac-element");
var w=d("ac-object");var t=d("ac-browser");var b=d("ac-dom-events");var q=d("./mobile-menu/MobileMenu");
var s=d("./helpers/viewport");d("./polyfills/nav");var c=d("gh-searchInit");var v=document.getElementById("globalheader");
var r=u.select(".gh-menu",v);var x=18;var a=(t.IE&&t.IE.documentMode<9);if(a){u.addClassName(v,"gh-oldie")
}if(r){new q(r)}function y(){if(s.shouldScale()){var h=(s.getScale()*x)+"px";u.setStyle(v,{"font-size":h})
}}y();b.addEventListener(window,"orientationchange",y)}())},{"./helpers/viewport":46,"./mobile-menu/MobileMenu":47,"./polyfills/nav":48,"ac-browser":20,"ac-dom-events":27,"ac-element":"j0qjr8","ac-object":34,"gh-searchInit":"oDi/Uh"}],42:[function(q,p,j){var o=window.matchMedia||window.msMatchMedia;
function k(a){if(0<a){if(unit){return +a}else{return a>>0}}else{return 1}}function l(a,b){if(0<a){return +a
}else{if(0>a){return -a}else{if("px"==b){return 256}else{if(b){return 32}else{return 1
}}}}}function m(a){if(o){return !!o(a).matches}else{return false}}function n(c,h,f,i){var d;
var b;var a;var g;h=typeof h=="string"?h:"";f=k(f);i=l(i,h);for(g=f;0<=g;g=g+i){a=m("(min-"+c+":"+g+h+")");
b=m("(max-"+c+":"+g+h+")");if(a&&b){return m("("+c+(g>>0)+h)?g>>0:g}if(null==d){i=(d=!b)?a&&i:-i
}else{if(b?d:!d){d=!d;i=-i/2}}}return 0}p.exports=n},{}],43:[function(d,g,f){g.exports={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CONTROL:17,ALT:18,COMMAND:91,CAPSLOCK:20,ESCAPE:27,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUMPAD_ZERO:96,NUMPAD_ONE:97,NUMPAD_TWO:98,NUMPAD_THREE:99,NUMPAD_FOUR:100,NUMPAD_FIVE:101,NUMPAD_SIX:102,NUMPAD_SEVEN:103,NUMPAD_EIGHT:104,NUMPAD_NINE:105,NUMPAD_ASTERISK:106,NUMPAD_PLUS:107,NUMPAD_DASH:109,NUMPAD_DOT:110,NUMPAD_SLASH:111,NUMPAD_EQUALS:187,TICK:192,LEFT_BRACKET:219,RIGHT_BRACKET:221,BACKSLASH:220,SEMICOLON:186,APOSTRAPHE:222,SPACEBAR:32,CLEAR:12,COMMA:188,DOT:190,SLASH:191}
},{}],44:[function(r,s,q){var m=r("ac-element");var p=document.getElementById("globalheader");
var n=(function(){var a;if(p){a=p.className.match(/gh-selected-tab-(\w*)/);if(a&&a.length===2){return a[1]
}}return"global"}());var o={"de-CH":"ch_de","en-419":"lae","en-AP":"asia","en-CA":"ca_en","en-GB":"uk","en-HK":"hk_en","en-PH":"asia","en-VN":"asia","es-419":"la","fr-BE":"be_fr","fr-CA":"ca_fr","fr-CH":"ch_fr","nl-BE":"be_nl"};
var l=(function(){var b,c,d,a;if(p){d=p.getAttribute("lang");var b=p.getElementsByTagName("form");
if(b&&b[0]){c=b[0].getAttribute("data-search-country");if(c&&c!==""){return c}}if(o[d]){return o[d]
}else{a=d.split("-");if(a.length===2){return a[1].toLowerCase()}else{return d.replace("-","_").toLowerCase()
}}}}());var k=(function(){return window.searchHost||false}());s.exports={searchSection:n,searchCountry:l,searchHost:k}
},{"ac-element":"j0qjr8"}],45:[function(o,n,i){var m;var k="http://www.w3.org/2000/svg";
var j=!!document.createElementNS;var l=function(a,f,b,c){if(j){var d=document.createElementNS(k,"svg");
d=document.createElementNS(k,"svg");d.setAttributeNS(null,"x","0px");d.setAttributeNS(null,"y","0px");
d.setAttributeNS(null,"width",f);d.setAttributeNS(null,"viewBox",b);d.setAttributeNS(null,"class",c);
d.setAttributeNS(null,"enable-background","new "+b);this.svgElement=d;this.wrapper=a
}};m=l.prototype;m.addRect=function(c,g,b,d,a){if(j&&this.svgElement&&this.wrapper){var f=document.createElementNS(k,"rect");
f.setAttributeNS(null,"width",b);f.setAttributeNS(null,"height",d);f.setAttributeNS(null,"x",c);
f.setAttributeNS(null,"y",g);f.setAttributeNS(null,"class",a);this.svgElement.appendChild(f);
this.wrapper.appendChild(this.svgElement)}};n.exports=l},{}],46:[function(d,g,f){(function(){var r=d("./device");
var p=1024;var a=768;var o=document.documentElement.clientWidth;function n(){if(typeof window.orientation==="undefined"){return window.screen.width
}return window.screen.width<window.screen.height?r("device-width","px"):r("device-height","px")
}function q(){if(typeof window.orientation==="undefined"){return window.screen.height
}return window.screen.height>window.screen.width?r("device-height","px"):r("device-width","px")
}function s(){var h=(window.orientation===0)?true:false;if(h){return n()}else{return q()
}}function b(){var h=o===p;var i=s()<a;return(h&&i)}function c(){return p/s()}g.exports={normalizedScreenWidth:n,normalizedScreenHeight:q,screenWidth:s,shouldScale:b,getScale:c}
})()},{"./device":42}],47:[function(s,t,q){var o=s("ac-element");var r=s("ac-feature");
var m=s("ac-dom-events");var u=s("../helpers/svg");var p;var v={menu:"gh-show-nav",closeImmediately:"gh-immediate",cart:"gh-show-cart",animateList:"gh-nav-reveal",menuIconTop:"gh-svg gh-svg-top",menuIconBottom:"gh-svg gh-svg-bottom",rectTop:"gh-svg-rect gh-svg-rect-top",rectBottom:"gh-svg-rect gh-svg-rect-bottom",enhance:"enhance"};
var w={navList:"gh-nav-list"};var n=function(a){this.mobileMenuElement=a;this.globalheader=o.select("#globalheader");
this.documentBody=o.select("body");this.navList=o.select(".gh-nav-list",this.globalheader);
this.icons={};this.icons.menu=o.select("#gh-menu-icon-toggle");this.icons.svgs=o.select("#gh-svg-icons");
this.icons.cart=o.select("#gh-menu-icon-cart");if(r.threeDTransformsAvailable()){o.addClassName(this.icons.menu,v.enhance);
new u(this.icons.svgs,"100%","0 0 96 96",v.menuIconTop).addRect(32,46,32,4,v.rectTop);
new u(this.icons.svgs,"100%","0 0 96 96",v.menuIconBottom).addRect(32,46,32,4,v.rectBottom)
}if(this.icons.menu){this.decorateAria()}if(this.icons.menu||this.icons.cart){this.attachEvents()
}};p=n.prototype;p.attachEvents=function(){if(this.icons.menu){m.addEventListener(this.icons.menu,"click",function(){o.removeClassName(this.documentBody,v.closeImmediately);
o.toggleClassName(this.documentBody,v.menu);this.toggleAriaExpanded();if(!o.hasClassName(this.globalheader,v.animateList)){o.addClassName(this.globalheader,v.animateList)
}m.stop()}.bind(this),false)}if(this.icons.cart){m.addEventListener(this.icons.cart,"click",function(){o.toggleClassName(this.documentBody,v.cart);
m.stop()}.bind(this),false)}m.addEventListener(document,"touchstart",function(b){if(this.isOpen()===false){return
}var a=o.ancestor(b.srcElement,"#globalheader");if(b.srcElement!==this.globalheader&&a!==this.globalheader){o.removeClassName(this.documentBody,v.menu);
o.addClassName(this.documentBody,v.closeImmediately)}}.bind(this),false)};p.decorateAria=function(){var a=o.getStyle(this.mobileMenuElement,"display")!=="none";
var b=o.getStyle(this.icons.menu,"display")!=="none";if(a&&b){this.icons.svgs.setAttribute("aria-controls","#"+w.navList);
this.icons.svgs.setAttribute("aria-expanded","false");this.navList.setAttribute("aria-hidden","true");
this.navList.id=w.navList}};p.toggleAriaExpanded=function(){var a=this.icons.svgs.getAttribute("aria-expanded");
if(a==="false"){this.icons.svgs.setAttribute("aria-expanded","true");this.navList.setAttribute("aria-hidden","false")
}else{this.icons.svgs.setAttribute("aria-expanded","false");this.navList.setAttribute("aria-hidden","true")
}};p.isOpen=function(){return o.hasClassName(this.documentBody,v.menu)};t.exports=n
},{"../helpers/svg":45,"ac-dom-events":27,"ac-element":"j0qjr8","ac-feature":30}],48:[function(d,g,f){g.exports=(function(){var b=document.getElementById("globalheader");
var i,k,a,c;if(b.innerHTML===""){a=document.createElement("div");for(i=0,k=b.attributes.length;
i<k;i+=1){if(b.attributes[i].value!==""&&b.attributes[i].value!=="null"&&b.attributes[i].value!=="false"){a.setAttribute(b.attributes[i].name,b.attributes[i].value)
}}a.className=b.className;c=b.nextSibling;c.parentNode.removeChild(c);a.appendChild(c);
b.parentNode.replaceChild(a,b);return a}return b}())},{}],49:[function(D,E,A){var y;
var u={};var x=D("ac-element");var C=D("ac-object");var r=D("ac-event-emitter").EventEmitter;
var t=D("ac-dom-events");var v=D("../helpers/searchGlobals");var s=D("./lang/geoMap");
var w=D("../helpers/keys");var B=(v.searchHost!==false)?window.location.protocol+"//"+window.location.hostname:window.location.protocol+"//www.apple.com";
t.stopPropagation=function(a){if(!a){a=window.event}if(a.stopPropagation){a.stopPropagation()
}else{a.cancelBubble=true}};var G={active:"active",enhance:"enhance"};var F={active:"active",inactive:"inactive",valueUpdate:"valueUpdate",reset:"reset",submit:"submit"};
var z=function(a){this.container=a;this.searchFormWrapper=document.getElementById("gh-search");
this.searchInput=document.getElementById("gh-search-input");this.reset=document.getElementById("gh-search-reset");
this.submit=document.getElementById("gh-search-submit");this.form=document.getElementById("gh-search-form");
this.formAction=this.form.getAttribute("action");this.searchInputName=this.searchInput.getAttribute("name");
this.active=false;this.hasValue=false;if(this._shouldEnhance()){this._enhance()
}this.setFormAction();this.setFullSearchURL()};z.prototype=new r();y=z.prototype;
y._addEventListeners=function(){var a=x.select("body");t.addEventListener(this.container,"click",this._boundOnContainerClick);
t.addEventListener(this.container,"mouseenter",this._boundOnMouseEnter);t.addEventListener(this.container,"mouseleave",this._boundOnMouseLeave);
t.addEventListener(this.container,"touchstart",this._boundOnMouseEnter);t.addEventListener(this.form,"submit",this._boundOnSubmit);
t.addEventListener(this.searchInput,"focus",this._boundOnFocus);t.addEventListener(this.searchInput,"click",this._boundOnSearchInputClick);
t.addEventListener(this.searchInput,"keyup",this._boundOnKeyUp);t.addEventListener(this.searchInput,"keydown",this._boundOnKeyDown);
t.addEventListener(this.submit,"blur",this._boundOnBlur);t.addEventListener(this.submit,"focus",this._boundOnFocus);
t.addEventListener(this.submit,"click",this._boundOnSubmitClick);t.addEventListener(this.reset,"blur",this._boundOnBlur);
t.addEventListener(this.reset,"focus",this._boundOnFocus);t.addEventListener(this.reset,"click",this._boundOnResetClick);
t.addEventListener(a,"click",this._boundOnBodyClick);t.addEventListener(a,"keyup",this._boundOnBodyKeyUp)
};y._bindEventHandlers=function(){this._boundOnContainerClick=this._onContainerClick.bind(this);
this._boundOnSearchInputClick=this._onSearchInputClick.bind(this);this._boundOnFocus=this._onFocus.bind(this);
this._boundOnBlur=this._onBlur.bind(this);this._boundOnSubmit=this._onSubmit.bind(this);
this._boundOnMouseEnter=this._onMouseEnter.bind(this);this._boundOnMouseLeave=this._onMouseLeave.bind(this);
this._boundOnSubmitClick=this._onSubmitClick.bind(this);this._boundOnResetClick=this._onResetClick.bind(this);
this._boundOnKeyUp=this._onKeyUp.bind(this);this._boundOnKeyDown=this._onKeyDown.bind(this);
this._boundOnBodyClick=this._onBodyClick.bind(this);this._boundOnBodyKeyUp=this._onBodyKeyUp.bind(this)
};y._addEventEmitterHandlers=function(){this.on(F.active,this._onActive);this.on(F.inactive,this._onInactive)
};y._onFocus=function(a){if(!this.active&&!this._isEnhancedDisabled()){this.trigger(F.active)
}};y._onBlur=function(a){window.setTimeout(function(){if(!this._formHasFocus()){this.trigger(F.inactive)
}}.bind(this),1)};y._onKeyUp=function(b){t.stop(b);var a,c={};for(a in b){c[a]=b[a]
}this._onValueUpdate(c);this.trigger(F.valueUpdate,c)};y._onKeyDown=function(a){if(a.keyCode===w.ARROW_UP||a.keyCode===w.ARROW_DOWN){if(a.preventDefault){a.preventDefault()
}}};y._onBodyKeyUp=function(a){if(this.active&&a.keyCode===w.TAB){this._onBlur()
}};y._onBodyClick=function(a){if(this.active){this.trigger(F.inactive)}};y._onContainerClick=function(a){t.stopPropagation(a);
if(!this.active&&!this._isEnhancedDisabled()){this.trigger(F.active)}};y._onSearchInputClick=function(a){};
y._onSubmit=function(a){t.stop(a);if(this.active){this.trigger(F.submit,a);this._onValueSubmit()
}};y._onSubmitClick=function(a){if(!this.active&&!this._isEnhancedDisabled()){a.preventDefault()
}};y._onResetClick=function(a){this._resetField();this.searchInput.focus()};y._onMouseEnter=function(a){if(!this.active&&!this._isEnhancedDisabled()){this._enableSubmit()
}};y._onMouseLeave=function(a){if(!this.active&&!this._isEnhancedDisabled()){this._disableSubmit()
}};y._inputHasValue=function(){return this.searchInput.value.length&&this.searchInput.value.length>0
};y._onActive=function(a){if(!this.active){this._enable()}};y._onInactive=function(a){if(this.active){this._disable()
}};y._onValueUpdate=function(b){this.setSearchTerm(this.searchInput.value);var a=b.keyCode;
if(a===w.ESCAPE&&this._inputHasValue){this._resetField(b)}else{if(a===w.TAB){this._onBlur()
}else{if(!this.hasValue&&this._inputHasValue()){this.hasValue=true;this._enableReset();
this._enableSubmit()}else{if(!this._inputHasValue()){this.hasValue=false;this._disableReset();
this._disableSubmit()}}}}};y._onValueSubmit=function(){this.reassignURL(this.getFullSearchURL()+this.getSearchTermEncoded())
};y.reassignURL=function(a){document.location.assign(a)};y._formHasFocus=function(){var a=this.form.contains(document.activeElement);
return a};y._enableSubmit=function(){this.submit.removeAttribute("disabled")};y._disableSubmit=function(){this.submit.setAttribute("disabled","disabled")
};y._enableReset=function(){this.reset.removeAttribute("disabled");x.addClassName(this.reset,"show")
};y._disableReset=function(){this.reset.setAttribute("disabled","disabled");x.removeClassName(this.reset,"show")
};y._resetField=function(){this.trigger(F.reset);this.searchInput.value="";this._disableReset();
this._disableSubmit();this.hasValue=false};y._enhance=function(){this._bindEventHandlers();
this._addEventEmitterHandlers();this._addEventListeners();x.addClassName(this.container,G.enhance);
this.enhanced=true};y._shouldEnhance=function(){var b=!!(("ontouchstart" in window)||(window.DocumentTouch&&document instanceof window.DocumentTouch));
var a=typeof document.createElement("div").onmouseenter!=="undefined";return !b&&!window.orientation&&a
};y._disable=function(){if(x.hasClassName(this.container,G.active)){x.removeClassName(this.container,G.active)
}this._resetField();this.active=false};y._enable=function(){if(!x.hasClassName(this.container,G.active)){x.addClassName(this.container,G.active)
}this.active=true;this.searchInput.focus();this._resetField()};y._isEnhancedDisabled=function(){return x.getStyle(this.searchFormWrapper,"display")==="none"
};y.setSearchTerm=function(a){this._searchTerm=this.trimWhitespace(a)};y.getSearchTerm=function(){return this._searchTerm
};y.getSearchTermEncoded=function(){return encodeURIComponent(this.getSearchTerm())
};y.inputHasValidText=function(){if(!this.searchInput.value.match(/^\s*$/)){return true
}return false};y.trimWhitespace=function(a){if(typeof a!=="string"){return}return a.replace(/^\s+/g,"").replace(/\s+$/g,"").replace(/\s+/g," ")
};y.setFormAction=function(){var a;if(s[v.searchCountry.toUpperCase()].directory){a=s[v.searchCountry.toUpperCase()].directory
}else{if(v.searchCountry!=="us"){a="/"+v.searchCountry.replace(/_/,"")}else{a=""
}}this.formAction=B+a+this.formAction;this.form.setAttribute("action",this.formAction)
};y.setFullSearchURL=function(){var a=C.toQueryParameters({section:v.searchSection,geo:v.searchCountry});
this._fullSearchURL=this.formAction+"?"+a+"&"+this.searchInputName+"="};y.getFullSearchURL=function(){return this._fullSearchURL
};E.exports=z},{"../helpers/keys":43,"../helpers/searchGlobals":44,"./lang/geoMap":56,"ac-dom-events":27,"ac-element":"j0qjr8","ac-event-emitter":28,"ac-object":34}],50:[function(w,x,s){var o=w("ac-ajax");
var y=w("ac-deferred");var q=w("ac-element");var t=w("ac-object");var u=y.Deferred;
var n=w("ac-event-emitter").EventEmitter;var p=w("../../helpers/keys");var v=function(a,b){if(!a){throw"Please provide a searchForm"
}this.searchForm=a;if(!b){throw"Please provide data sources"}b.forEach(function(c){if(!c.hasOwnProperty("url")&&!c.hasOwnProperty("requestName")){throw'Please provide "url" and "requestName"'
}});this._searchServices=b;this._decorateInput();this._addEventHandlers()};var r=v.prototype=new n();
r._decorateInput=function(){this.searchForm.searchInput.setAttribute("autocomplete","off");
this.searchForm.searchInput.setAttribute("autocorrect","off");this.searchForm.searchInput.setAttribute("autocapitalize","off");
this.searchForm.form.setAttribute("role","search")};r._addEventHandlers=function(){this.searchForm.propagateTo(this)
};r._handleKeyEvents=function(a){switch(a.type){case"keyup":this._handleKeyUp(a);
break;default:return}};r._handleReset=function(a){};r._handleKeyUp=function(b){var a=b.keyCode;
if(a!==p.ARROW_LEFT&&a!==p.ARROW_RIGHT&&a!==p.ARROW_UP&&a!==p.ARROW_DOWN&&a!==p.ESCAPE&&a!==p.CONTROL&&a!==p.ALT&&a!==p.CAPSLOCK&&a!==p.ENTER&&this.searchForm._inputHasValue()&&this.searchForm.inputHasValidText()){this._getData()
}else{return}};r._getData=function(){this.trigger("willSendRequests",this);this._willSendRequest(this.searchForm.getSearchTerm())
};r._willSendRequest=function(a){var b;this._ajaxRequests=[];this.responseData={};
this._searchServices.forEach(function(d){var g=d.url;var c=d.requestName;var h=d.queryParams||"";
var f=d.queryName||"query";var i=d.dataType||"json";h[f]=a;b=this._sendRequest(g,h,i,c);
this._ajaxRequests.push(b)}.bind(this));y.all(this._ajaxRequests).then(this._handleData.bind(this))
};r._sendRequest=function(c,d,g,a){var b=new u();var f=c+"?"+t.toQueryParameters(d);
o.get({url:f}).then(function(h){b.resolve({xhr:h,data:h.responseText,requestName:a,dataType:g})
},function(h){b.resolve(h)});return b.promise().then(this.requestSuccess.bind(this),this.requestFailure.bind(this))
};r.requestSuccess=function(d){var f=d.dataType;var a=d.requestName;var b;var c;
if(f==="json"){b=d.data=this.parseJSON(d.data)}else{if(f==="xml"){c=d.data=this.parseXML(d.data)
}}if(b){this.responseData[a]=b}else{if(c){this.responseData[a]=c}}return d};r.requestFailure=function(a){throw a.toString()
};r.parseJSON=function(a){return JSON.parse(a)};r.parseXML=function(c){function a(g){var f;
var d;if(window.ActiveXObject){f=new ActiveXObject("Microsoft.XMLDOM");f.async="false";
f.loadXML(g)}else{d=new DOMParser();f=d.parseFromString(g,"text/xml")}return f}var b=a(c);
return b};r._handleData=function(a){this.trigger("requestsComplete",this.responseData)
};x.exports=v},{"../../helpers/keys":43,"ac-ajax":1,"ac-deferred":26,"ac-element":"j0qjr8","ac-event-emitter":28,"ac-object":34}],51:[function(m,l,h){var i=m("ac-object");
var j=function(c,a,b){this.searchInput=c;this.enhancedAjaxSearch=a;this.enhancedSearchResults=b;
this.requestDelay=250;this._timeOutId=0;var d=this.searchInput._onValueSubmit;this.searchInput._originalOnValueSubmit=d;
this.searchInput._onValueSubmit=this._onSubmit.bind(this);this.searchInput.on("valueUpdate",function(){if(!this.searchInput.inputHasValidText()){this.enhancedSearchResults._handleReset()
}},this);this.searchInput.on("valueUpdate",this._passAlongRateLimitedEvents,this);
this.searchInput.on("valueUpdate",this.enhancedSearchResults._handleKeyEvents,this.enhancedSearchResults);
this.searchInput.on("reset",this.enhancedSearchResults._handleReset,this.enhancedSearchResults);
this.enhancedAjaxSearch.on("requestsComplete",this.enhancedSearchResults._renderData,this.enhancedSearchResults);
this.enhancedSearchResults.on("willRender",this.setSearchTerm,this);this.enhancedSearchResults.on("selectedItemChange",this._updateInput,this)
};var k=j.prototype;k.setSearchTerm=function(){this._searchTerm=this.searchInput.getSearchTerm()
};k.getSearchTerm=function(){return this._searchTerm};k._onSubmit=function(){if(this.enhancedSearchResults.resultsAreShowing()!==true){if(this.searchInput.inputHasValidText()){this.searchInput._originalOnValueSubmit()
}}else{if(this.enhancedSearchResults.getSelectedItem()!==false){this.enhancedSearchResults.reassignURL(this.enhancedSearchResults.getSelectedItem().url)
}else{if(this.searchInput.inputHasValidText()){this.searchInput._originalOnValueSubmit()
}}}};k._updateInput=function(a){if(a&&a.updateInput&&a.updateInput===true){this.searchInput.searchInput.value=a.copy;
this.searchInput.setSearchTerm(a.copy)}else{this.searchInput.searchInput.value=this.getSearchTerm();
this.searchInput.setSearchTerm(this.getSearchTerm())}};k._passAlongRateLimitedEvents=function(a){var c=i.clone(a);
window.clearTimeout(this._timeOutId);function b(){this.enhancedAjaxSearch._handleKeyEvents(c)
}this._timeOutId=window.setTimeout(b.bind(this),this.requestDelay)};l.exports=j
},{"ac-object":34}],52:[function(s,t,q){var o=s("ac-element");var n=s("ac-dom-events");
var l=s("ac-event-emitter").EventEmitter;var m=s("../../../helpers/keys");var r=s("./ResultsRenderer");
var u=function(a){this.options=a;this._results=null;this._resultsShowing=false;
this._selectedItem=false;this._shouldHideResultsOnMouseOut=false;this.resultsElem=document.createElement("div");
o.addClassName(this.resultsElem,"gh-search-results");this._addBoundEventHandlers()
};var p=u.prototype=new l();p.hasResults=function(){return this._results!==null
};p.resultsAreShowing=function(){return this._resultsShowing};p.setSelectedItem=function(a){this.trigger("selectedItemChange",a);
this._selectedItem=a};p.getSelectedItem=function(){return this._selectedItem};p.select=function(a){o.addClassName(a,"focus")
};p.deselect=function(a){o.removeClassName(a,"focus")};p.getAnchorTag=function(b){var a=n.target(b);
while((a.tagName.toLowerCase()!=="a")&&a.parentNode){a=a.parentNode}return a};p.reassignURL=function(a){document.location.assign(a)
};p._addBoundEventHandlers=function(){this._boundHideResultsOnMouseOut=function(a){this._hideResultsOnMouseOut(a)
}.bind(this);this._boundResultsContainerClick=function(){this._handleResultsContainerClick()
}.bind(this);this._boundHandleResultItemMouseDown=function(a){this._handleResultItemMouseDown(a)
}.bind(this);this._boundHandleResultItemClick=function(a){this._handleResultItemClick(a)
}.bind(this)};p._renderData=function(a){this.trigger("willRender");this._handleReset();
this._results=new r(a,this.options.additonalRenderData);this.resultsElem.appendChild(this._results.dom);
this.options.resultsWrapper.appendChild(this.resultsElem);n.addEventListener(this.options.resultsWrapper,"mousedown",this._boundResultsContainerClick);
var b=o.selectAll("a",this.resultsElem);if(b){b.forEach(function(c){n.addEventListener(c,"mousedown",this._boundHandleResultItemMouseDown);
n.addEventListener(c,"click",this._boundHandleResultItemClick)}.bind(this))}this.trigger("didRender");
this._showResults()};p._handleKeyEvents=function(a){switch(a.type){case"keyup":this._handleKeyUp(a);
break;default:return}};p._handleKeyUp=function(b){var a=b.keyCode;if(a===m.ESCAPE){this._handleReset()
}if(this._results){this._manageResultSelection(a);if(this.selectedItem){if(a===m.ENTER){this.reassignURL(this.selectedItem.url)
}}}};p._handleReset=function(){this.resultsElem.innerHTML="";o.removeClassName(this.resultsElem,"show");
o.removeEventListener(document,"mousemove",this._boundHideResultsOnMouseOut);n.removeEventListener(this.options.resultsWrapper,"mousedown",this._boundResultsContainerClick);
this._results=null;this._resultsShowing=false;this._selectedItem=false;this._shouldHideResultsOnMouseOut=false
};p._handleMouseMove=function(a){a=a||window.event;this.mouseEventTarget=(a.target)?a.target:a.srcElement;
if(this._shouldHideResultsOnMouseOut===true){if(!this._mouseIsOverResultsContainer()){this._handleReset()
}}};p._handleResultItemMouseDown=function(g){if(g.preventDefault){g.preventDefault()
}g.returnValue=false;var d,a,b,c,f;f=this.getAnchorTag(g).href;for(d=0,a=this._results.indexedElements.length;
d<a;d+=1){b=this._results.indexedElements[d];if(f===b.url){c=b}}this.trigger("resultLinkBeforeClick",{interactionEvt:g,resultObject:c})
};p._handleResultItemClick=function(b){if(b.preventDefault){b.preventDefault()}b.returnValue=false;
var a=this.getAnchorTag(b);this.trigger("resultLinkClick",{interactionEvt:b,element:a});
this.reassignURL(a.href)};p._handleResultsContainerClick=function(){this._shouldHideResultsOnMouseOut=true
};p._mouseIsOverResultsContainer=function(){if(!this.mouseEventTarget){return false
}while((this.mouseEventTarget!==this.resultsElem)&&this.mouseEventTarget.parentNode){this.mouseEventTarget=this.mouseEventTarget.parentNode
}return(this.mouseEventTarget===this.resultsElem)};p._hideResultsOnMouseOut=function(a){this._handleMouseMove(a)
};p._showResults=function(){this._resultsShowing=true;o.addClassName(this.resultsElem,"show");
n.addEventListener(document,"mousemove",this._boundHideResultsOnMouseOut)};p._manageResultSelection=function(c){var b=this._results.indexedElements;
var d;var a;if(c===m.ARROW_UP){if(b){if(this.getSelectedItem()){d=this.getSelectedItem();
if(d&&d.index>0){this.deselect(d.element);this.setSelectedItem(this._results.indexedElements[d.index-1]);
a=this.getSelectedItem();this.select(a.element)}else{this.deselect(d.element);this.setSelectedItem(false)
}}}}else{if(c===m.ARROW_DOWN){if(b){d=this.getSelectedItem();if(d&&this._results.indexedElements[d.index+1]){this.deselect(d.element);
this.setSelectedItem(this._results.indexedElements[d.index+1]);a=this.getSelectedItem();
this.select(a.element)}else{if(!d&&this._results.indexedElements[0]){this.setSelectedItem(this._results.indexedElements[0]);
a=this.getSelectedItem();this.select(a.element)}}}}}};t.exports=u},{"../../../helpers/keys":43,"./ResultsRenderer":53,"ac-dom-events":27,"ac-element":"j0qjr8","ac-event-emitter":28}],53:[function(t,u,q){var o=t("ac-element");
var s=t("ac-object");var m=t("ac-event-emitter").EventEmitter;var n=t("../../../helpers/searchGlobals");
var l=t("../../lang/geoMap");var r=function(i,af){var aa=af;var ah=document.createDocumentFragment();
var j=[];var f=(n.searchHost!==false)?window.location.protocol+"//"+window.location.hostname:window.location.protocol+"//www.apple.com";
function a(C){var E;var A=[];var w;var z;var B;var v;var y;var D;function x(H){var F;
try{F=(H.getElementsByTagName("shortcuts").length)?true:false}catch(G){F=false}return F
}if(x(C)===true){y=C.getElementsByTagName("error");if(y.length===0){E=C.getElementsByTagName("match");
w=(E.length>6)?6:E.length;for(D=0;D<w;D+=1){v=E[D];z={category:"recommendedresults",url:v.getAttribute("url"),copy:v.getAttribute("copy"),heading:v.getAttribute("title"),image:v.getAttribute("image")};
z.url=decodeURIComponent(z.url).replace(/http(s)?:\/\/www.apple.com/g,f);A.push(z)
}}else{return false}}else{for(B in C){if(C.hasOwnProperty(B)){if(C.hasOwnProperty("0")){v=C[B];
z={category:"commonsearches",copy:v,url:(aa.searchForm.formAction+"?"+s.toQueryParameters({section:n.searchSection,geo:n.searchCountry})+"&"+aa.searchForm.searchInputName+"="+encodeURIComponent(v)).replace(/http(s)?:\/\/www.apple.com/g,f)};
A.push(z)}}}}return A}var Y=a(i.recommendedResults);var ab=a(i.suggestedSearches);
var ai=(ab.length>0)?true:false;var P=(Y.length>0)?true:false;if(ai&&P){j=ab.concat(Y)
}else{if(ai&&!P){j=ab}else{if(!ai&&P){j=Y}else{j=[{category:"noresults",copy:(l[n.searchCountry.toUpperCase()].noResults)?l[n.searchCountry.toUpperCase()].noResults:l.US.noResults,url:aa.searchForm.formAction+"?"+s.toQueryParameters({section:n.searchSection,geo:n.searchCountry})+"&"+aa.searchForm.searchInputName+"="+aa.searchForm.getSearchTermEncoded()}]
}}}if(j.length>0){var g=document.createDocumentFragment();var ac;var Q;var ad=(l[n.searchCountry.toUpperCase()].commonSearches)?l[n.searchCountry.toUpperCase()].commonSearches:l.US.commonSearches;
var k=document.createDocumentFragment();var ae;var b;var c=(l[n.searchCountry.toUpperCase()].recommendedResults)?l[n.searchCountry.toUpperCase()].recommendedResults:l.US.recommendedResults;
var ag=document.createDocumentFragment();var d;var U;var S;var h;var R;var T;var X;
var W;var Z;for(Z=0,W=j.length;Z<W;Z+=1){U=j[Z];U.index=Z;S=document.createElement("li");
h=document.createElement("a");if(U.url){h.href=U.url.replace(/^(.*):\/\//g,window.location.protocol+"//")
}if(U.image){R=new Image();R.src=U.image.replace(/^(.*):\/\//g,window.location.protocol+"//");
R.alt=U.title||"";h.appendChild(R)}if(U.heading){U.truncatedHeading=unescape(U.heading);
if(U.truncatedHeading.length>39){U.truncatedHeading=U.truncatedHeading.substring(0,U.truncatedHeading.lastIndexOf(" ",(39-12)))+"&hellip;"
}T=document.createElement("h5");T.innerHTML=U.truncatedHeading;h.appendChild(T)
}if(U.copy){U.truncatedCopy=unescape(U.copy);if(U.truncatedCopy.length>105){U.truncatedCopy=U.truncatedCopy.substring(0,U.truncatedCopy.lastIndexOf(" ",(105-11)))+"&hellip;"
}X=document.createElement("p");X.innerHTML=U.truncatedCopy;h.appendChild(X)}U.element=S;
S.appendChild(h);if(U.category==="commonsearches"){g.appendChild(S);U.updateInput=true
}else{if(U.category==="recommendedresults"){k.appendChild(S);U.updateInput=false
}else{if(U.category==="noresults"){ag.appendChild(S);U.updateInput=false}}}}if(ai&&P){ac=document.createElement("ul");
o.addClassName(ac,"gn-search-results-suggested-searches");ac.appendChild(g);ae=document.createElement("ul");
o.addClassName(ae,"gn-search-results-recommended-results");ae.appendChild(k);Q=document.createElement("h4");
Q.innerHTML=ad;b=document.createElement("h4");b.innerHTML=c;ah.appendChild(Q);ah.appendChild(ac);
ah.appendChild(b);ah.appendChild(ae)}else{if(ai&&!P){ac=document.createElement("ul");
o.addClassName(ac,"gn-search-results-suggested-searches");ac.appendChild(g);Q=document.createElement("h4");
Q.innerHTML=ad;ah.appendChild(Q);ah.appendChild(ac)}else{if(!ai&&P){ae=document.createElement("ul");
o.addClassName(ae,"gn-search-results-recommended-results");ae.appendChild(k);b=document.createElement("h4");
b.innerHTML=c;ah.appendChild(b);ah.appendChild(ae)}else{d=document.createElement("ul");
o.addClassName(d,"gn-search-results-no-results");d.appendChild(ag);ah.appendChild(d)
}}}}var V={dom:ah,indexedElements:j};return V};var p=r.prototype;u.exports=r},{"../../../helpers/searchGlobals":44,"../../lang/geoMap":56,"ac-element":"j0qjr8","ac-event-emitter":28,"ac-object":34}],"oDi/Uh":[function(d,g,f){g.exports=(function(){var y=d("ac-object");
var v=d("./SearchInput");var x=d("./enhanced-search/EnhancedAjaxSearch");var I=d("./enhanced-search/EnhancedSearchController");
var c=d("./enhanced-search/results/ResultsController");var H=d("./../helpers/searchGlobals");
var C=document.getElementById("gh-tab-search");if(C){var G=new v(C);var D=G.form.getAttribute("data-search-recommended-results");
var a=G.form.getAttribute("data-search-suggested-searches");var E=[];var b;var F;
var A;var z={section:H.searchSection,geo:H.searchCountry};if(D||a){var w=JSON.parse(a);
var B=JSON.parse(D);if(B){B.queryParams=B.queryParams?y.extend(y.clone(B.queryParams),z):z;
E.push(B)}if(w){E.push(w)}if(E.length===0){throw"Please provide the required arguments."
}b=new x(G,E);F=new c({resultsWrapper:b.searchForm.container,additonalRenderData:b});
A=new I(G,b,F);F.on("resultLinkBeforeClick",function(h){})}}}())},{"./../helpers/searchGlobals":44,"./SearchInput":49,"./enhanced-search/EnhancedAjaxSearch":50,"./enhanced-search/EnhancedSearchController":51,"./enhanced-search/results/ResultsController":52,"ac-object":34}],"gh-searchInit":[function(d,g,f){g.exports=d("oDi/Uh")
},{}],56:[function(i,h,f){var g={US:{code:"",noResults:"No suggestions found. Search all of apple.com.",viewAll:"View all search results",recommendedResults:"Recommended Results",commonSearches:"Common Searches",searchText:"Search"},AE:{code:"ae"},ASIA:{code:"asia"},AT:{code:"at",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",viewAll:"Alle Suchergebnisse",searchText:"Suchen"},AU:{code:"au"},BE_FR:{code:"bf",noResults:"Pas de résultat. Essayez une recherche apple.com",viewAll:"Afficher tous les résultats",recommendedResults:"Raccourcis",searchText:"Rechercher"},BE_NL:{code:"bl",noResults:"Niets gevonden. Zoek opnieuw binnen www.apple.com.",viewAll:"Toon alle zoekresultaten",recommendedResults:"Snelkoppelingen",searchText:"Zoek"},BR:{code:"br",noResults:"Não encontrado. Tente a busca em apple.com",viewAll:"Ver todos os resultados da busca",recommendedResults:"Links rapidos",searchText:"Buscar"},CA_EN:{code:"ca",directory:"/ca"},CA_FR:{code:"ca",directory:"/ca/fr",viewAll:"Afficher tous les résultats",recommendedResults:"Raccourcis",searchText:"Recherche"},CH_DE:{code:"ce",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",viewAll:"Alle Suchergebnisse",searchText:"Suchen"},CH_FR:{code:"cr",noResults:"Pas de résultat. Essayez une recherche apple.com",viewAll:"Afficher tous les résultats",recommendedResults:"Raccourcis",searchText:"Rechercher"},CN:{code:"cn",directory:"/cn",noResults:"找不到快速搜索结果，请尝试 apple.com 的完整搜索",recommendedResults:"快速链接",viewAll:"查看所有搜索结果",searchText:"搜索"},DE:{code:"de",viewAll:"Alle Suchergebnisse",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",searchText:"Suchen"},DK:{code:"dk",noResults:"Ingen genvej fundet. Prøv at søge på hele apple.com.",viewAll:"Vis alle søgeresultater",recommendedResults:"Hurtige henvisninger",searchText:"Søg"},ES:{code:"es",noResults:"Ningún atajo. Búsqueda completa en apple.com",viewAll:"Ver todos los resultados de búsqueda",recommendedResults:"Enlaces rápidos",searchText:"Buscar"},FI:{code:"fi",noResults:"Ei oikotietä. Etsi koko apple.com.",viewAll:"Katso hakutulokset",recommendedResults:"Pikalinkit",searchText:"Etsi"},FR:{code:"fr",noResults:"Pas de résultat. Essayez une recherche apple.com",viewAll:"Afficher tous les résultats",recommendedResults:"Raccourcis",searchText:"Rechercher"},HK:{code:"hk",noResults:"找不到快速搜尋結果，請試試 apple.com 的完整搜尋",viewAll:"檢視所有搜尋結果",recommendedResults:"快速連結",searchText:"搜尋"},HK_EN:{code:"hk",directory:"/hk/en"},ID:{code:"id"},IE:{code:"ie"},IN:{code:"in"},IT:{code:"it",noResults:"Nessuna scorciatoia trovata. Provate su apple.com",viewAll:"Mostra tutti i risultati",recommendedResults:"Collegamenti rapidi",searchText:"Cerca"},JP:{code:"jp",noResults:"ショートカットは見つかりませんでした。検索はこちら。",viewAll:"すべての検索結果を見る",recommendedResults:"クイックリンク",searchText:"Search"},KR:{code:"kr",noResults:"일치하는 검색결과가 없습니다. 다시 검색하기.",recommendedResults:"빠른 연결",viewAll:"검색 결과 전체 보기."},LA:{code:"la",noResults:"No se encontraron resultados. Intenta en apple.com.",viewAll:"Ver todos los resultados de la búsqueda",recommendedResults:"Enlaces rápidos",searchText:"Buscar"},LAE:{code:"lae",noResults:"No shortcut found. Search all of apple.com.",viewAll:"View all search results",searchText:"Search"},MX:{code:"mx",noResults:"No se encontraron resultados. Intenta en apple.com.",viewAll:"Ver todos los resultados de la búsqueda",recommendedResults:"Enlaces rápidos",searchText:"Buscar"},MY:{code:"my"},NL:{code:"nl",noResults:"Niets gevonden. Zoek opnieuw binnen www.apple.com.",viewAll:"Toon alle zoekresultaten",recommendedResults:"Snelkoppelingen",searchText:"Zoek"},NO:{code:"no",noResults:"Fant ingen snarvei. Søk på hele apple.com.",viewAll:"Vis alle søkeresultater",recommendedResults:"Hurtigkoblinger",searchText:"Søk"},NZ:{code:"nz"},PH:{code:"ph"},PL:{code:"pl",noResults:"Fraza nie została odnaleziona. Użyj apple.com.",viewAll:"Przeglądaj wszystkie wyniki",recommendedResults:"Podręczne łącza",searchText:"Szukaj"},PT:{code:"pt",noResults:"Nenhum resultado. Tente pesquisar em apple.com.",viewAll:"Ver todos os resultados de pesquisa",recommendedResults:"Ligações rápidas",searchText:"Procurar"},RU:{code:"ru",noResults:"Ссылок нет. Попробуйте расширенный поиск.",viewAll:"Показать все результаты поиска",recommendedResults:"Быстрые ссылки",searchText:"Поиск"},SA:{code:"sa"},SE:{code:"se",noResults:"Ingen genväg hittad. Sök i hela apple.com.",viewAll:"Visa alla sökresultat",recommendedResults:"Snabblänkar",searchText:"Sök"},SG:{code:"sg"},TH:{code:"th"},TR:{code:"tr",noResults:"Öneri bulunamadı. Tüm apple.com'da ara.",viewAll:"Tüm arama sonuçlarını göster",recommendedResults:"Önerilen Sonuçlar",searchText:"Arama"},TW:{code:"tw",noResults:"快速搜尋找不到，試試 apple.com 完整搜尋",viewAll:"瀏覽搜索結果",recommendedResults:"快速連結",searchText:"搜尋"},UK:{code:"uk"},VN:{code:"vn"},ZA:{code:"za"},PO:null,UA:null,RO:null,CZ:null,HU:null,BG:null,HR:null,GR:null,IS:null};
h.exports=g},{}]},{},[41]);
if(typeof(AC)==="undefined"){AC={}}document.createElement("nav");AC.addEvent=function(d,e,f){if(d.addEventListener){return d.addEventListener(e,f,false)
}else{return d.attachEvent("on"+e,f)}};AC.removeEvent=function(d,e,f){if(d.removeEventListener){return d.removeEventListener(e,f,false)
}else{return d.detachEvent("on"+e,f)}};AC.removeClassName=function(d,c){c=new RegExp(c,"g");
if(d){d.className=d.className.replace(c,"").replace(/ +/g," ").replace(/ +$/gm,"").replace(/^ +/gm,"")
}};AC.getPreviousSibling=function(b){while(b=b.previousSibling){if(b.nodeType===1){return b
}}};if(typeof(AC.Detector)==="undefined"){AC.Detector={_iOSVersion:null,iOSVersion:function(){if(this._iOSVersion===null){this._iOSVersion=(navigator.userAgent.match(/applewebkit/i)&&(navigator.platform.match(/iphone/i)||navigator.platform.match(/ipod/i)||navigator.platform.match(/ipad/i)))?parseFloat(navigator.userAgent.match(/os ([\d_]*)/i)[1].replace("_",".")):false
}return this._iOSVersion},_svgAsBackground:null,svgAsBackground:function(f){if(this._svgAsBackground===null){var d=function(){AC.Detector._svgAsBackground=true;
if(typeof(f)==="function"){f()}};var e=document.createElement("img");e.setAttribute("src","data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzUiIGhlaWdodD0iMjc1Ij48L3N2Zz4%3D");
if(e.complete){e.style.visibility="hidden";e.style.position="absolute";document.body.appendChild(e);
window.setTimeout(function(){AC.Detector._svgAsBackground=false;if(e.width>=100){document.body.removeChild(e);
d()}else{document.body.removeChild(e)}},1)}else{this._svgAsBackground=false;e.onload=d
}}else{if(this._svgAsBackground&&typeof(f)==="function"){f()}}return this._svgAsBackground
},_style:null,_prefixes:null,_preFixes:null,_css:null,isCSSAvailable:function(i){if(!this._style){this._style=document.createElement("browserdetect").style
}if(!this._prefixes){this._prefixes="-webkit- -moz- -o- -ms- -khtml- ".split(" ")
}if(!this._preFixes){this._preFixes="Webkit Moz O ms Khtml ".split(" ")}if(!this._css){this._css={}
}i=i.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/,"").toLowerCase();
switch(i){case"gradient":if(this._css.gradient!==undefined){return this._css.gradient
}var i="background-image:";var l="gradient(linear,left top,right bottom,from(#9f9),to(white));";
var m="linear-gradient(left top,#9f9, white);";this._style.cssText=(i+this._prefixes.join(l+i)+this._prefixes.join(m+i)).slice(0,-i.length);
this._css.gradient=(this._style.backgroundImage.indexOf("gradient")!==-1);return this._css.gradient;
case"inset-box-shadow":if(this._css["inset-box-shadow"]!==undefined){return this._css["inset-box-shadow"]
}var i="box-shadow:";var j="#fff 0 1px 1px inset;";this._style.cssText=this._prefixes.join(i+j);
this._css["inset-box-shadow"]=(this._style.cssText.indexOf("inset")!==-1);return this._css["inset-box-shadow"];
default:var n=i.split("-");var r=n.length;var o;var p;var q;if(n.length>0){i=n[0];
for(p=1;p<r;p+=1){i+=n[p].substr(0,1).toUpperCase()+n[p].substr(1)}}o=i.substr(0,1).toUpperCase()+i.substr(1);
if(this._css[i]!==undefined){return this._css[i]}for(q=this._preFixes.length-1;
q>=0;q--){if(this._style[this._preFixes[q]+i]!==undefined||this._style[this._preFixes[q]+o]!==undefined){this._css[i]=true;
return true}}return false}return false}}}AC.GlobalNav=function(){var d=this;var c;
this.globalHeader=document.getElementById("globalheader");this.globalSearch=document.getElementById("sp-searchtext");
this.globalStylesheet=document.getElementById("globalheader-stylesheet");if(this.globalHeader){this.globalHeader.className+=" globalheader-js";
AC.Detector.svgAsBackground(function(){d.globalHeader.className+=" svg"});if(navigator.userAgent.match(/applewebkit/i)){if(!navigator.geolocation){this.globalHeader.className+=" decelerate"
}else{if(navigator.platform.match(/ipad/i)||navigator.platform.match(/iphone/i)||navigator.platform.match(/ipod/i)){this.globalHeader.className+=" ios"
}}if(AC.Detector.iOSVersion()&&AC.Detector.iOSVersion()<=3.2){this.globalHeader.className+=" ios3"
}if(!AC.Detector.isCSSAvailable("inset-box-shadow")||(navigator.userAgent.match(/chrome/i)&&navigator.userAgent.match(/windows/i))){this.globalHeader.className+=" noinset"
}}this.enhanceSearch();this.decorateSearchInput();this.vml();this.decorateTabStates();
if(AC.GlobalNav.canEnhance()&&this.globalStylesheet){this.enhancedGlobalStylesheet=this.globalStylesheet.cloneNode(true);
this.enhancedGlobalStylesheet.id="globalheader-enhanced-stylesheet";this.enhancedGlobalStylesheet.href=this.globalStylesheet.href.replace("/navigation.css","/enhanced.css");
this.globalStylesheet.parentNode.appendChild(this.enhancedGlobalStylesheet)}this.loaded()
}};AC.GlobalNav._canEnhance=null;AC.GlobalNav.canEnhance=function(){if(AC.GlobalNav.canEnhance._canEnhance==null){var b=navigator.userAgent.replace(/^.*version\/([\d\.]*) .*$/i,"$1").split(".");
AC.GlobalNav.canEnhance._canEnhance=(AC.Detector.isCSSAvailable("transition-property")&&AC.Detector.isCSSAvailable("gradient")&&(AC.Detector.iOSVersion()===false||AC.Detector.iOSVersion()>=3.2)&&!(navigator.userAgent.match(/applewebkit/i)&&b.length===3&&(b[0]<=4&&b[1]<=0&&b[2]<=2)))
}return AC.GlobalNav.canEnhance._canEnhance};AC.GlobalNav.prototype.enhanceSearch=function(){this.globalSearchForm=document.getElementById("g-search");
if(this.globalSearchForm&&this.globalSearch){if(typeof(searchCountry)==="undefined"){searchCountry="us"
}if(SearchShortcut.geoMap[searchCountry.toUpperCase()].directory){var h=SearchShortcut.geoMap[searchCountry.toUpperCase()].directory
}else{if(searchCountry!=="us"){var h="/"+searchCountry.replace(/_/,"")}else{h=""
}}var e={global:"http://www.apple.com"+h+"/search/",ipad:"http://www.apple.com"+h+"/search/",iphone:"http://www.apple.com"+h+"/search/",ipoditunes:"http://www.apple.com"+h+"/search/",mac:"http://www.apple.com"+h+"/search/",store:"http://www.apple.com"+h+"/search/",support:"http://www.info.apple.com/searchredir.html"};
if(typeof(window.searchHost)!=="undefined"&&window.searchHost===true){var g=window.location.protocol+"//"+window.location.hostname;
if(searchSection!=="support"){var f=e[searchSection].replace("http://www.apple.com",g)
}}else{var f=e[searchSection]||"http://www.apple.com/search/"}this.globalSearchForm.setAttribute("action",f);
this.globalSearchForm.setAttribute("method","get");this.searchWrapper=document.getElementById("globalsearch");
this.resultsPanel=document.getElementById("sp-results");this.searchPosition="globalNav";
this.enhancedSearch=enhancedSearch=new SearchShortcut("globalnav",this.globalSearchForm,this.globalSearch,"sp-results",this.searchPosition);
SearchShortcut.globalNavCallback=function(a){enhancedSearch.loadJson(a)};SearchShortcut.loadXmlToDoc=function(a){enhancedSearch.loadXmlToDoc(a)
}}};AC.GlobalNav.prototype.decorateSearchInput=function(){if(this.globalSearch){var k=document.getElementById("g-search");
var j=document.createDocumentFragment();var h;var l;var m;var n=this;var i=true;
this.globalSearch.setAttribute("autocomplete","off");this.globalSearch.setAttribute("autocorrect","off");
this.globalSearch.setAttribute("autocapitalize","off");this.globalSearch.setAttribute("role","combobox");
this.globalSearch.setAttribute("aria-owns",this.resultsPanel.id);this.globalSearch.setAttribute("aria-haspopup","true");
this.globalSearch.setAttribute("aria-autocomplete","both");h=document.createElement("input");
this.globalSearch.parentNode.replaceChild(h,this.globalSearch);l=document.createElement("div");
l.className="reset";resetEnd=function(a){if(a.target===l&&window.getComputedStyle(l,null)["opacity"]==="0"){l.style.display="none"
}};if(window.addEventListener){l.addEventListener("transitionend",resetEnd,true);
l.addEventListener("transitionEnd",resetEnd,true);l.addEventListener("oTransitionEnd",resetEnd,false);
l.addEventListener("mozTransitionEnd",resetEnd,false);l.addEventListener("webkitTransitionEnd",resetEnd,false)
}if(this.globalSearch.value.length===0){k.className+=" empty"}j.appendChild(this.globalSearch);
j.appendChild(l);m=function(a){i=false;n.globalSearch.value="";if(n.enhancedSearch){n.enhancedSearch.hideResults()
}window.setTimeout(function(){k.className+=" empty";i=true;n.globalSearch.focus()
},10)};AC.addEvent(l,"mousedown",m);AC.addEvent(this.globalSearch,"focus",function(a){if(i){l.style.display="";
window.setTimeout(function(){n.globalHeader.className+=" searchmode"},10)}});AC.addEvent(this.globalSearch,"blur",function(a){if(i){l.style.display="";
window.setTimeout(function(){AC.removeClassName(n.globalHeader,"searchmode")},10)
}else{i=true}});AC.addEvent(this.globalSearch,"keydown",function(b){var a=b.keyCode;
i=true;if(n.globalSearch.value.length>=0){l.style.display="";window.setTimeout(function(){AC.removeClassName(k,"empty")
},10)}else{if(!k.className.match("empty")){k.className+=" empty"}}if(b.keyCode===27){m(b)
}});if(h){h.parentNode.replaceChild(j,h)}}};AC.GlobalNav.prototype.vml=function(){var h;
var g;var j;var f;var i;if(!AC.Detector.isCSSAvailable("border-radius")&&document.namespaces&&this.globalHeader){document.namespaces.add("v","urn:schemas-microsoft-com:vml");
h=document.createDocumentFragment();g=document.createElement("v:roundrect");g.setAttribute("id","globalheader-roundrect");
g.setAttribute("stroked",true);g.setAttribute("strokeColor","#737373");g.setAttribute("arcSize",".1");
h.appendChild(g);j=this.globalHeader.currentStyle.backgroundImage;this.globalHeader.style.backgroundImage="none";
j=j.replace(/url\(["']*([^"']*)["']*\)/,"$1");f=document.createElement("v:fill");
f.setAttribute("id","globalheader-fill");f.setAttribute("type","tile");f.setAttribute("src",j);
g.appendChild(f);i=document.createElement("v:roundrect");i.setAttribute("id","globalheader-shadow");
i.setAttribute("stroked",false);i.setAttribute("fillColor","#999");i.setAttribute("arcSize",".1");
h.appendChild(i);this.globalHeader.appendChild(h)}};AC.GlobalNav.prototype.getPreviousNavItem=function(b){while(b.tagName.toLowerCase()!=="li"){b=b.parentNode
}b=AC.getPreviousSibling(b);if(!b){return false}if(b.tagName.toLowerCase()!=="li"){return false
}b=b.getElementsByTagName("a");if(!b[0]){return false}return b[0]};AC.GlobalNav.prototype.decorateTabStates=function(){this.globalNavItems=this.globalHeader.getElementsByTagName("a");
var e=this;var f=this.globalHeader.className.replace(/ .*/,"");var d;for(d=this.globalNavItems.length-1;
d>=0;d--){if(this.globalNavItems[d].href.match(f)){this.currentTab=this.globalNavItems[d]
}AC.addEvent(this.globalNavItems[d],"mousedown",function(b){var a=(b.target)?b.target:b.srcElement;
a=e.getPreviousNavItem(a);if(a&&a!==e.currentTab){a.className+=" before"}});AC.addEvent(this.globalNavItems[d],"mouseout",function(b){var a=(b.target)?b.target:b.srcElement;
a=e.getPreviousNavItem(a);if(a&&a!==e.currentTab){AC.removeClassName(a,"before")
}})}if(this.currentTab){this.currentTab=this.getPreviousNavItem(this.currentTab);
this.currentTab.className+=" before"}};AC.GlobalNav.prototype.loaded=function(c){var d=this;
if(this.loadedTimeout){window.clearTimeout(this.loadedTimeout)}if(!this.cancelLoadedTimeout){this.cancelLoadedTimeout=window.setTimeout(function(){d.loaded(true)
},500)}if(!this.testEnhancedLoaded){this.testEnhancedLoaded=document.createElement("div");
this.testEnhancedLoaded.id="globalheader-loaded-test";document.body.appendChild(this.testEnhancedLoaded)
}if(c||this.testEnhancedLoaded.offsetWidth===0){this.globalHeader.className+=" globalheader-loaded"
}else{this.loadedTimeout=window.setTimeout(function(){d.loaded()},10)}};var SearchShortcut=function(h,k,m,i,j){this.searchWrapper=typeof(h)==="string"?document.getElementById(h):h;
this.searchForm=typeof(k)==="string"?document.getElementById(k):k;this.searchInput=typeof(m)==="string"?document.getElementById(m):m;
this.resultsPanel=typeof(i)==="string"?document.getElementById(i):i;this.searchPosition=j;
this.globalHeader=document.getElementById("globalheader");this.aiSuggestionToggle=true;
this.aiTimeoutLimit=3000;this.aiTimeoutFlag=true;this.addSection();var l=(/applewebkit/i.test(navigator.userAgent)&&!/ipad/i.test(navigator.userAgent)&&/mobile/i.test(navigator.userAgent))||/webos/i.test(navigator.userAgent)||/android/i.test(navigator.userAgent)||/blackberry/i.test(navigator.userAgent)||/windows ce/i.test(navigator.userAgent)||/opera mini/i.test(navigator.userAgent);
if(l){aiRequestsEnabled=false;deactivateSearchShortcuts=true}if(this.shouldVML()){this.resultsPanel.className+=" sp-results-vml"
}this.addSpinner();this.minimumCharactersForSearch=0;this.entryDelay=0;this.currentRequest=false;
this.quickLinks=SearchShortcut.geoMap.US.shortcuts;this.suggestedSearchLinks=SearchShortcut.geoMap.US.suggestionsText;
this.noResults=SearchShortcut.geoMap.US.noResults;if(typeof(searchCountry)!=="undefined"&&searchCountry){this.quickLinks=SearchShortcut.geoMap[searchCountry.toUpperCase()].shortcuts||this.quickLinks;
this.noResults=SearchShortcut.geoMap[searchCountry.toUpperCase()].noResults||this.noResults
}var n=this;AC.addEvent(this.searchForm,"submit",function(b){try{b.preventDefault();
b.stopPropagation()}catch(a){}return false});AC.addEvent(this.searchInput,"keydown",function(a){n.handleKeyEvent(a)
});AC.addEvent(this.searchInput,"keyup",function(a){n.handleKeyEvent(a)});AC.addEvent(this.searchInput,"blur",function(a){n.onBlur(a)
});AC.addEvent(this.searchInput,"focus",function(a){n.searchText=n.searchInput.value
})};SearchShortcut.prototype.shouldVML=function(){return(!AC.Detector.isCSSAvailable("border-radius")&&document.namespaces)
};SearchShortcut.prototype.addSpinner=function(){this.spinner=document.createElement("div");
this.spinner.className="spinner hide";this.searchInput.parentNode.appendChild(this.spinner)
};SearchShortcut.prototype.hideSpinner=function(){this.spinner.className+=" hide"
};SearchShortcut.prototype.showSpinner=function(){AC.removeClassName(this.spinner,"hide")
};SearchShortcut.prototype.addSection=function(){var b=document.getElementById("search-section");
if(!b){b=document.createElement("input");b.id="search-section";b.type="hidden";
b.name="sec";b.value=window.searchSection;this.searchForm.appendChild(b)}else{if(b){b.value=window.searchSection
}}};SearchShortcut.prototype.handleKeyEvent=function(p){var m=this;var n=(typeof(window.event)!=="undefined")?event.keyCode:p.keyCode;
var l=p.type||event.type;var u={13:"enter",9:"tab",27:"escape",38:"arrowUp",40:"arrowDown",39:"arrowRight",37:"arrowLeft",17:"arrowRight",91:"arrowLeft",35:"end",36:"home"};
var v=function(){try{p.preventDefault();p.stopPropagation()}catch(a){}};var t={enter:{keydown:function(){var a=(typeof(FeedStatistics)!=="undefined")?new FeedStatistics():false;
if(!p.altKey){if(m.selected){if(a){a.updateStorageItem("search type","common searches")
}m.go(m.selected.data.url)}else{if(typeof(FeedStatistics)!=="undefined"){if(a){a.updateStorageItem("search type","user")
}m.hideResults();m.fullSearch()}else{m.hideResults();m.fullSearch()}}}}},tab:{keydown:function(){m.hideResults()
}},escape:{keydown:function(){m.results={}}},arrowUp:{keydown:function(){if(m.results){v()
}},keyup:function(){if(m.results){v();if(m.selected){if(m.selected&&m.selected.index>0){m.selected.deselect();
m.selected=m.results[m.selected.index-1].select()}else{m.searchInput.value=m.searchText;
m.selected.deselect();m.selected=false}if(m.resultsShowing===true){m.updateSearchFieldWithSuggestions()
}}}}},arrowDown:{keyup:function(){if(m.results){v();if(m.selected&&m.results[m.selected.index+1]){m.selected.deselect();
m.selected=m.results[m.selected.index+1].select()}else{if(!m.selected&&m.results[0]){m.selected=m.results[0].select()
}}if(m.resultsShowing===true){m.updateSearchFieldWithSuggestions()}}}},arrowLeft:{keyup:function(){if(m.results){v()
}}},arrowRight:{keyup:function(){if(m.results){v()}}},everyKey:{keydown:function(){if(m.searchInput.value===""){m.results={}
}},keyup:function(){var a=m.searchInput.value;if(m.searchInput.value===""){m.searchText=""
}else{if(a.length>m.minimumCharactersForSearch&&!m.selected){m.searchText=a;m.startKeystrokeTimer()
}}}},unmappedKey:{keyup:function(){m.selected=false;var a=m.searchInput.value;a=a.replace(/^\s+/g,"").replace(/\s+$/g,"");
a=a.replace(/\s\s+/g," ");if(a.length>m.minimumCharactersForSearch){m.searchText=a;
m.startKeystrokeTimer()}else{m.hideSpinner();m.hideResults()}}}};var o=t[u[n]]||t.unmappedKey;
var w=(typeof(o)!=="undefined")?o[l]:null;var r=t.everyKey;var q=(typeof(r)!=="undefined")?r[l]:null;
if(w){w()}if(q){q()}};SearchShortcut.prototype.updateSearchFieldWithSuggestions=function(){if((typeof this.selected.data)!=="undefined"){if(this.selected.data.category==="Suggestions"){this.searchInput.value=this.selected.data.desc
}else{if(this.selected.data.category==="Quick Link"){this.searchInput.value=this.searchText
}else{if(this.selected.data.category==="No Results"){return}}}}};SearchShortcut.prototype.onMouseMove=function(b){b=b||window.event;
this.mouseEventTarget=(b.target)?b.target:b.srcElement;if(this.shouldHideOnMouseOut){if(!this.isOverResults()){this.hideResults(b)
}}};SearchShortcut.prototype.isOverResults=function(b){if(!this.mouseEventTarget){return false
}while((this.mouseEventTarget.id!=="sp-results")&&this.mouseEventTarget.parentNode){this.mouseEventTarget=this.mouseEventTarget.parentNode
}return(this.mouseEventTarget.id==="sp-results")};SearchShortcut.prototype.onBlur=function(b){if(this.isOverResults()){this.shouldHideOnMouseOut=true
}else{if(!this.selected&&!this.isOverResults()){this.hideResults(b)}else{if(this.selected&&!this.isOverResults()){this.hideResults(b);
this.searchInput.value=this.searchText}}}};SearchShortcut.prototype.startKeystrokeTimer=function(){if(this.timeoutId){window.clearTimeout(this.timeoutId)
}var b=this;this.timeoutId=window.setTimeout(function(){b.commitKeystroke()},this.entryDelay)
};SearchShortcut.prototype.commitKeystroke=function(){if(typeof(deactivateSearchShortcuts)!=="undefined"&&deactivateSearchShortcuts){return
}this.search(this.searchText)};SearchShortcut.prototype.fullSearchUrl=function(){var b=this.searchForm.getAttribute("action");
return b};SearchShortcut.prototype.getQueryParameters=function(l){var g=this.searchForm.elements,h,k,j=this.searchForm.getAttribute("action");
this._formValues=[];for(h=g.length-1;h>=0;h--){var k=g[h];if(k.name!=="q"&&j.indexOf(k.name)===-1){this._formValues.push(k.name+"="+k.value);
this._formValues[k.name]=k.name}}var i="?q="+encodeURIComponent(l);if(this.searchPosition==="globalNav"){if(typeof(searchSection)!=="undefined"&&searchSection){i+="&section="+searchSection
}if(typeof(searchCountry)!=="undefined"&&searchCountry){i+="&geo="+searchCountry.toLowerCase()
}}return i};SearchShortcut.prototype.search=function(l){this.showSpinner();var n=this;
if(this.searchPosition==="globalNav"){var j=new SearchShortcut.quickLinks();var m=this.getQueryParameters(l);
var i=j.generateScript(m);this.sendRequest(i)}if(searchCountry&&searchCountry==="us"){if(typeof(aiRequestsEnabled)!=="undefined"&&aiRequestsEnabled!==false){var k=new SearchShortcut.appleInstant(this.searchPosition);
var h=k.generateScript(l);this.sendRequest(h);if(this.aiTimeoutId){window.clearTimeout(this.aiTimeoutId)
}this.aiTimeoutFlag=true;this.aiTimeoutId=window.setTimeout(function(){n.hideSpinner();
n.aiTimeoutFlag=false},this.aiTimeoutLimit)}else{this.hideSpinner()}}};SearchShortcut.prototype.sendRequest=function(d){var c=document.getElementsByTagName("head")[0];
c.appendChild(d)};SearchShortcut.prototype.loadData=function(){this.results=new Array();
var h;var e;var f;var g;if(!this.searchSuggestions&&this.searchShortcuts){g=this.searchShortcuts.length;
for(h=0;h<g;h+=1){this.results.push(this.searchShortcuts[h])}}else{if(this.searchSuggestions&&!this.searchShortcuts){f=this.searchSuggestions.length;
for(h=0;h<f;h+=1){this.results.push(this.searchSuggestions[h])}}else{if(this.searchSuggestions&&this.searchShortcuts){f=this.searchSuggestions.length;
g=this.searchShortcuts.length;for(h=0;h<f;h+=1){this.results.push(this.searchSuggestions[h])
}for(e=0;e<g;e+=1){this.results.push(this.searchShortcuts[e])}}}}};SearchShortcut.prototype.loadJson=function(c){this.hideSpinner();
if((typeof(this.aiTimeoutFlag)!=="undefined")&&this.aiTimeoutFlag===false){return
}if(typeof(aiDisplaySuggestions)==="undefined"||aiDisplaySuggestions===false){return
}if(c.hasOwnProperty("0")){this.parseJsonResults(c);if(typeof(JSON.stringify)==="function"){this.lastSuggestions=JSON.stringify(c)
}this.loadData();if(this.results){this.renderResults()}}else{delete this.searchSuggestions;
this.lastSuggestions={};this.loadData();if(this.results){this.renderResults()}}if(typeof(FeedStatistics)!=="undefined"){var d=new FeedStatistics();
d.updateLastSuggestions(this.lastSuggestions)}};SearchShortcut.prototype.parseJsonResults=function(k){var g="";
var i=-1;var l;if(g.length>0){this.hideResults();return}else{if(k){this.searchSuggestions=new Array();
for(l in k){if(k.hasOwnProperty(l)){var j=parseInt(l,10);var h={url:this.fullSearchUrl()+this.getQueryParameters(k[j]),desc:k[j],category:"Suggestions"};
this.searchSuggestions[j]=h}}}}};SearchShortcut.prototype.loadXmlToDoc=function(h){var e;
if(window.ActiveXObject){e=new ActiveXObject("Microsoft.XMLDOM");e.async="false";
e.loadXML(h)}else{var g=new DOMParser();e=g.parseFromString(h,"text/xml")}this.hideSpinner();
var f=e.getElementsByTagName("term");if(f.length>0&&f[0].childNodes.length>0){this.term=f[0].firstChild.nodeValue;
this.xml=e.getElementsByTagName("search_results")[0];this.parseResults(this.xml)
}else{return}if(this.searchShortcuts){this.loadData()}if(this.results){this.renderResults()
}};SearchShortcut.prototype.parseResults=function(l){var m=l.getElementsByTagName("error");
var j;var n;var i;var h;var k;if(m.length>0){this.hideResults();return}else{j=l.getElementsByTagName("match");
n=0;this.searchShortcuts=new Array();if(j.length>6){n=6}else{n=j.length}for(k=0;
k<n;k+=1){i=j[k];h={title:i.getAttribute("title"),url:i.getAttribute("url"),desc:i.getAttribute("copy"),priority:i.getAttribute("priority"),image:i.getAttribute("image"),category:"Quick Link"};
h.url=decodeURIComponent(h.url);this.searchShortcuts.push(h)}}};SearchShortcut.prototype.renderResults=function(){var i=this;
if(!this.hideResultsOnMouseOut){this.hideResultsOnMouseOut=function(a){if(!i.resultsShowing){return
}i.onMouseMove(a)};AC.addEvent(document,"mousemove",this.hideResultsOnMouseOut)
}this.resultsShowing=true;this.resultsPanel.innerHTML="";var n=document.createDocumentFragment(),o=document.createElement("div"),x=document.createElement("div"),t=document.createElement("h3"),q=document.createElement("ul"),w=this.results.length;
q.setAttribute("role","listbox");o.className="sp-shadow";n.appendChild(o);if(this.shouldVML()){document.namespaces.add("v","urn:schemas-microsoft-com:vml");
roundrect=document.createElement("v:roundrect");roundrect.id="sp-roundrect";roundrect.strokeColor="#fff";
roundrect.fillColor="#fff";roundrect.arcSize=".01";roundrect.appendChild(x);n.appendChild(roundrect)
}else{n.appendChild(x)}if(w===0){this.results[0]={title:this.noResults,url:this.fullSearchUrl()+this.getQueryParameters(this.searchText),category:"No Results"};
q.className="noresults"}var w=this.results.length;var v=true;var p=true;var u;for(u=0;
u<w;u+=1){if(v){if(this.results[u].category==="Suggestions"){var r=document.createElement("h3");
r.className="suggestions";r.innerHTML=this.suggestedSearchLinks;q.appendChild(r);
v=false}}if(p){if(this.results[u].category==="Quick Link"){var y=document.createElement("h3");
y.className="quicklinks";y.innerHTML=this.quickLinks;q.appendChild(y);p=false}}this.results[u]=new SearchShortcut.result(u,this.results[u],i);
this.results[u].element.setAttribute("role","option");this.results[u].element.setAttribute("aria-setsize",w);
this.results[u].element.setAttribute("aria-posinset",u+1);q.appendChild(this.results[u].element)
}if(v===false&&p===false){q.className="suggestions-quicklinks"}else{if(v!==false&&p===false){q.className="quicklinks"
}else{if(v===false&&p!==false){q.className="suggestions"}else{if(this.results.length===0&&this.results[0].category==="No Results"){q.className="noresults suggestions-quicklinks"
}}}}x.appendChild(q);this.resultsPanel.appendChild(n);if(this.shouldVML()){o.style.height=x.offsetHeight+"px";
o.style.display="block"}this.hideAllQuicktimeMovies()};SearchShortcut.prototype.hideResults=function(d,f){if(this.hideResultsOnMouseOut){AC.removeEvent(document,"mousemove",this.hideResultsOnMouseOut);
delete this.hideResultsOnMouseOut}var e=this;window.setTimeout(function(){e.selected=false;
e.shouldHideOnMouseOut=false;e.resultsPanel.innerHTML="";e.showAllQuicktimeMovies();
e.resultsShowing=false},100)};SearchShortcut.prototype.track=function(i,g){if(typeof(s_gi)==="undefined"||!s_gi){return
}var j="appleglobal";var h="appleussearch";var f=null;if(typeof(searchCountry)!=="undefined"&&searchCountry&&searchCountry!=="US"){f=SearchShortcut.geoMap[searchCountry.toUpperCase()].code
}if(f){j="apple"+f+"global";h="apple"+f+"search"}s=s_gi(j+","+h);s.linkTrackVars="eVar2,eVar4,prop7,prop10";
s.linkTrackEvents="event50";s.events=s.apl(s.events,"event50",",",1);s.eVar2="WWW-sc: "+i.toLowerCase();
s.prop7="WWW-sc: "+i.toLowerCase();s.eVar4=g;s.prop10=g;s.tl(this,"o","Shortcut Search");
s.eVar2="";s.prop7="";s.eVar4="";s.prop10="";s.events=""};SearchShortcut.prototype.fullSearch=function(o){this.searchText=this.searchInput.value;
this.searchText=this.searchText.replace(/^\s+/g,"").replace(/\s+$/g,"").replace(/\s\s+/g," ");
var m=this.fullSearchUrl()+this.getQueryParameters(this.searchText);if(typeof(FeedStatistics)!=="undefined"){var n=new FeedStatistics();
n.inputFeed();var k=n.getStorageItem("query"),p=n.getQueryFromUri(),i=this.searchText,l=n.getStorageItem("next"),j=(document.location.href.indexOf(location.protocol+"//"+document.domain+"/search/")===0);
if(k&&i!==""&&i!==k){if(!l&&j){n.updateNotViewed()}}n.updateLastQuery(i);n.updateStorageItem("next",false)
}document.location=m.replace("q=undefined&","")};SearchShortcut.prototype.go=function(b){document.location=b
};SearchShortcut.prototype.shouldHideQuicktimeMovies=function(){var l=navigator.userAgent,g=/opera/i.test(l),i=(/msie/i.test(l)&&!g),k=/firefox/i.test(l),h=/chrome/i.test(l),j=(/applewebkit/i.test(l)&&!h);
win=/windows/i.test(l),mac=/mac/i.test(l);if(mac&&(j||h)){return false}if(win&&(i||j||h)){return false
}return true};SearchShortcut.prototype.hideAllQuicktimeMovies=function(){if(this.shouldHideQuicktimeMovies()){if(typeof(AC)!=="undefined"&&typeof(AC.Quicktime)!=="undefined"&&typeof(AC.Quicktime.controllers)!=="undefined"){function y(b){var a=curtop=0;
if(b.offsetParent){a=b.offsetLeft;curtop=b.offsetTop;while(b=b.offsetParent){a+=b.offsetLeft;
curtop+=b.offsetTop}}return[a,curtop]}function E(q,j,b,o,f,k,d,p){var l=q+b;var a=j+o;
var m=f+d;var c=k+p;var n=Math.max(q,f);var h=Math.max(j,k);var r=Math.min(l,m);
var g=Math.min(a,c);return r>n&&g>h}var G=AC.Quicktime.controllers;var F={width:328,height:448};
var e=y(this.resultsPanel);var i=e[0]-328;var t=e[1];var u=w+F.width;var v=x+F.height;
for(var C=G.length-1;C>=0;C--){var D=G[C].movie;var z=Element.getDimensions(D);
var B=y(D);var w=B[0];var x=B[1];if(E(w,x,z.width,z.height,i,t,F.width,F.height)){this.pausedControllers.push(G[C]);
G[C].Stop();G[C].movie.style.visibility="hidden"}}}else{this.qtm=document.getElementsByTagName("object");
for(var C=0;C<this.qtm.length;C++){if(typeof(this.qtm[C].Stop)!=="undefined"){this.qtm[C].Stop()
}try{if(typeof(this.qtm[C].getElementsByTagName("embed")[0].Stop)!=="undefined"){this.qtm[C].getElementsByTagName("embed")[0].Stop()
}}catch(A){}this.qtm[C].style.visibility="hidden"}}}};SearchShortcut.prototype.showAllQuicktimeMovies=function(){if(typeof(AC)!=="undefined"&&typeof(AC.Quicktime)!=="undefined"&&typeof(AC.Quicktime.controllers)!=="undefined"){for(var d=this.pausedControllers.length-1;
d>=0;d--){this.pausedControllers[d].movie.style.visibility="visible";if(navigator.userAgent.match(/Firefox/i)){this.pausedControllers[d].movie.style.zIndex="100";
setTimeout(this.pausedControllers[d].Play.bind(this.pausedControllers[d]),100)}else{this.pausedControllers[d].Play()
}}this.pausedControllers=[]}else{if(this.qtm){for(var d=0;d<this.qtm.length;d++){this.qtm[d].style.visibility="visible";
if(typeof(this.qtm[d].Play)!=="undefined"){this.qtm[d].Play()}try{if(typeof(this.qtm[d].getElementsByTagName("embed")[0].Play)!=="undefined"){this.qtm[d].getElementsByTagName("embed")[0].Play()
}}catch(c){}}}}};SearchShortcut.descriptionCharacters=105;SearchShortcut.titleCharacters=39;
SearchShortcut.result=function(d,f,e){this.index=d;this.data=f;this.qLinks=e;this.data.truncated={};
if(this.data.desc){this.data.truncated.desc=unescape(this.data.desc);if(this.data.truncated.desc.length>SearchShortcut.descriptionCharacters){this.data.truncated.desc=this.data.truncated.desc.substring(0,this.data.truncated.desc.lastIndexOf(" ",this.descriptionCharacters-11))+"&hellip;"
}}if(this.data.title){this.data.truncated.title=unescape(this.data.title);if(this.data.truncated.title.length>SearchShortcut.titleCharacters){this.data.truncated.title=this.data.truncated.title.substring(0,this.data.truncated.title.lastIndexOf(" ",30))+"&hellip;"
}}this.render()};SearchShortcut.result.prototype.render=function(){var l=document.createDocumentFragment();
var k=document.createElement("li");var n;var p;var o;var m;var j=this;var q=this.qLinks;
var r=window.location.protocol+"//"+window.location.hostname;l.appendChild(k);if(this.data.url){n=document.createElement("a");
if(typeof(window.searchHost)!=="undefined"&&window.searchHost===true){this.data.url=decodeURIComponent(this.data.url).replace("http://www.apple.com",r);
n.href=this.data.url}else{n.href=decodeURIComponent(this.data.url)}if(this.data.category==="Suggestions"){n.className="suggestions"
}AC.addEvent(n,"click",function(b){try{b.preventDefault();b.stopPropagation()}catch(a){}if(q){q.go(j.data.url)
}return false});AC.addEvent(n,"mousedown",function(c){try{c.preventDefault();c.stopPropagation()
}catch(a){}if(q){if(j.data.category==="Quick Link"){q.track(q.searchText,j.data.url)
}if(typeof(FeedStatistics)!=="undefined"){var b=new FeedStatistics();b.updateStorageItem("search type","common searches")
}}return false});k.appendChild(n)}if(this.data.image){p=new Image();p.src=this.data.image;
p.alt=this.data.title;n.appendChild(p);if(/MSIE (5\.5|6\.)/.test(navigator.userAgent)){p.src="/global/elements/blank.gif";
p.style.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+this.data.image+'",sizingMethod="scale")'
}}if(this.data.truncated.title){o=document.createElement("h4");o.innerHTML=this.data.truncated.title;
n.appendChild(o)}if(this.data.truncated.desc){m=document.createElement("p");m.innerHTML=this.data.truncated.desc;
n.appendChild(m)}this.element=k};SearchShortcut.result.prototype.select=function(){this.element.className+=" focus";
return this};SearchShortcut.result.prototype.deselect=function(){AC.removeClassName(this.element,"focus");
return this};SearchShortcut.quickLinks=function(){this.baseShortcutsUrl="http://www.apple.com/global/nav/scripts/shortcuts.php"
};SearchShortcut.quickLinks.prototype.generateScript=function(d){var f=this.baseShortcutsUrl+d+"&transport=js";
var e=document.createElement("script");e.id="xdShortcutContainer";e.type="text/javascript";
e.src=f;return e};SearchShortcut.appleInstant=function(d){this.aiLocale="en_US";
this.aiModel=typeof(modelValue)==="undefined"?"marcom_en_US":modelValue;if(typeof(window.searchHost)!=="undefined"&&window.searchHost===true){var c=window.location.protocol+"//"+window.location.hostname;
this.aiGetSuggestionsUrl=c+"/search/instant/getSuggestions"}else{this.aiGetSuggestionsUrl="http://www.apple.com/search/instant/getSuggestions"
}if(d==="searchPage"){this.aiGetSuggestionsCallback="SearchShortcut.searchPageCallback"
}else{if(d==="globalNav"){this.aiGetSuggestionsCallback="SearchShortcut.globalNavCallback"
}}};SearchShortcut.appleInstant.prototype.generateScript=function(f){var d=this.aiGetSuggestionsUrl+"?&query="+encodeURIComponent(f)+"&locale="+this.aiLocale+"&model="+this.aiModel+"&callback="+this.aiGetSuggestionsCallback;
var e=document.createElement("script");e.id="xdSuggestionsContainer";e.type="text/javascript";
e.src=d;return e};SearchShortcut.geoMap={US:{code:"",noResults:"No suggestions found. Search all of apple.com.",viewAll:"View all search results",shortcuts:"Recommended Results",suggestionsText:"Common Searches",searchText:"Search"},AE:{code:"ae"},ASIA:{code:"asia"},AT:{code:"at",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",viewAll:"Alle Suchergebnisse",searchText:"Suchen"},AU:{code:"au"},BE_FR:{code:"bf",noResults:"Pas de résultat. Essayez une recherche apple.com",viewAll:"Afficher tous les résultats",shortcuts:"Raccourcis",searchText:"Rechercher"},BE_NL:{code:"bl",noResults:"Niets gevonden. Zoek opnieuw binnen www.apple.com.",viewAll:"Toon alle zoekresultaten",shortcuts:"Snelkoppelingen",searchText:"Zoek"},BR:{code:"br",noResults:"Não encontrado. Tente a busca em apple.com",viewAll:"Ver todos os resultados da busca",shortcuts:"Links rapidos",searchText:"Buscar"},CA_EN:{code:"ca",directory:"/ca"},CA_FR:{code:"ca",directory:"/ca/fr",viewAll:"Afficher tous les résultats",shortcuts:"Raccourcis",searchText:"Recherche"},CH_DE:{code:"ce",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",viewAll:"Alle Suchergebnisse",searchText:"Suchen"},CH_FR:{code:"cr",noResults:"Pas de résultat. Essayez une recherche apple.com",viewAll:"Afficher tous les résultats",shortcuts:"Raccourcis",searchText:"Rechercher"},CN:{code:"cn",directory:"/cn",noResults:"找不到快速搜索结果，请尝试 apple.com 的完整搜索",shortcuts:"快速链接",viewAll:"查看所有搜索结果",searchText:"搜索"},DE:{code:"de",viewAll:"Alle Suchergebnisse",noResults:"Kein Treffer in Kurzsuche. Vollsuche auf apple.com",searchText:"Suchen"},DK:{code:"dk",noResults:"Ingen genvej fundet. Prøv at søge på hele apple.com.",viewAll:"Vis alle søgeresultater",shortcuts:"Hurtige henvisninger",searchText:"Søg"},ES:{code:"es",noResults:"Ningún atajo. Búsqueda completa en apple.com",viewAll:"Ver todos los resultados de búsqueda",shortcuts:"Enlaces rápidos",searchText:"Buscar"},FI:{code:"fi",noResults:"Ei oikotietä. Etsi koko apple.com.",viewAll:"Katso hakutulokset",shortcuts:"Pikalinkit",searchText:"Etsi"},FR:{code:"fr",noResults:"Pas de résultat. Essayez une recherche apple.com",viewAll:"Afficher tous les résultats",shortcuts:"Raccourcis",searchText:"Rechercher"},HK:{code:"hk",noResults:"找不到快速搜尋結果，請試試 apple.com 的完整搜尋",viewAll:"檢視所有搜尋結果",shortcuts:"快速連結",searchText:"搜尋"},HK_EN:{code:"hk",directory:"/hk/en"},ID:{code:"id"},IE:{code:"ie"},IN:{code:"in"},IT:{code:"it",noResults:"Nessuna scorciatoia trovata. Provate su apple.com",viewAll:"Mostra tutti i risultati",shortcuts:"Collegamenti rapidi",searchText:"Cerca"},JP:{code:"jp",noResults:"ショートカットは見つかりませんでした。検索はこちら。",viewAll:"すべての検索結果を見る",shortcuts:"クイックリンク",searchText:"Search"},KR:{code:"kr",noResults:"일치하는 검색결과가 없습니다. 다시 검색하기.",shortcuts:"빠른 연결",viewAll:"검색 결과 전체 보기."},LA:{code:"la",noResults:"No se encontraron resultados. Intenta en apple.com.",viewAll:"Ver todos los resultados de la búsqueda",shortcuts:"Enlaces rápidos",searchText:"Buscar"},LAE:{code:"lae",noResults:"No shortcut found. Search all of apple.com.",viewAll:"View all search results",searchText:"Search"},MX:{code:"mx",noResults:"No se encontraron resultados. Intenta en apple.com.",viewAll:"Ver todos los resultados de la búsqueda",shortcuts:"Enlaces rápidos",searchText:"Buscar"},MY:{code:"my"},NL:{code:"nl",noResults:"Niets gevonden. Zoek opnieuw binnen www.apple.com.",viewAll:"Toon alle zoekresultaten",shortcuts:"Snelkoppelingen",searchText:"Zoek"},NO:{code:"no",noResults:"Fant ingen snarvei. Søk på hele apple.com.",viewAll:"Vis alle søkeresultater",shortcuts:"Hurtigkoblinger",searchText:"Søk"},NZ:{code:"nz"},PH:{code:"ph"},PL:{code:"pl",noResults:"Fraza nie została odnaleziona. Użyj apple.com.",viewAll:"Przeglądaj wszystkie wyniki",shortcuts:"Podręczne łącza",searchText:"Szukaj"},PT:{code:"pt",noResults:"Nenhum resultado. Tente pesquisar em apple.com.",viewAll:"Ver todos os resultados de pesquisa",shortcuts:"Ligações rápidas",searchText:"Procurar"},RU:{code:"ru",noResults:"Ссылок нет. Попробуйте расширенный поиск.",viewAll:"Показать все результаты поиска",shortcuts:"Быстрые ссылки",searchText:"Поиск"},SA:{code:"sa"},SE:{code:"se",noResults:"Ingen genväg hittad. Sök i hela apple.com.",viewAll:"Visa alla sökresultat",shortcuts:"Snabblänkar",searchText:"Sök"},SG:{code:"sg"},TH:{code:"th"},TR:{code:"tr",noResults:"Öneri bulunamadı. Tüm apple.com'da ara.",viewAll:"Tüm arama sonuçlarını göster",shortcuts:"Önerilen Sonuçlar",searchText:"Arama"},TW:{code:"tw",noResults:"快速搜尋找不到，試試 apple.com 完整搜尋",viewAll:"瀏覽搜索結果",shortcuts:"快速連結",searchText:"搜尋"},UK:{code:"uk"},VN:{code:"vn"},ZA:{code:"za"},PO:null,UA:null,RO:null,CZ:null,HU:null,BG:null,HR:null,GR:null,IS:null};
/*  Prototype JavaScript framework, version 1.6.0.2
 *  (c) 2005-2008 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/


var Prototype = {
  Version: '1.6.0.2',

  Browser: {
    IE:     !!(window.attachEvent && !window.opera),
    Opera:  !!window.opera,
    WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
    Gecko:  navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1,
    MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
  },

  BrowserFeatures: {
    XPath: !!document.evaluate,
    ElementExtensions: !!window.HTMLElement,
    SpecificElementExtensions:
      document.createElement('div').__proto__ &&
      document.createElement('div').__proto__ !==
        document.createElement('form').__proto__
  },

  ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

  emptyFunction: function() { },
  K: function(x) { return x }
};

if (Prototype.Browser.MobileSafari)
  Prototype.BrowserFeatures.SpecificElementExtensions = false;


/* Based on Alex Arnell's inheritance implementation. */
var Class = {
  create: function() {
    var parent = null, properties = $A(arguments);
    if (Object.isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    Object.extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      var subclass = function() { };
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

    for (var i = 0; i < properties.length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = Prototype.emptyFunction;

    klass.prototype.constructor = klass;

    return klass;
  }
};

Class.Methods = {
  addMethods: function(source) {
    var ancestor   = this.superclass && this.superclass.prototype;
    var properties = Object.keys(source);

    if (!Object.keys({ toString: true }).length)
      properties.push("toString", "valueOf");

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i], value = source[property];
      if (ancestor && Object.isFunction(value) &&
          value.argumentNames().first() == "$super") {
        var method = value, value = Object.extend((function(m) {
          return function() { return ancestor[m].apply(this, arguments) };
        })(property).wrap(method), {
          valueOf:  function() { return method },
          toString: function() { return method.toString() }
        });
      }
      this.prototype[property] = value;
    }

    return this;
  }
};

var Abstract = { };

Object.extend = function(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
};

Object.extend(Object, {
  inspect: function(object) {
    try {
      if (Object.isUndefined(object)) return 'undefined';
      if (object === null) return 'null';
      return object.inspect ? object.inspect() : String(object);
    } catch (e) {
      if (e instanceof RangeError) return '...';
      throw e;
    }
  },

  toJSON: function(object) {
    var type = typeof object;
    switch (type) {
      case 'undefined':
      case 'function':
      case 'unknown': return;
      case 'boolean': return object.toString();
    }

    if (object === null) return 'null';
    if (object.toJSON) return object.toJSON();
    if (Object.isElement(object)) return;

    var results = [];
    for (var property in object) {
      var value = Object.toJSON(object[property]);
      if (!Object.isUndefined(value))
        results.push(property.toJSON() + ': ' + value);
    }

    return '{' + results.join(', ') + '}';
  },

  toQueryString: function(object) {
    return $H(object).toQueryString();
  },

  toHTML: function(object) {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
  },

  keys: function(object) {
    var keys = [];
    for (var property in object)
      keys.push(property);
    return keys;
  },

  values: function(object) {
    var values = [];
    for (var property in object)
      values.push(object[property]);
    return values;
  },

  clone: function(object) {
    return Object.extend({ }, object);
  },

  isElement: function(object) {
    return object && object.nodeType == 1;
  },

  isArray: function(object) {
    return object != null && typeof object == "object" &&
      'splice' in object && 'join' in object;
  },

  isHash: function(object) {
    return object instanceof Hash;
  },

  isFunction: function(object) {
    return typeof object == "function";
  },

  isString: function(object) {
    return typeof object == "string";
  },

  isNumber: function(object) {
    return typeof object == "number";
  },

  isUndefined: function(object) {
    return typeof object == "undefined";
  }
});

Object.extend(Function.prototype, {
  argumentNames: function() {
    var names = this.toString().match(/^[\s\(]*function[^(]*\((.*?)\)/)[1].split(",").invoke("strip");
    return names.length == 1 && !names[0] ? [] : names;
  },

  bind: function() {
    if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
    var __method = this, args = $A(arguments), object = args.shift();
    return function() {
      return __method.apply(object, args.concat($A(arguments)));
    }
  },

  bindAsEventListener: function() {
    var __method = this, args = $A(arguments), object = args.shift();
    return function(event) {
      return __method.apply(object, [event || window.event].concat(args));
    }
  },

  curry: function() {
    if (!arguments.length) return this;
    var __method = this, args = $A(arguments);
    return function() {
      return __method.apply(this, args.concat($A(arguments)));
    }
  },

  delay: function() {
    var __method = this, args = $A(arguments), timeout = args.shift() * 1000;
    return window.setTimeout(function() {
      return __method.apply(__method, args);
    }, timeout);
  },

  wrap: function(wrapper) {
    var __method = this;
    return function() {
      return wrapper.apply(this, [__method.bind(this)].concat($A(arguments)));
    }
  },

  methodize: function() {
    if (this._methodized) return this._methodized;
    var __method = this;
    return this._methodized = function() {
      return __method.apply(null, [this].concat($A(arguments)));
    };
  }
});

Function.prototype.defer = Function.prototype.delay.curry(0.01);

Date.prototype.toJSON = function() {
  return '"' + this.getUTCFullYear() + '-' +
    (this.getUTCMonth() + 1).toPaddedString(2) + '-' +
    this.getUTCDate().toPaddedString(2) + 'T' +
    this.getUTCHours().toPaddedString(2) + ':' +
    this.getUTCMinutes().toPaddedString(2) + ':' +
    this.getUTCSeconds().toPaddedString(2) + 'Z"';
};

var Try = {
  these: function() {
    var returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) { }
    }

    return returnValue;
  }
};

RegExp.prototype.match = RegExp.prototype.test;

RegExp.escape = function(str) {
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};

/*--------------------------------------------------------------------------*/

var PeriodicalExecuter = Class.create({
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  execute: function() {
    this.callback(this);
  },

  stop: function() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  },

  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.execute();
      } finally {
        this.currentlyExecuting = false;
      }
    }
  }
});
Object.extend(String, {
  interpret: function(value) {
    return value == null ? '' : String(value);
  },
  specialChar: {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '\\': '\\\\'
  }
});

Object.extend(String.prototype, {
  gsub: function(pattern, replacement) {
    var result = '', source = this, match;
    replacement = arguments.callee.prepareReplacement(replacement);

    while (source.length > 0) {
      if (match = source.match(pattern)) {
        result += source.slice(0, match.index);
        result += String.interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;
  },

  sub: function(pattern, replacement, count) {
    replacement = this.gsub.prepareReplacement(replacement);
    count = Object.isUndefined(count) ? 1 : count;

    return this.gsub(pattern, function(match) {
      if (--count < 0) return match[0];
      return replacement(match);
    });
  },

  scan: function(pattern, iterator) {
    this.gsub(pattern, iterator);
    return String(this);
  },

  truncate: function(length, truncation) {
    length = length || 30;
    truncation = Object.isUndefined(truncation) ? '...' : truncation;
    return this.length > length ?
      this.slice(0, length - truncation.length) + truncation : String(this);
  },

  strip: function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  },

  stripTags: function() {
    return this.replace(/<\/?[^>]+>/gi, '');
  },

  stripScripts: function() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  },

  extractScripts: function() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img');
    var matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  },

  evalScripts: function() {
    return this.extractScripts().map(function(script) { return eval(script) });
  },

  escapeHTML: function() {
    var self = arguments.callee;
    self.text.data = this;
    return self.div.innerHTML;
  },

  unescapeHTML: function() {
    var div = new Element('div');
    div.innerHTML = this.stripTags();
    return div.childNodes[0] ? (div.childNodes.length > 1 ?
      $A(div.childNodes).inject('', function(memo, node) { return memo+node.nodeValue }) :
      div.childNodes[0].nodeValue) : '';
  },

  toQueryParams: function(separator) {
    var match = this.strip().match(/([^?#]*)(#.*)?$/);
    if (!match) return { };

    return match[1].split(separator || '&').inject({ }, function(hash, pair) {
      if ((pair = pair.split('='))[0]) {
        var key = decodeURIComponent(pair.shift());
        var value = pair.length > 1 ? pair.join('=') : pair[0];
        if (value != undefined) value = decodeURIComponent(value);

        if (key in hash) {
          if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
          hash[key].push(value);
        }
        else hash[key] = value;
      }
      return hash;
    });
  },

  toArray: function() {
    return this.split('');
  },

  succ: function() {
    return this.slice(0, this.length - 1) +
      String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
  },

  times: function(count) {
    return count < 1 ? '' : new Array(count + 1).join(this);
  },

  camelize: function() {
    var parts = this.split('-'), len = parts.length;
    if (len == 1) return parts[0];

    var camelized = this.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < len; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
  },

  capitalize: function() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  },

  underscore: function() {
    return this.gsub(/::/, '/').gsub(/([A-Z]+)([A-Z][a-z])/,'#{1}_#{2}').gsub(/([a-z\d])([A-Z])/,'#{1}_#{2}').gsub(/-/,'_').toLowerCase();
  },

  dasherize: function() {
    return this.gsub(/_/,'-');
  },

  inspect: function(useDoubleQuotes) {
    var escapedString = this.gsub(/[\x00-\x1f\\]/, function(match) {
      var character = String.specialChar[match[0]];
      return character ? character : '\\u00' + match[0].charCodeAt().toPaddedString(2, 16);
    });
    if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
    return "'" + escapedString.replace(/'/g, '\\\'') + "'";
  },

  toJSON: function() {
    return this.inspect(true);
  },

  unfilterJSON: function(filter) {
    return this.sub(filter || Prototype.JSONFilter, '#{1}');
  },

  isJSON: function() {
    var str = this;
    if (str.blank()) return false;
    str = this.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
    return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
  },

  evalJSON: function(sanitize) {
    var json = this.unfilterJSON();
    try {
      if (!sanitize || json.isJSON()) return eval('(' + json + ')');
    } catch (e) { }
    throw new SyntaxError('Badly formed JSON string: ' + this.inspect());
  },

  include: function(pattern) {
    return this.indexOf(pattern) > -1;
  },

  startsWith: function(pattern) {
    return this.indexOf(pattern) === 0;
  },

  endsWith: function(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.lastIndexOf(pattern) === d;
  },

  empty: function() {
    return this == '';
  },

  blank: function() {
    return /^\s*$/.test(this);
  },

  interpolate: function(object, pattern) {
    return new Template(this, pattern).evaluate(object);
  }
});

if (Prototype.Browser.WebKit || Prototype.Browser.IE) Object.extend(String.prototype, {
  escapeHTML: function() {
    return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  },
  unescapeHTML: function() {
    return this.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
  }
});

String.prototype.gsub.prepareReplacement = function(replacement) {
  if (Object.isFunction(replacement)) return replacement;
  var template = new Template(replacement);
  return function(match) { return template.evaluate(match) };
};

String.prototype.parseQuery = String.prototype.toQueryParams;

Object.extend(String.prototype.escapeHTML, {
  div:  document.createElement('div'),
  text: document.createTextNode('')
});

with (String.prototype.escapeHTML) div.appendChild(text);

var Template = Class.create({
  initialize: function(template, pattern) {
    this.template = template.toString();
    this.pattern = pattern || Template.Pattern;
  },

  evaluate: function(object) {
    if (Object.isFunction(object.toTemplateReplacements))
      object = object.toTemplateReplacements();

    return this.template.gsub(this.pattern, function(match) {
      if (object == null) return '';

      var before = match[1] || '';
      if (before == '\\') return match[2];

      var ctx = object, expr = match[3];
      var pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
      match = pattern.exec(expr);
      if (match == null) return before;

      while (match != null) {
        var comp = match[1].startsWith('[') ? match[2].gsub('\\\\]', ']') : match[1];
        ctx = ctx[comp];
        if (null == ctx || '' == match[3]) break;
        expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
        match = pattern.exec(expr);
      }

      return before + String.interpret(ctx);
    });
  }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

var $break = { };

var Enumerable = {
  each: function(iterator, context) {
    var index = 0;
    iterator = iterator.bind(context);
    try {
      this._each(function(value) {
        iterator(value, index++);
      });
    } catch (e) {
      if (e != $break) throw e;
    }
    return this;
  },

  eachSlice: function(number, iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var index = -number, slices = [], array = this.toArray();
    while ((index += number) < array.length)
      slices.push(array.slice(index, index+number));
    return slices.collect(iterator, context);
  },

  all: function(iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var result = true;
    this.each(function(value, index) {
      result = result && !!iterator(value, index);
      if (!result) throw $break;
    });
    return result;
  },

  any: function(iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var result = false;
    this.each(function(value, index) {
      if (result = !!iterator(value, index))
        throw $break;
    });
    return result;
  },

  collect: function(iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var results = [];
    this.each(function(value, index) {
      results.push(iterator(value, index));
    });
    return results;
  },

  detect: function(iterator, context) {
    iterator = iterator.bind(context);
    var result;
    this.each(function(value, index) {
      if (iterator(value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  },

  findAll: function(iterator, context) {
    iterator = iterator.bind(context);
    var results = [];
    this.each(function(value, index) {
      if (iterator(value, index))
        results.push(value);
    });
    return results;
  },

  grep: function(filter, iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var results = [];

    if (Object.isString(filter))
      filter = new RegExp(filter);

    this.each(function(value, index) {
      if (filter.match(value))
        results.push(iterator(value, index));
    });
    return results;
  },

  include: function(object) {
    if (Object.isFunction(this.indexOf))
      if (this.indexOf(object) != -1) return true;

    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  },

  inGroupsOf: function(number, fillWith) {
    fillWith = Object.isUndefined(fillWith) ? null : fillWith;
    return this.eachSlice(number, function(slice) {
      while(slice.length < number) slice.push(fillWith);
      return slice;
    });
  },

  inject: function(memo, iterator, context) {
    iterator = iterator.bind(context);
    this.each(function(value, index) {
      memo = iterator(memo, value, index);
    });
    return memo;
  },

  invoke: function(method) {
    var args = $A(arguments).slice(1);
    return this.map(function(value) {
      return value[method].apply(value, args);
    });
  },

  max: function(iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator(value, index);
      if (result == null || value >= result)
        result = value;
    });
    return result;
  },

  min: function(iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator(value, index);
      if (result == null || value < result)
        result = value;
    });
    return result;
  },

  partition: function(iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var trues = [], falses = [];
    this.each(function(value, index) {
      (iterator(value, index) ?
        trues : falses).push(value);
    });
    return [trues, falses];
  },

  pluck: function(property) {
    var results = [];
    this.each(function(value) {
      results.push(value[property]);
    });
    return results;
  },

  reject: function(iterator, context) {
    iterator = iterator.bind(context);
    var results = [];
    this.each(function(value, index) {
      if (!iterator(value, index))
        results.push(value);
    });
    return results;
  },

  sortBy: function(iterator, context) {
    iterator = iterator.bind(context);
    return this.map(function(value, index) {
      return {value: value, criteria: iterator(value, index)};
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  },

  toArray: function() {
    return this.map();
  },

  zip: function() {
    var iterator = Prototype.K, args = $A(arguments);
    if (Object.isFunction(args.last()))
      iterator = args.pop();

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      return iterator(collections.pluck(index));
    });
  },

  size: function() {
    return this.toArray().length;
  },

  inspect: function() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }
};

Object.extend(Enumerable, {
  map:     Enumerable.collect,
  find:    Enumerable.detect,
  select:  Enumerable.findAll,
  filter:  Enumerable.findAll,
  member:  Enumerable.include,
  entries: Enumerable.toArray,
  every:   Enumerable.all,
  some:    Enumerable.any
});
function $A(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
}

if (Prototype.Browser.WebKit) {
  $A = function(iterable) {
    if (!iterable) return [];
    if (!(Object.isFunction(iterable) && iterable == '[object NodeList]') &&
        iterable.toArray) return iterable.toArray();
    var length = iterable.length || 0, results = new Array(length);
    while (length--) results[length] = iterable[length];
    return results;
  };
}

Array.from = $A;

Object.extend(Array.prototype, Enumerable);

if (!Array.prototype._reverse) Array.prototype._reverse = Array.prototype.reverse;

Object.extend(Array.prototype, {
  _each: function(iterator) {
    for (var i = 0, length = this.length; i < length; i++)
      iterator(this[i]);
  },

  clear: function() {
    this.length = 0;
    return this;
  },

  first: function() {
    return this[0];
  },

  last: function() {
    return this[this.length - 1];
  },

  compact: function() {
    return this.select(function(value) {
      return value != null;
    });
  },

  flatten: function() {
    return this.inject([], function(array, value) {
      return array.concat(Object.isArray(value) ?
        value.flatten() : [value]);
    });
  },

  without: function() {
    var values = $A(arguments);
    return this.select(function(value) {
      return !values.include(value);
    });
  },

  reverse: function(inline) {
    return (inline !== false ? this : this.toArray())._reverse();
  },

  reduce: function() {
    return this.length > 1 ? this : this[0];
  },

  uniq: function(sorted) {
    return this.inject([], function(array, value, index) {
      if (0 == index || (sorted ? array.last() != value : !array.include(value)))
        array.push(value);
      return array;
    });
  },

  intersect: function(array) {
    return this.uniq().findAll(function(item) {
      return array.detect(function(value) { return item === value });
    });
  },

  clone: function() {
    return [].concat(this);
  },

  size: function() {
    return this.length;
  },

  inspect: function() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  },

  toJSON: function() {
    var results = [];
    this.each(function(object) {
      var value = Object.toJSON(object);
      if (!Object.isUndefined(value)) results.push(value);
    });
    return '[' + results.join(', ') + ']';
  }
});

// use native browser JS 1.6 implementation if available
if (Object.isFunction(Array.prototype.forEach))
  Array.prototype._each = Array.prototype.forEach;

if (!Array.prototype.indexOf) Array.prototype.indexOf = function(item, i) {
  i || (i = 0);
  var length = this.length;
  if (i < 0) i = length + i;
  for (; i < length; i++)
    if (this[i] === item) return i;
  return -1;
};

if (!Array.prototype.lastIndexOf) Array.prototype.lastIndexOf = function(item, i) {
  i = isNaN(i) ? this.length : (i < 0 ? this.length + i : i) + 1;
  var n = this.slice(0, i).reverse().indexOf(item);
  return (n < 0) ? n : i - n - 1;
};

Array.prototype.toArray = Array.prototype.clone;

function $w(string) {
  if (!Object.isString(string)) return [];
  string = string.strip();
  return string ? string.split(/\s+/) : [];
}

if (Prototype.Browser.Opera){
  Array.prototype.concat = function() {
    var array = [];
    for (var i = 0, length = this.length; i < length; i++) array.push(this[i]);
    for (var i = 0, length = arguments.length; i < length; i++) {
      if (Object.isArray(arguments[i])) {
        for (var j = 0, arrayLength = arguments[i].length; j < arrayLength; j++)
          array.push(arguments[i][j]);
      } else {
        array.push(arguments[i]);
      }
    }
    return array;
  };
}
Object.extend(Number.prototype, {
  toColorPart: function() {
    return this.toPaddedString(2, 16);
  },

  succ: function() {
    return this + 1;
  },

  times: function(iterator) {
    $R(0, this, true).each(iterator);
    return this;
  },

  toPaddedString: function(length, radix) {
    var string = this.toString(radix || 10);
    return '0'.times(length - string.length) + string;
  },

  toJSON: function() {
    return isFinite(this) ? this.toString() : 'null';
  }
});

$w('abs round ceil floor').each(function(method){
  Number.prototype[method] = Math[method].methodize();
});
function $H(object) {
  return new Hash(object);
};

var Hash = Class.create(Enumerable, (function() {

  function toQueryPair(key, value) {
    if (Object.isUndefined(value)) return key;
    return key + '=' + encodeURIComponent(String.interpret(value));
  }

  return {
    initialize: function(object) {
      this._object = Object.isHash(object) ? object.toObject() : Object.clone(object);
    },

    _each: function(iterator) {
      for (var key in this._object) {
        var value = this._object[key], pair = [key, value];
        pair.key = key;
        pair.value = value;
        iterator(pair);
      }
    },

    set: function(key, value) {
      return this._object[key] = value;
    },

    get: function(key) {
      return this._object[key];
    },

    unset: function(key) {
      var value = this._object[key];
      delete this._object[key];
      return value;
    },

    toObject: function() {
      return Object.clone(this._object);
    },

    keys: function() {
      return this.pluck('key');
    },

    values: function() {
      return this.pluck('value');
    },

    index: function(value) {
      var match = this.detect(function(pair) {
        return pair.value === value;
      });
      return match && match.key;
    },

    merge: function(object) {
      return this.clone().update(object);
    },

    update: function(object) {
      return new Hash(object).inject(this, function(result, pair) {
        result.set(pair.key, pair.value);
        return result;
      });
    },

    toQueryString: function() {
      return this.map(function(pair) {
        var key = encodeURIComponent(pair.key), values = pair.value;

        if (values && typeof values == 'object') {
          if (Object.isArray(values))
            return values.map(toQueryPair.curry(key)).join('&');
        }
        return toQueryPair(key, values);
      }).join('&');
    },

    inspect: function() {
      return '#<Hash:{' + this.map(function(pair) {
        return pair.map(Object.inspect).join(': ');
      }).join(', ') + '}>';
    },

    toJSON: function() {
      return Object.toJSON(this.toObject());
    },

    clone: function() {
      return new Hash(this);
    }
  }
})());

Hash.prototype.toTemplateReplacements = Hash.prototype.toObject;
Hash.from = $H;
var ObjectRange = Class.create(Enumerable, {
  initialize: function(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  },

  _each: function(iterator) {
    var value = this.start;
    while (this.include(value)) {
      iterator(value);
      value = value.succ();
    }
  },

  include: function(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }
});

var $R = function(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
};

var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new XMLHttpRequest()},
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) || false;
  },

  activeRequestCount: 0
};

Ajax.Responders = {
  responders: [],

  _each: function(iterator) {
    this.responders._each(iterator);
  },

  register: function(responder) {
    if (!this.include(responder))
      this.responders.push(responder);
  },

  unregister: function(responder) {
    this.responders = this.responders.without(responder);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (Object.isFunction(responder[callback])) {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) { }
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate:   function() { Ajax.activeRequestCount++ },
  onComplete: function() { Ajax.activeRequestCount-- }
});

Ajax.Base = Class.create({
  initialize: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      contentType:  'application/x-www-form-urlencoded',
      encoding:     'UTF-8',
      parameters:   '',
      evalJSON:     true,
      evalJS:       true
    };
    Object.extend(this.options, options || { });

    this.options.method = this.options.method.toLowerCase();

    if (Object.isString(this.options.parameters))
      this.options.parameters = this.options.parameters.toQueryParams();
    else if (Object.isHash(this.options.parameters))
      this.options.parameters = this.options.parameters.toObject();
  }
});

Ajax.Request = Class.create(Ajax.Base, {
  _complete: false,

  initialize: function($super, url, options) {
    $super(options);
    this.transport = Ajax.getTransport();
    this.request(url);
  },

  request: function(url) {
    this.url = url;
    this.method = this.options.method;
    var params = Object.clone(this.options.parameters);

    if (!['get', 'post'].include(this.method)) {
      // simulate other verbs over post
      params['_method'] = this.method;
      this.method = 'post';
    }

    this.parameters = params;

    if (params = Object.toQueryString(params)) {
      // when GET, append parameters to URL
      if (this.method == 'get')
        this.url += (this.url.include('?') ? '&' : '?') + params;
      else if (/Konqueror|Safari|KHTML/.test(navigator.userAgent))
        params += '&_=';
    }

    try {
      var response = new Ajax.Response(this);
      if (this.options.onCreate) this.options.onCreate(response);
      Ajax.Responders.dispatch('onCreate', this, response);

      this.transport.open(this.method.toUpperCase(), this.url,
        this.options.asynchronous);

      if (this.options.asynchronous) this.respondToReadyState.bind(this).defer(1);

      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();

      this.body = this.method == 'post' ? (this.options.postBody || params) : null;
      this.transport.send(this.body);

      /* Force Firefox to handle ready state 4 for synchronous requests */
      if (!this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange();

    }
    catch (e) {
      this.dispatchException(e);
    }
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState > 1 && !((readyState == 4) && this._complete))
      this.respondToReadyState(this.transport.readyState);
  },

  setRequestHeaders: function() {
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Prototype-Version': Prototype.Version,
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };

    if (this.method == 'post') {
      headers['Content-type'] = this.options.contentType +
        (this.options.encoding ? '; charset=' + this.options.encoding : '');

      /* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType &&
          (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
            headers['Connection'] = 'close';
    }

    // user-defined headers
    if (typeof this.options.requestHeaders == 'object') {
      var extras = this.options.requestHeaders;

      if (Object.isFunction(extras.push))
        for (var i = 0, length = extras.length; i < length; i += 2)
          headers[extras[i]] = extras[i+1];
      else
        $H(extras).each(function(pair) { headers[pair.key] = pair.value });
    }

    for (var name in headers)
      this.transport.setRequestHeader(name, headers[name]);
  },

  success: function() {
    var status = this.getStatus();
    return !status || (status >= 200 && status < 300);
  },

  getStatus: function() {
    try {
      return this.transport.status || 0;
    } catch (e) { return 0 }
  },

  respondToReadyState: function(readyState) {
    var state = Ajax.Request.Events[readyState], response = new Ajax.Response(this);

    if (state == 'Complete') {
      try {
        this._complete = true;
        (this.options['on' + response.status]
         || this.options['on' + (this.success() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(response, response.headerJSON);
      } catch (e) {
        this.dispatchException(e);
      }

      var contentType = response.getHeader('Content-type');
      if (this.options.evalJS == 'force'
          || (this.options.evalJS && this.isSameOrigin() && contentType
          && contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
        this.evalResponse();
    }

    try {
      (this.options['on' + state] || Prototype.emptyFunction)(response, response.headerJSON);
      Ajax.Responders.dispatch('on' + state, this, response, response.headerJSON);
    } catch (e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      // avoid memory leak in MSIE: clean up
      this.transport.onreadystatechange = Prototype.emptyFunction;
    }
  },

  isSameOrigin: function() {
    var m = this.url.match(/^\s*https?:\/\/[^\/]*/);
    return !m || (m[0] == '#{protocol}//#{domain}#{port}'.interpolate({
      protocol: location.protocol,
      domain: document.domain,
      port: location.port ? ':' + location.port : ''
    }));
  },

  getHeader: function(name) {
    try {
      return this.transport.getResponseHeader(name) || null;
    } catch (e) { return null }
  },

  evalResponse: function() {
    try {
      return eval((this.transport.responseText || '').unfilterJSON());
    } catch (e) {
      this.dispatchException(e);
    }
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];

Ajax.Response = Class.create({
  initialize: function(request){
    this.request = request;
    var transport  = this.transport  = request.transport,
        readyState = this.readyState = transport.readyState;

    if((readyState > 2 && !Prototype.Browser.IE) || readyState == 4) {
      this.status       = this.getStatus();
      this.statusText   = this.getStatusText();
      this.responseText = String.interpret(transport.responseText);
      this.headerJSON   = this._getHeaderJSON();
    }

    if(readyState == 4) {
      var xml = transport.responseXML;
      this.responseXML  = Object.isUndefined(xml) ? null : xml;
      this.responseJSON = this._getResponseJSON();
    }
  },

  status:      0,
  statusText: '',

  getStatus: Ajax.Request.prototype.getStatus,

  getStatusText: function() {
    try {
      return this.transport.statusText || '';
    } catch (e) { return '' }
  },

  getHeader: Ajax.Request.prototype.getHeader,

  getAllHeaders: function() {
    try {
      return this.getAllResponseHeaders();
    } catch (e) { return null }
  },

  getResponseHeader: function(name) {
    return this.transport.getResponseHeader(name);
  },

  getAllResponseHeaders: function() {
    return this.transport.getAllResponseHeaders();
  },

  _getHeaderJSON: function() {
    var json = this.getHeader('X-JSON');
    if (!json) return null;
    json = decodeURIComponent(escape(json));
    try {
      return json.evalJSON(this.request.options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  },

  _getResponseJSON: function() {
    var options = this.request.options;
    if (!options.evalJSON || (options.evalJSON != 'force' &&
      !(this.getHeader('Content-type') || '').include('application/json')) ||
        this.responseText.blank())
          return null;
    try {
      return this.responseText.evalJSON(options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  }
});

Ajax.Updater = Class.create(Ajax.Request, {
  initialize: function($super, container, url, options) {
    this.container = {
      success: (container.success || container),
      failure: (container.failure || (container.success ? null : container))
    };

    options = Object.clone(options);
    var onComplete = options.onComplete;
    options.onComplete = (function(response, json) {
      this.updateContent(response.responseText);
      if (Object.isFunction(onComplete)) onComplete(response, json);
    }).bind(this);

    $super(url, options);
  },

  updateContent: function(responseText) {
    var receiver = this.container[this.success() ? 'success' : 'failure'],
        options = this.options;

    if (!options.evalScripts) responseText = responseText.stripScripts();

    if (receiver = $(receiver)) {
      if (options.insertion) {
        if (Object.isString(options.insertion)) {
          var insertion = { }; insertion[options.insertion] = responseText;
          receiver.insert(insertion);
        }
        else options.insertion(receiver, responseText);
      }
      else receiver.update(responseText);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
  initialize: function($super, container, url, options) {
    $super(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = { };
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(response) {
    if (this.options.decay) {
      this.decay = (response.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = response.responseText;
    }
    this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});
function $(element) {
  if (arguments.length > 1) {
    for (var i = 0, elements = [], length = arguments.length; i < length; i++)
      elements.push($(arguments[i]));
    return elements;
  }
  if (Object.isString(element))
    element = document.getElementById(element);
  return Element.extend(element);
}

if (Prototype.BrowserFeatures.XPath) {
  document._getElementsByXPath = function(expression, parentElement) {
    var results = [];
    var query = document.evaluate(expression, $(parentElement) || document,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, length = query.snapshotLength; i < length; i++)
      results.push(Element.extend(query.snapshotItem(i)));
    return results;
  };
}

/*--------------------------------------------------------------------------*/

if (!window.Node) var Node = { };

if (!Node.ELEMENT_NODE) {
  // DOM level 2 ECMAScript Language Binding
  Object.extend(Node, {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  });
}

(function() {
  var element = this.Element;
  this.Element = function(tagName, attributes) {
    attributes = attributes || { };
    tagName = tagName.toLowerCase();
    var cache = Element.cache;
    if (Prototype.Browser.IE && attributes.name) {
      tagName = '<' + tagName + ' name="' + attributes.name + '">';
      delete attributes.name;
      return Element.writeAttribute(document.createElement(tagName), attributes);
    }
    if (!cache[tagName]) cache[tagName] = Element.extend(document.createElement(tagName));
    return Element.writeAttribute(cache[tagName].cloneNode(false), attributes);
  };
  Object.extend(this.Element, element || { });
}).call(window);

Element.cache = { };

Element.Methods = {
  visible: function(element) {
    return $(element).style.display != 'none';
  },

  toggle: function(element) {
    element = $(element);
    Element[Element.visible(element) ? 'hide' : 'show'](element);
    return element;
  },

  hide: function(element) {
    $(element).style.display = 'none';
    return element;
  },

  show: function(element) {
    $(element).style.display = '';
    return element;
  },

  remove: function(element) {
    element = $(element);
    element.parentNode.removeChild(element);
    return element;
  },

  update: function(element, content) {
    element = $(element);
    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) return element.update().insert(content);
    content = Object.toHTML(content);
    element.innerHTML = content.stripScripts();
    content.evalScripts.bind(content).defer();
    return element;
  },

  replace: function(element, content) {
    element = $(element);
    if (content && content.toElement) content = content.toElement();
    else if (!Object.isElement(content)) {
      content = Object.toHTML(content);
      var range = element.ownerDocument.createRange();
      range.selectNode(element);
      content.evalScripts.bind(content).defer();
      content = range.createContextualFragment(content.stripScripts());
    }
    element.parentNode.replaceChild(content, element);
    return element;
  },

  insert: function(element, insertions) {
    element = $(element);

    if (Object.isString(insertions) || Object.isNumber(insertions) ||
        Object.isElement(insertions) || (insertions && (insertions.toElement || insertions.toHTML)))
          insertions = {bottom:insertions};

    var content, insert, tagName, childNodes;

    for (var position in insertions) {
      content  = insertions[position];
      position = position.toLowerCase();
      insert = Element._insertionTranslations[position];

      if (content && content.toElement) content = content.toElement();
      if (Object.isElement(content)) {
        insert(element, content);
        continue;
      }

      content = Object.toHTML(content);

      tagName = ((position == 'before' || position == 'after')
        ? element.parentNode : element).tagName.toUpperCase();

      childNodes = Element._getContentFromAnonymousElement(tagName, content.stripScripts());

      if (position == 'top' || position == 'after') childNodes.reverse();
      childNodes.each(insert.curry(element));

      content.evalScripts.bind(content).defer();
    }

    return element;
  },

  wrap: function(element, wrapper, attributes) {
    element = $(element);
    if (Object.isElement(wrapper))
      $(wrapper).writeAttribute(attributes || { });
    else if (Object.isString(wrapper)) wrapper = new Element(wrapper, attributes);
    else wrapper = new Element('div', wrapper);
    if (element.parentNode)
      element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);
    return wrapper;
  },

  inspect: function(element) {
    element = $(element);
    var result = '<' + element.tagName.toLowerCase();
    $H({'id': 'id', 'className': 'class'}).each(function(pair) {
      var property = pair.first(), attribute = pair.last();
      var value = (element[property] || '').toString();
      if (value) result += ' ' + attribute + '=' + value.inspect(true);
    });
    return result + '>';
  },

  recursivelyCollect: function(element, property) {
    element = $(element);
    var elements = [];
    while (element = element[property])
      if (element.nodeType == 1)
        elements.push(Element.extend(element));
    return elements;
  },

  ancestors: function(element) {
    return $(element).recursivelyCollect('parentNode');
  },

  descendants: function(element) {
    return $(element).select("*");
  },

  firstDescendant: function(element) {
    element = $(element).firstChild;
    while (element && element.nodeType != 1) element = element.nextSibling;
    return $(element);
  },

  immediateDescendants: function(element) {
    if (!(element = $(element).firstChild)) return [];
    while (element && element.nodeType != 1) element = element.nextSibling;
    if (element) return [element].concat($(element).nextSiblings());
    return [];
  },

  previousSiblings: function(element) {
    return $(element).recursivelyCollect('previousSibling');
  },

  nextSiblings: function(element) {
    return $(element).recursivelyCollect('nextSibling');
  },

  siblings: function(element) {
    element = $(element);
    return element.previousSiblings().reverse().concat(element.nextSiblings());
  },

  match: function(element, selector) {
    if (Object.isString(selector))
      selector = new Selector(selector);
    return selector.match($(element));
  },

  up: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(element.parentNode);
    var ancestors = element.ancestors();
    return Object.isNumber(expression) ? ancestors[expression] :
      Selector.findElement(ancestors, expression, index);
  },

  down: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return element.firstDescendant();
    return Object.isNumber(expression) ? element.descendants()[expression] :
      element.select(expression)[index || 0];
  },

  previous: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(Selector.handlers.previousElementSibling(element));
    var previousSiblings = element.previousSiblings();
    return Object.isNumber(expression) ? previousSiblings[expression] :
      Selector.findElement(previousSiblings, expression, index);
  },

  next: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(Selector.handlers.nextElementSibling(element));
    var nextSiblings = element.nextSiblings();
    return Object.isNumber(expression) ? nextSiblings[expression] :
      Selector.findElement(nextSiblings, expression, index);
  },

  select: function() {
    var args = $A(arguments), element = $(args.shift());
    return Selector.findChildElements(element, args);
  },

  adjacent: function() {
    var args = $A(arguments), element = $(args.shift());
    return Selector.findChildElements(element.parentNode, args).without(element);
  },

  identify: function(element) {
    element = $(element);
    var id = element.readAttribute('id'), self = arguments.callee;
    if (id) return id;
    do { id = 'anonymous_element_' + self.counter++ } while ($(id));
    element.writeAttribute('id', id);
    return id;
  },

  readAttribute: function(element, name) {
    element = $(element);
    if (Prototype.Browser.IE) {
      var t = Element._attributeTranslations.read;
      if (t.values[name]) return t.values[name](element, name);
      if (t.names[name]) name = t.names[name];
      if (name.include(':')) {
        return (!element.attributes || !element.attributes[name]) ? null :
         element.attributes[name].value;
      }
    }
    return element.getAttribute(name);
  },

  writeAttribute: function(element, name, value) {
    element = $(element);
    var attributes = { }, t = Element._attributeTranslations.write;

    if (typeof name == 'object') attributes = name;
    else attributes[name] = Object.isUndefined(value) ? true : value;

    for (var attr in attributes) {
      name = t.names[attr] || attr;
      value = attributes[attr];
      if (t.values[attr]) name = t.values[attr](element, value);
      if (value === false || value === null)
        element.removeAttribute(name);
      else if (value === true)
        element.setAttribute(name, name);
      else element.setAttribute(name, value);
    }
    return element;
  },

  getHeight: function(element) {
    return $(element).getDimensions().height;
  },

  getWidth: function(element) {
    return $(element).getDimensions().width;
  },

  classNames: function(element) {
    return new Element.ClassNames(element);
  },

  hasClassName: function(element, className) {
    if (!(element = $(element))) return;
    var elementClassName = element.className;
    return (elementClassName.length > 0 && (elementClassName == className ||
      new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
  },

  addClassName: function(element, className) {
    if (!(element = $(element))) return;
    if (!element.hasClassName(className))
      element.className += (element.className ? ' ' : '') + className;
    return element;
  },

  removeClassName: function(element, className) {
    if (!(element = $(element))) return;
    element.className = element.className.replace(
      new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').strip();
    return element;
  },

  toggleClassName: function(element, className) {
    if (!(element = $(element))) return;
    return element[element.hasClassName(className) ?
      'removeClassName' : 'addClassName'](className);
  },

  // removes whitespace-only text node children
  cleanWhitespace: function(element) {
    element = $(element);
    var node = element.firstChild;
    while (node) {
      var nextNode = node.nextSibling;
      if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        element.removeChild(node);
      node = nextNode;
    }
    return element;
  },

  empty: function(element) {
    return $(element).innerHTML.blank();
  },

  descendantOf: function(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    var originalAncestor = ancestor;

    if (element.compareDocumentPosition)
      return (element.compareDocumentPosition(ancestor) & 8) === 8;

    if (element.sourceIndex && !Prototype.Browser.Opera) {
      var e = element.sourceIndex, a = ancestor.sourceIndex,
       nextAncestor = ancestor.nextSibling;
      if (!nextAncestor) {
        do { ancestor = ancestor.parentNode; }
        while (!(nextAncestor = ancestor.nextSibling) && ancestor.parentNode);
      }
      if (nextAncestor && nextAncestor.sourceIndex)
       return (e > a && e < nextAncestor.sourceIndex);
    }

    while (element = element.parentNode)
      if (element == originalAncestor) return true;
    return false;
  },

  scrollTo: function(element) {
    element = $(element);
    var pos = element.cumulativeOffset();
    window.scrollTo(pos[0], pos[1]);
    return element;
  },

  getStyle: function(element, style) {
    element = $(element);
    style = style == 'float' ? 'cssFloat' : style.camelize();
    var value = element.style[style];
    if (!value) {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }
    if (style == 'opacity') return value ? parseFloat(value) : 1.0;
    return value == 'auto' ? null : value;
  },

  getOpacity: function(element) {
    return $(element).getStyle('opacity');
  },

  setStyle: function(element, styles) {
    element = $(element);
    var elementStyle = element.style, match;
    if (Object.isString(styles)) {
      element.style.cssText += ';' + styles;
      return styles.include('opacity') ?
        element.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]) : element;
    }
    for (var property in styles)
      if (property == 'opacity') element.setOpacity(styles[property]);
      else
        elementStyle[(property == 'float' || property == 'cssFloat') ?
          (Object.isUndefined(elementStyle.styleFloat) ? 'cssFloat' : 'styleFloat') :
            property] = styles[property];

    return element;
  },

  setOpacity: function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1 || value === '') ? '' :
      (value < 0.00001) ? 0 : value;
    return element;
  },

  getDimensions: function(element) {
    element = $(element);
    var display = $(element).getStyle('display');
    if (display != 'none' && display != null) // Safari bug
      return {width: element.offsetWidth, height: element.offsetHeight};

    // All *Width and *Height properties give 0 on elements with display none,
    // so enable the element temporarily
    var els = element.style;
    var originalVisibility = els.visibility;
    var originalPosition = els.position;
    var originalDisplay = els.display;
    els.visibility = 'hidden';
    els.position = 'absolute';
    els.display = 'block';
    var originalWidth = element.clientWidth;
    var originalHeight = element.clientHeight;
    els.display = originalDisplay;
    els.position = originalPosition;
    els.visibility = originalVisibility;
    return {width: originalWidth, height: originalHeight};
  },

  makePositioned: function(element) {
    element = $(element);
    var pos = Element.getStyle(element, 'position');
    if (pos == 'static' || !pos) {
      element._madePositioned = true;
      element.style.position = 'relative';
      // Opera returns the offset relative to the positioning context, when an
      // element is position relative but top and left have not been defined
      if (window.opera) {
        element.style.top = 0;
        element.style.left = 0;
      }
    }
    return element;
  },

  undoPositioned: function(element) {
    element = $(element);
    if (element._madePositioned) {
      element._madePositioned = undefined;
      element.style.position =
        element.style.top =
        element.style.left =
        element.style.bottom =
        element.style.right = '';
    }
    return element;
  },

  makeClipping: function(element) {
    element = $(element);
    if (element._overflow) return element;
    element._overflow = Element.getStyle(element, 'overflow') || 'auto';
    if (element._overflow !== 'hidden')
      element.style.overflow = 'hidden';
    return element;
  },

  undoClipping: function(element) {
    element = $(element);
    if (!element._overflow) return element;
    element.style.overflow = element._overflow == 'auto' ? '' : element._overflow;
    element._overflow = null;
    return element;
  },

  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  positionedOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (element.tagName == 'BODY') break;
        var p = Element.getStyle(element, 'position');
        if (p !== 'static') break;
      }
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  absolutize: function(element) {
    element = $(element);
    if (element.getStyle('position') == 'absolute') return;
    // Position.prepare(); // To be done manually by Scripty when it needs it.

    var offsets = element.positionedOffset();
    var top     = offsets[1];
    var left    = offsets[0];
    var width   = element.clientWidth;
    var height  = element.clientHeight;

    element._originalLeft   = left - parseFloat(element.style.left  || 0);
    element._originalTop    = top  - parseFloat(element.style.top || 0);
    element._originalWidth  = element.style.width;
    element._originalHeight = element.style.height;

    element.style.position = 'absolute';
    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.width  = width + 'px';
    element.style.height = height + 'px';
    return element;
  },

  relativize: function(element) {
    element = $(element);
    if (element.getStyle('position') == 'relative') return;
    // Position.prepare(); // To be done manually by Scripty when it needs it.

    element.style.position = 'relative';
    var top  = parseFloat(element.style.top  || 0) - (element._originalTop || 0);
    var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);

    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.height = element._originalHeight;
    element.style.width  = element._originalWidth;
    return element;
  },

  cumulativeScrollOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  getOffsetParent: function(element) {
    if (element.offsetParent) return $(element.offsetParent);
    if (element == document.body) return $(element);

    while ((element = element.parentNode) && element != document.body)
      if (Element.getStyle(element, 'position') != 'static')
        return $(element);

    return $(document.body);
  },

  viewportOffset: function(forElement) {
    var valueT = 0, valueL = 0;

    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;

      // Safari fix
      if (element.offsetParent == document.body &&
        Element.getStyle(element, 'position') == 'absolute') break;

    } while (element = element.offsetParent);

    element = forElement;
    do {
      if (!Prototype.Browser.Opera || element.tagName == 'BODY') {
        valueT -= element.scrollTop  || 0;
        valueL -= element.scrollLeft || 0;
      }
    } while (element = element.parentNode);

    return Element._returnOffset(valueL, valueT);
  },

  clonePosition: function(element, source) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, arguments[2] || { });

    // find page position of source
    source = $(source);
    var p = source.viewportOffset();

    // find coordinate system to use
    element = $(element);
    var delta = [0, 0];
    var parent = null;
    // delta [0,0] will do fine with position: fixed elements,
    // position:absolute needs offsetParent deltas
    if (Element.getStyle(element, 'position') == 'absolute') {
      parent = element.getOffsetParent();
      delta = parent.viewportOffset();
    }

    // correct by body offsets (fixes Safari)
    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }

    // set position
    if (options.setLeft)   element.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if (options.setTop)    element.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
    if (options.setWidth)  element.style.width = source.offsetWidth + 'px';
    if (options.setHeight) element.style.height = source.offsetHeight + 'px';
    return element;
  }
};

Element.Methods.identify.counter = 1;

Object.extend(Element.Methods, {
  getElementsBySelector: Element.Methods.select,
  childElements: Element.Methods.immediateDescendants
});

Element._attributeTranslations = {
  write: {
    names: {
      className: 'class',
      htmlFor:   'for'
    },
    values: { }
  }
};

if (Prototype.Browser.Opera) {
  Element.Methods.getStyle = Element.Methods.getStyle.wrap(
    function(proceed, element, style) {
      switch (style) {
        case 'left': case 'top': case 'right': case 'bottom':
          if (proceed(element, 'position') === 'static') return null;
        case 'height': case 'width':
          // returns '0px' for hidden elements; we want it to return null
          if (!Element.visible(element)) return null;

          // returns the border-box dimensions rather than the content-box
          // dimensions, so we subtract padding and borders from the value
          var dim = parseInt(proceed(element, style), 10);

          if (dim !== element['offset' + style.capitalize()])
            return dim + 'px';

          var properties;
          if (style === 'height') {
            properties = ['border-top-width', 'padding-top',
             'padding-bottom', 'border-bottom-width'];
          }
          else {
            properties = ['border-left-width', 'padding-left',
             'padding-right', 'border-right-width'];
          }
          return properties.inject(dim, function(memo, property) {
            var val = proceed(element, property);
            return val === null ? memo : memo - parseInt(val, 10);
          }) + 'px';
        default: return proceed(element, style);
      }
    }
  );

  Element.Methods.readAttribute = Element.Methods.readAttribute.wrap(
    function(proceed, element, attribute) {
      if (attribute === 'title') return element.title;
      return proceed(element, attribute);
    }
  );
}

else if (Prototype.Browser.IE) {
  // IE doesn't report offsets correctly for static elements, so we change them
  // to "relative" to get the values, then change them back.
  Element.Methods.getOffsetParent = Element.Methods.getOffsetParent.wrap(
    function(proceed, element) {
      element = $(element);
      var position = element.getStyle('position');
      if (position !== 'static') return proceed(element);
      element.setStyle({ position: 'relative' });
      var value = proceed(element);
      element.setStyle({ position: position });
      return value;
    }
  );

  $w('positionedOffset viewportOffset').each(function(method) {
    Element.Methods[method] = Element.Methods[method].wrap(
      function(proceed, element) {
        element = $(element);
        var position = element.getStyle('position');
        if (position !== 'static') return proceed(element);
        // Trigger hasLayout on the offset parent so that IE6 reports
        // accurate offsetTop and offsetLeft values for position: fixed.
        var offsetParent = element.getOffsetParent();
        if (offsetParent && offsetParent.getStyle('position') === 'fixed')
          offsetParent.setStyle({ zoom: 1 });
        element.setStyle({ position: 'relative' });
        var value = proceed(element);
        element.setStyle({ position: position });
        return value;
      }
    );
  });

  Element.Methods.getStyle = function(element, style) {
    element = $(element);
    style = (style == 'float' || style == 'cssFloat') ? 'styleFloat' : style.camelize();
    var value = element.style[style];
    if (!value && element.currentStyle) value = element.currentStyle[style];

    if (style == 'opacity') {
      if (value = (element.getStyle('filter') || '').match(/alpha\(opacity=(.*)\)/))
        if (value[1]) return parseFloat(value[1]) / 100;
      return 1.0;
    }

    if (value == 'auto') {
      if ((style == 'width' || style == 'height') && (element.getStyle('display') != 'none'))
        return element['offset' + style.capitalize()] + 'px';
      return null;
    }
    return value;
  };

  Element.Methods.setOpacity = function(element, value) {
    function stripAlpha(filter){
      return filter.replace(/alpha\([^\)]*\)/gi,'');
    }
    element = $(element);
    var currentStyle = element.currentStyle;
    if ((currentStyle && !currentStyle.hasLayout) ||
      (!currentStyle && element.style.zoom == 'normal'))
        element.style.zoom = 1;

    var filter = element.getStyle('filter'), style = element.style;
    if (value == 1 || value === '') {
      (filter = stripAlpha(filter)) ?
        style.filter = filter : style.removeAttribute('filter');
      return element;
    } else if (value < 0.00001) value = 0;
    style.filter = stripAlpha(filter) +
      'alpha(opacity=' + (value * 100) + ')';
    return element;
  };

  Element._attributeTranslations = {
    read: {
      names: {
        'class': 'className',
        'for':   'htmlFor'
      },
      values: {
        _getAttr: function(element, attribute) {
          return element.getAttribute(attribute, 2);
        },
        _getAttrNode: function(element, attribute) {
          var node = element.getAttributeNode(attribute);
          return node ? node.value : "";
        },
        _getEv: function(element, attribute) {
          attribute = element.getAttribute(attribute);
          return attribute ? attribute.toString().slice(23, -2) : null;
        },
        _flag: function(element, attribute) {
          return $(element).hasAttribute(attribute) ? attribute : null;
        },
        style: function(element) {
          return element.style.cssText.toLowerCase();
        },
        title: function(element) {
          return element.title;
        }
      }
    }
  };

  Element._attributeTranslations.write = {
    names: Object.extend({
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing'
    }, Element._attributeTranslations.read.names),
    values: {
      checked: function(element, value) {
        element.checked = !!value;
      },

      style: function(element, value) {
        element.style.cssText = value ? value : '';
      }
    }
  };

  Element._attributeTranslations.has = {};

  $w('colSpan rowSpan vAlign dateTime accessKey tabIndex ' +
      'encType maxLength readOnly longDesc').each(function(attr) {
    Element._attributeTranslations.write.names[attr.toLowerCase()] = attr;
    Element._attributeTranslations.has[attr.toLowerCase()] = attr;
  });

  (function(v) {
    Object.extend(v, {
      href:        v._getAttr,
      src:         v._getAttr,
      type:        v._getAttr,
      action:      v._getAttrNode,
      disabled:    v._flag,
      checked:     v._flag,
      readonly:    v._flag,
      multiple:    v._flag,
      onload:      v._getEv,
      onunload:    v._getEv,
      onclick:     v._getEv,
      ondblclick:  v._getEv,
      onmousedown: v._getEv,
      onmouseup:   v._getEv,
      onmouseover: v._getEv,
      onmousemove: v._getEv,
      onmouseout:  v._getEv,
      onfocus:     v._getEv,
      onblur:      v._getEv,
      onkeypress:  v._getEv,
      onkeydown:   v._getEv,
      onkeyup:     v._getEv,
      onsubmit:    v._getEv,
      onreset:     v._getEv,
      onselect:    v._getEv,
      onchange:    v._getEv
    });
  })(Element._attributeTranslations.read.values);
}

else if (Prototype.Browser.Gecko && /rv:1\.8\.0/.test(navigator.userAgent)) {
  Element.Methods.setOpacity = function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1) ? 0.999999 :
      (value === '') ? '' : (value < 0.00001) ? 0 : value;
    return element;
  };
}

else if (Prototype.Browser.WebKit) {
  Element.Methods.setOpacity = function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1 || value === '') ? '' :
      (value < 0.00001) ? 0 : value;

    if (value == 1)
      if(element.tagName == 'IMG' && element.width) {
        element.width++; element.width--;
      } else try {
        var n = document.createTextNode(' ');
        element.appendChild(n);
        element.removeChild(n);
      } catch (e) { }

    return element;
  };

  // Safari returns margins on body which is incorrect if the child is absolutely
  // positioned.  For performance reasons, redefine Element#cumulativeOffset for
  // KHTML/WebKit only.
  Element.Methods.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body)
        if (Element.getStyle(element, 'position') == 'absolute') break;

      element = element.offsetParent;
    } while (element);

    return Element._returnOffset(valueL, valueT);
  };
}

if (Prototype.Browser.IE || Prototype.Browser.Opera) {
  // IE and Opera are missing .innerHTML support for TABLE-related and SELECT elements
  Element.Methods.update = function(element, content) {
    element = $(element);

    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) return element.update().insert(content);

    content = Object.toHTML(content);
    var tagName = element.tagName.toUpperCase();

    if (tagName in Element._insertionTranslations.tags) {
      $A(element.childNodes).each(function(node) { element.removeChild(node) });
      Element._getContentFromAnonymousElement(tagName, content.stripScripts())
        .each(function(node) { element.appendChild(node) });
    }
    else element.innerHTML = content.stripScripts();

    content.evalScripts.bind(content).defer();
    return element;
  };
}

if ('outerHTML' in document.createElement('div')) {
  Element.Methods.replace = function(element, content) {
    element = $(element);

    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) {
      element.parentNode.replaceChild(content, element);
      return element;
    }

    content = Object.toHTML(content);
    var parent = element.parentNode, tagName = parent.tagName.toUpperCase();

    if (Element._insertionTranslations.tags[tagName]) {
      var nextSibling = element.next();
      var fragments = Element._getContentFromAnonymousElement(tagName, content.stripScripts());
      parent.removeChild(element);
      if (nextSibling)
        fragments.each(function(node) { parent.insertBefore(node, nextSibling) });
      else
        fragments.each(function(node) { parent.appendChild(node) });
    }
    else element.outerHTML = content.stripScripts();

    content.evalScripts.bind(content).defer();
    return element;
  };
}

Element._returnOffset = function(l, t) {
  var result = [l, t];
  result.left = l;
  result.top = t;
  return result;
};

Element._getContentFromAnonymousElement = function(tagName, html) {
  var div = new Element('div'), t = Element._insertionTranslations.tags[tagName];
  if (t) {
    div.innerHTML = t[0] + html + t[1];
    t[2].times(function() { div = div.firstChild });
  } else div.innerHTML = html;
  return $A(div.childNodes);
};

Element._insertionTranslations = {
  before: function(element, node) {
    element.parentNode.insertBefore(node, element);
  },
  top: function(element, node) {
    element.insertBefore(node, element.firstChild);
  },
  bottom: function(element, node) {
    element.appendChild(node);
  },
  after: function(element, node) {
    element.parentNode.insertBefore(node, element.nextSibling);
  },
  tags: {
    TABLE:  ['<table>',                '</table>',                   1],
    TBODY:  ['<table><tbody>',         '</tbody></table>',           2],
    TR:     ['<table><tbody><tr>',     '</tr></tbody></table>',      3],
    TD:     ['<table><tbody><tr><td>', '</td></tr></tbody></table>', 4],
    SELECT: ['<select>',               '</select>',                  1]
  }
};

(function() {
  Object.extend(this.tags, {
    THEAD: this.tags.TBODY,
    TFOOT: this.tags.TBODY,
    TH:    this.tags.TD
  });
}).call(Element._insertionTranslations);

Element.Methods.Simulated = {
  hasAttribute: function(element, attribute) {
    attribute = Element._attributeTranslations.has[attribute] || attribute;
    var node = $(element).getAttributeNode(attribute);
    return node && node.specified;
  }
};

Element.Methods.ByTag = { };

Object.extend(Element, Element.Methods);

if (!Prototype.BrowserFeatures.ElementExtensions &&
    document.createElement('div').__proto__) {
  window.HTMLElement = { };
  window.HTMLElement.prototype = document.createElement('div').__proto__;
  Prototype.BrowserFeatures.ElementExtensions = true;
}

Element.extend = (function() {
  if (Prototype.BrowserFeatures.SpecificElementExtensions)
    return Prototype.K;

  var Methods = { }, ByTag = Element.Methods.ByTag;

  var extend = Object.extend(function(element) {
    if (!element || element._extendedByPrototype ||
        element.nodeType != 1 || element == window) return element;

    var methods = Object.clone(Methods),
      tagName = element.tagName, property, value;

    // extend methods for specific tags
    if (ByTag[tagName]) Object.extend(methods, ByTag[tagName]);

    for (property in methods) {
      value = methods[property];
      if (Object.isFunction(value) && !(property in element))
        element[property] = value.methodize();
    }

    element._extendedByPrototype = Prototype.emptyFunction;
    return element;

  }, {
    refresh: function() {
      // extend methods for all tags (Safari doesn't need this)
      if (!Prototype.BrowserFeatures.ElementExtensions) {
        Object.extend(Methods, Element.Methods);
        Object.extend(Methods, Element.Methods.Simulated);
      }
    }
  });

  extend.refresh();
  return extend;
})();

Element.hasAttribute = function(element, attribute) {
  if (element.hasAttribute) return element.hasAttribute(attribute);
  return Element.Methods.Simulated.hasAttribute(element, attribute);
};

Element.addMethods = function(methods) {
  var F = Prototype.BrowserFeatures, T = Element.Methods.ByTag;

  if (!methods) {
    Object.extend(Form, Form.Methods);
    Object.extend(Form.Element, Form.Element.Methods);
    Object.extend(Element.Methods.ByTag, {
      "FORM":     Object.clone(Form.Methods),
      "INPUT":    Object.clone(Form.Element.Methods),
      "SELECT":   Object.clone(Form.Element.Methods),
      "TEXTAREA": Object.clone(Form.Element.Methods)
    });
  }

  if (arguments.length == 2) {
    var tagName = methods;
    methods = arguments[1];
  }

  if (!tagName) Object.extend(Element.Methods, methods || { });
  else {
    if (Object.isArray(tagName)) tagName.each(extend);
    else extend(tagName);
  }

  function extend(tagName) {
    tagName = tagName.toUpperCase();
    if (!Element.Methods.ByTag[tagName])
      Element.Methods.ByTag[tagName] = { };
    Object.extend(Element.Methods.ByTag[tagName], methods);
  }

  function copy(methods, destination, onlyIfAbsent) {
    onlyIfAbsent = onlyIfAbsent || false;
    for (var property in methods) {
      var value = methods[property];
      if (!Object.isFunction(value)) continue;
      if (!onlyIfAbsent || !(property in destination))
        destination[property] = value.methodize();
    }
  }

  function findDOMClass(tagName) {
    var klass;
    var trans = {
      "OPTGROUP": "OptGroup", "TEXTAREA": "TextArea", "P": "Paragraph",
      "FIELDSET": "FieldSet", "UL": "UList", "OL": "OList", "DL": "DList",
      "DIR": "Directory", "H1": "Heading", "H2": "Heading", "H3": "Heading",
      "H4": "Heading", "H5": "Heading", "H6": "Heading", "Q": "Quote",
      "INS": "Mod", "DEL": "Mod", "A": "Anchor", "IMG": "Image", "CAPTION":
      "TableCaption", "COL": "TableCol", "COLGROUP": "TableCol", "THEAD":
      "TableSection", "TFOOT": "TableSection", "TBODY": "TableSection", "TR":
      "TableRow", "TH": "TableCell", "TD": "TableCell", "FRAMESET":
      "FrameSet", "IFRAME": "IFrame"
    };
    if (trans[tagName]) klass = 'HTML' + trans[tagName] + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName.capitalize() + 'Element';
    if (window[klass]) return window[klass];

    window[klass] = { };
    window[klass].prototype = document.createElement(tagName).__proto__;
    return window[klass];
  }

  if (F.ElementExtensions) {
    copy(Element.Methods, HTMLElement.prototype);
    copy(Element.Methods.Simulated, HTMLElement.prototype, true);
  }

  if (F.SpecificElementExtensions) {
    for (var tag in Element.Methods.ByTag) {
      var klass = findDOMClass(tag);
      if (Object.isUndefined(klass)) continue;
      copy(T[tag], klass.prototype);
    }
  }

  Object.extend(Element, Element.Methods);
  delete Element.ByTag;

  if (Element.extend.refresh) Element.extend.refresh();
  Element.cache = { };
};

document.viewport = {
  getDimensions: function() {
    var dimensions = { };
    var B = Prototype.Browser;
    $w('width height').each(function(d) {
      var D = d.capitalize();
      dimensions[d] = (B.WebKit && !document.evaluate) ? self['inner' + D] :
        (B.Opera) ? document.body['client' + D] : document.documentElement['client' + D];
    });
    return dimensions;
  },

  getWidth: function() {
    return this.getDimensions().width;
  },

  getHeight: function() {
    return this.getDimensions().height;
  },

  getScrollOffsets: function() {
    return Element._returnOffset(
      window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
  }
};
/* Portions of the Selector class are derived from Jack Slocum’s DomQuery,
 * part of YUI-Ext version 0.40, distributed under the terms of an MIT-style
 * license.  Please see http://www.yui-ext.com/ for more information. */

var Selector = Class.create({
  initialize: function(expression) {
    this.expression = expression.strip();
    this.compileMatcher();
  },

  shouldUseXPath: function() {
    if (!Prototype.BrowserFeatures.XPath) return false;

    var e = this.expression;

    // Safari 3 chokes on :*-of-type and :empty
    if (Prototype.Browser.WebKit &&
     (e.include("-of-type") || e.include(":empty")))
      return false;

    // XPath can't do namespaced attributes, nor can it read
    // the "checked" property from DOM nodes
    if ((/(\[[\w-]*?:|:checked)/).test(this.expression))
      return false;

    return true;
  },

  compileMatcher: function() {
    if (this.shouldUseXPath())
      return this.compileXPathMatcher();

    var e = this.expression, ps = Selector.patterns, h = Selector.handlers,
        c = Selector.criteria, le, p, m;

    if (Selector._cache[e]) {
      this.matcher = Selector._cache[e];
      return;
    }

    this.matcher = ["this.matcher = function(root) {",
                    "var r = root, h = Selector.handlers, c = false, n;"];

    while (e && le != e && (/\S/).test(e)) {
      le = e;
      for (var i in ps) {
        p = ps[i];
        if (m = e.match(p)) {
          this.matcher.push(Object.isFunction(c[i]) ? c[i](m) :
    	      new Template(c[i]).evaluate(m));
          e = e.replace(m[0], '');
          break;
        }
      }
    }

    this.matcher.push("return h.unique(n);\n}");
    eval(this.matcher.join('\n'));
    Selector._cache[this.expression] = this.matcher;
  },

  compileXPathMatcher: function() {
    var e = this.expression, ps = Selector.patterns,
        x = Selector.xpath, le, m;

    if (Selector._cache[e]) {
      this.xpath = Selector._cache[e]; return;
    }

    this.matcher = ['.//*'];
    while (e && le != e && (/\S/).test(e)) {
      le = e;
      for (var i in ps) {
        if (m = e.match(ps[i])) {
          this.matcher.push(Object.isFunction(x[i]) ? x[i](m) :
            new Template(x[i]).evaluate(m));
          e = e.replace(m[0], '');
          break;
        }
      }
    }

    this.xpath = this.matcher.join('');
    Selector._cache[this.expression] = this.xpath;
  },

  findElements: function(root) {
    root = root || document;
    if (this.xpath) return document._getElementsByXPath(this.xpath, root);
    return this.matcher(root);
  },

  match: function(element) {
    this.tokens = [];

    var e = this.expression, ps = Selector.patterns, as = Selector.assertions;
    var le, p, m;

    while (e && le !== e && (/\S/).test(e)) {
      le = e;
      for (var i in ps) {
        p = ps[i];
        if (m = e.match(p)) {
          // use the Selector.assertions methods unless the selector
          // is too complex.
          if (as[i]) {
            this.tokens.push([i, Object.clone(m)]);
            e = e.replace(m[0], '');
          } else {
            // reluctantly do a document-wide search
            // and look for a match in the array
            return this.findElements(document).include(element);
          }
        }
      }
    }

    var match = true, name, matches;
    for (var i = 0, token; token = this.tokens[i]; i++) {
      name = token[0], matches = token[1];
      if (!Selector.assertions[name](element, matches)) {
        match = false; break;
      }
    }

    return match;
  },

  toString: function() {
    return this.expression;
  },

  inspect: function() {
    return "#<Selector:" + this.expression.inspect() + ">";
  }
});

Object.extend(Selector, {
  _cache: { },

  xpath: {
    descendant:   "//*",
    child:        "/*",
    adjacent:     "/following-sibling::*[1]",
    laterSibling: '/following-sibling::*',
    tagName:      function(m) {
      if (m[1] == '*') return '';
      return "[local-name()='" + m[1].toLowerCase() +
             "' or local-name()='" + m[1].toUpperCase() + "']";
    },
    className:    "[contains(concat(' ', @class, ' '), ' #{1} ')]",
    id:           "[@id='#{1}']",
    attrPresence: function(m) {
      m[1] = m[1].toLowerCase();
      return new Template("[@#{1}]").evaluate(m);
    },
    attr: function(m) {
      m[1] = m[1].toLowerCase();
      m[3] = m[5] || m[6];
      return new Template(Selector.xpath.operators[m[2]]).evaluate(m);
    },
    pseudo: function(m) {
      var h = Selector.xpath.pseudos[m[1]];
      if (!h) return '';
      if (Object.isFunction(h)) return h(m);
      return new Template(Selector.xpath.pseudos[m[1]]).evaluate(m);
    },
    operators: {
      '=':  "[@#{1}='#{3}']",
      '!=': "[@#{1}!='#{3}']",
      '^=': "[starts-with(@#{1}, '#{3}')]",
      '$=': "[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') + 1))='#{3}']",
      '*=': "[contains(@#{1}, '#{3}')]",
      '~=': "[contains(concat(' ', @#{1}, ' '), ' #{3} ')]",
      '|=': "[contains(concat('-', @#{1}, '-'), '-#{3}-')]"
    },
    pseudos: {
      'first-child': '[not(preceding-sibling::*)]',
      'last-child':  '[not(following-sibling::*)]',
      'only-child':  '[not(preceding-sibling::* or following-sibling::*)]',
      'empty':       "[count(*) = 0 and (count(text()) = 0 or translate(text(), ' \t\r\n', '') = '')]",
      'checked':     "[@checked]",
      'disabled':    "[@disabled]",
      'enabled':     "[not(@disabled)]",
      'not': function(m) {
        var e = m[6], p = Selector.patterns,
            x = Selector.xpath, le, v;

        var exclusion = [];
        while (e && le != e && (/\S/).test(e)) {
          le = e;
          for (var i in p) {
            if (m = e.match(p[i])) {
              v = Object.isFunction(x[i]) ? x[i](m) : new Template(x[i]).evaluate(m);
              exclusion.push("(" + v.substring(1, v.length - 1) + ")");
              e = e.replace(m[0], '');
              break;
            }
          }
        }
        return "[not(" + exclusion.join(" and ") + ")]";
      },
      'nth-child':      function(m) {
        return Selector.xpath.pseudos.nth("(count(./preceding-sibling::*) + 1) ", m);
      },
      'nth-last-child': function(m) {
        return Selector.xpath.pseudos.nth("(count(./following-sibling::*) + 1) ", m);
      },
      'nth-of-type':    function(m) {
        return Selector.xpath.pseudos.nth("position() ", m);
      },
      'nth-last-of-type': function(m) {
        return Selector.xpath.pseudos.nth("(last() + 1 - position()) ", m);
      },
      'first-of-type':  function(m) {
        m[6] = "1"; return Selector.xpath.pseudos['nth-of-type'](m);
      },
      'last-of-type':   function(m) {
        m[6] = "1"; return Selector.xpath.pseudos['nth-last-of-type'](m);
      },
      'only-of-type':   function(m) {
        var p = Selector.xpath.pseudos; return p['first-of-type'](m) + p['last-of-type'](m);
      },
      nth: function(fragment, m) {
        var mm, formula = m[6], predicate;
        if (formula == 'even') formula = '2n+0';
        if (formula == 'odd')  formula = '2n+1';
        if (mm = formula.match(/^(\d+)$/)) // digit only
          return '[' + fragment + "= " + mm[1] + ']';
        if (mm = formula.match(/^(-?\d*)?n(([+-])(\d+))?/)) { // an+b
          if (mm[1] == "-") mm[1] = -1;
          var a = mm[1] ? Number(mm[1]) : 1;
          var b = mm[2] ? Number(mm[2]) : 0;
          predicate = "[((#{fragment} - #{b}) mod #{a} = 0) and " +
          "((#{fragment} - #{b}) div #{a} >= 0)]";
          return new Template(predicate).evaluate({
            fragment: fragment, a: a, b: b });
        }
      }
    }
  },

  criteria: {
    tagName:      'n = h.tagName(n, r, "#{1}", c);      c = false;',
    className:    'n = h.className(n, r, "#{1}", c);    c = false;',
    id:           'n = h.id(n, r, "#{1}", c);           c = false;',
    attrPresence: 'n = h.attrPresence(n, r, "#{1}", c); c = false;',
    attr: function(m) {
      m[3] = (m[5] || m[6]);
      return new Template('n = h.attr(n, r, "#{1}", "#{3}", "#{2}", c); c = false;').evaluate(m);
    },
    pseudo: function(m) {
      if (m[6]) m[6] = m[6].replace(/"/g, '\\"');
      return new Template('n = h.pseudo(n, "#{1}", "#{6}", r, c); c = false;').evaluate(m);
    },
    descendant:   'c = "descendant";',
    child:        'c = "child";',
    adjacent:     'c = "adjacent";',
    laterSibling: 'c = "laterSibling";'
  },

  patterns: {
    // combinators must be listed first
    // (and descendant needs to be last combinator)
    laterSibling: /^\s*~\s*/,
    child:        /^\s*>\s*/,
    adjacent:     /^\s*\+\s*/,
    descendant:   /^\s/,

    // selectors follow
    tagName:      /^\s*(\*|[\w\-]+)(\b|$)?/,
    id:           /^#([\w\-\*]+)(\b|$)/,
    className:    /^\.([\w\-\*]+)(\b|$)/,
    pseudo:
/^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|(?=\s|[:+~>]))/,
    attrPresence: /^\[([\w]+)\]/,
    attr:         /\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\4]*?)\4|([^'"][^\]]*?)))?\]/
  },

  // for Selector.match and Element#match
  assertions: {
    tagName: function(element, matches) {
      return matches[1].toUpperCase() == element.tagName.toUpperCase();
    },

    className: function(element, matches) {
      return Element.hasClassName(element, matches[1]);
    },

    id: function(element, matches) {
      return element.id === matches[1];
    },

    attrPresence: function(element, matches) {
      return Element.hasAttribute(element, matches[1]);
    },

    attr: function(element, matches) {
      var nodeValue = Element.readAttribute(element, matches[1]);
      return nodeValue && Selector.operators[matches[2]](nodeValue, matches[5] || matches[6]);
    }
  },

  handlers: {
    // UTILITY FUNCTIONS
    // joins two collections
    concat: function(a, b) {
      for (var i = 0, node; node = b[i]; i++)
        a.push(node);
      return a;
    },

    // marks an array of nodes for counting
    mark: function(nodes) {
      var _true = Prototype.emptyFunction;
      for (var i = 0, node; node = nodes[i]; i++)
        node._countedByPrototype = _true;
      return nodes;
    },

    unmark: function(nodes) {
      for (var i = 0, node; node = nodes[i]; i++)
        node._countedByPrototype = undefined;
      return nodes;
    },

    // mark each child node with its position (for nth calls)
    // "ofType" flag indicates whether we're indexing for nth-of-type
    // rather than nth-child
    index: function(parentNode, reverse, ofType) {
      parentNode._countedByPrototype = Prototype.emptyFunction;
      if (reverse) {
        for (var nodes = parentNode.childNodes, i = nodes.length - 1, j = 1; i >= 0; i--) {
          var node = nodes[i];
          if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
        }
      } else {
        for (var i = 0, j = 1, nodes = parentNode.childNodes; node = nodes[i]; i++)
          if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
      }
    },

    // filters out duplicates and extends all nodes
    unique: function(nodes) {
      if (nodes.length == 0) return nodes;
      var results = [], n;
      for (var i = 0, l = nodes.length; i < l; i++)
        if (!(n = nodes[i])._countedByPrototype) {
          n._countedByPrototype = Prototype.emptyFunction;
          results.push(Element.extend(n));
        }
      return Selector.handlers.unmark(results);
    },

    // COMBINATOR FUNCTIONS
    descendant: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        h.concat(results, node.getElementsByTagName('*'));
      return results;
    },

    child: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        for (var j = 0, child; child = node.childNodes[j]; j++)
          if (child.nodeType == 1 && child.tagName != '!') results.push(child);
      }
      return results;
    },

    adjacent: function(nodes) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        var next = this.nextElementSibling(node);
        if (next) results.push(next);
      }
      return results;
    },

    laterSibling: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        h.concat(results, Element.nextSiblings(node));
      return results;
    },

    nextElementSibling: function(node) {
      while (node = node.nextSibling)
	      if (node.nodeType == 1) return node;
      return null;
    },

    previousElementSibling: function(node) {
      while (node = node.previousSibling)
        if (node.nodeType == 1) return node;
      return null;
    },

    // TOKEN FUNCTIONS
    tagName: function(nodes, root, tagName, combinator) {
      var uTagName = tagName.toUpperCase();
      var results = [], h = Selector.handlers;
      if (nodes) {
        if (combinator) {
          // fastlane for ordinary descendant combinators
          if (combinator == "descendant") {
            for (var i = 0, node; node = nodes[i]; i++)
              h.concat(results, node.getElementsByTagName(tagName));
            return results;
          } else nodes = this[combinator](nodes);
          if (tagName == "*") return nodes;
        }
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.tagName.toUpperCase() === uTagName) results.push(node);
        return results;
      } else return root.getElementsByTagName(tagName);
    },

    id: function(nodes, root, id, combinator) {
      var targetNode = $(id), h = Selector.handlers;
      if (!targetNode) return [];
      if (!nodes && root == document) return [targetNode];
      if (nodes) {
        if (combinator) {
          if (combinator == 'child') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (targetNode.parentNode == node) return [targetNode];
          } else if (combinator == 'descendant') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (Element.descendantOf(targetNode, node)) return [targetNode];
          } else if (combinator == 'adjacent') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (Selector.handlers.previousElementSibling(targetNode) == node)
                return [targetNode];
          } else nodes = h[combinator](nodes);
        }
        for (var i = 0, node; node = nodes[i]; i++)
          if (node == targetNode) return [targetNode];
        return [];
      }
      return (targetNode && Element.descendantOf(targetNode, root)) ? [targetNode] : [];
    },

    className: function(nodes, root, className, combinator) {
      if (nodes && combinator) nodes = this[combinator](nodes);
      return Selector.handlers.byClassName(nodes, root, className);
    },

    byClassName: function(nodes, root, className) {
      if (!nodes) nodes = Selector.handlers.descendant([root]);
      var needle = ' ' + className + ' ';
      for (var i = 0, results = [], node, nodeClassName; node = nodes[i]; i++) {
        nodeClassName = node.className;
        if (nodeClassName.length == 0) continue;
        if (nodeClassName == className || (' ' + nodeClassName + ' ').include(needle))
          results.push(node);
      }
      return results;
    },

    attrPresence: function(nodes, root, attr, combinator) {
      if (!nodes) nodes = root.getElementsByTagName("*");
      if (nodes && combinator) nodes = this[combinator](nodes);
      var results = [];
      for (var i = 0, node; node = nodes[i]; i++)
        if (Element.hasAttribute(node, attr)) results.push(node);
      return results;
    },

    attr: function(nodes, root, attr, value, operator, combinator) {
      if (!nodes) nodes = root.getElementsByTagName("*");
      if (nodes && combinator) nodes = this[combinator](nodes);
      var handler = Selector.operators[operator], results = [];
      for (var i = 0, node; node = nodes[i]; i++) {
        var nodeValue = Element.readAttribute(node, attr);
        if (nodeValue === null) continue;
        if (handler(nodeValue, value)) results.push(node);
      }
      return results;
    },

    pseudo: function(nodes, name, value, root, combinator) {
      if (nodes && combinator) nodes = this[combinator](nodes);
      if (!nodes) nodes = root.getElementsByTagName("*");
      return Selector.pseudos[name](nodes, value, root);
    }
  },

  pseudos: {
    'first-child': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        if (Selector.handlers.previousElementSibling(node)) continue;
          results.push(node);
      }
      return results;
    },
    'last-child': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        if (Selector.handlers.nextElementSibling(node)) continue;
          results.push(node);
      }
      return results;
    },
    'only-child': function(nodes, value, root) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!h.previousElementSibling(node) && !h.nextElementSibling(node))
          results.push(node);
      return results;
    },
    'nth-child':        function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root);
    },
    'nth-last-child':   function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, true);
    },
    'nth-of-type':      function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, false, true);
    },
    'nth-last-of-type': function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, true, true);
    },
    'first-of-type':    function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, "1", root, false, true);
    },
    'last-of-type':     function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, "1", root, true, true);
    },
    'only-of-type':     function(nodes, formula, root) {
      var p = Selector.pseudos;
      return p['last-of-type'](p['first-of-type'](nodes, formula, root), formula, root);
    },

    // handles the an+b logic
    getIndices: function(a, b, total) {
      if (a == 0) return b > 0 ? [b] : [];
      return $R(1, total).inject([], function(memo, i) {
        if (0 == (i - b) % a && (i - b) / a >= 0) memo.push(i);
        return memo;
      });
    },

    // handles nth(-last)-child, nth(-last)-of-type, and (first|last)-of-type
    nth: function(nodes, formula, root, reverse, ofType) {
      if (nodes.length == 0) return [];
      if (formula == 'even') formula = '2n+0';
      if (formula == 'odd')  formula = '2n+1';
      var h = Selector.handlers, results = [], indexed = [], m;
      h.mark(nodes);
      for (var i = 0, node; node = nodes[i]; i++) {
        if (!node.parentNode._countedByPrototype) {
          h.index(node.parentNode, reverse, ofType);
          indexed.push(node.parentNode);
        }
      }
      if (formula.match(/^\d+$/)) { // just a number
        formula = Number(formula);
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.nodeIndex == formula) results.push(node);
      } else if (m = formula.match(/^(-?\d*)?n(([+-])(\d+))?/)) { // an+b
        if (m[1] == "-") m[1] = -1;
        var a = m[1] ? Number(m[1]) : 1;
        var b = m[2] ? Number(m[2]) : 0;
        var indices = Selector.pseudos.getIndices(a, b, nodes.length);
        for (var i = 0, node, l = indices.length; node = nodes[i]; i++) {
          for (var j = 0; j < l; j++)
            if (node.nodeIndex == indices[j]) results.push(node);
        }
      }
      h.unmark(nodes);
      h.unmark(indexed);
      return results;
    },

    'empty': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        // IE treats comments as element nodes
        if (node.tagName == '!' || (node.firstChild && !node.innerHTML.match(/^\s*$/))) continue;
        results.push(node);
      }
      return results;
    },

    'not': function(nodes, selector, root) {
      var h = Selector.handlers, selectorType, m;
      var exclusions = new Selector(selector).findElements(root);
      h.mark(exclusions);
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!node._countedByPrototype) results.push(node);
      h.unmark(exclusions);
      return results;
    },

    'enabled': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!node.disabled) results.push(node);
      return results;
    },

    'disabled': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (node.disabled) results.push(node);
      return results;
    },

    'checked': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (node.checked) results.push(node);
      return results;
    }
  },

  operators: {
    '=':  function(nv, v) { return nv == v; },
    '!=': function(nv, v) { return nv != v; },
    '^=': function(nv, v) { return nv.startsWith(v); },
    '$=': function(nv, v) { return nv.endsWith(v); },
    '*=': function(nv, v) { return nv.include(v); },
    '~=': function(nv, v) { return (' ' + nv + ' ').include(' ' + v + ' '); },
    '|=': function(nv, v) { return ('-' + nv.toUpperCase() + '-').include('-' + v.toUpperCase() + '-'); }
  },

  split: function(expression) {
    var expressions = [];
    expression.scan(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/, function(m) {
      expressions.push(m[1].strip());
    });
    return expressions;
  },

  matchElements: function(elements, expression) {
    var matches = $$(expression), h = Selector.handlers;
    h.mark(matches);
    for (var i = 0, results = [], element; element = elements[i]; i++)
      if (element._countedByPrototype) results.push(element);
    h.unmark(matches);
    return results;
  },

  findElement: function(elements, expression, index) {
    if (Object.isNumber(expression)) {
      index = expression; expression = false;
    }
    return Selector.matchElements(elements, expression || '*')[index || 0];
  },

  findChildElements: function(element, expressions) {
    expressions = Selector.split(expressions.join(','));
    var results = [], h = Selector.handlers;
    for (var i = 0, l = expressions.length, selector; i < l; i++) {
      selector = new Selector(expressions[i].strip());
      h.concat(results, selector.findElements(element));
    }
    return (l > 1) ? h.unique(results) : results;
  }
});

if (Prototype.Browser.IE) {
  Object.extend(Selector.handlers, {
    // IE returns comment nodes on getElementsByTagName("*").
    // Filter them out.
    concat: function(a, b) {
      for (var i = 0, node; node = b[i]; i++)
        if (node.tagName !== "!") a.push(node);
      return a;
    },

    // IE improperly serializes _countedByPrototype in (inner|outer)HTML.
    unmark: function(nodes) {
      for (var i = 0, node; node = nodes[i]; i++)
        node.removeAttribute('_countedByPrototype');
      return nodes;
    }
  });
}

function $$() {
  return Selector.findChildElements(document, $A(arguments));
}
var Form = {
  reset: function(form) {
    $(form).reset();
    return form;
  },

  serializeElements: function(elements, options) {
    if (typeof options != 'object') options = { hash: !!options };
    else if (Object.isUndefined(options.hash)) options.hash = true;
    var key, value, submitted = false, submit = options.submit;

    var data = elements.inject({ }, function(result, element) {
      if (!element.disabled && element.name) {
        key = element.name; value = $(element).getValue();
        if (value != null && (element.type != 'submit' || (!submitted &&
            submit !== false && (!submit || key == submit) && (submitted = true)))) {
          if (key in result) {
            // a key is already present; construct an array of values
            if (!Object.isArray(result[key])) result[key] = [result[key]];
            result[key].push(value);
          }
          else result[key] = value;
        }
      }
      return result;
    });

    return options.hash ? data : Object.toQueryString(data);
  }
};

Form.Methods = {
  serialize: function(form, options) {
    return Form.serializeElements(Form.getElements(form), options);
  },

  getElements: function(form) {
    return $A($(form).getElementsByTagName('*')).inject([],
      function(elements, child) {
        if (Form.Element.Serializers[child.tagName.toLowerCase()])
          elements.push(Element.extend(child));
        return elements;
      }
    );
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name) return $A(inputs).map(Element.extend);

    for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) || (name && input.name != name))
        continue;
      matchingInputs.push(Element.extend(input));
    }

    return matchingInputs;
  },

  disable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('disable');
    return form;
  },

  enable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('enable');
    return form;
  },

  findFirstElement: function(form) {
    var elements = $(form).getElements().findAll(function(element) {
      return 'hidden' != element.type && !element.disabled;
    });
    var firstByIndex = elements.findAll(function(element) {
      return element.hasAttribute('tabIndex') && element.tabIndex >= 0;
    }).sortBy(function(element) { return element.tabIndex }).first();

    return firstByIndex ? firstByIndex : elements.find(function(element) {
      return ['input', 'select', 'textarea'].include(element.tagName.toLowerCase());
    });
  },

  focusFirstElement: function(form) {
    form = $(form);
    form.findFirstElement().activate();
    return form;
  },

  request: function(form, options) {
    form = $(form), options = Object.clone(options || { });

    var params = options.parameters, action = form.readAttribute('action') || '';
    if (action.blank()) action = window.location.href;
    options.parameters = form.serialize(true);

    if (params) {
      if (Object.isString(params)) params = params.toQueryParams();
      Object.extend(options.parameters, params);
    }

    if (form.hasAttribute('method') && !options.method)
      options.method = form.method;

    return new Ajax.Request(action, options);
  }
};

/*--------------------------------------------------------------------------*/

Form.Element = {
  focus: function(element) {
    $(element).focus();
    return element;
  },

  select: function(element) {
    $(element).select();
    return element;
  }
};

Form.Element.Methods = {
  serialize: function(element) {
    element = $(element);
    if (!element.disabled && element.name) {
      var value = element.getValue();
      if (value != undefined) {
        var pair = { };
        pair[element.name] = value;
        return Object.toQueryString(pair);
      }
    }
    return '';
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    return Form.Element.Serializers[method](element);
  },

  setValue: function(element, value) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    Form.Element.Serializers[method](element, value);
    return element;
  },

  clear: function(element) {
    $(element).value = '';
    return element;
  },

  present: function(element) {
    return $(element).value != '';
  },

  activate: function(element) {
    element = $(element);
    try {
      element.focus();
      if (element.select && (element.tagName.toLowerCase() != 'input' ||
          !['button', 'reset', 'submit'].include(element.type)))
        element.select();
    } catch (e) { }
    return element;
  },

  disable: function(element) {
    element = $(element);
    element.blur();
    element.disabled = true;
    return element;
  },

  enable: function(element) {
    element = $(element);
    element.disabled = false;
    return element;
  }
};

/*--------------------------------------------------------------------------*/

var Field = Form.Element;
var $F = Form.Element.Methods.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers = {
  input: function(element, value) {
    switch (element.type.toLowerCase()) {
      case 'checkbox':
      case 'radio':
        return Form.Element.Serializers.inputSelector(element, value);
      default:
        return Form.Element.Serializers.textarea(element, value);
    }
  },

  inputSelector: function(element, value) {
    if (Object.isUndefined(value)) return element.checked ? element.value : null;
    else element.checked = !!value;
  },

  textarea: function(element, value) {
    if (Object.isUndefined(value)) return element.value;
    else element.value = value;
  },

  select: function(element, index) {
    if (Object.isUndefined(index))
      return this[element.type == 'select-one' ?
        'selectOne' : 'selectMany'](element);
    else {
      var opt, value, single = !Object.isArray(index);
      for (var i = 0, length = element.length; i < length; i++) {
        opt = element.options[i];
        value = this.optionValue(opt);
        if (single) {
          if (value == index) {
            opt.selected = true;
            return;
          }
        }
        else opt.selected = index.include(value);
      }
    }
  },

  selectOne: function(element) {
    var index = element.selectedIndex;
    return index >= 0 ? this.optionValue(element.options[index]) : null;
  },

  selectMany: function(element) {
    var values, length = element.length;
    if (!length) return null;

    for (var i = 0, values = []; i < length; i++) {
      var opt = element.options[i];
      if (opt.selected) values.push(this.optionValue(opt));
    }
    return values;
  },

  optionValue: function(opt) {
    // extend element because hasAttribute may not be native
    return Element.extend(opt).hasAttribute('value') ? opt.value : opt.text;
  }
};

/*--------------------------------------------------------------------------*/

Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
  initialize: function($super, element, frequency, callback) {
    $super(callback, frequency);
    this.element   = $(element);
    this.lastValue = this.getValue();
  },

  execute: function() {
    var value = this.getValue();
    if (Object.isString(this.lastValue) && Object.isString(value) ?
        this.lastValue != value : String(this.lastValue) != String(value)) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
});

Form.Element.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = Class.create({
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    Form.getElements(this.element).each(this.registerCallback, this);
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        default:
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
});

Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
if (!window.Event) var Event = { };

Object.extend(Event, {
  KEY_BACKSPACE: 8,
  KEY_TAB:       9,
  KEY_RETURN:   13,
  KEY_ESC:      27,
  KEY_LEFT:     37,
  KEY_UP:       38,
  KEY_RIGHT:    39,
  KEY_DOWN:     40,
  KEY_DELETE:   46,
  KEY_HOME:     36,
  KEY_END:      35,
  KEY_PAGEUP:   33,
  KEY_PAGEDOWN: 34,
  KEY_INSERT:   45,

  cache: { },

  relatedTarget: function(event) {
    var element;
    switch(event.type) {
      case 'mouseover': element = event.fromElement; break;
      case 'mouseout':  element = event.toElement;   break;
      default: return null;
    }
    return Element.extend(element);
  }
});

Event.Methods = (function() {
  var isButton;

  if (Prototype.Browser.IE) {
    var buttonMap = { 0: 1, 1: 4, 2: 2 };
    isButton = function(event, code) {
      return event.button == buttonMap[code];
    };

  } else if (Prototype.Browser.WebKit) {
    isButton = function(event, code) {
      switch (code) {
        case 0: return event.which == 1 && !event.metaKey;
        case 1: return event.which == 1 && event.metaKey;
        default: return false;
      }
    };

  } else {
    isButton = function(event, code) {
      return event.which ? (event.which === code + 1) : (event.button === code);
    };
  }

  return {
    isLeftClick:   function(event) { return isButton(event, 0) },
    isMiddleClick: function(event) { return isButton(event, 1) },
    isRightClick:  function(event) { return isButton(event, 2) },

    element: function(event) {
      var node = Event.extend(event).target;
      return Element.extend(node.nodeType == Node.TEXT_NODE ? node.parentNode : node);
    },

    findElement: function(event, expression) {
      var element = Event.element(event);
      if (!expression) return element;
      var elements = [element].concat(element.ancestors());
      return Selector.findElement(elements, expression, 0);
    },

    pointer: function(event) {
      return {
        x: event.pageX || (event.clientX +
          (document.documentElement.scrollLeft || document.body.scrollLeft)),
        y: event.pageY || (event.clientY +
          (document.documentElement.scrollTop || document.body.scrollTop))
      };
    },

    pointerX: function(event) { return Event.pointer(event).x },
    pointerY: function(event) { return Event.pointer(event).y },

    stop: function(event) {
      Event.extend(event);
      event.preventDefault();
      event.stopPropagation();
      event.stopped = true;
    }
  };
})();

Event.extend = (function() {
  var methods = Object.keys(Event.Methods).inject({ }, function(m, name) {
    m[name] = Event.Methods[name].methodize();
    return m;
  });

  if (Prototype.Browser.IE) {
    Object.extend(methods, {
      stopPropagation: function() { this.cancelBubble = true },
      preventDefault:  function() { this.returnValue = false },
      inspect: function() { return "[object Event]" }
    });

    return function(event) {
      if (!event) return false;
      if (event._extendedByPrototype) return event;

      event._extendedByPrototype = Prototype.emptyFunction;
      var pointer = Event.pointer(event);
      Object.extend(event, {
        target: event.srcElement,
        relatedTarget: Event.relatedTarget(event),
        pageX:  pointer.x,
        pageY:  pointer.y
      });
      return Object.extend(event, methods);
    };

  } else {
    Event.prototype = Event.prototype || document.createEvent("HTMLEvents").__proto__;
    Object.extend(Event.prototype, methods);
    return Prototype.K;
  }
})();

Object.extend(Event, (function() {
  var cache = Event.cache;

  function getEventID(element) {
    if (element._prototypeEventID) return element._prototypeEventID[0];
    arguments.callee.id = arguments.callee.id || 1;
    return element._prototypeEventID = [++arguments.callee.id];
  }

  function getDOMEventName(eventName) {
    if (eventName && eventName.include(':')) return "dataavailable";
    return eventName;
  }

  function getCacheForID(id) {
    return cache[id] = cache[id] || { };
  }

  function getWrappersForEventName(id, eventName) {
    var c = getCacheForID(id);
    return c[eventName] = c[eventName] || [];
  }

  function createWrapper(element, eventName, handler) {
    var id = getEventID(element);
    var c = getWrappersForEventName(id, eventName);
    if (c.pluck("handler").include(handler)) return false;

    var wrapper = function(event) {
      if (!Event || !Event.extend ||
        (event.eventName && event.eventName != eventName))
          return false;

      Event.extend(event);
      handler.call(element, event);
    };

    wrapper.handler = handler;
    c.push(wrapper);
    return wrapper;
  }

  function findWrapper(id, eventName, handler) {
    var c = getWrappersForEventName(id, eventName);
    return c.find(function(wrapper) { return wrapper.handler == handler });
  }

  function destroyWrapper(id, eventName, handler) {
    var c = getCacheForID(id);
    if (!c[eventName]) return false;
    c[eventName] = c[eventName].without(findWrapper(id, eventName, handler));
  }

  function destroyCache() {
    for (var id in cache)
      for (var eventName in cache[id])
        cache[id][eventName] = null;
  }

  if (window.attachEvent) {
    window.attachEvent("onunload", destroyCache);
  }

  return {
    observe: function(element, eventName, handler) {
      element = $(element);
      var name = getDOMEventName(eventName);

      var wrapper = createWrapper(element, eventName, handler);
      if (!wrapper) return element;

      if (element.addEventListener) {
        element.addEventListener(name, wrapper, false);
      } else {
        element.attachEvent("on" + name, wrapper);
      }

      return element;
    },

    stopObserving: function(element, eventName, handler) {
      element = $(element);
      var id = getEventID(element), name = getDOMEventName(eventName);

      if (!handler && eventName) {
        getWrappersForEventName(id, eventName).each(function(wrapper) {
          element.stopObserving(eventName, wrapper.handler);
        });
        return element;

      } else if (!eventName) {
        Object.keys(getCacheForID(id)).each(function(eventName) {
          element.stopObserving(eventName);
        });
        return element;
      }

      var wrapper = findWrapper(id, eventName, handler);
      if (!wrapper) return element;

      if (element.removeEventListener) {
        element.removeEventListener(name, wrapper, false);
      } else {
        element.detachEvent("on" + name, wrapper);
      }

      destroyWrapper(id, eventName, handler);

      return element;
    },

    fire: function(element, eventName, memo) {
      element = $(element);
      if (element == document && document.createEvent && !element.dispatchEvent)
        element = document.documentElement;

      var event;
      if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent("dataavailable", true, true);
      } else {
        event = document.createEventObject();
        event.eventType = "ondataavailable";
      }

      event.eventName = eventName;
      event.memo = memo || { };

      if (document.createEvent) {
        element.dispatchEvent(event);
      } else {
        element.fireEvent(event.eventType, event);
      }

      return Event.extend(event);
    }
  };
})());

Object.extend(Event, Event.Methods);

Element.addMethods({
  fire:          Event.fire,
  observe:       Event.observe,
  stopObserving: Event.stopObserving
});

Object.extend(document, {
  fire:          Element.Methods.fire.methodize(),
  observe:       Element.Methods.observe.methodize(),
  stopObserving: Element.Methods.stopObserving.methodize(),
  loaded:        false
});

(function() {
  /* Support for the DOMContentLoaded event is based on work by Dan Webb,
     Matthias Miller, Dean Edwards and John Resig. */

  var timer;

  function fireContentLoadedEvent() {
    if (document.loaded) return;
    if (timer) window.clearInterval(timer);
    document.fire("dom:loaded");
    document.loaded = true;
  }

  if (document.addEventListener) {
    if (Prototype.Browser.WebKit) {
      timer = window.setInterval(function() {
        if (/loaded|complete/.test(document.readyState))
          fireContentLoadedEvent();
      }, 0);

      Event.observe(window, "load", fireContentLoadedEvent);

    } else {
      document.addEventListener("DOMContentLoaded",
        fireContentLoadedEvent, false);
    }

  } else {
    document.write("<script id=__onDOMContentLoaded defer src=//:><\/script>");
    $("__onDOMContentLoaded").onreadystatechange = function() {
      if (this.readyState == "complete") {
        this.onreadystatechange = null;
        fireContentLoadedEvent();
      }
    };
  }
})();
/*------------------------------- DEPRECATED -------------------------------*/

Hash.toQueryString = Object.toQueryString;

var Toggle = { display: Element.toggle };

Element.Methods.childOf = Element.Methods.descendantOf;

var Insertion = {
  Before: function(element, content) {
    return Element.insert(element, {before:content});
  },

  Top: function(element, content) {
    return Element.insert(element, {top:content});
  },

  Bottom: function(element, content) {
    return Element.insert(element, {bottom:content});
  },

  After: function(element, content) {
    return Element.insert(element, {after:content});
  }
};

var $continue = new Error('"throw $continue" is deprecated, use "return" instead');

// This should be moved to script.aculo.us; notice the deprecated methods
// further below, that map to the newer Element methods.
var Position = {
  // set to true if needed, warning: firefox performance problems
  // NOT neeeded for page scrolling, only if draggable contained in
  // scrollable elements
  includeScrollOffsets: false,

  // must be called before calling withinIncludingScrolloffset, every time the
  // page is scrolled
  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  // caches x/y coordinate pair to use with overlap
  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = Element.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = Element.cumulativeScrollOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = Element.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  // within must be called directly before
  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },

  // Deprecation layer -- use newer Element methods now (1.5.2).

  cumulativeOffset: Element.Methods.cumulativeOffset,

  positionedOffset: Element.Methods.positionedOffset,

  absolutize: function(element) {
    Position.prepare();
    return Element.absolutize(element);
  },

  relativize: function(element) {
    Position.prepare();
    return Element.relativize(element);
  },

  realOffset: Element.Methods.cumulativeScrollOffset,

  offsetParent: Element.Methods.getOffsetParent,

  page: Element.Methods.viewportOffset,

  clone: function(source, target, options) {
    options = options || { };
    return Element.clonePosition(target, source, options);
  }
};

/*--------------------------------------------------------------------------*/

if (!document.getElementsByClassName) document.getElementsByClassName = function(instanceMethods){
  function iter(name) {
    return name.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + name + " ')]";
  }

  instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath ?
  function(element, className) {
    className = className.toString().strip();
    var cond = /\s/.test(className) ? $w(className).map(iter).join('') : iter(className);
    return cond ? document._getElementsByXPath('.//*' + cond, element) : [];
  } : function(element, className) {
    className = className.toString().strip();
    var elements = [], classNames = (/\s/.test(className) ? $w(className) : null);
    if (!classNames && !className) return elements;

    var nodes = $(element).getElementsByTagName('*');
    className = ' ' + className + ' ';

    for (var i = 0, child, cn; child = nodes[i]; i++) {
      if (child.className && (cn = ' ' + child.className + ' ') && (cn.include(className) ||
          (classNames && classNames.all(function(name) {
            return !name.toString().blank() && cn.include(' ' + name + ' ');
          }))))
        elements.push(Element.extend(child));
    }
    return elements;
  };

  return function(className, parentElement) {
    return $(parentElement || document.body).getElementsByClassName(className);
  };
}(Element.Methods);

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set($A(this).concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set($A(this).without(classNameToRemove).join(' '));
  },

  toString: function() {
    return $A(this).join(' ');
  }
};

Object.extend(Element.ClassNames.prototype, Enumerable);

/*--------------------------------------------------------------------------*/

Element.addMethods();
// script.aculo.us scriptaculous.js v1.8.0, Tue Nov 06 15:01:40 +0300 2007

// Copyright (c) 2005-2007 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// For details, see the script.aculo.us web site: http://script.aculo.us/

var Scriptaculous = {
  Version: '1.8.0',
  REQUIRED_PROTOTYPE: '1.6.0'
}

var Builder = {
  NODEMAP: {
    AREA: 'map',
    CAPTION: 'table',
    COL: 'table',
    COLGROUP: 'table',
    LEGEND: 'fieldset',
    OPTGROUP: 'select',
    OPTION: 'select',
    PARAM: 'object',
    TBODY: 'table',
    TD: 'table',
    TFOOT: 'table',
    TH: 'table',
    THEAD: 'table',
    TR: 'table'
  },
  // note: For Firefox < 1.5, OPTION and OPTGROUP tags are currently broken,
  //       due to a Firefox bug
  node: function(elementName) {
    elementName = elementName.toUpperCase();
    
    // try innerHTML approach
    var parentTag = this.NODEMAP[elementName] || 'div';
    var parentElement = document.createElement(parentTag);
    try { // prevent IE "feature": http://dev.rubyonrails.org/ticket/2707
      parentElement.innerHTML = "<" + elementName + "></" + elementName + ">";
    } catch(e) {}
    var element = parentElement.firstChild || null;
      
    // see if browser added wrapping tags
    if(element && (element.tagName.toUpperCase() != elementName))
      element = element.getElementsByTagName(elementName)[0];
    
    // fallback to createElement approach
    if(!element) element = document.createElement(elementName);
    
    // abort if nothing could be created
    if(!element) return;

    // attributes (or text)
    if(arguments[1])
      if(this._isStringOrNumber(arguments[1]) ||
        (arguments[1] instanceof Array) ||
        arguments[1].tagName) {
          this._children(element, arguments[1]);
        } else {
          var attrs = this._attributes(arguments[1]);
          if(attrs.length) {
            try { // prevent IE "feature": http://dev.rubyonrails.org/ticket/2707
              parentElement.innerHTML = "<" +elementName + " " +
                attrs + "></" + elementName + ">";
            } catch(e) {}
            element = parentElement.firstChild || null;
            // workaround firefox 1.0.X bug
            if(!element) {
              element = document.createElement(elementName);
              for(attr in arguments[1]) 
                element[attr == 'class' ? 'className' : attr] = arguments[1][attr];
            }
            if(element.tagName.toUpperCase() != elementName)
              element = parentElement.getElementsByTagName(elementName)[0];
          }
        } 

    // text, or array of children
    if(arguments[2])
      this._children(element, arguments[2]);

     return element;
  },
  _text: function(text) {
     return document.createTextNode(text);
  },

  ATTR_MAP: {
    'className': 'class',
    'htmlFor': 'for'
  },

  _attributes: function(attributes) {
    var attrs = [];
    for(attribute in attributes)
      attrs.push((attribute in this.ATTR_MAP ? this.ATTR_MAP[attribute] : attribute) +
          '="' + attributes[attribute].toString().escapeHTML().gsub(/"/,'&quot;') + '"');
    return attrs.join(" ");
  },
  _children: function(element, children) {
    if(children.tagName) {
      element.appendChild(children);
      return;
    }
    if(typeof children=='object') { // array can hold nodes and text
      children.flatten().each( function(e) {
        if(typeof e=='object')
          element.appendChild(e)
        else
          if(Builder._isStringOrNumber(e))
            element.appendChild(Builder._text(e));
      });
    } else
      if(Builder._isStringOrNumber(children))
        element.appendChild(Builder._text(children));
  },
  _isStringOrNumber: function(param) {
    return(typeof param=='string' || typeof param=='number');
  },
  build: function(html) {
    var element = this.node('div');
    $(element).update(html.strip());
    return element.down();
  },
  dump: function(scope) { 
    if(typeof scope != 'object' && typeof scope != 'function') scope = window; //global scope 
  
    var tags = ("A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY " +
      "BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET " +
      "FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX "+
      "KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P "+
      "PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD "+
      "TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR").split(/\s+/);
  
    tags.each( function(tag){ 
      scope[tag] = function() { 
        return Builder.node.apply(Builder, [tag].concat($A(arguments)));  
      } 
    });
  }
}

String.prototype.parseColor = function() {  
  var color = '#';
  if (this.slice(0,4) == 'rgb(') {  
    var cols = this.slice(4,this.length-1).split(',');  
    var i=0; do { color += parseInt(cols[i]).toColorPart() } while (++i<3);  
  } else {  
    if (this.slice(0,1) == '#') {  
      if (this.length==4) for(var i=1;i<4;i++) color += (this.charAt(i) + this.charAt(i)).toLowerCase();  
      if (this.length==7) color = this.toLowerCase();  
    }  
  }  
  return (color.length==7 ? color : (arguments[0] || this));  
};

/*--------------------------------------------------------------------------*/

Element.collectTextNodes = function(element) {  
  return $A($(element).childNodes).collect( function(node) {
    return (node.nodeType==3 ? node.nodeValue : 
      (node.hasChildNodes() ? Element.collectTextNodes(node) : ''));
  }).flatten().join('');
};

Element.collectTextNodesIgnoreClass = function(element, className) {  
  return $A($(element).childNodes).collect( function(node) {
    return (node.nodeType==3 ? node.nodeValue : 
      ((node.hasChildNodes() && !Element.hasClassName(node,className)) ? 
        Element.collectTextNodesIgnoreClass(node, className) : ''));
  }).flatten().join('');
};

Element.setContentZoom = function(element, percent) {
  element = $(element);  
  element.setStyle({fontSize: (percent/100) + 'em'});   
  if (Prototype.Browser.WebKit) window.scrollBy(0,0);
  return element;
};

Element.getInlineOpacity = function(element){
  return $(element).style.opacity || '';
};

Element.forceRerendering = function(element) {
  try {
    element = $(element);
    var n = document.createTextNode(' ');
    element.appendChild(n);
    element.removeChild(n);
  } catch(e) { }
};

/*--------------------------------------------------------------------------*/

var Effect = {
  _elementDoesNotExistError: {
    name: 'ElementDoesNotExistError',
    message: 'The specified DOM element does not exist, but is required for this effect to operate'
  },
  Transitions: {
    linear: Prototype.K,
    sinoidal: function(pos) {
      return (-Math.cos(pos*Math.PI)/2) + 0.5;
    },
    reverse: function(pos) {
      return 1-pos;
    },
    flicker: function(pos) {
      var pos = ((-Math.cos(pos*Math.PI)/4) + 0.75) + Math.random()/4;
      return pos > 1 ? 1 : pos;
    },
    wobble: function(pos) {
      return (-Math.cos(pos*Math.PI*(9*pos))/2) + 0.5;
    },
    pulse: function(pos, pulses) { 
      pulses = pulses || 5; 
      return (
        ((pos % (1/pulses)) * pulses).round() == 0 ? 
              ((pos * pulses * 2) - (pos * pulses * 2).floor()) : 
          1 - ((pos * pulses * 2) - (pos * pulses * 2).floor())
        );
    },
    spring: function(pos) { 
      return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6)); 
    },
    none: function(pos) {
      return 0;
    },
    full: function(pos) {
      return 1;
    }
  },
  DefaultOptions: {
    duration:   1.0,   // seconds
    fps:        100,   // 100= assume 66fps max.
    sync:       false, // true for combining
    from:       0.0,
    to:         1.0,
    delay:      0.0,
    queue:      'parallel'
  },
  tagifyText: function(element) {
    var tagifyStyle = 'position:relative';
    if (Prototype.Browser.IE) tagifyStyle += ';zoom:1';
    
    element = $(element);
    $A(element.childNodes).each( function(child) {
      if (child.nodeType==3) {
        child.nodeValue.toArray().each( function(character) {
          element.insertBefore(
            new Element('span', {style: tagifyStyle}).update(
              character == ' ' ? String.fromCharCode(160) : character), 
              child);
        });
        Element.remove(child);
      }
    });
  },
  multiple: function(element, effect) {
    var elements;
    if (((typeof element == 'object') || 
        Object.isFunction(element)) && 
       (element.length))
      elements = element;
    else
      elements = $(element).childNodes;
      
    var options = Object.extend({
      speed: 0.1,
      delay: 0.0
    }, arguments[2] || { });
    var masterDelay = options.delay;

    $A(elements).each( function(element, index) {
      new effect(element, Object.extend(options, { delay: index * options.speed + masterDelay }));
    });
  },
  PAIRS: {
    'slide':  ['SlideDown','SlideUp'],
    'blind':  ['BlindDown','BlindUp'],
    'appear': ['Appear','Fade']
  },
  toggle: function(element, effect) {
    element = $(element);
    effect = (effect || 'appear').toLowerCase();
    var options = Object.extend({
      queue: { position:'end', scope:(element.id || 'global'), limit: 1 }
    }, arguments[2] || { });
    Effect[element.visible() ? 
      Effect.PAIRS[effect][1] : Effect.PAIRS[effect][0]](element, options);
  }
};

Effect.DefaultOptions.transition = Effect.Transitions.sinoidal;

/* ------------- core effects ------------- */

Effect.ScopedQueue = Class.create(Enumerable, {
  initialize: function() {
    this.effects  = [];
    this.interval = null;    
  },
  _each: function(iterator) {
    this.effects._each(iterator);
  },
  add: function(effect) {
    var timestamp = new Date().getTime();
    
    var position = Object.isString(effect.options.queue) ? 
      effect.options.queue : effect.options.queue.position;
    
    switch(position) {
      case 'front':
        // move unstarted effects after this effect  
        this.effects.findAll(function(e){ return e.state=='idle' }).each( function(e) {
            e.startOn  += effect.finishOn;
            e.finishOn += effect.finishOn;
          });
        break;
      case 'with-last':
        timestamp = this.effects.pluck('startOn').max() || timestamp;
        break;
      case 'end':
        // start effect after last queued effect has finished
        timestamp = this.effects.pluck('finishOn').max() || timestamp;
        break;
    }
    
    effect.startOn  += timestamp;
    effect.finishOn += timestamp;

    if (!effect.options.queue.limit || (this.effects.length < effect.options.queue.limit))
      this.effects.push(effect);
    
    if (!this.interval)
      this.interval = setInterval(this.loop.bind(this), 15);
  },
  remove: function(effect) {
    this.effects = this.effects.reject(function(e) { return e==effect });
    if (this.effects.length == 0) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },
  loop: function() {
    var timePos = new Date().getTime();
    for(var i=0, len=this.effects.length;i<len;i++) 
      this.effects[i] && this.effects[i].loop(timePos);
  }
});

Effect.Queues = {
  instances: $H(),
  get: function(queueName) {
    if (!Object.isString(queueName)) return queueName;
    
    return this.instances.get(queueName) ||
      this.instances.set(queueName, new Effect.ScopedQueue());
  }
};
Effect.Queue = Effect.Queues.get('global');

Effect.Base = Class.create({
  position: null,
  start: function(options) {
    function codeForEvent(options,eventName){
      return (
        (options[eventName+'Internal'] ? 'this.options.'+eventName+'Internal(this);' : '') +
        (options[eventName] ? 'this.options.'+eventName+'(this);' : '')
      );
    }
    if (options && options.transition === false) options.transition = Effect.Transitions.linear;
    this.options      = Object.extend(Object.extend({ },Effect.DefaultOptions), options || { });
    this.currentFrame = 0;
    this.state        = 'idle';
    this.startOn      = this.options.delay*1000;
    this.finishOn     = this.startOn+(this.options.duration*1000);
    this.fromToDelta  = this.options.to-this.options.from;
    this.totalTime    = this.finishOn-this.startOn;
    this.totalFrames  = this.options.fps*this.options.duration;
    
    eval('this.render = function(pos){ '+
      'if (this.state=="idle"){this.state="running";'+
      codeForEvent(this.options,'beforeSetup')+
      (this.setup ? 'this.setup();':'')+ 
      codeForEvent(this.options,'afterSetup')+
      '};if (this.state=="running"){'+
      'pos=this.options.transition(pos)*'+this.fromToDelta+'+'+this.options.from+';'+
      'this.position=pos;'+
      codeForEvent(this.options,'beforeUpdate')+
      (this.update ? 'this.update(pos);':'')+
      codeForEvent(this.options,'afterUpdate')+
      '}}');
    
    this.event('beforeStart');
    if (!this.options.sync)
      Effect.Queues.get(Object.isString(this.options.queue) ? 
        'global' : this.options.queue.scope).add(this);
  },
  loop: function(timePos) {
    if (timePos >= this.startOn) {
      if (timePos >= this.finishOn) {
        this.render(1.0);
        this.cancel();
        this.event('beforeFinish');
        if (this.finish) this.finish(); 
        this.event('afterFinish');
        return;  
      }
      var pos   = (timePos - this.startOn) / this.totalTime,
          frame = (pos * this.totalFrames).round();
      if (frame > this.currentFrame) {
        this.render(pos);
        this.currentFrame = frame;
      }
    }
  },
  cancel: function() {
    if (!this.options.sync)
      Effect.Queues.get(Object.isString(this.options.queue) ? 
        'global' : this.options.queue.scope).remove(this);
    this.state = 'finished';
  },
  event: function(eventName) {
    if (this.options[eventName + 'Internal']) this.options[eventName + 'Internal'](this);
    if (this.options[eventName]) this.options[eventName](this);
  },
  inspect: function() {
    var data = $H();
    for(property in this)
      if (!Object.isFunction(this[property])) data.set(property, this[property]);
    return '#<Effect:' + data.inspect() + ',options:' + $H(this.options).inspect() + '>';
  }
});

Effect.Parallel = Class.create(Effect.Base, {
  initialize: function(effects) {
    this.effects = effects || [];
    this.start(arguments[1]);
  },
  update: function(position) {
    this.effects.invoke('render', position);
  },
  finish: function(position) {
    this.effects.each( function(effect) {
      effect.render(1.0);
      effect.cancel();
      effect.event('beforeFinish');
      if (effect.finish) effect.finish(position);
      effect.event('afterFinish');
    });
  }
});

Effect.Tween = Class.create(Effect.Base, {
  initialize: function(object, from, to) {
    object = Object.isString(object) ? $(object) : object;
    var args = $A(arguments), method = args.last(), 
      options = args.length == 5 ? args[3] : null;
    this.method = Object.isFunction(method) ? method.bind(object) :
      Object.isFunction(object[method]) ? object[method].bind(object) : 
      function(value) { object[method] = value };
    this.start(Object.extend({ from: from, to: to }, options || { }));
  },
  update: function(position) {
    this.method(position);
  }
});

Effect.Event = Class.create(Effect.Base, {
  initialize: function() {
    this.start(Object.extend({ duration: 0 }, arguments[0] || { }));
  },
  update: Prototype.emptyFunction
});

Effect.Opacity = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    // make this work on IE on elements without 'layout'
    if (Prototype.Browser.IE && (!this.element.currentStyle.hasLayout))
      this.element.setStyle({zoom: 1});
    var options = Object.extend({
      from: this.element.getOpacity() || 0.0,
      to:   1.0
    }, arguments[1] || { });
    this.start(options);
  },
  update: function(position) {
    this.element.setOpacity(position);
  }
});

Effect.Move = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      x:    0,
      y:    0,
      mode: 'relative'
    }, arguments[1] || { });
    this.start(options);
  },
  setup: function() {
    this.element.makePositioned();
    this.originalLeft = parseFloat(this.element.getStyle('left') || '0');
    this.originalTop  = parseFloat(this.element.getStyle('top')  || '0');
    if (this.options.mode == 'absolute') {
      this.options.x = this.options.x - this.originalLeft;
      this.options.y = this.options.y - this.originalTop;
    }
  },
  update: function(position) {
    this.element.setStyle({
      left: (this.options.x  * position + this.originalLeft).round() + 'px',
      top:  (this.options.y  * position + this.originalTop).round()  + 'px'
    });
  }
});

// for backwards compatibility
Effect.MoveBy = function(element, toTop, toLeft) {
  return new Effect.Move(element, 
    Object.extend({ x: toLeft, y: toTop }, arguments[3] || { }));
};

Effect.Scale = Class.create(Effect.Base, {
  initialize: function(element, percent) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      scaleX: true,
      scaleY: true,
      scaleContent: true,
      scaleFromCenter: false,
      scaleMode: 'box',        // 'box' or 'contents' or { } with provided values
      scaleFrom: 100.0,
      scaleTo:   percent
    }, arguments[2] || { });
    this.start(options);
  },
  setup: function() {
    this.restoreAfterFinish = this.options.restoreAfterFinish || false;
    this.elementPositioning = this.element.getStyle('position');
    
    this.originalStyle = { };
    ['top','left','width','height','fontSize'].each( function(k) {
      this.originalStyle[k] = this.element.style[k];
    }.bind(this));
      
    this.originalTop  = this.element.offsetTop;
    this.originalLeft = this.element.offsetLeft;
    
    var fontSize = this.element.getStyle('font-size') || '100%';
    ['em','px','%','pt'].each( function(fontSizeType) {
      if (fontSize.indexOf(fontSizeType)>0) {
        this.fontSize     = parseFloat(fontSize);
        this.fontSizeType = fontSizeType;
      }
    }.bind(this));
    
    this.factor = (this.options.scaleTo - this.options.scaleFrom)/100;
    
    this.dims = null;
    if (this.options.scaleMode=='box')
      this.dims = [this.element.offsetHeight, this.element.offsetWidth];
    if (/^content/.test(this.options.scaleMode))
      this.dims = [this.element.scrollHeight, this.element.scrollWidth];
    if (!this.dims)
      this.dims = [this.options.scaleMode.originalHeight,
                   this.options.scaleMode.originalWidth];
  },
  update: function(position) {
    var currentScale = (this.options.scaleFrom/100.0) + (this.factor * position);
    if (this.options.scaleContent && this.fontSize)
      this.element.setStyle({fontSize: this.fontSize * currentScale + this.fontSizeType });
    this.setDimensions(this.dims[0] * currentScale, this.dims[1] * currentScale);
  },
  finish: function(position) {
    if (this.restoreAfterFinish) this.element.setStyle(this.originalStyle);
  },
  setDimensions: function(height, width) {
    var d = { };
    if (this.options.scaleX) d.width = width.round() + 'px';
    if (this.options.scaleY) d.height = height.round() + 'px';
    if (this.options.scaleFromCenter) {
      var topd  = (height - this.dims[0])/2;
      var leftd = (width  - this.dims[1])/2;
      if (this.elementPositioning == 'absolute') {
        if (this.options.scaleY) d.top = this.originalTop-topd + 'px';
        if (this.options.scaleX) d.left = this.originalLeft-leftd + 'px';
      } else {
        if (this.options.scaleY) d.top = -topd + 'px';
        if (this.options.scaleX) d.left = -leftd + 'px';
      }
    }
    this.element.setStyle(d);
  }
});

Effect.Highlight = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({ startcolor: '#ffff99' }, arguments[1] || { });
    this.start(options);
  },
  setup: function() {
    // Prevent executing on elements not in the layout flow
    if (this.element.getStyle('display')=='none') { this.cancel(); return; }
    // Disable background image during the effect
    this.oldStyle = { };
    if (!this.options.keepBackgroundImage) {
      this.oldStyle.backgroundImage = this.element.getStyle('background-image');
      this.element.setStyle({backgroundImage: 'none'});
    }
    if (!this.options.endcolor)
      this.options.endcolor = this.element.getStyle('background-color').parseColor('#ffffff');
    if (!this.options.restorecolor)
      this.options.restorecolor = this.element.getStyle('background-color');
    // init color calculations
    this._base  = $R(0,2).map(function(i){ return parseInt(this.options.startcolor.slice(i*2+1,i*2+3),16) }.bind(this));
    this._delta = $R(0,2).map(function(i){ return parseInt(this.options.endcolor.slice(i*2+1,i*2+3),16)-this._base[i] }.bind(this));
  },
  update: function(position) {
    this.element.setStyle({backgroundColor: $R(0,2).inject('#',function(m,v,i){
      return m+((this._base[i]+(this._delta[i]*position)).round().toColorPart()); }.bind(this)) });
  },
  finish: function() {
    this.element.setStyle(Object.extend(this.oldStyle, {
      backgroundColor: this.options.restorecolor
    }));
  }
});

Effect.ScrollTo = function(element) {
  var options = arguments[1] || { },
    scrollOffsets = document.viewport.getScrollOffsets(),
    elementOffsets = $(element).cumulativeOffset(),
    max = (window.height || document.body.scrollHeight) - document.viewport.getHeight();  

  if (options.offset) elementOffsets[1] += options.offset;

  return new Effect.Tween(null,
    scrollOffsets.top,
    elementOffsets[1] > max ? max : elementOffsets[1],
    options,
    function(p){ scrollTo(scrollOffsets.left, p.round()) }
  );
};

/* ------------- combination effects ------------- */

Effect.Fade = function(element) {
  element = $(element);
  var oldOpacity = element.getInlineOpacity();
  var options = Object.extend({
    from: element.getOpacity() || 1.0,
    to:   0.0,
    afterFinishInternal: function(effect) { 
      if (effect.options.to!=0) return;
      effect.element.hide().setStyle({opacity: oldOpacity}); 
    }
  }, arguments[1] || { });
  return new Effect.Opacity(element,options);
};

Effect.Appear = function(element) {
  element = $(element);
  var options = Object.extend({
  from: (element.getStyle('display') == 'none' ? 0.0 : element.getOpacity() || 0.0),
  to:   1.0,
  // force Safari to render floated elements properly
  afterFinishInternal: function(effect) {
    effect.element.forceRerendering();
  },
  beforeSetup: function(effect) {
    effect.element.setOpacity(effect.options.from).show(); 
  }}, arguments[1] || { });
  return new Effect.Opacity(element,options);
};

Effect.Puff = function(element) {
  element = $(element);
  var oldStyle = { 
    opacity: element.getInlineOpacity(), 
    position: element.getStyle('position'),
    top:  element.style.top,
    left: element.style.left,
    width: element.style.width,
    height: element.style.height
  };
  return new Effect.Parallel(
   [ new Effect.Scale(element, 200, 
      { sync: true, scaleFromCenter: true, scaleContent: true, restoreAfterFinish: true }), 
     new Effect.Opacity(element, { sync: true, to: 0.0 } ) ], 
     Object.extend({ duration: 1.0, 
      beforeSetupInternal: function(effect) {
        Position.absolutize(effect.effects[0].element)
      },
      afterFinishInternal: function(effect) {
         effect.effects[0].element.hide().setStyle(oldStyle); }
     }, arguments[1] || { })
   );
};

Effect.BlindUp = function(element) {
  element = $(element);
  element.makeClipping();
  return new Effect.Scale(element, 0,
    Object.extend({ scaleContent: false, 
      scaleX: false, 
      restoreAfterFinish: true,
      afterFinishInternal: function(effect) {
        effect.element.hide().undoClipping();
      } 
    }, arguments[1] || { })
  );
};

Effect.BlindDown = function(element) {
  element = $(element);
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, 100, Object.extend({ 
    scaleContent: false, 
    scaleX: false,
    scaleFrom: 0,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makeClipping().setStyle({height: '0px'}).show(); 
    },  
    afterFinishInternal: function(effect) {
      effect.element.undoClipping();
    }
  }, arguments[1] || { }));
};

Effect.SwitchOff = function(element) {
  element = $(element);
  var oldOpacity = element.getInlineOpacity();
  return new Effect.Appear(element, Object.extend({
    duration: 0.4,
    from: 0,
    transition: Effect.Transitions.flicker,
    afterFinishInternal: function(effect) {
      new Effect.Scale(effect.element, 1, { 
        duration: 0.3, scaleFromCenter: true,
        scaleX: false, scaleContent: false, restoreAfterFinish: true,
        beforeSetup: function(effect) { 
          effect.element.makePositioned().makeClipping();
        },
        afterFinishInternal: function(effect) {
          effect.element.hide().undoClipping().undoPositioned().setStyle({opacity: oldOpacity});
        }
      })
    }
  }, arguments[1] || { }));
};

Effect.DropOut = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left'),
    opacity: element.getInlineOpacity() };
  return new Effect.Parallel(
    [ new Effect.Move(element, {x: 0, y: 100, sync: true }), 
      new Effect.Opacity(element, { sync: true, to: 0.0 }) ],
    Object.extend(
      { duration: 0.5,
        beforeSetup: function(effect) {
          effect.effects[0].element.makePositioned(); 
        },
        afterFinishInternal: function(effect) {
          effect.effects[0].element.hide().undoPositioned().setStyle(oldStyle);
        } 
      }, arguments[1] || { }));
};

Effect.Shake = function(element) {
  element = $(element);
  var options = Object.extend({
    distance: 20,
    duration: 0.5
  }, arguments[1] || {});
  var distance = parseFloat(options.distance);
  var split = parseFloat(options.duration) / 10.0;
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left') };
    return new Effect.Move(element,
      { x:  distance, y: 0, duration: split, afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x:  distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x:  distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -distance, y: 0, duration: split, afterFinishInternal: function(effect) {
        effect.element.undoPositioned().setStyle(oldStyle);
  }}) }}) }}) }}) }}) }});
};

Effect.SlideDown = function(element) {
  element = $(element).cleanWhitespace();
  // SlideDown need to have the content of the element wrapped in a container element with fixed height!
  var oldInnerBottom = element.down().getStyle('bottom');
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, 100, Object.extend({ 
    scaleContent: false, 
    scaleX: false, 
    scaleFrom: window.opera ? 0 : 1,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makePositioned();
      effect.element.down().makePositioned();
      if (window.opera) effect.element.setStyle({top: ''});
      effect.element.makeClipping().setStyle({height: '0px'}).show(); 
    },
    afterUpdateInternal: function(effect) {
      effect.element.down().setStyle({bottom:
        (effect.dims[0] - effect.element.clientHeight) + 'px' }); 
    },
    afterFinishInternal: function(effect) {
      effect.element.undoClipping().undoPositioned();
      effect.element.down().undoPositioned().setStyle({bottom: oldInnerBottom}); }
    }, arguments[1] || { })
  );
};

Effect.SlideUp = function(element) {
  element = $(element).cleanWhitespace();
  var oldInnerBottom = element.down().getStyle('bottom');
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, window.opera ? 0 : 1,
   Object.extend({ scaleContent: false, 
    scaleX: false, 
    scaleMode: 'box',
    scaleFrom: 100,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makePositioned();
      effect.element.down().makePositioned();
      if (window.opera) effect.element.setStyle({top: ''});
      effect.element.makeClipping().show();
    },  
    afterUpdateInternal: function(effect) {
      effect.element.down().setStyle({bottom:
        (effect.dims[0] - effect.element.clientHeight) + 'px' });
    },
    afterFinishInternal: function(effect) {
      effect.element.hide().undoClipping().undoPositioned();
      effect.element.down().undoPositioned().setStyle({bottom: oldInnerBottom});
    }
   }, arguments[1] || { })
  );
};

// Bug in opera makes the TD containing this element expand for a instance after finish 
Effect.Squish = function(element) {
  return new Effect.Scale(element, window.opera ? 1 : 0, { 
    restoreAfterFinish: true,
    beforeSetup: function(effect) {
      effect.element.makeClipping(); 
    },  
    afterFinishInternal: function(effect) {
      effect.element.hide().undoClipping(); 
    }
  });
};

Effect.Grow = function(element) {
  element = $(element);
  var options = Object.extend({
    direction: 'center',
    moveTransition: Effect.Transitions.sinoidal,
    scaleTransition: Effect.Transitions.sinoidal,
    opacityTransition: Effect.Transitions.full
  }, arguments[1] || { });
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    height: element.style.height,
    width: element.style.width,
    opacity: element.getInlineOpacity() };

  var dims = element.getDimensions();    
  var initialMoveX, initialMoveY;
  var moveX, moveY;
  
  switch (options.direction) {
    case 'top-left':
      initialMoveX = initialMoveY = moveX = moveY = 0; 
      break;
    case 'top-right':
      initialMoveX = dims.width;
      initialMoveY = moveY = 0;
      moveX = -dims.width;
      break;
    case 'bottom-left':
      initialMoveX = moveX = 0;
      initialMoveY = dims.height;
      moveY = -dims.height;
      break;
    case 'bottom-right':
      initialMoveX = dims.width;
      initialMoveY = dims.height;
      moveX = -dims.width;
      moveY = -dims.height;
      break;
    case 'center':
      initialMoveX = dims.width / 2;
      initialMoveY = dims.height / 2;
      moveX = -dims.width / 2;
      moveY = -dims.height / 2;
      break;
  }
  
  return new Effect.Move(element, {
    x: initialMoveX,
    y: initialMoveY,
    duration: 0.01, 
    beforeSetup: function(effect) {
      effect.element.hide().makeClipping().makePositioned();
    },
    afterFinishInternal: function(effect) {
      new Effect.Parallel(
        [ new Effect.Opacity(effect.element, { sync: true, to: 1.0, from: 0.0, transition: options.opacityTransition }),
          new Effect.Move(effect.element, { x: moveX, y: moveY, sync: true, transition: options.moveTransition }),
          new Effect.Scale(effect.element, 100, {
            scaleMode: { originalHeight: dims.height, originalWidth: dims.width }, 
            sync: true, scaleFrom: window.opera ? 1 : 0, transition: options.scaleTransition, restoreAfterFinish: true})
        ], Object.extend({
             beforeSetup: function(effect) {
               effect.effects[0].element.setStyle({height: '0px'}).show(); 
             },
             afterFinishInternal: function(effect) {
               effect.effects[0].element.undoClipping().undoPositioned().setStyle(oldStyle); 
             }
           }, options)
      )
    }
  });
};

Effect.Shrink = function(element) {
  element = $(element);
  var options = Object.extend({
    direction: 'center',
    moveTransition: Effect.Transitions.sinoidal,
    scaleTransition: Effect.Transitions.sinoidal,
    opacityTransition: Effect.Transitions.none
  }, arguments[1] || { });
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    height: element.style.height,
    width: element.style.width,
    opacity: element.getInlineOpacity() };

  var dims = element.getDimensions();
  var moveX, moveY;
  
  switch (options.direction) {
    case 'top-left':
      moveX = moveY = 0;
      break;
    case 'top-right':
      moveX = dims.width;
      moveY = 0;
      break;
    case 'bottom-left':
      moveX = 0;
      moveY = dims.height;
      break;
    case 'bottom-right':
      moveX = dims.width;
      moveY = dims.height;
      break;
    case 'center':  
      moveX = dims.width / 2;
      moveY = dims.height / 2;
      break;
  }
  
  return new Effect.Parallel(
    [ new Effect.Opacity(element, { sync: true, to: 0.0, from: 1.0, transition: options.opacityTransition }),
      new Effect.Scale(element, window.opera ? 1 : 0, { sync: true, transition: options.scaleTransition, restoreAfterFinish: true}),
      new Effect.Move(element, { x: moveX, y: moveY, sync: true, transition: options.moveTransition })
    ], Object.extend({            
         beforeStartInternal: function(effect) {
           effect.effects[0].element.makePositioned().makeClipping(); 
         },
         afterFinishInternal: function(effect) {
           effect.effects[0].element.hide().undoClipping().undoPositioned().setStyle(oldStyle); }
       }, options)
  );
};

Effect.Pulsate = function(element) {
  element = $(element);
  var options    = arguments[1] || { };
  var oldOpacity = element.getInlineOpacity();
  var transition = options.transition || Effect.Transitions.sinoidal;
  var reverser   = function(pos){ return transition(1-Effect.Transitions.pulse(pos, options.pulses)) };
  reverser.bind(transition);
  return new Effect.Opacity(element, 
    Object.extend(Object.extend({  duration: 2.0, from: 0,
      afterFinishInternal: function(effect) { effect.element.setStyle({opacity: oldOpacity}); }
    }, options), {transition: reverser}));
};

Effect.Fold = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    width: element.style.width,
    height: element.style.height };
  element.makeClipping();
  return new Effect.Scale(element, 5, Object.extend({   
    scaleContent: false,
    scaleX: false,
    afterFinishInternal: function(effect) {
    new Effect.Scale(element, 1, { 
      scaleContent: false, 
      scaleY: false,
      afterFinishInternal: function(effect) {
        effect.element.hide().undoClipping().setStyle(oldStyle);
      } });
  }}, arguments[1] || { }));
};

Effect.Morph = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      style: { }
    }, arguments[1] || { });
    
    if (!Object.isString(options.style)) this.style = $H(options.style);
    else {
      if (options.style.include(':'))
        this.style = options.style.parseStyle();
      else {
        this.element.addClassName(options.style);
        this.style = $H(this.element.getStyles());
        this.element.removeClassName(options.style);
        var css = this.element.getStyles();
        this.style = this.style.reject(function(style) {
          return style.value == css[style.key];
        });
        options.afterFinishInternal = function(effect) {
          effect.element.addClassName(effect.options.style);
          effect.transforms.each(function(transform) {
            effect.element.style[transform.style] = '';
          });
        }
      }
    }
    this.start(options);
  },
  
  setup: function(){
    function parseColor(color){
      if (!color || ['rgba(0, 0, 0, 0)','transparent'].include(color)) color = '#ffffff';
      color = color.parseColor();
      return $R(0,2).map(function(i){
        return parseInt( color.slice(i*2+1,i*2+3), 16 ) 
      });
    }
    this.transforms = this.style.map(function(pair){
      var property = pair[0], value = pair[1], unit = null;

      if (value.parseColor('#zzzzzz') != '#zzzzzz') {
        value = value.parseColor();
        unit  = 'color';
      } else if (property == 'opacity') {
        value = parseFloat(value);
        if (Prototype.Browser.IE && (!this.element.currentStyle.hasLayout))
          this.element.setStyle({zoom: 1});
      } else if (Element.CSS_LENGTH.test(value)) {
          var components = value.match(/^([\+\-]?[0-9\.]+)(.*)$/);
          value = parseFloat(components[1]);
          unit = (components.length == 3) ? components[2] : null;
      }

      var originalValue = this.element.getStyle(property);
      return { 
        style: property.camelize(), 
        originalValue: unit=='color' ? parseColor(originalValue) : parseFloat(originalValue || 0), 
        targetValue: unit=='color' ? parseColor(value) : value,
        unit: unit
      };
    }.bind(this)).reject(function(transform){
      return (
        (transform.originalValue == transform.targetValue) ||
        (
          transform.unit != 'color' &&
          (isNaN(transform.originalValue) || isNaN(transform.targetValue))
        )
      )
    });
  },
  update: function(position) {
    var style = { }, transform, i = this.transforms.length;
    while(i--)
      style[(transform = this.transforms[i]).style] = 
        transform.unit=='color' ? '#'+
          (Math.round(transform.originalValue[0]+
            (transform.targetValue[0]-transform.originalValue[0])*position)).toColorPart() +
          (Math.round(transform.originalValue[1]+
            (transform.targetValue[1]-transform.originalValue[1])*position)).toColorPart() +
          (Math.round(transform.originalValue[2]+
            (transform.targetValue[2]-transform.originalValue[2])*position)).toColorPart() :
        (transform.originalValue +
          (transform.targetValue - transform.originalValue) * position).toFixed(3) + 
            (transform.unit === null ? '' : transform.unit);
    this.element.setStyle(style, true);
  }
});

Effect.Transform = Class.create({
  initialize: function(tracks){
    this.tracks  = [];
    this.options = arguments[1] || { };
    this.addTracks(tracks);
  },
  addTracks: function(tracks){
    tracks.each(function(track){
      track = $H(track);
      var data = track.values().first();
      this.tracks.push($H({
        ids:     track.keys().first(),
        effect:  Effect.Morph,
        options: { style: data }
      }));
    }.bind(this));
    return this;
  },
  play: function(){
    return new Effect.Parallel(
      this.tracks.map(function(track){
        var ids = track.get('ids'), effect = track.get('effect'), options = track.get('options');
        var elements = [$(ids) || $$(ids)].flatten();
        return elements.map(function(e){ return new effect(e, Object.extend({ sync:true }, options)) });
      }).flatten(),
      this.options
    );
  }
});

Element.CSS_PROPERTIES = $w(
  'backgroundColor backgroundPosition borderBottomColor borderBottomStyle ' + 
  'borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth ' +
  'borderRightColor borderRightStyle borderRightWidth borderSpacing ' +
  'borderTopColor borderTopStyle borderTopWidth bottom clip color ' +
  'fontSize fontWeight height left letterSpacing lineHeight ' +
  'marginBottom marginLeft marginRight marginTop markerOffset maxHeight '+
  'maxWidth minHeight minWidth opacity outlineColor outlineOffset ' +
  'outlineWidth paddingBottom paddingLeft paddingRight paddingTop ' +
  'right textIndent top width wordSpacing zIndex');
  
Element.CSS_LENGTH = /^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;

String.__parseStyleElement = document.createElement('div');
String.prototype.parseStyle = function(){
  var style, styleRules = $H();
  if (Prototype.Browser.WebKit)
    style = new Element('div',{style:this}).style;
  else {
    String.__parseStyleElement.innerHTML = '<div style="' + this + '"></div>';
    style = String.__parseStyleElement.childNodes[0].style;
  }
  
  Element.CSS_PROPERTIES.each(function(property){
    if (style[property]) styleRules.set(property, style[property]); 
  });
  
  if (Prototype.Browser.IE && this.include('opacity'))
    styleRules.set('opacity', this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1]);

  return styleRules;
};

if (document.defaultView && document.defaultView.getComputedStyle) {
  Element.getStyles = function(element) {
    var css = document.defaultView.getComputedStyle($(element), null);
    return Element.CSS_PROPERTIES.inject({ }, function(styles, property) {
      styles[property] = css[property];
      return styles;
    });
  };
} else {
  Element.getStyles = function(element) {
    element = $(element);
    var css = element.currentStyle, styles;
    styles = Element.CSS_PROPERTIES.inject({ }, function(hash, property) {
      hash.set(property, css[property]);
      return hash;
    });
    if (!styles.opacity) styles.set('opacity', element.getOpacity());
    return styles;
  };
};

Effect.Methods = {
  morph: function(element, style) {
    element = $(element);
    new Effect.Morph(element, Object.extend({ style: style }, arguments[2] || { }));
    return element;
  },
  visualEffect: function(element, effect, options) {
    element = $(element)
    var s = effect.dasherize().camelize(), klass = s.charAt(0).toUpperCase() + s.substring(1);
    new Effect[klass](element, options);
    return element;
  },
  highlight: function(element, options) {
    element = $(element);
    new Effect.Highlight(element, options);
    return element;
  }
};

$w('fade appear grow shrink fold blindUp blindDown slideUp slideDown '+
  'pulsate shake puff squish switchOff dropOut').each(
  function(effect) { 
    Effect.Methods[effect] = function(element, options){
      element = $(element);
      Effect[effect.charAt(0).toUpperCase() + effect.substring(1)](element, options);
      return element;
    }
  }
);

$w('getInlineOpacity forceRerendering setContentZoom collectTextNodes collectTextNodesIgnoreClass getStyles').each( 
  function(f) { Effect.Methods[f] = Element[f]; }
);

Element.addMethods(Effect.Methods);

if(typeof Effect == 'undefined')
  throw("controls.js requires including script.aculo.us' effects.js library");

var Autocompleter = { }
Autocompleter.Base = Class.create({
  baseInitialize: function(element, update, options) {
    element          = $(element)
    this.element     = element; 
    this.update      = $(update);  
    this.hasFocus    = false; 
    this.changed     = false; 
    this.active      = false; 
    this.index       = 0;     
    this.entryCount  = 0;
    this.oldElementValue = this.element.value;

    if(this.setOptions)
      this.setOptions(options);
    else
      this.options = options || { };

    this.options.paramName    = this.options.paramName || this.element.name;
    this.options.tokens       = this.options.tokens || [];
    this.options.frequency    = this.options.frequency || 0.4;
    this.options.minChars     = this.options.minChars || 1;
    this.options.onShow       = this.options.onShow || 
      function(element, update){ 
        if(!update.style.position || update.style.position=='absolute') {
          update.style.position = 'absolute';
          Position.clone(element, update, {
            setHeight: false, 
            offsetTop: element.offsetHeight
          });
        }
        Effect.Appear(update,{duration:0.15});
      };
    this.options.onHide = this.options.onHide || 
      function(element, update){ new Effect.Fade(update,{duration:0.15}) };

    if(typeof(this.options.tokens) == 'string') 
      this.options.tokens = new Array(this.options.tokens);
    // Force carriage returns as token delimiters anyway
    if (!this.options.tokens.include('\n'))
      this.options.tokens.push('\n');

    this.observer = null;
    
    this.element.setAttribute('autocomplete','off');

    Element.hide(this.update);

    Event.observe(this.element, 'blur', this.onBlur.bindAsEventListener(this));
    Event.observe(this.element, 'keypress', this.onKeyPress.bindAsEventListener(this));
  },

  show: function() {
    if(Element.getStyle(this.update, 'display')=='none') this.options.onShow(this.element, this.update);
    if(!this.iefix && 
      (Prototype.Browser.IE) &&
      (Element.getStyle(this.update, 'position')=='absolute')) {
      new Insertion.After(this.update, 
       '<iframe id="' + this.update.id + '_iefix" '+
       'style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" ' +
       'src="javascript:false;" frameborder="0" scrolling="no"></iframe>');
      this.iefix = $(this.update.id+'_iefix');
    }
    if(this.iefix) setTimeout(this.fixIEOverlapping.bind(this), 50);
  },
  
  fixIEOverlapping: function() {
    Position.clone(this.update, this.iefix, {setTop:(!this.update.style.height)});
    this.iefix.style.zIndex = 1;
    this.update.style.zIndex = 2;
    Element.show(this.iefix);
  },

  hide: function() {
    this.stopIndicator();
    if(Element.getStyle(this.update, 'display')!='none') this.options.onHide(this.element, this.update);
    if(this.iefix) Element.hide(this.iefix);
  },

  startIndicator: function() {
    if(this.options.indicator) Element.show(this.options.indicator);
  },

  stopIndicator: function() {
    if(this.options.indicator) Element.hide(this.options.indicator);
  },

  onKeyPress: function(event) {
    if(this.active)
      switch(event.keyCode) {
       case Event.KEY_TAB:
       case Event.KEY_RETURN:
         this.selectEntry();
         Event.stop(event);
       case Event.KEY_ESC:
         this.hide();
         this.active = false;
         Event.stop(event);
         return;
       case Event.KEY_LEFT:
       case Event.KEY_RIGHT:
         return;
       case Event.KEY_UP:
         this.markPrevious();
         this.render();
         if(Prototype.Browser.WebKit) Event.stop(event);
         return;
       case Event.KEY_DOWN:
         this.markNext();
         this.render();
         if(Prototype.Browser.WebKit) Event.stop(event);
         return;
      }
     else 
       if(event.keyCode==Event.KEY_TAB || event.keyCode==Event.KEY_RETURN || 
         (Prototype.Browser.WebKit > 0 && event.keyCode == 0)) return;

    this.changed = true;
    this.hasFocus = true;

    if(this.observer) clearTimeout(this.observer);
      this.observer = 
        setTimeout(this.onObserverEvent.bind(this), this.options.frequency*1000);
  },

  activate: function() {
    this.changed = false;
    this.hasFocus = true;
    this.getUpdatedChoices();
  },

  onHover: function(event) {
    var element = Event.findElement(event, 'LI');
    if(this.index != element.autocompleteIndex) 
    {
        this.index = element.autocompleteIndex;
        this.render();
    }
    Event.stop(event);
  },
  
  onClick: function(event) {
    var element = Event.findElement(event, 'LI');
    this.index = element.autocompleteIndex;
    this.selectEntry();
    this.hide();
  },
  
  onBlur: function(event) {
    // needed to make click events working
    setTimeout(this.hide.bind(this), 250);
    this.hasFocus = false;
    this.active = false;     
  }, 
  
  render: function() {
    if(this.entryCount > 0) {
      for (var i = 0; i < this.entryCount; i++)
        this.index==i ? 
          Element.addClassName(this.getEntry(i),"selected") : 
          Element.removeClassName(this.getEntry(i),"selected");
      if(this.hasFocus) { 
        this.show();
        this.active = true;
      }
    } else {
      this.active = false;
      this.hide();
    }
  },
  
  markPrevious: function() {
    if(this.index > 0) this.index--
      else this.index = this.entryCount-1;
    this.getEntry(this.index).scrollIntoView(true);
  },
  
  markNext: function() {
    if(this.index < this.entryCount-1) this.index++
      else this.index = 0;
    this.getEntry(this.index).scrollIntoView(false);
  },
  
  getEntry: function(index) {
    return this.update.firstChild.childNodes[index];
  },
  
  getCurrentEntry: function() {
    return this.getEntry(this.index);
  },
  
  selectEntry: function() {
    this.active = false;
    this.updateElement(this.getCurrentEntry());
  },

  updateElement: function(selectedElement) {
    if (this.options.updateElement) {
      this.options.updateElement(selectedElement);
      return;
    }
    var value = '';
    if (this.options.select) {
      var nodes = $(selectedElement).select('.' + this.options.select) || [];
      if(nodes.length>0) value = Element.collectTextNodes(nodes[0], this.options.select);
    } else
      value = Element.collectTextNodesIgnoreClass(selectedElement, 'informal');
    
    var bounds = this.getTokenBounds();
    if (bounds[0] != -1) {
      var newValue = this.element.value.substr(0, bounds[0]);
      var whitespace = this.element.value.substr(bounds[0]).match(/^\s+/);
      if (whitespace)
        newValue += whitespace[0];
      this.element.value = newValue + value + this.element.value.substr(bounds[1]);
    } else {
      this.element.value = value;
    }
    this.oldElementValue = this.element.value;
    this.element.focus();
    
    if (this.options.afterUpdateElement)
      this.options.afterUpdateElement(this.element, selectedElement);
  },

  updateChoices: function(choices) {
    if(!this.changed && this.hasFocus) {
      this.update.innerHTML = choices;
      Element.cleanWhitespace(this.update);
      Element.cleanWhitespace(this.update.down());

      if(this.update.firstChild && this.update.down().childNodes) {
        this.entryCount = 
          this.update.down().childNodes.length;
        for (var i = 0; i < this.entryCount; i++) {
          var entry = this.getEntry(i);
          entry.autocompleteIndex = i;
          this.addObservers(entry);
        }
      } else { 
        this.entryCount = 0;
      }

      this.stopIndicator();
      this.index = 0;
      
      if(this.entryCount==1 && this.options.autoSelect) {
        this.selectEntry();
        this.hide();
      } else {
        this.render();
      }
    }
  },

  addObservers: function(element) {
    Event.observe(element, "mouseover", this.onHover.bindAsEventListener(this));
    Event.observe(element, "click", this.onClick.bindAsEventListener(this));
  },

  onObserverEvent: function() {
    this.changed = false;   
    this.tokenBounds = null;
    if(this.getToken().length>=this.options.minChars) {
      this.getUpdatedChoices();
    } else {
      this.active = false;
      this.hide();
    }
    this.oldElementValue = this.element.value;
  },

  getToken: function() {
    var bounds = this.getTokenBounds();
    return this.element.value.substring(bounds[0], bounds[1]).strip();
  },

  getTokenBounds: function() {
    if (null != this.tokenBounds) return this.tokenBounds;
    var value = this.element.value;
    if (value.strip().empty()) return [-1, 0];
    var diff = arguments.callee.getFirstDifferencePos(value, this.oldElementValue);
    var offset = (diff == this.oldElementValue.length ? 1 : 0);
    var prevTokenPos = -1, nextTokenPos = value.length;
    var tp;
    for (var index = 0, l = this.options.tokens.length; index < l; ++index) {
      tp = value.lastIndexOf(this.options.tokens[index], diff + offset - 1);
      if (tp > prevTokenPos) prevTokenPos = tp;
      tp = value.indexOf(this.options.tokens[index], diff + offset);
      if (-1 != tp && tp < nextTokenPos) nextTokenPos = tp;
    }
    return (this.tokenBounds = [prevTokenPos + 1, nextTokenPos]);
  }
});

Autocompleter.Base.prototype.getTokenBounds.getFirstDifferencePos = function(newS, oldS) {
  var boundary = Math.min(newS.length, oldS.length);
  for (var index = 0; index < boundary; ++index)
    if (newS[index] != oldS[index])
      return index;
  return boundary;
};

Ajax.Autocompleter = Class.create(Autocompleter.Base, {
  initialize: function(element, update, url, options) {
    this.baseInitialize(element, update, options);
    this.options.asynchronous  = true;
    this.options.onComplete    = this.onComplete.bind(this);
    this.options.defaultParams = this.options.parameters || null;
    this.url                   = url;
  },

  getUpdatedChoices: function() {
    this.startIndicator();
    
    var entry = encodeURIComponent(this.options.paramName) + '=' + 
      encodeURIComponent(this.getToken());

    this.options.parameters = this.options.callback ?
      this.options.callback(this.element, entry) : entry;

    if(this.options.defaultParams) 
      this.options.parameters += '&' + this.options.defaultParams;
    
    new Ajax.Request(this.url, this.options);
  },

  onComplete: function(request) {
    this.updateChoices(request.responseText);
  }
});

// The local array autocompleter. Used when you'd prefer to
// inject an array of autocompletion options into the page, rather
// than sending out Ajax queries, which can be quite slow sometimes.
//
// The constructor takes four parameters. The first two are, as usual,
// the id of the monitored textbox, and id of the autocompletion menu.
// The third is the array you want to autocomplete from, and the fourth
// is the options block.
//
// Extra local autocompletion options:
// - choices - How many autocompletion choices to offer
//
// - partialSearch - If false, the autocompleter will match entered
//                    text only at the beginning of strings in the 
//                    autocomplete array. Defaults to true, which will
//                    match text at the beginning of any *word* in the
//                    strings in the autocomplete array. If you want to
//                    search anywhere in the string, additionally set
//                    the option fullSearch to true (default: off).
//
// - fullSsearch - Search anywhere in autocomplete array strings.
//
// - partialChars - How many characters to enter before triggering
//                   a partial match (unlike minChars, which defines
//                   how many characters are required to do any match
//                   at all). Defaults to 2.
//
// - ignoreCase - Whether to ignore case when autocompleting.
//                 Defaults to true.
//
// It's possible to pass in a custom function as the 'selector' 
// option, if you prefer to write your own autocompletion logic.
// In that case, the other options above will not apply unless
// you support them.

Autocompleter.Local = Class.create(Autocompleter.Base, {
  initialize: function(element, update, array, options) {
    this.baseInitialize(element, update, options);
    this.options.array = array;
  },

  getUpdatedChoices: function() {
    this.updateChoices(this.options.selector(this));
  },

  setOptions: function(options) {
    this.options = Object.extend({
      choices: 10,
      partialSearch: true,
      partialChars: 2,
      ignoreCase: true,
      fullSearch: false,
      selector: function(instance) {
        var ret       = []; // Beginning matches
        var partial   = []; // Inside matches
        var entry     = instance.getToken();
        var count     = 0;

        for (var i = 0; i < instance.options.array.length &&  
          ret.length < instance.options.choices ; i++) { 

          var elem = instance.options.array[i];
          var foundPos = instance.options.ignoreCase ? 
            elem.toLowerCase().indexOf(entry.toLowerCase()) : 
            elem.indexOf(entry);

          while (foundPos != -1) {
            if (foundPos == 0 && elem.length != entry.length) { 
              ret.push("<li><strong>" + elem.substr(0, entry.length) + "</strong>" + 
                elem.substr(entry.length) + "</li>");
              break;
            } else if (entry.length >= instance.options.partialChars && 
              instance.options.partialSearch && foundPos != -1) {
              if (instance.options.fullSearch || /\s/.test(elem.substr(foundPos-1,1))) {
                partial.push("<li>" + elem.substr(0, foundPos) + "<strong>" +
                  elem.substr(foundPos, entry.length) + "</strong>" + elem.substr(
                  foundPos + entry.length) + "</li>");
                break;
              }
            }

            foundPos = instance.options.ignoreCase ? 
              elem.toLowerCase().indexOf(entry.toLowerCase(), foundPos + 1) : 
              elem.indexOf(entry, foundPos + 1);

          }
        }
        if (partial.length)
          ret = ret.concat(partial.slice(0, instance.options.choices - ret.length))
        return "<ul>" + ret.join('') + "</ul>";
      }
    }, options || { });
  }
});

// AJAX in-place editor and collection editor
// Full rewrite by Christophe Porteneuve <tdd@tddsworld.com> (April 2007).

// Use this if you notice weird scrolling problems on some browsers,
// the DOM might be a bit confused when this gets called so do this
// waits 1 ms (with setTimeout) until it does the activation
Field.scrollFreeActivate = function(field) {
  setTimeout(function() {
    Field.activate(field);
  }, 1);
}

Ajax.InPlaceEditor = Class.create({
  initialize: function(element, url, options) {
    this.url = url;
    this.element = element = $(element);
    this.prepareOptions();
    this._controls = { };
    arguments.callee.dealWithDeprecatedOptions(options); // DEPRECATION LAYER!!!
    Object.extend(this.options, options || { });
    if (!this.options.formId && this.element.id) {
      this.options.formId = this.element.id + '-inplaceeditor';
      if ($(this.options.formId))
        this.options.formId = '';
    }
    if (this.options.externalControl)
      this.options.externalControl = $(this.options.externalControl);
    if (!this.options.externalControl)
      this.options.externalControlOnly = false;
    this._originalBackground = this.element.getStyle('background-color') || 'transparent';
    this.element.title = this.options.clickToEditText;
    this._boundCancelHandler = this.handleFormCancellation.bind(this);
    this._boundComplete = (this.options.onComplete || Prototype.emptyFunction).bind(this);
    this._boundFailureHandler = this.handleAJAXFailure.bind(this);
    this._boundSubmitHandler = this.handleFormSubmission.bind(this);
    this._boundWrapperHandler = this.wrapUp.bind(this);
    this.registerListeners();
  },
  checkForEscapeOrReturn: function(e) {
    if (!this._editing || e.ctrlKey || e.altKey || e.shiftKey) return;
    if (Event.KEY_ESC == e.keyCode)
      this.handleFormCancellation(e);
    else if (Event.KEY_RETURN == e.keyCode)
      this.handleFormSubmission(e);
  },
  createControl: function(mode, handler, extraClasses) {
    var control = this.options[mode + 'Control'];
    var text = this.options[mode + 'Text'];
    if ('button' == control) {
      var btn = document.createElement('input');
      btn.type = 'submit';
      btn.value = text;
      btn.className = 'editor_' + mode + '_button';
      if ('cancel' == mode)
        btn.onclick = this._boundCancelHandler;
      this._form.appendChild(btn);
      this._controls[mode] = btn;
    } else if ('link' == control) {
      var link = document.createElement('a');
      link.href = '#';
      link.appendChild(document.createTextNode(text));
      link.onclick = 'cancel' == mode ? this._boundCancelHandler : this._boundSubmitHandler;
      link.className = 'editor_' + mode + '_link';
      if (extraClasses)
        link.className += ' ' + extraClasses;
      this._form.appendChild(link);
      this._controls[mode] = link;
    }
  },
  createEditField: function() {
    var text = (this.options.loadTextURL ? this.options.loadingText : this.getText());
    var fld;
    if (1 >= this.options.rows && !/\r|\n/.test(this.getText())) {
      fld = document.createElement('input');
      fld.type = 'text';
      var size = this.options.size || this.options.cols || 0;
      if (0 < size) fld.size = size;
    } else {
      fld = document.createElement('textarea');
      fld.rows = (1 >= this.options.rows ? this.options.autoRows : this.options.rows);
      fld.cols = this.options.cols || 40;
    }
    fld.name = this.options.paramName;
    fld.value = text; // No HTML breaks conversion anymore
    fld.className = 'editor_field';
    if (this.options.submitOnBlur)
      fld.onblur = this._boundSubmitHandler;
    this._controls.editor = fld;
    if (this.options.loadTextURL)
      this.loadExternalText();
    this._form.appendChild(this._controls.editor);
  },
  createForm: function() {
    var ipe = this;
    function addText(mode, condition) {
      var text = ipe.options['text' + mode + 'Controls'];
      if (!text || condition === false) return;
      ipe._form.appendChild(document.createTextNode(text));
    };
    this._form = $(document.createElement('form'));
    this._form.id = this.options.formId;
    this._form.addClassName(this.options.formClassName);
    this._form.onsubmit = this._boundSubmitHandler;
    this.createEditField();
    if ('textarea' == this._controls.editor.tagName.toLowerCase())
      this._form.appendChild(document.createElement('br'));
    if (this.options.onFormCustomization)
      this.options.onFormCustomization(this, this._form);
    addText('Before', this.options.okControl || this.options.cancelControl);
    this.createControl('ok', this._boundSubmitHandler);
    addText('Between', this.options.okControl && this.options.cancelControl);
    this.createControl('cancel', this._boundCancelHandler, 'editor_cancel');
    addText('After', this.options.okControl || this.options.cancelControl);
  },
  destroy: function() {
    if (this._oldInnerHTML)
      this.element.innerHTML = this._oldInnerHTML;
    this.leaveEditMode();
    this.unregisterListeners();
  },
  enterEditMode: function(e) {
    if (this._saving || this._editing) return;
    this._editing = true;
    this.triggerCallback('onEnterEditMode');
    if (this.options.externalControl)
      this.options.externalControl.hide();
    this.element.hide();
    this.createForm();
    this.element.parentNode.insertBefore(this._form, this.element);
    if (!this.options.loadTextURL)
      this.postProcessEditField();
    if (e) Event.stop(e);
  },
  enterHover: function(e) {
    if (this.options.hoverClassName)
      this.element.addClassName(this.options.hoverClassName);
    if (this._saving) return;
    this.triggerCallback('onEnterHover');
  },
  getText: function() {
    return this.element.innerHTML;
  },
  handleAJAXFailure: function(transport) {
    this.triggerCallback('onFailure', transport);
    if (this._oldInnerHTML) {
      this.element.innerHTML = this._oldInnerHTML;
      this._oldInnerHTML = null;
    }
  },
  handleFormCancellation: function(e) {
    this.wrapUp();
    if (e) Event.stop(e);
  },
  handleFormSubmission: function(e) {
    var form = this._form;
    var value = $F(this._controls.editor);
    this.prepareSubmission();
    var params = this.options.callback(form, value) || '';
    if (Object.isString(params))
      params = params.toQueryParams();
    params.editorId = this.element.id;
    if (this.options.htmlResponse) {
      var options = Object.extend({ evalScripts: true }, this.options.ajaxOptions);
      Object.extend(options, {
        parameters: params,
        onComplete: this._boundWrapperHandler,
        onFailure: this._boundFailureHandler
      });
      new Ajax.Updater({ success: this.element }, this.url, options);
    } else {
      var options = Object.extend({ method: 'get' }, this.options.ajaxOptions);
      Object.extend(options, {
        parameters: params,
        onComplete: this._boundWrapperHandler,
        onFailure: this._boundFailureHandler
      });
      new Ajax.Request(this.url, options);
    }
    if (e) Event.stop(e);
  },
  leaveEditMode: function() {
    this.element.removeClassName(this.options.savingClassName);
    this.removeForm();
    this.leaveHover();
    this.element.style.backgroundColor = this._originalBackground;
    this.element.show();
    if (this.options.externalControl)
      this.options.externalControl.show();
    this._saving = false;
    this._editing = false;
    this._oldInnerHTML = null;
    this.triggerCallback('onLeaveEditMode');
  },
  leaveHover: function(e) {
    if (this.options.hoverClassName)
      this.element.removeClassName(this.options.hoverClassName);
    if (this._saving) return;
    this.triggerCallback('onLeaveHover');
  },
  loadExternalText: function() {
    this._form.addClassName(this.options.loadingClassName);
    this._controls.editor.disabled = true;
    var options = Object.extend({ method: 'get' }, this.options.ajaxOptions);
    Object.extend(options, {
      parameters: 'editorId=' + encodeURIComponent(this.element.id),
      onComplete: Prototype.emptyFunction,
      onSuccess: function(transport) {
        this._form.removeClassName(this.options.loadingClassName);
        var text = transport.responseText;
        if (this.options.stripLoadedTextTags)
          text = text.stripTags();
        this._controls.editor.value = text;
        this._controls.editor.disabled = false;
        this.postProcessEditField();
      }.bind(this),
      onFailure: this._boundFailureHandler
    });
    new Ajax.Request(this.options.loadTextURL, options);
  },
  postProcessEditField: function() {
    var fpc = this.options.fieldPostCreation;
    if (fpc)
      $(this._controls.editor)['focus' == fpc ? 'focus' : 'activate']();
  },
  prepareOptions: function() {
    this.options = Object.clone(Ajax.InPlaceEditor.DefaultOptions);
    Object.extend(this.options, Ajax.InPlaceEditor.DefaultCallbacks);
    [this._extraDefaultOptions].flatten().compact().each(function(defs) {
      Object.extend(this.options, defs);
    }.bind(this));
  },
  prepareSubmission: function() {
    this._saving = true;
    this.removeForm();
    this.leaveHover();
    this.showSaving();
  },
  registerListeners: function() {
    this._listeners = { };
    var listener;
    $H(Ajax.InPlaceEditor.Listeners).each(function(pair) {
      listener = this[pair.value].bind(this);
      this._listeners[pair.key] = listener;
      if (!this.options.externalControlOnly)
        this.element.observe(pair.key, listener);
      if (this.options.externalControl)
        this.options.externalControl.observe(pair.key, listener);
    }.bind(this));
  },
  removeForm: function() {
    if (!this._form) return;
    this._form.remove();
    this._form = null;
    this._controls = { };
  },
  showSaving: function() {
    this._oldInnerHTML = this.element.innerHTML;
    this.element.innerHTML = this.options.savingText;
    this.element.addClassName(this.options.savingClassName);
    this.element.style.backgroundColor = this._originalBackground;
    this.element.show();
  },
  triggerCallback: function(cbName, arg) {
    if ('function' == typeof this.options[cbName]) {
      this.options[cbName](this, arg);
    }
  },
  unregisterListeners: function() {
    $H(this._listeners).each(function(pair) {
      if (!this.options.externalControlOnly)
        this.element.stopObserving(pair.key, pair.value);
      if (this.options.externalControl)
        this.options.externalControl.stopObserving(pair.key, pair.value);
    }.bind(this));
  },
  wrapUp: function(transport) {
    this.leaveEditMode();
    // Can't use triggerCallback due to backward compatibility: requires
    // binding + direct element
    this._boundComplete(transport, this.element);
  }
});

Object.extend(Ajax.InPlaceEditor.prototype, {
  dispose: Ajax.InPlaceEditor.prototype.destroy
});

Ajax.InPlaceCollectionEditor = Class.create(Ajax.InPlaceEditor, {
  initialize: function($super, element, url, options) {
    this._extraDefaultOptions = Ajax.InPlaceCollectionEditor.DefaultOptions;
    $super(element, url, options);
  },

  createEditField: function() {
    var list = document.createElement('select');
    list.name = this.options.paramName;
    list.size = 1;
    this._controls.editor = list;
    this._collection = this.options.collection || [];
    if (this.options.loadCollectionURL)
      this.loadCollection();
    else
      this.checkForExternalText();
    this._form.appendChild(this._controls.editor);
  },

  loadCollection: function() {
    this._form.addClassName(this.options.loadingClassName);
    this.showLoadingText(this.options.loadingCollectionText);
    var options = Object.extend({ method: 'get' }, this.options.ajaxOptions);
    Object.extend(options, {
      parameters: 'editorId=' + encodeURIComponent(this.element.id),
      onComplete: Prototype.emptyFunction,
      onSuccess: function(transport) {
        var js = transport.responseText.strip();
        if (!/^\[.*\]$/.test(js)) // TODO: improve sanity check
          throw 'Server returned an invalid collection representation.';
        this._collection = eval(js);
        this.checkForExternalText();
      }.bind(this),
      onFailure: this.onFailure
    });
    new Ajax.Request(this.options.loadCollectionURL, options);
  },

  showLoadingText: function(text) {
    this._controls.editor.disabled = true;
    var tempOption = this._controls.editor.firstChild;
    if (!tempOption) {
      tempOption = document.createElement('option');
      tempOption.value = '';
      this._controls.editor.appendChild(tempOption);
      tempOption.selected = true;
    }
    tempOption.update((text || '').stripScripts().stripTags());
  },

  checkForExternalText: function() {
    this._text = this.getText();
    if (this.options.loadTextURL)
      this.loadExternalText();
    else
      this.buildOptionList();
  },

  loadExternalText: function() {
    this.showLoadingText(this.options.loadingText);
    var options = Object.extend({ method: 'get' }, this.options.ajaxOptions);
    Object.extend(options, {
      parameters: 'editorId=' + encodeURIComponent(this.element.id),
      onComplete: Prototype.emptyFunction,
      onSuccess: function(transport) {
        this._text = transport.responseText.strip();
        this.buildOptionList();
      }.bind(this),
      onFailure: this.onFailure
    });
    new Ajax.Request(this.options.loadTextURL, options);
  },

  buildOptionList: function() {
    this._form.removeClassName(this.options.loadingClassName);
    this._collection = this._collection.map(function(entry) {
      return 2 === entry.length ? entry : [entry, entry].flatten();
    });
    var marker = ('value' in this.options) ? this.options.value : this._text;
    var textFound = this._collection.any(function(entry) {
      return entry[0] == marker;
    }.bind(this));
    this._controls.editor.update('');
    var option;
    this._collection.each(function(entry, index) {
      option = document.createElement('option');
      option.value = entry[0];
      option.selected = textFound ? entry[0] == marker : 0 == index;
      option.appendChild(document.createTextNode(entry[1]));
      this._controls.editor.appendChild(option);
    }.bind(this));
    this._controls.editor.disabled = false;
    Field.scrollFreeActivate(this._controls.editor);
  }
});

//**** DEPRECATION LAYER FOR InPlace[Collection]Editor! ****
//**** This only  exists for a while,  in order to  let ****
//**** users adapt to  the new API.  Read up on the new ****
//**** API and convert your code to it ASAP!            ****

Ajax.InPlaceEditor.prototype.initialize.dealWithDeprecatedOptions = function(options) {
  if (!options) return;
  function fallback(name, expr) {
    if (name in options || expr === undefined) return;
    options[name] = expr;
  };
  fallback('cancelControl', (options.cancelLink ? 'link' : (options.cancelButton ? 'button' :
    options.cancelLink == options.cancelButton == false ? false : undefined)));
  fallback('okControl', (options.okLink ? 'link' : (options.okButton ? 'button' :
    options.okLink == options.okButton == false ? false : undefined)));
  fallback('highlightColor', options.highlightcolor);
  fallback('highlightEndColor', options.highlightendcolor);
};

Object.extend(Ajax.InPlaceEditor, {
  DefaultOptions: {
    ajaxOptions: { },
    autoRows: 3,                                // Use when multi-line w/ rows == 1
    cancelControl: 'link',                      // 'link'|'button'|false
    cancelText: 'cancel',
    clickToEditText: 'Click to edit',
    externalControl: null,                      // id|elt
    externalControlOnly: false,
    fieldPostCreation: 'activate',              // 'activate'|'focus'|false
    formClassName: 'inplaceeditor-form',
    formId: null,                               // id|elt
    highlightColor: '#ffff99',
    highlightEndColor: '#ffffff',
    hoverClassName: '',
    htmlResponse: true,
    loadingClassName: 'inplaceeditor-loading',
    loadingText: 'Loading...',
    okControl: 'button',                        // 'link'|'button'|false
    okText: 'ok',
    paramName: 'value',
    rows: 1,                                    // If 1 and multi-line, uses autoRows
    savingClassName: 'inplaceeditor-saving',
    savingText: 'Saving...',
    size: 0,
    stripLoadedTextTags: false,
    submitOnBlur: false,
    textAfterControls: '',
    textBeforeControls: '',
    textBetweenControls: ''
  },
  DefaultCallbacks: {
    callback: function(form) {
      return Form.serialize(form);
    },
    onComplete: function(transport, element) {
      // For backward compatibility, this one is bound to the IPE, and passes
      // the element directly.  It was too often customized, so we don't break it.
      new Effect.Highlight(element, {
        startcolor: this.options.highlightColor, keepBackgroundImage: true });
    },
    onEnterEditMode: null,
    onEnterHover: function(ipe) {
      ipe.element.style.backgroundColor = ipe.options.highlightColor;
      if (ipe._effect)
        ipe._effect.cancel();
    },
    onFailure: function(transport, ipe) {
      alert('Error communication with the server: ' + transport.responseText.stripTags());
    },
    onFormCustomization: null, // Takes the IPE and its generated form, after editor, before controls.
    onLeaveEditMode: null,
    onLeaveHover: function(ipe) {
      ipe._effect = new Effect.Highlight(ipe.element, {
        startcolor: ipe.options.highlightColor, endcolor: ipe.options.highlightEndColor,
        restorecolor: ipe._originalBackground, keepBackgroundImage: true
      });
    }
  },
  Listeners: {
    click: 'enterEditMode',
    keydown: 'checkForEscapeOrReturn',
    mouseover: 'enterHover',
    mouseout: 'leaveHover'
  }
});

Ajax.InPlaceCollectionEditor.DefaultOptions = {
  loadingCollectionText: 'Loading options...'
};

// Delayed observer, like Form.Element.Observer, 
// but waits for delay after last key input
// Ideal for live-search fields

Form.Element.DelayedObserver = Class.create({
  initialize: function(element, delay, callback) {
    this.delay     = delay || 0.5;
    this.element   = $(element);
    this.callback  = callback;
    this.timer     = null;
    this.lastValue = $F(this.element); 
    Event.observe(this.element,'keyup',this.delayedListener.bindAsEventListener(this));
  },
  delayedListener: function(event) {
    if(this.lastValue == $F(this.element)) return;
    if(this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(this.onTimerEvent.bind(this), this.delay * 1000);
    this.lastValue = $F(this.element);
  },
  onTimerEvent: function() {
    this.timer = null;
    this.callback(this.element, $F(this.element));
  }
});

if (!Control) var Control = { };

// options:
//  axis: 'vertical', or 'horizontal' (default)
//
// callbacks:
//  onChange(value)
//  onSlide(value)
Control.Slider = Class.create({
  initialize: function(handle, track, options) {
    var slider = this;
    
    if (Object.isArray(handle)) {
      this.handles = handle.collect( function(e) { return $(e) });
    } else {
      this.handles = [$(handle)];
    }
    
    this.track   = $(track);
    this.options = options || { };

    this.axis      = this.options.axis || 'horizontal';
    this.increment = this.options.increment || 1;
    this.step      = parseInt(this.options.step || '1');
    this.range     = this.options.range || $R(0,1);
    
    this.value     = 0; // assure backwards compat
    this.values    = this.handles.map( function() { return 0 });
    this.spans     = this.options.spans ? this.options.spans.map(function(s){ return $(s) }) : false;
    this.options.startSpan = $(this.options.startSpan || null);
    this.options.endSpan   = $(this.options.endSpan || null);

    this.restricted = this.options.restricted || false;

    this.maximum   = this.options.maximum || this.range.end;
    this.minimum   = this.options.minimum || this.range.start;

    // Will be used to align the handle onto the track, if necessary
    this.alignX = parseInt(this.options.alignX || '0');
    this.alignY = parseInt(this.options.alignY || '0');
    
    this.trackLength = this.maximumOffset() - this.minimumOffset();

    this.handleLength = this.isVertical() ? 
      (this.handles[0].offsetHeight != 0 ? 
        this.handles[0].offsetHeight : this.handles[0].style.height.replace(/px$/,"")) : 
      (this.handles[0].offsetWidth != 0 ? this.handles[0].offsetWidth : 
        this.handles[0].style.width.replace(/px$/,""));

    this.active   = false;
    this.dragging = false;
    this.disabled = false;

    if (this.options.disabled) this.setDisabled();

    // Allowed values array
    this.allowedValues = this.options.values ? this.options.values.sortBy(Prototype.K) : false;
    if (this.allowedValues) {
      this.minimum = this.allowedValues.min();
      this.maximum = this.allowedValues.max();
    }

    this.eventMouseDown = this.startDrag.bindAsEventListener(this);
    this.eventMouseUp   = this.endDrag.bindAsEventListener(this);
    this.eventMouseMove = this.update.bindAsEventListener(this);

    // Initialize handles in reverse (make sure first handle is active)
    this.handles.each( function(h,i) {
      i = slider.handles.length-1-i;
      slider.setValue(parseFloat(
        (Object.isArray(slider.options.sliderValue) ? 
          slider.options.sliderValue[i] : slider.options.sliderValue) || 
         slider.range.start), i);
      h.makePositioned().observe("mousedown", slider.eventMouseDown);
    });
    
    this.track.observe("mousedown", this.eventMouseDown);
    document.observe("mouseup", this.eventMouseUp);
    document.observe("mousemove", this.eventMouseMove);
    
    this.initialized = true;
  },
  dispose: function() {
    var slider = this;    
    Event.stopObserving(this.track, "mousedown", this.eventMouseDown);
    Event.stopObserving(document, "mouseup", this.eventMouseUp);
    Event.stopObserving(document, "mousemove", this.eventMouseMove);
    this.handles.each( function(h) {
      Event.stopObserving(h, "mousedown", slider.eventMouseDown);
    });
  },
  setDisabled: function(){
    this.disabled = true;
  },
  setEnabled: function(){
    this.disabled = false;
  },  
  getNearestValue: function(value){
    if (this.allowedValues){
      if (value >= this.allowedValues.max()) return(this.allowedValues.max());
      if (value <= this.allowedValues.min()) return(this.allowedValues.min());
      
      var offset = Math.abs(this.allowedValues[0] - value);
      var newValue = this.allowedValues[0];
      this.allowedValues.each( function(v) {
        var currentOffset = Math.abs(v - value);
        if (currentOffset <= offset){
          newValue = v;
          offset = currentOffset;
        } 
      });
      return newValue;
    }
    if (value > this.range.end) return this.range.end;
    if (value < this.range.start) return this.range.start;
    return value;
  },
  setValue: function(sliderValue, handleIdx){
    if (!this.active) {
      this.activeHandleIdx = handleIdx || 0;
      this.activeHandle    = this.handles[this.activeHandleIdx];
      this.updateStyles();
    }
    handleIdx = handleIdx || this.activeHandleIdx || 0;
    if (this.initialized && this.restricted) {
      if ((handleIdx>0) && (sliderValue<this.values[handleIdx-1]))
        sliderValue = this.values[handleIdx-1];
      if ((handleIdx < (this.handles.length-1)) && (sliderValue>this.values[handleIdx+1]))
        sliderValue = this.values[handleIdx+1];
    }
    sliderValue = this.getNearestValue(sliderValue);
    this.values[handleIdx] = sliderValue;
    this.value = this.values[0]; // assure backwards compat
    
    this.handles[handleIdx].style[this.isVertical() ? 'top' : 'left'] = 
      this.translateToPx(sliderValue);
    
    this.drawSpans();
    if (!this.dragging || !this.event) this.updateFinished();
  },
  setValueBy: function(delta, handleIdx) {
    this.setValue(this.values[handleIdx || this.activeHandleIdx || 0] + delta, 
      handleIdx || this.activeHandleIdx || 0);
  },
  translateToPx: function(value) {
    return Math.round(
      ((this.trackLength-this.handleLength)/(this.range.end-this.range.start)) * 
      (value - this.range.start)) + "px";
  },
  translateToValue: function(offset) {
    return ((offset/(this.trackLength-this.handleLength) * 
      (this.range.end-this.range.start)) + this.range.start);
  },
  getRange: function(range) {
    var v = this.values.sortBy(Prototype.K); 
    range = range || 0;
    return $R(v[range],v[range+1]);
  },
  minimumOffset: function(){
    return(this.isVertical() ? this.alignY : this.alignX);
  },
  maximumOffset: function(){
    return(this.isVertical() ? 
      (this.track.offsetHeight != 0 ? this.track.offsetHeight :
        this.track.style.height.replace(/px$/,"")) - this.alignY : 
      (this.track.offsetWidth != 0 ? this.track.offsetWidth : 
        this.track.style.width.replace(/px$/,"")) - this.alignX);
  },  
  isVertical:  function(){
    return (this.axis == 'vertical');
  },
  drawSpans: function() {
    var slider = this;
    if (this.spans)
      $R(0, this.spans.length-1).each(function(r) { slider.setSpan(slider.spans[r], slider.getRange(r)) });
    if (this.options.startSpan)
      this.setSpan(this.options.startSpan,
        $R(0, this.values.length>1 ? this.getRange(0).min() : this.value ));
    if (this.options.endSpan)
      this.setSpan(this.options.endSpan, 
        $R(this.values.length>1 ? this.getRange(this.spans.length-1).max() : this.value, this.maximum));
  },
  setSpan: function(span, range) {
    if (this.isVertical()) {
      span.style.top = this.translateToPx(range.start);
      span.style.height = this.translateToPx(range.end - range.start + this.range.start);
    } else {
      span.style.left = this.translateToPx(range.start);
      span.style.width = this.translateToPx(range.end - range.start + this.range.start);
    }
  },
  updateStyles: function() {
    this.handles.each( function(h){ Element.removeClassName(h, 'selected') });
    Element.addClassName(this.activeHandle, 'selected');
  },
  startDrag: function(event) {
    if (Event.isLeftClick(event)) {
      if (!this.disabled){
        this.active = true;
        
        var handle = Event.element(event);
        var pointer  = [Event.pointerX(event), Event.pointerY(event)];
        var track = handle;
        if (track==this.track) {
          var offsets  = Position.cumulativeOffset(this.track); 
          this.event = event;
          this.setValue(this.translateToValue( 
           (this.isVertical() ? pointer[1]-offsets[1] : pointer[0]-offsets[0])-(this.handleLength/2)
          ));
          var offsets  = Position.cumulativeOffset(this.activeHandle);
          this.offsetX = (pointer[0] - offsets[0]);
          this.offsetY = (pointer[1] - offsets[1]);
        } else {
          // find the handle (prevents issues with Safari)
          while((this.handles.indexOf(handle) == -1) && handle.parentNode) 
            handle = handle.parentNode;
            
          if (this.handles.indexOf(handle)!=-1) {
            this.activeHandle    = handle;
            this.activeHandleIdx = this.handles.indexOf(this.activeHandle);
            this.updateStyles();
            
            var offsets  = Position.cumulativeOffset(this.activeHandle);
            this.offsetX = (pointer[0] - offsets[0]);
            this.offsetY = (pointer[1] - offsets[1]);
          }
        }
      }
      Event.stop(event);
    }
  },
  update: function(event) {
   if (this.active) {
      if (!this.dragging) this.dragging = true;
      this.draw(event);
      if (Prototype.Browser.WebKit) window.scrollBy(0,0);
      Event.stop(event);
   }
  },
  draw: function(event) {
    var pointer = [Event.pointerX(event), Event.pointerY(event)];
    var offsets = Position.cumulativeOffset(this.track);
    pointer[0] -= this.offsetX + offsets[0];
    pointer[1] -= this.offsetY + offsets[1];
    this.event = event;
    this.setValue(this.translateToValue( this.isVertical() ? pointer[1] : pointer[0] ));
    if (this.initialized && this.options.onSlide)
      this.options.onSlide(this.values.length>1 ? this.values : this.value, this);
  },
  endDrag: function(event) {
    if (this.active && this.dragging) {
      this.finishDrag(event, true);
      Event.stop(event);
    }
    this.active = false;
    this.dragging = false;
  },  
  finishDrag: function(event, success) {
    this.active = false;
    this.dragging = false;
    this.updateFinished();
  },
  updateFinished: function() {
    if (this.initialized && this.options.onChange) 
      this.options.onChange(this.values.length>1 ? this.values : this.value, this);
    this.event = null;
  }
});

if(Object.isUndefined(Effect))
  throw("dragdrop.js requires including script.aculo.us' effects.js library");

var Droppables = {
  drops: [],

  remove: function(element) {
    this.drops = this.drops.reject(function(d) { return d.element==$(element) });
  },

  add: function(element) {
    element = $(element);
    var options = Object.extend({
      greedy:     true,
      hoverclass: null,
      tree:       false
    }, arguments[1] || { });

    // cache containers
    if(options.containment) {
      options._containers = [];
      var containment = options.containment;
      if(Object.isArray(containment)) {
        containment.each( function(c) { options._containers.push($(c)) });
      } else {
        options._containers.push($(containment));
      }
    }
    
    if(options.accept) options.accept = [options.accept].flatten();

    Element.makePositioned(element); // fix IE
    options.element = element;

    this.drops.push(options);
  },
  
  findDeepestChild: function(drops) {
    deepest = drops[0];
      
    for (i = 1; i < drops.length; ++i)
      if (Element.isParent(drops[i].element, deepest.element))
        deepest = drops[i];
    
    return deepest;
  },

  isContained: function(element, drop) {
    var containmentNode;
    if(drop.tree) {
      containmentNode = element.treeNode; 
    } else {
      containmentNode = element.parentNode;
    }
    return drop._containers.detect(function(c) { return containmentNode == c });
  },
  
  isAffected: function(point, element, drop) {
    return (
      (drop.element!=element) &&
      ((!drop._containers) ||
        this.isContained(element, drop)) &&
      ((!drop.accept) ||
        (Element.classNames(element).detect( 
          function(v) { return drop.accept.include(v) } ) )) &&
      Position.within(drop.element, point[0], point[1]) );
  },

  deactivate: function(drop) {
    if(drop.hoverclass)
      Element.removeClassName(drop.element, drop.hoverclass);
    this.last_active = null;
  },

  activate: function(drop) {
    if(drop.hoverclass)
      Element.addClassName(drop.element, drop.hoverclass);
    this.last_active = drop;
  },

  show: function(point, element) {
    if(!this.drops.length) return;
    var drop, affected = [];
    
    this.drops.each( function(drop) {
      if(Droppables.isAffected(point, element, drop))
        affected.push(drop);
    });
        
    if(affected.length>0)
      drop = Droppables.findDeepestChild(affected);

    if(this.last_active && this.last_active != drop) this.deactivate(this.last_active);
    if (drop) {
      Position.within(drop.element, point[0], point[1]);
      if(drop.onHover)
        drop.onHover(element, drop.element, Position.overlap(drop.overlap, drop.element));
      
      if (drop != this.last_active) Droppables.activate(drop);
    }
  },

  fire: function(event, element) {
    if(!this.last_active) return;
    Position.prepare();

    if (this.isAffected([Event.pointerX(event), Event.pointerY(event)], element, this.last_active))
      if (this.last_active.onDrop) {
        this.last_active.onDrop(element, this.last_active.element, event); 
        return true; 
      }
  },

  reset: function() {
    if(this.last_active)
      this.deactivate(this.last_active);
  }
}

var Draggables = {
  drags: [],
  observers: [],
  
  register: function(draggable) {
    if(this.drags.length == 0) {
      this.eventMouseUp   = this.endDrag.bindAsEventListener(this);
      this.eventMouseMove = this.updateDrag.bindAsEventListener(this);
      this.eventKeypress  = this.keyPress.bindAsEventListener(this);
      
      Event.observe(document, "mouseup", this.eventMouseUp);
      Event.observe(document, "mousemove", this.eventMouseMove);
      Event.observe(document, "keypress", this.eventKeypress);
    }
    this.drags.push(draggable);
  },
  
  unregister: function(draggable) {
    this.drags = this.drags.reject(function(d) { return d==draggable });
    if(this.drags.length == 0) {
      Event.stopObserving(document, "mouseup", this.eventMouseUp);
      Event.stopObserving(document, "mousemove", this.eventMouseMove);
      Event.stopObserving(document, "keypress", this.eventKeypress);
    }
  },
  
  activate: function(draggable) {
    if(draggable.options.delay) { 
      this._timeout = setTimeout(function() { 
        Draggables._timeout = null; 
        window.focus(); 
        Draggables.activeDraggable = draggable; 
      }.bind(this), draggable.options.delay); 
    } else {
      window.focus(); // allows keypress events if window isn't currently focused, fails for Safari
      this.activeDraggable = draggable;
    }
  },
  
  deactivate: function() {
    this.activeDraggable = null;
  },
  
  updateDrag: function(event) {
    if(!this.activeDraggable) return;
    var pointer = [Event.pointerX(event), Event.pointerY(event)];
    // Mozilla-based browsers fire successive mousemove events with
    // the same coordinates, prevent needless redrawing (moz bug?)
    if(this._lastPointer && (this._lastPointer.inspect() == pointer.inspect())) return;
    this._lastPointer = pointer;
    
    this.activeDraggable.updateDrag(event, pointer);
  },
  
  endDrag: function(event) {
    if(this._timeout) { 
      clearTimeout(this._timeout); 
      this._timeout = null; 
    }
    if(!this.activeDraggable) return;
    this._lastPointer = null;
    this.activeDraggable.endDrag(event);
    this.activeDraggable = null;
  },
  
  keyPress: function(event) {
    if(this.activeDraggable)
      this.activeDraggable.keyPress(event);
  },
  
  addObserver: function(observer) {
    this.observers.push(observer);
    this._cacheObserverCallbacks();
  },
  
  removeObserver: function(element) {  // element instead of observer fixes mem leaks
    this.observers = this.observers.reject( function(o) { return o.element==element });
    this._cacheObserverCallbacks();
  },
  
  notify: function(eventName, draggable, event) {  // 'onStart', 'onEnd', 'onDrag'
    if(this[eventName+'Count'] > 0)
      this.observers.each( function(o) {
        if(o[eventName]) o[eventName](eventName, draggable, event);
      });
    if(draggable.options[eventName]) draggable.options[eventName](draggable, event);
  },
  
  _cacheObserverCallbacks: function() {
    ['onStart','onEnd','onDrag'].each( function(eventName) {
      Draggables[eventName+'Count'] = Draggables.observers.select(
        function(o) { return o[eventName]; }
      ).length;
    });
  }
}

/*--------------------------------------------------------------------------*/

var Draggable = Class.create({
  initialize: function(element) {
    var defaults = {
      handle: false,
      reverteffect: function(element, top_offset, left_offset) {
        var dur = Math.sqrt(Math.abs(top_offset^2)+Math.abs(left_offset^2))*0.02;
        new Effect.Move(element, { x: -left_offset, y: -top_offset, duration: dur,
          queue: {scope:'_draggable', position:'end'}
        });
      },
      endeffect: function(element) {
        var toOpacity = Object.isNumber(element._opacity) ? element._opacity : 1.0;
        new Effect.Opacity(element, {duration:0.2, from:0.7, to:toOpacity, 
          queue: {scope:'_draggable', position:'end'},
          afterFinish: function(){ 
            Draggable._dragging[element] = false 
          }
        }); 
      },
      zindex: 1000,
      revert: false,
      quiet: false,
      scroll: false,
      scrollSensitivity: 20,
      scrollSpeed: 15,
      snap: false,  // false, or xy or [x,y] or function(x,y){ return [x,y] }
      delay: 0
    };
    
    if(!arguments[1] || Object.isUndefined(arguments[1].endeffect))
      Object.extend(defaults, {
        starteffect: function(element) {
          element._opacity = Element.getOpacity(element);
          Draggable._dragging[element] = true;
          new Effect.Opacity(element, {duration:0.2, from:element._opacity, to:0.7}); 
        }
      });
    
    var options = Object.extend(defaults, arguments[1] || { });

    this.element = $(element);
    
    if(options.handle && Object.isString(options.handle))
      this.handle = this.element.down('.'+options.handle, 0);
    
    if(!this.handle) this.handle = $(options.handle);
    if(!this.handle) this.handle = this.element;
    
    if(options.scroll && !options.scroll.scrollTo && !options.scroll.outerHTML) {
      options.scroll = $(options.scroll);
      this._isScrollChild = Element.childOf(this.element, options.scroll);
    }

    Element.makePositioned(this.element); // fix IE    

    this.options  = options;
    this.dragging = false;   

    this.eventMouseDown = this.initDrag.bindAsEventListener(this);
    Event.observe(this.handle, "mousedown", this.eventMouseDown);
    
    Draggables.register(this);
  },
  
  destroy: function() {
    Event.stopObserving(this.handle, "mousedown", this.eventMouseDown);
    Draggables.unregister(this);
  },
  
  currentDelta: function() {
    return([
      parseInt(Element.getStyle(this.element,'left') || '0'),
      parseInt(Element.getStyle(this.element,'top') || '0')]);
  },
  
  initDrag: function(event) {
    if(!Object.isUndefined(Draggable._dragging[this.element]) &&
      Draggable._dragging[this.element]) return;
    if(Event.isLeftClick(event)) {    
      // abort on form elements, fixes a Firefox issue
      var src = Event.element(event);
      if((tag_name = src.tagName.toUpperCase()) && (
        tag_name=='INPUT' ||
        tag_name=='SELECT' ||
        tag_name=='OPTION' ||
        tag_name=='BUTTON' ||
        tag_name=='TEXTAREA')) return;
        
      var pointer = [Event.pointerX(event), Event.pointerY(event)];
      var pos     = Position.cumulativeOffset(this.element);
      this.offset = [0,1].map( function(i) { return (pointer[i] - pos[i]) });
      
      Draggables.activate(this);
      Event.stop(event);
    }
  },
  
  startDrag: function(event) {
    this.dragging = true;
    if(!this.delta)
      this.delta = this.currentDelta();
    
    if(this.options.zindex) {
      this.originalZ = parseInt(Element.getStyle(this.element,'z-index') || 0);
      this.element.style.zIndex = this.options.zindex;
    }
    
    if(this.options.ghosting) {
      this._clone = this.element.cloneNode(true);
      this.element._originallyAbsolute = (this.element.getStyle('position') == 'absolute');
      if (!this.element._originallyAbsolute)
        Position.absolutize(this.element);
      this.element.parentNode.insertBefore(this._clone, this.element);
    }
    
    if(this.options.scroll) {
      if (this.options.scroll == window) {
        var where = this._getWindowScroll(this.options.scroll);
        this.originalScrollLeft = where.left;
        this.originalScrollTop = where.top;
      } else {
        this.originalScrollLeft = this.options.scroll.scrollLeft;
        this.originalScrollTop = this.options.scroll.scrollTop;
      }
    }
    
    Draggables.notify('onStart', this, event);
        
    if(this.options.starteffect) this.options.starteffect(this.element);
  },
  
  updateDrag: function(event, pointer) {
    if(!this.dragging) this.startDrag(event);
    
    if(!this.options.quiet){
      Position.prepare();
      Droppables.show(pointer, this.element);
    }
    
    Draggables.notify('onDrag', this, event);
    
    this.draw(pointer);
    if(this.options.change) this.options.change(this);
    
    if(this.options.scroll) {
      this.stopScrolling();
      
      var p;
      if (this.options.scroll == window) {
        with(this._getWindowScroll(this.options.scroll)) { p = [ left, top, left+width, top+height ]; }
      } else {
        p = Position.page(this.options.scroll);
        p[0] += this.options.scroll.scrollLeft + Position.deltaX;
        p[1] += this.options.scroll.scrollTop + Position.deltaY;
        p.push(p[0]+this.options.scroll.offsetWidth);
        p.push(p[1]+this.options.scroll.offsetHeight);
      }
      var speed = [0,0];
      if(pointer[0] < (p[0]+this.options.scrollSensitivity)) speed[0] = pointer[0]-(p[0]+this.options.scrollSensitivity);
      if(pointer[1] < (p[1]+this.options.scrollSensitivity)) speed[1] = pointer[1]-(p[1]+this.options.scrollSensitivity);
      if(pointer[0] > (p[2]-this.options.scrollSensitivity)) speed[0] = pointer[0]-(p[2]-this.options.scrollSensitivity);
      if(pointer[1] > (p[3]-this.options.scrollSensitivity)) speed[1] = pointer[1]-(p[3]-this.options.scrollSensitivity);
      this.startScrolling(speed);
    }
    
    // fix AppleWebKit rendering
    if(Prototype.Browser.WebKit) window.scrollBy(0,0);
    
    Event.stop(event);
  },
  
  finishDrag: function(event, success) {
    this.dragging = false;
    
    if(this.options.quiet){
      Position.prepare();
      var pointer = [Event.pointerX(event), Event.pointerY(event)];
      Droppables.show(pointer, this.element);
    }

    if(this.options.ghosting) {
      if (!this.element._originallyAbsolute)
        Position.relativize(this.element);
      delete this.element._originallyAbsolute;
      Element.remove(this._clone);
      this._clone = null;
    }

    var dropped = false; 
    if(success) { 
      dropped = Droppables.fire(event, this.element); 
      if (!dropped) dropped = false; 
    }
    if(dropped && this.options.onDropped) this.options.onDropped(this.element);
    Draggables.notify('onEnd', this, event);

    var revert = this.options.revert;
    if(revert && Object.isFunction(revert)) revert = revert(this.element);
    
    var d = this.currentDelta();
    if(revert && this.options.reverteffect) {
      if (dropped == 0 || revert != 'failure')
        this.options.reverteffect(this.element,
          d[1]-this.delta[1], d[0]-this.delta[0]);
    } else {
      this.delta = d;
    }

    if(this.options.zindex)
      this.element.style.zIndex = this.originalZ;

    if(this.options.endeffect) 
      this.options.endeffect(this.element);
      
    Draggables.deactivate(this);
    Droppables.reset();
  },
  
  keyPress: function(event) {
    if(event.keyCode!=Event.KEY_ESC) return;
    this.finishDrag(event, false);
    Event.stop(event);
  },
  
  endDrag: function(event) {
    if(!this.dragging) return;
    this.stopScrolling();
    this.finishDrag(event, true);
    Event.stop(event);
  },
  
  draw: function(point) {
    var pos = Position.cumulativeOffset(this.element);
    if(this.options.ghosting) {
      var r   = Position.realOffset(this.element);
      pos[0] += r[0] - Position.deltaX; pos[1] += r[1] - Position.deltaY;
    }
    
    var d = this.currentDelta();
    pos[0] -= d[0]; pos[1] -= d[1];
    
    if(this.options.scroll && (this.options.scroll != window && this._isScrollChild)) {
      pos[0] -= this.options.scroll.scrollLeft-this.originalScrollLeft;
      pos[1] -= this.options.scroll.scrollTop-this.originalScrollTop;
    }
    
    var p = [0,1].map(function(i){ 
      return (point[i]-pos[i]-this.offset[i]) 
    }.bind(this));
    
    if(this.options.snap) {
      if(Object.isFunction(this.options.snap)) {
        p = this.options.snap(p[0],p[1],this);
      } else {
      if(Object.isArray(this.options.snap)) {
        p = p.map( function(v, i) {
          return (v/this.options.snap[i]).round()*this.options.snap[i] }.bind(this))
      } else {
        p = p.map( function(v) {
          return (v/this.options.snap).round()*this.options.snap }.bind(this))
      }
    }}
    
    var style = this.element.style;
    if((!this.options.constraint) || (this.options.constraint=='horizontal'))
      style.left = p[0] + "px";
    if((!this.options.constraint) || (this.options.constraint=='vertical'))
      style.top  = p[1] + "px";
    
    if(style.visibility=="hidden") style.visibility = ""; // fix gecko rendering
  },
  
  stopScrolling: function() {
    if(this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
      Draggables._lastScrollPointer = null;
    }
  },
  
  startScrolling: function(speed) {
    if(!(speed[0] || speed[1])) return;
    this.scrollSpeed = [speed[0]*this.options.scrollSpeed,speed[1]*this.options.scrollSpeed];
    this.lastScrolled = new Date();
    this.scrollInterval = setInterval(this.scroll.bind(this), 10);
  },
  
  scroll: function() {
    var current = new Date();
    var delta = current - this.lastScrolled;
    this.lastScrolled = current;
    if(this.options.scroll == window) {
      with (this._getWindowScroll(this.options.scroll)) {
        if (this.scrollSpeed[0] || this.scrollSpeed[1]) {
          var d = delta / 1000;
          this.options.scroll.scrollTo( left + d*this.scrollSpeed[0], top + d*this.scrollSpeed[1] );
        }
      }
    } else {
      this.options.scroll.scrollLeft += this.scrollSpeed[0] * delta / 1000;
      this.options.scroll.scrollTop  += this.scrollSpeed[1] * delta / 1000;
    }
    
    Position.prepare();
    Droppables.show(Draggables._lastPointer, this.element);
    Draggables.notify('onDrag', this);
    if (this._isScrollChild) {
      Draggables._lastScrollPointer = Draggables._lastScrollPointer || $A(Draggables._lastPointer);
      Draggables._lastScrollPointer[0] += this.scrollSpeed[0] * delta / 1000;
      Draggables._lastScrollPointer[1] += this.scrollSpeed[1] * delta / 1000;
      if (Draggables._lastScrollPointer[0] < 0)
        Draggables._lastScrollPointer[0] = 0;
      if (Draggables._lastScrollPointer[1] < 0)
        Draggables._lastScrollPointer[1] = 0;
      this.draw(Draggables._lastScrollPointer);
    }
    
    if(this.options.change) this.options.change(this);
  },
  
  _getWindowScroll: function(w) {
    var T, L, W, H;
    with (w.document) {
      if (w.document.documentElement && documentElement.scrollTop) {
        T = documentElement.scrollTop;
        L = documentElement.scrollLeft;
      } else if (w.document.body) {
        T = body.scrollTop;
        L = body.scrollLeft;
      }
      if (w.innerWidth) {
        W = w.innerWidth;
        H = w.innerHeight;
      } else if (w.document.documentElement && documentElement.clientWidth) {
        W = documentElement.clientWidth;
        H = documentElement.clientHeight;
      } else {
        W = body.offsetWidth;
        H = body.offsetHeight
      }
    }
    return { top: T, left: L, width: W, height: H };
  }
});

Draggable._dragging = { };

/*--------------------------------------------------------------------------*/

var SortableObserver = Class.create({
  initialize: function(element, observer) {
    this.element   = $(element);
    this.observer  = observer;
    this.lastValue = Sortable.serialize(this.element);
  },
  
  onStart: function() {
    this.lastValue = Sortable.serialize(this.element);
  },
  
  onEnd: function() {
    Sortable.unmark();
    if(this.lastValue != Sortable.serialize(this.element))
      this.observer(this.element)
  }
});

var Sortable = {
  SERIALIZE_RULE: /^[^_\-](?:[A-Za-z0-9\-\_]*)[_](.*)$/,
  
  sortables: { },
  
  _findRootElement: function(element) {
    while (element.tagName.toUpperCase() != "BODY") {  
      if(element.id && Sortable.sortables[element.id]) return element;
      element = element.parentNode;
    }
  },

  options: function(element) {
    element = Sortable._findRootElement($(element));
    if(!element) return;
    return Sortable.sortables[element.id];
  },
  
  destroy: function(element){
    var s = Sortable.options(element);
    
    if(s) {
      Draggables.removeObserver(s.element);
      s.droppables.each(function(d){ Droppables.remove(d) });
      s.draggables.invoke('destroy');
      
      delete Sortable.sortables[s.element.id];
    }
  },

  create: function(element) {
    element = $(element);
    var options = Object.extend({ 
      element:     element,
      tag:         'li',       // assumes li children, override with tag: 'tagname'
      dropOnEmpty: false,
      tree:        false,
      treeTag:     'ul',
      overlap:     'vertical', // one of 'vertical', 'horizontal'
      constraint:  'vertical', // one of 'vertical', 'horizontal', false
      containment: element,    // also takes array of elements (or id's); or false
      handle:      false,      // or a CSS class
      only:        false,
      delay:       0,
      hoverclass:  null,
      ghosting:    false,
      quiet:       false, 
      scroll:      false,
      scrollSensitivity: 20,
      scrollSpeed: 15,
      format:      this.SERIALIZE_RULE,
      
      // these take arrays of elements or ids and can be 
      // used for better initialization performance
      elements:    false,
      handles:     false,
      
      onChange:    Prototype.emptyFunction,
      onUpdate:    Prototype.emptyFunction
    }, arguments[1] || { });

    // clear any old sortable with same element
    this.destroy(element);

    // build options for the draggables
    var options_for_draggable = {
      revert:      true,
      quiet:       options.quiet,
      scroll:      options.scroll,
      scrollSpeed: options.scrollSpeed,
      scrollSensitivity: options.scrollSensitivity,
      delay:       options.delay,
      ghosting:    options.ghosting,
      constraint:  options.constraint,
      handle:      options.handle };

    if(options.starteffect)
      options_for_draggable.starteffect = options.starteffect;

    if(options.reverteffect)
      options_for_draggable.reverteffect = options.reverteffect;
    else
      if(options.ghosting) options_for_draggable.reverteffect = function(element) {
        element.style.top  = 0;
        element.style.left = 0;
      };

    if(options.endeffect)
      options_for_draggable.endeffect = options.endeffect;

    if(options.zindex)
      options_for_draggable.zindex = options.zindex;

    // build options for the droppables  
    var options_for_droppable = {
      overlap:     options.overlap,
      containment: options.containment,
      tree:        options.tree,
      hoverclass:  options.hoverclass,
      onHover:     Sortable.onHover
    }
    
    var options_for_tree = {
      onHover:      Sortable.onEmptyHover,
      overlap:      options.overlap,
      containment:  options.containment,
      hoverclass:   options.hoverclass
    }

    // fix for gecko engine
    Element.cleanWhitespace(element); 

    options.draggables = [];
    options.droppables = [];

    // drop on empty handling
    if(options.dropOnEmpty || options.tree) {
      Droppables.add(element, options_for_tree);
      options.droppables.push(element);
    }

    (options.elements || this.findElements(element, options) || []).each( function(e,i) {
      var handle = options.handles ? $(options.handles[i]) :
        (options.handle ? $(e).select('.' + options.handle)[0] : e); 
      options.draggables.push(
        new Draggable(e, Object.extend(options_for_draggable, { handle: handle })));
      Droppables.add(e, options_for_droppable);
      if(options.tree) e.treeNode = element;
      options.droppables.push(e);      
    });
    
    if(options.tree) {
      (Sortable.findTreeElements(element, options) || []).each( function(e) {
        Droppables.add(e, options_for_tree);
        e.treeNode = element;
        options.droppables.push(e);
      });
    }

    // keep reference
    this.sortables[element.id] = options;

    // for onupdate
    Draggables.addObserver(new SortableObserver(element, options.onUpdate));

  },

  // return all suitable-for-sortable elements in a guaranteed order
  findElements: function(element, options) {
    return Element.findChildren(
      element, options.only, options.tree ? true : false, options.tag);
  },
  
  findTreeElements: function(element, options) {
    return Element.findChildren(
      element, options.only, options.tree ? true : false, options.treeTag);
  },

  onHover: function(element, dropon, overlap) {
    if(Element.isParent(dropon, element)) return;

    if(overlap > .33 && overlap < .66 && Sortable.options(dropon).tree) {
      return;
    } else if(overlap>0.5) {
      Sortable.mark(dropon, 'before');
      if(dropon.previousSibling != element) {
        var oldParentNode = element.parentNode;
        element.style.visibility = "hidden"; // fix gecko rendering
        dropon.parentNode.insertBefore(element, dropon);
        if(dropon.parentNode!=oldParentNode) 
          Sortable.options(oldParentNode).onChange(element);
        Sortable.options(dropon.parentNode).onChange(element);
      }
    } else {
      Sortable.mark(dropon, 'after');
      var nextElement = dropon.nextSibling || null;
      if(nextElement != element) {
        var oldParentNode = element.parentNode;
        element.style.visibility = "hidden"; // fix gecko rendering
        dropon.parentNode.insertBefore(element, nextElement);
        if(dropon.parentNode!=oldParentNode) 
          Sortable.options(oldParentNode).onChange(element);
        Sortable.options(dropon.parentNode).onChange(element);
      }
    }
  },
  
  onEmptyHover: function(element, dropon, overlap) {
    var oldParentNode = element.parentNode;
    var droponOptions = Sortable.options(dropon);
        
    if(!Element.isParent(dropon, element)) {
      var index;
      
      var children = Sortable.findElements(dropon, {tag: droponOptions.tag, only: droponOptions.only});
      var child = null;
            
      if(children) {
        var offset = Element.offsetSize(dropon, droponOptions.overlap) * (1.0 - overlap);
        
        for (index = 0; index < children.length; index += 1) {
          if (offset - Element.offsetSize (children[index], droponOptions.overlap) >= 0) {
            offset -= Element.offsetSize (children[index], droponOptions.overlap);
          } else if (offset - (Element.offsetSize (children[index], droponOptions.overlap) / 2) >= 0) {
            child = index + 1 < children.length ? children[index + 1] : null;
            break;
          } else {
            child = children[index];
            break;
          }
        }
      }
      
      dropon.insertBefore(element, child);
      
      Sortable.options(oldParentNode).onChange(element);
      droponOptions.onChange(element);
    }
  },

  unmark: function() {
    if(Sortable._marker) Sortable._marker.hide();
  },

  mark: function(dropon, position) {
    // mark on ghosting only
    var sortable = Sortable.options(dropon.parentNode);
    if(sortable && !sortable.ghosting) return; 

    if(!Sortable._marker) {
      Sortable._marker = 
        ($('dropmarker') || Element.extend(document.createElement('DIV'))).
          hide().addClassName('dropmarker').setStyle({position:'absolute'});
      document.getElementsByTagName("body").item(0).appendChild(Sortable._marker);
    }    
    var offsets = Position.cumulativeOffset(dropon);
    Sortable._marker.setStyle({left: offsets[0]+'px', top: offsets[1] + 'px'});
    
    if(position=='after')
      if(sortable.overlap == 'horizontal') 
        Sortable._marker.setStyle({left: (offsets[0]+dropon.clientWidth) + 'px'});
      else
        Sortable._marker.setStyle({top: (offsets[1]+dropon.clientHeight) + 'px'});
    
    Sortable._marker.show();
  },
  
  _tree: function(element, options, parent) {
    var children = Sortable.findElements(element, options) || [];
  
    for (var i = 0; i < children.length; ++i) {
      var match = children[i].id.match(options.format);

      if (!match) continue;
      
      var child = {
        id: encodeURIComponent(match ? match[1] : null),
        element: element,
        parent: parent,
        children: [],
        position: parent.children.length,
        container: $(children[i]).down(options.treeTag)
      }
      
      /* Get the element containing the children and recurse over it */
      if (child.container)
        this._tree(child.container, options, child)
      
      parent.children.push (child);
    }

    return parent; 
  },

  tree: function(element) {
    element = $(element);
    var sortableOptions = this.options(element);
    var options = Object.extend({
      tag: sortableOptions.tag,
      treeTag: sortableOptions.treeTag,
      only: sortableOptions.only,
      name: element.id,
      format: sortableOptions.format
    }, arguments[1] || { });
    
    var root = {
      id: null,
      parent: null,
      children: [],
      container: element,
      position: 0
    }
    
    return Sortable._tree(element, options, root);
  },

  /* Construct a [i] index for a particular node */
  _constructIndex: function(node) {
    var index = '';
    do {
      if (node.id) index = '[' + node.position + ']' + index;
    } while ((node = node.parent) != null);
    return index;
  },

  sequence: function(element) {
    element = $(element);
    var options = Object.extend(this.options(element), arguments[1] || { });
    
    return $(this.findElements(element, options) || []).map( function(item) {
      return item.id.match(options.format) ? item.id.match(options.format)[1] : '';
    });
  },

  setSequence: function(element, new_sequence) {
    element = $(element);
    var options = Object.extend(this.options(element), arguments[2] || { });
    
    var nodeMap = { };
    this.findElements(element, options).each( function(n) {
        if (n.id.match(options.format))
            nodeMap[n.id.match(options.format)[1]] = [n, n.parentNode];
        n.parentNode.removeChild(n);
    });
   
    new_sequence.each(function(ident) {
      var n = nodeMap[ident];
      if (n) {
        n[1].appendChild(n[0]);
        delete nodeMap[ident];
      }
    });
  },
  
  serialize: function(element) {
    element = $(element);
    var options = Object.extend(Sortable.options(element), arguments[1] || { });
    var name = encodeURIComponent(
      (arguments[1] && arguments[1].name) ? arguments[1].name : element.id);
    
    if (options.tree) {
      return Sortable.tree(element, arguments[1]).children.map( function (item) {
        return [name + Sortable._constructIndex(item) + "[id]=" + 
                encodeURIComponent(item.id)].concat(item.children.map(arguments.callee));
      }).flatten().join('&');
    } else {
      return Sortable.sequence(element, arguments[1]).map( function(item) {
        return name + "[]=" + encodeURIComponent(item);
      }).join('&');
    }
  }
}

// Returns true if child is contained within element
Element.isParent = function(child, element) {
  if (!child.parentNode || child == element) return false;
  if (child.parentNode == element) return true;
  return Element.isParent(child.parentNode, element);
}

Element.findChildren = function(element, only, recursive, tagName) {   
  if(!element.hasChildNodes()) return null;
  tagName = tagName.toUpperCase();
  if(only) only = [only].flatten();
  var elements = [];
  $A(element.childNodes).each( function(e) {
    if(e.tagName && e.tagName.toUpperCase()==tagName &&
      (!only || (Element.classNames(e).detect(function(v) { return only.include(v) }))))
        elements.push(e);
    if(recursive) {
      var grandchildren = Element.findChildren(e, only, recursive, tagName);
      if(grandchildren) elements.push(grandchildren);
    }
  });

  return (elements.length>0 ? elements.flatten() : []);
}

Element.offsetSize = function (element, type) {
  return element['offset' + ((type=='vertical' || type=='height') ? 'Height' : 'Width')];
}
;
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
/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 */

(function(root, factory) {

  /* CommonJS */
  if (typeof exports == 'object')  module.exports = factory()

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(factory)

  /* Browser global */
  else root.Spinner = factory()
}
(this, function() {
  "use strict";

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = (function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }())

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
    if(s[prop] !== undefined) return prop
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while((el = el.offsetParent))
      o.x+=el.offsetLeft, o.y+=el.offsetTop

    return o
  }

  /**
   * Returns the line color from the given string or array.
   */
  function getColor(color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length]
  }

  // Built-in defaults

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#000',        // #rgb or #rrggbb
    direction: 1,         // 1: clockwise, -1: counterclockwise
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: '50%',           // center vertically
    left: '50%',          // center horizontally
    position: 'absolute'  // element position
  }

  /** The constructor */
  function Spinner(o) {
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {

    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function(target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width

      css(el, {
        left: o.left,
        top: o.top
      })
        
      if (target) {
        target.insertBefore(el, target.firstChild||null)
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    /**
     * Stops and removes the Spinner.
     */
    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
    lines: function(el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML() {

    /* Utility function to create a VML tag */
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function(el, o) {
      var r = o.length+o.width
        , s = 2*r

      function grp() {
        return css(
          vml('group', {
            coordsize: s + ' ' + s,
            coordorigin: -r + ' ' + -r
          }),
          { width: s, height: s }
        )
      }

      var margin = -(o.width+o.length)*2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg(i, dx, filter) {
        ins(g,
          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
            ins(css(vml('roundrect', {arcsize: o.corners}), {
                width: r,
                height: o.width,
                left: o.radius,
                top: -o.width>>1,
                filter: filter
              }),
              vml('fill', {color: getColor(o.color, i), opacity: o.opacity}),
              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++)
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function(el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i+o < c.childNodes.length) {
        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

  if (!vendor(probe, 'transform') && probe.adj) initVML()
  else useCssAnimations = vendor(probe, 'animation')

  return Spinner

}));
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//




;
