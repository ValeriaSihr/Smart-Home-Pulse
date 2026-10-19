import styled from 'styled-components';

export const DashHeader = styled.header`
  --header-bg: #fff;
  --header-border: #e7e7e7;
  --header-muted: #70707c;
  display: grid;
  grid-template-columns: minmax(280px, 19.4%) minmax(0, 1fr);
  min-height: 50px;
  border-bottom: 1px solid var(--header-border);
  background: var(--header-bg);
  color: var(--text-color);
  font-family: var(--font-family);

  :root[data-theme='dark'] & {
    --header-bg: #24282a;
    --header-border: #3d4245;
    --header-muted: #b8b8c2;
  }

  button:focus-visible {
    outline: 2px solid var(--text-color);
    outline-offset: -4px;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 24px;
  border-right: 1px solid var(--header-border);
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 900px) {
    padding: 16px 20px;
    border-right: 0;
    border-bottom: 1px solid var(--header-border);
    font-size: 22px;
  }
`;

export const BrandIcon = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 30%;
  background: var(--text-color);
  color: var(--header-bg);
  svg { width: 28px; height: 28px; fill: currentColor; }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-width: 0;
  padding: 18px 48px;

  @media (max-width: 1100px) { padding: 18px 24px; }
  @media (max-width: 600px) {
    padding: 16px 20px;
    flex-wrap: wrap;
    gap: 16px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  overflow-wrap: anywhere;
  @media (max-width: 600px) { font-size: 23px; }
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

`;

// Reuse Login controls so both headers keep identical sizes and colors.
export {
  LanguageSwitcher as LanguageList,
  LanguageOption,
  LanguageButton,
  SwichTheme as ThemeButton,
} from '../Login/Login.styled';