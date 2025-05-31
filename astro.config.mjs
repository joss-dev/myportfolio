// @ts-check
import { defineConfig } from 'astro/config';
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

dotenv.config();

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      visualizer({
        emitFile: true,
        filename: "stats.html",
      })
    ],
  },
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false } 
  }),
  integrations: [react()]
});