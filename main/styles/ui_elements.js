import styled, { keyframes } from 'styled-components';
import { DominoSpinner } from "react-spinners-kit";
import brand from './brand';

const { brandColor, background, borderRadius } = brand;

export const Group = styled.div`
    border: 1px solid grey; 
    border-radius: ${borderRadius};
    padding: .5em;
`


export function Loader({ loading }) {

    return loading ? (
        <LoadingScreen>
            <DominoSpinner size={120} color={brandColor} loading={true}></DominoSpinner>
        </LoadingScreen>
    ) : <></>
}

const LoadingScreen = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: ${background};
    display: flex; 
    align-items: center;
    justify-content: center; 
    padding: 1em;
    min-height: 40vh;
    z-index: 100;
`

export const PrimaryBtn = styled.button`
    padding: 1em;
`

export const TextArea = styled.textarea`
    width: 100%;
    min-height: 50vh;
    border: none; 
    background: transparent;
    font-size: 1.3em;
    padding-top: 1em;
    font-family: 'Baskerville';
    background-image: linear-gradient(transparent, transparent 30px, #ccc 30px, #ccc 31px, transparent 31px);
    background-size: 100% 31px;
    resize: vertical;
    line-height: 31px;
    padding: 8px;
}
`