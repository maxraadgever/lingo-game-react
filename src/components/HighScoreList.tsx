import React, { Component } from "react";
import { HighScore } from "../model/HighScore";
import { Grid } from "@material-ui/core";

interface IProps {
  highScores: HighScore[];
  gameId: number;
}
interface IState {}

class HighScoreList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    const scoreIndex: number = this.props.highScores
      .map((highScore) => highScore.gameId)
      .indexOf(this.props.gameId);
    const hs = this.props.highScores[scoreIndex];

    return (
      <Grid container spacing={2} style={{ padding: 30 }}>
        {this.props.highScores
          .slice(0, 10)
          .map((highScore: HighScore, index: number) => {
            let nr = index + 1;
            const style = {
              backgroundColor: "white",
            };

            if (highScore.gameId === this.props.gameId) {
              style.backgroundColor = "lightgreen";
            }
            return (
              <Grid key={index} item xs={12}>
                <Grid container spacing={1} style={style}>
                  <Grid item xs={1}>
                    {nr}:
                  </Grid>
                  <Grid item xs={2}>
                    {highScore.score}
                  </Grid>
                  <Grid item xs={9} style={{ textAlign: "left" }}>
                    {highScore.username}
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        {scoreIndex > 10 ? (
          <Grid key={scoreIndex} item xs={12}>
            <Grid
              container
              spacing={1}
              style={{ backgroundColor: "lightgreen" }}
            >
              <Grid item xs={1}>
                {scoreIndex}:
              </Grid>
              <Grid item xs={2}>
                {hs.score}
              </Grid>
              <Grid item xs={9} style={{ textAlign: "left" }}>
                {hs.username}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    );
  }
}

export default HighScoreList;
