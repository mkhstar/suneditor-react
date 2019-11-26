import language from 'suneditor/src/lang/index'
const getLanguage = lang => {
  switch (typeof lang) {
    case 'object':
      return lang;
    case 'string':
      return language[lang];
  }
  return require('suneditor/src/lang/en');
};

export default getLanguage;
