Vague.js is an experimental script that allows you to blur any kind of html element thanks to the SVG filters. This script is crossbrowser and it was tested on:
- Firefox 10 +
- Chrome 18 +
- Safari 6.0 +
- IE 7 +

# DEMO

http://codepen.io/GianlucaGuarini/pen/Hzrhf

http://gianlucaguarini.github.io/vague.js/

# Dependency

[jQuery](http://jquery.com/)

# USAGE

<pre>
	var vague = $(yourelement).Vague({
		intensity:3 //blur intensity
	});
	vague.blur();
</pre>

#API (public methods)

- <code>blur</code> : blur the element selected.
- <code>unblur</code> : unblur the element selected.
- <code>destroy</code> : fires the unblur event and removes the svg filter from the DOM (whether it is needed)

#KNOWN ISSUES

- currently the svg filters are not complitely supported by all the modern browsers http://caniuse.com/svg-html
- currently on Opera 12 it doesn't work at all because it doesn't support SVG filters over HTML contents
- on IE10 it doesn't work because IE still sucks
