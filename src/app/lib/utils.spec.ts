import Utils from './utils';

describe('Utils', () => {
  describe('formatDate', () => {
    it('should format a date correctly', () => {
      const date = new Date(2021, 9, 1);
      expect(Utils.formatDate(date)).toEqual('01-10-2021');
    });
  });
});
