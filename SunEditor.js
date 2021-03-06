import React, { Component, createRef } from "react";
import suneditor from "suneditor";
import getPlugins from "./misc/getPlugins";
import getLanguage from "./misc/getLanguage";
import PropTypes from "prop-types";

class SunEditor extends Component {
  constructor() {
    super();
    this.txtArea = createRef();
  }
  componentDidMount() {
    const {
      lang,
      setOptions = {},
      width = "100%",
      height,
      defaultValue,
      name,
    } = this.props;

    setOptions.lang = setOptions.lang || getLanguage(lang);
    setOptions.plugins = getPlugins(setOptions);
    setOptions.width = setOptions.width || width;
    if (height) setOptions.height = height;
    if (name && defaultValue) this.txtArea.current.value = defaultValue;

    this.editor = suneditor.create(this.txtArea.current, {
      value: defaultValue,
      ...setOptions
    });
    const {
      insertHTML,
      setContents,
      setDefaultStyle,
      appendContents,
      disable,
      enable,
      hide,
      show,
      showToolbar = true,
      enableToolbar = true,
      onScroll,
      onClick,
      onKeyDown,
      onKeyUp,
      onDrop,
      onChange,
      onCopy,
      onCut,
      onImageUpload,
      onImageUploadError,
      onPaste,
      autoFocus,
      onBlur,
      onFocus,
      onLoad,
      onInput,
      onImageUploadBefore,
      onVideoUploadBefore,
      onAudioUploadBefore,
      onVideoUpload,
      onMouseDown,
      onAudioUpload,
      onVideoUploadError,
      onAudioUploadError,
      placeholder,
      imageUploadHandler,
      toggleCodeView,
      toggleFullScreen,
      showInline,
      showController,
    } = this.props;
    if (onChange || name)
      this.editor.onChange = (content) => {
        if (name) this.txtArea.current.value = content;
        if (onChange) onChange(content);
      };
    if (onCopy)
      this.editor.onCopy = (e, clipboardData) => onCopy(e, clipboardData);
    if (onCut)
      this.editor.onCut = (e, clipboardData) => onCut(e, clipboardData);
    if (onMouseDown) this.editor.onMouseDown = (e) => onMouseDown(e);
    if (onScroll) this.editor.onScroll = (e) => onScroll(e);
    if (onInput) this.editor.onInput = (e) => onInput(e);
    if (onClick) this.editor.onClick = (e) => onClick(e);
    if (onKeyUp) this.editor.onKeyUp = (e) => onKeyUp(e);
    if (onKeyDown) this.editor.onKeyDown = (e) => onKeyDown(e);
    if (onBlur)
      this.editor.onBlur = (e) => onBlur(e, this.editor.getContents());
    if (onFocus) this.editor.onFocus = (e) => onFocus(e);
    if (onImageUploadBefore)
      this.editor.onImageUploadBefore = (files, info, _, uploadHandler) =>
        onImageUploadBefore(files, info, uploadHandler);
    if (onVideoUploadBefore)
      this.editor.onVideoUploadBefore = (files, info, _, uploadHandler) =>
        onVideoUploadBefore(files, info, uploadHandler);
    if (onAudioUploadBefore)
      this.editor.onAudioUploadBefore = (files, info, _, uploadHandler) =>
        onAudioUploadBefore(files, info, uploadHandler);
    if (onDrop)
      this.editor.onDrop = (e, cleanData, maxCharCount) =>
        onDrop(e, cleanData, maxCharCount);
    if (onPaste)
      this.editor.onPaste = (e, cleanData, maxCharCount) =>
        onPaste(e, cleanData, maxCharCount);
    if (onImageUpload)
      this.editor.onImageUpload = (
        targetImgElement,
        index,
        state,
        imageInfo,
        remainingFilesCount
      ) =>
        onImageUpload(
          targetImgElement,
          index,
          state,
          imageInfo,
          remainingFilesCount
        );
    if (onVideoUpload)
      this.editor.onVideoUpload = (
        targetElement,
        index,
        state,
        info,
        remainingFilesCount
      ) =>
        onVideoUpload(targetElement, index, state, info, remainingFilesCount);
    if (onAudioUpload)
      this.editor.onAudioUpload = (
        targetElement,
        index,
        state,
        info,
        remainingFilesCount
      ) =>
        onAudioUpload(targetElement, index, state, info, remainingFilesCount);
    if (onImageUploadError)
      this.editor.onImageUploadError = (errorMessage, result) =>
        onImageUploadError(errorMessage, result);
    if (onVideoUploadError)
      this.editor.onVideoUploadError = (errorMessage, result) =>
        onVideoUploadError(errorMessage, result);
    if (onAudioUploadError)
      this.editor.onAudioUploadError = (errorMessage, result) =>
        onAudioUploadError(errorMessage, result);
    if (placeholder) setOptions.placeholder = placeholder;

    this.editor.onload = (_, reload) => {
      if (reload === false) {
        if (setContents) {
          this.editor.setContents(setContents);
          this.editor.core.focusEdge();
        }
        if (setDefaultStyle) this.editor.setDefaultStyle(setDefaultStyle);
        if (insertHTML) this.editor.insertHTML(insertHTML);
        if (appendContents) this.editor.appendContents(appendContents);

        if (this.editor.util.isIE) this.editor.core._createDefaultRange();
        if (enable === true) this.editor.enabled();
        if (disable === true) this.editor.disabled();
        if (hide === true) this.editor.hide();
        if (show === true) this.editor.show();
        if (showToolbar === true) this.editor.toolbar.show();
        else this.editor.toolbar.hide();
        if (enableToolbar === true) this.editor.toolbar.enabled();
        else this.editor.toolbar.disabled();

        if (autoFocus === false)
          this.editor.core.context.element.wysiwyg.blur();
        else if (autoFocus === true)
          this.editor.core.context.element.wysiwyg.focus();
      }

      if (onLoad) onLoad(reload);
    };

    if (imageUploadHandler && typeof imageUploadHandler === "function")
      this.editor.imageUploadHandler = imageUploadHandler;
    if (toggleCodeView && typeof toggleCodeView === "function")
      this.editor.toggleCodeView = (isCodeView) => toggleCodeView(isCodeView);
    if (toggleFullScreen && typeof toggleFullScreen === "function")
      this.editor.toggleFullScreen = (isFullScreen) =>
        toggleFullScreen(isFullScreen);
    if (showInline && typeof showInline === "function")
      this.editor.showInline = (toolbar, context) =>
        showInline(toolbar, context);
    if (showController && typeof showController === "function")
      this.editor.showController = (name, controllers) =>
        showController(name, controllers);
  }

