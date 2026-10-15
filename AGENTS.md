# Localization

- All application UI text must use `t('key')` from react-i18next, including labels, placeholders, loading states, errors, and accessibility labels.
- Add every new key to src/locales/uk.json, en.json, and pt.json. Use European Portuguese.
- Use language codes uk, en, pt; the Ukrainian button label is UA.
- Store translation keys, not translated messages, in component state so existing messages update when language changes.
- Use interpolation for dynamic values, not sentence concatenation. Do not translate user-entered content.
- Keep language persistence and document language updates centralized in src/i18n.ts.
