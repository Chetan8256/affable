import React, { Component } from "react";
import Layout from "../components/Layout";
import {Container, Grid, Segment, Divider} from "semantic-ui-react";
import { Fetch} from "react-request";
import {LineChart} from 'react-d3-components';
import {Brush} from 'react-d3-components';
import {d3} from 'react-d3-components';


class MainIndex extends Component {
    /*
    async componentDidMount() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
    }*/

    state = {
        messages: [],
        min: 1,
        max: 10,
        number: 6,
        chartData: {label: 'Influencers Ranking', values: []},
        xScale: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 800 - 70]),
        xScaleBrush: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 800 - 70])
    }

    componentDidMount(){
        // this is an "echo" websocket service
        /*
        this.connection = new WebSocket('wss://echo.websocket.org');
        // listen to onmessage event
        this.connection.onmessage = evt => { 
            // add the new message to state
            this.setState({
                messages : this.state.messages.concat([ evt.data ])
            })
        };
        
        // for testing purposes: sending to the echo service which will send it back back
        setInterval( _ =>{
            //this.connection.send( Math.floor(Math.random()*(this.state.max-this.state.min+1)+this.state.min) )
        }, 2000 )*/
        console.log("Starting = ")
        
        fetch("http://localhost:5000/")
		.then(res => res.json())
		.then(
			(result) => {
                console.log(result)
                //var data = JSON.parse(result)
                var data = result
                var keys = Object.keys(data)
                console.log(keys.sort())
                var a = []
                for (var i = 0; i < keys.sort().length; i++) {
                    a.push(data[keys[i]])
                }
                let chartData = this.state.chartData
                chartData["values"] = a
                console.log(chartData)
                this.setState({chartData});
                
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
                console.log("Error in API")
			}
        )
    }

    render() {
        const {chartData} = this.state
        return (
            <Layout>
                <Segment>
                    {
                        /*
                        <Carousel>
                        <div>
                            <img src='/static/banner.jpg' />
                            {<p className="legend">Legend 1</p>}
                        </div>
                        <div>
                            <img src="/static/banner.jpg" />
                            {<p className="legend">Legend 2</p>}
                        </div>
                        <div>
                            <img src="/static/banner.jpg" />
                            <p className="legend">Legend 3</p>
                        </div>
                    </Carousel>
                        */
                    }
                    
                </Segment>
                <Segment>
                    {JSON.stringify(chartData)}
                </Segment>
                <Segment>
                    {
                        chartData["values"].length > 0 &&
                        <LineChart
                        data={chartData}
                        width={800}
                        height={400}
                        margin={{top: 10, bottom: 50, left: 50, right: 20}}
                        xScale={this.state.xScale}
                        xAxis={{tickValues: this.state.xScale.ticks(d3.time.day, 2), tickFormat: d3.time.format("%m/%d")}}
                        />
                    }
                    
                    
                </Segment>
            </Layout>
        );
    }
}

export default MainIndex;
