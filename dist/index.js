/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__counter__ = __webpack_require__(2);
/* global document */



var counter = new __WEBPACK_IMPORTED_MODULE_0__counter__["a" /* default */]({
  target: document.querySelector('#counter')
});

document.querySelector('#reset-counter').addEventListener('click', function () {
  counter.set({ count: 0 });
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = hello;

function hello(name) {
  return "Hello " + name;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header__ = __webpack_require__(3);


var template = (function () {
  return {
    data() {
      return {
        count: 0
      };
    },
    components: {
      Header: __WEBPACK_IMPORTED_MODULE_0__header__["a" /* default */]
    }
  };
}());

function renderMainFragment ( root, component ) {
	var header_initialData = {
		dude: "walt"
	};
	
	if ( 'count' in root ) header_initialData.count = root.count;
	var header = new template.components.Header({
		target: null,
		_root: component._root || component,
		data: header_initialData
	});
	
	var header_updating = false;
	
	component._bindings.push( function () {
		header.observe( 'count', function ( value ) {
			header_updating = true;
			component.set({ count: value });
			header_updating = false;
		});
	});
	
	var text = createText( "\n\n" );
	
	var p = createElement( 'p' );
	
	appendNode( createText( "Count: " ), p );
	var text2 = createText( root.count );
	appendNode( text2, p );
	var text3 = createText( "\n" );
	
	var button = createElement( 'button' );
	
	function clickHandler ( event ) {
		var root = this.__svelte.root;
		
		component.set({ count: root.count + 1 });
	}
	
	addEventListener( button, 'click', clickHandler );
	
	button.__svelte = {
		root: root
	};
	
	appendNode( createText( "+1" ), button );

	return {
		mount: function ( target, anchor ) {
			header._fragment.mount( target, anchor );
			insertNode( text, target, anchor );
			insertNode( p, target, anchor );
			insertNode( text3, target, anchor );
			insertNode( button, target, anchor );
		},
		
		update: function ( changed, root ) {
			if ( !header_updating && 'count' in changed ) {
				header._set({ count: root.count });
			}
			
			text2.data = root.count;
			
			button.__svelte.root = root;
		},
		
		teardown: function ( detach ) {
			header.teardown( detach );
			removeEventListener( button, 'click', clickHandler );
			
			if ( detach ) {
				detachNode( text );
				detachNode( p );
				detachNode( text3 );
				detachNode( button );
			}
		}
	};
}

function SvelteComponent ( options ) {
	options = options || {};
	
	this._state = Object.assign( template.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	this._renderHooks = [];
	
	this._bindings = [];
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	while ( this._bindings.length ) this._bindings.pop()();
	
	this._flush();
}

SvelteComponent.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

SvelteComponent.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

SvelteComponent.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

SvelteComponent.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

SvelteComponent.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

SvelteComponent.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

SvelteComponent.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	while ( this._bindings.length ) this._bindings.pop()();
	
	this._flush();
};

SvelteComponent.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function createElement( name ) {
	return document.createElement( name );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function addEventListener( node, event, handler ) {
	node.addEventListener ( event, handler, false );
}

function removeEventListener( node, event, handler ) {
	node.removeEventListener ( event, handler, false );
}

/* harmony default export */ __webpack_exports__["a"] = SvelteComponent;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(1);


function applyComputations ( state, newState, oldState, isInitial ) {
	if ( isInitial || ( 'dude' in newState && typeof state.dude === 'object' || state.dude !== oldState.dude ) ) {
		state.salutation = newState.salutation = template.computed.salutation( state.dude );
	}
}

var template = (function () {
  return {
    data() {
      return {
        dude: 'Unknown',
        count: 0
      }
    },
    computed: {
      salutation: function(dude) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* hello */])(dude);
      }
    }
  };
}());

function renderMainFragment ( root, component ) {
	var h1 = createElement( 'h1' );
	
	var text = createText( root.salutation );
	appendNode( text, h1 );
	appendNode( createText( ", counted to " ), h1 );
	var text2 = createText( root.count );
	appendNode( text2, h1 );
	appendNode( createText( " already!" ), h1 );

	return {
		mount: function ( target, anchor ) {
			insertNode( h1, target, anchor );
		},
		
		update: function ( changed, root ) {
			text.data = root.salutation;
			
			text2.data = root.count;
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( h1 );
			}
		}
	};
}

