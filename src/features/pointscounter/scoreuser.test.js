import User from './scoreuser';

test('should test User ', () => {
  const testU = new User('Ludo');
  testU.addRound(5);
  testU.addRound(10);
  testU.addRound(15);
  // console.log(testU); // User { name: 'Ludo', score: [ 5, 10, 15 ] }
  expect(testU).toEqual({ name: 'Ludo', score: [5, 10, 15] });
  expect(testU.round(2)).toBe(15); // 15
  expect(testU.round(10)).toBe(null); // null
  testU.editRound(1, 0);
  expect(testU).toEqual({ name: 'Ludo', score: [5, 0, 15] });
  expect(testU.cumul).toEqual([5, 5, 20]);
  testU.addRound(10);
  testU.addRound(11);
  testU.addRound(12);
  expect(testU).toEqual({ name: 'Ludo', score: [5, 0, 15, 10, 11, 12] });
  testU.deleteRound(2);
  expect(testU).toEqual({ name: 'Ludo', score: [5, 0, 10, 11, 12] });
  expect(testU.deleteRound(5)).toEqual([5, 0, 10, 11, 12]);
});
