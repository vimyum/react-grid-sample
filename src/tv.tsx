import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FlatButton, DatePicker} from 'material-ui';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';

import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

// 型情報なし
let LiquidFillGauge = require('react-liquid-gauge');

export interface Props {
    content?: string;
    value?: any;
    user?: any;
    clickDelete?: any;
    clickTopup?: any;
    clickChange?: any;
    dialogs?: any;
}

export interface IState {
		value?: string;
		users?: any;
        dialogs?: any;
        currentUser?: any;
}

export default class Dashboard extends React.Component<any, IState> {

        private openDialog(user) {
            console.log('USER:', user);
            console.log('USER:', JSON.stringify(user));
            let newPartialState = this.state.dialogs;
            newPartialState.deleteUser = true;

            this.setState({currentUser: user});
            this.setState(newPartialState);
        }

        private closeDialog (cb) {
            console.log('close Dialog is called.');
            if(typeof cb !== 'function') {
                console.log("cb is undefined..");
                cb = () => { 
                    return Promise.resolve();
                };
            }

            cb(this.state.currentUser).then(json => {
            this.setState({dialogs: {
                deleteUser: false,
                changeUser: false,
                topupUser: false,
            }});
            this.reloadUsers();
            });
        }

        private deleteUserApi (user) {
            return fetch(`/api/delete/${user.id}`).then(resp => resp.json());
        }

        private reloadUsers () {
            fetch('/api/list').then(resp => resp.json())
            .then((json) => {
                let users =[];
                for (let userId in json) {
                    users.push(json[userId]);
                }
                this.setState({users : users});
            }).catch((resp) => {
                console.log(resp)
            })
        }

        constructor() {
            super();
            this.state = {
                users: [],
                dialogs: {
                    deleteUser: false,
                    changeUser: false,
                    topupUser: false,
                },
                currentUser: {},
            };
        }

        componentDidMount() {
            this.reloadUsers();
        }

        render() {
            let cardLists = [];
            for (let user of this.state.users) {
                cardLists.push(<div key={user.id} className="card-item row">
                               <UserCard user={user} dialogs={this.state.dialogs} clickDelete={this.openDialog.bind(this, user)} /></div>);
                               console.log('user: ' + user);
            }

            return <div><FlatButton label="default" onTouchTap={(e) => {console.log('touched.' + e);}}/>
            <h1> Smart House Portal </h1>
            <div className="cardContainer">
            {cardLists}
            <Dialog
            title="Delete User"
            actions={[
                <FlatButton
                label="キャンセル"
                primary={true}
                onTouchTap={this.closeDialog.bind(this)}
                />,
                <FlatButton
                label="OK"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.closeDialog.bind(this, this.deleteUserApi)}
                />,
            ]}
            modal={false}
            open={this.state.dialogs.deleteUser}
            >
            {this.state.currentUser.name} (id: {this.state.currentUser.id})を削除しても良いですか？
            </Dialog>
            </div></div>;
        }
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
        let balanceRatio = (Math.round(this.props.user.balance * 100)) / this.props.user.limit;

        return <div className="col s12 m6">
        <Card>
        <CardHeader
        title={this.props.user.name}
        subtitle={this.props.user.id}
        />
        <CardText className="balance" style={styleCardItemBalance}>
        {this.props.user.balance} / {this.props.user.limit}
        <div style={{"marginLeft":"95px", "marginTop":"20px"}}>
        <LiquidFillGauge value={balanceRatio} height={100} width={100} waveAnimation={true} />
        </div>
        </CardText>
        <CardActions>
        <FlatButton label="TopUp" />
        <FlatButton label="Setting" />
        <FlatButton label="Delete" onTouchTap={this.props.clickDelete}/>
        </CardActions>
        </Card>
        </div>;
    }
}
