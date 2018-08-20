import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../Events';
import LoginForm from './LoginForm';
import { stat } from 'fs';

const socketUrl = "http://localhost:5000";

export default class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            socket: null,
            user: null
        };
    }
    componentWillMount() {
        this.initSocket();
    }

    initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', () => {
            console.log('connected via socket');
        })
        this.setState({socket});
    }

    setUser = (user) => {
        const { socket } = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user})
    }

    logout = () => {
        const { socket } = this.state;
        socket.emit(LOGOUT);
        this.setState({ user: null });
    };

    render() {
        const { title } = this.props;
        const { socket } = this.state;
        return (
            <div className="container">
                <LoginForm socket={socket} setUser={this.setUser} />
            </div>
        );
    }
}
