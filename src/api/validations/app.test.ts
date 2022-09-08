import { describe, expect, test } from 'vitest';
import { app } from '..';

describe('Testing app', () => {
  test('should be defined', () => {
    expect(app).toBeDefined();
  });
});
