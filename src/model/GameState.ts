import {Round} from "./Round";


export interface GameState {
  gameId: number,
  progress: string,
  rounds: Array<Round>
  finished: boolean
}