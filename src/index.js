/**
 * Build styles
 */
 require('./index.css').toString();

 /**
  * @class Trans
  * @classdesc Trans Tool for Editor.js
  * @property {TransData} data - Tool`s input and output data
  * @propert {object} api - Editor.js API instance
  *
  * @typedef {object} TransData
  * @description Trans Tool`s input and output data
  * @property {string} original - trans`s original
  * @property {string} translation - trans`s translation
  * @property {'paragraph'|'header'} option - trans`s option
  *
  * @typedef {object} TransConfig
  * @description Trans Tool`s initial configuration
  * @property {string} originalPlaceholder - placeholder to show in trans`s original input
  * @property {string} translationPlaceholder - placeholder to show in trans`s translation input
  * @property {'paragraph'|'header'} defaultOption - option to use as default
  */
 class Trans {
   /**
    * Notify core that read-only mode is supported
    *
    * @returns {boolean}
    */
   static get isReadOnlySupported() {
     return true;
   }
 
   /**
    * Get Tool toolbox settings
    * icon - Tool icon's SVG
    * title - title to show in toolbox
    *
    * @returns {{icon: string, title: string}}
    */
   static get toolbox() {
     return {
       icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="16px" width="16px" viewBox="0 0 469.333 469.333" style="enable-background:new 0 0 469.333 469.333;" xml:space="preserve"><path d="M253.227,300.267L253.227,300.267L199.04,246.72l0.64-0.64c37.12-41.387,63.573-88.96,79.147-139.307h62.507V64H192V21.333h-42.667V64H0v42.453h238.293c-14.4,41.173-36.907,80.213-67.627,114.347c-19.84-22.08-36.267-46.08-49.28-71.467H78.72c15.573,34.773,36.907,67.627,63.573,97.28l-108.48,107.2L64,384l106.667-106.667l66.347,66.347L253.227,300.267z"/><path d="M373.333,192h-42.667l-96,256h42.667l24-64h101.333l24,64h42.667L373.333,192z M317.333,341.333L352,248.853l34.667,92.48H317.333z"/></svg>',
       title: 'Translate',
     };
   }
 
   /**
    * Empty Trans is not empty Block
    *
    * @public
    * @returns {boolean}
    */
   static get contentless() {
     return true;
   }
 
   /**
    * Allow to press Enter inside the Trans
    *
    * @public
    * @returns {boolean}
    */
   static get enableLineBreaks() {
     return true;
   }
 
   /**
    * Default placeholder for trans original
    *
    * @public
    * @returns {string}
    */
   static get DEFAULT_ORIGIN_PLACEHOLDER() {
     return 'Enter original';
   }
 
   /**
    * Default placeholder for trans translation
    *
    * @public
    * @returns {string}
    */
   static get DEFAULT_TRANS_PLACEHOLDER() {
     return 'Enter translation';
   }
 
   /**
    * Allowed trans options
    *
    * @public
    * @returns {{header: string, paragraph: string}}
    */
   static get OPTIONS() {
     return {
       header: 'header',
       paragraph: 'paragraph',
     };
   }
 
   /**
    * Default trans option
    *
    * @public
    * @returns {string}
    */
   static get DEFAULT_OPTION() {
     return Trans.OPTIONS.paragraph;
   }
 
   /**
    * Allow Trans to be converted to/from other blocks
    */
   static get conversionConfig() {
     return {
       /**
        * To create Trans data from string, simple fill 'text' property
        */
       import: 'original',
       /**
        * To create string from Trans data, concatenate original
        *
        * @param {TransData} transData
        * @returns {string}
        */
       export: function (transData) {
         return transData.translation ? `${transData.original} — ${transData.translation}` : transData.original;
       },
     };
   }
 
   /**
    * Tool`s styles
    *
    * @returns {{baseClass: string, wrapper: string, trans: string, input: string, translation: string, settingsButton: string, settingsButtonActive: string}}
    */
   get CSS() {
     return {
       baseClass: this.api.styles.block,
       wrapper: 'cdx-trans',
       original: 'cdx-trans__original',
       input: this.api.styles.input,
       translation: 'cdx-trans__translation',
       settingsWrapper: 'cdx-trans-settings',
       settingsButton: this.api.styles.settingsButton,
       settingsButtonActive: this.api.styles.settingsButtonActive,
     };
   }
 
   /**
    * Tool`s settings properties
    *
    * @returns {*[]}
    */
   get settings() {
     return [
       {
         name: 'header',
         icon: `<svg width="10" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 14"><path d="M7.6 8.15H2.25v4.525a1.125 1.125 0 0 1-2.25 0V1.125a1.125 1.125 0 1 1 2.25 0V5.9H7.6V1.125a1.125 1.125 0 0 1 2.25 0v11.55a1.125 1.125 0 0 1-2.25 0V8.15z"></path></svg>`,
       },
       {
         name: 'paragraph',
         icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.2 -0.3 9 11.4" width="12" height="14"><path d="M0 2.77V.92A1 1 0 01.2.28C.35.1.56 0 .83 0h7.66c.28.01.48.1.63.28.14.17.21.38.21.64v1.85c0 .26-.08.48-.23.66-.15.17-.37.26-.66.26-.28 0-.5-.09-.64-.26a1 1 0 01-.21-.66V1.69H5.6v7.58h.5c.25 0 .45.08.6.23.17.16.25.35.25.6s-.08.45-.24.6a.87.87 0 01-.62.22H3.21a.87.87 0 01-.61-.22.78.78 0 01-.24-.6c0-.25.08-.44.24-.6a.85.85 0 01.61-.23h.5V1.7H1.73v1.08c0 .26-.08.48-.23.66-.15.17-.37.26-.66.26-.28 0-.5-.09-.64-.26A1 1 0 010 2.77z"></path></svg>`,
       },
     ];
   }
 
   /**
    * Render plugin`s main Element and fill it with saved data
    *
    * @param {{data: TransData, config: TransConfig, api: object}}
    *   data — previously saved data
    *   config - user config for Tool
    *   api - Editor.js API
    *   readOnly - read-only mode flag
    */
   constructor({ data, config, api, readOnly}) {
     const { OPTIONS, DEFAULT_OPTION } = Trans;
 
     this.api = api;
     this.readOnly = readOnly;
 
     this.originalPlaceholder = config.originalPlaceholder || Trans.DEFAULT_ORIGIN_PLACEHOLDER;
     this.translationPlaceholder = config.translationPlaceholder || Trans.DEFAULT_TRANS_PLACEHOLDER;
 
     this.data = {
       original: data.original || '',
       translation: data.translation || '',
       option: Object.values(OPTIONS).includes(data.option) && data.option ||
       config.defaultOption ||
       DEFAULT_OPTION,
     };
   }
 
   /**
    * Create Trans Tool container with inputs
    *
    * @returns {Element}
    */
   render() {
     const container = this._make('blocktrans', [this.CSS.baseClass, this.CSS.wrapper]);
     const original = this._make('div', [this.CSS.input, this.CSS.original], {
       contentEditable: !this.readOnly,
       innerHTML: this.data.original,
     });
     const translation = this._make('div', [this.CSS.input, this.CSS.translation], {
       contentEditable: !this.readOnly,
       innerHTML: this.data.translation,
     });
 
     trans.dataset.placeholder = this.originalPlaceholder;
     translation.dataset.placeholder = this.translationPlaceholder;
 
     container.appendChild(original);
     container.appendChild(translation);
 
     return container;
   }
 
   /**
    * Extract Trans data from Trans Tool element
    *
    * @param {HTMLDivElement} transElement - element to save
    * @returns {TransData}
    */
   save(transElement) {
     const original = transElement.querySelector(`.${this.CSS.original}`);
     const translation = transElement.querySelector(`.${this.CSS.translation}`);
 
     return Object.assign(this.data, {
      original: original.innerHTML,
       translation: translation.innerHTML,
     });
   }
 
   /**
    * Sanitizer rules
    */
   static get sanitize() {
     return {
      original: {
         br: true,
       },
       translation: {
         br: true,
       },
       option: {},
     };
   }
 
   /**
    * Create wrapper for Tool`s settings buttons:
    * 1. P option
    * 2. H option
    *
    * @returns {HTMLDivElement}
    */
   renderSettings() {
     const wrapper = this._make('div', [ this.CSS.settingsWrapper ], {});
     const capitalize = str => str[0].toUpperCase() + str.substr(1);
 
     this.settings
       .map(tune => {
         const el = this._make('div', this.CSS.settingsButton, {
           innerHTML: tune.icon,
           title: `${capitalize(tune.name)}`,
         });
 
         el.classList.toggle(this.CSS.settingsButtonActive, tune.name === this.data.option);
 
         wrapper.appendChild(el);
 
         return el;
       })
       .forEach((element, index, elements) => {
         element.addEventListener('click', () => {
           this._toggleTune(this.settings[index].name);
 
           elements.forEach((el, i) => {
             const { name } = this.settings[i];
 
             el.classList.toggle(this.CSS.settingsButtonActive, name === this.data.option);
           });
         });
       });
 
     return wrapper;
   };
 
   /**
    * Toggle trans`s option
    *
    * @param {string} tune - option
    * @private
    */
   _toggleTune(tune) {
     this.data.option = tune;
   }
 
   /**
    * Helper for making Elements with attributes
    *
    * @param  {string} tagName           - new Element tag name
    * @param  {Array|string} classNames  - list or name of CSS classname(s)
    * @param  {object} attributes        - any attributes
    * @returns {Element}
    */
   _make(tagName, classNames = null, attributes = {}) {
     const el = document.createElement(tagName);
 
     if (Array.isArray(classNames)) {
       el.classList.add(...classNames);
     } else if (classNames) {
       el.classList.add(classNames);
     }
 
     for (const attrName in attributes) {
       el[attrName] = attributes[attrName];
     }
 
     return el;
   }
 }
 
 module.exports = Trans;
 