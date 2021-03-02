import Head from 'next/head';
import Link from 'next/link';
import '../styles/globals.css'
import styled, { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components'

const Container = styled.main`
  padding: .5em;
  max-width: 1280px; 
  margin: 0 auto;
  min-height: 100vh;
`

const theme = {
  background: 'rgba(245,245,245)',
  // brandColor: 'rgb(252, 186, 3)',
  brandColor: '#333',
  borderRadius: '.23em',
  shadow: `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)`
}


const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
  }
`


function MyApp({ Component, pageProps }) {
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

        <NavBar>
          <Link href="/">
            <h3>
              Folktiles
            </h3>
          </Link>
        </NavBar>


        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  )
}

const NavBar = styled.nav`
  padding: .5em; 
  border-bottom: 1px solid #333;
  margin-bottom: .5em;
  display: flex;
  justify-content: center;
`
export default MyApp
