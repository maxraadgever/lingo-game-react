import React, { Component } from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import "./LingoInput.scss";

interface Props {
  handleDoGuess: (guess: string) => void;
  isFinished: boolean;
  gameId: number;
}

interface State {
  inputWord: string;
  time: number;
  gameId: number;
}

class LingoInput extends Component<Props, State> {
  interval: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      inputWord: "",
      time: 0,
      gameId: 0,
    };
  }

  handleWordChange = (e: any) => {
    this.setState({
      inputWord: e.target.value,
    });
  };

  handleSubmit = () => {
    if (this.interval != undefined) {
      clearInterval(this.interval);
    }
    this.setState({ time: 0 });
    this.props.handleDoGuess(this.state.inputWord);

    var time = 0;

    this.interval = setInterval(() => {
      if (time <= 10) {
        this.setState({ time });
        time += 0.05;
      } else {
        clearInterval(this.interval);
      }
    }, 50);
  };

  componentWillReceiveProps(newProps: Props) {
    if (this.props.gameId != newProps.gameId) {
      if (this.interval != undefined) {
        clearInterval(this.interval);
      }
      this.setState({ time: 0, inputWord: "" });
    }
  }

  render() {
    const progress = 10 * this.state.time;

    return (
      <form
        className={"lingoInput"}
        autoComplete={"off"}
        onSubmit={this.handleSubmit}
      >
        <Grid container justify="center">
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <TextField
              id={"inputWord"}
              label={"Lingo woord"}
              onChange={this.handleWordChange}
              disabled={this.props.isFinished || progress >= 99}
            />
          </Grid>
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
              disabled={this.props.isFinished || progress >= 99}
            >
              Submit!
            </Button>
          </Grid>
          <Grid item xs={12} className="progress">
            <div className="background" />
            <div className="bar" style={{ width: `${progress}%` }} />
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default LingoInput;
