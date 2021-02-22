import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { JellyfishSpinner } from "react-spinners-kit";
const brandColor = 'rgb(252, 186, 3)';


import { PrimaryBtn } from '../../styles/ui_elements'
const SVGContainer = styled.div`
    // width: 100%;
    padding: 2em;
    background: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    svg{
        border: 2px solid red;
    }
    position: relative;
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

    function setupSVG() {
        console.log("Setting up");
        console.log(svgContainer.current.querySelector('#svg'));

        if (svgContainer.current.querySelector('#svg')) return; // if the svg already exists, don't make it again. This is for development, otherwise it creates a new svg element on each change, not a problem, just annoying. 
        const size = Math.min(svgContainer.current.clientWidth, 400);

        const svg = d3.select(svgContainer.current)
            .append('svg')
            .attr('id', 'svg')
            .attr('width', size)
            .attr('height', size)

        setSvgBody(svg)

    }


    function drawChart() {

        const margin = { top: 10, bottom: 10, left: 10, right: 10 };
        const width = svgContainer.current.querySelector('#svg').clientWidth;
        const height = svgContainer.current.querySelector('#svg').clientHeight;

        const largestVal = Math.max(...data.map(d => d.value));

        const x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)

        const y = d3.scaleLinear()
            .domain([0, largestVal])
            .range([height, 0])

        const bars = svgBody.selectAll('rect')
            .data(data)

        console.log({
            x: x(1),
            y: y(0.8),
        })

        svgBody.selectAll('rect')
            .enter()
            .append('rect')
            .attr("fill", 'red')
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", 50)
            .attr("width", 20)

        bars
            .enter()
            .append('rect')
            .merge(bars)
            .attr("fill", 'royalblue')
            .attr("x", (d, i) => x(i))
            .attr("y", d => y(d.value))
            .attr("height", d => y(0) - y(d.value))
            .attr("width", x.bandwidth());

        bars
            .exit()
            .remove()

        const svg = svgContainer.current.innerHTML
        setSVG(svg);
        console.log({ svg })

    }



    useEffect(() => {
        setupSVG();
    }, [])

    useEffect(() => {
        if (!data) return;
        drawChart();
    }, [data])


    const handleClick = (e) => {
        console.log(e)

    }

    return (
        <div>
            <SVGContainer
                ref={svgContainer}
            >
                {!!data ?
                    <></>
                    : <div className="placeholder">
                        <p>
                            Tell your story...
                        </p>
                        <JellyfishSpinner size={90} color={brandColor} loading={true} />
                    </div>
                }

            </SVGContainer>
            <PrimaryBtn onClick={() => handleClick()}>Save</PrimaryBtn>
        </div>
    )

}


// width: ${props => props.size.width}px;
// height: ${props => props.size.height}px;
