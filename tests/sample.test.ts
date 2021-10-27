import add from './sample';

describe('sample test - add function test', () => {
  it('should return 3 with 1, 2', () => {
    expect(add(1, 2)).toBe(3);
  });
});
