import { DashHeader } from './DashHeader';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../Api/Api';

export const Dashboard = () => {
  const { t } = useTranslation();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [error, setError] = useState('');

    const handleSignOut = async () => {
        if (isSigningOut) return;
        setIsSigningOut(true);
        setError('');
        try {
            await signOut(auth);
        } catch {
            setError('signOutError');
        } finally {
            setIsSigningOut(false);
        }
    };
    return <>
    <DashHeader titleKey="dashboard" />
    <p>{t('signedInAs', { email: auth.currentUser?.email })}</p>
    <button type="button" disabled={isSigningOut} onClick={handleSignOut}>
        {isSigningOut ? t('signingOut') : t('signOut')}
    </button>
    {error && <p role="alert">{t(error)}</p>}
    </>
 }
