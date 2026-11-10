import { mysteryContentSlug, resolveMysteryContentTarget } from '@/domain/resolveMysteryContentTarget';

describe('resolveMysteryContentTarget', () => {
  it('builds slug from type and sort order', () => {
    expect(mysteryContentSlug('joyful', 1)).toBe('joyful-1');
  });

  it('returns target when hints and id are present', () => {
    const target = resolveMysteryContentTarget('uuid-123', { type: 'joyful', sortOrder: 1 });
    expect(target).toEqual({
      contentSlug: 'joyful-1',
      supabaseMysteryId: 'uuid-123',
      type: 'joyful',
      sortOrder: 1,
    });
  });

  it('returns null without hints', () => {
    expect(resolveMysteryContentTarget('uuid-123')).toBeNull();
  });
});
