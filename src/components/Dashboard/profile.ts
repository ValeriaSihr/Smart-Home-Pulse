export type Profile = { firstName: string; lastName: string; gender: string; address: string; cards: { id: string; label: string; last4: string }[]; family: { id: string; name: string }[] };
const empty = (): Profile => ({ firstName: '', lastName: '', gender: '', address: '', cards: [], family: [] });
export const profileKey = (uid: string) => `smart-home-pulse.profile.v1.${uid}`;
export function loadProfile(uid: string): { profile: Profile; error: string } {
  try {
    const raw = localStorage.getItem(profileKey(uid));
    if (!raw) return { profile: empty(), error: '' };
    const p = JSON.parse(raw) as Profile;
    if (!p || !['firstName', 'lastName', 'gender', 'address'].every(k => typeof p[k as keyof Profile] === 'string') || !['', 'female', 'male', 'other', 'unspecified'].includes(p.gender)
      || !Array.isArray(p.cards) || !p.cards.every(c => c && typeof c.id === 'string' && typeof c.label === 'string' && typeof c.last4 === 'string' && /^\d{4}$/.test(c.last4))
      || !Array.isArray(p.family) || !p.family.every(f => f && typeof f.id === 'string' && typeof f.name === 'string')) throw new Error();
    return { profile: p, error: '' };
  } catch { return { profile: empty(), error: 'profileLoadError' }; }
}
