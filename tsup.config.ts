import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    outDir: 'build',
    dts: true,
    format: ['cjs', 'esm'],
    splitting: false,
    sourcemap: true,
    clean: true
})
