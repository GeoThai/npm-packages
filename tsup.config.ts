import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    dts: true,
    format: ['cjs', 'esm'],
    splitting: true,
    sourcemap: true,
    clean: true,
    minify: true
})
