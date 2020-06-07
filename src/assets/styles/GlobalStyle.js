import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

    html,
    body,
    #root {
      background: ${({ theme }) => theme.color.grey[950]};
      color: ${({ theme }) => theme.color.white};
      font-family: ${({ theme }) => theme.font.family};
      font-weight: ${({ theme }) => theme.font.weight.regular};
      margin: 0 !important;
      padding: 0 !important;
      height: 100vh;
      width: 100vw;
      font-size: 1rem;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-touch-callout: none;
       user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-drag: none;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
    }
    
    a {
      text-decoration: none;
      color: inherit;
      outline: none;
    }

`;
export default GlobalStyle;
