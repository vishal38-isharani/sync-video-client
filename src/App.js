import React from 'react';
import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Player from "./components/Player";
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000', );

function App() {
    return (
        <>
            <CssBaseline/>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6">
                        Normal
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container>
                <Player socket={socket}/>
            </Container>
        </>
    );
}

export default App;
