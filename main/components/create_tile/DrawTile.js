import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { JellyfishSpinner } from "react-spinners-kit";
import { PrimaryBtn, Loader } from '../../styles/ui_elements'
import { theme } from '../../pages/_app'
const emotion_shapes = {
    admiration: "M0,200 L100,0 L200,200",
    amusement: "M0,0 C50,100 150,100 200,0 M0,200 C50,100 150,100 200,200",
    anger: "M0,0 Q200,0 200,200",
    annoyance: "M0,0 L100,200 L200, 0 M0,200 L100,0 L200, 200 M0,0 C50,100 150,100 200,0 M0,200 C50,100 150,100 200,200",
    approval: "M0,0 L200,0 L0,100 L200,100 L0,200 L200,200",
    caring: "M0,0 S100,100 20,75 S75,30 200,200 M100,0 S100,100 20,75 S75,30 200,200 M200,0 S100,100 20,75 S75,30 200,200",
    confusion: "M0,0 L200,200 M200,0 L0, 200",
    desire: "M100,0 S0,75 0,150 S200,0 200,200 M100,0 S50,75 50,100 S200,0 200,200  M100,0 S25,75 25,125 S200,0 200,200",
    dissapointment: "M50,90 C75,80 120,80 150,90 M50,100 C75,120 120,120 150,100",
    dissaproval: "M0,0 L100,50 L0,100 M200, 200 L100,150 L200,100 ",
    disgust: "M100,0 L100,200  M75, 100 L125, 100 M50, 75 L150, 50 M50, 150 L150, 125",
    embarrassment: "M0,0 L100,50 L0,100 M0,100 L100,150 L0,200",
    excitement: "M0,0 Q200,0 200,200 M0,20 Q180,20 180,200 M0,40 Q160,40 160,200 M200,200 Q0,200 0,0 M200,180 Q20,180 20,0 M200,160 Q40,160 40,0",
    fear: "M0,0 L200,100 L0,200  M100,0 Q200,100 100,200",
    gratitude: "M0, 0 L0, 200 M50, 0 L50, 25 M100, 0 L100, 166 M50, 25 L150, 125",
    grief: "M0, 0 L125,0 M125, 0 L125, 125 M125, 125 L0, 125 M0, 125 L0,0 M75, 75 L200, 75 M200, 75 L200, 200 M200, 200 L75, 200 M75, 200 L75, 75",
    joy: "M0,20 Q180,20 180,200M200,180 Q20,180 20,0",
    love: "M0, 0 L125,0 M125, 0 L125, 125 M125, 125 L0, 125 M0, 125 L0,0 M75, 75 L200, 75 M200, 75 L200, 200 M200, 200 L75, 200 M75, 200 L75, 75  M2,20 Q180,20 180,200 M0, 0 L120, 0 M200,200 L80, 200 M80, 200 L0,0 M120, 0 L200,200",
    nervousness: "M0, 0 L120, 0 M200,200 L80, 200 M80, 200 L0,0 M120, 0 L200,200",
    optimism: "M0,200 L100,0 L200,200 M0, 110 L200,110 M20, 90 L180, 90",
    pride: "",
    realization: "M0, 0 L175,0 M175, 0 L125, 125 M125, 125 L0, 125 M0, 125 L0,0 M25, 75 L200, 75 M200, 75 L200, 200 M200, 200 L75, 200 M75, 200 L25, 75",
    relief: "M0,0 Q200,0 200,200 M200,0 L0, 200",
    remorse: "M0, 0 L200,0 M200, 0 L200, 125 M125, 125 L0, 125 M0, 125 L0,0 M75, 200 L75, 100  M100, 200 L100, 50 M125, 200 L125, 25",
    sadness: "M0, 0 L0, 200 M100, 0 L100, 100 M0, 175 L100, 100 M200, 0 L200,200 M100, 0 L200,100 M100, 100 L200,200",
    surprise: "M2,2 Q200,2 200,200 M2,20 Q180,20 180,200 M2,40 Q160,40 160,200",
    neutral: "M0,0 L200, 200",
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
        data = data && data.slice(0, 5) // Only include the top 5 emotions (get's very chaotic with more shapes than 7)
        console.log({ data })

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

        let index = 26
        data = [{ category: Object.entries(emotion_shapes)[index][0], value: 1 }]

        console.log(Object.entries(emotion_shapes)[index], " =>", data)

        // The data representation is a matrix where the dimensions on each axis are equal to the number of data points 
        // e.g, if the data contains 5 emotions it would be a 5x5 matrix .
        // We will then draw out a shape for each point in the matrix, the shape will correspond to a single data point. 

        const matrixSize = data.length; // We'll use this value to create a matrix, the length of each axis is equal to the amount of data points (number of emotions returned from text)

        const sections = Array.from({ length: matrixSize * matrixSize }).map(d => 0); // Create our matrix array, each point has a value of 0, just as a placeholder.

        let axisRange = Array.from({ length: matrixSize }).map((d, i) => {
            return i * (size / matrixSize)
        }) // defines the points to draw from across the canvas. E.g, a canvas that's 200x200 (as defined by const SIZE in the setupSVG() function), and a dataset with 4 datapoints would return an array of four values [0, 50, 100, 150]. 

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
            .attr('stroke', theme.textColor)
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', (d, i) => 8);
    }


    useEffect(() => {
        setupSVG();
    }, [])

    useEffect(() => {
        if (!data) return;
        drawChart();

    }, [data])

    useEffect(() => {
        const svg = svgContainer.current.innerHTML
        console.log({ svg })
        // setSVG(requestData ? svg : null);
        setSVG(svg);
    }, [requestData])

    return (
        <SVGContainer ref={svgContainer}>

            {!data && <Loader loading={!data} />}
        </SVGContainer >
    )

}


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


const Container = styled.div`
    height: 100%; 
    display: flex; 
    align-items: center; 
    justify-content: center;
   
`