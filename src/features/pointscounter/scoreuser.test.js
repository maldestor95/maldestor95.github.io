import User from './scoreuser';

describe('Scoreuser', () => {
  test(' test User ', () => {
    const testU = new User('Ludo');
    expect(testU.score).toEqual([0]);
    testU.addRound(5);
    testU.addRound(10);
    testU.addRound(15);
    // console.log(testU); // User { name: 'Ludo', score: [ 5, 10, 15 ] }
    expect(testU.name).toEqual('Ludo');
    expect(testU.round(3)).toBe(15); // 15
    expect(testU.round(10)).toBe(null); // null
    testU.editRound(2, 0);
    expect(testU.score).toEqual([0, 5, 0, 15]);
    expect(testU.cumul).toEqual([0, 5, 5, 20]);
    testU.addRound(10);
    testU.addRound(11);
    testU.addRound(12);
    expect(testU.score).toEqual([0, 5, 0, 15, 10, 11, 12]);
    testU.deleteRound(3);
    expect(testU.score).toEqual([0, 5, 0, 10, 11, 12]);
    expect(testU.deleteRound(10)).toEqual([0, 5, 0, 10, 11, 12]);
  });
});
