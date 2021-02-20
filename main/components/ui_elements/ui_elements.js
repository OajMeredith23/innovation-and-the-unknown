import styled, { keyframes } from 'styled-components';
import { DominoSpinner } from "react-spinners-kit";
const borderRadius = '.5em';
const brandColor = 'rgb(252, 186, 3)';
export const Group = styled.div`
    background: whitesmoke;
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
    background: rgba(240,240,240, 0.8);
    display: flex; 
    align-items: center;
    justify-content: center; 
    padding: 1em;
`

export const PrimaryBtn = styled.button`
    padding: 1em;
`