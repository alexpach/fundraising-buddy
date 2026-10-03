import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  resolve: {alias: {'@': fileURLToPath(new URL('./frontend', import.meta.url))}},
  plugins: [tailwindcss(), {name: 'bundle-typography', generateBundle(_, bundle) { for (const file of Object.values(bundle)) { if (file.type === 'chunk') file.code = file.code.replaceAll(String.fromCharCode(0x2014), '-'); } }}],
  build: {
    outDir: 'src/fundraising_buddy/static', emptyOutDir: false,
    lib: {entry: 'frontend/main.tsx', formats: ['es'], fileName: () => 'app.js', cssFileName: 'style'},
    minify: 'esbuild',
    rollupOptions: {onwarn(warning, warn) { if (warning.code !== 'MODULE_LEVEL_DIRECTIVE' && warning.code !== 'SOURCEMAP_ERROR') warn(warning); }, output: {inlineDynamicImports: true, banner: '/*! Spectrum UI: Apache-2.0. See frontend/NOTICE.md, SPECTRUM-LICENSE, and DEPENDENCY-LICENSES.txt in the source release. */'}},
  },
  define: {'process.env.NODE_ENV': JSON.stringify('production')},
});
