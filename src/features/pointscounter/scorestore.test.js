import ScoreStore from './scorestore';

test('ScoreStore', () => {
  const Scores = new ScoreStore([]);
  expect(Scores.store).toStrictEqual([]);
  Scores.addPlayer('toto');
  Scores.addPlayer('titi');
  expect(Scores.playerList).toStrictEqual(['toto', 'titi']);
  Scores.deletePlayer('toto');
  expect(Scores.playerList).toStrictEqual(['titi']);
});
test('initiate ScoreStore from list of name', () => {
  const Scores = new ScoreStore(['alpha', 'beta', 'gamma']);
  expect(Scores.playerList).toStrictEqual(['alpha', 'beta', 'gamma']);
});
test('Player by  name', () => {
  const Scores = new ScoreStore(['alpha', 'beta', 'gamma']);
  // console.log(Scores.player('alpha'));
  expect(Scores.player('alpha').name).toStrictEqual('alpha');
});
