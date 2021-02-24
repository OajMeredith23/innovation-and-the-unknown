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

export default function DrawTile({ data, setSVG }) {

    const svgContainer = useRef(null);
    const [svgBody, setSvgBody] = useState(null);

    const MAX_SIZE = 200
    // We create the SVG parent element seperately because we don't want to redraw it when the data is updated, it's child elements we will redraw.
    function setupSVG() {
        console.log("Setting up SVG");
        if (svgContainer.current.querySelector('#svg')) return; // if the svg already exists, don't make it again. This is for development, otherwise it creates a new svg element on each change, not a problem, just annoying. 

        //Get the size of the svg container, this will depend on the screen size so we can't set it initially. 
        // If it's bigger than 400, set it to 400. That's plenty big enough.
        const size = Math.min(svgContainer.current.clientWidth, MAX_SIZE);

        const svg = d3.select(svgContainer.current)
            .append('svg')
            .attr('id', 'svg')
            // .attr('width', size)
            // .attr('height', size)
            .attr('viewBox', `0 0 ${size} ${size}`)

        setSvgBody(svg)

    }


    async function drawChart() {

        const margin = { top: 0, bottom: 0, left: 0, right: 0 };
        // Get the width and height of our parent SVG element.
        const width = Math.min(MAX_SIZE, svgContainer.current.querySelector('#svg').clientWidth);
        const height = Math.min(MAX_SIZE, svgContainer.current.querySelector('#svg').clientHeight);
        console.log("height ", height, "width", width)

        // What's the largest value in our data? this will be the highpoint in the X-axis
        const largestVal = Math.max(...data.map(d => d.value));

        const x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([0, width])

        const y = d3.scaleLinear()
            .domain([0, largestVal])
            .range([height, 0])


        const bars = svgBody.selectAll('rect')
            .data(data)

        bars
            .enter()
            .append('rect')
            .merge(bars)
            .transition() // and apply changes to all of them
            .duration(1000)
            .attr("fill", 'royalblue')
            .attr("x", (d, i) => x(i))
            .attr("y", d => y(d.value))
            .attr("height", d => y(0) - y(d.value))
            .attr("width", x.bandwidth());

        bars
            .exit()
            .remove()

        return true

    }

    useEffect(() => {
        setupSVG();
    }, [])

    async function drawAndReturnSVG() {
        await drawChart();
        const svg = svgContainer.current.innerHTML
        //Send the svg back to the parent component
        setSVG(svg);
    }

    useEffect(() => {
        if (!data) return;
        drawAndReturnSVG();
    }, [data])

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
    border: 4px solid yellow; 
    height: 100%; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    
`