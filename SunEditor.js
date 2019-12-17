import React, { Component } from 'react';
import suneditor from 'suneditor';
import getPlugins from './misc/getPlugins';
import getLanguage from './misc/getLanguage';
import PropTypes from 'prop-types';

/**
 * @augments {Component<{  onChange:Function,  onScroll:Function,  onClick:Function,  onKeyUp:Function,  onKeyDown:Function,  onDrop:Function,  onImageUpload:Function,  onImageUploadError:Function,  setOptions:object,  setContents:string,  appendContents:string,  enable:boolean,  disable:boolean,  hide:boolean,  show:boolean,  lang:oneOfType(object,string])>}
 */
class SunEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:
        'editor' +
        +Date.now().toString() +
        Math.random()
          .toString(36)
          .slice(-8)
    };
  }
  componentDidMount() {
    const { lang, setOptions = {}, width = '100%' } = this.props;
    const editor = suneditor.create(this.state.id, {
      plugins: getPlugins(setOptions),
      width,
      lang: getLanguage(lang)
    });
    const {
      insertHTML,
      setContents,
      appendContents,
      disable,
      enable,
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
      editor.onImageUpload = (
        targetImgElement,
        index,
        state,
        imageInfo,
        remainingFilesCount
      ) =>
        onImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount);
    if (onImageUploadError)
      editor.onImageUploadError = (errorMessage, result) =>
        onImageUploadError(errorMessage, result);
    if (setOptions) editor.setOptions(setOptions);
    if (setContents) editor.setContents(setContents);
    if (insertHTML) editor.insertHTML(insertHTML);
    if (appendContents) editor.appendContents(appendContents);
    if (enable === true) editor.enabled();
    if (disable === true) editor.disabled();
    if (hide === true) editor.hide();
    if (show === true) editor.show();
    this.editor = editor;
  }

  componentDidUpdate(prevProps) {
    // Props compared
    if (prevProps.enable !== this.props.enable) {
      if (this.props.enable === true) this.editor.enabled();
      else this.editor.disabled();
    }
    if (prevProps.disable !== this.props.disable) {
      if (this.props.disable === true) this.editor.disabled();
      else this.editor.enabled();
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
  enable: PropTypes.bool,
  disable: PropTypes.bool,
  hide: PropTypes.bool,
  show: PropTypes.bool,
  autoFocus: PropTypes.bool,
  lang: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
export default SunEditor;
