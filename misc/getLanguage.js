const getLanguage = lang => {
  switch (typeof lang) {
    case 'object':
      return lang;
    case 'string':
      return require('suneditor/src/lang')[lang];
  }
  return require('suneditor/src/lang/en');
};

export default getLanguage;
