export default {
  state: {
    players: [{
      name: 'ceri',
      currentScore: 0,
    },
    {
      name: 'ludo',
      currentScore: 0,
    },
    {
      name: 'ruby',
      currentScore: 0,
    },
    {
      name: 'louis',
      currentScore: 0,
    },
    ],
    playerList: [{
      text: 'round',
      value: 'round',
    },
    {
      text: 'ceri',
      value: 'ceri',
    },
    {
      text: 'ludo',
      value: 'ludo',
    },
    {
      text: 'ruby',
      value: 'ruby',
    },
    {
      text: 'louis',
      value: 'louis',
    },
    ],
    playerScores: [{
      round: 1,
      ceri: 0,
      ludo: 5,
      ruby: 0,
      louis: 5,
    },
    {
      round: 2,
      ceri: 0,
      ludo: 6,
      ruby: 0,
      louis: 5,
    },
    {
      round: 3,
      ceri: 0,
      ludo: 7,
      ruby: 0,
      louis: 5,
    },
    ],
    round: {},
    numberOfPlayers: 4,
  },
  initRound() {
    const listOfPlayers = this.state.players.map((x) => x.name);

    const currentRound = Object.keys(this.state.round);
    const ommittedValue = listOfPlayers.filter((x) => !currentRound.includes(x));
    ommittedValue.forEach((element) => {
      this.state.round[element] = 0;
    });
  },
  AddRound() {
    const RoundNumber = Math.max(...this.state.playerScores.map((x) => x.round)) + 1;
    this.initRound();
    this.state.playerScores.push({
      ...{
        round: RoundNumber,
      },
      ...this.state.round,
    });
    this.state.players.forEach(
      (x) => {
        const z = x;
        z.currentScore = 0;
      },
    );
    Object.keys(this.state.round).forEach(
      (x) => {
        this.state.round[x] = 0;
      },
    );

    localStorage.scoreBoard = JSON.stringify(this.state);
  },
  updateRound(evt) {
    const index = this.state.players.findIndex((elt) => elt.name === evt.name);
    this.state.players[index].currentScore += evt.score;

    this.state.round[evt.name] += evt.score;
  },

  initFromCookies() {
    const t = JSON.parse(localStorage.scoreBoard);
    if (t) {
      this.state = t;
      this.initRound();
      return t;
    }
    this.state.playerScores = [{
      round: 0,
      ceri: 0,
      ludo: 0,
      ruby: 0,
      louis: 0,
    }];
    this.initRound();
    return this.state;
  },
  resetScore() {
    const pList = this.state.players.map((x) => x.name);
    const round0 = {
      round: 0,
    };
    pList.forEach((x) => {
      round0[x] = 0;
    });
    this.state.playerScores = [round0];
    localStorage.scoreBoard = JSON.stringify(this.state);
  },

  getPlayerScores() {
    return this.state.playerScores;
  },
  getPlayers() {
    return this.state.players;
  },
  getPlayerList() {
    return this.state.playerList;
  },
  getRound() {
    return this.state.round;
  },
  getScore(name) {
    const t = this.state.playerScores.map((x) => x[name]);
    if (t.length === 0) {
      return 0;
    }
    return t.reduce((a, b) => a + b);
  },
  // TODO finalise function
  initBoard() {
    this.state.players = [{
      name: 'player1',
      currentScore: 0,
    }];

    this.state.playerList = [{
      text: 'round',
      value: 'round',
    },
    {
      text: 'player1',
      value: 'player1',
    },
    ];

    this.state.playerScores = [{
      round: 1,
      player1: 0,
    }];

    this.numberOfPlayers = 1;
    this.state.round = {
      player1: 0,
    };
  },
  addPlayer(name) {
    this.state.numberOfPlayers += 1;
    this.state.players.push({
      name,
      currentScore: 0,
    });
    this.state.playerList.push({
      text: name,
      value: name,
    });
    this.resetScore();
    this.initRound();
  },
  removePlayer(name) {
    this.state.players = this.state.players.filter((x) => x.name !== name);
    this.state.playerList = this.state.playerList.filter((x) => x.text !== name);
    delete this.state.round[name];
  },
  renamePlayer(oldName, newName) {
    // players
    const tempPlayer = this.state.players.filter((x) => x.name === oldName)[0];
    tempPlayer.name = newName;
    this.state.playerList.forEach((x) => {
      const z = x;
      if (z.text === oldName) {
        z.text = newName;
        z.value = newName;
      }
    });
    // playerScores
    this.state.playerScores.forEach((x) => {
      const z = x;
      z[newName] = z[oldName];
      delete z[oldName];
    });
    // round
    this.state.round[newName] = this.state.round[oldName];
  },
};
