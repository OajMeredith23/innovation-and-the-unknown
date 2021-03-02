import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import AnalyseText from '../../components/create_tile/AnalyseText'
import DrawTile from '../../components/create_tile/DrawTile'
import { Group, Loader, PrimaryBtn } from '../../styles/ui_elements'
import { ArrowRight } from 'react-feather'
const isDevMode = process.env.NEXT_PUBLIC_ENV === 'dev'

export default function CreateTile() {

    const router = useRouter();

    const [data, setData] = useState(null);
    const [text, setText] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analysing, setAnalysing] = useState(false);
    const [svg, setSVG] = useState(null);

    const [requestData, setRequestData] = useState(false);

    useEffect(() => {
        console.log("gotdata")
    }, [data])

    useEffect(() => {
        console.log({ requestData })
    }, [requestData])

    useEffect(() => {
        console.log(svg)
        if (svg === null || requestData === false) { return }
        else {
            pushTile();
        }
    }, [svg])

    const pushTile = async () => {

        try {
            // console.log("svg", svg)
            const res = !!data && !!svg && !!text && await fetch('/api/push_tile', {
                method: 'post',
                body: JSON.stringify({
                    data,
                    svg,
                    text,
                    createdAt: Date.now()
                })
            })

            console.log("push result ", await res.json())
            router.push('/tile_wall')

        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div style={{ position: 'relative' }}>
            <Loader loading={loading} />
            <Container loaded={!loading}>
                <Group className="group">
                    <AnalyseText setData={setData} setLoading={setLoading} setText={setText} setAnalysing={setAnalysing} analysing={analysing} />
                </Group>
                <Group className="group">
                    <DrawTile data={data} setSVG={setSVG} requestData={requestData} />
                </Group >
            </Container>

            <ButtonContainer>
                <PrimaryBtn
                    loading={analysing}
                    disabled={!data || analysing}
                    onClick={() => setRequestData(!requestData)}
                >
                    <h2>
                        Save
                    </h2>
                    <ArrowRight />
                </PrimaryBtn>

            </ButtonContainer>
        </div>
    )
}


const Container = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1em;
    position: relative;
    margin: 3em 0;
    .group{
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 500px;
    }
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`