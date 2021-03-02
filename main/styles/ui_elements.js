import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { GuardSpinner } from "react-spinners-kit";
import brand from './brand';
import dompurify from 'dompurify';
import { theme } from '../pages/_app'

const { brandColor, background, borderRadius } = brand;

export const Group = styled.div`
    border-radius: ${borderRadius};
    padding: .5em;
    position: relative;
    // min-height: 500px;
`

export const P = ({ children, className = '' }, props) => {

    const sanitizer = dompurify.sanitize;

    children = typeof children === 'object' ? children.join('') : children
    return sanitizer ? (
        <p
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitizer(children.replace(/\n/g, '<br/>')) }}
        >
        </p>
    ) : <p>{children}</p>
}

export function Loader({ loading, translucent = false }) {
    const [currPath, setCurrPath] = useState(0);

    const paths = [
        "M0,200 L100,0 L200,200 M0, 110 L200,110 M20, 90 L180, 90",
        "M0,0 Q200,0 200,200 M200,0 L0, 200",
        "M2,2 Q200,2 200,200 M2,20 Q180,20 180,200 M2,40 Q160,40 160,200",
        "M0,20 Q180,20 180,200M200,180 Q20,180 20,0",
        "M100,0 L100,200  M75, 100 L125, 100 M50, 75 L150, 50 M50, 150 L150, 125"
    ]

    useEffect(() => { // Cycle currPath the state value through the amount of paths in the array
        const animInterval = setInterval(() => {
            setCurrPath(prevState => {
                let val = (prevState + 1) % paths.length
                return val
            })
        }, 2000) // change every 2000 milliseconds
        return () => clearInterval(animInterval); // When this component is unmounted, stop repeating.
    }, [])

    return loading ? (
        <LoadingScreen translucent={translucent} key={Math.random() * 10}>
            <div className="svg-container">
                <svg viewBox="0 0 200 200" class="icon">
                    {/* Set the svg path to the value at the index equal to the current currPath state */}
                    <path d={paths[currPath]}></path>
                </svg>
            </div>
        </LoadingScreen>
    ) : <></>
}

const fade = keyframes`
from { opacity: 0; }
`

const LoadingScreen = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.background};
    // opacity: ${({ translucent }) => translucent ? '0.8' : '1'};
    display: flex; 
    align-items: center;
    justify-content: center; 
    padding: 1em;
    min-height: 40vh;
    z-index: 100;
    transition: .5s ease-in-out;
    .svg-container {
        animation: ${fade} 1s infinite alternate;
        width: 100px;
        height: 100px;
        transition: .5s ease-out;
        svg {
            transition: .5s ease-out;
            path {
                transition: .5s ease-out;
                fill: none;
                stroke: ${({ theme }) => theme.textColor};
                stroke-width: 8px;
            }
        }
    }
`

const BtnStyles = styled.button`
    padding: 1em 2em;
    border: none; 
    display: flex; 
    align-items: center; 
    svg {
        position: relative;
        top: 2px;
        margin-left: 1em;   
    }
    background: ${({ theme }) => theme.brandColor};
    opacity: ${({ disabled }) => disabled ? '.3' : '1'};
    transition: .5s ease-out;
    color: ${({ theme }) => theme.background};
    > * {
        color: ${({ theme }) => theme.background};
    }
`

export const PrimaryBtn = (props) => {
    const { href = false, children, analysing } = props
    console.log({ analysing })
    return href ?
        (
            <Link href={href}>
                <BtnStyles
                    {...props}
                >
                    {!analysing ?
                        children
                        : 'loading...'
                    }
                </BtnStyles>
            </Link>
        ) :
        (
            <BtnStyles
                {...props}
            >
                {!analysing ?
                    children
                    : 'loading...'
                }
            </BtnStyles>
        )
}
export const TextArea = styled.textarea`
    width: 100%;
    min-height: 50vh;
    border: none; 
    background: transparent;
    font-size: 1.2em;
    padding-top: 1em;
    resize: vertical;
    padding: 2em;
    border-right: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    color: ${({ theme }) => theme.textColor};
    &::-webkit-input-placeholder{
        color: ${({ theme }) => theme.textColor};
        opacity: .5;
    }
    &::-webkit-scrollbar {
        width: .25em;
    }
     
    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.background}; 
        border-radius: 0px;
    }
     
    &::-webkit-scrollbar-thumb {
        background: rgba(35,35,35,1); 
    }
      
}
`