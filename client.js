(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();

},{}],3:[function(require,module,exports){
'use strict';

var OneVersionConstraint = require('individual/one-version');

var MY_VERSION = '7';
OneVersionConstraint('ev-store', MY_VERSION);

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

module.exports = EvStore;

function EvStore(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}

},{"individual/one-version":6}],4:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":1}],5:[function(require,module,exports){
(function (global){
'use strict';

/*global window, global*/

var root = typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ?
    global : {};

module.exports = Individual;

function Individual(key, value) {
    if (key in root) {
        return root[key];
    }

    root[key] = value;

    return value;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
'use strict';

var Individual = require('./index.js');

module.exports = OneVersion;

function OneVersion(moduleName, version, defaultValue) {
    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
    var enforceKey = key + '_ENFORCE_SINGLETON';

    var versionValue = Individual(enforceKey, version);

    if (versionValue !== version) {
        throw new Error('Can only have one copy of ' +
            moduleName + '.\n' +
            'You already have version ' + versionValue +
            ' installed.\n' +
            'This means you cannot install version ' + version);
    }

    return Individual(key, defaultValue);
}

},{"./index.js":5}],7:[function(require,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],8:[function(require,module,exports){
var createElement = require("./vdom/create-element.js")

module.exports = createElement

},{"./vdom/create-element.js":13}],9:[function(require,module,exports){
var diff = require("./vtree/diff.js")

module.exports = diff

},{"./vtree/diff.js":33}],10:[function(require,module,exports){
var h = require("./virtual-hyperscript/index.js")

module.exports = h

},{"./virtual-hyperscript/index.js":20}],11:[function(require,module,exports){
var patch = require("./vdom/patch.js")

module.exports = patch

},{"./vdom/patch.js":16}],12:[function(require,module,exports){
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook.js")

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous)
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined)
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue)
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                node.setAttribute(attrName, attrValue)
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}

},{"../vnode/is-vhook.js":24,"is-object":7}],13:[function(require,module,exports){
var document = require("global/document")

var applyProperties = require("./apply-properties")

var isVNode = require("../vnode/is-vnode.js")
var isVText = require("../vnode/is-vtext.js")
var isWidget = require("../vnode/is-widget.js")
var handleThunk = require("../vnode/handle-thunk.js")

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}

},{"../vnode/handle-thunk.js":22,"../vnode/is-vnode.js":25,"../vnode/is-vtext.js":26,"../vnode/is-widget.js":27,"./apply-properties":12,"global/document":4}],14:[function(require,module,exports){
// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}

},{}],15:[function(require,module,exports){
var applyProperties = require("./apply-properties")

var isWidget = require("../vnode/is-widget.js")
var VPatch = require("../vnode/vpatch.js")

var updateWidget = require("./update-widget")

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = renderOptions.render(vText, renderOptions)

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = renderOptions.render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes
    var keyMap = {}
    var node
    var remove
    var insert

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i]
        node = childNodes[remove.from]
        if (remove.key) {
            keyMap[remove.key] = node
        }
        domNode.removeChild(node)
    }

    var length = childNodes.length
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j]
        node = keyMap[insert.key]
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}

},{"../vnode/is-widget.js":27,"../vnode/vpatch.js":30,"./apply-properties":12,"./update-widget":17}],16:[function(require,module,exports){
var document = require("global/document")
var isArray = require("x-is-array")

var render = require("./create-element")
var domIndex = require("./dom-index")
var patchOp = require("./patch-op")
module.exports = patch

function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {}
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
        ? renderOptions.patch
        : patchRecursive
    renderOptions.render = renderOptions.render || render

    return renderOptions.patch(rootNode, patches, renderOptions)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions.document && ownerDocument !== document) {
        renderOptions.document = ownerDocument
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}

},{"./create-element":13,"./dom-index":14,"./patch-op":15,"global/document":4,"x-is-array":34}],17:[function(require,module,exports){
var isWidget = require("../vnode/is-widget.js")

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}

},{"../vnode/is-widget.js":27}],18:[function(require,module,exports){
'use strict';

var EvStore = require('ev-store');

module.exports = EvHook;

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function(node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};

},{"ev-store":3}],19:[function(require,module,exports){
'use strict';

module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};

},{}],20:[function(require,module,exports){
'use strict';

var isArray = require('x-is-array');

var VNode = require('../vnode/vnode.js');
var VText = require('../vnode/vtext.js');
var isVNode = require('../vnode/is-vnode');
var isVText = require('../vnode/is-vtext');
var isWidget = require('../vnode/is-widget');
var isHook = require('../vnode/is-vhook');
var isVThunk = require('../vnode/is-thunk');

var parseTag = require('./parse-tag.js');
var softSetHook = require('./hooks/soft-set-hook.js');
var evHook = require('./hooks/ev-hook.js');

module.exports = h;

function h(tagName, properties, children) {
    var childNodes = [];
    var tag, props, key, namespace;

    if (!children && isChildren(properties)) {
        children = properties;
        props = {};
    }

    props = props || properties || {};
    tag = parseTag(tagName, props);

    // support keys
    if (props.hasOwnProperty('key')) {
        key = props.key;
        props.key = undefined;
    }

    // support namespace
    if (props.hasOwnProperty('namespace')) {
        namespace = props.namespace;
        props.namespace = undefined;
    }

    // fix cursor bug
    if (tag === 'INPUT' &&
        !namespace &&
        props.hasOwnProperty('value') &&
        props.value !== undefined &&
        !isHook(props.value)
    ) {
        props.value = softSetHook(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }


    return new VNode(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new VText(c));
    } else if (typeof c === 'number') {
        childNodes.push(new VText(String(c)));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if (isArray(c)) {
        for (var i = 0; i < c.length; i++) {
            addChild(c[i], childNodes, tag, props);
        }
    } else if (c === null || c === undefined) {
        return;
    } else {
        throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
                tagName: tag,
                properties: props
            }
        });
    }
}

