require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"gotcha":[function(require,module,exports){
var DashedLine, Gotcha, SVGContext, SVGShape, SpecPanel, ctx, device, deviceType, gotcha, pAccordian, pColor, pDiv, pDivider, pImage, pInput, pLabel, pRow, pSelect, pSpan, panel, ref, secretBox, startOpen, svgContext, viewC,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

deviceType = window.localStorage.deviceType;

if (deviceType != null) {
  device = Framer.DeviceComponent.Devices[deviceType];
  Framer.Device._context.devicePixelRatio = device.devicePixelRatio;
  Framer.Device.deviceType = deviceType;
  window.localStorage.device = void 0;
}

Framer.Extras.Hints.disable();

svgContext = void 0;

ctx = void 0;

startOpen = false;

if ((ref = document.getElementsByClassName('DevicePhone')[0]) != null) {
  ref.classList.add('IgnorePointerEvents');
}

Utils.insertCSS("\n#SpecContainer {\n	position: absolute;\n	right: 0;\n	top: 0;\n	bottom: 0;\n	width: 224px;\n	background-color: rgba(20, 20, 20, 1.000);\n	border-left: 1px solid rgba(45, 45, 45, 1.000);\n	pointer-events: all;\n	white-space: nowrap;\n	cursor: default;\n}\n\n.SpecLabel {\n	position: absolute;\n}\n\n.SpecSelectable {\n	cursor: pointer;\n	-webkit-box-sizing: border-box;\n	-moz-box-sizing: border-box;\n	box-sizing: border-box;\n}\n\n.SpecSelectable:hover {\n	outline: 1px solid rgba(72, 207, 255, 1.000) !important;\n}\n\n.SpecSelectable:active {\n	outline: 1px solid rgba(255, 1, 255, 1.000) !important;\n}\n\n@-webkit-keyframes showCopied {\n	0% { \n		border-color: rgba(118, 237, 93, 1.000);\n	}\n\n	100% {\n		border-color: rgba(0, 0, 0, 1.000);\n	}\n}\n\n.copied {\n	background-color: red;\n}\n\n.mememeLink {\n	opacity: .4;\n}\n\n.mememeLink:hover {\n	opacity: 1;\n}\n\n#linkedin_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 68px;\n}\n\n\n#twitter_logo {\n	position: absolute;\n	bottom: 4px;\n	right: 4px;\n}\n\n#github_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 36px;\n}\n\n.framerLayer { \n	pointer-events: all !important; \n	} \n\n.IgnorePointerEvents {\n	pointer-events: none !important; \n}\n\n.dropdown {\n	opacity: 0;\n}");


/* -------------------------------------------

  	.d88888b  dP     dP  .88888.      a88888b.                                                                    dP
  	88.    "' 88     88 d8'   `88    d8'   `88                                                                    88
  	`Y88888b. 88    .8P 88           88        .d8888b. 88d8b.d8b. 88d888b. .d8888b. 88d888b. .d8888b. 88d888b. d8888P .d8888b.
  	      `8b 88    d8' 88   YP88    88        88'  `88 88'`88'`88 88'  `88 88'  `88 88'  `88 88ooood8 88'  `88   88   Y8ooooo.
  	d8'   .8P 88  .d8P  Y8.   .88    Y8.   .88 88.  .88 88  88  88 88.  .88 88.  .88 88    88 88.  ... 88    88   88         88
  	 Y88888P  888888'    `88888'      Y88888P' `88888P' dP  dP  dP 88Y888P' `88888P' dP    dP `88888P' dP    dP   dP   `88888P'
  	                                                               88
  	                                                               dP
 */

SVGContext = (function() {
  function SVGContext(options) {
    var setAttributes, svgNS;
    if (options == null) {
      options = {};
    }
    this.removeAll = bind(this.removeAll, this);
    this.setContext = bind(this.setContext, this);
    this.__constructor = true;
    this.shapes = [];
    svgContext = this;
    svgNS = "http://www.w3.org/2000/svg";
    setAttributes = function(element, attributes) {
      var key, results, value;
      if (attributes == null) {
        attributes = {};
      }
      results = [];
      for (key in attributes) {
        value = attributes[key];
        results.push(element.setAttribute(key, value));
      }
      return results;
    };
    this.svg = document.createElementNS(svgNS, 'svg');
    document.body.appendChild(this.svg);
    this.svg.style['z-index'] = '999';
    this.frameElement = Framer.Device.screenBackground._element;
    this.setContext();
    this.svgDefs = document.createElementNS(svgNS, 'defs');
    this.svg.appendChild(this.svgDefs);
    delete this.__constructor;
  }

  SVGContext.prototype.setAttributes = function(element, attributes) {
    var key, results, value;
    if (attributes == null) {
      attributes = {};
    }
    results = [];
    for (key in attributes) {
      value = attributes[key];
      results.push(element.setAttribute(key, value));
    }
    return results;
  };

  SVGContext.prototype.setContext = function() {
    var sFrame;
    this.lFrame = this.frameElement.getBoundingClientRect();
    _.assign(this, {
      width: this.lFrame.width.toFixed(),
      height: this.lFrame.height.toFixed(),
      x: this.lFrame.left.toFixed(),
      y: this.lFrame.top.toFixed()
    });
    this.screenElement = document.getElementsByClassName('framerContext')[0];
    sFrame = this.screenElement.getBoundingClientRect();
    this.setAttributes(this.svg, {
      x: 0,
      y: 0,
      width: sFrame.width,
      height: sFrame.height,
      viewBox: "0 0 " + sFrame.width + " " + sFrame.height
    });
    return _.assign(this.svg.style, {
      position: "absolute",
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      'pointer-events': 'none'
    });
  };

  SVGContext.prototype.addShape = function(shape) {
    this.shapes.push(shape);
    return this.showShape(shape);
  };

  SVGContext.prototype.removeShape = function(shape) {
    this.hideShape(shape);
    return _.pull(this.shapes, shape);
  };

  SVGContext.prototype.hideShape = function(shape) {
    return this.svg.removeChild(shape.element);
  };

  SVGContext.prototype.showShape = function(shape) {
    return this.svg.appendChild(shape.element);
  };

  SVGContext.prototype.addDef = function(def) {
    return this.svgDefs.appendChild(def);
  };

  SVGContext.prototype.removeAll = function() {
    var j, len, ref1, shape;
    ref1 = this.shapes;
    for (j = 0, len = ref1.length; j < len; j++) {
      shape = ref1[j];
      this.svg.removeChild(shape.element);
    }
    return this.shapes = [];
  };

  return SVGContext;

})();

SVGShape = (function() {
  function SVGShape(options) {
    var key, value;
    if (options == null) {
      options = {
        type: 'circle'
      };
    }
    this.setAttribute = bind(this.setAttribute, this);
    this.__constructor = true;
    this.parent = svgContext;
    this.element = document.createElementNS("http://www.w3.org/2000/svg", options.type);
    this.setCustomProperty('text', 'textContent', 'textContent', options.text);
    for (key in options) {
      value = options[key];
      this.setAttribute(key, value);
    }
    this.parent.addShape(this);
    this.show();
  }

  SVGShape.prototype.setAttribute = function(key, value) {
    if (key === 'text') {
      return;
    }
    if (this[key] == null) {
      Object.defineProperty(this, key, {
        get: (function(_this) {
          return function() {
            return _this.element.getAttribute(key);
          };
        })(this),
        set: (function(_this) {
          return function(value) {
            return _this.element.setAttribute(key, value);
          };
        })(this)
      });
    }
    return this[key] = value;
  };

  SVGShape.prototype.setCustomProperty = function(variableName, returnValue, setValue, startValue) {
    Object.defineProperty(this, variableName, {
      get: function() {
        return returnValue;
      },
      set: function(value) {
        return this.element[setValue] = value;
      }
    });
    return this[variableName] = startValue;
  };

  SVGShape.prototype.hide = function() {
    return this.parent.hideShape(this);
  };

  SVGShape.prototype.show = function() {
    return this.parent.showShape(this);
  };

  SVGShape.prototype.remove = function() {
    return this.parent.removeShape(this);
  };

  return SVGShape;

})();

DashedLine = (function(superClass) {
  extend(DashedLine, superClass);

  function DashedLine(pointA, pointB, color, offset, options) {
    if (color == null) {
      color = '#000';
    }
    if (offset == null) {
      offset = 0;
    }
    if (options == null) {
      options = {};
    }
    _.assign(options, {
      type: 'path',
      d: "M " + pointA.x + " " + pointA.y + " L " + pointB.x + " " + pointB.y,
      stroke: color,
      'stroke-width': '1px',
      'stroke-dasharray': "5, 5",
      'stroke-dashoffset': offset
    });
    DashedLine.__super__.constructor.call(this, options);
  }

  return DashedLine;

})(SVGShape);

Utils.insertCSS("\n#pContainer {\n	position: fixed;\n	right: 0;\n	width: 224px;\n	height: 100%;\n	font-family: 'Helvetica Neue';\n	font-size: 11px;\n	background-color: rgba(20, 20, 20, 1.000);\n	border-left: 1px solid rgba(45, 45, 45, 1.000);\n	pointer-events: all;\n	white-space: nowrap;\n	cursor: default;\n	overflow: scroll;\n	padding-top: 8px;\n}\n\n.pDiv {\n	display: block;\n	width: 100%;\n}\n\n.hidden {\n	display: none;\n}\n\n.pRow {\n	width: 100%;\n	height: 32px;\n}\n\n.pSpan {\n	position: absolute;\n	color: #888888;\n	font-weight: 400;\n	letter-spacing: .5px;\n	padding-left: 8px;\n	margin-top: 2px;\n}\n\n.pLabel {\n	position: absolute;\n	text-align: right;\n	font-size: 10px;\n	width: none;\n	margin-top: 2px;\n	margin-right: 8px;\n	z-index: 10;\n	pointer-events: none;\n}\n\n.pInput {\n	background-color: #292929;\n	border: 1px solid #000;\n	color: #555555;\n	padding: 4px;\n	position: absolute;\n	border-radius: 4px;\n	outline: none;\n	margin-top: 4px;\n}\n\n.pInput:hover {\n	border: 1px solid #48cfff;\n	color: #48cfff;\n}\n\n.right {\n	right: 8px;\n	width: 48px;\n}\n\n.left {\n	right: 72px;\n	width: 48px;\n}\n\n.full {\n	right: 8px;\n	width: 112px;\n}\n\n.pImage {\n	display: block;\n	margin-left: 8px;\n	height: auto;\n	width: 208px;\n	overflow: hidden;\n	background-color: #292929;\n	border: 1px solid #000;\n	border-radius: 4px;\n	outline: 4px solid #292929;\n	outline-offset: -4px;\n}\n\n.pImage:hover {\n	border: 1px solid #48cfff;\n	color: #48cfff;\n	outline: 2px solid #292929;\n}\n\n.pColor {\n	outline: 4px solid #292929;\n	outline-offset: -4px;\n}\n\n.pColor:hover {\n	outline: 2px solid #292929;\n	color: #48cfff;\n}\n\n.pSelect {\n	position: absolute;\n	right: 8px;\n	width: 122px;\n	color: #555555;\n	background-color: #292929;\n	-webkit-appearance: none;\n	border: 1px solid #000;\n	padding: 4px;\n	border-radius: 4px;\n	outline: none;\n}\n\n.pDivider {\n	height: 1px;\n	background-color: #000;\n	margin: 8px 8px 16px 8px;\n}\n\n.pAccordian {\n	border-top: 1px solid #000;\n	border-bottom: 1px solid #000;\n	height: auto;\n	min-height: 32px;\n	background-color: #1D1D1D;\n}\n\n.pAccordianBody {\n	display: none;\n	height: auto;\n	margin-top: 32px;\n	padding-top: 4px;\n	background-color: #141414;\n}\n\n.active {\n	display: block;\n	height: auto;\n}\n\n.hasValue {\n	color: #FFF;\n}\n\n.socialLinks {\n	background-color: #141414;\n	position: fixed;\n	bottom: 0px;\n	right: 0px;\n	padding-top: 4px;\n	z-index: 100;\n}\n");

pDiv = (function() {
  function pDiv(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: void 0
    });
    this.element = document.createElement('div');
    this.element.classList.add("pDiv");
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    Object.defineProperty(this, "visible", {
      get: function() {
        return this._visible;
      },
      set: function(bool) {
        if (bool === this._visible) {
          return;
        }
        this._visible = bool;
        if (bool) {
          this.element.classList.remove('hidden');
          return;
        }
        return this.element.classList.add('hidden');
      }
    });
  }

  return pDiv;

})();

pRow = (function(superClass) {
  extend(pRow, superClass);

  function pRow(options) {
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      text: 'Label'
    });
    pRow.__super__.constructor.call(this, options);
    this.element.classList.remove("pDiv");
    this.element.classList.add("pRow");
    this.label = new pSpan({
      parent: this,
      text: options.text
    });
  }

  return pRow;

})(pDiv);

pDivider = (function() {
  function pDivider(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: void 0
    });
    this.element = document.createElement('div');
    this.element.classList.add("pDivider");
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
  }

  return pDivider;

})();

pSpan = (function() {
  function pSpan(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: void 0,
      text: 'hello world'
    });
    this.element = document.createElement('span');
    this.element.classList.add("pSpan");
    this.element.textContent = options.text;
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
  }

  return pSpan;

})();

pLabel = (function() {
  function pLabel(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: void 0,
      className: null,
      text: 'x',
      "for": void 0
    });
    this.element = document.createElement('label');
    this.element.classList.add("pLabel");
    this.element.classList.add(options.className);
    _.assign(this.element, {
      textContent: options.text,
      "for": options["for"]
    });
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
  }

  return pLabel;

})();

pInput = (function() {
  function pInput(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: null,
      className: 'left',
      value: '',
      unit: 'x',
      "default": '',
      section: void 0
    });
    this.element = document.createElement('input');
    this.element.classList.add("pInput");
    this.element.classList.add(options.className);
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    this.unit = new pLabel({
      parent: options.parent,
      className: options.className,
      text: options.unit,
      "for": this.element
    });
    Object.defineProperty(this, 'value', {
      get: function() {
        return this._value;
      },
      set: function(value) {
        this._value = value;
        return this.element.value = value != null ? value : String(this["default"]);
      }
    });
    Object.defineProperty(this, 'isDefault', {
      get: function() {
        return this._isDefault;
      },
      set: function(bool) {
        var ref3;
        this._isDefault = bool;
        if ((ref3 = this.section) != null) {
          ref3.visible = !bool;
        }
        if (bool) {
          this.element.classList.remove('hasValue');
          return;
        }
        return this.element.classList.add('hasValue');
      }
    });
    this.element.addEventListener('click', (function(_this) {
      return function() {
        if (!secretBox) {
          return;
        }
        secretBox.value = _this.value;
        secretBox.select();
        document.execCommand('copy');
        return secretBox.blur();
      };
    })(this));
    _.assign(this, {
      value: options.value,
      "default": options["default"],
      section: options.section
    });
  }

  return pInput;

})();

pImage = (function() {
  function pImage(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: null,
      value: '',
      unit: '',
      section: void 0
    });
    this.element = document.createElement('img');
    this.element.classList.add("pImage");
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    Object.defineProperty(this, 'value', {
      get: function() {
        return this._value;
      },
      set: function(value) {
        var ref3;
        this._value = value;
        this.element.src = value;
        return (ref3 = this.section) != null ? ref3.visible = value !== '' : void 0;
      }
    });
    this.element.addEventListener('click', (function(_this) {
      return function() {
        if (!secretBox) {
          return;
        }
        secretBox.value = _this.value;
        secretBox.select();
        document.execCommand('copy');
        return secretBox.blur();
      };
    })(this));
    _.assign(this, {
      value: options.value,
      section: options.section
    });
  }

  return pImage;

})();

pColor = (function() {
  function pColor(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: null,
      value: '#292929'
    });
    this.element = document.createElement('input');
    this.element.classList.add("pInput");
    this.element.classList.add('pColor');
    this.element.classList.add(options.className);
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    Object.defineProperty(this, 'value', {
      get: function() {
        return this._value;
      },
      set: function(value) {
        var ref3;
        if ((value != null ? value.color : void 0) === 'transparent') {
          value = null;
        }
        if ((ref3 = this.section) != null) {
          ref3.visible = value != null;
        }
        this._value = value;
        return this.element.style['background-color'] = value;
      }
    });
    this.element.addEventListener('click', (function(_this) {
      return function() {
        if (!secretBox) {
          return;
        }
        secretBox.value = _this.value;
        secretBox.select();
        document.execCommand('copy');
        return secretBox.blur();
      };
    })(this));
    _.assign(this, {
      value: options.value,
      section: options.section
    });
  }

  return pColor;

})();

