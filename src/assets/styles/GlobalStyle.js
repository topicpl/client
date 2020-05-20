import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

	html,
	body {
    background: ${({ theme }) => theme.color.grey};
		color: ${({ theme }) => theme.color.white};
		font-family: ${({ theme }) => theme.font.family};
    margin: 0 !important;
		padding: 0 !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
