import {Feedback} from "./Feedback";

export interface Round {
  index: number,
  guess: string,
  feedbackList: Array<Feedback>,
}