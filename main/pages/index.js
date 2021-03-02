import Link from 'next/link';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import styled from 'styled-components';
import { PrimaryBtn, Group } from '../styles/ui_elements'
import { PenTool } from 'react-feather'
export default function Home() {



  return (
    <Container>

      <Group className="group centre-children">
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
          <i>
            <h2>
              — Emily Dickinson
            </h2>
          </i>
        </p>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: calc(80vh - 4em);
  .group{
    flex: 1 1 350px;
  }

  .centre-children{
    display: flex; 
    justify-content: center;
    align-items: center;
  }
`
