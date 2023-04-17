import SunEditorCore from "suneditor/src/lib/core";
import { SunEditorOptions } from "suneditor/src/options";
import lang from "./lang";
import { UploadBeforeHandler, UploadBeforeReturn, UploadInfo } from "./upload";

interface SunEditorEventProps {
  onChange?: (content: string) => void;
  onInput?: (event: InputEvent) => void;
  onScroll?: (event: UIEvent) => void;
  onCopy?: (
    event: ClipboardEvent,
    clipboardData: ClipboardEvent["clipboardData"]
  ) => boolean;
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
  onSave?: (contents: string) => void;
  onSetToolbarButtons?: (buttonList: Array<any>) => void;
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
    state: "create" | "update" | "delete",
    imageInfo: UploadInfo<HTMLImageElement>,
    remainingFilesCount: number
  ) => void;
  onVideoUpload?: (
    targetElement: HTMLVideoElement,
    index: number,
    state: "create" | "update" | "delete",
    videoInfo: UploadInfo<HTMLVideoElement>,
    remainingFilesCount: number
  ) => void;
  onAudioUpload?: (
    targetElement: HTMLAudioElement,
    index: number,
    state: "create" | "update" | "delete",
    audioInfo: UploadInfo<HTMLAudioElement>,
    remainingFilesCount: number
  ) => void;
  onImageUploadBefore?: (
    files: Array<File>,
    info: object,
    uploadHandler: UploadBeforeHandler
  ) => UploadBeforeReturn;
  onVideoUploadBefore?: (
    files: Array<File>,
    info: object,
    uploadHandler: UploadBeforeHandler
  ) => UploadBeforeReturn;
  onAudioUploadBefore?: (
    files: Array<File>,
    info: object,
    uploadHandler: UploadBeforeHandler
  ) => UploadBeforeReturn;
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
    }
  ) => void;

  onResizeEditor?: (height: number, prevHeight: number) => any;
}

interface SunEditorDefaultStateProps {
  defaultValue?: string;
  autoFocus?: boolean;
  setAllPlugins?: boolean;
  getSunEditorInstance?: (sunEditor: SunEditorCore) => void;
}

interface SunEditorReactiveProps {
  setDefaultStyle?: string;
  placeholder?: string;
  lang?: lang;
  width?: string;
  height?: string;
  setContents?: string;
  name?: string;
  appendContents?: string;
  hideToolbar?: boolean;
  disableToolbar?: boolean;
  disable?: boolean;
  readOnly?: boolean;
  hide?: boolean;
}

export interface SunEditorReactProps
  extends SunEditorEventProps,
    SunEditorDefaultStateProps,
    SunEditorReactiveProps {
  setOptions?: SunEditorOptions;
}
