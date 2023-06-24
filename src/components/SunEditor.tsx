import React, { FC, useEffect, useRef } from "react";
import SunEditorCore from "suneditor/src/lib/core";
import { SunEditorOptions } from "suneditor/src/options";
import plugins from "suneditor/src/plugins";
import suneditor from "suneditor";
import { SunEditorReactProps } from "../types/SunEditorReactProps";
import getLanguage from "../lang/getLanguage";
import { events, uploadBeforeEvents } from "../data/events";

const SunEditor: FC<SunEditorReactProps> = (props) => {
  const {
    name,
    lang,
    setOptions = {},
    placeholder,
    width = "100%",
    height,
    defaultValue,
    setContents,
    setDefaultStyle,
    getSunEditorInstance,
    appendContents,
    setAllPlugins = true,
    disable = false,
    readOnly = false,
    hide = false,
    hideToolbar = false,
    disableToolbar = false,
    onChange,
    autoFocus,
    onBlur,
    onLoad,
  } = props;

  const txtArea = useRef<HTMLTextAreaElement>(null);
  const editor = useRef<SunEditorCore | null>(null);
  const initialEffect = useRef(true);

  useEffect(() => {
    const options: SunEditorOptions = {
      ...setOptions,
      lang: lang ? getLanguage(lang) : setOptions.lang,
      width: width ?? setOptions.width,
      placeholder: placeholder ?? setOptions.placeholder,
      plugins: setOptions.plugins ?? (setAllPlugins ? plugins : undefined),
      height: height ?? setOptions.height,
      value: defaultValue ?? setOptions.value,
      defaultStyle: setDefaultStyle ?? setOptions.defaultStyle,
    };

    if (name && options.value) txtArea.current!.value = options.value;

    editor.current = suneditor.create(txtArea.current!, options);

    if (getSunEditorInstance) getSunEditorInstance(editor.current);

    editor.current.onload = (_, reload): any => {
      if (reload) return onLoad?.(reload);

      if (setContents) {
        editor.current!.setContents(setContents);
        editor.current!.core.focusEdge(null);
      }
      if (appendContents) editor.current!.appendContents(appendContents);
      if (editor.current!.util.isIE)
        (editor.current!.core as any)._createDefaultRange();
      if (disable) editor.current!.disable();
      if (readOnly) editor.current!.readOnly(true);
      if (hide) editor.current!.hide();
      if (hideToolbar) editor.current!.toolbar.hide();
      if (disableToolbar) editor.current!.toolbar.disable();

      if (autoFocus === false)
        (editor.current!.core.context.element.wysiwyg as any).blur();
      else if (autoFocus)
        (editor.current!.core.context.element.wysiwyg as any).focus();

      return onLoad?.(reload);
    };

    editor.current.onChange = (content) => {
      if (name && txtArea.current) txtArea.current.value = content;
      if (onChange) onChange(content);
    };

    if (onBlur) {
      editor.current.onBlur = (e) =>
        onBlur(e, editor.current!.getContents(true));
    }

    uploadBeforeEvents.forEach((event) => {
      const value = props[event];

      if (editor.current && value)
        editor.current[event] = (
          files: Array<File>,
          info: object,
          _: any,
          uploadHandler: any
        ) => value(files, info, uploadHandler) as any;
    });

    events.forEach((event) => {
      const value = props[event];
      if (value && editor.current) {
        editor.current[event] = value as any;
      }
    });

    return () => {
      if (editor.current) editor.current.destroy();
      editor.current = null;
    };
  }, []);

  useEffect(() => {
    if (initialEffect.current) return;
    editor.current?.setOptions({
      lang: getLanguage(lang),
    });
  }, [lang]);

  useEffect(() => {
    if (initialEffect.current) return;
    editor.current?.setOptions({
      placeholder,
      height,
      width,
    });
  }, [placeholder, height, width]);

  useEffect(() => {
    if (setDefaultStyle && !initialEffect.current)
      editor.current?.setDefaultStyle(setDefaultStyle);
  }, [setDefaultStyle]);

  useEffect(() => {
    if (
      !initialEffect.current &&
      setContents !== undefined &&
      !editor.current?.core.hasFocus
    ) {
      editor.current?.setContents(setContents);
    }
  }, [setContents]);

  useEffect(() => {
    if (
      !initialEffect.current &&
      appendContents !== undefined &&
      !editor.current?.core.hasFocus
    ) {
      editor.current?.appendContents(appendContents);
      editor.current?.core.focusEdge(null);
    }
  }, [appendContents]);

  useEffect(() => {
    if (initialEffect.current) return;
    editor.current?.readOnly(readOnly);

    if (hideToolbar) editor.current?.toolbar.hide();
    else editor.current?.toolbar.show();

    if (disableToolbar) editor.current?.toolbar.disable();
    else editor.current?.toolbar.enable();

    if (disable) editor.current?.disable();
    else editor.current?.enable();

    if (hide) editor.current?.hide();
    else editor.current?.show();
  }, [disable, hideToolbar, disableToolbar, hide, readOnly]);

  useEffect(() => {
    initialEffect.current = false;
  }, []);

  return (
    <textarea style={{ visibility: "hidden" }} ref={txtArea} {...{ name }} />
  );
};

export default SunEditor;
