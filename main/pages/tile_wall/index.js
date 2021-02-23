import useSWR from 'swr';
import { useEffect } from 'react';
import styled from 'styled-components';
import { connectToDatabase } from "../../util/mongodb";
import { P } from '../../styles/ui_elements'
import dompurify from 'dompurify';



const TileContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const Tile = styled.div`
    width: 200px;
    height: 200px;
    background: whitesmoke; 
    margin: .24em;
`

export default function TileWall({ tiles }) {

    const sanitizer = dompurify.sanitize;
    console.log(tiles)

    return (
        <TileContainer>
            {tiles.map(tile => {
                return (
                    <Tile key={tile._id}>
                        {/* {tile.text && <P>{tile.text}</P>} */}
                        <div style={{
                            width: '200px',
                            height: '200px'
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