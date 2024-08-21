beforeAll(() => {
  console.log('sad');
});

describe('test', () => {
  describe('first tests', () => {
    console.error('tests e2e');
    expect('music').toBe('music');
  });
});
