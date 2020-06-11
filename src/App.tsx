import React, { Component } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import LingoInput from "./components/LingoInput";
import LingoRounds from "./components/LingoRounds";
import LingoApiService from "./service/LingoApiService";
import { GameState } from "./model/GameState";
import "./App.scss";
import HighScoreView from "./components/HighScoreView";

interface AppState {
  gameState?: GameState;
  error: string;
}

class App extends Component<any, AppState> {
  lingoApiService: LingoApiService;

  constructor(props: any) {
    super(props);
    this.lingoApiService = new LingoApiService();
    this.state = {
      gameState: undefined,
      error: "",
    };
  }

  handleNewGame = () => {
    this.lingoApiService.startGame().then((gameState: GameState) => {
      this.setState({ gameState });
      console.log(gameState);
    });
  };

  handleDoGuess = (inputWord: string) => {
    if (this.state.gameState != undefined) {
      const gameState = this.state.gameState;

      this.lingoApiService
        .doGuess(gameState.gameId, inputWord)
        .then((gameState: GameState) => {
          this.setState({ gameState, error: "" });
          console.log(gameState);
        })
        .catch((reason: any) => {
          this.setState({ error: "Invalid input for " + reason });
        });
    }
  };

  gameIsStarted = (): boolean => {
    return this.state.gameState != undefined && this.state.gameState.gameId > 0;
  };

  render() {
    let lingoGame: any = "";
    const isFinished: boolean =
      this.state.gameState !== undefined &&
      this.state.gameState.finished === true;

    if (this.gameIsStarted()) {
      const { gameState } = this.state;
      if (gameState) {
        lingoGame = (
          <Grid container spacing={3}>
            <Grid item xs={12} className={"progressText"}>
              <h2>{gameState.progress}</h2>
            </Grid>
            {gameState.won ? (
              ""
            ) : (
              <Grid item xs={12}>
                <LingoInput
                  handleDoGuess={this.handleDoGuess}
                  isFinished={isFinished}
                  gameId={gameState.gameId}
                />
              </Grid>
            )}
            {gameState.won ? (
              ""
            ) : (
              <Grid item xs={12} className={"center"}>
                <LingoRounds rounds={gameState.rounds} />
              </Grid>
            )}
            <Grid item xs={12} className={"center"}>
              {gameState.won ? <HighScoreView gameId={gameState.gameId} /> : ""}
            </Grid>
          </Grid>
        );
      }
    }

    return (
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={12} className="center">
            <h1>LINGO</h1>
          </Grid>
          <Grid item xs={12} className="center">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNewGame}
            >
              Start nieuw spel
            </Button>
          </Grid>
          <Grid item xs={12} className="center error">
            {this.state.error}
          </Grid>
          <Grid item xs={12}>
            {lingoGame}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
