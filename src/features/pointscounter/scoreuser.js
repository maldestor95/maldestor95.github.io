class User {
  constructor(name) {
    this.name = name;
    this.score = [];
  }

  round(number) {
    if (number <= this.score.length) { return this.score[number]; }
    return null;
  }

  deleteRound(number) {
    if (number <= this.score.length) {
      this.score.splice(number, 1);
    }
    return this.score;
  }

  editRound(roundnumber, score) {
    if (roundnumber <= this.score.length) {
      this.score[roundnumber] = score;
      return true;
    }
    return false;
  }

  addRound(score) {
    this.score = [...this.score, score];
  }

  cumul() {
    return this.score.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], []);
  }
}

module.exports = User;
