# suneditor-react

> A React Component for [SunEditor](https://suneditor.com)

[![NPM](https://img.shields.io/npm/v/suneditor-react.svg)](https://www.npmjs.com/package/suneditor-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![WYSIWYG HTML Editor](http://suneditor.com/docs/screen-main-w.png?v=2180)

## Install

#### npm

```sh
$ npm install --save suneditor-react
```

## Getting Started

```javascript
import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

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

**lang**

**_Language of editor_**

```javascript
//...
render() {
	return <SunEditor lang="en" />
	// Alternatively, provide object containing your localization for lang prop
	// Default is en
	// lang prop can be enum of strings in this array ["en", "da", "de", "fr", "ja", "ko", "ru", "zh_cn"]
}
```

**width**

**_Set Editor's width_**
```javascript
//...
// Accepts number representing px all percentage string
// eg 100 or 100%
// default 100%
render() {
	return <SunEditor width="100%" />
}
```

**setOptions**

**_Set Options (Settings) for the editor_**
[Click to see all options available](https://github.com/JiHong88/SunEditor/blob/master/README.md#options)

```javascript

import SunEditor,{buttonList} from "suneditor-react";
/*
	buttonList.basic = basic tools for wordprocessing
	buttonList.formatting = most tools used for formatting
	buttonList.complex = contains most of the buttons
*/

//...
render() {
	return <SunEditor setOptions={{
				    height: 200,
				    buttonList: buttonList.formatting // Or Array of button list
			}} />
}
```

**setContents**

**_Set Editor Contents_**

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

**enabled**

**_Enable Editor_**

```javascript
//...
render() {
	return <SunEditor enable={true} />
}
```

**disable**

**_Disable Editor_**

```javascript
//...
render() {
	return <SunEditor disable={true} />
}
```

**hide**

**_Hide Editor_**

```javascript
//...
render() {
	return <SunEditor hide={true} />
}
```

**show**

**_Show Editor_**

```javascript
//...
render() {
	return <SunEditor show={true} />
}
```

**onChange**

**_Has the content inside editor changed?_**

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

**onKeyUp**

**_Has the key been released up?_**

```javascript
handleKeyUp(event){
	console.log(event); //Get the keyup event
}
render() {
	return <SunEditor OnKeyUp={handleKeyUp} />
}
```

**onKeyDown**

**_Has the key been pressed down?_**

```javascript
handleKeyDown(event){
	console.log(event); //Get the keydown event
}
render() {
	return <SunEditor OnKeyDown={handleKeyDown} />
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
**onPaste**

**_Has something been pasted into the suneditor?**

```javascript
handlePaste(e, cleanData, maxCharCount){
	console.log(e, cleanData, maxCharCount)
}
render() {
	return <SunEditor onPaste={handlePaste} />
}
```

**onImageUploadError**

**_Has an image been uploaded into the editor?_**

```javascript
handleImageUploadError(errorMessage, result){
	console.log(errorMessage, result)
}
render() {
	return <SunEditor onImageUploadError={handleImageUploadError} />
}
```

## Editor Language Object

You can translate the object below to any other language and pass it to the lang prop to set your locale language if it is not part of the enums listed above.

```javascript
{

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

hiliteColor: 'Hilite Color',

indent: 'Indent',

outdent: 'Outdent',

align: 'Align',

alignLeft: 'Align left',

alignRight: 'Align right',

alignCenter: 'Align center',

alignJustify: 'Align justify',

list: 'list',

orderList: 'Ordered list',

unorderList: 'Unordered list',

horizontalRule: 'horizontal line',

hr_solid: 'solid',

hr_dotted: 'dotted',

hr_dashed: 'dashed',

table: 'Table',

link: 'Link',

image: 'Image',

video: 'Video',

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

template: 'Template'

},

dialogBox: {

linkBox: {

title: 'Insert Link',

url: 'URL to link',

text: 'Text to display',

newWindowCheck: 'Open in new window'

},

imageBox: {

title: 'Insert image',

file: 'Select from files',

url: 'Image URL',

altText: 'Alternative text'

},

videoBox: {

title: 'Insert Video',

url: 'Media embed URL, YouTube'

},

caption: 'Insert description',

close: 'Close',

submitButton: 'Submit',

revertButton: 'Revert',

proportion: 'constrain proportions',

width: 'Width',

height: 'Height',

basic: 'Basic',

left: 'Left',

right: 'Right',

center: 'Center'

},

controller: {

edit: 'Edit',

remove: 'Remove',

insertRowAbove: 'Insert row above',

insertRowBelow: 'Insert row below',

deleteRow: 'Delete row',

insertColumnBefore: 'Insert column before',

insertColumnAfter: 'Insert column after',

deleteColumn: 'Delete column',

resize100: 'Resize 100%',

resize75: 'Resize 75%',

resize50: 'Resize 50%',

resize25: 'Resize 25%',

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

}

};

```

### Appreciation

Special Thanks to [JiHong88](https://www.github.com/JiHong88) for the suneditor package.

### Pull Requests

Pull requests are welcome

### License

Suneditor React may be freely distributed under the MIT license.