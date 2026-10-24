import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './Profile.styled';
import type { Profile } from './profile';
export function UserSettings({ profile, onSave }: { profile: Profile; onSave: (next: Profile) => boolean }) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(profile);
  const [status, setStatus] = useState('');
  const change = (next: Profile) => { setDraft(next); setStatus(''); };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = { ...draft, firstName: draft.firstName.trim(), lastName: draft.lastName.trim(), address: draft.address.trim(), cards: draft.cards.map(c => ({ ...c, label: c.label.trim() })), family: draft.family.map(f => ({ ...f, name: f.name.trim() })) };
    if (!next.firstName || next.cards.some(c => !c.label || !/^\d{4}$/.test(c.last4)) || next.family.some(f => !f.name)) { setStatus('profileValidation'); return; }
    if (onSave(next)) { setDraft(next); setStatus('profileSaved'); } else setStatus('profileSaveError');
  };
  return <S.Panel as="form" onSubmit={submit}><h2>{t('settings')}</h2><S.Muted>{t('localProfileNotice')}</S.Muted><S.Fields>
    <S.Field>{t('firstName')}<input required autoComplete="given-name" maxLength={80} value={draft.firstName} onChange={e => change({ ...draft, firstName: e.target.value })} /></S.Field>
    <S.Field>{t('lastName')}<input autoComplete="family-name" maxLength={80} value={draft.lastName} onChange={e => change({ ...draft, lastName: e.target.value })} /></S.Field>
    <S.Field>{t('gender')}<select value={draft.gender} onChange={e => change({ ...draft, gender: e.target.value })}>{['', 'female', 'male', 'other', 'unspecified'].map(v => <option key={v} value={v}>{t(v ? `gender_${v}` : 'selectGender')}</option>)}</select></S.Field>
    <S.Field>{t('homeAddress')}<textarea rows={3} autoComplete="street-address" maxLength={500} value={draft.address} onChange={e => change({ ...draft, address: e.target.value })} /></S.Field>
    </S.Fields><S.Group><legend>{t('paymentCards')}</legend><S.Muted>{t('demoCardsNotice')}</S.Muted>
    {draft.cards.map((card, index) => <S.Row key={card.id}>
      <S.Field>{t('cardLabel', { number: index + 1 })}<input required maxLength={60} value={card.label} onChange={e => change({ ...draft, cards: draft.cards.map(c => c.id === card.id ? { ...c, label: e.target.value } : c) })} /></S.Field>
      <S.Field>{t('lastFour')}<input required inputMode="numeric" pattern="[0-9]{4}" maxLength={4} value={card.last4} onChange={e => change({ ...draft, cards: draft.cards.map(c => c.id === card.id ? { ...c, last4: e.target.value.replace(/\D/g, '').slice(0,4) } : c) })} /></S.Field>
      <S.Button type="button" aria-label={t('removeCard', { number: index + 1 })} onClick={() => change({ ...draft, cards: draft.cards.filter(c => c.id !== card.id) })}>{t('remove')}</S.Button>
    </S.Row>)}<S.Button type="button" onClick={() => change({ ...draft, cards: [...draft.cards, { id: crypto.randomUUID(), label: '', last4: '' }] })}>{t('addCard')}</S.Button>
    </S.Group><S.Group><legend>{t('familyMembers')}</legend>
    {draft.family.map((member, index) => <S.Row key={member.id}><S.Field>{t('memberName', { number: index + 1 })}<input required maxLength={120} value={member.name} onChange={e => change({ ...draft, family: draft.family.map(f => f.id === member.id ? { ...f, name: e.target.value } : f) })} /></S.Field><S.Button type="button" aria-label={t('removeMember', { number: index + 1 })} onClick={() => change({ ...draft, family: draft.family.filter(f => f.id !== member.id) })}>{t('remove')}</S.Button></S.Row>)}
    <S.Button type="button" onClick={() => change({ ...draft, family: [...draft.family, { id: crypto.randomUUID(), name: '' }] })}>{t('addMember')}</S.Button></S.Group>
    <S.Actions><S.Button type="submit" $primary>{t('saveProfile')}</S.Button><S.Button type="button" onClick={() => { setDraft(profile); setStatus(''); }}>{t('resetChanges')}</S.Button></S.Actions>
    {status && <p role={status === 'profileSaved' ? 'status' : 'alert'}>{t(status)}</p>}
  </S.Panel>;
}
