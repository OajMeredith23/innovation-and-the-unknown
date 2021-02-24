import { useState, useEffect } from 'react';
import useSWR from 'swr'
import styled from 'styled-components';
import AnalyseText from '../../components/create_tile/AnalyseText'
import DrawTile from '../../components/create_tile/DrawTile'
import { Group, Loader, PrimaryBtn } from '../../styles/ui_elements'

const isDevMode = process.env.NEXT_PUBLIC_ENV === 'dev'

export default function CreateTile() {

    const [data, setData] = useState(null);
    const [text, setText] = useState(null);
    const [loading, setLoading] = useState(true);
    const [svg, setSVG] = useState(null);


    useEffect(() => { console.log(!!data && !!svg && !!text) }, [data, svg, data])

    const pushTile = async () => {

        try {
            const res = !!data && !!svg && !!text && await fetch('/api/push_tile', {
                method: 'post',
                body: JSON.stringify({
                    data,
                    svg,
                    text
                })
            })

            console.log("push result ", await res.json())

        } catch (err) {
            console.err(err);
        }

    }


    return (
        <div>
            <Loader loading={loading} />
            <Container loaded={!loading}>
                <Group>
                    <AnalyseText setData={setData} setLoading={setLoading} setText={setText} />
                </Group>
                <Group>
                    <DrawTile data={data} setSVG={setSVG} />
                </Group>
            </Container>
            <PrimaryBtn
                disabled={!(!!data && !!svg && !!text)}
                onClick={pushTile}
            >Save</PrimaryBtn>
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