import Head from 'next/head';
import Link from 'next/link';
import '../styles/globals.css'
import styled, { ThemeProvider } from 'styled-components';

const Container = styled.main`
  padding: .5em;
  max-width: 1280px; 
  margin: 0 auto;
  border: 1px dashed grey; 
  min-height: 80vh;
`

const theme = {
  background: 'rgba(245,245,245)',
  brandColor: 'rgb(252, 186, 3)',
  borderRadius: '.23em',
  shadow: `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)`
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Head>
          <title>Innovation And The Unknown</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar>
          <Link href="/">
            Home
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
`
export default MyApp
