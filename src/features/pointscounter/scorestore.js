import Player from './scoreuser';

class ScoreStore {
  constructor(nameListArray) {
    this.store = [];
    nameListArray.forEach((name) => {
      this.addPlayer(name);
    });
  }

  addPlayer(name) {
    const player = new Player(name);
    this.store.push(player);
  }

  deletePlayer(name) {
    const playerPosition = this.playerList.indexOf(name);
    this.store.splice(playerPosition, 1);
  }

  get playerList() {
    return this.store.map((player) => player.name);
  }

  get cumulScores() {
    const cumul = this.store.map((player) => {
      const r = {};
      // r.name = player.name;
      // const cumul = player.cumul[player.cumul.length - 1];
      r[player.name] = player.cumul[player.cumul.length - 1];
      return r;
    });
    return cumul;
  }

  player(name) {
    const result = this.store.filter((pl) => pl.name === name);
    return result[0];
  }

  addRound(roundScore) { // roundScore example [{'name1':'score'},{'name2':'score2'}]
    if (roundScore.length !== this.playerList.length) return null;
    for (let playerid = 0; playerid < roundScore.length; playerid += 1) {
      const element = roundScore[playerid];
      this.store[playerid].addRound(element);
    }
    return false;
  }

  deleteRound(roundNumber) { // roundScore example [{'name1':'score'},{'name2':'score2'}]
    if (roundNumber > this.store[0].score.length) return null;
    for (let playerid = 0; playerid < this.store.length; playerid += 1) {
      this.store[playerid].deleteRound(roundNumber);
    }
    return false;
  }

  editRound(roundNumber, roundScore) { // roundScore example [{'name1':'score'},{'name2':'score2'}]
    if (roundScore.length !== this.playerList.length) return null;
    if (roundNumber > this.store[0].score.length) return null;
    for (let playerid = 0; playerid < roundScore.length; playerid += 1) {
      const element = roundScore[playerid];
      this.store[playerid].editRound(roundNumber, element);
    }
    return false;
  }
}
module.exports = ScoreStore;
