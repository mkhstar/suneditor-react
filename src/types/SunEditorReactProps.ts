import lang from "./lang";
import SetOptions from "./SetOptions";
import SunEditorCore from "suneditor/src/lib/core";

export interface SunEditorReactProps {
  onChange?: (content: string) => void;
  onInput?: (event: InputEvent) => void;
  onScroll?: (event: UIEvent) => void;
  onCopy?: (
    event: ClipboardEvent,
    clipboardData: ClipboardEvent["clipboardData"]
  ) => void;
  onCut?: (
    event: ClipboardEvent,
    clipboardData: ClipboardEvent["clipboardData"]
  ) => boolean;
  onClick?: (event: MouseEvent) => void;
  onMouseDown?: (event: MouseEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent, editorContents: string) => void;
  onLoad?: (reload: boolean) => void;
  onDrop?: (
    event: DragEvent,
    cleanData: string,
    maxCharCount: boolean
  ) => boolean | Array<any> | void;
  onPaste?: (
    event: ClipboardEvent,
    cleanData: string,
    maxCharCount: boolean
  ) => void;
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
  onImageUploadBefore?: (
    files: Array<File>,
    info: object,
    uploadHandler: Function
  ) => void;
  onVideoUploadBefore?: (
    files: Array<File>,
    info: object,
    uploadHandler: Function
  ) => void;
  onAudioUploadBefore?: (
    files: Array<File>,
    info: object,
    uploadHandler: Function
  ) => void;
  onImageUploadError?: (errorMessage: string, result: any) => void;
  onVideoUploadError?: (errorMessage: string, result: any) => void;
  onAudioUploadError?: (errorMessage: string, result: any) => void;
  toggleCodeView?: (isCodeView: boolean) => void;
  toggleFullScreen?: (isFullScreen: boolean) => void;
  showInline?: (toolbar: Element, context: any) => void;
  showController?: (name: string, controllers: Array<any>) => void;
  imageUploadHandler?: (
    xmlHttpRequest: XMLHttpRequest,
    info: {
      isUpdate: boolean;
      linkValue: any;
      element: Element;
      align: any;
      linkNewWindow: any;
      [key: string]: any;
    },
    core: any
  ) => void;

  setOptions?: SetOptions;
  defaultValue?: string;
  setContents?: string;
  name?: string;
  onResizeEditor?: (height: number, prevHeight: number) => void;
  appendContents?: string;
  setDefaultStyle?: string;
  hideToolbar?: boolean;
  disableToolbar?: boolean;
  disable?: boolean;
  hide?: boolean;
  autoFocus?: boolean;
  getSunEditorInstance?: (sunEditor: SunEditorCore) => void;
  placeholder?: string;
  lang?: lang;
  width?: string;
  height?: string;
}
