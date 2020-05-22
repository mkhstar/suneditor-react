import React, { Component, createRef } from "react";
import suneditor from "suneditor";
import getPlugins from "./misc/getPlugins";
import getLanguage from "./misc/getLanguage";
import PropTypes from "prop-types";

class SunEditor extends Component {
  constructor(props) {
    super(props);
    this.txtArea = createRef();
  }
  componentDidMount() {
    const { lang, setOptions = {}, width = "100%" } = this.props;

    setOptions.lang = setOptions.lang || getLanguage(lang);
    setOptions.plugins = setOptions.plugins || getPlugins(setOptions);
    setOptions.width = setOptions.width || width;

    this.editor = suneditor.create(this.txtArea.current);
    const {
      name,
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
    } = this.props;
    if (onChange || name)
      this.editor.onChange = (content) => {
        if (name) this.txtArea.current.value = content;
        if (onChange) onChange(content);
      };
    if (onScroll) this.editor.onMouseDown = (e) => onMouseDown(e);
    if (onInput) this.editor.onInput = (e) => onInput(e);
    if (onScroll) this.editor.onScroll = (e) => onScroll(e);
    if (onClick) this.editor.onClick = (e) => onClick(e);
    if (onKeyUp) this.editor.onKeyUp = (e) => onKeyUp(e);
    if (onKeyDown) this.editor.onKeyDown = (e) => onKeyDown(e);
    if (onBlur) this.editor.onBlur = (e) => onBlur(e, this.editor.getContents());
    if (onFocus) this.editor.onFocus = (e) => onFocus(e);
    if (onLoad) this.editor.onload = (c, reload) => onLoad(reload);
    if (onImageUploadBefore)
      this.editor.onImageUploadBefore = (files, info) =>
        onImageUploadBefore(files, info);
    if (onVideoUploadBefore)
      this.editor.onVideoUploadBefore = (files, info) =>
        onVideoUploadBefore(files, info);
    if (onAudioUploadBefore)
      this.editor.onAudioUploadBefore = (files, info) =>
        onAudioUploadBefore(files, info);
    if (onDrop) this.editor.onDrop = (e) => onDrop(e);
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
    this.editor.setOptions(setOptions);
    if (setContents) {
      this.editor.setContents(setContents);
      this.editor.core.focusEdge();
    }
    if (setDefaultStyle) this.editor.setDefaultStyle(setDefaultStyle);
    if (insertHTML) this.editor.insertHTML(insertHTML);
    if (appendContents) this.editor.appendContents(appendContents);
    if (enable === true) this.editor.enabled();
    if (disable === true) this.editor.disabled();
    if (hide === true) this.editor.hide();
    if (show === true) this.editor.show();
    if (showToolbar === true) this.editor.toolbar.show();
    else this.editor.toolbar.hide();
    if (enableToolbar === true) this.editor.toolbar.enabled();
    else this.editor.toolbar.disabled();

    setTimeout(() => {
      if (autoFocus === false) this.editor.core.context.element.wysiwyg.blur();
      else if (autoFocus === true) this.editor.core.context.element.wysiwyg.focus();
    }, 0);
  }

  componentDidUpdate(prevProps) {
    // Props compared
    if (prevProps.setContents !== this.props.setContents) {
      !this.editor.core.hasFocus &&
        this.editor.setContents(this.props.setContents);
    }
    if (prevProps.appendContents !== this.props.appendContents) {
      this.editor.appendContents(this.props.appendContents);
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
};
export default SunEditor;
