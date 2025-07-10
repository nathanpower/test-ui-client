import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import inject from "@rollup/plugin-inject";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: "127.0.0.1",
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      plugins: [
        inject({
          process: "process",
        }),
      ],
    },
  },
  define: {
    "process.env": {},
  },
});
