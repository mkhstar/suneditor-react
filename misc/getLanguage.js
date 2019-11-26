const getLanguage = lang => {
  switch (typeof lang) {
    case 'object':
      return lang;
    case 'string':
      const language = require(`suneditor/src/lang/${lang}`);
      if (language) return language;
      break;
  }
  return require('suneditor/src/lang/en');
};

export default getLanguage;
