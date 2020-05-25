
export interface Feedback {
  index: number;
  character: string,
  feedbackType: "CORRECT" | "NOT_IN_WORD" | "WRONG_PLACE"
}