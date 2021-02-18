// import { values } from 'lodash';

const tiles = document.getElementById('tiles');

const size = 150;
const petalPath = 'M0,0 C-10, -10 -10,-40,0,-50 C10, -40 10, -10, 0, 0';
const triangle = 'M69.2,46c46,0-102.3,82.9-62.3-22.5c0,0,4.3-24.2,33.3-23.5';

// const svg = `<svg><path d="${petalPath}" transform="translate(10, 50)"></svg>`

// tiles.innerHTML = svg;

(async () => {

    // const svg = d3.select('#tiles').append('svg')
    // .attr('width', size)
    // .attr('height', size);
    let movies = await d3.json('./movies.json')
    const data = _.values(movies);

    const votesMinMax = d3.extent(data, d => +d.imdbVotes.replace(',', '.'));
    const ratingMinMax = d3.extent(data, d => +d.imdbRating);

    const sizeScale = d3.scaleLinear().domain(ratingMinMax).range([0.25, 1]);
    const numPetalScale = d3.scaleQuantize().domain(votesMinMax).range([3, 6, 9, 18]);

    // const d = data[92];

    // const imdbVotes = +d.imdbVotes.replace(',', '.');

    // console.log({ petalSize })



    const flowersData = data.map(d => {
        const numPetals = numPetalScale(d.imdbVotes.replace(',', '.'));
        const petalSize = sizeScale(+d.imdbRating);
        const title = d.Title;
        return {
            petalSize,
            petals: Array.from({ length: numPetals }, (v, i) => {
                return {
                    petalSize,
                    angle: 360 * i / numPetals
                }
            }),
            title
        }
    });

    console.log(flowersData[2])



    const flowers = d3.select('#tiles')
        .selectAll('div')
        .data(flowersData)
        .enter()
        .append('div')
        .classed('tile', true)

    // Add title
    flowers.append('h4').attr('class', 'tile-title').text(d => d.title)

    flowers
        .append('div').attr('class', 'data-representation')
        .append('svg')
        .attr('height', size).attr('width', size)
        .append('g')
        .attr('transform', (d, i) => `translate(${size / 2}, ${size / 2}) scale(${d.petalSize})`)
        .selectAll('path')
        .data(d => d.petals)
        .enter()
        .append('path')
        .attr('d', petalPath)
        .attr('transform', d => `rotate(${d.angle})`)
        .attr('fill', (d, i) => d3.interpolateWarm(d.angle / 360))
        .attr('stroke', '#f5f5f5')




    console.log(d3)


    const t = document.querySelector('.tile')
    console.log(t.querySelector('.data-representation').innerHTML)

    // return svg;




})()