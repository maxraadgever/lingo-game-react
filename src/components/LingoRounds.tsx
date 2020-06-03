import React, { Component } from "react";
import { Round } from "../model/Round";
import { Grid } from "@material-ui/core";
import { Feedback } from "../model/Feedback";
import "./LingoRounds.scss";

interface Props {
  rounds: Array<Round>;
}

class LingoRounds extends Component<Props, any> {
  render() {
    return (
      <Grid container spacing={3}>
        {this.props.rounds
          .sort((a, b) => a.index - b.index)
          .map((round: Round, index: number) => (
            <Grid key={index} item xs={12}>
              <Grid className={"feedbackList"} container spacing={3}>
                {round.feedbackList
                  .sort((a, b) => a.index - b.index)
                  .map((feedback: Feedback, index: number) => (
                    <Grid
                      xs={1}
                      item
                      className={`${feedback.feedbackType} feedbackCharacter`}
                    >
                      {feedback.character}
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          ))}
      </Grid>
    );
  }
}

export default LingoRounds;
