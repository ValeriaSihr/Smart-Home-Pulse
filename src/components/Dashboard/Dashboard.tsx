import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../Api/Api';

export const Dashboard = () => {
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [error, setError] = useState('');

    const handleSignOut = async () => {
        if (isSigningOut) return;
        setIsSigningOut(true);
        setError('');
        try {
            await signOut(auth);
        } catch {
            setError('Unable to sign out. Please try again.');
        } finally {
            setIsSigningOut(false);
        }
    };
    return <>
    <p>Dashboard</p>
    <p>FUCKING NVIDIA</p>
    <p>Signed in as {auth.currentUser?.email}</p>
    <button type="button" disabled={isSigningOut} onClick={handleSignOut}>
        {isSigningOut ? 'Signing out…' : 'Sign out'}
    </button>
    {error && <p role="alert">{error}</p>}
    </>
 }
