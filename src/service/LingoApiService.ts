import {GameState} from "../model/GameState";

class LingoApiService {

  BASE_URL: string = process.env.NODE_ENV;

  startGame(): Promise<GameState> {
    return new Promise(resolve => {
      fetch(this.BASE_URL + "/start?wordLength=0")
        .then(res => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  doGuess(gameId: number, guess: string): Promise<GameState> {
    return new Promise<GameState>((resolve, reject) => {
      fetch( this.BASE_URL + "/guess", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gameId,
          guess
        })
      })
        .then(res => res.json())
        .then((data) => {
          if(data.status && data.status === 500) {
            reject(data.message);
          }
          resolve(data);
        })
    })
  }

}

export default LingoApiService