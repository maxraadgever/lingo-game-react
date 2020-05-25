import React, {Component} from 'react';
import {Button, TextField} from "@material-ui/core";

interface Props {
  handleDoGuess: (guess: string) => void;
  isFinished: boolean;
}

interface State {
  inputWord: string
}

class LingoInput extends Component<Props, State> {

  handleWordChange = (e: any) => {
    this.setState({
      inputWord: e.target.value
    });
  }

  handleSubmit = () => {
    this.props.handleDoGuess(this.state.inputWord);
  }

  render() {
    return (
      <form className={"lingoInput"} autoComplete={"off"} onSubmit={this.handleSubmit}>
        <TextField id={"inputWord"} label={"Lingo woord"} onChange={this.handleWordChange} disabled={this.props.isFinished}/>
        <Button variant="contained" color="primary" onClick={this.handleSubmit} disabled={this.props.isFinished}>
          Submit!
        </Button>
      </form>
    );
  }
}

export default LingoInput;