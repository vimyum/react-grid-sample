import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FlatButton, Tabs, Tab, DatePicker} from 'material-ui';

import Dashboard from "./tv";
import WaterMonitor from "./water";

injectTapEventPlugin();

const content = () => {
    return <MuiThemeProvider>
    <div>
    <Router>
    <div>
        <Tabs>
            <Tab label="TV Monitoring" value="0" containerElement={<Link to="/tv"/>}/>
            <Tab label="Water Monitoring" value="1" containerElement={<Link to="/water"/>}/>
            <Tab label="Voice Alarm" value="2" containerElement={<Link to="/fridge"/>}/>
        </Tabs>
        <div>
            <Route path="/tv" component={Dashboard}/>
            <Route path="/water" component={WaterMonitor}/>
            <Route path="/fridge" component={WaterMonitor}/>
        </div>
    </div>
    </Router>
    </div>
    </MuiThemeProvider>
}

ReactDOM.render(content(), document.getElementById('app'));
