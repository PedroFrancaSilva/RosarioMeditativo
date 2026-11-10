import { preferRemoteList, preferRemoteValue } from '@/domain/meditationContentPrecedence';

describe('meditationContentPrecedence', () => {
  it('prefers remote list when non-empty', () => {
    expect(preferRemoteList([{ id: 'r' }], [{ id: 'e' }])).toEqual([{ id: 'r' }]);
  });

  it('falls back to embedded when remote empty', () => {
    expect(preferRemoteList([], [{ id: 'e' }])).toEqual([{ id: 'e' }]);
    expect(preferRemoteList(null, [{ id: 'e' }])).toEqual([{ id: 'e' }]);
  });

  it('prefers remote scalar when present', () => {
    expect(preferRemoteValue('remote', 'embedded')).toBe('remote');
    expect(preferRemoteValue(null, 'embedded')).toBe('embedded');
  });
});
