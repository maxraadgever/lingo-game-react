import { GameState } from "../model/GameState";
import { HighScore } from "../model/HighScore";

class LingoApiService {
  BASE_URL: string =
    process.env.REACT_APP_BASE_URL || "http://localhost:8081/api/";

  startGame(): Promise<GameState> {
    return new Promise((resolve) => {
      fetch(this.BASE_URL + "/game/start?wordLength=0")
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  doGuess(gameId: number, guess: string): Promise<GameState> {
    return new Promise<GameState>((resolve, reject) => {
      fetch(this.BASE_URL + "/game/guess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId,
          guess,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status && data.status === 500) {
            reject(data.message);
          }
          resolve(data);
        });
    });
  }

  getHighScores(): Promise<HighScore[]> {
    return new Promise<HighScore[]>((resolve) => {
      fetch(this.BASE_URL + "/highscore")
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  addHighScore(username: string, gameId: number): Promise<any> {
    return new Promise((resolve) => {
      fetch(this.BASE_URL + "/highscore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId,
          username,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  }
}

export default LingoApiService;
