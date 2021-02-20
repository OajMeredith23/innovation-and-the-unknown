import Head from 'next/head';
import Link from 'next/link';
import '../styles/globals.css'
import styled from 'styled-components';

const Container = styled.main`
  padding: .5em;
  max-width: 1280px; 
  margin: 0 auto;
  border: 1px dashed grey; 
  min-height: 80vh;
`
function MyApp({ Component, pageProps }) {
  return (
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
  )
}

const NavBar = styled.nav`
  padding: .5em; 
  border-bottom: 1px solid #333;
  margin-bottom: .5em;
`
export default MyApp