pSelect = (function() {
  function pSelect(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    this.makeOptions = bind(this.makeOptions, this);
    _.defaults(options, {
      parent: void 0,
      selected: 0,
      options: ['red', 'white', 'blue'],
      callback: function(value) {
        return null;
      }
    });
    this.element = document.createElement('select');
    this.element.classList.add("pSelect");
    this.element.classList.add('hasValue');
    this.unit = new pLabel({
      parent: options.parent,
      className: 'right',
      text: '▾',
      "for": this.element
    });
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    Object.defineProperty(this, 'options', {
      get: function() {
        return this._options;
      },
      set: function(array) {
        this._options = array;
        return this.makeOptions();
      }
    });
    Object.defineProperty(this, 'selected', {
      get: function() {
        return this._selected;
      },
      set: function(num) {
        return this._selected = num;
      }
    });
    _.assign(this, {
      _options: [],
      _optionElements: [],
      options: options.options,
      callback: options.callback,
      selected: options.selected
    });
    this.element.selectedIndex = options.selected;
    this.element.onchange = (function(_this) {
      return function() {
        _this.selected = _this.element.selectedIndex;
        return _this.callback(_this.element.selectedIndex);
      };
    })(this);
  }

  pSelect.prototype.makeOptions = function() {
    var i, j, k, len, len1, o, option, ref1, ref2, results;
    ref1 = this._optionElements;
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      option = ref1[i];
      this.element.removeChild(option);
    }
    this._optionElements = [];
    ref2 = this.options;
    results = [];
    for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
      option = ref2[i];
      o = document.createElement('option');
      o.value = option;
      o.label = option;
      o.innerHTML = option;
      this.element.appendChild(o);
      this._optionElements.push(o);
      if (i === this.selected) {
        results.push(this.value = this.element.options[this.element.selectedIndex].label);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  return pSelect;

})();

pAccordian = (function(superClass) {
  extend(pAccordian, superClass);

  function pAccordian(options) {
    if (options == null) {
      options = {};
    }
    this.toggle = bind(this.toggle, this);
    pAccordian.__super__.constructor.call(this, options);
    this.element.classList.add('pAccordian');
    this.element.addEventListener("click", this.toggle);
    _.assign(this, {
      toggled: false
    });
    this.unit = new pLabel({
      parent: this,
      className: 'right',
      text: '▿',
      "for": this.element
    });
    this.body = new pRow({
      parent: this,
      text: ''
    });
    this.body.element.removeChild(this.body.label.element);
    this.element.appendChild(this.body.element);
    this.body.element.classList.add('pAccordianBody');
    this.body.element.addEventListener('click', function(event) {
      return event.stopPropagation();
    });
  }

  pAccordian.prototype.toggle = function() {
    this.toggled = !this.toggled;
    if (this.toggled) {
      this.body.element.classList.add('active');
      this.unit.element.textContent = '▾';
      return;
    }
    if (this.body.element.classList.contains('active')) {
      this.body.element.classList.remove('active');
      return this.unit.element.textContent = '▿';
    }
  };

  return pAccordian;

})(pRow);


/* -------------------------------------------

 	.d88888b                                 888888ba                             dP
 	88.    "'                                88    `8b                            88
 	`Y88888b. 88d888b. .d8888b. .d8888b.    a88aaaa8P' .d8888b. 88d888b. .d8888b. 88
 	      `8b 88'  `88 88ooood8 88'  `""     88        88'  `88 88'  `88 88ooood8 88
 	d8'   .8P 88.  .88 88.  ... 88.  ...     88        88.  .88 88    88 88.  ... 88
 	 Y88888P  88Y888P' `88888P' `88888P'     dP        `88888P8 dP    dP `88888P' dP
 	          88
 	          dP
 */

SpecPanel = (function() {
  function SpecPanel() {
    this.clearProps = bind(this.clearProps, this);
    this.showProperty = bind(this.showProperty, this);
    this.showProperties = bind(this.showProperties, this);
    var currentSelected, deviceOptions, element, j, key, len, ref1, ref2, row, value;
    this.panel = panel;
    this.propLayers = [];
    this._props = {};
    this.frame = this.panel.getBoundingClientRect();
    this.defaults = Framer.Device.screen._propertyList();
    Object.defineProperty(this, 'props', {
      get: function() {
        return this._props;
      },
      set: function(obj) {
        var key, results, value;
        results = [];
        for (key in obj) {
          value = obj[key];
          if (_.has(this.props, key)) {
            results.push(this.props[key] = value);
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    });
    this.panel.style.opacity = startOpen ? '1' : '0';
    deviceOptions = [];
    currentSelected = void 0;
    ref1 = Framer.DeviceComponent.Devices;
    for (key in ref1) {
      value = ref1[key];
      if (_.endsWith(key, 'hand')) {
        continue;
      }
      if (value.minStudioVersion == null) {
        continue;
      }
      if (Utils.framerStudioVersion() > value.maxStudioVersion) {
        continue;
      }
      if (Utils.framerStudioVersion() < value.minStudioVersion) {
        continue;
      }
      deviceOptions.push(key);
      if (key === Framer.Device.deviceType) {
        currentSelected = deviceOptions.length - 1;
      }
    }
    row = new pRow({
      text: 'Device'
    });
    this.deviceBox = new pSelect({
      parent: row,
      unit: '',
      options: deviceOptions,
      selected: currentSelected,
      callback: (function(_this) {
        return function(index) {
          deviceType = deviceOptions[index];
          device = Framer.DeviceComponent.Devices[deviceType];
          _.assign(window.localStorage, {
            deviceType: deviceType,
            device: device,
            bg: Screen.backgroundColor
          });
          return window.location.reload();
        };
      })(this)
    });
    row = new pRow({
      text: 'Name'
    });
    this.nameBox = new pInput({
      parent: row,
      className: 'full',
      unit: ''
    });
    row = new pRow({
      text: 'Component'
    });
    this.componentNameBox = new pInput({
      parent: row,
      className: 'full',
      unit: ''
    });
    this.componentNamesRow = new pRow({
      text: 'Part of'
    });
    this.componentNamesBox = new pInput({
      parent: this.componentNamesRow,
      className: 'full',
      unit: ''
    });
    new pDivider;
    row = new pRow({
      text: 'Position'
    });
    this.xBox = new pInput({
      parent: row,
      className: 'left',
      unit: 'x'
    });
    this.yBox = new pInput({
      parent: row,
      className: 'right',
      unit: 'y'
    });
    row = new pRow({
      text: 'Size'
    });
    this.widthBox = new pInput({
      parent: row,
      className: 'left',
      unit: 'w'
    });
    this.heightBox = new pInput({
      parent: row,
      className: 'right',
      unit: 'h'
    });
    row = new pRow({
      text: 'Background'
    });
    this.backgroundColorBox = new pColor({
      parent: row,
      className: 'left'
    });
    this.gradientPropertiesDiv = new pDiv;
    row = new pRow({
      parent: this.gradientPropertiesDiv,
      text: 'Gradient'
    });
    this.gradientStartBox = new pColor({
      parent: row,
      className: 'left'
    });
    this.gradientEndBox = new pColor({
      parent: row,
      className: 'right'
    });
    row = new pRow({
      parent: this.gradientPropertiesDiv,
      text: ''
    });
    this.gradientStartBox = new pInput({
      parent: row,
      className: 'left',
      unit: 'a'
    });
    row = new pRow({
      text: 'Opacity'
    });
    this.opacityBox = new pInput({
      parent: row,
      className: 'left',
      unit: ''
    });
    new pDivider;
    row = new pRow({
      text: 'Border'
    });
    this.borderColorBox = new pColor({
      parent: row,
      className: 'left'
    });
    this.borderWidthBox = new pInput({
      parent: row,
      className: 'right',
      unit: 'w'
    });
    row = new pRow({
      text: 'Radius'
    });
    this.borderRadiusBox = new pInput({
      parent: row,
      className: 'left',
      unit: ''
    });
    this.shadowPropertiesDiv = new pDiv;
    row = new pRow({
      parent: this.shadowPropertiesDiv,
      text: 'Shadow'
    });
    this.shadowColorBox = new pColor({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'left'
    });
    this.shadowSpreadBox = new pInput({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'right',
      unit: 's',
      "default": '0'
    });
    row = new pRow({
      parent: this.shadowPropertiesDiv,
      text: ''
    });
    this.shadowXBox = new pInput({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'left',
      unit: 'x',
      "default": '0'
    });
    this.shadowYBox = new pInput({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'right',
      unit: 'y',
      "default": '0'
    });
    row = new pRow({
      parent: this.shadowPropertiesDiv,
      text: ''
    });
    this.shadowBlurBox = new pInput({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'left',
      unit: 'b',
      "default": '0'
    });
    this.textPropertiesDiv = new pDiv;
    new pDivider({
      parent: this.textPropertiesDiv
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Font'
    });
    this.fontFamilyBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'full',
      unit: ''
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Color'
    });
    this.colorBox = new pColor({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'left'
    });
    this.fontSizeBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'right',
      unit: ''
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Style'
    });
    this.fontStyleBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'left',
      unit: ''
    });
    this.fontWeightBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'right',
      unit: 'w'
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Align'
    });
    this.textAlignBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'full',
      unit: '',
      "default": 'left'
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Spacing'
    });
    this.letterSpacingBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'left',
      unit: 'c'
    });
    this.lineHeightBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'right',
      unit: 'l'
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Text'
    });
    this.textBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'full',
      unit: ''
    });
    new pDivider;
    this.transformsAcco = new pAccordian({
      text: 'Transforms'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Scale'
    });
    this.scaleBox = new pInput({
      parent: row,
      section: this.transformsAcco,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: ''
    });
    this.scaleXBox = new pInput({
      parent: row,
      section: this.transformsAcco,
      className: 'left',
      unit: 'x'
    });
    this.scaleYBox = new pInput({
      parent: row,
      section: this.transformsAcco,
      className: 'right',
      unit: 'y'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Rotate'
    });
    this.rotationBox = new pInput({
      parent: row,
      section: this.transformsAcco,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: ''
    });
    this.rotationXBox = new pInput({
      parent: row,
      section: this.transformsAcco,
      className: 'left',
      unit: 'x'
    });
    this.rotationYBox = new pInput({
      parent: row,
      section: this.transformsAcco,
      className: 'right',
      unit: 'y'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Origin'
    });
    this.originXBox = new pInput({
      parent: row,
      section: this.transformsAcco,
      className: 'left',
      unit: 'x'
    });
    this.originYBox = new pInput({
      parent: row,
      section: this.transformsAcco,
      className: 'right',
      unit: 'y'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Skew'
    });
    this.skewBox = new pInput({
      parent: row,
      section: this.transformsAcco,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: ''
    });
    this.skewXBox = new pInput({
      parent: row,
      section: this.transformsAcco,
      className: 'left',
      unit: 'x'
    });
    this.skewYBox = new pInput({
      parent: row,
      section: this.transformsAcco,
      className: 'right',
      unit: 'y'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Perspective'
    });
    this.perspectiveBox = new pInput({
      parent: row,
      section: this.transformsAcco,
      className: 'left',
      unit: ''
    });
    this.filtersAcco = new pAccordian({
      text: 'Filters'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Blur'
    });
    this.blurBox = new pInput({
      parent: row,
      section: this.filtersAcco,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Brightness'
    });
    this.brightnessBox = new pInput({
      parent: row,
      section: this.filtersAcco,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Contrast'
    });
    this.contrastBox = new pInput({
      parent: row,
      section: this.filtersAcco,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Grayscale'
    });
    this.grayscaleBox = new pInput({
      parent: row,
      section: this.filtersAcco,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'hueRotate'
    });
    this.hueRotateBox = new pInput({
      parent: row,
      section: this.filtersAcco,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Invert'
    });
    this.invertBox = new pInput({
      parent: row,
      section: this.filtersAcco,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Saturate'
    });
    this.saturateBox = new pInput({
      parent: row,
      section: this.filtersAcco,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Sepia'
    });
    this.sepiaBox = new pInput({
      parent: row,
      section: this.filtersAcco,
      className: 'left',
      unit: ''
    });
    this.imagePropertiesDiv = new pDiv;
    new pDivider({
      parent: this.imagePropertiesDiv
    });
    row = new pRow({
      parent: this.imagePropertiesDiv,
      text: 'Image'
    });
    this.imageBox = new pImage({
      parent: this.imagePropertiesDiv,
      section: this.imagePropertiesDiv
    });
    row = new pRow({
      text: ''
    });
    row.element.style.height = '64px';
    this.socialMediaRow = new pRow({
      parent: this.textPropertiesDiv.body,
      text: ''
    });
    this.linkedinIcon = document.createElement('a');
    _.assign(this.linkedinIcon, {
      href: "http://www.linkedin.com/in/steveruizok",
      innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" id="linkedin_logo" class="mememeLink" width="20" height="20" fill="rgba(91, 91, 91, 1.000)" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'
    });
    this.githubIcon = document.createElement('a');
    _.assign(this.githubIcon, {
      href: "http://github.com/steveruizok/gotcha",
      innerHTML: '<svg height="20px" width="20px" id="github_logo" class="mememeLink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="rgba(91, 91, 91, 1.000)" d="M512 0C229.25 0 0 229.25 0 512c0 226.25 146.688 418.125 350.156 485.812 25.594 4.688 34.938-11.125 34.938-24.625 0-12.188-0.469-52.562-0.719-95.312C242 908.812 211.906 817.5 211.906 817.5c-23.312-59.125-56.844-74.875-56.844-74.875-46.531-31.75 3.53-31.125 3.53-31.125 51.406 3.562 78.47 52.75 78.47 52.75 45.688 78.25 119.875 55.625 149 42.5 4.654-33 17.904-55.625 32.5-68.375C304.906 725.438 185.344 681.5 185.344 485.312c0-55.938 19.969-101.562 52.656-137.406-5.219-13-22.844-65.094 5.062-135.562 0 0 42.938-13.75 140.812 52.5 40.812-11.406 84.594-17.031 128.125-17.219 43.5 0.188 87.312 5.875 128.188 17.281 97.688-66.312 140.688-52.5 140.688-52.5 28 70.531 10.375 122.562 5.125 135.5 32.812 35.844 52.625 81.469 52.625 137.406 0 196.688-119.75 240-233.812 252.688 18.438 15.875 34.75 47 34.75 94.75 0 68.438-0.688 123.625-0.688 140.5 0 13.625 9.312 29.562 35.25 24.562C877.438 930 1024 738.125 1024 512 1024 229.25 794.75 0 512 0z" /></svg>'
    });
    this.twitterIcon = document.createElement('a');
    _.assign(this.twitterIcon, {
      href: "http://twitter.com/steveruizok",
      innerHTML: '<svg height="28px" width="28px" id="twitter_logo" class="mememeLink" data-name="Logo — FIXED" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><style>.cls-1{fill:none;}.cls-2{fill:rgba(91, 91, 91, 1.000);}</style></defs><title>Twitter_Logo_Blue</title><rect class="cls-1" width="400" height="400"/><path class="cls-2" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/></svg>'
    });
    ref2 = [this.linkedinIcon, this.githubIcon, this.twitterIcon];
    for (j = 0, len = ref2.length; j < len; j++) {
      element = ref2[j];
      this.socialMediaRow.element.appendChild(element);
      this.socialMediaRow.element.classList.add('socialLinks');
    }
  }

  SpecPanel.prototype.showProperties = function(layer, customProps) {
    var def, key, propLayer, props, ref1, ref2, results, value;
    props = layer.props;
    _.assign(props, customProps);
    ref1 = _.merge(layer.props, customProps);
    results = [];
    for (key in ref1) {
      value = ref1[key];
      propLayer = this[key + 'Box'];
      if (!propLayer) {
        continue;
      }
      def = (ref2 = layer._propertyList()[key]) != null ? ref2["default"] : void 0;
      results.push(this.showProperty(key, value, propLayer, def));
    }
    return results;
  };

  SpecPanel.prototype.showProperty = function(key, value, propLayer, def) {
    var ref1;
    propLayer.isDefault = value === def;
    if ((value == null) || _.isNaN(value)) {
      value = (ref1 = propLayer["default"]) != null ? ref1 : '';
    }
    if (Color.isColor(value)) {
      value = value.color;
    }
    if (typeof value === 'string') {
      propLayer.value = value;
      return;
    }
    value = value.toString();
    if (value.indexOf('.') !== -1) {
      propLayer.value = parseFloat(value).toFixed(2);
      return;
    }
    return propLayer.value = parseInt(value, 10).toFixed();
  };

  SpecPanel.prototype.setVisibility = function(layer, bool) {
    if (bool) {
      layer.element.classList.add('hidden');
      return;
    }
    return layer.element.classList.remove('hidden');
  };

  SpecPanel.prototype.clearProps = function() {
    var j, len, prop, ref1, results;
    ref1 = this.propLayers;
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      prop = ref1[j];
      results.push(prop.value = void 0);
    }
    return results;
  };

  return SpecPanel;

})();


/* -------------------------------------------

	 .88888.             dP            dP
	d8'   `88            88            88
	88        .d8888b. d8888P .d8888b. 88d888b. .d8888b.
	88   YP88 88'  `88   88   88'  `"" 88'  `88 88'  `88
	Y8.   .88 88.  .88   88   88.  ... 88    88 88.  .88
	 `88888'  `88888P'   dP   `88888P' dP    dP `8888888
 */

