import React, { Component } from 'react';
import 'suneditor/dist/css/suneditor.min.css';
import suneditor from 'suneditor';
import plugins from 'suneditor/src/plugins';
import getLanguage from './misc/getLanguage';
import PropTypes from 'prop-types';

/**
 * @augments {Component<{  onChange:Function,  onScroll:Function,  onClick:Function,  onKeyUp:Function,  onKeyDown:Function,  onDrop:Function,  onImageUpload:Function,  onImageUploadError:Function,  setOptions:object,  setContents:string,  appendContents:string,  enabled:boolean,  disabled:boolean,  hide:boolean,  show:boolean,  lang:oneOfType(object,string])>}
 */
class SunEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:
        'editor' +
        Math.random()
          .toString(36)
          .slice(-8)
    };
  }
  componentDidMount() {
    const { lang, width = '100%' } = this.props;
    const editor = suneditor.create(this.state.id, {
      plugins,
      width,
      lang: getLanguage(lang)
    });
    const {
      setOptions,
      insertHTML,
      setContents,
      appendContents,
      disabled,
      enabled,
      hide,
      show,
      onScroll,
      onClick,
      onKeyDown,
      onKeyUp,
      onDrop,
      onChange,
      onImageUpload,
      onImageUploadError,
      onPaste
    } = this.props;
    if (onChange) editor.onChange = content => onChange(content);
    if (onScroll) editor.onScroll = e => onScroll(e);
    if (onClick) editor.onClick = e => onClick(e);
    if (onKeyUp) editor.onKeyUp = e => onKeyUp(e);
    if (onKeyDown) editor.onKeyDown = e => onKeyDown(e);
    if (onDrop) editor.onDrop = e => onDrop(e);
    if (onPaste)
      editor.onPaste = (e, cleanData, maxCharCount) =>
        onPaste(e, cleanData, maxCharCount);
    if (onImageUpload)
      editor.onDrop = (
        targetImgElement,
        index,
        state,
        imageInfo,
        remainingFilesCount
      ) =>
        onDrop(targetImgElement, index, state, imageInfo, remainingFilesCount);
    if (onImageUploadError)
      editor.onImageUploadError = (errorMessage, result) =>
        onImageUploadError(errorMessage, result);
    if (setOptions) editor.setOptions(setOptions);
    if (setContents) editor.setContents(setContents);
    if (insertHTML) editor.insertHTML(insertHTML);
    if (appendContents) editor.appendContents(appendContents);
    if (enabled === true) editor.enabled();
    if (disabled === true) editor.disabled();
    if (hide === true) editor.hide();
    if (show === true) editor.show();
    this.editor = editor;
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  render() {
    return <textarea id={this.state.id} cols='30' rows='10' />;
  }
}

SunEditor.propTypes = {
  onChange: PropTypes.func,
  onScroll: PropTypes.func,
  onClick: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  onDrop: PropTypes.func,
  onPaste: PropTypes.func,
  onImageUpload: PropTypes.func,
  onImageUploadError: PropTypes.func,
  setOptions: PropTypes.object,
  setContents: PropTypes.string,
  appendContents: PropTypes.string,
  enabled: PropTypes.bool,
  disabled: PropTypes.bool,
  hide: PropTypes.bool,
  show: PropTypes.bool,
  autoFocus: PropTypes.bool,
  lang: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
export default SunEditor;
