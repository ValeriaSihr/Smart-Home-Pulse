import Moon from '../../icons/moon-svgrepo-com.svg?react'
import Sun from '../../icons/sun-2-svgrepo-com.svg?react'
import Home from '../../icons/home-svgrepo-com.svg?react'
import * as SC from "./Login.styled.ts";
import Container from '../Container/Container.tsx';
import { useEffect, useState } from 'react';


export const Login = () => {
const [theme, setTheme] = useState<'light' | 'dark'>('light');
useEffect(() => {
    document.documentElement.dataset.theme = theme;
}, [theme]);
const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
}


    return <>
    <Container>
      <SC.LoginHeader>
                <SC.LanguageSwitcher>
                    <SC.LanguageOption><a href="">UA</a></SC.LanguageOption>
                    <SC.LanguageOption><a href="">EN</a></SC.LanguageOption>
                    <SC.LanguageOption><a href="">PT</a></SC.LanguageOption     >
                </SC.LanguageSwitcher>
                <SC.SwichTheme type="button" onClick={toggleTheme} aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}>
                    {theme === 'light' ? <Moon width="20" height="20" /> : <Sun width="20" height="20" />}
                </SC.SwichTheme>
            </SC.LoginHeader>
            <div>
               <Home width="40" height="40" />
               <h1>Smart Home Pulse</h1>
                <p>Utility management system</p>
            </div>
    </Container>
    </>
}
