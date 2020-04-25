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
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
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
  module.exports = __webpack_require__(33)();
}


/***/ }),
/* 1 */
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
                    throw new Error('SUNEDITOR_MODULES a window with a document');
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    const dialog = {
        name: 'dialog',
        /**
         * @description Constructor
         * @param {Object} core Core object 
         */
        add: function (core) {
            const context = core.context;
            context.dialog = {
                kind: '',
                updateModal: false,
                _closeSignal: false
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
            context.dialog.modal.addEventListener('mousedown', this.onMouseDown_dialog.bind(core));
            context.dialog.modal.addEventListener('click', this.onClick_dialog.bind(core));
            
            /** append html */
            context.element.relative.appendChild(dialog_div);
            
            /** empty memory */
            dialog_div = null, dialog_back = null, dialog_area = null;
        },

        /**
         * @description Event to control the behavior of closing the dialog
         * @param {MouseEvent} e Event object
         */
        onMouseDown_dialog: function (e) {
            if (/se-dialog-inner/.test(e.target.className)) {
                this.context.dialog._closeSignal = true;
            } else {
                this.context.dialog._closeSignal = false;
            }
        },

        /**
         * @description Event to close the window when the outside area of the dialog or close button is click
         * @param {MouseEvent} e Event object
         */
        onClick_dialog: function (e) {
            e.stopPropagation();

            if (/close/.test(e.target.getAttribute('data-command')) || this.context.dialog._closeSignal) {
                this.plugins.dialog.close.call(this);
            }
        },

        /**
         * @description Open a Dialog plugin
         * @param {String} kind Dialog plugin name
         * @param {Boolean} update Whether it will open for update ('image' === this.currentControllerName)
         */
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
        
        /**
         * @description Close a Dialog plugin
         * The plugin's "init" method is called.
         */
        close: function () {
            if (this.plugins.dialog._bindClose) {
                this._d.removeEventListener('keydown', this.plugins.dialog._bindClose);
                this.plugins.dialog._bindClose = null;
            }

            const kind = this.context.dialog.kind;
            this.modalForm.style.display = 'none';
            this.context.dialog.back.style.display = 'none';
            this.context.dialog.modalArea.style.display = 'none';
            this.context.dialog.updateModal = false;
            this.plugins[kind].init.call(this);
            this.context.dialog.kind = '';
            this.modalForm = null;
            this.focus();
        }
    };

    if (typeof noGlobal === typeof undefined) {
        if (!window.SUNEDITOR_MODULES) {
            window.SUNEDITOR_MODULES = {};
        }

        window.SUNEDITOR_MODULES.dialog = dialog;
    }

    return dialog;
}));

/***/ }),
/* 2 */
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
/* 3 */
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
    /**
     * @description Constructor
     * @param {Object} core Core object 
     */
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
        let listDiv = this.createColorList(core, this._makeColorList);

        /** caching */
        context.colorPicker.colorListHTML = listDiv;

        /** empty memory */
        listDiv = null;
    },

    /**
     * @description Create color list
     * @param {Object} core Core object 
     * @param {Function} makeColor this._makeColorList
     * @returns {String} HTML string
     */
    createColorList: function (core, makeColor) {
        const option = core.context.option;
        const lang = core.lang;
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
            for (let i = 0, len = colorList.length, color; i < len; i++) {
                color = colorList[i];
                if (!color) continue;
                
                if (typeof color === 'string') {
                    colorArr.push(color);
                    if (i < len - 1) continue;
                }
                if (colorArr.length > 0) {
                    list += '<div class="se-selector-color">' + makeColor(colorArr) + '</div>';
                    colorArr = [];
                }
                if (typeof color === 'object') {
                    list += '<div class="se-selector-color">' + makeColor(color) + '</div>';
                }
            }
            list += '' +
            '<form class="se-submenu-form-group">' +
                '<input type="text" maxlength="9" class="_se_color_picker_input se-color-input"/>' +
                '<button type="submit" class="se-btn-primary se-tooltip _se_color_picker_submit">' +
                    core.icons.checked +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.submitButton + '</span></span>' +
                '</button>' +
                '<button type="button" class="se-btn se-tooltip _se_color_picker_remove">' +
                    core.icons.erase +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.toolbar.removeFormat + '</span></span>' +
                '</button>' +
            '</form>' +
            '</div>';

        return list;
    },

    /**
     * @description Internal function used by this.createColorList
     * @param {Array} colorList Color list
     * @private
     */
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
    
    /**
     * @description Displays or resets the currently selected color at color list.
     * @param {Node} node Current Selected node
     * @param {String|null} color Color value
     */
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

    /**
     * @description Store color values
     * @param {String} hexColorStr Hax color value
     */
    setCurrentColor: function (hexColorStr) {
        this.context.colorPicker._currentColor = hexColorStr;
        this.context.colorPicker._colorInput.style.borderColor = hexColorStr;
    },

    /**
     * @description Set color at input element
     * @param {String} hexColorStr Hax color value
     */
    setInputText: function (hexColorStr) {
        hexColorStr = /^#/.test(hexColorStr) ? hexColorStr : '#' + hexColorStr;
        this.context.colorPicker._colorInput.value = hexColorStr;
        this.plugins.colorPicker.setCurrentColor.call(this, hexColorStr);
    },

    /**
     * @description Gets color value at color property of node
     * @param {Node} node Selected node 
     * @returns {String}
     */
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
     * @param {String} str Color value
     */
    isHexColor: function (str) {
        return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(str);
    },

    /**
     * @description Function to convert hex format to a rgb color
     * @param {String} rgb RGB color format
     * @returns {String}
     */
    rgb2hex: function (rgb) {
        const rgbMatch = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

        return (rgbMatch && rgbMatch.length === 4) ? "#" +
            ("0" + parseInt(rgbMatch[1],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgbMatch[2],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgbMatch[3],10).toString(16)).slice(-2) : '';
    },

    /**
     * @description Converts color values of other formats to hex color values and returns.
     * @param {String} colorName Color value
     * @returns {String}
     */
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
/* 4 */
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
                    throw new Error('SUNEDITOR_MODULES a window with a document');
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    const resizing = {
        name: 'resizing',
        /**
         * @description Constructor
         * Require context properties when resizing module
            inputX: Element,
            inputY: Element,
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
            _origin_h: context.option.imageHeight === 'auto' ? '' : context.option.imageHeight,
            _proportionChecked: true,
            // -- select function --
            _resizing: context.option.imageResizing,
            _resizeDotHide: !context.option.imageHeightShow,
            _rotation: context.option.imageRotation,
            _onlyPercentage: context.option.imageSizeOnlyPercentage,
            _ratio: false,
            _ratioX: 1,
            _ratioY: 1
            _captionShow: true,
            // -- when used caption (_captionShow: true) --
            _caption: null,
            _captionChecked: false,
            captionCheckEl: null,
         * @param {Object} core Core object 
         */
        add: function (core) {
            const icons = core.icons;
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
                _isChange: false,
                alignIcons: {
                    basic: icons.align_justify,
                    left: icons.align_left,
                    right: icons.align_right,
                    center: icons.align_center
                }
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
            
            resize_container.className = 'se-controller se-resizing-container';
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
            const icons = this.icons;
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
                    '<button type="button" data-command="auto" class="se-btn se-tooltip _se_auto_size">' +
                        icons.auto_size +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.autoSize + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="rotate" data-value="-90" class="se-btn se-tooltip _se_rotation">' +
                        icons.rotate_left +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.rotateLeft + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="rotate" data-value="90" class="se-btn se-tooltip _se_rotation">' +
                        icons.rotate_right +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.rotateRight + '</span></span>' +
                    '</button>' +
                '</div>' +
                '<div class="se-btn-group" style="padding-top: 0;">' +
                    '<button type="button" data-command="mirror" data-value="h" class="se-btn se-tooltip">' +
                        icons.mirror_horizontal +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.mirrorHorizontal + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="mirror" data-value="v" class="se-btn se-tooltip">' +
                        icons.mirror_vertical +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.mirrorVertical + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="onalign" class="se-btn se-tooltip _se_resizing_align_button">' +
                        icons.align_justify +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.toolbar.align + '</span></span>' +
                    '</button>' +
                    '<div class="se-btn-group-sub sun-editor-common se-list-layer se-resizing-align-list">' +
                        '<div class="se-list-inner">' +
                            '<ul class="se-list-basic">' +
                                '<li><button type="button" class="se-btn-list se-tooltip" data-command="align" data-value="basic">' +
                                    icons.align_justify +
                                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.basic + '</span></span>' +
                                '</button></li>' +
                                '<li><button type="button" class="se-btn-list se-tooltip" data-command="align" data-value="left">' +
                                    icons.align_left +
                                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.left + '</span></span>' +
                                '</button></li>' +
                                '<li><button type="button" class="se-btn-list se-tooltip" data-command="align" data-value="center">' +
                                    icons.align_center +
                                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.center + '</span></span>' +
                                '</button></li>' +
                                '<li><button type="button" class="se-btn-list se-tooltip" data-command="align" data-value="right">' +
                                    icons.align_right +
                                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.right + '</span></span>' +
                                '</button></li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +
                    '<button type="button" data-command="caption" class="se-btn se-tooltip _se_resizing_caption_button">' +
                        icons.caption +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.caption + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="revert" class="se-btn se-tooltip">' +
                        icons.revert +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.revertButton + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="update" class="se-btn se-tooltip">' +
                        icons.modify +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.edit + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="delete" class="se-btn se-tooltip">' +
                        icons.delete +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.remove + '</span></span>' +
                    '</button>' +
                '</div>';
    
            return resize_button;
        },
    
        /**
         * @description Gets the width size
         * @param {Object} contextPlugin context object of plugin (core.context[plugin])
         * @param {Element} element Target element
         * @param {Element} cover Cover element (FIGURE)
         * @param {Element} container Container element (DIV.se-component)
         * @returns {String}
         */
        _module_getSizeX: function (contextPlugin, element, cover, container) {
            if (!element) element = contextPlugin._element;
            if (!cover) cover = contextPlugin._cover;
            if (!container) container = contextPlugin._container;
    
            if (!container || !cover || !element) return '';
    
            return !/%$/.test(element.style.width) ? element.style.width : (this.util.getNumber(container.style.width, 2) || 100) + '%';
        },
    
        /**
         * @description Gets the height size
         * @param {Object} contextPlugin context object of plugin (core.context[plugin])
         * @param {Element} element Target element
         * @param {Element} cover Cover element (FIGURE)
         * @param {Element} container Container element (DIV.se-component)
         * @returns {String}
         */
        _module_getSizeY: function (contextPlugin, element, cover, container) {
            if (!element) element = contextPlugin._element;
            if (!cover) cover = contextPlugin._cover;
            if (!container) container = contextPlugin._container;
    
            if (!container || !cover || !element) return '';
    
            return this.util.getNumber(cover.style.paddingBottom, 0) > 0 && !this.context.resizing._rotateVertical ? cover.style.height : (!/%$/.test(element.style.height) || !/%$/.test(element.style.width) ? element.style.height : (this.util.getNumber(container.style.height, 2) || 100) + '%');
        },

        /**
         * @description Called at the "openModify" to put the size of the current target into the size input element.
         * @param {Object} contextPlugin context object of plugin (core.context[plugin])
         * @param {Object} pluginObj Plugin object
         */
        _module_setModifyInputSize: function (contextPlugin, pluginObj) {
            const percentageRotation = contextPlugin._onlyPercentage && this.context.resizing._rotateVertical;
            contextPlugin.proportion.checked = contextPlugin._proportionChecked = contextPlugin._element.getAttribute('data-proportion') !== 'false';
    
            let x = percentageRotation ? '' : this.plugins.resizing._module_getSizeX.call(this, contextPlugin);
            if (x === contextPlugin._defaultSizeX) x = '';
            if (contextPlugin._onlyPercentage) x = this.util.getNumber(x, 2);
            contextPlugin.inputX.value = x;
            pluginObj.setInputSize.call(this, 'x');
            
            if (!contextPlugin._onlyPercentage) {
                let y = percentageRotation ? '' : this.plugins.resizing._module_getSizeY.call(this, contextPlugin);
                if (y === contextPlugin._defaultSizeY) y = '';
                if (contextPlugin._onlyPercentage) y = this.util.getNumber(y, 2);
                contextPlugin.inputY.value = y;
            }
            
            contextPlugin.inputX.disabled = percentageRotation ? true : false;
            contextPlugin.inputY.disabled = percentageRotation ? true : false;
            contextPlugin.proportion.disabled = percentageRotation ? true : false;
    
            pluginObj.setRatio.call(this);
        },
    
        /**
         * @description It is called in "setInputSize" (input tag keyupEvent), 
         * checks the value entered in the input tag, 
         * calculates the ratio, and sets the calculated value in the input tag of the opposite size.
         * @param {Object} contextPlugin context object of plugin (core.context[plugin])
         * @param {String} xy 'x': width, 'y': height
         */
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
    
        /**
         * @description It is called in "setRatio" (input and proportionCheck tags changeEvent), 
         * checks the value of the input tag, calculates the ratio, and resets it in the input tag.
         * @param {Object} contextPlugin context object of plugin (core.context[plugin])
         */
        _module_setRatio: function (contextPlugin) {
            const xValue = contextPlugin.inputX.value;
            const yValue = contextPlugin.inputY.value;
    
            if (contextPlugin.proportion.checked && /\d+/.test(xValue) && /\d+/.test(yValue)) {
                const xUnit = xValue.replace(/\d+|\./g, '') || contextPlugin.sizeUnit;
                const yUnit = yValue.replace(/\d+|\./g, '') || contextPlugin.sizeUnit;
    
                if (xUnit !== yUnit) {
                    contextPlugin._ratio = false;
                } else if (!contextPlugin._ratio) {
                    const x = this.util.getNumber(xValue, 0);
                    const y = this.util.getNumber(yValue, 0);
    
                    contextPlugin._ratio = true;
                    contextPlugin._ratioX = x / y;
                    contextPlugin._ratioY = y / x;
                }
            } else {
                contextPlugin._ratio = false;
            }
        },
    
        /**
         * @description Revert size of element to origin size (plugin._origin_w, plugin._origin_h)
         * @param {Object} contextPlugin context object of plugin (core.context[plugin])
         */
        _module_sizeRevert: function (contextPlugin) {
            if (contextPlugin._onlyPercentage) {
                contextPlugin.inputX.value = contextPlugin._origin_w > 100 ? 100 : contextPlugin._origin_w;
            } else {
                contextPlugin.inputX.value = contextPlugin._origin_w;
                contextPlugin.inputY.value = contextPlugin._origin_h;
            }
        },
    
        /**
         * @description Save the size data (element.setAttribute("data-size"))
         * Used at the "setSize" method
         * @param {Object} contextPlugin context object of plugin (core.context[plugin])
         */
        _module_saveCurrentSize: function (contextPlugin) {
            const x = this.plugins.resizing._module_getSizeX.call(this, contextPlugin);
            const y = this.plugins.resizing._module_getSizeY.call(this, contextPlugin);
            contextPlugin._element.setAttribute('data-size', x + ',' + y);
            if (!!contextPlugin._videoRatio) contextPlugin._videoRatio = y;
        },
    
        /**
         * @description Call the resizing module
         * @param {Element} targetElement Resizing target element
         * @param {string} plugin Plugin name
         * @returns {Object} Size of resizing div {w, h, t, l}
         */
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
            this.util.changeElement(contextResizing.alignButton.querySelector('svg'), contextResizing.alignIcons[align]);
            for (let i = 0, len = alignList.length; i < len; i++) {
                if (alignList[i].getAttribute('data-value') === align) this.util.addClass(alignList[i], 'on');
                else this.util.removeClass(alignList[i], 'on');
            }
    
            // percentage active
            const pButtons = contextResizing.percentageButtons;
            const value = /%$/.test(targetElement.style.width) && /%$/.test(container.style.width) ? (this.util.getNumber(container.style.width, 0) / 100) + '' : '' ;
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
            this.util.toggleDisabledButtons(true, this.resizingDisabledButtons);
            this.controllersOn(contextResizing.resizeContainer, contextResizing.resizeButton, this.util.toggleDisabledButtons.bind(this, false, this.resizingDisabledButtons), targetElement, plugin);
    
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

        /**
         * @description Open align submenu of module
         */
        openAlignMenu: function () {
            this.util.addClass(this.context.resizing.alignButton, 'on');
            this.context.resizing.alignMenu.style.display = 'block';
    
            this.plugins.resizing._closeAlignMenu = function () {
                this.util.removeClass(this.context.resizing.alignButton, 'on');
                this.context.resizing.alignMenu.style.display = 'none';
                this.removeDocEvent('mousedown', this.plugins.resizing._closeAlignMenu);
                this.plugins.resizing._closeAlignMenu = null;
            }.bind(this);
    
            this.addDocEvent('mousedown', this.plugins.resizing._closeAlignMenu);
        },
    
        /**
         * @description Return HTML string of caption(FIGCAPTION) element
         * @returns {String}
         */
        create_caption: function () {
            const caption = this.util.createElement('FIGCAPTION');
            caption.setAttribute('contenteditable', true);
            caption.innerHTML = '<div>' + this.lang.dialogBox.caption + '</div>';
            return caption;
        },
    
        /**
         * @description Cover the target element with a FIGURE element.
         * @param {Element} element Target element
         */
        set_cover: function (element) {
            const cover = this.util.createElement('FIGURE');
            cover.appendChild(element);
    
            return cover;
        },
    
        /**
         * @description Create a container for the resizing component and insert the element.
         * @param {Element} cover Cover element (FIGURE)
         * @param {String} className Class name of container (fixed: se-component)
         * @returns {Element} Created container element
         */
        set_container: function (cover, className) {
            const container = this.util.createElement('DIV');
            container.className = 'se-component ' + className;
            container.setAttribute('contenteditable', false);
            container.appendChild(cover);
    
            return container;
        },
    
        /**
         * @description Click event of resizing toolbar
         * Performs the action of the clicked toolbar button.
         * @param {MouseEvent} e Event object
         */
        onClick_resizeButton: function (e) {
            e.stopPropagation();
    
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
                    currentModule.setPercentSize.call(this, (value * 100), (this.util.getNumber(percentY, 0) === null || !/%$/.test(percentY)) ? '' : percentY);
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
                    return;
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
    
        /**
         * @description Initialize the transform style (rotation) of the element.
         * @param {Element} element Target element
         */
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
    
        /**
         * @description Set the transform style (rotation) of the element.
         * @param {Element} element Target element
         * @param {Number|null} width Element's width size
         * @param {Number|null} height Element's height size
         */
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
    
        /**
         * @description The position of the caption is set automatically.
         * @param {Element} element Target element (not caption element)
         */
        setCaptionPosition: function (element) {
            const figcaption = this.util.getChildElement(this.util.getParentElement(element, 'FIGURE'), 'FIGCAPTION');
            if (figcaption) {
                figcaption.style.marginTop = (this.context.resizing._rotateVertical ? element.offsetWidth - element.offsetHeight : 0) + 'px';
            }
        },
    
        /**
         * @description Mouse down event of resize handles
         * @param {MouseEvent} e Event object 
         */
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
                    this.plugins.resizing.cancel_controller_resize.call(this, direction);
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
    
        /**
         * @description Mouse move event after call "onMouseDown_resize_handle" of resize handles
         * The size of the module's "div" is adjusted according to the mouse move event.
         * @param {Object} contextResizing "core.context.resizing" object (binding argument)
         * @param {String} direction Direction ("tl", "tr", "bl", "br", "lw", "th", "rw", "bh") (binding argument)
         * @param {Object} plugin "core.context[currentPlugin]" object (binding argument)
         * @param {MouseEvent} e Event object
         */
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
    
        /**
         * @description Resize the element to the size of the "div" adjusted in the "resizing_element" method.
         * Called at the mouse-up event registered in "onMouseDown_resize_handle".
         * @param {String} direction Direction ("tl", "tr", "bl", "br", "lw", "th", "rw", "bh")
         */
        cancel_controller_resize: function (direction) {
            const isVertical = this.context.resizing._rotateVertical;
            this.controllersOff();
            this.context.element.resizeBackground.style.display = 'none';
    
            let w = this._w.Math.round(isVertical ? this.context.resizing._resize_h : this.context.resizing._resize_w);
            let h = this._w.Math.round(isVertical ? this.context.resizing._resize_w : this.context.resizing._resize_h);
    
            if (!isVertical && !/%$/.test(w)) {
                const padding = 16;
                const limit = this.context.element.wysiwygFrame.clientWidth - (padding * 2) - 2;
                
                if (this.util.getNumber(w, 0) > limit) {
                    h = this._w.Math.round((h / w) * limit);
                    w = limit;
                }
            }
    
            this.plugins[this.context.resizing._resize_plugin].setSize.call(this, w, h, false, direction);
            this.plugins[this.context.resizing._resize_plugin].init.call(this);
        }
    };

    if (typeof noGlobal === typeof undefined) {
        if (!window.SUNEDITOR_MODULES) {
            window.SUNEDITOR_MODULES = {};
        }

        window.SUNEDITOR_MODULES.resizing = resizing;
    }

    return resizing;
}));

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 6 */
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
    display: 'submenu',
    add: function (core, targetElement) {
        const icons = core.icons;
        const context = core.context;
        context.align = {
            targetButton: targetElement,
            _alignList: null,
            currentAlign: '',
            icons: {
                justify: icons.align_justify,
                left: icons.align_left,
                right: icons.align_right,
                center: icons.align_center
            }
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);
        let listUl = listDiv.querySelector('ul');

        /** add event listeners */
        listUl.addEventListener('click', this.pickup.bind(core));
        context.align._alignList = listUl.querySelectorAll('li button');

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);

        /** empty memory */
        listDiv = null, listUl = null;
    },

    setSubmenu: function () {
        const lang = this.lang;
        const icons = this.icons;
        const listDiv = this.util.createElement('DIV');

        listDiv.className = 'se-list-layer';
        listDiv.innerHTML = '' +
            '<div class="se-submenu se-list-inner se-list-align">' +
                '<ul class="se-list-basic">' +
                    '<li>' +
                        '<button type="button" class="se-btn-list se-btn-align" data-command="justifyleft" data-value="left" title="' + lang.toolbar.alignLeft + '">' +
                            '<span class="se-list-icon">' + icons.align_left + '</span>' + lang.toolbar.alignLeft +
                        '</button>' +
                    '</li>' +
                    '<li>' +
                        '<button type="button" class="se-btn-list se-btn-align" data-command="justifycenter" data-value="center" title="' + lang.toolbar.alignCenter + '">' +
                            '<span class="se-list-icon">' + icons.align_center + '</span>' + lang.toolbar.alignCenter +
                        '</button>' +
                    '</li>' +
                    '<li>' +
                        '<button type="button" class="se-btn-list se-btn-align" data-command="justifyright" data-value="right" title="' + lang.toolbar.alignRight + '">' +
                            '<span class="se-list-icon">' + icons.align_right +'</span>' + lang.toolbar.alignRight +
                        '</button>' +
                    '</li>' +
                    '<li>' +
                        '<button type="button" class="se-btn-list se-btn-align" data-command="justifyfull" data-value="justify" title="' + lang.toolbar.alignJustify + '">' +
                            '<span class="se-list-icon">' + icons.align_justify + '</span>' + lang.toolbar.alignJustify +
                        '</button>' +
                    '</li>' +
                '</ul>' +
            '</div>';

        return listDiv;
    },

    /**
     * @overriding core
     */
    active: function (element) {
        const targetButton = this.context.align.targetButton;
        const target = targetButton.querySelector('svg');

        if (!element) {
            this.util.changeElement(target, this.context.align.icons.left);
            targetButton.removeAttribute('data-focus');
        } else if (this.util.isFormatElement(element)) {
            const textAlign = element.style.textAlign;
            if (textAlign) {
                this.util.changeElement(target, this.context.align.icons[textAlign]);
                targetButton.setAttribute('data-focus', textAlign);
                return true;
            }
        }

        return false;
    },

    /**
     * @overriding submenu
     */
    on: function () {
        const alignContext = this.context.align;
        const alignList = alignContext._alignList;
        const currentAlign = alignContext.targetButton.getAttribute('data-focus') || 'left';

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
            this.util.setStyle(selectedFormsts[i], 'textAlign', (value === 'left' ? '' : value));
        }

        this.effectNode = null;
        this.submenuOff();
        this.focus();
        
        // history stack
        this.history.push(false);
    }
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_dialog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_dialog__WEBPACK_IMPORTED_MODULE_0__);




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'math',
    display: 'dialog',
    add: function (core) {
        core.addModule([_modules_dialog__WEBPACK_IMPORTED_MODULE_0___default.a]);

        const context = core.context;
        context.math = {
            focusElement: null,
            previewElement: null,
            fontSizeElement: null,
            _mathExp: null,
            _renderer: null
        };

        /** math dialog */
        let math_dialog = this.setDialog.call(core);
        context.math.modal = math_dialog;
        context.math.focusElement = math_dialog.querySelector('.se-math-exp');
        context.math.previewElement = math_dialog.querySelector('.se-math-preview');
        context.math.fontSizeElement = math_dialog.querySelector('.se-math-size');
        context.math._renderer = function (exp) {
            return this.src.renderToString(exp, this.options);
        }.bind(core.context.option.katex);

        context.math.focusElement.addEventListener('keyup', this._renderMathExp.bind(context.math), false);
        context.math.focusElement.addEventListener('change', this._renderMathExp.bind(context.math), false);
        context.math.fontSizeElement.addEventListener('change', function (e) { this.fontSize = e.target.value; }.bind(context.math.previewElement.style), false);

        /** math controller */
        let math_controller = this.setController_MathButton.call(core);
        context.math.mathController = math_controller;
        context.math._mathExp = null;
        math_controller.addEventListener('mousedown', function (e) { e.stopPropagation(); }, false);

        /** add event listeners */
        math_dialog.querySelector('.se-btn-primary').addEventListener('click', this.submit.bind(core), false);
        math_controller.addEventListener('click', this.onClick_mathController.bind(core));

        /** append html */
        context.dialog.modal.appendChild(math_dialog);
        context.element.relative.appendChild(math_controller);

        /** empty memory */
        math_dialog = null, math_controller = null;
    },

    /** dialog */
    setDialog: function () {
        const lang = this.lang;
        const dialog = this.util.createElement('DIV');

        dialog.className = 'se-dialog-content';
        dialog.style.display = 'none';
        dialog.innerHTML = '' +
        '<form class="editor_math">' +
            '<div class="se-dialog-header">' +
                '<button type="button" data-command="close" class="se-btn se-dialog-close" aria-label="Close" title="' + lang.dialogBox.close + '">' +
                    this.icons.cancel +
                '</button>' +
                '<span class="se-modal-title">' + lang.dialogBox.mathBox.title + '</span>' +
            '</div>' +
            '<div class="se-dialog-body">' +
                '<div class="se-dialog-form">' +
                    '<label>' + lang.dialogBox.mathBox.inputLabel + ' (<a href="https://katex.org/docs/supported.html" target="_blank">KaTeX</a>)</label>' +
                    '<textarea class="se-input-form se-math-exp" type="text"></textarea>' +
                '</div>' +
                '<div class="se-dialog-form">' +
                    '<label>' + lang.dialogBox.mathBox.fontSizeLabel + '</label>' +
                    '<select class="se-input-select se-math-size">' +
                        '<option value="1em">1</option>' +
                        '<option value="1.5em">1.5</option>' +
                        '<option value="2em">2</option>' +
                        '<option value="2.5em">2.5</option>' +
                    '</select>' +
                '</div>' +
                '<div class="se-dialog-form">' +
                    '<label>' + lang.dialogBox.mathBox.previewLabel + '</label>' +
                    '<p class="se-math-preview"></p>' +
                '</div>' +
            '</div>' +
            '<div class="se-dialog-footer">' +
                '<button type="submit" class="se-btn-primary" title="' + lang.dialogBox.submitButton + '"><span>' + lang.dialogBox.submitButton + '</span></button>' +
            '</div>' +
        '</form>';

        return dialog;
    },

    /** modify controller button */
    setController_MathButton: function () {
        const lang = this.lang;
        const math_btn = this.util.createElement('DIV');

        math_btn.className = 'se-controller se-controller-link';
        math_btn.innerHTML = '' +
        '<div class="se-arrow se-arrow-up"></div>' +
        '<div class="link-content">' +
            '<div class="se-btn-group">' +
                '<button type="button" data-command="update" tabindex="-1" class="se-btn se-tooltip">' +
                    this.icons.edit +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.edit + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="delete" tabindex="-1" class="se-btn se-tooltip">' +
                    this.icons.delete +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.remove + '</span></span>' +
                '</button>' +
            '</div>' +
        '</div>' +
        '';

        return math_btn;
    },

    open: function () {
        this.plugins.dialog.open.call(this, 'math', 'math' === this.currentControllerName);
    },

    _renderMathExp: function (e) {
        this.previewElement.innerHTML = this._renderer(e.target.value);
    },

    submit: function (e) {
        this.showLoading();

        e.preventDefault();
        e.stopPropagation();

        const submitAction = function () {
            if (this.context.math.focusElement.value.trim().length === 0) return false;

            const contextMath = this.context.math;
            const mathExp = contextMath.focusElement.value;
            const katexEl = contextMath.previewElement.querySelector('.katex');

            if (!katexEl) return false;
            katexEl.setAttribute('contenteditable', false);
            katexEl.setAttribute('data-exp', mathExp);
            katexEl.setAttribute('data-font-size', contextMath.fontSizeElement.value);
            katexEl.style.fontSize = contextMath.fontSizeElement.value;

            if (!this.context.dialog.updateModal) {
                const selectedFormats = this.getSelectedElements();

                if (selectedFormats.length > 1) {
                    const oFormat = this.util.createElement(selectedFormats[0].nodeName);
                    oFormat.appendChild(katexEl);
                    this.insertNode(oFormat);
                } else {
                    this.insertNode(katexEl);
                }

                const empty = this.util.createTextNode(this.util.zeroWidthSpace);
                katexEl.parentNode.insertBefore(empty, katexEl.nextSibling);
                this.setRange(katexEl, 0, katexEl, 1);
            } else {
                const findParent = function (child, className) {
                    if (child.classList.contains(className)) return child;

                    const parent = child.parentNode;

                    if (parent === document.body) return;

                    if (parent.classList.contains(className)) {
                        return parent;
                    } else {
                        findParent(parent, className);
                    }
                };
                const containerEl = findParent(contextMath._mathExp, 'katex');
                containerEl.parentNode.replaceChild(katexEl, containerEl);
                this.setRange(katexEl, 0, katexEl, 1);
            }

            contextMath.focusElement.value = '';
            contextMath.fontSizeElement.value = '1em';
            contextMath.previewElement.style.fontSize = '1em';
            contextMath.previewElement.innerHTML = '';

            return true;
        }.bind(this);

        try {
            if (submitAction()) {
                this.plugins.dialog.close.call(this);
                // history stack
                this.history.push(false);
            }
        } catch (e) {
            this.plugins.dialog.close.call(this);
        } finally {
            this.closeLoading();
        }

        return false;
    },

    active: function (element) {
        if (!element) {
            if (this.controllerArray.indexOf(this.context.math.mathController) > -1) {
                this.controllersOff();
            }
        } else if (element.getAttribute('data-exp')) {
            if (this.controllerArray.indexOf(this.context.math.mathController) < 0) {
                this.setRange(element, 0, element, 1);
                this.plugins.math.call_controller.call(this, element);
            }
            return true;
        }

        return false;
    },

    on: function (update) {
        if (!update) {
            this.plugins.math.init.call(this);
        } else {
            const contextMath = this.context.math;
            if (contextMath._mathExp) {
                const exp = contextMath._mathExp.getAttribute('data-exp');
                const fontSize = contextMath._mathExp.getAttribute('data-font-size') || '1em';
                this.context.dialog.updateModal = true;
                contextMath.focusElement.value = exp;
                contextMath.fontSizeElement.value = fontSize;
                contextMath.previewElement.innerHTML = contextMath._renderer(exp);
                contextMath.previewElement.style.fontSize = fontSize;
            }
        }
    },

    call_controller: function (mathTag) {
        this.context.math._mathExp = mathTag;
        const mathBtn = this.context.math.mathController;

        const offset = this.util.getOffset(mathTag, this.context.element.wysiwygFrame);
        mathBtn.style.top = (offset.top + mathTag.offsetHeight + 10) + 'px';
        mathBtn.style.left = (offset.left - this.context.element.wysiwygFrame.scrollLeft) + 'px';

        mathBtn.style.display = 'block';

        const overLeft = this.context.element.wysiwygFrame.offsetWidth - (mathBtn.offsetLeft + mathBtn.offsetWidth);
        if (overLeft < 0) {
            mathBtn.style.left = (mathBtn.offsetLeft + overLeft) + 'px';
            mathBtn.firstElementChild.style.left = (20 - overLeft) + 'px';
        } else {
            mathBtn.firstElementChild.style.left = '20px';
        }

        this.controllersOn(mathBtn, mathTag, 'math');
    },

    onClick_mathController: function (e) {
        e.stopPropagation();

        const command = e.target.getAttribute('data-command') || e.target.parentNode.getAttribute('data-command');
        if (!command) return;

        e.preventDefault();

        if (/update/.test(command)) {
            this.context.math.focusElement.value = this.context.math._mathExp.getAttribute('data-exp');
            this.plugins.dialog.open.call(this, 'math', true);
        } else {
            /** delete */
            this.util.removeItem(this.context.math._mathExp);
            this.context.math._mathExp = null;
            this.focus();

            // history stack
            this.history.push(false);
        }

        this.controllersOff();
    },

    init: function () {
        const contextMath = this.context.math;
        contextMath.mathController.style.display = 'none';
        contextMath._mathExp = null;
        contextMath.focusElement.value = '';
        contextMath.previewElement.innerHTML = '';
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
    name: 'blockquote',
    display: 'command',
    add: function (core, targetElement) {
        const context = core.context;
        context.blockquote = {
            targetButton: targetElement,
            tag: core.util.createElement('BLOCKQUOTE')
        };
    },

    /**
     * @overriding core
     */
    active: function (element) {
        if (!element) {
            this.util.removeClass(this.context.blockquote.targetButton, 'active');
        } else if (/blockquote/i.test(element.nodeName)) {
            this.util.addClass(this.context.blockquote.targetButton, 'active');
            return true;
        }
        
        return false;
    },

    /**
     * @overriding core
     */
    action: function () {
        const currentBlockquote = this.util.getParentElement(this.getSelectionNode(), 'blockquote');

        if (currentBlockquote) {
            this.detachRangeFormatElement(currentBlockquote, null, null, false, false);
        } else {
            this.applyRangeFormatElement(this.context.blockquote.tag.cloneNode(false));
        }
    }
});

/***/ }),
/* 9 */
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
    display: 'submenu',
    add: function (core, targetElement) {
        const context = core.context;
        context.font = {
            targetText: targetElement.querySelector('.txt'),
            targetTooltip: targetElement.parentNode.querySelector('.se-tooltip-text'),
            _fontList: null,
            currentFont: ''
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);

        /** add event listeners */
        listDiv.querySelector('.se-list-font-family').addEventListener('click', this.pickup.bind(core));

        context.font._fontList = listDiv.querySelectorAll('ul li button');

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);

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

     /**
     * @overriding core
     */
    active: function (element) {
        const target = this.context.font.targetText;
        const tooltip = this.context.font.targetTooltip;

        if (!element) {
            const font = this.lang.toolbar.font;
            this.util.changeTxt(target, font);
            this.util.changeTxt(tooltip, font);
        } else if (element.style && element.style.fontFamily.length > 0) {
            const selectFont = element.style.fontFamily.replace(/["']/g,'');
            this.util.changeTxt(target, selectFont);
            this.util.changeTxt(tooltip, selectFont);
            return true;
        }

        return false;
    },

     /**
     * @overriding submenu
     */
    on: function () {
        const fontContext = this.context.font;
        const fontList = fontContext._fontList;
        const currentFont = fontContext.targetText.textContent;

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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_colorPicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'fontColor',
    display: 'submenu',
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

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);

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

     /**
     * @overriding submenu
     */
    on: function () {
        const contextPicker = this.context.colorPicker;
        const contextFontColor = this.context.fontColor;

        contextPicker._colorInput = contextFontColor.colorInput;
        contextPicker._defaultColor = '#333333';
        contextPicker._styleProperty = 'color';
        contextPicker._colorList = contextFontColor.colorList;
        
        this.plugins.colorPicker.init.call(this, this.getSelectionNode(), null);
    },

     /**
     * @overriding _colorPicker
     */
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
    name: 'fontSize',
    display: 'submenu',
    add: function (core, targetElement) {
        const context = core.context;
        context.fontSize = {
            targetText: targetElement.querySelector('.txt'),
            _sizeList: null,
            currentSize: ''
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);
        let listUl = listDiv.querySelector('ul');

        /** add event listeners */
        listUl.addEventListener('click', this.pickup.bind(core));
        context.fontSize._sizeList = listUl.querySelectorAll('li button');

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);

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

     /**
     * @overriding core
     */
    active: function (element) {
        if (!element) {
            this.util.changeTxt(this.context.fontSize.targetText, this.lang.toolbar.fontSize);
        } else if (element.style && element.style.fontSize.length > 0) {
            this.util.changeTxt(this.context.fontSize.targetText, element.style.fontSize);
            return true;
        }

        return false;
    },

     /**
     * @overriding submenu
     */
    on: function () {
        const fontSizeContext = this.context.fontSize;
        const sizeList = fontSizeContext._sizeList;
        const currentSize = fontSizeContext.targetText.textContent;

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
/* 12 */
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
    display: 'submenu',
    add: function (core, targetElement) {
        const context = core.context;
        context.formatBlock = {
            targetText: targetElement.querySelector('.txt'),
            targetTooltip: targetElement.parentNode.querySelector('.se-tooltip-text'),
            _formatList: null,
            currentFormat: ''
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);

        /** add event listeners */
        listDiv.querySelector('ul').addEventListener('click', this.pickUp.bind(core));
        context.formatBlock._formatList = listDiv.querySelectorAll('li button');

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);

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
        for (let i = 0, len = formatList.length, format, tagName, command, name, h, attrs, className; i < len; i++) {
            format = formatList[i];
            
            if (typeof format === 'string' && defaultFormats.indexOf(format) > -1) {
                tagName = format.toLowerCase();
                command = tagName === 'blockquote' ? 'range' : tagName === 'pre' ? 'free' : 'replace';
                h = /^h/.test(tagName) ? tagName.match(/\d+/)[0] : '';
                name = lang_toolbar['tag_' + (h ? 'h' : tagName)] + h;
                className = '';
                attrs = '';
            } else {
                tagName = format.tag.toLowerCase();
                command = format.command;
                name = format.name || tagName;
                className = format.class;
                attrs = className ? ' class="' + className + '"' : '';
            }

            list += '<li>' +
                '<button type="button" class="se-btn-list" data-command="' + command + '" data-value="' + tagName + '" data-class="' + className + '" title="' + name + '">' +
                    '<' + tagName + attrs + '>' + name + '</' + tagName + '>' +
                '</button></li>';
        }
        list += '</ul></div>';

        listDiv.innerHTML = list;

        return listDiv;
    },

     /**
     * @overriding core
     */
    active: function (element) {
        let formatTitle = this.lang.toolbar.formats;
        const target = this.context.formatBlock.targetText;
        const tooltip = this.context.formatBlock.targetTooltip;

        if (!element) {
            this.util.changeTxt(target, formatTitle);
            this.util.changeTxt(tooltip, formatTitle);
        } else if (this.util.isFormatElement(element)) {
            const formatContext = this.context.formatBlock;
            const formatList = formatContext._formatList;
            const nodeName = element.nodeName.toLowerCase();
            const className = (element.className.match(/(\s|^)__se__format__[^\s]+/) || [''])[0].trim();

            for (let i = 0, len = formatList.length, f; i < len; i++) {
                f = formatList[i];
                if (nodeName === f.getAttribute('data-value') && className === f.getAttribute('data-class')) {
                    formatTitle = f.title;
                    break;
                }
            }

            this.util.changeTxt(target, formatTitle);
            this.util.changeTxt(tooltip, formatTitle);
            target.setAttribute('data-value', nodeName);
            target.setAttribute('data-class', className);

            return true;
        }

        return false;
    },

     /**
     * @overriding submenu
     */
    on: function () {
        const formatContext = this.context.formatBlock;
        const formatList = formatContext._formatList;
        const target = formatContext.targetText;
        const currentFormat = (target.getAttribute('data-value') || '') + (target.getAttribute('data-class') || '');

        if (currentFormat !== formatContext.currentFormat) {
            for (let i = 0, len = formatList.length, f; i < len; i++) {
                f = formatList[i];
                if (currentFormat === f.getAttribute('data-value') + f.getAttribute('data-class')) {
                    this.util.addClass(f, 'active');
                } else {
                    this.util.removeClass(f, 'active');
                }
            }

            formatContext.currentFormat = currentFormat;
        }
    },

    pickUp: function (e) {
        e.preventDefault();
        e.stopPropagation();

        let target = e.target;
        let command = null, value = null, tag = null, className = '';
        
        while (!command && !/UL/i.test(target.tagName)) {
            command = target.getAttribute('data-command');
            value = target.getAttribute('data-value');
            className = target.getAttribute('data-class');
            if (command) {
                tag = target.firstChild;
                break;
            }
            target = target.parentNode;
        }

        if (!command) return;

        // blockquote
        if (command === 'range') {
            const rangeElement = tag.cloneNode(false);
            this.applyRangeFormatElement(rangeElement);
        }
        // free, replace
        else {
            const range = this.getRange();
            const startOffset = range.startOffset;
            const endOffset = range.endOffset;

            const util = this.util;
            const selectedFormsts = this.getSelectedElementsAndComponents(false);
            if (selectedFormsts.length === 0) return;

            let first = selectedFormsts[0];
            let last = selectedFormsts[selectedFormsts.length - 1];
            const firstPath = util.getNodePath(range.startContainer, first, null, null);
            const lastPath = util.getNodePath(range.endContainer, last, null, null);
            
            // remove selected list
            const rlist = this.detachList(selectedFormsts, false);
            if (rlist.sc) first = rlist.sc;
            if (rlist.ec) last = rlist.ec;

            // change format tag
            this.setRange(util.getNodeFromPath(firstPath, first), startOffset, util.getNodeFromPath(lastPath, last), endOffset);
            const modifiedFormsts = this.getSelectedElementsAndComponents(false);

            // free format
            if (command === 'free') {
                const len = modifiedFormsts.length - 1;
                let parentNode = modifiedFormsts[len].parentNode;
                let freeElement = tag.cloneNode(false);
                const focusElement = freeElement;
    
                for (let i = len, f, html, before, next, inner, isComp, first = true; i >= 0; i--) {
                    f = modifiedFormsts[i];
                    if (f === (!modifiedFormsts[i + 1] ? null : modifiedFormsts[i + 1].parentNode)) continue;
    
                    isComp = util.isComponent(f);
                    html = isComp ? '' : f.innerHTML.replace(/(?!>)\s+(?=<)|\n/g, ' ');
                    before = util.getParentElement(f, function (current) {
                        return current.parentNode === parentNode;
                    });
    
                    if (parentNode !== f.parentNode || isComp) {
                        if (util.isFormatElement(parentNode)) {
                            parentNode.parentNode.insertBefore(freeElement, parentNode.nextSibling);
                            parentNode = parentNode.parentNode;
                        } else {
                            parentNode.insertBefore(freeElement, before ? before.nextSibling : null);
                            parentNode = f.parentNode;
                        }

                        next = freeElement.nextSibling;
                        if (next && freeElement.nodeName === next.nodeName && util.isSameAttributes(freeElement, next)) {
                            freeElement.innerHTML += '<BR>' + next.innerHTML;
                            util.removeItem(next);
                        }

                        freeElement = tag.cloneNode(false);
                        first = true;
                    }
    
                    inner = freeElement.innerHTML;
                    freeElement.innerHTML = ((first || !html || !inner || /<br>$/i.test(html)) ? html : html + '<BR>') + inner;

                    if (i === 0) {
                        parentNode.insertBefore(freeElement, f);
                        next = f.nextSibling;
                        if (next && freeElement.nodeName === next.nodeName && util.isSameAttributes(freeElement, next)) {
                            freeElement.innerHTML += '<BR>' + next.innerHTML;
                            util.removeItem(next);
                        }

                        const prev = freeElement.previousSibling;
                        if (prev && freeElement.nodeName === prev.nodeName && util.isSameAttributes(freeElement, prev)) {
                            prev.innerHTML += '<BR>' + freeElement.innerHTML;
                            util.removeItem(freeElement);
                        }
                    }

                    if (!isComp) util.removeItem(f);
                    if (!!html) first = false;
                }
    
                this.setRange(focusElement, 0, focusElement, 0);
            }
            // replace format
            else {
                for (let i = 0, len = modifiedFormsts.length, node, newFormat; i < len; i++) {
                    node = modifiedFormsts[i];
                    
                    if ((node.nodeName.toLowerCase() !== value.toLowerCase() || (node.className.match(/(\s|^)__se__format__[^\s]+/) || [''])[0].trim() !== className) && !util.isComponent(node)) {
                        newFormat = tag.cloneNode(false);
                        util.copyFormatAttributes(newFormat, node);
                        newFormat.innerHTML = node.innerHTML;
    
                        node.parentNode.replaceChild(newFormat, node);
                    }
    
                    if (i === 0) first = newFormat || node;
                    if (i === len - 1) last = newFormat || node;
                    newFormat = null;
                }
    
                this.setRange(util.getNodeFromPath(firstPath, first), startOffset, util.getNodeFromPath(lastPath, last), endOffset);
            }

            // history stack
            this.history.push(false);
        }

        this.submenuOff();
    }
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_colorPicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'hiliteColor',
    display: 'submenu',
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

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);

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

     /**
     * @overriding submenu
     */
    on: function () {
        const contextPicker = this.context.colorPicker;
        const contextHiliteColor = this.context.hiliteColor;

        contextPicker._colorInput = contextHiliteColor.colorInput;
        contextPicker._defaultColor = '#FFFFFF';
        contextPicker._styleProperty = 'backgroundColor';
        contextPicker._colorList = contextHiliteColor.colorList;
        
        this.plugins.colorPicker.init.call(this, this.getSelectionNode(), null);
    },

     /**
     * @overriding _colorPicker
     */
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
/* 14 */
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
    display: 'submenu',
    add: function (core, targetElement) {
        /** set submenu */
        let listDiv = this.setSubmenu.call(core);

        /** add event listeners */
        listDiv.querySelector('ul').addEventListener('click', this.horizontalRulePick.bind(core));

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);

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
/* 15 */
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
    display: 'submenu',
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

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);

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

     /**
     * @overriding submenu
     */
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
    name: 'list',
    display: 'submenu',
    add: function (core, targetElement) {
        const context = core.context;
        context.list = {
            targetButton: targetElement,
            _list: null,
            currentList: '',
            icons: {
                bullets: core.icons.list_bullets,
                number: core.icons.list_number
            }
        };

        /** set submenu */
        let listDiv = this.setSubmenu.call(core);
        let listUl = listDiv.querySelector('ul');

        /** add event listeners */
        listUl.addEventListener('click', this.pickup.bind(core));
        context.list._list = listUl.querySelectorAll('li button');

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);

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
                        this.icons.list_number +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.toolbar.orderList + '</span></span>' +
                    '</button></li>' +
                    '<li><button type="button" class="se-btn-list se-tooltip" data-command="UL">' +
                        this.icons.list_bullets +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.toolbar.unorderList + '</span></span>' +
                    '</button></li>' +
                '</ul>' +
            '</div>';

        return listDiv;
    },

     /**
     * @overriding core
     */
    active: function (element) {
        const button = this.context.list.targetButton;
        const icon = button.querySelector('svg');
        const util = this.util;

        if (!element) {
            button.removeAttribute('data-focus');
            util.changeElement(icon, this.context.list.icons.number);
            util.removeClass(button, 'active');
        } else if (util.isList(element)) {
            const nodeName = element.nodeName;
            button.setAttribute('data-focus', nodeName);
            util.addClass(button, 'active');
            if (/UL/i.test(nodeName)) {
                util.changeElement(icon, this.context.list.icons.bullets);
            } else {
                util.changeElement(icon, this.context.list.icons.number);
            }
            
            return true;
        }

        return false;
    },

     /**
     * @overriding submenu
     */
    on: function () {
        const listContext = this.context.list;
        const list = listContext._list;
        const currentList = listContext.targetButton.getAttribute('data-focus') || '';

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

    editList: function (command, selectedCells, detach) {
        const selectedFormats = !selectedCells ? this.getSelectedElementsAndComponents(false) : selectedCells;
        if (!selectedFormats || selectedFormats.length === 0) return;
        
        const util = this.util;
        util.sortByDepth(selectedFormats, true);

        // merge
        let firstSel = selectedFormats[0];
        let lastSel = selectedFormats[selectedFormats.length - 1];
        let topEl = (util.isListCell(firstSel) || util.isComponent(firstSel)) && !firstSel.previousElementSibling ? firstSel.parentNode.previousElementSibling : firstSel.previousElementSibling;
        let bottomEl = (util.isListCell(lastSel) || util.isComponent(lastSel)) && !lastSel.nextElementSibling ? lastSel.parentNode.nextElementSibling : lastSel.nextElementSibling;

        const range = this.getRange();
        const originRange = {
            sc: range.startContainer,
            so: range.startOffset,
            ec: range.endContainer,
            eo: range.endOffset
        };

        let isRemove = true;

        for (let i = 0, len = selectedFormats.length; i < len; i++) {
            if (!util.isList(util.getRangeFormatElement(selectedFormats[i], function (current) {
                return this.getRangeFormatElement(current) && current !== selectedFormats[i];
            }.bind(util)))) {
                isRemove = false;
                break;
            }
        }

        if (isRemove && (!topEl || (firstSel.tagName !== topEl.tagName || command !== topEl.tagName.toUpperCase())) && (!bottomEl || (lastSel.tagName !== bottomEl.tagName || command !== bottomEl.tagName.toUpperCase()))) {
            if (detach) {
                for (let i = 0, len = selectedFormats.length; i < len; i++) {
                    for (let j = i - 1; j >= 0; j--) {
                        if (selectedFormats[j].contains(selectedFormats[i])) {
                            selectedFormats.splice(i, 1);
                            i--; len--;
                            break;
                        }
                    }
                }
            }

            const currentFormat = util.getRangeFormatElement(firstSel);
            const cancel = currentFormat && currentFormat.tagName === command;
            let rangeArr, tempList;
            const passComponent = function (current) {
                return !this.isComponent(current);
            }.bind(util);
            
            if (!cancel) tempList = util.createElement(command);

            for (let i = 0, len = selectedFormats.length, r, o; i < len; i++) {
                o = util.getRangeFormatElement(selectedFormats[i], passComponent);
                if (!o || !util.isList(o)) continue;

                if (!r) {
                    r = o;
                    rangeArr = {r: r, f: [util.getParentElement(selectedFormats[i], 'LI')]};
                } else {
                    if (r !== o) {
                        if (detach && util.isListCell(o.parentNode)) {
                            this.plugins.list._detachNested.call(this, rangeArr.f);
                        } else {
                            this.detachRangeFormatElement(rangeArr.f[0].parentNode, rangeArr.f, tempList, false, true);
                        }
                        
                        o = selectedFormats[i].parentNode;
                        if (!cancel) tempList = util.createElement(command);
                        
                        r = o;
                        rangeArr = {r: r, f: [util.getParentElement(selectedFormats[i], 'LI')]};
                    } else {
                        rangeArr.f.push(util.getParentElement(selectedFormats[i], 'LI'));
                    }
                }
                
                if (i === len - 1) {
                    if (detach && util.isListCell(o.parentNode)) {
                        this.plugins.list._detachNested.call(this, rangeArr.f);
                    } else {
                        this.detachRangeFormatElement(rangeArr.f[0].parentNode, rangeArr.f, tempList, false, true);
                    }
                }
            }
        } else {
            const topElParent = topEl ? topEl.parentNode : topEl;
            const bottomElParent = bottomEl ? bottomEl.parentNode : bottomEl;
            topEl = topElParent && !util.isWysiwygDiv(topElParent) && topElParent.nodeName === command ? topElParent : topEl;
            bottomEl = bottomElParent && !util.isWysiwygDiv(bottomElParent) && bottomElParent.nodeName === command ? bottomElParent : bottomEl;

            const mergeTop = topEl && topEl.tagName === command;
            const mergeBottom = bottomEl && bottomEl.tagName === command;
            
            let list = mergeTop ? topEl : util.createElement(command);
            let firstList = null;
            let lastList = null;
            let topNumber = null;
            let bottomNumber = null;

            const passComponent = function (current) {
                return !this.isComponent(current) && !this.isList(current);
            }.bind(util);
            
            for (let i = 0, len = selectedFormats.length, newCell, fTag, isCell, next, originParent, nextParent, parentTag, siblingTag, rangeTag; i < len; i++) {
                fTag = selectedFormats[i];
                if (fTag.childNodes.length === 0 && !util._isIgnoreNodeChange(fTag)) {
                    util.removeItem(fTag);
                    continue;
                }
                next = selectedFormats[i + 1];
                originParent = fTag.parentNode;
                nextParent = next ? next.parentNode : null;
                isCell = util.isListCell(fTag);
                rangeTag = util.isRangeFormatElement(originParent) ? originParent : null;
                parentTag = isCell && !util.isWysiwygDiv(originParent) ? originParent.parentNode : originParent;
                siblingTag = isCell && !util.isWysiwygDiv(originParent) ? (!next || util.isListCell(parentTag)) ? originParent : originParent.nextSibling : fTag.nextSibling;

                newCell = util.createElement('LI');
                util.copyFormatAttributes(newCell, fTag);
                if (util.isComponent(fTag)) {
                    const isHR = /^HR$/i.test(fTag.nodeName);
                    if (!isHR) newCell.innerHTML = '<br>';
                    newCell.innerHTML += fTag.outerHTML;
                    if (isHR) newCell.innerHTML += '<br>';
                } else {
                    const fChildren = fTag.childNodes;
                    while (fChildren[0]) {
                        newCell.appendChild(fChildren[0]);
                    }
                }
                list.appendChild(newCell);

                if (!next) lastList = list;
                if (!next || parentTag !== nextParent || util.isRangeFormatElement(siblingTag)) {
                    if (!firstList) firstList = list;
                    if ((!mergeTop || !next || parentTag !== nextParent) && !(next && util.isList(nextParent) && nextParent === originParent)) {
                        if (list.parentNode !== parentTag) parentTag.insertBefore(list, siblingTag);
                    }
                }

                util.removeItem(fTag);
                if (mergeTop && topNumber === null) topNumber = list.children.length - 1;
                if (next && (util.getRangeFormatElement(nextParent, passComponent) !== util.getRangeFormatElement(originParent, passComponent) || (util.isList(nextParent) && util.isList(originParent) && util.getElementDepth(nextParent) !== util.getElementDepth(originParent)))) {
                    list = util.createElement(command);
                }

                if (rangeTag && rangeTag.children.length === 0) util.removeItem(rangeTag);
            }

            if (topNumber) {
                firstList = firstList.children[topNumber];
            }

            if (mergeBottom) {
                bottomNumber = list.children.length - 1;
                list.innerHTML += bottomEl.innerHTML;
                lastList = list.children[bottomNumber];
                util.removeItem(bottomEl);
            }
        }
        
        this.effectNode = null;
        return originRange;
    },

    _detachNested: function (cells) {
        const first = cells[0];
        const last = cells[cells.length - 1];
        const next = last.nextElementSibling;
        const originList = first.parentNode;
        const sibling = originList.parentNode.nextElementSibling;
        const parentNode = originList.parentNode.parentNode;

        for (let c = 0, cLen = cells.length; c < cLen; c++) {
            parentNode.insertBefore(cells[c], sibling);
        }

        if (next && originList.children.length > 0) {
            const newList = originList.cloneNode(false);
            const children = originList.childNodes;
            const index = this.util.getPositionIndex(next);
            while (children[index]) {
                newList.appendChild(children[index]);
            }
            last.appendChild(newList);
        }

        if (originList.children.length === 0) this.util.removeItem(originList);
        this.util.mergeSameTags(parentNode);

        const edge = this.util.getEdgeChildNodes(first, last);

        return {
            cc: first.parentNode,
            sc: edge.sc,
            ec: edge.ec
        };
    },

    editInsideList: function (remove, selectedCells) {
        selectedCells = !selectedCells ? this.getSelectedElements().filter(function (el) { return this.isListCell(el); }.bind(this.util)) : selectedCells;
        const cellsLen = selectedCells.length;
        if (cellsLen === 0 || (!remove && (!this.util.isListCell(selectedCells[0].previousElementSibling) && !this.util.isListCell(selectedCells[cellsLen - 1].nextElementSibling)))) {
            return {
                sc: selectedCells[0],
                so: 0,
                ec: selectedCells[cellsLen - 1],
                eo: 1
            };
        }

        let originList = selectedCells[0].parentNode;
        let lastCell = selectedCells[cellsLen - 1];
        let range = null;

        if (remove) {
            if (originList !== lastCell.parentNode && this.util.isList(lastCell.parentNode.parentNode) && lastCell.nextElementSibling) {
                lastCell = lastCell.nextElementSibling;
                while (lastCell) {
                    selectedCells.push(lastCell);
                    lastCell = lastCell.nextElementSibling;
                }
            }
            range = this.plugins.list.editList.call(this, originList.nodeName.toUpperCase(), selectedCells, true);
        } else {
            let innerList = this.util.createElement(originList.nodeName);
            let prev = selectedCells[0].previousElementSibling;
            let next = lastCell.nextElementSibling;
            const nodePath = { s: null, e: null, sl: originList, el: originList };

            for (let i = 0, len = cellsLen, c; i < len; i++) {
                c = selectedCells[i];
                if (c.parentNode !== originList) {
                    this.plugins.list._insiedList.call(this, originList, innerList, prev, next, nodePath);
                    originList = c.parentNode;
                    innerList = this.util.createElement(originList.nodeName);
                }
                
                prev = c.previousElementSibling;
                next = c.nextElementSibling;
                innerList.appendChild(c);
            }
            
            this.plugins.list._insiedList.call(this, originList, innerList, prev, next, nodePath);

            const sc = this.util.getNodeFromPath(nodePath.s, nodePath.sl);
            const ec = this.util.getNodeFromPath(nodePath.e, nodePath.el);
            range = {
                sc: sc,
                so: 0,
                ec: ec,
                eo: ec.textContent.length
            };
        }

        return range;
    },

    _insiedList: function (originList, innerList, prev, next, nodePath) {
        let insertPrev = false;

        if (prev && innerList.tagName === prev.tagName) {
            const children = innerList.children;
            while (children[0]) {
                prev.appendChild(children[0]);
            }

            innerList = prev;
            insertPrev = true;
        }

        if (next && innerList.tagName === next.tagName) {
            const children = next.children;
            while (children[0]) {
                innerList.appendChild(children[0]);
            }

            const temp = next.nextElementSibling;
            next.parentNode.removeChild(next);
            next = temp;
        }

        if (!insertPrev) {
            if (this.util.isListCell(prev)) {
                originList = prev;
                next = null;
            }

            originList.insertBefore(innerList, next);

            if (!nodePath.s) {
                nodePath.s = this.util.getNodePath(innerList.firstElementChild.firstChild, originList, null);
                nodePath.sl = originList;
            }

            const slPath = originList.contains(nodePath.sl) ? this.util.getNodePath(nodePath.sl, originList) : null;
            nodePath.e = this.util.getNodePath(innerList.lastElementChild.firstChild, originList, null);
            nodePath.el = originList;

            this.util.mergeSameTags(originList, [nodePath.s, nodePath.e, slPath], false);
            this.util.mergeNestedTags(originList);
            if (slPath) nodePath.sl = this.util.getNodeFromPath(slPath, originList);
        }

        return innerList;
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

        const range = this.plugins.list.editList.call(this, command, null, false);
        this.setRange(range.sc, range.so, range.ec, range.eo);

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
    name: 'paragraphStyle',
    display: 'submenu',
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

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);

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

     /**
     * @overriding submenu
     */
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
    name: 'table',
    display: 'submenu',
    add: function (core, targetElement) {
        const context = core.context;
        context.table = {
            _element: null,
            _tdElement: null,
            _trElement: null,
            _trElements: null,
            _tableXY: [],
            _maxWidth: true,
            _fixedColumn: false,
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
            _current_rowSpan: 0,
            icons: {
                expansion: core.icons.expansion,
                reduction: core.icons.reduction
            }
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
        context.table.resizeButton = tableController.querySelector('._se_table_resize');
        context.table.resizeText = tableController.querySelector('._se_table_resize > span > span');
        context.table.columnFixedButton = tableController.querySelector('._se_table_fixed_column');
        context.table.headerButton = tableController.querySelector('._se_table_header');
        tableController.addEventListener('mousedown', function (e) { e.stopPropagation(); }, false);

        /** set resizing */
        let resizeDiv = this.setController_tableEditor.call(core);
        context.table.resizeDiv = resizeDiv;
        context.table.splitMenu = resizeDiv.querySelector('.se-btn-group-sub');
        context.table.mergeButton = resizeDiv.querySelector('._se_table_merge_button');
        context.table.splitButton = resizeDiv.querySelector('._se_table_split_button');
        context.table.insertRowAboveButton = resizeDiv.querySelector('._se_table_insert_row_a');
        context.table.insertRowBelowButton = resizeDiv.querySelector('._se_table_insert_row_b');
        resizeDiv.addEventListener('mousedown', function (e) { e.stopPropagation(); }, false);
        
        /** add event listeners */
        tablePicker.addEventListener('mousemove', this.onMouseMove_tablePicker.bind(core));
        tablePicker.addEventListener('click', this.appendTable.bind(core));
        resizeDiv.addEventListener('click', this.onClick_tableController.bind(core));
        tableController.addEventListener('click', this.onClick_tableController.bind(core));

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);

        /** append controller */
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
        const icons = this.icons;
        const tableResize = this.util.createElement('DIV');

        tableResize.className = 'se-controller se-controller-table';
        tableResize.innerHTML = '' +
            '<div>' +
                '<div class="se-btn-group">' +
                    '<button type="button" data-command="resize" class="se-btn se-tooltip _se_table_resize">' +
                        icons.expansion +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.maxSize + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="layout" class="se-btn se-tooltip _se_table_fixed_column">' +
                        icons.fixed_column_width +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.fixedColumnWidth + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="header" class="se-btn se-tooltip _se_table_header">' +
                        icons.table_header +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.tableHeader + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="remove" class="se-btn se-tooltip">' +
                        icons.delete +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.remove + '</span></span>' +
                    '</button>' +
                '</div>' +
            '</div>';

        return tableResize;
    },

    setController_tableEditor: function () {
        const lang = this.lang;
        const icons = this.icons;
        const tableResize = this.util.createElement('DIV');

        tableResize.className = 'se-controller se-controller-table-cell';
        tableResize.innerHTML = '' +
            '<div class="se-arrow se-arrow-up"></div>' +
            '<div class="se-btn-group">' +
                '<button type="button" data-command="insert" data-value="row" data-option="up" class="se-btn se-tooltip _se_table_insert_row_a">' +
                    icons.insert_row_above +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.insertRowAbove + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="insert" data-value="row" data-option="down" class="se-btn se-tooltip _se_table_insert_row_b">' +
                    icons.insert_row_below +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.insertRowBelow + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="delete" data-value="row" class="se-btn se-tooltip">' +
                    icons.delete_row +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.deleteRow + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="merge" class="_se_table_merge_button se-btn se-tooltip" disabled>' +
                    icons.merge_cell +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.mergeCells + '</span></span>' +
                '</button>' +
            '</div>' +
            '<div class="se-btn-group" style="padding-top: 0;">' +
                '<button type="button" data-command="insert" data-value="cell" data-option="left" class="se-btn se-tooltip">' +
                    icons.insert_column_left +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.insertColumnBefore + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="insert" data-value="cell" data-option="right" class="se-btn se-tooltip">' +
                    icons.insert_column_right +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.insertColumnAfter + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="delete" data-value="cell" class="se-btn se-tooltip">' +
                    icons.delete_column +
                    '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.deleteColumn + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="onsplit" class="_se_table_split_button se-btn se-tooltip">' +
                    icons.split_cell +
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

        let x_u = 10; // x < 5 ? 5 : (x > 9 ? 10 : x + 1);
        let y_u = 10; //y < 5 ? 5 : (y > 9 ? 10 : y + 1);
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
        unHighlight.width = '10em';
        unHighlight.height = '10em';

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
        contextTable._fixedColumn = false;
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
        const tablePlugin = this.plugins.table;

        if (!this.getSelection().isCollapsed && !tablePlugin._selectedCell) {
            this.controllersOff();
            this.util.removeClass(tdElement, 'se-table-selected-cell');
            return;
        }
        
        const contextTable = this.context.table;
        const tableController = contextTable.tableController;
        
        tablePlugin.setPositionControllerDiv.call(this, tdElement, tablePlugin._shift);

        const tableElement = contextTable._element;
        contextTable._maxWidth = this.util.hasClass(tableElement, 'se-table-size-100') || tableElement.style.width === '100%' || (!tableElement.style.width && !this.util.hasClass(tableElement, 'se-table-size-auto'));
        contextTable._fixedColumn = this.util.hasClass(tableElement, 'se-table-layout-fixed') || tableElement.style.tableLayout === 'fixed';
        tablePlugin.setTableStyle.call(this, contextTable._maxWidth ? 'width|column' : 'width');

        tablePlugin.setPositionControllerTop.call(this, tableElement);

        if (!tablePlugin._shift) this.controllersOn(contextTable.resizeDiv, tableController, tablePlugin.init.bind(this), tdElement, 'table');
    },

    setPositionControllerTop: function (tableElement) {
        const tableController = this.context.table.tableController;
        const offset = this.util.getOffset(tableElement, this.context.element.wysiwygFrame);
        tableController.style.left = offset.left + 'px';
        tableController.style.display = 'block';
        tableController.style.top = (offset.top - tableController.offsetHeight - 2) + 'px';
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

    setTableStyle: function (styles) {
        const contextTable = this.context.table;
        const tableElement = contextTable._element;
        let icon, span, sizeIcon, text;

        if (styles.indexOf('width') > -1) {
            icon =  contextTable.resizeButton.querySelector('svg');
            span = contextTable.resizeText;

            if (!contextTable._maxWidth) {
                sizeIcon = contextTable.icons.expansion;
                text = contextTable.maxText;
                contextTable.columnFixedButton.style.display = 'none';
                this.util.removeClass(tableElement, 'se-table-size-100');
                this.util.addClass(tableElement, 'se-table-size-auto');
            } else {
                sizeIcon = contextTable.icons.reduction;
                text = contextTable.minText;
                contextTable.columnFixedButton.style.display = 'block';
                this.util.removeClass(tableElement, 'se-table-size-auto');
                this.util.addClass(tableElement, 'se-table-size-100');
            }
            
            this.util.changeElement(icon, sizeIcon);
            this.util.changeTxt(span, text);
        }

        if (styles.indexOf('column') > -1) {
            if (!contextTable._fixedColumn) {
                this.util.removeClass(tableElement, 'se-table-layout-fixed');
                this.util.addClass(tableElement, 'se-table-layout-auto');
                this.util.removeClass(contextTable.columnFixedButton, 'active');
            } else {
                this.util.removeClass(tableElement, 'se-table-layout-auto');
                this.util.addClass(tableElement, 'se-table-layout-fixed');
                this.util.addClass(contextTable.columnFixedButton, 'active');
            }
            
        }
    },

    setActiveButton: function (fixedCell, selectedCell) {
        const contextTable = this.context.table;

        if (/^TH$/i.test(fixedCell.nodeName)) {
            contextTable.insertRowAboveButton.setAttribute('disabled', true);
            contextTable.insertRowBelowButton.setAttribute('disabled', true);
        } else {
            contextTable.insertRowAboveButton.removeAttribute('disabled');
            contextTable.insertRowBelowButton.removeAttribute('disabled');
        }

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
        this._antiBlur = true;
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
                this.controllersOn(this.context.table.resizeDiv, this.context.table.tableController, this.plugins.table.init.bind(this), this.focus.bind(this), tdElement, 'table');
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
        const tablePlugin = this.plugins.table;
        
        if (typeof tablePlugin._closeSplitMenu === 'function') {
            tablePlugin._closeSplitMenu();
            if (command === 'onsplit') return;
        }

        if (!command) return;

        e.preventDefault();
        const contextTable = this.context.table;

        switch (command) {
            case 'insert':
            case 'delete':
                tablePlugin.editTable.call(this, value, option);
                break;
            case 'header':
                tablePlugin.toggleHeader.call(this);
                break;
            case 'onsplit':
                tablePlugin.openSplitMenu.call(this);
                break;
            case 'split':
                tablePlugin.splitCells.call(this, value);
                break;
            case 'merge':
                tablePlugin.mergeCells.call(this);
                break;
            case 'resize':
                contextTable._maxWidth = !contextTable._maxWidth;
                tablePlugin.setTableStyle.call(this, 'width');
                tablePlugin.setPositionControllerTop.call(this, contextTable._element);
                tablePlugin.setPositionControllerDiv.call(this, contextTable._tdElement, tablePlugin._shift);
                break;
            case 'layout':
                contextTable._fixedColumn = !contextTable._fixedColumn;
                tablePlugin.setTableStyle.call(this, 'column');
                tablePlugin.setPositionControllerTop.call(this, contextTable._element);
                tablePlugin.setPositionControllerDiv.call(this, contextTable._tdElement, tablePlugin._shift);
                break;
            case 'remove':
                const emptyDiv = contextTable._element.parentNode;
                this.util.removeItem(contextTable._element);
                this.controllersOff();

                if (emptyDiv !== this.context.element.wysiwyg) this.util.removeItemAllParents(emptyDiv, function (current) { return current.childNodes.length === 0; }, null);
        }

        this.focus();

        // history stack
        this.history.push(false);
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
    name: 'template',
    display: 'submenu',
    add: function (core, targetElement) {
        const context = core.context;
        context.template = {};

        /** set submenu */
        let templateDiv = this.setSubmenu.call(core);

        /** add event listeners */
        templateDiv.querySelector('ul').addEventListener('click', this.pickup.bind(core));

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, templateDiv);

        /** empty memory */
        templateDiv = null;
    },

    setSubmenu: function () {
        const templateList = this.context.option.templates;
        if (!templateList || templateList.length === 0) {
            throw Error('[SUNEDITOR.plugins.template.fail] To use the "template" plugin, please define the "templates" option.');
        }

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
/* 20 */
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
    display: 'submenu',
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

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);

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

     /**
     * @overriding submenu
     */
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_dialog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_dialog__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_resizing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _modules_resizing__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_resizing__WEBPACK_IMPORTED_MODULE_1__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */





/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'image',
    display: 'dialog',
    add: function (core) {
        core.addModule([_modules_dialog__WEBPACK_IMPORTED_MODULE_0___default.a, _modules_resizing__WEBPACK_IMPORTED_MODULE_1___default.a]);
        
        const context = core.context;
        const contextImage = context.image = {
            _imagesInfo: [],
            _imageIndex: 0,
            sizeUnit: context.option._imageSizeUnit,
            _altText: '',
            _linkElement: null,
            _linkValue: '',
            _align: 'none',
            _floatClassRegExp: '__se__float\\-[a-z]+',
            _uploadFileLength: 0,
            _xmlHttp: null,
            // @overriding resizing properties
            inputX: null,
            inputY: null,
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
            _origin_h: context.option.imageHeight === 'auto' ? '' : context.option.imageHeight,
            _proportionChecked: true,
            _resizing: context.option.imageResizing,
            _resizeDotHide: !context.option.imageHeightShow,
            _rotation: context.option.imageRotation,
            _onlyPercentage: context.option.imageSizeOnlyPercentage,
            _ratio: false,
            _ratioX: 1,
            _ratioY: 1,
            _captionShow: true,
            _captionChecked: false,
            _caption: null,
            captionCheckEl: null
        };

        /** image dialog */
        let image_dialog = this.setDialog.call(core);
        contextImage.modal = image_dialog;
        contextImage.imgInputFile = image_dialog.querySelector('._se_image_file');
        contextImage.imgUrlFile = image_dialog.querySelector('.se-input-url');
        contextImage.focusElement = (contextImage.imgInputFile || contextImage.imgUrlFile);
        contextImage.altText = image_dialog.querySelector('._se_image_alt');
        contextImage.imgLink = image_dialog.querySelector('._se_image_link');
        contextImage.imgLinkNewWindowCheck = image_dialog.querySelector('._se_image_link_check');
        contextImage.captionCheckEl = image_dialog.querySelector('._se_image_check_caption');

        /** add event listeners */
        image_dialog.querySelector('.se-dialog-tabs').addEventListener('click', this.openTab.bind(core));
        image_dialog.querySelector('.se-btn-primary').addEventListener('click', this.submit.bind(core));
        image_dialog.querySelector('.se-dialog-files-remove').addEventListener('click', this._removeSelectedFiles.bind(core, contextImage.imgInputFile, contextImage.imgUrlFile));
        if (contextImage.imgInputFile && contextImage.imgUrlFile) contextImage.imgInputFile.addEventListener('change', this._fileInputChange.bind(contextImage));
        
        contextImage.proportion = {};
        contextImage.inputX = {};
        contextImage.inputY = {};
        if (context.option.imageResizing) {
            contextImage.proportion = image_dialog.querySelector('._se_image_check_proportion');
            contextImage.inputX = image_dialog.querySelector('._se_image_size_x');
            contextImage.inputY = image_dialog.querySelector('._se_image_size_y');
            contextImage.inputX.value = context.option.imageWidth;
            contextImage.inputY.value = context.option.imageHeight;
            
            contextImage.inputX.addEventListener('keyup', this.setInputSize.bind(core, 'x'));
            contextImage.inputY.addEventListener('keyup', this.setInputSize.bind(core, 'y'));

            contextImage.inputX.addEventListener('change', this.setRatio.bind(core));
            contextImage.inputY.addEventListener('change', this.setRatio.bind(core));
            contextImage.proportion.addEventListener('change', this.setRatio.bind(core));
            
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
                '<button type="button" data-command="close" class="se-btn se-dialog-close" class="close" aria-label="Close" title="' + lang.dialogBox.close + '">' +
                    this.icons.cancel +
                '</button>' +
                '<span class="se-modal-title">' + lang.dialogBox.imageBox.title + '</span>' +
            '</div>' +
            '<div class="se-dialog-tabs">' +
                '<button type="button" class="_se_tab_link active" data-tab-link="image">' + lang.toolbar.image + '</button>' +
                '<button type="button" class="_se_tab_link" data-tab-link="url">' + lang.toolbar.link + '</button>' +
            '</div>' +
            '<form class="editor_image" method="post" enctype="multipart/form-data">' +
                '<div class="_se_tab_content _se_tab_content_image">' +
                    '<div class="se-dialog-body"><div style="border-bottom: 1px dashed #ccc;">';

            if (option.imageFileInput) {
                html += '' +
                        '<div class="se-dialog-form">' +
                            '<label>' + lang.dialogBox.imageBox.file + '</label>' +
                            '<div class="se-dialog-form-files">' +
                                '<input class="se-input-form _se_image_file" type="file" accept="image/*" multiple="multiple" />' +
                                '<button type="button" data-command="filesRemove" class="se-btn se-dialog-files-remove" title="' + lang.controller.remove + '">' + this.icons.cancel + '</button>' +
                            '</div>' +
                        '</div>' ;
            }

            if (option.imageUrlInput) {
                html += '' +
                        '<div class="se-dialog-form">' +
                            '<label>' + lang.dialogBox.imageBox.url + '</label>' +
                            '<input class="se-input-form se-input-url" type="text" />' +
                        '</div>';
            }

            html += '</div>' +
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
                            '<input type="text" class="se-input-control _se_image_size_y" placeholder="auto"' + onlyPercentDisplay + (onlyPercentage ? ' max="100"' : '') + heightDisplay + '/>' +
                            '<label' + onlyPercentDisplay + heightDisplay + '><input type="checkbox" class="se-dialog-btn-check _se_image_check_proportion" checked/>&nbsp;' + lang.dialogBox.proportion + '</label>' +
                            '<button type="button" title="' + lang.dialogBox.revertButton + '" class="se-btn se-dialog-btn-revert" style="float: right;">' + this.icons.revert + '</button>' +
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

    _fileInputChange: function () {
        if (!this.imgInputFile.value) this.imgUrlFile.removeAttribute('disabled');
        else this.imgUrlFile.setAttribute('disabled', true);
    },

    _removeSelectedFiles: function (fileInput, urlInput) {
        fileInput.value = '';
        if (urlInput) urlInput.removeAttribute('disabled');
    },

    /**
     * @overriding dialog
     */
    open: function () {
        this.plugins.dialog.open.call(this, 'image', 'image' === this.currentControllerName);
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
        if (tabName === 'image' && this.context.image.focusElement) {
            this.context.image.focusElement.focus();
        } else if (tabName === 'url' && this.context.image.imgLink) {
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
                const imagesInfo = this.context.image._imagesInfo;
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
                        this.functions.noticeOpen(err);
                    }

                    this.closeLoading();
                    return;
                }
            }

            const contextImage = this.context.image;
            contextImage._uploadFileLength = files.length;
            const imageUploadUrl = this.context.option.imageUploadUrl;
            const imageUploadHeader = this.context.option.imageUploadHeader;
            const filesLen = this.context.dialog.updateModal ? 1 : files.length;

            const info = {
                linkValue: contextImage._linkValue,
                linkNewWindow: contextImage.imgLinkNewWindowCheck.checked,
                inputWidth: contextImage.inputX.value,
                inputHeight: contextImage.inputY.value,
                align: contextImage._align,
                isUpdate: this.context.dialog.updateModal,
                currentImage: contextImage._element
            };

            if (!this._imageUploadBefore(files, info)) return;

            if (typeof imageUploadUrl === 'string' && imageUploadUrl.length > 0) {
                const formData = new FormData();

                for (let i = 0; i < filesLen; i++) {
                    formData.append('file-' + i, files[i]);
                }

                contextImage._xmlHttp = this.util.getXMLHttpRequest();
                contextImage._xmlHttp.onreadystatechange = this.plugins.image.callBack_imgUpload.bind(this, info);
                contextImage._xmlHttp.open('post', imageUploadUrl, true);
                if(imageUploadHeader !== null && typeof imageUploadHeader === 'object' && this._w.Object.keys(imageUploadHeader).length > 0){
                    for(let key in imageUploadHeader){
                        contextImage._xmlHttp.setRequestHeader(key, imageUploadHeader[key]);
                    }
                }
                contextImage._xmlHttp.send(formData);
            }
            else {
                for (let i = 0; i < filesLen; i++) {
                    this.plugins.image.setup_reader.call(this, files[i], info.linkValue, info.linkNewWindow, info.inputWidth, info.inputHeight, info.align, i, filesLen - 1);
                }
            }
        }
    },

    onRender_imgInput: function () {
        try {
            this.plugins.image.submitAction.call(this, this.context.image.imgInputFile.files);
        } catch (e) {
            throw Error('[SUNEDITOR.imageUpload.fail] cause : "' + e.message + '"');
        } finally {
            this.closeLoading();
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

    callBack_imgUpload: function (info) {
        if (this.context.image._xmlHttp.readyState === 4) {
            if (this.context.image._xmlHttp.status === 200) {
                
                if (!this._imageUploadHandler(this.context.image._xmlHttp, info)) {
                    const response = JSON.parse(this.context.image._xmlHttp.responseText);

                    if (response.errorMessage) {
                        if (this._imageUploadError(response.errorMessage, response.result)) {
                            this.functions.noticeOpen(response.errorMessage);
                        }
                    } else {
                        const fileList = response.result;
                        for (let i = 0, len = fileList.length, file; i < len; i++) {
                            file = {name: fileList[i].name, size: fileList[i].size};
                            if (info.isUpdate) this.plugins.image.update_src.call(this, fileList[i].url, info.currentImage, file);
                            else this.plugins.image.create_image.call(this, fileList[i].url, info.linkValue, info.linkNewWindow, info.inputWidth, info.inputHeight, info.align, file);
                        }
                    }
                }

                this.closeLoading();
            }
            // error
            else {
                this.closeLoading();
                throw Error('[SUNEDITOR.imageUpload.fail] status: ' + this.context.image._xmlHttp.status + ', responseText: ' + this.context.image._xmlHttp.responseText);
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

    /**
     * @overriding resizing
     * @param {String} xy 'x': width, 'y': height
     * @param {KeyboardEvent} e Event object
     */
    setInputSize: function (xy, e) {
        if (e && e.keyCode === 32) {
            e.preventDefault();
            return;
        }

        this.plugins.resizing._module_setInputSize.call(this, this.context.image, xy);
    },

    /**
     * @overriding resizing
     */
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
        const _resize_plugin = this.context.resizing._resize_plugin;
        this.context.resizing._resize_plugin = 'image';

        const imagesInfo = this.context.image._imagesInfo;
        let dataIndex = img.getAttribute('data-index');
        let info = null;
        let state = '';

        // create
        if (!dataIndex || this._componentsInfoInit) {
            state = 'create';
            dataIndex = this.context.image._imageIndex++;

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
                dataIndex = this.context.image._imageIndex++;
                info = { index: dataIndex };
                imagesInfo.push(info);
            }

            info.src = img.src;
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
            const container = this.util.getParentElement(img, this.util.isMediaComponent);
            const cover = this.util.getParentElement(img, 'FIGURE');

            const w = this.plugins.resizing._module_getSizeX.call(this, this.context.image, img, cover, container);
            const h = this.plugins.resizing._module_getSizeY.call(this, this.context.image, img, cover, container);
            img.setAttribute('data-origin', w + ',' + h);
            img.setAttribute('data-size', w + ',' + h);
        }

        if (!img.style.width) {
            const size = (img.getAttribute('data-size') || img.getAttribute('data-origin') || '').split(',');
            this.plugins.image.onModifyMode.call(this, img, null);
            this.plugins.image.applySize.call(this, (size[0] || this.context.option.imageWidth), (size[1] || this.context.option.imageHeight));
        }

        this.context.resizing._resize_plugin = _resize_plugin;
        this._imageUpload(img, dataIndex, state, info, --this.context.image._uploadFileLength < 0 ? 0 : this.context.image._uploadFileLength);
    },

    /**
     * @overriding core
     */
    checkComponentInfo: function () {
        const images = [].slice.call(this.context.element.wysiwyg.getElementsByTagName('IMG'));
        const imagePlugin = this.plugins.image;
        const imagesInfo = this.context.image._imagesInfo;

        if (images.length === imagesInfo.length) {
            // reset
            if (this._componentsInfoReset) {
                for (let i = 0, len = images.length, img; i < len; i++) {
                    img = images[i];
                    imagePlugin.setImagesInfo.call(this, img, {
                        'name': img.getAttribute('data-file-name') || img.src.split('/').pop(),
                        'size': img.getAttribute('data-file-size') || 0
                    });
                }
                return;
            } else {
                let infoUpdate = false;
                for (let i = 0, len = imagesInfo.length, info; i < len; i++) {
                    info = imagesInfo[i];
                    if (images.filter(function (img) { return info.src === img.src && info.index.toString() === img.getAttribute('data-index'); }).length === 0) {
                        infoUpdate = true;
                        break;
                    }
                }
                // pass
                if (!infoUpdate) return;
            }
        }

        // check images
        const _resize_plugin = this.context.resizing._resize_plugin;
        this.context.resizing._resize_plugin = 'image';
        const currentImages = [];
        const infoIndex = [];
        for (let i = 0, len = imagesInfo.length; i < len; i++) {
            infoIndex[i] = imagesInfo[i].index;
        }
        
        for (let i = 0, len = images.length, img; i < len; i++) {
            img = images[i];
            if (!this.util.getParentElement(img, this.util.isMediaComponent)) {
                currentImages.push(this.context.image._imageIndex);
                imagePlugin.onModifyMode.call(this, img, null);
                imagePlugin.openModify.call(this, true);
                imagePlugin.update_image.call(this, true, false, true);
            } else if (!img.getAttribute('data-index') || infoIndex.indexOf(img.getAttribute('data-index') * 1) < 0) {
                currentImages.push(this.context.image._imageIndex);
                img.removeAttribute('data-index');
                imagePlugin.setImagesInfo.call(this, img, {
                    'name': img.getAttribute('data-file-name') || img.src.split('/').pop(),
                    'size': img.getAttribute('data-file-size') || 0
                });
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

        this.context.resizing._resize_plugin = _resize_plugin;
    },

    /**
     * @overriding core
     */
    resetComponentInfo: function () {
        this.context.image._imagesInfo = [];
        this.context.image._imageIndex = 0;
    },

    create_image: function (src, linkValue, linkNewWindow, width, height, align, file) {
        const contextImage = this.context.image;
        this.context.resizing._resize_plugin = 'image';

        let oImg = this.util.createElement('IMG');
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
        this.plugins.image.applySize.call(this, width, height);

        // align
        this.plugins.image.setAlign.call(this, align, oImg, cover, container);

        this.insertComponent(container, true);
        this.plugins.image.setImagesInfo.call(this, oImg, file || {
            'name': oImg.getAttribute('data-file-name') || oImg.src.split('/').pop(),
            'size': oImg.getAttribute('data-file-size') || 0
        });

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
            imageEl = cover.querySelector('img');
            isNewContainer = true;
            container = this.plugins.resizing.set_container.call(this, cover, 'se-image-container');
        } else if (isNewContainer) {
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
            if (contextImage._linkElement !== null && cover.contains(contextImage._linkElement)) {
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
                
            existElement.parentNode.replaceChild(container, existElement);
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

    /**
     * @overriding resizing
     */
    onModifyMode: function (element, size) {
        if (!element) return;
        
        const contextImage = this.context.image;
        contextImage._linkElement = /^A$/i.test(element.parentNode.nodeName) ? element.parentNode : null;
        contextImage._element = element;
        contextImage._cover = this.util.getParentElement(element, 'FIGURE');
        contextImage._container = this.util.getParentElement(element, this.util.isMediaComponent);
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

    /**
     * @overriding resizing
     */
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

    /**
     * @overriding dialog
     */
    on: function (update) {
        const contextImage = this.context.image;
        
        if (!update) {
            contextImage.inputX.value = contextImage._origin_w = this.context.option.imageWidth === contextImage._defaultSizeX ? '' : this.context.option.imageWidth;
            contextImage.inputY.value = contextImage._origin_h = this.context.option.imageHeight === contextImage._defaultSizeY ? '' : this.context.option.imageHeight;
            if (contextImage.imgInputFile) contextImage.imgInputFile.setAttribute('multiple', 'multiple');
        } else {
            if (contextImage.imgInputFile) contextImage.imgInputFile.removeAttribute('multiple');
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

    /**
     * @overriding resizing
     */
    setSize: function (w, h, notResetPercentage, direction) {
        const contextImage = this.context.image;
        const onlyW = /^(rw|lw)$/.test(direction);
        const onlyH = /^(th|bh)$/.test(direction);

        this.plugins.image.cancelPercentAttr.call(this);

        if (!onlyH) contextImage._element.style.width = this.util.isNumber(w) ? w + contextImage.sizeUnit : w;
        if (!onlyW) contextImage._element.style.height = this.util.isNumber(h) ? h + contextImage.sizeUnit : /%$/.test(h) ? '' : h;

        if (contextImage._align === 'center') this.plugins.image.setAlign.call(this, null, null, null, null);
        if (!notResetPercentage) contextImage._element.removeAttribute('data-percentage');

        // save current size
        this.plugins.resizing._module_saveCurrentSize.call(this, contextImage);
    },

    /**
     * @overriding resizing
     */
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
    
    /**
     * @overriding resizing
     */
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

    /**
     * @overriding resizing
     */
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

    /**
     * @overriding resizing
     */
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

    /**
     * @overriding resizing
     */
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

    /**
     * @overriding resizing
     */
    destroy: function (element) {
        const imageEl = element || this.context.image._element;
        const imageContainer = this.util.getParentElement(imageEl, this.util.isMediaComponent) || imageEl;
        const dataIndex = imageEl.getAttribute('data-index') * 1;
        let focusEl = (imageContainer.previousElementSibling || imageContainer.nextElementSibling);
        
        const emptyDiv = imageContainer.parentNode;
        this.util.removeItem(imageContainer);
        this.plugins.image.init.call(this);
        this.controllersOff();

        if (emptyDiv !== this.context.element.wysiwyg) this.util.removeItemAllParents(emptyDiv, function (current) { return current.childNodes.length === 0; }, null);

        // focus
        this.focusEdge(focusEl);
        
        // event
        if (dataIndex >= 0) {
            const imagesInfo = this.context.image._imagesInfo;

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

    /**
     * @overriding dialog
     */
    init: function () {
        const contextImage = this.context.image;
        if (contextImage.imgInputFile) contextImage.imgInputFile.value = '';
        if (contextImage.imgUrlFile) contextImage.imgUrlFile.value = '';
        if (contextImage.imgInputFile && contextImage.imgUrlFile) contextImage.imgUrlFile.removeAttribute('disabled');
        contextImage.altText.value = '';
        contextImage.imgLink.value = '';
        contextImage.imgLinkNewWindowCheck.checked = false;
        contextImage.modal.querySelector('input[name="suneditor_image_radio"][value="none"]').checked = true;
        contextImage.captionCheckEl.checked = false;
        contextImage._element = null;
        this.plugins.image.openTab.call(this, 'init');

        if (contextImage._resizing) {
            contextImage.inputX.value = this.context.option.imageWidth === contextImage._defaultSizeX ? '' : this.context.option.imageWidth;
            contextImage.inputY.value = this.context.option.imageHeight === contextImage._defaultSizeY ? '' : this.context.option.imageHeight;
            contextImage.proportion.checked = true;
            contextImage._ratio = false;
            contextImage._ratioX = 1;
            contextImage._ratioY = 1;
        }
    }
});


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_dialog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_dialog__WEBPACK_IMPORTED_MODULE_0__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'link',
    display: 'dialog',
    add: function (core) {
        core.addModule([_modules_dialog__WEBPACK_IMPORTED_MODULE_0___default.a]);

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

        /** link controller */
        let link_controller = this.setController_LinkButton.call(core);
        context.link.linkController = link_controller;
        context.link._linkAnchor = null;
        link_controller.addEventListener('mousedown', function (e) { e.stopPropagation(); }, false);

        /** add event listeners */
        link_dialog.querySelector('.se-btn-primary').addEventListener('click', this.submit.bind(core));
        link_controller.addEventListener('click', this.onClick_linkController.bind(core));

        /** append html */
        context.dialog.modal.appendChild(link_dialog);

        /** append controller */
        context.element.relative.appendChild(link_controller);

        /** empty memory */
        link_dialog = null, link_controller = null;
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
                    '<button type="button" data-command="close" class="se-btn se-dialog-close" aria-label="Close" title="' + lang.dialogBox.close + '">' +
                        this.icons.cancel +
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
        const icons = this.icons;
        const link_btn = this.util.createElement('DIV');

        link_btn.className = 'se-controller se-controller-link';
        link_btn.innerHTML = '' +
            '<div class="se-arrow se-arrow-up"></div>' +
            '<div class="link-content"><span><a target="_blank" href=""></a>&nbsp;</span>' +
                '<div class="se-btn-group">' +
                    '<button type="button" data-command="update" tabindex="-1" class="se-btn se-tooltip">' +
                        icons.edit +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.edit + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="unlink" tabindex="-1" class="se-btn se-tooltip">' +
                        icons.unlink +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.unlink + '</span></span>' +
                    '</button>' +
                    '<button type="button" data-command="delete" tabindex="-1" class="se-btn se-tooltip">' +
                        icons.delete +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.remove + '</span></span>' +
                    '</button>' +
                '</div>' +
            '</div>';

        return link_btn;
    },

    /**
     * @overriding dialog
     */
    open: function () {
        this.plugins.dialog.open.call(this, 'link', 'link' === this.currentControllerName);
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
                const textNode = contextLink._linkAnchor.childNodes[0];
                this.setRange(textNode, 0, textNode, textNode.textContent.length);
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

    /**
     * @overriding core
     */
    active: function (element) {
        if (!element) {
            if (this.controllerArray.indexOf(this.context.link.linkController) > -1) {
                this.controllersOff();
            }
        } else if (this.util.isAnchor(element) && element.getAttribute('data-image-link') === null) {
            if (this.controllerArray.indexOf(this.context.link.linkController) < 0) {
                this.plugins.link.call_controller.call(this, element);
            }
            return true;
        }

        return false;
    },

    /**
     * @overriding dialog
     */
    on: function (update) {
        if (!update) {
            this.plugins.link.init.call(this);
            this.context.link.linkAnchorText.value = this.getSelection().toString();
        } else if (this.context.link._linkAnchor) {
            this.context.dialog.updateModal = true;
            this.context.link.focusElement.value = this.context.link._linkAnchor.href;
            this.context.link.linkAnchorText.value = this.context.link._linkAnchor.textContent;
            this.context.link.linkNewWindowCheck.checked = (/_blank/i.test(this.context.link._linkAnchor.target) ? true : false);
        }
    },

    call_controller: function (selectionATag) {
        this.editLink = this.context.link._linkAnchor = selectionATag;
        const linkBtn = this.context.link.linkController;
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
        
        this.controllersOn(linkBtn, selectionATag, 'link');
    },

    onClick_linkController: function (e) {
        e.stopPropagation();

        const command = e.target.getAttribute('data-command') || e.target.parentNode.getAttribute('data-command');
        if (!command) return;

        e.preventDefault();

        if (/update/.test(command)) {
            const contextLink = this.context.link;
            contextLink.focusElement.value = contextLink._linkAnchor.href;
            contextLink.linkAnchorText.value = contextLink._linkAnchor.textContent;
            contextLink.linkNewWindowCheck.checked = (/_blank/i.test(contextLink._linkAnchor.target) ? true : false);
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

    /**
     * @overriding dialog
     */
    init: function () {
        const contextLink = this.context.link;
        contextLink.linkController.style.display = 'none';
        contextLink._linkAnchor = null;
        contextLink.focusElement.value = '';
        contextLink.linkAnchorText.value = '';
        contextLink.linkNewWindowCheck.checked = false;
    }
});


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_dialog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_dialog__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_resizing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _modules_resizing__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_resizing__WEBPACK_IMPORTED_MODULE_1__);
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */





/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'video',
    display: 'dialog',
    add: function (core) {
        core.addModule([_modules_dialog__WEBPACK_IMPORTED_MODULE_0___default.a, _modules_resizing__WEBPACK_IMPORTED_MODULE_1___default.a]);

        const context = core.context;
        const contextVideo = context.video = {
            _videosInfo: [],
            _videoIndex: 0,
            sizeUnit: context.option._videoSizeUnit,
            _align: 'none',
            _floatClassRegExp: '__se__float\\-[a-z]+',
            _youtubeQuery: context.option.youtubeQuery,
            _videoRatio: (context.option.videoRatio * 100) + '%',
            _defaultRatio: (context.option.videoRatio * 100) + '%',
            // @overriding resizing properties
            inputX: null,
            inputY: null,
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
            _origin_h: context.option.videoHeight === '56.25%' ? '' : context.option.videoHeight,
            _proportionChecked: true,
            _resizing: context.option.videoResizing,
            _resizeDotHide: !context.option.videoHeightShow,
            _rotation: context.option.videoRotation,
            _onlyPercentage: context.option.videoSizeOnlyPercentage,
            _ratio: false,
            _ratioX: 1,
            _ratioY: 1,
            _captionShow: false
        };

        /** video dialog */
        let video_dialog = this.setDialog.call(core);
        contextVideo.modal = video_dialog;
        contextVideo.focusElement = video_dialog.querySelector('._se_video_url');

        /** add event listeners */
        video_dialog.querySelector('.se-btn-primary').addEventListener('click', this.submit.bind(core));

        contextVideo.proportion = {};
        contextVideo.videoRatioOption = {};
        contextVideo.inputX = {};
        contextVideo.inputY = {};
        if (context.option.videoResizing) {
            contextVideo.proportion = video_dialog.querySelector('._se_video_check_proportion');
            contextVideo.videoRatioOption = video_dialog.querySelector('.se-video-ratio');
            contextVideo.inputX = video_dialog.querySelector('._se_video_size_x');
            contextVideo.inputY = video_dialog.querySelector('._se_video_size_y');
            contextVideo.inputX.value = context.option.videoWidth;
            contextVideo.inputY.value = context.option.videoHeight;

            contextVideo.inputX.addEventListener('keyup', this.setInputSize.bind(core, 'x'));
            contextVideo.inputY.addEventListener('keyup', this.setInputSize.bind(core, 'y'));

            contextVideo.inputX.addEventListener('change', this.setRatio.bind(core));
            contextVideo.inputY.addEventListener('change', this.setRatio.bind(core));
            contextVideo.proportion.addEventListener('change', this.setRatio.bind(core));
            contextVideo.videoRatioOption.addEventListener('change', this.setVideoRatio.bind(core));

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
                    '<button type="button" data-command="close" class="se-btn se-dialog-close" aria-label="Close" title="' + lang.dialogBox.close + '">' +
                        this.icons.cancel +
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
                        '<button type="button" title="' + lang.dialogBox.revertButton + '" class="se-btn se-dialog-btn-revert" style="float: right;">' + this.icons.revert + '</button>' +
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

    /**
     * @overriding dialog
     */
    open: function () {
        this.plugins.dialog.open.call(this, 'video', 'video' === this.currentControllerName);
    },
    
    setVideoRatio: function (e) {
        const contextVideo = this.context.video;
        const value = e.target.options[e.target.selectedIndex].value;

        contextVideo._defaultSizeY = contextVideo._videoRatio = !value ? contextVideo._defaultSizeY : (value * 100) + '%';
        contextVideo.inputY.placeholder = !value ? '' : (value * 100) + '%';
        contextVideo.inputY.value = '';
    },

    /**
     * @overriding resizing
     * @param {String} xy 'x': width, 'y': height
     * @param {KeyboardEvent} e Event object
     */
    setInputSize: function (xy, e) {
        if (e && e.keyCode === 32) {
            e.preventDefault();
            return;
        }

        const contextVideo = this.context.video;
        this.plugins.resizing._module_setInputSize.call(this, contextVideo, xy);

        if (xy === 'y') {
            this.plugins.video.setVideoRatioSelect.call(this, e.target.value || contextVideo._defaultRatio);
        }
    },

    /**
     * @overriding resizing
     */
    setRatio: function () {
        this.plugins.resizing._module_setRatio.call(this, this.context.video);
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

        let init = false;
        /** update */
        if (this.context.dialog.updateModal) {
            if (contextVideo._element.src !== oIframe.src) {
                contextVideo._element.src = oIframe.src;
                init = true;
            }
            container = contextVideo._container;
            cover = this.util.getParentElement(contextVideo._element, 'FIGURE');
            oIframe = contextVideo._element;
        }
        /** create */
        else {
            init = true;
            oIframe.frameBorder = '0';
            oIframe.allowFullscreen = true;
            contextVideo._element = oIframe;

            /** cover */
            cover = this.plugins.resizing.set_cover.call(this, oIframe);

            /** container */
            container = this.plugins.resizing.set_container.call(this, cover, 'se-video-container');
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
        } else if (contextVideo._resizing && this.context.resizing._rotateVertical && changeSize) {
            this.plugins.resizing.setTransformSize.call(this, oIframe, null, null);
        }

        if (init) {
            this.plugins.video.setVideosInfo.call(this, oIframe);
        }

        this.context.resizing._resize_plugin = '';

        // history stack
        if (this.context.dialog.updateModal) {
            this.history.push(false);
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
        if (!oIframe) return;

        const contextVideo = this.context.video;
        oIframe.frameBorder = '0';
        oIframe.allowFullscreen = true;
        
        const existElement = this.util.getParentElement(oIframe, this.util.isMediaComponent) || 
            this.util.getParentElement(oIframe, function (current) {
                return this.isWysiwygDiv(current.parentNode);
            }.bind(this.util));

        contextVideo._element = oIframe = oIframe.cloneNode(false);
        const cover = contextVideo._cover = this.plugins.resizing.set_cover.call(this, oIframe);
        const container = contextVideo._container = this.plugins.resizing.set_container.call(this, cover, 'se-video-container');

        const figcaption = existElement.querySelector('figcaption');
        let caption = null;
        if (!!figcaption) {
            caption = this.util.createElement('DIV');
            caption.innerHTML = figcaption.innerHTML;
            this.util.removeItem(figcaption);
        }

        const size = (oIframe.getAttribute('data-size') || oIframe.getAttribute('data-origin') || '').split(',');
        this.plugins.video.applySize.call(this, (size[0] || this.context.option.videoWidth), (size[1] || this.context.option.videoHeight));

        existElement.parentNode.replaceChild(container, existElement);
        if (!!caption) existElement.parentNode.insertBefore(caption, container.nextElementSibling);
        this.plugins.video.setVideosInfo.call(this, oIframe);
    },

    /**
     * @overriding resizing
     */
    onModifyMode: function (element, size) {
        const contextVideo = this.context.video;
        contextVideo._element = element;
        contextVideo._cover = this.util.getParentElement(element, 'FIGURE');
        contextVideo._container = this.util.getParentElement(element, this.util.isMediaComponent);

        contextVideo._align = element.getAttribute('data-align') || 'none';

        if (size) {
            contextVideo._element_w = size.w;
            contextVideo._element_h = size.h;
            contextVideo._element_t = size.t;
            contextVideo._element_l = size.l;
        }

        let origin = contextVideo._element.getAttribute('data-size') || contextVideo._element.getAttribute('data-origin');
        if (origin) {
            origin = origin.split(',');
            contextVideo._origin_w = origin[0];
            contextVideo._origin_h = origin[1];
        } else if (size) {
            contextVideo._origin_w = size.w;
            contextVideo._origin_h = size.h;
        }
    },

    /**
     * @overriding resizing
     */
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

    /**
     * @overriding dialog
     */
    on: function (update) {
        const contextVideo = this.context.video;

        if (!update) {
            contextVideo.inputX.value = contextVideo._origin_w = this.context.option.videoWidth === contextVideo._defaultSizeX ? '' : this.context.option.videoWidth;
            contextVideo.inputY.value = contextVideo._origin_h = this.context.option.videoHeight === contextVideo._defaultSizeY ? '' : this.context.option.videoHeight;
            contextVideo.proportion.disabled = true;
        }

        if (contextVideo._resizing) {
            this.plugins.video.setVideoRatioSelect.call(this, contextVideo._origin_h || contextVideo._defaultRatio);
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

    setVideosInfo: function (frame) {
        const _resize_plugin = this.context.resizing._resize_plugin;
        this.context.resizing._resize_plugin = 'video';

        const videosInfo = this.context.video._videosInfo;
        let dataIndex = frame.getAttribute('data-index');
        let info = null;
        let state = '';

        // create
        if (!dataIndex || this._componentsInfoInit) {
            state = 'create';
            dataIndex = this.context.video._videoIndex++;

            frame.setAttribute('data-index', dataIndex);

            info = {
                src: frame.src,
                index: dataIndex * 1
            };

            videosInfo.push(info);
        } else { // update
            state = 'update';
            dataIndex *= 1;
    
            for (let i = 0, len = videosInfo.length; i < len; i++) {
                if (dataIndex === videosInfo[i].index) {
                    info = videosInfo[i];
                    break;
                }
            }

            if (!info) {
                dataIndex = this.context.video._videoIndex++;
                info = { index: dataIndex };
                videosInfo.push(info);
            }

            info.src = frame.src;
        }

        // method bind
        info.element = frame;
        info.delete = this.plugins.video.destroy.bind(this, frame);
        info.select = function () {
            frame.scrollIntoView(true);
            this._w.setTimeout(function () {
                this.plugins.video.onModifyMode.call(this, frame, this.plugins.resizing.call_controller_resize.call(this, frame, 'video'));
            }.bind(this));
        }.bind(this);

        if (!frame.getAttribute('data-origin')) {
            const container = this.util.getParentElement(frame, this.util.isMediaComponent);
            const cover = this.util.getParentElement(frame, 'FIGURE');

            const w = this.plugins.resizing._module_getSizeX.call(this, this.context.video, frame, cover, container);
            const h = this.plugins.resizing._module_getSizeY.call(this, this.context.video, frame, cover, container);
            
            frame.setAttribute('data-origin', w + ',' + h);
            frame.setAttribute('data-size', w + ',' + h);
        }

        if (!frame.style.width) {
            const size = (frame.getAttribute('data-size') || frame.getAttribute('data-origin') || '').split(',');
            this.plugins.video.onModifyMode.call(this, frame, null);
            this.plugins.video.applySize.call(this, (size[0] || this.context.option.videoWidth), (size[1] || this.context.option.videoHeight));
        }

        this.context.resizing._resize_plugin = _resize_plugin;
        this._videoUpload(frame, dataIndex, state, info, 0);
    },

    /**
     * @overriding core
     */
    checkComponentInfo: function () {
        const videos = [].slice.call(this.context.element.wysiwyg.getElementsByTagName('IFRAME'));
        const videoPlugin = this.plugins.video;
        const videosInfo = this.context.video._videosInfo;

        if (videos.length === videosInfo.length) {
            // reset
            if (this._componentsInfoReset) {
                for (let i = 0, len = videos.length, frame; i < len; i++) {
                    frame = videos[i];
                    videoPlugin.setVideosInfo.call(this, frame);
                }
                return;
            } else {
                let infoUpdate = false;
                for (let i = 0, len = videosInfo.length, info; i < len; i++) {
                    info = videosInfo[i];
                    if (videos.filter(function (frame) { return info.src === frame.src && info.index.toString() === frame.getAttribute('data-index'); }).length === 0) {
                        infoUpdate = true;
                        break;
                    }
                }
                // pass
                if (!infoUpdate) return;
            }
        }

        const _resize_plugin = this.context.resizing._resize_plugin;
        this.context.resizing._resize_plugin = 'video';
        const currentVideos = [];
        const infoIndex = [];
        for (let i = 0, len = videosInfo.length; i < len; i++) {
            infoIndex[i] = videosInfo[i].index;
        }

        for (let i = 0, len = videos.length, video, container; i < len; i++) {
            video = videos[i];
            container = this.util.getParentElement(video, this.util.isMediaComponent);
            if (!container || container.getElementsByTagName('figcaption').length > 0) {
                currentVideos.push(this.context.video._videoIndex);
                videoPlugin._update_videoCover.call(this, video);
            } else if (!video.getAttribute('data-index') || infoIndex.indexOf(video.getAttribute('data-index') * 1) < 0) {
                currentVideos.push(this.context.video._videoIndex);
                video.removeAttribute('data-index');
                videoPlugin.setVideosInfo.call(this, video);
            } else {
                currentVideos.push(video.getAttribute('data-index') * 1);
            }
        }

        for (let i = 0, dataIndex; i < videosInfo.length; i++) {
            dataIndex = videosInfo[i].index;
            if (currentVideos.indexOf(dataIndex) > -1) continue;

            videosInfo.splice(i, 1);
            this._videoUpload(null, dataIndex, 'delete', null, 0);
            i--;
        }

        this.context.resizing._resize_plugin = _resize_plugin;
    },

    /**
     * @overriding core
     */
    resetComponentInfo: function () {
        this.context.video._videosInfo = [];
        this.context.video._videoIndex = 0;
    },

    sizeRevert: function () {
        this.plugins.resizing._module_sizeRevert.call(this, this.context.video);
    },

    applySize: function (w, h) {
        const contextVideo = this.context.video;

        if (!w) w = contextVideo.inputX.value;
        if (!h) h = contextVideo.inputY.value;
        
        if (contextVideo._onlyPercentage || /%$/.test(w) || !w) {
            this.plugins.video.setPercentSize.call(this, (w || '100%'), (h || (/%$/.test(contextVideo._videoRatio) ? contextVideo._videoRatio : contextVideo._defaultRatio)));
            return true;
        } else if ((!w || w === 'auto') && (!h || h === 'auto')) {
            this.plugins.video.setAutoSize.call(this);
        } else {
            this.plugins.video.setSize.call(this, w, (h || contextVideo._videoRatio || contextVideo._defaultRatio), false);
        }

        return false;
    },

    /**
     * @overriding resizing
     */
    setSize: function (w, h, notResetPercentage, direction) {
        const contextVideo = this.context.video;
        const onlyW = /^(rw|lw)$/.test(direction);
        const onlyH = /^(th|bh)$/.test(direction);

        if (!onlyH) w = this.util.getNumber(w, 0);
        if (!onlyW) h = this.util.isNumber(h) ? h + contextVideo.sizeUnit : !h ? '' : h;

        if (!onlyH) contextVideo._element.style.width = w ? w + contextVideo.sizeUnit : '';
        if (!onlyW) contextVideo._cover.style.paddingBottom = contextVideo._cover.style.height = h;

        if (!onlyH && !/%$/.test(w)) {
            contextVideo._cover.style.width = '';
            contextVideo._container.style.width = '';
        }

        if (!onlyW && !/%$/.test(h)) {
            contextVideo._element.style.height = h;
        } else {
            contextVideo._element.style.height = '';
        }

        if (!notResetPercentage) contextVideo._element.removeAttribute('data-percentage');

        // save current size
        this.plugins.resizing._module_saveCurrentSize.call(this, contextVideo);
    },

    /**
     * @overriding resizing
     */
    setAutoSize: function () {
        this.plugins.video.setPercentSize.call(this, 100, this.context.video._defaultRatio);
    },

    /**
     * @overriding resizing
     */
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

    /**
     * @overriding resizing
     */
    setPercentSize: function (w, h) {
        const contextVideo = this.context.video;
        h = !!h && !/%$/.test(h) && !this.util.getNumber(h, 0) ? this.util.isNumber(h) ? h + '%' : h : this.util.isNumber(h) ? h + contextVideo.sizeUnit : (h || contextVideo._defaultRatio);

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

    /**
     * @overriding resizing
     */
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

    /**
     * @overriding resizing
     */
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
            cover.style.height = cover.style.height;
            cover.style.paddingBottom = !/%$/.test(cover.style.height) ? cover.style.height : this.util.getNumber((this.util.getNumber(cover.style.height, 2) / 100) * this.util.getNumber(cover.style.width, 2), 2) + '%';
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

    /**
     * @overriding resizing
     */
    destroy: function (element) {
        const frame = element || this.context.video._element;
        const container = this.context.video._container;
        const dataIndex = frame.getAttribute('data-index') * 1;
        let focusEl = (container.previousElementSibling || container.nextElementSibling);

        const emptyDiv = container.parentNode;
        this.util.removeItem(container);
        this.plugins.video.init.call(this);
        this.controllersOff();

        if (emptyDiv !== this.context.element.wysiwyg) this.util.removeItemAllParents(emptyDiv, function (current) { return current.childNodes.length === 0; }, null);

        // focus
        this.focusEdge(focusEl);

        // event
        if (dataIndex >= 0) {
            const videosInfo = this.context.video._videosInfo;

            for (let i = 0, len = videosInfo.length; i < len; i++) {
                if (dataIndex === videosInfo[i].index) {
                    videosInfo.splice(i, 1);
                    this._videoUpload(null, dataIndex, 'delete', null, 0);
                    break;
                }
            }
        }

        // history stack
        this.history.push(false);
    },

    /**
     * @overriding dialog
     */
    init: function () {
        const contextVideo = this.context.video;
        contextVideo.focusElement.value = '';
        contextVideo._origin_w = this.context.option.videoWidth;
        contextVideo._origin_h = this.context.option.videoHeight;

        contextVideo.modal.querySelector('input[name="suneditor_video_radio"][value="none"]').checked = true;
        
        if (contextVideo._resizing) {
            contextVideo.inputX.value = this.context.option.videoWidth === contextVideo._defaultSizeX ? '' : this.context.option.videoWidth;
            contextVideo.inputY.value = this.context.option.videoHeight === contextVideo._defaultSizeY ? '' : this.context.option.videoHeight;
            contextVideo.proportion.checked = true;
            contextVideo.proportion.disabled = true;
            this.plugins.video.setVideoRatioSelect.call(this, contextVideo._defaultRatio);
        }
    }
});


/***/ }),
/* 24 */
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
        code: 'da',
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
            math: 'Math',
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
            mathBox: {
                title: 'Math',
                inputLabel: 'Matematisk notation',
                fontSizeLabel: 'Skriftstørrelse',
                previewLabel: 'Preview'
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
            fixedColumnWidth: 'Fast søjlebredde',
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
/* 25 */
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
        code: 'de',
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
            math: 'Mathematik',
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
            mathBox: {
                title: 'Mathematik',
                inputLabel: 'Mathematische Notation',
                fontSizeLabel: 'Schriftgröße',
                previewLabel: 'Vorschau'
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
            fixedColumnWidth: 'Feste Spaltenbreite',
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
/* 26 */
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
		code: 'es',
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
			math: 'Matemáticas',
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
			mathBox: {
                title: 'Matemáticas',
                inputLabel: 'Notación Matemática',
                fontSizeLabel: 'Tamaño de fuente',
                previewLabel: 'Vista previa'
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
			fixedColumnWidth: 'Ancho de columna fijo',
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
        code: 'fr',
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
            math: 'Math',
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
            mathBox: {
                title: 'Math',
                inputLabel: 'Notation mathématique',
                fontSizeLabel: 'Taille',
                previewLabel: 'Previsualiser'
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
            fixedColumnWidth: 'Largeur de colonne fixe',
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
/* 28 */
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
        code: 'ja',
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
            math: '数学',
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
            mathBox: {
                title: '数学',
                inputLabel: '数学表記',
                fontSizeLabel: 'サイズ',
                previewLabel: 'プレビュー'
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
            fixedColumnWidth: '固定列幅',
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
/* 29 */
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
        code: 'ko',
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
            math: '수식',
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
            mathBox: {
                title: '수식',
                inputLabel: '수학적 표기법',
                fontSizeLabel: '글자 크기',
                previewLabel: '미리보기'
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
            fixedColumnWidth: '고정 된 열 너비',
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
/* 30 */
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
        code: 'pt_br',
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
            math: 'Matemática',
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
            mathBox: {
                title: 'Matemática',
                inputLabel: 'Notação matemática',
                fontSizeLabel: 'Tamanho',
                previewLabel: 'Prever'
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
            fixedColumnWidth: 'Largura fixa da coluna',
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
/* 31 */
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
        code: 'ru',
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
            math: 'математический',
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
            mathBox: {
                title: 'математический',
                inputLabel: 'Математическая запись',
                fontSizeLabel: 'Кегль',
                previewLabel: 'Предварительный просмотр'
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
            fixedColumnWidth: 'Фиксированная ширина столбца',
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
/* 32 */
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
        code: 'zh_cn',
        toolbar: {
            default: '默认',
            save: '保存',
            font: '字体',
            formats: '格式',
            fontSize: '字号',
            bold: '粗体',
            underline: '下划线',
            italic: '斜体',
            strike: '删除线',
            subscript: '下标',
            superscript: '上标',
            removeFormat: '清除格式',
            fontColor: '字体颜色',
            hiliteColor: '背景颜色',
            indent: '增加缩进',
            outdent: '减少缩进',
            align: '对齐方式',
            alignLeft: '左对齐',
            alignRight: '右对齐',
            alignCenter: '居中',
            alignJustify: '两端对齐',
            list: '列表',
            orderList: '有序列表',
            unorderList: '无序列表',
            horizontalRule: '水平线',
            hr_solid: '实线',
            hr_dotted: '点线',
            hr_dashed: '虚线',
            table: '表格',
            link: '超链接',
            math: '数学',
            image: '图片',
            video: '视频',
            fullScreen: '全屏',
            showBlocks: '显示块区域',
            codeView: '代码视图',
            undo: '撤消',
            redo: '恢复',
            preview: '预览',
            print: '打印',
            tag_p: '段落',
            tag_div: '正文 (DIV)',
            tag_h: '标题',
            tag_blockquote: '引用',
            tag_pre: '代码',
            template: '模板',
            lineHeight: '行高',
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
            mathBox: {
                title: '数学',
                inputLabel: '数学符号',
                fontSizeLabel: '字号',
                previewLabel: '预览'
            },
            imageBox: {
                title: '插入图片',
                file: '上传图片',
                url: '图片网址',
                altText: '替换文字'
            },
            videoBox: {
                title: '插入视频',
                url: '嵌入网址'
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
            fixedColumnWidth: '固定列宽',
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
            tableHeader: '表格标题',
            mergeCells: '合并单元格',
            splitCells: '分割单元格',
            HorizontalSplit: '水平分割',
            VerticalSplit: '垂直分割'
        },
        menu: {
            spaced: '间隔开',
            bordered: '边界线',
            neon: '霓虹灯',
            translucent: '半透明',
            shadow: '阴影'
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(34);

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
/* 34 */
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
/* 35 */
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
var external_react_ = __webpack_require__(5);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// CONCATENATED MODULE: ./node_modules/suneditor/src/assets/defaultIcons.js
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2020 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ var defaultIcons = ({
   redo: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.59 14.18"><g><path d="M11.58,18.48a6.84,6.84,0,1,1,6.85-6.85s0,.26,0,.67a8,8,0,0,1-.22,1.44l.91-.55a.51.51,0,0,1,.36,0,.45.45,0,0,1,.29.22.47.47,0,0,1,.06.36.45.45,0,0,1-.22.29L17.42,15.3l-.12,0h-.25l-.12-.06-.09-.09-.06-.07,0-.06-.87-2.12a.43.43,0,0,1,0-.37.49.49,0,0,1,.27-.26.41.41,0,0,1,.36,0,.53.53,0,0,1,.27.26l.44,1.09a6.51,6.51,0,0,0,.24-1.36,4.58,4.58,0,0,0,0-.64,5.83,5.83,0,0,0-1.73-4.17,5.88,5.88,0,0,0-8.34,0,5.9,5.9,0,0,0,4.17,10.06.51.51,0,0,1,.33.15.48.48,0,0,1,0,.68.53.53,0,0,1-.33.12Z" transform="translate(-4.48 -4.54)"/></g></svg>',
   undo: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.59 14.18"><g><path d="M5,14a.43.43,0,0,1-.22-.29.46.46,0,0,1,.06-.36.43.43,0,0,1,.29-.22.56.56,0,0,1,.36,0l.91.55a8.27,8.27,0,0,1-.22-1.45,5.07,5.07,0,0,1,0-.67A6.85,6.85,0,1,1,13,18.47a.44.44,0,0,1-.33-.13.48.48,0,0,1,0-.68.51.51,0,0,1,.33-.15A5.89,5.89,0,0,0,17.15,7.45a5.88,5.88,0,0,0-8.33,0,5.84,5.84,0,0,0-1.73,4.17s0,.25,0,.65a6.49,6.49,0,0,0,.24,1.37l.44-1.09a.57.57,0,0,1,.27-.26.41.41,0,0,1,.36,0,.53.53,0,0,1,.27.26.43.43,0,0,1,0,.37L7.82,15l0,.09-.09.09-.1.07-.06,0H7.28l-.13,0-1.09-.63c-.65-.36-1-.57-1.1-.63Z" transform="translate(-4.49 -4.53)"/></g></svg>',
   bold: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.76 15.75"><g><path d="M6.4,3.76V19.5h6.76a5.55,5.55,0,0,0,2-.32,4.93,4.93,0,0,0,1.52-1,4.27,4.27,0,0,0,1.48-3.34,3.87,3.87,0,0,0-.69-2.37,5.74,5.74,0,0,0-.71-.83,3.44,3.44,0,0,0-1.1-.65,3.6,3.6,0,0,0,1.58-1.36,3.66,3.66,0,0,0,.53-1.93,3.7,3.7,0,0,0-1.21-2.87,4.65,4.65,0,0,0-3.25-1.1H6.4Zm2.46,6.65V5.57h3.52a4.91,4.91,0,0,1,1.36.15,2.3,2.3,0,0,1,.85.45,2.06,2.06,0,0,1,.74,1.71,2.3,2.3,0,0,1-.78,1.92,2.54,2.54,0,0,1-.86.46,4.7,4.7,0,0,1-1.32.15H8.86Zm0,7.27V12.15H12.7a4.56,4.56,0,0,1,1.38.17,3.43,3.43,0,0,1,.95.49,2.29,2.29,0,0,1,.92,2,2.73,2.73,0,0,1-.83,2.1,2.66,2.66,0,0,1-.83.58,3.25,3.25,0,0,1-1.26.2H8.86Z" transform="translate(-6.4 -3.75)"/></g></svg>',
   underline: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.78 15.74"><g><path d="M14.64,3.76h2.52v7.72a4.51,4.51,0,0,1-.59,2.31,3.76,3.76,0,0,1-1.71,1.53,6.12,6.12,0,0,1-2.64.53,5,5,0,0,1-3.57-1.18,4.17,4.17,0,0,1-1.27-3.24V3.76H9.9v7.3a3,3,0,0,0,.55,2,2.3,2.3,0,0,0,1.83.65,2.26,2.26,0,0,0,1.8-.65,3.09,3.09,0,0,0,.55-2V3.76Zm2.52,13.31V19.5H7.39V17.08h9.77Z" transform="translate(-7.38 -3.76)"/></g></svg>',
   italic: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.49 15.76"><g><path d="M17.16,3.79l.37,0-.06.38-.14.52A10,10,0,0,1,16.21,5a9.37,9.37,0,0,0-1,.32,6.68,6.68,0,0,0-.25.89c-.06.31-.11.59-.14.85-.3,1.36-.52,2.41-.68,3.14l-.61,3.18L13.1,15l-.43,2.4-.12.46a.62.62,0,0,0,0,.28c.44.1.85.17,1.23.22l.68.11a4.51,4.51,0,0,1-.08.6l-.09.42a.92.92,0,0,0-.23,0l-.43,0a1.37,1.37,0,0,1-.29,0c-.13,0-.63-.08-1.49-.16l-2,0c-.28,0-.87,0-1.78.12L7,19.5l.17-.88.8-.2A6.61,6.61,0,0,0,9.19,18,2.62,2.62,0,0,0,9.61,17l.28-1.41.58-2.75.12-.66c.05-.3.11-.58.17-.86s.12-.51.17-.69l.12-.48.12-.43.31-1.6.15-.65.31-1.91V5.14a3.86,3.86,0,0,0-1.48-.29l-.38,0,.2-1.06,3.24.14.75,0c.45,0,1.18,0,2.18-.09.23,0,.46,0,.71,0Z" transform="translate(-7.04 -3.76)"/></g></svg>',
   strike: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 14.9"><g><path d="M12.94,13a4.27,4.27,0,0,1,1.32.58,1.46,1.46,0,0,1,.55,1.2,1.87,1.87,0,0,1-.88,1.64,4.17,4.17,0,0,1-2.35.59,4.44,4.44,0,0,1-2.74-.71,2.72,2.72,0,0,1-1-2.17H5.57a4.56,4.56,0,0,0,1.55,3.7,7,7,0,0,0,4.47,1.23,6,6,0,0,0,4.07-1.3,4.24,4.24,0,0,0,1.52-3.37,4,4,0,0,0-.26-1.4h-4ZM6.37,10.24A3.27,3.27,0,0,1,6,8.68a4,4,0,0,1,1.48-3.3,5.92,5.92,0,0,1,3.88-1.21,5.58,5.58,0,0,1,3.91,1.24,4.36,4.36,0,0,1,1.45,3.17H14.44a2.12,2.12,0,0,0-.91-1.81,4.45,4.45,0,0,0-2.44-.55,3.69,3.69,0,0,0-2,.51A1.64,1.64,0,0,0,8.3,8.22a1.3,1.3,0,0,0,.48,1.11,7,7,0,0,0,2.1.78l.28.06.28.08H6.37Zm13.09.68a.73.73,0,0,1,.49.21.66.66,0,0,1,.2.48.64.64,0,0,1-.2.48.71.71,0,0,1-.49.19H5.1a.67.67,0,0,1-.49-.19.66.66,0,0,1-.2-.48.64.64,0,0,1,.2-.48.73.73,0,0,1,.49-.21H19.46Z" transform="translate(-4.41 -4.17)"/></g></svg>',
   subscript: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.75 14.61"><g><path d="M15.38,4.33H12.74L11.19,7c-.28.46-.51.87-.69,1.21L10.07,9h0l-.44-.8c-.22-.4-.45-.81-.71-1.23L7.34,4.33H4.68L8.26,10,4.4,16.08H7.1l1.69-2.83c.38-.63.72-1.22,1-1.78l.25-.46h0l.49.92c.24.45.48.89.74,1.32L13,16.08h2.61L11.84,10l1.77-2.84,1.77-2.85Zm4.77,13.75H17v-.15c0-.4.05-.64.16-.72a4.42,4.42,0,0,1,1.16-.31,3.3,3.3,0,0,0,1.54-.56A1.84,1.84,0,0,0,20.15,15a1.78,1.78,0,0,0-.44-1.41A2.8,2.8,0,0,0,18,13.25a2.71,2.71,0,0,0-1.69.37,1.83,1.83,0,0,0-.44,1.43v.23H17v-.23q0-.63.18-.78a1.62,1.62,0,0,1,.88-.15,1.59,1.59,0,0,1,.88.15q.18.15.18.75t-.18.75a3.58,3.58,0,0,1-1.18.33,3.33,3.33,0,0,0-1.52.51,1.57,1.57,0,0,0-.32,1.18v1.15h4.27v-.86Z" transform="translate(-4.4 -4.33)"/></g></svg>',
   superscript: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.75 15.42"><g><path d="M12,13.14l3.61-5.81H12.94L11.33,10c-.28.46-.51.88-.69,1.25l-.45.83h0l-.45-.85c-.22-.41-.45-.82-.71-1.24L7.4,7.33H4.68l3.66,5.81L4.4,19.33H7.14l1.74-2.87q.58-1,1-1.83l.25-.48h0l.51.94.75,1.37,1.72,2.87h2.67l-1.92-3.09c-1.12-1.8-1.76-2.83-1.92-3.1Zm4.84-4.41h0l0,.15h3.27v.86H15.77V8.58a1.66,1.66,0,0,1,.33-1.22,3.51,3.51,0,0,1,1.56-.51,3.68,3.68,0,0,0,1.21-.34c.13-.1.19-.36.19-.77S19,5.07,18.87,5A1.63,1.63,0,0,0,18,4.8a1.58,1.58,0,0,0-.91.17c-.13.11-.19.38-.19.8V6H15.78V5.76a1.87,1.87,0,0,1,.45-1.47A2.84,2.84,0,0,1,18,3.91a2.8,2.8,0,0,1,1.72.38,1.84,1.84,0,0,1,.45,1.44,1.91,1.91,0,0,1-.34,1.35,3.24,3.24,0,0,1-1.58.57A3.69,3.69,0,0,0,17,8c-.12.1-.17.35-.17.76Z" transform="translate(-4.4 -3.91)"/></g></svg>',
   erase: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 13.76"><g><path d="M13.69,17.2h6.46v1.31H8.56L4.41,14.37,14,4.75l6.06,6.06L16.89,14l-3.2,3.19Zm-4.61,0h2.77L14.09,15,9.88,10.75,6.25,14.38l1.41,1.41c.84.82,1.31,1.29,1.42,1.41Z" transform="translate(-4.41 -4.75)"/></g></svg>',
   indent: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 12.36"><g><path d="M19.87,15.57a.27.27,0,0,1,.19.08.25.25,0,0,1,.08.19v1.69a.27.27,0,0,1-.08.19.25.25,0,0,1-.19.08H4.68a.27.27,0,0,1-.19-.08.25.25,0,0,1-.08-.19V15.84a.27.27,0,0,1,.27-.27H19.87ZM7.5,14.45a.25.25,0,0,1-.2-.09L4.76,11.84a.29.29,0,0,1,0-.4L7.3,8.9a.29.29,0,0,1,.4,0,.31.31,0,0,1,.07.2v5.06a.32.32,0,0,1-.08.21.26.26,0,0,1-.19.08ZM19.87,8.82a.27.27,0,0,1,.19.08.25.25,0,0,1,.08.19v1.69a.27.27,0,0,1-.08.19.25.25,0,0,1-.19.08H10.31a.27.27,0,0,1-.27-.27V9.1a.27.27,0,0,1,.27-.27h9.56Zm0,3.37a.27.27,0,0,1,.19.08.28.28,0,0,1,.08.21v1.68a.32.32,0,0,1-.08.21.25.25,0,0,1-.19.08H10.31a.27.27,0,0,1-.19-.08.3.3,0,0,1-.08-.21V12.48a.32.32,0,0,1,.08-.21.24.24,0,0,1,.19-.08h9.56Zm.2-6.66a.28.28,0,0,1,.08.2V7.41a.32.32,0,0,1-.08.21.25.25,0,0,1-.19.08H4.68a.27.27,0,0,1-.19-.08.3.3,0,0,1-.08-.21V5.73a.32.32,0,0,1,.08-.21.25.25,0,0,1,.19-.08H19.87a.28.28,0,0,1,.2.09Z" transform="translate(-4.41 -5.44)"/></g></svg>',
   outdent: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 12.36"><g><path d="M4.68,14.45a.27.27,0,0,1-.19-.08.3.3,0,0,1-.08-.21V9.1a.27.27,0,0,1,.08-.19.28.28,0,0,1,.2-.08.25.25,0,0,1,.19.07l2.54,2.54a.29.29,0,0,1,0,.4L4.88,14.36a.24.24,0,0,1-.2.09Zm15.19,1.12a.27.27,0,0,1,.19.08.25.25,0,0,1,.08.19v1.69a.27.27,0,0,1-.08.19.25.25,0,0,1-.19.08H4.68a.27.27,0,0,1-.19-.08.25.25,0,0,1-.08-.19V15.84a.27.27,0,0,1,.27-.27H19.87Zm0-3.38a.27.27,0,0,1,.19.08.28.28,0,0,1,.08.21v1.68a.32.32,0,0,1-.08.21.25.25,0,0,1-.19.08H10.31a.27.27,0,0,1-.19-.08.3.3,0,0,1-.08-.21V12.48a.32.32,0,0,1,.08-.21.24.24,0,0,1,.19-.08h9.56Zm0-3.37a.27.27,0,0,1,.19.08.25.25,0,0,1,.08.19v1.69a.27.27,0,0,1-.08.19.25.25,0,0,1-.19.08H10.31a.27.27,0,0,1-.27-.27V9.1a.27.27,0,0,1,.27-.27h9.56Zm.2-3.29a.28.28,0,0,1,.08.2V7.41a.32.32,0,0,1-.08.21.25.25,0,0,1-.19.08H4.68a.27.27,0,0,1-.19-.08.3.3,0,0,1-.08-.21V5.73a.32.32,0,0,1,.08-.21.25.25,0,0,1,.19-.08H19.87a.28.28,0,0,1,.2.09Z" transform="translate(-4.41 -5.44)"/></g></svg>',
   expansion: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 15.74"><g><path d="M11.8,13.06l-5.1,5.1H9.51V19.5H4.41V14.4H5.75v2.81L8.3,14.66q2.25-2.23,2.55-2.55Zm8.35-9.3v5.1H18.81V6.05l-5.1,5.1-1-1,5.1-5.1H15.05V3.76Z" transform="translate(-4.41 -3.76)"/></g></svg>',
   reduction: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 15.74"><g><path d="M14.91,10h2.87v1.38H12.55V6.12h1.38V9l5.24-5.24.48.49.49.48ZM6.77,11.92H12v5.23H10.62V14.26L5.37,19.5l-1-1L9.63,13.3H6.77Z" transform="translate(-4.4 -3.76)"/></g></svg>',
   code_view: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.73 11.8"><g><path d="M8.09,7.94a.76.76,0,0,1,.53.22.72.72,0,0,1,.21.52.76.76,0,0,1-.22.54L6.18,11.63l2.43,2.44a.69.69,0,0,1,.2.51.66.66,0,0,1-.21.51.75.75,0,0,1-.51.22.63.63,0,0,1-.51-.21h0L4.63,12.15a.7.7,0,0,1-.22-.53.67.67,0,0,1,.25-.55L7.57,8.16a.82.82,0,0,1,.52-.22Zm12.05,3.69a.7.7,0,0,1-.23.52L17,15.1h0a.66.66,0,0,1-.51.21.73.73,0,0,1-.51-.22.75.75,0,0,1-.22-.51.63.63,0,0,1,.21-.51l2.43-2.44L15.92,9.22a.73.73,0,0,1-.22-.53A.74.74,0,0,1,17,8.18h0l2.91,2.91a.67.67,0,0,1,.27.54Zm-5.9-5.9a.73.73,0,0,1,.61.32.71.71,0,0,1,.07.68L11,17a1,1,0,0,1-.22.32.6.6,0,0,1-.35.16.75.75,0,0,1-.69-.26.69.69,0,0,1-.12-.72L13.56,6.23a.75.75,0,0,1,.26-.35.74.74,0,0,1,.42-.15Z" transform="translate(-4.41 -5.73)"/></g></svg>',
   preview: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.65 15.66"><g><path d="M16.19,14.43l2.49,2.49a.73.73,0,0,1,.21.52.67.67,0,0,1-.22.51.7.7,0,0,1-.52.22.69.69,0,0,1-.51-.21l-2.49-2.48a5.17,5.17,0,0,1-1.34.69,4.64,4.64,0,0,1-1.48.24,4.78,4.78,0,1,1,0-9.56,4.79,4.79,0,0,1,1.84.36,4.9,4.9,0,0,1,1.56,1,4.77,4.77,0,0,1,.46,6.18ZM10,14a3.3,3.3,0,0,0,2.34.93A3.37,3.37,0,0,0,14.7,14a3.3,3.3,0,0,0-1.08-5.41,3.47,3.47,0,0,0-2.56,0A3,3,0,0,0,10,9.28,3.31,3.31,0,0,0,10,14ZM16,4a3.86,3.86,0,0,1,2.77,1.14A3.9,3.9,0,0,1,20,7.85v4a.77.77,0,0,1-.22.53.7.7,0,0,1-.52.21.72.72,0,0,1-.74-.74v-4a2.46,2.46,0,0,0-.72-1.73A2.37,2.37,0,0,0,16,5.45H8.53A2.42,2.42,0,0,0,6.08,7.89v7.52a2.41,2.41,0,0,0,.71,1.73,2.46,2.46,0,0,0,1.74.72h4.08a.73.73,0,0,1,0,1.46H8.53a3.85,3.85,0,0,1-2.78-1.14A3.93,3.93,0,0,1,4.6,15.4V7.87A3.94,3.94,0,0,1,5.76,5.09,3.88,3.88,0,0,1,8.54,4H16Z" transform="translate(-4.45 -3.8)"/></g></svg>',
   print: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.05 16.04"><g><path d="M19.76,15.84a1.29,1.29,0,0,0,.39-.92V8.35A2.05,2.05,0,0,0,19.57,7a1.93,1.93,0,0,0-1.38-.57H6.37a1.95,1.95,0,0,0-2,2v6.56a1.23,1.23,0,0,0,.38.92,1.35,1.35,0,0,0,.93.38h2V14.9l-2,0V8.35a.67.67,0,0,1,.18-.47.62.62,0,0,1,.48-.19H18.18a.6.6,0,0,1,.46.19.66.66,0,0,1,.18.47V14.9h-2v1.32h2A1.35,1.35,0,0,0,19.76,15.84ZM17.52,7.69V5.06a1.31,1.31,0,0,0-.38-.92,1.34,1.34,0,0,0-.94-.38H8.34A1.3,1.3,0,0,0,7,5.06V7.69H8.34V5.06h7.87V7.69h1.31ZM8.34,12.93h7.87l0,5.26H8.34V12.93Zm7.87,5.26v0Zm.65,1.31a.6.6,0,0,0,.46-.19.72.72,0,0,0,.2-.47V12.29a.74.74,0,0,0-.2-.47.6.6,0,0,0-.46-.19H7.68a.6.6,0,0,0-.46.19.72.72,0,0,0-.2.47v6.55a.74.74,0,0,0,.2.47.6.6,0,0,0,.46.19h9.18ZM16.67,9.28a.7.7,0,0,0-.94,0,.63.63,0,0,0-.18.46.67.67,0,0,0,.18.47.68.68,0,0,0,.94,0,.66.66,0,0,0,.18-.47A.58.58,0,0,0,16.67,9.28Z" transform="translate(-4.25 -3.61)"/></g></svg>',
   template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.27 15.64"><g><path d="M18.18,19.16a1,1,0,0,0,1-1V5.73a1,1,0,0,0-1-1h-2v1h2V18.19H6.37V5.73h2v-1h-2A.94.94,0,0,0,5.68,5a1,1,0,0,0-.29.7V18.18a.94.94,0,0,0,.29.69,1,1,0,0,0,.69.29H18.18ZM9.82,10.31h4.92a.49.49,0,0,0,.35-.15.47.47,0,0,0,.15-.35.49.49,0,0,0-.15-.35.47.47,0,0,0-.35-.15H9.82a.49.49,0,0,0-.35.15.47.47,0,0,0-.15.35.49.49,0,0,0,.15.35.47.47,0,0,0,.35.15Zm5.9,4.92H8.83a.49.49,0,0,0-.35.15.47.47,0,0,0-.15.35.49.49,0,0,0,.15.35.47.47,0,0,0,.35.15h6.89a.49.49,0,0,0,.35-.15.47.47,0,0,0,.15-.35.51.51,0,0,0-.5-.5ZM7.36,12.77a.49.49,0,0,0,.15.35.47.47,0,0,0,.35.15h8.85a.49.49,0,0,0,.35-.15.47.47,0,0,0,.15-.35.49.49,0,0,0-.15-.35.47.47,0,0,0-.35-.15H7.85a.49.49,0,0,0-.35.15.52.52,0,0,0-.14.35Z" transform="translate(-5.14 -3.77)"/><path d="M14.24,6.71a1,1,0,0,0,1-1,1,1,0,0,0-1-1,1,1,0,0,0-1-1h-2a.94.94,0,0,0-.69.28,1,1,0,0,0-.29.7A.94.94,0,0,0,9.62,5a.91.91,0,0,0-.29.69,1,1,0,0,0,.29.7,1,1,0,0,0,.69.29h3.93Z" transform="translate(-5.14 -3.77)"/></g></svg>',
   line_height: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.76 13.56"><g><path d="M4.4,4.88V8.26a2,2,0,0,0,.5.39s.1,0,.18-.12a.62.62,0,0,0,.17-.28c.06-.19.13-.44.21-.74s.14-.52.19-.66a.58.58,0,0,1,.21-.3,2.41,2.41,0,0,1,.63-.21,3.83,3.83,0,0,1,.88-.12,9.15,9.15,0,0,1,1.31.06.16.16,0,0,1,.11,0,.26.26,0,0,1,.06.14,4,4,0,0,1,0,.49v2l.05,3.77c0,1.41,0,2.68-.05,3.81a1.79,1.79,0,0,1-.11.49,10.68,10.68,0,0,1-1.4.45,1.12,1.12,0,0,0-.69.43v.31l0,.22.61,0c.85-.08,1.54-.12,2.06-.12a19.76,19.76,0,0,1,2.09.08,15.08,15.08,0,0,0,1.64.08,1.4,1.4,0,0,0,.29,0,1.58,1.58,0,0,0,0-.26l-.05-.43a2.26,2.26,0,0,0-.43-.17l-.77-.22-.15,0a2.55,2.55,0,0,1-.78-.28,2.56,2.56,0,0,1-.11-.75l0-1.29,0-3.15V7.53a10.51,10.51,0,0,1,.06-1.2,3.83,3.83,0,0,1,.6,0l1.88,0a2.18,2.18,0,0,1,.38,0,.45.45,0,0,1,.23.17.9.9,0,0,1,.05.25c0,.16.06.35.1.58a3.33,3.33,0,0,0,.14.55A6.39,6.39,0,0,0,15,9a2.91,2.91,0,0,0,.6-.15,2.77,2.77,0,0,0,0-.46l0-.51,0-2.95-.25,0-.38,0L15,4.94a.71.71,0,0,1-.18.15.45.45,0,0,1-.25.07l-.29,0H8.75l-.15,0H7.45a17,17,0,0,1-1.86,0L5.36,5l-.25-.13ZM19.75,16.14h-.69v-9h.69A.4.4,0,0,0,20.13,7c.06-.11,0-.24-.1-.39L18.92,5.15a.52.52,0,0,0-.86,0L17,6.58c-.12.15-.16.28-.1.39s.18.16.38.16h.69v9h-.69a.4.4,0,0,0-.38.16c-.06.11,0,.24.1.39l1.11,1.43a.52.52,0,0,0,.86,0L20,16.69c.12-.15.16-.28.1-.39a.4.4,0,0,0-.38-.16Z" transform="translate(-4.4 -4.86)"/></g></svg>',
   paragraph_style: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.81 15.74"><g><path d="M18.18,3.76v2h-2V19.5h-2V5.73h-2V19.5h-2V11.63a3.94,3.94,0,0,1,0-7.87h7.87Z" transform="translate(-6.37 -3.76)"/></g></svg>',
   text_style: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.76 15.74"><g><path d="M17.68,6.71a2.22,2.22,0,0,0,1.06-.22.74.74,0,0,0,.42-.7.73.73,0,0,0-.08-.33.67.67,0,0,0-.17-.22,1,1,0,0,0-.31-.15L18.26,5l-.45-.09A15.27,15.27,0,0,0,13.26,5V4.74c0-.66-.63-1-1.92-1-.24,0-.43.15-.59.46a4,4,0,0,0-.36,1.14h0v0a26.45,26.45,0,0,1-3.5.35A2,2,0,0,0,5.77,6a.84.84,0,0,0-.37.79,2.14,2.14,0,0,0,.41,1.29,1.23,1.23,0,0,0,1.05.63,16.62,16.62,0,0,0,3.29-.45l-.34,3.35c-.16,1.61-.29,2.9-.37,3.86s-.12,1.66-.12,2.09l0,.65a5.15,5.15,0,0,0,.05.6,1.28,1.28,0,0,0,.16.54.34.34,0,0,0,.28.18,1.16,1.16,0,0,0,.79-.46,3.66,3.66,0,0,0,.68-1,22.08,22.08,0,0,0,1-4.33q.49-3.1.78-6.15a24.69,24.69,0,0,1,4.62-.84Z" transform="translate(-5.4 -3.76)"/></g></svg>',
   save: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 15.74"><g><path d="M18.53,19.5l.2-.05A1.78,1.78,0,0,0,20.13,18l0-.09V7.14a2,2,0,0,0-.28-.64A3.18,3.18,0,0,0,19.43,6c-.5-.52-1-1-1.55-1.54A2.59,2.59,0,0,0,17.37,4a1.83,1.83,0,0,0-.61-.25H6l-.21,0a1.78,1.78,0,0,0-1.4,1.49l0,.1V17.87a2.49,2.49,0,0,0,.09.37,1.79,1.79,0,0,0,1.44,1.23l.09,0Zm-6.25-.6H6.92a.61.61,0,0,1-.68-.48.78.78,0,0,1,0-.22V12.3a.62.62,0,0,1,.69-.68H17.64a.62.62,0,0,1,.69.69V18.2a.64.64,0,0,1-.71.69H12.28ZM12,9.81H8.15a.63.63,0,0,1-.72-.71v-4a.64.64,0,0,1,.72-.72h7.66a.64.64,0,0,1,.72.72v4a.65.65,0,0,1-.74.72ZM13.5,5V9.18h1.78V5Z" transform="translate(-4.41 -3.76)"/></g></svg>',
   blockquote: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.082 475.081"><g><path d="M164.45,219.27h-63.954c-7.614,0-14.087-2.664-19.417-7.994c-5.327-5.33-7.994-11.801-7.994-19.417v-9.132c0-20.177,7.139-37.401,21.416-51.678c14.276-14.272,31.503-21.411,51.678-21.411h18.271c4.948,0,9.229-1.809,12.847-5.424c3.616-3.617,5.424-7.898,5.424-12.847V54.819c0-4.948-1.809-9.233-5.424-12.85c-3.617-3.612-7.898-5.424-12.847-5.424h-18.271c-19.797,0-38.684,3.858-56.673,11.563c-17.987,7.71-33.545,18.132-46.68,31.267c-13.134,13.129-23.553,28.688-31.262,46.677C3.855,144.039,0,162.931,0,182.726v200.991c0,15.235,5.327,28.171,15.986,38.834c10.66,10.657,23.606,15.985,38.832,15.985h109.639c15.225,0,28.167-5.328,38.828-15.985c10.657-10.663,15.987-23.599,15.987-38.834V274.088c0-15.232-5.33-28.168-15.994-38.832C192.622,224.6,179.675,219.27,164.45,219.27z"/><path d="M459.103,235.256c-10.656-10.656-23.599-15.986-38.828-15.986h-63.953c-7.61,0-14.089-2.664-19.41-7.994c-5.332-5.33-7.994-11.801-7.994-19.417v-9.132c0-20.177,7.139-37.401,21.409-51.678c14.271-14.272,31.497-21.411,51.682-21.411h18.267c4.949,0,9.233-1.809,12.848-5.424c3.613-3.617,5.428-7.898,5.428-12.847V54.819c0-4.948-1.814-9.233-5.428-12.85c-3.614-3.612-7.898-5.424-12.848-5.424h-18.267c-19.808,0-38.691,3.858-56.685,11.563c-17.984,7.71-33.537,18.132-46.672,31.267c-13.135,13.129-23.559,28.688-31.265,46.677c-7.707,17.987-11.567,36.879-11.567,56.674v200.991c0,15.235,5.332,28.171,15.988,38.834c10.657,10.657,23.6,15.985,38.828,15.985h109.633c15.229,0,28.171-5.328,38.827-15.985c10.664-10.663,15.985-23.599,15.985-38.834V274.088C475.082,258.855,469.76,245.92,459.103,235.256z"/></g></svg>',
   arrow_down: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.73 8.67"><g><path d="M18.79,7.52a.8.8,0,0,1,.56-.23.82.82,0,0,1,.79.79.8.8,0,0,1-.23.56l-7.07,7.07a.79.79,0,0,1-.57.25.77.77,0,0,1-.57-.25h0L4.64,8.65a.8.8,0,0,1-.23-.57.82.82,0,0,1,.79-.79.8.8,0,0,1,.56.23L12.28,14l3.26-3.26,3.25-3.26Z" transform="translate(-4.41 -7.29)"/></g></svg>',
   align_justify: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 13.77"><g><path d="M4.41,4.74v2H20.15v-2H4.41Zm0,5.9H20.15v-2H4.41v2Zm0,3.94H20.15v-2H4.41v2Zm0,3.93h7.87v-2H4.41v2Z" transform="translate(-4.41 -4.74)"/></g></svg>',
   align_left: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 13.77"><g><path d="M4.41,4.74v2H20.15v-2H4.41Zm11.8,3.94H4.41v2H16.22v-2Zm-11.8,5.9H18.18v-2H4.41v2Zm0,3.93h9.84v-2H4.41v2Z" transform="translate(-4.41 -4.74)"/></g></svg>',
   align_right: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 13.77"><g><path d="M4.41,4.74v2H20.15v-2H4.41Zm3.93,5.9H20.15v-2H8.34v2Zm-2,3.94H20.14v-2H6.37v2Zm3.94,3.93h9.84v-2H10.31v2Z" transform="translate(-4.41 -4.74)"/></g></svg>',
   align_center: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 13.77"><g><path d="M4.41,4.74v2H20.15v-2H4.41Zm2,3.94v2H18.18v-2H6.37Zm-1,5.9H19.16v-2H5.39v2Zm2,3.93H17.2v-2H7.36v2Z" transform="translate(-4.41 -4.74)"/></g></svg>',
   font_color: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 14.61"><g><path d="M18.5,15.57,14.28,4.32h-3.4L6.65,15.57h3l.8-2.26h4.23l.8,2.26h3ZM14,11.07H11.14L12.54,7,13.25,9c.41,1.18.64,1.86.7,2ZM4.41,16.69v2.24H20.15V16.69H4.41Z" transform="translate(-4.41 -4.32)"/></g></svg>',
   highlight_color:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.66 15.74"><g><path d="M12.32,9.31,13.38,13H11.21l.52-1.83q.46-1.61.54-1.83ZM4.44,3.76H20.1V19.5H4.44V3.76ZM14.71,17.32h2.63L13.7,6H10.89L7.26,17.32H9.89l.63-2.24h3.55l.32,1.12c.18.65.29,1,.32,1.12Z" transform="translate(-4.44 -3.76)"/></g></svg>',
   list_bullets: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 12.37"><g><path d="M7.77,16.12a1.59,1.59,0,0,0-.49-1.18,1.62,1.62,0,0,0-1.19-.49,1.68,1.68,0,1,0,0,3.36,1.67,1.67,0,0,0,1.68-1.69Zm0-4.48A1.67,1.67,0,0,0,6.09,10,1.68,1.68,0,0,0,4.9,12.82a1.62,1.62,0,0,0,1.19.49,1.67,1.67,0,0,0,1.68-1.67Zm12.38,3.64a.27.27,0,0,0-.08-.19.28.28,0,0,0-.2-.09H9.19a.28.28,0,0,0-.2.08.29.29,0,0,0-.08.19V17a.27.27,0,0,0,.28.28H19.87a.27.27,0,0,0,.19-.08.24.24,0,0,0,.08-.2V15.28ZM7.77,7.13a1.63,1.63,0,0,0-.49-1.2,1.61,1.61,0,0,0-1.19-.49,1.61,1.61,0,0,0-1.19.49,1.71,1.71,0,0,0,0,2.4,1.62,1.62,0,0,0,1.19.49,1.61,1.61,0,0,0,1.19-.49,1.63,1.63,0,0,0,.49-1.2Zm12.38,3.66a.28.28,0,0,0-.08-.2.29.29,0,0,0-.19-.08H9.19a.27.27,0,0,0-.28.28v1.69a.27.27,0,0,0,.08.19.24.24,0,0,0,.2.08H19.87a.27.27,0,0,0,.19-.08.25.25,0,0,0,.08-.19V10.79Zm0-4.5a.27.27,0,0,0-.08-.19A.25.25,0,0,0,19.88,6H9.19A.28.28,0,0,0,9,6.1a.26.26,0,0,0-.08.19V8A.27.27,0,0,0,9,8.17a.24.24,0,0,0,.2.08H19.87a.27.27,0,0,0,.19-.08A.25.25,0,0,0,20.14,8V6.29Z" transform="translate(-4.41 -5.44)"/></g></svg>',
   list_number: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.69 15.74"><g><path d="M7.66,18a1.24,1.24,0,0,0-.26-.78,1.17,1.17,0,0,0-.72-.42l.85-1V15H4.58v1.34h.94v-.46l.85,0h0c-.11.11-.22.23-.32.35s-.23.27-.37.47L5.39,17l.23.51c.61-.05.92.11.92.49a.42.42,0,0,1-.18.37.79.79,0,0,1-.45.12A1.41,1.41,0,0,1,5,18.15l-.51.77A2.06,2.06,0,0,0,6,19.5a1.8,1.8,0,0,0,1.2-.41A1.38,1.38,0,0,0,7.66,18Zm0-5.54H6.75V13H5.63A.72.72,0,0,1,6,12.51a5.45,5.45,0,0,1,.66-.45,2.71,2.71,0,0,0,.67-.57,1.19,1.19,0,0,0,.31-.81,1.29,1.29,0,0,0-.45-1,1.86,1.86,0,0,0-2-.11,1.51,1.51,0,0,0-.62.7l.74.52A.87.87,0,0,1,6,10.28a.51.51,0,0,1,.35.12.42.42,0,0,1,.13.33.55.55,0,0,1-.21.4,3,3,0,0,1-.5.38c-.19.13-.39.27-.58.42a2,2,0,0,0-.5.6,1.63,1.63,0,0,0-.21.81,3.89,3.89,0,0,0,.05.48h3.2V12.44Zm12.45,2.82a.27.27,0,0,0-.08-.19.28.28,0,0,0-.21-.08H9.1a.32.32,0,0,0-.21.08.24.24,0,0,0-.08.2V17a.27.27,0,0,0,.08.19.3.3,0,0,0,.21.08H19.83a.32.32,0,0,0,.21-.08.25.25,0,0,0,.08-.19V15.26ZM7.69,7.32h-1V3.76H5.8L4.6,4.88l.63.68a1.85,1.85,0,0,0,.43-.48h0l0,2.24H4.74V8.2h3V7.32Zm12.43,3.42a.27.27,0,0,0-.08-.19.28.28,0,0,0-.21-.08H9.1a.32.32,0,0,0-.21.08.24.24,0,0,0-.08.2v1.71a.27.27,0,0,0,.08.19.3.3,0,0,0,.21.08H19.83a.32.32,0,0,0,.21-.08.25.25,0,0,0,.08-.19V10.74Zm0-4.52A.27.27,0,0,0,20,6,.28.28,0,0,0,19.83,6H9.1A.32.32,0,0,0,8.89,6a.24.24,0,0,0-.08.19V7.93a.27.27,0,0,0,.08.19.32.32,0,0,0,.21.08H19.83A.32.32,0,0,0,20,8.12a.26.26,0,0,0,.08-.2V6.22Z" transform="translate(-4.43 -3.76)"/></g></svg>',
   table: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 15.74"><g><path d="M4.41,8.05V3.76H8.7V8.05H4.41Zm5.71,0V3.76h4.3V8.05h-4.3Zm5.74-4.29h4.29V8.05H15.86V3.76Zm-11.45,10V9.48H8.7v4.3H4.41Zm5.71,0V9.48h4.3v4.3h-4.3Zm5.74,0V9.48h4.29v4.3H15.86ZM4.41,19.5V15.21H8.7V19.5H4.41Zm5.71,0V15.21h4.3V19.5h-4.3Zm5.74,0V15.21h4.29V19.5H15.86Z" transform="translate(-4.41 -3.76)"/></g></svg>',
   horizontal_rule: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 2.24"><g><path d="M20.15,12.75V10.51H4.41v2.24H20.15Z" transform="translate(-4.41 -10.51)"/></g></svg>',
   show_blocks: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.66 15.67"><g><path d="M19.72,5.58a1.64,1.64,0,0,0-1.64-1.64H6.23a1.62,1.62,0,0,0-1.16.48,1.63,1.63,0,0,0-.48,1.16V9.63a1.6,1.6,0,0,0,.48,1.16,1.62,1.62,0,0,0,1.16.47H18.09a1.67,1.67,0,0,0,1.16-.47,1.62,1.62,0,0,0,.48-1.16V5.58Zm-.94,4.05a.68.68,0,0,1-.7.7H6.23a.66.66,0,0,1-.48-.2.74.74,0,0,1-.21-.5V5.58a.66.66,0,0,1,.2-.48.71.71,0,0,1,.48-.21H18.08a.74.74,0,0,1,.5.21.66.66,0,0,1,.2.48ZM6.48,7.72a.21.21,0,0,0,.17-.07.22.22,0,0,0,.07-.17V7.06a1.27,1.27,0,0,1,.11-.52.37.37,0,0,1,.36-.23H8.77A.25.25,0,0,0,9,6.17a.19.19,0,0,0,0-.23.27.27,0,0,0-.2-.12H7.19a.88.88,0,0,0-.72.39,1.51,1.51,0,0,0-.23.85v.42a.24.24,0,0,0,.24.24Zm-.19.81a.21.21,0,0,0,.17-.07.26.26,0,0,0,.07-.17.24.24,0,0,0-.24-.24.2.2,0,0,0-.16.09.2.2,0,0,0-.07.16.22.22,0,0,0,.07.17.23.23,0,0,0,.16.06Zm8.46,5.1a1.63,1.63,0,0,0-.47-1.16A1.61,1.61,0,0,0,13.12,12H6.23a1.6,1.6,0,0,0-1.16.46,1.62,1.62,0,0,0-.48,1.16v4.05a1.64,1.64,0,0,0,1.64,1.64h6.89a1.6,1.6,0,0,0,1.16-.48,1.62,1.62,0,0,0,.47-1.16Zm-.94,4a.7.7,0,0,1-.2.49.65.65,0,0,1-.5.2H6.23a.66.66,0,0,1-.48-.2.75.75,0,0,1-.21-.49v-4a.74.74,0,0,1,.21-.5.66.66,0,0,1,.48-.2h6.89a.68.68,0,0,1,.7.7v4Zm6.15,0v-4a1.6,1.6,0,0,0-.48-1.16A1.67,1.67,0,0,0,18.32,12H17.1a1.63,1.63,0,0,0-1.16.47,1.61,1.61,0,0,0-.47,1.16v4a1.67,1.67,0,0,0,.47,1.16,1.62,1.62,0,0,0,1.16.48h1.22A1.64,1.64,0,0,0,20,17.68Zm-.94-4v4a.75.75,0,0,1-.21.49.62.62,0,0,1-.48.2H17.11a.69.69,0,0,1-.5-.2.7.7,0,0,1-.2-.49v-4a.68.68,0,0,1,.7-.7h1.22a.66.66,0,0,1,.48.2.72.72,0,0,1,.21.5Z" transform="translate(-4.44 -3.79)"/></g></svg>',
   cancel: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 15.74"><g><path d="M14.15,11.63l5.61,5.61a1.29,1.29,0,0,1,.38.93,1.27,1.27,0,0,1-.4.93,1.25,1.25,0,0,1-.92.4,1.31,1.31,0,0,1-.94-.4l-5.61-5.61L6.67,19.1a1.31,1.31,0,0,1-.94.4,1.24,1.24,0,0,1-.92-.4,1.27,1.27,0,0,1-.4-.93,1.33,1.33,0,0,1,.38-.93l5.61-5.63L4.79,6a1.26,1.26,0,0,1-.38-.93,1.22,1.22,0,0,1,.4-.92,1.28,1.28,0,0,1,.92-.39,1.38,1.38,0,0,1,.94.38l5.61,5.61,5.61-5.61a1.33,1.33,0,0,1,.94-.38,1.26,1.26,0,0,1,.92.39,1.24,1.24,0,0,1,.4.92,1.29,1.29,0,0,1-.39.93L17,8.81l-2.8,2.82Z" transform="translate(-4.41 -3.76)"/></g></svg>',
   image: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.75 15.77"><g><path d="M8.77,8.72a.88.88,0,0,1-.61-.27.82.82,0,0,1-.25-.61.89.89,0,0,1,.25-.62A.82.82,0,0,1,8.77,7a.81.81,0,0,1,.61.25.83.83,0,0,1,.27.62.81.81,0,0,1-.25.61.91.91,0,0,1-.63.27Zm9.62-5a1.74,1.74,0,0,1,1.76,1.76V17.76a1.74,1.74,0,0,1-1.76,1.76H6.16A1.74,1.74,0,0,1,4.4,17.76V5.51A1.74,1.74,0,0,1,6.16,3.75H18.39Zm0,1.75H6.16v8L8.53,11.8a.94.94,0,0,1,.54-.17.86.86,0,0,1,.54.2L11.09,13l3.64-4.55a.78.78,0,0,1,.34-.25.85.85,0,0,1,.42-.07.89.89,0,0,1,.39.12.78.78,0,0,1,.28.29l2.24,3.67V5.51Zm0,12.24V15.6L15.3,10.53,11.89,14.8a.89.89,0,0,1-.59.32.82.82,0,0,1-.64-.18L9,13.62,6.16,15.74v2Z" transform="translate(-4.4 -3.75)"/></g></svg>',
   video: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 14.55"><g><path d="M20.15,10.26V18.9l-3.94-1.57v1.2H4.41V10.66H16.22v1.23l2-.81,2-.82ZM14.64,17h0V12.54h0v-.31H6V17h8.67Zm3.94-.37v-4l-2.37,1v2l1.18.48,1.19.48ZM7.94,9.86A2.77,2.77,0,0,1,5.19,7.11a2.76,2.76,0,0,1,5.51,0A2.78,2.78,0,0,1,7.94,9.86Zm0-3.93a1.21,1.21,0,0,0-.83.35,1.15,1.15,0,0,0-.34.84A1.09,1.09,0,0,0,7.11,8,1.15,1.15,0,0,0,8,8.28,1.13,1.13,0,0,0,9.11,7.12,1.16,1.16,0,0,0,7.94,5.93Zm5.9,3.93a2.34,2.34,0,0,1-1.67-.68,2.3,2.3,0,0,1-.68-1.67,2.35,2.35,0,0,1,4-1.67,2.37,2.37,0,0,1,0,3.34,2.33,2.33,0,0,1-1.68.68Zm0-3.14a.75.75,0,1,0,.55.22.73.73,0,0,0-.55-.22Z" transform="translate(-4.41 -4.35)"/></g></svg>',
   link: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 15.72"><g><path d="M13.05,13.63a.24.24,0,0,1,.15.22L13.42,16a.19.19,0,0,1-.08.18l-2.12,2.14a4.08,4.08,0,0,1-1.29.85A4,4,0,0,1,4.71,17a3.92,3.92,0,0,1-.3-1.52A4,4,0,0,1,4.71,14a3.91,3.91,0,0,1,.87-1.3L7.7,10.56a.25.25,0,0,1,.2-.06l2.17.22a.21.21,0,0,1,.19.15.24.24,0,0,1,0,.25L7.12,14.23a1.81,1.81,0,0,0,0,2.58,1.78,1.78,0,0,0,1.29.52,1.74,1.74,0,0,0,1.28-.52L12.8,13.7a.24.24,0,0,1,.25-.07ZM19,4.92a4,4,0,0,1,0,5.66L16.86,12.7a.25.25,0,0,1-.17.08l-2.2-.23a.21.21,0,0,1-.19-.15.22.22,0,0,1,0-.25L17.44,9a1.81,1.81,0,0,0,0-2.58,1.78,1.78,0,0,0-1.29-.52,1.74,1.74,0,0,0-1.28.52L11.76,9.57a.21.21,0,0,1-.25,0,.24.24,0,0,1-.16-.21l-.22-2.17a.19.19,0,0,1,.08-.18l2.12-2.14a4.08,4.08,0,0,1,1.29-.85,4.05,4.05,0,0,1,3.06,0,3.85,3.85,0,0,1,1.3.85ZM5.84,9.82a.25.25,0,0,1-.18-.08.19.19,0,0,1-.07-.19l.11-.77a.2.2,0,0,1,.11-.17.24.24,0,0,1,.2,0l2.5.72a.25.25,0,0,1,.15.27.22.22,0,0,1-.23.21l-2.59,0Zm4.12-2-.73-2.5a.27.27,0,0,1,0-.2A.21.21,0,0,1,9.41,5L10.19,5a.25.25,0,0,1,.19,0,.23.23,0,0,1,.08.18l-.05,2.61a.2.2,0,0,1-.19.23h0A.22.22,0,0,1,10,7.85Zm8.76,5.58a.25.25,0,0,1,.18.08.23.23,0,0,1,.06.2l-.11.77a.25.25,0,0,1-.11.17.21.21,0,0,1-.12,0l-.08,0L16,14a.25.25,0,0,1-.15-.27.22.22,0,0,1,.22-.21l1.29,0,1.33,0Zm-4.12,2,.74,2.51a.28.28,0,0,1,0,.2.23.23,0,0,1-.18.11l-.8.11a.23.23,0,0,1-.17-.07.25.25,0,0,1-.08-.18l0-2.61a.22.22,0,0,1,.22-.22.21.21,0,0,1,.26.15Z" transform="translate(-4.41 -3.77)"/></g></svg>',
   math: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.81 15.73"><g><path d="M17.19,5.73a1,1,0,0,0,.71-.29,1,1,0,0,0,.28-.7,1,1,0,0,0-1-1H7.35a1,1,0,0,0-1,1,.77.77,0,0,0,.13.47h0l4.58,6.43L6.68,17.81a1.25,1.25,0,0,0-.29.71.94.94,0,0,0,.28.7.92.92,0,0,0,.69.28H17.2a1,1,0,0,0,.71-.28,1,1,0,0,0,0-1.39.92.92,0,0,0-.71-.29H9.26l3.87-5.43a.86.86,0,0,0,0-.95L9.26,5.73h7.93Z" transform="translate(-6.38 -3.77)"/></g></svg>',
   unlink: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 15.72"><g><path d="M19,18.32a4,4,0,0,0,0-5.68L15.85,9.5l-1.17,1.55L17.57,14a2,2,0,0,1,.61,1.47,2.08,2.08,0,0,1-2.09,2.09,2,2,0,0,1-1.47-.61l-.38-.37-1.74,1,.8.78a4,4,0,0,0,5.68,0ZM8,9.77a2,2,0,0,1-1.27-1,1.89,1.89,0,0,1-.21-1.57A2.1,2.1,0,0,1,7.45,6,2,2,0,0,1,9,5.76L12.27,7.2l.49-2L9.48,3.9a4,4,0,0,0-3.06.41A3.82,3.82,0,0,0,4.56,6.73a3.8,3.8,0,0,0,.4,3A3.78,3.78,0,0,0,7.39,11.6l5.38,2,.49-2-2.64-.94L8,9.77Z" transform="translate(-4.41 -3.76)"/></g></svg>',
   table_header: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.75 15.74"><g><path d="M17,19.5v-.78H15.5v.78H17Zm-3,0v-.78H12.5v.78H14Zm-3,0v-.78H9.53v.78H11Zm-3,0v-.78H6.53v.78H8Zm10.55,0a1.73,1.73,0,0,0,.85-.35,1.67,1.67,0,0,0,.56-.76l-.71-.31a1.21,1.21,0,0,1-.35.4,1.34,1.34,0,0,1-.53.23l.08.38c.06.24.09.38.1.41Zm-13.7-.63.55-.55A.77.77,0,0,1,5.25,18a1.31,1.31,0,0,1-.06-.38v-.38H4.41v.38a2,2,0,0,0,.12.68,1.6,1.6,0,0,0,.35.57Zm15.27-2.12V15.26h-.78v1.49h.78Zm-15-1V14.23H4.41v1.49h.78Zm15-2V12.26h-.78v1.49h.78Zm-15-1V11.22H4.41v1.51h.78Zm15-2V9.26h-.78v1.51h.78Zm-15-1V8.17H4.41V9.74h.78Zm15-2V6.28h-.78V7.77h.78Zm-15-1.11V5.33L4.48,5.1a.77.77,0,0,0-.07.27,2.72,2.72,0,0,0,0,.28v1h.79ZM19.21,5l.63-.4A1.62,1.62,0,0,0,19.16,4a1.94,1.94,0,0,0-.91-.22v.78a1.31,1.31,0,0,1,.56.12.88.88,0,0,1,.4.36ZM6,4.54H7.78V3.76H6a.82.82,0,0,0-.28.06l.12.35c.07.21.1.33.11.36Zm10.8,0V3.76H15.28v.78h1.49Zm-3,0V3.76H12.28v.78h1.49Zm-3,0V3.76H9.28v.78h1.51ZM6,10.84h12.6V6.91H6Z" transform="translate(-4.4 -3.76)"/></g></svg>',
   merge_cell: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.76 15.74"><g><path d="M18.92,13.5h1.23v4.15A1.84,1.84,0,0,1,18.3,19.5H14V18.27H18.3a.6.6,0,0,0,.44-.18.59.59,0,0,0,.18-.44V13.5ZM18.3,3.76a1.84,1.84,0,0,1,1.85,1.85V9.82H18.92V5.6a.6.6,0,0,0-.18-.44A.59.59,0,0,0,18.3,5H14V3.76H18.3Zm1.85,8.51H15.6L17.26,14l-.86.86-3.14-3.17L16.4,8.51l.86.86L15.62,11h4.54v1.24Zm-13.9,6h4.27V19.5H6.25A1.84,1.84,0,0,1,4.4,17.65V13.5H5.63v4.15a.61.61,0,0,0,.62.62Zm0-14.51h4.27V5H6.25a.6.6,0,0,0-.44.18.57.57,0,0,0-.17.43V9.81H4.41V5.6A1.83,1.83,0,0,1,6.25,3.76Zm5,7.9L8.15,14.83,7.3,14,9,12.27H4.41V11H8.94L7.3,9.38,7.73,9l.43-.43Z" transform="translate(-4.4 -3.76)"/></g></svg>',
   split_cell: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.75 15.74"><g><path d="M10.37,12.25H6.74L8.4,13.94l-.87.86L4.41,11.63,7.53,8.5l.87.86L6.74,11h3.62v1.23Zm9.78-.61L17,14.81,16.13,14l1.66-1.69H14.16V11h3.63L16.13,9.37l.43-.43A5.24,5.24,0,0,1,17,8.51ZM18.9,8.22V5.61a.57.57,0,0,0-.18-.43A.65.65,0,0,0,18.29,5H12.88V18.28h5.41a.7.7,0,0,0,.44-.18.57.57,0,0,0,.18-.43V15h1.23v2.64a1.84,1.84,0,0,1-1.85,1.83h-12A1.84,1.84,0,0,1,4.94,19a1.81,1.81,0,0,1-.54-1.29V15H5.63v2.64a.57.57,0,0,0,.18.43.67.67,0,0,0,.44.18h5.41V5H6.25a.7.7,0,0,0-.44.18.56.56,0,0,0-.17.43V8.22H4.41V5.61A1.8,1.8,0,0,1,5,4.31a1.91,1.91,0,0,1,1.31-.55h12a1.89,1.89,0,0,1,1.31.55,1.8,1.8,0,0,1,.54,1.3V8.23H18.9Z" transform="translate(-4.4 -3.76)"/></g></svg>',
   caption: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 13.79"><g><path d="M4.41,18.52H20.15v-2H4.41ZM20,4.73H18.07V6h.65v.65H20V4.73ZM17,6V4.73H14.55V6H17ZM13.49,6V4.73H11V6h2.47ZM10,6V4.73H7.5V6H10ZM5.79,6h.65V4.73H4.5V6.67H5.8V6ZM4.5,11.34H5.79V8.48H4.5ZM6.44,13.8H5.79v-.65H4.5v1.94H6.44ZM17,15.09V13.8H14.55v1.29H17Zm-3.52,0V13.8H11v1.29h2.47Zm-3.53,0V13.8H7.5v1.29H10ZM20,13.16H18.72v.65h-.65V15.1H20Zm-1.29-1.82H20V8.48h-1.3v2.86Z" transform="translate(-4.41 -4.73)"/></g></svg>',
   edit: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 15.73"><g><path d="M7.51,5.68h6l1.52-1.57H6.94a2.4,2.4,0,0,0-1.79.82A2.8,2.8,0,0,0,4.41,6.8V17a2.55,2.55,0,0,0,.75,1.8A2.48,2.48,0,0,0,7,19.5H17.22a2.57,2.57,0,0,0,1.83-.74,2.52,2.52,0,0,0,.77-1.8V8.83l-1.58,1.54v6a1.54,1.54,0,0,1-1.53,1.53H7.51A1.54,1.54,0,0,1,6,16.41V7.21A1.52,1.52,0,0,1,7.51,5.68Zm5.63,7.47h0L10.7,10.74l-1,3.38,1.71-.48,1.7-.49Zm.34-.34h0l5.36-5.32L16.4,5.08,11,10.4l1.23,1.21,1.21,1.2ZM19.93,6.4a.82.82,0,0,0,.22-.48A.54.54,0,0,0,20,5.47L18.45,4A.67.67,0,0,0,18,3.77a.7.7,0,0,0-.48.21l-.74.72,2.44,2.43.37-.37.35-.36Z" transform="translate(-4.41 -3.77)"/></g></svg>',
   delete: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.73 15.74"><g><path d="M19.16,6.71a.94.94,0,0,0,.69-.28.91.91,0,0,0,.29-.68A1,1,0,0,0,19.85,5a.93.93,0,0,0-.69-.3H14.24A.94.94,0,0,0,14,4.06a.92.92,0,0,0-.7-.3h-2a1,1,0,0,0-.7.3.93.93,0,0,0-.28.68H5.39A.92.92,0,0,0,4.7,5a1,1,0,0,0-.29.71.91.91,0,0,0,.29.68,1,1,0,0,0,.69.28H19.16Zm-12.79,1a1,1,0,0,0-.7.3.94.94,0,0,0-.28.69v8.85A1.88,1.88,0,0,0,6,18.93a1.9,1.9,0,0,0,1.39.57H17.2a1.87,1.87,0,0,0,1.39-.58,1.91,1.91,0,0,0,.58-1.39V8.68A1,1,0,0,0,18.88,8a.89.89,0,0,0-.7-.29,1,1,0,0,0-.69.29.92.92,0,0,0-.29.68v7.87a1,1,0,0,1-1,1H8.34a.94.94,0,0,1-.69-.28,1,1,0,0,1-.29-.71V8.68a1,1,0,0,0-1-1Z" transform="translate(-4.41 -3.76)"/></g></svg>',
   modify: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.7 15.74"><g><path d="M19.79,15.23a.66.66,0,0,1,.3.38.59.59,0,0,1-.07.48l-.8,1.38a.66.66,0,0,1-.38.3.59.59,0,0,1-.48-.07l-.68-.38a4.55,4.55,0,0,1-1.34.77v.78a.64.64,0,0,1-.18.45.61.61,0,0,1-.45.18h-1.6a.6.6,0,0,1-.44-.18.66.66,0,0,1-.19-.45v-.78a4.36,4.36,0,0,1-1.32-.77l-.69.38a.58.58,0,0,1-.48.07.66.66,0,0,1-.38-.3l-.38-.66h.83a1.77,1.77,0,0,0,1.23-.52,1.72,1.72,0,0,0,.51-1.23v-.18a3,3,0,0,0,.49-.28l.15.09a1.83,1.83,0,0,0,.88.23A1.75,1.75,0,0,0,15.84,14l.88-1.52a1.7,1.7,0,0,0,.17-1.32,1.66,1.66,0,0,0-.3-.61,1.84,1.84,0,0,0-.51-.45l-.15-.09,0-.29,0-.28.15-.09a1,1,0,0,0,.26-.18l0,.06v.78a4.34,4.34,0,0,1,1.34.77l.68-.38a.68.68,0,0,1,.48-.06.64.64,0,0,1,.38.29l.8,1.38a.58.58,0,0,1,.07.48.63.63,0,0,1-.3.38l-.68.4a3.84,3.84,0,0,1,.08.76,4.13,4.13,0,0,1-.08.78l.34.18.32.2ZM10.17,7.86a1.9,1.9,0,0,1,1.35,3.23,1.85,1.85,0,0,1-1.35.55A1.9,1.9,0,0,1,8.83,8.41a1.92,1.92,0,0,1,1.34-.55Zm1.58,7.2a.73.73,0,0,1-.21.49.66.66,0,0,1-.48.2H9.29a.68.68,0,0,1-.69-.69V14.2a4.75,4.75,0,0,1-1.48-.86l-.75.45a.73.73,0,0,1-.7,0,.63.63,0,0,1-.25-.26L4.54,12a.67.67,0,0,1-.08-.53.71.71,0,0,1,.32-.42l.75-.43a4.8,4.8,0,0,1-.08-.85,4.71,4.71,0,0,1,.08-.85l-.74-.44a.71.71,0,0,1-.32-.42.65.65,0,0,1,.07-.54L5.42,6a.66.66,0,0,1,.42-.32l.18,0a.73.73,0,0,1,.35.09l.75.43A4.68,4.68,0,0,1,8.6,5.33V4.45a.68.68,0,0,1,.69-.69h1.77a.64.64,0,0,1,.48.2.73.73,0,0,1,.21.49v.88a4.75,4.75,0,0,1,1.48.85L14,5.75a.67.67,0,0,1,.34-.09l.18,0a.71.71,0,0,1,.42.32l.89,1.54a.67.67,0,0,1,.06.52.73.73,0,0,1-.32.43l-.75.42a4.8,4.8,0,0,1,.08.85,4.71,4.71,0,0,1-.08.85l.75.43a.66.66,0,0,1,.32.42.73.73,0,0,1-.06.54l-.89,1.52a.69.69,0,0,1-.25.26.7.7,0,0,1-.35.09.64.64,0,0,1-.34-.09l-.75-.45a4.87,4.87,0,0,1-1.48.86v.87ZM7.23,9.75a3,3,0,0,0,.86,2.08,2.94,2.94,0,1,0,4.16-4.16,3,3,0,0,0-2.08-.85A2.94,2.94,0,0,0,7.23,9.75Z" transform="translate(-4.44 -3.76)"/></g></svg>',
   revert: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.76 14.69"><g><path d="M18.26,15V12.3l1.89-2V15a2.58,2.58,0,0,1-.24,1c-.2.58-.75.92-1.65,1H7.56v2L4.41,15.63,7.56,13v2h10.7ZM6.3,8.28V11L4.41,13V8.28a2.58,2.58,0,0,1,.24-1c.2-.58.75-.92,1.65-1H17v-2l3.15,3.34L17,10.3v-2H6.3Z" transform="translate(-4.4 -4.28)"/></g></svg>',
   auto_size: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 15.74"><g><path d="M6.71,17.19,6.89,16l1.21-.15A6,6,0,0,1,6.81,13.9a5.78,5.78,0,0,1-.45-2.27A6,6,0,0,1,8.1,7.45a5.83,5.83,0,0,1,4.17-1.73l1-1-1-1A7.89,7.89,0,0,0,5,14.64a7.73,7.73,0,0,0,1.71,2.55Zm5.57,2.31h0A7.86,7.86,0,0,0,17.85,6.07L17.67,7.3l-1.21.15a5.9,5.9,0,0,1,1.29,1.92,5.81,5.81,0,0,1,.45,2.26,5.91,5.91,0,0,1-5.9,5.9l-1,1,.49.49.47.5Z" transform="translate(-4.41 -3.76)"/></g></svg>',
   insert_row_below: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 15.8"><g><path d="M15.7,1.3c-0.1-0.1-0.1-0.2-0.2-0.2L15.3,1H0.4L0.3,1.1c0,0-0.1,0.1-0.1,0.1c0,0-0.1,0.1-0.1,0.1L0,1.4v7.7l0.1,0.1c0,0.1,0.1,0.1,0.2,0.2l0.1,0.1h2.3V9.3l0.1-0.5L3,8.5l0.1-0.2c-0.1,0-0.2,0-0.3,0H1.2v-6h13.3v6h-1.6c-0.1,0-0.2,0-0.3,0l0.1,0.2l0.2,0.4C12.9,9,13,9.2,13,9.3v0.1h2.3l0.2-0.1c0.1,0,0.1-0.1,0.2-0.2l0.1-0.1V1.4L15.7,1.3z"/><path d="M10.5,7.5C9.9,7.1,9.3,6.8,8.6,6.7c-0.2,0-0.5-0.1-0.7,0c-0.2,0-0.5,0-0.7,0C6.6,6.7,6.1,6.9,5.6,7.3C5.2,7.6,4.7,8,4.4,8.4C4.3,8.6,4.2,8.8,4.2,8.9C4.1,9.1,4,9.3,3.9,9.4C3.9,9.6,3.8,9.7,3.8,9.9c0,0.2-0.1,0.3-0.1,0.5v-0.1c-0.1,0.8,0.1,1.6,0.5,2.4c0.4,0.7,1,1.3,1.7,1.7c0.3,0.2,0.6,0.3,0.9,0.3c0.3,0.1,0.7,0.1,1,0.1c0.3,0,0.7,0,1-0.1c0.3-0.1,0.6-0.2,0.9-0.3c0.5-0.3,0.9-0.6,1.3-1c0.3-0.4,0.6-0.8,0.8-1.3c0.1-0.4,0.2-0.9,0.2-1.4c0-0.5-0.1-1-0.3-1.4C11.5,8.6,11.1,8,10.5,7.5z M10.1,11.3H8.5v1.6H8H7.9H7.3v0v-0.1v-1.4H5.7v-0.4v-0.2v-0.6h0h1.5V8.5h1.2v1.6h1.6V11.3z"/></g></svg>',
   insert_row_above: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 15.8"><g><path d="M0.1,14.5c0.1,0.1,0.1,0.2,0.2,0.2l0.1,0.1h14.9l0.1-0.1c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.1-0.1l0.1-0.1V6.7l-0.1-0.1c0-0.1-0.1-0.1-0.2-0.2l-0.1-0.1h-2.3v0.1l-0.1,0.5l-0.2,0.4l-0.1,0.2c0.1,0,0.2,0,0.3,0h1.6v6H1.3v-6h1.6c0.1,0,0.2,0,0.3,0L3.1,7.3L2.9,6.9C2.8,6.8,2.8,6.6,2.7,6.5V6.3H0.4L0.3,6.4c-0.1,0-0.1,0.1-0.2,0.2L0,6.7v7.7L0.1,14.5z"/><path d="M5.3,8.3c0.6,0.5,1.2,0.8,1.9,0.9c0.2,0,0.5,0.1,0.7,0c0.2,0,0.5,0,0.7,0c0.6-0.1,1.1-0.3,1.6-0.6c0.5-0.3,0.9-0.7,1.2-1.2c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.2,0.2-0.4,0.2-0.5c0.1-0.1,0.1-0.3,0.1-0.4C12,5.8,12,5.6,12,5.4v0.1c0.1-0.8-0.1-1.6-0.5-2.4c-0.4-0.7-1-1.3-1.7-1.7C9.5,1.3,9.2,1.2,8.9,1.1C8.5,1,8.2,1,7.9,1c-0.3,0-0.7,0-1,0.1C6.6,1.2,6.3,1.3,6,1.4C5.5,1.7,5.1,2,4.7,2.4C4.4,2.8,4.1,3.3,3.9,3.8C3.8,4.2,3.7,4.7,3.7,5.2c0,0.5,0.1,1,0.3,1.4C4.3,7.2,4.7,7.8,5.3,8.3z M5.7,4.5h1.6V2.9h0.5h0.1h0.6v0v0.1v1.4H10v0.4v0.2v0.6h0H8.5v1.6H7.3V5.7H5.7V4.5z"/></g></svg>',
   insert_column_left: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 15.8"><g><path d="M14.5,15.7c0.1-0.1,0.2-0.1,0.2-0.2l0.1-0.1V0.4l-0.1-0.1c0,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.1L14.4,0H6.7L6.6,0.1c-0.1,0-0.1,0.1-0.2,0.2L6.3,0.4v2.3h0.1l0.5,0.1L7.3,3l0.2,0.1c0-0.1,0-0.2,0-0.3V1.2h6v13.3h-6v-1.6c0-0.1,0-0.2,0-0.3l-0.2,0.1l-0.4,0.2C6.7,12.9,6.6,13,6.4,13H6.3v2.3l0.1,0.2c0,0.1,0.1,0.1,0.2,0.2l0.1,0.1h7.7L14.5,15.7z"/><path d="M8.3,10.5C8.7,10,9,9.3,9.1,8.6c0-0.2,0.1-0.5,0-0.7c0-0.2,0-0.5,0-0.7C9,6.7,8.8,6.1,8.5,5.7C8.2,5.2,7.8,4.8,7.3,4.5C7.2,4.4,7,4.3,6.9,4.2C6.7,4.1,6.5,4,6.4,4C6.2,3.9,6.1,3.9,5.9,3.8c-0.2,0-0.3-0.1-0.5-0.1h0.1C4.7,3.7,3.8,3.9,3.1,4.3C2.4,4.7,1.8,5.3,1.4,6C1.3,6.3,1.2,6.6,1.1,6.9C1,7.2,1,7.6,1,7.9c0,0.3,0,0.7,0.1,1c0.1,0.3,0.2,0.6,0.3,0.9c0.3,0.5,0.6,0.9,1,1.3c0.4,0.3,0.8,0.6,1.3,0.8C4.2,12,4.7,12.1,5.1,12c0.5,0,1-0.1,1.4-0.3C7.2,11.5,7.8,11.1,8.3,10.5zM4.5,10.1V8.5H2.9V8V7.9V7.3h0H3h1.4V5.7h0.4h0.2h0.6v0v1.5h1.6v1.2H5.7v1.6H4.5z"/></g></svg>',
   insert_column_right: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 15.8"><g><path d="M1.3,0.1C1.2,0.2,1.1,0.2,1.1,0.3L1,0.4v14.9l0.1,0.1c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0.1,0.1,0.1l0.1,0.1h7.7l0.1-0.1c0.1,0,0.1-0.1,0.2-0.2l0.1-0.1v-2.3H9.3l-0.5-0.1l-0.4-0.2l-0.2-0.1c0,0.1,0,0.2,0,0.3v1.6h-6V1.3h6v1.6c0,0.1,0,0.2,0,0.3l0.2-0.1l0.4-0.2C9,2.9,9.2,2.8,9.3,2.8h0.1V0.5L9.4,0.3c0-0.1-0.1-0.1-0.2-0.2L9.1,0H1.4L1.3,0.1z"/><path d="M7.5,5.3C7,5.8,6.7,6.5,6.6,7.2c0,0.2-0.1,0.5,0,0.7c0,0.2,0,0.5,0,0.7c0.1,0.6,0.3,1.1,0.6,1.6c0.3,0.5,0.7,0.9,1.2,1.2c0.2,0.1,0.3,0.2,0.5,0.3c0.2,0.1,0.4,0.2,0.5,0.2c0.1,0.1,0.3,0.1,0.4,0.1c0.2,0,0.3,0.1,0.5,0.1h-0.1c0.8,0.1,1.6-0.1,2.4-0.5c0.7-0.4,1.3-1,1.7-1.7c0.2-0.3,0.3-0.6,0.3-0.9c0.1-0.3,0.1-0.7,0.1-1c0-0.3,0-0.7-0.1-1c-0.1-0.3-0.2-0.6-0.3-0.9c-0.3-0.5-0.6-0.9-1-1.3C13,4.4,12.5,4.2,12,4c-0.4-0.1-0.9-0.2-1.4-0.2c-0.5,0-1,0.1-1.4,0.2C8.5,4.3,7.9,4.7,7.5,5.3z M11.3,5.7v1.6h1.6v0.5v0.1v0.6h0h-0.1h-1.4v1.6h-0.4h-0.2h-0.6v0V8.5H8.5V7.3h1.6V5.7H11.3z"/></g></svg>',
   delete_row: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.75 13.83"><g><path d="M4.7,18.46l.12.08H19.73l.12-.08a.58.58,0,0,0,.22-.22l.08-.12,0-7.69-.08-.11a.77.77,0,0,0-.18-.18l-.11-.08-2.31,0-.08.28-.1.29a1.58,1.58,0,0,1-.12.29l-.14.34s0,0,.18,0H18.9v6H5.64v-6H7.35c.14,0,.2,0,.18,0l-.14-.34a2.85,2.85,0,0,1-.12-.29l-.1-.29-.07-.27-2.31,0-.11.08a.77.77,0,0,0-.18.18l-.08.11,0,7.69.08.12a.47.47,0,0,0,.09.12l.13.09ZM12.11,13a4,4,0,0,0,1.46-.21,4.51,4.51,0,0,0,1.31-.71A4,4,0,0,0,16.26,10a4.32,4.32,0,0,0-.08-2.54,4.34,4.34,0,0,0-1-1.52,4.15,4.15,0,0,0-1.54-1,4.34,4.34,0,0,0-1.35-.22A4.07,4.07,0,0,0,11,4.93,3.94,3.94,0,0,0,9.24,6.07,3.92,3.92,0,0,0,8.15,8.88a3.91,3.91,0,0,0,.12.95A4.16,4.16,0,0,0,12.11,13Zm2.35-4.14v.58H10.09V8.27h4.37v.58Z" transform="translate(-4.4 -4.71)"/></g></svg>',
   delete_column: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.81 15.74"><g><path d="M5.66,19.42l.12.08,7.69,0,.11-.08a.77.77,0,0,0,.18-.18l.08-.11,0-2.32-.15,0-.45-.15-.42-.18-.17-.07a1,1,0,0,0,0,.27v1.63h-6V5h6V6.62a.9.9,0,0,0,0,.26l.17-.07.42-.17a3.91,3.91,0,0,1,.45-.15l.15,0,0-2.32L13.75,4a.77.77,0,0,0-.18-.18l-.11-.08H5.79l-.13.07a.63.63,0,0,0-.21.22l-.08.12V19.08l.08.12a.47.47,0,0,0,.09.12.35.35,0,0,0,.12.1Zm9-3.67a4.16,4.16,0,0,0,2.36-.51,4.08,4.08,0,0,0,1.67-1.72,4,4,0,0,0,.35-.91,3.79,3.79,0,0,0,.1-1,4.71,4.71,0,0,0-.11-1,5,5,0,0,0-.3-.87,4.25,4.25,0,0,0-1-1.25,4.49,4.49,0,0,0-1.34-.81A4.26,4.26,0,0,0,15,7.48a3.88,3.88,0,0,0-1.41.25A4.32,4.32,0,0,0,11.86,9,4,4,0,0,0,11,10.94a4.4,4.4,0,0,0-.05.68,4.5,4.5,0,0,0,.05.68,3.93,3.93,0,0,0,.61,1.57,4.22,4.22,0,0,0,1.18,1.2,4.59,4.59,0,0,0,.48.27c.2.1.37.17.5.22a2.44,2.44,0,0,0,.45.12,4.61,4.61,0,0,0,.5.07Zm2.54-4.12v.58H12.87V11h4.37v.59Z" transform="translate(-5.37 -3.76)"/></g></svg>',
   fixed_column_width: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,5H18A1,1 0 0,1 19,6A1,1 0 0,1 18,7H6A1,1 0 0,1 5,6A1,1 0 0,1 6,5M21,2V4H3V2H21M15,8H17V22H15V8M7,8H9V22H7V8M11,8H13V22H11V8Z" /></svg>',
   rotate_left: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 15.8"><g><path d="M0.5,10.2c0,0.1,0,0.2,0,0.3v0.2l0,0c0.1,0.3,0.3,0.6,0.4,0.9l0,0C1,11.8,1.3,12,1.5,11.9h0.1h0.2h0.1c0.1-0.1,0.3-0.3,0.4-0.5v-0.2c0-0.1,0-0.2-0.1-0.3l0,0c-0.2-0.2-0.3-0.4-0.3-0.7l0,0C1.8,10,1.7,9.9,1.5,9.8c-0.1,0-0.2,0-0.3,0H0.9C0.7,9.9,0.6,10,0.5,10.2L0.5,10.2z"/><path d="M2.2,11.5L2.2,11.5L2.2,11.5z"/><path d="M5.9,3.6L5.9,3.6L5.9,3.6z"/><path d="M0.1,7.9c0,0.3,0,0.6,0,0.9l0,0l0,0l0,0l0,0c0,0.2,0.1,0.3,0.2,0.4l0,0c0.2,0.1,0.3,0.2,0.5,0.2l0,0l0,0c0.2,0,0.4-0.1,0.5-0.3l0,0c0-0.1,0.1-0.3,0.1-0.4V8.6l0,0c0-0.2,0-0.5,0-0.7l0,0c0-0.2-0.1-0.4-0.2-0.5C1.1,7.3,0.9,7.2,0.7,7.2S0.3,7.3,0.2,7.4C0.1,7.5,0,7.7,0.1,7.9z"/><path d="M1.9,12.7L1.9,12.7c0,0.2,0,0.4,0.2,0.5l0,0l0.2,0.3l0,0c0.2,0.1,0.3,0.2,0.5,0.4l0,0l0,0l0,0l0,0C2.9,14,3,14.1,3.2,14.1s0.4-0.1,0.5-0.2c0.1-0.2,0.2-0.3,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5l0,0l-0.4-0.4l-0.2-0.2l0,0C3,12.1,2.8,12,2.6,12l0,0c-0.2,0-0.4,0.1-0.5,0.2l0,0C2,12.3,1.9,12.5,1.9,12.7z"/><path d="M6.6,15c0,0.2,0.1,0.4,0.2,0.5c0.1,0.1,0.2,0.2,0.4,0.3l0,0c0.3,0,0.5,0,0.7,0h0.3l0,0c0.2,0,0.4-0.1,0.5-0.2c0.1-0.2,0.2-0.3,0.2-0.5l0,0l0,0c0-0.2-0.1-0.4-0.2-0.5l0,0c-0.1-0.1-0.3-0.2-0.5-0.2l0,0H7.9c-0.1,0-0.3,0-0.5,0l0,0H7.3c-0.2-0.1-0.3,0-0.5,0.1l0,0C6.7,14.6,6.6,14.8,6.6,15L6.6,15L6.6,15L6.6,15z"/><path d="M4.2,7.4C4,7.5,4,7.7,4,7.9c0,0.2,0,0.4,0.2,0.5l0,0l3.2,3.2l0,0c0.1,0.1,0.3,0.2,0.5,0.2s0.3-0.1,0.5-0.2l0,0l3.2-3.2l0,0c0.1-0.1,0.2-0.3,0.2-0.5c0-0.2-0.1-0.4-0.2-0.5l0,0C11.5,7.3,11,6.7,10,5.8l0,0L8.4,4.2l0,0C8.3,4.1,8.1,4,7.9,4S7.5,4.1,7.4,4.2L4.2,7.4L4.2,7.4z M6.8,9L5.7,7.9l2.2-2.2l2.3,2.2l-2.3,2.2C7.7,9.9,7.3,9.5,6.8,9L6.8,9z"/><path d="M4.1,14.1C4,14.2,4,14.3,4,14.4v0.2l0,0c0.1,0.1,0.2,0.3,0.4,0.4l0,0c0.3,0.1,0.6,0.2,0.9,0.4h0.1h0.1l0,0c0.2,0,0.3-0.1,0.5-0.1l0,0c0.2-0.1,0.3-0.3,0.3-0.4l0,0l0,0l0,0l0,0v-0.2c0-0.1-0.1-0.2-0.1-0.3l0,0C6.1,14.2,6,14.1,5.8,14l0,0c-0.3-0.1-0.5-0.2-0.8-0.2l0,0c-0.1-0.1-0.2-0.1-0.3-0.1H4.5C4.3,13.7,4.2,13.9,4.1,14.1z"/><path d="M9.3,14.4c0,0.1-0.1,0.3,0,0.4V15l0,0c0,0.1,0.1,0.3,0.5,0.4c0.1,0.1,0.3,0.1,0.4,0.1l0,0h0.1l0,0c0.3-0.1,0.6-0.2,0.9-0.3l0,0c0.1-0.1,0.2-0.2,0.3-0.4l0.1-0.3c0-0.1-0.1-0.2-0.1-0.3l0,0c-0.1-0.2-0.2-0.3-0.4-0.4l0,0h-0.3c-0.1,0-0.2,0-0.3,0l0,0c-0.2,0.1-0.5,0.2-0.8,0.3l0,0C9.5,14.1,9.4,14.2,9.3,14.4L9.3,14.4z"/><path d="M11.4,14.7L11.4,14.7L11.4,14.7z"/><path d="M9.5,15.3L9.5,15.3L9.5,15.3z"/><path d="M15.9,7.9c0-1-0.2-2-0.6-3l0,0c-0.4-1-1-1.9-1.7-2.6C12.8,1.6,12,1,11,0.6l0,0C10.1,0.2,9,0,8,0C7.3,0,6.5,0.1,5.8,0.3l0,0C5.2,0.5,4.6,0.8,4,1.1L3.1,0.2l0,0C2.9,0.1,2.8,0,2.6,0H2.4l0,0C2.2,0,2,0.2,1.9,0.4l0,0L0.1,4.9l0,0C0,5,0,5.1,0,5.2c0,0.2,0.1,0.4,0.2,0.5l0,0c0.2,0.1,0.3,0.2,0.5,0.2h0.1H1l0,0l4.7-1.8l0,0C5.9,4,6.1,3.8,6.1,3.6V3.4C6.1,3.2,6,3,5.9,2.9l0,0L5.1,2.1c0.4-0.2,0.8-0.4,1.3-0.5c0.5-0.1,1.1-0.2,1.7-0.2c0.9,0,1.7,0.2,2.5,0.5l0,0c0.8,0.3,1.5,0.8,2.1,1.4c0.6,0.6,1.1,1.3,1.4,2.1l0,0c0.3,0.8,0.5,1.6,0.5,2.5s-0.2,1.7-0.5,2.5l0,0c-0.3,0.8-0.8,1.5-1.4,2.1c-0.2,0.2-0.4,0.3-0.6,0.5l0,0c-0.2,0.1-0.3,0.3-0.3,0.5v0.1c0,0.1,0,0.3,0.1,0.4l0,0c0.1,0.2,0.3,0.3,0.5,0.3l0,0c0.1,0,0.3-0.1,0.4-0.2l0,0l0,0l0,0l0,0c0.2-0.2,0.5-0.4,0.7-0.6l0,0l0,0l0,0l0,0c0.7-0.8,1.3-1.6,1.7-2.6C15.6,10,15.8,9,15.9,7.9z M1.9,4C2,3.8,2.1,3.5,2.3,3.1l0,0L2.7,2l1.2,1.2L1.9,4z"/><path d="M6.8,15.5L6.8,15.5L6.8,15.5z"/></g></svg>',
   rotate_right: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.8 15.8"><g><path d="M9.9,15.3L9.9,15.3L9.9,15.3z"/><path d="M6.9,15.1L6.9,15.1c0,0.1,0.1,0.3,0.2,0.4l0,0c0.1,0.2,0.3,0.3,0.5,0.3l0,0h0.3c0.2,0,0.4,0,0.7,0l0,0c0.2-0.1,0.3-0.2,0.4-0.3c0.1-0.1,0.2-0.2,0.2-0.4V15c0-0.2-0.1-0.4-0.2-0.4c-0.2-0.1-0.3-0.2-0.5-0.2H8.4l0,0c-0.1,0-0.3,0-0.5,0H7.6l0,0c-0.2,0-0.4,0.1-0.5,0.2C7,14.7,6.9,14.9,6.9,15.1z"/><path d="M6.5,14.4L6.5,14.4L6.5,14.4z"/><path d="M5.8,5.8L5.8,5.8c-1,0.9-1.5,1.5-1.7,1.6l0,0C4,7.5,4,7.7,4,7.9c0,0.2,0,0.4,0.2,0.5l0,0l3.2,3.2l0,0c0.2,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2l0,0l3.2-3.2l0,0c0.1-0.1,0.2-0.3,0.2-0.5c0-0.2-0.1-0.4-0.2-0.5l0,0L8.4,4.2C8.3,4.1,8.1,4,7.9,4C7.7,4,7.5,4.1,7.4,4.2l0,0L5.8,5.8z M5.6,7.9l2.3-2.2l2.2,2.2L9,9l0,0l0,0l0,0l0,0c-0.5,0.6-0.9,0.9-1.1,1.1L5.6,7.9z"/><path d="M9,15.5L9,15.5L9,15.5z"/><path d="M9.6,14.7v0.2l0,0l0,0l0,0l0,0c0.1,0.2,0.1,0.3,0.3,0.3c0.1,0.1,0.3,0.1,0.4,0.1l0,0h0.1h0.1c0.3-0.1,0.6-0.3,0.9-0.4l0,0c0.1-0.1,0.2-0.2,0.3-0.4l0,0v-0.2c0-0.1,0-0.2-0.1-0.3c-0.1-0.2-0.2-0.3-0.4-0.4H11c-0.1,0-0.2,0.1-0.3,0.1l0,0c-0.2,0.1-0.4,0.2-0.7,0.3l0,0l0,0c-0.1,0.1-0.3,0.2-0.4,0.4C9.6,14.5,9.6,14.6,9.6,14.7z"/><path d="M9,14.5L9,14.5L9,14.5z"/><path d="M9.6,14.4L9.6,14.4L9.6,14.4z"/><path d="M11.7,14L11.7,14L11.7,14z"/><path d="M15.6,7.4L15.6,7.4L15.6,7.4z"/><path d="M15,9.4c0.2,0,0.4,0,0.6-0.2l0,0c0.1-0.1,0.2-0.2,0.2-0.4l0,0l0,0l0,0l0,0c0-0.3,0-0.6,0-0.9c0-0.2-0.1-0.4-0.2-0.5c-0.1-0.1-0.3-0.2-0.5-0.2s-0.4,0.1-0.5,0.2c-0.1,0.1-0.2,0.3-0.2,0.5l0,0c0,0.2,0,0.4,0,0.7l0,0v0.1c0,0.1,0,0.3,0.1,0.4l0,0C14.6,9.3,14.8,9.4,15,9.4L15,9.4L15,9.4z"/><path d="M14,12h0.1h0.2h0.1c0.2,0,0.5-0.2,0.6-0.4l0,0c0.2-0.3,0.3-0.6,0.4-0.9l0,0v-0.2c0-0.1-0.1-0.2-0.1-0.3c-0.1-0.2-0.2-0.3-0.4-0.4h-0.3c-0.1,0-0.2,0-0.3,0C14.2,9.9,14,10,14,10.3l0,0c-0.1,0.2-0.2,0.5-0.3,0.7l0,0c-0.1,0.1-0.1,0.2-0.1,0.3v0.2l0,0l0,0C13.6,11.6,13.8,11.8,14,12z"/><path d="M14.6,7.4L14.6,7.4L14.6,7.4z"/><path d="M4.4,14.2c-0.1,0.1-0.1,0.2-0.1,0.3l0.1,0.2c0,0.2,0.2,0.3,0.3,0.4l0,0c0.3,0.1,0.6,0.3,1.1,0.4l0,0h0.1l0,0c0.1,0,0.2-0.1,0.4-0.2c0.1,0,0.2-0.2,0.3-0.3l0,0v-0.2c0-0.1-0.1-0.3-0.2-0.4c-0.1-0.1-0.2-0.2-0.4-0.3l0,0c-0.2-0.1-0.5-0.2-0.7-0.3l0,0c-0.1,0-0.2,0-0.3,0H4.7l0,0C4.6,13.9,4.4,14,4.4,14.2L4.4,14.2z"/><path d="M11.9,13.3c0,0.2,0.1,0.4,0.2,0.6c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2l0,0l0,0l0,0l0,0c0.1-0.1,0.3-0.3,0.4-0.4l0,0l0.2-0.3l0,0c0.1-0.2,0.2-0.3,0.2-0.5l0,0c0-0.2-0.1-0.4-0.2-0.5l0,0c-0.1-0.1-0.3-0.2-0.5-0.2l0,0c-0.2,0-0.4,0.1-0.5,0.2l0,0l-0.2,0.2l-0.4,0.4l0,0C12,13,11.9,13.1,11.9,13.3L11.9,13.3z"/><path d="M12.1,13.8L12.1,13.8L12.1,13.8z"/><path d="M11.9,13.3L11.9,13.3L11.9,13.3z"/><path d="M15.9,5.2c0-0.1-0.1-0.2-0.1-0.3l0,0L14,0.4l0,0C13.9,0.2,13.7,0,13.5,0l0,0l0,0h-0.2c-0.2,0-0.4,0.1-0.5,0.2l0,0l-0.9,0.9c-0.5-0.3-1.1-0.6-1.8-0.8l0,0C9.4,0.1,8.7,0,7.9,0c-1,0-2,0.2-3,0.6S3,1.6,2.3,2.3C1.6,3.1,1,3.9,0.6,4.9l0,0C0.2,5.8,0,6.8,0,7.9c0,1,0.2,2,0.6,3s0.9,1.8,1.7,2.6l0,0l0,0l0,0l0,0c0.2,0.2,0.5,0.4,0.7,0.6l0,0l0,0l0,0l0,0c0.2,0.1,0.3,0.2,0.5,0.2l0,0c0.2,0,0.4-0.1,0.6-0.3l0,0c0.1-0.1,0.1-0.3,0.1-0.4v-0.1l0,0C4.1,13.3,4,13.1,3.9,13l0,0c-0.2-0.1-0.4-0.3-0.6-0.5c-0.6-0.6-1.1-1.3-1.4-2.1l0,0C1.6,9.6,1.4,8.8,1.4,7.9s0.2-1.7,0.5-2.5l0,0c0.3-0.8,0.8-1.5,1.4-2.1c0.6-0.6,1.3-1.1,2.1-1.4l0,0C6.2,1.6,7,1.4,7.9,1.4c0.6,0,1.1,0.1,1.7,0.2c0.5,0.1,0.9,0.3,1.3,0.5l-0.8,0.8l0,0C10,3.1,9.9,3.2,9.9,3.4v0.2l0,0l0,0c0,0.2,0.2,0.4,0.4,0.5l0,0l4.5,1.8l0,0H15h0.1c0.2,0,0.4-0.1,0.5-0.2l0,0C15.7,5.6,15.8,5.4,15.9,5.2z M11.8,3.2L13,2l0.4,1.1l0,0c0.2,0.4,0.3,0.7,0.4,0.9L11.8,3.2z"/></g></svg>',
   mirror_horizontal: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.75 15.74"><g><path d="M13.75,3.76l5.9,15.74h-5.9V3.76ZM4.9,19.5,10.8,3.76V19.5H4.9Z" transform="translate(-4.9 -3.76)"/></g></svg>',
   mirror_vertical: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 14.75"><g><path d="M20.15,13.1,4.41,19V13.1H20.15ZM4.41,4.25l15.74,5.9H4.41V4.25Z" transform="translate(-4.41 -4.25)"/></g></svg>',
   checked: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.75 12.1"><g><path d="M4.59,12.23l.12.18L9.43,17.5a.58.58,0,0,0,.84,0L20,7.45h0a.58.58,0,0,0,0-.84l-.85-.85a.58.58,0,0,0-.84,0H18.2l-8.12,8.41a.29.29,0,0,1-.42,0l-3.4-3.63a.58.58,0,0,0-.84,0l-.85.85a.6.6,0,0,0-.14.21.51.51,0,0,0,0,.44c.05.06.1.13.16.19Z" transform="translate(-4.38 -5.58)"/></g></svg>',
   line_break: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 21L14.9 3H17L9.1 21H7Z" /></svg>',
   // Not currently used
   attachment: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.38 15.68"><g><path d="M15.23,6h1v9.78a3.88,3.88,0,0,1-1.31,2.45,4,4,0,0,1-6.57-2.45V7A3,3,0,0,1,9.2,4.89a3,3,0,0,1,5,2.09v8.31a1.92,1.92,0,0,1-.58,1.39,2,2,0,0,1-1.39.58,1.92,1.92,0,0,1-1.39-.58,2,2,0,0,1-.58-1.39V8h1v7.32a1,1,0,0,0,.29.69,1,1,0,0,0,.69.28A.9.9,0,0,0,13,16a1,1,0,0,0,.29-.69V7a1.92,1.92,0,0,0-.58-1.39A2,2,0,0,0,11.27,5a1.92,1.92,0,0,0-1.39.58A2,2,0,0,0,9.33,7v8.31a3,3,0,1,0,5.9,0V6Z" transform="translate(-8.08 -3.78)"/></g></svg>',
   map: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.7 15.62"><g><path d="M12.05,12.42a2.93,2.93,0,1,1,2.07-5A2.88,2.88,0,0,1,15,9.49a3,3,0,0,1-.86,2.07,2.89,2.89,0,0,1-2.07.86Zm0-5.36a2.43,2.43,0,0,0-1.72,4.16,2.48,2.48,0,0,0,1.72.72,2.44,2.44,0,0,0,0-4.88Zm0-3.3A5.84,5.84,0,0,1,17.9,9.62a9.94,9.94,0,0,1-1.73,5A33.59,33.59,0,0,1,12.84,19a1.52,1.52,0,0,1-.23.2,1,1,0,0,1-.55.2h0a1,1,0,0,1-.55-.2,1.52,1.52,0,0,1-.23-.2,33.59,33.59,0,0,1-3.33-4.32,9.93,9.93,0,0,1-1.72-5,5.84,5.84,0,0,1,5.85-5.86ZM12,18.34l.08.05.06-.06a35.58,35.58,0,0,0,3.06-3.93,9.35,9.35,0,0,0,1.74-4.77,4.88,4.88,0,0,0-4.88-4.88A4.79,4.79,0,0,0,8.6,6.17,4.84,4.84,0,0,0,7.17,9.62,9.29,9.29,0,0,0,8.91,14.4,36,36,0,0,0,12,18.34Z" transform="translate(-6.2 -3.76)"/></g></svg>',
   magic_stick: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.73 15.75"><g><path d="M19.86,19.21a1,1,0,0,0,.28-.68,1,1,0,0,0-.28-.7L13,10.93a1,1,0,0,0-.7-.28,1,1,0,0,0-.68,1.65l6.9,6.9a1,1,0,0,0,.69.29.93.93,0,0,0,.69-.28ZM9.19,8.55a3,3,0,0,0,1.68,0,14.12,14.12,0,0,0,1.41-.32A11.26,11.26,0,0,0,10.8,7.06c-.56-.36-.86-.56-.91-.58S10,5.91,10,5.11s0-1.26-.15-1.37a4.35,4.35,0,0,0-1.19.71c-.53.4-.81.62-.87.68a9,9,0,0,0-2-.6,6.84,6.84,0,0,0-.76-.09s0,.27.08.77a8.6,8.6,0,0,0,.61,2q-.09.09-.69.87a3.59,3.59,0,0,0-.68,1.17c.12.17.57.23,1.36.15S7,9.26,7.15,9.23s.21.36.57.91a10.49,10.49,0,0,0,1.14,1.48c0-.1.14-.57.31-1.4a3,3,0,0,0,0-1.67Z" transform="translate(-4.41 -3.74)"/></g></svg>',
   empty_file: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.78 15.75"><g><path d="M14.73,3.76,18.67,7.7v9.84a2,2,0,0,1-2,2H7.84a1.89,1.89,0,0,1-1.38-.58,2,2,0,0,1-.57-1.39V5.73a1.93,1.93,0,0,1,.57-1.38,2,2,0,0,1,1.38-.58h6.62l.26,0v0Zm2.95,4.92h-2a1.93,1.93,0,0,1-1.38-.57,2,2,0,0,1-.58-1.4V6.17c0-.36,0-.84,0-1.43H7.85a1,1,0,0,0-.7.29,1,1,0,0,0-.29.7V17.54a1,1,0,0,0,.29.69,1,1,0,0,0,.69.29h8.85a1,1,0,0,0,.71-.29.92.92,0,0,0,.28-.69Zm0-1L14.73,4.74v2A1,1,0,0,0,15,7.4a1,1,0,0,0,.69.29Z" transform="translate(-5.89 -3.76)"/></g></svg>',
   more_horizontal: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.76 3.58"><g><path d="M4.64,10.73a1.84,1.84,0,0,1,.65-.65,1.76,1.76,0,0,1,1.79,0A1.79,1.79,0,0,1,8,11.63a1.84,1.84,0,0,1-.25.9,1.69,1.69,0,0,1-.65.65,1.8,1.8,0,0,1-2.69-1.55A2.08,2.08,0,0,1,4.64,10.73Zm6.09,0a1.84,1.84,0,0,1,.65-.65,1.78,1.78,0,0,1,2.67,1.55,1.73,1.73,0,0,1-.24.9,1.84,1.84,0,0,1-.65.65,1.76,1.76,0,0,1-1.79,0,1.79,1.79,0,0,1-.64-2.44Zm6.08,0a1.69,1.69,0,0,1,.65-.65,1.76,1.76,0,0,1,1.79,0,1.79,1.79,0,0,1,.9,1.54,1.73,1.73,0,0,1-.24.9,1.84,1.84,0,0,1-.65.65,1.8,1.8,0,0,1-2.69-1.55A2,2,0,0,1,16.81,10.73Z" transform="translate(-4.39 -9.84)"/></g></svg>',
   more_vertical: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.94 15.75"><g><path d="M12.28,7.69a1.92,1.92,0,0,1-1.39-.58,2,2,0,0,1-.58-1.39,1.92,1.92,0,0,1,.58-1.39,2,2,0,0,1,1.39-.58,1.92,1.92,0,0,1,1.39.58,2,2,0,0,1,.58,1.39,1.92,1.92,0,0,1-.58,1.39,2,2,0,0,1-1.39.58Zm0,2a1.92,1.92,0,0,1,1.39.58,2,2,0,0,1,.58,1.39A1.92,1.92,0,0,1,13.67,13a2,2,0,0,1-1.39.58A1.92,1.92,0,0,1,10.89,13a2,2,0,0,1-.58-1.39,2,2,0,0,1,2-2Zm0,5.9a1.92,1.92,0,0,1,1.39.58,2,2,0,0,1,.58,1.39,1.92,1.92,0,0,1-.58,1.39,2,2,0,0,1-1.39.58,1.92,1.92,0,0,1-1.39-.58,2,2,0,0,1-.58-1.39,1.92,1.92,0,0,1,.58-1.39,1.94,1.94,0,0,1,1.39-.58Z" transform="translate(-10.31 -3.75)"/></g></svg>'
});
// EXTERNAL MODULE: ./node_modules/suneditor/src/lang/en.js
var en = __webpack_require__(2);
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
    isIE: window.navigator.userAgent.match(/(MSIE|Trident.*rv[ :])([0-9]+)/) !== null,
    isIE_Edge: (window.navigator.userAgent.match(/(MSIE|Trident.*rv[ :])([0-9]+)/) !== null) || (window.navigator.appVersion.indexOf('Edge') > -1),

    /**
     * @description Removes attribute values such as style and converts tags that do not conform to the "html5" standard.
     * @param {String} text 
     * @returns {String} HTML string
     * @private
     */
    _tagConvertor: function (text) {
        const ec = {'b': 'strong', 'i': 'em', 'ins': 'u', 'strike': 'del', 's': 'del'};
        return text.replace(/(<\/?)(b|strong|i|em|ins|u|s|strike|del)\b\s*(?:[^>^<]+)?\s*(?=>)/ig, function (m, t, n) {
            return t + ((typeof ec[n] === 'string') ? ec[n] : n);
        });
    },

    /**
     * @description HTML Reserved Word Converter.
     * @param {String} contents 
     * @returns {String} HTML string
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
     * @returns {XMLHttpRequest|ActiveXObject}
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
     * @param {Document|null} doc To get the CSS text of an document(core._wd). If null get the current document.
     * @returns {String} Styles string
     */
    getPageStyle: function (doc) {
        let cssText = '';
        const sheets = (doc || this._d).styleSheets;
        
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
     * @descriptionGets Get the length in bytes of a string.
     * referencing code: "https://github.com/shaan1974/myrdin/blob/master/expressions/string.js#L11"
     * @param {String} text String text
     * @returns {Number}
     */
    getByteLength: function(text) {
        const encoder = this._w.encodeURIComponent;
        let cr, cl;
        if (this.isIE_Edge) {
            cl = this._w.unescape(encoder(text.toString())).length;
            cr = 0;

            if (encoder(text.toString()).match(/(%0A|%0D)/gi) !== null) {
                cr = encoder(text.toString()).match(/(%0A|%0D)/gi).length;
            }

            return cl + cr;
        } else {
            cl = (new this._w.TextEncoder('utf-8').encode(text.toString())).length;
            cr = 0;

            if (encoder(text.toString()).match(/(%0A|%0D)/gi) !== null) {
                cr = encoder(text.toString()).match(/(%0A|%0D)/gi).length;
            }

            return cl + cr;
        }
    },

    /**
     * @description It is judged whether it is the edit region top div element or iframe's body tag.
     * @param {Node} element The node to check
     * @returns {Boolean}
     */
    isWysiwygDiv: function (element) {
        if (element && element.nodeType === 1 && (this.hasClass(element, 'se-wrapper-wysiwyg') || /^BODY$/i.test(element.nodeName))) return true;
        return false;
    },

    /**
     * @description It is judged whether it is a node related to the text style.
     * (strong|span|font|b|var|i|em|u|ins|s|strike|del|sub|sup|mark|a|label)
     * @param {Node} element The node to check
     * @returns {Boolean}
     */
    isTextStyleElement: function (element) {
        return element && element.nodeType !== 3 && /^(strong|span|font|b|var|i|em|u|ins|s|strike|del|sub|sup|mark|a|label)$/i.test(element.nodeName);
    },

    /**
     * @description It is judged whether it is the format element (P, DIV, H[1-6], PRE, LI)
     * Format element also contain "free format Element"
     * @param {Node} element The node to check
     * @returns {Boolean}
     */
    isFormatElement: function (element) {
        return (element && element.nodeType === 1 && (/^(P|DIV|H[1-6]|PRE|LI|TD|TH)$/i.test(element.nodeName) || this.hasClass(element, '(\\s|^)__se__format__replace_.+(\\s|$)|(\\s|^)__se__format__free_.+(\\s|$)')) && !this.isComponent(element) && !this.isWysiwygDiv(element));
    },

    /**
     * @description It is judged whether it is the range format element. (BLOCKQUOTE, OL, UL, FIGCAPTION, TABLE, THEAD, TBODY, TR, TH, TD)
     * * Range format element is wrap the format element  (util.isFormatElement)
     * @param {Node} element The node to check
     * @returns {Boolean}
     */
    isRangeFormatElement: function (element) {
        return (element && element.nodeType === 1 && (/^(BLOCKQUOTE|OL|UL|FIGCAPTION|TABLE|THEAD|TBODY|TR|TH|TD)$/i.test(element.nodeName) || this.hasClass(element, '(\\s|^)__se__format__range_.+(\\s|$)')));
    },

    /**
     * @description It is judged whether it is the free format element. (PRE)
     * Free format elements's line break is "BR" tag.
     * Free format elements is included in the format element.
     * @param {Node} element The node to check
     * @returns {Boolean}
     */
    isFreeFormatElement: function (element) {
        return (element && element.nodeType === 1 && (/^PRE$/i.test(element.nodeName) || this.hasClass(element, '(\\s|^)__se__format__free_.+(\\s|$)')) && !this.isComponent(element) && !this.isWysiwygDiv(element));
    },

    /**
     * @description It is judged whether it is the component [img, iframe] cover(element className - ".se-component") and table, hr
     * @param {Node} element The node to check
     * @returns {Boolean}
     */
    isComponent: function (element) {
        return element && (/se-component/.test(element.className) || /^(TABLE|HR)$/.test(element.nodeName));
    },

    /**
     * @description It is judged whether it is the component [img, iframe] cover(element className - ".se-component")
     * @param {Node} element The node to check
     * @returns {Boolean}
     */
    isMediaComponent: function (element) {
        return element && /se-component/.test(element.className);
    },

    /**
     * @description If a parent node that contains an argument node finds a format node (util.isFormatElement), it returns that node.
     * @param {Node} element Reference node.
     * @param {Function|null} validation Additional validation function.
     * @returns {Element|null}
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
     * @description If a parent node that contains an argument node finds a format node (util.isRangeFormatElement), it returns that node.
     * @param {Node} element Reference node.
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
     * @description If a parent node that contains an argument node finds a free format node (util.isFreeFormatElement), it returns that node.
     * @param {Node} element Reference node.
     * @param {Function|null} validation Additional validation function.
     * @returns {Element|null}
     */
    getFreeFormatElement: function (element, validation) {
        if (!element) return null;
        if (!validation) {
            validation = function () { return true; };
        }

        while (element) {
            if (this.isWysiwygDiv(element)) return null;
            if (this.isFreeFormatElement(element) && validation(element)) return element;

            element = element.parentNode;
        }
        
        return null;
    },

    /**
     * @description Add style and className of copyEl to originEl
     * @param {Element} originEl Origin element
     * @param {Element} copyEl Element to copy
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
        copyEl.className = copyEl.className.replace(/(\s|^)__se__format__[^\s]+/g, '');
        this.copyTagAttributes(originEl, copyEl);
    },

    /**
     * @description Get the item from the array that matches the condition.
     * @param {Array|HTMLCollection|NodeList} array Array to get item
     * @param {Function|null} validation Conditional function
     * @param {Boolean} multi If true, returns all items that meet the criteria otherwise, returns an empty array.
     * If false, returns only one item that meet the criteria otherwise return null.
     * @returns {Array|Object}
     */
    getArrayItem: function (array, validation, multi) {
        if (!array || array.length === 0) return null;

        validation = validation || function () { return true; };
        const arr = [];
        
        for (let i = 0, len = array.length, a; i < len; i++) {
            a = array[i];
            if (validation(a)) {
                if (!multi) return a;
                else arr.push(a);
            }
        }

        return !multi ? null : arr;
    },

    /**
     * @description Get the index of the argument value in the element array
     * @param {Array|HTMLCollection|NodeList} array element array
     * @param {Node} element The element to find index
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
     * @param {Array|HTMLCollection|NodeList} array element array
     * @param {Node} item The element to find index
     * @returns {Number}
     */
    nextIdx: function (array, item) {
        let idx = this.getArrayIndex(array, item);
        if (idx === -1) return -1;
        return idx + 1;
    },

    /**
     * @description Get the previous index of the argument value in the element array
     * @param {Array|HTMLCollection|NodeList} array Element array
     * @param {Node} item The element to find index
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
        while ((node = node.previousSibling)) {
            idx += 1;
        }
        return idx;
    },

    /**
     * @description Returns the position of the "node" in the "parentNode" in a numerical array.
     * ex) <p><span>aa</span><span>bb</span></p> : getNodePath(node: "bb", parentNode: "<P>") -> [1, 0]
     * @param {Node} node The Node to find position path
     * @param {Node|null} parentNode Parent node. If null, wysiwyg div area
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
     * @param {Node} parentNode Base parent element
     * @returns {Node}
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
     * @param {Node} a Node to compare
     * @param {Node} b Node to compare
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

        return (compStyle === style_b.length && compStyle === style_a.length) && (compClass === class_b.length && compClass === class_a.length);
    },

    /**
     * @description Check the node is a list (ol, ul)
     * @param {Node|String} node The element or element name to check
     * @returns {Boolean}
     */
    isList: function (node) {
        return node && /^(OL|UL)$/i.test(typeof node === 'string' ? node : node.nodeName);
    },

    /**
     * @description Check the node is a list cell (li)
     * @param {Node|String} node The element or element name to check
     * @returns {Boolean}
     */
    isListCell: function (node) {
        return node && /^LI$/i.test(typeof node === 'string' ? node : node.nodeName);
    },

    /**
     * @description Check the node is a table (table, thead, tbody, tr, th, td)
     * @param {Node|String} node The element or element name to check
     * @returns {Boolean}
     */
    isTable: function (node) {
        return node && /^(TABLE|THEAD|TBODY|TR|TH|TD)$/i.test(typeof node === 'string' ? node : node.nodeName);
    },

    /**
     * @description Check the node is a table cell (td, th)
     * @param {Node|String} node The element or element name to check
     * @returns {Boolean}
     */
    isCell: function (node) {
        return node && /^(TD|TH)$/i.test(typeof node === 'string' ? node : node.nodeName);
    },

    /**
     * @description Check the node is a break node (BR)
     * @param {Node|String} node The element or element name to check
     * @returns {Boolean}
     */
    isBreak: function (node) {
        return node && /^BR$/i.test(typeof node === 'string' ? node : node.nodeName);
    },


    /**
     * @description Check the node is a anchor node (A)
     * @param {Node|String} node The element or element name to check
     * @returns {Boolean}
     */
    isAnchor: function (node) {
        return node && /^A$/i.test(typeof node === 'string' ? node : node.nodeName);
    },

    /**
     * @description Check the node is a media node (img, iframe, audio, video, canvas)
     * @param {Node|String} node The element or element name to check
     * @returns {Boolean}
     */
    isMedia: function (node) {
        return node && /^(IMG|IFRAME|AUDIO|VIDEO|CANVAS)$/i.test(typeof node === 'string' ? node : node.nodeName);
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
     * @returns {Number}
     */
    getNumber: function (text, maxDec) {
        if (!text) return null;
        
        let number = (text + '').match(/-?\d+(\.\d+)?/);
        if (!number || !number[0]) return null;

        number = number[0];
        return maxDec < 0 ? number * 1 : maxDec === 0 ? this._w.Math.round(number * 1) : (number * 1).toFixed(maxDec) * 1;
    },

    /**
     * @description Get all "children" of the argument value element (Without text nodes)
     * @param {Element} element element to get child node
     * @param {Function|null} validation Conditional function
     * @returns {Array}
     */
    getListChildren: function (element, validation) {
        const children = [];
        if (!element || !element.children || element.children.length === 0) return children;

        validation = validation || function () { return true; };

        (function recursionFunc(current) {
            if (element !== current && validation(current)) {
                children.push(current);
            }

            for (let i = 0, len = current.children.length; i < len; i++) {
                recursionFunc(current.children[i]);
            }
        })(element);

        return children;
    },

    /**
     * @description Get all "childNodes" of the argument value element (Include text nodes)
     * @param {Node} element element to get child node
     * @param {Function|null} validation Conditional function
     * @returns {Array}
     */
    getListChildNodes: function (element, validation) {
        const children = [];
        if (!element || element.childNodes.length === 0) return children;

        validation = validation || function () { return true; };

        (function recursionFunc(current) {
            if (element !== current && validation(current)) {
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
     * "-1" when the element argument is the WYSIWYG area.
     * @param {Node} element The element to check
     * @returns {Number}
     */
    getElementDepth: function (element) {
        if (!element || this.isWysiwygDiv(element)) return -1;

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
                query = '^' + (query === 'text' ? '#' + query : query) + '$';
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
     * @param {Node} first First element
     * @param {Node|null} last Last element
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
     * @param {Node} element Target node
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
     * ex) 1, 5, 4, 6 => "2" (4 ~ 5)
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
     * @param {Node} element Element to replace text content
     * @param {String} txt Text to be applied
     */
    changeTxt: function (element, txt) {
        if (!element || !txt) return;
        element.textContent = txt;
    },

    /**
     * @description Replace element
     * @param {Element} element Target element
     * @param {String|Element} newElement String or element of the new element to apply
     */
    changeElement: function (element, newElement) {
        if (typeof newElement === 'string') {
            if (element.outerHTML) {
                element.outerHTML = newElement;
            } else {
                const doc = this.createElement('DIV');
                doc.innerHTML = newElement;
                newElement = doc.firstChild;
                element.parentNode.replaceChild(newElement, element);
            }
        } else if (newElement.nodeType === 1) {
            element.parentNode.replaceChild(newElement, element);
        }
    },

    /**
     * @description Set style, if all styles are deleted, the style properties are deleted.
     * @param {Element} element Element to set style
     * @param {String} styleName Style attribute name (marginLeft, textAlign...)
     * @param {String|Number} value Style value
     */
    setStyle: function (element, styleName, value) {
        element.style[styleName] = value;

        if (!value && !element.style.cssText) {
            element.removeAttribute('style');
        }
    },

    /**
     * @description Determine whether any of the matched elements are assigned the given class
     * @param {Element} element Elements to search class name
     * @param {String} className Class name to search for
     * @returns {Boolean}
     */
    hasClass: function (element, className) {
        if (!element) return;

        return (new this._w.RegExp(className)).test(element.className);
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

        if (!element.className.trim()) element.removeAttribute('class');
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

        if (!element.className.trim()) element.removeAttribute('class');
    },

    /**
     * @description In the predefined code view mode, the buttons except the executable button are changed to the 'disabled' state.
     * core.codeViewDisabledButtons (An array of buttons whose class name is not "se-code-view-enabled")
     * core.resizingDisabledButtons (An array of buttons whose class name is not "se-resizing-enabled")
     * @param {Boolean} disabled Disabled value
     * @param {Array|HTMLCollection|NodeList} buttonList Button array
     */
    toggleDisabledButtons: function (disabled, buttonList) {
        for (let i = 0, len = buttonList.length; i < len; i++) {
            buttonList[i].disabled = disabled;
        }
    },

    /**
     * @description Delete argumenu value element
     * @param {Node} item Node to be remove
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
     * @param {Node} item Node to be remove
     * @param {Function|null} validation Validation function. default(Deleted if it only have breakLine and blanks)
     * @param {Element|null} stopParent Stop when the parent node reaches stopParent
     * @returns {Object|null} {sc: previousSibling, ec: nextSibling}
     */
    removeItemAllParents: function (item, validation, stopParent) {
        if (!item) return null;
        let cc = null;
        if (!validation) {
            validation = function (current) {
                if (current === stopParent || this.isComponent(current)) return false;
                const text = current.textContent.trim();
                return text.length === 0 || /^(\n|\u200B)+$/.test(text);
            }.bind(this);
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
     * @description Detach Nested all nested lists under the "baseNode".
     * Returns a list with nested removed.
     * @param {Node} baseNode Element on which to base.
     * @param {Boolean} all If true, it also detach all nested lists of a returned list.
     * @returns {Element}
     */
    detachNestedList: function (baseNode, all) {
        const rNode = this._deleteNestedList(baseNode);
        let rangeElement, cNodes;

        if (rNode) {
            rangeElement = rNode.cloneNode(false);
            cNodes = rNode.childNodes;
            const index = this.getPositionIndex(baseNode);
            while (cNodes[index]) {
                rangeElement.appendChild(cNodes[index]);
            }
        } else {
            rangeElement = baseNode;
        }
        
        let rChildren;
        if (!all) {
            const depth = this.getElementDepth(baseNode) + 2;
            rChildren = this.getListChildren(baseNode, function (current) { return this.isListCell(current) && !current.previousElementSibling && this.getElementDepth(current) === depth; }.bind(this));
        } else {
            rChildren = this.getListChildren(rangeElement, function (current) { return this.isListCell(current) && !current.previousElementSibling; }.bind(this));
        }

        for (let i = 0, len = rChildren.length; i < len; i++) {
            this._deleteNestedList(rChildren[i]);
        }
        
        if (rNode) {
            rNode.parentNode.insertBefore(rangeElement, rNode.nextSibling);
            if (cNodes && cNodes.length === 0) this.removeItem(rNode);
        }

        return rangeElement === baseNode ? rangeElement.parentNode : rangeElement;
    },

    /**
     * @description Sub function of util.detachNestedList method.
     * @private
     */
    _deleteNestedList: function (baseNode) {
        const baseParent = baseNode.parentNode;
        let sibling = baseParent;
        let parent = sibling.parentNode;
        let liSibling, liParent, child, index, c;
        
        while (this.isListCell(parent)) {
            index = this.getPositionIndex(baseNode);
            liSibling = parent.nextElementSibling;
            liParent = parent.parentNode;
            child = sibling;
            while(child) {
                sibling = sibling.nextSibling;
                if (this.isList(child)) {
                    c = child.childNodes;
                    while (c[index]) {
                        liParent.insertBefore(c[index], liSibling);
                    }
                    if (c.length === 0) this.removeItem(child);
                } else {
                    liParent.appendChild(child);
                }
                child = sibling;
            }
            sibling = liParent;
            parent = liParent.parentNode;
        }

        if (baseParent.children.length === 0) this.removeItem(baseParent);

        return liParent;
    },

    /**
     * @description Split all tags based on "baseNode"
     * Returns the last element of the splited tag.
     * @param {Node} baseNode Element or text node on which to base
     * @param {Number|null} offset Text offset of "baseNode" (Only valid when "baseNode" is a text node)
     * @param {Number} depth The nesting depth of the element being split. (default: 0)
     * @returns {Element}
     */
    splitElement: function (baseNode, offset, depth) {
        const bp = baseNode.parentNode;
        let index = 0, newEl, children, temp;
        let next = true;
        if (!depth || depth < 0) depth = 0;

        if (baseNode.nodeType === 3) {
            index = this.getPositionIndex(baseNode);
            if (offset >= 0) {
                baseNode.splitText(offset);
                const after = this.getNodeFromPath([index + 1], bp);
                if (this.onlyZeroWidthSpace(after)) after.data = this.zeroWidthSpace;
            }
        } else if (baseNode.nodeType === 1) {
            if (!baseNode.previousSibling) {
                if (this.getElementDepth(baseNode) === depth) next = false;
            } else {
                baseNode = baseNode.previousSibling;
            }
        }

        let depthEl = baseNode;
        while (this.getElementDepth(depthEl) > depth) {
            index = this.getPositionIndex(depthEl) + 1;
            depthEl = depthEl.parentNode;

            temp = newEl;
            newEl = depthEl.cloneNode(false);
            children = depthEl.childNodes;

            if (temp) {
                if (this.isListCell(newEl) && this.isList(temp) && temp.firstElementChild) {
                    newEl.innerHTML = temp.firstElementChild.innerHTML;
                    util_util.removeItem(temp.firstElementChild);
                    if (temp.children.length > 0) newEl.appendChild(temp);
                } else {
                }
                newEl.appendChild(temp);
            }

            while (children[index]) {
                newEl.appendChild(children[index]);
            }
        }

        if (depthEl.childNodes.length <= 1 && (!depthEl.firstChild || depthEl.firstChild.textContent.length === 0)) depthEl.innerHTML = '<br>';

        const pElement = depthEl.parentNode;
        if (next) depthEl = depthEl.nextSibling;
        if (!newEl) return depthEl;

        this.mergeSameTags(newEl, null, false);
        this.mergeNestedTags(newEl, function (current) { return this.isList(current); }.bind(this));
        
        if (newEl.childNodes.length > 0) pElement.insertBefore(newEl, depthEl);
        else newEl = depthEl;

        if (bp.childNodes.length === 0) this.removeItem(bp);

        return newEl;
    },

    /**
     * @description Use with "npdePath (util.getNodePath)" to merge the same attributes and tags if they are present and modify the nodepath.
     * If "offset" has been changed, it will return as much "offset" as it has been modified.
     * An array containing change offsets is returned in the order of the "nodePathArray" array.
     * @param {Element} element Element
     * @param {Array|null} nodePathArray Array of NodePath object ([util.getNodePath(), ..])
     * @param {Boolean} onlyText If true, non-text nodes(!util._isIgnoreNodeChange) like 'span', 'strong'.. are ignored.
     * @returns {Array} [offset, ..]
     */
    mergeSameTags: function (element, nodePathArray, onlyText) {
        const inst = this;
        let offsets = null;
        if (nodePathArray && nodePathArray.length > 0) {
            offsets = this._w.Array.apply(null, new this._w.Array(nodePathArray.length)).map(this._w.Number.prototype.valueOf, 0);
        }

        (function recursionFunc(current, depth, depthIndex) {
            const children = current.childNodes;
            
            for (let i = 0, len = children.length, child, next; i < len; i++) {
                child = children[i];
                next = children[i + 1];
                if (!child) break;
                if((onlyText && inst._isIgnoreNodeChange(child)) || (!onlyText && (inst.isTable(child) || inst.isListCell(child) || (inst.isFormatElement(child) && !inst.isFreeFormatElement(child))))) {
                    if (inst.isTable(child) || inst.isListCell(child)) {
                        recursionFunc(child, depth + 1, i);
                    }
                    continue;
                }
                if (len === 1 && current.nodeName === child.nodeName && current.parentNode) {
                    // update nodePath
                    if (nodePathArray) {
                        let path, c, p, cDepth, spliceDepth;
                        for (let n in nodePathArray) {
                            path = nodePathArray[n];
                            if (path && path[depth] === i) {
                                c = child, p = current, cDepth = depth, spliceDepth = true;
                                while (cDepth >= 0) {
                                    if (inst.getArrayIndex(p.childNodes, c) !== path[cDepth]) {
                                        spliceDepth = false;
                                        break;
                                    }
                                    c = child.parentNode;
                                    p = c.parentNode;
                                    cDepth--;
                                }
                                if (spliceDepth) {
                                    path.splice(depth, 1);
                                    path[depth] = i;
                                }
                            }
                        }
                    }

                    // merge tag
                    inst.copyTagAttributes(child, current);
                    current.parentNode.insertBefore(child, current);
                    inst.removeItem(current);
                }
                if (!next) {
                    if (child.nodeType === 1) recursionFunc(child, depth + 1, i);
                    break;
                }

                if (child.nodeName === next.nodeName && inst.isSameAttributes(child, next) && child.href === next.href) {
                    const childs = child.childNodes;
                    let childLength = 0;
                    for (let n = 0, nLen = childs.length; n < nLen; n++) {
                        if (childs[n].textContent.length > 0) childLength++;
                    }

                    const l = child.lastChild;
                    const r = next.firstChild;
                    let addOffset = 0;
                    if (l && r) {
                        const textOffset = l.nodeType === 3 && r.nodeType === 3;
                        addOffset = l.textContent.length;
                        let tempL = l.previousSibling;
                        while(tempL && tempL.nodeType === 3) {
                            addOffset += tempL.textContent.length;
                            tempL = tempL.previousSibling;
                        }

                        if (childLength > 0 && l.nodeType === 3 && r.nodeType === 3 && (l.textContent.length > 0 || r.textContent.length > 0)) childLength--;

                        if (nodePathArray) {
                            let path = null;
                            for (let n in nodePathArray) {
                                path = nodePathArray[n];
                                if (path && path[depth] > i) {
                                    if (depth > 0 && path[depth - 1] !== depthIndex) continue;
    
                                    path[depth] -= 1;
                                    if (path[depth + 1] >= 0 && path[depth] === i) {
                                        path[depth + 1] += childLength;
                                        if (textOffset) {
                                            if (l && l.nodeType === 3 && r && r.nodeType === 3) {
                                                offsets[n] += addOffset;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (child.nodeType === 3) {
                        addOffset = child.textContent.length;
                        child.textContent += next.textContent;
                        if (nodePathArray) {
                            let path = null;
                            for (let n in nodePathArray) {
                                path = nodePathArray[n];
                                if (path && path[depth] > i) {
                                    if (depth > 0 && path[depth - 1] !== depthIndex) continue;
    
                                    path[depth] -= 1;
                                    if (path[depth + 1] >= 0 && path[depth] === i) {
                                        path[depth + 1] += childLength;
                                        offsets[n] += addOffset;
                                    }
                                }
                            }
                        }
                    } else {
                        child.innerHTML += next.innerHTML;
                    }
                    
                    inst.removeItem(next);
                    i--;
                } else if (child.nodeType === 1) {
                    recursionFunc(child, depth + 1, i);
                }
            }
        })(element, 0, 0);

        return offsets;
    },

    /**
     * @description Remove nested tags without other child nodes.
     * @param {Element} element Element object
     * @param {Function|String|null} validation Validation function / String("tag1|tag2..") / If null, all tags are applicable.
     */
    mergeNestedTags: function (element, validation) {
        if (typeof validation === 'string') {
            validation = function (current) { return this.test(current.tagName); }.bind(new this._w.RegExp('^(' + (validation ? validation : '.+') + ')$', 'i'));
        } else if (typeof validation !== 'function') {
            validation = function () { return true; };
        }
        
        (function recursionFunc(current) {
            let children = current.children;
            if (children.length === 1 && children[0].nodeName === current.nodeName && validation(current)) {
                const temp = children[0];
                children = temp.children;
                while (children[0]) {
                    current.appendChild(children[0]);
                }
                current.removeChild(temp);
            }

            for (let i = 0, len = current.children.length; i < len; i++) {
                recursionFunc(current.children[i]);
            }
        })(element);
    },

    /**
     * @description Delete a empty child node of argument element
     * @param {Element} element Element node
     * @param {Node|null} notRemoveNode Do not remove node
     */
    removeEmptyNode: function (element, notRemoveNode) {
        const inst = this;

        if (notRemoveNode) {
            notRemoveNode = inst.getParentElement(notRemoveNode, function (current) {
                return element === current.parentElement;
            });
        }
        
        (function recursionFunc(current) {
            if (inst._notTextNode(current) || current === notRemoveNode || current.getAttribute('contenteditable') === 'false') return 0;
            if (current !== element && inst.onlyZeroWidthSpace(current.textContent) && (!current.firstChild || !inst.isBreak(current.firstChild))) {
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
     * @description Remove whitespace between tags in HTML string.
     * @param {String} html HTML string
     * @returns {String}
     */
    htmlRemoveWhiteSpace: function (html) {
        if (!html) return '';
        return html.trim().replace(/<\/?(?!strong|span|font|b|var|i|em|u|ins|s|strike|del|sub|sup|mark|a|label)[^>^<]+>\s+(?=<)/ig, function (m) { return m.trim(); });
    },

    /**
     * @description Sort a element array by depth of element.
     * @param {Array} array Array object
     * @param {Boolean} des true: descending order / false: ascending order
     */
    sortByDepth: function (array, des) {
        const t = !des ? -1 : 1;
        const f = t * -1;

        array.sort(function (a, b) {
            if (!this.isListCell(a) || !this.isListCell(b)) return 0;
            a = this.getElementDepth(a);
            b = this.getElementDepth(b);
            return a > b ? t : a < b ? f : 0;
        }.bind(this));
    },

    /**
     * @description Nodes that need to be added without modification when changing text nodes
     * @param {Node} element Element to check
     * @returns {Boolean}
     * @private
     */
    _isIgnoreNodeChange: function (element) {
        return element.nodeType !== 3 && (element.getAttribute('contenteditable') === 'false' || !this.isTextStyleElement(element));
    },

    /**
     * @description Nodes that must remain undetached when changing text nodes
     * @param {Node} element Element to check
     * @returns {Boolean}
     * @private
     */
    _isMaintainedNode: function (element) {
        return element.nodeType !== 3 && /^(a|label)$/i.test(typeof element === 'string' ? element : element.nodeName);
    },

    /**
     * @description Nodes without text
     * @param {Node} element Element to check
     * @returns {Boolean}
     * @private
     */
    _notTextNode: function (element) {
        return element.nodeType !== 3 && (this.isComponent(element) || /^(br|input|select|canvas|img|iframe|audio|video)$/i.test(typeof element === 'string' ? element : element.nodeName));
    },

    /**
     * @description Check not Allowed tags
     * @param {Node} element Element to check
     * @private
     */
    _notAllowedTags: function (element) {
        return  /^(meta|script|link|style|[a-z]+\:[a-z]+)$/i.test(element.nodeName);
    },

    /**
     * @description Create whitelist RegExp object.
     * Return RegExp format: new RegExp("<\\/?(" + (?!\\b list[i] \\b) + ")[^>^<])+>", "g")
     * @param {String} list Tags list ("br|p|div|pre...")
     * @returns {RegExp}
     */
    createTagsWhitelist: function (list) {
        const exclusionTags = list.split('|');
        let regStr = '<\\/?(';

        for (let i = 0, len = exclusionTags.length; i < len; i++) {
            regStr += '(?!\\b' + exclusionTags[i] + '\\b)';
        }

        regStr += '[^>^<])+>';

        return new RegExp(regStr, 'g');
    },

    /**
     * @description Fix tags that do not fit the editor format.
     * @param {Element} documentFragment Document fragment "DOCUMENT_FRAGMENT_NODE" (nodeType === 11)
     * @param {RegExp} htmlCheckWhitelistRegExp Editor tags whitelist (core._htmlCheckWhitelistRegExp)
     * @private
     */
    _consistencyCheckOfHTML: function (documentFragment, htmlCheckWhitelistRegExp) {
        // empty whitelist
        const emptyWhitelistTags = [];
        // wrong position
        const wrongTags = this.getListChildren(documentFragment, function (current) {
            if (!htmlCheckWhitelistRegExp.test(current.nodeName) && current.childNodes.length === 0) {
                emptyWhitelistTags.push(current);
                return false;
            }
            return current.parentNode !== documentFragment &&
             (this.isFormatElement(current) || this.isComponent(current) || this.isList(current) || (((this.isMedia(current) && !this.isAnchor(current.parentNode)) || (this.isMedia(current.firstElementChild) && this.isAnchor(current))) && !this.getParentElement(current, this.isComponent))) &&
              !this.isRangeFormatElement(current.parentNode) && !this.isListCell(current.parentNode);
        }.bind(this));

        for (let i in emptyWhitelistTags) {
            this.removeItem(emptyWhitelistTags[i]);
        }
        
        const checkTags = [];
        for (let i = 0, len = wrongTags.length, t, tp; i < len; i++) {
            t = wrongTags[i];
            tp = t.parentNode;
            tp.parentNode.insertBefore(t, tp);
            checkTags.push(tp);
        }

        for (let i = 0, len = checkTags.length, t; i < len; i++) {
            t = checkTags[i];
            if (this.onlyZeroWidthSpace(t.textContent.trim())) {
                this.removeItem(t);
            }
        }

        // remove empty tags
        const emptyTags = this.getListChildren(documentFragment, function (current) {
            return (!this.isTable(current) && !this.isListCell(current)) && (this.isFormatElement(current) || this.isRangeFormatElement(current) || this.isTextStyleElement(current)) && current.childNodes.length === 0 && !util_util.getParentElement(current, '.katex');
        }.bind(this));

        for (let i in emptyTags) {
            this.removeItem(emptyTags[i]);
        }

        // wrong list
        const wrongList = this.getListChildren(documentFragment, function (current) {
            return this.isList(current.parentNode) && !this.isList(current) && !this.isListCell(current);
        }.bind(this));

        for (let i = 0, len = wrongList.length, t, tp, children; i < len; i++) {
            t = wrongList[i];

            tp = this.createElement('LI');
            children = t.childNodes;
            while (children[0]) {
                tp.appendChild(children[0]);
            }
            
            t.parentNode.insertBefore(tp, t);
            this.removeItem(t);
        }
    },

    _setDefaultOptionStyle: function (options) {
        let optionStyle = '';
        if (options.height) optionStyle += 'height:' + options.height + ';';
        if (options.minHeight) optionStyle += 'min-height:' + options.minHeight + ';';
        if (options.maxHeight) optionStyle += 'max-height:' + options.maxHeight + ';';
        return optionStyle;
    }
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
    icons: null,
    /**
     * @description document create - call _createToolBar()
     * @param {Element} element Textarea
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
        if (tool_bar.pluginCallButtons.math) this._checkKatexMath(options.katex);
        const arrow = doc.createElement('DIV');
        arrow.className = 'se-arrow';

        // sticky toolbar dummy
        const sticky_dummy = doc.createElement('DIV');
        sticky_dummy.className = 'se-toolbar-sticky-dummy';
    
        // inner editor div
        const editor_div = doc.createElement('DIV');
        editor_div.className = 'se-wrapper';

        /** --- init elements and create bottom bar --- */
        const initElements = this._initElements(options, top_div, tool_bar.element, arrow);

        const bottomBar = initElements.bottomBar;
        const wysiwyg_div = initElements.wysiwygFrame;
        const placeholder_span = initElements.placeholder;
        let textarea = initElements.codeView;

        // resizing bar
        const resizing_bar = bottomBar.resizingBar;
        const navigation = bottomBar.navigation;
        const char_wrapper = bottomBar.charWrapper;
        const char_counter = bottomBar.charCounter;
    
        // loading box
        const loading_box = doc.createElement('DIV');
        loading_box.className = 'se-loading-box sun-editor-common';
        loading_box.innerHTML = '<div class="se-loading-effect"></div>';

        // enter line
        const line_breaker = doc.createElement('DIV');
        line_breaker.className = 'se-line-breaker';
        line_breaker.innerHTML = '<button class="se-btn">' + this.icons.line_break + '</button>';
    
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
        relative.appendChild(line_breaker);
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
                _charWrapper: char_wrapper,
                _charCounter: char_counter,
                _loading: loading_box,
                _lineBreaker: line_breaker,
                _resizeBack: resize_back,
                _stickyDummy: sticky_dummy,
                _arrow: arrow
            },
            options: options,
            plugins: tool_bar.plugins,
            pluginCallButtons: tool_bar.pluginCallButtons,
            _icons: this.icons
        };
    },

    /**
     * @description Check the CodeMirror option to apply the CodeMirror and return the CodeMirror element.
     * @param {Object} options options
     * @param {Element} textarea textarea element
     * @private
     */
    _checkCodeMirror: function (options, textarea) {
        if (options.codeMirror) {
            const cmOptions = [{
                mode: 'htmlmixed',
                htmlMode: true,
                lineNumbers: true,
                lineWrapping: true
            }, (options.codeMirror.options || {})].reduce(function (init, option) {
                for (let key in option) {
                    init[key] = option[key];
                }
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
     * @description Check for a katex object.
     * @param {Object} katex katex object
     * @private
     */
    _checkKatexMath: function (katex) {
        if (!katex) throw Error('[SUNEDITOR.create.fail] To use the math button you need to add a "katex" object to the options.');

        const katexOptions = [{
            throwOnError: false,
        }, (katex.options || {})].reduce(function (init, option) {
            for (let key in option) {
                init[key] = option[key];
            }
            return init;
        }, {});

        katex.options = katexOptions;
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
        if (tool_bar.pluginCallButtons.math) this._checkKatexMath(mergeOptions.katex);
        const arrow = document.createElement('DIV');
        arrow.className = 'se-arrow';

        if (isNewToolbar) {
            relative.replaceChild(tool_bar.element, el.toolbar);
            el.toolbar = tool_bar.element;
            el._arrow = arrow;
        }
        
        const initElements = this._initElements(mergeOptions, el.topArea, (isNewToolbar ? tool_bar.element : el.toolbar), arrow);

        const bottomBar = initElements.bottomBar;
        const wysiwygFrame = initElements.wysiwygFrame;
        const placeholder_span = initElements.placeholder;
        let code = initElements.codeView;

        if (el.resizingBar) relative.removeChild(el.resizingBar);
        if (bottomBar.resizingBar) relative.appendChild(bottomBar.resizingBar);
        
        el.resizingBar = bottomBar.resizingBar;
        el.navigation = bottomBar.navigation;
        el.charWrapper = bottomBar.charWrapper;
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
     * @returns {Object} Bottom bar elements (resizingBar, navigation, charWrapper, charCounter)
     * @private
     */
    _initElements: function (options, topDiv, toolBar, toolBarArrow) {
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
        
        if (!options.iframe) {
            wysiwygDiv.setAttribute('contenteditable', true);
            wysiwygDiv.setAttribute('scrolling', 'auto');
            wysiwygDiv.className += ' sun-editor-editable';
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
            });
        }
        
        wysiwygDiv.style.cssText = lib_util._setDefaultOptionStyle(options);

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
        let charWrapper = null;
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
                charWrapper = document.createElement('DIV');
                charWrapper.className = 'se-char-counter-wrapper';

                if (options.charCounterLabel) {
                    const charLabel = document.createElement('SPAN');
                    charLabel.className = 'se-char-label';
                    charLabel.textContent = options.charCounterLabel;
                    charWrapper.appendChild(charLabel);
                }
    
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
                charWrapper: charWrapper,
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
        /** Whitelist */
        options._defaultTagsWhitelist = typeof options._defaultTagsWhitelist === 'string' ? options._defaultTagsWhitelist : 'br|p|div|pre|blockquote|h[1-6]|ol|ul|li|hr|figure|figcaption|img|iframe|audio|video|table|thead|tbody|tr|th|td|a|b|strong|var|i|em|u|ins|s|span|strike|del|sub|sup';
        options._editorTagsWhitelist = options._defaultTagsWhitelist + (typeof options.addTagsWhitelist === 'string' && options.addTagsWhitelist.length > 0 ? '|' + options.addTagsWhitelist : '');
        options.pasteTagsWhitelist = typeof options.pasteTagsWhitelist === 'string' ? options.pasteTagsWhitelist : options._editorTagsWhitelist;
        options.attributesWhitelist = (!options.attributesWhitelist || typeof options.attributesWhitelist !== 'object') ? null : options.attributesWhitelist;
        /** Layout */
        options.mode = options.mode || 'classic'; // classic, inline, balloon, balloon-always
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
        /** Character count */
        options.charCounter = options.maxCharCount > 0 ? true : typeof options.charCounter === 'boolean' ? options.charCounter : false;
        options.charCounterType = typeof options.charCounterType === 'string' ? options.charCounterType : 'char';
        options.charCounterLabel = typeof options.charCounterLabel === 'string' ? options.charCounterLabel.trim() : null;
        options.maxCharCount = lib_util.isNumber(options.maxCharCount) && options.maxCharCount > -1 ? options.maxCharCount * 1 : null;
        /** Width size */
        options.width = options.width ? (lib_util.isNumber(options.width) ? options.width + 'px' : options.width) : (element.clientWidth ? element.clientWidth + 'px' : '100%');
        options.minWidth = (lib_util.isNumber(options.minWidth) ? options.minWidth + 'px' : options.minWidth) || '';
        options.maxWidth = (lib_util.isNumber(options.maxWidth) ? options.maxWidth + 'px' : options.maxWidth) || '';
        /** Height size */
        options.height = options.height ? (lib_util.isNumber(options.height) ? options.height + 'px' : options.height) : (element.clientHeight ? element.clientHeight + 'px' : 'auto');
        options.minHeight = (lib_util.isNumber(options.minHeight) ? options.minHeight + 'px' : options.minHeight) || '';
        options.maxHeight = (lib_util.isNumber(options.maxHeight) ? options.maxHeight + 'px' : options.maxHeight) || '';
        /** Editing area default style */
        options.defaultStyle = lib_util._setDefaultOptionStyle(options) + (typeof options.defaultStyle === 'string' ? options.defaultStyle : '');
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
        options.imageHeight = !options.imageHeight ? 'auto' : lib_util.isNumber(options.imageHeight) ? options.imageHeight + 'px' : options.imageHeight;
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
        options.videoWidth = !options.videoWidth || !lib_util.getNumber(options.videoWidth, 0) ? '' : lib_util.isNumber(options.videoWidth) ? options.videoWidth + 'px' : options.videoWidth;
        options.videoHeight = !options.videoHeight || !lib_util.getNumber(options.videoHeight, 0) ? '' : lib_util.isNumber(options.videoHeight) ? options.videoHeight + 'px' : options.videoHeight;
        options.videoSizeOnlyPercentage = !!options.videoSizeOnlyPercentage;
        options._videoSizeUnit = options.videoSizeOnlyPercentage ? '%' : 'px';
        options.videoRotation = options.videoRotation !== undefined ? options.videoRotation : !(options.videoSizeOnlyPercentage || !options.videoHeightShow);
        options.videoRatio = (lib_util.getNumber(options.videoRatio, 4) || 0.5625);
        options.videoRatioList = !options.videoRatioList ? null : options.videoRatioList;
        options.youtubeQuery = (options.youtubeQuery || '').replace('?', '');
        /** Defining save button */
        options.callBackSave = !options.callBackSave ? null : options.callBackSave;
        /** Templates Array */
        options.templates = !options.templates ? null : options.templates;
        /** ETC */
        options.placeholder = typeof options.placeholder === 'string' ? options.placeholder : null;
        /** Math (katex) */
        options.katex = options.katex ? options.katex.src ? options.katex : {src: options.katex} : null;
        /** Buttons */
        options.buttonList = options.buttonList || [
            ['undo', 'redo'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['fullScreen', 'showBlocks', 'codeView'],
            ['preview', 'print']
        ];

        /** --- Define icons --- */
        this.icons = (!options.icons || typeof options.icons !== 'object') ? defaultIcons : [defaultIcons, options.icons].reduce(function (_default, _new) {
            for (let key in _new) {
                _default[key] = _new[key];
            }
            return _default;
        }, {});
    },

    /**
     * @description Suneditor's Default button list
     * @private
     */
    _defaultButtons: function (lang) {
        const icons = this.icons;
        return {
            /** default command */
            bold: ['_se_command_bold', lang.toolbar.bold + ' (CTRL+B)', 'STRONG', '', icons.bold],
            underline: ['_se_command_underline', lang.toolbar.underline + ' (CTRL+U)', 'U', '', icons.underline],
            italic: ['_se_command_italic', lang.toolbar.italic + ' (CTRL+I)', 'EM', '', icons.italic],
            strike: ['_se_command_strike', lang.toolbar.strike + ' (CTRL+SHIFT+S)', 'DEL', '', icons.strike],
            subscript: ['_se_command_subscript', lang.toolbar.subscript, 'SUB', '', icons.subscript],
            superscript: ['_se_command_superscript', lang.toolbar.superscript, 'SUP', '', icons.superscript],
            removeFormat: ['', lang.toolbar.removeFormat, 'removeFormat', '', icons.erase],
            indent: ['_se_command_indent', lang.toolbar.indent + ' (CTRL+])', 'indent', '', icons.outdent],
            outdent: ['_se_command_outdent', lang.toolbar.outdent + ' (CTRL+[)', 'outdent', '', icons.indent],
            fullScreen: ['se-code-view-enabled se-resizing-enabled', lang.toolbar.fullScreen, 'fullScreen', '', icons.expansion],
            showBlocks: ['', lang.toolbar.showBlocks, 'showBlocks', '', icons.show_blocks],
            codeView: ['se-code-view-enabled se-resizing-enabled', lang.toolbar.codeView, 'codeView', '', icons.code_view],
            undo: ['_se_command_undo se-resizing-enabled', lang.toolbar.undo + ' (CTRL+Z)', 'undo', '', icons.undo],
            redo: ['_se_command_redo se-resizing-enabled', lang.toolbar.redo + ' (CTRL+Y / CTRL+SHIFT+Z)', 'redo', '', icons.redo],
            preview: ['se-resizing-enabled', lang.toolbar.preview, 'preview', '', icons.preview],
            print: ['se-resizing-enabled', lang.toolbar.print, 'print', '', icons.print],
            save: ['_se_command_save se-resizing-enabled', lang.toolbar.save, 'save', '', icons.save],
            /** plugins - command */
            blockquote: ['', lang.toolbar.tag_blockquote, 'blockquote', 'command', icons.blockquote],
            /** plugins - submenu */
            font: ['se-btn-select se-btn-tool-font', lang.toolbar.font, 'font', 'submenu', '<span class="txt">' + lang.toolbar.font + '</span>' + icons.arrow_down],
            formatBlock: ['se-btn-select se-btn-tool-format', lang.toolbar.formats, 'formatBlock', 'submenu', '<span class="txt">' + lang.toolbar.formats + '</span>' + icons.arrow_down],
            fontSize: ['se-btn-select se-btn-tool-size', lang.toolbar.fontSize, 'fontSize', 'submenu', '<span class="txt">' + lang.toolbar.fontSize + '</span>' + icons.arrow_down],
            fontColor: ['', lang.toolbar.fontColor, 'fontColor', 'submenu', icons.font_color],
            hiliteColor: ['', lang.toolbar.hiliteColor, 'hiliteColor', 'submenu', icons.highlight_color],
            align: ['se-btn-align', lang.toolbar.align, 'align', 'submenu', icons.align_left],
            list: ['', lang.toolbar.list, 'list', 'submenu', icons.list_number],
            horizontalRule: ['btn_line', lang.toolbar.horizontalRule, 'horizontalRule', 'submenu', icons.horizontal_rule],
            table: ['', lang.toolbar.table, 'table', 'submenu', icons.table],
            lineHeight: ['', lang.toolbar.lineHeight, 'lineHeight', 'submenu', icons.line_height],
            template: ['', lang.toolbar.template, 'template', 'submenu', icons.template],
            paragraphStyle: ['', lang.toolbar.paragraphStyle, 'paragraphStyle', 'submenu', icons.paragraph_style],
            textStyle: ['', lang.toolbar.textStyle, 'textStyle', 'submenu', icons.text_style],
            /** plugins - dialog */
            link: ['', lang.toolbar.link, 'link', 'dialog', icons.link],
            image: ['', lang.toolbar.image, 'image', 'dialog', icons.image],
            video: ['', lang.toolbar.video, 'video', 'dialog', icons.video],
            math: ['', lang.toolbar.math, 'math', 'dialog', icons.math]
        };
    },

    /**
     * @description Create a group div containing each module
     * @returns {Object}
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
     * @param {string} dataDisplay The data-display property of the button ('dialog', 'submenu', 'command')
     * @param {string} innerHTML Html in button
     * @param {string} _disabled Button disabled
     * @returns {Object}
     * @private
     */
    _createButton: function (buttonClass, title, dataCommand, dataDisplay, innerHTML, _disabled) {
        const oLi = lib_util.createElement('LI');
        const oButton = lib_util.createElement('BUTTON');

        oButton.setAttribute('type', 'button');
        oButton.setAttribute('class', 'se-btn' + (buttonClass ? ' ' + buttonClass : '') + ' se-tooltip');
        oButton.setAttribute('data-command', dataCommand);
        oButton.setAttribute('data-display', dataDisplay);
        if (!innerHTML) innerHTML = '<span class="se-icon-text">!</span>';
        innerHTML += '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + (title || dataCommand) + '</span></span>';

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
                            module = [button.buttonClass, button.title, button.name, button.dataDisplay, button.innerHTML, button._disabled];
                        }
                    } else {
                        module = defaultButtonList[button];
                        pluginName = button;
                        if (!module) {
                            const custom = plugins[pluginName];
                            if (!custom) throw Error('[SUNEDITOR.create.toolbar.fail] The button name of a plugin that does not exist. [' + pluginName + ']');
                            module = [custom.buttonClass, custom.title, custom.name, custom.display, custom.innerHTML, custom._disabled];
                        }
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
 * @param {Element} element textarea element
 * @param {object} cons Toolbar element you created
 * @param {JSON|Object} options Inserted options
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
            charWrapper: cons._charWrapper,
            charCounter: cons._charCounter,
            editorArea: cons._editorArea,
            wysiwygFrame: cons._wysiwygArea,
            wysiwyg: options.iframe ? cons._wysiwygArea.contentDocument.body : cons._wysiwygArea,
            code: cons._codeArea,
            placeholder: cons._placeholder,
            loading: cons._loading,
            lineBreaker: cons._lineBreaker,
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
            undo: cons._toolBar.querySelector('._se_command_undo'),
            redo: cons._toolBar.querySelector('._se_command_redo'),
            save: cons._toolBar.querySelector('._se_command_save'),
            outdent: cons._toolBar.querySelector('._se_command_outdent'),
            indent: cons._toolBar.querySelector('._se_command_indent')
        },
        options: options,
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

        core.controllersOff();
        core._checkComponents();
        core._charCount('');
        core._resourcesStateChange();
        
        // onChange
        change();
    }

    function pushStack () {
        core._checkComponents();
        const current = core.getContents(true);
        if (!!stack[stackIndex] && current === stack[stackIndex].contents) return;

        stackIndex++;
        const range = core._variable._range;

        if (stack.length > stackIndex) {
            stack = stack.slice(0, stackIndex);
            if (redo) redo.setAttribute('disabled', true);
        }

        if (!range) {
            stack[stackIndex] = {
                contents: current,
                s: { path: [0, 0], offset: [0, 0] },
                e: { path: 0, offset: 0 }
            };
        } else {
            stack[stackIndex] = {
                contents: current,
                s: {
                    path: util.getNodePath(range.startContainer, null, null),
                    offset: range.startOffset
                },
                e: {
                    path: util.getNodePath(range.endContainer, null, null),
                    offset: range.endOffset
                }
            };
        }

        if (stackIndex === 1 && undo) undo.removeAttribute('disabled');

        core._charCount('');
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
         * You can specify the delay time by sending a number.
         * @param {Boolean|Number} delay If true, delays 400 milliseconds
         */
        push: function (delay) {
            _w.setTimeout(core._resourcesStateChange);
            const time = typeof delay === 'number' ? (delay > 0 ? delay : 0) : (!delay ? 0 : 400);
            
            if (!time || pushDelay) {
                _w.clearTimeout(pushDelay);
                if (!time) {
                    pushStack();
                    return;
                }
            }

            pushDelay = _w.setTimeout(function () {
                _w.clearTimeout(pushDelay);
                pushDelay = null;
                pushStack();
            }, time);
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
        },

        /**
         * @description Remove all stacks and remove the timeout function.
         * @private
         */
        _destroy: function () {
            if (pushDelay) _w.clearTimeout(pushDelay);
            stack = null;
        }
    };
});
// CONCATENATED MODULE: ./node_modules/suneditor/src/plugins/modules/_notice.js
/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */


/* harmony default export */ var _notice = ({
    name: 'notice',
    /**
     * @description Constructor
     * @param {Object} core Core object 
     */
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
        notice_button.innerHTML = core.icons.cancel;
        
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

    /**
     * @description Event when clicking the cancel button
     * @param {MouseEvent} e Event object
     */
    onClick_cancel: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.plugins.notice.close.call(this);
    },

    /**
     * @description  Open the notice panel
     * @param {String} text Notice message
     */
    open: function (text)  {
        this.context.notice.message.textContent = text;
        this.context.notice.modal.style.display = 'block';
    },

    /**
     * @description  Open the notice panel
     */
    close: function () {
        this.context.notice.modal.style.display = 'none';
    }
});

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
 * core, event, functions
 * @param {Object} context
 * @param {Object} pluginCallButtons
 * @param {Object} plugins 
 * @param {Object} lang
 * @param {Object} options
 * @param {Object} _icons
 * @returns {Object} functions Object
 */
/* harmony default export */ var lib_core = (function (context, pluginCallButtons, plugins, lang, options, _icons) {
    const _d = context.element.originElement.ownerDocument || document;
    const _w = _d.defaultView || window;
    const util = lib_util;
    const icons = _icons;

    /**
     * @description editor core object
     * should always bind this object when registering an event in the plug-in.
     */
    const core = {
        _d: _d,
        _w: _w,
        _parser: new _w.DOMParser(),

        /**
         * @description Document object of the iframe if created as an iframe || _d
         * @private
         */
        _wd: null,

        /**
         * @description Window object of the iframe if created as an iframe || _w
         * @private
         */
        _ww: null,

        /**
         * @description Util object
         */
        util: util,

        /**
         * @description Functions object
         */
        functions: null,

        /**
         * @description Notice object
         */
        notice: _notice,

        /**
         * @description Default icons object
         */
        icons: icons,

        /**
         * @description History object for undo, redo
         */
        history: null,
        
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
         * @description Whether the plugin is initialized
         */
        initPlugins: {},

        /**
         * @description Object for managing submenu elements
         * @private
         */
        _targetPlugins: {},

        /**
         * @description loaded language
         */
        lang: lang,

        /**
         * @description The selection node (core.getSelectionNode()) to which the effect was last applied
         */
        effectNode: null,

        /**
         * @description submenu element
         */
        submenu: null,

        /**
         * @description container element
         */
        container: null,

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
         * @description binded containerOff method
         * @private
         */
        _bindedContainerOff: null,

        /**
         * @description active button element in submenu
         */
        submenuActiveButton: null,

        /**
         * @description active button element in container
         */
        containerActiveButton: null,

        /**
         * @description The elements array to be processed unvisible when the controllersOff function is executed (resizing, link modified button, table controller)
         */
        controllerArray: [],

        /**
         * @description The name of the plugin that called the currently active controller
         */
        currentControllerName: '',

        /**
         * @description The target element of current controller
         */
        currentControllerTarget: null,

        /**
         * @description An array of buttons whose class name is not "se-code-view-enabled"
         */
        codeViewDisabledButtons: null,

        /**
         * @description An array of buttons whose class name is not "se-resizing-enabled"
         */
        resizingDisabledButtons: null,

        /**
         * @description Tag whitelist RegExp object used in "_consistencyCheckOfHTML" method
         * ^(options._editorTagsWhitelist)$
         * @private
         */
        _htmlCheckWhitelistRegExp: null,

        /**
         * @description Editor tags whitelist (RegExp object)
         * util.createTagsWhitelist(options._editorTagsWhitelist)
         */
        editorTagsWhitelistRegExp: null,

        /**
         * @description Tag whitelist when pasting (RegExp object)
         * util.createTagsWhitelist(options.pasteTagsWhitelist)
         */
        pasteTagsWhitelistRegExp: null,

        /**
         * @description Boolean value of whether the editor has focus
         */
        hasFocus: false,

        /**
         * @description Attributes whitelist used by the cleanHTML method
         * @private
         */
        _attributesWhitelistRegExp: null,

        /**
         * @description Attributes of tags whitelist used by the cleanHTML method
         * @private
         */
        _attributesTagsWhitelist: null,

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
         * @description Is balloon|balloon-always mode?
         * @private
         */
        _isBalloon: null,

        /**
         * @description Is balloon-always mode?
         * @private
         */
        _isBalloonAlways: null,

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
         * @description Variables for controlling focus and blur events
         * @private
         */
        _antiBlur: false,

        /**
         * @description Component line breaker element
         * @private
         */
        _lineBreaker: null,
        _lineBreakerButton: null,

        /**
         * @description If true, (initialize, reset) all indexes of image, video information
         * @private
         */
        _componentsInfoInit: true,
        _componentsInfoReset: false,

        /**
         * @description An user event function before image uploaded
         * @private
         */
        _imageUploadBefore: function (files, info) {
            if (typeof functions.onImageUploadBefore === 'function') return functions.onImageUploadBefore(files, info, this);
            return true;
        },

        /**
         * @description An user event function when image info is changed
         * @private
         */
        _imageUpload: function (targetElement, index, state, imageInfo, remainingFilesCount) {
            if (typeof functions.onImageUpload === 'function') functions.onImageUpload(targetElement, index * 1, state, imageInfo, remainingFilesCount, this);
        },

        /**
         * @description An user event function when image upload failed
         * @private
         */
        _imageUploadError: function (errorMessage, result) {
            if (typeof functions.onImageUploadError === 'function') return functions.onImageUploadError(errorMessage, result, this);
            return true;
        },

        /**
         * @description An user callback function of the image upload
         * @private
         */
        _imageUploadHandler: function (response, info) {
            if (typeof functions.imageUploadHandler === 'function') {
                functions.imageUploadHandler(response, info, this);
                return true;
            } else {
                return false;
            }
        },

        /**
         * @description An user event function when video info is changed
         * @private
         */
        _videoUpload: function (targetElement, index, state, videoInfo, remainingFilesCount) {
            if (typeof functions.onVideoUpload === 'function') functions.onVideoUpload(targetElement, index * 1, state, videoInfo, remainingFilesCount, this);
        },

        /**
         * @description Plugins array with "active" method.
         * "activePlugins" runs the "add" method when creating the editor.
         */
        activePlugins: null,

        /**
         * @description Plugins array with "checkComponentInfo" and "resetComponentInfo" methods.
         * "componentInfoPlugins" runs the "add" method when creating the editor.
         * "checkComponentInfo" method is always call just before the "change" event.
         */
        componentInfoPlugins: null,

        /**
         * @description Elements that need to change text or className for each selection change
         * After creating the editor, "activePlugins" are added.
         * @property {Element} STRONG bold button
         * @property {Element} U underline button
         * @property {Element} EM italic button
         * @property {Element} DEL strike button
         * @property {Element} SUB subscript button
         * @property {Element} SUP superscript button
         * @property {Element} OUTDENT outdent button
         * @property {Element} INDENT indent button
         */
        commandMap: null,

        /**
         * @description Map of default command
         * @private
         */
        _defaultCommand: {
            bold: 'STRONG',
            underline: 'U',
            italic: 'EM',
            strike: 'DEL',
            subscript: 'SUB',
            superscript: 'SUP'
        },

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
            _lineBreakComp: null,
            _lineBreakDir: ''
        },

        /**
         * @description If the plugin is not added, add the plugin and call the 'add' function.
         * If the plugin is added call callBack function.
         * @param {String} pluginName The name of the plugin to call
         * @param {function} callBackFunction Function to be executed immediately after module call
         * @param {Element|null} _target Plugin target button (This is not necessary if you have a button list when creating the editor)
         */
        callPlugin: function (pluginName, callBackFunction, _target) {
            _target = _target || pluginCallButtons[pluginName];

            if (!this.plugins[pluginName]) {
                throw Error('[SUNEDITOR.core.callPlugin.fail] The called plugin does not exist or is in an invalid format. (pluginName:"' + pluginName + '")');
            } else if (!this.initPlugins[pluginName]){
                this.plugins[pluginName].add(this, _target);
                this.initPlugins[pluginName] = true;
            } else if (typeof this._targetPlugins[pluginName] === 'object' && !!_target) {
                this.initMenuTarget(pluginName, _target, this._targetPlugins[pluginName]);
            }

            if (this.plugins[pluginName].active && !this.commandMap[pluginName] && !!_target) {
                this.commandMap[pluginName] = _target;
                this.activePlugins.push(pluginName);
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
         * @description Method for managing submenu element.
         * You must add the "submenu" element using the this method at custom plugin.
         * @param {String} pluginName Plugin name
         * @param {Element|null} target Target button
         * @param {Element} menu Submenu element
         */
        initMenuTarget: function (pluginName, target, menu) {
            if (!target) {
                this._targetPlugins[pluginName] = menu;
            } else {
                target.parentNode.appendChild(menu);
                this._targetPlugins[pluginName] = true;
            }
        },

        /**
         * @description Enabled submenu
         * @param {Element} element Submenu's button element to call
         */
        submenuOn: function (element) {
            if (this._bindedSubmenuOff) this._bindedSubmenuOff();
            if (this._bindControllersOff) this.controllersOff();

            const submenuName = this._submenuName = element.getAttribute('data-command');

            this.submenu = element.nextElementSibling;
            this.submenu.style.top = '-10000px';
            this.submenu.style.visibility = 'hidden';
            this.submenu.style.display = 'block';
            util.addClass(element, 'on');
            this.submenuActiveButton = element;

            const toolbar = this.context.element.toolbar;
            const toolbarW = toolbar.offsetWidth;
            const menuW = this.submenu.offsetWidth;
            const overLeft = toolbarW <= menuW ? 0 : toolbarW - (element.parentElement.offsetLeft + menuW);
            if (overLeft < 0) this.submenu.style.left = overLeft + 'px';
            else this.submenu.style.left = '1px';


            let t = 0;
            let offsetEl = element;
            while (offsetEl && offsetEl !== toolbar) {
                t += offsetEl.offsetTop;
                offsetEl = offsetEl.offsetParent;
            }

            if (this._isBalloon) {
                t += toolbar.offsetTop + element.offsetHeight;
            } else {
                t -= element.offsetHeight;
            }

            const space = t + this.submenu.offsetHeight - context.element.wysiwyg.offsetHeight + 3;
            if (space > 0 && event._getPageBottomSpace() < space) {
                this.submenu.style.top = (-1 * (this.submenu.offsetHeight + 3)) + 'px';
            } else {
                this.submenu.style.top = '';
            }

            this.submenu.style.visibility = '';
            this._bindedSubmenuOff = this.submenuOff.bind(this);
            this.addDocEvent('mousedown', this._bindedSubmenuOff, false);

            if (this.plugins[submenuName].on) this.plugins[submenuName].on.call(this);
            this._antiBlur = true;
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

            this._antiBlur = false;
        },

        /**
         * @description Enabled container
         * @param {Element} element Container's button element to call
         */
        containerOn: function (element) {
            if (this._bindedContainerOff) this._bindedContainerOff();

            const containerName = this._containerName = element.getAttribute('data-command');

            this.container = element.nextElementSibling;
            this.container.style.display = 'block';
            util.addClass(element, 'on');
            this.containerActiveButton = element;

            const toolbarW = this.context.element.toolbar.offsetWidth;
            const menuW = this.container.offsetWidth;
            const overLeft = toolbarW <= menuW ? 0 : toolbarW - (element.parentElement.offsetLeft + menuW);
            if (overLeft < 0) this.container.style.left = overLeft + 'px';
            else this.container.style.left = '1px';

            this._bindedContainerOff = this.containerOff.bind(this);
            this.addDocEvent('mousedown', this._bindedContainerOff, false);

            if (this.plugins[containerName].on) this.plugins[containerName].on.call(this);
            this._antiBlur = true;
        },

        /**
         * @description Disable container
         */
        containerOff: function () {
            this.removeDocEvent('mousedown', this._bindedContainerOff);
            this._bindedContainerOff = null;

            if (this.container) {
                this._containerName = '';
                this.container.style.display = 'none';
                this.container = null;
                util.removeClass(this.containerActiveButton, 'on');
                this.containerActiveButton = null;
                this._notHideToolbar = false;
            }

            this._antiBlur = false;
        },

        /**
         * @description Show controller at editor area (controller elements, function, "controller target element(@Required)", "controller name(@Required)", etc..)
         * @param {*} arguments controller elements, functions..
         */
        controllersOn: function () {
            if (this._bindControllersOff) {
                const tempName = this._resizingName;
                this._bindControllersOff();
                this._resizingName = tempName;
            }

            for (let i = 0, arg; i < arguments.length; i++) {
                arg = arguments[i];
                if (typeof arg === 'string') {
                    this.currentControllerName = arg;
                    continue;
                }
                if (typeof arg === 'function') {
                    this.controllerArray[i] = arg;
                    continue;
                }
                if (!util.hasClass(arg, 'se-controller')) {
                    this.currentControllerTarget = arg;
                    continue;
                }
                if (arg.style) arg.style.display = 'block';
                this.controllerArray[i] = arg;
            }

            this._bindControllersOff = this.controllersOff.bind(this);
            this.addDocEvent('mousedown', this._bindControllersOff, false);
            this.addDocEvent('keydown', this._bindControllersOff, false);
            this._antiBlur = true;

            if (typeof functions.showController === 'function') functions.showController(this.currentControllerName, this.controllerArray, this);
        },

        /**
         * @description Hide controller at editor area (link button, image resize button..)
         * @param {KeyboardEvent|MouseEvent|null} e Event object when called from mousedown and keydown events registered in "core.controllersOn"
         */
        controllersOff: function (e) {
            if (this._resizingName && e && e.type === 'keydown' && e.keyCode !== 27) return;

            this._resizingName = '';
            this.currentControllerName = '';
            this.currentControllerTarget = null;
            this.effectNode = null;
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

            this._antiBlur = false;
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
         * @description Focus to wysiwyg area using "native focus function"
         */
        nativeFocus: function () {
            const caption = util.getParentElement(this.getSelectionNode(), 'figcaption');
            if (caption) {
                caption.focus();
            } else {
                context.element.wysiwyg.focus();
            }

            this._editorRange();
        },

        /**
         * @description Focus to wysiwyg area
         */
        focus: function () {
            if (context.element.wysiwygFrame.style.display === 'none') return;

            if (options.iframe) {
                this.nativeFocus();
            } else {
                try {
                    const range = this.getRange();

                    if (range.startContainer === range.endContainer && util.isWysiwygDiv(range.startContainer)) {
                        const format = util.createElement('P');
                        const br = util.createElement('BR');
                        format.appendChild(br);
                        this.setRange(br, 0, br, 0);
                    } else {
                        this.setRange(range.startContainer, range.startOffset, range.endContainer, range.endOffset);
                    }
                } catch (e) {
                    this.nativeFocus();
                }
            }

            event._applyTagEffects();
            if (core._isBalloon) event._toggleToolbarBalloon();
        },

        /**
         * @description If "focusEl" is a component, then that component is selected; if it is a format element, the last text is selected
         * If "focusEdge" is null, then selected last element
         * @param {Element|null} focusEl Focus element
         */
        focusEdge: function (focusEl) {
            if (!focusEl) focusEl = context.element.wysiwyg.lastElementChild;

            if (util.isComponent(focusEl)) {
                const imageComponent = focusEl.querySelector('IMG');
                const videoComponent = focusEl.querySelector('IFRAME');
    
                if (imageComponent) {
                    this.selectComponent(imageComponent, 'image');
                } else if (videoComponent) {
                    this.selectComponent(videoComponent, 'video');
                }
            } else if (focusEl) {
                focusEl = util.getChildElement(focusEl, function (current) { return current.childNodes.length === 0 || current.nodeType === 3; }, true);
                if (!focusEl) this.nativeFocus();
                else this.setRange(focusEl, focusEl.textContent.length, focusEl, focusEl.textContent.length);
            } else {
                this.nativeFocus();
            }
        },

        /**
         * @description Set current editor's range object
         * @param {Node} startCon The startContainer property of the selection object.
         * @param {Number} startOff The startOffset property of the selection object.
         * @param {Node} endCon The endContainer property of the selection object.
         * @param {Number} endOff The endOffset property of the selection object.
         */
        setRange: function (startCon, startOff, endCon, endOff) {
            if (!startCon || !endCon) return;
            if (startOff > startCon.textContent.length) startOff = startCon.textContent.length;
            if (endOff > endCon.textContent.length) endOff = endCon.textContent.length;
            
            const range = this._wd.createRange();

            try {
                range.setStart(startCon, startOff);
                range.setEnd(endCon, endOff);
            } catch (error) {
                this.nativeFocus();
            }

            const selection = this.getSelection();

            if (selection.removeAllRanges) {
                selection.removeAllRanges();
            }

            selection.addRange(range);
            this._editorRange();
            if (options.iframe) this.nativeFocus();
        },

        /**
         * @description Remove range object and button effect
         */
        removeRange: function () {
            this._variable._range = null;
            this._variable._selectionNode = null;
            this.getSelection().removeAllRanges();

            const commandMap = this.commandMap;
            const activePlugins = this.activePlugins;
            for (let key in commandMap) {
                if (activePlugins.indexOf(key) > -1) {
                    plugins[key].active.call(core, null);
                }
                else if (commandMap.OUTDENT && /^OUTDENT$/i.test(key)) {
                    commandMap.OUTDENT.setAttribute('disabled', true);
                }
                else if (commandMap.INDENT && /^INDENT$/i.test(key)) {
                    commandMap.INDENT.removeAttribute('disabled');
                }
                else {
                    util.removeClass(commandMap[key], 'active');
                }
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
         * @description Reset range object to text node selected status.
         * @private
         */
        _resetRangeToTextNode: function () {
            const range = this.getRange();
            let startCon = range.startContainer;
            let startOff = range.startOffset;
            let endCon = range.endContainer;
            let endOff = range.endOffset;
            let tempCon, tempOffset, tempChild;

            if (util.isFormatElement(startCon)) {
                startCon = startCon.childNodes[startOff];
                startOff = 0;
            }
            if (util.isFormatElement(endCon)) {
                endCon = endCon.childNodes[endOff];
                endOff = 0;
            }

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
    
                    let format = util.getFormatElement(tempCon, null);
                    if (format === util.getRangeFormatElement(format, null)) {
                        format = util.createElement(util.getParentElement(tempCon, util.isCell) ? 'DIV' : 'P');
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
                        if (tempChild.length === 0) break;
                        tempCon = tempChild[tempOffset > 0 ? tempOffset - 1 : tempOffset] || !/FIGURE/i.test(tempChild[0].nodeName) ? tempChild[0] : (tempCon.previousElementSibling || tempCon.previousSibling || startCon);
                        tempOffset = tempOffset > 0 ? tempCon.textContent.length : tempOffset;
                    }
    
                    let format = util.getFormatElement(tempCon, null);
                    if (format === util.getRangeFormatElement(format, null)) {
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
                    if (onlyBreak && !tempCon.previousSibling) {
                        util.removeItem(endCon);
                    }
                }
            }

            // set endContainer
            endCon = tempCon;
            endOff = tempOffset;

            // set Range
            this.setRange(startCon, startOff, endCon, endOff);
        },

        /**
         * @description Returns a "formatElement"(util.isFormatElement) array from the currently selected range.
         * @param {Function|null} validation The validation function. (Replaces the default validation function-util.isFormatElement(current))
         * @returns {Array}
         */
        getSelectedElements: function (validation) {
            this._resetRangeToTextNode();
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

            if (!util.isWysiwygDiv(commonCon) && !util.isRangeFormatElement(commonCon)) lineNodes.unshift(util.getFormatElement(commonCon, null));
            if (startCon === endCon || lineNodes.length === 1) return lineNodes;

            let startLine = util.getFormatElement(startCon, null);
            let endLine = util.getFormatElement(endCon, null);
            let startIdx = null;
            let endIdx = null;
            
            const onlyTable = function (current) {
                return util.isTable(current) ? /^TABLE$/i.test(current.nodeName) : true;
            };

            let startRangeEl = util.getRangeFormatElement(startLine, onlyTable);
            let endRangeEl = util.getRangeFormatElement(endLine, onlyTable);
            if (util.isTable(startRangeEl) && util.isListCell(startRangeEl.parentNode)) startRangeEl = startRangeEl.parentNode;
            if (util.isTable(endRangeEl) && util.isListCell(endRangeEl.parentNode)) endRangeEl = endRangeEl.parentNode;
            
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
         * @param {Boolean} removeDuplicate If true, if there is a parent and child tag among the selected elements, the child tag is excluded.
         * @returns {Array}
         */
        getSelectedElementsAndComponents: function (removeDuplicate) {
            const commonCon = this.getRange().commonAncestorContainer;
            const myComponent = util.getParentElement(commonCon, util.isComponent);
            const selectedLines = util.isTable(commonCon) ? 
                this.getSelectedElements(null) :
                this.getSelectedElements(function (current) {
                    const component = this.getParentElement(current, this.isComponent);
                    return (this.isFormatElement(current) && (!component || component === myComponent)) || (this.isComponent(current) && !this.getFormatElement(current));
                }.bind(util));
            
            if (removeDuplicate) {
                for (let i = 0, len = selectedLines.length; i < len; i++) {
                    for (let j = i - 1; j >= 0; j--) {
                        if (selectedLines[j].contains(selectedLines[i])) {
                            selectedLines.splice(i, 1);
                            i--; len--;
                            break;
                        }
                    }
                }
            }

            return selectedLines;
        },

        /**
         * @description Determine if this offset is the edge offset of container
         * @param {Node} container The node of the selection object. (range.startContainer..)
         * @param {Number} offset The offset of the selection object. (core.getRange().startOffset...)
         * @returns {Boolean}
         */
        isEdgePoint: function (container, offset) {
            return (offset === 0) || (!container.nodeValue && offset === 1) || (offset === container.nodeValue.length);
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
         * @param {String|Element|null} formatNode Node name or node obejct to be inserted
         * @returns {Element}
         */
        appendFormatTag: function (element, formatNode) {
            const currentFormatEl = util.getFormatElement(this.getSelectionNode(), null);
            const oFormatName = formatNode ? (typeof formatNode === 'string' ? formatNode : formatNode.nodeName) : (util.isFormatElement(currentFormatEl) && !util.isFreeFormatElement(currentFormatEl)) ? currentFormatEl.nodeName : 'P';
            const oFormat = util.createElement(oFormatName);
            oFormat.innerHTML = '<br>';

            if ((formatNode && typeof formatNode !== 'string') || (!formatNode && util.isFormatElement(currentFormatEl))) {
                util.copyTagAttributes(oFormat, formatNode || currentFormatEl);
            }

            if (util.isCell(element)) element.insertBefore(oFormat, element.nextElementSibling);
            else element.parentNode.insertBefore(oFormat, element.nextElementSibling);

            return oFormat;
        },

        /**
         * @description The method to insert a element. (used elements : table, hr, image, video)
         * This method is add the element next line and insert the new line.
         * When used in a tag in "LI", it is inserted into the LI tag.
         * Returns the first node of next line added.
         * @param {Element} element Element to be inserted
         * @param {Boolean} notHistoryPush When true, it does not update the history stack and the selection object and return EdgeNodes (util.getEdgeChildNodes)
         * @returns {Element}
         */
        insertComponent: function (element, notHistoryPush) {
            const r = this.removeNode();
            let oNode = null;
            let selectionNode = this.getSelectionNode();
            let formatEl = util.getFormatElement(selectionNode, null);

            if (util.isListCell(formatEl)) {
                if (/^HR$/i.test(element.nodeName)) {
                    const newLi = util.createElement('LI');
                    const textNode = util.createTextNode(util.zeroWidthSpace);
                    newLi.appendChild(element);
                    newLi.appendChild(textNode);
                    formatEl.parentNode.insertBefore(newLi, formatEl.nextElementSibling);
                    this.setRange(textNode, 1, textNode, 1);
                } else {
                    this.insertNode(element, selectionNode === formatEl ? null : r.container.nextSibling);
                    if (!element.nextSibling) element.parentNode.appendChild(util.createElement('BR'));
                    oNode = util.createElement('LI');
                    formatEl.parentNode.insertBefore(oNode, formatEl.nextElementSibling);
                }
            } else {
                if (this.getRange().collapsed && (r.container.nodeType === 3 || util.isBreak(r.container))) {
                    const depthFormat = util.getParentElement(r.container, function (current) { return this.isRangeFormatElement(current); }.bind(util));
                    oNode = util.splitElement(r.container, r.offset, !depthFormat ? 0 : util.getElementDepth(depthFormat) + 1);
                    if (oNode) formatEl = oNode.previousSibling;
                }

                this.insertNode(element, formatEl);
                if (!oNode) oNode = this.appendFormatTag(element, util.isFormatElement(formatEl) ? formatEl : null);
            }

            const edgeNode = util.getEdgeChildNodes(oNode, null).sc;
            oNode = edgeNode || oNode;
            this.setRange(oNode, 0, oNode, 0);

            // history stack
            if (!notHistoryPush) this.history.push(1);

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
                }, null);
            } else if (componentName === 'video') {
                if (!core.plugins.video) return;

                core.removeRange();
                core.callPlugin('video', function () {
                    const size = core.plugins.resizing.call_controller_resize.call(core, element, 'video');
                    core.plugins.video.onModifyMode.call(core, element, size);
                }, null);
            }
        },

        /**
         * @description Delete selected node and insert argument value node
         * If the "afterNode" exists, it is inserted after the "afterNode"
         * Inserting a text node merges with both text nodes on both sides and returns a new "{ startOffset, endOffset }".
         * @param {Node} oNode Element to be inserted
         * @param {Node|null} afterNode If the node exists, it is inserted after the node
         * @returns {undefined|Object}
         */
        insertNode: function (oNode, afterNode) {
            const isComp = util.isFormatElement(oNode) || util.isRangeFormatElement(oNode) || util.isComponent(oNode);

            if (!afterNode && isComp) {
                const r = this.removeNode();
                if (r.container.nodeType === 3 || util.isBreak(r.container)) {
                    const depthFormat = util.getParentElement(r.container, function (current) { return this.isRangeFormatElement(current); }.bind(util));
                    afterNode = util.splitElement(r.container, r.offset, !depthFormat ? 0 : util.getElementDepth(depthFormat) + 1);
                    if (afterNode) afterNode = afterNode.previousSibling;
                }
            }

            const range = this.getRange();
            const startCon = range.startContainer;
            const startOff = range.startOffset;
            const endCon = range.endContainer;
            const endOff = range.endOffset;
            const commonCon = range.commonAncestorContainer;
            let parentNode, originAfter = null;

            if (!afterNode) {
                parentNode = startCon;
                if (startCon.nodeType === 3) {
                    parentNode = startCon.parentNode;
                }

                /** No Select range node */
                if (range.collapsed) {
                    if (commonCon.nodeType === 3) {
                        if (commonCon.textContent.length > endOff) afterNode = commonCon.splitText(endOff);
                        else afterNode = commonCon.nextSibling;
                    } else {
                        if (!util.isBreak(parentNode)) {
                            let c = parentNode.childNodes[startOff];
                            const focusNode = (c && c.nodeType === 3 && util.onlyZeroWidthSpace(c) && util.isBreak(c.nextSibling)) ? c.nextSibling : c;
                            if (focusNode) {
                                if (!focusNode.nextSibling) {
                                    parentNode.removeChild(focusNode);
                                    afterNode = null;
                                } else {
                                    afterNode = (util.isBreak(focusNode) && !util.isBreak(oNode)) ? focusNode : focusNode.nextSibling;
                                }
                            } else {
                                afterNode = null;
                            }
                        } else {
                            afterNode = parentNode;
                            parentNode = parentNode.parentNode;
                        }
                    }
                } else { /** Select range nodes */
                    const isSameContainer = startCon === endCon;

                    if (isSameContainer) {
                        if (this.isEdgePoint(endCon, endOff)) afterNode = endCon.nextSibling;
                        else afterNode = endCon.splitText(endOff);

                        let removeNode = startCon;
                        if (!this.isEdgePoint(startCon, startOff)) removeNode = startCon.splitText(startOff);

                        parentNode.removeChild(removeNode);
                        if (parentNode.childNodes.length === 0 && isComp) {
                            parentNode.innerHTML = '<br>';
                        }
                    }
                    else {
                        const removedTag = this.removeNode();
                        const container = removedTag.container;
                        const prevContainer = removedTag.prevContainer;
                        if (container && container.childNodes.length === 0 && isComp) {
                            if (util.isFormatElement(container)) {
                                container.innerHTML = '<br>';
                            } else if (util.isRangeFormatElement(container)) {
                                container.innerHTML = '<p><br></p>';
                            }
                        }

                        if (!isComp && prevContainer) {
                            parentNode = prevContainer.nodeType === 3 ? prevContainer.parentNode : prevContainer;
                            if (parentNode.contains(container)) {
                                afterNode = container;
                                while (afterNode.parentNode === parentNode) {
                                    afterNode = afterNode.parentNode;
                                }
                            } else {
                                afterNode = null;
                            }
                        } else {
                            parentNode = isComp ? commonCon : container;
                            afterNode = isComp ? endCon : null;
                        }

                        while (afterNode && afterNode.parentNode !== commonCon) {
                            afterNode = afterNode.parentNode;
                        }
                    }
                }
            }
            // has afterNode
            else {
                parentNode = afterNode.parentNode;
                afterNode = afterNode.nextSibling;
                originAfter = true;
            }

            // --- insert node ---
            try {
                if (util.isFormatElement(oNode) || util.isRangeFormatElement(oNode) || (!util.isListCell(parentNode) && util.isComponent(oNode))) {
                    const oldParent = parentNode;
                    if (util.isList(afterNode)) {
                        parentNode = afterNode;
                        afterNode = null;
                    } else if (!originAfter && !afterNode) {
                        const r = this.removeNode();
                        const container = r.container.nodeType === 3 ? (util.isListCell(util.getFormatElement(r.container, null)) ? r.container : (util.getFormatElement(r.container, null) || r.container.parentNode)) : r.container;
                        const rangeCon = util.isWysiwygDiv(container) || util.isRangeFormatElement(container);
                        parentNode = rangeCon ? container : container.parentNode;
                        afterNode = rangeCon ? null : container.nextSibling;
                    }

                    if (oldParent.childNodes.length === 0 && parentNode !== oldParent) util.removeItem(oldParent);
                }

                if (isComp && !util.isRangeFormatElement(parentNode) && !util.isListCell(parentNode) && !util.isWysiwygDiv(parentNode)) {
                    afterNode = parentNode.nextElementSibling;
                    parentNode = parentNode.parentNode;
                }
                parentNode.insertBefore(oNode, afterNode);
            } catch (e) {
                parentNode.appendChild(oNode);
            } finally {
                let offset = 1;
                if (oNode.nodeType === 3) {
                    const previous = oNode.previousSibling;
                    const next = oNode.nextSibling;
                    const previousText = (!previous ||  previous.nodeType !== 3 || util.onlyZeroWidthSpace(previous)) ? '' : previous.textContent;
                    const nextText = (!next || next.nodeType !== 3 || util.onlyZeroWidthSpace(next)) ? '' : next.textContent;
    
                    if (previous && previousText.length > 0) {
                        oNode.textContent = previousText + oNode.textContent;
                        util.removeItem(previous);
                    }
    
                    if (next && next.length > 0) {
                        oNode.textContent += nextText;
                        util.removeItem(next);
                    }

                    return {
                        startOffset: previousText.length,
                        endOffset: oNode.textContent.length - nextText.length
                    };
                } else if (!util.isBreak(oNode) && util.isFormatElement(parentNode)) {
                    let zeroWidth = null;
                    if (!oNode.previousSibling) {
                        zeroWidth = util.createTextNode(util.zeroWidthSpace);
                        oNode.parentNode.insertBefore(zeroWidth, oNode);
                    }
                    if (!oNode.nextSibling) {
                        zeroWidth = util.createTextNode(util.zeroWidthSpace);
                        oNode.parentNode.appendChild(zeroWidth);
                    }

                    if (util._isIgnoreNodeChange(oNode)) {
                        oNode = oNode.nextSibling;
                        offset = 0;
                    }
                }

                this.setRange(oNode, offset, oNode, offset);

                // history stack
                this.history.push(true);
            }
        },

        /**
         * @description Delete the currently selected nodes and reset selection range
         * Returns {container: "the last element after deletion", offset: "offset", prevContainer: "previousElementSibling Of the deleted area"}
         * @returns {Object}
         */
        removeNode: function () {
            const range = this.getRange();
            let container, offset = 0;
            let startCon = range.startContainer;
            let endCon = range.endContainer;
            const startOff = range.startOffset;
            const endOff = range.endOffset;
            const commonCon = range.commonAncestorContainer;

            let beforeNode = null;
            let afterNode = null;

            const childNodes = util.getListChildNodes(commonCon, null);
            let startIndex = util.getArrayIndex(childNodes, startCon);
            let endIndex = util.getArrayIndex(childNodes, endCon);

            if (childNodes.length > 0 && startIndex > -1 && endIndex > -1) {
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
            } else {
                if (childNodes.length === 0) {
                    if (util.isFormatElement(commonCon) || util.isRangeFormatElement(commonCon) || util.isWysiwygDiv(commonCon) || util.isBreak(commonCon) || util.isMedia(commonCon)) {
                        return {
                            container: commonCon,
                            offset: 0
                        };
                    }
                    childNodes.push(commonCon);
                    startCon = endCon = commonCon;
                } else {
                    startCon = endCon = childNodes[0];
                    if (util.isBreak(startCon)) {
                        return {
                            container: startCon,
                            offset: 0
                        };
                    }
                }

                startIndex = endIndex = 0;
            }

            function remove (item) {
                const format = util.getFormatElement(item, null);
                util.removeItem(item);

                if(util.isListCell(format)) {
                    const list = util.getArrayItem(format.children, util.isList, false);
                    if (list) {
                        const child = list.firstElementChild;
                        const children = child.childNodes;
                        while (children[0]) {
                            format.insertBefore(children[0], list);
                        }
                        util.removeItemAllParents(child, null, null);
                    }
                }
            }

            for (let i = startIndex; i <= endIndex; i++) {
                const item = childNodes[i];

                if (item.length === 0 || (item.nodeType === 3 && item.data === undefined)) {
                    remove(item);
                    continue;
                }

                if (item === startCon) {
                    if (startCon.nodeType === 1) {
                        beforeNode = util.createTextNode(startCon.textContent);
                    } else {
                        if (item === endCon) {
                            beforeNode = util.createTextNode(startCon.substringData(0, startOff) + endCon.substringData(endOff, (endCon.length - endOff)));
                            offset = startOff;
                        } else {
                            beforeNode = util.createTextNode(startCon.substringData(0, startOff));
                        }
                    }

                    if (beforeNode.length > 0) {
                        startCon.data = beforeNode.data;
                    } else {
                        remove(startCon);
                    }

                    if (item === endCon) break;
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
                        remove(endCon);
                    }

                    continue;
                }

                remove(item);
            }

            container = endCon && endCon.parentNode ? endCon : startCon && startCon.parentNode ? startCon : (range.endContainer || range.startContainer);
            
            if (!util.isWysiwygDiv(container)) {
                const rc = util.removeItemAllParents(container, null, null);
                if (rc) container = rc.sc || rc.ec || context.element.wysiwyg;
            }

            // set range
            this.setRange(container, offset, container, offset);
            // history stack
            this.history.push(true);

            return {
                container: container,
                offset: offset,
                prevContainer: startCon && startCon.parentNode ? startCon : null
            };
        },

        /**
         * @description Appended all selected format Element to the argument element and insert
         * @param {Element} rangeElement Element of wrap the arguments (BLOCKQUOTE...)
         */
        applyRangeFormatElement: function (rangeElement) {
            const rangeLines = this.getSelectedElementsAndComponents(false);
            if (!rangeLines || rangeLines.length === 0) return;

            linesLoop:
            for (let i = 0, len = rangeLines.length, line, nested, fEl, lEl, f, l; i < len; i++) {
                line = rangeLines[i];
                if (!util.isListCell(line)) continue;

                nested = line.lastElementChild;
                if (nested && util.isListCell(line.nextElementSibling) && rangeLines.indexOf(line.nextElementSibling) > -1) {
                    lEl = nested.lastElementChild;
                    if (rangeLines.indexOf(lEl) > -1) {
                        let list = null;
                        while ((list = lEl.lastElementChild)) {
                            if (util.isList(list)) {
                                if (rangeLines.indexOf(list.lastElementChild) > -1) {
                                    lEl = list.lastElementChild;
                                } else {
                                    continue linesLoop;
                                }
                            }
                        }

                        fEl = nested.firstElementChild;
                        f = rangeLines.indexOf(fEl);
                        l = rangeLines.indexOf(lEl);
                        rangeLines.splice(f, (l - f) + 1);
                        len = rangeLines.length;
                        continue;
                    }
                }
            }

            let last  = rangeLines[rangeLines.length - 1];
            let standTag, beforeTag, pElement;

            if (util.isRangeFormatElement(last) || util.isFormatElement(last)) {
                standTag = last;
            } else {
                standTag = util.getRangeFormatElement(last, null) || util.getFormatElement(last, null);
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
                    if (origin && util.getElementDepth(parent) === util.getElementDepth(origin)) return before;
                    cc = util.removeItemAllParents(origin, null, parent);
                }

                return cc ? cc.ec : before;
            };
            
            for (let i = 0, len = rangeLines.length, line, originParent, depth, before, nextLine, nextList, nested; i < len; i++) {
                line = rangeLines[i];
                originParent = line.parentNode;
                if (!originParent || rangeElement.contains(originParent)) continue;

                depth = util.getElementDepth(line);

                if (util.isList(originParent)) {
                    if (listParent === null) {
                        if (nextList) {
                            listParent = nextList;
                            nested = true;
                            nextList = null;
                        } else {
                            listParent = originParent.cloneNode(false);
                        }
                    }

                    lineArr.push(line);
                    nextLine = rangeLines[i + 1];

                    if (i === len - 1 || (nextLine && nextLine.parentNode !== originParent)) {
                        // nested list
                        if (nextLine && line.contains(nextLine.parentNode)) {
                            nextList = nextLine.parentNode.cloneNode(false);
                        }

                        let list = originParent.parentNode, p;
                        while (util.isList(list)) {
                            p = util.createElement(list.nodeName);
                            p.appendChild(listParent);
                            listParent = p;
                            list = list.parentNode;
                        }

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
                            before = removeItems(pElement, edge.cc, before);
                            if (before !== undefined) beforeTag = before;
                            else beforeTag = edge.cc;
                        }

                        for (let c = 0, cLen = edge.removeArray.length; c < cLen; c++) {
                            listParent.appendChild(edge.removeArray[c]);
                        }

                        if (!nested) rangeElement.appendChild(listParent);
                        if (nextList) edge.removeArray[edge.removeArray.length - 1].appendChild(nextList);
                        listParent = null;
                        nested = false;
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

            this.effectNode = null;
            util.mergeSameTags(rangeElement, null, false);
            util.mergeNestedTags(rangeElement, function (current) { return this.isList(current); }.bind(util));

            // Nested list
            if (beforeTag && util.getElementDepth(beforeTag) > 0 && (util.isList(beforeTag.parentNode) || util.isList(beforeTag.parentNode.parentNode))) {
                const depthFormat = util.getParentElement(beforeTag, function (current) { return this.isRangeFormatElement(current) && !this.isList(current); }.bind(util));
                const splitRange = util.splitElement(beforeTag, null, !depthFormat ? 0 : util.getElementDepth(depthFormat) + 1);
                splitRange.parentNode.insertBefore(rangeElement, splitRange);
            }
            // basic
            else {
                pElement.insertBefore(rangeElement, beforeTag);
                removeItems(rangeElement, beforeTag);
            }

            const edge = util.getEdgeChildNodes(rangeElement.firstElementChild, rangeElement.lastElementChild);
            if (rangeLines.length > 1) {
                this.setRange(edge.sc, 0, edge.ec, edge.ec.textContent.length);
            } else {
                this.setRange(edge.ec, edge.ec.textContent.length, edge.ec, edge.ec.textContent.length);
            }

            // history stack
            this.history.push(false);
        },

        /**
         * @description The elements of the "selectedFormats" array are detached from the "rangeElement" element. ("LI" tags are converted to "P" tags)
         * When "selectedFormats" is null, all elements are detached and return {cc: parentNode, sc: nextSibling, ec: previousSibling, removeArray: [Array of removed elements]}.
         * @param {Element} rangeElement Range format element (PRE, BLOCKQUOTE, OL, UL...)
         * @param {Array|null} selectedFormats Array of format elements (P, DIV, LI...) to remove.
         * If null, Applies to all elements and return {cc: parentNode, sc: nextSibling, ec: previousSibling}
         * @param {Element|null} newRangeElement The node(rangeElement) to replace the currently wrapped node.
         * @param {Boolean} remove If true, deleted without detached.
         * @param {Boolean} notHistoryPush When true, it does not update the history stack and the selection object and return EdgeNodes (util.getEdgeChildNodes)
         * @returns {Object}
         */
        detachRangeFormatElement: function (rangeElement, selectedFormats, newRangeElement, remove, notHistoryPush) {
            const range = this.getRange();
            const so = range.startOffset;
            const eo = range.endOffset;

            let children = util.getListChildNodes(rangeElement, function (current) { return current.parentNode === rangeElement; });
            let parent = rangeElement.parentNode;
            let firstNode = null;
            let lastNode = null;
            let rangeEl = rangeElement.cloneNode(false);
            
            const removeArray = [];
            const newList = util.isList(newRangeElement);
            let insertedNew = false;
            let reset = false;
            let moveComplete = false;

            function appendNode (parent, insNode, sibling, originNode) {
                if (util.onlyZeroWidthSpace(insNode)) insNode.innerHTML = util.zeroWidthSpace;

                if (insNode.nodeType === 3) {
                    parent.insertBefore(insNode, sibling);
                    return insNode;
                }
                
                const insChildren = (moveComplete ? insNode : originNode).childNodes;
                let format = insNode.cloneNode(false);
                let first = null;
                let c = null;

                while (insChildren[0]) {
                    c = insChildren[0];
                    if (util._notTextNode(c) && !util.isBreak(c) && !util.isListCell(format)) {
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
                    if (util.isListCell(parent) && util.isListCell(format) && util.isList(sibling)) {
                        if (newList) {
                            first = sibling;
                            while(sibling) {
                                format.appendChild(sibling);
                                sibling = sibling.nextSibling;
                            }
                            parent.parentNode.insertBefore(format, parent.nextElementSibling);
                        } else {
                            const originNext = originNode.nextElementSibling;
                            const detachRange = util.detachNestedList(originNode, false);
                            if ((rangeElement !== detachRange) || (originNext !== originNode.nextElementSibling)) {
                                rangeElement = detachRange;
                                reset = true;
                            }
                        }
                    } else {
                        parent.insertBefore(format, sibling);
                    }

                    if (!first) first = format;
                }

                return first;
            }

            // detach loop
            for (let i = 0, len = children.length, insNode, lineIndex, next; i < len; i++) {
                insNode = children[i];
                moveComplete = false;
                if (remove && i === 0) {
                    if (!selectedFormats || selectedFormats.length === len || selectedFormats[0] === insNode) {
                        firstNode = rangeElement.previousSibling;
                    } else {
                        firstNode = rangeEl;
                    }
                }

                if (selectedFormats) lineIndex = selectedFormats.indexOf(insNode);
                if (selectedFormats && lineIndex === -1) {
                    if (!rangeEl) rangeEl = rangeElement.cloneNode(false);
                    rangeEl.appendChild(insNode);
                }
                else {
                    if (selectedFormats) next = selectedFormats[lineIndex + 1];
                    if (rangeEl && rangeEl.children.length > 0) {
                        parent.insertBefore(rangeEl, rangeElement);
                        rangeEl = null;
                    }

                    if (!newList && util.isListCell(insNode)) {
                        if (next && util.getElementDepth(insNode) !== util.getElementDepth(next) && (util.isListCell(parent) || util.getArrayItem(insNode.children, util.isList, false))) {
                            const insNext = insNode.nextElementSibling;
                            const detachRange = util.detachNestedList(insNode, false);
                            if ((rangeElement !== detachRange) || insNext !== insNode.nextElementSibling) {
                                rangeElement = detachRange;
                                reset = true;
                            }
                        } else {
                            const inner = insNode;
                            insNode = util.createElement(remove ? inner.nodeName : (util.isList(rangeElement.parentNode) || util.isListCell(rangeElement.parentNode)) ? 'LI' : util.isCell(rangeElement.parentNode) ? 'DIV' : 'P');
                            const isCell = util.isListCell(insNode);
                            const innerChildren = inner.childNodes;
                            while (innerChildren[0]) {
                                if (util.isList(innerChildren[0]) && !isCell) break;
                                insNode.appendChild(innerChildren[0]);
                            }
                            util.copyFormatAttributes(insNode, inner);
                            moveComplete = true;
                        }
                    } else {
                        insNode = insNode.cloneNode(false);
                    }

                    if (!reset) {
                        if (!remove) {
                            if (newRangeElement) {
                                if (!insertedNew) {
                                    parent.insertBefore(newRangeElement, rangeElement);
                                    insertedNew = true;
                                }
                                insNode = appendNode(newRangeElement, insNode, null, children[i]);
                            } else {
                                insNode = appendNode(parent, insNode, rangeElement, children[i]);
                            }
    
                            if (selectedFormats) {
                                lastNode = insNode;
                                if (!firstNode) {
                                    firstNode = insNode;
                                }
                            } else if (!firstNode) {
                                firstNode = lastNode = insNode;
                            }
                        } else {
                            removeArray.push(insNode);
                            util.removeItem(children[i]);
                        }
                    } else {
                        reset = moveComplete = false;
                        children = util.getListChildNodes(rangeElement, function (current) { return current.parentNode === rangeElement; });
                        rangeEl = rangeElement.cloneNode(false);
                        parent = rangeElement.parentNode;
                        i = -1;
                        len = children.length;
                        continue;
                    }
                }
            }

            const rangeParent = rangeElement.parentNode;
            let rangeRight = rangeElement.nextSibling;
            if (rangeEl && rangeEl.children.length > 0) {
                rangeParent.insertBefore(rangeEl, rangeRight);
            }
            
            if (newRangeElement) firstNode = newRangeElement.previousSibling;
            else if (!firstNode) firstNode = rangeElement.previousSibling;
            rangeRight = rangeElement.nextSibling;

            if (rangeElement.children.length === 0 || rangeElement.textContent.length === 0) {
                util.removeItem(rangeElement);
            } else {
                util.removeEmptyNode(rangeElement, null);
            }

            let edge = null;
            if (remove) {
                edge = {
                    cc: rangeParent,
                    sc: firstNode,
                    ec: rangeRight,
                    removeArray: removeArray
                };
            } else {
                if (!firstNode) firstNode = lastNode;
                if (!lastNode) lastNode = firstNode;
                const childEdge = util.getEdgeChildNodes(firstNode, (lastNode.parentNode ? firstNode : lastNode));
                edge = {
                    cc: (childEdge.sc || childEdge.ec).parentNode,
                    sc: childEdge.sc,
                    ec: childEdge.ec
                };
            }

            this.effectNode = null;
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
        },

        /**
         * @description "selectedFormats" array are detached from the list element.
         * The return value is applied when the first and last lines of "selectedFormats" are "LI" respectively.
         * @param {Array} selectedFormats Array of format elements (LI, P...) to remove.
         * @param {Boolean} remove If true, deleted without detached.
         * @returns {Object} {sc: <LI>, ec: <LI>}.
         */
        detachList: function (selectedFormats, remove) {
            let rangeArr = {};
            let listFirst = false;
            let listLast = false;
            let first = null;
            let last = null;
            const passComponent = function (current) { return !this.isComponent(current); }.bind(util);

            for (let i = 0, len = selectedFormats.length, r, o, lastIndex, isList; i < len; i++) {
                lastIndex = i === len - 1;
                o = util.getRangeFormatElement(selectedFormats[i], passComponent);
                isList = util.isList(o);
                if (!r && isList) {
                    r = o;
                    rangeArr = {r: r, f: [util.getParentElement(selectedFormats[i], 'LI')]};
                    if (i === 0) listFirst = true;
                } else if (r && isList) {
                    if (r !== o) {
                        const edge = this.detachRangeFormatElement(rangeArr.f[0].parentNode, rangeArr.f, null, remove, true);
                        o = selectedFormats[i].parentNode;
                        if (listFirst) {
                            first = edge.sc;
                            listFirst = false;
                        }
                        if (lastIndex) last = edge.ec;

                        if (isList) {
                            r = o;
                            rangeArr = {r: r, f: [util.getParentElement(selectedFormats[i], 'LI')]};
                            if (lastIndex) listLast = true;
                        } else {
                            r = null;
                        }
                    } else {
                        rangeArr.f.push(util.getParentElement(selectedFormats[i], 'LI'));
                        if (lastIndex) listLast = true;
                    }
                }

                if (lastIndex && util.isList(r)) {
                    const edge = this.detachRangeFormatElement(rangeArr.f[0].parentNode, rangeArr.f, null, remove, true);
                    if (listLast || len === 1) last = edge.ec;
                    if (listFirst) first = edge.sc || last;
                }
            }

            return {
                sc: first,
                ec: last
            };
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
            let range = this.getRange();
            styleArray = styleArray && styleArray.length > 0 ? styleArray : false;
            removeNodeArray = removeNodeArray && removeNodeArray.length > 0 ? removeNodeArray : false;

            const isRemoveNode = !appendNode;
            const isRemoveFormat = isRemoveNode && !removeNodeArray && !styleArray;
            let startCon = range.startContainer;
            let startOff = range.startOffset;
            let endCon = range.endContainer;
            let endOff = range.endOffset;

            if ((isRemoveFormat && range.collapsed && util.isFormatElement(startCon.parentNode) && util.isFormatElement(endCon.parentNode)) || (startCon === endCon && startCon.nodeType === 1 && startCon.getAttribute('contenteditable') === 'false')) {
                return;
            }

            if (range.collapsed && !isRemoveFormat) {
                if (startCon.nodeType === 1 && !util.isBreak(startCon)) {
                    let afterNode = null;
                    const focusNode = startCon.childNodes[startOff];

                    if (focusNode) {
                        if (!focusNode.nextSibling) {
                            startCon.removeChild(focusNode);
                            afterNode = null;
                        } else {
                            afterNode = util.isBreak(focusNode) ? focusNode : focusNode.nextSibling;
                        }
                    }

                    const zeroWidth = util.createTextNode(util.zeroWidthSpace);
                    startCon.insertBefore(zeroWidth, afterNode);
                    this.setRange(zeroWidth, 1, zeroWidth, 1);

                    range = this.getRange();
                    startCon = range.startContainer;
                    startOff = range.startOffset;
                    endCon = range.endContainer;
                    endOff = range.endOffset;
                }
            }

            if (util.isFormatElement(startCon)) {
                startCon = startCon.childNodes[startOff];
                startOff = 0;
            }
            if (util.isFormatElement(endCon)) {
                endCon = endCon.childNodes[endOff];
                endOff = endCon.textContent.length;
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
            const lineNodes = this.getSelectedElements(null);
            range = this.getRange();
            startCon = range.startContainer;
            startOff = range.startOffset;
            endCon = range.endContainer;
            endOff = range.endOffset;

            if (!util.getFormatElement(startCon, null)) {
                startCon = util.getChildElement(lineNodes[0], function (current) { return current.nodeType === 3; }, false);
                startOff = 0;
            }

            if (!util.getFormatElement(endCon, null)) {
                endCon = util.getChildElement(lineNodes[lineNodes.length - 1], function (current) { return current.nodeType === 3; }, false);
                endOff = endCon.textContent.length;
            }

            
            const oneLine = util.getFormatElement(startCon, null) === util.getFormatElement(endCon, null);
            const endLength = lineNodes.length - (oneLine ? 0 : 1);

            // node Changes
            newNode = appendNode.cloneNode(false);

            const isRemoveAnchor = isRemoveFormat || (isRemoveNode && (function (arr, _isMaintainedNode) {
                for (let n = 0, len = arr.length; n < len; n++) {
                    if (_isMaintainedNode(arr[n])) return true;
                }
                return false;
            })(removeNodeArray, util._isMaintainedNode));

            const _getMaintainedNode = this._util_getMaintainedNode.bind(util, isRemoveAnchor);
            const _isMaintainedNode = this._util_isMaintainedNode.bind(util, isRemoveAnchor);

            // one line
            if (oneLine) {
                const newRange = this._nodeChange_oneLine(lineNodes[0], newNode, validation, startCon, startOff, endCon, endOff, isRemoveFormat, isRemoveNode, range.collapsed, _removeCheck, _getMaintainedNode, _isMaintainedNode);
                start.container = newRange.startContainer;
                start.offset = newRange.startOffset;
                end.container = newRange.endContainer;
                end.offset = newRange.endOffset;
                if (start.container === end.container && util.zeroWidthRegExp.test(start.container.textContent)) {
                    start.offset = end.offset = 1;
                }
            }
            // multi line 
            else {
                // end
                if (endLength > 0) {
                    newNode = appendNode.cloneNode(false);
                    end = this._nodeChange_endLine(lineNodes[endLength], newNode, validation, endCon, endOff, isRemoveFormat, isRemoveNode, _removeCheck, _getMaintainedNode, _isMaintainedNode);
                }

                // mid
                for (let i = endLength - 1; i > 0; i--) {
                    newNode = appendNode.cloneNode(false);
                    this._nodeChange_middleLine(lineNodes[i], newNode, validation, isRemoveFormat, isRemoveNode, _removeCheck);
                }

                // start
                newNode = appendNode.cloneNode(false);
                start = this._nodeChange_startLine(lineNodes[0], newNode, validation, startCon, startOff, isRemoveFormat, isRemoveNode, _removeCheck, _getMaintainedNode, _isMaintainedNode);

                if (endLength <= 0) {
                    end = start;
                } else if (!end.container) {
                    end.container = start.container;
                    end.offset = start.container.textContent.length;
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
         * @param {Node} removeNode The remove node
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
         * @description Return the parent maintained tag. (bind and use a util object)
         * @param {Boolean} isRemove Delete maintained tag
         * @param {Element} element Element
         * @returns {Element}
         * @private
         */
        _util_getMaintainedNode: function (isRemove, element) {
            return element && !isRemove ? this.getParentElement(element, function (current) {return this._isMaintainedNode(current);}.bind(this)) : null;
        },

        /**
         * @description Check if element is a tag that should be persisted. (bind and use a util object)
         * @param {Boolean} isRemove Delete maintained tag
         * @param {Element} element Element
         * @returns {Element}
         * @private
         */
        _util_isMaintainedNode: function (isRemove, element) {
            return element && !isRemove && element.nodeType !== 3 && this._isMaintainedNode(element);
        },

        /**
         * @description wraps text nodes of line selected text.
         * @param {Element} element The node of the line that contains the selected text node.
         * @param {Element} newInnerNode The dom that will wrap the selected text area
         * @param {Function} validation Check if the node should be stripped.
         * @param {Node} startCon The startContainer property of the selection object.
         * @param {Number} startOff The startOffset property of the selection object.
         * @param {Node} endCon The endContainer property of the selection object.
         * @param {Number} endOff The endOffset property of the selection object.
         * @param {Boolean} isRemoveFormat Is the remove all formats command?
         * @param {Boolean} isRemoveNode "newInnerNode" is remove node?
         * @param {Boolean} collapsed range.collapsed
         * @returns {{startContainer: *, startOffset: *, endContainer: *, endOffset: *}}
         * @private
         */
        _nodeChange_oneLine: function (element, newInnerNode, validation, startCon, startOff, endCon, endOff, isRemoveFormat, isRemoveNode, collapsed, _removeCheck, _getMaintainedNode, _isMaintainedNode) {
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
                        anchorNode = _getMaintainedNode(child);
                        const prevNode = util.createTextNode(startContainer.nodeType === 1 ? '' : startContainer.substringData(0, startOffset));
                        const textNode = util.createTextNode(startContainer.nodeType === 1 ? '' : startContainer.substringData(startOffset, 
                                isSameNode ? 
                                (endOffset >= startOffset ? endOffset - startOffset : startContainer.data.length - startOffset) : 
                                startContainer.data.length - startOffset)
                            );

                        if (anchorNode) {
                            const a = _getMaintainedNode(ancestor);
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
                        
                        if (!util.onlyZeroWidthSpace(prevNode)) {
                            ancestor.appendChild(prevNode);
                        }

                        const prevAnchorNode = _getMaintainedNode(ancestor);
                        if (!!prevAnchorNode) anchorNode = prevAnchorNode;
                        if (anchorNode) line = anchorNode;

                        newNode = child;
                        pCurrent = [];
                        cssText = '';
                        while (newNode !== line && newNode !== el && newNode !== null) {
                            vNode = _isMaintainedNode(newNode) ? null : validation(newNode);
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

                        if (anchorNode && !_getMaintainedNode(endContainer)) {
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
                        anchorNode = _getMaintainedNode(child);
                        const afterNode = util.createTextNode(endContainer.nodeType === 1 ? '' : endContainer.substringData(endOffset, (endContainer.length - endOffset)));
                        const textNode = util.createTextNode(isSameNode || endContainer.nodeType === 1 ? '' : endContainer.substringData(0, endOffset));

                        if (anchorNode) {
                            anchorNode = anchorNode.cloneNode(false);
                        } else if (_isMaintainedNode(newInnerNode.parentNode) && !anchorNode) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            pNode.appendChild(newInnerNode);
                            nNodeArray.push(newInnerNode);
                        }

                        if (!util.onlyZeroWidthSpace(afterNode)) {
                            newNode = child;
                            cssText = '';
                            pCurrent = [];
                            const anchors = [];
                            while (newNode !== pNode && newNode !== el && newNode !== null) {
                                if (newNode.nodeType === 1 && checkCss(newNode)) {
                                    if (_isMaintainedNode(newNode)) anchors.push(newNode.cloneNode(false));
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
                            const afterAnchorNode = _getMaintainedNode(cloneNode);
                            if (afterAnchorNode) {
                                anchorNode = afterAnchorNode;
                            }
                        }

                        newNode = child;
                        pCurrent = [];
                        cssText = '';
                        while (newNode !== pNode && newNode !== el && newNode !== null) {
                            vNode = _isMaintainedNode(newNode) ? null : validation(newNode);
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
                            if (util._isIgnoreNodeChange(child)) {
                                pNode.appendChild(child.cloneNode(true));
                                if (!collapsed) {
                                    newInnerNode = newInnerNode.cloneNode(false);
                                    pNode.appendChild(newInnerNode);
                                    nNodeArray.push(newInnerNode);
                                }
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
                                    if (_isMaintainedNode(vNode)) {
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
                        
                        if (_isMaintainedNode(newInnerNode.parentNode) && !_isMaintainedNode(childNode)) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            pNode.appendChild(newInnerNode);
                            nNodeArray.push(newInnerNode);
                        }
                        
                        if (!endPass && !anchorNode && _isMaintainedNode(childNode)) {
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
                            if (_getMaintainedNode(child)) {
                                const ancestorAnchorNode = util.getParentElement(ancestor, function (current) {return this._isMaintainedNode(current.parentNode) || current.parentNode === pNode;}.bind(util));
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
                    let textNode, textNode_s, textNode_e;
                    
                    if (collapsed) {
                        textNode = util.createTextNode(util.zeroWidthSpace);
                        pNode.replaceChild(textNode, removeNode);
                    } else {
                        const rChildren = removeNode.childNodes;
                        textNode_s = rChildren[0];
                        while (rChildren[0]) {
                            textNode_e = rChildren[0];
                            pNode.insertBefore(textNode_e, removeNode);
                        }
                        util.removeItem(removeNode);
                    }

                    if (i === 0) {
                        if (collapsed) {
                            startContainer = endContainer = textNode;
                        } else {
                            startContainer = textNode_s;
                            endContainer = textNode_e;
                        }
                    }
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

            util.removeEmptyNode(pNode, newInnerNode);

            if (collapsed) {
                startOffset = startContainer.textContent.length;
                endOffset = endContainer.textContent.length;
            }

            // endContainer reset
            const endConReset = isRemoveFormat || endContainer.textContent.length === 0;

            if (!util.isBreak(endContainer) && endContainer.textContent.length === 0) {
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
            const newOffsets = util.mergeSameTags(pNode, [startPath, endPath], true);

            element.parentNode.replaceChild(pNode, element);

            startContainer = util.getNodeFromPath(startPath, pNode);
            endContainer = util.getNodeFromPath(endPath, pNode);

            return {
                startContainer: startContainer,
                startOffset: startOffset + newOffsets[0],
                endContainer: endContainer,
                endOffset: endOffset + newOffsets[1]
            };
        },

        /**
         * @description wraps first line selected text.
         * @param {Element} element The node of the line that contains the selected text node.
         * @param {Element} newInnerNode The dom that will wrap the selected text area
         * @param {Function} validation Check if the node should be stripped.
         * @param {Node} startCon The startContainer property of the selection object.
         * @param {Number} startOff The startOffset property of the selection object.
         * @param {Boolean} isRemoveFormat Is the remove all formats command?
         * @param {Boolean} isRemoveNode "newInnerNode" is remove node?
         * @returns {Object} { container, offset }
         * @private
         */
        _nodeChange_startLine: function (element, newInnerNode, validation, startCon, startOff, isRemoveFormat, isRemoveNode, _removeCheck, _getMaintainedNode, _isMaintainedNode) {
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
                            if (util._isIgnoreNodeChange(child)) {
                                newInnerNode = newInnerNode.cloneNode(false);
                                pNode.appendChild(child.cloneNode(true));
                                pNode.appendChild(newInnerNode);
                                nNodeArray.push(newInnerNode);
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
                                if (_isMaintainedNode(vNode)) {
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

                        if (_isMaintainedNode(newInnerNode.parentNode) && !_isMaintainedNode(childNode)) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            pNode.appendChild(newInnerNode);
                            nNodeArray.push(newInnerNode);
                        }
                        
                        if (!anchorNode && _isMaintainedNode(childNode)) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            const aChildren = childNode.childNodes;
                            for (let a = 0, aLen = aChildren.length; a < aLen; a++) {
                                newInnerNode.appendChild(aChildren[a]);
                            }
                            childNode.appendChild(newInnerNode);
                            pNode.appendChild(childNode);
                            ancestor = !_isMaintainedNode(newNode) ? newNode : newInnerNode;
                            nNodeArray.push(newInnerNode);
                        } else if (isTopNode) {
                            newInnerNode.appendChild(childNode);
                            ancestor = newNode;
                        } else {
                            ancestor = newInnerNode;
                        }

                        if (anchorNode && child.nodeType === 3) {
                            if (_getMaintainedNode(child)) {
                                const ancestorAnchorNode = util.getParentElement(ancestor, function (current) {return this._isMaintainedNode(current.parentNode) || current.parentNode === pNode;}.bind(util));
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
                        anchorNode = _getMaintainedNode(child);
                        const prevNode = util.createTextNode(container.nodeType === 1 ? '' : container.substringData(0, offset));
                        const textNode = util.createTextNode(container.nodeType === 1 ? '' : container.substringData(offset, (container.length - offset)));

                        if (anchorNode) {
                            const a = _getMaintainedNode(ancestor);
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

                        if (!util.onlyZeroWidthSpace(prevNode)) {
                            ancestor.appendChild(prevNode);
                        }

                        const prevAnchorNode = _getMaintainedNode(ancestor);
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

                    const rChildren = removeNode.childNodes;
                    const textNode = rChildren[0];
                    while (rChildren[0]) {
                        pNode.insertBefore(rChildren[0], removeNode);
                    }
                    util.removeItem(removeNode);

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
                util.removeEmptyNode(pNode, newInnerNode);

                if (util.onlyZeroWidthSpace(pNode.textContent)) {
                    container = pNode.firstChild;
                    offset = 0;
                }

                // node change
                const offsets = {s: 0, e: 0};
                const path = util.getNodePath(container, pNode, offsets);
                offset += offsets.s;

                // tag merge
                const newOffsets = util.mergeSameTags(pNode, [path], true);

                element.parentNode.replaceChild(pNode, element);

                container = util.getNodeFromPath(path, pNode);
                offset += newOffsets[0];
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
         * @param {Function} validation Check if the node should be stripped.
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
                    } else if (!util.isBreak(child) && util._isIgnoreNodeChange(child)) {
                        continue;
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

                    if (!util.isBreak(child) && util._isIgnoreNodeChange(child)) {
                        if (newInnerNode.childNodes.length > 0) {
                            pNode.appendChild(newInnerNode);
                            newInnerNode = newInnerNode.cloneNode(false);
                        }
                        pNode.appendChild(child.cloneNode(true));
                        pNode.appendChild(newInnerNode);
                        nNodeArray.push(newInnerNode);
                        ancestor = newInnerNode;
                        continue;
                    } else {
                        vNode = validation(child);
                        if (vNode) {
                            noneChange = false;
                            ancestor.appendChild(vNode);
                            if (child.nodeType === 1) coverNode = vNode;
                        }
                    }

                    if (!util.isBreak(child)) recursionFunc(child, coverNode);
                }
            })(element, newInnerNode);

            // not remove tag
            if (noneChange || (isRemoveNode && !isRemoveFormat && !_removeCheck.v)) return;

            pNode.appendChild(newInnerNode);

            if (isRemoveFormat && isRemoveNode) {
                for (let i = 0; i < nNodeArray.length; i++) {
                    let removeNode = nNodeArray[i];
                    
                    const rChildren = removeNode.childNodes;
                    while (rChildren[0]) {
                        pNode.insertBefore(rChildren[0], removeNode);
                    }
                    util.removeItem(removeNode);
                }
            } else if (isRemoveNode) {
                for (let i = 0; i < nNodeArray.length; i++) {
                    this._stripRemoveNode(nNodeArray[i]);
                }
            }

            util.removeEmptyNode(pNode, newInnerNode);
            util.mergeSameTags(pNode, null, true);

            // node change
            element.parentNode.replaceChild(pNode, element);
        },

        /**
         * @description wraps last line selected text.
         * @param {Element} element The node of the line that contains the selected text node.
         * @param {Element} newInnerNode The dom that will wrap the selected text area
         * @param {Function} validation Check if the node should be stripped.
         * @param {Node} endCon The endContainer property of the selection object.
         * @param {Number} endOff The endOffset property of the selection object.
         * @param {Boolean} isRemoveFormat Is the remove all formats command?
         * @param {Boolean} isRemoveNode "newInnerNode" is remove node?
         * @returns {Object} { container, offset }
         * @private
         */
        _nodeChange_endLine: function (element, newInnerNode, validation, endCon, endOff, isRemoveFormat, isRemoveNode, _removeCheck, _getMaintainedNode, _isMaintainedNode) {
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
                            if (util._isIgnoreNodeChange(child)) {
                                newInnerNode = newInnerNode.cloneNode(false);
                                const cloneChild = child.cloneNode(true);
                                pNode.insertBefore(cloneChild, ancestor);
                                pNode.insertBefore(newInnerNode, cloneChild);
                                nNodeArray.push(newInnerNode);
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
                                if (_isMaintainedNode(vNode)) {
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

                        if (_isMaintainedNode(newInnerNode.parentNode) && !_isMaintainedNode(childNode)) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            pNode.insertBefore(newInnerNode, pNode.firstChild);
                            nNodeArray.push(newInnerNode);
                        }

                        if (!anchorNode && _isMaintainedNode(childNode)) {
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
                            if (_getMaintainedNode(child)) {
                                const ancestorAnchorNode = util.getParentElement(ancestor, function (current) {return this._isMaintainedNode(current.parentNode) || current.parentNode === pNode;}.bind(util));
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
                        anchorNode = _getMaintainedNode(child);
                        const afterNode = util.createTextNode(container.nodeType === 1 ? '' : container.substringData(offset, (container.length - offset)));
                        const textNode = util.createTextNode(container.nodeType === 1 ? '' : container.substringData(0, offset));

                        if (anchorNode) {
                            anchorNode = anchorNode.cloneNode(false);
                            const a = _getMaintainedNode(ancestor);
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
                        } else if (_isMaintainedNode(newInnerNode.parentNode) && !anchorNode) {
                            newInnerNode = newInnerNode.cloneNode(false);
                            pNode.appendChild(newInnerNode);
                            nNodeArray.push(newInnerNode);
                        }

                        if (!util.onlyZeroWidthSpace(afterNode)) {
                            ancestor.insertBefore(afterNode, ancestor.firstChild);
                        }

                        newNode = ancestor;
                        pCurrent = [];
                        while (newNode !== pNode && newNode !== null) {
                            vNode = _isMaintainedNode(newNode) ? null : validation(newNode);
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
                    
                    const rChildren = removeNode.childNodes;
                    let textNode = null;
                    while (rChildren[0]) {
                        textNode = rChildren[0];
                        pNode.insertBefore(textNode, removeNode);
                    }
                    util.removeItem(removeNode);

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
                if (!isRemoveNode && newInnerNode.textContent.length === 0) {
                    util.removeEmptyNode(pNode, null);
                    return {
                        container: null,
                        offset: 0
                    };
                }

                util.removeEmptyNode(pNode, newInnerNode);

                if (util.onlyZeroWidthSpace(pNode.textContent)) {
                    container = pNode.firstChild;
                    offset = container.textContent.length;
                } else if (util.onlyZeroWidthSpace(container)) {
                    container = newInnerNode;
                    offset = 1;
                }
                
                // node change
                const offsets = {s: 0, e: 0};
                const path = util.getNodePath(container, pNode, offsets);
                offset += offsets.s;

                // tag merge
                const newOffsets = util.mergeSameTags(pNode, [path], true);

                element.parentNode.replaceChild(pNode, element);

                container = util.getNodeFromPath(path, pNode);
                offset += newOffsets[0];
            }

            return {
                container: container,
                offset: offset
            };
        },

        /**
         * @description Run plugin calls and basic commands.
         * @param {String} command Command string
         * @param {String} display Display type string ('command', 'submenu', 'dialog', 'container')
         * @param {Element} target The element of command button
         */
        actionCall: function (command, display, target) {
            // call plugins
            if (display) {
                if (/submenu/.test(display) && (target.nextElementSibling === null || target !== this.submenuActiveButton)) {
                    this.callPlugin(command, this.submenuOn.bind(this, target), target);
                    return;
                } else if (/dialog/.test(display)) {
                    this.callPlugin(command, this.plugins[command].open.bind(this), target);
                    return;
                } else if (/command/.test(display)) {
                    this.callPlugin(command, this.plugins[command].action.bind(this), target);
                } else if (/container/.test(display) && (target.nextElementSibling === null || target !== this.containerActiveButton)) {
                    this.callPlugin(command, this.containerOn.bind(this, target), target);
                    return;
                }                
            } // default command
            else if (command) {
                this.commandHandler(target, command);
            }

            if (/submenu/.test(display)) {
                this.submenuOff();
            } else {
                this.submenuOff();
                this.containerOff();
            }
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
                    if (!first || !last) return;
                    this.setRange(first, 0, last, last.textContent.length);
                    this.focus();
                    break;
                case 'codeView':
                    util.toggleClass(target, 'active');
                    this.toggleCodeView();
                    break;
                case 'fullScreen':
                    util.toggleClass(target, 'active');
                    this.toggleFullScreen(target);
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
                    util.toggleClass(target, 'active');
                    this.toggleDisplayBlocks();
                    break;
                case 'save':
                    if (typeof options.callBackSave === 'function') {
                        options.callBackSave(this.getContents(false));
                    } else if (typeof functions.save === 'function') {
                        functions.save();
                    } else {
                        throw Error('[SUNEDITOR.core.commandHandler.fail] Please register call back function in creation option. (callBackSave : Function)');
                    }

                    if (context.tool.save) context.tool.save.setAttribute('disabled', true);
                    break;
                default : // 'STRONG', 'U', 'EM', 'DEL', 'SUB', 'SUP'
                    command = this._defaultCommand[command.toLowerCase()] || command;
                    if (!this.commandMap[command]) this.commandMap[command] = target;

                    const btn = util.hasClass(this.commandMap[command], 'active') ? null : util.createElement(command);
                    let removeNode = command;

                    if (/^SUB$/i.test(command) && util.hasClass(this.commandMap.SUP, 'active')) {
                        removeNode = 'SUP';
                    } else if (/^SUP$/i.test(command) && util.hasClass(this.commandMap.SUB, 'active')) {
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
            const range = this.getRange();
            const rangeLines = this.getSelectedElements(null);
            const cells = [];
            const shift = 'indent' !== command;
            let sc = range.startContainer;
            let ec = range.endContainer;
            let so = range.startOffset;
            let eo = range.endOffset;

            for (let i = 0, len = rangeLines.length, f, margin; i < len; i++) {
                f = rangeLines[i];

                if (!util.isListCell(f) || !this.plugins.list) {
                    margin = /\d+/.test(f.style.marginLeft) ? util.getNumber(f.style.marginLeft, 0) : 0;
                    if (shift) {
                        margin -= 25;
                    } else {
                        margin += 25;
                    }
                    util.setStyle(f, 'marginLeft', (margin <= 0 ? '' : margin + 'px'));
                } else {
                    if (shift || f.previousElementSibling) {
                        cells.push(f);
                    }
                }
            }

            // list cells
            if (cells.length > 0) {
                this.plugins.list.editInsideList.call(this, shift, cells);
            }

            this.effectNode = null;
            this.setRange(sc, so, ec, eo);

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
            this.controllersOff();
            util.toggleDisabledButtons(!isCodeView, this.codeViewDisabledButtons);

            if (isCodeView) {
                this._setCodeDataToEditor();
                context.element.wysiwygFrame.scrollTop = 0;
                context.element.code.style.display = 'none';
                context.element.wysiwygFrame.style.display = 'block';

                this._variable._codeOriginCssText = this._variable._codeOriginCssText.replace(/(\s?display(\s+)?:(\s+)?)[a-zA-Z]+(?=;)/, 'display: none');
                this._variable._wysiwygOriginCssText = this._variable._wysiwygOriginCssText.replace(/(\s?display(\s+)?:(\s+)?)[a-zA-Z]+(?=;)/, 'display: block');

                if (options.height === 'auto' && !options.codeMirrorEditor) context.element.code.style.height = '0px';
                
                this._variable.isCodeView = false;
                
                if (!this._variable.isFullScreen) {
                    this._notHideToolbar = false;
                    if (/balloon|balloon-always/i.test(options.mode)) {
                        context.element._arrow.style.display = '';
                        this._isInline = false;
                        this._isBalloon = true;
                        event._hideToolbar();    
                    }
                }

                this.nativeFocus();

                // history stack
                this.history.push(false);
            } else {
                this._setEditorDataToCodeView();
                this._variable._codeOriginCssText = this._variable._codeOriginCssText.replace(/(\s?display(\s+)?:(\s+)?)[a-zA-Z]+(?=;)/, 'display: block');
                this._variable._wysiwygOriginCssText = this._variable._wysiwygOriginCssText.replace(/(\s?display(\s+)?:(\s+)?)[a-zA-Z]+(?=;)/, 'display: none');

                if (options.height === 'auto' && !options.codeMirrorEditor) context.element.code.style.height = context.element.code.scrollHeight > 0 ? (context.element.code.scrollHeight + 'px') : 'auto';
                if (options.codeMirrorEditor) options.codeMirrorEditor.refresh();
                
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

            if (options.fullPage) {
                const parseDocument = this._parser.parseFromString(code_html, 'text/html');
                const headChildren = parseDocument.head.children;

                for (let i = 0, len = headChildren.length; i < len; i++) {
                    if (/script/i.test(headChildren[i].tagName)) {
                        parseDocument.head.removeChild(headChildren[i]);
                        i--, len--;
                    }
                }

                this._wd.head.innerHTML = parseDocument.head.innerHTML;
                this._wd.body.innerHTML = this.convertContentsForEditor(parseDocument.body.innerHTML);

                const attrs = parseDocument.body.attributes;
                for (let i = 0, len = attrs.length; i < len; i++) {
                    if (attrs[i].name === 'contenteditable') continue;
                    this._wd.body.setAttribute(attrs[i].name, attrs[i].value);
                }
                if (!util.hasClass(this._wd.body, 'sun-editor-editable')) util.addClass(this._wd.body, 'sun-editor-editable');
            } else {
                context.element.wysiwyg.innerHTML = code_html.length > 0 ? this.convertContentsForEditor(code_html) : '<p><br></p>';
            }
        },

        /**
         * @description Convert the data of the WYSIWYG area and put it in the code view area.
         * @private
         */
        _setEditorDataToCodeView: function () {
            const codeContents = this.convertHTMLForCodeView(context.element.wysiwyg);
            let codeValue = '';

            if (options.fullPage) {
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
            this.controllersOff();

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

                util.changeElement(element.querySelector('svg'), icons.reduction);

                if (options.iframe && options.height === 'auto') {
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

                if (options.stickyToolbar > -1) {
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
                util.changeElement(element.querySelector('svg'), icons.expansion);
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
            const wDoc = this._wd;

            if (options.iframe) {
                const arrts = options.fullPage ? util.getAttributesToString(wDoc.body, ['contenteditable']) : 'class="sun-editor-editable"';

                printDocument.write('' +
                    '<!DOCTYPE html><html>' +
                    '<head>' +
                    wDoc.head.innerHTML +
                    '<style>' + util.getPageStyle(wDoc) + '</style>' +
                    '</head>' +
                    '<body ' + arrts + '>' + contentsHTML + '</body>' +
                    '</html>'
                );
            } else {
                const contents = util.createElement('DIV');
                const style = util.createElement('STYLE');

                style.innerHTML = util.getPageStyle(wDoc);
                contents.className = 'sun-editor-editable';
                contents.innerHTML = contentsHTML;

                printDocument.head.appendChild(style);
                printDocument.body.appendChild(contents);
            }

            try {
                iframe.focus();
                // IE or Edge
                if (util.isIE_Edge || !!_d.documentMode || !!_w.StyleMedia) {
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
            const wDoc = this._wd;

            if (options.iframe) {
                const arrts = options.fullPage ? util.getAttributesToString(wDoc.body, ['contenteditable']) : 'class="sun-editor-editable"';

                windowObject.document.write('' +
                    '<!DOCTYPE html><html>' +
                    '<head>' +
                    wDoc.head.innerHTML +
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
                    '<style>' + util.getPageStyle(wDoc) + '</style>' +
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
            const convertValue = this.convertContentsForEditor(html);
            this._resetComponents();

            if (!core._variable.isCodeView) {
                context.element.wysiwyg.innerHTML = convertValue;
                // history stack
                core.history.push(false);
            } else {
                const value = this.convertHTMLForCodeView(convertValue);
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

            if (options.fullPage && !onlyContents) {
                const attrs = util.getAttributesToString(this._wd.body, ['contenteditable']);
                return '<!DOCTYPE html><html>' + this._wd.head.outerHTML + '<body ' + attrs + '>' + renderHTML.innerHTML + '</body></html>';
            } else {
                return renderHTML.innerHTML;
            }
        },

        /**
         * @description Returns HTML string according to tag type and configuration.
         * Use only "cleanHTML", "convertContentsForEditor"
         * @param {Node} node Node
         * @param {Boolean} requireFormat If true, text nodes that do not have a format node is wrapped with the format tag.
         * @private
         */
        _makeLine: function (node, requireFormat) {
            // element
            if (node.nodeType === 1) {
                if (util._notAllowedTags(node)) return '';
                if (!requireFormat || (util.isFormatElement(node) || util.isRangeFormatElement(node) || util.isComponent(node) || util.isMedia(node) || (util.isAnchor(node) && util.isMedia(node.firstElementChild)))) {
                    return node.outerHTML;
                } else {
                    return '<p>' + node.outerHTML + '</p>';
                }
            }
            // text
            if (node.nodeType === 3) {
                if (!requireFormat) return node.textContent;
                const textArray = node.textContent.split(/\n/g);
                let html = '';
                for (let i = 0, tLen = textArray.length, text; i < tLen; i++) {
                    text = textArray[i].trim();
                    if (text.length > 0) html += '<p>' + text + '</p>';
                }
                return html;
            }
            // comments
            if (node.nodeType === 8 && this._allowHTMLComments) {
                return '<__comment__>' + node.textContent.trim() + '</__comment__>';
            }

            return '';
        },

        /**
         * @description Gets the clean HTML code for editor
         * @param {String} html HTML string
         * @param {String|RegExp} whitelist Regular expression of allowed tags.
         * RegExp object is create by util.createTagsWhitelist method. (core.pasteTagsWhitelistRegExp)
         * @returns {String}
         */
        cleanHTML: function (html, whitelist) {
            const dom = _d.createRange().createContextualFragment(html);
            try {
                util._consistencyCheckOfHTML(dom, this._htmlCheckWhitelistRegExp);
            } catch (error) {
                console.warn('[SUNEDITOR.cleanHTML.consistencyCheck.fail] ' + error);
            }
            
            const domTree = dom.childNodes;
            let cleanHTML = '';
            let requireFormat = false;

            for (let i = 0, len = domTree.length, t; i < len; i++) {
                t = domTree[i];
                if (t.nodeType === 1 && !util.isTextStyleElement(t) && !util.isBreak(t) && !util._notAllowedTags(t)) {
                    requireFormat = true;
                    break;
                }
            }

            for (let i = 0, len = domTree.length; i < len; i++) {
                cleanHTML += this._makeLine(domTree[i], requireFormat);
            }

            cleanHTML = cleanHTML
                .replace(/\n/g, '')
                .replace(/<(script|style).*>(\n|.)*<\/(script|style)>/g, '')
                .replace(this.editorTagsWhitelistRegExp, '')
                .replace(/<__comment__>/g, '<!-- ')
                .replace(/<\/__comment__>/g, ' -->')
                .replace(/(<[a-zA-Z0-9]+)[^>]*(?=>)/g, function (m, t) {
                    let v = null;
                    const tAttr = this._attributesTagsWhitelist[t.match(/(?!<)[a-zA-Z]+/)[0].toLowerCase()];
                    if (tAttr) v = m.match(tAttr);
                    else v = m.match(this._attributesWhitelistRegExp);

                    if (v) {
                        for (let i = 0, len = v.length; i < len; i++) {
                            if (/^class="(?!(__se__|se-))/.test(v[i])) continue;
                            t += ' ' + v[i];
                        }
                    }

                    return t;
                }.bind(this));
            
            if (!this._attributesTagsWhitelist.span) cleanHTML = cleanHTML.replace(/<\/?(span[^>^<]*)>/g, '');
            cleanHTML = util.htmlRemoveWhiteSpace(cleanHTML);
            
            return util._tagConvertor(!cleanHTML ? html : !whitelist ? cleanHTML : cleanHTML.replace(typeof whitelist === 'string' ? util.createTagsWhitelist(whitelist) : whitelist, ''));
        },

        /**
         * @description Converts contents into a format that can be placed in an editor
         * @param {String} contents contents
         * @returns {String}
         */
        convertContentsForEditor: function (contents) {
            const dom = _d.createRange().createContextualFragment(contents);
            try {
                util._consistencyCheckOfHTML(dom, this._htmlCheckWhitelistRegExp);
            } catch (error) {
                console.warn('[SUNEDITOR.convertContentsForEditor.consistencyCheck.fail] ' + error);
            }
            
            let returnHTML = '';
            const domTree = dom.childNodes;
            for (let i = 0, len = domTree.length; i < len; i++) {
                returnHTML += this._makeLine(domTree[i], true);
            }

            if (returnHTML.length === 0) return '<p><br></p>';

            returnHTML = util.htmlRemoveWhiteSpace(returnHTML);
            returnHTML = returnHTML
                .replace(this.editorTagsWhitelistRegExp, '')
                .replace(/\n/g, '')
                .replace(/<__comment__>/g, '<!-- ')
                .replace(/<\/__comment__>/g, ' -->');

            return util._tagConvertor(returnHTML);
        },

        /**
         * @description Converts wysiwyg area element into a format that can be placed in an editor of code view mode
         * @param {Element|String} html WYSIWYG element (context.element.wysiwyg) or HTML string.
         * @returns {String}
         */
        convertHTMLForCodeView: function (html) {
            let returnHTML = '';
            const reg = _w.RegExp;
            const brReg = new reg('^(BLOCKQUOTE|PRE|TABLE|THEAD|TBODY|TR|TH|TD|OL|UL|IMG|IFRAME|VIDEO|AUDIO|FIGURE|FIGCAPTION|HR|BR|CANVAS|SELECT)$', 'i');
            const isFormatElement = util.isFormatElement.bind(util);
            const wDoc = typeof html === 'string' ? _d.createRange().createContextualFragment(html) : html;

            let indentSize = this._variable.codeIndent * 1;
            indentSize = indentSize > 0 ? new _w.Array(indentSize + 1).join(' ') : '';

            (function recursionFunc (element, indent, lineBR) {
                const children = element.childNodes;
                const elementRegTest = brReg.test(element.nodeName);
                const elementIndent = (elementRegTest ? indent : '');

                for (let i = 0, len = children.length, node, br, nodeRegTest; i < len; i++) {
                    node = children[i];
                    nodeRegTest = brReg.test(node.nodeName);
                    br = nodeRegTest ? '\n' : '';
                    lineBR = isFormatElement(node) && !elementRegTest && !/^(TH|TD)$/i.test(element.nodeName) ? '\n' : '';

                    if (node.nodeType === 8) {
                        returnHTML += '\n<!-- ' + node.textContent.trim() + ' -->' + br;
                        continue;
                    }
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
         * @description Add an event to document.
         * When created as an Iframe, the same event is added to the document in the Iframe.
         * @param {String} type Event type
         * @param {Function} listener Event listener
         * @param {Boolean} useCapture Use event capture
         */
        addDocEvent: function (type, listener, useCapture) {
            _d.addEventListener(type, listener, useCapture);
            if (options.iframe) {
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
            if (options.iframe) {
                this._wd.removeEventListener(type, listener);
            }
        },

        /**
         * @description The current number of characters is counted and displayed.
         * @param {String} inputText Text added.
         * @returns {Boolean}
         * @private
         */
        _charCount: function (inputText) {
            const charCounter = context.element.charCounter;
            const maxCharCount = options.maxCharCount;
            let nextCharCount = 0;
            if (!!inputText) nextCharCount = core._getCharLength(inputText, options.charCounterType);

            if (charCounter) {
                _w.setTimeout(function () { charCounter.textContent = functions.getCharCount(null); });
            }

            if (maxCharCount > 0) {
                let over = false;
                const count = functions.getCharCount(null);
                
                if (count > maxCharCount) {
                    over = true;
                    if (nextCharCount > 0) {
                        this._editorRange();
                        const range = this.getRange();
                        const endOff = range.endOffset - 1;
                        const text = this.getSelectionNode().textContent;
                        const slicePosition = range.endOffset - (count - maxCharCount);
    
                        this.getSelectionNode().textContent = text.slice(0, slicePosition < 0 ? 0 : slicePosition) + text.slice(range.endOffset, text.length);
                        this.setRange(range.endContainer, endOff, range.endContainer, endOff);
                    }
                } else if ((count + nextCharCount) > maxCharCount) {
                    over = true;
                }

                if (over) {
                    const charWrapper = context.element.charWrapper;
                    if (charWrapper && !util.hasClass(charWrapper, 'se-blink')) {
                        util.addClass(charWrapper, 'se-blink');
                        _w.setTimeout(function () {
                            util.removeClass(charWrapper, 'se-blink');
                        }, 600);
                    }

                    if (nextCharCount > 0) return false;
                }
            }

            return true;
        },

        /**
         * @description Method used only in "_charCount".
         * Depending on the option, the length of the character is taken.
         * @param {String} content Content to count
         * @param {String} charCounterType option - charCounterType
         * @returns {Number}
         */
        _getCharLength: function (content, charCounterType) {
            return /byte/.test(charCounterType) ? util.getByteLength(content) : content.length;
        },

        /**
         * @description Check the components such as image and video and modify them according to the format.
         * @private
         */
        _checkComponents: function () {
            for (let i in this.componentInfoPlugins) {
                this.componentInfoPlugins[i].checkComponentInfo.call(this);
            }
        },

        /**
         * @description Initialize the information of the components.
         * @private
         */
        _resetComponents: function () {
            for (let i in this.componentInfoPlugins) {
                this.componentInfoPlugins[i].resetComponentInfo.call(this);
            }
        },

        /**
         * @description Set method in the code view area
         * @param {String} value HTML string
         * @private
         */
        _setCodeView: function (value) {
            if (options.codeMirrorEditor) {
                options.codeMirrorEditor.getDoc().setValue(value);
            } else {
                context.element.code.value = value;
            }
        },

        /**
         * @description Get method in the code view area
         * @private
         */
        _getCodeView: function () {
            return options.codeMirrorEditor ? options.codeMirrorEditor.getDoc().getValue() : context.element.code.value;
        },

        /**
         * @description Initializ core variable
         * @param {Boolean} reload Is relooad?
         * @param {String} _initHTML initial html string when "reload" is true
         * @private
         */
        _init: function (reload, _initHTML) {
            this._ww = options.iframe ? context.element.wysiwygFrame.contentWindow : _w;
            this._wd = _d;
            if (options.iframe && options.height === 'auto') this._iframeAuto = this._wd.body;
            
            this._allowHTMLComments = options._editorTagsWhitelist.indexOf('//') > -1;
            this._htmlCheckWhitelistRegExp = new _w.RegExp('^(' + options._editorTagsWhitelist.replace('|//', '') + ')$', 'i');
            this.editorTagsWhitelistRegExp = util.createTagsWhitelist(options._editorTagsWhitelist.replace('|//', '|__comment__'));
            this.pasteTagsWhitelistRegExp = util.createTagsWhitelist(options.pasteTagsWhitelist);

            const _attr = options.attributesWhitelist;
            const tagsAttr = {};
            let allAttr = '';
            if (!!_attr) {
                for (let k in _attr) {
                    if (k === 'all') {
                        allAttr = _attr[k] + '|';
                    } else {
                        tagsAttr[k] = new _w.RegExp('((?:' + _attr[k] + ')\s*=\s*"[^"]*")', 'ig');
                    }
                }
            }
            
            this._attributesWhitelistRegExp = new _w.RegExp('((?:' + allAttr + 'contenteditable|colspan|rowspan|target|href|src|class|type|data-format|data-size|data-file-size|data-file-name|data-origin|data-align|data-image-link|data-rotate|data-proportion|data-percentage|origin-size)\s*=\s*"[^"]*")', 'ig');
            this._attributesTagsWhitelist = tagsAttr;

            this.codeViewDisabledButtons = context.element.toolbar.querySelectorAll('.se-toolbar button:not([class~="se-code-view-enabled"])');
            this.resizingDisabledButtons = context.element.toolbar.querySelectorAll('.se-toolbar button:not([class~="se-resizing-enabled"])');
            this._isInline = /inline/i.test(options.mode);
            this._isBalloon = /balloon|balloon-always/i.test(options.mode);
            this._isBalloonAlways = /balloon-always/i.test(options.mode);

            this.commandMap = {
                STRONG: context.tool.bold,
                U: context.tool.underline,
                EM: context.tool.italic,
                DEL: context.tool.strike,
                SUB: context.tool.subscript,
                SUP: context.tool.superscript,
                OUTDENT: context.tool.outdent,
                INDENT: context.tool.indent
            };

            // Command plugins registration
            this.activePlugins = [];
            this.componentInfoPlugins = [];
            let c, button;
            for (let key in plugins) {
                c = plugins[key];
                button = pluginCallButtons[key];
                if (c.active && button) {
                    this.callPlugin(key, null, button);
                }
                if (typeof c.checkComponentInfo === 'function' && typeof c.resetComponentInfo === 'function') {
                    this.callPlugin(key, null, button);
                    this.componentInfoPlugins.push(c);
                }
            }

            this._variable._originCssText = context.element.topArea.style.cssText;
            this._placeholder = context.element.placeholder;
            this._lineBreaker = context.element.lineBreaker;
            this._lineBreakerButton = this._lineBreaker.querySelector('button');

            // Excute history function
            this.history = lib_history(this, event._onChange_historyStack);

            // Init, validate
            if (!options.iframe) this._initWysiwygArea(reload, _initHTML);
            _w.setTimeout(function () {
                // after iframe loaded
                if (options.iframe) {
                    this._wd = context.element.wysiwygFrame.contentDocument;
                    context.element.wysiwyg = this._wd.body;
                    this._initWysiwygArea(reload, _initHTML);
                    if (options.height === 'auto') this._iframeAuto = this._wd.body;
                }

                this._checkComponents();
                this._componentsInfoInit = false;
                this._componentsInfoReset = false;
                
                this.history.reset(true);
                this._resourcesStateChange();

                if (typeof functions.onload === 'function') return functions.onload(this, reload);
            }.bind(this));
        },

        /**
         * @description Initializ wysiwyg area (Only called from core._init())
         * @param {Boolean} reload Is relooad?
         * @param {String} _initHTML initial html string when "reload" is true
         * @private
         */
        _initWysiwygArea: function (reload, _initHTML) {
            // Default style
            if (options.defaultStyle) context.element.wysiwyg.style.cssText = options.defaultStyle;

            // Set html
            if (!reload) {
                context.element.wysiwyg.innerHTML = this.convertContentsForEditor(context.element.originElement.value);
            } else if (_initHTML) {
                context.element.wysiwyg.innerHTML = _initHTML;
            }
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
                _w.setTimeout(function () { context.element.wysiwygFrame.style.height = core._iframeAuto.offsetHeight + 'px'; });
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
        },

        /**
         * @description If there is no default format, add a format and move "selection".
         * Alternative code for - execCommand('formatBlock');
         * @param {String|null} formatName Format tag name (default: 'P')
         * @private
         */
        _setDefaultFormat: function (formatName) {
            if (!!this._resizingName) return;

            const range = this.getRange();
            const commonCon = range.commonAncestorContainer;
            const startCon = range.startContainer;
            const rangeEl = util.getRangeFormatElement(commonCon, null);
            let focusNode, offset, format;

            if (util.getParentElement(commonCon, util.isComponent)) return;
            if((util.isRangeFormatElement(startCon) || util.isWysiwygDiv(startCon)) && util.isComponent(startCon.childNodes[range.startOffset])) return;

            if (rangeEl) {
                format = util.createElement(formatName || 'P');
                format.innerHTML = rangeEl.innerHTML;
                if (format.childNodes.length === 0) format.innerHTML = util.zeroWidthSpace;

                rangeEl.innerHTML = format.outerHTML;
                format = rangeEl.firstChild;
                focusNode = util.getEdgeChildNodes(format, null).sc;

                if (!focusNode) {
                    focusNode = util.createTextNode(util.zeroWidthSpace);
                    format.insertBefore(focusNode, format.firstChild);
                }
                
                offset = focusNode.textContent.length;
                this.setRange(focusNode, offset, focusNode, offset);
                return;
            }

            if(util.isRangeFormatElement(commonCon) && (commonCon.childNodes.length <= 1)) {
                let br = null;
                if (commonCon.childNodes.length === 1 && util.isBreak(commonCon.firstChild)) {
                    br = commonCon.firstChild;
                } else {
                    br = util.createTextNode(util.zeroWidthSpace);
                    commonCon.appendChild(br);
                }
                this.setRange(br, 1, br, 1);
            }

            this.execCommand('formatBlock', false, (formatName || 'P'));
            focusNode = util.getEdgeChildNodes(commonCon, commonCon);
            focusNode = focusNode ? focusNode.ec : commonCon;

            format = util.getFormatElement(focusNode, null);
            if (!format) {
                this.removeRange();
                this._editorRange();
                return;
            }
            
            if (util.isBreak(format.nextSibling)) util.removeItem(format.nextSibling);
            if (util.isBreak(format.previousSibling)) util.removeItem(format.previousSibling);
            if (util.isBreak(focusNode)) {
                const zeroWidth = util.createTextNode(util.zeroWidthSpace);
                focusNode.parentNode.insertBefore(zeroWidth, focusNode);
                focusNode = zeroWidth;
            }

            offset = focusNode.nodeType === 3 ? focusNode.textContent.length : 1;
            this.effectNode = null;
            this.setRange(focusNode, offset, focusNode, offset);
        }
    };

    /**
     * @description event function
     */
    const event = {
        _directionKeyCode: new _w.RegExp('^(8|13|3[2-9]|40|46)$'),
        _nonTextKeyCode: new _w.RegExp('^(8|13|1[6-9]|20|27|3[3-9]|40|45|46|11[2-9]|12[0-3]|144|145)$'),
        _historyIgnoreKeyCode: new _w.RegExp('^(1[6-9]|20|27|3[3-9]|40|45|11[2-9]|12[0-3]|144|145)$'),
        _onButtonsCheck: new _w.RegExp('^(STRONG|U|EM|DEL|SUB|SUP)$'),
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
                    command = 'U';
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
            let selectionNode = core.getSelectionNode();
            if (selectionNode === core.effectNode) return;
            core.effectNode = selectionNode;

            const commandMap = core.commandMap;
            const classOnCheck = this._onButtonsCheck;
            const commandMapNodes = [];
            const currentNodes = [];

            const activePlugins = core.activePlugins;
            const cLen = activePlugins.length;
            let nodeName = '';

            while (selectionNode.firstChild) {
                selectionNode = selectionNode.firstChild;
            }

            for (let element = selectionNode; !util.isWysiwygDiv(element); element = element.parentNode) {
                if (!element) break;
                if (element.nodeType !== 1 || util.isBreak(element)) continue;
                nodeName = element.nodeName.toUpperCase();
                currentNodes.push(nodeName);

                /* Active plugins */
                for (let c = 0, name; c < cLen; c++) {
                    name = activePlugins[c];
                    if (commandMapNodes.indexOf(name) === -1 && plugins[name].active.call(core, element)) {
                        commandMapNodes.push(name);
                    }
                }

                if (util.isFormatElement(element)) {
                    /* Outdent */
                    if (commandMapNodes.indexOf('OUTDENT') === -1 && commandMap.OUTDENT) {
                        if (util.isListCell(element) || (element.style.marginLeft && util.getNumber(element.style.marginLeft, 0) > 0)) {
                            commandMapNodes.push('OUTDENT');
                            commandMap.OUTDENT.removeAttribute('disabled');
                        }
                    }

                    /* Indent */
                    if (commandMapNodes.indexOf('INDENT') === -1 && commandMap.INDENT && util.isListCell(element) && !element.previousElementSibling) {
                        commandMapNodes.push('INDENT');
                        commandMap.INDENT.setAttribute('disabled', true);
                    }

                    continue;
                }

                /** default active buttons [strong, ins, em, del, sub, sup] */
                if (classOnCheck.test(nodeName)) {
                    commandMapNodes.push(nodeName);
                    util.addClass(commandMap[nodeName], 'active');
                }
            }

            /** remove class, display text */
            for (let key in commandMap) {
                if (commandMapNodes.indexOf(key) > -1) continue;
                
                if (activePlugins.indexOf(key) > -1) {
                    plugins[key].active.call(core, null);
                }
                else if (commandMap.OUTDENT && /^OUTDENT$/i.test(key)) {
                    commandMap.OUTDENT.setAttribute('disabled', true);
                }
                else if (commandMap.INDENT && /^INDENT$/i.test(key)) {
                    commandMap.INDENT.removeAttribute('disabled');
                }
                else {
                    util.removeClass(commandMap[key], 'active');
                }
            }

            /** save current nodes */
            core._variable.currentNodes = currentNodes.reverse();

            /**  Displays the current node structure to resizingBar */
            if (options.showPathLabel) context.element.navigation.textContent = core._variable.currentNodes.join(' > ');
        },

        _cancelCaptionEdit: function () {
            this.setAttribute('contenteditable', false);
            this.removeEventListener('blur', event._cancelCaptionEdit);
        },

        onMouseDown_toolbar: function (e) {
            let target = e.target;
            if (core._bindControllersOff) e.stopPropagation();

            if (/^(input|textarea|select|option)$/i.test(target.nodeName)) {
                core._antiBlur = false;
            } else {
                e.preventDefault();
            }

            if (util.getParentElement(target, '.se-submenu')) {
                e.stopPropagation();
                core._notHideToolbar = true;
            } else {
                let command = target.getAttribute('data-command');
                let className = target.className;
    
                while (!command && !/se-menu-list/.test(className) && !/se-toolbar/.test(className)) {
                    target = target.parentNode;
                    command = target.getAttribute('data-command');
                    className = target.className;
                }
    
                if (command === core._submenuName || command === core._containerName) {
                    e.stopPropagation();
                }
            }
        },

        onClick_toolbar: function (e) {
            let target = e.target;
            let display = target.getAttribute('data-display');
            let command = target.getAttribute('data-command');
            let className = target.className;

            while (target.parentNode && !command && !/se-menu-list/.test(className) && !/se-toolbar/.test(className)) {
                target = target.parentNode;
                command = target.getAttribute('data-command');
                display = target.getAttribute('data-display');
                className = target.className;
            }

            if (!command && !display) return;
            if (target.disabled) return;
            if (!core.hasFocus) core.nativeFocus();
            if (!core._variable.isCodeView) core._editorRange();

            core.actionCall(command, display, target);
        },

        onMouseDown_wysiwyg: function (e) {
            if (context.element.wysiwyg.getAttribute('contenteditable') === 'false') return;
            
            const tableCell = util.getParentElement(e.target, util.isCell);
            if (tableCell) {
                const tablePlugin = core.plugins.table;
                if (tablePlugin && tableCell !== tablePlugin._fixedCell && !tablePlugin._shift) {
                    core.callPlugin('table', function () {
                        tablePlugin.onTableCellMultiSelect.call(core, tableCell, false);
                    }, null);
                }
            }

            if (core._isBalloon) {
                event._hideToolbar();
            }

            if (functions.onMouseDown) functions.onMouseDown(e, core);
        },

        onClick_wysiwyg: function (e) {
            const targetElement = e.target;
            if (context.element.wysiwyg.getAttribute('contenteditable') === 'false') return;

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

            _w.setTimeout(core._editorRange.bind(core));
            core._editorRange();

            const selectionNode = core.getSelectionNode();
            const formatEl = util.getFormatElement(selectionNode, null);
            const rangeEl = util.getRangeFormatElement(selectionNode, null);
            if ((!formatEl || formatEl === rangeEl) && targetElement.getAttribute('contenteditable') !== 'false') {
                if (util.isList(rangeEl)) {
                    const oLi = util.createElement('LI');
                    const prevLi = selectionNode.nextElementSibling;
                    oLi.appendChild(selectionNode);
                    rangeEl.insertBefore(oLi, prevLi);
                } else if (!util.isWysiwygDiv(selectionNode) && !util.isComponent(selectionNode)) {
                    core._setDefaultFormat(util.isRangeFormatElement(rangeEl) ? 'DIV' : 'P');
                }
                e.preventDefault();
                core.focus();
            } else {
                event._applyTagEffects();
            }

            if (core._isBalloon) _w.setTimeout(event._toggleToolbarBalloon);
            if (functions.onClick) functions.onClick(e, core);
        },

        _balloonDelay: null,
        _showToolbarBalloonDelay: function () {
            if (event._balloonDelay) {
                _w.clearTimeout(event._balloonDelay);
            }

            event._balloonDelay = _w.setTimeout(function () {
                _w.clearTimeout(this._balloonDelay);
                this._balloonDelay = null;
                this._showToolbarBalloon();
            }.bind(event), 350);
        },

        _toggleToolbarBalloon: function () {
            core._editorRange();
            const range = core.getRange();
            if (core.currentControllerName === 'table' || (!core._isBalloonAlways && range.collapsed)) event._hideToolbar();
            else event._showToolbarBalloon(range);
        },

        _showToolbarBalloon: function (rangeObj) {
            if (!core._isBalloon) return;

            const range = rangeObj || core.getRange();
            const toolbar = context.element.toolbar;
            const selection = core.getSelection();

            let isDirTop;
            if (core._isBalloonAlways && range.collapsed) {
                isDirTop = true;
            } else if (selection.focusNode === selection.anchorNode) {
                isDirTop = selection.focusOffset < selection.anchorOffset;
            } else {
                const childNodes = util.getListChildNodes(range.commonAncestorContainer, null);
                isDirTop = util.getArrayIndex(childNodes, selection.focusNode) < util.getArrayIndex(childNodes, selection.anchorNode);
            }

            let rects = range.getClientRects();
            rects = rects[isDirTop ? 0 : rects.length - 1];

            let scrollLeft = 0;
            let scrollTop = 0;
            let el = context.element.topArea;
            while (!!el) {
                scrollLeft += el.scrollLeft;
                scrollTop += el.scrollTop;
                el = el.parentElement;
            }

            const editorWidth = context.element.topArea.offsetWidth;
            const offsets = event._getEditorOffsets();
            const stickyTop = offsets.top;
            const editorLeft = offsets.left;
            
            toolbar.style.top = '-10000px';
            toolbar.style.visibility = 'hidden';
            toolbar.style.display = 'block';

            if (!rects) {
                const node = core.getSelectionNode();
                if (util.isFormatElement(node)) {
                    const zeroWidth = util.createTextNode(util.zeroWidthSpace);
                    core.insertNode(zeroWidth, null);
                    core.setRange(zeroWidth, 1, zeroWidth, 1);
                    core._editorRange();
                    rects = core.getRange().getClientRects();
                    rects = rects[isDirTop ? 0 : rects.length - 1];
                }

                if (!rects) {
                    const nodeOffset = util.getOffset(node, context.element.wysiwygFrame);
                    rects = {
                        left: nodeOffset.left,
                        top: nodeOffset.top,
                        right: nodeOffset.left,
                        bottom: nodeOffset.top + node.offsetHeight,
                        noText: true
                    };
                    scrollLeft = 0;
                    scrollTop = 0;
                }

                isDirTop = true;
            }

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
            const toolbarHeight = rects.noText && !isDirTop ? 0 : toolbar.offsetHeight;

            const absoluteLeft = (isDirTop ? rects.left : rects.right) - editorLeft - (toolbarWidth / 2) + scrollLeft;
            const overRight = absoluteLeft + toolbarWidth - editorWidth;
            
            let t = (isDirTop ? rects.top - toolbarHeight - arrowMargin : rects.bottom + arrowMargin) - (rects.noText ? 0 : stickyTop) + scrollTop;
            let l = absoluteLeft < 0 ? padding : overRight < 0 ? absoluteLeft : absoluteLeft - overRight - padding - 1;

            let resetTop = false;
            const space = t + (isDirTop ? (event._getEditorOffsets().top) : (toolbar.offsetHeight - context.element.wysiwyg.offsetHeight));
            if (!isDirTop && space > 0 && event._getPageBottomSpace() < space) {
                isDirTop = true;
                resetTop = true;
            } else if (isDirTop && _d.documentElement.offsetTop > space) {
                isDirTop = false;
                resetTop = true;
            }

            if (resetTop) t = (isDirTop ? rects.top - toolbarHeight - arrowMargin : rects.bottom + arrowMargin) - (rects.noText ? 0 : stickyTop) + scrollTop;

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
            core._inlineToolbarAttr.width = toolbar.style.width = options.toolbarWidth;
            core._inlineToolbarAttr.top = toolbar.style.top = (-1 - toolbar.offsetHeight) + 'px';
            
            if (typeof functions.showInline === 'function') functions.showInline(toolbar, context, core);

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

        onInput_wysiwyg: function (e) {
            core._editorRange();

            const data = (e.data === null ? '' : e.data === undefined ? ' ' : e.data) || '';       
            if (!core._charCount(data)) {
                e.preventDefault();
                e.stopPropagation();
            }

            // history stack
            core.history.push(true);

            if (functions.onInput) functions.onInput(e, core);
        },

        _onShortcutKey: false,
        onKeyDown_wysiwyg: function (e) {
            const keyCode = e.keyCode;
            const shift = e.shiftKey;
            const ctrl = e.ctrlKey || e.metaKey || keyCode === 91 || keyCode === 92;
            const alt = e.altKey;

            core.submenuOff();

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
            let selectionNode = core.getSelectionNode();
            const range = core.getRange();
            const selectRange = !range.collapsed || range.startContainer !== range.endContainer;
            const resizingName = core._resizingName;
            let formatEl = util.getFormatElement(selectionNode, null) || selectionNode;
            let rangeEl = util.getRangeFormatElement(formatEl, null);

            switch (keyCode) {
                case 8: /** backspace key */
                    if (!selectRange) {
                        if (resizingName) {
                            e.preventDefault();
                            e.stopPropagation();
                            core.plugins[resizingName].destroy.call(core);
                            break;
                        }
                    }

                    if (!util.isFormatElement(formatEl) && !context.element.wysiwyg.firstElementChild && !util.isComponent(selectionNode)) {
                        e.preventDefault();
                        e.stopPropagation();
                        core._setDefaultFormat('P');
                        return false;
                    }

                    if (!selectRange && !formatEl.previousElementSibling && (util.isWysiwygDiv(formatEl.parentNode) && (util.isFormatElement(formatEl) && !util.isFreeFormatElement(formatEl)) && !util.isListCell(formatEl) &&
                     (formatEl.childNodes.length <= 1 && (!formatEl.firstChild || util.onlyZeroWidthSpace(formatEl.textContent))))) {
                        e.preventDefault();
                        e.stopPropagation();
                        formatEl.innerHTML = '<br>';
                        const attrs = formatEl.attributes;
                        while (attrs[0]) {
                            formatEl.removeAttribute(attrs[0].name);
                        }
                        core.nativeFocus();
                        return false;
                    }

                    // clean remove tag
                    if (formatEl && range.startContainer === range.endContainer && selectionNode.nodeType === 3 && !util.isFormatElement(selectionNode.parentNode)) {
                        if (range.collapsed ? selectionNode.textContent.length === 1 : (range.endOffset - range.startOffset) === selectionNode.textContent.length) {
                            e.preventDefault();

                            let offset = null;
                            let prev = selectionNode.parentNode.previousSibling;
                            const next = selectionNode.parentNode.nextSibling;
                            if (!prev) {
                                if (!next) {
                                    prev = util.createElement('BR');
                                    formatEl.appendChild(prev);
                                } else {
                                    prev = next;
                                    offset = 0;
                                }
                            }

                            selectionNode.textContent = '';
                            util.removeItemAllParents(selectionNode, null, formatEl);
                            offset = typeof offset === 'number' ? offset : prev.nodeType === 3 ? prev.textContent.length : 1;
                            core.setRange(prev, offset, prev, offset);
                            break;
                        }
                    }

                    // nested list
                    const commonCon = range.commonAncestorContainer;
                    formatEl = util.getFormatElement(range.startContainer, null);
                    rangeEl = util.getRangeFormatElement(formatEl, null);
                    if (rangeEl && formatEl && !util.isCell(rangeEl) && !/^FIGCAPTION$/i.test(rangeEl.nodeName)) {
                        if (util.isListCell(formatEl) && util.isList(rangeEl) && (util.isListCell(rangeEl.parentNode) || formatEl.previousElementSibling) && (selectionNode === formatEl || (selectionNode.nodeType === 3 && (!selectionNode.previousSibling || util.isList(selectionNode.previousSibling)))) &&
                         (util.getFormatElement(range.startContainer, null) !== util.getFormatElement(range.endContainer, null) ? rangeEl.contains(range.startContainer) : (range.startOffset === 0  && range.collapsed))) {
                            if (range.startContainer !== range.endContainer) {
                                e.preventDefault();

                                core.removeNode();
                                if (range.startContainer.nodeType === 3) {
                                    core.setRange(range.startContainer, range.startContainer.textContent.length, range.startContainer, range.startContainer.textContent.length);
                                }
                                // history stack
                                core.history.push(true);
                            } else {
                                let prev = formatEl.previousElementSibling || rangeEl.parentNode;
                                if (util.isListCell(prev)) {
                                    e.preventDefault();

                                    let prevLast = prev;
                                    if (!prev.contains(formatEl) && util.isListCell(prevLast) && util.isList(prevLast.lastElementChild)) {
                                        prevLast = prevLast.lastElementChild.lastElementChild;
                                        while (util.isListCell(prevLast) && util.isList(prevLast.lastElementChild)) {
                                            prevLast = prevLast.lastElementChild && prevLast.lastElementChild.lastElementChild;
                                        }
                                        prev = prevLast;
                                    }

                                    let con = prev === rangeEl.parentNode ? rangeEl.previousSibling : prev.lastChild;
                                    if (!con) {
                                        con = util.createTextNode(util.zeroWidthSpace);
                                        rangeEl.parentNode.insertBefore(con, rangeEl.parentNode.firstChild);
                                    }
                                    const offset = con.nodeType === 3 ? con.textContent.length : 1;
                                    const children = formatEl.childNodes;
                                    let after = con;
                                    let child = children[0];
                                    while ((child = children[0])) {
                                        prev.insertBefore(child, after.nextSibling);
                                        after = child;
                                    }

                                    util.removeItem(formatEl);
                                    if (rangeEl.children.length === 0) util.removeItem(rangeEl);

                                    core.setRange(con, offset, con, offset);
                                    // history stack
                                    core.history.push(true);
                                }
                            }
                            
                            break;
                        }

                        // detach range
                        if (!selectRange && range.startOffset === 0) {
                            let detach = true;
                            let comm = commonCon;
                            while (comm && comm !== rangeEl && !util.isWysiwygDiv(comm)) {
                                if (comm.previousSibling) {
                                    if (comm.previousSibling.nodeType === 1 || !util.onlyZeroWidthSpace(comm.previousSibling.textContent.trim())) {
                                        detach = false;
                                        break;
                                    }
                                }
                                comm = comm.parentNode;
                            }
    
                            if (detach && rangeEl.parentNode) {
                                e.preventDefault();
                                core.detachRangeFormatElement(rangeEl, (util.isListCell(formatEl) ? [formatEl] : null), null, false, false);
                                // history stack
                                core.history.push(true);
                                break;
                            }
                        }
                    }

                    // component
                    if (!selectRange && range.startOffset === 0) {
                        if (util.isComponent(commonCon.previousSibling) || (commonCon.nodeType === 3 && !commonCon.previousSibling && range.startOffset === 0 && range.endOffset === 0 && util.isComponent(formatEl.previousSibling))) {
                            let previousEl = formatEl.previousSibling;
                            if (util.hasClass(previousEl, 'se-image-container') || /^IMG$/i.test(previousEl.nodeName)) {
                                previousEl = /^IMG$/i.test(previousEl.nodeName) ? previousEl : previousEl.querySelector('img');
                                core.selectComponent(previousEl, 'image');
                                if(formatEl.textContent.length === 0) util.removeItem(formatEl);
                            } else if (util.hasClass(previousEl, 'se-video-container')) {
                                core.selectComponent(previousEl.querySelector('iframe'), 'video');
                                if(formatEl.textContent.length === 0) util.removeItem(formatEl);
                            }
                            break;
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

                    // component
                    if ((util.isFormatElement(selectionNode) || selectionNode.nextSibling === null) && range.startOffset === selectionNode.textContent.length) {
                        let nextEl = formatEl.nextElementSibling;
                        if (!nextEl) {
                            e.preventDefault();
                            break;
                        }

                        if (util.isComponent(nextEl)) {
                            e.preventDefault();

                            if (util.onlyZeroWidthSpace(formatEl)) {
                                util.removeItem(formatEl);
                                // table component
                                if (util.isTable(nextEl)) {
                                    let cell = util.getChildElement(nextEl, util.isCell, false);
                                    cell = cell.firstElementChild || cell;
                                    core.setRange(cell, 0, cell, 0);
                                    break;
                                }
                            }

                            // resizing component
                            if (util.hasClass(nextEl, 'se-component') || /^(IMG|IFRAME)$/i.test(nextEl.nodeName)) {
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

                    // nested list
                    formatEl = util.getFormatElement(range.startContainer, null);
                    rangeEl = util.getRangeFormatElement(formatEl, null);
                    if (util.isListCell(formatEl) && util.isList(rangeEl) && (selectionNode === formatEl || (selectionNode.nodeType === 3 && (!selectionNode.nextSibling || util.isList(selectionNode.nextSibling)) &&
                     (util.getFormatElement(range.startContainer, null) !== util.getFormatElement(range.endContainer, null) ? rangeEl.contains(range.endContainer) : (range.endOffset === selectionNode.textContent.length && range.collapsed))))) {
                        if (range.startContainer !== range.endContainer) core.removeNode();
                        
                        let next = util.getArrayItem(formatEl.children, util.isList, false);
                        next = next || formatEl.nextElementSibling || rangeEl.parentNode.nextElementSibling;
                        if (next && (util.isList(next) || util.getArrayItem(next.children, util.isList, false))) {
                            e.preventDefault();

                            let con, children;
                            if (util.isList(next)) {
                                const child = next.firstElementChild;
                                children = child.childNodes;
                                con = children[0];
                                while (children[0]) {
                                    formatEl.insertBefore(children[0], next);
                                }
                                util.removeItem(child);
                            } else {
                                con = next.firstChild;
                                children = next.childNodes;
                                while (children[0]) {
                                    formatEl.appendChild(children[0]);
                                }
                                util.removeItem(next);
                            }
                            core.setRange(con, 0, con, 0);
                            // history stack
                            core.history.push(true);
                        }
                        break;
                    }

                    break;
                case 9: /** tab key */
                    if (resizingName) break;
                    e.preventDefault();
                    if (ctrl || alt || util.isWysiwygDiv(selectionNode)) break;

                    const isEdge = (!range.collapsed || core.isEdgePoint(range.startContainer, range.startOffset));            
                    const selectedFormats = core.getSelectedElements(null);
                    selectionNode = core.getSelectionNode();
                    const cells = [];
                    let lines = [];
                    let fc = util.isListCell(selectedFormats[0]), lc = util.isListCell(selectedFormats[selectedFormats.length - 1]);
                    let r = {sc: range.startContainer, so: range.startOffset, ec: range.endContainer, eo: range.endOffset};
                    for (let i = 0, len = selectedFormats.length, f; i < len; i++) {
                        f = selectedFormats[i];
                        if (util.isListCell(f)) {
                            if (!f.previousElementSibling && !shift) {
                                continue;
                            } else {
                                cells.push(f);
                            }
                        } else {
                            lines.push(f);
                        }
                    }
                    
                    // Nested list
                    if (cells.length > 0 && isEdge && core.plugins.list) {
                        r = core.plugins.list.editInsideList.call(core, shift, cells);
                    } else {
                        // table
                        const tableCell = util.getParentElement(selectionNode, util.isCell);
                        if (tableCell && isEdge) {
                            const table = util.getParentElement(tableCell, 'table');
                            const cells = util.getListChildren(table, util.isCell);
                            let idx = shift ? util.prevIdx(cells, tableCell) : util.nextIdx(cells, tableCell);

                            if (idx === cells.length && !shift) idx = 0;
                            if (idx === -1 && shift) idx = cells.length - 1;

                            let moveCell = cells[idx];
                            if (!moveCell) break;
                            moveCell = moveCell.firstElementChild || moveCell;
                            core.setRange(moveCell, 0, moveCell, 0);
                            break;
                        }

                        lines = lines.concat(cells);
                        fc = lc = null;
                    }

                    // Lines tab(4)
                    if (lines.length > 0) {
                        if (!shift) {
                            const tabText = util.createTextNode(new _w.Array(core._variable.tabSize + 1).join('\u00A0'));
                            if (lines.length === 1) {
                                const textRange = core.insertNode(tabText, null);
                                if (!fc) {
                                    r.sc = tabText;
                                    r.so = textRange.endOffset;
                                }
                                if (!lc) {
                                    r.ec = tabText;
                                    r.eo = textRange.endOffset;
                                }
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
                                if (!fc && firstChild) {
                                    r.sc = firstChild;
                                    r.so = 0;
                                }
                                if (!lc && endChild) {
                                    r.ec = endChild;
                                    r.eo = endChild.textContent.length;
                                }
                            }
                        } else {
                            const len = lines.length - 1;
                            for (let i = 0, line; i <= len; i++) {
                                line = lines[i].childNodes;
                                for (let c = 0, cLen = line.length, child; c < cLen; c++) {
                                    child = line[c];
                                    if (!child) break;
                                    if (util.onlyZeroWidthSpace(child)) continue;
        
                                    if (/^\s{1,4}$/.test(child.textContent)) {
                                        util.removeItem(child);
                                    } else if (/^\s{1,4}/.test(child.textContent)) {
                                        child.textContent = child.textContent.replace(/^\s{1,4}/, '');
                                    }
                                    
                                    break;
                                }
                            }
    
                            const firstChild = util.getChildElement(lines[0], 'text', false);
                            const endChild = util.getChildElement(lines[len], 'text', true);
                            if (!fc && firstChild) {
                                r.sc = firstChild;
                                r.so = 0;
                            }
                            if (!lc && endChild) {
                                r.ec = endChild;
                                r.eo = endChild.textContent.length;
                            }
                        }
                    }

                    core.setRange(r.sc, r.so, r.ec, r.eo);
                    // history stack
                    core.history.push(false);
                    
                    break;
                case 13: /** enter key */
                    const freeFormatEl = util.getFreeFormatElement(selectionNode, null);
                    if (!shift && freeFormatEl) {
                        e.preventDefault();
                        const selectionFormat = selectionNode === freeFormatEl;
                        const wSelection = core.getSelection();
                        const children = selectionNode.childNodes, offset = wSelection.focusOffset, prev = selectionNode.previousElementSibling, next = selectionNode.nextSibling;

                        if (!!children && ((selectionFormat && range.collapsed && children.length - 1 <= offset + 1 && util.isBreak(children[offset]) && (!children[offset + 1] || ((!children[offset + 2] || util.onlyZeroWidthSpace(children[offset + 2].textContent)) && children[offset + 1].nodeType === 3 && util.onlyZeroWidthSpace(children[offset + 1].textContent))) &&  offset > 0 && util.isBreak(children[offset - 1])) ||
                          (!selectionFormat && util.onlyZeroWidthSpace(selectionNode.textContent) && util.isBreak(prev) && (util.isBreak(prev.previousSibling) || !util.onlyZeroWidthSpace(prev.previousSibling.textContent)) && (!next || (!util.isBreak(next) && util.onlyZeroWidthSpace(next.textContent)))))) {
                            if (selectionFormat) util.removeItem(children[offset - 1]);
                            else util.removeItem(selectionNode);
                            const newEl = core.appendFormatTag(freeFormatEl, util.isFormatElement(freeFormatEl.nextElementSibling) ? freeFormatEl.nextElementSibling : null);
                            util.copyFormatAttributes(newEl, freeFormatEl);
                            core.setRange(newEl, 1, newEl, 1);
                            break;
                        }
                        
                        if (selectionFormat) {
                            functions.insertHTML(((range.collapsed && util.isBreak(range.startContainer.childNodes[range.startOffset - 1])) ? '<br>' : '<br><br>'), true);

                            let focusNode = wSelection.focusNode;
                            const wOffset = wSelection.focusOffset;
                            if (freeFormatEl === focusNode) {
                                focusNode = focusNode.childNodes[wOffset - offset > 1 ? wOffset - 1 : wOffset];
                            }

                            core.setRange(focusNode, 1, focusNode, 1);
                        } else {
                            const focusNext = wSelection.focusNode.nextSibling;
                            const br = util.createElement('BR');
                            core.insertNode(br, null);

                            const brPrev = br.previousSibling, brNext = br.nextSibling;
                            if (!util.isBreak(focusNext) && !util.isBreak(brPrev) && (!brNext || util.onlyZeroWidthSpace(brNext))) {
                                br.parentNode.insertBefore(br.cloneNode(false), br);
                                core.setRange(br, 1, br, 1);
                            } else {
                                core.setRange(brNext, 0, brNext, 0);
                            }
                        }

                        event._onShortcutKey = true;
                        break;
                    }

                    if (selectRange) break;
                    
                    if (rangeEl && formatEl && !util.isCell(rangeEl) && !/^FIGCAPTION$/i.test(rangeEl.nodeName)) {
                        const range = core.getRange();
                        if ((range.commonAncestorContainer.nodeType === 3 ? !range.commonAncestorContainer.nextElementSibling : true) && util.onlyZeroWidthSpace(formatEl.innerText.trim())) {
                            e.preventDefault();
                            let newEl = null;

                            if (util.isListCell(rangeEl.parentNode)) {
                                rangeEl = formatEl.parentNode.parentNode.parentNode;
                                const splitRange = util.splitElement(formatEl, null, util.getElementDepth(formatEl) - 2);
                                newEl = util.createElement('LI');
                                rangeEl.insertBefore(newEl, splitRange);
                            } else {
                                const newFormat = util.isCell(rangeEl.parentNode) ? 'DIV' : util.isList(rangeEl.parentNode) ? 'LI' : util.isFormatElement(rangeEl.nextElementSibling) ? rangeEl.nextElementSibling.nodeName : util.isFormatElement(rangeEl.previousElementSibling) ? rangeEl.previousElementSibling.nodeName : 'P';
                                newEl = util.createElement(newFormat);
                                const edge = core.detachRangeFormatElement(rangeEl, [formatEl], null, true, true);
                                edge.cc.insertBefore(newEl, edge.ec);
                            }
                            
                            newEl.innerHTML = '<br>';
                            util.copyFormatAttributes(newEl, formatEl);
                            util.removeItemAllParents(formatEl, null, null);
                            core.setRange(newEl, 1, newEl, 1);
                            break;
                        }
                    }

                    if (rangeEl && util.getParentElement(rangeEl, 'FIGCAPTION') && util.getParentElement(rangeEl, util.isList)) {
                        e.preventDefault();
                        formatEl = core.appendFormatTag(formatEl, null);
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
                        }, null);
                    }
                    
                    break;
                case 27:
                    if (resizingName) {
                        e.preventDefault();
                        e.stopPropagation();
                        core.controllersOff();
                        return false;
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
            if (textKey && range.collapsed && range.startContainer === range.endContainer && util.isBreak(range.commonAncestorContainer)) {
                const zeroWidth = util.createTextNode(util.zeroWidthSpace);
                core.insertNode(zeroWidth, null);
                core.setRange(zeroWidth, 1, zeroWidth, 1);
            }

            if (functions.onKeyDown) functions.onKeyDown(e, core);
        },

        onKeyUp_wysiwyg: function (e) {
            if (event._onShortcutKey) return;
            core._editorRange();

            const range = core.getRange();
            const keyCode = e.keyCode;
            const ctrl = e.ctrlKey || e.metaKey || keyCode === 91 || keyCode === 92;
            const alt = e.altKey;
            let selectionNode = core.getSelectionNode();

            if (core._isBalloon && ((core._isBalloonAlways && keyCode !== 27) || !range.collapsed)) {
                if (core._isBalloonAlways) {
                    if (keyCode !== 27) event._showToolbarBalloonDelay();
                } else {
                    event._showToolbarBalloon();
                    return;
                }
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

                core.history.push(false);
                return;
            }

            const formatEl = util.getFormatElement(selectionNode, null);
            const rangeEl = util.getRangeFormatElement(selectionNode, null);
            if (((!formatEl && range.collapsed) || formatEl === rangeEl) && !util.isComponent(selectionNode)) {
                core._setDefaultFormat(util.isRangeFormatElement(rangeEl) ? 'DIV' : 'P');
                selectionNode = core.getSelectionNode();
            }

            if (event._directionKeyCode.test(keyCode)) {
                event._applyTagEffects();
            }

            const textKey = !ctrl && !alt && !event._nonTextKeyCode.test(keyCode);
            if (textKey && selectionNode.nodeType === 3 && util.zeroWidthRegExp.test(selectionNode.textContent) && util.getByteLength(e.key) < 3) {
                let so = range.startOffset, eo = range.endOffset;
                const frontZeroWidthCnt = (selectionNode.textContent.substring(0, eo).match(event._frontZeroWidthReg) || '').length;
                so = range.startOffset - frontZeroWidthCnt;
                eo = range.endOffset - frontZeroWidthCnt;
                selectionNode.textContent = selectionNode.textContent.replace(util.zeroWidthRegExp, '');
                core.setRange(selectionNode, so < 0 ? 0 : so, selectionNode, eo < 0 ? 0 : eo);
            }

            core._charCount('');

            // history stack
            core.history.push(true);

            if (functions.onKeyUp) functions.onKeyUp(e, core);
        },

        onScroll_wysiwyg: function (e) {
            core.controllersOff();
            core._lineBreaker.style.display = 'none';
            if (core._isBalloon) event._hideToolbar();
            if (functions.onScroll) functions.onScroll(e, core);
        },

        onFocus_wysiwyg: function (e) {
            if (core._antiBlur) return;
            core.hasFocus = true;
            if (core._isInline) event._showToolbarInline();
            if (functions.onFocus) functions.onFocus(e, core);
        },

        onBlur_wysiwyg: function (e) {
            if (core._antiBlur) return;
            core.hasFocus = false;
            core.controllersOff();
            if (core._isInline || core._isBalloon) event._hideToolbar();
            if (functions.onBlur) functions.onBlur(e, core);
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
            if (core._variable.isFullScreen || context.element.toolbar.offsetWidth === 0 || options.stickyToolbar < 0) return;

            const element = context.element;
            const editorHeight = element.editorArea.offsetHeight;
            const y = (this.scrollY || _d.documentElement.scrollTop) + options.stickyToolbar;
            const editorTop = event._getEditorOffsets().top - (core._isInline ? element.toolbar.offsetHeight : 0);
            
            if (y < editorTop) {
                event._offStickyToolbar();
            }
            else if (y + core._variable.minResizingSize >= editorHeight + editorTop) {
                if (!core._sticky) event._onStickyToolbar();
                element.toolbar.style.top = (editorHeight + editorTop + options.stickyToolbar -y - core._variable.minResizingSize) + 'px';
            }
            else if (y >= editorTop) {
                event._onStickyToolbar();
            }
        },

        _getEditorOffsets: function () {
            let offsetEl = context.element.topArea;
            let t = 0, l = 0, s = 0;

            while (offsetEl) {
                t += offsetEl.offsetTop;
                l += offsetEl.offsetLeft;
                s += offsetEl.scrollTop;
                offsetEl = offsetEl.offsetParent;
            }

            return {
                top: t,
                left: l,
                scroll: s
            };
        },

        _getPageBottomSpace: function () {
            return _d.documentElement.scrollHeight - (event._getEditorOffsets().top + context.element.topArea.offsetHeight);
        },

        _onStickyToolbar: function () {
            const element = context.element;

            if (!core._isInline) {
                element._stickyDummy.style.height = element.toolbar.offsetHeight + 'px';
                element._stickyDummy.style.display = 'block';
            }

            element.toolbar.style.top = options.stickyToolbar + 'px';
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

            const plainText = clipboardData.getData('text/plain').replace(/\n/g, '');
            const cleanData = core.cleanHTML(clipboardData.getData('text/html'), core.pasteTagsWhitelistRegExp);
            const maxCharCount = core._charCount(options.charCounterType === 'byte-html' ? cleanData : plainText);

            if (typeof functions.onPaste === 'function' && !functions.onPaste(e, cleanData, maxCharCount, core)) {
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
                functions.insertHTML(cleanData, true);
            } else {
                // history stack
                core.history.push(true);
            }
        },

        onCut_wysiwyg: function () {
            _w.setTimeout(function () {
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
                }, null);
            // check char count
            } else if (!core._charCount(dataTransfer.getData('text/plain'))) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            // html paste
            } else {
                const cleanData = core.cleanHTML(dataTransfer.getData('text/html'), core.pasteTagsWhitelistRegExp);
                if (cleanData) {
                    event._setDropLocationSelection(e);
                    functions.insertHTML(cleanData, true);
                }
            }

            if (functions.onDrop) functions.onDrop(e, core);
        },

        onmouseMove_wysiwyg: function (e) {
            const component = util.getParentElement(e.target, util.isComponent);
            const lineBreakerStyle = core._lineBreaker.style;

            if (component) {
                let scrollTop = 0;
                let el = context.element.wysiwyg;
                do {
                    scrollTop += el.scrollTop;
                    el = el.parentElement;
                } while (el && !/^(BODY|HTML)$/i.test(el.nodeName));

                const wScroll = context.element.wysiwyg.scrollTop;
                const offsets = event._getEditorOffsets();
                const componentTop = util.getOffset(component, context.element.wysiwygFrame).top + wScroll;
                const y = e.pageY + scrollTop + (options.iframe ? context.element.toolbar.offsetHeight : 0);
                const c = componentTop + (options.iframe ? scrollTop : offsets.top);

                let dir = '', top = '';
                if (!util.isFormatElement(component.previousElementSibling) && y < (c + 20)) {
                    top = componentTop;
                    dir = 't';
                } else if (!util.isFormatElement(component.nextElementSibling) && y > (c + component.offsetHeight - 20)) {
                    top = componentTop + component.offsetHeight;
                    dir = 'b';
                } else {
                    lineBreakerStyle.display = 'none';
                    return;
                }

                core._variable._lineBreakComp = component;
                core._variable._lineBreakDir = dir;
                lineBreakerStyle.top = (top - wScroll) + 'px';
                lineBreakerStyle.visibility = 'hidden';
                lineBreakerStyle.display = 'block';
                core._lineBreakerButton.style.left = (component.offsetLeft + (component.offsetWidth / 2) - (core._lineBreakerButton.offsetWidth / 2)) + 'px';
                lineBreakerStyle.visibility = '';
            } // off line breaker
            else if (lineBreakerStyle.display !== 'none') {
                lineBreakerStyle.display = 'none';
            }
        },

        _onMouseDown_lineBreak: function (e) {
            e.preventDefault();
        },

        _onLineBreak: function () {
            const component = core._variable._lineBreakComp;

            const format = util.createElement('P');
            format.innerHTML = '<br>';
            component.parentNode.insertBefore(format, core._variable._lineBreakDir === 't' ? component : component.nextSibling);

            core._lineBreaker.style.display = 'none';
            core._variable._lineBreakComp = null;

            core.setRange(format.firstChild, 1, format.firstChild, 1);
            // history stack
            core.history.push(false);
        },

        _setDropLocationSelection: function (e) {
            e.stopPropagation();
            e.preventDefault();
            
            const range = core.getRange();
            core.setRange(range.startContainer, range.startOffset, range.endContainer, range.endOffset);
        },

        _onChange_historyStack: function () {
            event._applyTagEffects();
            if (context.tool.save) context.tool.save.removeAttribute('disabled');
            if (functions.onChange) functions.onChange(core.getContents(true), core);
        },

        _addEvent: function () {
            const eventWysiwyg = options.iframe ? core._ww : context.element.wysiwyg;

            /** toolbar event */
            context.element.toolbar.addEventListener('mousedown', event.onMouseDown_toolbar, false);
            context.element.toolbar.addEventListener('click', event.onClick_toolbar, false);
            /** editor area */
            eventWysiwyg.addEventListener('mousedown', event.onMouseDown_wysiwyg, false);
            eventWysiwyg.addEventListener('click', event.onClick_wysiwyg, false);
            eventWysiwyg.addEventListener(util.isIE ? 'textinput' : 'input', event.onInput_wysiwyg, false);
            eventWysiwyg.addEventListener('keydown', event.onKeyDown_wysiwyg, false);
            eventWysiwyg.addEventListener('keyup', event.onKeyUp_wysiwyg, false);
            eventWysiwyg.addEventListener('paste', event.onPaste_wysiwyg, false);
            eventWysiwyg.addEventListener('cut', event.onCut_wysiwyg, false);
            eventWysiwyg.addEventListener('dragover', event.onDragOver_wysiwyg, false);
            eventWysiwyg.addEventListener('drop', event.onDrop_wysiwyg, false);
            eventWysiwyg.addEventListener('scroll', event.onScroll_wysiwyg, false);
            eventWysiwyg.addEventListener('focus', event.onFocus_wysiwyg, false);
            eventWysiwyg.addEventListener('blur', event.onBlur_wysiwyg, false);

            /** line breaker */
            eventWysiwyg.addEventListener('mousemove', event.onmouseMove_wysiwyg, false);
            core._lineBreakerButton.addEventListener('mousedown', event._onMouseDown_lineBreak, false);
            core._lineBreakerButton.addEventListener('click', event._onLineBreak, false);

            /** Events are registered only when there is a table plugin.  */
            if (core.plugins.table) {
                eventWysiwyg.addEventListener('touchstart', event.onMouseDown_wysiwyg, {passive: true, useCapture: false});
            }
            
            /** code view area auto line */
            if (options.height === 'auto' && !options.codeMirrorEditor) {
                context.element.code.addEventListener('keydown', event._codeViewAutoHeight, false);
                context.element.code.addEventListener('keyup', event._codeViewAutoHeight, false);
                context.element.code.addEventListener('paste', event._codeViewAutoHeight, false);
            }

            /** resizingBar */
            if (context.element.resizingBar) {
                if (/\d+/.test(options.height)) {
                    context.element.resizingBar.addEventListener('mousedown', event.onMouseDown_resizingBar, false);
                } else {
                    util.addClass(context.element.resizingBar, 'se-resizing-none');
                }
            }
            
            /** window event */
            _w.removeEventListener('resize', event.onResize_window);
            _w.removeEventListener('scroll', event.onScroll_window);

            _w.addEventListener('resize', event.onResize_window, false);
            if (options.stickyToolbar > -1) {
                _w.addEventListener('scroll', event.onScroll_window, false);
            }
        },

        _removeEvent: function () {
            const eventWysiwyg = options.iframe ? core._ww : context.element.wysiwyg;

            context.element.toolbar.removeEventListener('mousedown', event.onMouseDown_toolbar);
            context.element.toolbar.removeEventListener('click', event.onClick_toolbar);

            eventWysiwyg.removeEventListener('mousedown', event.onMouseDown_wysiwyg);
            eventWysiwyg.removeEventListener('click', event.onClick_wysiwyg);
            eventWysiwyg.removeEventListener(util.isIE ? 'textinput' : 'input', event.onInput_wysiwyg);
            eventWysiwyg.removeEventListener('keydown', event.onKeyDown_wysiwyg);
            eventWysiwyg.removeEventListener('keyup', event.onKeyUp_wysiwyg);
            eventWysiwyg.removeEventListener('paste', event.onPaste_wysiwyg);
            eventWysiwyg.removeEventListener('cut', event.onCut_wysiwyg);
            eventWysiwyg.removeEventListener('dragover', event.onDragOver_wysiwyg);
            eventWysiwyg.removeEventListener('drop', event.onDrop_wysiwyg);
            eventWysiwyg.removeEventListener('scroll', event.onScroll_wysiwyg);

            eventWysiwyg.removeEventListener('mousemove', event.onmouseMove_wysiwyg);
            core._lineBreakerButton.removeEventListener('mousedown', event._onMouseDown_lineBreak);
            core._lineBreakerButton.removeEventListener('click', event._onLineBreak);
            
            eventWysiwyg.removeEventListener('touchstart', event.onMouseDown_wysiwyg, {passive: true, useCapture: false});
            
            eventWysiwyg.removeEventListener('focus', event.onFocus_wysiwyg);
            eventWysiwyg.removeEventListener('blur', event.onBlur_wysiwyg);

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

    /** functions */
    const functions = {
        /**
         * @description Core, Util object
         */
        core: core,
        util: util,

        /**
         * @description Event functions
         * @param {Object} e Event Object
         * @param {Object} core Core object
         */
        onload: null,
        onScroll: null,
        onMouseDown: null,
        onClick: null,
        onInput: null,
        onKeyDown: null,
        onKeyUp: null,
        onDrop: null,
        onChange: null,
        onPaste: null,
        onFocus: null,
        onBlur: null,

        /**
         * @description Called just before the inline toolbar is positioned and displayed on the screen.
         * @param {Element} toolbar Toolbar Element
         * @param {Object} context The editor's context object (editor.getContext())
         * @param {Object} core Core object
         */
        showInline: null,

        /**
         * @description Called just after the controller is positioned and displayed on the screen.
         * controller - editing elements displayed on the screen [image resizing, table editor, link editor..]]
         * @param {String} name The name of the plugin that called the controller
         * @param {Array} controllers Array of Controller elements
         * @param {Object} core Core object
         */
        showController: null,

        /**
         * @description It replaces the default callback function of the image upload
         * @param {Object} response Response object
         * @param {Object} info Input information
         * - linkValue: Link url value
         * - linkNewWindow: Open in new window Check Value
         * - inputWidth: Value of width input
         * - inputHeight: Value of height input
         * - align: Align Check Value
         * - isUpdate: Update image if true, create image if false
         * - currentImage: If isUpdate is true, the currently selected image.
         * @param {Object} core Core object
         */
        imageUploadHandler: null,

        /**
         * @description Called before the image is uploaded
         * If false is returned, no image upload is performed.
         * @param {Array} files Files array
         * @param {Object} info Input information
         * @param {Object} core Core object
         * @returns {Boolean}
         */
        onImageUploadBefore: null,

        /**
         * @description Called when the image is uploaded, updated, deleted
         * @param {Element} targetElement Current img element
         * @param {Number} index Uploaded index
         * @param {String} state Upload status ('create', 'update', 'delete')
         * @param {Object} imageInfo Image info object
         * - index: data index
         * - name: file name
         * - size: file size
         * - select: select function
         * - delete: delete function
         * - element: img element
         * - src: src attribute of img tag
         * @param {Number} remainingFilesCount Count of remaining files to upload (0 when added as a url)
         * @param {Object} core Core object
         */
        onImageUpload: null,

        /**
         * @description Called when the image is upload failed
         * @param {String} errorMessage Error message
         * @param {Object} result Result info Object
         * @param {Object} core Core object
         * @returns {Boolean}
         */
        onImageUploadError: null,

        /**
         * @description Called when the video(iframe) is is uploaded, updated, deleted
         * @param {Element} targetElement Current iframe element
         * @param {Number} index Uploaded index
         * @param {String} state Upload status ('create', 'update', 'delete')
         * @param {Object} videoInfo Video info object
         * - index: data index
         * - select: select function
         * - delete: delete function
         * - element: iframe element
         * - src: src attribute of iframe tag
         * @param {Number} remainingFilesCount Count of remaining files to upload (0 when added as a url)
         * @param {Object} core Core object
         */
        onVideoUpload: null,

        /**
         * @description Add or reset option property
         * @param {Object} options Options
         */
        setOptions: function (_options) {
            event._removeEvent();

            core.plugins = _options.plugins || core.plugins;
            const mergeOptions = [_options, _options].reduce(function (init, option) {
                for (let key in option) {
                    if (key === 'plugins' && option[key] && init[key]) {
                        let i = init[key], o = option[key];
                        i = i.length ? i : _w.Object.keys(i).map(function(name) { return i[name]; });
                        o = o.length ? o : _w.Object.keys(o).map(function(name) { return o[name]; });
                        init[key] = (o.filter(function(val) { return i.indexOf(val) === -1; })).concat(i);
                    } else {
                        init[key] = option[key];
                    }
                }
                return init;
            }, {});

            const cons = lib_constructor._setOptions(mergeOptions, context, core.plugins, _options);

            if (cons.callButtons) {
                pluginCallButtons = cons.callButtons;
                core.initPlugins = {};
            }

            if (cons.plugins) {
                core.plugins = plugins = cons.plugins;
            }

            // reset context
            const _initHTML = context.element.wysiwyg.innerHTML;
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
                _charWrapper: el.charWrapper,
                _loading: el.loading,
                _lineBreaker: el.lineBreaker,
                _resizeBack: el.resizeBackground,
                _stickyDummy: el._stickyDummy,
                _arrow: el._arrow
            };
            
            options = mergeOptions;
            core.lang = lang = options.lang;
            core.context = context = lib_context(context.element.originElement, constructed, options);

            core._componentsInfoReset = true;
            core._init(true, _initHTML);
            event._addEvent();
            core._charCount('');

            event._offStickyToolbar();
            event.onResize_window();
        },

        /**
         * @description Set "options.defaultStyle" style.
         * Define the style of the edit area
         * It can also be defined with the "setOptions" method, but the "setDefaultStyle" method does not render the editor again.
         * @param {String} style Style string
         */
        setDefaultStyle: function (style) {
            const optionStyle = util._setDefaultOptionStyle(options);

            if (typeof style === 'string' && style.trim().length > 0) {
                context.element.wysiwyg.style.cssText = optionStyle + style;
            } else {
                context.element.wysiwyg.style.cssText = optionStyle;
            }
        },

        /**
         * @description Open a notice area
         * @param {String} message Notice message
         */
        noticeOpen: function (message) {
            core.notice.open.call(core, message);
        },

        /**
         * @description Close a notice area
         */
        noticeClose: function () {
            core.notice.close.call(core);
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
         * @description Get the editor's number of characters or binary data size.
         * You can use the "charCounterType" option format.
         * @param {String|null} charCounterType options - charCounterType ('char', 'byte', 'byte-html')
         * If argument is no value, the currently set "charCounterType" option is used.
         * @returns {Number}
         */
        getCharCount: function (charCounterType) {
            charCounterType = typeof charCounterType === 'string' ? charCounterType : options.charCounterType;
            return core._getCharLength((charCounterType === 'byte-html' ? context.element.wysiwyg.innerHTML : context.element.wysiwyg.textContent), charCounterType);
        },

        /**
         * @description Gets uploaded images informations
         * - index: data index
         * - name: file name
         * - size: file size
         * - select: select function
         * - delete: delete function
         * - element: img element
         * - src: src attribute of img tag
         * @returns {Array}
         */
        getImagesInfo: function () {
            return context.image ? context.image._imagesInfo : [];
        },

        /**
         * @description Gets uploaded videos informations
         * - index: data index
         * - select: select function
         * - delete: delete function
         * - element: iframe element
         * - src: src attribute of iframe tag
         * @returns {Array}
         */
        getVideosInfo: function () {
            return context.video ? context.video._videosInfo : [];
        },

        /**
         * @description Upload images using image plugin
         * @param {FileList} files FileList
         */
        insertImage: function (files) {
            if (!core.plugins.image || !files) return;

            if (!core.initPlugins.image) core.callPlugin('image', core.plugins.image.submitAction.bind(core, files), null);
            else core.plugins.image.submitAction.call(core, files);
            core.focus();
        },

        /**
         * @description Inserts an HTML element or HTML string or plain string at the current cursor position
         * @param {Element|String} html HTML Element or HTML string or plain string
         * @param {Boolean} notCleaningData If true, inserts the HTML string without refining it with core.cleanHTML.
         */
        insertHTML: function (html, notCleaningData) {
            if (typeof html === 'string') {
                if (!notCleaningData) html = core.cleanHTML(html, null);
                try {
                    const dom = _d.createRange().createContextualFragment(html);
                    const domTree = dom.childNodes;
                    let c, a, t;
                    while ((c = domTree[0])) {
                        t = core.insertNode(c, a);
                        a = c;
                    }
                    const offset = a.nodeType === 3 ? (t.endOffset || a.textContent.length): a.childNodes.length;
                    core.setRange(a, offset, a, offset);
                } catch (error) {
                    core.execCommand('insertHTML', false, html);
                }
            } else {
                if (util.isComponent(html)) {
                    core.insertComponent(html, false);
                } else {
                    let afterNode = null;
                    if (util.isFormatElement(html) || util.isMedia(html)) {
                        afterNode = util.getFormatElement(core.getSelectionNode(), null);	
                    }
                    core.insertNode(html, afterNode);
                }
            }
            
            core.effectNode = null;
            core.focus();

            // history stack
            core.history.push(false);
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
            const convertValue = core.convertContentsForEditor(contents);
            
            if (!core._variable.isCodeView) {
                const temp = util.createElement('DIV');
                temp.innerHTML = convertValue;

                const wysiwyg = context.element.wysiwyg;
                const children = temp.children;
                for (let i = 0, len = children.length; i < len; i++) {
                    wysiwyg.appendChild(children[i]);
                }
            } else {
                core._setCodeView(core._getCodeView() + '\n' + core.convertHTMLForCodeView(convertValue));
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

            if (options.codeMirrorEditor) {
                options.codeMirrorEditor.setOption('readOnly', true);
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

            if (options.codeMirrorEditor) {
                options.codeMirrorEditor.setOption('readOnly', false);
            } else {
                context.element.code.removeAttribute('disabled');
            }
        },

        /**
         * @description Show the suneditor
         */
        show: function () {
            const topAreaStyle = context.element.topArea.style;
            if (topAreaStyle.display === 'none') topAreaStyle.display = options.display;
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
            /** remove history */
            core.history._destroy();

            /** remove event listeners */
            event._removeEvent();
            
            /** remove element */
            util.removeItem(context.element.topArea);

            /** remove object reference */
            for (var k in core) { delete core[k]; }
            for (var k in event) { delete event[k]; }
            for (var k in context) { delete context[k]; }
            for (var k in pluginCallButtons) { delete pluginCallButtons[k]; }
            
            /** remove user object */
            for (var k in this) { delete this[k]; }
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
    core._init(false, null);
    event._addEvent();
    core._charCount('');

    // functionss
    core.functions = functions;

    // register notice module
    core.addModule([_notice]);

    return functions;
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
     * @returns {Object}
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
     * @param {JSON|Object} options user options
     * @returns {Object}
     */
    create: function (idOrElement, options, _init_options) {
        if (typeof options !== 'object') options = {};
        if (_init_options) {
            options =  [_init_options, options].reduce(function (init, option) {
                            for (let key in option) {
                                if (key === 'plugins' && option[key] && init[key]) {
                                    let i = init[key], o = option[key];
                                    i = i.length ? i : Object.keys(i).map(function(name) { return i[name]; });
                                    o = o.length ? o : Object.keys(o).map(function(name) { return o[name]; });
                                    init[key] = (o.filter(function(val) { return i.indexOf(val) === -1; })).concat(i);
                                } else {
                                    init[key] = option[key];
                                }
                            }
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

        return lib_core(lib_context(element, cons.constructed, cons.options), cons.pluginCallButtons, cons.plugins, cons.options.lang, options, cons._icons);
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
    if (buttonList.indexOf("align") >= 0) pluginList.push(__webpack_require__(6).default);
    if (buttonList.indexOf("math") >= 0) pluginList.push(__webpack_require__(7).default);
    if (buttonList.indexOf("blockquote") >= 0) pluginList.push(__webpack_require__(8).default);
    if (buttonList.indexOf("font") >= 0) pluginList.push(__webpack_require__(9).default);
    if (buttonList.indexOf("fontColor") >= 0) pluginList.push(__webpack_require__(10).default);
    if (buttonList.indexOf("fontSize") >= 0) pluginList.push(__webpack_require__(11).default);
    if (buttonList.indexOf("formatBlock") >= 0) pluginList.push(__webpack_require__(12).default);
    if (buttonList.indexOf("hiliteColor") >= 0) pluginList.push(__webpack_require__(13).default);
    if (buttonList.indexOf("horizontalRule") >= 0) pluginList.push(__webpack_require__(14).default);
    if (buttonList.indexOf("lineHeight") >= 0) pluginList.push(__webpack_require__(15).default);
    if (buttonList.indexOf("list") >= 0) pluginList.push(__webpack_require__(16).default);
    if (buttonList.indexOf("paragraphStyle") >= 0) pluginList.push(__webpack_require__(17).default);
    if (buttonList.indexOf("table") >= 0) pluginList.push(__webpack_require__(18).default);
    if (buttonList.indexOf("template") >= 0) pluginList.push(__webpack_require__(19).default);
    if (buttonList.indexOf("textStyle") >= 0) pluginList.push(__webpack_require__(20).default);
    if (buttonList.indexOf("image") >= 0) pluginList.push(__webpack_require__(21).default);
    if (buttonList.indexOf("link") >= 0) pluginList.push(__webpack_require__(22).default);
    if (buttonList.indexOf("video") >= 0) pluginList.push(__webpack_require__(23).default);
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
          return __webpack_require__(2);

        case 'da':
          return __webpack_require__(24);

        case 'de':
          return __webpack_require__(25);

        case 'es':
          return __webpack_require__(26);

        case 'fr':
          return __webpack_require__(27);

        case 'ja':
          return __webpack_require__(28);

        case 'ko':
          return __webpack_require__(29);

        case 'pt_br':
          return __webpack_require__(30);

        case 'ru':
          return __webpack_require__(31);

        case 'zh_cn':
          return __webpack_require__(32);

        default:
          return __webpack_require__(2);
      }

  }

  return __webpack_require__(2);
};

/* harmony default export */ var misc_getLanguage = (getLanguage);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(0);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ./SunEditor.js
function SunEditor_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SunEditor_typeof = function _typeof(obj) { return typeof obj; }; } else { SunEditor_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SunEditor_typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (SunEditor_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var SunEditor_SunEditor = /*#__PURE__*/function (_Component) {
  _inherits(SunEditor, _Component);

  function SunEditor(props) {
    var _this;

    _classCallCheck(this, SunEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SunEditor).call(this, props));
    _this.txtArea = Object(external_react_["createRef"])();
    return _this;
  }

  _createClass(SunEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          lang = _this$props.lang,
          _this$props$setOption = _this$props.setOptions,
          setOptions = _this$props$setOption === void 0 ? {} : _this$props$setOption,
          _this$props$width = _this$props.width,
          width = _this$props$width === void 0 ? "100%" : _this$props$width;
      var editor = suneditor.create(this.txtArea.current, {
        width: width,
        lang: misc_getLanguage(lang)
      });
      var _this$props2 = this.props,
          name = _this$props2.name,
          insertHTML = _this$props2.insertHTML,
          setContents = _this$props2.setContents,
          setDefaultStyle = _this$props2.setDefaultStyle,
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
          onBlur = _this$props2.onBlur,
          onFocus = _this$props2.onFocus,
          onLoad = _this$props2.onLoad,
          onImageUploadBefore = _this$props2.onImageUploadBefore,
          placeholder = _this$props2.placeholder;
      if (onChange || name) editor.onChange = function (content) {
        if (name) _this2.txtArea.current.value = content;
        if (onChange) onChange(content);
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
      if (onBlur) editor.onBlur = function (e) {
        return onBlur(e, editor.getContents());
      };
      if (onFocus) editor.onFocus = function (e) {
        return onFocus(e);
      };
      if (onLoad) editor.onload = function (c, reload) {
        return onLoad(reload);
      };
      if (onImageUploadBefore) editor.onImageUploadBefore = function (files, info) {
        return onImageUploadBefore(files, info);
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
      editor.setOptions(setOptions);

      if (setContents) {
        editor.setContents(setContents);
        editor.core.focusEdge();
      }

      ;
      if (setDefaultStyle) editor.setDefaultStyle(setDefaultStyle);
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
        !this.editor.core.hasFocus && this.editor.setContents(this.props.setContents);
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
      var dynamicName = {};
      if (this.props.name) dynamicName.name = this.props.name;
      return external_react_default.a.createElement("textarea", _extends({
        ref: this.txtArea
      }, dynamicName));
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
  onBlur: prop_types_default.a.func,
  onFocus: prop_types_default.a.func,
  onLoad: prop_types_default.a.func,
  onPaste: prop_types_default.a.func,
  onImageUploadBefore: prop_types_default.a.func,
  onImageUpload: prop_types_default.a.func,
  onImageUploadError: prop_types_default.a.func,
  setOptions: prop_types_default.a.object,
  setContents: prop_types_default.a.string,
  name: prop_types_default.a.string,
  appendContents: prop_types_default.a.string,
  setDefaultStyle: prop_types_default.a.string,
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