function transformProperties(props) {
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            var value = props[propName];

            if (isHook(value)) {
                continue;
            }

            if (propName.substr(0, 3) === 'ev-') {
                // add ev-foo support
                props[propName] = evHook(value);
            }
        }
    }
}

function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
}

function UnexpectedVirtualElement(data) {
    var err = new Error();

    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' +
        'Expected a VNode / Vthunk / VWidget / string but:\n' +
        'got:\n' +
        errorString(data.foreignObject) +
        '.\n' +
        'The parent vnode is:\n' +
        errorString(data.parentVnode)
        '\n' +
        'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;

    return err;
}

function errorString(obj) {
    try {
        return JSON.stringify(obj, null, '    ');
    } catch (e) {
        return String(obj);
    }
}

},{"../vnode/is-thunk":23,"../vnode/is-vhook":24,"../vnode/is-vnode":25,"../vnode/is-vtext":26,"../vnode/is-widget":27,"../vnode/vnode.js":29,"../vnode/vtext.js":31,"./hooks/ev-hook.js":18,"./hooks/soft-set-hook.js":19,"./parse-tag.js":21,"x-is-array":34}],21:[function(require,module,exports){
'use strict';

var split = require('browser-split');

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes, part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}

},{"browser-split":2}],22:[function(require,module,exports){
var isVNode = require("./is-vnode")
var isVText = require("./is-vtext")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}

},{"./is-thunk":23,"./is-vnode":25,"./is-vtext":26,"./is-widget":27}],23:[function(require,module,exports){
module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}

},{}],24:[function(require,module,exports){
module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}

},{}],25:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}

},{"./version":28}],26:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}

},{"./version":28}],27:[function(require,module,exports){
module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}

},{}],28:[function(require,module,exports){
module.exports = "2"

},{}],29:[function(require,module,exports){
var version = require("./version")
var isVNode = require("./is-vnode")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")
var isVHook = require("./is-vhook")

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var hasThunks = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hasThunks = hasThunks
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"

},{"./is-thunk":23,"./is-vhook":24,"./is-vnode":25,"./is-widget":27,"./version":28}],30:[function(require,module,exports){
var version = require("./version")

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"

},{"./version":28}],31:[function(require,module,exports){
var version = require("./version")

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"

},{"./version":28}],32:[function(require,module,exports){
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook")

module.exports = diffProps

function diffProps(a, b) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (aValue === bValue) {
            continue
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {}
                diff[aKey] = bValue
            } else if (isHook(bValue)) {
                 diff = diff || {}
                 diff[aKey] = bValue
            } else {
                var objectDiff = diffProps(aValue, bValue)
                if (objectDiff) {
                    diff = diff || {}
                    diff[aKey] = objectDiff
                }
            }
        } else {
            diff = diff || {}
            diff[aKey] = bValue
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(value)
  } else if (value.__proto__) {
    return value.__proto__
  } else if (value.constructor) {
    return value.constructor.prototype
  }
}

},{"../vnode/is-vhook":24,"is-object":7}],33:[function(require,module,exports){
var isArray = require("x-is-array")

var VPatch = require("../vnode/vpatch")
var isVNode = require("../vnode/is-vnode")
var isVText = require("../vnode/is-vtext")
var isWidget = require("../vnode/is-widget")
var isThunk = require("../vnode/is-thunk")
var handleThunk = require("../vnode/handle-thunk")

var diffProps = require("./diff-props")

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index]
    var applyClear = false

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var orderedSet = reorder(aChildren, b.children)
    var bChildren = orderedSet.children

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ))
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index)
    destroyWidgets(vNode, patch, index)
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            )
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b)
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true
        }
    }

    return false
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(
                    VPatch.PROPS,
                    vNode,
                    undefinedKeys(vNode.hooks)
                )
            )
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                unhook(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

function undefinedKeys(obj) {
    var result = {}

    for (var key in obj) {
        result[key] = undefined
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren)
    var bKeys = bChildIndex.keys
    var bFree = bChildIndex.free

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren)
    var aKeys = aChildIndex.keys
    var aFree = aChildIndex.free

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(MAX(N, M)) memory
    var newChildren = []

    var freeIndex = 0
    var freeCount = bFree.length
    var deletedItems = 0

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0 ; i < aChildren.length; i++) {
        var aItem = aChildren[i]
        var itemIndex

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key]
                newChildren.push(bChildren[itemIndex])

            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++]
                newChildren.push(bChildren[itemIndex])
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ?
        bChildren.length :
        bFree[freeIndex]

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j]

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem)
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem)
        }
    }

    var simulate = newChildren.slice()
    var simulateIndex = 0
    var removes = []
    var inserts = []
    var simulateItem

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k]
        simulateItem = simulate[simulateIndex]

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null))
            simulateItem = simulate[simulateIndex]
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
                        simulateItem = simulate[simulateIndex]
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({key: wantedItem.key, to: k})
                        }
                        // items are matching, so skip ahead
                        else {
                            simulateIndex++
                        }
                    }
                    else {
                        inserts.push({key: wantedItem.key, to: k})
                    }
                }
                else {
                    inserts.push({key: wantedItem.key, to: k})
                }
                k++
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key))
            }
        }
        else {
            simulateIndex++
            k++
        }
    }

    // remove all the remaining nodes from simulate
    while(simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex]
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
        return {
            children: newChildren,
            moves: null
        }
    }

    return {
        children: newChildren,
        moves: {
            removes: removes,
            inserts: inserts
        }
    }
}

