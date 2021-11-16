"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var getLanguage_1 = __importDefault(require("./misc/getLanguage"));
var plugins_1 = __importDefault(require("suneditor/src/plugins"));
var suneditor_1 = __importDefault(require("suneditor"));
var SunEditor = function (props) {
    var name = props.name, lang = props.lang, _a = props.setOptions, setOptions = _a === void 0 ? {} : _a, placeholder = props.placeholder, _b = props.width, width = _b === void 0 ? "100%" : _b, height = props.height, defaultValue = props.defaultValue, setContents = props.setContents, setDefaultStyle = props.setDefaultStyle, onResizeEditor = props.onResizeEditor, getSunEditorInstance = props.getSunEditorInstance, appendContents = props.appendContents, _c = props.setAllPlugins, setAllPlugins = _c === void 0 ? true : _c, _d = props.disable, disable = _d === void 0 ? false : _d, _e = props.readOnly, readOnly = _e === void 0 ? false : _e, _f = props.hide, hide = _f === void 0 ? false : _f, _g = props.hideToolbar, hideToolbar = _g === void 0 ? false : _g, _h = props.disableToolbar, disableToolbar = _h === void 0 ? false : _h, onChange = props.onChange, autoFocus = props.autoFocus, onBlur = props.onBlur, onLoad = props.onLoad, toggleCodeView = props.toggleCodeView, toggleFullScreen = props.toggleFullScreen, showInline = props.showInline, showController = props.showController, imageUploadHandler = props.imageUploadHandler;
    var txtArea = react_1.useRef(null);
    var editor = react_1.useRef();
    var initialEffect = react_1.useRef(true);
    react_1.useEffect(function () {
        setOptions.lang = setOptions.lang || getLanguage_1.default(lang);
        setOptions.width = setOptions.width || width;
        setOptions.placeholder = setOptions.placeholder || placeholder;
        if (!setOptions.plugins && setAllPlugins)
            setOptions.plugins = plugins_1.default;
        if (height)
            setOptions.height = height;
        if (name && defaultValue)
            txtArea.current.value = defaultValue;
        editor.current = suneditor_1.default.create(txtArea.current, __assign({ value: defaultValue }, setOptions));
        if (getSunEditorInstance)
            getSunEditorInstance(editor.current);
        editor.current.onChange = function (content) {
            if (name && txtArea.current)
                txtArea.current.value = content;
            if (onChange)
                onChange(content);
        };
        if (onBlur)
            editor.current.onBlur = function (e) {
                return editor.current && onBlur(e, editor.current.getContents(true));
            };
        if (onResizeEditor)
            editor.current.onResizeEditor = function (height, prevHeight) {
                return onResizeEditor(height, prevHeight);
            };
        var fromClipBoardEvents = ["onCopy", "onCut"];
        var singleEvents = [
            "onMouseDown",
            "onScroll",
            "onInput",
            "onClick",
            "onKeyUp",
            "onKeyDown",
            "onFocus",
        ];
        var uploadBeforeEvents = [
            "onImageUploadBefore",
            "onVideoUploadBefore",
            "onAudioUploadBefore",
        ];
        var uploadEvents = [
            "onImageUpload",
            "onImageUpload",
            "onAudioUpload",
            "onVideoUpload",
        ];
        var uploadErrorEvents = [
            "onImageUploadError",
            "onVideoUploadError",
            "onAudioUploadError",
        ];
        var toClipBoardEvents = ["onDrop", "onPaste"];
        fromClipBoardEvents.forEach(function (event) {
            var value = props[event];
            if (editor.current && event && value)
                editor.current[event] = function (e, clipboardData) {
                    return value(e, clipboardData);
                };
        });
        singleEvents.forEach(function (event) {
            var value = props[event];
            if (editor.current && event && value)
                editor.current[event] = function (e) { return value(e); };
        });
        uploadBeforeEvents.forEach(function (event) {
            var value = props[event];
            if (editor.current && event && value)
                editor.current[event] = function (files, info, _, uploadHandler) { return value(files, info, uploadHandler); };
        });
        uploadEvents.forEach(function (event) {
            var value = props[event];
            if (editor.current && event && value)
                editor.current[event] = function (targetElement, index, state, info, remainingFilesCount) {
                    return value(targetElement, index, state, info, remainingFilesCount);
                };
        });
        uploadErrorEvents.forEach(function (event) {
            var value = props[event];
            if (editor.current && event && value)
                editor.current[event] = function (errorMessage, result) {
                    return value(errorMessage, result);
                };
        });
        toClipBoardEvents.forEach(function (event) {
            var value = props[event];
            if (editor.current && event && value)
                editor.current[event] = function (e, cleanData, maxCharCount) {
                    return value(e, cleanData, maxCharCount);
                };
        });
        editor.current.onload = function (_, reload) {
            if (reload === false) {
                if (setContents) {
                    editor.current.setContents(setContents);
                    editor.current.core.focusEdge(null);
                }
                if (setDefaultStyle)
                    editor.current.setDefaultStyle(setDefaultStyle);
                if (appendContents)
                    editor.current.appendContents(appendContents);
                if (editor.current.util.isIE)
                    editor.current.core._createDefaultRange();
                if (disable === true)
                    editor.current.disabled();
                if (readOnly === true)
                    editor.current.readOnly(true);
                if (hide === true)
                    editor.current.hide();
                if (hideToolbar === true)
                    editor.current.toolbar.hide();
                if (disableToolbar === true)
                    editor.current.toolbar.disabled();
                if (autoFocus === false)
                    editor.current.core.context.element.wysiwyg.blur();
                else if (autoFocus === true)
                    editor.current.core.context.element.wysiwyg.focus();
            }
            if (onLoad)
                onLoad(reload);
        };
        if (imageUploadHandler && typeof imageUploadHandler === "function")
            editor.current.imageUploadHandler = imageUploadHandler;
        if (toggleCodeView && typeof toggleCodeView === "function")
            editor.current.toggleCodeView = function (isCodeView) {
                return toggleCodeView(isCodeView);
            };
        if (toggleFullScreen && typeof toggleFullScreen === "function")
            editor.current.toggleFullScreen = function (isFullScreen) {
                return toggleFullScreen(isFullScreen);
            };
        if (showInline && typeof showInline === "function")
            editor.current.showInline = function (toolbar, context) {
                return showInline(toolbar, context);
            };
        if (showController && typeof showController === "function")
            editor.current.showController = function (name, controllers) {
                return showController(name, controllers);
            };
        return function () {
            if (editor.current)
                editor.current.destroy();
        };
    }, []);
    react_1.useEffect(function () {
        var _a;
        if (!initialEffect.current) {
            (_a = editor.current) === null || _a === void 0 ? void 0 : _a.setOptions({
                lang: getLanguage_1.default(lang),
                placeholder: placeholder,
                height: height,
                width: width,
            });
        }
    }, [lang, placeholder, height, width]);
    react_1.useEffect(function () {
        var _a;
        if (setDefaultStyle && !initialEffect.current)
            (_a = editor.current) === null || _a === void 0 ? void 0 : _a.setDefaultStyle(setDefaultStyle);
    }, [setDefaultStyle]);
    react_1.useEffect(function () {
        var _a, _b;
        if (!initialEffect.current) {
            if (setContents !== undefined)
                !((_a = editor.current) === null || _a === void 0 ? void 0 : _a.core.hasFocus) &&
                    ((_b = editor.current) === null || _b === void 0 ? void 0 : _b.setContents(setContents));
        }
    }, [setContents]);
    react_1.useEffect(function () {
        var _a, _b;
        if (!initialEffect.current) {
            if (appendContents !== undefined)
                (_a = editor.current) === null || _a === void 0 ? void 0 : _a.appendContents(appendContents);
            (_b = editor.current) === null || _b === void 0 ? void 0 : _b.core.focusEdge(null);
        }
    }, [appendContents]);
    react_1.useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (!initialEffect.current) {
            if (hideToolbar === true)
                (_a = editor.current) === null || _a === void 0 ? void 0 : _a.toolbar.hide();
            else
                (_b = editor.current) === null || _b === void 0 ? void 0 : _b.toolbar.show();
            if (disableToolbar === true)
                (_c = editor.current) === null || _c === void 0 ? void 0 : _c.toolbar.disabled();
            else
                (_d = editor.current) === null || _d === void 0 ? void 0 : _d.toolbar.enabled();
            if (disable === true)
                (_e = editor.current) === null || _e === void 0 ? void 0 : _e.disabled();
            else
                (_f = editor.current) === null || _f === void 0 ? void 0 : _f.enabled();
            if (readOnly === true)
                (_g = editor.current) === null || _g === void 0 ? void 0 : _g.readOnly(true);
            else
                (_h = editor.current) === null || _h === void 0 ? void 0 : _h.readOnly(false);
            if (hide === true)
                (_j = editor.current) === null || _j === void 0 ? void 0 : _j.hide();
            else
                (_k = editor.current) === null || _k === void 0 ? void 0 : _k.show();
        }
    }, [disable, hideToolbar, disableToolbar, hide, readOnly]);
    react_1.useEffect(function () {
        initialEffect.current = false;
    }, []);
    return (react_1.default.createElement("textarea", __assign({ style: { visibility: "hidden" }, ref: txtArea }, { name: name })));
};
exports.default = SunEditor;
