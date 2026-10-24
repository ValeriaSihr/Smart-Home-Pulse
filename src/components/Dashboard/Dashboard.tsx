import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { auth } from '../Api/Api';
import { DashHeader } from './DashHeader';
import { UserSettings } from './UserSettings';
import { loadProfile, profileKey, type Profile } from './profile';
import * as S from './Profile.styled';

export const Dashboard = () => {
  const uid = auth.currentUser?.uid;
  return uid ? <DashboardContent key={uid} uid={uid} /> : null;
};
function DashboardContent({ uid }: { uid: string }) {
  const { t, i18n } = useTranslation();
  const [loaded] = useState(() => loadProfile(uid));
  const [profile, setProfile] = useState(loaded.profile);
  const [page, setPage] = useState('dashboard');
  const [now, setNow] = useState(() => new Date());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(loaded.error);
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 30000); return () => clearInterval(timer); }, []);
  const save = (next: Profile) => {
    try { localStorage.setItem(profileKey(uid), JSON.stringify(next)); setProfile(next); setError(''); return true; } catch { return false; }
  };
  const logout = async () => {
    if (busy) return;
    setBusy(true); setError('');
    try { await signOut(auth); } catch { setError('signOutError'); } finally { setBusy(false); }
  };
  const hour = now.getHours();
  const period = hour < 5 ? 'night' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
  const locale = i18n.resolvedLanguage === 'uk' ? 'uk-UA' : i18n.resolvedLanguage === 'pt' ? 'pt-PT' : 'en-GB';
  return <S.Shell><DashHeader titleKey={page} /><S.Layout>
    <S.Sidebar><nav aria-label={t('mainNavigation')}>
      {['dashboard', 'settings'].map(item => <S.NavButton key={item} type="button" aria-current={page === item ? 'page' : undefined} onClick={() => setPage(item)}><span aria-hidden="true">{item === 'dashboard' ? '▦' : '⚙'}</span>{t(item)}</S.NavButton>)}
    </nav><S.Logout type="button" disabled={busy} onClick={logout}>{t(busy ? 'signingOut' : 'signOut')}</S.Logout></S.Sidebar>
    <S.Main><S.Greeting><h2>{t(`greeting_${period}${profile.firstName ? 'Named' : ''}`, { name: profile.firstName })}</h2><time dateTime={`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`}>{new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(now)}</time></S.Greeting>
    {error && <p role="alert">{t(error)}</p>}
    <div hidden={page !== 'settings'}><UserSettings profile={profile} onSave={save} /></div>
    {page === 'dashboard' && !profile.firstName && <S.Panel><p>{t('completeProfile')}</p><S.Button onClick={() => setPage('settings')}>{t('settings')}</S.Button></S.Panel>}
    </S.Main></S.Layout></S.Shell>;
}
