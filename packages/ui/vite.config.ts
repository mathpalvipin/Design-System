import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    // emits .d.ts files into dist alongside the bundle, without the side-effect CSS imports
    dts({ tsconfigPath: './tsconfig.build.json' }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'index',
    },
    // rolldownOptions replaces the deprecated rollupOptions alias in Vite 8
    rolldownOptions: {
      // react, react-dom and their subpaths (e.g. react/jsx-runtime) stay peer deps
      external: [/^react(-dom)?($|\/)/],
    },
    sourcemap: true,
  },
});
