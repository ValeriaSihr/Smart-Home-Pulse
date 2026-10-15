import { useTranslation } from 'react-i18next';
import * as SC from './Login.styled.ts';
import Home from '../../icons/home-svgrepo-com.svg?react'
import EyeShow from '../../icons/eye-show-svgrepo-com.svg?react';
import EyeOff from '../../icons/eye-off-svgrepo-com.svg?react';
import {useState} from 'react';
import { FirebaseError } from 'firebase/app';
import { auth} from '../../components/Api/Api.ts';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";




export const AuthForm = () => {
  const { t } = useTranslation();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState('');
    const isRegister = mode === 'register';

    return <SC.AuthContent>
    


             <SC.AppName>
               <SC.AppIcon>
                 <Home width="40" height="40" aria-hidden="true" />
               </SC.AppIcon>
               <h1>{t('appName')}</h1>
                <p>{t('subtitle')}</p>
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
                        setPasswordError('passwordMismatch');
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
                            'auth/invalid-credential': 'invalidCredentials',
                            'auth/user-not-found': 'invalidCredentials',
                            'auth/wrong-password': 'invalidCredentials',
                            'auth/invalid-email': 'invalidEmail',
                            'auth/email-already-in-use': 'emailInUse',
                            'auth/weak-password': 'weakPassword',
                            'auth/password-does-not-meet-requirements': 'passwordRequirements',
                            'auth/too-many-requests': 'tooManyRequests',
                            'auth/network-request-failed': 'networkError',
                            'auth/user-disabled': 'disabledAccount',
                            'auth/operation-not-allowed': 'providerDisabled',
                            'auth/configuration-not-found': 'configurationError',
                            'auth/invalid-api-key': 'invalidApiKey',
                            'auth/api-key-not-valid.-please-pass-a-valid-api-key.': 'invalidApiKey',
                            'auth/app-not-authorized': 'appUnauthorized',
                            'auth/unauthorized-domain': 'domainUnauthorized',
                        };
                        setErrorCode(error instanceof FirebaseError ? error.code : '');
                        setMessage(error instanceof FirebaseError
                            ? messages[error.code] ?? 'authFailure'
                            : 'unknownError');
                    } finally {
                        setIsSubmitting(false);
                    }
                }}
            >
                <h2 id="auth-title">{isRegister ? t('register') : t('signIn')}</h2>
                <SC.FormField>
                    <label htmlFor="email">{t('email')}</label>
                    <SC.FormInput id="email" name="email" type="email"
                        autoComplete="email" required value={email} disabled={isSubmitting}
                        onChange={event => setEmail(event.target.value)} />
                </SC.FormField>
                <SC.FormField>
                    <label htmlFor="password">{t('password')}</label>
                    <SC.PasswordField>
                    <SC.FormInput id="password" name="password" type={showPassword ? 'text' : 'password'}
                        autoComplete={isRegister ? 'new-password' : 'current-password'}
                        required disabled={isSubmitting} minLength={isRegister ? 8 : undefined}
                        aria-describedby={isRegister ? 'password-hint' : undefined}
                        value={password} onChange={event => setPassword(event.target.value)} />
                    <SC.PasswordToggle type="button" disabled={isSubmitting}
                        aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                        aria-controls="password"
                        onClick={() => setShowPassword(visible => !visible)}>
                        {showPassword ? <EyeOff aria-hidden="true" focusable="false" /> : <EyeShow aria-hidden="true" focusable="false" />}
                    </SC.PasswordToggle>
                    </SC.PasswordField>
                    {isRegister && <small id="password-hint">{t('passwordHint')}</small>}
                </SC.FormField>
                {isRegister && (
                    <SC.FormField>
                        <label htmlFor="confirm-password">{t('confirmPassword')}</label>
                        <SC.PasswordField>
                        <SC.FormInput id="confirm-password" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'}
                            autoComplete="new-password" required value={confirmPassword} disabled={isSubmitting}
                            aria-invalid={Boolean(passwordError)}
                            aria-describedby={passwordError ? 'password-error' : undefined}
                            onChange={event => setConfirmPassword(event.target.value)} />
                        <SC.PasswordToggle type="button" disabled={isSubmitting}
                            aria-label={showConfirmPassword ? t('hideConfirmation') : t('showConfirmation')}
                            aria-controls="confirm-password"
                            onClick={() => setShowConfirmPassword(visible => !visible)}>
                            {showConfirmPassword ? <EyeOff aria-hidden="true" focusable="false" /> : <EyeShow aria-hidden="true" focusable="false" />}
                        </SC.PasswordToggle>
                        </SC.PasswordField>
                        {passwordError && <p id="password-error" role="alert">{t(passwordError)}</p>}
                    </SC.FormField>
                )}
                <SC.SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t('wait') : isRegister ? t('createAccount') : t('signIn')}
                </SC.SubmitButton>
                <p role="status">{message && t(message, { code: errorCode })}</p>
                <SC.ModeButton type="button" disabled={isSubmitting} onClick={() => {
                    setMode(isRegister ? 'login' : 'register');
                    setPassword('');
                    setConfirmPassword('');
                    setShowPassword(false);
                    setShowConfirmPassword(false);
                    setPasswordError('');
                    setMessage('');
                }}>
                    {isRegister ? t('haveAccount') : t('noAccount')}
                </SC.ModeButton>
            </SC.AuthForm>
    </SC.AuthContent>
}
