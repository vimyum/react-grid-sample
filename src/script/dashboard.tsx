import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

// 型情報なし
let LiquidFillGauge = require('react-liquid-gauge');

export interface Props {
    classes?: any;
    user?: any;
}

export interface IState {
		users?: any;
}

class Dashboard extends React.Component<any, IState> {
        private setupUsers () {
            let users =[{
                name: 'User-A',
                value: 18,
            }, {
                name: 'User-B',
                value: 70,
            }, {
                name: 'User-C',
                value: 50,
            }];
            this.setState({users : users});
        }

        constructor(props) {
            super();
            const {classes, ... other } = props;
            this.state = {
                users: [],
            };
        }

        componentDidMount() {
            this.setupUsers();
        }

        render() {
            let cardLists = [];
            for (let user of this.state.users) {
                cardLists.push(
                    <Grid item xs="12" sm="6" md="4" lg="3" key={user.id} >
                         <StyledUserCard user={user} />
                    </Grid>
                );
            }

            return <div>
            <Grid container justify="center" className="cardContainer">
                {cardLists}
                <Grid item xs="12" lg="6">
                    <Paper className={this.props.classes.paper}>
                        Hello world
                    </Paper>
                </Grid>
            </Grid></div>;
        }
}

const paperStyle = {
    "color" : "#999",
}

const styleCardItemBalance = {
    "fontSize": "32px",
    "color": "#00B3CE",
    "textAlign": "center",
};

export class UserCard extends React.Component<Props, undefined> {
    constructor() {
        super();
    }
    render() {
        return <div>
            <Paper className={this.props.classes.paper}>
                {this.props.user.name}
                <div style={{"margin":"0 auto", "width":"100px", "marginTop":"20px"}}>
                    <LiquidFillGauge value={this.props.user.value} height={100} width={100} waveAnimation={true} />
                </div>
            </Paper>
        </div>;
    }
}

const styleSheet = createStyleSheet('Dashboard', (theme) => ({
    paper: {
        padding: 16,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

let StyledUserCard = withStyles(styleSheet)(UserCard);
export default withStyles(styleSheet)(Dashboard);
