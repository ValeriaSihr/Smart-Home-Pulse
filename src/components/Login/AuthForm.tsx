import * as SC from './Login.styled.ts';
import Home from '../../icons/home-svgrepo-com.svg?react'
import EyeShow from '../../icons/eye-show-svgrepo-com.svg?react';
import EyeOff from '../../icons/eye-off-svgrepo-com.svg?react';
import {useState} from 'react';
import { FirebaseError } from 'firebase/app';
import { auth} from '../../components/Api/Api.ts';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";




export const AuthForm = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
                aria-busy={isSubmitting}
                onSubmit={async event => {
                    event.preventDefault();
                    if (isSubmitting) return;
                    if (isRegister && password !== confirmPassword) {
                        setPasswordError('Passwords do not match.');
                        event.currentTarget.querySelector<HTMLInputElement>('#confirm-password')?.focus();
                        return;
                    }
                    setMessage('');
                    setIsSubmitting(true);
                    try {
                        if (isRegister) {
                            await createUserWithEmailAndPassword(auth, email.trim(), password);
                        } else {
                            await signInWithEmailAndPassword(auth, email.trim(), password);
                        }
                        // App observes the Firebase session and redirects after authentication.
                    } catch (error) {
                        const messages: Record<string, string> = {
                            'auth/invalid-credential': 'Incorrect email or password.',
                            'auth/user-not-found': 'Incorrect email or password.',
                            'auth/wrong-password': 'Incorrect email or password.',
                            'auth/invalid-email': 'Enter a valid email address.',
                            'auth/email-already-in-use': 'This email is already registered. Please sign in.',
                            'auth/weak-password': 'Choose a stronger password.',
                            'auth/password-does-not-meet-requirements': 'Your password does not meet the account password requirements.',
                            'auth/too-many-requests': 'Too many attempts. Please try again later.',
                            'auth/network-request-failed': 'Check your internet connection and try again.',
                            'auth/user-disabled': 'This account has been disabled.',
                            'auth/operation-not-allowed': 'Email/password sign-in is not enabled for this project.',
                            'auth/configuration-not-found': 'Firebase Authentication is not configured. Enable Email/Password in Firebase Console.',
                            'auth/invalid-api-key': 'The Firebase API key is invalid. Check the web app configuration.',
                            'auth/api-key-not-valid.-please-pass-a-valid-api-key.': 'The Firebase API key is invalid. Check the web app configuration.',
                            'auth/app-not-authorized': 'This app is not authorized to use Firebase Authentication. Check the API key restrictions.',
                            'auth/unauthorized-domain': 'This website domain is not authorized in Firebase Authentication settings.',
                        };
                        setMessage(error instanceof FirebaseError
                            ? messages[error.code] ?? `Unable to ${isRegister ? 'create an account' : 'sign in'} (${error.code}). Please try again.`
                            : 'Something went wrong. Please try again.');
                    } finally {
                        setIsSubmitting(false);
                    }
                }}
            >
                <h2 id="auth-title">{isRegister ? 'Create an account' : 'Sign in'}</h2>
                <SC.FormField>
                    <label htmlFor="email">Email address</label>
                    <SC.FormInput id="email" name="email" type="email"
                        autoComplete="email" required value={email} disabled={isSubmitting}
                        onChange={event => setEmail(event.target.value)} />
                </SC.FormField>
                <SC.FormField>
                    <label htmlFor="password">Password</label>
                    <SC.PasswordField>
                    <SC.FormInput id="password" name="password" type={showPassword ? 'text' : 'password'}
                        autoComplete={isRegister ? 'new-password' : 'current-password'}
                        required disabled={isSubmitting} minLength={isRegister ? 8 : undefined}
                        aria-describedby={isRegister ? 'password-hint' : undefined}
                        value={password} onChange={event => setPassword(event.target.value)} />
                    <SC.PasswordToggle type="button" disabled={isSubmitting}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        aria-controls="password"
                        onClick={() => setShowPassword(visible => !visible)}>
                        {showPassword ? <EyeOff aria-hidden="true" focusable="false" /> : <EyeShow aria-hidden="true" focusable="false" />}
                    </SC.PasswordToggle>
                    </SC.PasswordField>
                    {isRegister && <small id="password-hint">Use at least 8 characters.</small>}
                </SC.FormField>
                {isRegister && (
                    <SC.FormField>
                        <label htmlFor="confirm-password">Confirm password</label>
                        <SC.PasswordField>
                        <SC.FormInput id="confirm-password" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'}
                            autoComplete="new-password" required value={confirmPassword} disabled={isSubmitting}
                            aria-invalid={Boolean(passwordError)}
                            aria-describedby={passwordError ? 'password-error' : undefined}
                            onChange={event => setConfirmPassword(event.target.value)} />
                        <SC.PasswordToggle type="button" disabled={isSubmitting}
                            aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}
                            aria-controls="confirm-password"
                            onClick={() => setShowConfirmPassword(visible => !visible)}>
                            {showConfirmPassword ? <EyeOff aria-hidden="true" focusable="false" /> : <EyeShow aria-hidden="true" focusable="false" />}
                        </SC.PasswordToggle>
                        </SC.PasswordField>
                        {passwordError && <p id="password-error" role="alert">{passwordError}</p>}
                    </SC.FormField>
                )}
                <SC.SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
                </SC.SubmitButton>
                <p role="status">{message}</p>
                <SC.ModeButton type="button" disabled={isSubmitting} onClick={() => {
                    setMode(isRegister ? 'login' : 'register');
                    setPassword('');
                    setConfirmPassword('');
                    setShowPassword(false);
                    setShowConfirmPassword(false);
                    setPasswordError('');
                    setMessage('');
                }}>
                    {isRegister ? 'Already have an account? Sign in' : 'No account yet? Register'}
                </SC.ModeButton>
            </SC.AuthForm>
    </SC.AuthContent>
}
