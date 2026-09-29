const States = {
  PAUSED: "paused",
  PLAYING: "playing",
  ROUND_OVER: "round_over",
  FINISHED: "finished",
};

/* Sistema de rounds tipo boxeo: cada round se juega hasta
pointsToWinRound (usando el valor de zona de la intervención de
básquet), y el partido lo gana quien primero gane roundsToWinMatch
rounds. Esto reemplaza la regla base de "primero a 10 puntos".*/
class GameState {
  constructor({ pointsToWinRound = 11, roundsToWinMatch = 3 } = {}) {
    this.state = States.PAUSED;
    this.pointsToWinRound = pointsToWinRound;
    this.roundsToWinMatch = roundsToWinMatch;

    this.scoreP1 = 0;
    this.scoreP2 = 0;
    this.roundsWonP1 = 0;
    this.roundsWonP2 = 0;
    this.currentRound = 1;

    this.lastRoundWinner = null;
    this.winner = null;
  }

  start() {
    if (this.state === States.PAUSED) {
      this.state = States.PLAYING;
    }
  }

  startNextRound() {
    if (this.state === States.ROUND_OVER) {
      this.state = States.PLAYING;
    }
  }

  isPlaying() {
    return this.state === States.PLAYING;
  }

  isPaused() {
    return this.state === States.PAUSED;
  }

  isRoundOver() {
    return this.state === States.ROUND_OVER;
  }

  isFinished() {
    return this.state === States.FINISHED;
  }

  // Suma los puntos que valga la zona donde entró la pelota y decide
  // si el round o el partido terminan.
  addPoints(player, points) {
    if (player === 1) this.scoreP1 += points;
    else this.scoreP2 += points;

    const roundWinnerReached =
      this.scoreP1 >= this.pointsToWinRound || this.scoreP2 >= this.pointsToWinRound;

    if (!roundWinnerReached) return;

    this.lastRoundWinner = player;
    if (player === 1) this.roundsWonP1 += 1;
    else this.roundsWonP2 += 1;

    this.scoreP1 = 0;
    this.scoreP2 = 0;

    const matchWon =
      this.roundsWonP1 >= this.roundsToWinMatch || this.roundsWonP2 >= this.roundsToWinMatch;

    if (matchWon) {
      this.winner = player;
      this.state = States.FINISHED;
    } else {
      this.currentRound += 1;
      this.state = States.ROUND_OVER;
    }
  }

  reset() {
    this.scoreP1 = 0;
    this.scoreP2 = 0;
    this.roundsWonP1 = 0;
    this.roundsWonP2 = 0;
    this.currentRound = 1;
    this.lastRoundWinner = null;
    this.winner = null;
    this.state = States.PAUSED;
  }
}