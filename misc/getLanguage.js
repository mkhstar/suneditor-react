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
        case 'fr':
          return require('suneditor/src/lang/fr');
        case 'ja':
          return require('suneditor/src/lang/ja');
        case 'ko':
          return require('suneditor/src/lang/ko');
        case 'ru':
          return require('suneditor/src/lang/ru');
        case 'zh_cn':
          return require('suneditor/src/lang/zh_cn');
        default:
          return require('suneditor/src/lang/en');
      }
  }
  return require('suneditor/src/lang/en');
};

export default getLanguage;
