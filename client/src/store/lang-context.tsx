import React, { useEffect, useState } from 'react';

type LangContextData = {
  language: string;
  setLanguage: (language: Language) => void;
};

export enum Language {
  SK = 'SK',
  EN = 'EN',
}

const LanguageContext = React.createContext<LangContextData>({
  language: Language.EN,
  setLanguage: () => {},
});

export const LanguageContextProvider: React.FC = (props) => {
  const [language, setLanguage] = useState<string>(Language.EN);

  useEffect(() => {
    const lang = localStorage.getItem('language');
    if (lang && lang in Language) {
      setLanguage(lang);
    }
  }, []);

  const setLanguageHandler = (lang: Language) => {
    setLanguage((prev) => lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language: language, setLanguage: setLanguageHandler }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
