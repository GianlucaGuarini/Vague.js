![Vague.js](http://i.imgur.com/E7sszkE.png)

_Vague.js_: A jQuery plugin for blurring HTML elements via SVG filters.

### Browser Support
- [Mozilla Firefox](http://www.mozilla.org/firefox/) (v10 and above)
- [Google Chrome](http://www.google.com/chrome/) (v18 and above)
- [Safari](http://www.apple.com/safari/) (v6.0 and above)
- [Microsoft Internet Explorer](http://microsoft.com/internetexplorer) (v7-9; v10+ not supported)

### Demonstration

Check the demos [here on GitHub Pages](http://gianlucaguarini.github.io/Vague.js/) and on [Codepen](http://codepen.io/GianlucaGuarini/pen/Hzrhf).

### Requisites
[jQuery](http://jquery.com/) JavaScript Library

### Usage

````javascript

var vague = $('#yourelement').Vague({
	intensity:      3,      // Blur Intensity
	forceSVGUrl:    false,   // Force absolute path to the SVG filter,
	// default animation options
    animationOptions: {
      duration: 1000,
      easing: 'linear' // here you can use also custom jQuery easing functions
    }
});

vague.blur();

````

### API (Public methods)

- ``blur`` : Apply the SVG filter to the element selected.
- ``unblur`` : Hide the SVG filter from the element selected.
- ``animate( newBlurIntensity, animationOptions )`` : Animate the blur intensity to any new value.

```javascript

vague.animate(
  20,
  // here you can use the normal jQuery animation options
  {
    duration:500
    easing: 'linear'
  }
).done(function(){
	console.log('Animation finished!');
});

```

- ``destroy`` : remove the blur effect and the SVG filter from the DOM.

### [Issues](http://github.com/GianlucaGuarini/Vague.js/issues)

- The ``animate`` method is part of the plugin but it's not recommended, it can be really slow due to the many GPU resources needed to render the blur effect on the pages
- It is not supported in the Opera browser as SVG filters over elements are not supported
- Not supported in IE10/IE11 ( because IE still sucks )

### Changelog

#### v0.0.6

 - merged: patch [16](https://github.com/GianlucaGuarini/Vague.js/pull/16) - [17](https://github.com/GianlucaGuarini/Vague.js/pull/17)

#### v0.0.5

 - plugin code refactoring and micro optimizations
 - added: ``animate`` method
