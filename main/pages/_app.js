import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import '../styles/globals.css'
import styled, { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components'

const Container = styled.main`
  padding: .5em;
  max-width: 960px; 
  margin: 0 auto;
  min-height: 100vh;
`

export const theme = {
  // background: 'rgba(245,245,245)',
  // brandColor: 'rgb(252, 186, 3)',
  background: 'snow',
  brandColor: '#5dd2a2',
  textColor: '#555',
  textColor2: 'whitesmoke',
  borderRadius: '.23em',
  shadow: `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)`,
}


const GlobalStyle = createGlobalStyle`

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background: ${({ theme }) => theme.background};

  }
  
  
  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    font-family: 'Montserrat', sans-serif;
  }
  
  h1,h2,h3,h4,h5 {
    // font-weight: 700;
    font-family: 'EB Garamond', sans-serif;
    color: ${({ theme }) => theme.textColor};
  }
  
  p, textarea {
    font-family: 'Montserrat', sans-serif;
    color: ${({ theme }) => theme.textColor};
    font-weight: 300;
    line-height: 1.5em;
    font-size: 1.1em;
  }
`


function MyApp({ Component, pageProps }) {

  const router = useRouter();
  console.log(router.pathname)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Head>
          <title>Innovation And The Unknown</title>
          <link rel="icon" href="/favicon.ico" />
          {/* <link rel="preconnect" href="https://fonts.gstatic.com"> */}
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Montserrat:wght@300;500&display=swap" rel="stylesheet"></link>
        </Head>

        <NavBar isHome={router.pathname === '/'}>
          <Link href="/">
            <h1>
              Folktiles
            </h1>
          </Link>
        </NavBar>


        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  )
}

const NavBar = styled.nav`
  padding: .5em; 
  margin-bottom: .5em;
  display: flex;
  justify-content: center;
  ${({ isHome }) => isHome && `
    font-size: 300%;
  `}
  transition: .4s ease-in-out;
  h1 {
    color: ${({ theme }) => theme.brandColor};
  }
`
export default MyApp
