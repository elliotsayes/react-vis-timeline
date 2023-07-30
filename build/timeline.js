"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timeline = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _react = _interopRequireWildcard(require("react"));
var _esnext = require("vis-data/esnext");
var _esnext2 = require("vis-timeline/esnext");
require("vis-timeline/styles/vis-timeline-graph2d.min.css");
var _difference2 = _interopRequireDefault(require("lodash/difference"));
var _intersection2 = _interopRequireDefault(require("lodash/intersection"));
var _each2 = _interopRequireDefault(require("lodash/each"));
var _assign2 = _interopRequireDefault(require("lodash/assign"));
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _keys2 = _interopRequireDefault(require("lodash/keys"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var noop = function noop() {};
var events = ['currentTimeTick', 'click', 'contextmenu', 'doubleClick', 'dragover', 'drop', 'mouseOver', 'mouseDown', 'mouseUp', 'mouseMove', 'groupDragged', 'changed', 'rangechange', 'rangechanged', 'select', 'itemover', 'itemout', 'timechange', 'timechanged', 'markerchange', 'markerchanged'];
var eventDefaultProps = {};
(0, _each2["default"])(events, function (event) {
  eventDefaultProps["".concat(event, "Handler")] = noop;
});
var _ref = /*#__PURE__*/new WeakMap();
var Timeline = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Timeline, _Component);
  var _super = _createSuper(Timeline);
  function Timeline(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, Timeline);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "timeline", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "items", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "groups", void 0);
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _ref, {
      writable: true,
      value: /*#__PURE__*/_react["default"].createRef()
    });
    Object.defineProperty((0, _assertThisInitialized2["default"])(_this), 'items', {
      value: new _esnext.DataSet(),
      writable: false
    });
    Object.defineProperty((0, _assertThisInitialized2["default"])(_this), 'groups', {
      value: new _esnext.DataSet(),
      writable: false
    });
    return _this;
  }
  (0, _createClass2["default"])(Timeline, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.timeline.destroy();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // check if timeline property is defined
      console.log('timeline', this.timeline);
      if (this.timeline) {
        console.warn('react-vis-timeline: timeline property is already defined. returning');
        return;
      }
      Object.defineProperty(this, 'timeline', {
        value: new _esnext2.Timeline((0, _classPrivateFieldGet2["default"])(this, _ref).current, this.items, this.groups, this.props.options),
        writable: false
      });
      for (var _i = 0, _events = events; _i < _events.length; _i++) {
        var event = _events[_i];
        var eventHandler = this.props["".concat(event, "Handler")];
        if (eventHandler !== noop) {
          this.timeline.on(event, eventHandler);
        }
      }
      this.init();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this$props = this.props,
        initialItems = _this$props.initialItems,
        initialGroups = _this$props.initialGroups,
        options = _this$props.options,
        selection = _this$props.selection,
        customTimes = _this$props.customTimes,
        currentTime = _this$props.currentTime;
      var itemsChange = initialItems !== nextProps.initialItems;
      var groupsChange = initialGroups !== nextProps.initialGroups;
      var optionsChange = options !== nextProps.options;
      var customTimesChange = customTimes !== nextProps.customTimes;
      var selectionChange = selection !== nextProps.selection;
      var currentTimeChange = currentTime !== nextProps.currentTime;
      if (groupsChange) {
        console.warn("react-vis-timeline: you are trying to change 'initialGroups' prop. Please use the public api exposed with in ref");
      }
      if (itemsChange) {
        console.warn("react-vis-timeline: you are trying to change 'initialItems' prop. Please use the public api exposed with in ref");
      }
      if (optionsChange) {
        this.timeline.setOptions(nextProps.options);
      }
      if (customTimesChange) {
        this.updateCustomTimes(customTimes, nextProps.customTimes);
      }
      if (selectionChange) {
        this.updateSelection(nextProps.selection, nextProps.selectionOptions);
      }
      if (currentTimeChange) {
        this.timeline.setCurrentTime(nextProps.currentTime);
      }
      return false;
    }
  }, {
    key: "updateCustomTimes",
    value: function updateCustomTimes(prevCustomTimes, customTimes) {
      var _this2 = this;
      // diff the custom times to decipher new, removing, updating
      var customTimeKeysPrev = (0, _keys2["default"])(prevCustomTimes);
      var customTimeKeysNew = (0, _keys2["default"])(customTimes);
      var customTimeKeysToAdd = (0, _difference2["default"])(customTimeKeysNew, customTimeKeysPrev);
      var customTimeKeysToRemove = (0, _difference2["default"])(customTimeKeysPrev, customTimeKeysNew);
      var customTimeKeysToUpdate = (0, _intersection2["default"])(customTimeKeysPrev, customTimeKeysNew);
      (0, _each2["default"])(customTimeKeysToRemove, function (id) {
        return _this2.timeline.removeCustomTime(id);
      });
      (0, _each2["default"])(customTimeKeysToAdd, function (id) {
        var datetime = customTimes[id].datetime;
        _this2.timeline.addCustomTime(datetime, id);
      });
      (0, _each2["default"])(customTimeKeysToUpdate, function (id) {
        var datetime = customTimes[id].datetime;
        _this2.timeline.setCustomTime(datetime, id);
      });
    }
  }, {
    key: "updateSelection",
    value: function updateSelection(selection, selectionOptions) {
      this.timeline.setSelection(selection, selectionOptions);
    }
  }, {
    key: "init",
    value: function init() {
      var _this$props2 = this.props,
        initialItems = _this$props2.initialItems,
        initialGroups = _this$props2.initialGroups,
        options = _this$props2.options,
        selection = _this$props2.selection,
        _this$props2$selectio = _this$props2.selectionOptions,
        selectionOptions = _this$props2$selectio === void 0 ? {} : _this$props2$selectio,
        customTimes = _this$props2.customTimes,
        _this$props2$animate = _this$props2.animate,
        animate = _this$props2$animate === void 0 ? true : _this$props2$animate,
        currentTime = _this$props2.currentTime;
      var timelineOptions = options;
      if (animate) {
        // If animate option is set, we should animate the timeline to any new
        // start/end values instead of jumping straight to them
        timelineOptions = (0, _omit2["default"])(options, 'start', 'end');
        this.timeline.setWindow(options.start, options.end, {
          animation: animate
        });
      }
      this.timeline.setOptions(timelineOptions);
      if ((initialGroups === null || initialGroups === void 0 ? void 0 : initialGroups.length) > 0) {
        this.groups.add(initialGroups);
      }
      if ((initialItems === null || initialItems === void 0 ? void 0 : initialItems.length) > 0) {
        this.items.add(initialItems);
      }
      this.updateSelection(selection, selectionOptions);
      if (currentTime) {
        this.timeline.setCurrentTime(currentTime);
      }
      this.updateCustomTimes([], customTimes);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: (0, _classPrivateFieldGet2["default"])(this, _ref)
      });
    }
  }]);
  return Timeline;
}(_react.Component);
exports.Timeline = Timeline;
(0, _defineProperty2["default"])(Timeline, "defaultProps", (0, _assign2["default"])({
  initialItems: [],
  groups: [],
  options: {},
  selection: [],
  customTimes: []
}, eventDefaultProps));
//# sourceMappingURL=timeline.js.map