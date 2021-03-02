import Link from 'next/link';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import styled from 'styled-components';
import { PrimaryBtn, Group } from '../styles/ui_elements'
import { PenTool } from 'react-feather'
export default function Home() {



  return (
    <Container>

      <Group className="group centre-children column">
        <p>
          Tell all the truth but tell it slant —
          <br />
            Success in Circuit lies
          <br />
            Too bright for our infirm Delight
          <br />
            The Truth's superb surprise
          <br />
            As Lightning to the Children eased
          <br />
            With explanation kind
          <br />
            The Truth must dazzle gradually
          <br />
            Or every man be blind —
          <br />
          <br />
        </p>
        <h2>
          <i>
            — Emily Dickinson
            </i>
        </h2>
      </Group>
      <Group
        className="group centre-children"

      >
        <PrimaryBtn disabled={false} href="/create_tile">
          <h2>
            Tell your story
          </h2>
          <PenTool />
        </PrimaryBtn>
      </Group>
    </Container>
  )
}


const Container = styled.div`
  // display: flex;
  // flex-wrap: wrap;
  // flex-direction: column;
  justify-content: space-around;
  .group{
    flex: 1 1 350px;
    p {
      text-align: center;
    }
  } 

  .centre-children{
    display: flex; 
    justify-content: center;
    align-items: center;
  }

  .column{
    margin-top: -2em;
    margin-bottom: 2em;
    flex-direction: column;
  }
`
