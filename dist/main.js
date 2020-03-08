module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(32)();
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'notice',
    add: function (core) {
        const context = core.context;
        context.notice = {};

        /** dialog */
        let notice_div = core.util.createElement('DIV');
        let notice_span = core.util.createElement('SPAN');
        let notice_button = core.util.createElement('BUTTON');

        notice_div.className = 'se-notice';
        notice_button.className = 'close';
        notice_button.setAttribute('aria-label', 'Close');
        notice_button.setAttribute('title', core.lang.dialogBox.close);
        notice_button.innerHTML = '<i aria-hidden="true" data-command="close" class="se-icon-cancel"></i>';
        
        notice_div.appendChild(notice_span);
        notice_div.appendChild(notice_button);

        context.notice.modal = notice_div;
        context.notice.message = notice_span;

        /** add event listeners */
        notice_button.addEventListener('click', this.onClick_cancel.bind(core));
        
        /** append html */
        context.element.relative.insertBefore(notice_div, context.element.editorArea);
        
        /** empty memory */
        notice_div = null;
    },

    onClick_cancel: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.plugins.notice.close.call(this);
    },

    open: function (text)  {
        this.context.notice.message.textContent = text;
        this.context.notice.modal.style.display = 'block';
    },

    close: function () {
        this.context.notice.modal.style.display = 'none';
    }
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'dialog',
    add: function (core) {
        const context = core.context;
        context.dialog = {
            kind: '',
            updateModal: false
        };

        /** dialog */
        let dialog_div = core.util.createElement('DIV');
        dialog_div.className = 'se-dialog sun-editor-common';

        let dialog_back = core.util.createElement('DIV');
        dialog_back.className = 'se-dialog-back';
        dialog_back.style.display = 'none';

        let dialog_area = core.util.createElement('DIV');
        dialog_area.className = 'se-dialog-inner';
        dialog_area.style.display = 'none';

        dialog_div.appendChild(dialog_back);
        dialog_div.appendChild(dialog_area);

        context.dialog.modalArea = dialog_div;
        context.dialog.back = dialog_back;
        context.dialog.modal = dialog_area;

        /** add event listeners */
        context.dialog.modal.addEventListener('click', this.onClick_dialog.bind(core));
        
        /** append html */
        context.element.relative.appendChild(dialog_div);
        
        /** empty memory */
        dialog_div = null, dialog_back = null, dialog_area = null;
    },

    onClick_dialog: function (e) {
        e.stopPropagation();

        if (/se-dialog-inner/.test(e.target.className) || /close/.test(e.target.getAttribute('data-command'))) {
            this.plugins.dialog.close.call(this);
        }
    },

    open: function (kind, update)  {
        if (this.modalForm) return false;
        if (this.plugins.dialog._bindClose) {
            this._d.removeEventListener('keydown', this.plugins.dialog._bindClose);
            this.plugins.dialog._bindClose = null;
        }

        this.plugins.dialog._bindClose = function (e) {
            if (!/27/.test(e.keyCode)) return;
            this.plugins.dialog.close.call(this);
        }.bind(this);
        this._d.addEventListener('keydown', this.plugins.dialog._bindClose);

        this.context.dialog.updateModal = update;

        if (this.context.option.popupDisplay === 'full') {
            this.context.dialog.modalArea.style.position = 'fixed';
        } else {
            this.context.dialog.modalArea.style.position = 'absolute';
        }

        this.context.dialog.kind = kind;
        this.modalForm = this.context[kind].modal;
        const focusElement = this.context[kind].focusElement;

        if (typeof this.plugins[kind].on === 'function') this.plugins[kind].on.call(this, update);

        this.context.dialog.modalArea.style.display = 'block';
        this.context.dialog.back.style.display = 'block';
        this.context.dialog.modal.style.display = 'block';
        this.modalForm.style.display = 'block';

        if (focusElement) focusElement.focus();
    },

    _bindClose: null,
    close: function () {
        if (this.plugins.dialog._bindClose) {
            this._d.removeEventListener('keydown', this.plugins.dialog._bindClose);
            this.plugins.dialog._bindClose = null;
        }

        const kind = this.context.dialog.kind;
        this.modalForm.style.display = 'none';
        this.context.dialog.back.style.display = 'none';
        this.context.dialog.modalArea.style.display = 'none';
        this.context.dialog.kind = '';
        this.context.dialog.updateModal = false;
        this.plugins[kind].init.call(this);
        this.modalForm = null;
        this.focus();
    }
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


(function (global, factory) {
    if ( true && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error('SUNEDITOR_LANG a window with a document');
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    const lang = {
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
            template: 'Template',
            lineHeight: 'Line height',
            paragraphStyle: 'Paragraph style',
            textStyle: 'Text style'
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
            shadow: 'Shadow'
        }
    };

    if (typeof noGlobal === typeof undefined) {
        if (!window.SUNEDITOR_LANG) {
            window.SUNEDITOR_LANG = {};
        }

        window.SUNEDITOR_LANG.en = lang;
    }

    return lang;
}));

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2018 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'colorPicker',
    add: function (core) {
        const context = core.context;
        context.colorPicker = {
            colorListHTML: '',
            _colorInput: '',
            _defaultColor: '#000',
            _styleProperty: 'color',
            _currentColor: '',
            _colorList: []
        };

        /** set submenu */
        let listDiv = this.createColorList(core.context.option, core.lang, this._makeColorList);

        /** caching */
        context.colorPicker.colorListHTML = listDiv;

        /** empty memory */
        listDiv = null;
    },

    createColorList: function (option, lang, makeColor) {
        const colorList = !option.colorList || option.colorList.length === 0 ?
            [
                '#ff0000', '#ff5e00', '#ffe400', '#abf200', '#00d8ff', '#0055ff', '#6600ff', '#ff00dd', '#000000',
                '#ffd8d8', '#fae0d4', '#faf4c0', '#e4f7ba', '#d4f4fa', '#d9e5ff', '#e8d9ff', '#ffd9fa', '#f1f1f1',
                '#ffa7a7', '#ffc19e', '#faed7d', '#cef279', '#b2ebf4', '#b2ccff', '#d1b2ff', '#ffb2f5', '#bdbdbd',
                '#f15f5f', '#f29661', '#e5d85c', '#bce55c', '#5cd1e5', '#6699ff', '#a366ff', '#f261df', '#8c8c8c',
                '#980000', '#993800', '#998a00', '#6b9900', '#008299', '#003399', '#3d0099', '#990085', '#353535',
                '#670000', '#662500', '#665c00', '#476600', '#005766', '#002266', '#290066', '#660058', '#222222'
            ] : option.colorList;

        let colorArr = [];
        let list = '<div class="se-list-inner">';
            for (let i = 0, len = colorList.length; i < len; i++) {
                if (typeof colorList[i] === 'string') {
                    colorArr.push(colorList[i]);
                    if (i < len - 1) continue;
                }
                if (colorArr.length > 0) {
                    list += '<div class="se-selector-color">' + makeColor(colorArr) + '</div>';
                    colorArr = [];
                }
                if (typeof colorList[i] === 'object') {
                    list += '<div class="se-selector-color">' + makeColor(colorList[i]) + '</div>';
                }
            }
            list += '' +
            '<form class="se-submenu-form-group">' +
                '<input type="text" maxlength="7" class="_se_color_picker_input" />' +
                '<button type="submit" class="se-btn-primary se-tooltip _se_color_picker_submit">' +
                    '<i class="se-icon-checked"></i>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.submitButton + '</span></span>' +
                '</button>' +
                '<button type="button" class="se-btn se-tooltip _se_color_picker_remove">' +
                    '<i class="se-icon-erase"></i>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.toolbar.removeFormat + '</span></span>' +
                '</button>' +
            '</form>' +
            '</div>';

        return list;
    },

    _makeColorList: function (colorList) {
        let list = '';

        list += '<ul class="se-color-pallet">';
        for (let i = 0, len = colorList.length, color; i < len; i++) {
            color = colorList[i];
            if (typeof color === 'string') {
                list += '<li>' +
                            '<button type="button" data-value="' + color + '" title="' + color + '" style="background-color:' + color + ';"></button>' +
                        '</li>';
            }
        }
        list += '</ul>';

        return list;
    },
    
    init: function (node, color) {
        const colorPicker = this.plugins.colorPicker;
        let fillColor = color ? color : colorPicker.getColorInNode.call(this, node) || this.context.colorPicker._defaultColor;
        fillColor = colorPicker.isHexColor(fillColor) ? fillColor : colorPicker.rgb2hex(fillColor) || fillColor;

        const colorList = this.context.colorPicker._colorList;
        if (colorList) {
            for (let i = 0, len = colorList.length; i < len; i++) {
                if (fillColor.toLowerCase() === colorList[i].getAttribute('data-value').toLowerCase()) {
                    this.util.addClass(colorList[i], 'active');
                } else {
                    this.util.removeClass(colorList[i], 'active');
                }
            }
        }

        colorPicker.setInputText.call(this, colorPicker.colorName2hex.call(this, fillColor));
    },

    setCurrentColor: function (hexColorStr) {
        this.context.colorPicker._currentColor = hexColorStr;
        this.context.colorPicker._colorInput.style.borderColor = hexColorStr;
    },

    setInputText: function (hexColorStr) {
        hexColorStr = /^#/.test(hexColorStr) ? hexColorStr : '#' + hexColorStr;
        this.context.colorPicker._colorInput.value = hexColorStr;
        this.plugins.colorPicker.setCurrentColor.call(this, hexColorStr);
    },

    getColorInNode: function (node) {
        let findColor = '';
        const styleProperty = this.context.colorPicker._styleProperty;

        while (node && !this.util.isWysiwygDiv(node) && findColor.length === 0) {
            if (node.nodeType === 1 && node.style[styleProperty]) findColor = node.style[styleProperty];
            node = node.parentNode;
        }

        return findColor;
    },

    /**
     * @description Function to check hex format color
     * @param {String} str
     */
    isHexColor: function (str) {
        return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(str);
    },

    /**
     * @description Function to convert hex format to a rgb color
     * @param {String} rgb - RGB color format
     * @returns {String}
     */
    rgb2hex: function (rgb) {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    },

    colorName2hex: function (colorName) {
        if (/^#/.test(colorName)) return colorName;
        var temp = this.util.createElement('div');
        temp.style.display = 'none';
        temp.style.color = colorName;
        var colors = this._w.getComputedStyle(this._d.body.appendChild(temp)).color.match(/\d+/g).map(function (a) { return parseInt(a,10); });
        this.util.removeItem(temp);
        return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
    }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'resizing',
    add: function (core) {
        const context = core.context;
        context.resizing = {
            _resizeClientX: 0,
            _resizeClientY: 0,
            _resize_plugin: '',
            _resize_w: 0,
            _resize_h: 0,
            _origin_w: 0,
            _origin_h: 0,
            _rotateVertical: false,
            _resize_direction: '',
            _move_path: null,
            _isChange: false
        };

        /** resize controller, button */
        let resize_div_container = this.setController_resize.call(core);
        context.resizing.resizeContainer = resize_div_container;

        context.resizing.resizeDiv = resize_div_container.querySelector('.se-modal-resize');
        context.resizing.resizeDot = resize_div_container.querySelector('.se-resize-dot');
        context.resizing.resizeDisplay = resize_div_container.querySelector('.se-resize-display');

        let resize_button = this.setController_button.call(core);
        context.resizing.resizeButton = resize_button;
        resize_button.addEventListener('mousedown', function (e) { e.stopPropagation(); }, false);

        let resize_handles = context.resizing.resizeHandles = context.resizing.resizeDot.querySelectorAll('span');
        context.resizing.resizeButtonGroup = resize_button.querySelector('._se_resizing_btn_group');
        context.resizing.rotationButtons = resize_button.querySelectorAll('._se_resizing_btn_group ._se_rotation');
        context.resizing.percentageButtons = resize_button.querySelectorAll('._se_resizing_btn_group ._se_percentage');

        context.resizing.alignMenu = resize_button.querySelector('.se-resizing-align-list');
        context.resizing.alignMenuList = context.resizing.alignMenu.querySelectorAll('button');

        context.resizing.alignButton = resize_button.querySelector('._se_resizing_align_button');
        context.resizing.alignButtonIcon = context.resizing.alignButton.querySelector('i');

        context.resizing.autoSizeButton = resize_button.querySelector('._se_resizing_btn_group ._se_auto_size');
        context.resizing.captionButton = resize_button.querySelector('._se_resizing_caption_button');

        /** add event listeners */
        resize_handles[0].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
        resize_handles[1].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
        resize_handles[2].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
        resize_handles[3].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
        resize_handles[4].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
        resize_handles[5].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
        resize_handles[6].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
        resize_handles[7].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
        resize_button.addEventListener('click', this.onClick_resizeButton.bind(core));

        /** append html */
        context.element.relative.appendChild(resize_div_container);
        context.element.relative.appendChild(resize_button);

        /** empty memory */
        resize_div_container = null, resize_button = null, resize_handles = null;
    },

    /** resize controller, button (image, iframe) */
    setController_resize: function () {
        const resize_container = this.util.createElement('DIV');
        
        resize_container.className = 'se-resizing-container';
        resize_container.style.display = 'none';
        resize_container.innerHTML = '' +
            '<div class="se-modal-resize"></div>' +
            '<div class="se-resize-dot">' +
                '<span class="tl"></span>' +
                '<span class="tr"></span>' +
                '<span class="bl"></span>' +
                '<span class="br"></span>' +
                '<span class="lw"></span>' +
                '<span class="th"></span>' +
                '<span class="rw"></span>' +
                '<span class="bh"></span>' +
                '<div class="se-resize-display"></div>' +
            '</div>';

        return resize_container;
    },

    setController_button: function () {
        const lang = this.lang;
        const resize_button = this.util.createElement("DIV");

        resize_button.className = "se-controller se-controller-resizing";
        resize_button.innerHTML = '' +
            '<div class="se-arrow se-arrow-up"></div>' +
            '<div class="se-btn-group _se_resizing_btn_group">' +
                '<button type="button" data-command="percent" data-value="1" class="se-tooltip _se_percentage">' +
                    '<span>100%</span>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.resize100 + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="percent" data-value="0.75" class="se-tooltip _se_percentage">' +
                    '<span>75%</span>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.resize75 + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="percent" data-value="0.5" class="se-tooltip _se_percentage">' +
                    '<span>50%</span>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.resize50 + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="auto" class="se-tooltip _se_auto_size">' +
                    '<i class="se-icon-auto-size"></i>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.autoSize + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="rotate" data-value="-90" class="se-tooltip _se_rotation">' +
                    '<i class="se-icon-rotate-left"></i>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.rotateLeft + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="rotate" data-value="90" class="se-tooltip _se_rotation">' +
                    '<i class="se-icon-rotate-right"></i>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.rotateRight + '</span></span>' +
                '</button>' +
            '</div>' +
            '<div class="se-btn-group">' +
                '<button type="button" data-command="mirror" data-value="h" class="se-tooltip">' +
                    '<i class="se-icon-mirror-horizontal"></i>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.mirrorHorizontal + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="mirror" data-value="v" class="se-tooltip">' +
                    '<i class="se-icon-mirror-vertical"></i>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.mirrorVertical + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="onalign" class="se-tooltip _se_resizing_align_button">' +
                    '<i class="se-icon-align-justify"></i>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.toolbar.align + '</span></span>' +
                '</button>' +
                '<div class="se-btn-group-sub sun-editor-common se-list-layer se-resizing-align-list">' +
                    '<div class="se-list-inner">' +
                        '<ul class="se-list-basic">' +
                            '<li><button type="button" class="se-btn-list se-tooltip" data-command="align" data-value="basic">' +
                                '<i class="se-icon-align-justify"></i>' +
                                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.basic + '</span></span>' +
                            '</button></li>' +
                            '<li><button type="button" class="se-btn-list se-tooltip" data-command="align" data-value="left">' +
                                '<i class="se-icon-align-left"></i>' +
                                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.left + '</span></span>' +
                            '</button></li>' +
                            '<li><button type="button" class="se-btn-list se-tooltip" data-command="align" data-value="center">' +
                                '<i class="se-icon-align-center"></i>' +
                                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.center + '</span></span>' +
                            '</button></li>' +
                            '<li><button type="button" class="se-btn-list se-tooltip" data-command="align" data-value="right">' +
                                '<i class="se-icon-align-right"></i>' +
                                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.right + '</span></span>' +
                            '</button></li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '<button type="button" data-command="caption" class="se-tooltip _se_resizing_caption_button">' +
                    '<i class="se-icon-caption"></i>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.caption + '</span></span>' +
                '</button>' +
                    '<button type="button" data-command="revert" class="se-tooltip">' +
                    '<i class="se-icon-revert"></i>' +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.revertButton + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="update" class="se-tooltip">' +
                    '<i class="se-icon-modify"></i>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.edit + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="delete" class="se-tooltip">' +
                    '<i class="se-icon-delete"></i>' +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.remove + '</span></span>' +
                '</button>' +
            '</div>';

        return resize_button;
    },

    _module_getSizeX: function (contextPlugin, element, cover, container) {
        if (!element) element = contextPlugin._element;
        if (!cover) cover = contextPlugin._cover;
        if (!container) container = contextPlugin._container;

        if (!container || !cover || !element) return '';

        return !/%$/.test(element.style.width) ? element.style.width : (this.util.getNumber(container.style.width, 2) || 100) + '%';
    },

    _module_getSizeY: function (contextPlugin, element, cover, container) {
        if (!element) element = contextPlugin._element;
        if (!cover) cover = contextPlugin._cover;
        if (!container) container = contextPlugin._container;

        if (!container || !cover || !element) return '';

        return this.util.getNumber(cover.style.paddingBottom) > 0 && !this.context.resizing._rotateVertical ? cover.style.height : (!/%$/.test(element.style.height) || !/%$/.test(element.style.width) ? element.style.height : (this.util.getNumber(container.style.height, 2) || 100) + '%');
    },

    _module_setModifyInputSize: function (contextPlugin, currentModule) {
        const percentageRotation = contextPlugin._onlyPercentage && this.context.resizing._rotateVertical;
        contextPlugin.proportion.checked = contextPlugin._proportionChecked = contextPlugin._element.getAttribute('data-proportion') !== 'false';

        let x = percentageRotation ? '' : this.plugins.resizing._module_getSizeX.call(this, contextPlugin);
        if (x === contextPlugin._defaultSizeX) x = '';
        if (contextPlugin._onlyPercentage) x = this.util.getNumber(x, 2);
        contextPlugin.inputX.value = x;
        currentModule.setInputSize.call(this, 'x');
        
        if (!contextPlugin._onlyPercentage) {
            let y = percentageRotation ? '' : this.plugins.resizing._module_getSizeY.call(this, contextPlugin);
            if (y === contextPlugin._defaultSizeY) y = '';
            if (contextPlugin._onlyPercentage) y = this.util.getNumber(y, 2);
            contextPlugin.inputY.value = y;
        }
        
        contextPlugin.inputX.disabled = percentageRotation ? true : false;
        contextPlugin.inputY.disabled = percentageRotation ? true : false;
        contextPlugin.proportion.disabled = percentageRotation ? true : false;

        currentModule.setRatio.call(this);
    },

    _module_setInputSize: function (contextPlugin, xy) {
        if (contextPlugin._onlyPercentage) {
            if (xy === 'x' && contextPlugin.inputX.value > 100) contextPlugin.inputX.value = 100;
            return;
        }

        if (contextPlugin.proportion.checked && contextPlugin._ratio && /\d/.test(contextPlugin.inputX.value) && /\d/.test(contextPlugin.inputY.value)) {
            const xUnit = contextPlugin.inputX.value.replace(/\d+|\./g, '') || contextPlugin.sizeUnit;
            const yUnit = contextPlugin.inputY.value.replace(/\d+|\./g, '') || contextPlugin.sizeUnit;

            if (xUnit !== yUnit) return;

            const dec = xUnit === '%' ? 2 : 0;

            if (xy === 'x') {
                contextPlugin.inputY.value = this.util.getNumber(contextPlugin._ratioY * this.util.getNumber(contextPlugin.inputX.value, dec), dec) + yUnit;
            } else {
                contextPlugin.inputX.value = this.util.getNumber(contextPlugin._ratioX * this.util.getNumber(contextPlugin.inputY.value, dec), dec) + xUnit;
            }
        }
    },

    _module_setRatio: function (contextPlugin) {
        const xValue = contextPlugin.inputX.value;
        const yValue = contextPlugin.inputY.value;

        if (contextPlugin.proportion.checked && /\d+/.test(xValue) && /\d+/.test(yValue)) {
            const xUnit = xValue.replace(/\d+|\./g, '') || contextPlugin.sizeUnit;
            const yUnit = yValue.replace(/\d+|\./g, '') || contextPlugin.sizeUnit;

            if (xUnit !== yUnit) {
                contextPlugin._ratio = false;
            } else if (!contextPlugin._ratio) {
                const x = this.util.getNumber(xValue);
                const y = this.util.getNumber(yValue);

                contextPlugin._ratio = true;
                contextPlugin._ratioX = x / y;
                contextPlugin._ratioY = y / x;
            }
        } else {
            contextPlugin._ratio = false;
        }
    },

    _module_sizeRevert: function (contextPlugin) {
        if (contextPlugin._onlyPercentage) {
            contextPlugin.inputX.value = contextPlugin._origin_w > 100 ? 100 : contextPlugin._origin_w;
        } else {
            contextPlugin.inputX.value = contextPlugin._origin_w;
            contextPlugin.inputY.value = contextPlugin._origin_h;
        }
    },

    _module_saveCurrentSize: function (contextPlugin) {
        const x = this.plugins.resizing._module_getSizeX.call(this, contextPlugin);
        const y = this.plugins.resizing._module_getSizeY.call(this, contextPlugin);
        contextPlugin._element.setAttribute('data-size', x + ',' + y);
        if (!!contextPlugin._videoRatio) contextPlugin._videoRatio = y;
    },

    call_controller_resize: function (targetElement, plugin) {
        const contextResizing = this.context.resizing;
        const contextPlugin = this.context[plugin];
        contextResizing._resize_plugin = plugin;

        const resizeContainer = contextResizing.resizeContainer;
        const resizeDiv = contextResizing.resizeDiv;
        const offset = this.util.getOffset(targetElement, this.context.element.wysiwygFrame);

        const isVertical = contextResizing._rotateVertical = /^(90|270)$/.test(Math.abs(targetElement.getAttribute('data-rotate')).toString());

        const w = isVertical ? targetElement.offsetHeight : targetElement.offsetWidth;
        const h = isVertical ? targetElement.offsetWidth : targetElement.offsetHeight;
        const t = offset.top;
        const l = offset.left - this.context.element.wysiwygFrame.scrollLeft;

        resizeContainer.style.top = t + 'px';
        resizeContainer.style.left = l + 'px';
        resizeContainer.style.width = w + 'px';
        resizeContainer.style.height = h + 'px';

        resizeDiv.style.top = '0px';
        resizeDiv.style.left = '0px';
        resizeDiv.style.width =  w + 'px';
        resizeDiv.style.height =  h + 'px';

        let align = targetElement.getAttribute('data-align') || 'basic';
        align = align === 'none' ? 'basic' : align;

        // text
        const container = this.util.getParentElement(targetElement, this.util.isComponent);
        const cover = this.util.getParentElement(targetElement, 'FIGURE');
        const displayX = this.plugins.resizing._module_getSizeX.call(this, contextPlugin, targetElement, cover, container) || 'auto';
        const displayY = contextPlugin._onlyPercentage && plugin === 'image' ? '' : ', ' + (this.plugins.resizing._module_getSizeY.call(this, contextPlugin, targetElement, cover, container) || 'auto');
        this.util.changeTxt(contextResizing.resizeDisplay, this.lang.dialogBox[align] + ' (' + displayX + displayY + ')');

        // resizing display
        contextResizing.resizeButtonGroup.style.display = contextPlugin._resizing ? '' : 'none';
        const resizeDotShow = contextPlugin._resizing && !contextPlugin._resizeDotHide && !contextPlugin._onlyPercentage ? 'flex' : 'none';
        const resizeHandles = contextResizing.resizeHandles;
        for (let i = 0, len = resizeHandles.length; i < len; i++) {
            resizeHandles[i].style.display = resizeDotShow;
        }

        if (contextPlugin._resizing) {
            const rotations = contextResizing.rotationButtons;
            rotations[0].style.display = rotations[1].style.display = contextPlugin._rotation ? '' : 'none';
        }

        // align icon
        const alignList = contextResizing.alignMenuList;
        this.util.removeClass(contextResizing.alignButtonIcon, 'se-icon-align\\-[a-z]+');
        this.util.addClass(contextResizing.alignButtonIcon, 'se-icon-align-' + (align === 'basic' ? 'justify' : align));
        for (let i = 0, len = alignList.length; i < len; i++) {
            if (alignList[i].getAttribute('data-value') === align) this.util.addClass(alignList[i], 'on');
            else this.util.removeClass(alignList[i], 'on');
        }

        // percentage active
        const pButtons = contextResizing.percentageButtons;
        const value = /%$/.test(targetElement.style.width) && /%$/.test(container.style.width) ? (this.util.getNumber(container.style.width) / 100) + '' : '' ;
        for (let i = 0, len = pButtons.length; i < len; i++) {
            if (pButtons[i].getAttribute('data-value') === value) {
                this.util.addClass(pButtons[i], 'active');
            } else {
                this.util.removeClass(pButtons[i], 'active');
            }
        }

        // caption display, active
        if (!contextPlugin._captionShow) {
            contextResizing.captionButton.style.display = 'none';
        } else {
            contextResizing.captionButton.style.display = '';
            if (this.util.getChildElement(targetElement.parentNode, 'figcaption')) {
                this.util.addClass(contextResizing.captionButton, 'active');
                contextPlugin._captionChecked = true;
            } else {
                this.util.removeClass(contextResizing.captionButton, 'active');
                contextPlugin._captionChecked = false;
            }
        }

        this._resizingName = plugin;
        this.controllersOn(contextResizing.resizeContainer, contextResizing.resizeButton);

        // button group
        const overLeft = this.context.element.wysiwygFrame.offsetWidth - l - contextResizing.resizeButton.offsetWidth;

        contextResizing.resizeButton.style.top = (h + t + 60) + 'px';
        contextResizing.resizeButton.style.left = (l + (overLeft < 0 ? overLeft : 0)) + 'px';

        if (overLeft < 0) {
            contextResizing.resizeButton.firstElementChild.style.left = (20 - overLeft) + 'px';
        } else {
            contextResizing.resizeButton.firstElementChild.style.left = '20px';
        }

        contextResizing._resize_w = w;
        contextResizing._resize_h = h;

        const originSize = (targetElement.getAttribute('origin-size') || '').split(',');
        contextResizing._origin_w = originSize[0] || targetElement.naturalWidth;
        contextResizing._origin_h = originSize[1] || targetElement.naturalHeight;

        return {
            w: w,
            h: h,
            t: t,
            l: l
        };
    },

    _closeAlignMenu: null,
    openAlignMenu: function () {
        this.util.addClass(this.context.resizing.alignButton, 'on');
        this.context.resizing.alignMenu.style.display = 'inline-table';

        this.plugins.resizing._closeAlignMenu = function () {
            this.util.removeClass(this.context.resizing.alignButton, 'on');
            this.context.resizing.alignMenu.style.display = 'none';
            this.removeDocEvent('mousedown', this.plugins.resizing._closeAlignMenu);
            this.plugins.resizing._closeAlignMenu = null;
        }.bind(this);

        this.addDocEvent('mousedown', this.plugins.resizing._closeAlignMenu);
    },

    create_caption: function () {
        const caption = this.util.createElement('FIGCAPTION');
        caption.setAttribute('contenteditable', true);
        caption.innerHTML = '<div>' + this.lang.dialogBox.caption + '</div>';
        return caption;
    },

    set_cover: function (element) {
        const cover = this.util.createElement('FIGURE');
        cover.appendChild(element);

        return cover;
    },

    set_container: function (cover, className) {
        const container = this.util.createElement('DIV');
        container.className = 'se-component ' + className;
        container.setAttribute('contenteditable', false);
        container.appendChild(cover);

        return container;
    },

    onClick_resizeButton: function (e) {
        e.stopPropagation();
        // debugger;
        const target = e.target;
        const command = target.getAttribute('data-command') || target.parentNode.getAttribute('data-command');

        if (!command) return;

        const value = target.getAttribute('data-value') || target.parentNode.getAttribute('data-value');

        const pluginName = this.context.resizing._resize_plugin;
        const currentContext = this.context[pluginName];
        const contextEl = currentContext._element;
        const currentModule = this.plugins[pluginName];

        e.preventDefault();

        if (typeof this.plugins.resizing._closeAlignMenu === 'function') {
            this.plugins.resizing._closeAlignMenu();
            if (command === 'onalign') return;
        }

        switch (command) {
            case 'auto':
                currentModule.setAutoSize.call(this);
                currentModule.onModifyMode.call(this, contextEl, this.plugins.resizing.call_controller_resize.call(this, contextEl, pluginName));
                break;
            case 'percent':
                let percentY = this.plugins.resizing._module_getSizeY.call(this, currentContext);
                if (this.context.resizing._rotateVertical) {
                    const percentage = contextEl.getAttribute('data-percentage');
                    if (percentage) percentY = percentage.split(',')[1];
                }

                this.plugins.resizing.resetTransform.call(this, contextEl);
                currentModule.setPercentSize.call(this, (value * 100), percentY);
                currentModule.onModifyMode.call(this, contextEl, this.plugins.resizing.call_controller_resize.call(this, contextEl, pluginName));
                break;
            case 'mirror':
                const r = contextEl.getAttribute('data-rotate') || '0';
                let x = contextEl.getAttribute('data-rotateX') || '';
                let y = contextEl.getAttribute('data-rotateY') || '';
    
                if ((value === 'h' && !this.context.resizing._rotateVertical) || (value === 'v' && this.context.resizing._rotateVertical)) {
                    y = y ? '' : '180';
                } else {
                    x = x ? '' : '180';
                }
    
                contextEl.setAttribute('data-rotateX', x);
                contextEl.setAttribute('data-rotateY', y);
    
                this.plugins.resizing._setTransForm(contextEl, r, x, y);
                break;
            case 'rotate':
                const contextResizing = this.context.resizing;
                const slope = (contextEl.getAttribute('data-rotate') * 1) + (value * 1);
                const deg = this._w.Math.abs(slope) >= 360 ? 0 : slope;
    
                contextEl.setAttribute('data-rotate', deg);
                contextResizing._rotateVertical = /^(90|270)$/.test(this._w.Math.abs(deg).toString());
                this.plugins.resizing.setTransformSize.call(this, contextEl, null, null);
    
                currentModule.onModifyMode.call(this, contextEl, this.plugins.resizing.call_controller_resize.call(this, contextEl, pluginName));
                break;
            case 'onalign':
                this.plugins.resizing.openAlignMenu.call(this);
                break;
            case 'align':
                const alignValue = value === 'basic' ? 'none' : value;
                currentModule.setAlign.call(this, alignValue, null, null, null);
                currentModule.onModifyMode.call(this, contextEl, this.plugins.resizing.call_controller_resize.call(this, contextEl, pluginName));
                break;
            case 'caption':
                const caption = !currentContext._captionChecked;
                currentModule.openModify.call(this, true);
                currentContext._captionChecked = currentContext.captionCheckEl.checked = caption;

                if (pluginName === 'image') {
                    currentModule.update_image.call(this, false, false, false);
                } else if (pluginName === 'video') {
                    this.context.dialog.updateModal = true;
                    currentModule.submitAction.call(this);
                }

                if (caption) {
                    const captionText = this.util.getChildElement(currentContext._caption, function (current) {
                        return current.nodeType === 3;
                    });

                    if (!captionText) {
                        currentContext._caption.focus();
                    } else {
                        this.setRange(captionText, 0, captionText, captionText.textContent.length);
                    }

                    this.controllersOff();
                } else {
                    currentModule.onModifyMode.call(this, contextEl, this.plugins.resizing.call_controller_resize.call(this, contextEl, pluginName));
                    currentModule.openModify.call(this, true);
                }

                break;
            case 'revert':
                currentModule.setOriginSize.call(this);
                currentModule.onModifyMode.call(this, contextEl, this.plugins.resizing.call_controller_resize.call(this, contextEl, pluginName));
                break;
            case 'update':
                currentModule.openModify.call(this);
                this.controllersOff();
                break;
            case 'delete':
                currentModule.destroy.call(this);
                break;
        }

        // history stack
        this.history.push(false);
    },

    resetTransform: function (element) {
        const size = (element.getAttribute('data-size') || element.getAttribute('data-origin') || '').split(',');
        this.context.resizing._rotateVertical = false;

        element.style.maxWidth = '';
        element.style.transform = '';
        element.style.transformOrigin = '';
        element.setAttribute('data-rotate', '');
        element.setAttribute('data-rotateX', '');
        element.setAttribute('data-rotateY', '');

        this.plugins[this.context.resizing._resize_plugin].setSize.call(this, size[0] ? size[0] : 'auto', size[1] ? size[1] : '', true);
    },

    setTransformSize: function (element, width, height) {
        let percentage = element.getAttribute('data-percentage');
        const isVertical = this.context.resizing._rotateVertical;
        const deg = element.getAttribute('data-rotate') * 1;
        let transOrigin = '';

        if (percentage && !isVertical) {
            percentage = percentage.split(',');
            if (percentage[0] === 'auto' && percentage[1] === 'auto') {
                this.plugins[this.context.resizing._resize_plugin].setAutoSize.call(this);
            } else {
                this.plugins[this.context.resizing._resize_plugin].setPercentSize.call(this, percentage[0], percentage[1]);
            }
        } else {
            const cover = this.util.getParentElement(element, 'FIGURE');
    
            const offsetW = width || element.offsetWidth;
            const offsetH = height || element.offsetHeight;
            const w = (isVertical ? offsetH : offsetW) + 'px';
            const h = (isVertical ? offsetW : offsetH) + 'px';
    
            this.plugins[this.context.resizing._resize_plugin].cancelPercentAttr.call(this);
            this.plugins[this.context.resizing._resize_plugin].setSize.call(this, offsetW + 'px', offsetH + 'px', true);
    
            cover.style.width = w;
            cover.style.height = (!!this.context[this.context.resizing._resize_plugin]._caption ? '' : h);

            if (isVertical) {
                let transW = (offsetW/2) + 'px ' + (offsetW/2) + 'px 0';
                let transH = (offsetH/2) + 'px ' + (offsetH/2) + 'px 0';
                transOrigin = deg === 90 || deg === -270 ? transH : transW;
            }
        }

        element.style.transformOrigin = transOrigin;
        this.plugins.resizing._setTransForm(element, deg.toString(), element.getAttribute('data-rotateX') || '', element.getAttribute('data-rotateY') || '');
        
        if (isVertical) element.style.maxWidth = 'none';
        else element.style.maxWidth = '';

        this.plugins.resizing.setCaptionPosition.call(this, element);
    },

    _setTransForm: function (element, r, x, y) {
        let width = (element.offsetWidth - element.offsetHeight) * (/-/.test(r) ? 1 : -1);
        let translate = '';

        if (/[1-9]/.test(r) && (x || y)) {
            translate = x ? 'Y' : 'X';

            switch (r) {
                case '90':
                    translate = x && y ? 'X' : y ? translate : '';
                    break;
                case '270':
                    width *= -1;
                    translate = x && y ? 'Y' : x ? translate : '';
                    break;
                case '-90':
                    translate = x && y ? 'Y' : x ? translate : '';
                    break;
                case '-270':
                    width *= -1;
                    translate = x && y ? 'X' : y ? translate : '';
                    break;
                default:
                    translate = '';
            }
        }

        if (r % 180 === 0) {
            element.style.maxWidth = '';
        }
        
        element.style.transform = 'rotate(' + r + 'deg)' + (x ? ' rotateX(' + x + 'deg)' : '') + (y ? ' rotateY(' + y + 'deg)' : '') + (translate ? ' translate' + translate + '(' + width + 'px)' : '');
    },

    setCaptionPosition: function (element) {
        const figcaption = this.util.getChildElement(this.util.getParentElement(element, 'FIGURE'), 'FIGCAPTION');
        if (figcaption) {
            figcaption.style.marginTop = (this.context.resizing._rotateVertical ? element.offsetWidth - element.offsetHeight : 0) + 'px';
        }
    },

    // resizing
    onMouseDown_resize_handle: function (e) {
        const contextResizing = this.context.resizing;
        const direction = contextResizing._resize_direction = e.target.classList[0];
        e.stopPropagation();
        e.preventDefault();

        const pluginName = this.context.resizing._resize_plugin;
        const contextEl = this.context[pluginName]._element;
        const currentModule = this.plugins[pluginName];

        contextResizing._resizeClientX = e.clientX;
        contextResizing._resizeClientY = e.clientY;
        this.context.element.resizeBackground.style.display = 'block';
        contextResizing.resizeButton.style.display = 'none';
        contextResizing.resizeDiv.style.float = /l/.test(direction) ? 'right' : /r/.test(direction) ? 'left' : 'none';

        const closureFunc_bind = function closureFunc(e) {
            if (e.type === 'keydown' && e.keyCode !== 27) return;

            const change = contextResizing._isChange;
            contextResizing._isChange = false;

            this.removeDocEvent('mousemove', resizing_element_bind);
            this.removeDocEvent('mouseup', closureFunc_bind);
            this.removeDocEvent('keydown', closureFunc_bind);
            
            if (e.type === 'keydown') {
                this.controllersOff();
                this.context.element.resizeBackground.style.display = 'none';
                this.plugins[this.context.resizing._resize_plugin].init.call(this);
            } else {
                // element resize
                this.plugins.resizing.cancel_controller_resize.call(this);
                // history stack
                if (change) this.history.push(false);
            }
            
            currentModule.onModifyMode.call(this, contextEl, this.plugins.resizing.call_controller_resize.call(this, contextEl, contextResizing._resize_plugin));
        }.bind(this);

        const resizing_element_bind = this.plugins.resizing.resizing_element.bind(this, contextResizing, direction, this.context[contextResizing._resize_plugin]);
        this.addDocEvent('mousemove', resizing_element_bind);
        this.addDocEvent('mouseup', closureFunc_bind);
        this.addDocEvent('keydown', closureFunc_bind);
    },

    resizing_element: function (contextResizing, direction, plugin, e) {
        const clientX = e.clientX;
        const clientY = e.clientY;

        let resultW = plugin._element_w;
        let resultH = plugin._element_h;

        const w = plugin._element_w + (/r/.test(direction) ? clientX - contextResizing._resizeClientX : contextResizing._resizeClientX - clientX);
        const h = plugin._element_h + (/b/.test(direction) ? clientY - contextResizing._resizeClientY : contextResizing._resizeClientY - clientY);
        const wh = ((plugin._element_h / plugin._element_w) * w);

        if (/t/.test(direction)) contextResizing.resizeDiv.style.top = (plugin._element_h - (/h/.test(direction) ? h : wh)) + 'px';
        if (/l/.test(direction)) contextResizing.resizeDiv.style.left = (plugin._element_w - w) + 'px';

        if (/r|l/.test(direction)) {
            contextResizing.resizeDiv.style.width = w + 'px';
            resultW = w;
        }

        if (/^(t|b)[^h]$/.test(direction)) {
            contextResizing.resizeDiv.style.height = wh + 'px';
            resultH = wh;
        }
        else if (/^(t|b)h$/.test(direction)) {
            contextResizing.resizeDiv.style.height = h + 'px';
            resultH = h;
        }

        contextResizing._resize_w = resultW;
        contextResizing._resize_h = resultH;
        this.util.changeTxt(contextResizing.resizeDisplay, this._w.Math.round(resultW) + ' x ' + this._w.Math.round(resultH));
        contextResizing._isChange = true;
    },

    cancel_controller_resize: function () {
        const isVertical = this.context.resizing._rotateVertical;
        this.controllersOff();
        this.context.element.resizeBackground.style.display = 'none';

        let w = this._w.Math.round(isVertical ? this.context.resizing._resize_h : this.context.resizing._resize_w);
        let h = this._w.Math.round(isVertical ? this.context.resizing._resize_w : this.context.resizing._resize_h);

        if (!isVertical && !/%$/.test(w)) {
            const padding = 16;
            const limit = this.context.element.wysiwygFrame.clientWidth - (padding * 2) - 2;
            
            if (this.util.getNumber(w) > limit) {
                h = this._w.Math.round((h / w) * limit);
                w = limit;
            }
        }

        this.plugins[this.context.resizing._resize_plugin].setSize.call(this, w, h, false);
        this.plugins[this.context.resizing._resize_plugin].init.call(this);
    }
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'align',
    add: function (core, targetElement) {
        const context = core.context;
        context.align = {
            _alignList: null,
            currentAlign: ''
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);
        let listUl = listDiv.querySelector('ul');

        /** add event listeners */
        listUl.addEventListener('click', this.pickup.bind(core));

        context.align._alignList = listUl.querySelectorAll('li button');

        /** append html */
        targetElement.parentNode.appendChild(listDiv);

        /** empty memory */
        listDiv = null, listUl = null;
    },

    setSubmenu: function () {
        const lang = this.lang;
        const listDiv = this.util.createElement('DIV');

        listDiv.className = 'se-list-layer';
        listDiv.innerHTML = '' +
            '<div class="se-submenu se-list-inner se-list-align">' +
                '<ul class="se-list-basic">' +
                    '<li><button type="button" class="se-btn-list se-btn-align" data-command="justifyleft" data-value="left" title="' + lang.toolbar.alignLeft + '"><span class="se-icon-align-left"></span>' + lang.toolbar.alignLeft + '</button></li>' +
                    '<li><button type="button" class="se-btn-list se-btn-align" data-command="justifycenter" data-value="center" title="' + lang.toolbar.alignCenter + '"><span class="se-icon-align-center"></span>' + lang.toolbar.alignCenter + '</button></li>' +
                    '<li><button type="button" class="se-btn-list se-btn-align" data-command="justifyright" data-value="right" title="' + lang.toolbar.alignRight + '"><span class="se-icon-align-right"></span>' + lang.toolbar.alignRight + '</button></li>' +
                    '<li><button type="button" class="se-btn-list se-btn-align" data-command="justifyfull" data-value="justify" title="' + lang.toolbar.alignJustify + '"><span class="se-icon-align-justify"></span>' + lang.toolbar.alignJustify + '</button></li>' +
                '</ul>' +
            '</div>';

        return listDiv;
    },

    on: function () {
        const alignContext = this.context.align;
        const alignList = alignContext._alignList;
        const currentAlign = this.commandMap.ALIGN.getAttribute('data-focus') || 'left';

        if (currentAlign !== alignContext.currentAlign) {
            for (let i = 0, len = alignList.length; i < len; i++) {
                if (currentAlign === alignList[i].getAttribute('data-value')) {
                    this.util.addClass(alignList[i], 'active');
                } else {
                    this.util.removeClass(alignList[i], 'active');
                }
            }

            alignContext.currentAlign = currentAlign;
        }
    },

    pickup: function (e) {
        e.preventDefault();
        e.stopPropagation();

        let target = e.target;
        let value = null;

        while (!value && !/UL/i.test(target.tagName)) {
            value = target.getAttribute('data-value');
            target = target.parentNode;
        }

        if (!value) return;

        const selectedFormsts = this.getSelectedElements();
        for (let i = 0, len = selectedFormsts.length; i < len; i++) {
            selectedFormsts[i].style.textAlign = value;
        }

        this.submenuOff();
        this.focus();
    }
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'font',
    add: function (core, targetElement) {
        const context = core.context;
        context.font = {
            _fontList: null,
            currentFont: ''
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);

        /** add event listeners */
        listDiv.querySelector('.se-list-font-family').addEventListener('click', this.pickup.bind(core));

        context.font._fontList = listDiv.querySelectorAll('ul li button');

        /** append html */
        targetElement.parentNode.appendChild(listDiv);

        /** empty memory */
        listDiv = null;
    },

    setSubmenu: function () {
        const option = this.context.option;
        const lang = this.lang;
        const listDiv = this.util.createElement('DIV');

        listDiv.className = 'se-list-layer';

        let font, text, i, len;
        let fontList = !option.font ?
            [
                'Arial',
                'Comic Sans MS',
                'Courier New',
                'Impact',
                'Georgia',
                'tahoma',
                'Trebuchet MS',
                'Verdana'
            ] : option.font;

        let list = '<div class="se-submenu se-list-inner se-list-font-family">' +
                '<ul class="se-list-basic">' +
                    '<li><button type="button" class="default_value se-btn-list" title="' + lang.toolbar.default + '">(' + lang.toolbar.default + ')</button></li>';
        for (i = 0, len = fontList.length; i < len; i++) {
            font = fontList[i];
            text = font.split(',')[0];
            list += '<li><button type="button" class="se-btn-list" data-value="' + font + '" data-txt="' + text + '" title="' + text + '" style="font-family:' + font + ';">' + text + '</button></li>';
        }
        list += '</ul></div>';
        listDiv.innerHTML = list;

        return listDiv;
    },

    on: function () {
        const fontContext = this.context.font;
        const fontList = fontContext._fontList;
        const currentFont = this.commandMap.FONT.textContent;

        if (currentFont !== fontContext.currentFont) {
            for (let i = 0, len = fontList.length; i < len; i++) {
                if (currentFont === fontList[i].getAttribute('data-value')) {
                    this.util.addClass(fontList[i], 'active');
                } else {
                    this.util.removeClass(fontList[i], 'active');
                }
            }

            fontContext.currentFont = currentFont;
        }
    },

    pickup: function (e) {
        if (!/^BUTTON$/i.test(e.target.tagName)) return false;

        e.preventDefault();
        e.stopPropagation();

        const value = e.target.getAttribute('data-value');

        if (value) {
            const newNode = this.util.createElement('SPAN');
            newNode.style.fontFamily = value;
            this.nodeChange(newNode, ['font-family'], null, null);
        } else {
            this.nodeChange(null, ['font-family'], ['span'], true);
        }
        
        this.submenuOff();
    }
});


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_colorPicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'fontColor',
    add: function (core, targetElement) {
        core.addModule([_modules_colorPicker__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]]);

        const context = core.context;
        context.fontColor = {
            previewEl: null,
            colorInput: null,
            colorList: null
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);
        context.fontColor.colorInput = listDiv.querySelector('._se_color_picker_input');

        /** add event listeners */
        context.fontColor.colorInput.addEventListener('keyup', this.onChangeInput.bind(core));
        listDiv.querySelector('._se_color_picker_submit').addEventListener('click', this.submit.bind(core));
        listDiv.querySelector('._se_color_picker_remove').addEventListener('click', this.remove.bind(core));
        listDiv.addEventListener('click', this.pickup.bind(core));

        context.fontColor.colorList = listDiv.querySelectorAll('li button');

        /** append html */
        targetElement.parentNode.appendChild(listDiv);

        /** empty memory */
        listDiv = null;
    },

    setSubmenu: function () {
        const colorArea = this.context.colorPicker.colorListHTML;
        const listDiv = this.util.createElement('DIV');

        listDiv.className = 'se-submenu se-list-layer';
        listDiv.innerHTML = colorArea;

        return listDiv;
    },

    on: function () {
        const contextPicker = this.context.colorPicker;
        const contextFontColor = this.context.fontColor;

        contextPicker._colorInput = contextFontColor.colorInput;
        contextPicker._defaultColor = '#333333';
        contextPicker._styleProperty = 'color';
        contextPicker._colorList = contextFontColor.colorList;
        
        this.plugins.colorPicker.init.call(this, this.getSelectionNode(), null);
    },

    onChangeInput: function (e) {
        this.plugins.colorPicker.setCurrentColor.call(this, e.target.value);
    },

    submit: function () {
        this.plugins.fontColor.applyColor.call(this, this.context.colorPicker._currentColor);
    },

    pickup: function (e) {
        e.preventDefault();
        e.stopPropagation();

        this.plugins.fontColor.applyColor.call(this, e.target.getAttribute('data-value'));
    },

    remove: function () {
        this.nodeChange(null, ['color'], ['span'], true);
        this.submenuOff();
    },

    applyColor: function (color) {
        if (!color) return;

        const newNode = this.util.createElement('SPAN');
        newNode.style.color = color;
        this.nodeChange(newNode, ['color'], null, null);

        this.submenuOff();
    }
});


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'fontSize',
    add: function (core, targetElement) {
        const context = core.context;
        context.fontSize = {
            _sizeList: null,
            currentSize: ''
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);
        let listUl = listDiv.querySelector('ul');

        /** add event listeners */
        listUl.addEventListener('click', this.pickup.bind(core));

        context.fontSize._sizeList = listUl.querySelectorAll('li button');

        /** append html */
        targetElement.parentNode.appendChild(listDiv);

        /** empty memory */
        listDiv = null, listUl = null;
    },

    setSubmenu: function () {
        const option = this.context.option;
        const lang = this.lang;
        const listDiv = this.util.createElement('DIV');

        listDiv.className = 'se-submenu se-list-layer';

        const sizeList = !option.fontSize ? [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72] : option.fontSize;

        let list = '<div class="se-list-inner se-list-font-size">' +
                '<ul class="se-list-basic">' +
                    '<li><button type="button" class="default_value se-btn-list" title="' + lang.toolbar.default + '">(' + lang.toolbar.default + ')</button></li>';
        for (let i = 0, unit = option.fontSizeUnit, len = sizeList.length, size; i < len; i++) {
            size = sizeList[i];
            list += '<li><button type="button" class="se-btn-list" data-value="' + size + unit + '" title="' + size + unit + '" style="font-size:' + size + unit + ';">' + size + '</button></li>';
        }
        list += '</ul></div>';

        listDiv.innerHTML = list;

        return listDiv;
    },

    on: function () {
        const fontSizeContext = this.context.fontSize;
        const sizeList = fontSizeContext._sizeList;
        const currentSize = this.commandMap.SIZE.textContent;

        if (currentSize !== fontSizeContext.currentSize) {
            for (let i = 0, len = sizeList.length; i < len; i++) {
                if (currentSize === sizeList[i].getAttribute('data-value')) {
                    this.util.addClass(sizeList[i], 'active');
                } else {
                    this.util.removeClass(sizeList[i], 'active');
                }
            }

            fontSizeContext.currentSize = currentSize;
        }
    },

    pickup: function (e) {
        if (!/^BUTTON$/i.test(e.target.tagName)) return false;
        
        e.preventDefault();
        e.stopPropagation();

        const value = e.target.getAttribute('data-value');

        if (value) {
            const newNode = this.util.createElement('SPAN');
            newNode.style.fontSize = value;
            this.nodeChange(newNode, ['font-size'], null, null);
        } else {
            this.nodeChange(null, ['font-size'], ['span'], true);
        }

        this.submenuOff();
    }
});


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'formatBlock',
    add: function (core, targetElement) {
        const context = core.context;
        context.formatBlock = {
            _formatList: null,
            currentFormat: ''
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);

        /** add event listeners */
        listDiv.querySelector('ul').addEventListener('click', this.pickUp.bind(core));

        context.formatBlock._formatList = listDiv.querySelectorAll('li button');

        /** append html */
        targetElement.parentNode.appendChild(listDiv);

        /** empty memory */
        listDiv = null;
    },

    setSubmenu: function () {
        const option = this.context.option;
        const lang_toolbar = this.lang.toolbar;
        const listDiv = this.util.createElement('DIV');
        listDiv.className = 'se-submenu se-list-layer';

        const defaultFormats = ['p', 'div', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        const formatList = !option.formats || option.formats.length === 0 ? defaultFormats : option.formats;

        let list = '<div class="se-list-inner"><ul class="se-list-basic se-list-format">';
        for (let i = 0, len = formatList.length, format, tagName, command, name, h, attrs; i < len; i++) {
            format = formatList[i];
            
            if (typeof format === 'string' && defaultFormats.indexOf(format) > -1) {
                tagName = format.toLowerCase();
                command = tagName === 'pre' || tagName === 'blockquote' ? 'range' : 'replace';
                h = /^h/.test(tagName) ? tagName.match(/\d+/)[0] : '';
                name = lang_toolbar['tag_' + (h ? 'h' : tagName)] + h;
                attrs = '';
            } else {
                tagName = format.tag.toLowerCase();
                command = format.command;
                name = format.name || tagName;
                attrs = format.class ? ' class="' + format.class + '"' : '';
            }

            list += '<li>' +
                '<button type="button" class="se-btn-list" data-command="' + command + '" data-value="' + tagName + '" title="' + name + '">' +
                    '<' + tagName + attrs + '>' + name + '</' + tagName + '>' +
                '</button></li>';
        }
        list += '</ul></div>';

        listDiv.innerHTML = list;

        return listDiv;
    },

    on: function () {
        const formatContext = this.context.formatBlock;
        const formatList = formatContext._formatList;
        const currentFormat = (this.commandMap.FORMAT.getAttribute('data-focus') || 'P').toLowerCase();

        if (currentFormat !== formatContext.currentFormat) {
            for (let i = 0, len = formatList.length; i < len; i++) {
                if (currentFormat === formatList[i].getAttribute('data-value')) {
                    this.util.addClass(formatList[i], 'active');
                } else {
                    this.util.removeClass(formatList[i], 'active');
                }
            }

            formatContext.currentFormat = currentFormat;
        }
    },

    pickUp: function (e) {
        e.preventDefault();
        e.stopPropagation();

        let target = e.target;
        let command = null, value = null, tag = null;
        
        while (!command && !/UL/i.test(target.tagName)) {
            command = target.getAttribute('data-command');
            value = target.getAttribute('data-value');
            if (command) {
                tag = target.firstChild;
                break;
            }
            target = target.parentNode;
        }

        if (!command) return;

        // blockquote, pre
        if (command === 'range') {
            const rangeElement = tag.cloneNode(false);
            this.applyRangeFormatElement(rangeElement);
        }
        // others
        else {
            const range = this.getRange();
            const startOffset = range.startOffset;
            const endOffset = range.endOffset;

            let selectedFormsts = this.getSelectedElementsAndComponents();
            if (selectedFormsts.length === 0) return;

            let first = selectedFormsts[0];
            let last = selectedFormsts[selectedFormsts.length - 1];
            const firstPath = this.util.getNodePath(range.startContainer, first, null);
            const lastPath = this.util.getNodePath(range.endContainer, last, null);
            
            // remove list
            let rangeArr = {};
            let listFirst = false;
            let listLast = false;
            const passComponent = function (current) { return !this.isComponent(current); }.bind(this.util);

            for (let i = 0, len = selectedFormsts.length, r, o, lastIndex, isList; i < len; i++) {
                lastIndex = i === len - 1;
                o = this.util.getRangeFormatElement(selectedFormsts[i], passComponent);
                isList = this.util.isList(o);
                if (!r && isList) {
                    r = o;
                    rangeArr = {r: r, f: [this.util.getParentElement(selectedFormsts[i], 'LI')]};
                    if (i === 0) listFirst = true;
                } else if (r && isList) {
                    if (r !== o) {
                        const edge = this.detachRangeFormatElement(rangeArr.r, rangeArr.f, null, false, true);
                        if (listFirst) {
                            first = edge.sc;
                            listFirst = false;
                        }
                        if (lastIndex) last = edge.ec;

                        if (isList) {
                            r = o;
                            rangeArr = {r: r, f: [this.util.getParentElement(selectedFormsts[i], 'LI')]};
                            if (lastIndex) listLast = true;
                        } else {
                            r = null;
                        }
                    } else {
                        rangeArr.f.push(this.util.getParentElement(selectedFormsts[i], 'LI'));
                        if (lastIndex) listLast = true;
                    }
                }

                if (lastIndex && this.util.isList(r)) {
                    const edge = this.detachRangeFormatElement(rangeArr.r, rangeArr.f, null, false, true);
                    if (listLast || len === 1) {
                        last = edge.ec;
                        if (listFirst) first = edge.sc || last;
                    }
                }
            }

            // change format tag
            this.setRange(this.util.getNodeFromPath(firstPath, first), startOffset, this.util.getNodeFromPath(lastPath, last), endOffset);
            selectedFormsts = this.getSelectedElementsAndComponents();
            for (let i = 0, len = selectedFormsts.length, node, newFormat; i < len; i++) {
                node = selectedFormsts[i];
                
                if (node.nodeName.toLowerCase() !== value.toLowerCase() && !this.util.isComponent(node)) {
                    newFormat = tag.cloneNode(false);
                    this.util.copyFormatAttributes(newFormat, node);
                    newFormat.innerHTML = node.innerHTML;

                    node.parentNode.insertBefore(newFormat, node);
                    this.util.removeItem(node);
                }

                if (i === 0) first = newFormat || node;
                if (i === len - 1) last = newFormat || node;
                newFormat = null;
            }

            this.setRange(this.util.getNodeFromPath(firstPath, first), startOffset, this.util.getNodeFromPath(lastPath, last), endOffset);
            
            // history stack
            this.history.push(false);
        }

        this.submenuOff();
    }
});


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_colorPicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'hiliteColor',
    add: function (core, targetElement) {
        core.addModule([_modules_colorPicker__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]]);

        const context = core.context;
        context.hiliteColor = {
            previewEl: null,
            colorInput: null,
            colorList: null
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);
        context.hiliteColor.colorInput = listDiv.querySelector('._se_color_picker_input');

        /** add event listeners */
        context.hiliteColor.colorInput.addEventListener('keyup', this.onChangeInput.bind(core));
        listDiv.querySelector('._se_color_picker_submit').addEventListener('click', this.submit.bind(core));
        listDiv.querySelector('._se_color_picker_remove').addEventListener('click', this.remove.bind(core));
        listDiv.addEventListener('click', this.pickup.bind(core));

        context.hiliteColor.colorList = listDiv.querySelectorAll('li button');

        /** append html */
        targetElement.parentNode.appendChild(listDiv);

        /** empty memory */
        listDiv = null;
    },

    setSubmenu: function () {
        const colorArea = this.context.colorPicker.colorListHTML;
        const listDiv = this.util.createElement('DIV');

        listDiv.className = 'se-submenu se-list-layer';
        listDiv.innerHTML = colorArea;

        return listDiv;
    },

    on: function () {
        const contextPicker = this.context.colorPicker;
        const contextHiliteColor = this.context.hiliteColor;

        contextPicker._colorInput = contextHiliteColor.colorInput;
        contextPicker._defaultColor = '#FFFFFF';
        contextPicker._styleProperty = 'backgroundColor';
        contextPicker._colorList = contextHiliteColor.colorList;
        
        this.plugins.colorPicker.init.call(this, this.getSelectionNode(), null);
    },

    onChangeInput: function (e) {
        this.plugins.colorPicker.setCurrentColor.call(this, e.target.value);
    },

    submit: function () {
        this.plugins.hiliteColor.applyColor.call(this, this.context.colorPicker._currentColor);
    },

    pickup: function (e) {
        e.preventDefault();
        e.stopPropagation();

        this.plugins.hiliteColor.applyColor.call(this, e.target.getAttribute('data-value'));
    },

    remove: function () {
        this.nodeChange(null, ['background-color'], ['span'], true);
        this.submenuOff();
    },

    applyColor: function (color) {
        if (!color) return;
        
        const newNode = this.util.createElement('SPAN');
        newNode.style.backgroundColor = color;
        this.nodeChange(newNode, ['background-color'], null, null);
        
        this.submenuOff();
    }
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'horizontalRule',
    add: function (core, targetElement) {
        /** set submenu */
        let listDiv = this.setSubmenu.call(core);

        /** add event listeners */
        listDiv.querySelector('ul').addEventListener('click', this.horizontalRulePick.bind(core));

        /** append html */
        targetElement.parentNode.appendChild(listDiv);

        /** empty memory */
        listDiv = null;
    },

    setSubmenu: function () {
        const lang = this.lang;
        const listDiv = this.util.createElement('DIV');

        listDiv.className = 'se-submenu se-list-layer';
        listDiv.innerHTML = '' +
            '<div class="se-list-inner se-list-line">' +
                '<ul class="se-list-basic">' +
                    '<li>' +
                        '<button type="button" class="se-btn-list btn_line se-tooltip" data-command="horizontalRule" data-value="solid">' +
                            '<hr style="border-width: 1px 0 0; border-style: solid none none; border-color: black; border-image: initial; height: 1px;" />' +
                            '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.toolbar.hr_solid + '</span></span>' +
                        '</button>' +
                    '</li>' +
                    '<li>' +
                        '<button type="button" class="se-btn-list btn_line se-tooltip" data-command="horizontalRule" data-value="dotted">' +
                            '<hr style="border-width: 1px 0 0; border-style: dotted none none; border-color: black; border-image: initial; height: 1px;" />' +
                            '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.toolbar.hr_dotted + '</span></span>' +
                        '</button>' +
                    '</li>' +
                    '<li>' +
                        '<button type="button" class="se-btn-list btn_line se-tooltip" data-command="horizontalRule" data-value="dashed">' +
                            '<hr style="border-width: 1px 0 0; border-style: dashed none none; border-color: black; border-image: initial; height: 1px;" />' +
                            '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.toolbar.hr_dashed + '</span></span>' +
                        '</button>' +
                    '</li>' +
                '</ul>' +
            '</div>';

        return listDiv;
    },

    appendHr: function (className) {
        const oHr = this.util.createElement('HR');
        oHr.className = className;
        this.focus();

        let oNode = this.insertComponent(oHr, false);
        this.setRange(oNode, 0, oNode, 0);
    },

    horizontalRulePick: function (e) {
        e.preventDefault();
        e.stopPropagation();

        let target = e.target;
        let value = null;
        
        while (!value && !/UL/i.test(target.tagName)) {
            value = target.getAttribute('data-value');
            target = target.parentNode;
        }

        if (!value) return;

        this.plugins.horizontalRule.appendHr.call(this, '__se__' + value);

        this.submenuOff();
    }
});


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 20197 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'lineHeight',
    add: function (core, targetElement) {
        const context = core.context;
        context.lineHeight = {
            _sizeList: null,
            currentSize: -1
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);
        let listUl = listDiv.querySelector('ul');

        /** add event listeners */
        listUl.addEventListener('click', this.pickup.bind(core));

        context.lineHeight._sizeList = listUl.querySelectorAll('li button');

        /** append html */
        targetElement.parentNode.appendChild(listDiv);

        /** empty memory */
        listDiv = null, listUl = null;
    },

    setSubmenu: function () {
        const option = this.context.option;
        const lang = this.lang;
        const listDiv = this.util.createElement('DIV');

        listDiv.className = 'se-submenu se-list-layer';

        const sizeList = !option.lineHeights ? [
            {text: '1', value: 1},
            {text: '1.15', value: 1.15},
            {text: '1.5', value: 1.5},
            {text: '2', value: 2}
        ] : option.lineHeights;

        let list = '<div class="se-list-inner">' +
                '<ul class="se-list-basic">' +
                    '<li><button type="button" class="default_value se-btn-list" title="' + lang.toolbar.default + '">(' + lang.toolbar.default + ')</button></li>';
        for (let i = 0, len = sizeList.length, text, size; i < len; i++) {
            size = sizeList[i];
            list += '<li><button type="button" class="se-btn-list" data-value="' + size.value + '" title="' + size.text + '">' + size.text + '</button></li>';
        }
        list += '</ul></div>';

        listDiv.innerHTML = list;

        return listDiv;
    },

    on: function () {
        const lineHeightContext = this.context.lineHeight;
        const sizeList = lineHeightContext._sizeList;
        const currentSize = this.util.getFormatElement(this.getSelectionNode()).style.lineHeight + '';

        if (currentSize !== lineHeightContext.currentSize) {
            for (let i = 0, len = sizeList.length; i < len; i++) {
                if (currentSize === sizeList[i].getAttribute('data-value')) {
                    this.util.addClass(sizeList[i], 'active');
                } else {
                    this.util.removeClass(sizeList[i], 'active');
                }
            }

            lineHeightContext.currentSize = currentSize;
        }
    },

    pickup: function (e) {
        if (!/^BUTTON$/i.test(e.target.tagName)) return false;
        
        e.preventDefault();
        e.stopPropagation();

        const value = e.target.getAttribute('data-value') || '';
        const formats = this.getSelectedElements();

        for (let i = 0, len = formats.length; i < len; i++) {
            formats[i].style.lineHeight = value;
        }

        this.submenuOff();

        // history stack
        this.history.push(false);
    }
});


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'list',
    add: function (core, targetElement) {
        const context = core.context;
        context.list = {
            _list: null,
            currentList: ''
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);
        let listUl = listDiv.querySelector('ul');

        /** add event listeners */
        listUl.addEventListener('click', this.pickup.bind(core));

        context.list._list = listUl.querySelectorAll('li button');

        /** append html */
        targetElement.parentNode.appendChild(listDiv);

        /** empty memory */
        listDiv = null, listUl = null;
    },

    setSubmenu: function () {
        const lang = this.lang;
        const listDiv = this.util.createElement('DIV');

        listDiv.className = 'se-submenu se-list-layer';
        listDiv.innerHTML = '' +
            '<div class="se-list-inner">' +
                '<ul class="se-list-basic">' +
                    '<li><button type="button" class="se-btn-list se-tooltip" data-command="OL">' +
                        '<i class="se-icon-list-number"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.toolbar.orderList + '</span></span>' +
                    '</button></li>' +
                    '<li><button type="button" class="se-btn-list se-tooltip" data-command="UL">' +
                        '<i class="se-icon-list-bullets"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.toolbar.unorderList + '</span></span>' +
                    '</button></li>' +
                '</ul>' +
            '</div>';

        return listDiv;
    },

    on: function () {
        const listContext = this.context.list;
        const list = listContext._list;
        const currentList = this.commandMap.LI.getAttribute('data-focus') || '';

        if (currentList !== listContext.currentList) {
            for (let i = 0, len = list.length; i < len; i++) {
                if (currentList === list[i].getAttribute('data-command')) {
                    this.util.addClass(list[i], 'active');
                } else {
                    this.util.removeClass(list[i], 'active');
                }
            }

            listContext.currentList = currentList;
        }
    },

    pickup: function (e) {
        e.preventDefault();
        e.stopPropagation();

        let target = e.target;
        let command = '';

        while (!command && !/^UL$/i.test(target.tagName)) {
            command = target.getAttribute('data-command');
            target = target.parentNode;
        }

        if (!command) return;

        const selectedFormsts = this.getSelectedElementsAndComponents();
        if (!selectedFormsts || selectedFormsts.length === 0) return;

        let isRemove = true;
        let edgeFirst = null;
        let edgeLast = null;
        
        // merge
        const firstSel = selectedFormsts[0];
        const lastSel = selectedFormsts[selectedFormsts.length - 1];
        let topEl = (this.util.isListCell(firstSel) || this.util.isComponent(firstSel)) && !firstSel.previousElementSibling ? firstSel.parentNode.previousElementSibling : firstSel.previousElementSibling;
        let bottomEl = (this.util.isListCell(lastSel) || this.util.isComponent(lastSel)) && !lastSel.nextElementSibling ? lastSel.parentNode.nextElementSibling : lastSel.nextElementSibling;

        for (let i = 0, len = selectedFormsts.length; i < len; i++) {
            if (!this.util.isList(this.util.getRangeFormatElement(selectedFormsts[i], function (current) {
                return this.getRangeFormatElement(current) && current !== selectedFormsts[i];
            }.bind(this.util)))) {
                isRemove = false;
                break;
            }
        }

        if (isRemove && (!topEl || command !== topEl.tagName) && (!bottomEl || command !== bottomEl.tagName)) {
            const currentFormat = this.util.getRangeFormatElement(this.getSelectionNode());
            const cancel = currentFormat && currentFormat.tagName === command;
            let rangeArr, tempList;
            const passComponent = function (current) {
                return !this.isComponent(current);
            }.bind(this.util);

            if (!cancel) tempList = this.util.createElement(command);

            for (let i = 0, len = selectedFormsts.length, r, o; i < len; i++) {
                o = this.util.getRangeFormatElement(selectedFormsts[i], passComponent);
                if (!o || !this.util.isList(o)) continue;

                if (!r) {
                    r = o;
                    rangeArr = {r: r, f: [this.util.getParentElement(selectedFormsts[i], 'LI')]};
                } else {
                    if (r !== o) {
                        const edge = this.detachRangeFormatElement(rangeArr.r, rangeArr.f, tempList, false, true);
                        if (!edgeFirst) edgeFirst = edge;
                        if (!cancel) tempList = this.util.createElement(command);
                        r = o;
                        rangeArr = {r: r, f: [this.util.getParentElement(selectedFormsts[i], 'LI')]};
                    } else {
                        rangeArr.f.push(this.util.getParentElement(selectedFormsts[i], 'LI'));
                    }
                }

                if (i === len - 1) {
                    edgeLast = this.detachRangeFormatElement(rangeArr.r, rangeArr.f, tempList, false, true);
                    if (!edgeFirst) edgeFirst = edgeLast;
                }
            }
        } else {
            const topElParent = topEl ? topEl.parentNode : topEl;
            const bottomElParent = bottomEl ? bottomEl.parentNode : bottomEl;
            topEl = topElParent && !this.util.isWysiwygDiv(topElParent) && topElParent.nodeName === command ? topElParent : topEl;
            bottomEl = bottomElParent && !this.util.isWysiwygDiv(bottomElParent) && bottomElParent.nodeName === command ? bottomElParent : bottomEl;

            const mergeTop = topEl && topEl.tagName === command;
            const mergeBottom = bottomEl && bottomEl.tagName === command;
            
            let list = mergeTop ? topEl : this.util.createElement(command);
            let firstList = null;
            let lastList = null;
            let topNumber = null;
            let bottomNumber = null;

            const passComponent = function (current) {
                return !this.isComponent(current) && !this.isList(current);
            }.bind(this.util);
            
            for (let i = 0, len = selectedFormsts.length, newCell, fTag, isCell, next, originParent, nextParent, parentTag, siblingTag, rangeTag; i < len; i++) {
                fTag = selectedFormsts[i];
                if (fTag.childNodes.length === 0 && !this.util.isIgnoreNodeChange(fTag)) {
                    this.util.removeItem(fTag);
                    continue;
                }
                next = selectedFormsts[i + 1];
                originParent = fTag.parentNode;
                nextParent = next ? next.parentNode : null;
                isCell = this.util.isListCell(fTag);
                rangeTag = this.util.isRangeFormatElement(originParent) ? originParent : null;
                parentTag = isCell && !this.util.isWysiwygDiv(originParent) ? originParent.parentNode : originParent;
                siblingTag = isCell && !this.util.isWysiwygDiv(originParent) ? !next ? originParent : originParent.nextSibling : fTag.nextSibling;

                newCell = this.util.createElement('LI');
                this.util.copyFormatAttributes(newCell, fTag);
                if (this.util.isComponent(fTag)) {
                    const isHR = /^HR$/i.test(fTag.nodeName);
                    if (!isHR) newCell.innerHTML = '<br>';
                    newCell.innerHTML += fTag.outerHTML;
                    if (isHR) newCell.innerHTML += '<br>';
                } else {
                    newCell.innerHTML = fTag.innerHTML;
                }
                list.appendChild(newCell);

                if (!next) lastList = list;
                if (!next || parentTag !== nextParent || this.util.isRangeFormatElement(siblingTag)) {
                    if (!firstList) firstList = list;
                    if ((!mergeTop || !next || parentTag !== nextParent) && !(next && this.util.isList(nextParent) && nextParent === originParent)) {
                        if (list.parentNode !== parentTag) parentTag.insertBefore(list, siblingTag);
                    }
                }

                this.util.removeItem(fTag);
                if (mergeTop && topNumber === null) topNumber = list.children.length - 1;
                if (next && this.util.getRangeFormatElement(nextParent, passComponent) !== this.util.getRangeFormatElement(originParent, passComponent)) {
                    list = this.util.createElement(command);
                }

                if (rangeTag && rangeTag.children.length === 0) this.util.removeItem(rangeTag);
            }

            if (topNumber) {
                firstList = firstList.children[topNumber];
            }

            if (mergeBottom) {
                bottomNumber = list.children.length - 1;
                list.innerHTML += bottomEl.innerHTML;
                lastList = list.children[bottomNumber];
                this.util.removeItem(bottomEl);
            }

            edgeFirst = edgeLast = this.util.getEdgeChildNodes(firstList.firstChild, lastList.lastChild);
        }

        if (selectedFormsts.length > 1) {
            this.setRange(edgeFirst.sc, 0, edgeLast.ec, edgeLast.ec.textContent.length);
        } else {
            this.setRange(edgeFirst.ec, edgeFirst.ec.textContent.length, edgeLast.ec, edgeLast.ec.textContent.length);
        }

        this.submenuOff();

        // history stack
        this.history.push(false);
    }
});


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'paragraphStyle',
    add: function (core, targetElement) {
        const context = core.context;
        context.paragraphStyle = {
            _classList: null
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);

        /** add event listeners */
        listDiv.querySelector('ul').addEventListener('click', this.pickUp.bind(core));

        context.paragraphStyle._classList = listDiv.querySelectorAll('li button');

        /** append html */
        targetElement.parentNode.appendChild(listDiv);

        /** empty memory */
        listDiv = null;
    },

    setSubmenu: function () {
        const option = this.context.option;
        const listDiv = this.util.createElement('DIV');
        listDiv.className = 'se-submenu se-list-layer';

        const menuLang = this.lang.menu;
        const defaultList = {
            spaced: {
                name: menuLang.spaced,
                class: '__se__p-spaced',
                _class: ''
            },
            bordered: {
                name: menuLang.bordered,
                class: '__se__p-bordered',
                _class: ''
            },
            neon: {
                name: menuLang.neon,
                class: '__se__p-neon',
                _class: ''
            }
        };
        const paragraphStyles = !option.paragraphStyles || option.paragraphStyles.length === 0 ? ['spaced', 'bordered', 'neon'] : option.paragraphStyles;

        let list = '<div class="se-list-inner"><ul class="se-list-basic se-list-format">';
        for (let i = 0, len = paragraphStyles.length, p, name, attrs, _class; i < len; i++) {
            p = paragraphStyles[i];

            if (typeof p === 'string') {
                const defaultStyle = defaultList[p.toLowerCase()];
                if (!defaultStyle) continue;
                p = defaultStyle;
            }

            name = p.name;
            attrs = p.class ? ' class="' + p.class + '"' : '';
            _class = p._class;

            list += '<li>' +
                '<button type="button" class="se-btn-list' + (_class ? ' ' + _class: '') + '" data-value="' + p.class + '" title="' + name + '">' +
                    '<div' + attrs + '>' + name + '</div>' +
                '</button></li>';
        }
        list += '</ul></div>';

        listDiv.innerHTML = list;

        return listDiv;
    },

    on: function () {
        const paragraphContext = this.context.paragraphStyle;
        const paragraphList = paragraphContext._classList;
        const currentFormat = this.util.getFormatElement(this.getSelectionNode());

        for (let i = 0, len = paragraphList.length; i < len; i++) {
            if (this.util.hasClass(currentFormat, paragraphList[i].getAttribute('data-value'))) {
                this.util.addClass(paragraphList[i], 'active');
            } else {
                this.util.removeClass(paragraphList[i], 'active');
            }
        }
    },

    pickUp: function (e) {
        e.preventDefault();
        e.stopPropagation();

        let target = e.target;
        let value = null;
        
        while (!/^UL$/i.test(target.tagName)) {
            value = target.getAttribute('data-value');
            if (value) break;
            target = target.parentNode;
        }

        if (!value) return;

        let selectedFormsts = this.getSelectedElements();
        if (selectedFormsts.length === 0) return;

        // change format class
        const toggleClass = this.util.hasClass(target, 'active') ? this.util.removeClass.bind(this.util) : this.util.addClass.bind(this.util);
        selectedFormsts = this.getSelectedElements();
        
        for (let i = 0, len = selectedFormsts.length; i < len; i++) {
            toggleClass(selectedFormsts[i], value);
        }

        this.submenuOff();

        // history stack
        this.history.push(false);
    }
});


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'table',
    add: function (core, targetElement) {
        const context = core.context;
        context.table = {
            _element: null,
            _tdElement: null,
            _trElement: null,
            _trElements: null,
            _tableXY: [],
            _maxWidth: true,
            resizeIcon: null,
            resizeText: null,
            headerButton: null,
            mergeButton: null,
            splitButton: null,
            splitMenu: null,
            maxText: core.lang.controller.maxSize,
            minText: core.lang.controller.minSize,
            _physical_cellCnt: 0,
            _logical_cellCnt: 0,
            _rowCnt: 0,
            _rowIndex: 0,
            _physical_cellIndex: 0,
            _logical_cellIndex: 0,
            _current_colSpan: 0,
            _current_rowSpan: 0
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);
        let tablePicker = listDiv.querySelector('.se-controller-table-picker');

        context.table.tableHighlight = listDiv.querySelector('.se-table-size-highlighted');
        context.table.tableUnHighlight = listDiv.querySelector('.se-table-size-unhighlighted');
        context.table.tableDisplay = listDiv.querySelector('.se-table-size-display');

        /** set table controller */
        let tableController = this.setController_table.call(core);
        context.table.tableController = tableController;
        context.table.resizeIcon = tableController.querySelector('._se_table_resize > i');
        context.table.resizeText = tableController.querySelector('._se_table_resize > span > span');
        context.table.headerButton = tableController.querySelector('._se_table_header');
        tableController.addEventListener('mousedown', function (e) { e.stopPropagation(); }, false);

        /** set resizing */
        let resizeDiv = this.setController_tableEditor.call(core);
        context.table.resizeDiv = resizeDiv;
        context.table.splitMenu = resizeDiv.querySelector('.se-btn-group-sub');
        context.table.mergeButton = resizeDiv.querySelector('._se_table_merge_button');
        context.table.splitButton = resizeDiv.querySelector('._se_table_split_button');
        resizeDiv.addEventListener('mousedown', function (e) { e.stopPropagation(); }, false);
        
        /** add event listeners */
        tablePicker.addEventListener('mousemove', this.onMouseMove_tablePicker.bind(core));
        tablePicker.addEventListener('click', this.appendTable.bind(core));
        resizeDiv.addEventListener('click', this.onClick_tableController.bind(core));
        tableController.addEventListener('click', this.onClick_tableController.bind(core));

        /** append html */
        targetElement.parentNode.appendChild(listDiv);
        context.element.relative.appendChild(resizeDiv);
        context.element.relative.appendChild(tableController);

        /** empty memory */
        listDiv = null, tablePicker = null, resizeDiv = null, tableController = null;
    },

    setSubmenu: function () {
        const listDiv = this.util.createElement('DIV');
        listDiv.className = 'se-submenu se-selector-table';
        listDiv.innerHTML = '' +
            '<div class="se-table-size">' +
                '<div class="se-table-size-picker se-controller-table-picker"></div>' +
                '<div class="se-table-size-highlighted"></div>' +
                '<div class="se-table-size-unhighlighted"></div>' +
            '</div>' +
            '<div class="se-table-size-display">1 x 1</div>';

        return listDiv;
    },

    setController_table: function () {
        const lang = this.lang;
        const tableResize = this.util.createElement('DIV');

        tableResize.className = 'se-controller se-controller-table';
        tableResize.innerHTML = '' +
            '<div>' +
                '<div class="se-btn-group">' +
                    '<button type="button" data-command="resize" class="se-tooltip _se_table_resize">' +
                        '<i class="se-icon-expansion"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.maxSize + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="header" class="se-tooltip _se_table_header">' +
                        '<i class="se-icon-table-header"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.tableHeader + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="remove" class="se-tooltip">' +
                        '<i class="se-icon-delete"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.remove + '</span></span>' +
                    '</button>' +
                '</div>' +
            '</div>';

        return tableResize;
    },

    setController_tableEditor: function () {
        const lang = this.lang;
        const tableResize = this.util.createElement('DIV');

        tableResize.className = 'se-controller se-controller-table-cell';
        tableResize.innerHTML = '' +
            '<div class="se-arrow se-arrow-up"></div>' +
            '<div>' +
                '<div class="se-btn-group">' +
                    '<button type="button" data-command="insert" data-value="row" data-option="up" class="se-tooltip">' +
                        '<i class="se-icon-insert-row-above"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.insertRowAbove + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="insert" data-value="row" data-option="down" class="se-tooltip">' +
                        '<i class="se-icon-insert-row-below"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.insertRowBelow + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="delete" data-value="row" class="se-tooltip">' +
                        '<i class="se-icon-delete-row"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.deleteRow + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="merge" class="_se_table_merge_button se-tooltip" disabled>' +
                        '<i class="se-icon-merge-cell"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.mergeCells + '</span></span>' +
                    '</button>' +
                '</div>' +
            '</div>' +
            '<div>' +
                '<div class="se-btn-group">' +
                    '<button type="button" data-command="insert" data-value="cell" data-option="left" class="se-tooltip">' +
                        '<i class="se-icon-insert-column-left"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.insertColumnBefore + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="insert" data-value="cell" data-option="right" class="se-tooltip">' +
                        '<i class="se-icon-insert-column-right"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.insertColumnAfter + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="delete" data-value="cell" class="se-tooltip">' +
                        '<i class="se-icon-delete-column"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.deleteColumn + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="onsplit" class="_se_table_split_button se-tooltip">' +
                        '<i class="se-icon-split-cell"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.splitCells + '</span></span>' +
                    '</button>' +
                    '<div class="se-btn-group-sub sun-editor-common se-list-layer">' +
                        '<div class="se-list-inner">' +
                            '<ul class="se-list-basic">' +
                                '<li class="se-btn-list" data-command="split" data-value="vertical" style="line-height:32px;" title="' + lang.controller.VerticalSplit + '">' + 
                                    lang.controller.VerticalSplit + '</li>' +
                                '<li class="se-btn-list" data-command="split" data-value="horizontal" style="line-height:32px;" title="' + lang.controller.HorizontalSplit + '">' + 
                                    lang.controller.HorizontalSplit + '</li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        return tableResize;
    },

    appendTable: function () {
        const oTable = this.util.createElement('TABLE');
        const createCells = this.plugins.table.createCells;

        const x = this.context.table._tableXY[0];
        let y = this.context.table._tableXY[1];
        let tableHTML = '<tbody>';
        while (y > 0) {
            tableHTML += '<tr>' + createCells.call(this, 'td', x) + '</tr>';
            --y;
        }
        tableHTML += '</tbody>';
        oTable.innerHTML = tableHTML;

        this.insertComponent(oTable, false);
        
        const firstTd = oTable.querySelector('td div');
        this.setRange(firstTd, 0, firstTd, 0);
        this.plugins.table.reset_table_picker.call(this);
    },

    createCells: function (nodeName, cnt, returnElement) {
        nodeName = nodeName.toLowerCase();

        if (!returnElement) {
            let cellsHTML = '';
            while (cnt > 0) {
                cellsHTML += '<' +nodeName + '><div><br></div></' + nodeName + '>';
                cnt--;
            }
            return cellsHTML;
        } else {
            const cell = this.util.createElement(nodeName);
            cell.innerHTML = '<div><br></div>';
            return cell;
        }
    },

    onMouseMove_tablePicker: function (e) {
        e.stopPropagation();

        let x = this._w.Math.ceil(e.offsetX / 18);
        let y = this._w.Math.ceil(e.offsetY / 18);
        x = x < 1 ? 1 : x;
        y = y < 1 ? 1 : y;
        this.context.table.tableHighlight.style.width = x + 'em';
        this.context.table.tableHighlight.style.height = y + 'em';

        let x_u = x < 5 ? 5 : (x > 9 ? 10 : x + 1);
        let y_u = y < 5 ? 5 : (y > 9 ? 10 : y + 1);
        this.context.table.tableUnHighlight.style.width = x_u + 'em';
        this.context.table.tableUnHighlight.style.height = y_u + 'em';

        this.util.changeTxt(this.context.table.tableDisplay, x + ' x ' + y);
        this.context.table._tableXY = [x, y];
    },

    reset_table_picker: function () {
        if (!this.context.table.tableHighlight) return;

        const highlight = this.context.table.tableHighlight.style;
        const unHighlight = this.context.table.tableUnHighlight.style;

        highlight.width = '1em';
        highlight.height = '1em';
        unHighlight.width = '5em';
        unHighlight.height = '5em';

        this.util.changeTxt(this.context.table.tableDisplay, '1 x 1');
        this.submenuOff();
    },

    init: function () {
        const contextTable = this.context.table;
        const tablePlugin = this.plugins.table;

        tablePlugin._removeEvents.call(this);

        if (tablePlugin._selectedTable) {
            const selectedCells = tablePlugin._selectedTable.querySelectorAll('.se-table-selected-cell');
            for (let i = 0, len = selectedCells.length; i < len; i++) {
                this.util.removeClass(selectedCells[i], 'se-table-selected-cell');
            }
        }

        tablePlugin._toggleEditor.call(this, true);

        contextTable._element = null;
        contextTable._tdElement = null;
        contextTable._trElement = null;
        contextTable._trElements = null;
        contextTable._tableXY = [];
        contextTable._maxWidth = true;
        contextTable._physical_cellCnt = 0;
        contextTable._logical_cellCnt = 0;
        contextTable._rowCnt = 0;
        contextTable._rowIndex = 0;
        contextTable._physical_cellIndex = 0;
        contextTable._logical_cellIndex = 0;
        contextTable._current_colSpan = 0;
        contextTable._current_rowSpan = 0;

        tablePlugin._shift = false;
        tablePlugin._selectedCells = null;
        tablePlugin._selectedTable = null;
        tablePlugin._ref = null;

        tablePlugin._fixedCell = null;
        tablePlugin._selectedCell = null;
        tablePlugin._fixedCellName = null;
    },

    /** table edit controller */
    call_controller_tableEdit: function (tdElement) {
        const contextTable = this.context.table;
        const tablePlugin = this.plugins.table;
        const tableController = contextTable.tableController;
        
        tablePlugin.setPositionControllerDiv.call(this, tdElement, tablePlugin._shift);

        const tableElement = contextTable._element;
        const offset = this.util.getOffset(tableElement, this.context.element.wysiwygFrame);

        contextTable._maxWidth = !tableElement.style.width || tableElement.style.width === '100%';
        tablePlugin.resizeTable.call(this);
        tableController.style.left = offset.left + 'px';
        tableController.style.display = 'block';
        tableController.style.top = (offset.top - tableController.offsetHeight - 2) + 'px';

        if (!tablePlugin._shift) this.controllersOn(contextTable.resizeDiv, tableController, tablePlugin.init.bind(this));
    },

    setPositionControllerDiv: function (tdElement, reset) {
        const contextTable = this.context.table;
        const resizeDiv = contextTable.resizeDiv;
        
        this.plugins.table.setCellInfo.call(this, tdElement, reset);

        resizeDiv.style.display = 'block';

        const offset = this.util.getOffset(tdElement, this.context.element.wysiwygFrame);
        resizeDiv.style.left = (offset.left - this.context.element.wysiwygFrame.scrollLeft) + 'px';
        resizeDiv.style.top = (offset.top + tdElement.offsetHeight + 12) + 'px';

        const overLeft = this.context.element.wysiwygFrame.offsetWidth - (resizeDiv.offsetLeft + resizeDiv.offsetWidth);
        if (overLeft < 0) {
            resizeDiv.style.left = (resizeDiv.offsetLeft + overLeft) + 'px';
            resizeDiv.firstElementChild.style.left = (20 - overLeft) + 'px';
        } else {
            resizeDiv.firstElementChild.style.left = '20px';
        }
    },

    setCellInfo: function (tdElement, reset) {
        const contextTable = this.context.table;
        const table = contextTable._element = this.plugins.table._selectedTable || this.util.getParentElement(tdElement, 'TABLE');

        if (/THEAD/i.test(table.firstElementChild.nodeName)) {
            this.util.addClass(contextTable.headerButton, 'active');
        } else {
            this.util.removeClass(contextTable.headerButton, 'active');
        }

        if (reset || contextTable._physical_cellCnt === 0) {
            if (contextTable._tdElement !== tdElement) {
                contextTable._tdElement = tdElement;
                contextTable._trElement = tdElement.parentNode;
            }

            const rows = contextTable._trElements = table.rows;
            const cellIndex = tdElement.cellIndex;

            let cellCnt = 0;
            for (let i = 0, cells = rows[0].cells, len = rows[0].cells.length; i < len; i++) {
                cellCnt += cells[i].colSpan;
            }

            // row cnt, row index
            const rowIndex = contextTable._rowIndex = contextTable._trElement.rowIndex;
            contextTable._rowCnt = rows.length;

            // cell cnt, physical cell index
            contextTable._physical_cellCnt = contextTable._trElement.cells.length;
            contextTable._logical_cellCnt = cellCnt;
            contextTable._physical_cellIndex = cellIndex;

            // span
            contextTable._current_colSpan = contextTable._tdElement.colSpan - 1;
            contextTable._current_rowSpan - contextTable._trElement.cells[cellIndex].rowSpan - 1;

            // find logcal cell index
            let rowSpanArr = [];
            let spanIndex = [];
            for (let i = 0, cells, colSpan; i <= rowIndex; i++) {
                cells = rows[i].cells;
                colSpan = 0;
                for (let c = 0, cLen = cells.length, cell, cs, rs, logcalIndex; c < cLen; c++) {
                    cell = cells[c];
                    cs = cell.colSpan - 1;
                    rs = cell.rowSpan - 1;
                    logcalIndex = c + colSpan;

                    if (spanIndex.length > 0) {
                        for (let r = 0, arr; r < spanIndex.length; r++) {
                            arr = spanIndex[r];
                            if (arr.row > i) continue;
                            if (logcalIndex >= arr.index) {
                                colSpan += arr.cs;
                                logcalIndex += arr.cs;
                                arr.rs -= 1;
                                arr.row = i + 1;
                                if (arr.rs < 1) {
                                    spanIndex.splice(r, 1);
                                    r--;
                                }  
                            } else if (c === cLen - 1) {
                                arr.rs -= 1;
                                arr.row = i + 1;
                                if (arr.rs < 1) {
                                    spanIndex.splice(r, 1);
                                    r--;
                                }
                            }
                        }
                    }

                    // logcal cell index
                    if (i === rowIndex && c === cellIndex) {
                        contextTable._logical_cellIndex = logcalIndex;
                        break;
                    }

                    if (rs > 0) {
                        rowSpanArr.push({
                            index: logcalIndex,
                            cs: cs + 1,
                            rs: rs,
                            row: -1
                        });
                    }
                    
                    colSpan += cs;
                }

                spanIndex = spanIndex.concat(rowSpanArr).sort(function (a, b) {return a.index - b.index;});
                rowSpanArr = [];
            }

            rowSpanArr = null;
            spanIndex = null;
        }
    },

    editTable: function (type, option) {
        const tablePlugin = this.plugins.table;
        const contextTable = this.context.table;
        const table = contextTable._element;
        const isRow = type === 'row';

        if (isRow) {
            const tableAttr = contextTable._trElement.parentNode;
            if (/^THEAD$/i.test(tableAttr.nodeName)) {
                if (option === 'up') {
                    return;
                } else if (!tableAttr.nextElementSibling || !/^TBODY$/i.test(tableAttr.nextElementSibling.nodeName)) {
                    table.innerHTML += '<tbody><tr>' + tablePlugin.createCells.call(this, 'td', contextTable._logical_cellCnt, false) + '</tr></tbody>';
                    return;
                }
            }
        }

        // multi
        if (tablePlugin._ref) {
            const positionCell = contextTable._tdElement;
            const selectedCells = tablePlugin._selectedCells;
            // multi - row
            if (isRow) {
                // remove row
                if (!option) {
                    let row = selectedCells[0].parentNode;
                    const removeCells = [selectedCells[0]];

                    for (let i = 1, len = selectedCells.length, cell; i < len; i++) {
                        cell = selectedCells[i];
                        if (row !== cell.parentNode) {
                            removeCells.push(cell);
                            row = cell.parentNode;
                        }
                    }

                    for (let i = 0, len = removeCells.length; i < len; i++) {
                        tablePlugin.setCellInfo.call(this, removeCells[i], true);
                        tablePlugin.editRow.call(this, option);
                    }
                } else { // edit row
                    tablePlugin.setCellInfo.call(this, option === 'up' ? selectedCells[0] : selectedCells[selectedCells.length - 1], true);
                    tablePlugin.editRow.call(this, option, positionCell);
                }
            } else { // multi - cell
                const firstRow = selectedCells[0].parentNode;
                // remove cell
                if (!option) {
                    const removeCells = [selectedCells[0]];
                    
                    for (let i = 1, len = selectedCells.length, cell; i < len; i++) {
                        cell = selectedCells[i];
                        if (firstRow === cell.parentNode) {
                            removeCells.push(cell);
                        } else {
                            break;
                        }
                    }

                    for (let i = 0, len = removeCells.length; i < len; i++) {
                        tablePlugin.setCellInfo.call(this, removeCells[i], true);
                        tablePlugin.editCell.call(this, option);
                    }
                } else { // edit cell
                    let rightCell = null;

                    for (let i = 0, len = selectedCells.length - 1; i < len; i++) {
                        if (firstRow !== selectedCells[i + 1].parentNode) {
                            rightCell = selectedCells[i];
                            break;
                        }
                    }

                    tablePlugin.setCellInfo.call(this, option === 'left' ? selectedCells[0] : rightCell || selectedCells[0], true);
                    tablePlugin.editCell.call(this, option, positionCell);
                }
            }

            if (!option) tablePlugin.init.call(this);
        } // one
        else {
            tablePlugin[isRow ? 'editRow' : 'editCell'].call(this, option);
        }

        // after remove
        if (!option) {
            const children = table.children;
            for (let i = 0; i < children.length; i++) {
                if (children[i].children.length === 0) {
                    this.util.removeItem(children[i]);
                    i--;
                }
            }

            if (table.children.length === 0) this.util.removeItem(table);
        }
    },

    editRow: function (option, positionResetElement) {
        const contextTable = this.context.table;
        const remove = !option;

        const up = option === 'up';
        const originRowIndex = contextTable._rowIndex;
        const rowIndex = remove || up ? originRowIndex : originRowIndex + contextTable._current_rowSpan + 1;
        const sign = remove ? -1 : 1;
        
        const rows = contextTable._trElements;
        let cellCnt = contextTable._logical_cellCnt;

        for (let i = 0, len = originRowIndex + (remove ? -1 : 0), cell; i <= len; i++) {
            cell = rows[i].cells;
            if (cell.length === 0) return;
            
            for (let c = 0, cLen = cell.length, rs, cs; c < cLen; c++) {
                rs = cell[c].rowSpan;
                cs = cell[c].colSpan;
                if (rs < 2 && cs < 2) continue;

                if (rs + i > rowIndex && rowIndex > i) {
                    cell[c].rowSpan = rs + sign;
                    cellCnt -= cs;
                }
            }
        }

        if (remove) {
            const next = rows[originRowIndex + 1];
            if (next) {
                const spanCells = [];
                let cells = rows[originRowIndex].cells;
                let colSpan = 0;

                for (let i = 0, len = cells.length, cell, logcalIndex; i < len; i++) {
                    cell = cells[i];
                    logcalIndex = i + colSpan;
                    colSpan += cell.colSpan - 1;

                    if (cell.rowSpan > 1) {
                        cell.rowSpan -= 1;
                        spanCells.push({cell: cell.cloneNode(false), index: logcalIndex});
                    }
                }

                if (spanCells.length > 0) {
                    let spanCell = spanCells.shift();
                    cells = next.cells;
                    colSpan = 0;

                    for (let i = 0, len = cells.length, cell, logcalIndex; i < len; i++) {
                        cell = cells[i];
                        logcalIndex = i + colSpan;
                        colSpan += cell.colSpan - 1;
    
                        if (logcalIndex >= spanCell.index) {
                            i--, colSpan--;
                            colSpan += spanCell.cell.colSpan - 1;
                            next.insertBefore(spanCell.cell, cell);
                            spanCell = spanCells.shift();
                            if (!spanCell) break;
                        }
                    }

                    if (spanCell) {
                        next.appendChild(spanCell.cell);
                        for (let i = 0, len = spanCells.length; i < len; i++) {
                            next.appendChild(spanCells[i].cell);
                        }
                    }
                }
            }

            contextTable._element.deleteRow(rowIndex);
        } else {
            const newRow = contextTable._element.insertRow(rowIndex);
            newRow.innerHTML = this.plugins.table.createCells.call(this, 'td', cellCnt, false);
        }

        if (!remove) {
            this.plugins.table.setPositionControllerDiv.call(this, positionResetElement || contextTable._tdElement, true);
        } else {
            this.controllersOff();
        }
    },

    editCell: function (option, positionResetElement) {
        const contextTable = this.context.table;
        const util = this.util;
        const remove = !option;

        const left = option === 'left';
        const colSpan = contextTable._current_colSpan;
        const cellIndex = remove || left ? contextTable._logical_cellIndex : contextTable._logical_cellIndex + colSpan + 1;

        const rows = contextTable._trElements;
        let rowSpanArr = [];
        let spanIndex = [];
        let passCell = 0;
        const removeCell = [];
        const removeSpanArr = [];

        for (let i = 0, len = contextTable._rowCnt, row, insertIndex, cells, newCell, applySpan, cellColSpan; i < len; i++) {
            row = rows[i];
            insertIndex = cellIndex;
            applySpan = false;
            cells = row.cells;
            cellColSpan = 0;

            for (let c = 0, cell, cLen = cells.length, rs, cs, removeIndex; c < cLen; c++) {
                cell = cells[c];
                if (!cell) break;

                rs = cell.rowSpan - 1;
                cs = cell.colSpan - 1;

                if (!remove) {
                    if (c >= insertIndex) break;
                    if (cs > 0) {
                        if (passCell < 1 && cs + c >= insertIndex) {
                            cell.colSpan += 1;
                            insertIndex = null;
                            passCell = rs + 1;
                            break;
                        }

                        insertIndex -= cs;
                    }

                    if (!applySpan) {
                        for (let r = 0, arr; r < spanIndex.length; r++) {
                            arr = spanIndex[r];
                            insertIndex -= arr.cs;
                            arr.rs -= 1;
                            if (arr.rs < 1) {
                                spanIndex.splice(r, 1);
                                r--;
                            }  
                        }
                        applySpan = true;
                    }
                } else {
                    removeIndex = c + cellColSpan;

                    if (spanIndex.length > 0) {
                        const lastCell = !cells[c + 1];
                        for (let r = 0, arr; r < spanIndex.length; r++) {
                            arr = spanIndex[r];
                            if (arr.row > i) continue;

                            if (removeIndex >= arr.index) {
                                cellColSpan += arr.cs;
                                removeIndex = c + cellColSpan;
                                arr.rs -= 1;
                                arr.row = i + 1;
                                if (arr.rs < 1) {
                                    spanIndex.splice(r, 1);
                                    r--;
                                }  
                            } else if (lastCell) {
                                arr.rs -= 1;
                                arr.row = i + 1;
                                if (arr.rs < 1) {
                                    spanIndex.splice(r, 1);
                                    r--;
                                }
                            }
                        }
                    }

                    if (rs > 0) {
                        rowSpanArr.push({
                            rs: rs,
                            cs: cs + 1,
                            index: removeIndex,
                            row: -1
                        });
                    }

                    if (removeIndex >= insertIndex && removeIndex + cs <= insertIndex + colSpan) {
                        removeCell.push(cell);
                    } else if (removeIndex <= insertIndex + colSpan && removeIndex + cs >= insertIndex) {
                        cell.colSpan -= util.getOverlapRangeAtIndex(cellIndex, cellIndex + colSpan, removeIndex, removeIndex + cs); 
                    } else if (rs > 0 && (removeIndex < insertIndex || removeIndex + cs > insertIndex + colSpan)) {
                        removeSpanArr.push({
                            cell: cell,
                            i: i,
                            rs: i + rs
                        });
                    }

                    cellColSpan += cs;
                }
            }

            spanIndex = spanIndex.concat(rowSpanArr).sort(function (a, b) {return a.index - b.index;});
            rowSpanArr = [];

            if (!remove) {
                if (passCell > 0) {
                    passCell -= 1;
                    continue;
                }

                if (insertIndex !== null && cells.length > 0) {
                    newCell = this.plugins.table.createCells.call(this, cells[0].nodeName, 0, true);
                    newCell = row.insertBefore(newCell, cells[insertIndex]);
                }
            }
        }

        if (remove) {
            let removeFirst, removeEnd;
            for (let r = 0, rLen = removeCell.length, row; r < rLen; r++) {
                row = removeCell[r].parentNode;
                util.removeItem(removeCell[r]);
                if (row.cells.length === 0) {
                    if (!removeFirst) removeFirst = util.getArrayIndex(rows, row);
                    removeEnd = util.getArrayIndex(rows, row);
                    util.removeItem(row);
                }
            }

            for (let c = 0, cLen = removeSpanArr.length, rowSpanCell; c < cLen; c++) {
                rowSpanCell = removeSpanArr[c];
                rowSpanCell.cell.rowSpan = util.getOverlapRangeAtIndex(removeFirst, removeEnd, rowSpanCell.i, rowSpanCell.rs);
            }

            this.controllersOff();
        } else {
            this.plugins.table.setPositionControllerDiv.call(this, positionResetElement || contextTable._tdElement, true);
        }
    },

    _closeSplitMenu: null,
    openSplitMenu: function () {
        this.util.addClass(this.context.table.splitButton, 'on');
        this.context.table.splitMenu.style.display = 'inline-table';

        this.plugins.table._closeSplitMenu = function () {
            this.util.removeClass(this.context.table.splitButton, 'on');
            this.context.table.splitMenu.style.display = 'none';
            this.removeDocEvent('mousedown', this.plugins.table._closeSplitMenu);
            this.plugins.table._closeSplitMenu = null;
        }.bind(this);

        this.addDocEvent('mousedown', this.plugins.table._closeSplitMenu);
    },

    splitCells: function (direction) {
        const util = this.util;
        const vertical = direction === 'vertical';
        const contextTable = this.context.table;
        const currentCell = contextTable._tdElement;
        const rows = contextTable._trElements;
        const currentRow = contextTable._trElement;
        const index = contextTable._logical_cellIndex;
        const rowIndex = contextTable._rowIndex;
        const newCell = this.plugins.table.createCells.call(this, currentCell.nodeName, 0, true);

        // vertical
        if (vertical) {
            const currentColSpan = currentCell.colSpan;
            newCell.rowSpan = currentCell.rowSpan;

            // colspan > 1
            if (currentColSpan > 1) {
                newCell.colSpan = this._w.Math.floor(currentColSpan/2);
                currentCell.colSpan = currentColSpan - newCell.colSpan;
                currentRow.insertBefore(newCell, currentCell.nextElementSibling);
            } else { // colspan - 1
                let rowSpanArr = [];
                let spanIndex = [];

                for (let i = 0, len = contextTable._rowCnt, cells, colSpan; i < len; i++) {
                    cells = rows[i].cells;
                    colSpan = 0;
                    for (let c = 0, cLen = cells.length, cell, cs, rs, logcalIndex; c < cLen; c++) {
                        cell = cells[c];
                        cs = cell.colSpan - 1;
                        rs = cell.rowSpan - 1;
                        logcalIndex = c + colSpan;

                        if (spanIndex.length > 0) {
                            for (let r = 0, arr; r < spanIndex.length; r++) {
                                arr = spanIndex[r];
                                if (arr.row > i) continue;
                                if (logcalIndex >= arr.index) {
                                    colSpan += arr.cs;
                                    logcalIndex += arr.cs;
                                    arr.rs -= 1;
                                    arr.row = i + 1;
                                    if (arr.rs < 1) {
                                        spanIndex.splice(r, 1);
                                        r--;
                                    }  
                                } else if (c === cLen - 1) {
                                    arr.rs -= 1;
                                    arr.row = i + 1;
                                    if (arr.rs < 1) {
                                        spanIndex.splice(r, 1);
                                        r--;
                                    }
                                }
                            }
                        }

                        if (logcalIndex <= index && rs > 0) {
                            rowSpanArr.push({
                                index: logcalIndex,
                                cs: cs + 1,
                                rs: rs,
                                row: -1
                            });
                        }

                        if (cell !== currentCell && logcalIndex <= index && logcalIndex + cs >= index + currentColSpan - 1) {
                            cell.colSpan += 1;
                            break;
                        }

                        if (logcalIndex > index) break;
                        
                        colSpan += cs;
                    }

                    spanIndex = spanIndex.concat(rowSpanArr).sort(function (a, b) {return a.index - b.index;});
                    rowSpanArr = [];
                }

                currentRow.insertBefore(newCell, currentCell.nextElementSibling);
            }
        } else { // horizontal
            const currentRowSpan = currentCell.rowSpan;
            newCell.colSpan = currentCell.colSpan;

            // rowspan > 1
            if (currentRowSpan > 1) {
                newCell.rowSpan = this._w.Math.floor(currentRowSpan/2);
                const newRowSpan = currentRowSpan - newCell.rowSpan;

                const rowSpanArr = [];
                const nextRowIndex = util.getArrayIndex(rows, currentRow) + newRowSpan;

                for (let i = 0, cells, colSpan; i < nextRowIndex; i++) {
                    cells = rows[i].cells;
                    colSpan = 0;
                    for (let c = 0, cLen = cells.length, cell, cs, logcalIndex; c < cLen; c++) {
                        logcalIndex = c + colSpan;
                        if (logcalIndex >= index) break;

                        cell = cells[c];
                        cs = cell.rowSpan - 1;
                        if (cs > 0 && cs + i >= nextRowIndex && logcalIndex < index) {
                            rowSpanArr.push({
                                index: logcalIndex,
                                cs: cell.colSpan
                            });
                        }
                        colSpan += cell.colSpan - 1;
                    }
                }

                const nextRow = rows[nextRowIndex];
                const nextCells = nextRow.cells;
                let rs = rowSpanArr.shift();

                for (let c = 0, cLen = nextCells.length, colSpan = 0, cell, cs, logcalIndex, insertIndex; c < cLen; c++) {
                    logcalIndex = c + colSpan;
                    cell = nextCells[c];
                    cs = cell.colSpan - 1;
                    insertIndex = logcalIndex + cs + 1;

                    if (rs && insertIndex >= rs.index) {
                        colSpan += rs.cs;
                        insertIndex += rs.cs;
                        rs = rowSpanArr.shift();
                    }
                    
                    if (insertIndex >= index || c === cLen - 1) {
                        nextRow.insertBefore(newCell, cell.nextElementSibling);
                        break;
                    }

                    colSpan += cs;
                }

                currentCell.rowSpan = newRowSpan;
            } else { // rowspan - 1
                newCell.rowSpan = currentCell.rowSpan;
                const newRow = util.createElement('TR');
                newRow.appendChild(newCell);

                for (let i = 0, cells; i < rowIndex; i++) {
                    cells = rows[i].cells;
                    if (cells.length === 0) return;

                    for (let c = 0, cLen = cells.length; c < cLen; c++) {
                        if (i + cells[c].rowSpan - 1 >= rowIndex) {
                            cells[c].rowSpan += 1;
                        }
                    }
                }

                const physicalIndex = contextTable._physical_cellIndex;
                const cells = currentRow.cells;

                for (let c = 0, cLen = cells.length; c < cLen; c++) {
                    if (c === physicalIndex) continue;       
                    cells[c].rowSpan += 1;                    
                }

                currentRow.parentNode.insertBefore(newRow, currentRow.nextElementSibling);
            }
        }

        this.focusEdge(currentCell);
        this.plugins.table.setPositionControllerDiv.call(this, currentCell, true);
    },

    mergeCells: function () {
        const tablePlugin = this.plugins.table;
        const contextTable = this.context.table;
        const util = this.util;

        const ref = tablePlugin._ref;
        const selectedCells = tablePlugin._selectedCells;
        const mergeCell = selectedCells[0];
        
        let emptyRowFirst = null;
        let emptyRowLast = null;
        let cs = (ref.ce - ref.cs) + 1;
        let rs = (ref.re - ref.rs) + 1;
        let mergeHTML = '';
        let row = null;

        for (let i = 1, len = selectedCells.length, cell, ch; i < len; i++) {
            cell = selectedCells[i];
            if (row !== cell.parentNode) row = cell.parentNode;

            ch = cell.children;
            for (let c = 0, cLen = ch.length; c < cLen; c++) {
                if (util.isFormatElement(ch[c]) && util.onlyZeroWidthSpace(ch[c].textContent)) {
                    util.removeItem(ch[c]);
                }  
            }

            mergeHTML += cell.innerHTML;
            util.removeItem(cell);

            if (row.cells.length === 0) {
                if (!emptyRowFirst) emptyRowFirst = row;
                else emptyRowLast = row;
                rs -= 1;
            }
        }

        if (emptyRowFirst) {
            const rows = contextTable._trElements;
            const rowIndexFirst = util.getArrayIndex(rows, emptyRowFirst);
            const rowIndexLast = util.getArrayIndex(rows, emptyRowLast || emptyRowFirst);
            const removeRows = [];
    
            for (let i = 0, cells; i <= rowIndexLast; i++) {
                cells = rows[i].cells;
                if (cells.length === 0) {
                    removeRows.push(rows[i]);
                    continue;
                }
    
                for (let c = 0, cLen = cells.length, cell, rs; c < cLen; c++) {
                    cell = cells[c];
                    rs = cell.rowSpan - 1;
                    if (rs > 0 && i + rs >= rowIndexFirst) {
                        cell.rowSpan -= util.getOverlapRangeAtIndex(rowIndexFirst, rowIndexLast, i, i + rs);
                    }
                }
            }

            for (let i = 0, len = removeRows.length; i < len; i++) {
                util.removeItem(removeRows[i]);
            }
        }

        mergeCell.innerHTML += mergeHTML;
        mergeCell.colSpan = cs;
        mergeCell.rowSpan = rs;

        this.controllersOff();
        tablePlugin.setActiveButton.call(this, true, false);
        tablePlugin.call_controller_tableEdit.call(this, mergeCell);

        util.addClass(mergeCell, 'se-table-selected-cell');
        this.focusEdge(mergeCell);
    },

    toggleHeader: function () {
        const util = this.util;
        const headerButton = this.context.table.headerButton;
        const active = util.hasClass(headerButton, 'active');
        const table = this.context.table._element;

        if (!active) {
            const header = util.createElement('THEAD');
            header.innerHTML = '<tr>' + this.plugins.table.createCells.call(this, 'th', this.context.table._logical_cellCnt, false) + '</tr>';
            table.insertBefore(header, table.firstElementChild);
        } else {
            util.removeItem(table.querySelector('thead'));
        }

        util.toggleClass(headerButton, 'active');

        if (/TH/i.test(this.context.table._tdElement.nodeName)) {
            this.controllersOff();
        } else {
            this.plugins.table.setPositionControllerDiv.call(this, this.context.table._tdElement, false);
        }
    },

    resizeTable: function () {
        const contextTable = this.context.table;
        const icon =  contextTable.resizeIcon;
        const span = contextTable.resizeText;

        let removeClass = 'se-icon-expansion';
        let addClass = 'se-icon-reduction';
        let text = contextTable.minText;
        let width = '100%';

        if (!contextTable._maxWidth) {
            removeClass = 'se-icon-reduction';
            addClass = 'se-icon-expansion';
            text = contextTable.maxText;
            width = 'auto';
        }
        
        this.util.removeClass(icon, removeClass);
        this.util.addClass(icon, addClass);
        this.util.changeTxt(span, text);
        contextTable._element.style.width = width;
    },

    setActiveButton: function (fixedCell, selectedCell) {
        const contextTable = this.context.table;

        if (!selectedCell || fixedCell === selectedCell) {
            contextTable.splitButton.removeAttribute('disabled');
            contextTable.mergeButton.setAttribute('disabled', true);
        } else {
            contextTable.splitButton.setAttribute('disabled', true);
            contextTable.mergeButton.removeAttribute('disabled');
        }
    },

    // multi selecte
    _bindOnSelect: null,
    _bindOffSelect: null,
    _bindOffShift: null,
    _selectedCells: null,
    _shift: false,
    _fixedCell: null,
    _fixedCellName: null,
    _selectedCell: null,
    _selectedTable: null,
    _ref: null,
    _toggleEditor: function (enabled) {
        this.context.element.wysiwyg.setAttribute('contenteditable', enabled);
        if (enabled) this.util.removeClass(this.context.element.wysiwyg, 'se-disabled');
        else this.util.addClass(this.context.element.wysiwyg, 'se-disabled');
    },

    _offCellMultiSelect: function (e) {
        e.stopPropagation();
        const tablePlugin = this.plugins.table;

        if (!tablePlugin._shift) {
            tablePlugin._removeEvents.call(this);
            tablePlugin._toggleEditor.call(this, true);
        } else if (tablePlugin._initBind) {
            this._wd.removeEventListener('touchmove', tablePlugin._initBind);
            tablePlugin._initBind = null;
        }

        if (!tablePlugin._fixedCell || !tablePlugin._selectedTable) return;
        
        tablePlugin.setActiveButton.call(this, tablePlugin._fixedCell, tablePlugin._selectedCell);
        tablePlugin.call_controller_tableEdit.call(this, tablePlugin._selectedCell || tablePlugin._fixedCell);

        tablePlugin._selectedCells = tablePlugin._selectedTable.querySelectorAll('.se-table-selected-cell');
        if (tablePlugin._selectedCell && tablePlugin._fixedCell) this.focusEdge(tablePlugin._selectedCell);

        if (!tablePlugin._shift) {
            tablePlugin._fixedCell = null;
            tablePlugin._selectedCell = null;
            tablePlugin._fixedCellName = null;
        }
    },

    _onCellMultiSelect: function (e) {
        const tablePlugin = this.plugins.table;
        const target = this.util.getParentElement(e.target, this.util.isCell);

        if (tablePlugin._shift) {
            if (target === tablePlugin._fixedCell) tablePlugin._toggleEditor.call(this, true);
            else tablePlugin._toggleEditor.call(this, false);
        } else if (!tablePlugin._ref) {
            if (target === tablePlugin._fixedCell) return;
            else tablePlugin._toggleEditor.call(this, false);
        }

        if (!target || target === tablePlugin._selectedCell || tablePlugin._fixedCellName !== target.nodeName || 
            tablePlugin._selectedTable !== this.util.getParentElement(target, 'TABLE')) {
            return;
        }

        tablePlugin._selectedCell = target;
        tablePlugin._setMultiCells.call(this, tablePlugin._fixedCell, target);
    },

    _setMultiCells: function (startCell, endCell) {
        const tablePlugin = this.plugins.table;
        const rows = tablePlugin._selectedTable.rows;
        const util = this.util;

        const selectedCells = tablePlugin._selectedTable.querySelectorAll('.se-table-selected-cell');
        for (let i = 0, len = selectedCells.length; i < len; i++) {
            util.removeClass(selectedCells[i], 'se-table-selected-cell');
        }

        if (startCell === endCell) {
            util.addClass(startCell, 'se-table-selected-cell');
            if (!tablePlugin._shift) return;
        }

        let findSelectedCell = true;
        let spanIndex = [];
        let rowSpanArr = [];
        const ref = tablePlugin._ref = {_i: 0, cs: null, ce: null, rs: null, re: null};

        for (let i = 0, len = rows.length, cells, colSpan; i < len; i++) {
            cells = rows[i].cells;
            colSpan = 0;

            for (let c = 0, cLen = cells.length, cell, logcalIndex, cs, rs; c < cLen; c++) {
                cell = cells[c];
                cs = cell.colSpan - 1;
                rs = cell.rowSpan - 1;
                logcalIndex = c + colSpan;

                if (spanIndex.length > 0) {
                    for (let r = 0, arr; r < spanIndex.length; r++) {
                        arr = spanIndex[r];
                        if (arr.row > i) continue;
                        if (logcalIndex >= arr.index) {
                            colSpan += arr.cs;
                            logcalIndex += arr.cs;
                            arr.rs -= 1;
                            arr.row = i + 1;
                            if (arr.rs < 1) {
                                spanIndex.splice(r, 1);
                                r--;
                            }
                        } else if (c === cLen - 1) {
                            arr.rs -= 1;
                            arr.row = i + 1;
                            if (arr.rs < 1) {
                                spanIndex.splice(r, 1);
                                r--;
                            }
                        }
                    }
                }

                if (findSelectedCell) {
                    if (cell === startCell || cell === endCell) {
                        ref.cs = ref.cs !== null && ref.cs < logcalIndex ? ref.cs : logcalIndex;
                        ref.ce = ref.ce !== null && ref.ce > logcalIndex + cs ? ref.ce : logcalIndex + cs;
                        ref.rs = ref.rs !== null && ref.rs < i ? ref.rs : i;
                        ref.re = ref.re !== null && ref.re > i + rs ? ref.re : i + rs;
                        ref._i += 1;
                    }
                    
                    if (ref._i === 2) {
                        findSelectedCell = false;
                        spanIndex = [];
                        rowSpanArr = [];
                        i = -1;
                        break;
                    }
                } else if (util.getOverlapRangeAtIndex(ref.cs, ref.ce, logcalIndex, logcalIndex + cs) && util.getOverlapRangeAtIndex(ref.rs, ref.re, i, i + rs)) {
                    const newCs = ref.cs < logcalIndex ? ref.cs : logcalIndex;
                    const newCe = ref.ce > logcalIndex + cs ? ref.ce : logcalIndex + cs;
                    const newRs = ref.rs < i ? ref.rs : i;
                    const newRe = ref.re > i + rs ? ref.re : i + rs;

                    if (ref.cs !== newCs || ref.ce !== newCe || ref.rs !== newRs || ref.re !== newRe) {
                        ref.cs = newCs;
                        ref.ce = newCe;
                        ref.rs = newRs;
                        ref.re = newRe;
                        i = -1;

                        spanIndex = [];
                        rowSpanArr = [];
                        break;
                    }

                    util.addClass(cell, 'se-table-selected-cell');
                }

                if (rs > 0) {
                    rowSpanArr.push({
                        index: logcalIndex,
                        cs: cs + 1,
                        rs: rs,
                        row: -1
                    });
                }

                colSpan += cell.colSpan - 1;
            }

            spanIndex = spanIndex.concat(rowSpanArr).sort(function (a, b) {return a.index - b.index;});
            rowSpanArr = [];
        }
    },

    _removeEvents: function () {
        const tablePlugin = this.plugins.table;

        if (tablePlugin._initBind) {
            this._wd.removeEventListener('touchmove', tablePlugin._initBind);
            tablePlugin._initBind = null;
        }

        if (tablePlugin._bindOnSelect) {
            this._wd.removeEventListener('mousedown', tablePlugin._bindOnSelect);
            this._wd.removeEventListener('mousemove', tablePlugin._bindOnSelect);
            tablePlugin._bindOnSelect = null;
        }

        if (tablePlugin._bindOffSelect) {
            this._wd.removeEventListener('mouseup', tablePlugin._bindOffSelect);
            tablePlugin._bindOffSelect = null;
        }

        if (tablePlugin._bindOffShift) {
            this._wd.removeEventListener('keyup', tablePlugin._bindOffShift);
            tablePlugin._bindOffShift = null;
        }
    },

    _initBind: null,
    onTableCellMultiSelect: function (tdElement, shift) {
        const tablePlugin = this.plugins.table;

        tablePlugin._removeEvents.call(this);
        this.controllersOff();

        tablePlugin._shift = shift;
        tablePlugin._fixedCell = tdElement;
        tablePlugin._fixedCellName = tdElement.nodeName;
        tablePlugin._selectedTable = this.util.getParentElement(tdElement, 'TABLE');

        const selectedCells = tablePlugin._selectedTable.querySelectorAll('.se-table-selected-cell');
        for (let i = 0, len = selectedCells.length; i < len; i++) {
            this.util.removeClass(selectedCells[i], 'se-table-selected-cell');
        }

        this.util.addClass(tdElement, 'se-table-selected-cell');
        
        tablePlugin._bindOnSelect = tablePlugin._onCellMultiSelect.bind(this);
        tablePlugin._bindOffSelect = tablePlugin._offCellMultiSelect.bind(this);

        if (!shift) {
            this._wd.addEventListener('mousemove', tablePlugin._bindOnSelect, false);
        } else {
            tablePlugin._bindOffShift = function () {
                this.controllersOn(this.context.table.resizeDiv, this.context.table.tableController, this.plugins.table.init.bind(this), this.focus.bind(this));
                if (!tablePlugin._ref) this.controllersOff();
            }.bind(this);

            this._wd.addEventListener('keyup', tablePlugin._bindOffShift, false);
            this._wd.addEventListener('mousedown', tablePlugin._bindOnSelect, false);
        }

        this._wd.addEventListener('mouseup', tablePlugin._bindOffSelect, false);

        tablePlugin._initBind = tablePlugin.init.bind(this);
        this._wd.addEventListener('touchmove', tablePlugin._initBind, false);
    },

    onClick_tableController: function (e) {
        e.stopPropagation();
        const target = e.target.getAttribute('data-command') ? e.target : e.target.parentNode;

        if (target.getAttribute('disabled')) return;

        const command = target.getAttribute('data-command');
        const value = target.getAttribute('data-value');
        const option = target.getAttribute('data-option');
        
        if (typeof this.plugins.table._closeSplitMenu === 'function') {
            this.plugins.table._closeSplitMenu();
            if (command === 'onsplit') return;
        }

        if (!command) return;

        e.preventDefault();
        const contextTable = this.context.table;

        switch (command) {
            case 'insert':
            case 'delete':
                this.plugins.table.editTable.call(this, value, option);
                break;
            case 'header':
                this.plugins.table.toggleHeader.call(this);
                break;
            case 'onsplit':
                this.plugins.table.openSplitMenu.call(this);
                break;
            case 'split':
                this.plugins.table.splitCells.call(this, value);
                break;
            case 'merge':
                this.plugins.table.mergeCells.call(this);
                break;
            case 'resize':
                contextTable.resizeDiv.style.display = 'none';
                contextTable._maxWidth = !contextTable._maxWidth;
                this.plugins.table.resizeTable.call(this);
                break;
            case 'remove':
                this.util.removeItem(contextTable._element);
                this.controllersOff();
        }

        this.focus();

        // history stack
        this.history.push(false);
    }
});


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'template',
    add: function (core, targetElement) {
        const context = core.context;
        context.template = {};

        /** set submenu */
        let templateDiv = this.setSubmenu.call(core);

        /** add event listeners */
        templateDiv.querySelector('ul').addEventListener('click', this.pickup.bind(core));

        /** append html */
        targetElement.parentNode.appendChild(templateDiv);

        /** empty memory */
        templateDiv = null;
    },

    setSubmenu: function () {
        const templateList = this.context.option.templates;
        const listDiv = this.util.createElement('DIV');

        listDiv.className = 'se-list-layer';

        let list = '<div class="se-submenu se-list-inner">' +
                '<ul class="se-list-basic">';
        for (let i = 0, len = templateList.length, t; i < len; i++) {
            t = templateList[i];
            list += '<li><button type="button" class="se-btn-list" data-value="' + i + '" title="' + t.name + '">' + t.name + '</button></li>';
        }
        list += '</ul></div>';

        listDiv.innerHTML = list;

        return listDiv;
    },

    pickup: function (e) {
        if (!/^BUTTON$/i.test(e.target.tagName)) return false;

        e.preventDefault();
        e.stopPropagation();

        const temp = this.context.option.templates[e.target.getAttribute('data-value')];

        if (temp.html) {
            this.setContents(temp.html);
        } else {
            this.submenuOff();
            throw Error('[SUNEDITOR.template.fail] cause : "templates[i].html not found"');
        }
        
        this.submenuOff();
    }
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'textStyle',
    add: function (core, targetElement) {
        const context = core.context;
        context.textStyle = {
            _styleList: null
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);
        let listUl = listDiv.querySelector('ul');

        /** add event listeners */
        listUl.addEventListener('click', this.pickup.bind(core));

        context.textStyle._styleList = listDiv.querySelectorAll('li button');

        /** append html */
        targetElement.parentNode.appendChild(listDiv);

        /** empty memory */
        listDiv = null, listUl = null;
    },

    setSubmenu: function () {
        const option = this.context.option;
        const listDiv = this.util.createElement('DIV');
        listDiv.className = 'se-submenu se-list-layer';

        const defaultList = {
            translucent: {
                name: this.lang.menu.translucent,
                style: 'opacity: 0.5;',
                tag: 'span',
            },
            shadow: {
                name: this.lang.menu.shadow,
                class: '__se__t-shadow',
                tag: 'span',
            }
        };
        const styleList = !option.textStyles ? ['translucent', 'shadow'] : option.textStyles;

        let list = '<div class="se-list-inner"><ul class="se-list-basic se-list-format">';
        for (let i = 0, len = styleList.length, t, tag, name, attrs, command, value, _class; i < len; i++) {
            t = styleList[i];
            attrs = '', value = '', command = [];

            if (typeof t === 'string') {
                const defaultStyle = defaultList[t.toLowerCase()];
                if (!defaultStyle) continue;
                t = defaultStyle;
            }

            name = t.name;
            tag = t.tag || 'span';
            _class = t._class;

            if (t.style) {
                attrs += ' style="' + t.style + '"';
                value += t.style.replace(/:[^;]+(;|$)\s*/g, ',');
                command.push('style');
            }
            if (t.class) {
                attrs += ' class="' + t.class + '"';
                value += '.' + t.class.trim().replace(/\s+/g, ',.');
                command.push('class');
            }

            value = value.replace(/,$/, '');

            list += '<li>' +
                '<button type="button" class="se-btn-list' + (_class ? ' ' + _class: '') + '" data-command="' + tag + '" data-value="' + value + '" title="' + name + '">' +
                    '<' + tag + attrs + '>' + name +  '</' + tag + '>' +
                '</button></li>';
        }
        list += '</ul></div>';

        listDiv.innerHTML = list;

        return listDiv;
    },

    on: function () {
        const util = this.util;
        const textStyleContext = this.context.textStyle;
        const styleButtonList = textStyleContext._styleList;
        const selectionNode = this.getSelectionNode();

        for (let i = 0, len = styleButtonList.length, btn, data, active; i < len; i++) {
            btn = styleButtonList[i];
            data = btn.getAttribute('data-value').split(',');
            
            for (let v = 0, node, value; v < data.length; v++) {
                node = selectionNode;
                active = false;
                
                while (!util.isFormatElement(node)) {
                    if (node.nodeName.toLowerCase() === btn.getAttribute('data-command').toLowerCase()) {
                        value = data[v];
                        if (/^\./.test(value) ? util.hasClass(node, value.replace(/^\./, '')) : !!node.style[value]) {
                            active = true;
                            break;
                        }
                    }
                    node = node.parentNode;
                }

                if (!active) break;
            }

            active ? util.addClass(btn, 'active') : util.removeClass(btn, 'active');
        }

    },

    pickup: function (e) {
        e.preventDefault();
        e.stopPropagation();

        let target = e.target;
        let command = null, tag = null;
        
        while (!command && !/UL/i.test(target.tagName)) {
            command = target.getAttribute('data-command');
            if (command) {
                tag = target.firstChild;
                break;
            }
            target = target.parentNode;
        }

        if (!command) return;

        const checkStyles = tag.style.cssText.replace(/:.+(;|$)/g, ',').split(',');
        checkStyles.pop();

        const classes = tag.classList;
        for (let i = 0, len = classes.length; i < len; i++) {
            checkStyles.push('.' + classes[i]);
        }

        const newNode = this.util.hasClass(target, 'active') ? null : tag.cloneNode(false);
        const removeNodes = newNode ? null : [tag.nodeName];
        this.nodeChange(newNode, checkStyles, removeNodes, true);

        this.submenuOff();
    }
});


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _modules_resizing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _modules_notice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */






/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'image',
    add: function (core) {
        core.addModule([_modules_dialog__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"], _modules_resizing__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], _modules_notice__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]]);
        
        const context = core.context;
        context.image = {
            sizeUnit: context.option._imageSizeUnit,
            _linkElement: null,
            _container: null,
            _cover: null,
            _element: null,
            _element_w: 1,
            _element_h: 1,
            _element_l: 0,
            _element_t: 0,
            _defaultSizeX: 'auto',
            _defaultSizeY: 'auto',
            _origin_w: context.option.imageWidth === 'auto' ? '' : context.option.imageWidth,
            _origin_h: '',
            _altText: '',
            _caption: null,
            captionCheckEl: null,
            _linkValue: '',
            _align: 'none',
            _captionChecked: false,
            _proportionChecked: true,
            _floatClassRegExp: '__se__float\\-[a-z]+',
            _xmlHttp: null,
            _captionShow: true,
            _resizing: context.option.imageResizing,
            _rotation: context.option.imageRotation,
            _resizeDotHide: !context.option.imageHeightShow,
            _uploadFileLength: 0,
            _onlyPercentage: context.option.imageSizeOnlyPercentage,
            _ratio: false,
            _ratioX: 1,
            _ratioY: 1
        };

        /** image dialog */
        let image_dialog = this.setDialog.call(core);
        context.image.modal = image_dialog;
        context.image.imgUrlFile = image_dialog.querySelector('._se_image_url');
        context.image.imgInputFile = context.image.focusElement = image_dialog.querySelector('._se_image_file');
        context.image.altText = image_dialog.querySelector('._se_image_alt');
        context.image.imgLink = image_dialog.querySelector('._se_image_link');
        context.image.imgLinkNewWindowCheck = image_dialog.querySelector('._se_image_link_check');
        context.image.captionCheckEl = image_dialog.querySelector('._se_image_check_caption');

        /** add event listeners */
        context.image.modal.querySelector('.se-dialog-tabs').addEventListener('click', this.openTab.bind(core));
        context.image.modal.querySelector('.se-btn-primary').addEventListener('click', this.submit.bind(core));
        
        context.image.proportion = {};
        context.image.inputX = {};
        context.image.inputY = {};
        if (context.option.imageResizing) {
            context.image.proportion = image_dialog.querySelector('._se_image_check_proportion');
            context.image.inputX = image_dialog.querySelector('._se_image_size_x');
            context.image.inputY = image_dialog.querySelector('._se_image_size_y');
            context.image.inputX.value = context.option.imageWidth;
            
            context.image.inputX.addEventListener('keyup', this.setInputSize.bind(core, 'x'));
            context.image.inputY.addEventListener('keyup', this.setInputSize.bind(core, 'y'));

            context.image.inputX.addEventListener('change', this.setRatio.bind(core));
            context.image.inputY.addEventListener('change', this.setRatio.bind(core));
            context.image.proportion.addEventListener('change', this.setRatio.bind(core));
            
            image_dialog.querySelector('.se-dialog-btn-revert').addEventListener('click', this.sizeRevert.bind(core));
        }

        /** append html */
        context.dialog.modal.appendChild(image_dialog);

        /** empty memory */
        image_dialog = null;
    },

    /** dialog */
    setDialog: function () {
        const option = this.context.option;
        const lang = this.lang;
        const dialog = this.util.createElement('DIV');

        dialog.className = 'se-dialog-content';
        dialog.style.display = 'none';

        let html = '' +
            '<div class="se-dialog-header">' +
                '<button type="button" data-command="close" class="close" aria-label="Close" title="' + lang.dialogBox.close + '">' +
                    '<i aria-hidden="true" data-command="close" class="se-icon-cancel"></i>' +
                '</button>' +
                '<span class="se-modal-title">' + lang.dialogBox.imageBox.title + '</span>' +
            '</div>' +
            '<div class="se-dialog-tabs">' +
                '<button type="button" class="_se_tab_link active" data-tab-link="image">' + lang.toolbar.image + '</button>' +
                '<button type="button" class="_se_tab_link" data-tab-link="url">' + lang.toolbar.link + '</button>' +
            '</div>' +
            '<form class="editor_image" method="post" enctype="multipart/form-data">' +
                '<div class="_se_tab_content _se_tab_content_image">' +
                    '<div class="se-dialog-body">';

            if (option.imageFileInput) {
                html += '' +
                        '<div class="se-dialog-form">' +
                            '<label>' + lang.dialogBox.imageBox.file + '</label>' +
                            '<input class="se-input-form _se_image_file" type="file" accept="image/*" multiple="multiple" />' +
                        '</div>' ;
            }

            if (option.imageUrlInput) {
                html += '' +
                        '<div class="se-dialog-form">' +
                            '<label>' + lang.dialogBox.imageBox.url + '</label>' +
                            '<input class="se-input-form _se_image_url" type="text" />' +
                        '</div>';
            }

            html += '' +
                        '<div class="se-dialog-form">' +
                            '<label>' + lang.dialogBox.imageBox.altText + '</label><input class="se-input-form _se_image_alt" type="text" />' +
                        '</div>';

            if (option.imageResizing) {
                const onlyPercentage = option.imageSizeOnlyPercentage;
                const onlyPercentDisplay = onlyPercentage ? ' style="display: none !important;"' : '';
                const heightDisplay = !option.imageHeightShow ? ' style="display: none !important;"' : '';
                html += '<div class="se-dialog-form">';
                        if (onlyPercentage || !option.imageHeightShow) {
                            html += '' +
                            '<div class="se-dialog-size-text">' +
                                '<label class="size-w">' + lang.dialogBox.size + '</label>' +
                            '</div>';
                        } else {
                            html += '' +
                            '<div class="se-dialog-size-text">' +
                                '<label class="size-w">' + lang.dialogBox.width + '</label>' +
                                '<label class="se-dialog-size-x">&nbsp;</label>' +
                                '<label class="size-h">' + lang.dialogBox.height + '</label>' +
                            '</div>';
                        }
                        html += '' +
                            '<input class="se-input-control _se_image_size_x" placeholder="auto"' + (onlyPercentage ? ' type="number" min="1"' : 'type="text"') + (onlyPercentage ? ' max="100"' : '') + ' />' +
                            '<label class="se-dialog-size-x"' + heightDisplay + '>' + (onlyPercentage ? '%' : 'x') + '</label>' +
                            '<input type="text" class="se-input-control _se_image_size_y" placeholder="auto" disabled' + onlyPercentDisplay + (onlyPercentage ? ' max="100"' : '') + heightDisplay + '/>' +
                            '<label' + onlyPercentDisplay + heightDisplay + '><input type="checkbox" class="se-dialog-btn-check _se_image_check_proportion" checked disabled/>&nbsp;' + lang.dialogBox.proportion + '</label>' +
                            '<button type="button" title="' + lang.dialogBox.revertButton + '" class="se-btn se-dialog-btn-revert" style="float: right;"><i class="se-icon-revert"></i></button>' +
                        '</div>' ;
            }

            html += '' +
                        '<div class="se-dialog-form se-dialog-form-footer">' +
                            '<label><input type="checkbox" class="se-dialog-btn-check _se_image_check_caption" />&nbsp;' + lang.dialogBox.caption + '</label>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="_se_tab_content _se_tab_content_url" style="display: none">' +
                    '<div class="se-dialog-body">' +
                        '<div class="se-dialog-form">' +
                            '<label>' + lang.dialogBox.linkBox.url + '</label><input class="se-input-form _se_image_link" type="text" />' +
                        '</div>' +
                        '<label><input type="checkbox" class="_se_image_link_check"/>&nbsp;' + lang.dialogBox.linkBox.newWindowCheck + '</label>' +
                    '</div>' +
                '</div>' +
                '<div class="se-dialog-footer">' +
                    '<div>' +
                        '<label><input type="radio" name="suneditor_image_radio" class="se-dialog-btn-radio" value="none" checked>' + lang.dialogBox.basic + '</label>' +
                        '<label><input type="radio" name="suneditor_image_radio" class="se-dialog-btn-radio" value="left">' + lang.dialogBox.left + '</label>' +
                        '<label><input type="radio" name="suneditor_image_radio" class="se-dialog-btn-radio" value="center">' + lang.dialogBox.center + '</label>' +
                        '<label><input type="radio" name="suneditor_image_radio" class="se-dialog-btn-radio" value="right">' + lang.dialogBox.right + '</label>' +
                    '</div>' +
                    '<button type="submit" class="se-btn-primary" title="' + lang.dialogBox.submitButton + '"><span>' + lang.dialogBox.submitButton + '</span></button>' +
                '</div>' +
            '</form>';

        dialog.innerHTML = html;

        return dialog;
    },

    openTab: function (e) {
        const modal = this.context.image.modal;
        const targetElement = (e === 'init' ? modal.querySelector('._se_tab_link') : e.target);

        if (!/^BUTTON$/i.test(targetElement.tagName)) {
            return false;
        }

        // Declare all variables
        const tabName = targetElement.getAttribute('data-tab-link');
        const contentClassName = '_se_tab_content';
        let i, tabContent, tabLinks;

        // Get all elements with class="tabcontent" and hide them
        tabContent = modal.getElementsByClassName(contentClassName);
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = 'none';
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tabLinks = modal.getElementsByClassName('_se_tab_link');
        for (i = 0; i < tabLinks.length; i++) {
            this.util.removeClass(tabLinks[i], 'active');
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        modal.querySelector('.' + contentClassName + '_' + tabName).style.display = 'block';
        this.util.addClass(targetElement, 'active');

        // focus
        if (tabName === 'image') {
            this.context.image.imgInputFile.focus();
        } else if (tabName === 'url') {
            this.context.image.imgLink.focus();
        }

        return false;
    },

    submitAction: function (fileList) {
        if (fileList.length > 0) {
            let fileSize = 0;
            const files = [];
            for (let i = 0, len = fileList.length; i < len; i++) {
                if (/image/i.test(fileList[i].type)) {
                    files.push(fileList[i]);
                    fileSize += fileList[i].size;
                }
            }

            const limitSize = this.context.option.imageUploadSizeLimit;
            if (limitSize > 0) {
                let infoSize = 0;
                const imagesInfo = this._variable._imagesInfo;
                for (let i = 0, len = imagesInfo.length; i < len; i++) {
                    infoSize += imagesInfo[i].size * 1;
                }

                if ((fileSize + infoSize) > limitSize) {
                    const err = '[SUNEDITOR.imageUpload.fail] Size of uploadable total images: ' + (limitSize/1000) + 'KB';
                    if (this._imageUploadError(err, {
                        'limitSize': limitSize,
                        'currentSize': infoSize,
                        'uploadSize': fileSize
                    })) {
                        _modules_notice__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].open.call(this, err);
                    }

                    this.closeLoading();
                    return;
                }
            }

            this.context.image._uploadFileLength = files.length;
            const imageUploadUrl = this.context.option.imageUploadUrl;
            const imageUploadHeader = this.context.option.imageUploadHeader;
            const filesLen = this.context.dialog.updateModal ? 1 : files.length;

            if (typeof imageUploadUrl === 'string' && imageUploadUrl.length > 0) {
                const formData = new FormData();

                for (let i = 0; i < filesLen; i++) {
                    formData.append('file-' + i, files[i]);
                }

                this.context.image._xmlHttp = this.util.getXMLHttpRequest();
                this.context.image._xmlHttp.onreadystatechange = this.plugins.image.callBack_imgUpload.bind(this, this.context.image._linkValue, this.context.image.imgLinkNewWindowCheck.checked, this.context.image.inputX.value, this.context.image.inputY.value, this.context.image._align, this.context.dialog.updateModal, this.context.image._element);
                this.context.image._xmlHttp.open('post', imageUploadUrl, true);
                if(typeof imageUploadHeader === 'object' && Object.keys(imageUploadHeader).length > 0){
                    for(let key in imageUploadHeader){
                        this.context.image._xmlHttp.setRequestHeader(key, imageUploadHeader[key]);
                    }
                }
                this.context.image._xmlHttp.send(formData);
            }
            else {
                for (let i = 0; i < filesLen; i++) {
                    this.plugins.image.setup_reader.call(this, files[i], this.context.image._linkValue, this.context.image.imgLinkNewWindowCheck.checked, this.context.image.inputX.value, this.context.image.inputY.value, this.context.image._align, i, filesLen - 1);
                }
            }
        }
    },

    onRender_imgInput: function () {
        try {
            this.plugins.image.submitAction.call(this, this.context.image.imgInputFile.files);
        } catch (e) {
            this.closeLoading();
            throw Error('[SUNEDITOR.imageUpload.fail] cause : "' + e.message + '"');
        }
    },

    setup_reader: function (file, imgLinkValue, newWindowCheck, width, height, align, index, filesLen) {
        const reader = new FileReader();
        
        if (this.context.dialog.updateModal) {
            this.context.image._element.setAttribute('data-file-name', file.name);
            this.context.image._element.setAttribute('data-file-size', file.size);
        }

        reader.onload = function (update, updateElement, file) {
            try {
                this.context.image.inputX.value = width;
                this.context.image.inputY.value = height;
                if (update) this.plugins.image.update_src.call(this, reader.result, updateElement, file);
                else this.plugins.image.create_image.call(this, reader.result, imgLinkValue, newWindowCheck, width, height, align, file);

                if (index === filesLen) this.closeLoading();
            } catch (e) {
                this.closeLoading();
                throw Error('[SUNEDITOR.imageFileRendering.fail] cause : "' + e.message + '"');
            }
        }.bind(this, this.context.dialog.updateModal, this.context.image._element, file);

        reader.readAsDataURL(file);
    },

    callBack_imgUpload: function (linkValue, linkNewWindow, width, height, align, update, updateElement) {
        if (this.context.image._xmlHttp.readyState === 4) {
            if (this.context.image._xmlHttp.status === 200) {
                const response = JSON.parse(this.context.image._xmlHttp.responseText);

                if (response.errorMessage) {
                    this.closeLoading();
                    if (this._imageUploadError(response.errorMessage, response.result)) {
                        _modules_notice__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].open.call(this, response.errorMessage);
                    }
                } else {
                    const fileList = response.result;
                    for (let i = 0, len = fileList.length, file; i < len; i++) {
                        file = {name: fileList[i].name, size: fileList[i].size};
                        if (update) this.plugins.image.update_src.call(this, fileList[i].url, updateElement, file);
                        else this.plugins.image.create_image.call(this, fileList[i].url, linkValue, linkNewWindow, width, height, align, file);
                    }
                }

                this.closeLoading();
            }
            // error
            else {
                this.closeLoading();
                throw Error('[SUNEDITOR.imageUpload.fail] status: ' + this.context.image._xmlHttp.status + ', responseURL: ' + this.context.image._xmlHttp.responseURL);
            }
        }
    },

    onRender_imgUrl: function () {
        const contextImage = this.context.image;
        if (contextImage.imgUrlFile.value.trim().length === 0) return false;

        try {
            const file = {name: contextImage.imgUrlFile.value.split('/').pop(), size: 0};
            if (this.context.dialog.updateModal) this.plugins.image.update_src.call(this, contextImage.imgUrlFile.value, contextImage._element, file);
            else this.plugins.image.create_image.call(this, contextImage.imgUrlFile.value, contextImage._linkValue, contextImage.imgLinkNewWindowCheck.checked, contextImage.inputX.value, contextImage.inputY.value, contextImage._align, file);
        } catch (e) {
            throw Error('[SUNEDITOR.imageURLRendering.fail] cause : "' + e.message + '"');
        } finally {
            this.closeLoading();
        }
    },

    onRender_link: function (imgTag, imgLinkValue, newWindowCheck) {
        if (imgLinkValue.trim().length > 0) {
            const link = this.util.createElement('A');
            link.href = /^https?:\/\//.test(imgLinkValue) ? imgLinkValue : 'http://' + imgLinkValue;
            link.target = (newWindowCheck ? '_blank' : '');
            link.setAttribute('data-image-link', 'image');
            imgTag.setAttribute('data-image-link', imgLinkValue);

            link.appendChild(imgTag);
            return link;
        }

        return imgTag;
    },

    setInputSize: function (xy, e) {
        if (e && e.keyCode === 32) {
            e.preventDefault();
            return;
        }

        this.plugins.resizing._module_setInputSize.call(this, this.context.image, xy);
    },

    setRatio: function () {
        this.plugins.resizing._module_setRatio.call(this, this.context.image);
    },

    submit: function (e) {
        const contextImage = this.context.image;
        const imagePlugin = this.plugins.image;
        this.showLoading();

        e.preventDefault();
        e.stopPropagation();

        contextImage._linkValue = contextImage.imgLink.value;
        contextImage._altText = contextImage.altText.value;
        contextImage._align = contextImage.modal.querySelector('input[name="suneditor_image_radio"]:checked').value;
        contextImage._captionChecked = contextImage.captionCheckEl.checked;
        if (contextImage._resizing) contextImage._proportionChecked = contextImage.proportion.checked;

        try {
            if (this.context.dialog.updateModal) {
                imagePlugin.update_image.call(this, false, false, false);
            }
            
            if (contextImage.imgInputFile && contextImage.imgInputFile.files.length > 0) {
                imagePlugin.onRender_imgInput.call(this);
            } else if (contextImage.imgUrlFile && contextImage.imgUrlFile.value.trim().length > 0) {
                imagePlugin.onRender_imgUrl.call(this);
            } else {
                this.closeLoading();
            }
        } catch (error) {
            this.closeLoading();
            throw Error('[SUNEDITOR.image.submit.fail] cause : "' + error.message + '"');
        } finally {
            this.plugins.dialog.close.call(this);
        }

        return false;
    },

    setImagesInfo: function (img, file) {
        const imagesInfo = this._variable._imagesInfo;
        let dataIndex = img.getAttribute('data-index');
        let info = null;
        let state = '';

        // create
        if (!dataIndex || this._imagesInfoInit) {
            state = 'create';
            dataIndex = this._variable._imageIndex;
            this._variable._imageIndex++;

            img.setAttribute('data-index', dataIndex);
            img.setAttribute('data-file-name', file.name);
            img.setAttribute('data-file-size', file.size);

            info = {
                src: img.src,
                index: dataIndex * 1,
                name: file.name,
                size: file.size
            };

            imagesInfo.push(info);
        } else { // update
            state = 'update';
            dataIndex *= 1;

            for (let i = 0, len = imagesInfo.length; i < len; i++) {
                if (dataIndex === imagesInfo[i].index) {
                    info = imagesInfo[i];
                    break;
                }
            }

            if (!info) {
                dataIndex = this._variable._imageIndex;
                this._variable._imageIndex++;
                info = {};
            }

            info.src = img.src,
            info.name = img.getAttribute("data-file-name");
            info.size = img.getAttribute("data-file-size") * 1;
        }

        // method bind
        info.element = img;
        info.delete = this.plugins.image.destroy.bind(this, img);
        info.select = function () {
            img.scrollIntoView(true);
            this._w.setTimeout(function () {
                this.plugins.image.onModifyMode.call(this, img, this.plugins.resizing.call_controller_resize.call(this, img, 'image'));
            }.bind(this));
        }.bind(this);

        if (!img.getAttribute('origin-size')) {
            img.setAttribute('origin-size', img.naturalWidth + ',' + img.naturalHeight);
        }
        if (!img.getAttribute('data-origin')) {
            const container = this.util.getParentElement(img, this.util.isComponent);
            const cover = this.util.getParentElement(img, 'FIGURE');

            const w = this.plugins.resizing._module_getSizeX.call(this, this.context.image, img, cover, container);
            const h = this.plugins.resizing._module_getSizeY.call(this, this.context.image, img, cover, container);
            img.setAttribute('data-origin', w + ',' + h);
            img.setAttribute('data-size', w + ',' + h);
        }

        this._imageUpload(img, dataIndex, state, info, --this.context.image._uploadFileLength < 0 ? 0 : this.context.image._uploadFileLength);
    },

    checkImagesInfo: function () {
        const images = this.context.element.wysiwyg.getElementsByTagName('IMG');
        const imagePlugin = this.plugins.image;
        const imagesInfo = this._variable._imagesInfo;

        if (images.length === imagesInfo.length) {
            // reset
            if (this._imagesInfoReset) {
                for (let i = 0, len = images.length, img; i < len; i++) {
                    img = images[i];
                    imagePlugin.setImagesInfo.call(this, img, {
                        'name': img.getAttribute('data-file-name') || img.src.split('/').pop(),
                        'size': img.getAttribute('data-file-size') || 0
                    });
                }
            }
            // pass
            return;
        }

        // check images
        this.context.resizing._resize_plugin = 'image';
        const currentImages = [];
        const infoIndex = [];
        for (let i = 0, len = imagesInfo.length; i < len; i++) {
            infoIndex[i] = imagesInfo[i].index;
        }

        for (let i = 0, len = images.length, img; i < len; i++) {
            img = images[i];
            if (!this.util.getParentElement(img, this.util.isComponent)) {
                currentImages.push(this._variable._imageIndex);
                imagePlugin.onModifyMode.call(this, img, null);
                imagePlugin.openModify.call(this, true);
                imagePlugin.update_image.call(this, true, false, true);
            } else if (!img.getAttribute('data-index') || infoIndex.indexOf(img.getAttribute('data-index') * 1) < 0) {
                currentImages.push(this._variable._imageIndex);
                img.removeAttribute('data-index');
                imagePlugin.setImagesInfo.call(this, img, {
                    'name': img.getAttribute('data-file-name') || img.src.split('/').pop(),
                    'size': img.getAttribute('data-file-size') || 0
                });
                if (!img.style.width) {
                    const size = (img.getAttribute('data-size') || img.getAttribute('data-origin') || '').split(',');
                    imagePlugin.onModifyMode.call(this, img, null);
                    imagePlugin.applySize.call(this, (size[0] || this.context.option.imageWidth), (size[1] || ''));
                }
            } else {
                currentImages.push(img.getAttribute('data-index') * 1);
            }
        }

        for (let i = 0, dataIndex; i < imagesInfo.length; i++) {
            dataIndex = imagesInfo[i].index;
            if (currentImages.indexOf(dataIndex) > -1) continue;

            imagesInfo.splice(i, 1);
            this._imageUpload(null, dataIndex, 'delete', null, 0);
            i--;
        }

        this.context.resizing._resize_plugin = '';
    },

    _onload_image: function (oImg, file) {
        if (!file) return;
        this.plugins.image.setImagesInfo.call(this, oImg, file);
        // history stack
        this.history.push(true);
    },

    create_image: function (src, linkValue, linkNewWindow, width, height, align, file) {
        const contextImage = this.context.image;
        this.context.resizing._resize_plugin = 'image';

        let oImg = this.util.createElement('IMG');
        oImg.addEventListener('load', this.plugins.image._onload_image.bind(this, oImg, file));

        oImg.src = src;
        oImg.alt = contextImage._altText;
        oImg = this.plugins.image.onRender_link.call(this, oImg, linkValue, linkNewWindow);
        oImg.setAttribute('data-rotate', '0');

        if (contextImage._resizing) {
            oImg.setAttribute('data-proportion', contextImage._proportionChecked);
        }

        const cover = this.plugins.resizing.set_cover.call(this, oImg);
        const container = this.plugins.resizing.set_container.call(this, cover, 'se-image-container');

        // caption
        if (contextImage._captionChecked) {
            contextImage._caption = this.plugins.resizing.create_caption.call(this);
            contextImage._caption.setAttribute('contenteditable', false);
            cover.appendChild(contextImage._caption);
        }

        contextImage._element = oImg;
        contextImage._cover = cover;
        contextImage._container = container;

        // set size
        this.plugins.image.applySize.call(this);

        // align
        this.plugins.image.setAlign.call(this, align, oImg, cover, container);

        this.insertComponent(container, true);
        this.context.resizing._resize_plugin = '';
    },

    update_image: function (init, openController, notHistoryPush) {
        const contextImage = this.context.image;
        const linkValue = contextImage._linkValue;
        let imageEl = contextImage._element;
        let cover = contextImage._cover;
        let container = contextImage._container;
        let isNewContainer = false;

        if (cover === null) {
            isNewContainer = true;
            imageEl = contextImage._element.cloneNode(true);
            cover = this.plugins.resizing.set_cover.call(this, imageEl);
        }

        if (container === null) {
            cover = cover.cloneNode(true);
            isNewContainer = true;
            container = this.plugins.resizing.set_container.call(this, cover, 'se-image-container');
        }
        
        if (isNewContainer) {
            container.innerHTML = '';
            container.appendChild(cover);
        }

        // check size
        let changeSize;
        const x = this.util.isNumber(contextImage.inputX.value) ? contextImage.inputX.value + contextImage.sizeUnit : contextImage.inputX.value;
        const y = this.util.isNumber(contextImage.inputY.value) ? contextImage.inputY.value + contextImage.sizeUnit : contextImage.inputY.value;
        if (/%$/.test(imageEl.style.width)) {
            changeSize = x !== container.style.width || y !== container.style.height;
        } else {
            changeSize = x !== imageEl.style.width || y !== imageEl.style.height;
        }

        // alt
        imageEl.alt = contextImage._altText;
        
        // caption
        if (contextImage._captionChecked) {
            if (!contextImage._caption) {
                contextImage._caption = this.plugins.resizing.create_caption.call(this);
                cover.appendChild(contextImage._caption);
            }
        } else {
            if (contextImage._caption) {
                this.util.removeItem(contextImage._caption);
                contextImage._caption = null;
            }
        }

        // link
        if (linkValue.trim().length > 0) {
            if (contextImage._linkElement !== null) {
                contextImage._linkElement.href = linkValue;
                contextImage._linkElement.target = (contextImage.imgLinkNewWindowCheck.checked ? '_blank' : '');
                imageEl.setAttribute('data-image-link', linkValue);
            } else {
                let newEl = this.plugins.image.onRender_link.call(this, imageEl, linkValue, this.context.image.imgLinkNewWindowCheck.checked);
                cover.insertBefore(newEl, contextImage._caption);
            }
        }
        else if (contextImage._linkElement !== null) {
            const imageElement = imageEl;

            imageElement.setAttribute('data-image-link', '');
            let newEl = imageElement.cloneNode(true);
            cover.removeChild(contextImage._linkElement);
            cover.insertBefore(newEl, contextImage._caption);
            imageEl = newEl;
        }

        if (isNewContainer) {
            const existElement = (this.util.isRangeFormatElement(contextImage._element.parentNode) || this.util.isWysiwygDiv(contextImage._element.parentNode)) ? 
                contextImage._element : 
                /^A$/i.test(contextImage._element.parentNode.nodeName) ? contextImage._element.parentNode : this.util.getFormatElement(contextImage._element) || contextImage._element;
                
            existElement.parentNode.insertBefore(container, existElement);
            this.util.removeItem(existElement);
            imageEl = container.querySelector('img');

            contextImage._element = imageEl;
            contextImage._cover = cover;
            contextImage._container = container;
        }

        // transform
        if (!contextImage._onlyPercentage && changeSize) {
            if (!init && (/\d+/.test(imageEl.style.height) || (this.context.resizing._rotateVertical && contextImage._captionChecked))) {
                if (/%$/.test(contextImage.inputX.value) || /%$/.test(contextImage.inputY.value)) {
                    this.plugins.resizing.resetTransform.call(this, imageEl);
                } else {
                    this.plugins.resizing.setTransformSize.call(this, imageEl, this.util.getNumber(contextImage.inputX.value, 0), this.util.getNumber(contextImage.inputY.value, 0));
                }
            }
        }

        // size
        let isPercent = false;
        if (contextImage._resizing) {
            imageEl.setAttribute('data-proportion', contextImage._proportionChecked);
            if (changeSize) {
                this.plugins.image.applySize.call(this);
            }
        }

        // align
        if (!(isPercent && contextImage._align === 'center')) {
            this.plugins.image.setAlign.call(this, null, imageEl, null, null);
        }

        // set imagesInfo
        if (init) {
            this.plugins.image.setImagesInfo.call(this, imageEl, {
                'name': imageEl.getAttribute('data-file-name') || imageEl.src.split('/').pop(),
                'size': imageEl.getAttribute('data-file-size') || 0
            });
        }

        if (openController) {
            this.plugins.image.init.call(this);
            const size = this.plugins.resizing.call_controller_resize.call(this, imageEl, 'image');
            this.plugins.image.onModifyMode.call(this, imageEl, size);
        }

        // history stack
        if (!notHistoryPush) this.history.push(false);
    },

    update_src: function (src, element, file) {
        element.src = src;
        this._w.setTimeout(this.plugins.image.setImagesInfo.bind(this, element, file));
    },

    onModifyMode: function (element, size) {
        const contextImage = this.context.image;
        contextImage._linkElement = /^A$/i.test(element.parentNode.nodeName) ? element.parentNode : null;
        contextImage._element = element;
        contextImage._cover = this.util.getParentElement(element, 'FIGURE');
        contextImage._container = this.util.getParentElement(element, this.util.isComponent);
        contextImage._caption = this.util.getChildElement(contextImage._cover, 'FIGCAPTION');
        contextImage._align = element.getAttribute('data-align') || 'none';

        if (size) {
            contextImage._element_w = size.w;
            contextImage._element_h = size.h;
            contextImage._element_t = size.t;
            contextImage._element_l = size.l;
        }

        let userSize = contextImage._element.getAttribute('data-size') || contextImage._element.getAttribute('data-origin');
        if (userSize) {
            userSize = userSize.split(',');
            contextImage._origin_w = userSize[0];
            contextImage._origin_h = userSize[1];
        } else if (size) {
            contextImage._origin_w = size.w;
            contextImage._origin_h = size.h;
        }
    },

    openModify: function (notOpen) {
        const contextImage = this.context.image;
        contextImage.imgUrlFile.value = contextImage._element.src;
        contextImage._altText = contextImage.altText.value = contextImage._element.alt;
        contextImage._linkValue = contextImage.imgLink.value = contextImage._linkElement === null ? '' : contextImage._linkElement.href;
        contextImage.imgLinkNewWindowCheck.checked = contextImage._linkElement && contextImage._linkElement.target === '_blank';
        contextImage.modal.querySelector('input[name="suneditor_image_radio"][value="' + contextImage._align + '"]').checked = true;
        contextImage._align = contextImage.modal.querySelector('input[name="suneditor_image_radio"]:checked').value;
        contextImage._captionChecked = contextImage.captionCheckEl.checked = !!contextImage._caption;
        
        if (contextImage._resizing) {
            this.plugins.resizing._module_setModifyInputSize.call(this, contextImage, this.plugins.image);
        }

        if (!notOpen) this.plugins.dialog.open.call(this, 'image', true);
    },

    on: function (update) {
        if (!update) {
            const contextImage = this.context.image;
            contextImage.inputX.value = contextImage._origin_w = this.context.option.imageWidth === contextImage._defaultSizeX ? '' : this.context.option.imageWidth;
            contextImage.inputY.value = contextImage._origin_h = '';
            contextImage.inputY.disabled = true;
            contextImage.proportion.disabled = true;
        }
    },

    sizeRevert: function () {
        this.plugins.resizing._module_sizeRevert.call(this, this.context.image);
    },

    applySize: function (w, h) {
        const contextImage = this.context.image;

        if (!w) w = contextImage.inputX.value;
        if (!h) h = contextImage.inputY.value;
        
        if ((contextImage._onlyPercentage && !!w) || /%$/.test(w)) {
            this.plugins.image.setPercentSize.call(this, w, h);
            return true;
        } else if ((!w || w === 'auto') && (!h || h === 'auto')) {
            this.plugins.image.setAutoSize.call(this);
        } else {
            this.plugins.image.setSize.call(this, w, h, false);
        }

        return false;
    },

    setSize: function (w, h, notResetPercentage) {
        const contextImage = this.context.image;

        this.plugins.image.cancelPercentAttr.call(this);

        contextImage._element.style.width = this.util.isNumber(w) ? w + contextImage.sizeUnit : w;
        contextImage._element.style.height = this.util.isNumber(h) ? h + contextImage.sizeUnit : /%$/.test(h) ? '' : h;

        if (contextImage._align === 'center') this.plugins.image.setAlign.call(this, null, null, null, null);
        if (!notResetPercentage) contextImage._element.removeAttribute('data-percentage');

        // save current size
        this.plugins.resizing._module_saveCurrentSize.call(this, contextImage);
    },

    setAutoSize: function () {
        const contextImage = this.context.image;

        this.plugins.resizing.resetTransform.call(this, contextImage._element);
        this.plugins.image.cancelPercentAttr.call(this);

        contextImage._element.style.maxWidth = '';
        contextImage._element.style.width = '';
        contextImage._element.style.height = '';
        contextImage._cover.style.width = '';
        contextImage._cover.style.height = '';

        this.plugins.image.setAlign.call(this, null, null, null, null);
        contextImage._element.setAttribute('data-percentage', 'auto,auto');

        // save current size
        this.plugins.resizing._module_saveCurrentSize.call(this, contextImage);
    },
    
    setOriginSize: function () {
        const contextImage = this.context.image;
        contextImage._element.removeAttribute('data-percentage');

        this.plugins.resizing.resetTransform.call(this, contextImage._element);
        this.plugins.image.cancelPercentAttr.call(this);

        const originSize = (contextImage._element.getAttribute('data-origin') || '').split(',');
        const w = originSize[0];
        const h = originSize[1];

        if (originSize) {
            if (contextImage._onlyPercentage || (/%$/.test(w) && (/%$/.test(h) || !/\d/.test(h)))) {
                this.plugins.image.setPercentSize.call(this, w, h);
            } else {
                this.plugins.image.setSize.call(this, w, h);
            }

            // save current size
            this.plugins.resizing._module_saveCurrentSize.call(this, contextImage);
        }
    },

    setPercentSize: function (w, h) {
        const contextImage = this.context.image;
        h = !!h && !/%$/.test(h) && !this.util.getNumber(h, 0) ? this.util.isNumber(h) ? h + '%' : h : this.util.isNumber(h) ? h + contextImage.sizeUnit : (h || '');
        const heightPercentage = /%$/.test(h);

        contextImage._container.style.width = this.util.isNumber(w) ? w + '%' : w;
        contextImage._container.style.height = '';
        contextImage._cover.style.width = '100%';
        contextImage._cover.style.height = !heightPercentage ? '' : h;
        contextImage._element.style.width = '100%';
        contextImage._element.style.height = heightPercentage ? '' : h;
        contextImage._element.style.maxWidth = '';

        if (contextImage._align === 'center') this.plugins.image.setAlign.call(this, null, null, null, null);

        contextImage._element.setAttribute('data-percentage', w + ',' + h);
        this.plugins.resizing.setCaptionPosition.call(this, contextImage._element);

        // save current size
        this.plugins.resizing._module_saveCurrentSize.call(this, contextImage);
    },

    cancelPercentAttr: function () {
        const contextImage = this.context.image;
        
        contextImage._cover.style.width = '';
        contextImage._cover.style.height = '';
        contextImage._container.style.width = '';
        contextImage._container.style.height = '';

        this.util.removeClass(contextImage._container, this.context.image._floatClassRegExp);
        this.util.addClass(contextImage._container, '__se__float-' + contextImage._align);

        if (contextImage._align === 'center') this.plugins.image.setAlign.call(this, null, null, null, null);
    },

    setAlign: function (align, element, cover, container) {
        const contextImage = this.context.image;
        
        if (!align) align = contextImage._align;
        if (!element) element = contextImage._element;
        if (!cover) cover = contextImage._cover;
        if (!container) container = contextImage._container;

        if (align && align !== 'none') {
            cover.style.margin = 'auto';
        } else {
            cover.style.margin = '0';
        }

        if (/%$/.test(element.style.width) && align === 'center') {
            container.style.minWidth = '100%';
            cover.style.width = container.style.width;
        } else {
            container.style.minWidth = '';
            cover.style.width = this.context.resizing._rotateVertical ? (element.style.height || element.offsetHeight) : ((!element.style.width || element.style.width === 'auto') ? '' : element.style.width || '100%');
        }

        if (!this.util.hasClass(container, '__se__float-' + align)) {
            this.util.removeClass(container, contextImage._floatClassRegExp);
            this.util.addClass(container, '__se__float-' + align);
        }
        
        element.setAttribute('data-align', align);
    },

    resetAlign: function () {
        const contextImage = this.context.image;

        contextImage._element.setAttribute('data-align', '');
        contextImage._align = 'none';
        contextImage._cover.style.margin = '0';
        this.util.removeClass(contextImage._container, contextImage._floatClassRegExp);
    },

    destroy: function (element) {
        const imageEl = element || this.context.image._element;
        const imageContainer = this.util.getParentElement(imageEl, this.util.isComponent) || imageEl;
        const dataIndex = imageEl.getAttribute('data-index') * 1;
        let focusEl = (imageContainer.previousElementSibling || imageContainer.nextElementSibling);
        
        this.util.removeItem(imageContainer);
        this.plugins.image.init.call(this);

        this.controllersOff();

        // focus
        this.focusEdge(focusEl);
        
        // event
        if (dataIndex >= 0) {
            const imagesInfo = this._variable._imagesInfo;

            for (let i = 0, len = imagesInfo.length; i < len; i++) {
                if (dataIndex === imagesInfo[i].index) {
                    imagesInfo.splice(i, 1);
                    this._imageUpload(null, dataIndex, 'delete', null, 0);
                    return;
                }
            }
        }

        // history stack
        this.history.push(false);
    },

    init: function () {
        const contextImage = this.context.image;
        if (contextImage.imgInputFile) contextImage.imgInputFile.value = '';
        if (contextImage.imgUrlFile) contextImage.imgUrlFile.value = '';
        contextImage.altText.value = '';
        contextImage.imgLink.value = '';
        contextImage.imgLinkNewWindowCheck.checked = false;
        contextImage.modal.querySelector('input[name="suneditor_image_radio"][value="none"]').checked = true;
        contextImage.captionCheckEl.checked = false;
        contextImage._element = null;
        this.plugins.image.openTab.call(this, 'init');

        if (contextImage._resizing) {
            contextImage.inputX.value = this.context.option.imageWidth === contextImage._defaultSizeX ? '' : this.context.option.imageWidth;
            contextImage.inputY.value = '';
            contextImage.inputX.disabled = false;
            contextImage.inputY.disabled = false;
            contextImage.proportion.disabled = false;
            contextImage.proportion.checked = true;
            contextImage._ratio = false;
            contextImage._ratioX = 1;
            contextImage._ratioY = 1;
        }
    }
});


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'link',
    add: function (core) {
        core.addModule([_modules_dialog__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]]);

        const context = core.context;
        context.link = {
            focusElement: null,
            linkNewWindowCheck: null,
            linkAnchorText: null,
            _linkAnchor: null
        };

        /** link dialog */
        let link_dialog = this.setDialog.call(core);
        context.link.modal = link_dialog;
        context.link.focusElement = link_dialog.querySelector('._se_link_url');
        context.link.linkAnchorText = link_dialog.querySelector('._se_link_text');
        context.link.linkNewWindowCheck = link_dialog.querySelector('._se_link_check');

        /** link button */
        let link_button = this.setController_LinkButton.call(core);
        context.link.linkBtn = link_button;
        context.link._linkAnchor = null;
        link_button.addEventListener('mousedown', function (e) { e.stopPropagation(); }, false);

        /** add event listeners */
        link_dialog.querySelector('.se-btn-primary').addEventListener('click', this.submit.bind(core));
        link_button.addEventListener('click', this.onClick_linkBtn.bind(core));

        /** append html */
        context.dialog.modal.appendChild(link_dialog);
        context.element.relative.appendChild(link_button);

        /** empty memory */
        link_dialog = null, link_button = null;
    },

    /** dialog */
    setDialog: function () {
        const lang = this.lang;
        const dialog = this.util.createElement('DIV');

        dialog.className = 'se-dialog-content';
        dialog.style.display = 'none';
        dialog.innerHTML = '' +
            '<form class="editor_link">' +
                '<div class="se-dialog-header">' +
                    '<button type="button" data-command="close" class="close" aria-label="Close" title="' + lang.dialogBox.close + '">' +
                        '<i aria-hidden="true" data-command="close" class="se-icon-cancel"></i>' +
                    '</button>' +
                    '<span class="se-modal-title">' + lang.dialogBox.linkBox.title + '</span>' +
                '</div>' +
                '<div class="se-dialog-body">' +
                    '<div class="se-dialog-form">' +
                        '<label>' + lang.dialogBox.linkBox.url + '</label>' +
                        '<input class="se-input-form _se_link_url" type="text" />' +
                    '</div>' +
                    '<div class="se-dialog-form">' +
                        '<label>' + lang.dialogBox.linkBox.text + '</label><input class="se-input-form _se_link_text" type="text" />' +
                    '</div>' +
                    '<div class="se-dialog-form-footer">' +
                        '<label><input type="checkbox" class="se-dialog-btn-check _se_link_check" />&nbsp;' + lang.dialogBox.linkBox.newWindowCheck + '</label>' +
                    '</div>' +
                '</div>' +
                '<div class="se-dialog-footer">' +
                    '<button type="submit" class="se-btn-primary" title="' + lang.dialogBox.submitButton + '"><span>' + lang.dialogBox.submitButton + '</span></button>' +
                '</div>' +
            '</form>';

        return dialog;
    },

    /** modify controller button */
    setController_LinkButton: function () {
        const lang = this.lang;
        const link_btn = this.util.createElement('DIV');

        link_btn.className = 'se-controller se-controller-link';
        link_btn.innerHTML = '' +
            '<div class="se-arrow se-arrow-up"></div>' +
            '<div class="link-content"><span><a target="_blank" href=""></a>&nbsp;</span>' +
                '<div class="se-btn-group">' +
                    '<button type="button" data-command="update" tabindex="-1" class="se-tooltip">' +
                        '<i class="se-icon-edit"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.edit + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="unlink" tabindex="-1" class="se-tooltip">' +
                        '<i class="se-icon-unlink"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.unlink + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="delete" tabindex="-1" class="se-tooltip">' +
                        '<i class="se-icon-delete"></i>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.remove + '</span></span>' +
                    '</button>' +
                '</div>' +
            '</div>';

        return link_btn;
    },

    submit: function (e) {
        this.showLoading();

        e.preventDefault();
        e.stopPropagation();

        const submitAction = function () {
            if (this.context.link.focusElement.value.trim().length === 0) return false;

            const contextLink = this.context.link;
            const url = contextLink.focusElement.value;
            const anchor = contextLink.linkAnchorText;
            const anchorText = anchor.value.length === 0 ? url : anchor.value;

            if (!this.context.dialog.updateModal) {
                const oA = this.util.createElement('A');
                oA.href = url;
                oA.textContent = anchorText;
                oA.target = (contextLink.linkNewWindowCheck.checked ? '_blank' : '');

                const selectedFormats = this.getSelectedElements();
                if (selectedFormats.length > 1) {
                    const oFormat = this.util.createElement(selectedFormats[0].nodeName);
                    oFormat.appendChild(oA);
                    this.insertNode(oFormat);
                } else {
                    this.insertNode(oA);
                }

                this.setRange(oA.childNodes[0], 0, oA.childNodes[0], oA.textContent.length);
            } else {
                contextLink._linkAnchor.href = url;
                contextLink._linkAnchor.textContent = anchorText;
                contextLink._linkAnchor.target = (contextLink.linkNewWindowCheck.checked ? '_blank' : '');

                // set range
                this.setRange(contextLink._linkAnchor.childNodes[0], 0, contextLink._linkAnchor.childNodes[0], contextLink._linkAnchor.textContent.length);
            }

            // history stack
            this.history.push(false);

            contextLink.focusElement.value = '';
            contextLink.linkAnchorText.value = '';
        }.bind(this);

        try {
            submitAction();
        } finally {
            this.plugins.dialog.close.call(this);
            this.closeLoading();
            this.focus();
        }

        return false;
    },

    on: function (update) {
        if (!update) {
            this.context.link.linkAnchorText.value = this.getSelection().toString();
        }
        
        if (this.context.link._linkAnchor) {
            this.context.dialog.updateModal = true;
            this.context.link.focusElement.value = this.context.link._linkAnchor.href;
            this.context.link.linkAnchorText.value = this.context.link._linkAnchor.textContent;
            this.context.link.linkNewWindowCheck.checked = (/_blank/i.test(this.context.link._linkAnchor.target) ? true : false);
        }
    },

    call_controller_linkButton: function (selectionATag) {
        this.editLink = this.context.link._linkAnchor = selectionATag;
        const linkBtn = this.context.link.linkBtn;
        const link = linkBtn.querySelector('a');

        link.href = selectionATag.href;
        link.title = selectionATag.textContent;
        link.textContent = selectionATag.textContent;

        const offset = this.util.getOffset(selectionATag, this.context.element.wysiwygFrame);
        linkBtn.style.top = (offset.top + selectionATag.offsetHeight + 10) + 'px';
        linkBtn.style.left = (offset.left - this.context.element.wysiwygFrame.scrollLeft) + 'px';

        linkBtn.style.display = 'block';

        const overLeft = this.context.element.wysiwygFrame.offsetWidth - (linkBtn.offsetLeft + linkBtn.offsetWidth);
        if (overLeft < 0) {
            linkBtn.style.left = (linkBtn.offsetLeft + overLeft) + 'px';
            linkBtn.firstElementChild.style.left = (20 - overLeft) + 'px';
        } else {
            linkBtn.firstElementChild.style.left = '20px';
        }
        
        this.controllersOn(linkBtn, this.plugins.link.init.bind(this));
    },

    onClick_linkBtn: function (e) {
        e.stopPropagation();

        const command = e.target.getAttribute('data-command') || e.target.parentNode.getAttribute('data-command');
        if (!command) return;

        e.preventDefault();

        if (/update/.test(command)) {
            this.context.link.focusElement.value = this.context.link._linkAnchor.href;
            this.context.link.linkAnchorText.value = this.context.link._linkAnchor.textContent;
            this.context.link.linkNewWindowCheck.checked = (/_blank/i.test(this.context.link._linkAnchor.target) ? true : false);
            this.plugins.dialog.open.call(this, 'link', true);
        }
        else if (/unlink/.test(command)) {
            const sc = this.util.getChildElement(this.context.link._linkAnchor, function (current) { return current.childNodes.length === 0 || current.nodeType === 3; }, false);
            const ec = this.util.getChildElement(this.context.link._linkAnchor, function (current) { return current.childNodes.length === 0 || current.nodeType === 3; }, true);
            this.setRange(sc, 0, ec, ec.textContent.length);
            this.nodeChange(null, null, ['A'], false);
        }
        else {
            /** delete */
            this.util.removeItem(this.context.link._linkAnchor);
            this.context.link._linkAnchor = null;
            this.focus();

            // history stack
            this.history.push(false);
        }

        this.controllersOff();
    },

    init: function () {
        if (!/link/i.test(this.context.dialog.kind)) {
            const contextLink = this.context.link;
            contextLink.linkBtn.style.display = 'none';
            contextLink._linkAnchor = null;
            contextLink.focusElement.value = '';
            contextLink.linkAnchorText.value = '';
            contextLink.linkNewWindowCheck.checked = false;
        }
    }
});


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _modules_resizing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */





/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'video',
    add: function (core) {
        core.addModule([_modules_dialog__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"], _modules_resizing__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]]);

        const context = core.context;
        context.video = {
            sizeUnit: context.option._videoSizeUnit,
            _container: null,
            _cover: null,
            _element: null,
            _element_w: 1,
            _element_h: 1,
            _element_l: 0,
            _element_t: 0,
            _defaultSizeX: '100%',
            _defaultSizeY: (context.option.videoRatio * 100) + '%',
            _origin_w: context.option.videoWidth === '100%' ? '' : context.option.videoWidth,
            _origin_h: '',
            _proportionChecked: true,
            _align: 'none',
            _floatClassRegExp: '__se__float\\-[a-z]+',
            _captionShow: false,
            _resizing: context.option.videoResizing,
            _rotation: context.option.videoRotation,
            _resizeDotHide: !context.option.videoHeightShow,
            _onlyPercentage: context.option.videoSizeOnlyPercentage,
            _ratio: false,
            _ratioX: 1,
            _ratioY: 1,
            _youtubeQuery: context.option.youtubeQuery,
            _videoRatio: (context.option.videoRatio * 100) + '%',
            _defaultRatio: (context.option.videoRatio * 100) + '%'
        };

        /** video dialog */
        let video_dialog = this.setDialog.call(core);
        context.video.modal = video_dialog;
        context.video.focusElement = video_dialog.querySelector('._se_video_url');

        /** add event listeners */
        video_dialog.querySelector('.se-btn-primary').addEventListener('click', this.submit.bind(core));

        context.video.proportion = {};
        context.video.videoRatioOption = {};
        context.video.inputX = {};
        context.video.inputY = {};
        if (context.option.videoResizing) {
            context.video.proportion = video_dialog.querySelector('._se_video_check_proportion');
            context.video.videoRatioOption = video_dialog.querySelector('.se-video-ratio');
            context.video.inputX = video_dialog.querySelector('._se_video_size_x');
            context.video.inputY = video_dialog.querySelector('._se_video_size_y');
            context.video.inputX.value = context.option.videoWidth;

            context.video.inputX.addEventListener('keyup', this.setInputSize.bind(core, 'x'));
            context.video.inputY.addEventListener('keyup', this.setInputSize.bind(core, 'y'));

            context.video.inputX.addEventListener('change', this.setRatio.bind(core));
            context.video.inputY.addEventListener('change', this.setRatio.bind(core));
            context.video.proportion.addEventListener('change', this.setRatio.bind(core));
            context.video.videoRatioOption.addEventListener('change', this.setVideoRatio.bind(core));

            video_dialog.querySelector('.se-dialog-btn-revert').addEventListener('click', this.sizeRevert.bind(core));
        }

        /** append html */
        context.dialog.modal.appendChild(video_dialog);

        /** empty memory */
        video_dialog = null;
    },

    /** dialog */
    setDialog: function () {
        const option = this.context.option;
        const lang = this.lang;
        const dialog = this.util.createElement('DIV');

        dialog.className = 'se-dialog-content';
        dialog.style.display = 'none';
        let html = '' +
            '<form class="editor_video">' +
                '<div class="se-dialog-header">' +
                    '<button type="button" data-command="close" class="close" aria-label="Close" title="' + lang.dialogBox.close + '">' +
                        '<i aria-hidden="true" data-command="close" class="se-icon-cancel"></i>' +
                    '</button>' +
                    '<span class="se-modal-title">' + lang.dialogBox.videoBox.title + '</span>' +
                '</div>' +
                '<div class="se-dialog-body">' +
                    '<div class="se-dialog-form">' +
                        '<label>' + lang.dialogBox.videoBox.url + '</label>' +
                        '<input class="se-input-form _se_video_url" type="text" />' +
                    '</div>';

            if (option.videoResizing) {
                const ratioList = option.videoRatioList || [{name: '16:9', value: 0.5625}, {name: '4:3', value: 0.75}, {name: '21:9', value: 0.4285}];
                const ratio = option.videoRatio;
                const onlyPercentage = option.videoSizeOnlyPercentage;
                const onlyPercentDisplay = onlyPercentage ? ' style="display: none !important;"' : '';
                const heightDisplay = !option.videoHeightShow ? ' style="display: none !important;"' : '';
                const ratioDisplay = !option.videoRatioShow ? ' style="display: none !important;"' : '';
                const onlyWidthDisplay = !onlyPercentage && !option.videoHeightShow && !option.videoRatioShow ? ' style="display: none !important;"' : '';
                html += '' +
                    '<div class="se-dialog-form">' +
                        '<div class="se-dialog-size-text">' +
                            '<label class="size-w">' + lang.dialogBox.width + '</label>' +
                            '<label class="se-dialog-size-x">&nbsp;</label>' +
                            '<label class="size-h"' + heightDisplay + '>' + lang.dialogBox.height + '</label>' +
                            '<label class="size-h"' + ratioDisplay + '>(' + lang.dialogBox.ratio + ')</label>' +
                        '</div>' +
                        '<input class="se-input-control _se_video_size_x" placeholder="100%"' + (onlyPercentage ? ' type="number" min="1"' : 'type="text"') + (onlyPercentage ? ' max="100"' : '') + '/>' +
                        '<label class="se-dialog-size-x"' + onlyWidthDisplay + '>' + (onlyPercentage ? '%' : 'x') + '</label>' +
                        '<input class="se-input-control _se_video_size_y" placeholder="' + (option.videoRatio * 100) + '%"' + (onlyPercentage ? ' type="number" min="1"' : 'type="text"') + (onlyPercentage ? ' max="100"' : '') + heightDisplay + '/>' +
                        '<select class="se-input-select se-video-ratio" title="' + lang.dialogBox.ratio + '"' + ratioDisplay + '>';
                            if (!heightDisplay) html += '<option value=""> - </option>';
                            for (let i = 0, len = ratioList.length; i < len; i++) {
                                html += '<option value="' + ratioList[i].value + '"' + (ratio.toString() === ratioList[i].value.toString() ? ' selected' : '') + '>' + ratioList[i].name + '</option>';
                            }
                        html += '</select>' +
                        '<button type="button" title="' + lang.dialogBox.revertButton + '" class="se-btn se-dialog-btn-revert" style="float: right;"><i class="se-icon-revert"></i></button>' +
                    '</div>' +
                    '<div class="se-dialog-form se-dialog-form-footer"' + onlyPercentDisplay + onlyWidthDisplay + '>' +
                        '<label><input type="checkbox" class="se-dialog-btn-check _se_video_check_proportion" checked/>&nbsp;' + lang.dialogBox.proportion + '</label>' +
                    '</div>';
            }

            html += '' +
                '</div>' +
                '<div class="se-dialog-footer">' +
                    '<div>' +
                        '<label><input type="radio" name="suneditor_video_radio" class="se-dialog-btn-radio" value="none" checked>' + lang.dialogBox.basic + '</label>' +
                        '<label><input type="radio" name="suneditor_video_radio" class="se-dialog-btn-radio" value="left">' + lang.dialogBox.left + '</label>' +
                        '<label><input type="radio" name="suneditor_video_radio" class="se-dialog-btn-radio" value="center">' + lang.dialogBox.center + '</label>' +
                        '<label><input type="radio" name="suneditor_video_radio" class="se-dialog-btn-radio" value="right">' + lang.dialogBox.right + '</label>' +
                    '</div>' +
                    '<button type="submit" class="se-btn-primary" title="' + lang.dialogBox.submitButton + '"><span>' + lang.dialogBox.submitButton + '</span></button>' +
                '</div>' +
            '</form>';

        dialog.innerHTML = html;

        return dialog;
    },
    
    setVideoRatio: function (e) {
        const contextVideo = this.context.video;
        const value = e.target.options[e.target.selectedIndex].value;

        contextVideo._defaultSizeY = contextVideo._videoRatio = !value ? contextVideo._defaultSizeY : (value * 100) + '%';
        contextVideo.inputY.placeholder = !value ? '' : (value * 100) + '%';
        contextVideo.inputY.value = '';
    },

    setInputSize: function (xy, e) {
        if (e && e.keyCode === 32) {
            e.preventDefault();
            return;
        }

        const contextVideo = this.context.video;
        this.plugins.resizing._module_setInputSize.call(this, contextVideo, xy);

        if (xy === 'y') {
            this.plugins.video.setVideoRatioSelect.call(this, e.target.value || contextVideo._videoRatio);
        }
    },

    setRatio: function () {
        this.plugins.resizing._module_setRatio.call(this, this.context.video);
    },

    _onload_video: function (frame) {
        this.plugins.video.setVideosInfo.call(this, frame);
    },

    submitAction: function () {
        if (this.context.video.focusElement.value.trim().length === 0) return false;
        this.context.resizing._resize_plugin = 'video';

        const contextVideo = this.context.video;
        let oIframe = null;
        let cover = null;
        let container = null;
        let url = contextVideo.focusElement.value.trim();
        contextVideo._align = contextVideo.modal.querySelector('input[name="suneditor_video_radio"]:checked').value;

        /** iframe source */
        if (/^<iframe.*\/iframe>$/.test(url)) {
            oIframe = (new this._w.DOMParser()).parseFromString(url, 'text/html').querySelector('iframe');
        }
        /** url */
        else {
            oIframe = this.util.createElement('IFRAME');
            /** youtube */
            if (/youtu\.?be/.test(url)) {
                if (!/^http/.test(url)) url = 'https://' + url;
                url = url.replace('watch?v=', '');
                if (!/^\/\/.+\/embed\//.test(url)) {
                    url = url.replace(url.match(/\/\/.+\//)[0], '//www.youtube.com/embed/').replace('&', '?&');
                }

                if (contextVideo._youtubeQuery.length > 0) {
                    if (/\?/.test(url)) {
                        const splitUrl = url.split('?');
                        url = splitUrl[0] + '?' + contextVideo._youtubeQuery + '&' + splitUrl[1];
                    } else {
                        url += '?' + contextVideo._youtubeQuery;
                    }
                }
            }
            oIframe.src = url;
        }

        /** update */
        if (this.context.dialog.updateModal) {
            if (contextVideo._element.src !== oIframe.src) contextVideo._element.src = oIframe.src;
            container = contextVideo._container;
            cover = this.util.getParentElement(contextVideo._element, 'FIGURE');
            oIframe = contextVideo._element;
        }
        /** create */
        else {
            oIframe.frameBorder = '0';
            oIframe.allowFullscreen = true;
            oIframe.addEventListener('load', this.plugins.video._onload_video.bind(this, oIframe));
            contextVideo._element = oIframe;

            /** cover */
            cover = this.plugins.resizing.set_cover.call(this, oIframe);

            /** container */
            container = this.plugins.resizing.set_container.call(this, cover, 'se-video-container');
            this._variable._videosCnt++;
        }

        /** rendering */
        contextVideo._cover = cover;
        contextVideo._container = container;

        const inputUpdate = (this.plugins.resizing._module_getSizeX.call(this, contextVideo) !== (contextVideo.inputX.value || contextVideo._defaultSizeX)) || (this.plugins.resizing._module_getSizeY.call(this, contextVideo) !== (contextVideo.inputY.value || contextVideo._videoRatio));
        const changeSize = !this.context.dialog.updateModal || inputUpdate;

        if (contextVideo._resizing) {
            this.context.video._proportionChecked = contextVideo.proportion.checked;
            oIframe.setAttribute('data-proportion', contextVideo._proportionChecked);
        }

        // size
        let isPercent = false;
        if (changeSize) {
            isPercent = this.plugins.video.applySize.call(this);
        }

        // align
        if (!(isPercent && contextVideo._align === 'center')) {
            this.plugins.video.setAlign.call(this, null, oIframe, cover, container);
        }

        if (!this.context.dialog.updateModal) {
            this.insertComponent(container, false);
        }
        else if (contextVideo._resizing && this.context.resizing._rotateVertical && changeSize) {
            this.plugins.resizing.setTransformSize.call(this, oIframe, null, null);
        }
        
        this.context.resizing._resize_plugin = '';

        // history stack
        if (this.context.dialog.updateModal) {
            this.history.push(false);
        }
    },

    setVideosInfo: function (frame) {
        if (!frame.getAttribute('data-origin')) {
            const container = this.util.getParentElement(frame, this.util.isComponent);
            const cover = this.util.getParentElement(frame, 'FIGURE');

            const w = this.plugins.resizing._module_getSizeX.call(this, this.context.video, frame, cover, container);
            const h = this.plugins.resizing._module_getSizeY.call(this, this.context.video, frame, cover, container);
            
            frame.setAttribute('data-origin', w + ',' + h);
            frame.setAttribute('data-size', w + ',' + h);
        }
    },

    submit: function (e) {
        this.showLoading();

        e.preventDefault();
        e.stopPropagation();

        try {
            this.plugins.video.submitAction.call(this);
        } finally {
            this.plugins.dialog.close.call(this);
            this.closeLoading();
        }

        this.focus();

        return false;
    },

    _update_videoCover: function (oIframe) {
        const contextVideo = this.context.video;

        oIframe.frameBorder = '0';
        oIframe.allowFullscreen = true;
        oIframe.onload = oIframe.addEventListener('load', this.plugins.video._onload_video.bind(this, oIframe));
        
        const existElement = this.util.getParentElement(oIframe, this.util.isComponent) || 
            this.util.getParentElement(oIframe, function (current) {
                return this.isWysiwygDiv(current.parentNode);
            }.bind(this.util));

        contextVideo._element = oIframe = oIframe.cloneNode(false);
        const cover = contextVideo._cover = this.plugins.resizing.set_cover.call(this, oIframe);
        const container = contextVideo._container = this.plugins.resizing.set_container.call(this, cover, 'se-video-container');

        const figcaption = existElement.getElementsByTagName('FIGCAPTION')[0];
        let caption = null;
        if (!!figcaption) {
            caption = this.util.createElement('DIV');
            caption.innerHTML = figcaption.innerHTML;
            this.util.removeItem(figcaption);
        }

        const size = (oIframe.getAttribute('data-size') || oIframe.getAttribute('data-origin') || '').split(',');
        this.plugins.video.applySize.call(this, (size[0] || this.context.option.videoWidth), (size[1] || ''));

        existElement.parentNode.insertBefore(container, existElement);
        if (!!caption) existElement.parentNode.insertBefore(caption, existElement);
        this.util.removeItem(existElement);
    },

    onModifyMode: function (element, size) {
        const contextVideo = this.context.video;
        contextVideo._element = element;
        contextVideo._cover = this.util.getParentElement(element, 'FIGURE');
        contextVideo._container = this.util.getParentElement(element, this.util.isComponent);

        contextVideo._align = element.getAttribute('data-align') || 'none';

        contextVideo._element_w = size.w;
        contextVideo._element_h = size.h;
        contextVideo._element_t = size.t;
        contextVideo._element_l = size.l;

        let origin = contextVideo._element.getAttribute('data-size') || contextVideo._element.getAttribute('data-origin');
        if (origin) {
            origin = origin.split(',');
            contextVideo._origin_w = origin[0];
            contextVideo._origin_h = origin[1];
        } else {
            contextVideo._origin_w = size.w;
            contextVideo._origin_h = size.h;
        }
    },

    openModify: function (notOpen) {
        const contextVideo = this.context.video;

        contextVideo.focusElement.value = contextVideo._element.src;
        contextVideo.modal.querySelector('input[name="suneditor_video_radio"][value="' + contextVideo._align + '"]').checked = true;

        if (contextVideo._resizing) {
            this.plugins.resizing._module_setModifyInputSize.call(this, contextVideo, this.plugins.video);
            
            const y = contextVideo._videoRatio = this.plugins.resizing._module_getSizeY.call(this, contextVideo);
            const ratioSelected = this.plugins.video.setVideoRatioSelect.call(this, y);
            if (!ratioSelected) contextVideo.inputY.value = contextVideo._onlyPercentage ? this.util.getNumber(y, 2) : y;
        }

        if (!notOpen) this.plugins.dialog.open.call(this, 'video', true);
    },

    on: function (update) {
        if (!update) {
            const contextVideo = this.context.video;
            contextVideo.inputX.value = contextVideo._origin_w = this.context.option.videoWidth === contextVideo._defaultSizeX ? '' : this.context.option.videoWidth;
            contextVideo.inputY.value = contextVideo._origin_h = '';
            contextVideo.proportion.disabled = true;
        }
    },
    
    setVideoRatioSelect: function (value) {
        let ratioSelected = false;
        const contextVideo = this.context.video;
        const ratioOptions = contextVideo.videoRatioOption.options;

        if (/%$/.test(value) || contextVideo._onlyPercentage) value = (this.util.getNumber(value, 2) / 100) + '';
        else if (!this.util.isNumber(value) || (value * 1) >= 1) value = '';

        contextVideo.inputY.placeholder = '';
        for (let i = 0, len = ratioOptions.length; i < len; i++) {
            if (ratioOptions[i].value === value) {
                ratioSelected = ratioOptions[i].selected = true;
                contextVideo.inputY.placeholder = !value ? '' : (value * 100) + '%';
            }
            else ratioOptions[i].selected = false;
        }

        return ratioSelected;
    },

    checkVideosInfo: function () {
        const videos = this.context.element.wysiwyg.getElementsByTagName('IFRAME');
        if (videos.length === this._variable._videosCnt) return;

        this.context.resizing._resize_plugin = 'video';
        const videoPlugin = this.plugins.video;
        this._variable._videosCnt = videos.length;

        for (let i = 0, len = this._variable._videosCnt, video, container; i < len; i++) {
            video = videos[i];
            container = this.util.getParentElement(video, this.util.isComponent);
            if (!container || container.getElementsByTagName('figcaption').length > 0 || !video.style.width) {
                videoPlugin._update_videoCover.call(this, video);
            }
        }

        this.context.resizing._resize_plugin = '';
    },

    sizeRevert: function () {
        this.plugins.resizing._module_sizeRevert.call(this, this.context.video);
    },

    applySize: function (w, h) {
        const contextVideo = this.context.video;

        if (!w) w = contextVideo.inputX.value;
        if (!h) h = contextVideo.inputY.value;
        
        if (contextVideo._onlyPercentage || /%$/.test(w) || !w) {
            this.plugins.video.setPercentSize.call(this, (w || '100%'), (h || contextVideo._videoRatio));
            return true;
        } else if ((!w || w === 'auto') && (!h || h === 'auto')) {
            this.plugins.video.setAutoSize.call(this);
        } else {
            this.plugins.video.setSize.call(this, w, (h || contextVideo._defaultRatio), false);
        }

        return false;
    },

    setSize: function (w, h, notResetPercentage) {
        const contextVideo = this.context.video;

        w = this.util.getNumber(w, 0);
        h = this.util.isNumber(h) ? h + contextVideo.sizeUnit : !h ? '' : h;

        contextVideo._element.style.width = w ? w + contextVideo.sizeUnit : '';
        contextVideo._cover.style.paddingBottom = contextVideo._cover.style.height = h;
        if (!/%$/.test(h)) contextVideo._element.style.height = h;
        else contextVideo._element.style.height = '';

        if (!notResetPercentage) contextVideo._element.removeAttribute('data-percentage');

        // save current size
        this.plugins.resizing._module_saveCurrentSize.call(this, contextVideo);
    },

    setAutoSize: function () {
        this.plugins.video.setPercentSize.call(this, 100, this.context.video._defaultRatio);
    },

    setOriginSize: function (dataSize) {
        const contextVideo = this.context.video;
        contextVideo._element.removeAttribute('data-percentage');

        this.plugins.resizing.resetTransform.call(this, contextVideo._element);
        this.plugins.video.cancelPercentAttr.call(this);

        const originSize = ((dataSize ? contextVideo._element.getAttribute('data-size') : '') || contextVideo._element.getAttribute('data-origin') || '').split(',');
        
        if (originSize) {
            const w = originSize[0];
            const h = originSize[1];

            if (contextVideo._onlyPercentage || (/%$/.test(w) && (/%$/.test(h) || !/\d/.test(h)))) {
                this.plugins.video.setPercentSize.call(this, w, h);
            } else {
                this.plugins.video.setSize.call(this, w, h);
            }

            // save current size
            this.plugins.resizing._module_saveCurrentSize.call(this, contextVideo);
        }
    },

    setPercentSize: function (w, h) {
        const contextVideo = this.context.video;
        h = !!h && !/%$/.test(h) && !this.util.getNumber(h, 0) ? this.util.isNumber(h) ? h + '%' : h : this.util.isNumber(h) ? h + contextVideo.sizeUnit : (h || contextVideo._videoRatio);

        contextVideo._container.style.width = this.util.isNumber(w) ? w + '%' : w;
        contextVideo._container.style.height = '';
        contextVideo._cover.style.width = '100%';
        contextVideo._cover.style.height = h;
        contextVideo._cover.style.paddingBottom = h;
        contextVideo._element.style.width = '100%';
        contextVideo._element.style.height = '100%';
        contextVideo._element.style.maxWidth = '';

        if (contextVideo._align === 'center') this.plugins.video.setAlign.call(this, null, null, null, null);
        contextVideo._element.setAttribute('data-percentage', w + ',' + h);

        // save current size
        this.plugins.resizing._module_saveCurrentSize.call(this, contextVideo);
    },

    cancelPercentAttr: function () {
        const contextVideo = this.context.video;
        
        contextVideo._cover.style.width = '';
        contextVideo._cover.style.height = '';
        contextVideo._cover.style.paddingBottom = '';
        contextVideo._container.style.width = '';
        contextVideo._container.style.height = '';

        this.util.removeClass(contextVideo._container, this.context.video._floatClassRegExp);
        this.util.addClass(contextVideo._container, '__se__float-' + contextVideo._align);

        if (contextVideo._align === 'center') this.plugins.video.setAlign.call(this, null, null, null, null);
    },

    setAlign: function (align, element, cover, container) {
        const contextVideo = this.context.video;
        
        if (!align) align = contextVideo._align;
        if (!element) element = contextVideo._element;
        if (!cover) cover = contextVideo._cover;
        if (!container) container = contextVideo._container;

        if (align && align !== 'none') {
            cover.style.margin = 'auto';
        } else {
            cover.style.margin = '0';
        }

        if (/%$/.test(element.style.width) && align === 'center') {
            container.style.minWidth = '100%';
            cover.style.width = container.style.width;
            cover.style.height = cover.style.paddingBottom;
            cover.style.paddingBottom = this.util.getNumber((this.util.getNumber(cover.style.paddingBottom, 2) / 100) * this.util.getNumber(cover.style.width, 2), 2) + '%';
        } else {
            container.style.minWidth = '';
            cover.style.width = this.context.resizing._rotateVertical ? (element.style.height || element.offsetHeight) : (element.style.width || '100%');
            cover.style.paddingBottom = cover.style.height;
        }

        if (!this.util.hasClass(container, '__se__float-' + align)) {
            this.util.removeClass(container, contextVideo._floatClassRegExp);
            this.util.addClass(container, '__se__float-' + align);
        }
        
        element.setAttribute('data-align', align);
    },

    resetAlign: function () {
        const contextVideo = this.context.video;

        contextVideo._element.setAttribute('data-align', '');
        contextVideo._align = 'none';
        contextVideo._cover.style.margin = '0';
        this.util.removeClass(contextVideo._container, contextVideo._floatClassRegExp);
    },

    destroy: function () {
        this._variable._videosCnt--;
        const container = this.context.video._container;
        let focusEl = (container.previousElementSibling || container.nextElementSibling);
        this.util.removeItem(container);
        this.plugins.video.init.call(this);
        this.controllersOff();

        // focus
        this.focusEdge(focusEl);

        // history stack
        this.history.push(false);
    },

    init: function () {
        const contextVideo = this.context.video;
        contextVideo.focusElement.value = '';
        contextVideo._origin_w = this.context.option.videoWidth;
        contextVideo._origin_h = '';

        contextVideo.modal.querySelector('input[name="suneditor_video_radio"][value="none"]').checked = true;
        
        if (contextVideo._resizing) {
            contextVideo.inputX.value = this.context.option.videoWidth === contextVideo._defaultSizeX ? '' : this.context.option.videoWidth;
            contextVideo.inputY.value = '';
            contextVideo.proportion.checked = true;
            contextVideo.proportion.disabled = true;
            this.plugins.video.setVideoRatioSelect.call(this, contextVideo._defaultRatio);
        }
    }
});


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * 
 * Danish translation by davidkonrad at github or gmail
 *
 * MIT license.
 */


(function (global, factory) {
    if ( true && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error('SUNEDITOR_LANG a window with a document');
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    const lang = {
        toolbar: {
            default: 'Default',
            save: 'Gem',
            font: 'Skrifttype',
            formats: 'Format',
            fontSize: 'Skriftstørrelse',
            bold: 'Fed',
            underline: 'Understreget',
            italic: 'Skråskrift',
            strike: 'Overstreget',
            subscript: 'Sænket skrift',
            superscript: 'Hævet skrift',
            removeFormat: 'Fjern formatering',
            fontColor: 'Skriftfarve',
            hiliteColor: 'Baggrundsfarve',
            indent: 'Ryk ind',
            outdent: 'Ryk ud',
            align: 'Justering',
            alignLeft: 'Venstrejustering',
            alignRight: 'Højrejustering',
            alignCenter: 'Midterjustering',
            alignJustify: 'Tilpas margin',
            list: 'Lister',
            orderList: 'Nummereret liste',
            unorderList: 'Uordnet liste',
            horizontalRule: 'Horisontal linie',
            hr_solid: 'Almindelig',
            hr_dotted: 'Punkteret',
            hr_dashed: 'Streget',
            table: 'Tabel',
            link: 'Link',
            image: 'Billede',
            video: 'Video',
            fullScreen: 'Fuld skærm',
            showBlocks: 'Vis blokke',
            codeView: 'Vis koder',
            undo: 'Undo',
            redo: 'Redo',
            preview: 'Preview',
            print: 'Print',
            tag_p: 'Paragraph',
            tag_div: 'Normal (DIV)',
            tag_h: 'Overskrift',
            tag_blockquote: 'Citer',
            tag_pre: 'Code',
            template: 'Schablone',
            lineHeight: 'Linjehøjde',
            paragraphStyle: 'Afsnitstil',
            textStyle: 'Tekststil'
        },
        dialogBox: {
            linkBox: {
                title: 'Indsæt link',
                url: 'URL til link',
                text: 'Tekst for link',
                newWindowCheck: 'Åben i nyt faneblad'
            },
            imageBox: {
                title: 'Indsæt billede',
                file: 'Indsæt fra fil',
                url: 'Indsæt fra URL',
                altText: 'Alternativ tekst'
            },
            videoBox: {
                title: 'Indsæt Video',
                url: 'Indlejr video / YouTube'
            },
            caption: 'Indsæt beskrivelse',
            close: 'Luk',
            submitButton: 'Gennemfør',
            revertButton: 'Gendan',
            proportion: 'Bevar proportioner',
            basic: 'Basis',
            left: 'Venstre',
            right: 'Højre',
            center: 'Center',
            width: 'Bredde',
            height: 'Højde',
            size: 'Størrelse',
            ratio: 'Forhold'
        },
        controller: {
            edit: 'Rediger',
            unlink: 'Fjern link',
            remove: 'Fjern',
            insertRowAbove: 'Indsæt række foroven',
            insertRowBelow: 'Indsæt række nedenfor',
            deleteRow: 'Slet række',
            insertColumnBefore: 'Indsæt kolonne før',
            insertColumnAfter: 'Indsæt kolonne efter',
            deleteColumn: 'Slet kolonne',
            resize100: 'Forstør 100%',
            resize75: 'Forstør 75%',
            resize50: 'Forstør 50%',
            resize25: 'Forstør 25%',
            autoSize: 'Auto størrelse',
            mirrorHorizontal: 'Spejling, horisontal',
            mirrorVertical: 'Spejling, vertikal',
            rotateLeft: 'Roter til venstre',
            rotateRight: 'Toter til højre',
            maxSize: 'Max størrelse',
            minSize: 'Min størrelse',
            tableHeader: 'Tabel overskrift',
            mergeCells: 'Sammenlæg celler (merge)',
            splitCells: 'Opdel celler',
            HorizontalSplit: 'Opdel horisontalt',
            VerticalSplit: 'Opdel vertikalt'
        },
        menu: {
            spaced: 'Brev Afstand',
            bordered: 'Afgrænsningslinje',
            neon: 'Neon',
            translucent: 'Gennemsigtig',
            shadow: 'Skygge'
        }
    };

    if (typeof noGlobal === typeof undefined) {
        if (!window.SUNEDITOR_LANG) {
            window.SUNEDITOR_LANG = {};
        }

        window.SUNEDITOR_LANG.da = lang;
    }

    return lang;
}));


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2019 @Gundolf68
 * MIT license.
 */


(function (global, factory) {
    if ( true && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error('SUNEDITOR_LANG a window with a document');
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    const lang = {
        toolbar: {
            default: 'Standard',
            save: 'Speichern',
            font: 'Schriftart',
            formats: 'Format',
            fontSize: 'Schriftgröße',
            bold: 'Fett',
            underline: 'Unterstrichen',
            italic: 'Kursiv',
            strike: 'Durchgestrichen',
            subscript: 'Tiefgestellt',
            superscript: 'Hochgestellt',
            removeFormat: 'Format entfernen',
            fontColor: 'Schriftfarbe',
            hiliteColor: 'Farbe für Hervorhebungen',
            indent: 'Einzug vergrößern',
            outdent: 'Einzug verkleinern',
            align: 'Ausrichtung',
            alignLeft: 'Links ausrichten',
            alignRight: 'Rechts ausrichten',
            alignCenter: 'Zentriert ausrichten',
            alignJustify: 'Blocksatz',
            list: 'Liste',
            orderList: 'Nummerierte Liste',
            unorderList: 'Aufzählung',
            horizontalRule: 'Horizontale Linie',
            hr_solid: 'Strich',
            hr_dotted: 'Gepunktet',
            hr_dashed: 'Gestrichelt',
            table: 'Tabelle',
            link: 'Link',
            image: 'Bild',
            video: 'Video',
            fullScreen: 'Vollbild',
            showBlocks: 'Blockformatierungen anzeigen',
            codeView: 'Quelltext anzeigen',
            undo: 'Rückgängig',
            redo: 'Wiederholen',
            preview: 'Vorschau',
            print: 'Drucken',
            tag_p: 'Absatz',
            tag_div: 'Normal (DIV)',
            tag_h: 'Header',
            tag_blockquote: 'Zitat',
            tag_pre: 'Quellcode',
            template: 'Vorlage',
            lineHeight: 'Zeilenhöhe',
            paragraphStyle: 'Absatzstil',
            textStyle: 'Textstil'
        },
        dialogBox: {
            linkBox: {
                title: 'Link einfügen',
                url: 'Link-URL',
                text: 'Link-Text',
                newWindowCheck: 'In neuem Fenster anzeigen'
            },
            imageBox: {
                title: 'Bild einfügen',
                file: 'Datei auswählen',
                url: 'Bild-URL',
                altText: 'Alternativer Text'
            },
            videoBox: {
                title: 'Video enfügen',
                url: 'Video-URL, YouTube'
            },
            caption: 'Beschreibung eingeben',
            close: 'Schließen',
            submitButton: 'Übernehmen',
            revertButton: 'Rückgängig',
            proportion: 'Seitenverhältnis beibehalten',
            basic: 'Standard',
            left: 'Links',
            right: 'Rechts',
            center: 'Zentriert',
            width: 'Breite',
            height: 'Höhe',
            size: 'Größe',
            ratio: 'Verhältnis'
        },
        controller: {
            edit: 'Bearbeiten',
            unlink: 'Link entfernen',
            remove: 'Löschen',
            insertRowAbove: 'Zeile oberhalb einfügen',
            insertRowBelow: 'Zeile unterhalb einfügen',
            deleteRow: 'Zeile löschen',
            insertColumnBefore: 'Spalte links einfügen',
            insertColumnAfter: 'Spalte rechts einfügen',
            deleteColumn: 'Spalte löschen',
            resize100: 'Zoom 100%',
            resize75: 'Zoom 75%',
            resize50: 'Zoom 50%',
            resize25: 'Zoom 25%',
            autoSize: 'Automatische Größenanpassung',
            mirrorHorizontal: 'Horizontal spiegeln',
            mirrorVertical: 'Vertikal spiegeln',
            rotateLeft: 'Nach links drehen',
            rotateRight: 'Nach rechts drehen',
            maxSize: 'Maximale Größe',
            minSize: 'Mindestgröße',
            tableHeader: 'Tabellenüberschrift',
            mergeCells: 'Zellen verbinden',
            splitCells: 'Zellen teilen',
            HorizontalSplit: 'Horizontal teilen',
            VerticalSplit: 'Vertikal teilen'
        },
        menu: {
            spaced: 'Buchstabenabstand',
            bordered: 'Umrandet',
            neon: 'Neon',
            translucent: 'Durchscheinend',
            shadow: 'Schatten'
        }
    };

    if (typeof noGlobal === typeof undefined) {
        if (!window.SUNEDITOR_LANG) {
            window.SUNEDITOR_LANG = {};
        }

        window.SUNEDITOR_LANG.de = lang;
    }

    return lang;
}));

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


(function (global, factory) {
	if ( true && typeof module.exports === 'object') {
		module.exports = global.document ?
			factory(global, true) :
			function (w) {
				if (!w.document) {
					throw new Error('SUNEDITOR_LANG a window with a document');
				}
				return factory(w);
			};
	} else {
		factory(global);
	}
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
	const lang = {
		toolbar: {
			default: 'Valor por defecto',
			save: 'Guardar',
			font: 'Fuente',
			formats: 'Formato',
			fontSize: 'Tamaño de fuente',
			bold: 'Negrita',
			underline: 'Subrayado',
			italic: 'Cursiva',
			strike: 'Tachado',
			subscript: 'Subíndice',
			superscript: 'Superíndice',
			removeFormat: 'Eliminar formato',
			fontColor: 'Color de fuente',
			hiliteColor: 'Color de resaltado',
			indent: 'Más tabulación',
			outdent: 'Menos tabulación',
			align: 'Alinear',
			alignLeft: 'Alinear a la izquierda',
			alignRight: 'Alinear a la derecha',
			alignCenter: 'Alinear al centro',
			alignJustify: 'Justificar',
			list: 'Lista',
			orderList: 'Lista ordenada',
			unorderList: 'Lista desordenada',
			horizontalRule: 'Horizontal line',
			hr_solid: 'Línea horizontal solida',
			hr_dotted: 'Línea horizontal punteada',
			hr_dashed: 'Línea horizontal discontinua',
			table: 'Tabla',
			link: 'Link',
			image: 'Imagen',
			video: 'Video',
			fullScreen: 'Pantalla completa',
			showBlocks: 'Ver bloques',
			codeView: 'Ver código fuente',
			undo: 'UndoDeshacer última acción',
			redo: 'Rehacer última acción',
			preview: 'Vista previa',
			print: 'Imprimir',
			tag_p: 'Párrafo',
			tag_div: 'Normal (DIV)',
			tag_h: 'Header',
			tag_blockquote: 'Cita',
			tag_pre: 'Código',
			template: 'Plantilla',
			lineHeight: 'Altura de la línea',
			paragraphStyle: 'Estilo del parrafo',
			textStyle: 'Estilo del texto'
		},
		dialogBox: {
			linkBox: {
				title: 'Insertar Link',
				url: '¿Hacia que URL lleva el link?',
				text: 'Texto para mostrar',
				newWindowCheck: 'Abrir en una nueva ventana'
			},
			imageBox: {
				title: 'Insertar imagen',
				file: 'Seleccionar desde los archivos',
				url: 'URL de la imagen',
				altText: 'Texto alternativo'
			},
			videoBox: {
				title: 'Insertar Video',
				url: '¿URL del vídeo? Youtube'
			},
			caption: 'Insertar descripción',
			close: 'Cerrar',
			submitButton: 'Enviar',
			revertButton: 'revertir',
			proportion: 'Restringir las proporciones',
			basic: 'Basico',
			left: 'Izquierda',
			right: 'derecha',
			center: 'Centro',
			width: 'Ancho',
			height: 'Alto',
			size: 'Tamaño',
			ratio: 'Proporción'
		},
		controller: {
			edit: 'Editar',
			unlink: 'Desvincular',
			remove: 'RemoveQuitar',
			insertRowAbove: 'Insertar fila arriba',
			insertRowBelow: 'Insertar fila debajo',
			deleteRow: 'Eliminar fila',
			insertColumnBefore: 'Insertar columna antes',
			insertColumnAfter: 'Insertar columna después',
			deleteColumn: 'Eliminar columna',
			resize100: 'Redimensionar 100%',
			resize75: 'Redimensionar 75%',
			resize50: 'Redimensionar 50%',
			resize25: 'Redimensionar 25%',
			autoSize: 'Tamaño automático',
			mirrorHorizontal: 'Espejo, Horizontal',
			mirrorVertical: 'Espejo, Vertical',
			rotateLeft: 'Girar a la izquierda',
			rotateRight: 'Girar a la derecha',
			maxSize: 'Tamaño máximo',
			minSize: 'Tamaño minímo',
			tableHeader: 'Encabezado de tabla',
			mergeCells: 'Combinar celdas',
			splitCells: 'Dividir celdas',
			HorizontalSplit: 'División horizontal',
			VerticalSplit: 'División vertical'
		},
		menu: {
			spaced: 'Espaciado',
			bordered: 'Bordeado',
			neon: 'Neón',
			translucent: 'Translúcido',
			shadow: 'Sombreado'
		}
	};

	if (typeof noGlobal === typeof undefined) {
		if (!window.SUNEDITOR_LANG) {
			window.SUNEDITOR_LANG = {};
		}

		window.SUNEDITOR_LANG.es = lang;
	}

	return lang;
}));

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2019 JiHong Lee.
 * MIT license.
 */


(function (global, factory) {
    if ( true && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error('SUNEDITOR_LANG a window with a document');
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    const lang = {
        toolbar: {
            default: 'Défaut',
            save: 'Sauvegarder',
            font: 'Police',
            formats: 'Formats',
            fontSize: 'Taille',
            bold: 'Gras',
            underline: 'Souligné',
            italic: 'Italique',
            strike: 'Barré',
            subscript: 'Indice',
            superscript: 'Exposant',
            removeFormat: 'Éffacer  le Formatage',
            fontColor: 'Couleur du texte',
            hiliteColor: 'Couleur en arrière plan',
            indent: 'Indenter',
            outdent: 'Désindenter',
            align: 'Alignenement',
            alignLeft: 'À gauche',
            alignRight: 'À droite',
            alignCenter: 'Centré',
            alignJustify: 'Justifié',
            list: 'Liste',
            orderList: 'Ordonnée',
            unorderList: 'Non-ordonnée',
            horizontalRule: 'Ligne horizontale',
            hr_solid: 'Solide',
            hr_dotted: 'Points',
            hr_dashed: 'Tirets',
            table: 'Table',
            link: 'Lien',
            image: 'Image',
            video: 'Video',
            fullScreen: 'Plein écran',
            showBlocks: 'Voir les blocs',
            codeView: 'Voir le code',
            undo: 'Annuler',
            redo: 'Rétablir',
            preview: 'Previsualiser',
            print: 'Imprimer',
            tag_p: 'Paragraphe',
            tag_div: 'Normal (DIV)',
            tag_h: 'Titre',
            tag_blockquote: 'Citation',
            tag_pre: 'Code',
            template: 'Template',
            lineHeight: 'Hauteur de la ligne',
            paragraphStyle: 'Style de paragraphe',
            textStyle: 'Style de texte'
        },
        dialogBox: {
            linkBox: {
                title: 'Insérer un lien',
                url: 'Adresse URL du lien',
                text: 'Texte à afficher',
                newWindowCheck: 'Ouvrir dans une nouvelle fenêtre'
            },
            imageBox: {
                title: 'Insérer une image',
                file: 'Sélectionner le fichier',
                url: 'Adresse URL du fichier',
                altText: 'Texte Alternatif'
            },
            videoBox: {
                title: 'Insérer une Vidéo',
                url: 'URL d’intégration du média, YouTube'
            },
            caption: 'Insérer une description',
            close: 'Fermer',
            submitButton: 'Appliquer',
            revertButton: 'Revenir en arrière',
            proportion: 'Maintenir le rapport hauteur/largeur',
            basic: 'Basique',
            left: 'Gauche',
            right: 'Droite',
            center: 'Centré',
            width: 'Largeur',
            height: 'Hauteur',
            size: 'La taille',
            ratio: 'Rapport'
        },
        controller: {
            edit: 'Modifier',
            unlink: 'Supprimer un lien',
            remove: 'Effacer',
            insertRowAbove: 'Insérer une ligne en dessous',
            insertRowBelow: 'Insérer une ligne au dessus',
            deleteRow: 'Effacer la ligne',
            insertColumnBefore: 'Insérer une colonne avant',
            insertColumnAfter: 'Insérer une colonne après',
            deleteColumn: 'Effacer la colonne',
            resize100: 'Redimensionner à 100%',
            resize75: 'Redimensionner à 75%',
            resize50: 'Redimensionner à 50%',
            resize25: 'Redimensionner à 25%',
            autoSize: 'Taille automatique',
            mirrorHorizontal: 'Mirroir, Horizontal',
            mirrorVertical: 'Mirroir, Vertical',
            rotateLeft: 'Rotation à gauche',
            rotateRight: 'Rotation à droite',
            maxSize: 'Taille max',
            minSize: 'Taille min',
            tableHeader: 'En-tête de table',
            mergeCells: 'Fusionner les cellules',
            splitCells: 'Diviser les Cellules',
            HorizontalSplit: 'Scission horizontale',
            VerticalSplit: 'Scission verticale'
        },
        menu: {
            spaced: 'Espacement',
            bordered: 'Ligne de démarcation',
            neon: 'Néon',
            translucent: 'Translucide',
            shadow: 'L\'ombre'
        }
    };

    if (typeof noGlobal === typeof undefined) {
        if (!window.SUNEDITOR_LANG) {
            window.SUNEDITOR_LANG = {};
        }

        window.SUNEDITOR_LANG.fr = lang;
    }

    return lang;
}));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2019 JiHong Lee.
 * MIT license.
 */


(function (global, factory) {
    if ( true && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error('SUNEDITOR_LANG a window with a document');
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    const lang = {
        toolbar: {
            default: 'デフォルト',
            save: '保存',
            font: 'フォント',
            formats: '段落形式',
            fontSize: 'サイズ',
            bold: '太字',
            underline: '下線',
            italic: 'イタリック',
            strike: '取り消し線',
            subscript: '下付き',
            superscript: '上付き',
            removeFormat: '形式を削除',
            fontColor: '文字色',
            hiliteColor: '文字の背景色',
            indent: 'インデント',
            outdent: 'インデント',
            align: 'ソート',
            alignLeft: '左揃え',
            alignRight: '右揃え',
            alignCenter: '中央揃え',
            alignJustify: '両端揃え',
            list: 'リスト',
            orderList: '数値ブリット',
            unorderList: '円形ブリット',
            horizontalRule: '水平線を挿入',
            hr_solid: '実線',
            hr_dotted: '点線',
            hr_dashed: 'ダッシュ',
            table: 'テーブル',
            link: 'リンク',
            image: '画像',
            video: '動画',
            fullScreen: 'フルスクリーン',
            showBlocks: 'ブロック表示',
            codeView: 'HTMLの編集',
            undo: '元に戻す',
            redo: '再実行',
            preview: 'プレビュー',
            print: '印刷',
            tag_p: '本文',
            tag_div: '基本（DIV）',
            tag_h: 'タイトル',
            tag_blockquote: '引用',
            tag_pre: 'コード',
            template: 'テンプレート',
            lineHeight: '行の高さ',
            paragraphStyle: '段落スタイル',
            textStyle: 'テキストスタイル'
        },
        dialogBox: {
            linkBox: {
                title: 'リンクの挿入',
                url: 'インターネットアドレス',
                text: '画面のテキスト',
                newWindowCheck: '別ウィンドウで開く'
            },
            imageBox: {
                title: '画像の挿入',
                file: 'ファイルの選択',
                url: 'イメージアドレス',
                altText: '置換文字列'
            },
            videoBox: {
                title: '動画を挿入',
                url: 'メディア埋め込まアドレス,YouTube'
            },
            caption: '説明付け',
            close: '閉じる',
            submitButton: '確認',
            revertButton: '元に戻す',
            proportion: 'の割合カスタマイズ',
            basic: '基本',
            left: '左',
            right: '右',
            center: '中央',
            width: '横',
            height: '縦',
            size: 'サイズ',
            ratio: '比率'
        },
        controller: {
            edit: '編集',
            unlink: 'リンク解除',
            remove: '削除',
            insertRowAbove: '上に行を挿入',
            insertRowBelow: '下に行を挿入',
            deleteRow: '行の削除',
            insertColumnBefore: '左に列を挿入',
            insertColumnAfter: '右に列を挿入',
            deleteColumn: '列を削除する',
            resize100: '100％ サイズ',
            resize75: '75％ サイズ',
            resize50: '50％ サイズ',
            resize25: '25％ サイズ',
            autoSize: '自動サイズ',
            mirrorHorizontal: '左右反転',
            mirrorVertical: '上下反転',
            rotateLeft: '左に回転',
            rotateRight: '右に回転',
            maxSize: '最大サイズ',
            minSize: '最小サイズ',
            tableHeader: '表のヘッダー',
            mergeCells: 'セルの結合',
            splitCells: 'セルを分割',
            HorizontalSplit: '横分割',
            VerticalSplit: '垂直分割'
        },
        menu: {
            spaced: '文字間隔',
            bordered: '境界線',
            neon: 'ネオン',
            translucent: '半透明',
            shadow: '影'
        }
    };

    if (typeof noGlobal === typeof undefined) {
        if (!window.SUNEDITOR_LANG) {
            window.SUNEDITOR_LANG = {};
        }

        window.SUNEDITOR_LANG.ja = lang;
    }

    return lang;
}));

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


(function (global, factory) {
    if ( true && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error('SUNEDITOR_LANG a window with a document');
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    const lang = {
        toolbar: {
            default: '기본값',
            save: '저장',
            font: '글꼴',
            formats: '문단 형식',
            fontSize: '크기',
            bold: '굵게',
            underline: '밑줄',
            italic: '기울임',
            strike: '취소선',
            subscript: '아래 첨자',
            superscript: '위 첨자',
            removeFormat: '형식 제거',
            fontColor: '글자색',
            hiliteColor: '배경색',
            indent: '들여쓰기',
            outdent: '내어쓰기',
            align: '정렬',
            alignLeft: '왼쪽 정렬',
            alignRight: '오른쪽 정렬',
            alignCenter: '가운데 정렬',
            alignJustify: '양쪽 정렬',
            list: '리스트',
            orderList: '숫자형 리스트',
            unorderList: '원형 리스트',
            horizontalRule: '가로 줄 삽입',
            hr_solid: '실선',
            hr_dotted: '점선',
            hr_dashed: '대시',
            table: '테이블',
            link: '링크',
            image: '이미지',
            video: '동영상',
            fullScreen: '전체 화면',
            showBlocks: '블록 보기',
            codeView: 'HTML 편집',
            undo: '실행 취소',
            redo: '다시 실행',
            preview: '미리보기',
            print: '인쇄',
            tag_p: '본문',
            tag_div: '기본 (DIV)',
            tag_h: '제목',
            tag_blockquote: '인용문',
            tag_pre: '코드',
            template: '템플릿',
            lineHeight: '줄 높이',
            paragraphStyle: '문단 스타일',
            textStyle: '글자 스타일'
        },
        dialogBox: {
            linkBox: {
                title: '링크 삽입',
                url: '인터넷 주소',
                text: '화면 텍스트',
                newWindowCheck: '새창으로 열기'
            },
            imageBox: {
                title: '이미지 삽입',
                file: '파일 선택',
                url: '이미지 주소',
                altText: '대체 문자열'
            },
            videoBox: {
                title: '동영상 삽입',
                url: '미디어 임베드 주소, 유튜브'
            },
            caption: '설명 넣기',
            close: '닫기',
            submitButton: '확인',
            revertButton: '되돌리기',
            proportion: '비율 맞춤',
            basic: '기본',
            left: '왼쪽',
            right: '오른쪽',
            center: '가운데',
            width: '가로',
            height: '세로',
            size: '크기',
            ratio: '비율'
        },
        controller: {
            edit: '편집',
            unlink: '링크 해제',
            remove: '삭제',
            insertRowAbove: '위에 행 삽입',
            insertRowBelow: '아래에 행 삽입',
            deleteRow: '행 삭제',
            insertColumnBefore: '왼쪽에 열 삽입',
            insertColumnAfter: '오른쪽에 열 삽입',
            deleteColumn: '열 삭제',
            resize100: '100% 크기',
            resize75: '75% 크기',
            resize50: '50% 크기',
            resize25: '25% 크기',
            autoSize: '자동 크기',
            mirrorHorizontal: '좌우 반전',
            mirrorVertical: '상하 반전',
            rotateLeft: '왼쪽으로 회전',
            rotateRight: '오른쪽으로 회전',
            maxSize: '최대화',
            minSize: '최소화',
            tableHeader: '테이블 제목',
            mergeCells: '셀 병합',
            splitCells: '셀 분할',
            HorizontalSplit: '가로 분할',
            VerticalSplit: '세로 분할'
        },
        menu: {
            spaced: '글자 간격',
            bordered: '경계선',
            neon: '네온',
            translucent: '반투명',
            shadow: '그림자'
        }
    };

    if (typeof noGlobal === typeof undefined) {
        if (!window.SUNEDITOR_LANG) {
            window.SUNEDITOR_LANG = {};
        }

        window.SUNEDITOR_LANG.ko = lang;
    }

    return lang;
}));

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * Brazilian Portuguese translation by lpeil github
 * MIT license.
 */


(function (global, factory) {
    if ( true && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error('SUNEDITOR_LANG a window with a document');
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    const lang = {
        toolbar: {
            default: 'Padrão',
            save: 'Salvar',
            font: 'Fonte',
            formats: 'Formatos',
            fontSize: 'Tamanho',
            bold: 'Negrito',
            underline: 'Sublinhado',
            italic: 'Itálico',
            strike: 'Riscado',
            subscript: 'Subescrito',
            superscript: 'Sobrescrito',
            removeFormat: 'Remover Formatação',
            fontColor: 'Cor da Fonte',
            hiliteColor: 'Cor de destaque',
            indent: 'Recuo',
            outdent: 'Avançar',
            align: 'Alinhar',
            alignLeft: 'Alinhar à esquerda',
            alignRight: 'Alinhar à direita',
            alignCenter: 'Alinhar ao centro',
            alignJustify: 'Alinhat justificado',
            list: 'Lista',
            orderList: 'Lista ordenada',
            unorderList: 'Lista desordenada',
            horizontalRule: 'Linha horizontal',
            hr_solid: 'solida',
            hr_dotted: 'pontilhada',
            hr_dashed: 'tracejada',
            table: 'Tabela',
            link: 'Link',
            image: 'Imagem',
            video: 'Vídeo',
            fullScreen: 'Tela cheia',
            showBlocks: 'Mostrar blocos',
            codeView: 'Mostrar códigos',
            undo: 'Voltar',
            redo: 'Refazer',
            preview: 'Prever',
            print: 'imprimir',
            tag_p: 'Paragráfo',
            tag_div: '(DIV) Normal',
            tag_h: 'Cabeçalho',
            tag_blockquote: 'Citar',
            tag_pre: 'Código',
            template: 'Modelo',
            lineHeight: 'Altura da linha',
            paragraphStyle: 'Estilo do parágrafo',
            textStyle: 'Estilo do texto'
        },
        dialogBox: {
            linkBox: {
                title: 'Inserir link',
                url: 'URL para link',
                text: 'Texto à mostrar',
                newWindowCheck: 'Abrir em nova guia'
            },
            imageBox: {
                title: 'Inserir imagens',
                file: 'Selecionar arquivos',
                url: 'URL da imagem',
                altText: 'Texto alternativo'
            },
            videoBox: {
                title: 'Inserir vídeo',
                url: 'URL do YouTube'
            },
            caption: 'Inserir descrição',
            close: 'Fechar',
            submitButton: 'Enviar',
            revertButton: 'Reverter',
            proportion: 'restringir proporções',
            basic: 'Básico',
            left: 'Esquerda',
            right: 'Direita',
            center: 'Centro',
            width: 'Largura',
            height: 'Altura',
            size: 'Tamanho',
            ratio: 'Proporções'
        },
        controller: {
            edit: 'Editar',
            unlink: 'Retirar link',
            remove: 'Remover',
            insertRowAbove: 'Inserir linha acima',
            insertRowBelow: 'Inserir linha abaixo',
            deleteRow: 'Deletar linha',
            insertColumnBefore: 'Inserir coluna antes',
            insertColumnAfter: 'Inserir coluna depois',
            deleteColumn: 'Deletar coluna',
            resize100: 'Redimensionar para 100%',
            resize75: 'Redimensionar para 75%',
            resize50: 'Redimensionar para 50%',
            resize25: 'Redimensionar para 25%',
            autoSize: 'Tamanho automático',
            mirrorHorizontal: 'Espelho, Horizontal',
            mirrorVertical: 'Espelho, Vertical',
            rotateLeft: 'Girar para esquerda',
            rotateRight: 'Girar para direita',
            maxSize: 'Tam max',
            minSize: 'Tam min',
            tableHeader: 'Cabeçalho da tabela',
            mergeCells: 'Mesclar células',
            splitCells: 'Dividir células',
            HorizontalSplit: 'Divisão horizontal',
            VerticalSplit: 'Divisão vertical'
        },
        menu: {
            spaced: 'Espaçado',
            bordered: 'Com borda',
            neon: 'Néon',
            translucent: 'Translúcido',
            shadow: 'Sombreado'
        }
    };

    if (typeof noGlobal === typeof undefined) {
        if (!window.SUNEDITOR_LANG) {
            window.SUNEDITOR_LANG = {};
        }

        window.SUNEDITOR_LANG.pt_br = lang;
    }

    return lang;
}));

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


(function (global, factory) {
    if ( true && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error('SUNEDITOR_LANG a window with a document');
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    const lang = {
        toolbar: {
            default: 'По умолчанию',
            save: 'Сохранить',
            font: 'Гарнитура',
            formats: 'Стиль абзаца',
            fontSize: 'Кегль',
            bold: 'Полужирный',
            underline: 'Подчёркнутый',
            italic: 'Курсив',
            strike: 'Зачеркнутый',
            subscript: 'Нижний индекс',
            superscript: 'Верхний индекс',
            removeFormat: 'Очистить форматирование',
            fontColor: 'Цвет текста',
            hiliteColor: 'Цвет фона',
            indent: 'Увеличить отступ',
            outdent: 'Уменьшить отступ',
            align: 'Выравнивание',
            alignLeft: 'Слева',
            alignRight: 'Справа',
            alignCenter: 'По центру',
            alignJustify: 'По ширине',
            list: 'Списки',
            orderList: 'Нумерованный',
            unorderList: 'Маркированный',
            horizontalRule: 'Горизонтальная линия',
            hr_solid: 'Сплошная',
            hr_dotted: 'Пунктир',
            hr_dashed: 'Штриховая',
            table: 'Таблица',
            link: 'Ссылка',
            image: 'Изображение',
            video: 'Видео',
            fullScreen: 'Полный экран',
            showBlocks: 'Блочный вид',
            codeView: 'Редактировать HTML',
            undo: 'Отменить',
            redo: 'Вернуть',
            preview: 'Предварительный просмотр',
            print: 'Печать',
            tag_p: 'Текст',
            tag_div: 'Базовый',
            tag_h: 'Заголовок',
            tag_blockquote: 'Цитата',
            tag_pre: 'Код',
            template: 'Шаблон',
            lineHeight: 'Высота линии',
            paragraphStyle: 'Стиль абзаца',
            textStyle: 'Стиль текста'
        },
        dialogBox: {
            linkBox: {
                title: 'Вставить ссылку',
                url: 'Ссылка',
                text: 'Текст',
                newWindowCheck: 'Открывать в новом окне'
            },
            imageBox: {
                title: 'Вставить изображение',
                file: 'Выберите файл',
                url: 'Адрес изображения',
                altText: 'Текстовое описание изображения'
            },
            videoBox: {
                title: 'Вставить видео',
                url: 'Ссылка на видео'
            },
            caption: 'Добавить подпись',
            close: 'Закрыть',
            submitButton: 'Подтвердить',
            revertButton: 'Сбросить',
            proportion: 'Сохранить пропорции',
            basic: 'Без обтекания',
            left: 'Слева',
            right: 'Справа',
            center: 'По центру',
            width: 'Ширина',
            height: 'Высота',
            size: 'Размер',
            ratio: 'Соотношение'
        },
        controller: {
            edit: 'Изменить',
            unlink: 'Убрать ссылку',
            remove: 'Удалить',
            insertRowAbove: 'Вставить строку выше',
            insertRowBelow: 'Вставить строку ниже',
            deleteRow: 'Удалить строку',
            insertColumnBefore: 'Вставить столбец слева',
            insertColumnAfter: 'Вставить столбец справа',
            deleteColumn: 'Удалить столбец',
            resize100: 'Размер 100%',
            resize75: 'Размер 75%',
            resize50: 'Размер 50%',
            resize25: 'Размер 25%',
            autoSize: 'Авто размер',
            mirrorHorizontal: 'Отразить по горизонтали',
            mirrorVertical: 'Отразить по вертикали',
            rotateLeft: 'Повернуть против часовой стрелки',
            rotateRight: 'Повернуть по часовой стрелке',
            maxSize: 'Ширина по размеру страницы',
            minSize: 'Ширина по содержимому',
            tableHeader: 'Строка заголовков',
            mergeCells: 'Объединить ячейки',
            splitCells: 'Разделить ячейку',
            HorizontalSplit: 'Разделить горизонтально',
            VerticalSplit: 'Разделить вертикально'
        },
        menu: {
            spaced: 'интервал',
            bordered: 'Граничная Линия',
            neon: 'неон',
            translucent: 'полупрозрачный',
            shadow: 'Тень'
        }
    };

    if (typeof noGlobal === typeof undefined) {
        if (!window.SUNEDITOR_LANG) {
            window.SUNEDITOR_LANG = {};
        }

        window.SUNEDITOR_LANG.ru = lang;
    }

    return lang;
}));

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2019 JiHong Lee.
 * MIT license.
 */


(function (global, factory) {
    if ( true && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error('SUNEDITOR_LANG a window with a document');
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    const lang = {
        toolbar: {
            default: '默认',
            save: '保存',
            font: '字体',
            formats: '格式',
            fontSize: '字号',
            bold: '胆大',
            underline: '下划线',
            italic: '斜体',
            strike: '删除线',
            subscript: '下标',
            superscript: '上标',
            removeFormat: '清除格式',
            fontColor: '字颜色',
            hiliteColor: '背景颜色',
            indent: '增加缩进量',
            outdent: '减少缩进量',
            align: '对齐方式',
            alignLeft: '左对齐',
            alignRight: '右对齐',
            alignCenter: '居中',
            alignJustify: '两端对齐',
            list: '名单',
            orderList: '编号',
            unorderList: '项目符号',
            horizontalRule: '插入水平线',
            hr_solid: '实线',
            hr_dotted: '点',
            hr_dashed: '虚线',
            table: '表格',
            link: '超链接',
            image: '图片',
            video: '视频',
            fullScreen: '全屏',
            showBlocks: '显示块区域',
            codeView: '代码视图',
            undo: '撤消',
            redo: '恢复',
            preview: '预览',
            print: '打印',
            tag_p: '段落格式',
            tag_div: '正文 (DIV)',
            tag_h: '标题',
            tag_blockquote: '引用',
            tag_pre: '代码',
            template: '模板',
            lineHeight: '线高',
            paragraphStyle: '段落样式',
            textStyle: '文字样式'
        },
        dialogBox: {
            linkBox: {
                title: '插入超链接',
                url: '网址',
                text: '字体',
                newWindowCheck: '在新标签页中打开'
            },
            imageBox: {
                title: '插入图片',
                file: '上传图片',
                url: '图片网址',
                altText: '替换文字'
            },
            videoBox: {
                title: '插入视频',
                url: '嵌入网址, YouTube'
            },
            caption: '标题',
            close: '取消',
            submitButton: '确定',
            revertButton: '恢复',
            proportion: '比例',
            basic: '基本',
            left: '左',
            right: '右',
            center: '居中',
            width: '宽度',
            height: '高度',
            size: '尺寸',
            ratio: '比'
        },
        controller: {
            edit: '编辑',
            unlink: '去除链接',
            remove: '删除',
            insertRowAbove: '在上方插入',
            insertRowBelow: '在下方插入',
            deleteRow: '删除行',
            insertColumnBefore: '在左侧插入',
            insertColumnAfter: '在右侧插入',
            deleteColumn: '删除列',
            resize100: '放大 100%',
            resize75: '放大 75%',
            resize50: '放大 50%',
            resize25: '放大 25%',
            mirrorHorizontal: '翻转左右',
            mirrorVertical: '翻转上下',
            rotateLeft: '向左旋转',
            rotateRight: '向右旋转',
            maxSize: '最大尺寸',
            minSize: '最小尺寸',
            tableHeader: '表的标题',
            mergeCells: '合并单元格',
            splitCells: '分裂细胞',
            HorizontalSplit: '水平分割',
            VerticalSplit: '垂直分裂'
        },
        menu: {
            spaced: '间隔开',
            bordered: '边界线',
            neon: '氖',
            translucent: '半透明',
            shadow: '暗影'
        }
    };

    if (typeof noGlobal === typeof undefined) {
        if (!window.SUNEDITOR_LANG) {
            window.SUNEDITOR_LANG = {};
        }

        window.SUNEDITOR_LANG.zh_cn = lang;
    }

    return lang;
}));

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(33);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "buttonList", function() { return /* reexport */ buttonList_namespaceObject; });

// NAMESPACE OBJECT: ./misc/buttonList.js
var buttonList_namespaceObject = {};
__webpack_require__.r(buttonList_namespaceObject);
__webpack_require__.d(buttonList_namespaceObject, "basic", function() { return basic; });
__webpack_require__.d(buttonList_namespaceObject, "complex", function() { return complex; });
__webpack_require__.d(buttonList_namespaceObject, "formatting", function() { return formatting; });
__webpack_require__.d(buttonList_namespaceObject, "default", function() { return buttonList; });

// CONCATENATED MODULE: ./misc/buttonList.js
var basic = [["font", "fontSize"], ["fontColor"], ["horizontalRule"], ["link", "image"]];
var complex = [["undo", "redo"], ["font", "fontSize", "formatBlock"], ["bold", "underline", "italic", "strike", "subscript", "superscript"], ["removeFormat"], "/", ["fontColor", "hiliteColor"], ["outdent", "indent"], ["align", "horizontalRule", "list", "table"], ["link", "image", "video"], ["fullScreen", "showBlocks", "codeView"], ["preview", "print"], ["save", "template"]];
var formatting = [["undo", "redo"], ["bold", "underline", "italic", "strike", "subscript", "superscript"], ["removeFormat"], ["outdent", "indent"], ["fullScreen", "showBlocks", "codeView"], ["preview", "print"]];
/* harmony default export */ var buttonList = ({
  basic: basic,
  complex: complex,
  formatting: formatting
});
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./node_modules/suneditor/src/lang/en.js
var en = __webpack_require__(3);
var en_default = /*#__PURE__*/__webpack_require__.n(en);

// CONCATENATED MODULE: ./node_modules/suneditor/src/lib/util.js
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/**
 * @description utility function
 */
const util_util = {
    _d: document,
    _w: window,

    /**
     * @description Removes attribute values such as style and converts tags that do not conform to the "html5" standard.
     * @param {String} text 
     * @returns {String}
     * @private
     */
    _tagConvertor: function (text) {
        const ec = {'b': 'strong', 'i': 'em', 'var': 'em', 'u': 'ins', 'strike': 'del', 's': 'del'};
        return text.replace(/(<\/?)(b|strong|var|i|em|u|ins|s|strike|del)\b\s*(?:[^>^<]+)?\s*(?=>)/ig, function (m, t, n) {
            return t + ((typeof ec[n] === 'string') ? ec[n] : n);
        });
    },

    /**
     * @description HTML Reserved Word Converter.
     * @param {String} contents 
     * @returns {String}
     * @private
     */
    _HTMLConvertor: function (contents) {
        const ec = {'&': '&amp;', '\u00A0': '&nbsp;', '\'': '&quot;', '<': '&lt;', '>': '&gt;'};
        return contents.replace(/&|\u00A0|'|<|>/g, function (m) {
            return (typeof ec[m] === 'string') ? ec[m] : m;
        });
    },

    /**
     * @description Unicode Character 'ZERO WIDTH SPACE' (\u200B)
     */
    zeroWidthSpace: '\u200B',

    /**
     * @description Regular expression to find 'zero width space' (/\u200B/g)
     */
    zeroWidthRegExp: new RegExp(String.fromCharCode(8203), 'g'),

    /**
     * @description Regular expression to find only 'zero width space' (/^\u200B+$/)
     */
    onlyZeroWidthRegExp: new RegExp('^' + String.fromCharCode(8203) + '+$'),

    /**
     * @description A method that checks If the text is blank or to see if it contains 'ZERO WIDTH SPACE' or empty (util.zeroWidthSpace)
     * @param {String|Node} text String value or Node
     * @returns {Boolean}
     */
    onlyZeroWidthSpace: function (text) {
        if (typeof text !== 'string') text = text.textContent;
        return text === '' || this.onlyZeroWidthRegExp.test(text);
    },

    /**
     * @description Gets XMLHttpRequest object
     * @returns {Object}
     */
    getXMLHttpRequest: function () {
        /** IE */
        if (this._w.ActiveXObject) {
            try {
                return new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                try {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                } catch (e1) {
                    return null;
                }
            }
        }
        /** netscape */
        else if (this._w.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
        /** fail */
        else {
            return null;
        }
    },

    /**
     * @description Create Element node
     * @param {String} elementName Element name
     * @returns {Element}
     */
    createElement: function (elementName) {
        return this._d.createElement(elementName);
    },

    /**
     * @description Create text node
     * @param {String} text text contents
     * @returns {Node}
     */
    createTextNode: function (text) {
        return this._d.createTextNode(text || '');
    },

    /**
     * @description Get the the tag path of the arguments value
     * If not found, return the first found value
     * @param {Array} nameArray File name array
     * @param {String} extension js, css
     * @returns {String}
     */
    getIncludePath: function (nameArray, extension) {
        let path = '';
        const pathList = [];
        const tagName = extension === 'js' ? 'script' : 'link';
        const src = extension === 'js' ? 'src' : 'href';
        
        let fileName = '(?:';
        for (let i = 0, len = nameArray.length; i < len; i++) {
            fileName += nameArray[i] + (i < len - 1 ? '|' : ')');
        }

        const regExp = new this._w.RegExp('(^|.*[\\/])' + fileName + '(\\.[^\\/]+)?\.' + extension + '(?:\\?.*|;.*)?$', 'i');
        const extRegExp = new this._w.RegExp('.+\\.' + extension + '(?:\\?.*|;.*)?$', 'i');
            
        for (let c = this._d.getElementsByTagName(tagName), i = 0; i < c.length; i++) {
            if (extRegExp.test(c[i][src])) {
                pathList.push(c[i]);
            }
        }

        for (let i = 0; i < pathList.length; i++) {
            let editorTag = pathList[i][src].match(regExp);
            if (editorTag) {
                path = editorTag[0];
                break;
            }
        }

        if (path === '') path = pathList.length > 0 ? pathList[0][src] : '';

        -1 === path.indexOf(':/') && '//' !== path.slice(0, 2) && (path = 0 === path.indexOf('/') ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + path : location.href.match(/^[^\?]*\/(?:)/)[0] + path);

        if (!path) throw '[SUNEDITOR.util.getIncludePath.fail] The SUNEDITOR installation path could not be automatically detected. (name: +' + name + ', extension: ' + extension + ')';

        return path;
    },

    /**
     * @description Returns the CSS text that has been applied to the current page.
     * @param {Element|null} iframe To get the CSS text of an iframe, send an iframe object. (context.element.wysiwygFrame)
     * @returns {String}
     */
    getPageStyle: function (iframe) {
        let cssText = '';
        const sheets = (iframe ? this.getIframeDocument(iframe) : this._d).styleSheets;
        
        for (let i = 0, len = sheets.length, rules; i < len; i++) {
            try {
                rules = sheets[i].cssRules;
            } catch (e) {
                continue;
            }
            
            for (let c = 0, cLen = rules.length; c < cLen; c++) {
                cssText += rules[c].cssText;
            }
        }

        return cssText;
    },

    /**
     * @description Get the argument iframe's document object
     * @param {Element} iframe Iframe element (context.element.wysiwygFrame)
     * @returns {Document}
     */
    getIframeDocument: function (iframe) {
        let wDocument = iframe.contentWindow || iframe.contentDocument;
        if (wDocument.document) wDocument = wDocument.document;
        return wDocument;
    },

    /**
     * @description Get attributes of argument element to string ('class="---" name="---" ')
     * @param {Element} element Element object
     * @param {Array|null} exceptAttrs Array of attribute names to exclude from the result
     * @returns {String}
     */
    getAttributesToString: function (element, exceptAttrs) {
        if (!element.attributes) return '';

        const attrs = element.attributes;
        let attrString = '';

        for (let i = 0, len = attrs.length; i < len; i++) {
            if (exceptAttrs && exceptAttrs.indexOf(attrs[i].name) > -1) continue;
            attrString += attrs[i].name + '="' + attrs[i].value + '" ';
        }

        return attrString;
    },

    /**
     * @description Converts contents into a format that can be placed in an editor
     * @param {String} contents contents
     * @returns {String}
     */
    convertContentsForEditor: function (contents) {
        let returnHTML = '';
        let tag = this._d.createRange().createContextualFragment(contents).childNodes;

        for (let i = 0, len = tag.length, baseHtml; i < len; i++) {
            baseHtml = tag[i].outerHTML || tag[i].textContent;

            if (tag[i].nodeType === 3) {
                const textArray = baseHtml.split(/\n/g);
                let text = '';
                for (let t = 0, tLen = textArray.length; t < tLen; t++) {
                    text = textArray[t].trim();
                    if (text.length > 0) returnHTML += '<p>' + text + '</p>';
                }
            } else {
                returnHTML += baseHtml.replace(/(?!>)\s+(?=<)/g, ' ');
            }
        }

        if (returnHTML.length === 0) {
            contents = this._HTMLConvertor(contents);
            returnHTML = '<p>' + (contents.length > 0 ? contents : '<br>') + '</p>';
        }

        return this._tagConvertor(returnHTML.replace(this._deleteExclusionTags, ''));
    },

    /**
     * @description Converts wysiwyg area element into a format that can be placed in an editor of code view mode
     * @param {Element|String} html WYSIWYG element (context.element.wysiwyg) or HTML string.
     * @param {Number|null} indentSize The indent size of the tag (default: 0)
     * @returns {String}
     */
    convertHTMLForCodeView: function (html, indentSize) {
        let returnHTML = '';
        const reg = this._w.RegExp;
        const brReg = new reg('^(BLOCKQUOTE|PRE|TABLE|THEAD|TBODY|TR|TH|TD|OL|UL|IMG|IFRAME|VIDEO|AUDIO|FIGURE|FIGCAPTION|HR|BR)$', 'i');
        const isFormatElement = this.isFormatElement.bind(this);
        const wDoc = typeof html === 'string' ? this._d.createRange().createContextualFragment(html) : html;
        const util = this;

        indentSize *= 1;
        indentSize = indentSize > 0 ? new this._w.Array(indentSize + 1).join(' ') : '';

        (function recursionFunc (element, indent, lineBR) {
            const children = element.childNodes;
            const elementRegTest = brReg.test(element.nodeName);
            const elementIndent = (elementRegTest ? indent : '');

            for (let i = 0, len = children.length, node, br, nodeRegTest; i < len; i++) {
                node = children[i];
                nodeRegTest = brReg.test(node.nodeName);
                br = nodeRegTest ? '\n' : '';
                lineBR = isFormatElement(node) && !elementRegTest && !/^(TH|TD)$/i.test(element.nodeName) ? '\n' : '';

                if (node.nodeType === 3) {
                    returnHTML += util._HTMLConvertor((/^\n+$/.test(node.data) ? '' : node.data));
                    continue;
                }

                if (node.childNodes.length === 0) {
                    returnHTML += (/^(HR)$/i.test(node.nodeName) ? '\n' : '') + elementIndent + node.outerHTML + br;
                    continue;
                }
                
                node.innerHTML = node.innerHTML;
                const tag = node.nodeName.toLowerCase();
                returnHTML += (lineBR || (elementRegTest ? '' : br)) + (elementIndent || nodeRegTest ? indent : '') + node.outerHTML.match(reg('<' + tag + '[^>]*>', 'i'))[0] + br;
                recursionFunc(node, indent + indentSize, '');
                returnHTML += (nodeRegTest ? indent : '') + '</' + tag + '>' + (lineBR || br || elementRegTest ? '\n' :  false || /^(TH|TD)$/i.test(node.nodeName) ? '\n' : '');
            }
        }(wDoc, '', '\n'));

        return returnHTML.trim() + '\n';
    },

    /**
     * @description It is judged whether it is the edit region top div element or iframe's body tag.
     * @param {Element} element The element to check
     * @returns {Boolean}
     */
    isWysiwygDiv: function (element) {
        if (element && element.nodeType === 1 && (this.hasClass(element, 'se-wrapper-wysiwyg') || /^BODY$/i.test(element.nodeName))) return true;
        return false;
    },

    /**
     * @description It is judged whether it is the format element (P, DIV, H1-6, LI, TH, TD)
     * @param {Element} element The element to check
     * @returns {Boolean}
     */
    isFormatElement: function (element) {
        if (element && element.nodeType === 1 && /^(P|DIV|H[1-6]|LI|TH|TD)$/i.test(element.nodeName) && !this.isComponent(element) && !this.isWysiwygDiv(element)) return true;
        return false;
    },

    /**
     * @description It is judged whether it is the range format element. (BLOCKQUOTE, OL, UL, PRE, FIGCAPTION, TABLE, THEAD, TBODY, TR, TH, TD)
     * * Range format element is wrap the format element  (P, DIV, H1-6, LI)
     * @param {Element} element The element to check
     * @returns {Boolean}
     */
    isRangeFormatElement: function (element) {
        if (element && element.nodeType === 1 && (/^(BLOCKQUOTE|OL|UL|PRE|FIGCAPTION|TABLE|THEAD|TBODY|TR|TH|TD)$/i.test(element.nodeName) || element.getAttribute('data-format') === 'range')) return true;
        return false;
    },

    /**
     * @description It is judged whether it is the component(img, iframe cover, table, hr) element - ".se-component"
     * @param {Element} element The element to check
     * @returns {Boolean}
     */
    isComponent: function (element) {
        return element && (/se-component/.test(element.className) || /^(TABLE|HR)$/.test(element.nodeName));
    },

    /**
     * @description If a parent node that contains an argument node finds a format node (P, DIV, H[1-6], LI), it returns that node.
     * @param {Element} element Reference element if null or no value, it is relative to the current focus node.
     * @param {Function|null} validation Additional validation function.
     * @returns {Element}
     */
    getFormatElement: function (element, validation) {
        if (!element) return null;
        if (!validation) {
            validation = function () { return true; };
        }

        while (element) {
            if (this.isWysiwygDiv(element)) return null;
            if (this.isRangeFormatElement(element)) element.firstElementChild;
            if (this.isFormatElement(element) && validation(element)) return element;

            element = element.parentNode;
        }
        
        return null;
    },

    /**
     * @description If a parent node that contains an argument node finds a format node (BLOCKQUOTE, TABLE, TH, TD, OL, UL, PRE), it returns that node.
     * @param {Element} element Reference element if null or no value, it is relative to the current focus node.
     * @param {Function|null} validation Additional validation function.
     * @returns {Element|null}
     */
    getRangeFormatElement: function (element, validation) {
        if (!element) return null;
        if (!validation) {
            validation = function () { return true; };
        }

        while (element) {
            if (this.isWysiwygDiv(element)) return null;
            if (this.isRangeFormatElement(element) && !/^(THEAD|TBODY|TR)$/i.test(element.nodeName) && validation(element)) return element;
            element = element.parentNode;
        }

        return null;
    },

    /**
     * @description Add style and className of copyEl to originEl
     * @param {Element} originEl Origin element
     * @param {Element} copyEl Element to copy
     * @private
     */
    copyTagAttributes: function (originEl, copyEl) {
        if (copyEl.style.cssText) {
            originEl.style.cssText += copyEl.style.cssText;
        }

        const classes = copyEl.classList;
        for (let i = 0, len = classes.length; i < len; i++) {
            this.addClass(originEl, classes[i]);
        }

        if (!originEl.style.cssText) originEl.removeAttribute('style');
        if (!originEl.className.trim()) originEl.removeAttribute('class');
    },

    /**
     * @description Copy and apply attributes of format tag that should be maintained. (style, class) Ignore "__se__format__" class
     * @param {Element} originEl Origin element
     * @param {Element} copyEl Element to copy
     */
    copyFormatAttributes: function (originEl, copyEl) {
        copyEl = copyEl.cloneNode(false);
        copyEl.className = copyEl.className.replace(/(\s|^)__se__format__(\s|$)/g, '');
        this.copyTagAttributes(originEl, copyEl);
    },

    /**
     * @description Get the index of the argument value in the element array
     * @param {Array} array element array
     * @param {Element} element The element to find index
     * @returns {Number}
     */
    getArrayIndex: function (array, element) {
        let idx = -1;
        for (let i = 0, len = array.length; i < len; i++) {
            if (array[i] === element) {
                idx = i;
                break;
            }
        }

        return idx;
    },

    /**
     * @description Get the next index of the argument value in the element array
     * @param {Array} array element array
     * @param {Element} item The element to find index
     * @returns {Number}
     */
    nextIdx: function (array, item) {
        let idx = this.getArrayIndex(array, item);
        if (idx === -1) return -1;
        return idx + 1;
    },

    /**
     * @description Get the previous index of the argument value in the element array
     * @param {Array} array Element array
     * @param {Element} item The element to find index
     * @returns {Number}
     */
    prevIdx: function (array, item) {
        let idx = this.getArrayIndex(array, item);
        if (idx === -1) return -1;
        return idx - 1;
    },

    /**
     * @description Returns the index compared to other sibling nodes.
     * @param {Node} node The Node to find index
     * @returns {Number}
     */
    getPositionIndex: function (node) {
        let idx = 0;
        while (!!(node = node.previousSibling)) {
            idx += 1;
        }
        return idx;
    },

    /**
     * @description Returns the position of the "node" in the "parentNode" in a numerical array.
     * ex) <p><span>aa</span><span>bb</span></p> - (node: "bb", parentNode: "<P>") -> [1, 0]
     * @param {Node} node The Node to find position path
     * @param {Element|null} parentNode Parent node. If null, wysiwyg div area
     * @param {Object|null} _newOffsets If you send an object of the form "{s: 0, e: 0}", the text nodes that are attached together are merged into one, centered on the "node" argument.
     * "_newOffsets.s" stores the length of the combined characters after "node" and "_newOffsets.e" stores the length of the combined characters before "node".
     * Do not use unless absolutely necessary.
     * @returns {Array}
     */
    getNodePath: function (node, parentNode, _newOffsets) {
        const path = [];
        let finds = true;

        this.getParentElement(node, function (el) {
            if (el === parentNode) finds = false;
            if (finds && !this.isWysiwygDiv(el)) {
                // merge text nodes
                if (_newOffsets && el.nodeType === 3) {
                    let temp = null, tempText = null;
                    _newOffsets.s = _newOffsets.e = 0;

                    let previous = el.previousSibling;
                    while (previous && previous.nodeType === 3) {
                        tempText = previous.textContent.replace(this.zeroWidthRegExp, '');
                        _newOffsets.s += tempText.length;
                        el.textContent = tempText + el.textContent;
                        temp = previous;
                        previous = previous.previousSibling;
                        this.removeItem(temp);
                    }

                    let next = el.nextSibling;
                    while (next && next.nodeType === 3) {
                        tempText = next.textContent.replace(this.zeroWidthRegExp, '');
                        _newOffsets.e += tempText.length;
                        el.textContent += tempText;
                        temp = next;
                        next = next.nextSibling;
                        this.removeItem(temp);
                    }
                }

                // index push
                path.push(el);
            }
            return false;
        }.bind(this));
        
        return path.map(this.getPositionIndex).reverse();
    },

    /**
     * @description Returns the node in the location of the path array obtained from "util.getNodePath".
     * @param {Array} offsets Position array, array obtained from "util.getNodePath"
     * @param {Element} parentNode Base parent element
     * @returns {Element}
     */
    getNodeFromPath: function (offsets, parentNode) {
        let current = parentNode;
        let nodes;

        for (let i = 0, len = offsets.length; i < len; i++) {
            nodes = current.childNodes;
            if (nodes.length === 0) break;
            if (nodes.length <= offsets[i]) {
                current = nodes[nodes.length - 1];
            } else {
                current = nodes[offsets[i]];
            }
        }

        return current;
    },

    /**
     * @description Compares the style and class for equal values.
     * Returns true if both are text nodes.
     * @param {Node} a Node object
     * @param {Node} b Node object
     * @returns {Boolean}
     */
    isSameAttributes: function (a, b) {
        if (a.nodeType === 3 && b.nodeType === 3) return true;
        if (a.nodeType === 3 || b.nodeType === 3) return false;

        const style_a = a.style;
        const style_b = b.style;
        let compStyle = 0;

        for (let i = 0, len = style_a.length; i < len; i++) {
            if (style_a[style_a[i]] === style_b[style_a[i]]) compStyle++;
        }

        const class_a = a.classList;
        const class_b = b.classList;
        const reg = this._w.RegExp;
        let compClass = 0;

        for (let i = 0, len = class_a.length; i < len; i++) {
            if (reg('(\s|^)' + class_a[i] + '(\s|$)').test(class_b.value)) compClass++;
        }

        return compStyle === style_b.length && compClass === class_b.length;
    },

    /**
     * @description Check the node is a list (ol, ul)
     * @param {Element|String} node The element or element name to check
     * @returns {Boolean}
     */
    isList: function (node) {
        return node && /^(OL|UL)$/i.test(typeof node === 'string' ? node : node.nodeName);
    },

    /**
     * @description Check the node is a list cell (li)
     * @param {Element|String} node The element or element name to check
     * @returns {Boolean}
     */
    isListCell: function (node) {
        return node && /^LI$/i.test(typeof node === 'string' ? node : node.nodeName);
    },

    /**
     * @description Check the node is a table (table, thead, tbody, tr, th, td)
     * @param {Element|String} node The element or element name to check
     * @returns {Boolean}
     */
    isTable: function (node) {
        return node && /^(TABLE|THEAD|TBODY|TR|TH|TD)$/i.test(typeof node === 'string' ? node : node.nodeName);
    },

    /**
     * @description Check the node is a table cell (td, th)
     * @param {Element|String} node The element or element name to check
     * @returns {Boolean}
     */
    isCell: function (node) {
        return node && /^(TD|TH)$/i.test(typeof node === 'string' ? node : node.nodeName);
    },

    /**
     * @description Check the node is a break node (BR)
     * @param {Element|String} node The element or element name to check
     * @returns {Boolean}
     */
    isBreak: function (node) {
        return node && /^BR$/i.test(typeof node === 'string' ? node : node.nodeName);
    },


    /**
     * @description Check the node is a anchor node (A)
     * @param {Element|String} node The element or element name to check
     * @returns {Boolean}
     */
    isAnchor: function (node) {
        return node && /^A$/i.test(typeof node === 'string' ? node : node.nodeName);
    },

    /**
     * @description Checks for numeric (with decimal point).
     * @param {String|Number} text Text string or number
     * @returns {Boolean}
     */
    isNumber: function (text) {
        return !!text && /^-?\d+(\.\d+)?$/.test(text + '');
    },

    /**
     * @description Get a number.
     * @param {String|Number} text Text string or number
     * @param {Number} maxDec Maximum number of decimal places (-1 : Infinity)
     * @returns {Number|null}
     */
    getNumber: function (text, maxDec) {
        if (!text) return null;
        
        let number = (text + '').match(/-?\d+(\.\d+)?/);
        if (!number || !number[0]) return null;

        number = number[0];
        return maxDec < 0 ? number * 1 : maxDec === 0 ? this._w.Math.round(number * 1) : (number * 1).toFixed(maxDec) * 1;
    },

    /**
     * @description Get all child nodes of the argument value element (Without text node)
     * @param {Element|String} element element to get child node
     * @param {(function|null)} validation Conditional function
     * @returns {Array}
     */
    getListChildren: function (element, validation) {
        const children = [];
        if (!element || !element.children || element.children.length === 0) return children;

        validation = validation || function () { return true; };

        (function recursionFunc(current) {
            if ((element !== current && validation(current)) || /^BR$/i.test(element.nodeName)) {
                children.push(current);
            }

            for (let i = 0, len = current.children.length; i < len; i++) {
                recursionFunc(current.children[i]);
            }
        })(element);

        return children;
    },

    /**
     * @description Get all child nodes of the argument value element (Include text nodes)
     * @param {Element} element element to get child node
     * @param {(function|null)} validation Conditional function
     * @returns {Array}
     */
    getListChildNodes: function (element, validation) {
        const children = [];
        if (!element || element.childNodes.length === 0) return children;

        validation = validation || function () { return true; };

        (function recursionFunc(current) {
            if ((element !== current && validation(current)) || /^BR$/i.test(element.nodeName)) {
                children.push(current);
            }

            for (let i = 0, len = current.childNodes.length; i < len; i++) {
                recursionFunc(current.childNodes[i]);
            }
        })(element);

        return children;
    },

    /**
     * @description Returns the number of parents nodes.
     * "0" when the parent node is the WYSIWYG area.
     * @param {Element} element The element to check
     * @returns {Number}
     */
    getElementDepth: function (element) {
        let depth = 0;
        element = element.parentNode;

        while (element && !this.isWysiwygDiv(element)) {
            depth += 1;
            element = element.parentNode;
        }

        return depth;
    },

    /**
     * @description Get the parent element of the argument value.
     * A tag that satisfies the query condition is imported.
     * Returns null if not found.
     * @param {Node} element Reference element
     * @param {String|Function} query Query String (nodeName, .className, #ID, :name) or validation function.
     * Not use it like jquery.
     * Only one condition can be entered at a time.
     * @returns {Element|null}
     */
    getParentElement: function (element, query) {
        let check;

        if (typeof query === 'function') {
            check = query;
        } else {
            let attr;
            if (/^\./.test(query)) {
                attr = 'className';
                query = query.split('.')[1];
            } else if (/^#/.test(query)) {
                attr = 'id';
                query = '^' + query.split('#')[1] + '$';
            } else if (/^:/.test(query)) {
                attr = 'name';
                query = '^' + query.split(':')[1] + '$';
            } else {
                attr = 'nodeName';
                query = '^' + query + '$';
            }

            const regExp = new this._w.RegExp(query, 'i');
            check = function (el) {
                return regExp.test(el[attr]);
            };
        }

        while (element && !check(element)) {
            if (this.isWysiwygDiv(element)) {
                return null;
            }
            element = element.parentNode;
        }

        return element;
    },

    /**
     * @description Get the child element of the argument value.
     * A tag that satisfies the query condition is imported.
     * Returns null if not found.
     * @param {Node} element Reference element
     * @param {String|Function} query Query String (nodeName, .className, #ID, :name) or validation function.
     * @param {Boolean} last If true returns the last node among the found child nodes. (default: first node)
     * Not use it like jquery.
     * Only one condition can be entered at a time.
     * @returns {Element|null}
     */
    getChildElement: function (element, query, last) {
        let check;

        if (typeof query === 'function') {
            check = query;
        } else {
            let attr;
            if (/^\./.test(query)) {
                attr = 'className';
                query = query.split('.')[1];
            } else if (/^#/.test(query)) {
                attr = 'id';
                query = '^' + query.split('#')[1] + '$';
            } else if (/^:/.test(query)) {
                attr = 'name';
                query = '^' + query.split(':')[1] + '$';
            } else {
                attr = 'nodeName';
                query = '^' + query + '$';
            }

            const regExp = new this._w.RegExp(query, 'i');
            check = function (el) {
                return regExp.test(el[attr]);
            };
        }

        const childList = this.getListChildNodes(element, function (current) {
            return check(current);
        });

        return childList[last ? childList.length - 1 : 0];
    },

    /**
     * @description 1. The first node of all the child nodes of the "first" element is returned.
     * 2. The last node of all the child nodes of the "last" element is returned.
     * 3. When there is no "last" element, the first and last nodes of all the children of the "first" element are returned.
     * { sc: "first", ec: "last" }
     * @param {Element} first First element
     * @param {Element|null} last Last element
     * @returns {Object}
     */
    getEdgeChildNodes: function (first, last) {
        if (!first) return;
        if (!last) last = first;

        while (first && first.nodeType === 1 && first.childNodes.length > 0 && !this.isBreak(first)) first = first.firstChild;
        while (last && last.nodeType === 1 && last.childNodes.length > 0 &&  !this.isBreak(last)) last = last.lastChild;

        return {
            sc: first,
            ec: last || first
        };
    },

    /**
     * @description Returns the position of the left and top of argument. {left:0, top:0}
     * @param {Element} element Element node
     * @param {Element|null} wysiwygFrame When use iframe option, iframe object should be sent (context.element.wysiwygFrame)
     * @returns {Object}
     */
    getOffset: function (element, wysiwygFrame) {
        let offsetLeft = 0;
        let offsetTop = 0;
        let offsetElement = element.nodeType === 3 ? element.parentElement : element;
        const wysiwyg = this.getParentElement(element, this.isWysiwygDiv.bind(this));

        while (offsetElement && !this.hasClass(offsetElement, 'se-container') && offsetElement !== wysiwyg) {
            offsetLeft += offsetElement.offsetLeft;
            offsetTop += offsetElement.offsetTop;
            offsetElement = offsetElement.offsetParent;
        }

        const iframe = wysiwygFrame && /iframe/i.test(wysiwygFrame.nodeName);

        return {
            left: offsetLeft + (iframe ? wysiwygFrame.parentElement.offsetLeft : 0),
            top: (offsetTop - wysiwyg.scrollTop) + (iframe ? wysiwygFrame.parentElement.offsetTop : 0)
        };
    },

    /**
     * @description It compares the start and end indexes of "a" and "b" and returns the number of overlapping indexes in the range.
     * ex) 1, 5, 4, 6 => 2 (4 ~ 5)
     * @param {Number} aStart Start index of "a"
     * @param {Number} aEnd End index of "a"
     * @param {Number} bStart Start index of "b"
     * @param {Number} bEnd Start index of "b"
     * @returns {Number}
     */
    getOverlapRangeAtIndex: function (aStart, aEnd, bStart, bEnd) {
        if (aStart <= bEnd ? aEnd < bStart : aEnd > bStart) return 0;

        const overlap = (aStart > bStart ? aStart : bStart) - (aEnd < bEnd ? aEnd : bEnd);
        return (overlap < 0 ? overlap * -1 : overlap) + 1;
    },

    /**
     * @description Set the text content value of the argument value element
     * @param {Element} element Element to replace text content
     * @param {String} txt Text to be applied
     */
    changeTxt: function (element, txt) {
        if (!element || !txt) return;
        element.textContent = txt;
    },

    /**
     * @description Determine whether any of the matched elements are assigned the given class
     * @param {Element} element Elements to search class name
     * @param {String} className Class name to search for
     * @returns {Boolean}
     */
    hasClass: function (element, className) {
        if (!element) return;

        return element.classList.contains(className.trim());
    },

    /**
     * @description Append the className value of the argument value element
     * @param {Element} element Elements to add class name
     * @param {String} className Class name to be add
     */
    addClass: function (element, className) {
        if (!element) return;

        const check = new this._w.RegExp('(\\s|^)' + className + '(\\s|$)');
        if (check.test(element.className)) return;

        element.className += (element.className.length > 0 ? ' ' : '') + className;
    },

    /**
     * @description Delete the className value of the argument value element
     * @param {Element} element Elements to remove class name
     * @param {String} className Class name to be remove
     */
    removeClass: function (element, className) {
        if (!element) return;

        const check = new this._w.RegExp('(\\s|^)' + className + '(\\s|$)');
        element.className = element.className.replace(check, ' ').trim();
    },

    /**
     * @description Argument value If there is no class name, insert it and delete the class name if it exists
     * @param {Element} element Elements to replace class name
     * @param {String} className Class name to be change
     */
    toggleClass: function (element, className) {
        if (!element) return;

        const check = new this._w.RegExp('(\\s|^)' + className + '(\\s|$)');
        if (check.test(element.className)) {
            element.className = element.className.replace(check, ' ').trim();
        }
        else {
            element.className += ' ' + className;
        }
    },

    /**
     * @description Delete argumenu value element
     * @param {Element} item Element to be remove
     */
    removeItem: function (item) {
        if (!item) return;
        try {
            item.remove();
        } catch (e) {
            item.parentNode.removeChild(item);
        }
    },

    /**
     * @description Delete all parent nodes that match the condition.
     * Returns an {sc: previousSibling, ec: nextSibling}(the deleted node reference) or null.
     * @param {Element} item Element to be remove
     * @param {Function|null} validation Validation function. default(Deleted if it only have breakLine and blanks)
     * @returns {Object|null} {sc: previousSibling, ec: nextSibling}
     */
    removeItemAllParents: function (item, validation) {
        if (!item) return null;
        let cc = null;
        if (!validation) {
            validation = function (current) {
                const text = current.textContent.trim();
                return text.length === 0 || /^(\n|\u200B)+$/.test(text);
            };
        }

        (function recursionFunc (element) {
            if (!util_util.isWysiwygDiv(element)) {
                const parent = element.parentNode;
                if (parent && validation(element)) {
                    cc = {
                        sc: element.previousElementSibling,
                        ec: element.nextElementSibling
                    };
                    util_util.removeItem(element);
                    recursionFunc(parent);
                }
            }
        }(item));

        return cc;
    },

    /**
     * @description Delete a empty child node of argument element
     * @param {Element} element Element node
     */
    removeEmptyNode: function (element) {
        const inst = this;
        
        (function recursionFunc(current) {
            if (current !== element && inst.onlyZeroWidthSpace(current.textContent) && !/^BR$/i.test(current.nodeName) && 
                    (!current.firstChild || !/^BR$/i.test(current.firstChild.nodeName)) && !inst.isComponent(current)) {
                if (current.parentNode) {
                    current.parentNode.removeChild(current);
                    return -1;
                }
            } else {
                const children = current.children;
                for (let i = 0, len = children.length, r = 0; i < len; i++) {
                    if (!children[i + r] || inst.isComponent(children[i + r])) continue;
                    r += recursionFunc(children[i + r]);
                }
            }

            return 0;
        })(element);

        if (element.childNodes.length === 0) element.innerHTML = '<br>';
    },

    /**
     * @description Nodes that need to be added without modification when changing text nodes !(span|font|b|strong|var|i|em|u|ins|s|strike|del|sub|sup|a)
     * @param {Element} element Element to check
     * @returns {Boolean}
     */
    isIgnoreNodeChange: function (element) {
        return element.nodeType !== 3 && !/^(span|font|b|strong|var|i|em|u|ins|s|strike|del|sub|sup|mark|a)$/i.test(element.nodeName);
    },

    /**
     * @description Gets the clean HTML code for editor
     * @param {String} html HTML string
     * @returns {String}
     */
    cleanHTML: function (html) {
        const tagsAllowed = new this._w.RegExp('^(meta|script|link|style|[a-z]+\:[a-z]+)$', 'i');
        const domTree = this._d.createRange().createContextualFragment(html).childNodes;
        let cleanHTML = '';

        for (let i = 0, len = domTree.length; i < len; i++) {
            if (!tagsAllowed.test(domTree[i].nodeName)) {
                cleanHTML += domTree[i].nodeType === 1 ? domTree[i].outerHTML : domTree[i].nodeType === 3 ? domTree[i].textContent : '';
            }
        }

        cleanHTML = cleanHTML
            .replace(/<(script|style).*>(\n|.)*<\/(script|style)>/g, '')
            .replace(/(<[a-zA-Z0-9]+)[^>]*(?=>)/g, function (m, t) {
                const v = m.match(/((?:contenteditable|colspan|rowspan|target|href|src|class|data-format|data-size|data-file-size|data-file-name|data-origin|data-align|data-image-link|data-rotate|data-proportion|data-percentage|origin-size)\s*=\s*"[^"]*")/ig);
                if (v) {
                    for (let i = 0, len = v.length; i < len; i++) {
                        if (/^class="(?!(__se__|se-))/.test(v[i])) continue;
                        t += ' ' + v[i];
                    }
                }
                return t;
            })
            .replace(/<\/?(span[^>^<]*)>/g, '')
            .replace(this._deleteExclusionTags, '');

        return this._tagConvertor(cleanHTML || html);
    },

    /**
     * @description Delete Exclusion tags regexp object
     * @returns {Object}
     * @private
     */
    _deleteExclusionTags: (function () {
        const exclusionTags = 'br|p|div|pre|blockquote|h[1-6]|ol|ul|dl|li|hr|figure|figcaption|img|iframe|audio|video|table|thead|tbody|tr|th|td|a|b|strong|var|i|em|u|ins|s|span|strike|del|sub|sup|mark'.split('|');
        let regStr = '<\\/?(';

        for (let i = 0, len = exclusionTags.length; i < len; i++) {
            regStr += '(?!\\b' + exclusionTags[i] + '\\b)';
        }

        regStr += '[^>^<])+>';

        return new RegExp(regStr, 'g');
    })()
};

/* harmony default export */ var lib_util = (util_util);
// CONCATENATED MODULE: ./node_modules/suneditor/src/lib/constructor.js
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */






/* harmony default export */ var lib_constructor = ({
    /**
     * @description document create - call _createToolBar()
     * @param {element} element Textarea
     * @param {Object} options Options
     * @returns {Object}
     */
    init: function (element, options) {
        if (typeof options !== 'object') options = {};

        const doc = document;

        /** --- init options --- */
        this._initOptions(element, options);
    
        // suneditor div
        const top_div = doc.createElement('DIV');
        top_div.className = 'sun-editor';
        if (element.id) top_div.id = 'suneditor_' + element.id;
    
        // relative div
        const relative = doc.createElement('DIV');
        relative.className = 'se-container';
    
        // toolbar
        const tool_bar = this._createToolBar(doc, options.buttonList, options.plugins, options.lang);
        const arrow = doc.createElement('DIV');
        arrow.className = 'se-arrow';

        // sticky toolbar dummy
        const sticky_dummy = doc.createElement('DIV');
        sticky_dummy.className = 'se-toolbar-sticky-dummy';
    
        // inner editor div
        const editor_div = doc.createElement('DIV');
        editor_div.className = 'se-wrapper';

        /** --- init elements and create bottom bar --- */
        const initHTML = lib_util.convertContentsForEditor(element.value);
        const initElements = this._initElements(options, top_div, tool_bar.element, arrow, initHTML);

        const bottomBar = initElements.bottomBar;
        const wysiwyg_div = initElements.wysiwygFrame;
        const placeholder_span = initElements.placeholder;
        let textarea = initElements.codeView;

        // resizing bar
        const resizing_bar = bottomBar.resizingBar;
        const navigation = bottomBar.navigation;
        const char_counter = bottomBar.charCounter;
    
        // loading box
        const loading_box = doc.createElement('DIV');
        loading_box.className = 'se-loading-box sun-editor-common';
        loading_box.innerHTML = '<div class="se-loading-effect"></div>';
    
        // resize operation background
        const resize_back = doc.createElement('DIV');
        resize_back.className = 'se-resizing-back';
    
        /** append html */
        editor_div.appendChild(wysiwyg_div);
        editor_div.appendChild(textarea);
        if (placeholder_span) editor_div.appendChild(placeholder_span);
        relative.appendChild(tool_bar.element);
        relative.appendChild(sticky_dummy);
        relative.appendChild(editor_div);
        relative.appendChild(resize_back);
        relative.appendChild(loading_box);
        if (resizing_bar) relative.appendChild(resizing_bar);
        top_div.appendChild(relative);

        textarea = this._checkCodeMirror(options, textarea);
    
        return {
            constructed: {
                _top: top_div,
                _relative: relative,
                _toolBar: tool_bar.element,
                _editorArea: editor_div,
                _wysiwygArea: wysiwyg_div,
                _codeArea: textarea,
                _placeholder: placeholder_span,
                _resizingBar: resizing_bar,
                _navigation: navigation,
                _charCounter: char_counter,
                _loading: loading_box,
                _resizeBack: resize_back,
                _stickyDummy: sticky_dummy,
                _arrow: arrow
            },
            options: options,
            plugins: tool_bar.plugins,
            pluginCallButtons: tool_bar.pluginCallButtons
        };
    },

    /**
     * @description Check the CodeMirror option to apply the CodeMirror and return the CodeMirror element.
     * @param {Object} options options
     * @param {Element} textarea textarea element
     * @private
     */
    _checkCodeMirror: function(options, textarea) {
        if (options.codeMirror) {
            const cmOptions = [{
                mode: 'htmlmixed',
                htmlMode: true,
                lineNumbers: true,
                lineWrapping: true
            }, (options.codeMirror.options || {})].reduce(function (init, option) {
                Object.keys(option).forEach(function (key) {
                    init[key] = option[key];
                });
                return init;
            }, {});

            if (options.height === 'auto') {
                cmOptions.viewportMargin = Infinity;
                cmOptions.height = 'auto';
            }
            
            const cm = options.codeMirror.src.fromTextArea(textarea, cmOptions);
            cm.display.wrapper.style.cssText = textarea.style.cssText;
            
            options.codeMirrorEditor = cm;
            textarea = cm.display.wrapper;
            textarea.className += ' se-wrapper-code-mirror';
        }

        return textarea;
    },

    /**
     * @description Add or reset options
     * @param {Object} mergeOptions New options property
     * @param {Object} context Context object of core
     * @param {Object} plugins Origin plugins
     * @param {Object} originOptions Origin options
     * @returns {Object} pluginCallButtons
     * @private
     */
    _setOptions: function (mergeOptions, context, plugins, originOptions) {
        this._initOptions(context.element.originElement, mergeOptions);

        const el = context.element;
        const relative = el.relative;
        const editorArea = el.editorArea;
        const isNewToolbar = !!mergeOptions.buttonList || mergeOptions.mode !== originOptions.mode;
        const isNewPlugins = !!mergeOptions.plugins;

        const tool_bar = this._createToolBar(document, (isNewToolbar ? mergeOptions.buttonList : originOptions.buttonList), (isNewPlugins ? mergeOptions.plugins : plugins), mergeOptions.lang);
        const arrow = document.createElement('DIV');
        arrow.className = 'se-arrow';

        if (isNewToolbar) {
            relative.insertBefore(tool_bar.element, el.toolbar);
            relative.removeChild(el.toolbar);
            el.toolbar = tool_bar.element;
            el._arrow = arrow;
        }
        
        const initElements = this._initElements(mergeOptions, el.topArea, (isNewToolbar ? tool_bar.element : el.toolbar), arrow, el.wysiwyg.innerHTML);

        const bottomBar = initElements.bottomBar;
        const wysiwygFrame = initElements.wysiwygFrame;
        const placeholder_span = initElements.placeholder;
        let code = initElements.codeView;

        if (el.resizingBar) relative.removeChild(el.resizingBar);
        if (bottomBar.resizingBar) relative.appendChild(bottomBar.resizingBar);
        
        el.resizingBar = bottomBar.resizingBar;
        el.navigation = bottomBar.navigation;
        el.charCounter = bottomBar.charCounter;

        editorArea.removeChild(el.wysiwygFrame);
        editorArea.removeChild(el.code);
        editorArea.appendChild(wysiwygFrame);
        editorArea.appendChild(code);

        if (el.placeholder) editorArea.removeChild(el.placeholder);
        if (placeholder_span) editorArea.appendChild(placeholder_span);

        code = this._checkCodeMirror(mergeOptions, code);

        el.wysiwygFrame = wysiwygFrame;
        el.code = code;
        el.placeholder = placeholder_span;

        return {
            callButtons: isNewToolbar ? tool_bar.pluginCallButtons : null,
            plugins: isNewToolbar || isNewPlugins ? tool_bar.plugins : null
        };
    },

    /**
     * @description Initialize property of suneditor elements
     * @param {Object} options Options
     * @param {Element} topDiv Suneditor top div
     * @param {Element} toolBar Tool bar
     * @param {Element} toolBarArrow Tool bar arrow (balloon editor)
     * @param {Element} initValue Code view textarea
     * @returns {Object} Bottom bar elements (resizingBar, navigation, charCounter)
     * @private
     */
    _initElements: function (options, topDiv, toolBar, toolBarArrow, initHTML) {
        /** top div */
        topDiv.style.width = options.width;
        topDiv.style.minWidth = options.minWidth;
        topDiv.style.maxWidth = options.maxWidth;
        topDiv.style.display = options.display;
        if (typeof options.position === 'string') topDiv.style.position = options.position;

        /** toolbar */
        if (/inline/i.test(options.mode)) {
            toolBar.className += ' se-toolbar-inline';
            toolBar.style.width = options.toolbarWidth;
        } else if (/balloon/i.test(options.mode)) {
            toolBar.className += ' se-toolbar-balloon';
            toolBar.style.width = options.toolbarWidth;
            toolBar.appendChild(toolBarArrow);
        }

        /** editor */
        // wysiwyg div or iframe
        const wysiwygDiv = document.createElement(!options.iframe ? 'DIV' : 'IFRAME');
        wysiwygDiv.className = 'se-wrapper-inner se-wrapper-wysiwyg';
        wysiwygDiv.style.display = 'block';

        if (!options.iframe) {
            wysiwygDiv.setAttribute('contenteditable', true);
            wysiwygDiv.setAttribute('scrolling', 'auto');
            wysiwygDiv.className += ' sun-editor-editable';
            wysiwygDiv.innerHTML = initHTML;
        } else {
            const cssTags = (function () {
                const linkNames = options.iframeCSSFileName;
                let tagString = '';

                for (let f = 0, len = linkNames.length, path; f < len; f++) {
                    path = [];

                    if (/^https?:\/\//.test(linkNames[f])) {
                        path.push(linkNames[f]);
                    } else {
                        const CSSFileName = new RegExp('(^|.*[\\/])' + linkNames[f] + '(\\..+)?\.css(?:\\?.*|;.*)?$', 'i');
        
                        for (let c = document.getElementsByTagName('link'), i = 0, len = c.length, styleTag; i < len; i++) {
                            styleTag = c[i].href.match(CSSFileName);
                            if (styleTag) path.push(styleTag[0]);
                        }
                    }
        
                    if (!path || path.length === 0) throw '[SUNEDITOR.constructor.iframe.fail] The suneditor CSS files installation path could not be automatically detected. Please set the option property "iframeCSSFileName" before creating editor instances.';
        
                    for (let i = 0, len = path.length; i < len; i++) {
                        tagString += '<link href="' + path[i] + '" rel="stylesheet">';
                    }
                }

                return tagString;
            })() + (options.height === 'auto' ? '<style>\n/** Iframe height auto */\nbody{height: min-content; overflow: hidden;}\n</style>' : '');

            wysiwygDiv.allowFullscreen = true;
            wysiwygDiv.frameBorder = 0;
            wysiwygDiv.addEventListener('load', function () {
                this.setAttribute('scrolling', 'auto');
                this.contentDocument.head.innerHTML = '' +
                    '<meta charset="utf-8" />' +
                    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
                    '<title></title>' + 
                    cssTags;
                this.contentDocument.body.className = 'sun-editor-editable';
                this.contentDocument.body.setAttribute('contenteditable', true);
                this.contentDocument.body.innerHTML = initHTML;
            });
        }
        
        wysiwygDiv.style.height = options.height;
        wysiwygDiv.style.minHeight = options.minHeight;
        wysiwygDiv.style.maxHeight = options.maxHeight;

        // textarea for code view
        const textarea = document.createElement('TEXTAREA');
        textarea.className = 'se-wrapper-inner se-wrapper-code';
        textarea.style.display = 'none';

        textarea.style.height = options.height;
        textarea.style.minHeight = options.minHeight;
        textarea.style.maxHeight = options.maxHeight;
        if (options.height === 'auto') textarea.style.overflow = 'hidden';

        /** resize bar */
        let resizingBar = null;
        let navigation = null;
        let charCounter = null;
        if (options.resizingBar) {
            resizingBar = document.createElement('DIV');
            resizingBar.className = 'se-resizing-bar sun-editor-common';

            /** navigation */
            navigation = document.createElement('DIV');
            navigation.className = 'se-navigation sun-editor-common';
            resizingBar.appendChild(navigation);

            /** char counter */
            if (options.charCounter) {
                const charWrapper = document.createElement('DIV');
                charWrapper.className = 'se-char-counter-wrapper';
    
                charCounter = document.createElement('SPAN');
                charCounter.className = 'se-char-counter';
                charCounter.textContent = '0';
                charWrapper.appendChild(charCounter);
    
                if (options.maxCharCount > 0) {
                    const char_max = document.createElement('SPAN');
                    char_max.textContent = ' / ' + options.maxCharCount;
                    charWrapper.appendChild(char_max);
                }

                resizingBar.appendChild(charWrapper);
            }
        }
        
        let placeholder = null;
        if (options.placeholder) {
            placeholder = document.createElement('SPAN');
            placeholder.className = 'se-placeholder';
            placeholder.innerText = options.placeholder;
        }

        return {
            bottomBar: {
                resizingBar: resizingBar,
                navigation: navigation,
                charCounter: charCounter
            },
            wysiwygFrame: wysiwygDiv,
            codeView: textarea,
            placeholder: placeholder
        };
    },

    /**
     * @description Initialize options
     * @param {Element} element Options object
     * @param {Object} options Options object
     * @private
     */
    _initOptions: function (element, options) {
        /** user options */
        options.lang = options.lang || en_default.a;
        /** Layout */
        options.mode = options.mode || 'classic'; // classic, inline, balloon
        options.toolbarWidth = options.toolbarWidth ? (lib_util.isNumber(options.toolbarWidth) ? options.toolbarWidth + 'px' : options.toolbarWidth) : 'auto';
        options.stickyToolbar = /balloon/i.test(options.mode) ? -1 : options.stickyToolbar === undefined ? 0 : (/^\d+/.test(options.stickyToolbar) ? lib_util.getNumber(options.stickyToolbar, 0) : -1);
        // options.fullPage = options.fullPage;
        options.iframe = options.fullPage || options.iframe;
        options.iframeCSSFileName = options.iframe ? typeof options.iframeCSSFileName === 'string' ? [options.iframeCSSFileName] : (options.iframeCSSFileName || ['suneditor']) : null;
        options.codeMirror = options.codeMirror ? options.codeMirror.src ? options.codeMirror : {src: options.codeMirror} : null;
        /** Display */
        // options.position = options.position;
        options.display = options.display || (element.style.display === 'none' || !element.style.display ? 'block' : element.style.display);
        options.popupDisplay = options.popupDisplay || 'full';
        /** Bottom resizing bar */
        options.resizingBar = options.resizingBar === undefined ? (/inline|balloon/i.test(options.mode) ? false : true) : options.resizingBar;
        options.showPathLabel = !options.resizingBar ? false : typeof options.showPathLabel === 'boolean' ? options.showPathLabel : true;
        options.charCounter = options.maxCharCount > 0 ? true : typeof options.charCounter === 'boolean' ? options.charCounter : false;
        options.maxCharCount = lib_util.isNumber(options.maxCharCount) && options.maxCharCount > -1 ? options.maxCharCount * 1 : null;
        /** Width size */
        options.width = options.width ? (lib_util.isNumber(options.width) ? options.width + 'px' : options.width) : (element.clientWidth ? element.clientWidth + 'px' : '100%');
        options.minWidth = (lib_util.isNumber(options.minWidth) ? options.minWidth + 'px' : options.minWidth) || '';
        options.maxWidth = (lib_util.isNumber(options.maxWidth) ? options.maxWidth + 'px' : options.maxWidth) || '';
        /** Height size */
        options.height = options.height ? (lib_util.isNumber(options.height) ? options.height + 'px' : options.height) : (element.clientHeight ? element.clientHeight + 'px' : 'auto');
        options.minHeight = (lib_util.isNumber(options.minHeight) ? options.minHeight + 'px' : options.minHeight) || '';
        options.maxHeight = (lib_util.isNumber(options.maxHeight) ? options.maxHeight + 'px' : options.maxHeight) || '';
        /** Defining menu items */
        options.font = !options.font ? null : options.font;
        options.fontSize = !options.fontSize ? null : options.fontSize;
        options.formats = !options.formats ? null : options.formats;
        options.colorList = !options.colorList ? null : options.colorList;
        options.lineHeights = !options.lineHeights ? null : options.lineHeights;
        options.paragraphStyles = !options.paragraphStyles ? null : options.paragraphStyles;
        options.textStyles = !options.textStyles ? null : options.textStyles;
        options.fontSizeUnit = typeof options.fontSizeUnit === 'string' ? (options.fontSizeUnit.trim() || 'px') : 'px';
        /** Image */
        options.imageResizing = options.imageResizing === undefined ? true : options.imageResizing;
        options.imageHeightShow = options.imageHeightShow === undefined ? true : !!options.imageHeightShow;
        options.imageWidth = !options.imageWidth ? 'auto' : lib_util.isNumber(options.imageWidth) ? options.imageWidth + 'px' : options.imageWidth;
        options.imageSizeOnlyPercentage = !!options.imageSizeOnlyPercentage;
        options._imageSizeUnit = options.imageSizeOnlyPercentage ? '%' : 'px';
        options.imageRotation = options.imageRotation !== undefined ? options.imageRotation : !(options.imageSizeOnlyPercentage || !options.imageHeightShow);
        options.imageFileInput = options.imageFileInput === undefined ? true : options.imageFileInput;
        options.imageUrlInput = (options.imageUrlInput === undefined || !options.imageFileInput) ? true : options.imageUrlInput;
        options.imageUploadHeader = options.imageUploadHeader || null;
        options.imageUploadUrl = options.imageUploadUrl || null;
        options.imageUploadSizeLimit = /\d+/.test(options.imageUploadSizeLimit) ? lib_util.getNumber(options.imageUploadSizeLimit, 0) : null;
        /** Video */
        options.videoResizing = options.videoResizing === undefined ? true : options.videoResizing;
        options.videoHeightShow = options.videoHeightShow === undefined ? true : !!options.videoHeightShow;
        options.videoRatioShow = options.videoRatioShow === undefined ? true : !!options.videoRatioShow;
        options.videoWidth = !options.videoWidth || !lib_util.getNumber(options.videoWidth) ? '100%' : lib_util.isNumber(options.videoWidth) ? options.videoWidth + 'px' : options.videoWidth;
        options.videoSizeOnlyPercentage = !!options.videoSizeOnlyPercentage;
        options._videoSizeUnit = options.videoSizeOnlyPercentage ? '%' : 'px';
        options.videoRotation = options.videoRotation !== undefined ? options.videoRotation : !(options.videoSizeOnlyPercentage || !options.videoHeightShow);
        options.videoRatio = lib_util.getNumber(options.videoRatio, 4) || 0.5625; // 16:9
        options.videoRatioList = !options.videoRatioList ? null : options.videoRatioList;
        options.youtubeQuery = (options.youtubeQuery || '').replace('?', '');
        /** Defining save button */
        options.callBackSave = !options.callBackSave ? null : options.callBackSave;
        /** Templates Array */
        options.templates = !options.templates ? null : options.templates;
        /** ETC */
        options.placeholder = typeof options.placeholder === 'string' ? options.placeholder : null;
        /** Buttons */
        options.buttonList = options.buttonList || [
            ['undo', 'redo'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['fullScreen', 'showBlocks', 'codeView'],
            ['preview', 'print']
        ];
    },

    /**
     * @description Suneditor's Default button list
     * @private
     */
    _defaultButtons: function (lang) {
        return {
            /** command */
            bold: ['_se_command_bold', lang.toolbar.bold + ' (CTRL+B)', 'STRONG', '',
                '<i class="se-icon-bold"></i>'
            ],

            underline: ['_se_command_underline', lang.toolbar.underline + ' (CTRL+U)', 'INS', '',
                '<i class="se-icon-underline"></i>'
            ],

            italic: ['_se_command_italic', lang.toolbar.italic + ' (CTRL+I)', 'EM', '',
                '<i class="se-icon-italic"></i>'
            ],

            strike: ['_se_command_strike', lang.toolbar.strike + ' (CTRL+SHIFT+S)', 'DEL', '',
                '<i class="se-icon-strokethrough"></i>'
            ],

            subscript: ['_se_command_subscript', lang.toolbar.subscript, 'SUB', '',
                '<i class="se-icon-subscript"></i>'
            ],

            superscript: ['_se_command_superscript', lang.toolbar.superscript, 'SUP', '',
                '<i class="se-icon-superscript"></i>'
            ],

            removeFormat: ['', lang.toolbar.removeFormat, 'removeFormat', '',
                '<i class="se-icon-erase"></i>'
            ],

            indent: ['', lang.toolbar.indent + ' (CTRL+])', 'indent', '',
                '<i class="se-icon-indent-right"></i>'
            ],

            outdent: ['_se_command_outdent', lang.toolbar.outdent + ' (CTRL+[)', 'outdent', '',
                '<i class="se-icon-indent-left"></i>', true
            ],

            fullScreen: ['code-view-enabled', lang.toolbar.fullScreen, 'fullScreen', '',
                '<i class="se-icon-expansion"></i>'
            ],

            showBlocks: ['', lang.toolbar.showBlocks, 'showBlocks', '',
                '<i class="se-icon-showBlocks"></i>'
            ],

            codeView: ['code-view-enabled', lang.toolbar.codeView, 'codeView', '',
                '<i class="se-icon-code-view"></i>'
            ],

            undo: ['_se_command_undo', lang.toolbar.undo + ' (CTRL+Z)', 'undo', '',
                '<i class="se-icon-undo"></i>', true
            ],

            redo: ['_se_command_redo', lang.toolbar.redo + ' (CTRL+Y / CTRL+SHIFT+Z)', 'redo', '',
                '<i class="se-icon-redo"></i>', true
            ],

            preview: ['', lang.toolbar.preview, 'preview', '',
                '<i class="se-icon-preview"></i>'
            ],

            print: ['', lang.toolbar.print, 'print', '',
                '<i class="se-icon-print"></i>'
            ],

            save: ['_se_command_save', lang.toolbar.save, 'save', '',
                '<i class="se-icon-save"></i>', true
            ],

            /** plugins - submenu */
            font: ['se-btn-select se-btn-tool-font _se_command_font_family', lang.toolbar.font, 'font', 'submenu',
                '<span class="txt">' + lang.toolbar.font + '</span><i class="se-icon-arrow-down"></i>'
            ],
            
            formatBlock: ['se-btn-select se-btn-tool-format', lang.toolbar.formats, 'formatBlock', 'submenu',
                '<span class="txt _se_command_format">' + lang.toolbar.formats + '</span><i class="se-icon-arrow-down"></i>'
            ],

            fontSize: ['se-btn-select se-btn-tool-size', lang.toolbar.fontSize, 'fontSize', 'submenu',
                '<span class="txt _se_command_font_size">' + lang.toolbar.fontSize + '</span><i class="se-icon-arrow-down"></i>'
            ],

            fontColor: ['', lang.toolbar.fontColor, 'fontColor', 'submenu',
                '<i class="se-icon-fontColor"></i>'
            ],

            hiliteColor: ['', lang.toolbar.hiliteColor, 'hiliteColor', 'submenu',
                '<i class="se-icon-hiliteColor"></i>'
            ],

            align: ['se-btn-align', lang.toolbar.align, 'align', 'submenu',
                '<i class="se-icon-align-left _se_command_align"></i>'
            ],

            list: ['_se_command_list', lang.toolbar.list, 'list', 'submenu',
                '<i class="se-icon-list-number"></i>'
            ],

            horizontalRule: ['btn_line', lang.toolbar.horizontalRule, 'horizontalRule', 'submenu',
                '<i class="se-icon-hr"></i>'
            ],

            table: ['', lang.toolbar.table, 'table', 'submenu',
                '<i class="se-icon-grid"></i>'
            ],

            lineHeight: ['', lang.toolbar.lineHeight, 'lineHeight', 'submenu',
                '<i class="se-icon-line-height"></i>'
            ],

            template: ['', lang.toolbar.template, 'template', 'submenu',
                '<i class="se-icon-template"></i>'
            ],
            paragraphStyle: ['', lang.toolbar.paragraphStyle, 'paragraphStyle', 'submenu',
                '<i class="se-icon-paragraph-style"></i>'
            ],
            textStyle: ['', lang.toolbar.textStyle, 'textStyle', 'submenu',
                '<i class="se-icon-text-style"></i>'
            ],

            /** plugins - dialog */
            link: ['', lang.toolbar.link, 'link', 'dialog',
                '<i class="se-icon-link"></i>'
            ],

            image: ['', lang.toolbar.image, 'image', 'dialog',
                '<i class="se-icon-image"></i>'
            ],

            video: ['', lang.toolbar.video, 'video', 'dialog',
                '<i class="se-icon-video"></i>'
            ]
        };
    },

    /**
     * @description Create a group div containing each module
     * @returns {Element}
     * @private
     */
    _createModuleGroup: function (oneModule) {
        const oDiv = lib_util.createElement('DIV');
        oDiv.className = 'se-btn-module' + (oneModule ? '' : ' se-btn-module-border');

        const oUl = lib_util.createElement('UL');
        oUl.className = 'se-menu-list';
        oDiv.appendChild(oUl);

        return {
            'div': oDiv,
            'ul': oUl
        };
    },

    /**
     * @description Create a button element
     * @param {string} buttonClass className in button
     * @param {string} title Title in button
     * @param {string} dataCommand The data-command property of the button
     * @param {string} dataDisplay The data-display property of the button ('dialog', 'submenu')
     * @param {string} innerHTML Html in button
     * @param {string} _disabled Button disabled
     * @returns {Element}
     * @private
     */
    _createButton: function (buttonClass, title, dataCommand, dataDisplay, innerHTML, _disabled) {
        const oLi = lib_util.createElement('LI');
        const oButton = lib_util.createElement('BUTTON');

        oButton.setAttribute('type', 'button');
        oButton.setAttribute('class', 'se-btn' + (buttonClass ? ' ' + buttonClass : '') + ' se-tooltip');
        oButton.setAttribute('data-command', dataCommand);
        oButton.setAttribute('data-display', dataDisplay);
        innerHTML += '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + title + '</span></span>';

        if (_disabled) oButton.setAttribute('disabled', true);
        
        oButton.innerHTML = innerHTML;
        oLi.appendChild(oButton);

        return {
            'li': oLi,
            'button': oButton
        };
    },

    /**
     * @description Create editor HTML
     * @param {Array} doc document object
     * @param {Array} buttonList option.buttonList
     * @param {Array} lang option.lang
     * @private
     */
    _createToolBar: function (doc, buttonList, _plugins, lang) {
        const separator_vertical = doc.createElement('DIV');
        separator_vertical.className = 'se-toolbar-separator-vertical';

        const tool_bar = doc.createElement('DIV');
        tool_bar.className = 'se-toolbar sun-editor-common';

        /** create button list */
        const defaultButtonList = this._defaultButtons(lang);
        const pluginCallButtons = {};
        const plugins = {};
        if (_plugins) {
            const pluginsValues = _plugins.length ? _plugins : Object.keys(_plugins).map(function(name) { return _plugins[name]; });
            for (let i = 0, len = pluginsValues.length, p; i < len; i++) {
                p = pluginsValues[i].default || pluginsValues[i];
                plugins[p.name] = p;
            }
        }

        let module = null;
        let button = null;
        let moduleElement = null;
        let buttonElement = null;
        let pluginName = '';
        let vertical = false;
        const oneModule = buttonList.length === 1;

        for (let i = 0; i < buttonList.length; i++) {

            const buttonGroup = buttonList[i];
            moduleElement = this._createModuleGroup(oneModule);

            /** button object */
            if (typeof buttonGroup === 'object') {
                for (let j = 0; j < buttonGroup.length; j++) {

                    button = buttonGroup[j];
                    if (typeof button === 'object') {
                        if (typeof button.add === 'function') {
                            pluginName = button.name;
                            module = defaultButtonList[pluginName];
                            plugins[pluginName] = button;
                        } else {
                            pluginName = button.name;
                            module = [button.buttonClass, button.title, button.dataCommand, button.dataDisplay, button.innerHTML];
                        }
                    } else {
                        module = defaultButtonList[button];
                        pluginName = button;
                    }

                    buttonElement = this._createButton(module[0], module[1], module[2], module[3], module[4], module[5]);
                    moduleElement.ul.appendChild(buttonElement.li);

                    if (plugins[pluginName]) {
                        pluginCallButtons[pluginName] = buttonElement.button;
                    }
                }

                if (vertical) tool_bar.appendChild(separator_vertical.cloneNode(false));
                tool_bar.appendChild(moduleElement.div);
                vertical = true;
            }
            /** line break  */
            else if (/^\/$/.test(buttonGroup)) {
                const enterDiv = doc.createElement('DIV');
                enterDiv.className = 'se-btn-module-enter';
                tool_bar.appendChild(enterDiv);
                vertical = false;
            }
        }

        const tool_cover = doc.createElement('DIV');
        tool_cover.className = 'se-toolbar-cover';
        tool_bar.appendChild(tool_cover);

        return {
            'element': tool_bar,
            'plugins': plugins,
            'pluginCallButtons': pluginCallButtons
        };
    }
});
// CONCATENATED MODULE: ./node_modules/suneditor/src/lib/context.js
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/**
 * @description Elements and variables you should have
 * @param {HTMLElement} element textarea element
 * @param {object} cons Toolbar element you created
 * @param {json} options Inserted options
 * @returns {Object} {Elements, variables of the editor, option}
 * @private
 */
const _Context = function (element, cons, options) {
    return {
        element: {
            originElement: element,
            topArea: cons._top,
            relative: cons._relative,
            toolbar: cons._toolBar,
            resizingBar: cons._resizingBar,
            navigation: cons._navigation,
            charCounter: cons._charCounter,
            editorArea: cons._editorArea,
            wysiwygFrame: cons._wysiwygArea,
            wysiwyg: options.iframe ? cons._wysiwygArea.contentDocument.body : cons._wysiwygArea,
            code: cons._codeArea,
            placeholder: cons._placeholder,
            loading: cons._loading,
            resizeBackground: cons._resizeBack,
            _stickyDummy: cons._stickyDummy,
            _arrow: cons._arrow
        },
        tool: {
            cover: cons._toolBar.querySelector('.se-toolbar-cover'),
            bold: cons._toolBar.querySelector('._se_command_bold'),
            underline: cons._toolBar.querySelector('._se_command_underline'),
            italic: cons._toolBar.querySelector('._se_command_italic'),
            strike: cons._toolBar.querySelector('._se_command_strike'),
            subscript: cons._toolBar.querySelector('._se_command_subscript'),
            superscript: cons._toolBar.querySelector('._se_command_superscript'),
            font: cons._toolBar.querySelector('._se_command_font_family .txt'),
            fontTooltip: cons._toolBar.querySelector('._se_command_font_family .se-tooltip-text'),
            format: cons._toolBar.querySelector('._se_command_format'),
            fontSize: cons._toolBar.querySelector('._se_command_font_size'),
            align: cons._toolBar.querySelector('._se_command_align'),
            list: cons._toolBar.querySelector('._se_command_list'),
            undo: cons._toolBar.querySelector('._se_command_undo'),
            redo: cons._toolBar.querySelector('._se_command_redo'),
            save: cons._toolBar.querySelector('._se_command_save'),
            outdent: cons._toolBar.querySelector('._se_command_outdent')
        },
        option: options
    };
};

/* harmony default export */ var lib_context = (_Context);
// CONCATENATED MODULE: ./node_modules/suneditor/src/lib/history.js
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2019 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ var lib_history = (function (core, change) {
    const _w = window;
    const editor = core.context.element;
    const util = core.util;
    const undo = core.context.tool.undo;
    const redo = core.context.tool.redo;
    let pushDelay = null;
    let stackIndex = 0;
    let stack = [];

    function setContentsFromStack () {
        const item = stack[stackIndex];
        editor.wysiwyg.innerHTML = item.contents;

        core.setRange(util.getNodeFromPath(item.s.path, editor.wysiwyg), item.s.offset, util.getNodeFromPath(item.e.path, editor.wysiwyg), item.e.offset);
        core.focus();

        if (stackIndex === 0) {
            if (undo) undo.setAttribute('disabled', true);
            if (redo) redo.removeAttribute('disabled');
        } else if (stackIndex === stack.length - 1) {
            if (undo) undo.removeAttribute('disabled');
            if (redo) redo.setAttribute('disabled', true);
        } else {
            if (undo) undo.removeAttribute('disabled');
            if (redo) redo.removeAttribute('disabled');
        }

        core._checkComponents();
        core._charCount(0, false);
        core._resourcesStateChange();
        
        // onChange
        change();
    }

    function pushStack () {
        const current = core.getContents(true);
        if (!!stack[stackIndex] && current === stack[stackIndex].contents) return;

        stackIndex++;
        const range = core.getRange();

        if (stack.length > stackIndex) {
            stack = stack.slice(0, stackIndex);
            if (redo) redo.setAttribute('disabled', true);
        }

        stack[stackIndex] = {
            contents: current,
            s: {
                path: util.getNodePath(range.startContainer, null),
                offset: range.startOffset
            },
            e: {
                path: util.getNodePath(range.endContainer, null),
                offset: range.endOffset
            }
        };

        if (stackIndex === 1 && undo) undo.removeAttribute('disabled');

        core._checkComponents();
        core._charCount(0, false);
        // onChange
        change();
    }

    return {
        /**
         * @description History stack
         */
        stack: stack,

        /**
         * @description Saving the current status to the history object stack
         * If "delay" is true, it will be saved after 500 miliseconds
         * If the function is called again with the "delay" argument true before it is saved, the delay time is renewal
         * @param {Boolean} delay If true, delays 500 milliseconds
         */
        push: function (delay) {
            _w.setTimeout(core._resourcesStateChange);
            
            if (!delay || pushDelay) {
                _w.clearTimeout(pushDelay);
                if (!delay) {
                    pushStack();
                    return;
                }
            }

            pushDelay = _w.setTimeout(function () {
                _w.clearTimeout(pushDelay);
                pushDelay = null;
                pushStack();
            }, 500);
        },

        /**
         * @description Undo function
         */
        undo: function () {
            if (stackIndex > 0) {
                stackIndex--;
                setContentsFromStack();
            }
        },

        /**
         * @description Redo function
         */
        redo: function () {
            if (stack.length - 1 > stackIndex) {
                stackIndex++;
                setContentsFromStack();
            }
        },

        /**
         * @description Go to the history stack for that index.
         * If "index" is -1, go to the last stack
         * @param {Number} index Stack index
         */
        go: function (index) {
            stackIndex = index < 0 ? (stack.length - 1) : index;
            setContentsFromStack();
        },
        
        /**
         * @description Reset the history object
         */
        reset: function (ignoreChangeEvent) {
            if (undo) undo.setAttribute('disabled', true);
            if (redo) redo.setAttribute('disabled', true);
            if (core.context.tool.save) core.context.tool.save.setAttribute('disabled', true);
            
            stack.splice(0);
            stackIndex = 0;

            // pushStack
            stack[stackIndex] = {
                contents: core.getContents(true),
                s: {
                    path: [0, 0],
                    offset: 0
                },
                e: {
                    path: [0, 0],
                    offset: 0
                }
            };

            if (!ignoreChangeEvent) change();
        }
    };
});
// EXTERNAL MODULE: ./node_modules/suneditor/src/plugins/modules/notice.js
var notice = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/suneditor/src/lib/core.js
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */








/**
 * @description SunEditor constuctor function.
 * create core object and event registration.
 * core, event, userFunction
 * @param context
 * @param plugins
 * @param lang
 * @param _options
 * @returns {Object} UserFunction Object
 */
/* harmony default export */ var lib_core = (function (context, pluginCallButtons, plugins, lang, _options) {
    const _d = context.element.originElement.ownerDocument || document;
    const _w = _d.defaultView || window;
    const util = lib_util;

    /**
     * @description editor core object
     * should always bind this object when registering an event in the plug-in.
     */
    const core = {
        _d: _d,
        _w: _w,
        
        /**
         * @description Elements and user options parameters of the suneditor
         */
        context: context,

        /**
         * @description Plugin buttons
         */
        pluginCallButtons: pluginCallButtons,

        /**
         * @description Loaded plugins
         */
        plugins: plugins || {},

        /**
         * @description Util object
         */
        util: util,

        /**
         * @description Whether the plugin is initialized
         */
        initPlugins: {},

        /**
         * @description loaded language
         */
        lang: lang,

        /**
         * @description submenu element
         */
        submenu: null,

        /**
         * @description current resizing component name
         * @private
         */
        _resizingName: '',

        /**
         * @description current subment name
         * @private
         */
        _submenuName: '',

        /**
         * @description binded submenuOff method
         * @private
         */
        _bindedSubmenuOff: null,

        /**
         * @description active button element in submenu
         */
        submenuActiveButton: null,

        /**
         * @description The elements array to be processed unvisible when the controllersOff function is executed (resizing, link modified button, table controller)
         */
        controllerArray: [],

        /**
         * @description An array of buttons whose class name is not "code-view-enabled"
         */
        codeViewDisabledButtons: null,

        /**
         * @description History object for undo, redo
         */
        history: null,

        /**
         * @description binded controllersOff method
         * @private
         */
        _bindControllersOff: null,

        /**
         * @description Is inline mode?
         * @private
         */
        _isInline: null,

        /**
         * @description Is balloon mode?
         * @private
         */
        _isBalloon: null,

        /**
         * @description Required value when using inline mode to sticky toolbar
         * @private
         */
        _inlineToolbarAttr: {top: '', width: '', isShow: false},

        /**
         * @description Variable that controls the "blur" event in the editor of inline or balloon mode when the focus is moved to submenu
         * @private
         */
        _notHideToolbar: false,

        /**
         * @description Variable value that sticky toolbar mode
         * @private
         */
        _sticky: false,

        /**
         * @description If true, (initialize, reset) all indexes of image information
         * @private
         */
        _imagesInfoInit: true,
        _imagesInfoReset: false,

        /**
         * @description An user event function when image uploaded success or remove image
         * @private
         */
        _imageUpload: function (targetImgElement, index, state, imageInfo, remainingFilesCount) {
            if (typeof userFunction.onImageUpload === 'function') userFunction.onImageUpload(targetImgElement, index * 1, state, imageInfo, remainingFilesCount);
        },

        /**
         * @description An user event function when image upload failed
         * @private
         */
        _imageUploadError: function (errorMessage, result) {
            if (typeof userFunction.onImageUploadError === 'function') return userFunction.onImageUploadError(errorMessage, result);
            return true;
        },

        /**
         * @description Elements that need to change text or className for each selection change
         * @property {Element} FORMAT format button > span.txt
         * @property {Element} FONT font family button > span.txt
         * @property {Element} FONT_TOOLTIP font family tooltip element
         * @property {Element} SIZE font size button > span.txt
         * @property {Element} ALIGN align button > div.icon
         * @property {Element} LI list button
         * @property {Element} STRONG bold button
         * @property {Element} INS underline button
         * @property {Element} EM italic button
         * @property {Element} DEL strike button
         * @property {Element} SUB subscript button
         * @property {Element} SUP superscript button
         * @property {Element} OUTDENT outdent button
         */
        commandMap: null,

        /**
         * @description Variables used internally in editor operation
         * @property {Boolean} isCodeView State of code view
         * @property {Boolean} isFullScreen State of full screen
         * @property {Number} innerHeight_fullScreen InnerHeight in editor when in full screen
         * @property {Number} resizeClientY Remember the vertical size of the editor before resizing the editor (Used when calculating during resize operation)
         * @property {Number} tabSize Indent size of tab (4)
         * @property {Number} codeIndent Indent size of Code view mode (4)
         * @property {Number} minResizingSize Minimum size of editing area when resized {Number} (.se-wrapper-inner {min-height: 65px;} || 65)
         * @property {Array} currentNodes  An array of the current cursor's node structure
         * @private
         */
        _variable: {
            isCodeView: false,
            isFullScreen: false,
            innerHeight_fullScreen: 0,
            resizeClientY: 0,
            tabSize: 4,
            codeIndent: 4,
            minResizingSize: util.getNumber((context.element.wysiwygFrame.style.minHeight || '65'), 0),
            currentNodes: [],
            _range: null,
            _selectionNode: null,
            _originCssText: context.element.topArea.style.cssText,
            _bodyOverflow: '',
            _editorAreaOriginCssText: '',
            _wysiwygOriginCssText: '',
            _codeOriginCssText: '',
            _fullScreenAttrs: {sticky: false, balloon: false, inline: false},
            _imagesInfo: [],
            _imageIndex: 0,
            _videosCnt: 0
        },

        /**
         * @description If the plugin is not added, add the plugin and call the 'add' function.
         * If the plugin is added call callBack function.
         * @param {String} pluginName The name of the plugin to call
         * @param {function} callBackFunction Function to be executed immediately after module call
         */
        callPlugin: function (pluginName, callBackFunction) {
            if (!this.plugins[pluginName]) {
                throw Error('[SUNEDITOR.core.callPlugin.fail] The called plugin does not exist or is in an invalid format. (pluginName:"' + pluginName + '")');
            } else if (!this.initPlugins[pluginName]){
                this.plugins[pluginName].add(this, pluginCallButtons[pluginName]);
                this.initPlugins[pluginName] = true;
            }
                
            if (typeof callBackFunction === 'function') callBackFunction();
        },

        /**
         * @description If the module is not added, add the module and call the 'add' function
         * @param {Array} moduleArray module object's Array [dialog, resizing]
         */
        addModule: function (moduleArray) {
            for (let i = 0, len = moduleArray.length, moduleName; i < len; i++) {
                moduleName = moduleArray[i].name;
                if (!this.plugins[moduleName]) {
                    this.plugins[moduleName] = moduleArray[i];
                    if (typeof this.plugins[moduleName].add === 'function') this.plugins[moduleName].add(this);
                }
            }
        },

        /**
         * @description Enabled submenu
         * @param {Element} element Submenu's button element to call
         */
        submenuOn: function (element) {
            if (this._bindedSubmenuOff) this._bindedSubmenuOff();

            const submenuName = this._submenuName = element.getAttribute('data-command');

            this.submenu = element.nextElementSibling;
            this.submenu.style.display = 'block';
            util.addClass(element, 'on');
            this.submenuActiveButton = element;

            const overLeft = this.context.element.toolbar.offsetWidth - (element.parentElement.offsetLeft + this.submenu.offsetWidth);
            if (overLeft < 0) this.submenu.style.left = overLeft + 'px';
            else this.submenu.style.left = '1px';

            this._bindedSubmenuOff = this.submenuOff.bind(this);
            this.addDocEvent('mousedown', this._bindedSubmenuOff, false);

            if (this.plugins[submenuName].on) this.plugins[submenuName].on.call(this);
        },

        /**
         * @description Disable submenu
         */
        submenuOff: function () {
            this.removeDocEvent('mousedown', this._bindedSubmenuOff);
            this._bindedSubmenuOff = null;

            if (this.submenu) {
                this._submenuName = '';
                this.submenu.style.display = 'none';
                this.submenu = null;
                util.removeClass(this.submenuActiveButton, 'on');
                this.submenuActiveButton = null;
                this._notHideToolbar = false;
            }
            
            this.focus();
        },

        /**
         * @description Show controller at editor area (link button, image resize button, init function, etc..)
         * @param {*} arguments controller elements, functions..
         */
        controllersOn: function () {
            if (this._bindControllersOff) {
                const tempName = this._resizingName;
                this._bindControllersOff();
                this._resizingName = tempName;
            }

            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i].style) arguments[i].style.display = 'block';
                this.controllerArray[i] = arguments[i];
            }

            this._notHideToolbar = true;
            this._bindControllersOff = this.controllersOff.bind(this);
            this.addDocEvent('mousedown', this._bindControllersOff, false);
            this.addDocEvent('keydown', this._bindControllersOff, false);
        },

        /**
         * @description Hide controller at editor area (link button, image resize button..)
         */
        controllersOff: function (e) {
            if (this._resizingName && e && e.type === 'keydown' && e.keyCode !== 27) return;

            this._notHideToolbar = false;
            this._resizingName = '';
            if (!this._bindControllersOff) return;

            this.removeDocEvent('mousedown', this._bindControllersOff);
            this.removeDocEvent('keydown', this._bindControllersOff);
            this._bindControllersOff = null;

            const len = this.controllerArray.length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    if (typeof this.controllerArray[i] === 'function') this.controllerArray[i]();
                    else this.controllerArray[i].style.display = 'none';
                }

                this.controllerArray = [];
            }
        },

        /**
         * @description javascript execCommand
         * @param {String} command javascript execCommand function property
         * @param {Boolean} showDefaultUI javascript execCommand function property
         * @param {String} value javascript execCommand function property
         */
        execCommand: function (command, showDefaultUI, value) {
            this._wd.execCommand(command, showDefaultUI, (command === 'formatBlock' ? '<' + value + '>' : value));
            // history stack
            this.history.push(true);
        },

        /**
         * @description Focus to wysiwyg area
         */
        focus: function () {
            if (context.element.wysiwygFrame.style.display === 'none') return;

            try {
                const range = this.getRange();
                this.setRange(range.startContainer, range.startOffset, range.endContainer, range.endOffset);
            } catch (e) {
                const caption = util.getParentElement(this.getSelectionNode(), 'figcaption');
                if (caption) {
                    caption.focus();
                } else {
                    context.element.wysiwyg.focus();
                }

                this._editorRange();
            }

            event._applyTagEffects();
        },

        /**
         * @description If "focusEl" is a component, then that component is selected; if it is a format element, the last text is selected
         * @param {Element} focusEl Focus element
         */
        focusEdge: function (focusEl) {
            if (util.isComponent(focusEl)) {
                const imageComponent = focusEl.querySelector('IMG');
                const videoComponent = focusEl.querySelector('IFRAME');
    
                if (imageComponent) {
                    this.selectComponent(imageComponent, 'image');
                } else if (videoComponent) {
                    this.selectComponent(videoComponent, 'video');
                }
            } else {
                focusEl = util.getChildElement(focusEl, function (current) { return current.childNodes.length === 0 || current.nodeType === 3; }, true);
                this.setRange(focusEl, focusEl.textContent.length, focusEl, focusEl.textContent.length);
            }
        },

        /**
         * @description Set current editor's range object
         * @param {Element} startCon The startContainer property of the selection object.
         * @param {Number} startOff The startOffset property of the selection object.
         * @param {Element} endCon The endContainer property of the selection object.
         * @param {Number} endOff The endOffset property of the selection object.
         */
        setRange: function (startCon, startOff, endCon, endOff) {
            if (!startCon || !endCon) return;
            if (startOff > startCon.textContent.length) startOff = startCon.textContent.length;
            if (endOff > endCon.textContent.length) endOff = endCon.textContent.length;
            
            const range = this._wd.createRange();
            range.setStart(startCon, startOff);
            range.setEnd(endCon, endOff);

            const selection = this.getSelection();

            if (selection.removeAllRanges) {
                selection.removeAllRanges();
            }

            selection.addRange(range);
            this._editorRange();
        },

        /**
         * @description Remove range object and button effect
         */
        removeRange: function () {
            this.getSelection().removeAllRanges();

            const commandMap = this.commandMap;
            util.changeTxt(commandMap.FORMAT, lang.toolbar.formats);
            util.changeTxt(commandMap.FONT, lang.toolbar.font);
            util.changeTxt(commandMap.FONT_TOOLTIP, lang.toolbar.font);
            util.changeTxt(commandMap.SIZE, lang.toolbar.fontSize);
            util.removeClass(commandMap.LI_ICON, 'se-icon-list-bullets');
            util.addClass(commandMap.LI_ICON, 'se-icon-list-number');
            util.removeClass(commandMap.LI, 'active');
            util.removeClass(commandMap.STRONG, 'active');
            util.removeClass(commandMap.INS, 'active');
            util.removeClass(commandMap.EM, 'active');
            util.removeClass(commandMap.DEL, 'active');
            util.removeClass(commandMap.SUB, 'active');
            util.removeClass(commandMap.SUP, 'active');

            if (commandMap.OUTDENT) commandMap.OUTDENT.setAttribute('disabled', true);
            if (commandMap.LI) commandMap.LI.removeAttribute('data-focus');
            if (commandMap.ALIGN) {
                commandMap.ALIGN.className = 'se-icon-align-left';
                commandMap.ALIGN.removeAttribute('data-focus');
            }
        },

        /**
         * @description Get current editor's range object
         * @returns {Object}
         */
        getRange: function () {
            return this._variable._range || this._createDefaultRange();
        },

        /**
         * @description Get window selection obejct
         * @returns {Object}
         */
        getSelection: function () {
            return this._ww.getSelection();
        },

        /**
         * @description Get current select node
         * @returns {Node}
         */
        getSelectionNode: function () {
            if (!this._variable._selectionNode || util.isWysiwygDiv(this._variable._selectionNode)) this._editorRange();
            return this._variable._selectionNode || context.element.wysiwyg.firstChild;
        },

        /**
         * @description Saving the range object and the currently selected node of editor
         * @private
         */
        _editorRange: function () {
            const selection = this.getSelection();
            let range = null;
            let selectionNode = null;

            if (selection.rangeCount > 0) {
                range = selection.getRangeAt(0);
            }
            else {
                range = this._createDefaultRange();
            }

            this._variable._range = range;

            if (range.collapsed) {
                selectionNode = range.commonAncestorContainer;
            } else {
                selectionNode = selection.extentNode || selection.anchorNode;
            }

            this._variable._selectionNode = selectionNode;
        },

        /**
         * @description Return the range object of editor's first child node
         * @returns {Object}
         * @private
         */
        _createDefaultRange: function () {
            context.element.wysiwyg.focus();
            const range = this._wd.createRange();
            if (!context.element.wysiwyg.firstChild) this.execCommand('formatBlock', false, 'P');

            range.setStart(context.element.wysiwyg.firstChild, 0);
            range.setEnd(context.element.wysiwyg.firstChild, 0);
            
            return range;
        },

        /**
         * @description Returns a "formatElement"(P, DIV, H[1-6], LI) array from the currently selected range.
         * @param {Function|null} validation The validation function. (Replaces the default validation function-util.isFormatElement(current))
         * @returns {Array}
         */
        getSelectedElements: function (validation) {
            let range = this.getRange();

            if (util.isWysiwygDiv(range.startContainer)) {
                const children = context.element.wysiwyg.children;

                if (children.length === 0) return null;
                this.setRange(children[0], 0, children[children.length - 1], children[children.length - 1].textContent.trim().length);
                range = this.getRange();
            }

            const startCon = range.startContainer;
            const endCon = range.endContainer;
            const commonCon = range.commonAncestorContainer;

            // get line nodes
            const lineNodes = util.getListChildren(commonCon, function (current) {
                return validation ? validation(current) : util.isFormatElement(current);
            });

            if (!util.isWysiwygDiv(commonCon) && !util.isRangeFormatElement(commonCon)) lineNodes.unshift(util.getFormatElement(commonCon));
            if (startCon === endCon || lineNodes.length === 1) return lineNodes;

            let startLine = util.getFormatElement(startCon);
            let endLine = util.getFormatElement(endCon);
            let startIdx = null;
            let endIdx = null;
            
            const onlyTable = function (current) {
                return util.isTable(current) ? /^TABLE$/i.test(current.nodeName) : true;
            };
            const startRangeEl = util.getRangeFormatElement(startLine, onlyTable);
            const endRangeEl = util.getRangeFormatElement(endLine, onlyTable);
            const sameRange = startRangeEl === endRangeEl;
            
            for (let i = 0, len = lineNodes.length, line; i < len; i++) {
                line = lineNodes[i];

                if (startLine === line || (!sameRange && line === startRangeEl)) {
                    startIdx = i;
                    continue;
                }

                if (endLine === line || (!sameRange && line === endRangeEl)) {
                    endIdx = i;
                    break;
                }
            }

            if (startIdx === null) startIdx = 0;
            if (endIdx === null) endIdx = lineNodes.length - 1;

            return lineNodes.slice(startIdx, endIdx + 1);
        },

        /**
         * @description Get format elements and components from the selected area. (P, DIV, H[1-6], OL, UL, TABLE..)
         * If some of the component are included in the selection, get the entire that component.
         * @returns {Array}
         */
        getSelectedElementsAndComponents: function () {
            const commonCon = this.getRange().commonAncestorContainer;
            const myComponent = util.getParentElement(commonCon, util.isComponent);
            const selectedLines = util.isTable(commonCon) ? 
                this.getSelectedElements() :
                this.getSelectedElements(function (current) {
                    const component = this.getParentElement(current, this.isComponent);
                    return (this.isFormatElement(current) && (!component || component === myComponent)) || (this.isComponent(current) && !this.getFormatElement(current));
                }.bind(util));

            return selectedLines;
        },

        /**
         * @description Determine if this offset is the edge offset of container
         * @param {Object} container The container property of the selection object.
         * @param {Number} offset The offset property of the selection object.
         * @returns {Boolean}
         */
        isEdgePoint: function (container, offset) {
            return (offset === 0) || (offset === container.nodeValue.length);
        },

        /**
         * @description Show loading box
         */
        showLoading: function () {
            context.element.loading.style.display = 'block';
        },

        /**
         * @description Close loading box
         */
        closeLoading: function () {
            context.element.loading.style.display = 'none';
        },

        /**
         * @description Append format element to sibling node of argument element.
         * If the "formatNodeName" argument value is present, the tag of that argument value is inserted,
         * If not, the currently selected format tag is inserted.
         * @param {Element} element Insert as siblings of that element
         * @param {String|null} formatNodeName Node name to be inserted
         * @returns {Element}
         */
        appendFormatTag: function (element, formatNodeName) {
            const formatEl = element;
            const currentFormatEl = util.getFormatElement(this.getSelectionNode());
            const oFormatName = formatNodeName ? formatNodeName : util.isFormatElement(currentFormatEl) ? currentFormatEl.nodeName : 'P';
            const oFormat = util.createElement(oFormatName);
            oFormat.innerHTML = '<br>';

            if (util.isCell(formatEl)) formatEl.insertBefore(oFormat, element.nextElementSibling);
            else formatEl.parentNode.insertBefore(oFormat, formatEl.nextElementSibling);

            return oFormat;
        },

        /**
         * @description The method to insert a element. (used elements : table, hr, image, video)
         * This method is add the element next line and insert the new line.
         * When used in a tag in "LI", it is inserted into the LI tag.
         * Returns the next line added.
         * @param {Element} element Element to be inserted
         * @param {Boolean} notHistoryPush When true, it does not update the history stack and the selection object and return EdgeNodes (util.getEdgeChildNodes)
         * @returns {Element}
         */
        insertComponent: function (element, notHistoryPush) {
            let oNode = null;
            const selectionNode = this.getSelectionNode();
            const formatEl = util.getFormatElement(selectionNode);

            if (util.isListCell(formatEl)) {
                if (/^HR$/i.test(element.nodeName)) {
                    const newLi = util.createElement('LI');
                    const textNode = util.createTextNode(util.zeroWidthSpace);
                    newLi.appendChild(element);
                    newLi.appendChild(textNode);
                    formatEl.parentNode.insertBefore(newLi, formatEl.nextElementSibling);
                    this.setRange(textNode, 1, textNode, 1);
                } else {
                    this.insertNode(element, selectionNode === formatEl ? null : selectionNode);
                    oNode = util.createElement('LI');
                    formatEl.parentNode.insertBefore(oNode, formatEl.nextElementSibling);
                }
            } else {
                this.insertNode(element, formatEl);
                oNode = this.appendFormatTag(element);
            }

            // history stack
            if (!notHistoryPush) this.history.push(false);

            return oNode;
        },

        /**
         * @description The component(image, video) is selected and the resizing module is called.
         * @param {Element} element Element tag (img or iframe)
         * @param {String} componentName Component name (image or video)
         */
        selectComponent: function (element, componentName) {
            if (componentName === 'image') {
                if (!core.plugins.image) return;

                core.removeRange();
                core.callPlugin('image', function () {
                    const size = core.plugins.resizing.call_controller_resize.call(core, element, 'image');
                    core.plugins.image.onModifyMode.call(core, element, size);
                    
                    if (!util.getParentElement(element, '.se-image-container')) {
                        core.plugins.image.openModify.call(core, true);
                        core.plugins.image.update_image.call(core, true, true, true);
                    }
                });
            } else if (componentName === 'video') {
                if (!core.plugins.video) return;

                core.removeRange();
                core.callPlugin('video', function () {
                    const size = core.plugins.resizing.call_controller_resize.call(core, element, 'video');
                    core.plugins.video.onModifyMode.call(core, element, size);
                });
            }
        },

        /**
         * @description Delete selected node and insert argument value node
         * If the "afterNode" exists, it is inserted after the "afterNode"
         * Inserting a text node merges with both text nodes on both sides and returns a new "{ startOffset, endOffset }".
         * @param {Element} oNode Element to be inserted
         * @param {Element|null} afterNode If the node exists, it is inserted after the node
         * @returns {undefined|Object}
         */
        insertNode: function (oNode, afterNode) {
            const range = this.getRange();
            let parentNode = null;

            if (!afterNode) {
                const startCon = range.startContainer;
                const startOff = range.startOffset;
                const endCon = range.endContainer;
                const endOff = range.endOffset;
                const commonCon = range.commonAncestorContainer;

                parentNode = startCon;
                if (startCon.nodeType === 3) {
                    parentNode = startCon.parentNode;
                }

                /** No Select range node */
                if (range.collapsed) {
                    if (commonCon.nodeType === 3) {
                        afterNode = commonCon.splitText(endOff);
                    }
                    else {
                        if (parentNode.lastChild !== null && util.isBreak(parentNode.lastChild)) {
                            parentNode.removeChild(parentNode.lastChild);
                        }
                        afterNode = null;
                    }
                }
                /** Select range nodes */
                else {
                    const isSameContainer = startCon === endCon;

                    if (isSameContainer) {
                        if (this.isEdgePoint(endCon, endOff)) afterNode = endCon.nextSibling;
                        else afterNode = endCon.splitText(endOff);

                        let removeNode = startCon;
                        if (!this.isEdgePoint(startCon, startOff)) removeNode = startCon.splitText(startOff);

                        parentNode.removeChild(removeNode);
                    }
                    else {
                        this.removeNode();
                        parentNode = commonCon;
                        afterNode = endCon;

                        while (afterNode.parentNode !== commonCon) {
                            afterNode = afterNode.parentNode;
                        }
                    }
                }
            }
            else {
                parentNode = afterNode.parentNode;
                afterNode = afterNode.nextElementSibling;
            }

            try {
                parentNode.insertBefore(oNode, afterNode);
            } catch (e) {
                parentNode.appendChild(oNode);
            } finally {
                if (oNode.nodeType === 3) {
                    const previous = oNode.previousSibling;
                    const next = oNode.nextSibling;
                    const previousText = (!previous || util.onlyZeroWidthSpace(previous)) ? '' : previous.textContent;
                    const nextText = (!next || util.onlyZeroWidthSpace(next)) ? '' : next.textContent;
    
                    if (previous) {
                        oNode.textContent = previousText + oNode.textContent;
                        util.removeItem(previous);
                    }
    
                    if (next) {
                        oNode.textContent += nextText;
                        util.removeItem(next);
                    }

                    return {
                        startOffset: previousText.length,
                        endOffset: oNode.textContent.length - nextText.length
                    };
                }

                // history stack
                this.history.push(true);
            }
        },

        /**
         * @description Delete the currently selected node
         */
        removeNode: function () {
            const range = this.getRange();

            if (range.deleteContents) {
                range.deleteContents();

                // history stack
                this.history.push(false);
                return;
            }

            const startCon = range.startContainer;
            const startOff = range.startOffset;
            const endCon = range.endContainer;
            const endOff = range.endOffset;
            const commonCon = range.commonAncestorContainer;

            let beforeNode = null;
            let afterNode = null;

            const childNodes = util.getListChildNodes(commonCon);
            let startIndex = util.getArrayIndex(childNodes, startCon);
            let endIndex = util.getArrayIndex(childNodes, endCon);

            for (let i = startIndex + 1, startNode = startCon; i >= 0; i--) {
                if (childNodes[i] === startNode.parentNode && childNodes[i].firstChild === startNode && startOff === 0) {
                    startIndex = i;
                    startNode = startNode.parentNode;
                }
            }

            for (let i = endIndex - 1, endNode = endCon; i > startIndex; i--) {
                if (childNodes[i] === endNode.parentNode && childNodes[i].nodeType === 1) {
                    childNodes.splice(i, 1);
                    endNode = endNode.parentNode;
                    --endIndex;
                }
            }

            for (let i = startIndex; i <= endIndex; i++) {
                const item = childNodes[i];

                if (item.length === 0 || (item.nodeType === 3 && item.data === undefined)) {
                    util.removeItem(item);
                    continue;
                }

                if (item === startCon) {
                    if (startCon.nodeType === 1) {
                        beforeNode = util.createTextNode(startCon.textContent);
                    } else {
                        beforeNode = util.createTextNode(startCon.substringData(0, startOff));
                    }

                    if (beforeNode.length > 0) {
                        startCon.data = beforeNode.data;
                    } else {
                        util.removeItem(startCon);
                    }

                    continue;
                }

                if (item === endCon) {
                    if (endCon.nodeType === 1) {
                        afterNode = util.createTextNode(endCon.textContent);
                    } else {
                        afterNode = util.createTextNode(endCon.substringData(endOff, (endCon.length - endOff)));
                    }

                    if (afterNode.length > 0) {
                        endCon.data = afterNode.data;
                    } else {
                        util.removeItem(endCon);
                    }

                    continue;
                }

                util.removeItem(item);

                // history stack
                this.history.push(false);
            }
        },

        /**
         * @description Appended all selected format Element to the argument element and insert
         * @param {Element} rangeElement Element of wrap the arguments (PRE, BLOCKQUOTE...)
         */
        applyRangeFormatElement: function (rangeElement) {
            const rangeLines = this.getSelectedElementsAndComponents();
            if (!rangeLines || rangeLines.length === 0) return;

            let last  = rangeLines[rangeLines.length - 1];
            let standTag, beforeTag, pElement;

            if (util.isRangeFormatElement(last) || util.isFormatElement(last)) {
                standTag = last;
            } else {
                standTag = util.getRangeFormatElement(last) || util.getFormatElement(last);
            }

            if (util.isCell(standTag)) {
                beforeTag = null;
                pElement = standTag;
            } else {
                beforeTag = standTag.nextSibling;
                pElement = standTag.parentNode;
            }

            let parentDepth = util.getElementDepth(standTag);
            let listParent = null;
            const lineArr = [];
            const removeItems = function (parent, origin, before) {
                let cc = null;
                if (parent !== origin && !util.isTable(origin)) {
                   cc = util.removeItemAllParents(origin);
                }

                return cc ? cc.ec : before;
            };
            
            for (let i = 0, len = rangeLines.length, line, originParent, depth, before; i < len; i++) {
                line = rangeLines[i];
                originParent = line.parentNode;
                depth = util.getElementDepth(line);

                if (util.isList(originParent)) {
                    if (listParent === null) listParent = util.createElement(originParent.nodeName);

                    listParent.innerHTML += line.outerHTML;
                    lineArr.push(line);

                    if (i === len - 1 || !util.getParentElement(rangeLines[i + 1], function (current) { return current === originParent; })) {
                        const edge = this.detachRangeFormatElement(originParent, lineArr, null, true, true);

                        if (parentDepth >= depth) {
                            parentDepth = depth;
                            pElement = edge.cc;
                            beforeTag = removeItems(pElement, originParent, edge.ec);
                            if (beforeTag) pElement = beforeTag.parentNode;
                        } else if (pElement === edge.cc) {
                            beforeTag = edge.ec;
                        }

                        if (pElement !== edge.cc) {
                            before = removeItems(pElement, edge.cc);
                            if (before !== undefined) beforeTag = before;
                        }

                        rangeElement.appendChild(listParent);
                        listParent = null;
                    }
                }
                else {
                    if (parentDepth >= depth) {
                        parentDepth = depth;
                        pElement = originParent;
                        beforeTag = line.nextSibling;
                    }
                    
                    rangeElement.appendChild(line);

                    if (pElement !== originParent) {
                        before = removeItems(pElement, originParent);
                        if (before !== undefined) beforeTag = before;
                    }
                }
            }

            pElement.insertBefore(rangeElement, beforeTag);
            removeItems(rangeElement, beforeTag);

            // history stack
            this.history.push(false);

            const edge = util.getEdgeChildNodes(rangeElement.firstElementChild, rangeElement.lastElementChild);
            if (rangeLines.length > 1) {
                this.setRange(edge.sc, 0, edge.ec, edge.ec.textContent.length);
            } else {
                this.setRange(edge.ec, edge.ec.textContent.length, edge.ec, edge.ec.textContent.length);
            }
        },

        /**
         * @description The elements of the "selectedFormats" array are detached from the "rangeElement" element. ("LI" tags are converted to "P" tags)
         * When "selectedFormats" is null, all elements are detached and return {cc: parentNode, sc: nextSibling, ec: previousSibling}.
         * @param {Element} rangeElement Range format element (PRE, BLOCKQUOTE, OL, UL...)
         * @param {Array|null} selectedFormats Array of format elements (P, DIV, LI...) to remove.
         * If null, Applies to all elements and return {cc: parentNode, sc: nextSibling, ec: previousSibling}
         * @param {Element|null} newRangeElement The node(rangeElement) to replace the currently wrapped node.
         * @param {Boolean} remove Delete without detached.
         * @param {Boolean} notHistoryPush When true, it does not update the history stack and the selection object and return EdgeNodes (util.getEdgeChildNodes)
         */
        detachRangeFormatElement: function (rangeElement, selectedFormats, newRangeElement, remove, notHistoryPush) {
            const range = this.getRange();
            const so = range.startOffset;
            const eo = range.endOffset;

            const children = rangeElement.childNodes;
            const parent = rangeElement.parentNode;
            let firstNode = null;
            let lastNode = null;
            let rangeEl = rangeElement.cloneNode(false);
            
            const newList = util.isList(newRangeElement);
            let insertedNew = false;

            function appendNode (parent, insNode, sibling) {
                if (util.onlyZeroWidthSpace(insNode)) insNode.innerHTML = util.zeroWidthSpace;

                if (insNode.nodeType === 3) {
                    parent.insertBefore(insNode, sibling);
                    return insNode;
                }
                
                const children = insNode.childNodes;
                let format = insNode.cloneNode(false);
                let first = null;
                let c = null;

                while (children[0]) {
                    c = children[0];
                    if (util.isIgnoreNodeChange(c) && !util.isListCell(format)) {
                        if (format.childNodes.length > 0) {
                            if (!first) first = format;
                            parent.insertBefore(format, sibling);
                            format = insNode.cloneNode(false);
                        }
                        parent.insertBefore(c, sibling);
                        if (!first) first = c;
                    } else {
                        format.appendChild(c);
                    }
                }

                if (format.childNodes.length > 0) {
                    parent.insertBefore(format, sibling);
                    if (!first) first = format;
                }

                return first;
            }

            for (let i = 0, len = children.length, insNode; i < len; i++) {
                insNode = children[i];
                if (remove && i === 0) {
                    if (!selectedFormats || selectedFormats.length === len || selectedFormats[0] === insNode) {
                        firstNode = rangeElement.previousSibling;
                    } else {
                        firstNode = rangeEl;
                    }
                }

                if (selectedFormats && selectedFormats.indexOf(insNode) === -1) {
                    if (!rangeEl) rangeEl = rangeElement.cloneNode(false);
                    insNode = insNode.cloneNode(true);
                    rangeEl.appendChild(insNode);
                }
                else {
                    if (rangeEl && rangeEl.children.length > 0) {
                        parent.insertBefore(rangeEl, rangeElement);
                        rangeEl = null;
                    }

                    if (!newList && util.isListCell(insNode)) {
                        const inner = insNode;
                        insNode = util.isCell(rangeElement.parentNode) ? util.createElement('DIV') : util.createElement('P');
                        insNode.innerHTML = inner.innerHTML;
                        util.copyFormatAttributes(insNode, inner);
                    } else {
                        insNode = insNode.cloneNode(true);
                    }

                    if (!remove) {
                        if (newRangeElement) {
                            if (!insertedNew) {
                                parent.insertBefore(newRangeElement, rangeElement);
                                insertedNew = true;
                            }
                            insNode = appendNode(newRangeElement, insNode, null);
                        } else {
                            insNode = appendNode(parent, insNode, rangeElement);
                        }
                        
                        if (selectedFormats) {
                            lastNode = insNode;
                            if (!firstNode) {
                                firstNode = insNode;
                            }
                        } else if (!firstNode) {
                            firstNode = lastNode = insNode;
                        }
                    }
                    
                }
            }

            const rangeParent = rangeElement.parentNode;
            const rangeRight = rangeElement.nextSibling;
            if (rangeEl && rangeEl.children.length > 0) {
                rangeParent.insertBefore(rangeEl, rangeRight);
            }

            util.removeItem(rangeElement);

            const edge = remove ? {
                cc: rangeParent,
                sc: firstNode,
                ec: firstNode && firstNode.parentNode ? firstNode.nextSibling : rangeEl && rangeEl.children.length > 0 ? rangeEl : rangeRight ? rangeRight : null
            } : util.getEdgeChildNodes(firstNode, lastNode);

            if (notHistoryPush) return edge;
            
            if (!remove && edge) {
                if (!selectedFormats) {
                    this.setRange(edge.sc, 0, edge.sc, 0);
                } else {
                    this.setRange(edge.sc, so, edge.ec, eo);
                }
            }

            // history stack
            this.history.push(false);
            
            event._applyTagEffects();
        },

        /**
         * @description Add, update, and delete nodes from selected text.
         * 1. If there is a node in the "appendNode" argument, a node with the same tags and attributes as "appendNode" is added to the selection text.
         * 2. If it is in the same tag, only the tag's attributes are changed without adding a tag.
         * 3. If the "appendNode" argument is null, the node of the selection is update or remove without adding a new node.
         * 4. The same style as the style attribute of the "styleArray" argument is deleted.
         *    (Styles should be put with attribute names from css. ["background-color"])
         * 5. The same class name as the class attribute of the "styleArray" argument is deleted.
         *    (The class name is preceded by "." [".className"])
         * 6. Use a list of styles and classes of "appendNode" in "styleArray" to avoid duplicate property values.
         * 7. If a node with all styles and classes removed has the same tag name as "appendNode" or "removeNodeArray", or "appendNode" is null, that node is deleted.
         * 8. Regardless of the style and class of the node, the tag with the same name as the "removeNodeArray" argument value is deleted.
         * 9. If the "strictRemove" argument is true, only nodes with all styles and classes removed from the nodes of "removeNodeArray" are removed.
         *10. It won't work if the parent node has the same class and same value style.
         *    However, if there is a value in "removeNodeArray", it works and the text node is separated even if there is no node to replace.
         * @param {Element|null} appendNode The element to be added to the selection. If it is null, only delete the node.
         * @param {Array|null} styleArray The style or className attribute name Array to check (['font-size'], ['.className'], ['font-family', 'color', '.className']...])
         * @param {Array|null} removeNodeArray An array of node names to remove types from, remove all formats when "appendNode" is null and there is an empty array or null value. (['span'], ['strong', 'em'] ...])
         * @param {Boolean|null} strictRemove If true, only nodes with all styles and classes removed from the nodes of "removeNodeArray" are removed.
         */
        nodeChange: function (appendNode, styleArray, removeNodeArray, strictRemove) {
            const range = this.getRange();
            styleArray = styleArray && styleArray.length > 0 ? styleArray : false;
            removeNodeArray = removeNodeArray && removeNodeArray.length > 0 ? removeNodeArray : false;

            const isRemoveNode = !appendNode;
            const isRemoveFormat = isRemoveNode && !removeNodeArray && !styleArray;
            let startCon = range.startContainer;
            let startOff = range.startOffset;
            let endCon = range.endContainer;
            let endOff = range.endOffset;
            let tempCon, tempOffset, tempChild;

            if (isRemoveFormat && range.collapsed && util.isFormatElement(startCon.parentNode) && util.isFormatElement(endCon.parentNode)) {
                return;
            }

            if (isRemoveNode) {
                appendNode = util.createElement('DIV');
            }

            const newNodeName = appendNode.nodeName;

            /* checked same style property */
            if (!isRemoveFormat && startCon === endCon && !removeNodeArray && appendNode) {
                let sNode = startCon;
                let checkCnt = 0;
                const checkAttrs = [];
                
                const checkStyles = appendNode.style;
                for (let i = 0, len = checkStyles.length; i < len; i++) {
                    checkAttrs.push(checkStyles[i]);
                }

                const ckeckClasses = appendNode.classList;
                for (let i = 0, len = ckeckClasses.length; i < len; i++) {
                    checkAttrs.push('.' + ckeckClasses[i]);
                }

                if (checkAttrs.length > 0) {
                    while(!util.isFormatElement(sNode) && !util.isWysiwygDiv(sNode)) {
                        for (let i = 0; i < checkAttrs.length; i++) {
                            if (sNode.nodeType === 1) {
                                const s = checkAttrs[i];
                                const classReg = /^\./.test(s) ? new _w.RegExp('\\s*' + s.replace(/^\./, '') + '(\\s+|$)', 'ig') : false;
    
                                const styleCheck = isRemoveNode ? !!sNode.style[s] : (!!sNode.style[s] && !!appendNode.style[s] && sNode.style[s] === appendNode.style[s]);
                                const classCheck = classReg === false ? false : isRemoveNode ? !!sNode.className.match(classReg) : !!sNode.className.match(classReg) && !!appendNode.className.match(classReg);
                                if (styleCheck || classCheck) {
                                    checkCnt++;
                                }
                            }
                        }
                        sNode = sNode.parentNode;
                    }
    
                    if (checkCnt >= checkAttrs.length) return;
                }
            }

            /* find text node */
            // startContainer
            tempCon = util.isWysiwygDiv(startCon) ? context.element.wysiwyg.firstChild : startCon;
            tempOffset = startOff;

            if (util.isBreak(tempCon) || (tempCon.nodeType === 1 && tempCon.childNodes.length > 0)) {
                const onlyBreak = util.isBreak(tempCon);
                if (!onlyBreak) {
                    while (tempCon && !util.isBreak(tempCon) && tempCon.nodeType === 1) {
                        tempCon = tempCon.childNodes[tempOffset] || tempCon.nextElementSibling || tempCon.nextSibling;
                        tempOffset = 0;
                    }
    
                    let format = util.getFormatElement(tempCon);
                    if (format === util.getRangeFormatElement(format)) {
                        format = util.createElement(util.isCell(tempCon) ? 'DIV' : 'P');
                        tempCon.parentNode.insertBefore(format, tempCon);
                        format.appendChild(tempCon);
                    }
                }

                if (util.isBreak(tempCon)) {
                    const emptyText = util.createTextNode(util.zeroWidthSpace);
                    tempCon.parentNode.insertBefore(emptyText, tempCon);
                    tempCon = emptyText;
                    if (onlyBreak) {
                        if (startCon === endCon) {
                            endCon = tempCon;
                            endOff = 1;
                        }
                        util.removeItem(startCon);
                    }
                }
            }

            // set startContainer
            startCon = tempCon;
            startOff = tempOffset;

            // endContainer
            tempCon = util.isWysiwygDiv(endCon) ? context.element.wysiwyg.lastChild : endCon;
            tempOffset = endOff;

            if (util.isBreak(tempCon) || (tempCon.nodeType === 1 && tempCon.childNodes.length > 0)) {
                const onlyBreak = util.isBreak(tempCon);
                if (!onlyBreak) {
                    while (tempCon && !util.isBreak(tempCon) && tempCon.nodeType === 1) {
                        tempChild = tempCon.childNodes;
                        tempCon = tempChild[tempOffset > 0 ? tempOffset - 1 : tempOffset] || !/FIGURE/i.test(tempChild[0].nodeName) ? tempChild[0] : (tempCon.previousElementSibling || tempCon.previousSibling || startCon);
                        tempOffset = tempOffset > 0 ? tempCon.textContent.length : tempOffset;
                    }
    
                    let format = util.getFormatElement(tempCon);
                    if (format === util.getRangeFormatElement(format)) {
                        format = util.createElement(util.isCell(format) ? 'DIV' : 'P');
                        tempCon.parentNode.insertBefore(format, tempCon);
                        format.appendChild(tempCon);
                    }
                }

                if (util.isBreak(tempCon)) {
                    const emptyText = util.createTextNode(util.zeroWidthSpace);
                    tempCon.parentNode.insertBefore(emptyText, tempCon);
                    tempCon = emptyText;
                    tempOffset = 1;
                    if (onlyBreak) {
                        util.removeItem(endCon);
                    }
                }
            }

            // set endContainer
            endCon = tempCon;
            endOff = tempOffset;

            // set Range
            this.setRange(startCon, startOff, endCon, endOff);

            let start = {}, end = {};
            let newNode, styleRegExp = '', classRegExp = '', removeNodeRegExp = '';

            if (styleArray) {
                for (let i = 0, len = styleArray.length, s; i < len; i++) {
                    s = styleArray[i];
                    if (/^\./.test(s)) {
                        classRegExp += (classRegExp ? '|' : '\\s*(?:') + s.replace(/^\./, '');
                    } else {
                        styleRegExp += (styleRegExp ? '|' : '(?:;|^|\\s)(?:') + s;
                    }
                }

                if (styleRegExp) {
                    styleRegExp += ')\\s*:[^;]*\\s*(?:;|$)';
                    styleRegExp = new _w.RegExp(styleRegExp, 'ig');
                }

                if (classRegExp) {
                    classRegExp += ')(?=\\s+|$)';
                    classRegExp = new _w.RegExp(classRegExp, 'ig');
                }
            }

            if (removeNodeArray) {
                removeNodeRegExp = '^(?:' + removeNodeArray[0];
                for (let i = 1; i < removeNodeArray.length; i++) {
                    removeNodeRegExp += '|' + removeNodeArray[i];
                }
                removeNodeRegExp += ')$';
                removeNodeRegExp = new _w.RegExp(removeNodeRegExp, 'i');
            }

            /** validation check function*/
            const _removeCheck = {v: false};
            const validation = function (checkNode) {
                const vNode = checkNode.cloneNode(false);

                // all path
                if (vNode.nodeType === 3 || util.isBreak(vNode)) return vNode;
                // all remove
                if (isRemoveFormat) return null;

                // remove node check
                const tagRemove = (!removeNodeRegExp && isRemoveNode) || (removeNodeRegExp && removeNodeRegExp.test(vNode.nodeName));

                // tag remove
                if (tagRemove && !strictRemove) {
                    _removeCheck.v = true;
                    return null;
                }

                // style regexp
                const originStyle = vNode.style.cssText;
                let style = '';
                if (styleRegExp && originStyle.length > 0) {
                    style = originStyle.replace(styleRegExp, '').trim();
                    if (style !== originStyle) _removeCheck.v = true;
                }

                // class check
                const originClasses = vNode.className;
                let classes = '';
                if (classRegExp && originClasses.length > 0) {
                    classes = originClasses.replace(classRegExp, '').trim();
                    if (classes !== originClasses) _removeCheck.v = true;
                }

                // remove only
                if (isRemoveNode) {
                    if ((classRegExp || !originClasses) && (styleRegExp || !originStyle) && !style && !classes && tagRemove) {
                        _removeCheck.v = true;
                        return null;
                    }
                }

                // change
                if (style || classes || vNode.nodeName !== newNodeName || (_w.Boolean(styleRegExp) !== _w.Boolean(originStyle)) || (_w.Boolean(classRegExp) !== _w.Boolean(originClasses))) {
                    if (styleRegExp && originStyle.length > 0) vNode.style.cssText = style;
                    if (!vNode.style.cssText) {
                        vNode.removeAttribute('style');
                    }

                    if (classRegExp && originClasses.length > 0) vNode.className = classes.trim();
                    if (!vNode.className.trim()) {
                        vNode.removeAttribute('class');
                    }

                    if (!vNode.style.cssText && !vNode.className && (vNode.nodeName === newNodeName || tagRemove)) {
                        _removeCheck.v = true;
                        return null;
                    }

                    return vNode;
                }

                _removeCheck.v = true;
                return null;
            };

            // get line nodes
            const lineNodes = this.getSelectedElements();

            if (!util.getFormatElement(startCon)) {
                startCon = util.getChildElement(lineNodes[0], function (current) { return current.nodeType === 3; });
                startOff = 0;
            }

            if (!util.getFormatElement(endCon)) {
                endCon = util.getChildElement(lineNodes[lineNodes.length - 1], function (current) { return current.nodeType === 3; });
                endOff = endCon.textContent.length;
            }

            
            const oneLine = util.getFormatElement(startCon) === util.getFormatElement(endCon);
            const endLength = lineNodes.length - (oneLine ? 0 : 1);

            // node Changes
            newNode = appendNode.cloneNode(false);

            const isRemoveAnchor = isRemoveFormat || (isRemoveNode && (function (arr, isAnchor) {
                for (let n = 0, len = arr.length; n < len; n++) {
                    if (isAnchor(arr[n])) return true;
                }
                return false;
            })(removeNodeArray, util.isAnchor));

            const _getAnchor = this._util_getAnchor.bind(util, isRemoveAnchor);
            const _isAnchor = this._util_isAnchor.bind(util, isRemoveAnchor);

            // one line
            if (oneLine) {
                const newRange = this._nodeChange_oneLine(lineNodes[0], newNode, validation, startCon, startOff, endCon, endOff, isRemoveFormat, isRemoveNode, range.collapsed, _removeCheck, _getAnchor, _isAnchor);
                start.container = newRange.startContainer;
                start.offset = newRange.startOffset;
                end.container = newRange.endContainer;
                end.offset = newRange.endOffset;
            }
            // multi line 
            else {
                // start
                start = this._nodeChange_startLine(lineNodes[0], newNode, validation, startCon, startOff, isRemoveFormat, isRemoveNode, _removeCheck, _getAnchor, _isAnchor);
                // mid
                for (let i = 1; i < endLength; i++) {
                    newNode = appendNode.cloneNode(false);
                    this._nodeChange_middleLine(lineNodes[i], newNode, validation, isRemoveFormat, isRemoveNode, _removeCheck);
                }
                // end
                if (endLength > 0) {
                    newNode = appendNode.cloneNode(false);
                    end = this._nodeChange_endLine(lineNodes[endLength], newNode, validation, endCon, endOff, isRemoveFormat, isRemoveNode, _removeCheck, _getAnchor, _isAnchor);
                } else {
                    end = start;
                }
            }

            // set range
            this.controllersOff();
            this.setRange(start.container, start.offset, end.container, end.offset);

            // history stack
            this.history.push(false);
        },

        /**
         * @description Strip remove node
         * @param {Element} removeNode The remove node
         * @private
         */
        _stripRemoveNode: function (removeNode) {
            const element = removeNode.parentNode;
            if (!removeNode || removeNode.nodeType === 3 || !element) return;
            
            const children = removeNode.childNodes;
            while (children[0]) {
                element.insertBefore(children[0], removeNode);
            }

            element.removeChild(removeNode);
        },

        /**
         * @description Delete a empty child node of argument element
         * @param {Element} formatNode The format node
         * @param {Element} notRemoveNode Do not remove node
         * @private
         */
        _removeEmptyNode: function (formatNode, notRemoveNode) {
            const preventDelete = util.onlyZeroWidthSpace(notRemoveNode.textContent);
            if (preventDelete) notRemoveNode.textContent = ' ';
            util.removeEmptyNode(formatNode);
            if (preventDelete) notRemoveNode.textContent = util.zeroWidthSpace;
        },

        /**
         * @description Use with "npdePath (util.getNodePath)" to merge the same attributes and tags if they are present and modify the nodepath.
         * If "offset" has been changed, it will return as much "offset" as it has been modified.
         * "a", "b" You can send a maximum of two nodepaths.
         * @param {Object} nodePath_s Start NodePath object (util.getNodePath)
         * @param {Object|null} nodePath_e End NodePath object (util.getNodePath)
         * @returns {Object} {a: 0, b: 0}
         * @private
         */
        _mergeSameTags: function (element, nodePath_s, nodePath_e) {
            const inst = this;
            const offsets = {a: 0, b: 0};

            (function recursionFunc(current, depth, depthIndex, includedPath_s, includedPath_e) {
                const children = current.childNodes;
                
                for (let i = 0, len = children.length, child, next; i < len; i++) {
                    child = children[i];
                    next = children[i + 1];
                    if (!child) break;
                    if (len === 1 && current.nodeName === child.nodeName) {
                        inst.util.copyTagAttributes(child, current);
                        current.parentNode.insertBefore(child, current);
                        inst.util.removeItem(current);

                        // update nodePath
                        if (nodePath_s && nodePath_s[depth] === i) {
                            nodePath_s.splice(depth, 1);
                            nodePath_s[depth] = i;
                        }

                        if (nodePath_e && nodePath_e[depth] === i) {
                            nodePath_e.splice(depth, 1);
                            nodePath_e[depth] = i;
                        }
                    }
                    if (!next) {
                        if (child.nodeType === 1) recursionFunc(child, depth + 1, i, includedPath_s, includedPath_e);
                        break;
                    }

                    if (child.nodeName === next.nodeName && inst.util.isSameAttributes(child, next) && child.href === next.href) {
                        const childs = child.childNodes;
                        let childLength = 0;
                        for (let n = 0, nLen = childs.length; n < nLen; n++) {
                            if (childs[n].textContent.length > 0) childLength++;
                        }
                        
                        const l = child.lastChild;
                        const r = next.firstChild;
                        const textOffset = l && r && l.nodeType === 3 && r.nodeType === 3;
                        let addOffset = l.textContent.length;
                        let tempL = l.previousSibling;
                        while(tempL && tempL.nodeType === 3) {
                            addOffset += tempL.textContent.length;
                            tempL = tempL.previousSibling;
                        }

                        if (childLength > 0 && l && r && l.nodeType === 3 && r.nodeType === 3 && (l.textContent.length > 0 || r.textContent.length > 0)) childLength--;

                        // start
                        if (includedPath_s && nodePath_s && nodePath_s[depth] > i) {
                            if (depth > 0 && nodePath_s[depth - 1] !== depthIndex) {
                                includedPath_s = false;
                            } else {
                                nodePath_s[depth] -= 1;
                                if (nodePath_s[depth + 1] >= 0 && nodePath_s[depth] === i) {
                                    nodePath_s[depth + 1] += childLength;
                                    if (textOffset) {
                                        if (l && l.nodeType === 3 && r && r.nodeType === 3) {
                                            offsets.a += addOffset;
                                        }
                                    }
                                }
                            }
                        }
                        // end
                        if (includedPath_e && nodePath_e && nodePath_e[depth] > i) {
                            if (depth > 0 && nodePath_e[depth - 1] !== depthIndex) {
                                includedPath_e = false;
                            } else {
                                nodePath_e[depth] -= 1;
                                if (nodePath_e[depth + 1] >= 0 && nodePath_e[depth] === i) {
                                    nodePath_e[depth + 1] += childLength;
                                    if (textOffset) {
                                        if (l && l.nodeType === 3 && r && r.nodeType === 3) {
                                            offsets.b += addOffset;
                                        }
                                    }
                                }
                            }
                        }

                        if (child.nodeType === 3) child.textContent += next.textContent;
                        else child.innerHTML += next.innerHTML;
                        
                        inst.util.removeItem(next);
                        i--;
                    } else if (child.nodeType === 1) {
                        recursionFunc(child, depth + 1, i, includedPath_s, includedPath_e);
                    }
                }
            })(element, 0, 0, true, true);

            return offsets;
        },

        /**
         * @description Return the parent anchor tag. (bind and use a util object)
         * @param {Boolean} isRemove Delete anchor tag
         * @param {Element} element Element
         * @returns {Element}
         * @private
         */
        _util_getAnchor: function (isRemove, element) {
            return element && !isRemove ? this.getParentElement(element, function (current) {return this.isAnchor(current);}.bind(this)) : null;
        },

        /**
         * @description Checks if the element is an anchor tag. (bind and use a util object)
         * @param {Boolean} isRemove Delete anchor tag
         * @param {Element} element Element
         * @returns {Element}
         * @private
         */
        _util_isAnchor: function (isRemove, element) {
            return element && !isRemove && element.nodeType !== 3 && this.isAnchor(element);
        },

        /**
         * @description wraps text nodes of line selected text.
         * @param {Element} element The node of the line that contains the selected text node.
         * @param {Element} newInnerNode The dom that will wrap the selected text area
         * @param {function} validation Check if the node should be stripped.
         * @param {Element} startCon The startContainer property of the selection object.
         * @param {Number} startOff The startOffset property of the selection object.
         * @param {Element} endCon The endContainer property of the selection object.
         * @param {Number} endOff The endOffset property of the selection object.
         * @param {Boolean} isRemoveFormat Is the remove all formats command?
         * @param {Boolean} isRemoveNode "newInnerNode" is remove node?
         * @param {Boolean} collapsed range.collapsed
         * @returns {{startContainer: *, startOffset: *, endContainer: *, endOffset: *}}
         * @private
         */
        _nodeChange_oneLine: function (element, newInnerNode, validation, startCon, startOff, endCon, endOff, isRemoveFormat, isRemoveNode, collapsed, _removeCheck, _getAnchor, _isAnchor) {
            // not add tag
            let parentCon = startCon.parentNode;
            while (!parentCon.nextSibling && !parentCon.previousSibling && !util.isFormatElement(parentCon.parentNode) && !util.isWysiwygDiv(parentCon.parentNode)) {
                if (parentCon.nodeName === newInnerNode.nodeName) break;
                parentCon = parentCon.parentNode;
            }

            if (!isRemoveNode && parentCon === endCon.parentNode && parentCon.nodeName === newInnerNode.nodeName) {
                if (util.onlyZeroWidthSpace(startCon.textContent.slice(0, startOff)) && util.onlyZeroWidthSpace(endCon.textContent.slice(endOff))) {
                    const children = parentCon.childNodes;
                    let sameTag = true;
    
                    for (let i = 0, len = children.length, c, s, e, z; i < len; i++) {
                        c = children[i];
                        z = !util.onlyZeroWidthSpace(c);
                        if (c === startCon) {
                            s = true;
                            continue;
                        }
                        if (c === endCon) {
                            e = true;
                            continue;
                        }
                        if ((!s && z) || (s && e && z)) {
                            sameTag = false;
                            break;
                        }
                    }
    
                    if (sameTag) {
                        util.copyTagAttributes(parentCon, newInnerNode);
        
                        return {
                            startContainer: startCon,
                            startOffset: startOff,
                            endContainer: endCon,
                            endOffset: endOff
                        };
                    }
                }
            }

            // add tag
            _removeCheck.v = false;
            const el = element;
            const nNodeArray = [newInnerNode];
            const pNode = element.cloneNode(false);
            const isSameNode = startCon === endCon;
            let startContainer = startCon;
            let startOffset = startOff;
            let endContainer = endCon;
            let endOffset = endOff;
            let startPass = false;
            let endPass = false;
            let pCurrent, newNode, appendNode, cssText, anchorNode;

            function checkCss (vNode) {
                const regExp = new _w.RegExp('(?:;|^|\\s)(?:' + cssText + 'null)\\s*:[^;]*\\s*(?:;|$)', 'ig');
                let style = '';

                if (regExp && vNode.style.cssText.length > 0) {
                    style = regExp.test(vNode.style.cssText);
                }
            
                return !style;
            }

            (function recursionFunc(current, ancestor) {
                const childNodes = current.childNodes;

                for (let i = 0, len = childNodes.length, vNode; i < len; i++) {
                    let child = childNodes[i];
                    if (!child) continue;
                    let coverNode = ancestor;
                    let cloneNode;

                    // startContainer
                    if (!startPass && child === startContainer) {
                        let line = pNode;
                        anchorNode = _getAnchor(child);
                        const prevNode = util.createTextNode(startContainer.nodeType === 1 ? '' : startContainer.substringData(0, startOffset));
                        const textNode = util.createTextNode(startContainer.nodeType === 1 ? '' : startContainer.substringData(startOffset, 
                                isSameNode ? 
                                (endOffset >= startOffset ? endOffset - startOffset : startContainer.data.length - startOffset) : 
                                startContainer.data.length - startOffset)
                            );

                        if (anchorNode) {
                            const a = _getAnchor(ancestor);
                            if (a && a.parentNode !== line) {
                                let m = a;
                                let p = null;
                                while (m.parentNode !== line) {
                                    ancestor = p = m.parentNode.cloneNode(false);
                                    while(m.childNodes[0]) {
                                        p.appendChild(m.childNodes[0]);
                                    }
                                    m.appendChild(p);
                                    m = m.parentNode;
                                }
                                m.parentNode.appendChild(a);
                            }
                            anchorNode = anchorNode.cloneNode(false);
                        }
                        
                        if (prevNode.data.length > 0) {
                            ancestor.appendChild(prevNode);
                        }

                        const prevAnchorNode = _getAnchor(ancestor);
                        if (!!prevAnchorNode) anchorNode = prevAnchorNode;
                        if (anchorNode) line = anchorNode;

                        newNode = child;
                        pCurrent = [];
                        cssText = '';
                        while (newNode !== line && newNode !== el && newNode !== null) {
                            vNode = _isAnchor(newNode) ? null : validation(newNode);
                            if (vNode && newNode.nodeType === 1 && checkCss(newNode)) {
                                pCurrent.push(vNode);
                                cssText += newNode.style.cssText.substr(0, newNode.style.cssText.indexOf(':')) + '|';
                            }
                            newNode = newNode.parentNode;
                        }

                        const childNode = pCurrent.pop() || textNode;
                        appendNode = newNode = childNode;
                        while (pCurrent.length > 0) {
                            newNode = pCurrent.pop();
                            appendNode.appendChild(newNode);
                            appendNode = newNode;
                        }

                        newInnerNode.appendChild(childNode);
                        line.appendChild(newInnerNode);

                        if (anchorNode && !_getAnchor(endContainer)) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            pNode.appendChild(newInnerNode);
                            nNodeArray.push(newInnerNode);
                        }

                        startContainer = textNode;
                        startOffset = 0;
                        startPass = true;

                        if (newNode !== textNode) newNode.appendChild(startContainer);
                        if (!isSameNode) continue;
                    }

                    // endContainer
                    if (!endPass && child === endContainer) {
                        anchorNode = _getAnchor(child);
                        const afterNode = util.createTextNode(endContainer.nodeType === 1 ? '' : endContainer.substringData(endOffset, (endContainer.length - endOffset)));
                        const textNode = util.createTextNode(isSameNode || endContainer.nodeType === 1 ? '' : endContainer.substringData(0, endOffset));

                        if (anchorNode) {
                            anchorNode = anchorNode.cloneNode(false);
                        } else if (_isAnchor(newInnerNode.parentNode) && !anchorNode) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            pNode.appendChild(newInnerNode);
                            nNodeArray.push(newInnerNode);
                        }

                        if (afterNode.data.length > 0) {
                            newNode = child;
                            cssText = '';
                            pCurrent = [];
                            const anchors = [];
                            while (newNode !== pNode && newNode !== el && newNode !== null) {
                                if (newNode.nodeType === 1 && checkCss(newNode)) {
                                    if (_isAnchor(newNode)) anchors.push(newNode.cloneNode(false));
                                    else pCurrent.push(newNode.cloneNode(false));
                                    cssText += newNode.style.cssText.substr(0, newNode.style.cssText.indexOf(':')) + '|';
                                }
                                newNode = newNode.parentNode;
                            }
                            pCurrent = pCurrent.concat(anchors);

                            cloneNode = appendNode = newNode = pCurrent.pop() || afterNode;
                            while (pCurrent.length > 0) {
                                newNode = pCurrent.pop();
                                appendNode.appendChild(newNode);
                                appendNode = newNode;
                            }

                            pNode.appendChild(cloneNode);
                            newNode.textContent = afterNode.data;
                        }

                        if (anchorNode && cloneNode) {
                            const afterAnchorNode = _getAnchor(cloneNode);
                            if (afterAnchorNode) {
                                anchorNode = afterAnchorNode;
                            }
                        }

                        newNode = child;
                        pCurrent = [];
                        cssText = '';
                        while (newNode !== pNode && newNode !== el && newNode !== null) {
                            vNode = _isAnchor(newNode) ? null : validation(newNode);
                            if (vNode && newNode.nodeType === 1 && checkCss(newNode)) {
                                pCurrent.push(vNode);
                                cssText += newNode.style.cssText.substr(0, newNode.style.cssText.indexOf(':')) + '|';
                            }
                            newNode = newNode.parentNode;
                        }

                        const childNode = pCurrent.pop() || textNode;
                        appendNode = newNode = childNode;
                        while (pCurrent.length > 0) {
                            newNode = pCurrent.pop();
                            appendNode.appendChild(newNode);
                            appendNode = newNode;
                        }

                        if (anchorNode) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            newInnerNode.appendChild(childNode);
                            anchorNode.insertBefore(newInnerNode, anchorNode.firstChild);
                            pNode.appendChild(anchorNode);
                            nNodeArray.push(newInnerNode);
                            anchorNode = null;
                        } else {
                            newInnerNode.appendChild(childNode);
                        }

                        endContainer = textNode;
                        endOffset = textNode.data.length;
                        endPass = true;

                        if (!isRemoveFormat && collapsed) {
                            newInnerNode = textNode;
                            textNode.textContent = util.zeroWidthSpace;
                        }

                        if (newNode !== textNode) newNode.appendChild(endContainer);
                        continue;
                    }

                    // other
                    if (startPass) {
                        if (child.nodeType === 1 && !util.isBreak(child)) {
                            if (!collapsed && util.isIgnoreNodeChange(child)) {
                                newInnerNode = newInnerNode.cloneNode(false);
                                pNode.appendChild(child);
                                pNode.appendChild(newInnerNode);
                                nNodeArray.push(newInnerNode);
                                i--;
                            } else {
                                recursionFunc(child, child);
                            }
                            continue;
                        }

                        newNode = child;
                        pCurrent = [];
                        cssText = '';
                        const anchors = [];
                        while (newNode.parentNode !== null && newNode !== el && newNode !== newInnerNode) {
                            vNode = endPass ? newNode.cloneNode(false) : validation(newNode);
                            if (newNode.nodeType === 1 && !util.isBreak(child) && vNode && checkCss(newNode)) {
                                if (vNode) {
                                    if (_isAnchor(vNode)) {
                                        if (!anchorNode) anchors.push(vNode);
                                    } else {
                                        pCurrent.push(vNode);
                                    }
                                }
                                cssText += newNode.style.cssText.substr(0, newNode.style.cssText.indexOf(':')) + '|';
                            }
                            newNode = newNode.parentNode;
                        }
                        pCurrent = pCurrent.concat(anchors);

                        const childNode = pCurrent.pop() || child;
                        appendNode = newNode = childNode;
                        while (pCurrent.length > 0) {
                            newNode = pCurrent.pop();
                            appendNode.appendChild(newNode);
                            appendNode = newNode;
                        }
                        
                        if (_isAnchor(newInnerNode.parentNode) && !_isAnchor(childNode)) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            pNode.appendChild(newInnerNode);
                            nNodeArray.push(newInnerNode);
                        }
                        
                        if (!endPass && !anchorNode && _isAnchor(childNode)) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            const aChildren = childNode.childNodes;
                            for (let a = 0, aLen = aChildren.length; a < aLen; a++) {
                                newInnerNode.appendChild(aChildren[a]);
                            }
                            childNode.appendChild(newInnerNode);
                            pNode.appendChild(childNode);
                            nNodeArray.push(newInnerNode);
                            if (newInnerNode.children.length > 0) ancestor = newNode;
                            else ancestor = newInnerNode;
                        } else if (childNode === child) {
                            if (!endPass) ancestor = newInnerNode;
                            else ancestor = pNode;
                        } else if (endPass) {
                            pNode.appendChild(childNode);
                            ancestor = newNode;
                        } else {
                            newInnerNode.appendChild(childNode);
                            ancestor = newNode;
                        }

                        if (anchorNode && child.nodeType === 3) {
                            if (_getAnchor(child)) {
                                const ancestorAnchorNode = util.getParentElement(ancestor, function (current) {return this.isAnchor(current.parentNode) || current.parentNode === pNode;}.bind(util));
                                anchorNode.appendChild(ancestorAnchorNode);
                                newInnerNode = ancestorAnchorNode.cloneNode(false);
                                nNodeArray.push(newInnerNode);
                                pNode.appendChild(newInnerNode);
                            } else {
                                anchorNode = null;
                            }
                        }
                    }

                    cloneNode = child.cloneNode(false);
                    ancestor.appendChild(cloneNode);
                    if (child.nodeType === 1 && !util.isBreak(child)) coverNode = cloneNode;

                    recursionFunc(child, coverNode);
                }
            })(element, pNode);

            // not remove tag
            if (isRemoveNode && !isRemoveFormat && !_removeCheck.v) {
                return {
                    startContainer: startCon,
                    startOffset: startOff,
                    endContainer: endCon,
                    endOffset: endOff
                };
            }

            isRemoveFormat = isRemoveFormat && isRemoveNode;

            if (isRemoveFormat) {
                for (let i = 0; i < nNodeArray.length; i++) {
                    let removeNode = nNodeArray[i];
                    let textNode = util.createTextNode(collapsed ? util.zeroWidthSpace : removeNode.textContent);
                    pNode.insertBefore(textNode, removeNode);
                    pNode.removeChild(removeNode);

                    if (i === 0) startContainer = endContainer = textNode;
                }
            } else {
                if (isRemoveNode) {
                    for (let i = 0; i < nNodeArray.length; i++) {
                        this._stripRemoveNode(nNodeArray[i]);
                    }
                }
                
                if (collapsed) {
                    startContainer = endContainer = newInnerNode;
                }
            }

            this._removeEmptyNode(pNode, newInnerNode);

            if (collapsed) {
                startOffset = startContainer.textContent.length;
                endOffset = endContainer.textContent.length;
            }

            // endContainer reset
            const endConReset = isRemoveFormat || endContainer.textContent.length === 0;

            if (endContainer.textContent.length === 0) {
                util.removeItem(endContainer);
                endContainer = startContainer;
            }
            endOffset = endConReset ? endContainer.textContent.length : endOffset;

            // node change
            const newStartOffset = {s: 0, e: 0};
            const startPath = util.getNodePath(startContainer, pNode, newStartOffset);

            const mergeEndCon = !endContainer.parentNode;
            if (mergeEndCon) endContainer = startContainer;
            const newEndOffset = {s: 0, e: 0};
            const endPath = util.getNodePath(endContainer , pNode, (!mergeEndCon && !endConReset) ? newEndOffset : null);

            startOffset += newStartOffset.s;
            endOffset = (collapsed ? startOffset : mergeEndCon ? startContainer.textContent.length : endConReset ? endOffset + newStartOffset.s : endOffset + newEndOffset.s);

            // tag merge
            const newOffsets = this._mergeSameTags(pNode, startPath, endPath);

            element.innerHTML = pNode.innerHTML;

            startContainer = util.getNodeFromPath(startPath, element);
            endContainer = util.getNodeFromPath(endPath, element);

            return {
                startContainer: startContainer,
                startOffset: startOffset + newOffsets.a,
                endContainer: endContainer,
                endOffset: endOffset + newOffsets.b
            };
        },

        /**
         * @description wraps first line selected text.
         * @param {Element} element The node of the line that contains the selected text node.
         * @param {Element} newInnerNode The dom that will wrap the selected text area
         * @param {function} validation Check if the node should be stripped.
         * @param {Element} startCon The startContainer property of the selection object.
         * @param {Number} startOff The startOffset property of the selection object.
         * @param {Boolean} isRemoveFormat Is the remove all formats command?
         * @param {Boolean} isRemoveNode "newInnerNode" is remove node?
         * @returns {{container: *, offset: *}}
         * @private
         */
        _nodeChange_startLine: function (element, newInnerNode, validation, startCon, startOff, isRemoveFormat, isRemoveNode, _removeCheck, _getAnchor, _isAnchor) {
            // not add tag
            let parentCon = startCon.parentNode;
            while (!parentCon.nextSibling && !parentCon.previousSibling && !util.isFormatElement(parentCon.parentNode) && !util.isWysiwygDiv(parentCon.parentNode)) {
                if (parentCon.nodeName === newInnerNode.nodeName) break;
                parentCon = parentCon.parentNode;
            }

            if (!isRemoveNode && parentCon.nodeName === newInnerNode.nodeName && !util.isFormatElement(parentCon) && !parentCon.nextSibling && util.onlyZeroWidthSpace(startCon.textContent.slice(0, startOff))) {
                let sameTag = true;
                let s = startCon.previousSibling;
                while (s) {
                    if (!util.onlyZeroWidthSpace(s)) {
                        sameTag = false;
                        break;
                    }
                    s = s.previousSibling;
                }

                if (sameTag) {
                    util.copyTagAttributes(parentCon, newInnerNode);
    
                    return {
                        container: startCon,
                        offset: startOff
                    };
                }
            }

            // add tag
            _removeCheck.v = false;
            const el = element;
            const nNodeArray = [newInnerNode];
            const pNode = element.cloneNode(false);

            let container = startCon;
            let offset = startOff;
            let passNode = false;
            let pCurrent, newNode, appendNode, anchorNode;

            (function recursionFunc(current, ancestor) {
                const childNodes = current.childNodes;

                for (let i = 0, len = childNodes.length, vNode; i < len; i++) {
                    const child = childNodes[i];
                    if (!child) continue;
                    let coverNode = ancestor;

                    if (passNode && !util.isBreak(child)) {
                        if (child.nodeType === 1) {
                            if (util.isIgnoreNodeChange(child)) {
                                newInnerNode = newInnerNode.cloneNode(false);
                                pNode.appendChild(child);
                                pNode.appendChild(newInnerNode);
                                nNodeArray.push(newInnerNode);
                                i--;
                            } else {
                                recursionFunc(child, child);
                            }
                            continue;
                        }

                        newNode = child;
                        pCurrent = [];
                        const anchors = [];
                        while (newNode.parentNode !== null && newNode !== el && newNode !== newInnerNode) {
                            vNode = validation(newNode);
                            if (newNode.nodeType === 1 && vNode) {
                                if (_isAnchor(vNode)) {
                                    if (!anchorNode) anchors.push(vNode);
                                } else {
                                    pCurrent.push(vNode);
                                }
                            }
                            newNode = newNode.parentNode;
                        }
                        pCurrent = pCurrent.concat(anchors);

                        const isTopNode = pCurrent.length > 0;
                        const childNode = pCurrent.pop() || child;
                        appendNode = newNode = childNode;
                        while (pCurrent.length > 0) {
                            newNode = pCurrent.pop();
                            appendNode.appendChild(newNode);
                            appendNode = newNode;
                        }

                        if (_isAnchor(newInnerNode.parentNode) && !_isAnchor(childNode)) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            pNode.appendChild(newInnerNode);
                            nNodeArray.push(newInnerNode);
                        }
                        
                        if (!anchorNode && _isAnchor(childNode)) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            const aChildren = childNode.childNodes;
                            for (let a = 0, aLen = aChildren.length; a < aLen; a++) {
                                newInnerNode.appendChild(aChildren[a]);
                            }
                            childNode.appendChild(newInnerNode);
                            pNode.appendChild(childNode);
                            ancestor = !_isAnchor(newNode) ? newNode : newInnerNode;
                            nNodeArray.push(newInnerNode);
                        } else if (isTopNode) {
                            newInnerNode.appendChild(childNode);
                            ancestor = newNode;
                        } else {
                            ancestor = newInnerNode;
                        }

                        if (anchorNode && child.nodeType === 3) {
                            if (_getAnchor(child)) {
                                const ancestorAnchorNode = util.getParentElement(ancestor, function (current) {return this.isAnchor(current.parentNode) || current.parentNode === pNode;}.bind(util));
                                anchorNode.appendChild(ancestorAnchorNode);
                                newInnerNode = ancestorAnchorNode.cloneNode(false);
                                nNodeArray.push(newInnerNode);
                                pNode.appendChild(newInnerNode);
                            } else {
                                anchorNode = null;
                            }
                        }
                    }

                    // startContainer
                    if (!passNode && child === container) {
                        let line = pNode;
                        anchorNode = _getAnchor(child);
                        const prevNode = util.createTextNode(container.nodeType === 1 ? '' : container.substringData(0, offset));
                        const textNode = util.createTextNode(container.nodeType === 1 ? '' : container.substringData(offset, (container.length - offset)));

                        if (anchorNode) {
                            const a = _getAnchor(ancestor);
                            if (a && a.parentNode !== line) {
                                let m = a;
                                let p = null;
                                while (m.parentNode !== line) {
                                    ancestor = p = m.parentNode.cloneNode(false);
                                    while(m.childNodes[0]) {
                                        p.appendChild(m.childNodes[0]);
                                    }
                                    m.appendChild(p);
                                    m = m.parentNode;
                                }
                                m.parentNode.appendChild(a);
                            }
                            anchorNode = anchorNode.cloneNode(false);
                        }

                        if (prevNode.data.length > 0) {
                            ancestor.appendChild(prevNode);
                        }

                        const prevAnchorNode = _getAnchor(ancestor);
                        if (!!prevAnchorNode) anchorNode = prevAnchorNode;
                        if (anchorNode) line = anchorNode;

                        newNode = ancestor;
                        pCurrent = [];
                        while (newNode !== line && newNode !== null) {
                            vNode = validation(newNode);
                            if (newNode.nodeType === 1 && vNode) {
                                pCurrent.push(vNode);
                            }
                            newNode = newNode.parentNode;
                        }

                        const childNode = pCurrent.pop() || ancestor;
                        appendNode = newNode = childNode;
                        while (pCurrent.length > 0) {
                            newNode = pCurrent.pop();
                            appendNode.appendChild(newNode);
                            appendNode = newNode;
                        }

                        if (childNode !== ancestor) {
                            newInnerNode.appendChild(childNode);
                            ancestor = newNode;
                        } else {
                            ancestor = newInnerNode;
                        }

                        if (util.isBreak(child)) newInnerNode.appendChild(child.cloneNode(false));
                        line.appendChild(newInnerNode);

                        container = textNode;
                        offset = 0;
                        passNode = true;

                        ancestor.appendChild(container);
                        continue;
                    }

                    vNode = !passNode ? child.cloneNode(false) : validation(child);
                    if (vNode) {
                        ancestor.appendChild(vNode);
                        if (child.nodeType === 1 && !util.isBreak(child)) coverNode = vNode;
                    }

                    recursionFunc(child, coverNode);
                }
            })(element, pNode);

            // not remove tag
            if (isRemoveNode && !isRemoveFormat && !_removeCheck.v) {
                return {
                    container: startCon,
                    offset: startOff
                };
            }

            isRemoveFormat = isRemoveFormat && isRemoveNode;

            if (isRemoveFormat) {
                for (let i = 0; i < nNodeArray.length; i++) {
                    let removeNode = nNodeArray[i];
                    let textNode = util.createTextNode(removeNode.textContent);
                    pNode.insertBefore(textNode, removeNode);
                    pNode.removeChild(removeNode);
                    if (i === 0) container = textNode;
                }
            } else if (isRemoveNode) {
                for (let i = 0; i < nNodeArray.length; i++) {
                    this._stripRemoveNode(nNodeArray[i]);
                }
            }

            if (!isRemoveFormat && pNode.childNodes.length === 0) {
                if (element.childNodes) {
                    container = element.childNodes[0];
                } else {
                    container = util.createTextNode(util.zeroWidthSpace);
                    element.appendChild(container);
                }
            } else {
                this._removeEmptyNode(pNode, newInnerNode);

                if (util.onlyZeroWidthSpace(pNode.textContent)) {
                    container = pNode.firstChild;
                    offset = 0;
                }

                // node change
                const offsets = {s: 0, e: 0};
                const path = util.getNodePath(container, pNode, offsets);
                offset += offsets.s;

                // tag merge
                const newOffsets = this._mergeSameTags(pNode, path, null);

                element.innerHTML = pNode.innerHTML;

                container = util.getNodeFromPath(path, element);
                offset += newOffsets.a;
            }

            return {
                container: container,
                offset: offset
            };
        },

        /**
         * @description wraps mid lines selected text.
         * @param {Element} element The node of the line that contains the selected text node.
         * @param {Element} newInnerNode The dom that will wrap the selected text area
         * @param {function} validation Check if the node should be stripped.
         * @param {Boolean} isRemoveFormat Is the remove all formats command?
         * @param {Boolean} isRemoveNode "newInnerNode" is remove node?
         * @private
         */
        _nodeChange_middleLine: function (element, newInnerNode, validation, isRemoveFormat, isRemoveNode, _removeCheck) {
            // not add tag
            if (!isRemoveNode) {
                const tempNode = element.cloneNode(true);
                const newNodeName = newInnerNode.nodeName;
                const newCssText = newInnerNode.style.cssText;
                const newClass = newInnerNode.className;

                let children = tempNode.childNodes;
                let i = 0, len = children.length;

                for (let child; i < len; i++) {
                    child = children[i];
                    if (child.nodeType === 3) break;
                    if (child.nodeName === newNodeName) {
                        child.style.cssText += newCssText;
                        util.addClass(child, newClass);
                    } else if (len === 1) {
                        children = child.childNodes;
                        len = children.length;
                        i = -1;
                        continue;
                    } else {
                        break;
                    }
                }

                if (len > 0 && i === len) {
                    element.innerHTML = tempNode.innerHTML;
                    return;
                }
            }

            // add tag
            _removeCheck.v = false;
            const pNode = element.cloneNode(false);
            const nNodeArray = [newInnerNode];
            let noneChange = true;

            (function recursionFunc(current, ancestor) {
                const childNodes = current.childNodes;

                for (let i = 0, len = childNodes.length, vNode; i < len; i++) {
                    let child = childNodes[i];
                    if (!child) continue;
                    let coverNode = ancestor;

                    if (util.isIgnoreNodeChange(child)) {
                        pNode.appendChild(newInnerNode);
                        newInnerNode = newInnerNode.cloneNode(false);
                        pNode.appendChild(child);
                        pNode.appendChild(newInnerNode);
                        nNodeArray.push(newInnerNode);
                        ancestor = newInnerNode;
                        i--;
                        continue;
                    } else {
                        vNode = validation(child);
                        if (vNode) {
                            noneChange = false;
                            ancestor.appendChild(vNode);
                            if (child.nodeType === 1 && !util.isBreak(child)) coverNode = vNode;
                        }
                    }

                    recursionFunc(child, coverNode);
                }
            })(element.cloneNode(true), newInnerNode);

            // not remove tag
            if (noneChange || (isRemoveNode && !isRemoveFormat && !_removeCheck.v)) return;

            pNode.appendChild(newInnerNode);

            if (isRemoveFormat && isRemoveNode) {
                for (let i = 0; i < nNodeArray.length; i++) {
                    let removeNode = nNodeArray[i];
                    let textNode = util.createTextNode(removeNode.textContent);
                    pNode.insertBefore(textNode, removeNode);
                    pNode.removeChild(removeNode);
                }
            } else if (isRemoveNode) {
                for (let i = 0; i < nNodeArray.length; i++) {
                    this._stripRemoveNode(nNodeArray[i]);
                }
            }

            this._removeEmptyNode(pNode, newInnerNode);
            this._mergeSameTags(pNode, null, null);

            // node change
            element.innerHTML = pNode.innerHTML;
        },

        /**
         * @description wraps last line selected text.
         * @param {Element} element The node of the line that contains the selected text node.
         * @param {Element} newInnerNode The dom that will wrap the selected text area
         * @param {function} validation Check if the node should be stripped.
         * @param {Element} endCon The endContainer property of the selection object.
         * @param {Number} endOff The endOffset property of the selection object.
         * @param {Boolean} isRemoveFormat Is the remove all formats command?
         * @param {Boolean} isRemoveNode "newInnerNode" is remove node?
         * @returns {{container: *, offset: *}}
         * @private
         */
        _nodeChange_endLine: function (element, newInnerNode, validation, endCon, endOff, isRemoveFormat, isRemoveNode, _removeCheck, _getAnchor, _isAnchor) {
            // not add tag
            let parentCon = endCon.parentNode;
            while (!parentCon.nextSibling && !parentCon.previousSibling && !util.isFormatElement(parentCon.parentNode) && !util.isWysiwygDiv(parentCon.parentNode)) {
                if (parentCon.nodeName === newInnerNode.nodeName) break;
                parentCon = parentCon.parentNode;
            }
            
            if (!isRemoveNode && parentCon.nodeName === newInnerNode.nodeName && !util.isFormatElement(parentCon) && !parentCon.previousSibling && util.onlyZeroWidthSpace(endCon.textContent.slice(endOff))) {
                let sameTag = true;
                let e = endCon.nextSibling;
                while (e) {
                    if (!util.onlyZeroWidthSpace(e)) {
                        sameTag = false;
                        break;
                    }
                    e = e.nextSibling;
                }

                if (sameTag) {
                    util.copyTagAttributes(parentCon, newInnerNode);
    
                    return {
                        container: endCon,
                        offset: endOff
                    };
                }
            }

            // add tag
            _removeCheck.v = false;
            const el = element;
            const nNodeArray = [newInnerNode];
            const pNode = element.cloneNode(false);

            let container = endCon;
            let offset = endOff;
            let passNode = false;
            let pCurrent, newNode, appendNode, anchorNode;

            (function recursionFunc(current, ancestor) {
                const childNodes = current.childNodes;

                for (let i = childNodes.length - 1, vNode; 0 <= i; i--) {
                    const child = childNodes[i];
                    if (!child) continue;
                    let coverNode = ancestor;

                    if (passNode && !util.isBreak(child)) {
                        if (child.nodeType === 1) {
                            if (util.isIgnoreNodeChange(child)) {
                                newInnerNode = newInnerNode.cloneNode(false);
                                pNode.insertBefore(child, ancestor);
                                pNode.insertBefore(newInnerNode, child);
                                nNodeArray.push(newInnerNode);
                                i--;
                            } else {
                                recursionFunc(child, child);
                            }
                            continue;
                        }

                        newNode = child;
                        pCurrent = [];
                        const anchors = [];
                        while (newNode.parentNode !== null && newNode !== el && newNode !== newInnerNode) {
                            vNode = validation(newNode);
                            if (vNode && newNode.nodeType === 1) {
                                if (_isAnchor(vNode)) {
                                    if (!anchorNode) anchors.push(vNode);
                                } else {
                                    pCurrent.push(vNode);
                                }
                            }
                            newNode = newNode.parentNode;
                        }
                        pCurrent = pCurrent.concat(anchors);

                        const isTopNode = pCurrent.length > 0;
                        const childNode = pCurrent.pop() || child;
                        appendNode = newNode = childNode;
                        while (pCurrent.length > 0) {
                            newNode = pCurrent.pop();
                            appendNode.appendChild(newNode);
                            appendNode = newNode;
                        }

                        if (_isAnchor(newInnerNode.parentNode) && !_isAnchor(childNode)) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            pNode.insertBefore(newInnerNode, pNode.firstChild);
                            nNodeArray.push(newInnerNode);
                        }

                        if (!anchorNode && _isAnchor(childNode)) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            const aChildren = childNode.childNodes;
                            for (let a = 0, aLen = aChildren.length; a < aLen; a++) {
                                newInnerNode.appendChild(aChildren[a]);
                            }
                            childNode.appendChild(newInnerNode);
                            pNode.insertBefore(childNode, pNode.firstChild);
                            nNodeArray.push(newInnerNode);
                            if (newInnerNode.children.length > 0) ancestor = newNode;
                            else ancestor = newInnerNode;
                        } else if (isTopNode) {
                            newInnerNode.insertBefore(childNode, newInnerNode.firstChild);
                            ancestor = newNode;
                        } else {
                            ancestor = newInnerNode;
                        }

                        if (anchorNode && child.nodeType === 3) {
                            if (_getAnchor(child)) {
                                const ancestorAnchorNode = util.getParentElement(ancestor, function (current) {return this.isAnchor(current.parentNode) || current.parentNode === pNode;}.bind(util));
                                anchorNode.appendChild(ancestorAnchorNode);
                                newInnerNode = ancestorAnchorNode.cloneNode(false);
                                nNodeArray.push(newInnerNode);
                                pNode.insertBefore(newInnerNode, pNode.firstChild);
                            } else {
                                anchorNode = null;
                            }
                        }
                    }

                    // endContainer
                    if (!passNode && child === container) {
                        anchorNode = _getAnchor(child);
                        const afterNode = util.createTextNode(container.nodeType === 1 ? '' : container.substringData(offset, (container.length - offset)));
                        const textNode = util.createTextNode(container.nodeType === 1 ? '' : container.substringData(0, offset));

                        if (anchorNode) {
                            anchorNode = anchorNode.cloneNode(false);
                            const a = _getAnchor(ancestor);
                            if (a && a.parentNode !== pNode) {
                                let m = a;
                                let p = null;
                                while (m.parentNode !== pNode) {
                                    ancestor = p = m.parentNode.cloneNode(false);
                                    while(m.childNodes[0]) {
                                        p.appendChild(m.childNodes[0]);
                                    }
                                    m.appendChild(p);
                                    m = m.parentNode;
                                }
                                m.parentNode.insertBefore(a, m.parentNode.firstChild);
                            }
                            anchorNode = anchorNode.cloneNode(false);
                        } else if (_isAnchor(newInnerNode.parentNode) && !anchorNode) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            pNode.appendChild(newInnerNode);
                            nNodeArray.push(newInnerNode);
                        }

                        if (afterNode.data.length > 0) {
                            ancestor.insertBefore(afterNode, ancestor.firstChild);
                        }

                        newNode = ancestor;
                        pCurrent = [];
                        while (newNode !== pNode && newNode !== null) {
                            vNode = _isAnchor(newNode) ? null : validation(newNode);
                            if (vNode && newNode.nodeType === 1) {
                                pCurrent.push(vNode);
                            }
                            newNode = newNode.parentNode;
                        }

                        const childNode = pCurrent.pop() || ancestor;
                        appendNode = newNode = childNode;
                        while (pCurrent.length > 0) {
                            newNode = pCurrent.pop();
                            appendNode.appendChild(newNode);
                            appendNode = newNode;
                        }

                        if (childNode !== ancestor) {
                            newInnerNode.insertBefore(childNode, newInnerNode.firstChild);
                            ancestor = newNode;
                        } else {
                            ancestor = newInnerNode;
                        }

                        if (util.isBreak(child)) newInnerNode.appendChild(child.cloneNode(false));
                        
                        if (anchorNode) {
                            anchorNode.insertBefore(newInnerNode, anchorNode.firstChild);
                            pNode.insertBefore(anchorNode, pNode.firstChild);
                            anchorNode = null;
                        } else {
                            pNode.insertBefore(newInnerNode, pNode.firstChild);
                        }

                        container = textNode;
                        offset = textNode.data.length;
                        passNode = true;

                        ancestor.insertBefore(container, ancestor.firstChild);
                        continue;
                    }

                    vNode = !passNode ? child.cloneNode(false) : validation(child);
                    if (vNode) {
                        ancestor.insertBefore(vNode, ancestor.firstChild);
                        if (child.nodeType === 1 && !util.isBreak(child)) coverNode = vNode;
                    }

                    recursionFunc(child, coverNode);
                }
            })(element, pNode);

            // not remove tag
            if (isRemoveNode && !isRemoveFormat && !_removeCheck.v) {
                return {
                    container: endCon,
                    offset: endOff
                };
            }

            isRemoveFormat = isRemoveFormat && isRemoveNode;

            if (isRemoveFormat) {
                for (let i = 0; i < nNodeArray.length; i++) {
                    let removeNode = nNodeArray[i];
                    let textNode = util.createTextNode(removeNode.textContent);
                    pNode.insertBefore(textNode, removeNode);
                    pNode.removeChild(removeNode);

                    if (i === nNodeArray.length - 1) {
                        container = textNode;
                        offset = textNode.textContent.length;
                    }
                }
            } else if (isRemoveNode) {
                for (let i = 0; i < nNodeArray.length; i++) {
                    this._stripRemoveNode(nNodeArray[i]);
                }
            }

            if (!isRemoveFormat && pNode.childNodes.length === 0) {
                if (element.childNodes) {
                    container = element.childNodes[0];
                } else {
                    container = util.createTextNode(util.zeroWidthSpace);
                    element.appendChild(container);
                }
            } else {
                this._removeEmptyNode(pNode, newInnerNode);

                if (util.onlyZeroWidthSpace(pNode.textContent)) {
                    container = pNode.firstChild;
                    offset = container.textContent.length;
                } else if (util.onlyZeroWidthSpace(container)) {
                    container = pNode;
                    offset = 0;
                }
                
                // node change
                const offsets = {s: 0, e: 0};
                const path = util.getNodePath(container, pNode, offsets);
                offset += offsets.s;

                // tag merge
                const newOffsets = this._mergeSameTags(pNode, path, null);

                element.innerHTML = pNode.innerHTML;

                container = util.getNodeFromPath(path, element);
                offset += newOffsets.a;
            }

            return {
                container: container,
                offset: offset
            };
        },

        /**
         * @description Execute command of command button(All Buttons except submenu and dialog)
         * (undo, redo, bold, underline, italic, strikethrough, subscript, superscript, removeFormat, indent, outdent, fullscreen, showBlocks, codeview, preview, print)
         * @param {Element} target The element of command button
         * @param {String} command Property of command button (data-value)
         */
        commandHandler: function (target, command) {
            switch (command) {
                case 'selectAll':
                    const wysiwyg = context.element.wysiwyg;
                    const first = util.getChildElement(wysiwyg.firstChild, function (current) { return current.childNodes.length === 0 || current.nodeType === 3; }, false) || wysiwyg.firstChild;
                    const last = util.getChildElement(wysiwyg.lastChild, function (current) { return current.childNodes.length === 0 || current.nodeType === 3; }, true) || wysiwyg.lastChild;
                    this.setRange(first, 0, last, last.textContent.length);
                    this.focus();
                    break;
                case 'codeView':
                    this.toggleCodeView();
                    util.toggleClass(target, 'active');
                    break;
                case 'fullScreen':
                    this.toggleFullScreen(target);
                    util.toggleClass(target, 'active');
                    break;
                case 'indent':
                case 'outdent':
                    this.indent(command);
                    break;
                case 'undo':
                    this.history.undo();
                    break;
                case 'redo':
                    this.history.redo();
                    break;
                case 'removeFormat':
                    this.removeFormat();
                    this.focus();
                    break;
                case 'print':
                    this.print();
                    break;
                case 'preview':
                    this.preview();
                    break;
                case 'showBlocks':
                    this.toggleDisplayBlocks();
                    util.toggleClass(target, 'active');
                    break;
                case 'save':
                    if (typeof context.option.callBackSave === 'function') {
                        context.option.callBackSave(this.getContents(false));
                    } else if (typeof userFunction.save === 'function') {
                        userFunction.save();
                    } else {
                        throw Error('[SUNEDITOR.core.commandHandler.fail] Please register call back function in creation option. (callBackSave : Function)');
                    }

                    if (context.tool.save) context.tool.save.setAttribute('disabled', true);
                    break;
                default : // 'STRONG', 'INS', 'EM', 'DEL', 'SUB', 'SUP'
                    const btn = util.hasClass(this.commandMap[command], 'active') ? null : util.createElement(command);
                    let removeNode = command;

                    if (command === 'SUB' && util.hasClass(this.commandMap.SUP, 'active')) {
                        removeNode = 'SUP';
                    } else if (command === 'SUP' && util.hasClass(this.commandMap.SUB, 'active')) {
                        removeNode = 'SUB';
                    }

                    this.nodeChange(btn, null, [removeNode], false);
                    this.focus();
            }
        },

        /**
         * @description Remove format of the currently selected range
         */
        removeFormat: function () {
            this.nodeChange(null, null, null, null);
        },

        /**
         * @description This method implements indentation to selected range.
         * Setted "margin-left" to "25px" in the top "P" tag of the parameter node.
         * @param {String} command Separator ("indent" or "outdent")
         */
        indent: function (command) {
            const rangeLines = this.getSelectedElements();
            let p, margin;

            for (let i = 0, len = rangeLines.length; i < len; i++) {
                p = rangeLines[i];
                margin = /\d+/.test(p.style.marginLeft) ? util.getNumber(p.style.marginLeft, 0) : 0;

                if ('indent' === command) {
                    margin += 25;
                } else {
                    margin -= 25;
                }
    
                p.style.marginLeft = (margin < 0 ? 0 : margin) + 'px';
            }

            event._applyTagEffects();
            // history stack
            this.history.push(false);
        },

        /**
         * @description Add or remove the class name of "body" so that the code block is visible
         */
        toggleDisplayBlocks: function () {
            util.toggleClass(context.element.wysiwyg, 'se-show-block');
            this._resourcesStateChange();
        },

        /**
         * @description Changes to code view or wysiwyg view
         */
        toggleCodeView: function () {
            const isCodeView = this._variable.isCodeView;
            const disButtons = this.codeViewDisabledButtons;
            for (let i = 0, len = disButtons.length; i < len; i++) {
                disButtons[i].disabled = !isCodeView;
            }

            this.controllersOff();

            if (isCodeView) {
                this._setCodeDataToEditor();
                context.element.wysiwygFrame.scrollTop = 0;
                context.element.code.style.display = 'none';
                context.element.wysiwygFrame.style.display = 'block';

                this._variable._codeOriginCssText = this._variable._codeOriginCssText.replace(/(\s?display(\s+)?:(\s+)?)[a-zA-Z]+(?=;)/, 'display: none');
                this._variable._wysiwygOriginCssText = this._variable._wysiwygOriginCssText.replace(/(\s?display(\s+)?:(\s+)?)[a-zA-Z]+(?=;)/, 'display: block');

                if (context.option.height === 'auto' && !context.option.codeMirrorEditor) context.element.code.style.height = '0px';
                
                this._variable.isCodeView = false;
                
                if (!this._variable.isFullScreen) {
                    this._notHideToolbar = false;
                    if (/balloon/i.test(context.option.mode)) {
                        context.element._arrow.style.display = '';
                        this._isInline = false;
                        this._isBalloon = true;
                        event._hideToolbar();    
                    }
                }

                this._resourcesStateChange();
                this._checkComponents();
                this.focus();

                // history stack
                this.history.push(false);
            } else {
                this._setEditorDataToCodeView();
                this._variable._codeOriginCssText = this._variable._codeOriginCssText.replace(/(\s?display(\s+)?:(\s+)?)[a-zA-Z]+(?=;)/, 'display: block');
                this._variable._wysiwygOriginCssText = this._variable._wysiwygOriginCssText.replace(/(\s?display(\s+)?:(\s+)?)[a-zA-Z]+(?=;)/, 'display: none');

                if (context.option.height === 'auto' && !context.option.codeMirrorEditor) context.element.code.style.height = context.element.code.scrollHeight > 0 ? (context.element.code.scrollHeight + 'px') : 'auto';
                if (context.option.codeMirrorEditor) context.option.codeMirrorEditor.refresh();
                
                this._variable.isCodeView = true;

                if (!this._variable.isFullScreen) {
                    this._notHideToolbar = true;
                    if (this._isBalloon) {
                        context.element._arrow.style.display = 'none';
                        context.element.toolbar.style.left = '';
                        this._isInline = true;
                        this._isBalloon = false;
                        event._showToolbarInline();
                    }
                }
                
                this._variable._range = null;
                context.element.code.focus();
            }

            this._checkPlaceholder();
        },

        /**
         * @description Convert the data of the code view and put it in the WYSIWYG area.
         * @private
         */
        _setCodeDataToEditor: function () {
            const code_html = this._getCodeView();

            if (context.option.fullPage) {
                const parseDocument = (new this._w.DOMParser()).parseFromString(code_html, 'text/html');
                const headChildren = parseDocument.head.children;

                for (let i = 0, len = headChildren.length; i < len; i++) {
                    if (/script/i.test(headChildren[i].tagName)) {
                        parseDocument.head.removeChild(headChildren[i]);
                    }
                }

                this._wd.head.innerHTML = parseDocument.head.innerHTML;
                this._wd.body.innerHTML = util.convertContentsForEditor(parseDocument.body.innerHTML);

                const attrs = parseDocument.body.attributes;
                for (let i = 0, len = attrs.length; i < len; i++) {
                    if (attrs[i].name === 'contenteditable') continue;
                    this._wd.body.setAttribute(attrs[i].name, attrs[i].value);
                }
            } else {
                context.element.wysiwyg.innerHTML = code_html.length > 0 ? util.convertContentsForEditor(code_html) : '<p><br></p>';
            }
        },

        /**
         * @description Convert the data of the WYSIWYG area and put it in the code view area.
         * @private
         */
        _setEditorDataToCodeView: function () {
            const codeContents = util.convertHTMLForCodeView(context.element.wysiwyg, this._variable.codeIndent);
            let codeValue = '';

            if (context.option.fullPage) {
                const attrs = util.getAttributesToString(this._wd.body, null);
                codeValue = '<!DOCTYPE html>\n<html>\n' + this._wd.head.outerHTML.replace(/>(?!\n)/g, '>\n') + '<body ' + attrs + '>\n' + codeContents + '</body>\n</html>';
            } else {
                codeValue = codeContents;
            }

            context.element.code.style.display = 'block';
            context.element.wysiwygFrame.style.display = 'none';

            this._setCodeView(codeValue);
        },

        /**
         * @description Changes to full screen or default screen
         * @param {Element} element full screen button
         */
        toggleFullScreen: function (element) {
            const topArea = context.element.topArea;
            const toolbar = context.element.toolbar;
            const editorArea = context.element.editorArea;
            const wysiwygFrame = context.element.wysiwygFrame;
            const code = context.element.code;
            const _var = this._variable;

            if (!_var.isFullScreen) {
                _var.isFullScreen = true;
                
                _var._fullScreenAttrs.inline = this._isInline;
                _var._fullScreenAttrs.balloon = this._isBalloon;

                if (this._isInline || this._isBalloon) {
                    this._isInline = false;
                    this._isBalloon = false;
                }

                topArea.style.position = 'fixed';
                topArea.style.top = '0';
                topArea.style.left = '0';
                topArea.style.width = '100%';
                topArea.style.height = '100%';
                topArea.style.zIndex = '2147483647';

                if (context.element._stickyDummy.style.display !== ( true && '')) {
                    _var._fullScreenAttrs.sticky = true;
                    context.element._stickyDummy.style.display = 'none';
                    util.removeClass(toolbar, 'se-toolbar-sticky');
                }

                _var._bodyOverflow = _d.body.style.overflow;
                _d.body.style.overflow = 'hidden';

                _var._editorAreaOriginCssText = editorArea.style.cssText;
                _var._wysiwygOriginCssText = wysiwygFrame.style.cssText;
                _var._codeOriginCssText = code.style.cssText;

                editorArea.style.cssText = toolbar.style.cssText = '';
                wysiwygFrame.style.cssText = (wysiwygFrame.style.cssText.match(/\s?display(\s+)?:(\s+)?[a-zA-Z]+;/) || [''])[0];
                code.style.cssText = (code.style.cssText.match(/\s?display(\s+)?:(\s+)?[a-zA-Z]+;/) || [''])[0];
                toolbar.style.width = wysiwygFrame.style.height = code.style.height = '100%';
                toolbar.style.position = 'relative';
                toolbar.style.display = 'block';

                _var.innerHeight_fullScreen = (_w.innerHeight - toolbar.offsetHeight);
                editorArea.style.height = _var.innerHeight_fullScreen + 'px';

                util.removeClass(element.firstElementChild, 'se-icon-expansion');
                util.addClass(element.firstElementChild, 'se-icon-reduction');

                if (context.option.iframe && context.option.height === 'auto') {
                    editorArea.style.overflow = 'auto';
                    this._iframeAutoHeight();
                }
            }
            else {
                _var.isFullScreen = false;

                wysiwygFrame.style.cssText = _var._wysiwygOriginCssText;
                code.style.cssText = _var._codeOriginCssText;
                toolbar.style.cssText = '';
                editorArea.style.cssText = _var._editorAreaOriginCssText;
                topArea.style.cssText = _var._originCssText;
                _d.body.style.overflow = _var._bodyOverflow;

                if (context.option.stickyToolbar > -1) {
                    util.removeClass(toolbar, 'se-toolbar-sticky');
                }

                if (_var._fullScreenAttrs.sticky) {
                    _var._fullScreenAttrs.sticky = false;
                    context.element._stickyDummy.style.display = 'block';
                    util.addClass(toolbar, "se-toolbar-sticky");
                }

                this._isInline = _var._fullScreenAttrs.inline;
                this._isBalloon = _var._fullScreenAttrs.balloon;
                if (this._isInline) event._showToolbarInline();

                event.onScroll_window();

                util.removeClass(element.firstElementChild, 'se-icon-reduction');
                util.addClass(element.firstElementChild, 'se-icon-expansion');
            }
        },

        /**
         * @description Prints the current contents of the editor.
         */
        print: function () {
            const iframe = util.createElement('IFRAME');
            iframe.style.display = 'none';
            _d.body.appendChild(iframe);

            const printDocument = util.getIframeDocument(iframe);
            const contentsHTML = this.getContents(true);

            if (context.option.iframe) {
                const wDocument = util.getIframeDocument(context.element.wysiwygFrame);
                const arrts = context.option.fullPage ? util.getAttributesToString(wDocument.body, ['contenteditable']) : 'class="sun-editor-editable"';

                printDocument.write('' +
                    '<!DOCTYPE html><html>' +
                    '<head>' +
                    wDocument.head.innerHTML +
                    '<style>' + util.getPageStyle(context.element.wysiwygFrame) + '</style>' +
                    '</head>' +
                    '<body ' + arrts + '>' + contentsHTML + '</body>' +
                    '</html>'
                );
            } else {
                const contents = util.createElement('DIV');
                const style = util.createElement('STYLE');

                style.innerHTML = util.getPageStyle();
                contents.className = 'sun-editor-editable';
                contents.innerHTML = contentsHTML;

                printDocument.head.appendChild(style);
                printDocument.body.appendChild(contents);
            }

            try {
                iframe.focus();
                // IE or Edge
                if (_w.navigator.userAgent.indexOf('MSIE') !== -1 || !!_d.documentMode || !!_w.StyleMedia) {
                    try {
                        iframe.contentWindow.document.execCommand('print', false, null);
                    } catch (e) {
                        iframe.contentWindow.print();
                    }
                } else {
                    // Other browsers
                    iframe.contentWindow.print();
                }
            } catch (error) {
                throw Error('[SUNEDITOR.core.print.fail] error: ' + error);
            } finally {
                util.removeItem(iframe);
            }
        },

        /**
         * @description Open the preview window.
         */
        preview: function () {
            const contentsHTML = this.getContents(true);
            const windowObject = _w.open('', '_blank');
            windowObject.mimeType = 'text/html';

            if (context.option.iframe) {
                const wDocument = util.getIframeDocument(context.element.wysiwygFrame);
                const arrts = context.option.fullPage ? util.getAttributesToString(wDocument.body, ['contenteditable']) : 'class="sun-editor-editable"';

                windowObject.document.write('' +
                    '<!DOCTYPE html><html>' +
                    '<head>' +
                    wDocument.head.innerHTML +
                    '<style>body {overflow: auto !important;}</style>' +
                    '</head>' +
                    '<body ' + arrts + '>' + contentsHTML + '</body>' +
                    '</html>'
                );
            } else {
                windowObject.document.write('' +
                    '<!DOCTYPE html><html>' +
                    '<head>' +
                    '<meta charset="utf-8" />' +
                    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
                    '<title>' + lang.toolbar.preview + '</title>' +
                    '<style>' + util.getPageStyle() + '</style>' +
                    '</head>' +
                    '<body class="sun-editor-editable">' + contentsHTML + '</body>' +
                    '</html>'
                );
            }
        },

        /**
         * @description Sets the HTML string
         * @param {String} html HTML string
         */
        setContents: function (html) {
            const convertValue = util.convertContentsForEditor(html);
            if (!core._variable.isCodeView) {
                context.element.wysiwyg.innerHTML = convertValue;
                // history stack
                core.history.push(false);
            } else {
                const value = util.convertHTMLForCodeView(convertValue, core._variable.codeIndent);
                core._setCodeView(value);
            }
        },

        /**
         * @description Gets the current contents
         * @param {Boolean} onlyContents Return only the contents of the body without headers when the "fullPage" option is true
         * @returns {Object}
         */
        getContents: function (onlyContents) {
            const contents = context.element.wysiwyg.innerHTML;
            const renderHTML = util.createElement('DIV');
            renderHTML.innerHTML = contents;

            const figcaptions = util.getListChildren(renderHTML, function (current) {
                return /FIGCAPTION/i.test(current.nodeName);
            });

            for (let i = 0, len = figcaptions.length; i < len; i++) {
                figcaptions[i].removeAttribute('contenteditable');
            }

            if (context.option.fullPage && !onlyContents) {
                const attrs = util.getAttributesToString(this._wd.body, ['contenteditable']);
                return '<!DOCTYPE html><html>' + this._wd.head.outerHTML + '<body ' + attrs + '>' + renderHTML.innerHTML + '</body></html>';
            } else {
                return renderHTML.innerHTML;
            }
        },

        /**
         * @description Add an event to document.
         * When created as an Iframe, the same event is added to the document in the Iframe.
         * @param {String} type Event type
         * @param {Function} listener Event listener
         * @param {Boolean} useCapture Use event capture
         */
        addDocEvent: function (type, listener, useCapture) {
            _d.addEventListener(type, listener, useCapture);
            if (context.option.iframe) {
                this._wd.addEventListener(type, listener);
            }
        },

        /**
         * @description Remove events from document.
         * When created as an Iframe, the event of the document inside the Iframe is also removed.
         * @param {String} type Event type
         * @param {Function} listener Event listener
         */
        removeDocEvent: function (type, listener) {
            _d.removeEventListener(type, listener);
            if (context.option.iframe) {
                this._wd.removeEventListener(type, listener);
            }
        },

        /**
         * @description The current number of characters is counted and displayed.
         * @param {Number} nextCharCount Length of character to be added.
         * @returns {Boolean}
         * @private
         */
        _charCount: function (nextCharCount, blink) {
            const charCounter = context.element.charCounter;
            if (!charCounter) return true;
            if (!nextCharCount || nextCharCount < 0) nextCharCount = 0;

            const maxCharCount = context.option.maxCharCount;

            _w.setTimeout(function () {
                charCounter.textContent = context.element.wysiwyg.textContent.length;
            });

            if (maxCharCount > 0) {
                let over = false;
                const count = context.element.wysiwyg.textContent.length;
                
                if (count > maxCharCount) {
                    core._editorRange();
                    const range = core.getRange();
                    const endOff = range.endOffset - 1;
                    const text = core.getSelectionNode().textContent;

                    core.getSelectionNode().textContent = text.slice(0, range.endOffset - 1) + text.slice(range.endOffset, text.length);
                    core.setRange(range.endContainer, endOff, range.endContainer, endOff);
                    over = true;
                } else if ((count + nextCharCount) > maxCharCount) {
                    over = true;
                }

                if (over) {
                    if (blink && !util.hasClass(charCounter, 'se-blink')) {
                        util.addClass(charCounter, 'se-blink');
                        _w.setTimeout(function () {
                            util.removeClass(charCounter, 'se-blink');
                        }, 600);
                    }

                    return false;
                }
            }

            return true;
        },

        /**
         * @description Check the components such as image and video and modify them according to the format.
         * @private
         */
        _checkComponents: function () {
            if (this.plugins.image) {
                if (!this.initPlugins.image) this.callPlugin('image', this.plugins.image.checkImagesInfo.bind(this));
                else this.plugins.image.checkImagesInfo.call(this);
            }

            if (this.plugins.video) {
                if (!this.initPlugins.video) this.callPlugin('video', this.plugins.video.checkVideosInfo.bind(this));
                else this.plugins.video.checkVideosInfo.call(this);
            }
        },

        /**
         * @description Set method in the code view area
         * @param {String} value HTML string
         * @private
         */
        _setCodeView: function (value) {
            if (context.option.codeMirrorEditor) {
                context.option.codeMirrorEditor.getDoc().setValue(value);
            } else {
                context.element.code.value = value;
            }
        },

        /**
         * @description Get method in the code view area
         * @private
         */
        _getCodeView: function () {
            return context.option.codeMirrorEditor ? context.option.codeMirrorEditor.getDoc().getValue() : context.element.code.value;
        },

        /**
         * @description Initializ core variable
         * @private
         */
        _init: function (reload) {
            this._ww = context.option.iframe ? context.element.wysiwygFrame.contentWindow : _w;
            this._wd = _d;

            _w.setTimeout(function () {
                this._checkComponents();
                this._imagesInfoInit = false;
                this._imagesInfoReset = false;
                
                this.history.reset(true);

                if (_options.iframe) {
                    this._wd = context.element.wysiwygFrame.contentDocument;
                    context.element.wysiwyg = this._wd.body;
                    if (_options.height === 'auto') {
                        this._iframeAuto = this._wd.body;
                    }
                    this._iframeAutoHeight();
                }

                if (typeof userFunction.onload === 'function') return userFunction.onload(core, reload);
            }.bind(this));

            this.codeViewDisabledButtons = context.element.toolbar.querySelectorAll('.se-toolbar button:not([class~="code-view-enabled"])');
            this._isInline = /inline/i.test(context.option.mode);
            this._isBalloon = /balloon/i.test(context.option.mode);

            this.commandMap = {
                FORMAT: context.tool.format,
                FONT: context.tool.font,
                FONT_TOOLTIP: context.tool.fontTooltip,
                SIZE: context.tool.fontSize,
                ALIGN: context.tool.align,
                LI: context.tool.list,
                LI_ICON: context.tool.list && context.tool.list.querySelector('i'),
                STRONG: context.tool.bold,
                INS: context.tool.underline,
                EM: context.tool.italic,
                DEL: context.tool.strike,
                SUB: context.tool.subscript,
                SUP: context.tool.superscript,
                OUTDENT: context.tool.outdent
            };

            this._variable._originCssText = context.element.topArea.style.cssText;
            this._placeholder = context.element.placeholder;

            /** Excute history function */
            this._checkPlaceholder();
            this.history = lib_history(this, event._onChange_historyStack);
        },

        /**
         * @description Called when there are changes to tags in the wysiwyg region.
         * @private
         */
        _resourcesStateChange: function () {
            core._iframeAutoHeight();
            core._checkPlaceholder();
        },

        /**
         * @description Modify the height value of the iframe when the height of the iframe is automatic.
         * @private
         */
        _iframeAutoHeight: function () {
            if (this._iframeAuto) {
                context.element.wysiwygFrame.style.height = this._iframeAuto.offsetHeight + 'px';
            }
        },

        /**
         * @description Set display property when there is placeholder.
         * @private
         */
        _checkPlaceholder: function () {
            if (this._placeholder) {
                if (this._variable.isCodeView) {
                    this._placeholder.style.display = 'none';
                    return;
                }

                const wysiwyg = context.element.wysiwyg;
                if (!util.onlyZeroWidthSpace(wysiwyg.textContent) || wysiwyg.querySelector('.se-component, pre, blockquote, hr, li, table, img, iframe, video') || (wysiwyg.innerText.match(/\n/g) || '').length > 1) {
                    this._placeholder.style.display = 'none';
                } else {
                    this._placeholder.style.display = 'block';
                }
            }
        }
    };

    /**
     * @description event function
     */
    const event = {
        _directionKeyCode: new _w.RegExp('^(8|13|32|46|3[3-9]|40|46)$'),
        _nonTextKeyCode: new _w.RegExp('^(8|13|1[6-9]|20|27|3[3-9]|40|45|46|11[2-9]|12[0-3]|144|145)$'),
        _historyIgnoreKeyCode: new _w.RegExp('^(1[6-9]|20|27|3[3-9]|40|45|11[2-9]|12[0-3]|144|145)$'),
        _onButtonsCheck: new _w.RegExp('^(STRONG|INS|EM|DEL|SUB|SUP|LI)$'),
        _frontZeroWidthReg: new _w.RegExp(util.zeroWidthSpace + '+', ''),
        _keyCodeShortcut: {
            65: 'A',
            66: 'B',
            83: 'S',
            85: 'U',
            73: 'I',
            89: 'Y',
            90: 'Z',
            219: '[',
            221: ']'
        },

        _shortcutCommand: function (keyCode, shift) {
            let command = null;
            const keyStr = event._keyCodeShortcut[keyCode];

            switch (keyStr) {
                case 'A':
                    command = 'selectAll';
                    break;
                case 'B':
                    command = 'STRONG';
                    break;
                case 'S':
                    if (shift) {
                        command = 'DEL';
                    }
                    break;
                case 'U':
                    command = 'INS';
                    break;
                case 'I':
                    command = 'EM';
                    break;
                case 'Z':
                    if (shift) {
                        command = 'redo';
                    } else {
                        command = 'undo';
                    }
                    break;
                case 'Y':
                    command = 'redo';
                    break;
                case '[':
                    command = 'outdent';
                    break;
                case ']':
                    command = 'indent';
                    break;
            }

            if (!command) return false;

            core.commandHandler(core.commandMap[command], command);
            return true;
        },

        _applyTagEffects: function () {
            const commandMap = core.commandMap;
            const classOnCheck = this._onButtonsCheck;
            const commandMapNodes = [];
            const currentNodes = [];

            let findFormat = true, findAlign = true, findList = true, findFont = true, findSize = true, findOutdent = true, findA = true;
            let nodeName = '';

            for (let selectionParent = core.getSelectionNode(); !util.isWysiwygDiv(selectionParent); selectionParent = selectionParent.parentNode) {
                if (!selectionParent) break;
                if (selectionParent.nodeType !== 1 || util.isBreak(selectionParent)) continue;
                nodeName = selectionParent.nodeName.toUpperCase();
                currentNodes.push(nodeName);

                /** Format */
                if (util.isFormatElement(selectionParent)) {
                    /* Format block */
                    if (findFormat && commandMap.FORMAT) {
                        commandMapNodes.push('FORMAT');
                        util.changeTxt(commandMap.FORMAT, nodeName);
                        commandMap.FORMAT.setAttribute('data-focus', nodeName);
                        findFormat = false;
                    }

                    /* Align */
                    const textAlign = selectionParent.style.textAlign;
                    if (findAlign && textAlign && commandMap.ALIGN) {
                        commandMapNodes.push('ALIGN');
                        commandMap.ALIGN.className = 'se-icon-align-' + textAlign;
                        commandMap.ALIGN.setAttribute('data-focus', textAlign);
                        findAlign = false;
                    }

                    /* Outdent */
                    if (findOutdent && selectionParent.style.marginLeft && util.getNumber(selectionParent.style.marginLeft, 0) > 0 && commandMap.OUTDENT) {
                        commandMapNodes.push('OUTDENT');
                        commandMap.OUTDENT.removeAttribute('disabled');
                        findOutdent = false;
                    }

                    continue;
                }

                /* List */
                if (findList && util.isList(nodeName) && commandMap.LI) {
                    commandMapNodes.push('LI');
                    commandMap.LI.setAttribute('data-focus', nodeName);
                    if (/UL/i.test(nodeName)) {
                        util.removeClass(commandMap.LI_ICON, 'se-icon-list-number');
                        util.addClass(commandMap.LI_ICON, 'se-icon-list-bullets');
                    } else {
                        util.removeClass(commandMap.LI_ICON, 'se-icon-list-bullets');
                        util.addClass(commandMap.LI_ICON, 'se-icon-list-number');
                    }
                    findList = false;
                }

                /** Font */
                if (findFont && selectionParent.style.fontFamily.length > 0 && commandMap.FONT) {
                    commandMapNodes.push('FONT');
                    const selectFont = (selectionParent.style.fontFamily || selectionParent.face || lang.toolbar.font).replace(/["']/g,'');
                    util.changeTxt(commandMap.FONT, selectFont);
                    util.changeTxt(commandMap.FONT_TOOLTIP, selectFont);
                    findFont = false;
                }

                /** Size */
                if (findSize && selectionParent.style.fontSize.length > 0 && commandMap.SIZE) {
                    commandMapNodes.push('SIZE');
                    util.changeTxt(commandMap.SIZE, selectionParent.style.fontSize);
                    findSize = false;
                }

                /** A */
                if (findA && /^A$/.test(nodeName) && selectionParent.getAttribute('data-image-link') === null && core.plugins.link) {
                    if (!context.link || core.controllerArray[0] !== context.link.linkBtn) {
                        core.callPlugin('link', function () {
                            core.plugins.link.call_controller_linkButton.call(core, selectionParent);
                        });
                    }
                    findA = false;
                } else if (findA && context.link && core.controllerArray[0] === context.link.linkBtn) {
                    core.controllersOff();
                }

                /** strong, ins, em, del, sub, sup */
                if (classOnCheck.test(nodeName)) {
                    commandMapNodes.push(nodeName);
                }
            }

            /** toggle class on */
            for (let i = 0; i < commandMapNodes.length; i++) {
                nodeName = commandMapNodes[i];
                if (classOnCheck.test(nodeName)) {
                    util.addClass(commandMap[nodeName], 'active');
                }
            }

            /** remove class, display text */
            for (let key in commandMap) {
                if (commandMapNodes.indexOf(key) > -1) continue;
                
                if (commandMap.FONT && /^FONT$/i.test(key)) {
                    util.changeTxt(commandMap.FONT, lang.toolbar.font);
                    util.changeTxt(commandMap.FONT_TOOLTIP, lang.toolbar.font);
                }
                else if (commandMap.SIZE && /^SIZE$/i.test(key)) {
                    util.changeTxt(commandMap.SIZE, lang.toolbar.fontSize);
                }
                else if (commandMap.ALIGN && /^ALIGN$/i.test(key)) {
                    commandMap.ALIGN.className = 'se-icon-align-left';
                    commandMap.ALIGN.removeAttribute('data-focus');
                }
                else if (commandMap.OUTDENT && /^OUTDENT$/i.test(key)) {
                    commandMap.OUTDENT.setAttribute('disabled', true);
                }
                else if (commandMap.LI && util.isListCell(key)) {
                    commandMap.LI.removeAttribute('data-focus');
                    util.removeClass(commandMap.LI_ICON, 'se-icon-list-bullets');
                    util.addClass(commandMap.LI_ICON, 'se-icon-list-number');
                    util.removeClass(commandMap.LI, 'active');
                }
                else {
                    util.removeClass(commandMap[key], 'active');
                }
            }

            /** save current nodes */
            core._variable.currentNodes = currentNodes.reverse();

            /**  Displays the current node structure to resizingBar */
            if (context.option.showPathLabel) context.element.navigation.textContent = core._variable.currentNodes.join(' > ');
        },

        _cancelCaptionEdit: function () {
            this.setAttribute('contenteditable', false);
            this.removeEventListener('blur', event._cancelCaptionEdit);
        },

        onMouseDown_toolbar: function (e) {
            let target = e.target;

            if (util.getParentElement(target, '.se-submenu')) {
                e.stopPropagation();
                core._notHideToolbar = true;
            } else {
                e.preventDefault();
                let command = target.getAttribute('data-command');
                let className = target.className;
    
                while (!command && !/se-menu-list/.test(className) && !/se-toolbar/.test(className)) {
                    target = target.parentNode;
                    command = target.getAttribute('data-command');
                    className = target.className;
                }
    
                if (command === core._submenuName) {
                    e.stopPropagation();
                }
            }
        },

        onClick_toolbar: function (e) {
            e.preventDefault();
            e.stopPropagation();

            let target = e.target;
            let display = target.getAttribute('data-display');
            let command = target.getAttribute('data-command');
            let className = target.className;

            while (!command && !/se-menu-list/.test(className) && !/se-toolbar/.test(className)) {
                target = target.parentNode;
                command = target.getAttribute('data-command');
                display = target.getAttribute('data-display');
                className = target.className;
            }

            if (!command && !display) return;
            if (target.disabled) return;
            
            core.focus();
            
            /** Dialog, Submenu */
            if (display) {
                if (/submenu/.test(display) && (target.nextElementSibling === null || target !== core.submenuActiveButton)) {
                    core.callPlugin(command, function () {
                        core.submenuOn(target);
                    });
                    return;
                }
                else if (/dialog/.test(display)) {
                    core.callPlugin(command, function () {
                        core.plugins.dialog.open.call(core, command, false);
                    });
                    return;
                }

                core.submenuOff();
                return;
            }

            /** default command */
            if (command) {
                core.commandHandler(target, command);
            }
        },

        /**
         * @warning Events are registered only when there is a table plugin.
         */
        onMouseDown_wysiwyg: function (e) {
            if (core._isBalloon) {
                event._hideToolbar();
            }

            const tableCell = util.getParentElement(e.target, util.isCell);
            if (!tableCell) return;

            const tablePlugin = core.plugins.table;
            if (tableCell !== tablePlugin._fixedCell && !tablePlugin._shift) {
                core.callPlugin('table', function () {
                    tablePlugin.onTableCellMultiSelect.call(core, tableCell, false);
                });
            }
        },

        onClick_wysiwyg: function (e) {
            const targetElement = e.target;
            if (context.element.wysiwyg.getAttribute('contenteditable') === 'false') return;

            e.stopPropagation();

            if (/^FIGURE$/i.test(targetElement.nodeName)) {
                const imageComponent = targetElement.querySelector('IMG');
                const videoComponent = targetElement.querySelector('IFRAME');

                if (imageComponent) {
                    e.preventDefault();
                    core.selectComponent(imageComponent, 'image');
                    return;
                } else if (videoComponent) {
                    e.preventDefault();
                    core.selectComponent(videoComponent, 'video');
                    return;
                }
            }

            const figcaption = util.getParentElement(targetElement, 'FIGCAPTION');
            if (figcaption && (!figcaption.getAttribute('contenteditable') || figcaption.getAttribute('contenteditable') === 'false')) {
                e.preventDefault();
                figcaption.setAttribute('contenteditable', true);
                figcaption.focus();

                if (core._isInline && !core._inlineToolbarAttr.isShow) {
                    event._showToolbarInline();

                    const hideToolbar = function () {
                        event._hideToolbar();
                        figcaption.removeEventListener('blur', hideToolbar);
                    };

                    figcaption.addEventListener('blur', hideToolbar);
                }
            }

            core._editorRange();

            const selectionNode = core.getSelectionNode();
            const formatEl = util.getFormatElement(selectionNode);
            const rangeEl = util.getRangeFormatElement(selectionNode);
            if (core.getRange().collapsed && (!formatEl || formatEl === rangeEl) && targetElement.getAttribute('contenteditable') !== 'false') {
                if (util.isList(rangeEl)) {
                    const oLi = util.createElement('LI');
                    const prevLi = selectionNode.nextElementSibling;
                    oLi.appendChild(selectionNode);
                    rangeEl.insertBefore(oLi, prevLi);
                } else {
                    core.execCommand('formatBlock', false, util.isRangeFormatElement(rangeEl) ? 'DIV' : 'P');
                }

                core.focus();
            }

            event._applyTagEffects();

            if (core._isBalloon) {
                const range = core.getRange();
                if (range.collapsed) event._hideToolbar();
                else event._showToolbarBalloon(range);
            }

            if (userFunction.onClick) userFunction.onClick(e);
        },

        _showToolbarBalloon: function (rangeObj) {
            if (!core._isBalloon) return;

            const range = rangeObj || core.getRange();
            const toolbar = context.element.toolbar;
            const selection = core.getSelection();

            let isDirTop;
            if (selection.focusNode === selection.anchorNode) {
                isDirTop = selection.focusOffset < selection.anchorOffset;
            } else {
                const childNodes = util.getListChildNodes(range.commonAncestorContainer);
                isDirTop = util.getArrayIndex(childNodes, selection.focusNode) < util.getArrayIndex(childNodes, selection.anchorNode);
            }

            let rects = range.getClientRects();
            rects = rects[isDirTop ? 0 : rects.length - 1];

            const scrollLeft = _w.scrollX || _d.documentElement.scrollLeft;
            const scrollTop = _w.scrollY || _d.documentElement.scrollTop;
            const editorWidth = context.element.topArea.offsetWidth;
            const stickyTop = event._getStickyOffsetTop();
            let editorLeft = 0;
            let topArea = context.element.topArea;
            while (topArea && !/^(BODY|HTML)$/i.test(topArea.nodeName)) {
                editorLeft += topArea.offsetLeft;
                topArea = topArea.offsetParent;
            }
            
            toolbar.style.visibility = 'hidden';
            toolbar.style.display = 'block';
            
            const arrowMargin = _w.Math.round(context.element._arrow.offsetWidth / 2);
            const toolbarWidth = toolbar.offsetWidth;
            const toolbarHeight = toolbar.offsetHeight;

            const iframeRects = /iframe/i.test(context.element.wysiwygFrame.nodeName) ? context.element.wysiwygFrame.getClientRects()[0] : null;
            if (iframeRects) {
                rects = {
                    left: rects.left + iframeRects.left,
                    top: rects.top + iframeRects.top,
                    right: rects.right + iframeRects.right - iframeRects.width,
                    bottom: rects.bottom + iframeRects.bottom - iframeRects.height
                };
            }
            
            event._setToolbarOffset(isDirTop, rects, toolbar, editorLeft, editorWidth, scrollLeft, scrollTop, stickyTop, arrowMargin);
            if (toolbarWidth !== toolbar.offsetWidth || toolbarHeight !== toolbar.offsetHeight) {
                event._setToolbarOffset(isDirTop, rects, toolbar, editorLeft, editorWidth, scrollLeft, scrollTop, stickyTop, arrowMargin);
            }

            toolbar.style.visibility = '';
        },

        _setToolbarOffset: function (isDirTop, rects, toolbar, editorLeft, editorWidth, scrollLeft, scrollTop, stickyTop, arrowMargin) {
            const padding = 1;
            const toolbarWidth = toolbar.offsetWidth;
            const toolbarHeight = toolbar.offsetHeight;

            const absoluteLeft = (isDirTop ? rects.left : rects.right) - editorLeft - (toolbarWidth / 2) + scrollLeft;
            const overRight = absoluteLeft + toolbarWidth - editorWidth;
            
            const t = (isDirTop ? rects.top - toolbarHeight - arrowMargin : rects.bottom + arrowMargin) - stickyTop + scrollTop;
            let l = absoluteLeft < 0 ? padding : overRight < 0 ? absoluteLeft : absoluteLeft - overRight - padding - 1;

            toolbar.style.left = _w.Math.floor(l) + 'px';
            toolbar.style.top = _w.Math.floor(t) + 'px';

            if (isDirTop) {
                util.removeClass(context.element._arrow, 'se-arrow-up');
                util.addClass(context.element._arrow, 'se-arrow-down');
                context.element._arrow.style.top = toolbarHeight + 'px';
            } else {
                util.removeClass(context.element._arrow, 'se-arrow-down');
                util.addClass(context.element._arrow, 'se-arrow-up');
                context.element._arrow.style.top = -arrowMargin + 'px';
            }

            const arrow_left = _w.Math.floor((toolbarWidth / 2) + (absoluteLeft - l));
            context.element._arrow.style.left = (arrow_left + arrowMargin > toolbar.offsetWidth ? toolbar.offsetWidth - arrowMargin : arrow_left < arrowMargin ? arrowMargin : arrow_left) + 'px';
        },

        _showToolbarInline: function () {
            if (!core._isInline) return;

            const toolbar = context.element.toolbar;
            toolbar.style.visibility = 'hidden';
            toolbar.style.display = 'block';
            core._inlineToolbarAttr.width = toolbar.style.width = context.option.toolbarWidth;
            core._inlineToolbarAttr.top = toolbar.style.top = (-1 - toolbar.offsetHeight) + 'px';
            
            if (typeof userFunction.showInline === 'function') userFunction.showInline(toolbar, context);

            event.onScroll_window();
            core._inlineToolbarAttr.isShow = true;
            toolbar.style.visibility = '';
        },

        _hideToolbar: function () {
            if (!core._notHideToolbar && !core._variable.isFullScreen) {
                context.element.toolbar.style.display = 'none';
                core._inlineToolbarAttr.isShow = false;
            }
        },

        _onShortcutKey: false,
        onKeyDown_wysiwyg: function (e) {
            const keyCode = e.keyCode;
            const shift = e.shiftKey;
            const ctrl = e.ctrlKey || e.metaKey;
            const alt = e.altKey;

            if (!event._directionKeyCode.test(keyCode)) _w.setTimeout(core._resourcesStateChange);
            if (core._isBalloon) {
                event._hideToolbar();
            }

            /** Shortcuts */
            if (ctrl && event._shortcutCommand(keyCode, shift)) {
                event._onShortcutKey = true;
                e.preventDefault();
                e.stopPropagation();
                return false;
            } else if (event._onShortcutKey) {
                event._onShortcutKey = false;
            }

            /** default key action */
            const selectionNode = core.getSelectionNode();
            const range = core.getRange();
            const selectRange = !range.collapsed || range.startContainer !== range.endContainer;
            const resizingName = core._resizingName;
            let formatEl = util.getFormatElement(selectionNode) || selectionNode;
            let rangeEl = util.getRangeFormatElement(selectionNode);

            switch (keyCode) {
                case 8: /** backspace key */
                    if (selectRange) break;
                    if (resizingName) {
                        e.preventDefault();
                        e.stopPropagation();
                        core.plugins[resizingName].destroy.call(core);
                        break;
                    }

                    if (util.isWysiwygDiv(selectionNode.parentNode) && !selectionNode.previousSibling && util.isFormatElement(selectionNode) && !util.isListCell(selectionNode)) {
                        e.preventDefault();
                        e.stopPropagation();
                        selectionNode.innerHTML = '<br>';
                        if (!selectionNode.nextElementSibling) {
                            const attrs = selectionNode.attributes;
                            while (attrs[0]) {
                                selectionNode.removeAttribute(attrs[0].name);
                            }
                            core.execCommand('formatBlock', false, 'P');
                        }
                        return false;
                    }

                    const commonCon = range.commonAncestorContainer;
                    if (range.startOffset === 0 && range.endOffset === 0) {
                        if (rangeEl && formatEl && !util.isCell(rangeEl) && !/^FIGCAPTION$/i.test(rangeEl.nodeName)) {
                            let detach = true;
                            let comm = commonCon;
                            while (comm && comm !== rangeEl && !util.isWysiwygDiv(comm)) {
                                if (comm.previousSibling) {
                                    detach = false;
                                    break;
                                }
                                comm = comm.parentNode;
                            }

                            if (detach && rangeEl.parentNode) {
                                e.preventDefault();
                                core.detachRangeFormatElement(rangeEl, (util.isListCell(formatEl) ? [formatEl] : null), null, false, false);
                                break;
                            }	
                        }	

                        if (util.isComponent(commonCon.previousSibling) || (commonCon.nodeType === 3 && !commonCon.previousSibling && range.startOffset === 0 && range.endOffset === 0 && util.isComponent(formatEl.previousSibling))) {
                            const previousEl = formatEl.previousSibling;
                            util.removeItem(previousEl);
                        }
                    }

                    break;
                case 46: /** delete key */
                    if (resizingName) {
                        e.preventDefault();
                        e.stopPropagation();
                        core.plugins[resizingName].destroy.call(core);
                        break;
                    }

                    if ((util.isFormatElement(selectionNode) || selectionNode.nextSibling === null) && range.startOffset === selectionNode.textContent.length) {
                        let nextEl = formatEl.nextElementSibling;
                        if (util.isComponent(nextEl)) {
                            e.preventDefault();

                            if (util.onlyZeroWidthSpace(formatEl)) {
                                util.removeItem(formatEl);
                            }

                            if (util.hasClass(nextEl, 'se-component') || /^IMG$/i.test(nextEl.nodeName)) {
                                e.stopPropagation();
                                if (util.hasClass(nextEl, 'se-image-container') || /^IMG$/i.test(nextEl.nodeName)) {
                                    nextEl = /^IMG$/i.test(nextEl.nodeName) ? nextEl : nextEl.querySelector('img');
                                    core.selectComponent(nextEl, 'image');
                                } else if (util.hasClass(nextEl, 'se-video-container')) {
                                    core.selectComponent(nextEl.querySelector('iframe'), 'video');
                                }
                            }

                            break;
                        }
                    }
                    
                    break;
                case 9: /** tab key */
                    e.preventDefault();
                    if (ctrl || alt || util.isWysiwygDiv(selectionNode)) break;

                    core.controllersOff();

                    let currentNode = selectionNode;
                    while (!util.isCell(currentNode) && !util.isWysiwygDiv(currentNode)) {
                        currentNode = currentNode.parentNode;
                    }

                    if (currentNode && util.isCell(currentNode)) {
                        const table = util.getParentElement(currentNode, 'table');
                        const cells = util.getListChildren(table, util.isCell);
                        let idx = shift ? util.prevIdx(cells, currentNode) : util.nextIdx(cells, currentNode);

                        if (idx === cells.length && !shift) idx = 0;
                        if (idx === -1 && shift) idx = cells.length - 1;

                        const moveCell = cells[idx];
                        if (!moveCell) return false;

                        core.setRange(moveCell, 0, moveCell, 0);
                        break;
                    }

                    const lines = core.getSelectedElements();

                    if (!shift) {
                        const tabText = util.createTextNode(new _w.Array(core._variable.tabSize + 1).join('\u00A0'));
                        if (lines.length === 1) {
                            const r = core.insertNode(tabText);
                            core.setRange(tabText, r.endOffset, tabText, r.endOffset);
                        } else {
                            const len = lines.length - 1;
                            for (let i = 0, child; i <= len; i++) {
                                child = lines[i].firstChild;
                                if (!child) continue;

                                if (util.isBreak(child)) {
                                    lines[i].insertBefore(tabText.cloneNode(false), child);
                                } else {
                                    child.textContent = tabText.textContent + child.textContent;
                                }
                            }

                            const firstChild = util.getChildElement(lines[0], 'text', false);
                            const endChild = util.getChildElement(lines[len], 'text', true);
                            if (firstChild && endChild) core.setRange(firstChild, 0, endChild, endChild.textContent.length);
                        }
                    } else {
                        const len = lines.length - 1;
                        for (let i = 0, child; i <= len; i++) {
                            child = lines[i].firstChild;
                            if (!child) continue;

                            if (/^\s{1,4}$/.test(child.textContent)) {
                                util.removeItem(child);
                            } else if (/^\s{1,4}/.test(child.textContent)) {
                                child.textContent = child.textContent.replace(/^\s{1,4}/, '');
                            }
                        }

                        const firstChild = util.getChildElement(lines[0], 'text', false);
                        const endChild = util.getChildElement(lines[len], 'text', true);
                        if (firstChild && endChild) core.setRange(firstChild, 0, endChild, endChild.textContent.length);
                    }
                    
                    break;
                case 13: /** enter key */
                    if (selectRange) break;

                    const figcaption = util.getParentElement(rangeEl, 'FIGCAPTION');
                    if (rangeEl && formatEl && !util.isCell(rangeEl) && !/^FIGCAPTION$/i.test(rangeEl.nodeName)) {
                        const range = core.getRange();
                        if (!range.commonAncestorContainer.nextElementSibling && util.onlyZeroWidthSpace(formatEl.innerText.trim())) {
                            e.preventDefault();
                            const newEl = core.appendFormatTag(rangeEl, util.isCell(rangeEl.parentNode) ? 'DIV' : util.isListCell(formatEl) ? 'P' : null);
                            util.copyFormatAttributes(newEl, formatEl);
                            util.removeItemAllParents(formatEl);
                            core.setRange(newEl, 1, newEl, 1);
                            break;
                        }
                    }

                    if (rangeEl && figcaption && util.getParentElement(rangeEl, util.isList)) {
                        e.preventDefault();
                        formatEl = core.appendFormatTag(formatEl);
                        core.setRange(formatEl, 0, formatEl, 0);
                    }

                    if (resizingName) {
                        e.preventDefault();
                        e.stopPropagation();
                        const compContext = context[resizingName];
                        const container = compContext._container;
                        const sibling = container.previousElementSibling || container.nextElementSibling;

                        let newEl = null;
                        if (util.isListCell(container.parentNode)) {
                            newEl = util.createElement('BR');
                        } else {
                            newEl = util.createElement(util.isFormatElement(sibling) ? sibling.nodeName : 'P');
                            newEl.innerHTML = '<br>';
                        }

                        container.parentNode.insertBefore(newEl, container);
                        
                        core.callPlugin(resizingName, function () {
                            const size = core.plugins.resizing.call_controller_resize.call(core, compContext._element, resizingName);
                            core.plugins[resizingName].onModifyMode.call(core, compContext._element, size);
                        });
                    }
                    
                    break;
            }

            if (shift && /16/.test(keyCode)) {
                e.preventDefault();
                e.stopPropagation();
                const tablePlugin = core.plugins.table;
                if (tablePlugin && !tablePlugin._shift && !tablePlugin._ref) {
                    const cell = util.getParentElement(formatEl, util.isCell);
                    if (cell) {
                        tablePlugin.onTableCellMultiSelect.call(core, cell, true);
                        return;
                    }
                }
            }

            const textKey = !ctrl && !alt && !selectRange && !event._nonTextKeyCode.test(keyCode);
            if (!core._charCount(1, textKey)) {
                if (textKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }

            if (userFunction.onKeyDown) userFunction.onKeyDown(e);
        },

        onKeyUp_wysiwyg: function (e) {
            if (event._onShortcutKey) return;
            core._editorRange();
            const keyCode = e.keyCode;
            const ctrl = e.ctrlKey || e.metaKey || keyCode === 91 || keyCode === 92;
            const alt = e.altKey;
            let selectionNode = core.getSelectionNode();

            if (core._isBalloon && !core.getRange().collapsed) {
                event._showToolbarBalloon();
                return;
            }

            /** when format tag deleted */
            if (keyCode === 8 && util.isWysiwygDiv(selectionNode) && selectionNode.textContent === '') {
                e.preventDefault();
                e.stopPropagation();

                selectionNode.innerHTML = '';

                const oFormatTag = util.createElement(util.isFormatElement(core._variable.currentNodes[0]) ? core._variable.currentNodes[0] : 'P');
                oFormatTag.innerHTML = '<br>';

                selectionNode.appendChild(oFormatTag);
                core.setRange(oFormatTag, 0, oFormatTag, 0);
                event._applyTagEffects();

                core._checkComponents();
                core.history.push(false);
                return;
            }

            const formatEl = util.getFormatElement(selectionNode);
            const rangeEl = util.getRangeFormatElement(selectionNode);
            if (!formatEl || formatEl === rangeEl) {
                core.execCommand('formatBlock', false, util.isRangeFormatElement(rangeEl) ? 'DIV' : 'P');
                core.focus();
                selectionNode = core.getSelectionNode();
            }

            if (event._directionKeyCode.test(keyCode)) {
                event._applyTagEffects();
            }

            core._checkComponents();

            const historyKey = !ctrl && !alt && !event._historyIgnoreKeyCode.test(keyCode);
            if (historyKey && util.zeroWidthRegExp.test(selectionNode.textContent)) {
                const range = core.getRange();
                let so = range.startOffset, eo = range.endOffset;
                const frontZeroWidthCnt = (selectionNode.textContent.substring(0, eo).match(event._frontZeroWidthReg) || '').length;
                so = range.startOffset - frontZeroWidthCnt;
                eo = range.endOffset - frontZeroWidthCnt;
                selectionNode.textContent = selectionNode.textContent.replace(util.zeroWidthRegExp, '');
                core.setRange(selectionNode, so < 0 ? 0 : so, selectionNode, eo < 0 ? 0 : eo);
            }

            const textKey = !ctrl && !alt && !event._nonTextKeyCode.test(keyCode);
            if (!core._charCount(1, textKey)) {
                if (e.key.length === 1) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }

            // history stack
            if (historyKey) {
                core.history.push(true);
            }

            if (userFunction.onKeyUp) userFunction.onKeyUp(e);
        },

        onScroll_wysiwyg: function (e) {
            core.controllersOff();
            if (core._isBalloon) event._hideToolbar();
            if (userFunction.onScroll) userFunction.onScroll(e);
        },

        onMouseDown_resizingBar: function (e) {
            e.stopPropagation();

            core._variable.resizeClientY = e.clientY;
            context.element.resizeBackground.style.display = 'block';

            function closureFunc() {
                context.element.resizeBackground.style.display = 'none';
                _d.removeEventListener('mousemove', event._resize_editor);
                _d.removeEventListener('mouseup', closureFunc);
            }

            _d.addEventListener('mousemove', event._resize_editor);
            _d.addEventListener('mouseup', closureFunc);
        },

        _resize_editor: function (e) {
            const resizeInterval = context.element.editorArea.offsetHeight + (e.clientY - core._variable.resizeClientY);
            context.element.wysiwygFrame.style.height = context.element.code.style.height = (resizeInterval < core._variable.minResizingSize ? core._variable.minResizingSize : resizeInterval) + 'px';
            core._variable.resizeClientY = e.clientY;
        },

        onResize_window: function () {
            core.controllersOff();
            if (context.element.toolbar.offsetWidth === 0) return;

            if (core._variable.isFullScreen) {
                core._variable.innerHeight_fullScreen += (_w.innerHeight - context.element.toolbar.offsetHeight) - core._variable.innerHeight_fullScreen;
                context.element.editorArea.style.height = core._variable.innerHeight_fullScreen + 'px';
                return;
            }

            if (core._variable.isCodeView && core._isInline) {
                event._showToolbarInline();
                return;
            }
            
            core._iframeAutoHeight();

            if (core._sticky) {
                context.element.toolbar.style.width = (context.element.topArea.offsetWidth - 2) + 'px';
                event.onScroll_window();
            }
        },

        onScroll_window: function () {
            if (core._variable.isFullScreen || context.element.toolbar.offsetWidth === 0 || context.option.stickyToolbar < 0) return;

            const element = context.element;
            const editorHeight = element.editorArea.offsetHeight;
            const y = (this.scrollY || _d.documentElement.scrollTop) + context.option.stickyToolbar;
            const editorTop = event._getStickyOffsetTop() - (core._isInline ? element.toolbar.offsetHeight : 0);
            
            if (y < editorTop) {
                event._offStickyToolbar();
            }
            else if (y + core._variable.minResizingSize >= editorHeight + editorTop) {
                if (!core._sticky) event._onStickyToolbar();
                element.toolbar.style.top = (editorHeight + editorTop + context.option.stickyToolbar -y - core._variable.minResizingSize) + 'px';
            }
            else if (y >= editorTop) {
                event._onStickyToolbar();
            }
        },

        _getStickyOffsetTop: function () {
            let offsetEl = context.element.topArea;
            let offsetTop = 0;

            while (offsetEl) {
                offsetTop += offsetEl.offsetTop;
                offsetEl = offsetEl.offsetParent;
            }

            return offsetTop;
        },

        _onStickyToolbar: function () {
            const element = context.element;

            if (!core._isInline) {
                element._stickyDummy.style.height = element.toolbar.offsetHeight + 'px';
                element._stickyDummy.style.display = 'block';
            }

            element.toolbar.style.top = context.option.stickyToolbar + 'px';
            element.toolbar.style.width = core._isInline ? core._inlineToolbarAttr.width : element.toolbar.offsetWidth + 'px';
            util.addClass(element.toolbar, 'se-toolbar-sticky');
            core._sticky = true;
        },

        _offStickyToolbar: function () {
            const element = context.element;

            element._stickyDummy.style.display = 'none';
            element.toolbar.style.top = core._isInline ? core._inlineToolbarAttr.top : '';
            element.toolbar.style.width = core._isInline ? core._inlineToolbarAttr.width : '';
            element.editorArea.style.marginTop = '';

            util.removeClass(element.toolbar, 'se-toolbar-sticky');
            core._sticky = false;
        },

        _codeViewAutoHeight: function () {
            context.element.code.style.height = context.element.code.scrollHeight + 'px';
        },

        onPaste_wysiwyg: function (e) {
            const clipboardData = e.clipboardData;
            if (!clipboardData) return true;

            const maxCharCount = core._charCount(clipboardData.getData('text/plain').length, true);
            const cleanData = util.cleanHTML(clipboardData.getData('text/html'));

            if (typeof userFunction.onPaste === 'function' && !userFunction.onPaste(e, cleanData, maxCharCount)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            if (!maxCharCount) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            if (cleanData) {
                e.stopPropagation();
                e.preventDefault();
                core.execCommand('insertHTML', false, cleanData);
            } else {
                // history stack
                core.history.push(true);
            }
        },

        onCut_wysiwyg: function () {
            _w.setTimeout(function () {
                core._resourcesStateChange();
                core._charCount(0, false);
                // history stack
                core.history.push(false);
            });
        },

        onDragOver_wysiwyg: function (e) {
            e.preventDefault();
        },

        onDrop_wysiwyg: function (e) {
            const dataTransfer = e.dataTransfer;
            if (!dataTransfer) return true;

            // files
            const files = dataTransfer.files;
            if (files.length > 0 && core.plugins.image) {
                event._setDropLocationSelection(e);
                core.callPlugin('image', function () {
                    context.image.imgInputFile.files = files;
                    core.plugins.image.onRender_imgInput.call(core);
                    context.image.imgInputFile.files = null;
                });
            // check char count
            } else if (!core._charCount(dataTransfer.getData('text/plain').length, true)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            // html paste
            } else {
                const cleanData = util.cleanHTML(dataTransfer.getData('text/html'));
                if (cleanData) {
                    event._setDropLocationSelection(e);
                    core.execCommand('insertHTML', false, cleanData);
                }
            }

            if (userFunction.onDrop) userFunction.onDrop(e);
        },

        _setDropLocationSelection: function (e) {
            e.stopPropagation();
            e.preventDefault();
            
            const range = core.getRange();
            core.setRange(range.startContainer, range.startOffset, range.endContainer, range.endOffset);
        },

        _onChange_historyStack: function () {
            if (context.tool.save) context.tool.save.removeAttribute('disabled');
            if (userFunction.onChange) userFunction.onChange(core.getContents(true));
        },

        _addEvent: function () {
            const eventWysiwyg = _options.iframe ? core._ww : context.element.wysiwyg;

            /** toolbar event */
            context.element.toolbar.addEventListener('mousedown', event.onMouseDown_toolbar, false);
            context.element.toolbar.addEventListener('click', event.onClick_toolbar, false);
            /** editor area */
            eventWysiwyg.addEventListener('click', event.onClick_wysiwyg, false);
            eventWysiwyg.addEventListener('keydown', event.onKeyDown_wysiwyg, false);
            eventWysiwyg.addEventListener('keyup', event.onKeyUp_wysiwyg, false);
            eventWysiwyg.addEventListener('paste', event.onPaste_wysiwyg, false);
            eventWysiwyg.addEventListener('cut', event.onCut_wysiwyg, false);
            eventWysiwyg.addEventListener('dragover', event.onDragOver_wysiwyg, false);
            eventWysiwyg.addEventListener('drop', event.onDrop_wysiwyg, false);
            eventWysiwyg.addEventListener('scroll', event.onScroll_wysiwyg, false);

            /** Events are registered only a balloon mode or when there is a table plugin. */
            if (core._isBalloon || core.plugins.table) {
                eventWysiwyg.addEventListener('mousedown', event.onMouseDown_wysiwyg, false);
            }

            /** Events are registered only when there is a table plugin.  */
            if (core.plugins.table) {
                eventWysiwyg.addEventListener('touchstart', event.onMouseDown_wysiwyg, {passive: true, useCapture: false});
            }
            
            /** code view area auto line */
            if (context.option.height === 'auto' && !context.option.codeMirrorEditor) {
                context.element.code.addEventListener('keydown', event._codeViewAutoHeight, false);
                context.element.code.addEventListener('keyup', event._codeViewAutoHeight, false);
                context.element.code.addEventListener('paste', event._codeViewAutoHeight, false);
            }

            /** resizingBar */
            if (context.element.resizingBar) {
                if (/\d+/.test(context.option.height)) {
                    context.element.resizingBar.addEventListener('mousedown', event.onMouseDown_resizingBar, false);
                } else {
                    util.addClass(context.element.resizingBar, 'se-resizing-none');
                }
            }

            /** inline editor */
            if (core._isInline) {
                eventWysiwyg.addEventListener('focus', event._showToolbarInline, false);
            }

            /** inline, balloon editor */
            if (core._isInline || core._isBalloon) {
                eventWysiwyg.addEventListener('blur', event._hideToolbar, false);
            }
            
            /** window event */
            _w.removeEventListener('resize', event.onResize_window);
            _w.removeEventListener('scroll', event.onScroll_window);

            _w.addEventListener('resize', event.onResize_window, false);
            if (context.option.stickyToolbar > -1) {
                _w.addEventListener('scroll', event.onScroll_window, false);
            }
        },

        _removeEvent: function () {
            const eventWysiwyg = _options.iframe ? core._ww : context.element.wysiwyg;

            context.element.toolbar.removeEventListener('mousedown', event.onMouseDown_toolbar);
            context.element.toolbar.removeEventListener('click', event.onClick_toolbar);

            eventWysiwyg.removeEventListener('click', event.onClick_wysiwyg);
            eventWysiwyg.removeEventListener('keydown', event.onKeyDown_wysiwyg);
            eventWysiwyg.removeEventListener('keyup', event.onKeyUp_wysiwyg);
            eventWysiwyg.removeEventListener('paste', event.onPaste_wysiwyg);
            eventWysiwyg.removeEventListener('cut', event.onCut_wysiwyg);
            eventWysiwyg.removeEventListener('dragover', event.onDragOver_wysiwyg);
            eventWysiwyg.removeEventListener('drop', event.onDrop_wysiwyg);
            eventWysiwyg.removeEventListener('scroll', event.onScroll_wysiwyg);
            
            eventWysiwyg.removeEventListener('mousedown', event.onMouseDown_wysiwyg);
            eventWysiwyg.removeEventListener('touchstart', event.onMouseDown_wysiwyg, {passive: true, useCapture: false});
            
            eventWysiwyg.removeEventListener('focus', event._showToolbarInline);
            eventWysiwyg.removeEventListener('blur', event._hideToolbar);

            context.element.code.removeEventListener('keydown', event._codeViewAutoHeight);
            context.element.code.removeEventListener('keyup', event._codeViewAutoHeight);
            context.element.code.removeEventListener('paste', event._codeViewAutoHeight);
            
            if (context.element.resizingBar) {
                context.element.resizingBar.removeEventListener('mousedown', event.onMouseDown_resizingBar);
            }
            
            _w.removeEventListener('resize', event.onResize_window);
            _w.removeEventListener('scroll', event.onScroll_window);
        }
    };

    /** User function */
    const userFunction = {
        /**
         * @description Core, Util object
         */
        core: core,
        util: util,

        /**
         * @description Event functions
         * @param {Object} event Event Object
         */
        onload: null,
        onScroll: null,
        onClick: null,
        onKeyDown: null,
        onKeyUp: null,
        onDrop: null,
        onChange: null,
        onPaste: null,
        showInline: null,

        /**
         * @description Called when the image is uploaded or the uploaded image is deleted
         * @param {Element} targetImgElement Current img element
         * @param {Number} index Uploaded index
         * @param {Boolean} isDelete Whether or not it was called after the delete operation
         * @param {Object} imageInfo Image info object
         */
        onImageUpload: null,

        /**
         * @description Called when the image is upload failed
         * @param {String} errorMessage Error message
         * @param {Object} result Result info Object
         */
        onImageUploadError: null,

        /**
         * @description Add or reset option property
         * @param {Object} options Options
         */
        setOptions: function (options) {
            event._removeEvent();

            core.plugins = options.plugins || core.plugins;
            const mergeOptions = [context.option, options].reduce(function (init, option) {
                Object.keys(option).forEach(function (key) {
                    init[key] = option[key];
                });
                return init;
            }, {});

            const cons = lib_constructor._setOptions(mergeOptions, context, core.plugins, context.option);

            if (cons.callButtons) {
                pluginCallButtons = cons.callButtons;
                core.initPlugins = {};
            }

            if (cons.plugins) {
                core.plugins = plugins = cons.plugins;
            }

            // reset context
            const el = context.element;
            const constructed = {
                _top: el.topArea,
                _relative: el.relative,
                _toolBar: el.toolbar,
                _editorArea: el.editorArea,
                _wysiwygArea: el.wysiwygFrame,
                _codeArea: el.code,
                _placeholder: el.placeholder,
                _resizingBar: el.resizingBar,
                _navigation: el.navigation,
                _charCounter: el.charCounter,
                _loading: el.loading,
                _resizeBack: el.resizeBackground,
                _stickyDummy: el._stickyDummy,
                _arrow: el._arrow
            };
            
            _options = mergeOptions;
            core.lang = lang = _options.lang;
            core.context = context = lib_context(context.element.originElement, constructed, _options);

            core._imagesInfoReset = true;
            core._init(true);
            event._addEvent();
            core._charCount(0, false);

            event._offStickyToolbar();
            event.onResize_window();
            
            core.focus();
        },

        /**
         * @description Open a notice area
         * @param {String} message Notice message
         */
        noticeOpen: function (message) {
            core.addModule([notice["a" /* default */]]);
            notice["a" /* default */].open.call(core, message);
        },

        /**
         * @description Close a notice area
         */
        noticeClose: function () {
            core.addModule([notice["a" /* default */]]);
            notice["a" /* default */].close.call(core);
        },

        /**
         * @description Copying the contents of the editor to the original textarea
         */
        save: function () {
            context.element.originElement.value = core.getContents(false);
        },

        /**
         * @description Gets the suneditor's context object. Contains settings, plugins, and cached element objects
         * @returns {Object}
         */
        getContext: function () {
            return context;
        },

        /**
         * @description Gets the contents of the suneditor
         * @param {Boolean} onlyContents - Return only the contents of the body without headers when the "fullPage" option is true
         * @returns {String}
         */
        getContents: function (onlyContents) {
            return core.getContents(onlyContents);
        },

        /**
         * @description Gets uploaded images informations
         * @returns {Array}
         */
        getImagesInfo: function () {
            return core._variable._imagesInfo;
        },

        /**
         * @description Upload images using image plugin
         * @param {FileList} files FileList
         */
        insertImage: function (files) {
            if (!core.plugins.image || !files) return;

            if (!core.initPlugins.image) core.callPlugin('image', core.plugins.image.submitAction.bind(core, files));
            else core.plugins.image.submitAction.call(core, files);
            core.focus();
        },

        /**
         * @description Inserts an HTML element or HTML string or plain string at the current cursor position
         * @param {Element|String} html HTML Element or HTML string or plain string
         */
        insertHTML: function (html) {
            if (!html.nodeType || html.nodeType !== 1) {
                const template = util.createElement('DIV');
                template.innerHTML = html;
                html = template.firstChild || template.content.firstChild;
            }

            let afterNode = null;
            if (util.isFormatElement(html) || /^(IMG|IFRAME)$/i.test(html.nodeName)) {
                afterNode = util.getFormatElement(core.getSelectionNode());
            }

            if (util.isComponent(html)) {
                core.insertComponent(html, false);
            } else {
                core.insertNode(html, afterNode);
            }
            
            core.focus();
        },

        /**
         * @description Change the contents of the suneditor
         * @param {String} contents Contents to Input
         */
        setContents: function (contents) {
            core.setContents(contents);
        },

        /**
         * @description Add contents to the suneditor
         * @param {String} contents Contents to Input
         */
        appendContents: function (contents) {
            const convertValue = util.convertContentsForEditor(contents);
            
            if (!core._variable.isCodeView) {
                context.element.wysiwyg.innerHTML += convertValue;
            } else {
                core._setCodeView(core._getCodeView() + '\n' + util.convertHTMLForCodeView(convertValue, core._variable.codeIndent));
            }

            // history stack
            core.history.push(false);
        },

        /**
         * @description Disable the suneditor
         */
        disabled: function () {
            context.tool.cover.style.display = 'block';
            context.element.wysiwyg.setAttribute('contenteditable', false);

            if (context.option.codeMirrorEditor) {
                context.option.codeMirrorEditor.setOption('readOnly', true);
            } else {
                context.element.code.setAttribute('disabled', 'disabled');
            }
        },

        /**
         * @description Enable the suneditor
         */
        enabled: function () {
            context.tool.cover.style.display = 'none';
            context.element.wysiwyg.setAttribute('contenteditable', true);

            if (context.option.codeMirrorEditor) {
                context.option.codeMirrorEditor.setOption('readOnly', false);
            } else {
                context.element.code.removeAttribute('disabled');
            }
        },

        /**
         * @description Show the suneditor
         */
        show: function () {
            const topAreaStyle = context.element.topArea.style;
            if (topAreaStyle.display === 'none') topAreaStyle.display = context.option.display;
        },

        /**
         * @description Hide the suneditor
         */
        hide: function () {
            context.element.topArea.style.display = 'none';
        },

        /**
         * @description Destroy the suneditor
         */
        destroy: function () {
            /** remove event listeners */
            event._removeEvent();
            
            /** remove element */
            util.removeItem(context.element.topArea);

            /** remove object reference */
            _w.Object.keys(core).forEach(function(key) {delete core[key];});
            _w.Object.keys(event).forEach(function(key) {delete event[key];});
            _w.Object.keys(context).forEach(function(key) {delete context[key];});
            _w.Object.keys(pluginCallButtons).forEach(function(key) {delete pluginCallButtons[key];});
            
            /** remove user object */
            _w.Object.keys(this).forEach(function(key) {delete this[key];}.bind(this));
        },

        /**
         * @description Toolbar methods
         */
        toolbar: {
            /**
             * @description Disable the toolbar
             */
            disabled: function () {
                context.tool.cover.style.display = 'block';
            },

            /**
             * @description Enable the toolbar
             */
            enabled: function () {
                context.tool.cover.style.display = 'none';
            },

            /**
             * @description Show the toolbar
             */
            show: function () {
                if (core._isInline) {
                    event._showToolbarInline();
                } else {
                    context.element.toolbar.style.display = '';
                    context.element._stickyDummy.style.display = '';
                }
            },

            /**
             * @description Hide the toolbar
             */
            hide: function () {
                if (core._isInline) {
                    event._hideToolbar();
                } else {
                    context.element.toolbar.style.display = 'none';
                    context.element._stickyDummy.style.display = 'none';
                }
            },
        }
    };

    /** initialize core and add event listeners */
    core._init(false);
    event._addEvent();
    core._charCount(0, false);

    return userFunction;
});
// CONCATENATED MODULE: ./node_modules/suneditor/src/suneditor.js
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */







/* harmony default export */ var suneditor = ({
    /**
     * @description Returns the create function with preset options.
     * If the options overlap, the options of the 'create' function take precedence.
     * @param {Json} options Initialization options
     * @returns {function}
     */
    init: function (init_options) {
        return {
            create: function (idOrElement, options) {
                return this.create(idOrElement, options, init_options);
            }.bind(this)
        };
    },

    /**
     * @description Create the suneditor
     * @param {String|Element} idOrElement textarea Id or textarea element
     * @param {Json} options user options
     * @returns {{save: save, getContext: getContext, getContent: getContent, setContent: setContent, appendContent: appendContent, disabled: disabled, enabled: enabled, show: show, hide: hide, destroy: destroy}}
     */
    create: function (idOrElement, options, _init_options) {
        if (typeof options !== 'object') options = {};
        if (_init_options) {
            options =  [_init_options, options].reduce(function (init, option) {
                            Object.keys(option).forEach(function (key) {
                                if (key === 'plugins' && option[key] && init[key]) {
                                    let i = init[key], o = option[key];
                                    i = i.length ? i : Object.keys(i).map(function(name) { return i[name]; });
                                    o = o.length ? o : Object.keys(o).map(function(name) { return o[name]; });
                                    init[key] = (o.filter(function(val) { return i.indexOf(val) === -1; })).concat(i);
                                } else {
                                    init[key] = option[key];
                                }
                            });
                            return init;
                        }, {});
        }
        
        const element = typeof idOrElement === 'string' ? document.getElementById(idOrElement) : idOrElement;

        if (!element) {
            if (typeof idOrElement === 'string') {
                throw Error('[SUNEDITOR.create.fail] The element for that id was not found (ID:"' + idOrElement + '")');
            }

            throw Error('[SUNEDITOR.create.fail] suneditor requires textarea\'s element or id value');
        }

        const cons = lib_constructor.init(element, options);

        if (cons.constructed._top.id && document.getElementById(cons.constructed._top.id)) {
            throw Error('[SUNEDITOR.create.fail] The ID of the suneditor you are trying to create already exists (ID:"' + cons.constructed._top.id + '")');
        }

        element.style.display = 'none';
        cons.constructed._top.style.display = 'block';

        /** Create to sibling node */
        if (typeof element.nextElementSibling === 'object') {
            element.parentNode.insertBefore(cons.constructed._top, element.nextElementSibling);
        } else {
            element.parentNode.appendChild(cons.constructed._top);
        }

        return lib_core(lib_context(element, cons.constructed, cons.options), cons.pluginCallButtons, cons.plugins, cons.options.lang, options);
    }
});

// CONCATENATED MODULE: ./misc/getPlugins.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getPlugins = function getPlugins(_ref) {
  var buttonList = _ref.buttonList;
  if (!buttonList) return undefined;
  if (!isArray(buttonList)) throw new Error("Button List must be of type array");else {
    var pluginList = [];
    buttonList = flatten(buttonList);
    if (buttonList.indexOf("align") >= 0) pluginList.push(__webpack_require__(7).default);
    if (buttonList.indexOf("font") >= 0) pluginList.push(__webpack_require__(8).default);
    if (buttonList.indexOf("fontColor") >= 0) pluginList.push(__webpack_require__(9).default);
    if (buttonList.indexOf("fontSize") >= 0) pluginList.push(__webpack_require__(10).default);
    if (buttonList.indexOf("formatBlock") >= 0) pluginList.push(__webpack_require__(11).default);
    if (buttonList.indexOf("hiliteColor") >= 0) pluginList.push(__webpack_require__(12).default);
    if (buttonList.indexOf("horizontalRule") >= 0) pluginList.push(__webpack_require__(13).default);
    if (buttonList.indexOf("lineHeight") >= 0) pluginList.push(__webpack_require__(14).default);
    if (buttonList.indexOf("list") >= 0) pluginList.push(__webpack_require__(15).default);
    if (buttonList.indexOf("paragraphStyle") >= 0) pluginList.push(__webpack_require__(16).default);
    if (buttonList.indexOf("table") >= 0) pluginList.push(__webpack_require__(17).default);
    if (buttonList.indexOf("template") >= 0) pluginList.push(__webpack_require__(18).default);
    if (buttonList.indexOf("textStyle") >= 0) pluginList.push(__webpack_require__(19).default);
    if (buttonList.indexOf("image") >= 0) pluginList.push(__webpack_require__(20).default);
    if (buttonList.indexOf("link") >= 0) pluginList.push(__webpack_require__(21).default);
    if (buttonList.indexOf("video") >= 0) pluginList.push(__webpack_require__(22).default);
    return pluginList;
  }
};

var flatten = function flatten(arr) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!isArray(arr)) {
    return [].concat(_toConsumableArray(result), [arr]);
  }

  for (var a = 0; a < arr.length; a++) {
    result = flatten(arr[a], result);
  }

  return result;
};

var isArray = function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
};

/* harmony default export */ var misc_getPlugins = (getPlugins);
// CONCATENATED MODULE: ./misc/getLanguage.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getLanguage = function getLanguage(lang) {
  switch (_typeof(lang)) {
    case 'object':
      return lang;

    case 'string':
      switch (lang) {
        case 'en':
          return __webpack_require__(3);

        case 'da':
          return __webpack_require__(23);

        case 'de':
          return __webpack_require__(24);

        case 'es':
          return __webpack_require__(25);

        case 'fr':
          return __webpack_require__(26);

        case 'ja':
          return __webpack_require__(27);

        case 'ko':
          return __webpack_require__(28);

        case 'pt_br':
          return __webpack_require__(29);

        case 'ru':
          return __webpack_require__(30);

        case 'zh_cn':
          return __webpack_require__(31);

        default:
          return __webpack_require__(3);
      }

  }

  return __webpack_require__(3);
};

/* harmony default export */ var misc_getLanguage = (getLanguage);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(0);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ./SunEditor.js
function SunEditor_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SunEditor_typeof = function _typeof(obj) { return typeof obj; }; } else { SunEditor_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SunEditor_typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (SunEditor_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






/**
 * @augments {Component<{  onChange:Function,  onScroll:Function,  onClick:Function,  onKeyUp:Function,  onKeyDown:Function,  onDrop:Function,  onImageUpload:Function,  onImageUploadError:Function,  setOptions:object,  setContents:string,  appendContents:string,  enable:boolean,  disable:boolean,  hide:boolean,  show:boolean,  lang:oneOfType(object,string])>}
 */

var SunEditor_SunEditor = /*#__PURE__*/function (_Component) {
  _inherits(SunEditor, _Component);

  function SunEditor(props) {
    var _this;

    _classCallCheck(this, SunEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SunEditor).call(this, props));
    _this.state = {
      id: 'editor' + +Date.now().toString() + Math.random().toString(36).slice(-8)
    };
    return _this;
  }

  _createClass(SunEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          lang = _this$props.lang,
          _this$props$setOption = _this$props.setOptions,
          setOptions = _this$props$setOption === void 0 ? {} : _this$props$setOption,
          _this$props$width = _this$props.width,
          width = _this$props$width === void 0 ? '100%' : _this$props$width;
      var editor = suneditor.create(this.state.id, {
        width: width,
        lang: misc_getLanguage(lang)
      });
      var _this$props2 = this.props,
          insertHTML = _this$props2.insertHTML,
          setContents = _this$props2.setContents,
          appendContents = _this$props2.appendContents,
          disable = _this$props2.disable,
          enable = _this$props2.enable,
          hide = _this$props2.hide,
          show = _this$props2.show,
          _this$props2$showTool = _this$props2.showToolbar,
          showToolbar = _this$props2$showTool === void 0 ? true : _this$props2$showTool,
          _this$props2$enableTo = _this$props2.enableToolbar,
          enableToolbar = _this$props2$enableTo === void 0 ? true : _this$props2$enableTo,
          onScroll = _this$props2.onScroll,
          onClick = _this$props2.onClick,
          onKeyDown = _this$props2.onKeyDown,
          onKeyUp = _this$props2.onKeyUp,
          onDrop = _this$props2.onDrop,
          onChange = _this$props2.onChange,
          onImageUpload = _this$props2.onImageUpload,
          onImageUploadError = _this$props2.onImageUploadError,
          onPaste = _this$props2.onPaste,
          autoFocus = _this$props2.autoFocus,
          placeholder = _this$props2.placeholder;
      if (onChange) editor.onChange = function (content) {
        return onChange(content);
      };
      if (onScroll) editor.onScroll = function (e) {
        return onScroll(e);
      };
      if (onClick) editor.onClick = function (e) {
        return onClick(e);
      };
      if (onKeyUp) editor.onKeyUp = function (e) {
        return onKeyUp(e);
      };
      if (onKeyDown) editor.onKeyDown = function (e) {
        return onKeyDown(e);
      };
      if (onDrop) editor.onDrop = function (e) {
        return onDrop(e);
      };
      if (onPaste) editor.onPaste = function (e, cleanData, maxCharCount) {
        return onPaste(e, cleanData, maxCharCount);
      };
      if (onImageUpload) editor.onImageUpload = function (targetImgElement, index, state, imageInfo, remainingFilesCount) {
        return onImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount);
      };
      if (onImageUploadError) editor.onImageUploadError = function (errorMessage, result) {
        return onImageUploadError(errorMessage, result);
      };
      if (placeholder) setOptions.placeholder = placeholder;
      if (!setOptions.plugins) setOptions.plugins = misc_getPlugins(setOptions);
      console.log(setOptions);
      editor.setOptions(setOptions);
      if (setContents) editor.setContents(setContents);
      if (insertHTML) editor.insertHTML(insertHTML);
      if (appendContents) editor.appendContents(appendContents);
      if (enable === true) editor.enabled();
      if (disable === true) editor.disabled();
      if (hide === true) editor.hide();
      if (show === true) editor.show();
      if (showToolbar === true) editor.toolbar.show();else editor.toolbar.hide();
      if (enableToolbar === true) editor.toolbar.enabled();else editor.toolbar.disabled();
      setTimeout(function () {
        if (autoFocus === false) editor.core.context.element.wysiwyg.blur();else if (autoFocus === true) editor.core.context.element.wysiwyg.focus();
      }, 0);
      this.editor = editor; // Contributed by https://github.com/AramRafeq
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Props compared
      if (prevProps.setContents !== this.props.setContents) {
        this.editor.setContents(this.props.setContents);
      }

      if (prevProps.appendContents !== this.props.appendContents) {
        this.editor.appendContents(this.props.appendContents);
      }

      if (prevProps.enable !== this.props.enable) {
        if (this.props.enable === true) this.editor.enabled();else this.editor.disabled();
      }

      if (prevProps.disable !== this.props.disable) {
        if (this.props.disable === true) this.editor.disabled();else this.editor.enabled();
      }

      if (prevProps.showToolbar !== this.props.showToolbar) {
        if (this.props.showToolbar === true) this.editor.toolbar.show();else this.editor.toolbar.hide(); // showToolbar contributed by https://github.com/nelreina
      }

      if (prevProps.enableToolbar !== this.props.enableToolbar) {
        if (this.props.enableToolbar === true) this.editor.toolbar.enabled();else this.editor.toolbar.disabled();
      }

      if (prevProps.show !== this.props.show) {
        if (this.props.show === true) this.editor.show();else this.editor.hide();
      }

      if (prevProps.hide !== this.props.hide) {
        if (this.props.hide === true) this.editor.hide();else this.editor.show();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.editor) this.editor.destroy(); // Contributed by https://github.com/AramRafeq
    }
  }, {
    key: "render",
    value: function render() {
      return external_react_default.a.createElement("textarea", {
        id: this.state.id,
        cols: "30",
        rows: "10"
      });
    }
  }]);

  return SunEditor;
}(external_react_["Component"]);

SunEditor_SunEditor.propTypes = {
  onChange: prop_types_default.a.func,
  onScroll: prop_types_default.a.func,
  onClick: prop_types_default.a.func,
  onKeyUp: prop_types_default.a.func,
  onKeyDown: prop_types_default.a.func,
  onDrop: prop_types_default.a.func,
  onPaste: prop_types_default.a.func,
  onImageUpload: prop_types_default.a.func,
  onImageUploadError: prop_types_default.a.func,
  setOptions: prop_types_default.a.object,
  setContents: prop_types_default.a.string,
  appendContents: prop_types_default.a.string,
  enable: prop_types_default.a.bool,
  showToolbar: prop_types_default.a.bool,
  enableToolbar: prop_types_default.a.bool,
  disable: prop_types_default.a.bool,
  hide: prop_types_default.a.bool,
  show: prop_types_default.a.bool,
  autoFocus: prop_types_default.a.bool,
  placeholder: prop_types_default.a.string,
  lang: prop_types_default.a.oneOfType([prop_types_default.a.object, prop_types_default.a.string]),
  width: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string])
};
/* harmony default export */ var SunEditor_0 = (SunEditor_SunEditor);
// CONCATENATED MODULE: ./main.js



/* harmony default export */ var main = __webpack_exports__["default"] = (SunEditor_0);

/***/ })
/******/ ]);