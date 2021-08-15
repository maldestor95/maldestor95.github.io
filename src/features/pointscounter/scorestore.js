import Player from './scoreuser';

class ScoreStore {
  constructor(nameListArray) {
    this.store = [];
    if (nameListArray.length > 0) {
      nameListArray.forEach((name) => {
        this.addPlayer(name);
      });
    }
  }

  reinit(storageData) {
    this.store = [];
    const inputData = JSON.parse(storageData).store;
    inputData.forEach((pl) => {
      const newPlayer = new Player(pl.name);
      newPlayer.score = JSON.parse(JSON.stringify(pl.score));
      newPlayer.uuid = JSON.parse(JSON.stringify(pl.uuid));
      this.store.push(newPlayer);
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
    return this.store.map((player) => ({ name: player.name, id: player.uuid }));
  }

  get cumulScores() {
    const cumul = this.store.map((player) => {
      const r = {};
      r[player.name] = player.cumul[player.cumul.length - 1];
      return r;
    });
    return cumul;
  }

  getScore(uuid) {
    return this.store.filter((pl) => pl.uuid === uuid)[0].total;
  }

  player(name) {
    const result = this.store.filter((pl) => pl.name === name);
    return result[0];
  }

  addRound(roundScore) { // roundScore example [{'name1':'score'},{'name2':'score2'}]
    // if (roundScore.length !== this.playerList.length) return null;
    for (let playerid = 0; playerid < roundScore.length; playerid += 1) {
      const element = roundScore[playerid];
      this.store[playerid].addRound(element.roundData);
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

  resetScores() {
    for (let playerid = 0; playerid < this.store.length; playerid += 1) {
      this.store[playerid].resetScore();
    }
  }

  newGame(prefix) {
    for (let playerid = 0; playerid < this.store.length; playerid += 1) {
      if (this.store[playerid].name === undefined) { this.store[playerid].rename(`${prefix}${playerid}`); }
    }
    this.resetScores();
  }
}
export default ScoreStore;
