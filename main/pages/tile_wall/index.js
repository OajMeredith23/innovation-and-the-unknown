import useSWR from 'swr';
import { useEffect } from 'react';
import styled from 'styled-components';
import { connectToDatabase } from "../../util/mongodb";
import { P } from '../../styles/ui_elements'
import dompurify from 'dompurify';

const TILE_SIZE = '200px';

const TileContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const Tile = styled.div`
    width: ${TILE_SIZE};
    height: ${TILE_SIZE};
    background: whitesmoke; 
    margin: .25em;
`

export default function TileWall({ tiles }) {

    const sanitizer = dompurify.sanitize;

    return (
        <TileContainer>
            {tiles.map(tile => {
                return (
                    <Tile key={tile._id}>
                        <div style={{
                            width: TILE_SIZE,
                            height: TILE_SIZE
                        }}
                            dangerouslySetInnerHTML={{ __html: tile.svg }}></div>
                    </Tile>
                )
            })}
        </TileContainer>
    )
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const tiles = await db
        .collection("tiles_test")
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();

    return {
        props: {
            tiles: JSON.parse(JSON.stringify(tiles)),
        },
    };
}