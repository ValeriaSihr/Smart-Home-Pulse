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

const [language, setLanguage] = useState<'UA' | 'EN' | 'PT'>('UA');
const [mode, setMode] = useState<'login' | 'register'>('login');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [passwordError, setPasswordError] = useState('');
const [message, setMessage] = useState('');
const isRegister = mode === 'register';


    return <>
    <Container>
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
            <div>
               <Home width="40" height="40" />
               <h1>Smart Home Pulse</h1>
                <p>Utility management system</p>
            </div>
            <SC.AuthForm
                aria-labelledby="auth-title"
                onChange={() => {
                    setMessage('');
                    setPasswordError('');
                }}
                onSubmit={event => {
                    event.preventDefault();
                    if (isRegister && password !== confirmPassword) {
                        setPasswordError('Passwords do not match.');
                        event.currentTarget.querySelector<HTMLInputElement>('#confirm-password')?.focus();
                        return;
                    }
                    // Connect an authentication API here before reporting success.
                    setMessage('The form is valid. Authentication is not connected yet; no account was created and you are not signed in.');
                }}
            >
                <h2 id="auth-title">{isRegister ? 'Create an account' : 'Sign in'}</h2>
                <SC.FormField>
                    <label htmlFor="email">Email address</label>
                    <SC.FormInput id="email" name="email" type="email"
                        autoComplete="email" required value={email}
                        onChange={event => setEmail(event.target.value)} />
                </SC.FormField>
                <SC.FormField>
                    <label htmlFor="password">Password</label>
                    <SC.FormInput id="password" name="password" type="password"
                        autoComplete={isRegister ? 'new-password' : 'current-password'}
                        required minLength={isRegister ? 8 : undefined}
                        aria-describedby={isRegister ? 'password-hint' : undefined}
                        value={password} onChange={event => setPassword(event.target.value)} />
                    {isRegister && <small id="password-hint">Use at least 8 characters.</small>}
                </SC.FormField>
                {isRegister && (
                    <SC.FormField>
                        <label htmlFor="confirm-password">Confirm password</label>
                        <SC.FormInput id="confirm-password" name="confirmPassword" type="password"
                            autoComplete="new-password" required value={confirmPassword}
                            aria-invalid={Boolean(passwordError)}
                            aria-describedby={passwordError ? 'password-error' : undefined}
                            onChange={event => setConfirmPassword(event.target.value)} />
                        {passwordError && <p id="password-error" role="alert">{passwordError}</p>}
                    </SC.FormField>
                )}
                <SC.SubmitButton type="submit">
                    {isRegister ? 'Create account' : 'Sign in'}
                </SC.SubmitButton>
                <p role="status">{message}</p>
                <SC.ModeButton type="button" onClick={() => {
                    setMode(isRegister ? 'login' : 'register');
                    setPassword('');
                    setConfirmPassword('');
                    setPasswordError('');
                    setMessage('');
                }}>
                    {isRegister ? 'Already have an account? Sign in' : 'No account yet? Register'}
                </SC.ModeButton>
            </SC.AuthForm>
    </Container>
    </>
}
