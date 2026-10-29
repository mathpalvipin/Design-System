import { defineConfig } from 'vite';

export default defineConfig({
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
