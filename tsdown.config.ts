import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/types.ts'],
  platform: 'neutral',
  exports: true,
});