  componentDidUpdate(prevProps) {
    // Props compared

    if (prevProps.lang !== this.props.lang) {
      this.editor.setOptions({ lang: getLanguage(this.props.lang) });
    }
    if (prevProps.placeholder !== this.props.placeholder) {
      this.editor.setOptions({ placeholder: this.props.placeholder });
    }
    if (prevProps.height !== this.props.height) {
      this.editor.setOptions({ height: this.props.height });
    }
    if (prevProps.width !== this.props.width) {
      this.editor.setOptions({ width: this.props.width });
    }
    if (prevProps.setDefaultStyle !== this.props.setDefaultStyle) {
      this.editor.setDefaultStyle(this.props.setDefaultStyle);
    }
    if (prevProps.setContents !== this.props.setContents) {
      !this.editor.core.hasFocus &&
        this.editor.setContents(this.props.setContents);
    }
    if (prevProps.appendContents !== this.props.appendContents) {
      this.editor.appendContents(this.props.appendContents);
      this.editor.core.focusEdge();
    }
    if (prevProps.insertHTML !== this.props.insertHTML) {
      this.editor.insertHTML(this.props.insertHTML);
    }
    if (prevProps.enable !== this.props.enable) {
      if (this.props.enable === true) this.editor.enabled();
      else this.editor.disabled();
    }
    if (prevProps.disable !== this.props.disable) {
      if (this.props.disable === true) this.editor.disabled();
      else this.editor.enabled();
    }
    if (prevProps.showToolbar !== this.props.showToolbar) {
      if (this.props.showToolbar === true) this.editor.toolbar.show();
      else this.editor.toolbar.hide(); // showToolbar contributed by https://github.com/nelreina
    }
    if (prevProps.enableToolbar !== this.props.enableToolbar) {
      if (this.props.enableToolbar === true) this.editor.toolbar.enabled();
      else this.editor.toolbar.disabled();
    }
    if (prevProps.show !== this.props.show) {
      if (this.props.show === true) this.editor.show();
      else this.editor.hide();
    }
    if (prevProps.hide !== this.props.hide) {
      if (this.props.hide === true) this.editor.hide();
      else this.editor.show();
    }
  }

  componentWillUnmount() {
    if (this.editor) this.editor.destroy(); // Contributed by https://github.com/AramRafeq
  }

  render() {
    const dynamicName = {};
    if (this.props.name) dynamicName.name = this.props.name;
    return <textarea ref={this.txtArea} {...dynamicName} />;
  }
}

SunEditor.propTypes = {
  imageUploadHandler: PropTypes.func,
  toggleCodeView: PropTypes.func,
  toggleFullScreen: PropTypes.func,
  showInline: PropTypes.func,
  showController: PropTypes.func,
  onChange: PropTypes.func,
  onScroll: PropTypes.func,
  onClick: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  onInput: PropTypes.func,
  onDrop: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onLoad: PropTypes.func,
  onCut: PropTypes.func,
  onCopy: PropTypes.func,
  onPaste: PropTypes.func,
  onImageUploadBefore: PropTypes.func,
  onImageUpload: PropTypes.func,
  onImageUploadError: PropTypes.func,
  onVideoUploadBefore: PropTypes.func,
  onAudioUploadBefore: PropTypes.func,
  onVideoUpload: PropTypes.func,
  onMouseDown: PropTypes.func,
  onAudioUpload: PropTypes.func,
  onVideoUploadError: PropTypes.func,
  onAudioUploadError: PropTypes.func,
  setOptions: PropTypes.object,
  name: PropTypes.string,
  setContents: PropTypes.string,
  name: PropTypes.string,
  appendContents: PropTypes.string,
  setDefaultStyle: PropTypes.string,
  enable: PropTypes.bool,
  showToolbar: PropTypes.bool,
  enableToolbar: PropTypes.bool,
  disable: PropTypes.bool,
  hide: PropTypes.bool,
  show: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  lang: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
export default SunEditor;
