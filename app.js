const DUMMY_DATA=[
    {id:'d1',value:10,region:'USA'},
    {id:'d2',value:40,region:'India'},
    {id:'d3',value:50,region:'Canada'},
    {id:'d4',value:19,region:'UK'},

];

const xScale=d3.scaleBand().domain(DUMMY_DATA.map(d=>d.region)).rangeRound([0,250]).padding(0.1);
const yScale=d3.scaleLinear().domain([0,55]).range([200,0])

const container=d3.select('svg')
.classed('container',true)
    .style('border','1px solid red')
    
    
    
container
    .selectAll('.bar')
    .data(DUMMY_DATA)
    .enter()
    .append('rect')
    .classed('bar',true)
    .attr('width',xScale.bandwidth())
    .attr('height',data=>200-yScale(data.value))
    .attr('x',data=>xScale(data.region))
    .attr('y',data=>yScale(data.value))
//     .text(dta=>dta.region);
// console.log(d3)