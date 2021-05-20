import { SunEditorOptions } from "suneditor/src/options";
export default interface SetOptions extends SunEditorOptions {
    customPlugins?: Array<Plugin> | Record<string, Plugin>;
}
