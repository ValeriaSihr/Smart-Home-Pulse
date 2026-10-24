import styled from 'styled-components';
export const Shell = styled.div`
  --surface: #fff; --border: #e7e7e7; --muted: #70707c;
  font-family: var(--font-family); min-height: 100dvh; color: var(--text-color);
  :root[data-theme='dark'] & { --surface: #24282a; --border: #3d4245; --muted: #b8b8c2; }
  button, input, select, textarea { font: inherit; }
  button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible { outline: 2px solid var(--water); outline-offset: 3px; }
`;
export const Layout = styled.div`
  display: grid; grid-template-columns: minmax(280px, 19.4%) minmax(0, 1fr); min-height: calc(100dvh - 77px);
  @media (max-width: 900px) { grid-template-columns: 1fr; min-height: auto; }
`;
export const Sidebar = styled.aside`
  background: var(--surface); border-right: 1px solid var(--border); padding: 24px 16px; display: flex; flex-direction: column; gap: 16px;
  nav { display: grid; gap: 12px; }
  @media (max-width: 900px) { border-right: 0; border-bottom: 1px solid var(--border); nav { grid-template-columns: 1fr 1fr; } }
`;
export const NavButton = styled.button`
  display: flex; align-items: center; gap: 14px; padding: 16px 20px; border-radius: 18px; text-align: left; color: var(--muted);
  &[aria-current='page'] { background: var(--text-color); color: var(--surface); }
  span { font-size: 24px; }
`;
export const Logout = styled(NavButton)`margin-top: auto; &:disabled { opacity: .6; cursor: wait; }`;
export const Main = styled.main`
  min-width: 0; padding: 40px 48px;
  @media (max-width: 1100px) { padding: 32px 24px; }
  @media (max-width: 600px) { padding: 24px 16px; }
`;
export const Greeting = styled.section`
  margin-bottom: 32px; h2 { font-size: clamp(22px, 2.3vw, 30px); overflow-wrap: anywhere; }
  time { display: block; margin-top: 4px; color: var(--muted); font-size: 20px; }
`;
export const Panel = styled.section`
  display: grid; gap: 24px; max-width: 960px; padding: 28px; border: 1px solid var(--border); border-radius: 24px; background: var(--surface);
  h2 { font-size: 22px; } @media (max-width: 600px) { padding: 20px; }
`;
export const Muted = styled.p`color: var(--muted); font-size: 14px;`;
export const Fields = styled.div`display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; @media (max-width: 600px) { grid-template-columns: 1fr; }`;
export const Field = styled.label`
  display: grid; align-content: start; gap: 8px; flex: 1; min-width: 0; font-size: 14px;
  input, select, textarea { width: 100%; min-width: 0; padding: 12px; border: 1px solid var(--border); border-radius: 10px; color: var(--text-color); background: var(--page-bg); }
  textarea { resize: vertical; }
`;
export const Group = styled.fieldset`border: 0; min-width: 0; display: grid; gap: 16px; legend { font-weight: 600; padding-bottom: 16px; }`;
export const Row = styled.div`display: flex; align-items: end; gap: 12px; @media (max-width: 600px) { flex-wrap: wrap; > label { flex-basis: 100%; } }`;
export const Actions = styled.div`display: flex; flex-wrap: wrap; gap: 12px;`;
export const Button = styled.button<{ $primary?: boolean }>`
  justify-self: start; padding: 12px 18px; border: 1px solid var(--border); border-radius: 10px;
  background: ${({ $primary }) => $primary ? 'var(--electricity)' : 'var(--surface)'};
  color: ${({ $primary }) => $primary ? '#fff' : 'var(--text-color)'};
`;
