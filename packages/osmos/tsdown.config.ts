import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./modules/*.ts'],
  outDir: './build',
  clean: false,
  format: 'esm',
  minify: 'dce-only',
  fixedExtension: false,
  dts: true,
  treeshake: false,
  sourcemap: false,
  target: 'esnext',
})
