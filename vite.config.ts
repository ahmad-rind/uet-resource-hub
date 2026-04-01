import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import prerender from "vite-plugin-prerender";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: [
        '/',
        '/browse',
        '/search',
        '/contact',
        '/submit'
      ],
      renderer: new prerender.PuppeteerRenderer({
        renderAfterTime: 3000,
        headless: true
      })
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-supabase': ['@supabase/supabase-js'],
        },
      },
    },
  },
});
