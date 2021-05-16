import { SunEditorOptions } from "suneditor/src/options";
import Lang from "./lang";

  export default interface SetOptions extends Omit<SunEditorOptions, 'lang'>{
    customPlugins?: Array<Plugin> | Record<string, Plugin>;
    lang: Lang
  }