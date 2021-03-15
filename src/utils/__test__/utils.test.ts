import { formatSeconds, isEmpty } from '../utils';

describe('formatSeconds test', () => {
  it('should return 00:01:30 when formatSeconds(90)', () => {
    const timeStr = formatSeconds(90);
    expect(timeStr).toStrictEqual('1分30秒');
  });

  it('should return 00:01:30 when formatSeconds(4230)', () => {
    const timeStr = formatSeconds(4230);
    expect(timeStr).toStrictEqual('1小时10分30秒');
  });
});

describe('isEmpty test', () => {
  it('should return true when isEmpty({})', () => {
    const empty = isEmpty({});
    expect(empty).toStrictEqual(true);
  });

  it('should return true when isEmpty([])', () => {
    const empty = isEmpty([]);
    expect(empty).toStrictEqual(true);
  });

  it('should return true when isEmpty("")', () => {
    const empty = isEmpty('');
    expect(empty).toStrictEqual(true);
  });

  it('should return false when isEmpty({name: "Hello World"})', () => {
    const empty = isEmpty({ name: 'Hello World' });
    expect(empty).toStrictEqual(false);
  });

  it('should return false when isEmpty([1, 2, 3])', () => {
    const empty = isEmpty({ name: 'Hello World' });
    expect(empty).toStrictEqual(false);
  });
});
