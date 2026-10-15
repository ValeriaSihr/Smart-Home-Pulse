import { useTranslation } from 'react-i18next';
import * as SC from "./Login.styled.ts";
import { useEffect, useState } from 'react';
import Moon from '../../icons/moon-svgrepo-com.svg?react'
import Sun from '../../icons/sun-2-svgrepo-com.svg?react'



export const LoginHeader = () => {
  const { t, i18n } = useTranslation();

const [theme, setTheme] = useState<'light' | 'dark'>('light');
useEffect(() => {
    document.documentElement.dataset.theme = theme;
}, [theme]);
const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
}


    return <>
    <SC.LoginHeader>
                <SC.LanguageSwitcher aria-label={t('language')}>
                    
                    {(['uk', 'en', 'pt'] as const).map(lang => (
                        <SC.LanguageOption key={lang}>
                            <SC.LanguageButton type="button" aria-pressed={i18n.resolvedLanguage === lang} onClick={()=>void i18n.changeLanguage(lang)}> {t(lang)}</SC.LanguageButton>
                        </SC.LanguageOption>
                    ))}
                </SC.LanguageSwitcher>
                <SC.SwichTheme type="button" onClick={toggleTheme} aria-label={theme === 'light' ? t('darkTheme') : t('lightTheme')}>
                    {theme === 'light' ? <Moon width="20" height="20" /> : <Sun width="20" height="20" /> }
                
                </SC.SwichTheme>
            </SC.LoginHeader>
    
    </>
}