function remove(arr, index, key) {
    arr.splice(index, 1)

    return {
        from: index,
        key: key
    }
}

function keyIndex(children) {
    var keys = {}
    var free = []
    var length = children.length

    for (var i = 0; i < length; i++) {
        var child = children[i]

        if (child.key) {
            keys[child.key] = i
        } else {
            free.push(i)
        }
    }

    return {
        keys: keys,     // A hash of key name to index
        free: free      // An array of unkeyed item indices
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}

},{"../vnode/handle-thunk":22,"../vnode/is-thunk":23,"../vnode/is-vnode":25,"../vnode/is-vtext":26,"../vnode/is-widget":27,"../vnode/vpatch":30,"./diff-props":32,"x-is-array":34}],34:[function(require,module,exports){
var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}

},{}],35:[function(require,module,exports){
module.exports={
  "ticksPerSecond": 20,
  "enabledShops": ["systems", "skills"]
}

},{}],36:[function(require,module,exports){
module.exports={
  "systems": {
    "title": "Systeme",
    "buttonText": "Systeme kaufen",
    "description": "Systeme generieren Commits über Zeit.",
    "items": [
      {
        "key": "maven",
        "displayText": "Maven installieren",
        "description": "Generiert 0,2 Commits pro Sekunde",
        "initialCost": 10,
        "costFactor": 1.2,
        "income": 0.2
      },
      {
        "key": "uml",
        "displayText": "UML-Diagramm malen",
        "description": "Generiert 1 Commit pro Sekunde",
        "initialCost": 100,
        "costFactor": 1.3,
        "income": 1
      },
      {
        "key": "java-update",
        "displayText": "Java-Update installieren",
        "description": "Generiert 5 Commits pro Sekunde",
        "initialCost": 1330,
        "costFactor": 1.5,
        "income": 5
      },
      {
        "key": "jmjrst",
        "displayText": "Neue JMJRST-Version",
        "description": "Generiert 125 Commits pro Sekunde",
        "initialCost": 18080,
        "costFactor": 1.3,
        "income": 125
      },
      {
        "key": "spec",
        "displayText": "Pflichtenheft schreiben (für Pflichtenheft-Software)",
        "description": "Generiert 800 Commits pro Sekunde",
        "initialCost": 290000,
        "costFactor": 1.1,
        "income": 800
      }
    ]
  },
  "skills": {
    "title": "Fähigkeiten",
    "buttonText": "Fähigkeiten erwerben",
    "description": "Fähigkeiten generieren mehr Commits pro Klick.",
    "items": [
      {
        "key": "git-article",
        "displayText": "Git-Artikel lesen",
        "description": "Generiert 1 Commit pro Klick",
        "initialCost": 100,
        "costFactor": 1.4,
        "income": 1
      },
      {
        "key": "oop",
        "displayText": "OOP-Guru werden (Besuchermuster!!1!)",
        "description": "Generiert 5 Commits pro Klick",
        "initialCost": 1500,
        "costFactor": 1.1,
        "income": 5
      },
      {
        "key": "coverage",
        "displayText": "110% Quelltext-Abdeckung erreichen",
        "description": "Generiert 125 Commits pro Klick",
        "initialCost": 20000,
        "costFactor": 1.8,
        "income": 125
      },
      {
        "key": "suit",
        "displayText": "Anzug tragen",
        "description": "Generiert 230 Commits pro Klick",
        "initialCost": 45000,
        "costFactor": 1.4,
        "income": 230
      },
      {
        "key": "npp",
        "displayText": "Notizbuch++-Benutzer konvertieren",
        "description": "Generiert 800 Commits pro Klick",
        "initialCost": 333000,
        "costFactor": 1.4,
        "income": 800
      }
    ]
  }
}

},{}],37:[function(require,module,exports){
'use strict';

var dispatcher = require('./dispatcher.js');

module.exports = {
  interval: function () {
    dispatcher.dispatch({ type: 'interval' });
  },
  increment: function () {
    dispatcher.dispatch({ type: 'increment' });
  },
  buy: function (shopName, itemKey) {
    dispatcher.dispatch({
      type: 'buy',
      shopName: shopName,
      itemKey: itemKey
    });
  },
  setPage: function (path) {
    dispatcher.dispatch({
      type: 'setPage',
      path: path
    });
  }
};

},{"./dispatcher.js":38}],38:[function(require,module,exports){
'use strict';

module.exports = {
	listeners: [],
	register: function (listener) {
		this.listeners.push(listener);
	},
	dispatch: function (action) {
		this.listeners.forEach(function (listener) {
			listener(action);
		});
	}
};

},{}],39:[function(require,module,exports){
'use strict';

var config = require('../../resources/config.json');
var shops = require('../../resources/shops.json');

module.exports = function init () {
  var inventory = {};

  config.enabledShops.forEach(function (shopName) {
    var shopInventory = {};

    shops[shopName].items.forEach(function (item) {
      shopInventory[item.key] = 0;
    });

    inventory[shopName] = shopInventory;
  });

  return {
    page: 'clicker',
		counter: 0,
    ticks: 0,
    inventory: inventory,
    particles: []
  };
};

},{"../../resources/config.json":35,"../../resources/shops.json":36}],40:[function(require,module,exports){
'use strict';

var createElement = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');

var dispatcher = require('./dispatcher.js');
var init = require('./init.js');
var render = require('./render.js');
var update = require('./update.js');

var defaults = init();

var stored = JSON.parse(window.localStorage.getItem('store') || "{}");
var state = Object.assign(defaults, stored);

dispatcher.register(function (action) {
  if (action.type in update) {
    update[action.type](action, state);
    localStorage.setItem('store', JSON.stringify(state));

    rerender();
  } else {
    console.log('Unrecognized action', action);
  }
});

var tree = render(state);
var rootNode = createElement(tree);
document.body.appendChild(rootNode);

dispatcher.dispatch({ type: 'init' });

function rerender () {
  var newTree = render(state);
  var patches = diff(tree, newTree);
  rootNode = patch(rootNode, patches);
  tree = newTree;
}

},{"./dispatcher.js":38,"./init.js":39,"./render.js":41,"./update.js":42,"virtual-dom/create-element":8,"virtual-dom/diff":9,"virtual-dom/patch":11}],41:[function(require,module,exports){
'use strict';

var actions = require('./actions.js');
var clickerView = require('./view/clicker-view.js');
var h = require('virtual-dom/h');
var rainbowSpans = require('./view/rainbow-spans.js');
var shopView = require('./view/shop-view.js');
var textView = require('./view/text-view.js');

module.exports = function render (state) {
  var main;
  var path = state.page.split('/');

  switch (path[0]) {
    case 'clicker':
      main = clickerView(state);
      break;
    case 'how-to-play':
      main = textView('Wie man spielt', 'Klicken Sie auf das Bild, um Commits zu erhalten. Eignen Sie sich neue Fähigkeiten an, um mehr Commits pro Klick zu bekommen. Kaufen Sie Systeme für ein stetiges Einkommen. Das war\'s, haben Sie viel Spaß!');
      break;
    case 'about':
      main = textView('Über', 'Dieses Projekt habe ich in einer Vorlesung begonnen. Es soll niemanden angreifen; falls Sie Fragen oder Vorschläge haben, schreiben Sie mir doch einen E-Brief an paul (Punkt) brinkmeier (Bei) gmail (Punkt) com.');
      break;
    case 'shop':
      main = shopView(path[1], state);
      break;
  }

  return h('div.tichy-clicker', [
    h('section.topbar', [
      h('div.container', [
        h('h1.topbar-title', [
          rainbowSpans('Tichy-Klicker')
        ]),
        h('div.topbar-links', [
          h('a.topbar-link', {
            href: 'https://github.com/pbrinkmeier/tichy-clicker',
            target: '_blank'
          }, 'GitHub'),
          h('span.topbar-link', {
            onclick: function () {
              actions.setPage('how-to-play');
            }
          }, 'Wie man spielt'),
          h('span.topbar-link', {
            onclick: function () {
              actions.setPage('about');
            }
          }, 'Über')
        ])
      ])
    ]),
    main
  ]);
};

},{"./actions.js":37,"./view/clicker-view.js":49,"./view/rainbow-spans.js":50,"./view/shop-view.js":51,"./view/text-view.js":52,"virtual-dom/h":10}],42:[function(require,module,exports){
'use strict';

var actions = require('./actions.js');
var calculateItemCost = require('./util/calculate-item-cost.js');
var calculateShopIncome = require('./util/calculate-shop-income.js');
var config = require('../../resources/config.json');
var dispatcher = require('./dispatcher.js');
var Particle = require('./util/particle.js');
var shops = require('../../resources/shops.json');

var KEYCODE_SPACEBAR = 32;
var KEYCODE_ENTER = 13;
var KEYCODE_C = 67;
var KEYCODE_V = 86;
var KEYCODE_B = 66;

var interval = 1 / config.ticksPerSecond;

module.exports = {
  init: function (action, state) {
    window.state = state;

    setInterval(function () {
      actions.interval();
    }, 1000 * interval);

    window.addEventListener('keyup', function (e) {
      switch (e.keyCode) {
        case KEYCODE_SPACEBAR:
        case KEYCODE_ENTER:
          actions.increment();
          break;
        case KEYCODE_C:
          actions.setPage('clicker');
          break;
        case KEYCODE_V:
          actions.setPage('shop/systems');
          break;
        case KEYCODE_B:
          actions.setPage('shop/skills');
          break;
      }
    });
  },
  increment: function (action, state) {
    var income = calculateShopIncome(shops.skills, state.inventory.skills);
    state.counter += income + 1;

    state.particles.push(randomParticle(income + 1));
  },
  interval: function (action, state) {
    var income = calculateShopIncome(shops.systems, state.inventory.systems);
    state.counter += income * interval;
    state.ticks++;

    var secondHasPassed = state.ticks % config.ticksPerSecond === 0;
    var hasIncome = income !== 0;

    if (secondHasPassed && hasIncome) {
      state.particles.push(randomParticle(income));
    }
  },
  setPage: function (action, state) {
    state.page = action.path;
  },
  buy: function (action, state) {
    var shop = shops[action.shopName];
    var item = shop.items.find(function (item) {
      return item.key === action.itemKey;
    });
    var alreadyBought = state.inventory[action.shopName][item.key];
    var cost = calculateItemCost(item, alreadyBought);

    if (cost > state.counter) {
      return;
    }
    state.counter -= cost;
    state.inventory[action.shopName][item.key]++;
  }
};

function randomParticle (value) {
  return Particle(
    // position (in the upper half)
    20 + 260 * Math.random(), 20 + 130 * Math.random(),
    // initial velocity
    -15 + 30 * Math.random(), 15 + 30 * Math.random(),
    // acceleration
    0, 30 + 80 * Math.random(),
    'hsl(' + (360 * Math.random()) + ', 100%, 50%)',
    value
  );
}

},{"../../resources/config.json":35,"../../resources/shops.json":36,"./actions.js":37,"./dispatcher.js":38,"./util/calculate-item-cost.js":43,"./util/calculate-shop-income.js":44,"./util/particle.js":47}],43:[function(require,module,exports){
'use strict';

module.exports = function calculateItemCost (item, alreadyBought) {
  return Math.ceil(item.initialCost * Math.pow(item.costFactor, alreadyBought));
};

},{}],44:[function(require,module,exports){
'use strict';

module.exports = function calculateShopIncome (shop, bought) {
  return (
    shop.items
    .map(function (item) {
      return bought[item.key] * item.income;
    })
    .reduce(sum, 0)
  );
};

function sum (a, b) {
  return a + b;
}

},{}],45:[function(require,module,exports){
'use strict';

module.exports = function floorPlaces (x, places) {
  var f = Math.pow(10, places);
  return Math.floor(x * f) / f;
};

},{}],46:[function(require,module,exports){
'use strict';

module.exports = function isInDom (element) {
  var currentElement = element;

  while (currentElement !== null) {
    if (currentElement === document) {
      return true;
    }
    currentElement = currentElement.parentNode;
  }

  return false;
};

},{}],47:[function(require,module,exports){
'use strict';

var floorPlaces = require('./floor-places.js');

function Particle (x, y, velX, velY, accX, accY, colour, value) {
  return {
    x: x,
    y: y,
    velX: velX,
    velY: velY,
    accX: accX,
    accY: accY,
    colour: colour,
    value: value
  };
}

Particle.draw = function (ctx, particle) {
  var particleText = '+' + floorPlaces(String(particle.value), 1);
  ctx.font = '32px \'Comic Sans MS\', sans-serif';
  // Rainbow particles for when the time has come
  /*
  for (var i = 0, n = 25; i < n; i++) {
    ctx.fillStyle = 'hsla(' + String((360 / n) * (i + particle.y)) + ', 100%, 50%, ' + String(i / n) + ')';
    ctx.fillText('+' + String(particle.value), particle.x, particle.y - n + i);
  }
  */
  // The text should be centered at the position
  var measurements = ctx.measureText(particleText);
  var posX = particle.x - measurements.width / 2;
  var posY = particle.y;
  // Draw a shadow
  ctx.fillStyle = 'black';
  ctx.fillText(particleText, posX - 1, posY - 1);
  ctx.fillStyle = particle.colour;
  ctx.fillText(particleText, posX, posY);
};

Particle.update = function (f, particle) {
  particle.x += particle.velX * f;
  particle.y += particle.velY * f;
  particle.velX += particle.accX * f;
  particle.velY += particle.accY * f;
};

module.exports = Particle;

},{"./floor-places.js":45}],48:[function(require,module,exports){
'use strict';

var isInDom = require('../../util/is-in-dom.js');

function CanvasHook (drawFn) {
  this.setState(null);
  this.setDrawFn(drawFn);
}

CanvasHook.prototype.setState = function (state) {
  this.state = state;
};

CanvasHook.prototype.getState = function () {
  return this.state;
};

CanvasHook.prototype.setDrawFn = function (drawFn) {
  this.drawFn = drawFn;
};

CanvasHook.prototype.getDrawFn = function () {
  return this.drawFn;
};

CanvasHook.prototype.hook = function (canvas) {
  var drawingContext = canvas.getContext('2d');
  var state = this.getState();
  var drawFn = this.getDrawFn();
  var lastRunTime = 0;
  window.requestAnimationFrame(renderLoop);

  function renderLoop (currentTime) {
    var timeDelta = currentTime - lastRunTime;
    lastRunTime = currentTime;
    drawFn(state, drawingContext, timeDelta);
    
    // Only keep drawing if the canvas is still in the page
    if (isInDom(canvas.parentNode)) {
      window.requestAnimationFrame(renderLoop);
    }
  }
};

module.exports = CanvasHook;

},{"../../util/is-in-dom.js":46}],49:[function(require,module,exports){
'use strict';

var actions = require('../actions.js');
var calculateItemCost = require('../util/calculate-item-cost.js');
var calculateShopIncome = require('../util/calculate-shop-income.js');
var CanvasHook = require('./canvas/canvas-hook.js');
var config = require('../../../resources/config.json');
var floorPlaces = require('../util/floor-places.js');
var h = require('virtual-dom/h');
var Particle = require('../util/particle.js');
var shops = require('../../../resources/shops.json');

var drawHook = new CanvasHook(function (state, ctx, timeDelta) {
  var factor = timeDelta / 1000;
  var w = ctx.canvas.width;
  var h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
  state.particles.forEach(function (particle) {
    Particle.draw(ctx, particle);
    Particle.update(factor, particle);
  });
  state.particles = state.particles.filter(function (particle) {
    return particle.y <= 350;
  });
});

module.exports = function clickerView (state) {
  // Convention: create a variable for every value that the view depends on
  var counter = state.counter;
  var incomePerSecond = calculateShopIncome(shops.systems, state.inventory.systems);
  var incomePerClick = 1 + calculateShopIncome(shops.skills, state.inventory.skills);
  drawHook.setState(state);

  return h('section.main.clicker', [
    h('div.container', [
      h('div.clicker-clickarea', {
        onmousedown: function () {
          actions.increment();
        }
      }, [
        h('canvas', {
          width: 300,
          height: 300,
          drawHook: drawHook
        })
      ]),
      h('div.clicker-counter', String(floorPlaces(counter, 0))),
      h('div.clicker-incomes', [
        h('span.clicker-income', String(floorPlaces(incomePerSecond, 1)) + '/s'),
        h('span.clicker-income', String(floorPlaces(incomePerClick, 1)) + '/Klick')
      ]),
      h('div.clicker-controls', config.enabledShops.map(function (shopName) {
        var shop = shops[shopName];
        // Find all available items
        var availableItems = shop.items.filter(function (item) {
          var alreadyBought = state.inventory[shopName][item.key];
          var cost = calculateItemCost(item, alreadyBought);
          return cost <= state.counter;
        });

        // This is an array of all the children of the button element
        var buttonContent = [
          h('span', shop.buttonText)
        ];
        // If there are items in the shop that are buyable, show a notification bubble
        if (availableItems.length !== 0) {
          buttonContent.push(h('div.button-notification', String(availableItems.length)));
        }

        return h('button.clicker-controls-shopbutton', {
          onclick: function () {
            actions.setPage('shop/' + shopName);
          }
        }, buttonContent);
      }))
    ])
  ]);
};

},{"../../../resources/config.json":35,"../../../resources/shops.json":36,"../actions.js":37,"../util/calculate-item-cost.js":43,"../util/calculate-shop-income.js":44,"../util/floor-places.js":45,"../util/particle.js":47,"./canvas/canvas-hook.js":48,"virtual-dom/h":10}],50:[function(require,module,exports){
'use strict';

var h = require('virtual-dom/h');

module.exports = function rainbowSpans (text) {
  var length = text.length;

  return (
    text.split('')
    .map(function (character, index) {
      var hueValue = 360 * (index / length);
      return h('span', {
        style: {
          color: 'hsl(' + String(hueValue) + ',100%,50%)'
        }
      }, character);
    })
  );
};

},{"virtual-dom/h":10}],51:[function(require,module,exports){
'use strict';

var actions = require('../actions.js');
var calculateItemCost = require('../util/calculate-item-cost.js');
var floorPlaces = require('../util/floor-places.js');
var h = require('virtual-dom/h');
var shops = require('../../../resources/shops.json');

module.exports = function shopView (shopName, state) {
  var shop = shops[shopName];
  var bought = state.inventory[shopName];
  var counter = state.counter;

  return h('section.main.shop', [
    h('div.container', [
      h('div.shop-menu', [
        h('button.shop-menu-button', {
          onclick: function () {
            actions.setPage('clicker');
          }
        }, 'Zurück'),
        h('div.shop-menu-info', String(floorPlaces(counter, 0)) + ' Commits')
      ]),
      h('h2.shop-title', shop.title),
      h('div.shop-description', shop.description),
      h('ul.shop-items', shop.items.map(function (item) {
        var alreadyBought = bought[item.key];
        var cost = calculateItemCost(item, alreadyBought);

        return h('li.shop-item', [
          h('div.shop-item-name', item.displayText + ' (' + alreadyBought + ')'),
          h('div.shop-item-description', item.description),
          h('button.shop-item-buy', {
            disabled: cost > counter,
            onclick: function (e) {
              /* Do not focus the buy buttons after clicking */
              e.target.blur();
              actions.buy(shopName, item.key);
            }
          }, 'Kaufen (' + String(cost) + ' Commits)')
        ]);
      }))
    ])
  ]);
};

},{"../../../resources/shops.json":36,"../actions.js":37,"../util/calculate-item-cost.js":43,"../util/floor-places.js":45,"virtual-dom/h":10}],52:[function(require,module,exports){
'use strict';

var actions = require('../actions.js');
var h = require('virtual-dom/h');

module.exports = function textView (title, text) {
  return h('section.main.text', [
    h('div.container', [
      h('button', {
        onclick: function () {
          actions.setPage('clicker');
        }
      }, 'Zurück'),
      h('h2.text-title', title),
      h('p.text-content', text)
    ])
  ]);
};

},{"../actions.js":37,"virtual-dom/h":10}]},{},[40]);
