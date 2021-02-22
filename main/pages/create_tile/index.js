import { useState, useEffect } from 'react';
import styled from 'styled-components';
import AnalyseText from '../../components/create_tile/AnalyseText'
import DrawTile from '../../components/create_tile/DrawTile'
import { Group, Loader } from '../../styles/ui_elements'
import brand from '../../styles/brand'
export default function CreateTile() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [svg, setSVG] = useState(null);

    useEffect(() => {
        console.log(svg)
    }, [svg])

    return (
        <div>
            <Loader loading={loading} />

            <Container loaded={!loading}>
                <Group>
                    <AnalyseText setData={setData} setLoading={setLoading} />
                </Group>
                <Group>
                    <DrawTile data={data} setSVG={setSVG} />
                </Group>
            </Container>
        </div>
    )
}


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    position: relative;
    > * {
        flex: 1 1 350px;
        height: 100%;
        
    }

    transition: .5s ease-out;
    ${(props) => props?.loaded ? `
            opacity: 1;
        `
        : `
            opacity: 0;
        `
    }
`