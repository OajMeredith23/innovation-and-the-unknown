import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { JellyfishSpinner } from "react-spinners-kit";

import { PrimaryBtn } from '../../styles/ui_elements'


const SVGContainer = styled.div`
    padding: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .placeholder{
        p{
            margin-bottom: 1em;
            text-align: center;
        }
        position: absolute;
        top: 50%; 
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1em; 
    }
`

const emotion_shapes = {
    neutral: "M0,0 L200, 200",
    admiration: "M0,200 L100,0 L200,200",
    anger: "M0,0 Q200,0 200,200",
    joy: "M0,20 Q180,20 180,200M200,180 Q20,180 20,0",
    // joy: "M0,100 S0,-0 40,0 S200,400 200,100",
    approval: "M0,0 L200,0 L0,100 L200,100 L0,200 L200,200",
    confusion: "M0,0 L200,200 M200,0 L0, 200",
    // surprise: "M2,2 Q200,2 200,200 M2,20 Q180,20 180,200 M2,40 Q160,40 160,200",
    surprise: "M2,2 Q200,2 200,200 M2,20 Q180,20 180,200 M2,40 Q160,40 160,200",
    excitement: "M0,0 Q200,0 200,200 M0,20 Q180,20 180,200 M0,40 Q160,40 160,200 M200,200 Q0,200 0,0 M200,180 Q20,180 20,0 M200,160 Q40,160 40,0",
}



export default function DrawTile({ data, setSVG, requestData }) {


    const svgContainer = useRef(null);
    const [svgBody, setSvgBody] = useState(null);

    const MAX_SIZE = 200
    // We create the SVG parent element seperately because we don't want to redraw it when the data is updated, it's child elements we will redraw.
    function setupSVG() {
        if (svgContainer.current.querySelector('#svg')) return; // if the svg already exists, don't make it again. This is for development, otherwise it creates a new svg element on each change, not a problem, just annoying. 

        //Get the size of the svg container, this will depend on the screen size so we can't set it initially. 
        // If it's bigger than 400, set it to 400. That's plenty big enough.
        const size = Math.min(svgContainer.current.clientWidth, MAX_SIZE);
        console.log("size", size)

        const svg = d3.select(svgContainer.current)
            .append('svg')
            .attr('id', 'svg')
            // .attr('width', size)
            // .attr('height', size)
            .attr('viewBox', `0 0 ${size} ${size}`)

        setSvgBody(svg)

    }


    function drawChart() {
        data = [
            { category: 'neutral', value: 0.04 },
            { category: 'admiration', value: 0.2 },
            { category: 'anger', value: 0.02 },
            { category: 'joy', value: 0.3 },
            { category: 'approval', value: 0.2 },
            { category: 'confusion', value: 0.1 },
            { category: 'surprise', value: 0.1 },
            { category: 'excitement', value: 0.1 },
        ]
        const matrixSize = data.length;
        // const matrixSize = data[0].value * 32;

        const sections = Array.from({ length: matrixSize * matrixSize }).map(d => 0)


        // Get the width and height of our parent SVG element.
        const width = Math.min(MAX_SIZE, svgContainer.current.querySelector('#svg').clientWidth);
        const height = Math.min(MAX_SIZE, svgContainer.current.querySelector('#svg').clientHeight);
        // What's the largest value in our data? this will be the highpoint in the X-axis
        // const largestVal = Math.max(...data.map(d => d.value));

        let yRange = Array.from({ length: matrixSize }).map((d, i) => i * (height / matrixSize))

        const sectionPosX = d3.scaleQuantile()
            .domain(d3.range(matrixSize))
            .range(yRange);

        const sectionPosY = d3.scaleQuantile()
            .domain(d3.range(sections.length))
            .range(yRange);

        // console.log("sectionPosY", sectionPosY(9))
        const sectionSize = d3.scaleBand()
            .domain(d3.range(matrixSize))
            .range([0, width])


        const color = d3.scaleSequential()
            .domain([0, sections.length])
            .interpolator(d3.interpolateInferno);


        const scaleEmotion = d3.scaleQuantile()
            .domain([0, 1])
            .range([0.5, 1, 1.5, 2])

        console.log("scaleEmotion", scaleEmotion(0.2)) // outputs 0.5

        d3.selectAll('g').remove()

        const shapes = svgBody
            .selectAll('g')
            .data(sections)
            .enter()
            .append('g')
            // .append('g')
            .attr('transform', (d, i) => `translate(${sectionPosX(i % matrixSize)}, ${sectionPosY(i)}) scale(${1 / matrixSize})`)

        shapes
            .append('path')
            .merge(shapes)
            .transition() // and apply changes to all of them
            .duration(500)
            .attr('d', (d, i) => {
                // console.log(i, "=>", data[i % matrixSize])
                return emotion_shapes[data[Math.floor(Math.random() * data.length)].category]
            })
            // .attr('transform', (d, i) => {

            //     console.log("SC =>", scaleEmotion(data[i % matrixSize].value))

            //     return `scale(${scaleEmotion(1 + data[i % matrixSize].value)})`

            // })
            .attr("fill", "none")
            .attr('stroke', (d, i) => color(i))
            .attr('stroke-linecap', 'round')
            // .attr('stroke-width', (d, i) => Math.max(10, Math.floor(Math.random() * 20)))
            .attr('stroke-width', (d, i) => 3)



    }

    useEffect(() => {
        setupSVG();
    }, [])

    async function drawAndReturnSVG() {
        //Send the svg back to the parent component
    }

    useEffect(() => {
        if (!data) return;
        drawChart();

    }, [data])

    useEffect(() => {
        const svg = svgContainer.current.innerHTML
        setSVG(requestData ? svg : null);
    }, [requestData])

    return (
        <SVGContainer ref={svgContainer}>
            {!data &&
                <div className="placeholder">
                    {/* <p>Tell your story...</p> */}
                    <JellyfishSpinner size={90} loading={true} />
                </div>
            }
        </SVGContainer>
    )

}

const Container = styled.div`
    height: 100%; 
    display: flex; 
    align-items: center; 
    justify-content: center;
   
`