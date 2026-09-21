import styled from 'styled-components'

export const LoginHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  gap:10px;
  
  
  `

  export const LanguageSwitcher = styled.ul`
  display: flex;
  `

  export const LanguageOption = styled.li`
  width: 30px;
  height: 30px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;


  &:not(:first-child) {
    border-left: 1px solid #000;
  }
  `

  export const SwichTheme = styled.button`
  width: 30px;
  height: 30px;
  `
