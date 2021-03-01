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
    const [size, setSize] = useState(null);

    function setupSVG() {
        if (svgContainer.current.querySelector('#svg')) return; // if the svg already exists, don't make it again. This is for development, otherwise it creates a new svg element on each change, not a problem, just annoying. 

        const MAX_CANVAS_SIZE = 200; // Maximum size of the canvas

        //Get the size of the svg container, this will depend on the screen size so we can't hard code this value.

        const SIZE = Math.min(svgContainer.current.clientWidth, MAX_CANVAS_SIZE);
        setSize(SIZE); // Save the size value to state. We'll use this later when drawing out the data-representation

        // We create the SVG parent element seperate to the drawing of the data-representation because we don't want to redraw it when the data is updated, the data-representation elements will be redrawn.
        const svg = d3.select(svgContainer.current)
            .append('svg')
            .attr('id', 'svg')
            .attr('viewBox', `0 0 ${SIZE} ${SIZE}`)

        setSvgBody(svg) // Save our d3 svg to state, we'll access it again later. 

    }


    function drawChart() {

        // data = [ // Use this as mock data, if you like (you'll still need to enter some text to run this function)
        //     { category: 'neutral', value: 0.04 },
        //     { category: 'admiration', value: 0.2 },
        //     // { category: 'anger', value: 0.02 },
        //     // { category: 'joy', value: 0.3 },
        //     // { category: 'approval', value: 0.2 },
        //     // { category: 'confusion', value: 0.1 },
        //     // { category: 'surprise', value: 0.1 },
        //     { category: 'excitement', value: 0.1 },
        // ]

        // The data representation is a matrix where the dimensions on each axis are equal to the number of data points 
        // e.g, if the data contains 5 emotions it would be a 5x5 matrix .
        // We will then draw out a shape for each point in the matrix, the shape will correspond to a single data point. 

        const matrixSize = data.length; // We'll use this value to create a matrix, the length of each axis is equal to the amount of data points (number of emotions returned from text)
        console.log({ size })
        console.log({ data })
        console.log({ matrixSize })

        const sections = Array.from({ length: matrixSize * matrixSize }).map(d => 0); // Create our matrix array, each point has a value of 0, just as a placeholder.

        let axisRange = Array.from({ length: matrixSize }).map((d, i) => {

            console.log(i * (size / matrixSize))
            return i * (size / matrixSize)
        }) // defines the points to draw from across the canvas. E.g, a canvas that's 200x200 (as defined by const SIZE in the setupSVG() function), and a dataset with 4 datapoints would return an array of four values [0, 50, 100, 150]. 
        console.log({ axisRange })

        const sectionPosX = d3.scaleQuantile() // Maps a number across the axisRange to be used as the X position. Takes in the index % matrixSize, returns appropriate value along axisRange
            .domain(d3.range(matrixSize))
            .range(axisRange);

        const sectionPosY = d3.scaleQuantile() // Maps a number across the axisRange to be used as the Y position. Takes in the index, returns appropriate value along axisRange
            .domain(d3.range(sections.length))
            .range(axisRange);


        const color = d3.scaleSequential()
            .domain([0, sections.length])
            .interpolator(d3.interpolateInferno);


        const scaleEmotion = d3.scaleQuantile()
            .domain([0, 1])
            .range([0.5, 1, 1.5, 2])


        d3.selectAll('g').remove(); // Remove any drawn elements before drawing again. This stops svg being drawn on top of each other.

        const shapes = svgBody
            .selectAll('g')
            .data(sections)
            .enter()
            .append('g')
            .attr('transform', (d, i) => `translate(${sectionPosX(i % matrixSize)}, ${sectionPosY(i)}) scale(${1 / matrixSize})`)

        shapes
            .append('path')
            .merge(shapes)
            .transition() // and apply changes to all of them
            .duration(500)
            .attr('d', (d, i) => emotion_shapes[data[Math.floor(Math.random() * data.length)].category])
            .attr("fill", "none")
            .attr('stroke', '#111')
            // .attr('stroke', (d, i) => color(i))
            .attr('stroke-linecap', 'round')
            // .attr('stroke-width', (d, i) => Math.max(10, Math.floor(Math.random() * 20)))
            .attr('stroke-width', (d, i) => 5)



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