import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Home from '../../icons/home-svgrepo-com.svg?react';
import Moon from '../../icons/moon-svgrepo-com.svg?react';
import Sun from '../../icons/sun-2-svgrepo-com.svg?react';
import * as SC from './Dashboard.styled';

export const DashHeader = ({ titleKey = 'dashboard' }: { titleKey?: string }) => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <SC.DashHeader>
      <SC.Brand>
        <SC.BrandIcon><Home aria-hidden="true" focusable="false" /></SC.BrandIcon>
        <span>{t('appName')}</span>
      </SC.Brand>
      <SC.HeaderContent>
        <SC.PageTitle>{t(titleKey)}</SC.PageTitle>
        <SC.HeaderControls>
          <SC.LanguageList aria-label={t('language')}>
            {(['uk', 'en', 'pt'] as const).map(language => (
              <SC.LanguageOption key={language}>
                <SC.LanguageButton type="button"
                  aria-pressed={i18n.resolvedLanguage === language}
                  onClick={() => void i18n.changeLanguage(language)}>
                  {t(language)}
                </SC.LanguageButton>
              </SC.LanguageOption>
            ))}
          </SC.LanguageList>
          <SC.ThemeButton type="button"
            aria-label={t(theme === 'light' ? 'darkTheme' : 'lightTheme')}
            onClick={() => setTheme(current => current === 'light' ? 'dark' : 'light')}>
            {theme === 'light'
              ? <Moon width="20" height="20" aria-hidden="true" focusable="false" />
              : <Sun width="20" height="20" aria-hidden="true" focusable="false" />}
          </SC.ThemeButton>
        </SC.HeaderControls>
      </SC.HeaderContent>
    </SC.DashHeader>
  );
};