Gotcha = (function() {
  function Gotcha(options) {
    if (options == null) {
      options = {};
    }
    this.unfocus = bind(this.unfocus, this);
    this.focus = bind(this.focus, this);
    this.tryFocus = bind(this.tryFocus, this);
    this.unsetSelectedLayer = bind(this.unsetSelectedLayer, this);
    this.setSelectedLayer = bind(this.setSelectedLayer, this);
    this.unsetHoveredLayer = bind(this.unsetHoveredLayer, this);
    this.setHoveredLayer = bind(this.setHoveredLayer, this);
    this.setPanelProperties = bind(this.setPanelProperties, this);
    this.showDistances = bind(this.showDistances, this);
    this.makeDashedLines = bind(this.makeDashedLines, this);
    this.makeRectOverlays = bind(this.makeRectOverlays, this);
    this.makeLabel = bind(this.makeLabel, this);
    this.makeLine = bind(this.makeLine, this);
    this.getDimensions = bind(this.getDimensions, this);
    this.getComponentFromLayer = bind(this.getComponentFromLayer, this);
    this.getLayerFromElement = bind(this.getLayerFromElement, this);
    this.update = bind(this.update, this);
    this.showTransition = bind(this.showTransition, this);
    this.transition = bind(this.transition, this);
    this.disable = bind(this.disable, this);
    this.enable = bind(this.enable, this);
    this.toggle = bind(this.toggle, this);
    this.specPanel = new SpecPanel;
    _.defaults(options, {
      color: 'rgba(72, 207, 255, 1.000)',
      selectedColor: 'rgba(255, 1, 255, 1.000)',
      secondaryColor: '#FFFFFF',
      fontFamily: 'Menlo',
      fontSize: '10',
      fontWeight: '500',
      borderRadius: 4,
      padding: {
        top: 1,
        bottom: 1,
        left: 3,
        right: 3
      }
    });
    _.assign(this, {
      color: options.color,
      selectedColor: options.selectedColor,
      secondaryColor: options.secondaryColor,
      fontFamily: options.fontFamily,
      fontSize: options.fontSize,
      fontWeight: options.fontWeight,
      shapes: [],
      borderRadius: options.borderRadius,
      padding: options.padding,
      focusedElement: void 0,
      enabled: false,
      screenElement: document.getElementsByClassName('DeviceComponentPort')[0],
      layers: [],
      containers: [],
      timer: void 0
    });
    document.addEventListener('keyup', this.toggle);
    Framer.CurrentContext.domEventManager.wrap(window).addEventListener("resize", this.update);
    this.context = document.getElementsByClassName('framerLayer DeviceScreen')[0];
    this.context.classList.add('hoverContext');
    this.context.childNodes[2].classList.add('IgnorePointerEvents');
    Framer.Device.on("change:deviceType", (function(_this) {
      return function() {
        return Utils.delay(0, _this.update);
      };
    })(this));
  }

  Gotcha.prototype.toggle = function(event, open) {
    if (event.key === "`" || event.key === "<" || open === true) {
      if (this.opened) {
        this.disable();
      } else {
        this.enable();
      }
      this.opened = !this.opened;
      return;
    }
    if (event.key === "/" || event.key === ">") {
      if (!this.enabled) {
        return;
      }
      if (this.hoveredLayer === this.selectedLayer) {
        this.unsetSelectedLayer();
      } else {
        this.setSelectedLayer();
      }
    }
  };

  Gotcha.prototype.enable = function() {
    this._canvasColor = Canvas.backgroundColor;
    ctx.setContext();
    return this.transition(true);
  };

  Gotcha.prototype.disable = function() {
    this.unfocus();
    this.enabled = false;
    return this.transition(false);
  };

  Gotcha.prototype.transition = function(open, seconds) {
    var hands, midX;
    if (open == null) {
      open = true;
    }
    if (seconds == null) {
      seconds = .5;
    }
    hands = Framer.Device.hands;
    hands.on("change:x", this.showTransition);
    hands.once(Events.AnimationEnd, (function(_this) {
      return function() {
        hands.off("change:x", _this.showTransition);
        _this.enabled = _this.opened = open;
        if (open) {
          Framer.Device.screen.on(Events.MouseOver, _this.setHoveredLayer);
          Framer.Device.screen.on(Events.MouseOut, _this.unsetHoveredLayer);
          Framer.Device.screen.on(Events.Click, _this.setSelectedLayer);
        } else {
          Framer.Device.screen.off(Events.MouseOver, _this.setHoveredLayer);
          Framer.Device.screen.off(Events.MouseOut, _this.unsetHoveredLayer);
          Framer.Device.screen.off(Events.Click, _this.setSelectedLayer);
        }
        return _this.focus();
      };
    })(this));
    this._startPosition = Framer.Device.hands.x;
    midX = hands._context.innerWidth / 2;
    return Framer.Device.hands.animate({
      midX: open ? midX - 112 : midX,
      options: {
        time: seconds,
        curve: Spring({
          damping: 10
        })
      }
    });
  };

  Gotcha.prototype.showTransition = function() {
    var factor, hands, midX, opacity;
    hands = Framer.Device.hands;
    midX = hands._context.innerWidth / 2;
    opacity = Utils.modulate(hands.midX, [midX - 56, midX - 112], [0, 1], true);
    factor = Utils.modulate(hands.midX, [midX, midX - 112], [0, 1], true);
    this.specPanel.panel.style.opacity = opacity;
    return Canvas.backgroundColor = Color.mix(this._canvasColor, 'rgba(30, 30, 30, 1.000)', factor);
  };

  Gotcha.prototype.update = function() {
    if (!this.opened) {
      return;
    }
    Framer.Device.hands.midX -= 122;
    ctx.setContext();
    return this.focus();
  };

  Gotcha.prototype.findLayerElement = function(element) {
    if (!element) {
      return;
    }
    if (!element.classList) {
      return;
    }
    if (element.classList.contains('framerLayer')) {
      return element;
    }
    return this.findLayerElement(element.parentNode);
  };

  Gotcha.prototype.getLayerFromElement = function(element) {
    var layer;
    if (!element) {
      return;
    }
    element = this.findLayerElement(element);
    layer = _.find(Framer.CurrentContext._layers, ['_element', element]);
    return layer;
  };

  Gotcha.prototype.getComponentFromLayer = function(layer, names) {
    if (names == null) {
      names = [];
    }
    if (!layer) {
      return names.join(', ');
    }
    if (!_.includes(["Layer", "TextLayer", "ScrollComponent"], layer.constructor.name)) {
      names.push(layer.constructor.name);
    }
    return this.getComponentFromLayer(layer.parent, names);
  };

  Gotcha.prototype.getDimensions = function(element) {
    var d, dimensions;
    if (!element) {
      return;
    }
    d = element.getBoundingClientRect();
    dimensions = {
      x: d.left,
      y: d.top,
      width: d.width,
      height: d.height,
      midX: d.left + (d.width / 2),
      midY: d.top + (d.height / 2),
      maxX: d.left + d.width,
      maxY: d.top + d.height,
      frame: d
    };
    return dimensions;
  };

  Gotcha.prototype.makeLine = function(pointA, pointB, label) {
    var capA, capB, color, line;
    if (label == null) {
      label = true;
    }
    color = this.selectedLayer != null ? this.selectedColor : this.color;
    line = new SVGShape({
      type: 'path',
      d: "M " + pointA[0] + " " + pointA[1] + " L " + pointB[0] + " " + pointB[1],
      stroke: color,
      'stroke-width': '1px'
    });
    if (pointA[0] === pointB[0]) {
      capA = new SVGShape({
        type: 'path',
        d: "M " + (pointA[0] - 5) + " " + pointA[1] + " L " + (pointA[0] + 5) + " " + pointA[1],
        stroke: color,
        'stroke-width': '1px'
      });
      return capB = new SVGShape({
        type: 'path',
        d: "M " + (pointB[0] - 5) + " " + pointB[1] + " L " + (pointB[0] + 5) + " " + pointB[1],
        stroke: color,
        'stroke-width': '1px'
      });
    } else if (pointA[1] === pointB[1]) {
      capA = new SVGShape({
        type: 'path',
        d: "M " + pointA[0] + " " + (pointA[1] - 5) + " L " + pointA[0] + " " + (pointA[1] + 5),
        stroke: color,
        'stroke-width': '1px'
      });
      return capB = new SVGShape({
        type: 'path',
        d: "M " + pointB[0] + " " + (pointB[1] - 5) + " L " + pointB[0] + " " + (pointB[1] + 5),
        stroke: color,
        'stroke-width': '1px'
      });
    }
  };

  Gotcha.prototype.makeLabel = function(x, y, text) {
    var box, color, l, label;
    color = this.selectedLayer != null ? this.selectedColor : this.color;
    label = new SVGShape({
      type: 'text',
      parent: ctx,
      x: x,
      y: y,
      'font-family': this.fontFamily,
      'font-size': this.fontSize,
      'font-weight': this.fontWeight,
      fill: this.secondaryColor,
      text: Math.floor(text / this.ratio)
    });
    l = this.getDimensions(label.element);
    label.x = x - l.width / 2;
    label.y = y + l.height / 4 - 1;
    box = new SVGShape({
      type: 'rect',
      parent: ctx,
      x: label.x - this.padding.left,
      y: label.y - l.height + 1,
      width: l.width + this.padding.left + this.padding.right,
      height: l.height + this.padding.top + this.padding.bottom + 1,
      rx: this.borderRadius,
      ry: this.borderRadius,
      fill: new Color(color).darken(40),
      stroke: color,
      'stroke-width': '1px'
    });
    return label.show();
  };

  Gotcha.prototype.makeRectOverlays = function(s, h) {
    var hoverFill, hoveredRect, selectFill, selectedRect;
    if (!s || !h) {
      return;
    }
    if (this.hoveredLayer === Framer.Device.screen) {
      hoverFill = new Color(this.color).alpha(0);
    } else {
      hoverFill = new Color(this.color).alpha(.2);
    }
    hoveredRect = new SVGShape({
      type: 'rect',
      parent: ctx,
      x: h.x,
      y: h.y,
      width: h.width,
      height: h.height,
      stroke: this.color,
      fill: hoverFill,
      'stroke-width': '1px'
    });
    if (this.selectedLayer === Framer.Device.screen) {
      selectFill = new Color(this.selectedColor).alpha(0);
    } else {
      selectFill = new Color(this.selectedColor).alpha(.2);
    }
    return selectedRect = new SVGShape({
      type: 'rect',
      parent: ctx,
      x: s.x,
      y: s.y,
      width: s.width,
      height: s.height,
      stroke: this.selectedColor,
      fill: selectFill,
      'stroke-width': '1px'
    });
  };

  Gotcha.prototype.makeDashedLines = function(e, f, color, offset) {
    if (!e) {
      return;
    }
    if (e === f) {
      return;
    }
    color = new Color(color).alpha(.8);
    new DashedLine({
      x: e.x,
      y: f.y
    }, {
      x: e.x,
      y: f.maxY
    }, color, offset);
    new DashedLine({
      x: e.maxX,
      y: f.y
    }, {
      x: e.maxX,
      y: f.maxY
    }, color, offset);
    new DashedLine({
      x: f.x,
      y: e.y
    }, {
      x: f.maxX,
      y: e.y
    }, color, offset);
    return new DashedLine({
      x: f.x,
      y: e.maxY
    }, {
      x: f.maxX,
      y: e.maxY
    }, color, offset);
  };

  Gotcha.prototype.showDistances = function(selected, hovered) {
    var d, f, h, m, s;
    if (this.hoveredLayer === this.selectedLayer) {
      this.hoveredLayer = Framer.Device.screen;
    }
    s = this.getDimensions(this.selectedLayer._element);
    h = this.getDimensions(this.hoveredLayer._element);
    f = this.getDimensions(Framer.Device.screen._element);
    if (!s || !h) {
      return;
    }
    this.ratio = Framer.Device.screen._element.getBoundingClientRect().width / Screen.width;
    this.makeDashedLines(s, f, this.selectedColor, 5);
    this.makeRectOverlays(s, h);
    if (s.x < h.x && s.maxX > h.maxX && s.y < h.y && s.maxY > h.maxY) {
      d = Math.abs(s.y - h.y);
      m = s.y + d / 2;
      this.makeLine([h.midX, s.y + 5], [h.midX, h.y - 4]);
      this.makeLabel(h.midX, m, d);
      d = Math.abs(s.maxX - h.maxX);
      m = h.maxX + (d / 2);
      this.makeLine([h.maxX + 5, h.midY], [s.maxX - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
      d = Math.abs(s.maxY - h.maxY);
      m = h.maxY + (d / 2);
      this.makeLine([h.midX, h.maxY + 5], [h.midX, s.maxY - 4]);
      this.makeLabel(h.midX, m, d);
      d = Math.abs(s.x - h.x);
      m = s.x + d / 2;
      this.makeLine([s.x + 5, h.midY], [h.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
      return;
    }
    if (s.x > h.x && s.maxX < h.maxX && s.y > h.y && s.maxY < h.maxY) {
      d = Math.abs(h.y - s.y);
      m = h.y + d / 2;
      this.makeLine([s.midX, h.y + 5], [s.midX, s.y - 4]);
      this.makeLabel(s.midX, m, d);
      d = Math.abs(h.maxX - s.maxX);
      m = s.maxX + (d / 2);
      this.makeLine([s.maxX + 5, s.midY], [h.maxX - 4, s.midY]);
      this.makeLabel(m, s.midY, d);
      d = Math.abs(h.maxY - s.maxY);
      m = s.maxY + (d / 2);
      this.makeLine([s.midX, s.maxY + 5], [s.midX, h.maxY - 4]);
      this.makeLabel(s.midX, m, d);
      d = Math.abs(h.x - s.x);
      m = h.x + d / 2;
      this.makeLine([h.x + 5, s.midY], [s.x - 4, s.midY]);
      this.makeLabel(m, s.midY, d);
      return;
    }
    if (s.y > h.maxY) {
      d = Math.abs(s.y - h.maxY);
      m = s.y - (d / 2);
      this.makeLine([h.midX, h.maxY + 5], [h.midX, s.y - 4]);
      this.makeLabel(h.midX, m, d);
    } else if (s.y > h.y) {
      d = Math.abs(s.y - h.y);
      m = s.y - (d / 2);
      this.makeLine([h.midX, h.y + 5], [h.midX, s.y - 4]);
      this.makeLabel(h.midX, m, d);
    }
    if (h.maxX < s.x) {
      d = Math.abs(s.x - h.maxX);
      m = s.x - (d / 2);
      this.makeLine([h.maxX + 5, h.midY], [s.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
    } else if (h.x < s.x) {
      d = Math.abs(s.x - h.x);
      m = s.x - (d / 2);
      this.makeLine([h.x + 5, h.midY], [s.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
    }
    if (s.maxX < h.x) {
      d = Math.abs(h.x - s.maxX);
      m = s.maxX + (d / 2);
      this.makeLine([s.maxX + 5, h.midY], [h.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
    } else if (s.x < h.x) {
      d = Math.abs(h.x - s.x);
      m = s.x + (d / 2);
      this.makeLine([s.x + 5, h.midY], [h.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
    }
    if (s.maxY < h.y) {
      d = Math.abs(h.y - s.maxY);
      m = s.maxY + (d / 2);
      this.makeLine([h.midX, s.maxY + 5], [h.midX, h.y - 4]);
      return this.makeLabel(h.midX, m, d);
    } else if (s.y < h.y) {
      d = Math.abs(h.y - s.y);
      m = s.y + (d / 2);
      this.makeLine([h.midX, s.y + 5], [h.midX, h.y - 4]);
      return this.makeLabel(h.midX, m, d);
    }
  };

  Gotcha.prototype.setPanelProperties = function() {
    var customProps, layer, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    if ((this.selectedLayer != null) && this.selectedLayer !== Framer.Device.screen) {
      layer = this.selectedLayer;
    } else if (this.hoveredLayer != null) {
      layer = this.hoveredLayer;
    } else {
      this.specPanel.clearProps();
      return;
    }
    customProps = {
      x: layer.screenFrame.x,
      y: layer.screenFrame.y,
      componentName: layer.constructor.name,
      componentNames: this.getComponentFromLayer(layer.parent),
      parentName: (ref1 = layer.parent) != null ? ref1.name : void 0
    };
    if (layer.shadows != null) {
      _.assign(customProps, {
        shadowX: (ref2 = layer.shadows[0]) != null ? ref2.x : void 0,
        shadowY: (ref3 = layer.shadows[0]) != null ? ref3.y : void 0,
        shadowSpread: (ref4 = layer.shadows[0]) != null ? ref4.spread : void 0,
        shadowColor: (ref5 = layer.shadows[0]) != null ? ref5.color : void 0,
        shadowType: (ref6 = layer.shadows[0]) != null ? ref6.type : void 0,
        shadowBlur: (ref7 = layer.shadows[0]) != null ? ref7.blur : void 0
      });
    }
    return this.specPanel.showProperties(layer, customProps);
  };

  Gotcha.prototype.setHoveredLayer = function(event) {
    if (!this.enabled) {
      return;
    }
    if (!event) {
      return;
    }
    if (event.target.classList.contains('SpecElement')) {
      return;
    }
    if (event.target.classList.contains('mememeLink')) {
      return;
    }
    this.hoveredLayer = this.getLayerFromElement(event != null ? event.target : void 0);
    return this.tryFocus(event);
  };

  Gotcha.prototype.unsetHoveredLayer = function() {
    this.hoveredLayer = void 0;
    if (this.selectedLayer == null) {
      return this.unfocus();
    }
  };

  Gotcha.prototype.setSelectedLayer = function() {
    if (!this.hoveredLayer) {
      return;
    }
    this.selectedLayer = this.hoveredLayer;
    return this.focus();
  };

  Gotcha.prototype.unsetSelectedLayer = function() {
    return this.selectedLayer = void 0;
  };

  Gotcha.prototype.tryFocus = function(event) {
    if (!this.enabled) {
      return;
    }
    this.focusElement = event.target;
    return (function(_this) {
      return function(event) {
        return Utils.delay(.05, function() {
          if (_this.focusElement !== event.target) {
            return;
          }
          return _this.focus();
        });
      };
    })(this)(event);
  };

  Gotcha.prototype.focus = function() {
    if (!this.enabled) {
      return;
    }
    this.unfocus();
    if (this.selectedLayer == null) {
      this.selectedLayer = Framer.Device.screen;
    }
    if (this.hoveredLayer == null) {
      this.hoveredLayer = Framer.Device.screen;
    }
    this.setPanelProperties();
    return this.showDistances();
  };

  Gotcha.prototype.unfocus = function(event) {
    return ctx.removeAll();
  };

  return Gotcha;

})();

panel = document.createElement('div');

panel.id = 'pContainer';

viewC = document.getElementById('FramerContextRoot-Default');

Utils.delay(0, (function(_this) {
  return function() {
    return viewC.appendChild(panel);
  };
})(this));

secretBox = document.createElement('input');

document.body.appendChild(secretBox);

ctx = new SVGContext;

exports.gotcha = gotcha = new Gotcha;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9HaXRIdWIvZ290Y2hhL2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcbiMgXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG4jIGJ5IEBzdGV2ZXJ1aXpva1xuI1xuI1xuIyBBIEZyYW1lciBtb2R1bGUgZm9yIGhhbmRvZmYuIEl0IHdvcmtzIGtpbmQgb2YgbGlrZSB0aGF0IG90aGVyIHRvb2wuXG5cbiMgVG9kbzpcbiMgLSBhZGQgKG9wZW4pIGFjY29yZGlhbiBzZWN0aW9uIGZvciB0ZXh0IHN0eWxlc1xuIyAtIHRleHQgc3R5bGVzIHNob3VsZCBvbmx5IGJlIHZpc2libGUgd2hlbiBob3ZlcmluZyBhIHRleHQgbGF5ZXJcbiMgLSBjbGVhbiB1cCBmaWVsZHMgd2l0aG91dCB2YWx1ZXNcbiMgLSBhZGQgaGFzVGV4dCBldmVudHMgdG8gaW5wdXQsIGV0Y1xuIyAtIGFkZCBzZWN0aW9uIGZvciBsYXllciBuYW1lc1xuIyAtIGFkZCBwcm9wZXJ0eSBjYWxscyBmb3IgcmVtYWluaW5nIHByb3BlcnRpZXNcblxuZGV2aWNlVHlwZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZGV2aWNlVHlwZVxuXG5pZiBkZXZpY2VUeXBlPyBcblx0ZGV2aWNlID0gRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzW2RldmljZVR5cGVdXG5cdEZyYW1lci5EZXZpY2UuX2NvbnRleHQuZGV2aWNlUGl4ZWxSYXRpbyA9IGRldmljZS5kZXZpY2VQaXhlbFJhdGlvXG5cblx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gZGV2aWNlVHlwZVxuXHR3aW5kb3cubG9jYWxTdG9yYWdlLmRldmljZSA9IHVuZGVmaW5lZFxuXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5zdmdDb250ZXh0ID0gdW5kZWZpbmVkXG5jdHggPSB1bmRlZmluZWRcblxuc3RhcnRPcGVuID0gZmFsc2VcblxuIyBkZWJ1Z2dpbmdcblxuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnRGV2aWNlUGhvbmUnKVswXT8uY2xhc3NMaXN0LmFkZCgnSWdub3JlUG9pbnRlckV2ZW50cycpXG5cblxuVXRpbHMuaW5zZXJ0Q1NTIFwiXCJcIlxuXHRcblx0I1NwZWNDb250YWluZXIge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRyaWdodDogMDtcblx0XHR0b3A6IDA7XG5cdFx0Ym90dG9tOiAwO1xuXHRcdHdpZHRoOiAyMjRweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwLCAyMCwgMjAsIDEuMDAwKTtcblx0XHRib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNDUsIDQ1LCA0NSwgMS4wMDApO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0XHRjdXJzb3I6IGRlZmF1bHQ7XG5cdH1cblxuXHQuU3BlY0xhYmVsIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdH1cblxuXHQuU3BlY1NlbGVjdGFibGUge1xuXHRcdGN1cnNvcjogcG9pbnRlcjtcblx0XHQtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdFx0LW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdH1cblxuXHQuU3BlY1NlbGVjdGFibGU6aG92ZXIge1xuXHRcdG91dGxpbmU6IDFweCBzb2xpZCByZ2JhKDcyLCAyMDcsIDI1NSwgMS4wMDApICFpbXBvcnRhbnQ7XG5cdH1cblxuXHQuU3BlY1NlbGVjdGFibGU6YWN0aXZlIHtcblx0XHRvdXRsaW5lOiAxcHggc29saWQgcmdiYSgyNTUsIDEsIDI1NSwgMS4wMDApICFpbXBvcnRhbnQ7XG5cdH1cblxuXHRALXdlYmtpdC1rZXlmcmFtZXMgc2hvd0NvcGllZCB7XG5cdFx0MCUgeyBcblx0XHRcdGJvcmRlci1jb2xvcjogcmdiYSgxMTgsIDIzNywgOTMsIDEuMDAwKTtcblx0XHR9XG5cblx0XHQxMDAlIHtcblx0XHRcdGJvcmRlci1jb2xvcjogcmdiYSgwLCAwLCAwLCAxLjAwMCk7XG5cdFx0fVxuXHR9XG5cblx0LmNvcGllZCB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogcmVkO1xuXHR9XG5cblx0Lm1lbWVtZUxpbmsge1xuXHRcdG9wYWNpdHk6IC40O1xuXHR9XG5cblx0Lm1lbWVtZUxpbms6aG92ZXIge1xuXHRcdG9wYWNpdHk6IDE7XG5cdH1cblx0XG5cdCNsaW5rZWRpbl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA4cHg7XG5cdFx0cmlnaHQ6IDY4cHg7XG5cdH1cblxuXHRcblx0I3R3aXR0ZXJfbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogNHB4O1xuXHRcdHJpZ2h0OiA0cHg7XG5cdH1cblxuXHQjZ2l0aHViX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDhweDtcblx0XHRyaWdodDogMzZweDtcblx0fVxuXG5cdC5mcmFtZXJMYXllciB7IFxuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGwgIWltcG9ydGFudDsgXG5cdFx0fSBcblx0XG5cdC5JZ25vcmVQb2ludGVyRXZlbnRzIHtcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZSAhaW1wb3J0YW50OyBcblx0fVxuXG5cdC5kcm9wZG93biB7XG5cdFx0b3BhY2l0eTogMDtcblx0fVxuXCJcIlwiXG5cblxuIyMjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBcdC5kODg4ODhiICBkUCAgICAgZFAgIC44ODg4OC4gICAgICBhODg4ODhiLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiAgXHQ4OC4gICAgXCInIDg4ICAgICA4OCBkOCcgICBgODggICAgZDgnICAgYDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuICBcdGBZODg4ODhiLiA4OCAgICAuOFAgODggICAgICAgICAgIDg4ICAgICAgICAuZDg4ODhiLiA4OGQ4Yi5kOGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIGQ4ODg4UCAuZDg4ODhiLlxuICBcdCAgICAgIGA4YiA4OCAgICBkOCcgODggICBZUDg4ICAgIDg4ICAgICAgICA4OCcgIGA4OCA4OCdgODgnYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4ICAgODggICBZOG9vb29vLlxuICBcdGQ4JyAgIC44UCA4OCAgLmQ4UCAgWTguICAgLjg4ICAgIFk4LiAgIC44OCA4OC4gIC44OCA4OCAgODggIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4ICAgODggICAgICAgICA4OFxuICBcdCBZODg4ODhQICA4ODg4ODgnICAgIGA4ODg4OCcgICAgICBZODg4ODhQJyBgODg4ODhQJyBkUCAgZFAgIGRQIDg4WTg4OFAnIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnIGRQICAgIGRQICAgZFAgICBgODg4ODhQJ1xuICBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMjI1xuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNWRyBDb250ZXh0XG5cbmNsYXNzIFNWR0NvbnRleHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHNoYXBlcyA9IFtdXG5cblx0XHRzdmdDb250ZXh0ID0gQFxuXG5cdFx0IyBuYW1lc3BhY2Vcblx0XHRzdmdOUyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuXHRcdFxuXHRcdCMgc2V0IGF0dHJpYnV0ZXMgXG5cdFx0c2V0QXR0cmlidXRlcyA9IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblxuXHRcdCMgQ3JlYXRlIFNWRyBlbGVtZW50XG5cblx0XHRAc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnc3ZnJylcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKEBzdmcpXG5cdFx0QHN2Zy5zdHlsZVsnei1pbmRleCddID0gJzk5OSdcblxuXHRcdEBmcmFtZUVsZW1lbnQgPSBGcmFtZXIuRGV2aWNlLnNjcmVlbkJhY2tncm91bmQuX2VsZW1lbnRcblxuXHRcdEBzZXRDb250ZXh0KClcblxuXHRcdCMgZGVmc1xuXHRcdFxuXHRcdEBzdmdEZWZzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnZGVmcycpXG5cdFx0QHN2Zy5hcHBlbmRDaGlsZCBAc3ZnRGVmc1xuXHRcdFxuXHRcdGRlbGV0ZSBAX19jb25zdHJ1Y3RvclxuXG5cdHNldEF0dHJpYnV0ZXM6IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgYXR0cmlidXRlc1xuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRzZXRDb250ZXh0OiA9PlxuXG5cdFx0QGxGcmFtZSA9IEBmcmFtZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR3aWR0aDogQGxGcmFtZS53aWR0aC50b0ZpeGVkKClcblx0XHRcdGhlaWdodDogQGxGcmFtZS5oZWlnaHQudG9GaXhlZCgpXG5cdFx0XHR4OiBAbEZyYW1lLmxlZnQudG9GaXhlZCgpXG5cdFx0XHR5OiBAbEZyYW1lLnRvcC50b0ZpeGVkKClcblxuXHRcdEBzY3JlZW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyQ29udGV4dCcpWzBdXG5cdFx0c0ZyYW1lID0gQHNjcmVlbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdEBzZXRBdHRyaWJ1dGVzIEBzdmcsXG5cdFx0XHR4OiAwXG5cdFx0XHR5OiAwXG5cdFx0XHR3aWR0aDogc0ZyYW1lLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHNGcmFtZS5oZWlnaHRcblx0XHRcdHZpZXdCb3g6IFwiMCAwICN7c0ZyYW1lLndpZHRofSAje3NGcmFtZS5oZWlnaHR9XCJcblxuXHRcdF8uYXNzaWduIEBzdmcuc3R5bGUsXG5cdFx0XHRwb3NpdGlvbjogXCJhYnNvbHV0ZVwiXG5cdFx0XHRsZWZ0OiAwXG5cdFx0XHR0b3A6IDBcblx0XHRcdHdpZHRoOiAnMTAwJSdcblx0XHRcdGhlaWdodDogJzEwMCUnXG5cdFx0XHQncG9pbnRlci1ldmVudHMnOiAnbm9uZSdcblxuXHRhZGRTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzaGFwZXMucHVzaChzaGFwZSlcblx0XHRAc2hvd1NoYXBlKHNoYXBlKVxuXHRcdFxuXHRyZW1vdmVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBoaWRlU2hhcGUoc2hhcGUpXG5cdFx0Xy5wdWxsKEBzaGFwZXMsIHNoYXBlKVxuXHRcdFxuXHRoaWRlU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFxuXHRzaG93U2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLmFwcGVuZENoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0XG5cdGFkZERlZjogKGRlZikgLT5cblx0XHRAc3ZnRGVmcy5hcHBlbmRDaGlsZChkZWYpXG5cblx0cmVtb3ZlQWxsOiA9PlxuXHRcdGZvciBzaGFwZSBpbiBAc2hhcGVzXG5cdFx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0QHNoYXBlcyA9IFtdXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNWRyBTaGFwZVxuXG5jbGFzcyBTVkdTaGFwZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7dHlwZTogJ2NpcmNsZSd9KSAtPlxuXHRcdEBfX2NvbnN0cnVjdG9yID0gdHJ1ZVxuXHRcdFxuXHRcdEBwYXJlbnQgPSBzdmdDb250ZXh0XG5cdFx0XG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG5cdFx0XHRcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFxuXHRcdFx0b3B0aW9ucy50eXBlXG5cdFx0XHQpXG5cblx0XHRAc2V0Q3VzdG9tUHJvcGVydHkoJ3RleHQnLCAndGV4dENvbnRlbnQnLCAndGV4dENvbnRlbnQnLCBvcHRpb25zLnRleHQpXG5cdFx0XHRcdFxuXHRcdCMgYXNzaWduIGF0dHJpYnV0ZXMgc2V0IGJ5IG9wdGlvbnNcblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBvcHRpb25zXG5cdFx0XHRAc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblx0XHRAcGFyZW50LmFkZFNoYXBlKEApXG5cdFx0XG5cdFx0QHNob3coKVxuXHRcdFx0XG5cdHNldEF0dHJpYnV0ZTogKGtleSwgdmFsdWUpID0+XG5cdFx0cmV0dXJuIGlmIGtleSBpcyAndGV4dCdcblx0XHRpZiBub3QgQFtrZXldP1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHRcdGtleSxcblx0XHRcdFx0Z2V0OiA9PlxuXHRcdFx0XHRcdHJldHVybiBAZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KVxuXHRcdFx0XHRzZXQ6ICh2YWx1ZSkgPT4gXG5cdFx0XHRcdFx0QGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cdFx0XG5cdFx0QFtrZXldID0gdmFsdWVcblx0XG5cdHNldEN1c3RvbVByb3BlcnR5OiAodmFyaWFibGVOYW1lLCByZXR1cm5WYWx1ZSwgc2V0VmFsdWUsIHN0YXJ0VmFsdWUpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiByZXR1cm5WYWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBlbGVtZW50W3NldFZhbHVlXSA9IHZhbHVlXG5cblx0XHRAW3ZhcmlhYmxlTmFtZV0gPSBzdGFydFZhbHVlXG5cblx0aGlkZTogLT4gXG5cdFx0QHBhcmVudC5oaWRlU2hhcGUoQClcblx0XG5cdHNob3c6IC0+IFxuXHRcdEBwYXJlbnQuc2hvd1NoYXBlKEApXG5cdFx0XG5cdHJlbW92ZTogLT5cblx0XHRAcGFyZW50LnJlbW92ZVNoYXBlKEApXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIERhc2hlZCBMaW5lXG5cbmNsYXNzIERhc2hlZExpbmUgZXh0ZW5kcyBTVkdTaGFwZVxuXHRjb25zdHJ1Y3RvcjogKHBvaW50QSwgcG9pbnRCLCBjb2xvciA9ICcjMDAwJywgb2Zmc2V0ID0gMCwgb3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5hc3NpZ24gb3B0aW9ucyxcblx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0ZDogXCJNICN7cG9pbnRBLnh9ICN7cG9pbnRBLnl9IEwgI3twb2ludEIueH0gI3twb2ludEIueX1cIlxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cdFx0XHQnc3Ryb2tlLWRhc2hhcnJheSc6IFwiNSwgNVwiXG5cdFx0XHQnc3Ryb2tlLWRhc2hvZmZzZXQnOiBvZmZzZXRcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgUGFuZWwgQ29tcG9uZW50c1xuXG5VdGlscy5pbnNlcnRDU1MgXCJcIlwiXG5cblx0I3BDb250YWluZXIge1xuXHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHRyaWdodDogMDtcblx0XHR3aWR0aDogMjI0cHg7XG5cdFx0aGVpZ2h0OiAxMDAlO1xuXHRcdGZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhIE5ldWUnO1xuXHRcdGZvbnQtc2l6ZTogMTFweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwLCAyMCwgMjAsIDEuMDAwKTtcblx0XHRib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNDUsIDQ1LCA0NSwgMS4wMDApO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0XHRjdXJzb3I6IGRlZmF1bHQ7XG5cdFx0b3ZlcmZsb3c6IHNjcm9sbDtcblx0XHRwYWRkaW5nLXRvcDogOHB4O1xuXHR9XG5cblx0LnBEaXYge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdHdpZHRoOiAxMDAlO1xuXHR9XG5cblx0LmhpZGRlbiB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0fVxuXG5cdC5wUm93IHtcblx0XHR3aWR0aDogMTAwJTtcblx0XHRoZWlnaHQ6IDMycHg7XG5cdH1cblxuXHQucFNwYW4ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRjb2xvcjogIzg4ODg4ODtcblx0XHRmb250LXdlaWdodDogNDAwO1xuXHRcdGxldHRlci1zcGFjaW5nOiAuNXB4O1xuXHRcdHBhZGRpbmctbGVmdDogOHB4O1xuXHRcdG1hcmdpbi10b3A6IDJweDtcblx0fVxuXG5cdC5wTGFiZWwge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHR0ZXh0LWFsaWduOiByaWdodDtcblx0XHRmb250LXNpemU6IDEwcHg7XG5cdFx0d2lkdGg6IG5vbmU7XG5cdFx0bWFyZ2luLXRvcDogMnB4O1xuXHRcdG1hcmdpbi1yaWdodDogOHB4O1xuXHRcdHotaW5kZXg6IDEwO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lO1xuXHR9XG5cblx0LnBJbnB1dCB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzI5MjkyOTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdGNvbG9yOiAjNTU1NTU1O1xuXHRcdHBhZGRpbmc6IDRweDtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG91dGxpbmU6IG5vbmU7XG5cdFx0bWFyZ2luLXRvcDogNHB4O1xuXHR9XG5cblx0LnBJbnB1dDpob3ZlciB7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzQ4Y2ZmZjtcblx0XHRjb2xvcjogIzQ4Y2ZmZjtcblx0fVxuXG5cdC5yaWdodCB7XG5cdFx0cmlnaHQ6IDhweDtcblx0XHR3aWR0aDogNDhweDtcblx0fVxuXG5cdC5sZWZ0IHtcblx0XHRyaWdodDogNzJweDtcblx0XHR3aWR0aDogNDhweDtcblx0fVxuXG5cdC5mdWxsIHtcblx0XHRyaWdodDogOHB4O1xuXHRcdHdpZHRoOiAxMTJweDtcblx0fVxuXG5cdC5wSW1hZ2Uge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdG1hcmdpbi1sZWZ0OiA4cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHRcdHdpZHRoOiAyMDhweDtcblx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMyOTI5Mjk7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0b3V0bGluZTogNHB4IHNvbGlkICMyOTI5Mjk7XG5cdFx0b3V0bGluZS1vZmZzZXQ6IC00cHg7XG5cdH1cblxuXHQucEltYWdlOmhvdmVyIHtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjNDhjZmZmO1xuXHRcdGNvbG9yOiAjNDhjZmZmO1xuXHRcdG91dGxpbmU6IDJweCBzb2xpZCAjMjkyOTI5O1xuXHR9XG5cblx0LnBDb2xvciB7XG5cdFx0b3V0bGluZTogNHB4IHNvbGlkICMyOTI5Mjk7XG5cdFx0b3V0bGluZS1vZmZzZXQ6IC00cHg7XG5cdH1cblxuXHQucENvbG9yOmhvdmVyIHtcblx0XHRvdXRsaW5lOiAycHggc29saWQgIzI5MjkyOTtcblx0XHRjb2xvcjogIzQ4Y2ZmZjtcblx0fVxuXG5cdC5wU2VsZWN0IHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0cmlnaHQ6IDhweDtcblx0XHR3aWR0aDogMTIycHg7XG5cdFx0Y29sb3I6ICM1NTU1NTU7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzI5MjkyOTtcblx0XHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHRwYWRkaW5nOiA0cHg7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG91dGxpbmU6IG5vbmU7XG5cdH1cblxuXHQucERpdmlkZXIge1xuXHRcdGhlaWdodDogMXB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG5cdFx0bWFyZ2luOiA4cHggOHB4IDE2cHggOHB4O1xuXHR9XG5cblx0LnBBY2NvcmRpYW4ge1xuXHRcdGJvcmRlci10b3A6IDFweCBzb2xpZCAjMDAwO1xuXHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMDAwO1xuXHRcdGhlaWdodDogYXV0bztcblx0XHRtaW4taGVpZ2h0OiAzMnB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMxRDFEMUQ7XG5cdH1cblxuXHQucEFjY29yZGlhbkJvZHkge1xuXHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHRcdG1hcmdpbi10b3A6IDMycHg7XG5cdFx0cGFkZGluZy10b3A6IDRweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMTQxNDE0O1xuXHR9XG5cblx0LmFjdGl2ZSB7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cblx0Lmhhc1ZhbHVlIHtcblx0XHRjb2xvcjogI0ZGRjtcblx0fVxuXG5cdC5zb2NpYWxMaW5rcyB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzE0MTQxNDtcblx0XHRwb3NpdGlvbjogZml4ZWQ7XG5cdFx0Ym90dG9tOiAwcHg7XG5cdFx0cmlnaHQ6IDBweDtcblx0XHRwYWRkaW5nLXRvcDogNHB4O1xuXHRcdHotaW5kZXg6IDEwMDtcblx0fVxuXG5cIlwiXCJcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgRGl2XG5cbmNsYXNzIHBEaXZcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwRGl2XCIpXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHRcInZpc2libGVcIixcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmlzaWJsZVxuXHRcdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdFx0cmV0dXJuIGlmIGJvb2wgaXMgQF92aXNpYmxlXG5cblx0XHRcdFx0QF92aXNpYmxlID0gYm9vbFxuXG5cdFx0XHRcdGlmIGJvb2xcblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdFxuXHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBSb3dcblxuY2xhc3MgcFJvdyBleHRlbmRzIHBEaXZcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0ZXh0OiAnTGFiZWwnXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwicERpdlwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwUm93XCIpXG5cblx0XHRAbGFiZWwgPSBuZXcgcFNwYW5cblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogb3B0aW9ucy50ZXh0XG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIERpdmlkZXJcblxuY2xhc3MgcERpdmlkZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwRGl2aWRlclwiKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU3BhblxuXG5jbGFzcyBwU3BhblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cdFx0XHR0ZXh0OiAnaGVsbG8gd29ybGQnXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwU3BhblwiKVxuXHRcdEBlbGVtZW50LnRleHRDb250ZW50ID0gb3B0aW9ucy50ZXh0XG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBMYWJlbFxuXG5jbGFzcyBwTGFiZWxcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXHRcdFx0Y2xhc3NOYW1lOiBudWxsXG5cdFx0XHR0ZXh0OiAneCdcblx0XHRcdGZvcjogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicExhYmVsXCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSlcblx0XHRcblx0XHRfLmFzc2lnbiBAZWxlbWVudCxcblx0XHRcdHRleHRDb250ZW50OiBvcHRpb25zLnRleHRcblx0XHRcdGZvcjogb3B0aW9ucy5mb3JcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIElucHV0XG5cbmNsYXNzIHBJbnB1dFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnJ1xuXHRcdFx0c2VjdGlvbjogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicElucHV0XCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSlcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRAdW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdHBhcmVudDogb3B0aW9ucy5wYXJlbnRcblx0XHRcdGNsYXNzTmFtZTogb3B0aW9ucy5jbGFzc05hbWVcblx0XHRcdHRleHQ6IG9wdGlvbnMudW5pdFxuXHRcdFx0Zm9yOiBAZWxlbWVudFxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0QGVsZW1lbnQudmFsdWUgPSB2YWx1ZSA/IFN0cmluZyhAZGVmYXVsdClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCdpc0RlZmF1bHQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9pc0RlZmF1bHRcblx0XHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRcdEBfaXNEZWZhdWx0ID0gYm9vbFxuXHRcdFx0XHRAc2VjdGlvbj8udmlzaWJsZSA9ICFib29sXG5cblx0XHRcdFx0aWYgYm9vbFxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hhc1ZhbHVlJylcblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRALmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGFzVmFsdWUnKVxuXG5cblx0XHRAZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsID0+XG5cdFx0XHRpZiBub3Qgc2VjcmV0Qm94XG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHRzZWNyZXRCb3gudmFsdWUgPSBAdmFsdWVcblx0XHRcdHNlY3JldEJveC5zZWxlY3QoKVxuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuXHRcdFx0c2VjcmV0Qm94LmJsdXIoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHZhbHVlOiBvcHRpb25zLnZhbHVlXG5cdFx0XHRkZWZhdWx0OiBvcHRpb25zLmRlZmF1bHRcblx0XHRcdHNlY3Rpb246IG9wdGlvbnMuc2VjdGlvblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBJbWFnZVxuXG5jbGFzcyBwSW1hZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdFx0dW5pdDogJydcblx0XHRcdHNlY3Rpb246IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwSW1hZ2VcIilcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRAZWxlbWVudC5zcmMgPSB2YWx1ZVxuXHRcdFx0XHRAc2VjdGlvbj8udmlzaWJsZSA9IHZhbHVlIGlzbnQgJydcblxuXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0aWYgbm90IHNlY3JldEJveFxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0c2VjcmV0Qm94LnZhbHVlID0gQHZhbHVlXG5cdFx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0c2VjdGlvbjogb3B0aW9ucy5zZWN0aW9uXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIENvbG9yIEJveFxuXG5jbGFzcyBwQ29sb3Jcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHRcdHZhbHVlOiAnIzI5MjkyOSdcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwSW5wdXRcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwQ29sb3InKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXG5cdFx0XHRcdGlmIHZhbHVlPy5jb2xvciBpcyAndHJhbnNwYXJlbnQnXG5cdFx0XHRcdFx0dmFsdWUgPSBudWxsXG5cblx0XHRcdFx0QHNlY3Rpb24/LnZpc2libGUgPSB2YWx1ZT9cblxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0QGVsZW1lbnQuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9IHZhbHVlXG5cblx0XHRAZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsID0+XG5cdFx0XHRpZiBub3Qgc2VjcmV0Qm94XG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHRzZWNyZXRCb3gudmFsdWUgPSBAdmFsdWVcblx0XHRcdHNlY3JldEJveC5zZWxlY3QoKVxuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuXHRcdFx0c2VjcmV0Qm94LmJsdXIoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHZhbHVlOiBvcHRpb25zLnZhbHVlXG5cdFx0XHRzZWN0aW9uOiBvcHRpb25zLnNlY3Rpb25cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU2VsZWN0XG5cbmNsYXNzIHBTZWxlY3Rcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXHRcdFx0c2VsZWN0ZWQ6IDBcblx0XHRcdG9wdGlvbnM6IFsncmVkJywgJ3doaXRlJywgJ2JsdWUnXVxuXHRcdFx0Y2FsbGJhY2s6ICh2YWx1ZSkgLT4gbnVsbFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwU2VsZWN0XCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGFzVmFsdWUnKVxuXG5cdFx0QHVuaXQgPSBuZXcgcExhYmVsXG5cdFx0XHRwYXJlbnQ6IG9wdGlvbnMucGFyZW50XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHRleHQ6ICfilr4nXG5cdFx0XHRmb3I6IEBlbGVtZW50XG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHQnb3B0aW9ucycsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX29wdGlvbnNcblx0XHRcdHNldDogKGFycmF5KSAtPlxuXHRcdFx0XHRAX29wdGlvbnMgPSBhcnJheVxuXHRcdFx0XHRAbWFrZU9wdGlvbnMoKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHQnc2VsZWN0ZWQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9zZWxlY3RlZFxuXHRcdFx0c2V0OiAobnVtKSAtPlxuXHRcdFx0XHRAX3NlbGVjdGVkID0gbnVtXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0X29wdGlvbnM6IFtdXG5cdFx0XHRfb3B0aW9uRWxlbWVudHM6IFtdXG5cdFx0XHRvcHRpb25zOiBvcHRpb25zLm9wdGlvbnNcblx0XHRcdGNhbGxiYWNrOiBvcHRpb25zLmNhbGxiYWNrXG5cdFx0XHRzZWxlY3RlZDogb3B0aW9ucy5zZWxlY3RlZFxuXG5cdFx0QGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IG9wdGlvbnMuc2VsZWN0ZWRcblxuXHRcdEBlbGVtZW50Lm9uY2hhbmdlID0gPT4gXG5cdFx0XHRAc2VsZWN0ZWQgPSBAZWxlbWVudC5zZWxlY3RlZEluZGV4XG5cdFx0XHRAY2FsbGJhY2soQGVsZW1lbnQuc2VsZWN0ZWRJbmRleClcblx0XHRcblxuXHRtYWtlT3B0aW9uczogPT5cblx0XHRmb3Igb3B0aW9uLCBpIGluIEBfb3B0aW9uRWxlbWVudHNcblx0XHRcdEBlbGVtZW50LnJlbW92ZUNoaWxkKG9wdGlvbilcblxuXHRcdEBfb3B0aW9uRWxlbWVudHMgPSBbXVxuXG5cdFx0Zm9yIG9wdGlvbiwgaSBpbiBAb3B0aW9uc1xuXHRcdFx0byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG5cdFx0XHRvLnZhbHVlID0gb3B0aW9uXG5cdFx0XHRvLmxhYmVsID0gb3B0aW9uXG5cdFx0XHRvLmlubmVySFRNTCA9IG9wdGlvblxuXHRcdFx0QGVsZW1lbnQuYXBwZW5kQ2hpbGQobylcblxuXHRcdFx0QF9vcHRpb25FbGVtZW50cy5wdXNoKG8pXG5cblx0XHRcdGlmIGkgaXMgQHNlbGVjdGVkXG5cdFx0XHRcdEB2YWx1ZSA9IEBlbGVtZW50Lm9wdGlvbnNbQGVsZW1lbnQuc2VsZWN0ZWRJbmRleF0ubGFiZWxcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgQWNjb3JkaWFuXG5cbmNsYXNzIHBBY2NvcmRpYW4gZXh0ZW5kcyBwUm93XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BBY2NvcmRpYW4nKVxuXHRcdEBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCBAdG9nZ2xlXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0dG9nZ2xlZDogZmFsc2VcblxuXHRcdEB1bml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHRleHQ6ICfilr8nXG5cdFx0XHRmb3I6IEBlbGVtZW50XG5cblx0XHRAYm9keSA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHRleHQ6ICcnXG5cdFx0QGJvZHkuZWxlbWVudC5yZW1vdmVDaGlsZChAYm9keS5sYWJlbC5lbGVtZW50KVxuXG5cdFx0QGVsZW1lbnQuYXBwZW5kQ2hpbGQoQGJvZHkuZWxlbWVudClcblx0XHRAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BBY2NvcmRpYW5Cb2R5JylcblxuXHRcdEBib2R5LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZXZlbnQpIC0+IFxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuXHR0b2dnbGU6ID0+XG5cdFx0QHRvZ2dsZWQgPSAhQHRvZ2dsZWRcblxuXHRcdGlmIEB0b2dnbGVkXG5cdFx0XHRAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG5cdFx0XHRAdW5pdC5lbGVtZW50LnRleHRDb250ZW50ID0gJ+KWvidcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgQGJvZHkuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpXG5cdFx0XHRAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG5cdFx0XHRAdW5pdC5lbGVtZW50LnRleHRDb250ZW50ID0gJ+KWvydcblxuXG4jIyMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gXHQuZDg4ODg4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIFx0ODguICAgIFwiJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gXHRgWTg4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gICAgYTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OFxuIFx0ICAgICAgYDhiIDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYFwiXCIgICAgIDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OFxuIFx0ZDgnICAgLjhQIDg4LiAgLjg4IDg4LiAgLi4uIDg4LiAgLi4uICAgICA4OCAgICAgICAgODguICAuODggODggICAgODggODguICAuLi4gODhcbiBcdCBZODg4ODhQICA4OFk4ODhQJyBgODg4ODhQJyBgODg4ODhQJyAgICAgZFAgICAgICAgIGA4ODg4OFA4IGRQICAgIGRQIGA4ODg4OFAnIGRQXG4gXHQgICAgICAgICAgODhcbiBcdCAgICAgICAgICBkUFxuXG4jIyNcblxuY2xhc3MgU3BlY1BhbmVsXG5cdGNvbnN0cnVjdG9yOiAtPlxuXG5cdFx0QHBhbmVsID0gcGFuZWxcblx0XHRAcHJvcExheWVycyA9IFtdXG5cdFx0QF9wcm9wcyA9IHt9XG5cdFx0QGZyYW1lID0gQHBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdFx0QGRlZmF1bHRzID0gRnJhbWVyLkRldmljZS5zY3JlZW4uX3Byb3BlcnR5TGlzdCgpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdCdwcm9wcycsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiBAX3Byb3BzXG5cdFx0XHRzZXQ6IChvYmopIC0+XG5cdFx0XHRcdGZvciBrZXksIHZhbHVlIG9mIG9ialxuXHRcdFx0XHRcdGlmIF8uaGFzKEBwcm9wcywga2V5KVxuXHRcdFx0XHRcdFx0QHByb3BzW2tleV0gPSB2YWx1ZVxuXG5cdFx0QHBhbmVsLnN0eWxlLm9wYWNpdHkgPSBpZiBzdGFydE9wZW4gdGhlbiAnMScgZWxzZSAnMCdcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGRldmljZVxuXG5cdFx0IyBTZXQgRGV2aWNlIE9wdGlvbnNcblxuXHRcdGRldmljZU9wdGlvbnMgPSBbXVxuXHRcdGN1cnJlbnRTZWxlY3RlZCA9IHVuZGVmaW5lZFxuXG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzXG5cdFx0XHRpZiBfLmVuZHNXaXRoKGtleSwgJ2hhbmQnKVxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRpZiBub3QgdmFsdWUubWluU3R1ZGlvVmVyc2lvbj9cblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0aWYgVXRpbHMuZnJhbWVyU3R1ZGlvVmVyc2lvbigpID4gdmFsdWUubWF4U3R1ZGlvVmVyc2lvblxuXHRcdFx0XHRjb250aW51ZSBcblxuXHRcdFx0aWYgVXRpbHMuZnJhbWVyU3R1ZGlvVmVyc2lvbigpIDwgdmFsdWUubWluU3R1ZGlvVmVyc2lvblxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRkZXZpY2VPcHRpb25zLnB1c2ggKGtleSlcblxuXHRcdFx0aWYga2V5IGlzIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZVxuXHRcdFx0XHRjdXJyZW50U2VsZWN0ZWQgPSBkZXZpY2VPcHRpb25zLmxlbmd0aCAtIDFcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnRGV2aWNlJ1xuXG5cdFx0QGRldmljZUJveCA9IG5ldyBwU2VsZWN0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0dW5pdDogJydcblx0XHRcdG9wdGlvbnM6IGRldmljZU9wdGlvbnNcblx0XHRcdHNlbGVjdGVkOiBjdXJyZW50U2VsZWN0ZWRcblx0XHRcdGNhbGxiYWNrOiAoaW5kZXgpID0+XG5cdFx0XHRcdGRldmljZVR5cGUgPSBkZXZpY2VPcHRpb25zW2luZGV4XVxuXHRcdFx0XHRkZXZpY2UgPSBGcmFtZXIuRGV2aWNlQ29tcG9uZW50LkRldmljZXNbZGV2aWNlVHlwZV1cblx0XHRcdFx0XG5cdFx0XHRcdF8uYXNzaWduIHdpbmRvdy5sb2NhbFN0b3JhZ2UsXG5cdFx0XHRcdFx0ZGV2aWNlVHlwZTogZGV2aWNlVHlwZVxuXHRcdFx0XHRcdGRldmljZTogZGV2aWNlXG5cdFx0XHRcdFx0Ymc6IFNjcmVlbi5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnTmFtZSdcblxuXHRcdEBuYW1lQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdDb21wb25lbnQnXG5cblx0XHRAY29tcG9uZW50TmFtZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXHRcdEBjb21wb25lbnROYW1lc1JvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnUGFydCBvZidcblxuXHRcdEBjb21wb25lbnROYW1lc0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogQGNvbXBvbmVudE5hbWVzUm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZGl2aWRlclxuXG5cdFx0bmV3IHBEaXZpZGVyXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgcG9zaXRpb25cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnUG9zaXRpb24nXG5cblx0XHRAeEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93LCBcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAneCdcblxuXHRcdEB5Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3csIFxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzaXplXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ1NpemUnXG5cblx0XHRAd2lkdGhCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHRAaGVpZ2h0Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3csIFxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAnaCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBiYWNrZ3JvdW5kIGNvbG9yXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ0JhY2tncm91bmQnXG5cblx0XHRAYmFja2dyb3VuZENvbG9yQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3csIFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBncmFkaWVudFxuXG5cdFx0QGdyYWRpZW50UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnR3JhZGllbnQnXG5cblx0XHRAZ3JhZGllbnRTdGFydEJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0QGdyYWRpZW50RW5kQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGdyYWRpZW50IGFuZ2xlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QGdyYWRpZW50U3RhcnRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdhJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIG9wYWNpdHlcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnT3BhY2l0eSdcblxuXHRcdEBvcGFjaXR5Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGRpdmlkZXJcblxuXHRcdG5ldyBwRGl2aWRlclxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJvcmRlclxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdCb3JkZXInXG5cblx0XHRAYm9yZGVyQ29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblxuXHRcdEBib3JkZXJXaWR0aEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHJhZGl1c1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdSYWRpdXMnXG5cblx0XHRAYm9yZGVyUmFkaXVzQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNoYWRvd1xuXG5cblx0XHRAc2hhZG93UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ1NoYWRvdydcblxuXHRcdEBzaGFkb3dDb2xvckJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblxuXHRcdEBzaGFkb3dTcHJlYWRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3MnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHNoYWRvd1hCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAneCdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0QHNoYWRvd1lCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3knXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHNoYWRvd0JsdXJCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnYidcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyB0ZXh0IHN0eWxlc1xuXG5cblxuXHRcdEB0ZXh0UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblxuXHRcdG5ldyBwRGl2aWRlclxuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBmb250IGZhbWlseVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnRm9udCdcblxuXHRcdEBmb250RmFtaWx5Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgY29sb3JcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0NvbG9yJ1xuXG5cdFx0QGNvbG9yQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblxuXHRcdEBmb250U2l6ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyB3ZWlnaHRcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ1N0eWxlJ1xuXG5cdFx0QGZvbnRTdHlsZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0QGZvbnRXZWlnaHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGFsaWduXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdBbGlnbidcblxuXHRcdEB0ZXh0QWxpZ25Cb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICdsZWZ0J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNwYWNpbmdcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ1NwYWNpbmcnXG5cblx0XHRAbGV0dGVyU3BhY2luZ0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnYydcblxuXHRcdEBsaW5lSGVpZ2h0Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAnbCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyB0ZXh0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdUZXh0J1xuXG5cdFx0QHRleHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHRyYW5zZm9ybVxuXG5cdFx0bmV3IHBEaXZpZGVyXG5cblx0XHRAdHJhbnNmb3Jtc0FjY28gPSBuZXcgcEFjY29yZGlhblxuXHRcdFx0dGV4dDogJ1RyYW5zZm9ybXMnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2NhbGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnU2NhbGUnXG5cblx0XHRAc2NhbGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNBY2NvXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHNjYWxlWEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0FjY29cblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAneCdcblxuXHRcdEBzY2FsZVlCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNBY2NvXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHJvdGF0aW9uXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1JvdGF0ZSdcblxuXHRcdEByb3RhdGlvbkJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0FjY29cblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAcm90YXRpb25YQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zQWNjb1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHJvdGF0aW9uWUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0FjY29cblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3knXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBvcmlnaW5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnT3JpZ2luJ1xuXG5cdFx0QG9yaWdpblhCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNBY2NvXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAb3JpZ2luWUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0FjY29cblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3knXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2tld1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTa2V3J1xuXG5cdFx0QHNrZXdCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNBY2NvXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHNrZXdYQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zQWNjb1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHNrZXdZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zQWNjb1xuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwZXJzcGVjdGl2ZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdQZXJzcGVjdGl2ZSdcblxuXHRcdEBwZXJzcGVjdGl2ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0FjY29cblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblxuXG5cblxuXG5cblxuXG5cdFx0XG5cblxuXG5cblxuXG5cblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGZpbHRlcnNcblxuXHRcdEBmaWx0ZXJzQWNjbyA9IG5ldyBwQWNjb3JkaWFuXG5cdFx0XHR0ZXh0OiAnRmlsdGVycydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBibHVyXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JsdXInXG5cblx0XHRAYmx1ckJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0FjY29cblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJyaWdodG5lc3NcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQnJpZ2h0bmVzcydcblxuXHRcdEBicmlnaHRuZXNzQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzQWNjb1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgY29udHJhc3RcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQ29udHJhc3QnXG5cblx0XHRAY29udHJhc3RCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNBY2NvXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBncmF5c2NhbGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnR3JheXNjYWxlJ1xuXG5cdFx0QGdyYXlzY2FsZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0FjY29cblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGh1ZXJvdGF0ZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdodWVSb3RhdGUnXG5cblx0XHRAaHVlUm90YXRlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzQWNjb1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgaW52ZXJ0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0ludmVydCdcblxuXHRcdEBpbnZlcnRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNBY2NvXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzYXR1cmF0ZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTYXR1cmF0ZSdcblxuXHRcdEBzYXR1cmF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0FjY29cblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNlcGlhXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NlcGlhJ1xuXG5cdFx0QHNlcGlhQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzQWNjb1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGVuZCBmaWx0ZXJzXG5cblxuXG5cblx0XHQjIGltYWdlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRAaW1hZ2VQcm9wZXJ0aWVzRGl2ID0gbmV3IHBEaXZcblxuXHRcdG5ldyBwRGl2aWRlclxuXHRcdFx0cGFyZW50OiBAaW1hZ2VQcm9wZXJ0aWVzRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgaW1hZ2VcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBpbWFnZVByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdJbWFnZSdcblxuXHRcdEBpbWFnZUJveCA9IG5ldyBwSW1hZ2Vcblx0XHRcdHBhcmVudDogQGltYWdlUHJvcGVydGllc0RpdlxuXHRcdFx0c2VjdGlvbjogQGltYWdlUHJvcGVydGllc0RpdlxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgcGxhY2Vob2xkZXJzXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJydcblx0XHRyb3cuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnNjRweCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzb2NpYWwgbWVkaWEgbGlua3NcblxuXHRcdEBzb2NpYWxNZWRpYVJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0Rpdi5ib2R5XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QGxpbmtlZGluSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdF8uYXNzaWduIEBsaW5rZWRpbkljb24sXG5cdFx0XHRocmVmOiBcImh0dHA6Ly93d3cubGlua2VkaW4uY29tL2luL3N0ZXZlcnVpem9rXCJcblx0XHRcdGlubmVySFRNTDogJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGlkPVwibGlua2VkaW5fbG9nb1wiIGNsYXNzPVwibWVtZW1lTGlua1wiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIGZpbGw9XCJyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5IDBoLTE0Yy0yLjc2MSAwLTUgMi4yMzktNSA1djE0YzAgMi43NjEgMi4yMzkgNSA1IDVoMTRjMi43NjIgMCA1LTIuMjM5IDUtNXYtMTRjMC0yLjc2MS0yLjIzOC01LTUtNXptLTExIDE5aC0zdi0xMWgzdjExem0tMS41LTEyLjI2OGMtLjk2NiAwLTEuNzUtLjc5LTEuNzUtMS43NjRzLjc4NC0xLjc2NCAxLjc1LTEuNzY0IDEuNzUuNzkgMS43NSAxLjc2NC0uNzgzIDEuNzY0LTEuNzUgMS43NjR6bTEzLjUgMTIuMjY4aC0zdi01LjYwNGMwLTMuMzY4LTQtMy4xMTMtNCAwdjUuNjA0aC0zdi0xMWgzdjEuNzY1YzEuMzk2LTIuNTg2IDctMi43NzcgNyAyLjQ3NnY2Ljc1OXpcIi8+PC9zdmc+J1xuXG5cdFx0QGdpdGh1Ykljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRfLmFzc2lnbiBAZ2l0aHViSWNvbixcblx0XHRcdGhyZWY6IFwiaHR0cDovL2dpdGh1Yi5jb20vc3RldmVydWl6b2svZ290Y2hhXCJcblx0XHRcdGlubmVySFRNTDogJzxzdmcgaGVpZ2h0PVwiMjBweFwiIHdpZHRoPVwiMjBweFwiIGlkPVwiZ2l0aHViX2xvZ29cIiBjbGFzcz1cIm1lbWVtZUxpbmtcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIj48cGF0aCBmaWxsPVwicmdiYSg5MSwgOTEsIDkxLCAxLjAwMClcIiBkPVwiTTUxMiAwQzIyOS4yNSAwIDAgMjI5LjI1IDAgNTEyYzAgMjI2LjI1IDE0Ni42ODggNDE4LjEyNSAzNTAuMTU2IDQ4NS44MTIgMjUuNTk0IDQuNjg4IDM0LjkzOC0xMS4xMjUgMzQuOTM4LTI0LjYyNSAwLTEyLjE4OC0wLjQ2OS01Mi41NjItMC43MTktOTUuMzEyQzI0MiA5MDguODEyIDIxMS45MDYgODE3LjUgMjExLjkwNiA4MTcuNWMtMjMuMzEyLTU5LjEyNS01Ni44NDQtNzQuODc1LTU2Ljg0NC03NC44NzUtNDYuNTMxLTMxLjc1IDMuNTMtMzEuMTI1IDMuNTMtMzEuMTI1IDUxLjQwNiAzLjU2MiA3OC40NyA1Mi43NSA3OC40NyA1Mi43NSA0NS42ODggNzguMjUgMTE5Ljg3NSA1NS42MjUgMTQ5IDQyLjUgNC42NTQtMzMgMTcuOTA0LTU1LjYyNSAzMi41LTY4LjM3NUMzMDQuOTA2IDcyNS40MzggMTg1LjM0NCA2ODEuNSAxODUuMzQ0IDQ4NS4zMTJjMC01NS45MzggMTkuOTY5LTEwMS41NjIgNTIuNjU2LTEzNy40MDYtNS4yMTktMTMtMjIuODQ0LTY1LjA5NCA1LjA2Mi0xMzUuNTYyIDAgMCA0Mi45MzgtMTMuNzUgMTQwLjgxMiA1Mi41IDQwLjgxMi0xMS40MDYgODQuNTk0LTE3LjAzMSAxMjguMTI1LTE3LjIxOSA0My41IDAuMTg4IDg3LjMxMiA1Ljg3NSAxMjguMTg4IDE3LjI4MSA5Ny42ODgtNjYuMzEyIDE0MC42ODgtNTIuNSAxNDAuNjg4LTUyLjUgMjggNzAuNTMxIDEwLjM3NSAxMjIuNTYyIDUuMTI1IDEzNS41IDMyLjgxMiAzNS44NDQgNTIuNjI1IDgxLjQ2OSA1Mi42MjUgMTM3LjQwNiAwIDE5Ni42ODgtMTE5Ljc1IDI0MC0yMzMuODEyIDI1Mi42ODggMTguNDM4IDE1Ljg3NSAzNC43NSA0NyAzNC43NSA5NC43NSAwIDY4LjQzOC0wLjY4OCAxMjMuNjI1LTAuNjg4IDE0MC41IDAgMTMuNjI1IDkuMzEyIDI5LjU2MiAzNS4yNSAyNC41NjJDODc3LjQzOCA5MzAgMTAyNCA3MzguMTI1IDEwMjQgNTEyIDEwMjQgMjI5LjI1IDc5NC43NSAwIDUxMiAwelwiIC8+PC9zdmc+J1xuXG5cdFx0QHR3aXR0ZXJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0Xy5hc3NpZ24gQHR3aXR0ZXJJY29uLFxuXHRcdFx0aHJlZjogXCJodHRwOi8vdHdpdHRlci5jb20vc3RldmVydWl6b2tcIlxuXHRcdFx0aW5uZXJIVE1MOiAnPHN2ZyBoZWlnaHQ9XCIyOHB4XCIgd2lkdGg9XCIyOHB4XCIgaWQ9XCJ0d2l0dGVyX2xvZ29cIiBjbGFzcz1cIm1lbWVtZUxpbmtcIiBkYXRhLW5hbWU9XCJMb2dvIOKAlCBGSVhFRFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQwMCA0MDBcIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6bm9uZTt9LmNscy0ye2ZpbGw6cmdiYSg5MSwgOTEsIDkxLCAxLjAwMCk7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5Ud2l0dGVyX0xvZ29fQmx1ZTwvdGl0bGU+PHJlY3QgY2xhc3M9XCJjbHMtMVwiIHdpZHRoPVwiNDAwXCIgaGVpZ2h0PVwiNDAwXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTJcIiBkPVwiTTE1My42MiwzMDEuNTljOTQuMzQsMCwxNDUuOTQtNzguMTYsMTQ1Ljk0LTE0NS45NCwwLTIuMjIsMC00LjQzLS4xNS02LjYzQTEwNC4zNiwxMDQuMzYsMCwwLDAsMzI1LDEyMi40N2ExMDIuMzgsMTAyLjM4LDAsMCwxLTI5LjQ2LDguMDcsNTEuNDcsNTEuNDcsMCwwLDAsMjIuNTUtMjguMzcsMTAyLjc5LDEwMi43OSwwLDAsMS0zMi41NywxMi40NSw1MS4zNCw1MS4zNCwwLDAsMC04Ny40MSw0Ni43OEExNDUuNjIsMTQ1LjYyLDAsMCwxLDkyLjQsMTA3LjgxYTUxLjMzLDUxLjMzLDAsMCwwLDE1Ljg4LDY4LjQ3QTUwLjkxLDUwLjkxLDAsMCwxLDg1LDE2OS44NmMwLC4yMSwwLC40MywwLC42NWE1MS4zMSw1MS4zMSwwLDAsMCw0MS4xNSw1MC4yOCw1MS4yMSw1MS4yMSwwLDAsMS0yMy4xNi44OCw1MS4zNSw1MS4zNSwwLDAsMCw0Ny45MiwzNS42MiwxMDIuOTIsMTAyLjkyLDAsMCwxLTYzLjcsMjJBMTA0LjQxLDEwNC40MSwwLDAsMSw3NSwyNzguNTVhMTQ1LjIxLDE0NS4yMSwwLDAsMCw3OC42MiwyM1wiLz48L3N2Zz4nXG5cblx0XHRmb3IgZWxlbWVudCBpbiBbQGxpbmtlZGluSWNvbiwgQGdpdGh1Ykljb24sIEB0d2l0dGVySWNvbl1cblx0XHRcdEBzb2NpYWxNZWRpYVJvdy5lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpXG5cdFx0XHRAc29jaWFsTWVkaWFSb3cuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzb2NpYWxMaW5rcycpXG5cblx0XG5cdHNob3dQcm9wZXJ0aWVzOiAobGF5ZXIsIGN1c3RvbVByb3BzKSA9PlxuXG5cdFx0cHJvcHMgPSBsYXllci5wcm9wc1xuXHRcdF8uYXNzaWduIHByb3BzLCBjdXN0b21Qcm9wc1xuXG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgXy5tZXJnZShsYXllci5wcm9wcywgY3VzdG9tUHJvcHMpXG5cdFx0XHRwcm9wTGF5ZXIgPSBAW2tleSArICdCb3gnXVxuXHRcdFx0aWYgbm90IHByb3BMYXllclxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRkZWYgPSBsYXllci5fcHJvcGVydHlMaXN0KClba2V5XT8uZGVmYXVsdFxuXHRcdFx0XG5cdFx0XHRAc2hvd1Byb3BlcnR5KGtleSwgdmFsdWUsIHByb3BMYXllciwgZGVmKVxuXG5cdFx0IyBAc2V0VmlzaWJpbGl0eShcblx0XHQjIFx0J3NoYWRvd1Byb3BlcnRpZXNEaXYnLFxuXHRcdCMgXHRsYXllci5zaGFkb3dzP1xuXHRcdCMgXHQpXG5cblx0XHQjIEBzZXRWaXNpYmlsaXR5KFxuXHRcdCMgXHQnZ3JhZGllbnRQcm9wZXJ0aWVzRGl2JywgXG5cdFx0IyBcdGxheWVyLmdyYWRpZW50P1xuXHRcdCMgXHQpXG5cblx0XHQjIEBzZXRWaXNpYmlsaXR5KFxuXHRcdCMgXHQndGV4dFByb3BlcnRpZXNEaXYnLCBcblx0XHQjIFx0bGF5ZXIudGV4dD9cblx0XHQjIFx0KVxuXG5cdFx0IyBAc2V0VmlzaWJpbGl0eShcblx0XHQjIFx0J2ltYWdlUHJvcGVydGllc0RpdicsIFxuXHRcdCMgXHRsYXllci5pbWFnZSBpc250ICcnXG5cdFx0IyBcdClcblxuXHRcdCMgbW9yZSBjb21wbGV4IHNlY3Rpb24gc3BlY2lmaWMgdmlzaWJpbGl0eSBjaGVja3Ncblx0XHQjIGlmIGFueSBvZiB0aGUgcHJvcGVydGllcyBhcmVuJ3QgYSBkZWZhdWx0Li4uXG5cblx0XHQjIGlzRXhjZXB0aW9uID0gKHByb3ApIC0+IG5vdCBpc0RlZmF1bHQocHJvcClcblxuXHRcdCMgaGFzRXhjZXB0aW9ucyA9IChwcm9wZXJ0aWVzID0gW10pIC0+XG5cdFx0IyBcdHJldHVybiBfLnNvbWUoIF8ubWFwKCBwcm9wZXJ0aWVzLCBpc0V4Y2VwdGlvbiApIClcblx0XHRcblx0XHQjIGZpbHRlcnMgPSBbXG5cdFx0IyBcdCdibHVyJyxcblx0XHQjIFx0J2dyYXlzY2FsZScsXG5cdFx0IyBcdCdodWVSb3RhdGUnLFxuXHRcdCMgXHQnaW52ZXJ0Jyxcblx0XHQjIFx0J3NlcGlhJyxcblx0XHQjIFx0J2JyaWdodG5lc3MnLFxuXHRcdCMgXHQnY29udHJhc3QnLFxuXHRcdCMgXHQnc2F0dXJhdGUnLFxuXHRcdCMgXHRdXG5cblx0XHQjIHRyYW5zZm9ybXMgPSBbXG5cdFx0IyBcdCdza2V3Jyxcblx0XHQjIFx0J3NrZXdYJyxcblx0XHQjIFx0J3NrZXdZJyxcblx0XHQjIFx0J3NjYWxlJyxcblx0XHQjIFx0J3NjYWxlWCcsXG5cdFx0IyBcdCdzY2FsZVknLFxuXHRcdCMgXHQncm90YXRpb25YJyxcblx0XHQjIFx0J3JvdGF0aW9uWScsXG5cdFx0IyBcdCdyb3RhdGlvblonLFxuXHRcdCMgXHQnb3JpZ2luWCcsXG5cdFx0IyBcdCdvcmlnaW5ZJyxcblx0XHQjIFx0J3BlcnNwZWN0aXZlJyxcblx0XHQjIFx0XVxuXG5cdFx0IyBAc2V0VmlzaWJpbGl0eShcblx0XHQjIFx0J3RyYW5zZm9ybXNBY2NvJywgXG5cdFx0IyBcdGhhc0V4Y2VwdGlvbnModHJhbnNmb3Jtcylcblx0XHQjIFx0KVxuXG5cdFx0IyBAc2V0VmlzaWJpbGl0eShcblx0XHQjIFx0J2ZpbHRlcnNBY2NvJywgXG5cdFx0IyBcdGhhc0V4Y2VwdGlvbnMoZmlsdGVycylcblx0XHQjIFx0KVxuXG5cdHNob3dQcm9wZXJ0eTogKGtleSwgdmFsdWUsIHByb3BMYXllciwgZGVmKSA9PlxuXG5cdFx0cHJvcExheWVyLmlzRGVmYXVsdCA9IHZhbHVlIGlzIGRlZlxuXG5cdFx0aWYgbm90IHZhbHVlPyBvciBfLmlzTmFOKHZhbHVlKVxuXHRcdFx0dmFsdWUgPSBwcm9wTGF5ZXIuZGVmYXVsdCA/ICcnXG5cblx0XHQjIGNvbG9yXG5cdFx0aWYgQ29sb3IuaXNDb2xvcih2YWx1ZSlcblx0XHRcdHZhbHVlID0gdmFsdWUuY29sb3JcblxuXHRcdCMgc3RyaW5nXG5cdFx0aWYgdHlwZW9mIHZhbHVlIGlzICdzdHJpbmcnXG5cdFx0XHRwcm9wTGF5ZXIudmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuXG5cblx0XHR2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKClcblxuXHRcdCMgZmxvYXRcblx0XHRpZiB2YWx1ZS5pbmRleE9mKCcuJykgaXNudCAtMVxuXHRcdFx0cHJvcExheWVyLnZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSkudG9GaXhlZCgyKVxuXHRcdFx0cmV0dXJuXG5cblx0XHQjIG51bWVyXG5cdFx0cHJvcExheWVyLnZhbHVlID0gcGFyc2VJbnQodmFsdWUsIDEwKS50b0ZpeGVkKClcblxuXHRzZXRWaXNpYmlsaXR5OiAobGF5ZXIsIGJvb2wpIC0+XG5cdFx0aWYgYm9vbFxuXHRcdFx0bGF5ZXIuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRsYXllci5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG5cblx0IyBkZWZpbmVDdXN0b21Qcm9wZXJ0eTogKHZhcmlhYmxlTmFtZSwgbGF5ZXIsIGZsb2F0KSA9PlxuXHQjIFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdCMgXHRcdHZhcmlhYmxlTmFtZSxcblx0IyBcdFx0Z2V0OiA9PiByZXR1cm4gQHByb3BzW3ZhcmlhYmxlTmFtZV1cblx0IyBcdFx0c2V0OiAodmFsdWUpID0+XG5cdCMgXHRcdFx0QHByb3BzW3ZhcmlhYmxlTmFtZV0gPSB2YWx1ZVxuXG5cdCMgXHRcdFx0aWYgbm90IHZhbHVlPyBvciB2YWx1ZSBpcyAnMCdcblx0IyBcdFx0XHRcdGxheWVyLnZhbHVlID0gJydcblx0IyBcdFx0XHRcdHJldHVyblxuXG5cdCMgXHRcdFx0aWYgZmxvYXRcblx0IyBcdFx0XHRcdGxheWVyLnZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSA/ICcwJykudG9GaXhlZCgyKVxuXHQjIFx0XHRcdFx0cmV0dXJuXG5cblx0IyBcdFx0XHRpZiB0eXBlb2YgdmFsdWUgaXMgJ251bWJlcidcblx0IyBcdFx0XHRcdHZhbHVlID0gcGFyc2VJbnQodmFsdWUpLnRvRml4ZWQoKVxuXG5cdCMgXHRcdFx0bGF5ZXIudmFsdWUgPSB2YWx1ZVxuXG5cdCMgXHRsYXllci5kZWZhdWx0ID0gQGRlZmF1bHRzW3ZhcmlhYmxlTmFtZV0/LmRlZmF1bHQgPyAnJ1xuXG5cdCMgYWRkQ29weUV2ZW50OiAobGF5ZXIpIC0+XG5cdCMgXHRkbyAobGF5ZXIpID0+XG5cdCMgXHRcdGxheWVyLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHQjIFx0XHRcdEBjb3B5VmFsdWUobGF5ZXIpXG5cblx0IyBjb3B5VmFsdWU6IChsYXllcikgPT5cblx0IyBcdHNlY3JldEJveC52YWx1ZSA9IGxheWVyLnZhbHVlXG5cdCMgXHRzZWNyZXRCb3guc2VsZWN0KClcblx0IyBcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0IyBcdHNlY3JldEJveC5ibHVyKClcblxuXHRjbGVhclByb3BzOiA9PlxuXHRcdGZvciBwcm9wIGluIEBwcm9wTGF5ZXJzXG5cdFx0XHRwcm9wLnZhbHVlID0gdW5kZWZpbmVkXG5cblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuIyMjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQgLjg4ODg4LiAgICAgICAgICAgICBkUCAgICAgICAgICAgIGRQXG5cdGQ4JyAgIGA4OCAgICAgICAgICAgIDg4ICAgICAgICAgICAgODhcblx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuXHQ4OCAgIFlQODggODgnICBgODggICA4OCAgIDg4JyAgYFwiXCIgODgnICBgODggODgnICBgODhcblx0WTguICAgLjg4IDg4LiAgLjg4ICAgODggICA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OFxuXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4ODg4XG5cbiMjIyBcblxuXG5jbGFzcyBHb3RjaGFcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAc3BlY1BhbmVsID0gbmV3IFNwZWNQYW5lbFxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDcyLCAyMDcsIDI1NSwgMS4wMDApJ1xuXHRcdFx0c2VsZWN0ZWRDb2xvcjogJ3JnYmEoMjU1LCAxLCAyNTUsIDEuMDAwKSdcblx0XHRcdHNlY29uZGFyeUNvbG9yOiAnI0ZGRkZGRidcblx0XHRcdGZvbnRGYW1pbHk6ICdNZW5sbydcblx0XHRcdGZvbnRTaXplOiAnMTAnXG5cdFx0XHRmb250V2VpZ2h0OiAnNTAwJ1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0XG5cdFx0XHRwYWRkaW5nOiB7dG9wOiAxLCBib3R0b206IDEsIGxlZnQ6IDMsIHJpZ2h0OiAzfVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdGNvbG9yOiBvcHRpb25zLmNvbG9yXG5cdFx0XHRzZWxlY3RlZENvbG9yOiBvcHRpb25zLnNlbGVjdGVkQ29sb3Jcblx0XHRcdHNlY29uZGFyeUNvbG9yOiBvcHRpb25zLnNlY29uZGFyeUNvbG9yXG5cdFx0XHRmb250RmFtaWx5OiBvcHRpb25zLmZvbnRGYW1pbHlcblx0XHRcdGZvbnRTaXplOiBvcHRpb25zLmZvbnRTaXplXG5cdFx0XHRmb250V2VpZ2h0OiBvcHRpb25zLmZvbnRXZWlnaHRcblx0XHRcdHNoYXBlczogW11cblx0XHRcdGJvcmRlclJhZGl1czogb3B0aW9ucy5ib3JkZXJSYWRpdXNcblx0XHRcdHBhZGRpbmc6IG9wdGlvbnMucGFkZGluZ1xuXHRcdFx0Zm9jdXNlZEVsZW1lbnQ6IHVuZGVmaW5lZFxuXHRcdFx0ZW5hYmxlZDogZmFsc2Vcblx0XHRcdHNjcmVlbkVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0RldmljZUNvbXBvbmVudFBvcnQnKVswXVxuXHRcdFx0bGF5ZXJzOiBbXVxuXHRcdFx0Y29udGFpbmVyczogW11cblx0XHRcdHRpbWVyOiB1bmRlZmluZWRcblxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgQHRvZ2dsZSlcblx0XHRGcmFtZXIuQ3VycmVudENvbnRleHQuZG9tRXZlbnRNYW5hZ2VyLndyYXAod2luZG93KS5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIEB1cGRhdGUpXG5cblx0XHRAY29udGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZyYW1lckxheWVyIERldmljZVNjcmVlbicpWzBdXG5cdFx0QGNvbnRleHQuY2xhc3NMaXN0LmFkZCgnaG92ZXJDb250ZXh0Jylcblx0XHRAY29udGV4dC5jaGlsZE5vZGVzWzJdLmNsYXNzTGlzdC5hZGQoJ0lnbm9yZVBvaW50ZXJFdmVudHMnKVxuXG5cblxuXHRcdEZyYW1lci5EZXZpY2Uub24gXCJjaGFuZ2U6ZGV2aWNlVHlwZVwiLCA9PlxuXHRcdFx0VXRpbHMuZGVsYXkgMCwgQHVwZGF0ZVxuXG5cdHRvZ2dsZTogKGV2ZW50LCBvcGVuKSA9PlxuXHRcdCMgcmV0dXJuIGlmIEZyYW1lci5EZXZpY2UuaGFuZHMuaXNBbmltYXRpbmdcblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcImBcIiBvciBldmVudC5rZXkgaXMgXCI8XCIgb3Igb3BlbiBpcyB0cnVlXG5cdFx0XHRpZiBAb3BlbmVkIHRoZW4gQGRpc2FibGUoKSBlbHNlIEBlbmFibGUoKVxuXHRcdFx0QG9wZW5lZCA9ICFAb3BlbmVkXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcIi9cIiBvciBldmVudC5rZXkgaXMgXCI+XCJcblx0XHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdFx0aWYgQGhvdmVyZWRMYXllciBpcyBAc2VsZWN0ZWRMYXllclxuXHRcdFx0XHRAdW5zZXRTZWxlY3RlZExheWVyKClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHNldFNlbGVjdGVkTGF5ZXIoKVxuXG5cdFx0XHRyZXR1cm5cblxuXHQjIG9wZW4gdGhlIHBhbmVsLCBzdGFydCBsaXN0ZW5pbmcgZm9yIGV2ZW50c1xuXHRlbmFibGU6ID0+XG5cdFx0QF9jYW52YXNDb2xvciA9IENhbnZhcy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRjdHguc2V0Q29udGV4dCgpXG5cblx0XHRAdHJhbnNpdGlvbih0cnVlKVxuXG5cdGRpc2FibGU6ID0+XG5cdFx0QHVuZm9jdXMoKVxuXHRcdEBlbmFibGVkID0gZmFsc2VcblxuXHRcdEB0cmFuc2l0aW9uKGZhbHNlKVxuXG5cdHRyYW5zaXRpb246IChvcGVuID0gdHJ1ZSwgc2Vjb25kcyA9IC41KSA9PlxuXHRcdGhhbmRzID0gRnJhbWVyLkRldmljZS5oYW5kc1xuXG5cdFx0aGFuZHMub24gXCJjaGFuZ2U6eFwiLCBAc2hvd1RyYW5zaXRpb25cblxuXHRcdGhhbmRzLm9uY2UgRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT5cblx0XHRcdGhhbmRzLm9mZiBcImNoYW5nZTp4XCIsIEBzaG93VHJhbnNpdGlvblxuXHRcdFx0QGVuYWJsZWQgPSBAb3BlbmVkID0gb3BlblxuXG5cdFx0XHRpZiBvcGVuXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9uIEV2ZW50cy5Nb3VzZU92ZXIsIEBzZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLk1vdXNlT3V0LCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLkNsaWNrLCBAc2V0U2VsZWN0ZWRMYXllclxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLk1vdXNlT3ZlciwgQHNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLk1vdXNlT3V0LCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub2ZmIEV2ZW50cy5DbGljaywgQHNldFNlbGVjdGVkTGF5ZXJcblxuXHRcdFx0QGZvY3VzKClcblxuXHRcdEBfc3RhcnRQb3NpdGlvbiA9IEZyYW1lci5EZXZpY2UuaGFuZHMueFxuXG5cdFx0bWlkWCA9IGhhbmRzLl9jb250ZXh0LmlubmVyV2lkdGggLyAyXG5cblx0XHRGcmFtZXIuRGV2aWNlLmhhbmRzLmFuaW1hdGVcblx0XHRcdG1pZFg6IGlmIG9wZW4gdGhlbiBtaWRYIC0gMTEyIGVsc2UgbWlkWFxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogc2Vjb25kc1xuXHRcdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEwKVxuXG5cdHNob3dUcmFuc2l0aW9uOiA9PlxuXHRcdGhhbmRzID0gRnJhbWVyLkRldmljZS5oYW5kc1xuXHRcdG1pZFggPSBoYW5kcy5fY29udGV4dC5pbm5lcldpZHRoIC8gMlxuXG5cdFx0b3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKFxuXHRcdFx0aGFuZHMubWlkWCxcblx0XHRcdFttaWRYIC0gNTYsIG1pZFggLSAxMTJdLCBcblx0XHRcdFswLCAxXSwgXG5cdFx0XHR0cnVlXG5cdFx0KVxuXG5cdFx0ZmFjdG9yID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHRoYW5kcy5taWRYLFxuXHRcdFx0W21pZFgsIG1pZFggLSAxMTJdLFxuXHRcdFx0WzAsIDFdLFxuXHRcdFx0dHJ1ZVxuXHRcdClcblxuXHRcdEBzcGVjUGFuZWwucGFuZWwuc3R5bGUub3BhY2l0eSA9IG9wYWNpdHlcblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gQ29sb3IubWl4IEBfY2FudmFzQ29sb3IsJ3JnYmEoMzAsIDMwLCAzMCwgMS4wMDApJywgZmFjdG9yXG5cblx0IyB1cGRhdGUgd2hlbiBzY3JlZW4gc2l6ZSBjaGFuZ2VzXG5cdHVwZGF0ZTogPT5cblx0XHRyZXR1cm4gaWYgbm90IEBvcGVuZWRcblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMubWlkWCAtPSAxMjJcblxuXHRcdGN0eC5zZXRDb250ZXh0KClcblx0XHRAZm9jdXMoKVxuXG5cdCMgRmluZCBhbiBlbGVtZW50IHRoYXQgYmVsb25ncyB0byBhIEZyYW1lciBMYXllclxuXHRmaW5kTGF5ZXJFbGVtZW50OiAoZWxlbWVudCkgLT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnQuY2xhc3NMaXN0XG5cblx0XHRpZiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZnJhbWVyTGF5ZXInKVxuXHRcdFx0cmV0dXJuIGVsZW1lbnRcblxuXHRcdEBmaW5kTGF5ZXJFbGVtZW50KGVsZW1lbnQucGFyZW50Tm9kZSlcblxuXHQjIEZpbmQgYSBGcmFtZXIgTGF5ZXIgdGhhdCBtYXRjaGVzIGEgRnJhbWVyIExheWVyIGVsZW1lbnRcblx0Z2V0TGF5ZXJGcm9tRWxlbWVudDogKGVsZW1lbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cblx0XHRlbGVtZW50ID0gQGZpbmRMYXllckVsZW1lbnQoZWxlbWVudClcblx0XHRsYXllciA9IF8uZmluZChGcmFtZXIuQ3VycmVudENvbnRleHQuX2xheWVycywgWydfZWxlbWVudCcsIGVsZW1lbnRdKVxuXG5cdFx0cmV0dXJuIGxheWVyXG5cblx0IyBGaW5kIGEgbm9uLXN0YW5kYXJkIENvbXBvbmVudCB0aGF0IGluY2x1ZGVzIGEgTGF5ZXJcblx0Z2V0Q29tcG9uZW50RnJvbUxheWVyOiAobGF5ZXIsIG5hbWVzID0gW10pID0+XG5cdFx0aWYgbm90IGxheWVyXG5cdFx0XHRyZXR1cm4gbmFtZXMuam9pbignLCAnKVxuXG5cdFx0aWYgbm90IF8uaW5jbHVkZXMoW1wiTGF5ZXJcIiwgXCJUZXh0TGF5ZXJcIiwgXCJTY3JvbGxDb21wb25lbnRcIl0sIGxheWVyLmNvbnN0cnVjdG9yLm5hbWUpXG5cdFx0XHRuYW1lcy5wdXNoKGxheWVyLmNvbnN0cnVjdG9yLm5hbWUpXG5cblx0XHRAZ2V0Q29tcG9uZW50RnJvbUxheWVyKGxheWVyLnBhcmVudCwgbmFtZXMpXG5cblx0IyBnZXQgdGhlIGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudFxuXHRnZXREaW1lbnNpb25zOiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblx0XHRkID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0ZGltZW5zaW9ucyA9IHtcblx0XHRcdHg6IGQubGVmdFxuXHRcdFx0eTogZC50b3Bcblx0XHRcdHdpZHRoOiBkLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGQuaGVpZ2h0XG5cdFx0XHRtaWRYOiBkLmxlZnQgKyAoZC53aWR0aCAvIDIpXG5cdFx0XHRtaWRZOiBkLnRvcCArIChkLmhlaWdodCAvIDIpXG5cdFx0XHRtYXhYOiBkLmxlZnQgKyBkLndpZHRoXG5cdFx0XHRtYXhZOiBkLnRvcCArIGQuaGVpZ2h0XG5cdFx0XHRmcmFtZTogZFxuXHRcdH1cblxuXHRcdHJldHVybiBkaW1lbnNpb25zXG5cblx0IyBtYWtlIGEgcmVsYXRpdmUgZGlzdGFuY2UgbGluZVxuXHRtYWtlTGluZTogKHBvaW50QSwgcG9pbnRCLCBsYWJlbCA9IHRydWUpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsaW5lID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdGQ6IFwiTSAje3BvaW50QVswXX0gI3twb2ludEFbMV19IEwgI3twb2ludEJbMF19ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGlmIHBvaW50QVswXSBpcyBwb2ludEJbMF1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdIC0gNX0gI3twb2ludEFbMV19IEwgI3twb2ludEFbMF0gKyA1fSAje3BvaW50QVsxXX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF0gLSA1fSAje3BvaW50QlsxXX0gTCAje3BvaW50QlswXSArIDV9ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRlbHNlIGlmIHBvaW50QVsxXSBpcyBwb2ludEJbMV1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXSAtIDV9IEwgI3twb2ludEFbMF19ICN7cG9pbnRBWzFdICsgNX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF19ICN7cG9pbnRCWzFdIC0gNX0gTCAje3BvaW50QlswXX0gI3twb2ludEJbMV0gKyA1fVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0IyBtYWtlIHRoZSBsYWJlbCBib3ggZm9yIGRpc3RhbmNlIGxpbmVzXG5cdG1ha2VMYWJlbDogKHgsIHksIHRleHQpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsYWJlbCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3RleHQnXG5cdFx0XHRwYXJlbnQ6IGN0eFxuXHRcdFx0eDogeFxuXHRcdFx0eTogeVxuXHRcdFx0J2ZvbnQtZmFtaWx5JzogQGZvbnRGYW1pbHlcblx0XHRcdCdmb250LXNpemUnOiBAZm9udFNpemVcblx0XHRcdCdmb250LXdlaWdodCc6IEBmb250V2VpZ2h0XG5cdFx0XHRmaWxsOiBAc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdHRleHQ6IE1hdGguZmxvb3IodGV4dCAvIEByYXRpbylcblxuXHRcdGwgPSBAZ2V0RGltZW5zaW9ucyhsYWJlbC5lbGVtZW50KVxuXG5cdFx0bGFiZWwueCA9IHggLSBsLndpZHRoIC8gMlxuXHRcdGxhYmVsLnkgPSB5ICsgbC5oZWlnaHQgLyA0IC0gMVxuXG5cdFx0Ym94ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiBsYWJlbC54IC0gQHBhZGRpbmcubGVmdFxuXHRcdFx0eTogbGFiZWwueSAtIGwuaGVpZ2h0ICsgMVxuXHRcdFx0d2lkdGg6IGwud2lkdGggKyBAcGFkZGluZy5sZWZ0ICsgQHBhZGRpbmcucmlnaHRcblx0XHRcdGhlaWdodDogbC5oZWlnaHQgKyBAcGFkZGluZy50b3AgKyBAcGFkZGluZy5ib3R0b20gKyAxXG5cdFx0XHRyeDogQGJvcmRlclJhZGl1c1xuXHRcdFx0cnk6IEBib3JkZXJSYWRpdXNcblx0XHRcdGZpbGw6IG5ldyBDb2xvcihjb2xvcikuZGFya2VuKDQwKVxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRsYWJlbC5zaG93KClcblxuXHQjIG1ha2UgdGhlIGJvdW5kaW5nIHJlY3RhbmdsZSBmb3Igc2VsZWN0ZWQgLyBob3ZlcmVkIGVsZW1lbnRzXG5cdG1ha2VSZWN0T3ZlcmxheXM6IChzLCBoKSA9PlxuXHRcdHJldHVybiBpZiBub3QgcyBvciBub3QgaFxuXG5cdFx0aWYgQGhvdmVyZWRMYXllciBpcyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdFx0aG92ZXJGaWxsID0gbmV3IENvbG9yKEBjb2xvcikuYWxwaGEoMClcblx0XHRlbHNlXG5cdFx0XHRob3ZlckZpbGwgPSBuZXcgQ29sb3IoQGNvbG9yKS5hbHBoYSguMilcblxuXHRcdGhvdmVyZWRSZWN0ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiBoLnhcblx0XHRcdHk6IGgueVxuXHRcdFx0d2lkdGg6IGgud2lkdGhcblx0XHRcdGhlaWdodDogaC5oZWlnaHRcblx0XHRcdHN0cm9rZTogQGNvbG9yXG5cdFx0XHRmaWxsOiBob3ZlckZpbGxcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0aWYgQHNlbGVjdGVkTGF5ZXIgaXMgRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRcdHNlbGVjdEZpbGwgPSBuZXcgQ29sb3IoQHNlbGVjdGVkQ29sb3IpLmFscGhhKDApXG5cdFx0ZWxzZVxuXHRcdFx0c2VsZWN0RmlsbCA9IG5ldyBDb2xvcihAc2VsZWN0ZWRDb2xvcikuYWxwaGEoLjIpXG5cblx0XHRzZWxlY3RlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBjdHhcblx0XHRcdHg6IHMueFxuXHRcdFx0eTogcy55XG5cdFx0XHR3aWR0aDogcy53aWR0aFxuXHRcdFx0aGVpZ2h0OiBzLmhlaWdodFxuXHRcdFx0c3Ryb2tlOiBAc2VsZWN0ZWRDb2xvclxuXHRcdFx0ZmlsbDogc2VsZWN0RmlsbFxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0IyBtYWtlIGRhc2hlZCBsaW5lcyBmcm9tIGJvdW5kaW5nIHJlY3QgdG8gc2NyZWVuIGVkZ2Vcblx0bWFrZURhc2hlZExpbmVzOiAoZSwgZiwgY29sb3IsIG9mZnNldCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVcblx0XHRyZXR1cm4gaWYgZSBpcyBmXG5cblx0XHRjb2xvciA9IG5ldyBDb2xvcihjb2xvcikuYWxwaGEoLjgpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBlLngsIHk6IGYueX0sXG5cdFx0XHR7eDogZS54LCB5OiBmLm1heFl9XG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZS5tYXhYLCB5OiBmLnl9LFxuXHRcdFx0e3g6IGUubWF4WCwgeTogZi5tYXhZfSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBmLngsIFx0eTogZS55fSxcblx0XHRcdHt4OiBmLm1heFgsIHk6IGUueX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZi54LCBcdHk6IGUubWF4WX0sXG5cdFx0XHR7eDogZi5tYXhYLCB5OiBlLm1heFl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRzaG93RGlzdGFuY2VzOiAoc2VsZWN0ZWQsIGhvdmVyZWQpID0+XG5cblx0XHRpZiBAaG92ZXJlZExheWVyIGlzIEBzZWxlY3RlZExheWVyXG5cdFx0XHRAaG92ZXJlZExheWVyID0gRnJhbWVyLkRldmljZS5zY3JlZW5cblxuXHRcdHMgPSBAZ2V0RGltZW5zaW9ucyhAc2VsZWN0ZWRMYXllci5fZWxlbWVudClcblx0XHRoID0gQGdldERpbWVuc2lvbnMoQGhvdmVyZWRMYXllci5fZWxlbWVudClcblx0XHRmID0gQGdldERpbWVuc2lvbnMoRnJhbWVyLkRldmljZS5zY3JlZW4uX2VsZW1lbnQpXG5cblx0XHRyZXR1cm4gaWYgbm90IHMgb3Igbm90IGhcblxuXHRcdEByYXRpbyA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuLl9lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC8gU2NyZWVuLndpZHRoXG5cblx0XHRAbWFrZURhc2hlZExpbmVzKHMsIGYsIEBzZWxlY3RlZENvbG9yLCA1KVxuXG5cdFx0QG1ha2VSZWN0T3ZlcmxheXMocywgaClcblxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgY29udGFpbnMgaG92ZXJlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPCBoLnggYW5kIHMubWF4WCA+IGgubWF4WCBhbmQgcy55IDwgaC55IGFuZCBzLm1heFkgPiBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgueSlcblx0XHRcdG0gPSBzLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WCAtIGgubWF4WClcblx0XHRcdG0gPSBoLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MubWF4WCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdFx0IyBib3R0b21cblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WSAtIGgubWF4WSlcblx0XHRcdG0gPSBoLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLnggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBob3ZlcmVkIGVsZW1lbnQgY29udGFpbnMgc2VsZWN0ZWQgZWxlbWVudFxuXG5cdFx0aWYgcy54ID4gaC54IGFuZCBzLm1heFggPCBoLm1heFggYW5kIHMueSA+IGgueSBhbmQgcy5tYXhZIDwgaC5tYXhZXG5cdFx0XHRcblx0XHRcdCMgdG9wXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpXG5cdFx0XHRtID0gaC55ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIGgueSArIDVdLCBbcy5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIHJpZ2h0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFggLSBzLm1heFgpXG5cdFx0XHRtID0gcy5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWF4WCArIDUsIHMubWlkWV0sIFtoLm1heFggLSA0LCBzLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBzLm1pZFksIGQpXG5cblx0XHRcdCMgYm90dG9tXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgcy5tYXhZICsgNV0sIFtzLm1pZFgsIGgubWF4WSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgbGVmdFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy54KVxuXHRcdFx0bSA9IGgueCArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgcy5taWRZXSwgW3MueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBzZWxlY3RlZCBlbGVtZW50IGRvZXNuJ3QgY29udGFpbiBob3ZlcmVkIGVsZW1lbnRcblx0XHRcblx0XHQjIHRvcFxuXG5cdFx0aWYgcy55ID4gaC5tYXhZXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLm1heFkpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC5tYXhZICsgNV0sIFtoLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA+IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KVxuXHRcdFx0bSA9IHMueSAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgueSArIDVdLCBbaC5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0IyBsZWZ0XG5cblx0XHRpZiBoLm1heFggPCBzLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgubWF4WClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgaC54IDwgcy54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gueCArIDUsIGgubWlkWV0sIFtzLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIHJpZ2h0XG5cblx0XHRpZiBzLm1heFggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMubWF4WClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgcy54IDwgaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpXG5cdFx0XHRtID0gcy54ICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIGJvdHRvbVxuXG5cdFx0aWYgcy5tYXhZIDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy5tYXhZICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA8IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy55KVxuXHRcdFx0bSA9IHMueSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMueSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdCMgc2V0IHRoZSBwYW5lbCB3aXRoIGN1cnJlbnQgcHJvcGVydGllc1xuXHRzZXRQYW5lbFByb3BlcnRpZXM6ICgpID0+XG5cblx0XHQjIGRlY2ljZSB3aGljaCBsYXllciB0byB1c2UgZm9yIHBhbmVsIHByb3BzXG5cdFx0aWYgQHNlbGVjdGVkTGF5ZXI/IGFuZCBAc2VsZWN0ZWRMYXllciBpc250IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0XHRsYXllciA9IEBzZWxlY3RlZExheWVyXG5cdFx0ZWxzZSBpZiBAaG92ZXJlZExheWVyP1xuXHRcdFx0bGF5ZXIgPSBAaG92ZXJlZExheWVyXG5cdFx0ZWxzZVxuXHRcdFx0QHNwZWNQYW5lbC5jbGVhclByb3BzKClcblx0XHRcdHJldHVyblxuXG5cdFx0IyBnZXQgdGhlIGxheWVyJ3MgcHJvcGVydGllc1xuXHRcdCMgcHJvcHMgPSBsYXllci5wcm9wc1xuXG5cdFx0Y3VzdG9tUHJvcHMgPVxuXHRcdFx0eDogbGF5ZXIuc2NyZWVuRnJhbWUueFxuXHRcdFx0eTogbGF5ZXIuc2NyZWVuRnJhbWUueVxuXHRcdFx0Y29tcG9uZW50TmFtZTogbGF5ZXIuY29uc3RydWN0b3IubmFtZVxuXHRcdFx0Y29tcG9uZW50TmFtZXM6IEBnZXRDb21wb25lbnRGcm9tTGF5ZXIobGF5ZXIucGFyZW50KVxuXHRcdFx0cGFyZW50TmFtZTogbGF5ZXIucGFyZW50Py5uYW1lXG5cblx0XHRpZiBsYXllci5zaGFkb3dzP1xuXHRcdFx0Xy5hc3NpZ24gY3VzdG9tUHJvcHMsXG5cdFx0XHRcdHNoYWRvd1g6IGxheWVyLnNoYWRvd3NbMF0/Lnhcblx0XHRcdFx0c2hhZG93WTogbGF5ZXIuc2hhZG93c1swXT8ueVxuXHRcdFx0XHRzaGFkb3dTcHJlYWQ6IGxheWVyLnNoYWRvd3NbMF0/LnNwcmVhZFxuXHRcdFx0XHRzaGFkb3dDb2xvcjogbGF5ZXIuc2hhZG93c1swXT8uY29sb3Jcblx0XHRcdFx0c2hhZG93VHlwZTogbGF5ZXIuc2hhZG93c1swXT8udHlwZVxuXHRcdFx0XHRzaGFkb3dCbHVyOiBsYXllci5zaGFkb3dzWzBdPy5ibHVyXG5cblx0XHRAc3BlY1BhbmVsLnNob3dQcm9wZXJ0aWVzKGxheWVyLCBjdXN0b21Qcm9wcylcblxuXHRcdCMgXy5hc3NpZ24gQHNwZWNQYW5lbCwgcHJvcHNcblxuXHRcdCMgc2hvdyBvciBoaWRlIHBhbmVscyBkZXBlbmRpbmcgb24gd2hldGhlciB2YWx1ZXMgaGF2ZSBiZWVuIHNldFxuXG5cdFx0IyBkZWZhdWx0UHJvcGVydGllcyA9IGxheWVyLl9wcm9wZXJ0eUxpc3QoKVxuXG5cdFx0IyBpc0RlZmF1bHQgPSAocHJvcGVydHkpIC0+XG5cdFx0IyBcdGRlZiA9IGRlZmF1bHRQcm9wZXJ0aWVzW3Byb3BlcnR5XT8uZGVmYXVsdFxuXHRcdCMgXHRyZXR1cm4gIWRlZj8gb3IgbGF5ZXJbcHJvcGVydHldIGlzIGRlZlxuXG5cdFx0IyBpc0V4Y2VwdGlvbiA9IChwcm9wKSAtPiBub3QgaXNEZWZhdWx0KHByb3ApXG5cblx0XHQjIGhhc0V4Y2VwdGlvbnMgPSAocHJvcGVydGllcyA9IFtdKSAtPlxuXHRcdCMgXHRyZXR1cm4gXy5zb21lKCBfLm1hcCggcHJvcGVydGllcywgaXNFeGNlcHRpb24gKSApXG5cdFx0XG5cdFx0IyBmaWx0ZXJzID0gW1xuXHRcdCMgXHQnYmx1cicsXG5cdFx0IyBcdCdncmF5c2NhbGUnLFxuXHRcdCMgXHQnaHVlUm90YXRlJyxcblx0XHQjIFx0J2ludmVydCcsXG5cdFx0IyBcdCdzZXBpYScsXG5cdFx0IyBcdCdicmlnaHRuZXNzJyxcblx0XHQjIFx0J2NvbnRyYXN0Jyxcblx0XHQjIFx0J3NhdHVyYXRlJyxcblx0XHQjIFx0XVxuXG5cdFx0IyB0cmFuc2Zvcm1zID0gW1xuXHRcdCMgXHQnc2tldycsXG5cdFx0IyBcdCdza2V3WCcsXG5cdFx0IyBcdCdza2V3WScsXG5cdFx0IyBcdCdzY2FsZScsXG5cdFx0IyBcdCdzY2FsZVgnLFxuXHRcdCMgXHQnc2NhbGVZJyxcblx0XHQjIFx0J3JvdGF0aW9uWCcsXG5cdFx0IyBcdCdyb3RhdGlvblknLFxuXHRcdCMgXHQncm90YXRpb25aJyxcblx0XHQjIFx0J29yaWdpblgnLFxuXHRcdCMgXHQnb3JpZ2luWScsXG5cdFx0IyBcdCdwZXJzcGVjdGl2ZScsXG5cdFx0IyBcdF1cblxuXHRcdCMgQHNwZWNQYW5lbC5zZXRWaXNpYmlsaXR5KFxuXHRcdCMgXHQndGV4dFByb3BlcnRpZXNEaXYnLFxuXHRcdCMgXHRsYXllci5mb250RmFtaWx5P1xuXHRcdCMgXHQpXG5cblx0XHQjIEBzcGVjUGFuZWwuc2V0VmlzaWJpbGl0eShcblx0XHQjIFx0J2dyYWRpZW50UHJvcGVydGllc0RpdicsIFxuXHRcdCMgXHRsYXllci5ncmFkaWVudD9cblx0XHQjIFx0KVxuXG5cdFx0IyBAc3BlY1BhbmVsLnNldFZpc2liaWxpdHkoXG5cdFx0IyBcdCd0cmFuc2Zvcm1zQWNjbycsIFxuXHRcdCMgXHRoYXNFeGNlcHRpb25zKHRyYW5zZm9ybXMpXG5cdFx0IyBcdClcblxuXHRcdCMgQHNwZWNQYW5lbC5zZXRWaXNpYmlsaXR5KFxuXHRcdCMgXHQnZmlsdGVyc0FjY28nLCBcblx0XHQjIFx0aGFzRXhjZXB0aW9ucyhmaWx0ZXJzKVxuXHRcdCMgXHQpXG5cblx0XHQjIEBzcGVjUGFuZWwuc2V0VmlzaWJpbGl0eShcblx0XHQjIFx0J2ltYWdlRGl2JywgXG5cdFx0IyBcdGxheWVyLmltYWdlIGlzbnQgJydcblx0XHQjIFx0KVxuXG5cdHNldEhvdmVyZWRMYXllcjogKGV2ZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblx0XHRyZXR1cm4gaWYgbm90IGV2ZW50XG5cdFx0cmV0dXJuIGlmIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ1NwZWNFbGVtZW50Jylcblx0XHRyZXR1cm4gaWYgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVtZW1lTGluaycpXG5cdFx0XG5cdFx0QGhvdmVyZWRMYXllciA9IEBnZXRMYXllckZyb21FbGVtZW50KGV2ZW50Py50YXJnZXQpXG5cdFx0QHRyeUZvY3VzKGV2ZW50KVxuXG5cdHVuc2V0SG92ZXJlZExheWVyOiA9PlxuXHRcdEBob3ZlcmVkTGF5ZXIgPSB1bmRlZmluZWRcblx0XHRpZiBub3QgQHNlbGVjdGVkTGF5ZXI/IHRoZW4gQHVuZm9jdXMoKVxuXG5cdHNldFNlbGVjdGVkTGF5ZXI6ID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAaG92ZXJlZExheWVyXG5cblx0XHRAc2VsZWN0ZWRMYXllciA9IEBob3ZlcmVkTGF5ZXJcblx0XHRAZm9jdXMoKVxuXG5cdHVuc2V0U2VsZWN0ZWRMYXllcjogPT5cblx0XHRAc2VsZWN0ZWRMYXllciA9IHVuZGVmaW5lZFxuXG5cdCMgRGVsYXkgZm9jdXMgYnkgYSBzbWFsbCBhbW91bnQgdG8gcHJldmVudCBmbGFzaGluZ1xuXHR0cnlGb2N1czogKGV2ZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdEBmb2N1c0VsZW1lbnQgPSBldmVudC50YXJnZXRcblx0XHRkbyAoZXZlbnQpID0+XG5cdFx0XHRVdGlscy5kZWxheSAuMDUsID0+XG5cdFx0XHRcdGlmIEBmb2N1c0VsZW1lbnQgaXNudCBldmVudC50YXJnZXRcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0XG5cdFx0XHRcdEBmb2N1cygpXG5cblx0IyBDaGFuZ2UgZm9jdXMgdG8gYSBuZXcgaG92ZXJlZCBvciBzZWxlY3RlZCBlbGVtZW50XG5cdGZvY3VzOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdEB1bmZvY3VzKClcblxuXHRcdEBzZWxlY3RlZExheWVyID89IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0QGhvdmVyZWRMYXllciA/PSBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXG5cdFx0QHNldFBhbmVsUHJvcGVydGllcygpXG5cdFx0QHNob3dEaXN0YW5jZXMoKVxuXG5cdHVuZm9jdXM6IChldmVudCkgPT5cblx0XHRjdHgucmVtb3ZlQWxsKClcblxuXG5cbnBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbnBhbmVsLmlkID0gJ3BDb250YWluZXInXG52aWV3QyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGcmFtZXJDb250ZXh0Um9vdC1EZWZhdWx0JylcblV0aWxzLmRlbGF5IDAsID0+IHZpZXdDLmFwcGVuZENoaWxkKHBhbmVsKVxuXG5zZWNyZXRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlY3JldEJveClcblxuXG5jdHggPSBuZXcgU1ZHQ29udGV4dFxuXG5leHBvcnRzLmdvdGNoYSA9IGdvdGNoYSA9IG5ldyBHb3RjaGFcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtv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
