import ScoreStore from './scorestore';

describe('ScoreStore', () => {
  test('ScoreStore add & delete player', () => {
    const Scores = new ScoreStore([]);
    expect(Scores.store).toStrictEqual([]);
    Scores.addPlayer('toto');
    Scores.addPlayer('titi');
    expect(Scores.playerList).toStrictEqual(['toto', 'titi']);
    Scores.deletePlayer('toto');
    expect(Scores.playerList).toStrictEqual(['titi']);
  });
  test('initiate from list of name & get list of players', () => {
    const Scores = new ScoreStore(['alpha', 'beta', 'gamma']);
    expect(Scores.playerList).toStrictEqual(['alpha', 'beta', 'gamma']);
  });
  test('Player by  name', () => {
    const Scores = new ScoreStore(['alpha', 'beta', 'gamma']);
    expect(Scores.player('alpha').name).toStrictEqual('alpha');
  });
  test('add round', () => {
    const Scores = new ScoreStore(['alpha', 'beta', 'gamma']);
    Scores.addRound([1, 10, 20]);
    expect(Scores.player('alpha').score).toEqual([1]);
    Scores.addRound([2, 10, 20]);
    expect(Scores.player('alpha').score).toEqual([1, 2]);
    expect(Scores.player('gamma').score).toEqual([20, 20]);
  });
  test('delete round', () => {
    const Scores = new ScoreStore(['alpha', 'beta', 'gamma']);
    Scores.addRound([1, 10, 20]);
    Scores.addRound([2, 11, 21]);
    Scores.addRound([3, 12, 22]);
    Scores.addRound([4, 13, 23]);
    expect(Scores.player('alpha').score).toEqual([1, 2, 3, 4]);
    Scores.deleteRound(2);
    expect(Scores.player('alpha').score).toEqual([1, 2, 4]);
  });
  test('edit round', () => {
    const Scores = new ScoreStore(['alpha', 'beta', 'gamma']);
    Scores.addRound([1, 10, 20]);
    Scores.addRound([2, 11, 21]);
    Scores.addRound([3, 12, 22]);
    Scores.addRound([4, 13, 23]);
    expect(Scores.player('alpha').score).toEqual([1, 2, 3, 4]);
    Scores.editRound(2, [200, 201, 202]);
    expect(Scores.player('alpha').score).toEqual([1, 2, 200, 4]);
  });
  test('get cumulative Score', () => {
    const Scores = new ScoreStore(['alpha 1', 'beta 1']);
    Scores.addRound([1, 10]);
    Scores.addRound([2, 11]);
    Scores.addRound([3, 12]);
    Scores.addRound([4, 13]);
    expect(Scores.cumulScores).toEqual([{ 'alpha 1': 10 }, { 'beta 1': 46 }]);
  });
});
