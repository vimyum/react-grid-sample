import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export interface Props {
    content?: string;
}

export interface IState {
		value?: number;
}

export default class WaterMonitor extends React.Component<any, any> {
		constructor() {
				super();
				this.state = {
						value: 100,
				};
		}

		render() {
                return <div><h1>Content of water Monitoring</h1></div>
        }
}
