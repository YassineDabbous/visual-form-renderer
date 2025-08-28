import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), dts(), tailwindcss(),],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'DynamicFormRenderer',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // Force all non-JS assets (like CSS) to have a predictable name.
        assetFileNames: (assetInfo) => {
          // Check if the file is a CSS file
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'style.css';
          }
          // Keep the original name for other assets (like fonts, images, etc.)
          return assetInfo.name || 'assets/[name]-[hash][extname]';
        }, 
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
})
