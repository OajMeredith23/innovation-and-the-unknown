import Head from 'next/head'
import '../styles/globals.css'
import styled from 'styled-components';

const Container = styled.main`
  padding: .5em;
  max-width: 1280px; 
  margin: 0 auto;
  border: 2px dashed grey; 
  min-height: 100vh;
`
function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
