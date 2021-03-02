import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import { connectToDatabase } from "../../util/mongodb";
import { P } from '../../styles/ui_elements'
import SingleTile from '../../components/tile_wall/SingleTile';

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
    cursor: pointer; 
`

export default function TileWall({ tiles }) {

    const router = useRouter();
    const [tile, setTile] = useState(null);
    const [tileSelected, setTileSelected] = useState(false);

    useEffect(() => {
        if (!tile) return;
        // Add the tiles id as a URL paremeter, we'll then show the single tile modal
        router.push(`/tile_wall/?tile=${tile._id}`, undefined, { shallow: true })
    }, [tile])

    useEffect(() => {
        setTileSelected(tiles.find(tile => tile._id === router.query.tile));
    }, [router.query.tile])


    return (
        <>
            <TileContainer>
                {tiles.map(tile => {
                    return (
                        <Tile
                            key={tile._id}
                            onClick={() => setTile(tile)}
                        >
                            <div style={{
                                width: TILE_SIZE,
                                height: TILE_SIZE
                            }}
                                dangerouslySetInnerHTML={{ __html: tile.svg }}></div>
                        </Tile>
                    )
                })}
            </TileContainer>
            {tileSelected &&
                <SingleTile tile={tileSelected} />
            }
        </>
    )
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const tiles = await db
        .collection("tiles_test")
        .find({})
        .sort({ createdAt: -1 })
        // .limit(50)
        .toArray();

    return {
        props: {
            tiles: JSON.parse(JSON.stringify(tiles)),
        },
    };
}