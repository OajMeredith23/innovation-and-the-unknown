import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { DominoSpinner } from "react-spinners-kit";
import brand from './brand';
import dompurify from 'dompurify';

const { brandColor, background, borderRadius } = brand;

export const Group = styled.div`
    border-radius: ${borderRadius};
    padding: .5em;
    position: relative;
    min-height: 500px;
`

export const P = ({ children }) => {

    const sanitizer = dompurify.sanitize;

    children = typeof children === 'object' ? children.join('') : children
    return sanitizer ? (
        <p
            dangerouslySetInnerHTML={{ __html: sanitizer(children.replace(/\n/g, '<br/>')) }}
        >
        </p>
    ) : <p>{children}</p>
}

export function Loader({ loading, translucent = false }) {

    return loading ? (
        <LoadingScreen translucent={translucent}>
            <DominoSpinner size={120} color={brandColor} loading={true}></DominoSpinner>
        </LoadingScreen>
    ) : <></>
}

const LoadingScreen = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${background};
    opacity: ${({ translucent }) => translucent ? '0.8' : '1'};
    display: flex; 
    align-items: center;
    justify-content: center; 
    padding: 1em;
    min-height: 40vh;
    z-index: 100;
    transition: .5s ease-in-out;
`

const BtnStyles = styled.button`
    padding: 1em 2em;
    border: none; 
`
export const PrimaryBtn = (props) => {
    const { href = false, children } = props
    return href ?
        (
            <Link href={href}>
                <BtnStyles
                    {...props}
                >{children}</BtnStyles>
            </Link>
        ) :
        (
            <BtnStyles
                {...props}
            >{children}</BtnStyles>
        )
}
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