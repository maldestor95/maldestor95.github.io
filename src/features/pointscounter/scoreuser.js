import { v4 as uuidv4 } from 'uuid';

class User {
  constructor(name) {
    this.name = name;
    this.score = [0];
    this.uuid = uuidv4();
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

  resetScore() {
    this.score = [0];
  }

  get cumul() {
    return this.score.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], []);
  }

  get total() {
    return this.cumul[this.cumul.length - 1];
  }
}

export default User;
