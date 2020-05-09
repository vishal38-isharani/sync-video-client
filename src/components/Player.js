import React, {Component} from 'react';
import ReactPlayer from "react-player";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';

class Player extends Component {

    constructor(props) {
        super(props);
        this.state = {roomName: '', playing: false, isSeeking: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleOnSeek = this.handleOnSeek.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('play-client', () => {
            this.setState({playing: true});
        });

        this.props.socket.on('pause-client', () => {
            this.setState({playing: false});
        });

        this.props.socket.on('seek-client', (time) => {
            if (this.player.getCurrentTime() !== time) {
                this.player.seekTo(time);
                this.setState({playing: true});
            }
        });
    }

    handleChange(event) {
        this.setState({roomName: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.socket.emit('subscribe', this.state.roomName);
    }

    handlePlay() {
        this.setState({playing: true});
        this.props.socket.emit('played', this.state.roomName);
    }

    handlePause() {
        this.setState({playing: false});
        this.props.socket.emit('paused', this.state.roomName);
    }

    handleOnSeek(time) {
        if (this.player.getCurrentTime() !== time) {
            this.setState({playing: false});
        }
        this.props.socket.emit('seeked', {room: this.state.roomName, time});
    }

    ref = player => {
        this.player = player
    }

    render() {
        return (
            <div style={{flexGrow: 1}}>
                <Grid container direction="row">
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <ReactPlayer
                            ref={this.ref}
                            url='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
                            width={400}
                            onPlay={this.handlePlay}
                            onPause={this.handlePause}
                            onSeek={this.handleOnSeek}
                            playing={this.state.playing}
                            controls={true}
                        />
                    </Grid>
                    <Grid item>

                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                            <TextField id="standard-basic" label="Room Name" value={this.state.value}
                                       onChange={this.handleChange}/>
                            <Button type='submit' variant="contained" color="primary">Save</Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Player.propTypes = {
    socket: PropTypes.any.isRequired
}

export default Player;
