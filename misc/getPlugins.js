const getPlugins = ({ buttonList, plugins, customPlugins }) => {
  if (!buttonList) return undefined;

  if (!isArray(buttonList))
    throw new Error("Button List must be of type array");
  else {
    const pluginList = [];
    buttonList = flatten(buttonList);

    if (buttonList.indexOf("align") >= 0)
      pluginList.push(require("suneditor/src/plugins/submenu/align").default);

    if (buttonList.indexOf("math") >= 0)
      pluginList.push(require("suneditor/src/plugins/dialog/math").default);

    if (buttonList.indexOf("imageGallery") >= 0)
      pluginList.push(require("suneditor/src/plugins/fileBrowser/imageGallery").default);

    if (buttonList.indexOf("blockquote") >= 0)
      pluginList.push(require("suneditor/src/plugins/command/blockquote").default);
    if (buttonList.indexOf("font") >= 0)
      pluginList.push(require("suneditor/src/plugins/submenu/font").default);
    if (buttonList.indexOf("fontColor") >= 0)
      pluginList.push(require("suneditor/src/plugins/submenu/fontColor").default);
    if (buttonList.indexOf("fontSize") >= 0)
      pluginList.push(require("suneditor/src/plugins/submenu/fontSize").default);
    if (buttonList.indexOf("formatBlock") >= 0)
      pluginList.push(require("suneditor/src/plugins/submenu/formatBlock").default);
    if (buttonList.indexOf("hiliteColor") >= 0)
      pluginList.push(require("suneditor/src/plugins/submenu/hiliteColor").default);
    if (buttonList.indexOf("horizontalRule") >= 0)
      pluginList.push(require("suneditor/src/plugins/submenu/horizontalRule").default);
    if (buttonList.indexOf("lineHeight") >= 0)
      pluginList.push(require("suneditor/src/plugins/submenu/lineHeight").default);
    if (buttonList.indexOf("list") >= 0)
      pluginList.push(require("suneditor/src/plugins/submenu/list").default);
    if (buttonList.indexOf("paragraphStyle") >= 0)
      pluginList.push(require("suneditor/src/plugins/submenu/paragraphStyle").default);
    if (buttonList.indexOf("table") >= 0)
      pluginList.push(require("suneditor/src/plugins/submenu/table").default);
    if (buttonList.indexOf("template") >= 0)
      pluginList.push(require("suneditor/src/plugins/submenu/template").default);
    if (buttonList.indexOf("textStyle") >= 0)
      pluginList.push(require("suneditor/src/plugins/submenu/textStyle").default);
    if (buttonList.indexOf("image") >= 0)
      pluginList.push(require("suneditor/src/plugins/dialog/image").default);
    if (buttonList.indexOf("link") >= 0)
      pluginList.push(require("suneditor/src/plugins/dialog/link").default);
    if (buttonList.indexOf("video") >= 0)
      pluginList.push(require("suneditor/src/plugins/dialog/video").default);
    if (buttonList.indexOf("audio") >= 0)
      pluginList.push(require("suneditor/src/plugins/dialog/audio").default);

      return [...pluginList, ...(plugins || customPlugins || [])];
  }
};

const flatten = (arr, result = []) => {
  if (!isArray(arr)) {
    return [...result, arr];
  }

  for (let a = 0; a < arr.length; a++) {
    result = flatten(arr[a], result);
  }

  return result;
};

const isArray = obj => Object.prototype.toString.call(obj) === "[object Array]";
export default getPlugins;
