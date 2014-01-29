![Vague.js](http://i.imgur.com/E7sszkE.png)

_Vague.js_: A jQuery plugin for blurring HTML elements via SVG filters.


### Browser Support
- [Mozilla Firefox](http://www.mozilla.org/firefox/) (v10 and above)
- [Google Chrome](http://www.google.com/chrome/) (v18 and above)
- [Safari](http://www.apple.com/safari/) (v6.0 and above)
- [Microsoft Internet Explorer](http://microsoft.com/internetexplorer) (v7-9; v10+ not supported)

### Demonstration

View the demo [here on GitHub Pages](http://gianlucaguarini.github.io/Vague.js/).

### Requisites
[jQuery](http://jquery.com/) JavaScript Library

### Usage

````javascript
var Vague = $('#yourelement').Vague({
	intensity:      3,      // Blur Intensity
	forceSVGUrl:    false   // Force absolute path to the SVG filter
});

Vague.blur();
````

### API (Public methods)

- ``blur`` : Apply the SVG filter to the element selected.
- ``unblur`` : Hide the SVG filter from the element selected.
- ``destroy`` : Hide the SVG filter remove the SVG filter from the DOM.

### [Issues](http://github.com/GianlucaGuarini/Vague.js/issues)
- It is not supported in the Opera browser as SVG filters over elements are not supported
- Not supported in IE10/IE11
