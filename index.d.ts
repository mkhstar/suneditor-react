import * as React from 'react';

declare module 'suneditor-react' {
  export interface SunEditorReactProps {
    onChange?: (content: string) => void;
    onScroll?: (event: UIEvent) => void;
    onClick?: (event: MouseEvent) => void;
    onKeyUp?: (event: KeyboardEvent) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    onDrop?: (event: DragEvent) => void;
    onPaste?: (event: ClipboardEvent, cleanData: string, maxCharCount: boolean) => void;
    onImageUpload?: (
      targetImgElement: HTMLImageElement,
      index: number,
      state: string,
      imageInfo: object,
      remainingFilesCount: number
    ) => void;
    onImageUploadError?: (errorMessage, result) => void;
    setOptions?: object;
    setContents: string;
    appendContents?: string;
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

  const SunEditor: React.ComponentType<SunEditorReactProps>;
  export default SunEditor;
}
