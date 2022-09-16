import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'c8',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/src/**/index.ts',
        '**/src/**/*.test.ts'
      ],
    },
    mockReset: true,
  }
})