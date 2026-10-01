import * as SC from './Login.styled.ts';
import Home from '../../icons/home-svgrepo-com.svg?react'
import {useState} from 'react';
import { useNavigate } from 'react-router';





export const AuthForm = () => {

const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState('');
    const isRegister = mode === 'register';

    return <SC.AuthContent>
    


             <SC.AppName>
               <SC.AppIcon>
                 <Home width="40" height="40" aria-hidden="true" />
               </SC.AppIcon>
               <h1>Smart Home Pulse</h1>
                <p>Utility management system</p>
            </SC.AppName>
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
                    if (!isRegister) {
                        // Demo navigation: move this after successful API authentication when connected.
                        navigate('/dashboard', { replace: true });
                        return;
                    }
                    // Connect an authentication API here before reporting success.
                    setMessage('The form is valid. Authentication is not connected yet; no account was created and you are not signed in.');
                }}
            >
                <h2 id="auth-title">{isRegister ? 'Create an account' : 'Sign in'}</h2>
                {!isRegister && <p>Demo mode: this form opens the dashboard without verifying credentials.</p>}
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
    </SC.AuthContent>
}
