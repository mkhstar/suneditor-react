const getPlugins = ({ buttonList }) => {

    if (!buttonList) return undefined;

    if (!isArray(buttonList)) throw new Error('Button List must be of type array')
    else {
      /*  const pluginList = [];
        buttonList = flatten(buttonList);

        if (buttonList.indexOf('align') >= 0) pluginList.align = require('suneditor/src/plugins/submenu/align');
        if (buttonList.indexOf('font') >= 0) pluginList.font = require('suneditor/src/plugins/submenu/font');
        if (buttonList.indexOf('fontColor') >= 0) pluginList.fontColor =  require('suneditor/src/plugins/submenu/fontColor');



        console.log(pluginList)
        return pluginList;
        */
       return require('suneditor/src/plugins')
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

const isArray = obj => toString.call(obj) === "[object Array]";
export default getPlugins;
