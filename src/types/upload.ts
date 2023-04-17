export interface UploadInfo<E> {
  index: number;
  name: string;
  size: number;
  select: (...args: any) => any;
  delete: (...args: any) => any;
  element: E;
  src: string;
}

type FileInfo = {
  url: string;
  name: string;
  size: number;
};

type UploadBeforeResponse = {
  errorMessage?: string;
  result: FileInfo[];
};

export type UploadBeforeHandler = {
  (files: File[]): void;
  (errorMessage: string): void;
  (uploadResponse: UploadBeforeResponse): void;
  (): void;
};

export type UploadBeforeReturn = boolean | FileList | undefined;
