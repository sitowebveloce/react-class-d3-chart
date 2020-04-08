import * as d3 from 'd3'

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 }
const WIDTH = 360 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
	// Pass the data here
	constructor(element, data, updateName) {
		let vis = this
		// Attach the data to the vis 
		// vis.data = data;
		// Attach updateName to the vis
		vis.updateName = updateName;

		vis.g = d3.select(element)
			.append("svg")
				.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
				.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
			.append("g")
				.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

		// ─── SCALE ───────────────────────────────────────────────────────
		// X ───────────────────────────────────────────────────────
		vis.x = d3.scaleLinear()
		// Domain min and max
		// The domain value are dinamic, you can put inside the update function!!!!!
		// .domain([0, d3.max(data, d => +d.age) ]) // change the format to Number using + sign
		
		// Range min and max
		.range([0, WIDTH]) // This value remain always the same
		
		// Y ───────────────────────────────────────────────────────
		vis.y = d3.scaleLinear()
		// .domain([0, d3.max(data, d => +d.height)]) // change the format to Number using Number() 
		.range([HEIGHT, 0]) // This value remain always the same

		// Check the x and y axis 
		// console.log(vis.x(6)) 
		
		//
		// ─── AXIS ────────────────────────────────────────────────────────
			// X
		vis.xAxisGroup = vis.g.append('g')
			.attr('transform', `translate(0, ${HEIGHT})`) // place the x axis from top(default) to the bottom
			// Y
		vis.yAxisGroup = vis.g.append('g')

		// THE AXIS CALL IS MADE INSIDE THE UPDATE() METHOD ...

		//
		// ─── LABELS X AND Y ──────────────────────────────────────────────
			// X
		vis.g.append('text')
			.attr('x', WIDTH / 2) // place the label in the middle of the width
			.attr('y', HEIGHT + 40) // place height plus 40px
			.attr('font-size', 20)
			.attr('text-anchor', 'middle')
			.text('Age')
			// Y
		vis.g.append('text')
			.attr('x', -(HEIGHT / 2))
			.attr('y', -50)
			.attr('transform', 'rotate(-90)')
			.attr('font-size', 20)
			.attr('text-anchor', 'middle')
			.text('Height (cm)')
		
		
		// UPDATE	
		vis.update(data)		
	}
	// In order to make the chart dinamic you need to put the
	// d3 methods inside the update react method

	// This 'data' come from <ChartWrapper/> component that pass data updated
	update(data) {
		let vis = this
		vis.data = data; // data updated passed by ChartWrapper

		// When the data arry change the chart stay updated
		vis.x.domain([0, d3.max(vis.data, d => +d.age) ]);
		vis.y.domain([0, d3.max(vis.data, d => +d.height)]);

	//
	// ─── AXIS CALL ───────────────────────────────────────────────────
	let xAxisCall = d3.axisBottom(vis.x)
	let yAxisCall = d3.axisLeft(vis.y)
	
	vis.xAxisGroup.transition(2000).call(xAxisCall)
	vis.yAxisGroup.transition(2000).call(yAxisCall)
	
	// JOIN THE CIRCLES WITH DATA
	let circles = vis.g.selectAll('circle') // g is the canvas
		.data(vis.data, d => d.name)
	// EXIT
	circles.exit()
	.transition(2000)
	.attr('cy', vis.y(0))
	.remove()
	// UPDATE THE CIRCLES POSITION
	circles.transition(2000)
	.attr('cx', d => vis.x(d.age))
	.attr('cy', d => vis.y(d.height))

	// ENTER THE CIRCLES IN THE CANVAS DOM

	circles.enter().append('circle')
		.attr('cy', vis.y(0)) // circles creation start from 0 to d.height set after the transition
		.attr('cx', d => vis.x(d.age))
		.attr('r', 5)
		.attr('fill','#B761ED')
		.attr('cursor', 'pointer')
		// ─── ATTACH EVENTS USING ON D3 METHOD ────────────────────────────
		.on('click', d => vis.updateName(d.name))
			
	
		// Transition
		.transition(2000)
		.attr('cy', d => vis.y(d.height))
	
	
	
	}
}

export default D3Chart