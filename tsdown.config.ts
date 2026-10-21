import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/abolished.ts', 'src/types.ts'],
  platform: 'neutral',
  exports: true,
  publint: { level: 'suggestion' },
  attw: { profile: 'esm-only', level: 'error' },
});
