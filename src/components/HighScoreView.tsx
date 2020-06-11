import React, { Component } from "react";
import "./HighScoreView.scss";
import { Grid, TextField, Button } from "@material-ui/core";
import LingoApiService from "../service/LingoApiService";
import { HighScore } from "../model/HighScore";
import HighScoreRow from "./HighScoreList";
import HighScoreList from "./HighScoreList";

interface IProps {
  gameId: number;
}
interface IState {
  inputWord: string;
  highScores: HighScore[];
  submitted: boolean;
}

class HighScoreView extends Component<IProps, IState> {
  lingoApiService: LingoApiService;

  constructor(props: IProps) {
    super(props);
    this.lingoApiService = new LingoApiService();

    this.state = {
      inputWord: "",
      highScores: [],
      submitted: false,
    };
  }

  componentDidMount() {
    this.lingoApiService.getHighScores().then((scores: HighScore[]) => {
      this.setState({ highScores: scores });
    });
  }

  handleSubmit = () => {
    this.lingoApiService
      .addHighScore(this.state.inputWord, this.props.gameId)
      .then(() => {
        this.lingoApiService.getHighScores().then((scores: HighScore[]) => {
          this.setState({ highScores: scores, submitted: true });
        });
      });
  };

  handleWordChange = (e: any) => {
    this.setState({
      inputWord: e.target.value,
    });
  };

  render() {
    return (
      <form
        className={"usernameInput"}
        autoComplete={"on"}
        onSubmit={this.handleSubmit}
      >
        <Grid container justify="center">
          <Grid item xs={12}>
            <h2>Gewonnen!</h2>
          </Grid>
          {this.state.submitted ? (
            ""
          ) : (
            <Grid item xs={4} style={{ textAlign: "center" }}>
              <TextField
                id={"inputWord"}
                label={"Gebruikersnaam"}
                onChange={this.handleWordChange}
              />
            </Grid>
          )}
          {this.state.submitted ? (
            ""
          ) : (
            <Grid item xs={4} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Submit!
              </Button>
            </Grid>
          )}
          <Grid item xs={12} className="highscores">
            <HighScoreList
              highScores={this.state.highScores}
              gameId={this.props.gameId}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default HighScoreView;
