import { useEffect } from 'react';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import { P, Group } from '../../styles/ui_elements';
import { X } from 'react-feather';
const TILE_SIZE = '200px';

export default function SingleTile({ tile }) {

    const router = useRouter();

    function close() {
        console.log('close')
        router.push(`/tile_wall`, undefined, { shallow: true })
    }

    return (
        <SingleTileModal>

            <CloseBtn onClick={() => close()}>
                <X />
            </CloseBtn>

            <Container>
                <Group
                    className="group text-group"

                >
                    {tile?.text && <P>{tile.text}</P>}
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
    .group{
        flex: 1 1 350px;
        display: flex; 
        align-items: center;
        justify-content: center;
    }
    .text-group{
        padding: 1em;
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

    .svg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`