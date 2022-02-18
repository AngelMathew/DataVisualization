import React, {useRef, useEffect} from 'react';
import * as d3 from "d3";
import './LineChart.css'

const LineChart=()=>{
    const d3Chart=useRef();
    const parseDate = d3.timeParse('%Y-%m-%d')
    useEffect(()=>{
        fetch('https://data.cityofnewyork.us/resource/tg4x-b46p.json')
        .then(response=>response.json())
        .then(data=>
            {
            // TRANSFORM DATA
            const permit=data.filter(type=>
                {
                    return type.eventtype==="Shooting Permit" 
                }
            )
            // GET ALL DATA IN AN ARRAY
            const dates= [...new Set(permit.map((item)=>item.enteredon.slice(0,10)))]
            let countArray=[]
            

            // GET COUNTS ON EACH DATE
            dates.map((item)=>
            {
                let date=item;
                console.log(dates)
                let count=0
                permit.map((val)=>{
                    if(val.enteredon.slice(0,10)===date){
                        count=count+1;
                    }

                })
                countArray.push({date:parseDate(date),count:count})
                console.log("countArray",countArray)
                // console.log("permit",permit)
           
            })
            const margin={top:20,right:30,bottom:30,left:30}
            const width=parseInt(d3.select('#d3demo').style('width'))- margin.left - margin.right
            const height=parseInt(d3.select('#d3demo').style('height'))-margin.top - margin.bottom

            // SET UP CHART
            const svg=d3.select(d3Chart.current)
                        // .attr('width',width + margin.left + margin.right)
                        // .attr('height',height + height + margin.top + margin.bottom)
                        .attr("viewBox", `0 0 ${width+margin.left +margin.right} ${height +margin.top + margin.bottom}`)
                        .style('background-color','transparent')
                        .append('g')
                        .attr('transform', 'translate('+ margin.left + ',' + margin.top + ')');
            // X AXIS SCALE
            const x=d3.scaleTime()
                    .domain(d3.extent(countArray,function(d){return d.date}))
                    .range([0,width])
            svg.append('g')
            .attr('transform','translate(0,'+height+')')
            .call(d3.axisBottom(x))

            // GET MAX VALUE OF COUNT
            const max=d3.max(countArray,function(d){return d.count})
   
            // Y AXIS SCALE
            const y=d3.scaleLinear()
                    .domain([0,max])
                    .range([height,0])
            svg.append('g')
            .call(d3.axisLeft(y).ticks(5))

            // DRAW LINE
            svg.append('path')
            .data([countArray])
            .attr('fill','none')
            .attr('stroke','#524A4E')
            .attr('stroke-width',2)
            .attr('d',d3.line()
                        .x((d)=>{return x(d.date)})
                        .y((d)=>{return y(d.count)})
            )

            // ADD TITLE
            svg.append('text')
					.attr('x',(width/2))
					.attr('y', (margin.top/5 - 10))
					.attr('text-anchor', 'middle')
					.attr('font-size', '16px')
					.attr('fill','#524A4E')
					.text('Line Chart - Shooting Permit')

                    let bisect = d3.bisector((d)=> { debugger;console.log("D",d); return d.date }).right;
                    let mouseover=()=> {
                        focus.style("opacity", 1)
                        focusText.style("opacity",1)
                        focusText2.style("opacity",1)
                        focusLine.style("opacity", 1)
                      }
        
                    let mousemove=(event)=> {
                        // recover coordinate we need
                        let x0 = d3.pointer(event);
                        const hoveredDate = x.invert(x0[0])
                        const passed =new Date(hoveredDate.setHours(0,0,0,0));
                        let mockdata=countArray.sort(function(a, b) { return a.date - b.date; });
                        let i = bisect(mockdata, passed);
                        let selectedData = countArray[i]
                        focus
                          .attr("cx", x(selectedData.date))
                          .attr("cy", y(selectedData.count))
                        focusText
                          .html("Date:" + new Date(selectedData.date).toLocaleDateString())
                          .attr("x", x(selectedData.date)+10)
                          .attr("y", y(selectedData.count))
                        focusText2
                            .html("Count:" + selectedData.count)
                            .attr("x", x(selectedData.date)+10)
                            .attr("y", y(selectedData.count)+15)
                        focusLine
                            .attr("x1", x(selectedData.date)).attr("x2", x(selectedData.date))	
                        }

                    let mouseout=()=> {
                        focus.style("opacity", 0)
                        focusText.style("opacity", 0)
                        focusText2.style("opacity", 0)
                        focusLine.style("opacity", 0)
                    }

              // Create the text that travels along the curve of chart
                let focusGroup = svg
                .append('g')
                let focusText =focusGroup
                .append('text')
                .attr("stroke", "#FF5C8D")
                .style("opacity", 0)
                .attr("text-anchor", "left")
                .attr("alignment-baseline", "middle")
                .attr('dy', "0.35em")
                .attr('font-size', "14px");


                let focusText2 =focusGroup
                .append('text')
                .attr("stroke", "#FF5C8D")
                .style("opacity", 0)
                .attr("text-anchor", "left")
                .attr("alignment-baseline", "middle")
                .attr('dy', "0.55em")
                .attr('font-size', "14px");

            // Createa line that travels along the curve of chart
            
                let focusLine = focusGroup
                .append("line")
                    .attr("stroke", "#FF5C8D")
                    .attr("x1", 10).attr("x2", 10)
                    .attr("y1", 0).attr("y2", height)
                    .style("opacity", 0)

            // Create a rect on top of the svg area: this rectangle recovers mouse position
            svg
            .append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width)
            .attr('height', height)
            .on('mouseover',mouseover)
            .on('mousemove', e=>mousemove(e))
            .on('mouseout', mouseout);

             // Create the circle that travels along the curve of chart
            let focus = svg
            .append('g')
            .append('circle')
                .style("fill", "none")
                .attr("stroke", "#FF5C8D")
                .attr('r', 6)
                .style("opacity", 0)
            
            }
        )
    })
    return(
        <div id="d3demo">
            <svg ref={d3Chart}>

            </svg>
        </div>
    )

}

export default LineChart;