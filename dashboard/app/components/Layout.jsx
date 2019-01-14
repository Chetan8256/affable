import React, {Component} from "react";
import { Responsive, Container, Header, Link, Menu, Grid, Segment, Divider } from "semantic-ui-react";

//import BodyBackgroundColor from "react-body-backgroundcolor";
//import { Fetch} from "react-request";

import HeaderTmpl from "./Header";

export default props => {
    return (
        <div>
			{<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"></link>}
			{/*<BodyBackgroundColor backgroundColor='#232f3e'>*/}
            <HeaderTmpl />
            <Grid>
				<Grid.Row only='computer'>
					<Grid.Column width="10">
						{props.children}
					</Grid.Column>
				</Grid.Row>
            </Grid>
          {/*</BodyBackgroundColor>*/}
        </div>
    );
}
