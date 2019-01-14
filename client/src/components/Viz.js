import React, { Component } from 'react';
import * as d3 from "d3";
import './../styles/App.css';
import axios from 'axios';

class Viz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: []
        }
        this.makeGraph = this.makeGraph.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    makeGraph(data) {
        const clear = document.getElementById('graph');
        
        clear.innerHTML = "";
        const dataset = data

        const w = 500;
        const h = 300;
        
        const svg = d3.select("#graph")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);
        
        svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 30)
        .attr("y", (d, i) => h - 3 * d)
        .attr("width", 25)
        .attr("height", (d, i) => d * 3)
        .attr("fill", "navy");
        
        svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text((d) => d)
        .attr("x", (d, i) => i * 30)
        .attr("y", (d, i) => h - (3 * d) - 3)
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            code: this.refs.code.value,
        }
        return axios.post('/getgradesgraph', data)
          .then((response) => {
            this.makeGraph(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    // componentDidMount() {
    //     this.makeGraph();
    // }

    render() {
        return (
            <React.Fragment>
                <h1>Graph</h1>
                <div id="graph"></div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Grab grades</h1><br/>
                    <br/>
                    <input type="text" ref="code" placeholder="Enter class code"/>
                    <input type="submit" value="get grades"/>
                </form>
            </React.Fragment>
        )
    }
}

export default Viz;