// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel/serverless';

dotenv.config();

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: false } 
  }),
  integrations: [react()]
});