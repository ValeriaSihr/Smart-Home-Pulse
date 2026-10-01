import * as SC from "./Login.styled.ts";
import { useEffect, useState } from 'react';
import Moon from '../../icons/moon-svgrepo-com.svg?react'
import Sun from '../../icons/sun-2-svgrepo-com.svg?react'



export const LoginHeader = () => {

const [theme, setTheme] = useState<'light' | 'dark'>('light');
useEffect(() => {
    document.documentElement.dataset.theme = theme;
}, [theme]);
const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
}

const [language, setLanguage] = useState<'UA' | 'EN' | 'PT'>('UA');

    return <>
    <SC.LoginHeader>
                <SC.LanguageSwitcher>
                    
                    {(['UA','EN',"PT"] as const).map(lang => (
                        <SC.LanguageOption key={lang}>
                            <SC.LanguageButton type="button" aria-pressed={language === lang} onClick={()=>setLanguage(lang)}> {lang}</SC.LanguageButton>
                        </SC.LanguageOption>
                    ))}
                </SC.LanguageSwitcher>
                <SC.SwichTheme type="button" onClick={toggleTheme} aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}>
                    {theme === 'light' ? <Moon width="20" height="20" /> : <Sun width="20" height="20" /> }
                
                </SC.SwichTheme>
            </SC.LoginHeader>
    
    </>
}
