import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';

const CONTENT_TABLES = [
  'mysteries',
  'passages',
  'commentaries',
  'images',
  'deeper_references',
];

const migrationsDir = path.join(process.cwd(), 'supabase/migrations');

async function readMigrations() {
  const files = (await readdir(migrationsDir)).filter((name) => name.endsWith('.sql')).sort();
  const bodies = await Promise.all(
    files.map(async (name) => ({
      name,
      sql: await readFile(path.join(migrationsDir, name), 'utf8'),
    })),
  );
  return bodies;
}

test('every content table grants SELECT to anon', async () => {
  const migrations = await readMigrations();
  const sql = migrations.map((migration) => migration.sql).join('\n').toLowerCase();

  for (const table of CONTENT_TABLES) {
    const grant = new RegExp(
      `grant\\s+select\\s+on\\s+table\\s+public\\.${table}\\s+to\\s+anon\\s*;`,
    );
    assert.match(sql, grant, `missing GRANT SELECT on public.${table} to anon`);
  }
});

test('anon content grants do not include writes', async () => {
  const migrations = await readMigrations();
  const grantMigration = migrations.find((migration) =>
    migration.name.includes('grant_anon_select_on_content'),
  );
  assert.ok(grantMigration, 'grant migration is missing');

  assert.doesNotMatch(grantMigration.sql, /\bgrant\s+(insert|update|delete|all|truncate)\b/i);
  assert.doesNotMatch(grantMigration.sql, /\bto\s+authenticated\b/i);
  assert.doesNotMatch(grantMigration.sql, /\bto\s+service_role\b/i);
});
