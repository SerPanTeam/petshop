// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import svgr from 'vite-plugin-svgr';

// export default defineConfig({
//   plugins: [
//     react(),
//     svgr(), // Для экспорта ReactComponent
//   ],
// });

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
