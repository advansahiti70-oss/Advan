import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` emits relative asset URLs, so the build works at a domain root
// or under a sub-path such as GitHub Pages (`/<repo>/`) without changes.
export default defineConfig({
  base: './',
  plugins: [react()],
});
