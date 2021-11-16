# suneditor-react

> A React Component for [SunEditor](http://suneditor.com)

[![NPM](https://img.shields.io/npm/v/suneditor-react.svg)](https://www.npmjs.com/package/suneditor-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![WYSIWYG HTML Editor](http://suneditor.com/docs/screen-main-w.png?v=2180)

## Install

#### npm

```sh
$ npm install --save suneditor suneditor-react # make sure to install suneditor yourself
```

## Getting Started

```javascript
import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const MyComponent = props => {
  return (
    <div>
      <p> My Other Contents </p>
      <SunEditor />
    </div>
  );
};
export default MyComponent;
```


###  [Next.js](https://nextjs.org/)

To use suneditor-react with Next.js, please use the dynamic import syntax like below:

```javascript
import React from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const MyComponent = props => {
  return (
    <div>
      <p> My Other Contents </p>
      <SunEditor />
    </div>
  );
};
export default MyComponent;
```

# Props

## About Core

**Note:** `suneditor-react` doesn't expose the core object in the callback functions such as `onScroll` etc. This is because it can be easily retrieved by using the `getSunEditorInstance` like below.

```jsx
// Javascript Version

import React, { useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const MyComponent = props => {
    /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
    const editor = useRef();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    return (
        <div>
            <p> My Other Contents </p>
            <SunEditor getSunEditorInstance={getSunEditorInstance} />
        </div>
    );
};
export default MyComponent;

```

```tsx
// Typescript Version

import React, { useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const MyComponent = props => {
    const editor = useRef<SunEditorCore>();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
     const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };
    return (
        <div>
            <p> My Other Contents </p>
            <SunEditor getSunEditorInstance={getSunEditorInstance} />
        </div>
    );
};
export default MyComponent;

```

## Basic Settings

**lang**

**_Language of editor_**

```javascript
//...
render() {
	return <SunEditor lang="en" />
	// Default is en
	// lang prop can be one of the strings provided in this array ["en", "da", "de", "es", "fr", "ja", "ko", "pt_br", "ru", "zh_cn", "ro", "pl", "ckb", "lv", "se", "ua", "he", "it"]
	// Alternatively, an object of your language can be passed to this prop. To learn how to do it refer to the bottom of the page
}
```


**name**

**_HTML form name of editor_**

This is used to set the HTML form name of the editor. This means on HTML form submission, it will be submitted together with contents of the editor by the name provided.


```javascript
//...
render() {
	return <SunEditor name="my-editor" />
}
```

**defaultValue**

**_Set Editor's default value_**

```javascript
//...
// Sets the default value of the editor.
// This is useful if you don't want the onChange method to be called on render.
// If you want the onChange method to be called on render please use the setContents prop
render() {
	return <SunEditor defaultValue="<p>The editor's default value</p>" />
}
```

**width**

**_Set Editor's width_**

```javascript
//...
// px and percentage values are accepted
// eg width="100%" or width="500px"
// default is 100%
render() {
	return <SunEditor width="100%" />
}
```

**height**

**_Set Editor's height_**

```javascript
//...
// px and percentage values are accepted
// eg height="100%" or height="100px"
render() {
	return <SunEditor height="100%" />
}
```


**placeholder**

**_Set Editor's placeholder_**

```javascript
//...
render() {
	return <SunEditor placeholder="Please type here..." />
}
```


**autoFocus**

**_Should editor focus when initialized_**

```javascript
//...
render() {
	return <SunEditor autoFocus={true} />
}
```

**setOptions**

**_Set Options (Settings) for the editor_**
[Click to see all options available](https://github.com/JiHong88/SunEditor/blob/master/README.md#options)

**Important Note:** Some toolbar buttons in `suneditor` require specific plugins to make them work properly. For example when you specify 'font' in the button list, you will need to import the required plugin from `suneditor`. `suneditor-react` by default loads all plugins. To change this behaviour, you can pass a plugin list of only the plugins you would like to load to the plugin option. This will override the default behaviour. To disable the loading of all plugins, set the `setAllPlugins` prop to false. Read More by clicking [this](https://github.com/JiHong88/SunEditor/#1-load-only-what-you-want)

```javascript

import SunEditor,{buttonList} from "suneditor-react";
/*
	buttonList.basic = basic buttons for wordprocessing
	buttonList.formatting = most tools used for formatting - This is the default option
	buttonList.complex = contains most of the buttons
*/
//...
render() {
	return <SunEditor setOptions={{
				    height: 200,
					buttonList: buttonList.formatting // Or Array of button list, eg. [['font', 'align'], ['image']]
                    // plugins: [font] set plugins, all plugins are set by default
					// Other option
			}} />
}
```

**setAllPlugins**

Sets all plugins used by buttons. Default value is true

```javascript
import SunEditor,{buttonList} from "suneditor-react";

//...
render() {
	return <SunEditor setAllPlugins={false} /> // When set to false, you must explicitly set required plugins
}

```

**setContents**

**_Set Editor's Content_**

**Note:** To set the initial contents of the editor without calling the ``onChange`` event please use the ``defaultValue`` prop.
``setContents`` is used to set the contents of the editor programmatically. You must be aware that, when the `setContents`'s  prop changes, the `onChange` event is triggered.


```javascript
//...
render() {
	return <SunEditor setContents="My contents" />
}
```

**appendContents**

**_Append Editor Content_**

```javascript
//...
render() {
	return <SunEditor appendContents="My contents" />
}
```


**setDefaultStyle**

**_Set the default style of the editor's edit area_**

```javascript
//...
render() {
	return <SunEditor setDefaultStyle="font-family: cursive; font-size: 10px;" />
}
```

### Editor Status

**disable**

**_Disable Editor_**

```javascript
//...
render() {
    // set to false to enable, default value is false
	return <SunEditor disable={true} />
}
```

**hide**

**_Hide Editor_**

```javascript
//...
render() {
    // set to false to hide, default value is false
	return <SunEditor hide={true} />
}
```

**hideToolbar**

**_Hide Editor Toolbar_**

```javascript
//...
render() {

    // set to false to hide toolbar, default value is false
	return <SunEditor hideToolbar={true} />
}
```
**disableToolbar**

**_Disable Editor Toolbar_**

```javascript
//...
render() {
    // set to false to enable toolbar, default value is false
	return <SunEditor disableToolbar={true} />
}
```

## Events

**Note** that you need to bind the function passed to the event in the constructor if you are using a _class Component_, or use arrow functions instead. This is just how react works. Otherwise it won't work. This documentation assumes you bind all your class component methods to the constructor. Eg below:

```javascript

constructor(props) {
	super(props);
	this.handleChange = this.handleChange.bind(this)
}
```

**onChange**

**_Has the content inside the editor been changed?_**

```javascript

handleChange(content){
	console.log(content); //Get Content Inside Editor
}
render() {
	return <SunEditor onChange={handleChange} />
}
```

**onScroll**

**_Has the editor been scrolled?_**

```javascript
handleScroll(event){
	console.log(event); //Get the scroll event
}
render() {
	return <SunEditor onScroll={handleScroll} />
}
```

**onClick**

**_Has the editor been clicked?_**

```javascript
handleClick(event){
	console.log(event); //Get the click event
}
render() {
	return <SunEditor onClick={handleClick} />
}
```


**onMouseDown**

**_Has the mouse is pressed and not yet released?_**

```javascript
handleMouseDown(event){
	console.log(event); //Get the click event
}
render() {
	return <SunEditor onMouseDown={handleMouseDown} />
}
```

**onInput**

**_Has the editor received input?_**

```javascript
handleInput(event){
	console.log(event); //Get the click event
}
render() {
	return <SunEditor onInput={handleInput} />
}
```


**onKeyUp**

**_Has the key been released up in the editor?_**

```javascript
handleKeyUp(event){
	console.log(event); //Get the keyup event
}
render() {
	return <SunEditor onKeyUp={handleKeyUp} />
}

```


**onFocus**

**_Has the editor been focused?_**

```javascript
handleFocus(event){
	console.log(event); //Get the focus event
}
render() {
	return <SunEditor onFocus={handleFocus} />
}
```



**onBlur**

**_Has the editor been blurred?_**

From the second parameter you can get the contents of the editor.

```javascript
handleBlur(event, editorContents){
	console.log(event, editorContents); //Get the blur event
}
render() {
	return <SunEditor onBlur={handleBlur} />
}
```


**onLoad**

**_Has the editor been reloaded with setOptions?_**

```javascript
handleLoad(reload){
	console.log(reload); //Boolean
}
render() {
	return <SunEditor onLoad={handleLoad} />
}
```


**onKeyDown**

**_Has the key been pressed down in the editor?_**

```javascript
handleKeyDown(event){
	console.log(event); //Get the keydown event
}
render() {
	return <SunEditor onKeyDown={handleKeyDown} />
}
```

**onDrop**

**_Has something been dropped into the editor?_**

```javascript
handleDrop(event){
	console.log(event); //Get the drop event
}
render() {
	return <SunEditor onDrop={handleDrop} />
}
```


**onImageUploadBefore**

**_Before an image is uploaded into the editor_**

```javascript
handleImageUploadBefore(files, info, uploadHandler){
    // uploadHandler is a function
	console.log(files, info)
}
render() {
	return <SunEditor onImageUploadBefore={handleImageUploadBefore} />
}
```


**onImageUpload**

**_Has an image been uploaded into the editor?_**

```javascript
handleImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount){
	console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
}
render() {
	return <SunEditor onImageUpload={handleImageUpload} />
}
```

**onImageUploadError**

**_Has an image uploaded to the editor resulted in an error?_**

```javascript
handleImageUploadError(errorMessage, result){
	console.log(errorMessage, result)
}
render() {
	return <SunEditor onImageUploadError={handleImageUploadError} />
}
```


**onVideoUploadBefore**

**_Before a video is uploaded to the editor_**

```javascript
handleVideoUploadBefore(files, info, uploadHandler){
    // uploadHandler is a function
	console.log(files, info)
}
render() {
	return <SunEditor onVideoUploadBefore={handleVideoUploadBefore} />
}
```


**onVideoUpload**

**_Has an image been uploaded into the editor?_**

```javascript
handleVideoUpload(targetElement, index, state, info, remainingFilesCount){
	console.log(targetElement, index, state, info, remainingFilesCount)
}
render() {
	return <SunEditor onVideoUpload={handleVideoUpload} />
}
```

**onVideoUploadError**

**_Has a video uploaded to the editor resulted in an error?_**

```javascript
handleVideoUploadError(errorMessage, result){
	console.log(errorMessage, result)
}
render() {
	return <SunEditor onVideoUploadError={handleVideoUploadError} />
}
```


**onAudioUploadBefore**

**_Before an audio is uploaded to the editor_**

```javascript
handleAudioUploadBefore(files, info, uploadHandler){
    // uploadHandler is a function
	console.log(files, info)
}
render() {
	return <SunEditor onAudioUploadBefore={handleAudioUploadBefore} />
}
```


**onAudioUpload**

**_Has an audio been uploaded into the editor?_**

```javascript
handleAudioUpload(targetElement, index, state, info, remainingFilesCount){
	console.log(targetElement, index, state, info, remainingFilesCount)
}
render() {
	return <SunEditor onAudioUpload={handleAudioUpload} />
}
```

**onAudioUploadError**

**_Has an audio uploaded to the editor resulted in an error?_**

```javascript
handleAudioUploadError(errorMessage, result){
	console.log(errorMessage, result)
}
render() {
	return <SunEditor onAudioUploadError={handleAudioUploadError} />
}
```


**onResizeEditor**

**_Has the editor been resized?_**

```javascript
handleOnResizeEditor(height, prevHeight){
	console.log(height, prevHeight)
}
render() {
	return <SunEditor onResizeEditor={handleOnResizeEditor} />
}
```


**onCopy**

**_Has something been copied from the suneditor?_**

```javascript
handleCopy(e, clipboardData){
	console.log(e, clipboardData)
}
render() {
	return <SunEditor onCopy={handleCopy} />
}
```


**onCut**

**_Has something been cut from the suneditor?_**

```javascript
handleCut(e, clipboardData){
	console.log(e, clipboardData)
}
render() {
	return <SunEditor onCut={handleCut} />
}
```

**onPaste**

**_Has something been pasted into the suneditor?_**

```javascript
handlePaste(e, cleanData, maxCharCount){
	console.log(e, cleanData, maxCharCount)
}
render() {
	return <SunEditor onPaste={handlePaste} />
}
```


**imageUploadHandler**

**_Replaces the default callback function of the image upload_**

```javascript
imageUploadHandler(xmlHttpRequest, info, core){
	console.log(xmlHttpRequest, info, core)
}
render() {
	return <SunEditor imageUploadHandler={imageUploadHandler} />
}
```


**toggleCodeView**

**_An event when toggling between code view and wysiwyg view_**

```javascript
toggleCodeView(isCodeView){
	console.log(isCodeView)
}
render() {
	return <SunEditor toggleCodeView={toggleCodeView} />
}
```

**toggleFullScreen**

**_An event when toggling full screen_**

```javascript
toggleFullScreen(isFullScreen){
	console.log(isFullScreen)
}
render() {
	return <SunEditor toggleFullScreen={toggleFullScreen} />
}
```

**showInline**

**_Called just before the inline toolbar is positioned and displayed on the screen._**

```javascript
showInline(toolbar, context){
	console.log(toolbar, context)
}
render() {
	return <SunEditor showInline={showInline} />
}
```

**showController**

**_Called just after the controller is positioned and displayed on the screen._**

```javascript
showController(name, controllers){
	console.log(name, controllers)
}
render() {
	return <SunEditor showController={showController} />
}
```

## Editor Language Object

You can translate the object below to any other language and pass it to the lang prop to set your locale language if it is not part of the strings of array above.
Note: You will be aided by your editors intellisense

```javascript

{
        code: 'en',
        toolbar: {
            default: 'Default',
            save: 'Save',
            font: 'Font',
            formats: 'Formats',
            fontSize: 'Size',
            bold: 'Bold',
            underline: 'Underline',
            italic: 'Italic',
            strike: 'Strike',
            subscript: 'Subscript',
            superscript: 'Superscript',
            removeFormat: 'Remove Format',
            fontColor: 'Font Color',
            hiliteColor: 'Highlight Color',
            indent: 'Indent',
            outdent: 'Outdent',
            align: 'Align',
            alignLeft: 'Align left',
            alignRight: 'Align right',
            alignCenter: 'Align center',
            alignJustify: 'Align justify',
            list: 'List',
            orderList: 'Ordered list',
            unorderList: 'Unordered list',
            horizontalRule: 'Horizontal line',
            hr_solid: 'Solid',
            hr_dotted: 'Dotted',
            hr_dashed: 'Dashed',
            table: 'Table',
            link: 'Link',
            math: 'Math',
            image: 'Image',
            video: 'Video',
            audio: 'Audio',
            fullScreen: 'Full screen',
            showBlocks: 'Show blocks',
            codeView: 'Code view',
            undo: 'Undo',
            redo: 'Redo',
            preview: 'Preview',
            print: 'print',
            tag_p: 'Paragraph',
            tag_div: 'Normal (DIV)',
            tag_h: 'Header',
            tag_blockquote: 'Quote',
            tag_pre: 'Code',
            template: 'Template',
            lineHeight: 'Line height',
            paragraphStyle: 'Paragraph style',
            textStyle: 'Text style',
            imageGallery: 'Image gallery',
            mention: 'Mention'
        },
        dialogBox: {
            linkBox: {
                title: 'Insert Link',
                url: 'URL to link',
                text: 'Text to display',
                newWindowCheck: 'Open in new window',
                downloadLinkCheck: 'Download link',
                bookmark: 'Bookmark'
            },
            mathBox: {
                title: 'Math',
                inputLabel: 'Mathematical Notation',
                fontSizeLabel: 'Font Size',
                previewLabel: 'Preview'
            },
            imageBox: {
                title: 'Insert image',
                file: 'Select from files',
                url: 'Image URL',
                altText: 'Alternative text'
            },
            videoBox: {
                title: 'Insert Video',
                file: 'Select from files',
                url: 'Media embed URL, YouTube/Vimeo'
            },
            audioBox: {
                title: 'Insert Audio',
                file: 'Select from files',
                url: 'Audio URL'
            },
            browser: {
                tags: 'Tags',
                search: 'Search',
            },
            caption: 'Insert description',
            close: 'Close',
            submitButton: 'Submit',
            revertButton: 'Revert',
            proportion: 'Constrain proportions',
            basic: 'Basic',
            left: 'Left',
            right: 'Right',
            center: 'Center',
            width: 'Width',
            height: 'Height',
            size: 'Size',
            ratio: 'Ratio'
        },
        controller: {
            edit: 'Edit',
            unlink: 'Unlink',
            remove: 'Remove',
            insertRowAbove: 'Insert row above',
            insertRowBelow: 'Insert row below',
            deleteRow: 'Delete row',
            insertColumnBefore: 'Insert column before',
            insertColumnAfter: 'Insert column after',
            deleteColumn: 'Delete column',
            fixedColumnWidth: 'Fixed column width',
            resize100: 'Resize 100%',
            resize75: 'Resize 75%',
            resize50: 'Resize 50%',
            resize25: 'Resize 25%',
            autoSize: 'Auto size',
            mirrorHorizontal: 'Mirror, Horizontal',
            mirrorVertical: 'Mirror, Vertical',
            rotateLeft: 'Rotate left',
            rotateRight: 'Rotate right',
            maxSize: 'Max size',
            minSize: 'Min size',
            tableHeader: 'Table header',
            mergeCells: 'Merge cells',
            splitCells: 'Split Cells',
            HorizontalSplit: 'Horizontal split',
            VerticalSplit: 'Vertical split'
        },
        menu: {
            spaced: 'Spaced',
            bordered: 'Bordered',
            neon: 'Neon',
            translucent: 'Translucent',
            shadow: 'Shadow',
            code: 'Code'
        }
    }

```

### Appreciation

Special Thanks to [JiHong88](https://www.github.com/JiHong88) for the suneditor package.

### Pull Requests

Pull requests are welcome

### License

Suneditor React may be freely distributed under the MIT license.
