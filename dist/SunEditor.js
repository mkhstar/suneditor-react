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
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import getLanguage from "./misc/getLanguage";
import { getPlugins } from "./misc/getPlugins";
import suneditor from "suneditor";
var SunEditor = function (props) {
    var name = props.name, lang = props.lang, _a = props.setOptions, setOptions = _a === void 0 ? {} : _a, placeholder = props.placeholder, _b = props.width, width = _b === void 0 ? "100%" : _b, height = props.height, defaultValue = props.defaultValue, setContents = props.setContents, setDefaultStyle = props.setDefaultStyle, onResizeEditor = props.onResizeEditor, getSunEditorInstance = props.getSunEditorInstance, appendContents = props.appendContents, _c = props.disable, disable = _c === void 0 ? false : _c, _d = props.hide, hide = _d === void 0 ? false : _d, _e = props.hideToolbar, hideToolbar = _e === void 0 ? false : _e, _f = props.disableToolbar, disableToolbar = _f === void 0 ? false : _f, onChange = props.onChange, autoFocus = props.autoFocus, onBlur = props.onBlur, onLoad = props.onLoad, toggleCodeView = props.toggleCodeView, toggleFullScreen = props.toggleFullScreen, showInline = props.showInline, showController = props.showController, imageUploadHandler = props.imageUploadHandler;
    var txtArea = useRef(null);
    var editor = useRef();
    useEffect(function () {
        setOptions.lang = setOptions.lang || getLanguage(lang);
        setOptions.plugins = getPlugins(setOptions);
        setOptions.width = setOptions.width || width;
        if (height)
            setOptions.height = height;
        if (name && defaultValue)
            txtArea.current.value = defaultValue;
        editor.current = suneditor.create(txtArea.current, __assign({ value: defaultValue }, setOptions));
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
    useEffect(function () {
        var _a;
        (_a = editor.current) === null || _a === void 0 ? void 0 : _a.setOptions({
            lang: getLanguage(lang),
            placeholder: placeholder,
            height: height,
            width: width,
        });
    }, [lang, placeholder, height, width]);
    useEffect(function () {
        var _a;
        if (setDefaultStyle)
            (_a = editor.current) === null || _a === void 0 ? void 0 : _a.setDefaultStyle(setDefaultStyle);
    }, [setDefaultStyle]);
    useEffect(function () {
        var _a;
        if (setContents !== undefined)
            (_a = editor.current) === null || _a === void 0 ? void 0 : _a.setContents(setContents);
    }, [setContents]);
    useEffect(function () {
        var _a;
        if (appendContents !== undefined)
            (_a = editor.current) === null || _a === void 0 ? void 0 : _a.appendContents(appendContents);
    }, [appendContents]);
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (disable === true)
            (_a = editor.current) === null || _a === void 0 ? void 0 : _a.disabled();
        else
            (_b = editor.current) === null || _b === void 0 ? void 0 : _b.enabled();
        if (hideToolbar === true)
            (_c = editor.current) === null || _c === void 0 ? void 0 : _c.toolbar.hide();
        else
            (_d = editor.current) === null || _d === void 0 ? void 0 : _d.toolbar.show();
        if (disableToolbar === true)
            (_e = editor.current) === null || _e === void 0 ? void 0 : _e.toolbar.disabled();
        else
            (_f = editor.current) === null || _f === void 0 ? void 0 : _f.toolbar.enabled();
        if (hide === true)
            (_g = editor.current) === null || _g === void 0 ? void 0 : _g.hide();
        else
            (_h = editor.current) === null || _h === void 0 ? void 0 : _h.show();
    }, [disable, hideToolbar, disableToolbar, hide]);
    return (_jsx("textarea", __assign({ style: { visibility: "hidden" }, ref: txtArea }, { name: name }), void 0));
};
export default SunEditor;
