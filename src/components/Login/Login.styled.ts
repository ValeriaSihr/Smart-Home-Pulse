import styled from 'styled-components'

export const AuthContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  min-height: calc(100dvh - 40px);
  width: 100%;
  padding: 32px 0;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  margin: 0;
  font-family: var(--font-family);
  text-align: center;

  button:focus-visible {
    outline: 2px solid var(--text-color);
    outline-offset: 3px;
  }
`;

export const AppName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const AppIcon = styled.div`
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 30%;
  background: #000;
  color: #fff;

  svg {
    width: 40px;
    height: 40px;
    fill: currentColor;
  }

  :root[data-theme='dark'] & {
    background: #fff;
    color: #000;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 12px;
  border: 1px solid #b0c4de;
  border-radius: 8px;
  background: var(--page-bg);
  color: var(--text-color);
  font: inherit;

  &:focus-visible {
    outline: 2px solid var(--text-color);
    outline-offset: 2px;
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--electricity);
  color: #fff;
  font: inherit;
`;

export const ModeButton = styled.button`
  color: var(--text-color);
  font: inherit;
  text-decoration: underline;
  text-underline-offset: 4px;
`;

export const LoginHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  gap:10px;
  margin-top: 10px;
  
  `

  export const LanguageSwitcher = styled.ul`
  display: flex;
   border: 0.5px solid #B0C4DE;
  border-radius: 8px;
  overflow: hidden;
  `

  export const LanguageOption = styled.li`
  width: 30px;
  height: 30px; 
  display: flex;
  justify-content: center;
  align-items: center; 
  `

  export const LanguageButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;
  border-radius: 0;

  ${LanguageOption}:first-child & {
    border-radius: 8px 0 0 8px;
  }

  ${LanguageOption}:last-child & {
    border-radius: 0 8px 8px 0;
  }

   &[aria-pressed='true'] {
    background-color: #316d11;
    color: #fff;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  
  `

  export const SwichTheme = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #B0C4DE;
  border-radius: 30%;
  background-color: transparent;
  color: var(--text-color);
  `
