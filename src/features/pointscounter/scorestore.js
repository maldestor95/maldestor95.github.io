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

  player(name) {
    // console.log(this.store[0].name, name);
    const result = this.store.filter((pl) => pl.name === name);
    // console.log(result);
    return result[0];
  }

  /* addRound(roundScore) { // roundScore example [{'name1':'score'},{'name2':'score2'}]
    if (roundScore.length !== this.playerList.length) return null;
    roundScore.map(((rs) => {
      const player = this.store;
    }));
  } */
}
module.exports = ScoreStore;
