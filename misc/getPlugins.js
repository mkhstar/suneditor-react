const getPlugins = ({ buttonList }) => {

    if (!buttonList) return undefined;

    if (!isArray(buttonList)) throw new Error('Button List must be of type array')
    else {
        const pluginList = [];
        buttonList = flatten(buttonList);

        if (buttonList.indexOf('align') >= 0) pluginList.align = require('suneditor/src/plugins/submenu/align');
        if (buttonList.indexOf('font') >= 0) pluginList.font = require('suneditor/src/plugins/submenu/font');
        if (buttonList.indexOf('fontColor') >= 0) pluginList.fontColor =  require('suneditor/src/plugins/submenu/fontColor');
        if (buttonList.indexOf('fontSize') >= 0) pluginList.fontSize =  require('suneditor/src/plugins/submenu/fontSize');
        if (buttonList.indexOf('formatBlock') >= 0) pluginList.formatBlock =  require('suneditor/src/plugins/submenu/formatBlock');
        if (buttonList.indexOf('hiliteColor') >= 0) pluginList.hiliteColor =  require('suneditor/src/plugins/submenu/hiliteColor');
        if (buttonList.indexOf('horizontalRule') >= 0) pluginList.horizontalRule =  require('suneditor/src/plugins/submenu/horizontalRule');
        if (buttonList.indexOf('lineHeight') >= 0) pluginList.lineHeight =  require('suneditor/src/plugins/submenu/lineHeight');
        if (buttonList.indexOf('list') >= 0) pluginList.list =  require('suneditor/src/plugins/submenu/list');
        if (buttonList.indexOf('paragraphStyle') >= 0) pluginList.paragraphStyle =  require('suneditor/src/plugins/submenu/paragraphStyle');
        if (buttonList.indexOf('table') >= 0) pluginList.table =  require('suneditor/src/plugins/submenu/table');
        if (buttonList.indexOf('template') >= 0) pluginList.template =  require('suneditor/src/plugins/submenu/template');
        if (buttonList.indexOf('textStyle') >= 0) pluginList.textStyle =  require('suneditor/src/plugins/submenu/textStyle');
        if (buttonList.indexOf('image') >= 0) pluginList.image =  require('suneditor/src/plugins/dialog/image');
        if (buttonList.indexOf('link') >= 0) pluginList.link =  require('suneditor/src/plugins/dialog/link');
        if (buttonList.indexOf('video') >= 0) pluginList.video =  require('suneditor/src/plugins/dialog/video');
        
        return pluginList;
    }

};

const flatten = (arr, result = []) => {
    if (!isArray(arr)) {
        return [...result, arr];
    }

    for (let a = 0; a < arr.length; a++) {
        result = flatten(arr[a], result);
    }

    return result
}

const isArray = obj => Object.prototype.toString.call(obj) === "[object Array]";
export default getPlugins;
