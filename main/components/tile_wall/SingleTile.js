import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import { P, Group } from '../../styles/ui_elements';
import { X } from 'react-feather';
import { format } from 'date-fns';
const TILE_SIZE = '200px';

export default function SingleTile({ tile }) {
    console.log(tile)

    const router = useRouter();
    console.log(router.pathname)

    function close() {
        console.log('close')
        router.push(`/tile_wall`)
    }

    return (
        <SingleTileModal>
            <Head>
                <title>Folktiles</title>
                <meta property="og:url" content={`https://folktiles.vercel.app${router.pathname}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Made with Folktiles" />
                <meta property="og:description" content={tile.text} />

                <meta property="twitter:domain" content="folktiles.vercel.app" />
                <meta property="twitter:url" content={`https://folktiles.vercel.app${router.pathname}`} />
                <meta name="twitter:title" content="Innovation And The Unknown" />
                <meta name="twitter:description" content={tile.text} />
            </Head>
            <CloseBtn onClick={() => close()}>
                <X />
            </CloseBtn>

            <Container>
                <Group
                    className="group text-group"

                >
                    {tile?.createdAt && (
                        <div className="text-item">
                            <h2>Created</h2>
                            <P className="italic">{format(tile.createdAt, 'PPPP')}</P>
                        </div>
                    )}
                    <div className="text-item">
                        {tile?.text && <P>{tile.text}</P>}
                    </div>
                </Group>
                <Group
                    className="group svg-group"
                >
                    <SVGContainer>
                        {tile?.svg &&
                            <div className="svg" dangerouslySetInnerHTML={{ __html: tile.svg }}></div>
                        }
                    </SVGContainer>
                </Group>
            </Container>
        </SingleTileModal >
    )
}


const CloseBtn = styled.button`
    border: none;
    background: none; 
    padding: .5em;
    cursor: pointer;
    position: relative;
    z-index: 30;
`
const Container = styled.div`
    overflow: scroll;
    display: flex; 
    flex-wrap: wrap;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.background};
    .group{
        flex: 1 1 350px;
        display: flex; 
        align-items: center;
        justify-content: center;
    }
    .text-group{
        padding: 1em;
        flex-direction: column;
        align-items: flex-start;

        .text-item{
            margin-bottom: 2em;
            padding-right: 1em;
            max-height: 60vh; 
            overflow-y: scroll;
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
            p.italic {
                font-style: italic;
            }
        }
        @media(min-width: 600px){
            padding: 5em;
        }
        p {
            line-height: 1.5em;
        }
    }
    
`
const SingleTileModal = styled.div`
    position: fixed;
    top: 1em;
    left: 1em;
    right: 1em;
    bottom: 1em;
    background: ${({ theme }) => theme.background};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.shadow};
`

const SVGContainer = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .svg {
        width: 100%;
        max-width: 700px;
        padding: 2em;
    }
`