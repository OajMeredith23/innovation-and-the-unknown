// import { values } from 'lodash';

const tiles = document.getElementById('tiles');

const size = 150;
const petalPath = 'M0,0 C-10, -10 -10,-40,0,-50 C10, -40 10, -10, 0, 0';
const triangle = 'M69.2,46c46,0-102.3,82.9-62.3-22.5c0,0,4.3-24.2,33.3-23.5';


(async () => {

    // Load Movies from json file 
    // Could be from database
    let movies = await d3.json('./movies.json')
    const data = _.values(movies); // Convert to an array using Lodash

    const votesMinMax = d3.extent(data, d => +d.imdbVotes.replace(',', '.')); // Gets the highest and lowest score of imdb votes (user votes)
    const ratingMinMax = d3.extent(data, d => +d.imdbRating); // Gets the highest and lowest score of imdb ratings 

    const sizeScale = d3.scaleLinear().domain(ratingMinMax).range([0.25, 1]); // Creates a function that will scale the size of the flower based on the rating
    const numPetalScale = d3.scaleQuantize().domain(votesMinMax).range([3, 6, 9, 18]);// Creates a function that will scale the number of petals on the num of votes

    const flowersData = data.map(d => { // Process the data, so we remove any useless information and add useful stuff (petalSize and rotation)
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

    const flowers = d3.select('#tiles') // Create the tile parent element
        .selectAll('div')
        .data(flowersData)
        .enter()
        .append('div')
        .classed('tile', true)

    // Add title
    flowers.append('h4').attr('class', 'tile-title').text(d => d.title) // Add film title

    // Create flower in SVG
    const flowerSVG = flowers
        .append('div').attr('class', 'data-representation')
        .append('svg')
        .attr('height', size).attr('width', size)
        .append('g')
        .attr('transform', (d, i) => `translate(${size / 2}, ${size / 2}) scale(${d.petalSize})`)

    flowerSVG
        .selectAll('path')
        .data(d => d.petals)
        .enter()
        .append('path')
        .attr('d', petalPath)
        .attr('transform', d => `rotate(${d.angle})`)
        .attr('fill', (d, i) => d3.interpolateWarm(d.angle / 360))
        .attr('stroke', '#f5f5f5')

})()