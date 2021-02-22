import Link from 'next/link';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import styled from 'styled-components';
import { PrimaryBtn } from '../styles/ui_elements'

export default function Home() {



  return (
    <div>
      <Link href="/create_tile">
        <PrimaryBtn>
          Start
      </PrimaryBtn>
      </Link>
    </div>
  )
}
