import React, {Component} from "react";
//import { render } from 'react-dom';
//import {BrowserRouter as Router, Route, Link,withRouter } from 'react-router-dom';
//import createBrowserHistory from "history";
import {Menu} from "semantic-ui-react";
import MainIndex from "../pages/index";
//import styles from "../public/css/knimbus.css";

//import styles from "../public/css/styles.js";

const yoyo = {
    "font-size": 20,
    "margin-top": -1
}

class HeaderTmpl extends Component {
    state = {}
    /*
    constructor(props) {
        super(props);
    
        console.log(props)
    }*/
    
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render () {
        const { activeItem } = this.state
        
        //const history = createBrowserHistory();

        return (
            <Menu stackable style={yoyo}>
                <Menu.Item>
                    <Menu.Header>Affable {}</Menu.Header>
                </Menu.Item>
                <Menu.Item
                name='home'
                //active={activeItem === 'home'}
                //as="a" to="home"
                href="/"
                onClick={this.handleItemClick}
                >
                </Menu.Item>
                <Menu.Item
                name='ranking'
                active={activeItem === 'publishers'}
                href="/publishers"
                onClick={this.handleItemClick}
                //as="a" to="publisher"
                >
                Ranking
                </Menu.Item>
            </Menu>
        );
    }
}

export default HeaderTmpl;

