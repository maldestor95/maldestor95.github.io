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

const testU = new User('Ludo');
testU.addRound(5);
testU.addRound(10);
testU.addRound(15);
console.log(testU); // User { name: 'Ludo', score: [ 5, 10, 15 ] }
console.log(testU.round(2)); // 15
console.log(testU.round(10)); // null
testU.editRound(1, 0);
console.log(testU); // User { name: 'Ludo', score: [ 5, 0, 15 ] }
console.log(testU.cumul()); // User { name: 'Ludo', score: [ 5, 5, 20 ] }
testU.addRound(10);
testU.addRound(11);
testU.addRound(12);// User { name: 'Ludo', score: [ 5, 0, 15, 10, 11, 12 ] }
testU.deleteRound(2);
console.log(testU); // User { name: 'Ludo', score: [ 5, 0, 10, 11, 12 ] }
console.log(testU.deleteRound(5));