function SvelteComponent ( options ) {
	options = options || {};
	
	this._state = Object.assign( template.data(), options.data );
applyComputations( this._state, this._state, {}, true );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

SvelteComponent.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

SvelteComponent.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

SvelteComponent.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

SvelteComponent.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

SvelteComponent.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

SvelteComponent.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

SvelteComponent.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	applyComputations( this._state, newState, oldState, false )
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

SvelteComponent.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

function createElement( name ) {
	return document.createElement( name );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function createText( data ) {
	return document.createTextNode( data );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

/* harmony default export */ __webpack_exports__["a"] = SvelteComponent;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTcwMzI4N2M0MWNmZjFiYzdhZTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3VudGVyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlYWRlci5odG1sIl0sIm5hbWVzIjpbImNvdW50ZXIiLCJ0YXJnZXQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0IiwiY291bnQiLCJoZWxsbyIsIm5hbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNoRUE7QUFBQTs7QUFFQTs7QUFFQSxJQUFNQSxVQUFVLElBQUkseURBQUosQ0FBWTtBQUMxQkMsVUFBUUMsU0FBU0MsYUFBVCxDQUF1QixVQUF2QjtBQURrQixDQUFaLENBQWhCOztBQUlBRCxTQUFTQyxhQUFULENBQXVCLGdCQUF2QixFQUF5Q0MsZ0JBQXpDLENBQTBELE9BQTFELEVBQW1FLFlBQVc7QUFDNUVKLFVBQVFLLEdBQVIsQ0FBWSxFQUFFQyxPQUFPLENBQVQsRUFBWjtBQUNELENBRkQsRTs7Ozs7Ozs7O0FDUE8sU0FBU0MsS0FBVCxDQUFlQyxJQUFmLEVBQXFCO0FBQzFCLG9CQUFnQkEsSUFBaEI7QUFDRCxDOzs7Ozs7Ozs7OzZCQ0VPO0FBR1IsRUFBRSxPQUFlO0lBQ2IsSUFBSSxHQUFHO01BQ0wsT0FBTztRQUNMLEtBQUssRUFBRSxDQUFDO09BQ1QsQ0FBQztLQUNIO0lBQ0QsVUFBVSxFQUFFO01BQ1YsZ0VBQU07S0FDUDtHQUNGLENBQUM7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBaEJZLEtBQUs7Ozs7Ozs7OztZQUNDLEdBQUcsQ0FBQyxFQUFFLEtBQUssT0FBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBRC9CLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQ0FUO0FBR1IsRUFBRSxPQUFlO0lBQ2IsSUFBSSxHQUFHO01BQ0wsT0FBTztRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLENBQUM7T0FDVDtLQUNGO0lBQ0QsUUFBUSxFQUFFO01BQ1IsVUFBVSxFQUFFLFNBQVMsSUFBSSxFQUFFO1FBQ3pCLE9BQU8sOEVBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUNwQjtLQUNGO0dBQ0YsQ0FBQztBQUNKOzs7Ozs2QkFsQk8sVUFBVTs7OzhCQUFtQixLQUFLOzs7Ozs7Ozs7O29CQUFsQyxVQUFVOztxQkFBbUIsS0FBSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE3MDMyODdjNDFjZmYxYmM3YWUzIiwiLyogZ2xvYmFsIGRvY3VtZW50ICovXG5cbmltcG9ydCBDb3VudGVyIGZyb20gJy4vY291bnRlcic7XG5cbmNvbnN0IGNvdW50ZXIgPSBuZXcgQ291bnRlcih7XG4gIHRhcmdldDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvdW50ZXInKVxufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXNldC1jb3VudGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY291bnRlci5zZXQoeyBjb3VudDogMCB9KTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIlxuZXhwb3J0IGZ1bmN0aW9uIGhlbGxvKG5hbWUpIHtcbiAgcmV0dXJuIGBIZWxsbyAke25hbWV9YDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGVscGVycy5qcyIsIjxIZWFkZXIgYmluZDpjb3VudCBkdWRlPVwid2FsdFwiIC8+XG5cbjxwPkNvdW50OiB7e2NvdW50fX08L3A+XG48YnV0dG9uIG9uOmNsaWNrPSdzZXQoeyBjb3VudDogY291bnQgKyAxIH0pJz4rMTwvYnV0dG9uPlxuXG48c2NyaXB0PlxuICBpbXBvcnQgSGVhZGVyIGZyb20gJy4vaGVhZGVyJztcblxuICBleHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvdW50OiAwXG4gICAgICB9O1xuICAgIH0sXG4gICAgY29tcG9uZW50czoge1xuICAgICAgSGVhZGVyXG4gICAgfVxuICB9O1xuPC9zY3JpcHQ+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvdW50ZXIuaHRtbCIsIjxoMT57eyBzYWx1dGF0aW9uIH19LCBjb3VudGVkIHRvIHt7IGNvdW50IH19IGFscmVhZHkhPC9oMT5cblxuPHNjcmlwdD5cbiAgaW1wb3J0IHsgaGVsbG8gfSBmcm9tICcuL2hlbHBlcnMnO1xuXG4gIGV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZHVkZTogJ1Vua25vd24nLFxuICAgICAgICBjb3VudDogMFxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgIHNhbHV0YXRpb246IGZ1bmN0aW9uKGR1ZGUpIHtcbiAgICAgICAgcmV0dXJuIGhlbGxvKGR1ZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbjwvc2NyaXB0PlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWFkZXIuaHRtbCJdLCJzb3VyY2VSb290IjoiIn0=