/**
 *
 * Version: 0.0.5
 * Author: Gianluca Guarini
 * Contact: gianluca.guarini@gmail.com
 * Website: http://www.gianlucaguarini.com/
 * Twitter: @gianlucaguarini
 *
 * Copyright (c) 2013 Gianluca Guarini
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 **/


(function(window, document, $) {
  "use strict";

  // Plugin private cache
  // static vars
  var cache = {
    filterId: 0
  },
    $body = $('body');

  var Vague = function(elm, customOptions) {
    // Default oprions
    var defaultOptions = {
      intensity: 5,
      forceSVGUrl: false,
      animationOptions: {
        duration: 1000
      }
    },
      // extend the default options with the ones passed to the plugin
      options = $.extend(defaultOptions, customOptions),

      /*
       *
       * Helpers
       *
       */

      _browserPrefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
      _cssPrefixString = {},
      _cssPrefix = function(property) {
        if (_cssPrefixString[property] || _cssPrefixString[property] === '') return _cssPrefixString[property] + property;
        var e = document.createElement('div');
        var prefixes = ['', 'Moz', 'Webkit', 'O', 'ms', 'Khtml']; // Various supports...
        for (var i in prefixes) {
          if (typeof e.style[prefixes[i] + property] !== 'undefined') {
            _cssPrefixString[property] = prefixes[i];
            return prefixes[i] + property;
          }
        }
        return property.toLowerCase();
      },
      // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/css-filters.js
      _support = {
        cssfilters: function() {
          var el = document.createElement('div');
          el.style.cssText = _browserPrefixes.join('filter' + ':blur(2px); ');
          return !!el.style.length && ((document.documentMode === undefined || document.documentMode > 9));
        }(),

        // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/svg-filters.js
        svgfilters: function() {
          var result = false;
          try {
            result = typeof SVGFEColorMatrixElement !== undefined &&
              SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE == 2;
          } catch (e) {}
          return result;
        }()
      },

      /*
       *
       * PRIVATE VARS
       *
       */

      _blurred = false,
      _isAnimating = false,
      // cache the right prefixed css filter property
      _cssFilterProp = _cssPrefix('Filter'),
      _svgGaussianFilter,

      /*
       *
       * PRIVATE METHODS
       *
       */

      /**
       * Create any svg element
       * @param  { String } tagname: svg tag name
       * @return { SVG Node }
       */

      _createSvgElement = function(tagname) {
        return document.createElementNS('http://www.w3.org/2000/svg', tagname);
      },

      /**
       *
       * Inject the svg tag into the DOM
       * we will use it only if the css filters are not supported
       *
       */

      _appendSVGFilter = function() {
        // create the svg and the filter tags
        var svg = _createSvgElement('svg'),
          filter = _createSvgElement('filter');

        // cache the feGaussianBlur tag and make it available
        // outside of this function to easily update the blur intensity
        _svgGaussianFilter = _createSvgElement('feGaussianBlur');

        // hide the svg tag
        // we don't want to see it into the DOM!
        svg.setAttribute('style', 'position:absolute');
        svg.setAttribute('width', '0');
        svg.setAttribute('height', '0');

        filter.setAttribute('id', 'blur-effect-id-' + cache.filterId);

        filter.appendChild(_svgGaussianFilter);
        svg.appendChild(filter);

        $body.append(svg);

      };

    /*
     *
     * PUBLIC VARS
     *
     */

    // cache the DOM element to blur
    this.$elm = elm instanceof $ ? elm : $(elm);


    /*
     *
     * PUBLIC METHODS
     *
     */


    this.init = function() {
      // checking the css filter feature
      if (_support.svgfilters) {
        _appendSVGFilter();
      }

      this.$elm.data("vague-filter-id", cache.filterId);

      cache.filterId++;

    };

    this.blur = function() {
      var filterValue,
        loc = window.location,
        svgUrl = options.forceSVGUrl ? loc.protocol + "//" + loc.host + loc.pathname : '',
        filterId = this.$elm.data("vague-filter-id"),
        cssProp = {};
      if (_support.cssfilters) {
        filterValue = "blur(" + options.intensity + "px)";
      } else if (_support.svgfilters) {
        _svgGaussianFilter.setAttribute('stdDeviation', options.intensity);
        filterValue = "url(" + svgUrl + "#blur-effect-id-" + filterId + ")";
      } else {
        filterValue = "progid:DXImageTransform.Microsoft.Blur(pixelradius=" + options.intensity + ")";
      }
      cssProp[_cssFilterProp] = filterValue;

      this.$elm.css(cssProp);

      _blurred = true;
    };

    this.animate = function(newIntensity, customAnimationOptions) {
      if (typeof newIntensity !== 'number')
        throw (typeof newIntensity + ' is not a valid number to animate the blur');
      if (newIntensity < 0)
        throw ('I can animate only positive numbers');

      var dfr = new $.Deferred();

      if (!_isAnimating) {
        $.Animation(options, {
          intensity: newIntensity
        }, $.extend(options.animationOptions, customAnimationOptions))
          .progress($.proxy(this.blur, this))
          .done(function() {
            _isAnimating = false;
            dfr.resolve();
          });
      } else {
        dfr.reject();
      }
      _isAnimating = true;
      return dfr.promise();
    };


    this.unblur = function() {
      var cssProp = {};
      cssProp[_cssFilterProp] = "none";
      this.$elm.css(cssProp);
      _blurred = false;
    };

    this.toggleblur = function() {
      if (_blurred) {
        this.unblur();
      } else {
        this.blur();
      }
    };

    this.destroy = function() {
      if (_support.svgfilters) {
        $("filter#blur-effect-id-" + this.$elm.data("vague-filter-id")).parent().remove();
      }
      this.unblur();
    };
    return this.init();
  };

  $.fn.Vague = function(options) {
    return new Vague(this, options);
  };

  window.Vague = Vague;

}(window, document, jQuery));