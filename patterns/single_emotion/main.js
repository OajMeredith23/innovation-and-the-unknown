const user_data = {
    emotions: {
        happiness: 0.8,
        admiration: 0.3,
        amusement: 0.02,
        love: 0.04,
        pride: 0.00
    }

};

const shapes = {
    happiness: 'M0,0 C-10, -10 -10,-40,0,-50 C10, -40 10, -10, 0, 0'
}

const size = 150;

(async () => {

    let data = _.values(user_data);

    const sizeScale = d3.scaleLinear().domain([0, 1]).range([0.25, 1]);

    const emotions = data.map(d => {
        // console.log(d)
        return {
            emotion: 
          }
    })

    const pattern = d3.select('#tiles')
        .selectAll('div')
        .data(d)
        .enter()
        .append('div')
        .classed('tile', true)

    const shape = pattern //Create svg container
        .append('div').attr('class', 'data-representation')
        .append('svg')
        .attr('height', size).attr('width', size)
        .append('g')
        .attr('transform', `translate(${size / 2}, ${size / 2})`)

    let currEmotion = 'happiness';
    console.log(shapes[currEmotion])

    shape
        .selectAll('path')
        .data(d => d)
        .enter()
        .append('path')
        .attr('d', shapes[currEmotion])
        .attr('fill', (d, i) => d3.interpolateWarm(d[currEmotion] * 360))
        .attr('stroke', '#f5f5f5')

})();