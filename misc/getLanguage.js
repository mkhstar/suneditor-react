const getLanguage = lang => {
  switch (typeof lang) {
    case 'object':
      return lang;
    case 'string':
      switch (lang) {
        case 'en':
          return require('suneditor/src/lang/en');
        case 'da':
          return require('suneditor/src/lang/da');
        case 'de':
          return require('suneditor/src/lang/de');
        case 'es':
          return require('suneditor/src/lang/es');
        case 'fr':
          return require('suneditor/src/lang/fr');
        case 'ja':
          return require('suneditor/src/lang/ja');
        case 'ko':
          return require('suneditor/src/lang/ko');
        case 'pt_br':
          return require('suneditor/src/lang/pt_br');
        case 'ru':
          return require('suneditor/src/lang/ru');
        case 'it':
          return require('suneditor/src/lang/it');
        case 'zh_cn':
          return require('suneditor/src/lang/zh_cn');
        case 'ro':
          return require('suneditor/src/lang/ro');
        case 'pl':
          return require('suneditor/src/lang/pl');
        case 'ckb':
          return require('suneditor/src/lang/ckb');
        case 'lv':
          return require('suneditor/src/lang/lv');
        case 'se':
          return require('suneditor/src/lang/se');
        case 'ua':
          return require('suneditor/src/lang/ua');
        case 'he':
          return require('suneditor/src/lang/he');
        case 'it':
          return require('suneditor/src/lang/it');
        default:
          return require('suneditor/src/lang/en');
      }
  }
  return require('suneditor/src/lang/en');
};

export default getLanguage;
