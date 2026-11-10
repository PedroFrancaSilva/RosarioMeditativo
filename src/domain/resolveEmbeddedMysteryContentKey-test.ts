import { resolveEmbeddedMysteryContentKey } from '@/domain/resolveEmbeddedMysteryContentKey';

describe('resolveEmbeddedMysteryContentKey', () => {
  it('maps supabase-style session to embedded slug', () => {
    expect(
      resolveEmbeddedMysteryContentKey('550e8400-e29b-41d4-a716-446655440000', {
        type: 'joyful',
        sortOrder: 1,
      }),
    ).toBe('joyful-1');
  });

  it('returns slug when already embedded id', () => {
    expect(resolveEmbeddedMysteryContentKey('joyful-1')).toBe('joyful-1');
  });
});
