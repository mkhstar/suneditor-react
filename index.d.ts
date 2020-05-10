import * as React from 'react';
import SetOptions from './types/SetOptions';

declare module 'suneditor-react' {
  export interface SunEditorReactProps {
    onChange?: (content: string) => void;
    onScroll?: (event: UIEvent) => void;
    onClick?: (event: MouseEvent) => void;
    onMouseDown?: (event: MouseEvent) => void;
    onKeyUp?: (event: KeyboardEvent) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent, editorContents: string) => void;
    onLoad?: (reload: boolean) => void;
    onDrop?: (event: DragEvent) => void;
    onPaste?: (event: ClipboardEvent, cleanData: string, maxCharCount: boolean) => void;
    onImageUpload?: (
      targetImgElement: HTMLImageElement,
      index: number,
      state: string,
      imageInfo: object,
      remainingFilesCount: number
    ) => void;
    onVideoUpload?: (
      targetElement: HTMLElement,
      index: number,
      state: string,
      info: object,
      remainingFilesCount: number
    ) => void;
    onAudioUpload?: (
      targetElement: HTMLElement,
      index: number,
      state: string,
      info: object,
      remainingFilesCount: number
    ) => void;
    onImageUploadBefore?: (files: Array<File>, info: object) => void;
    onVideoUploadBefore?: (files: Array<File>, info: object) => void;
    onAudioUploadBefore?: (files: Array<File>, info: object) => void;
    onImageUploadError?: (errorMessage, result) => void;
    onVideoUploadError?: (errorMessage, result) => void;
    onAudioUploadError?: (errorMessage, result) => void;
    
    setOptions?: SetOptions;
    setContents?: string;
    name?: string;
    appendContents?: string;
    setDefaultStyle?: string;
    enable?: boolean;
    showToolbar?: boolean;
    enableToolbar?: boolean;
    disable?: boolean;
    hide?: boolean;
    show?: boolean;
    autoFocus?: boolean;
    placeholder?: string;
    lang?: string | object;
    width?: number | string;
  }

  export const buttonList: {
    basic: (string | string[])[]
    complex: (string | string[])[]
    formatting: (string | string[])[]
  }

  const SunEditor: React.ComponentType<SunEditorReactProps>;
  export default SunEditor;
}
