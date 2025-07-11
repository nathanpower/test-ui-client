import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import inject from "@rollup/plugin-inject";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
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
        ...(mode === "analyze"
          ? [
              visualizer({
                emitFile: true,
                filename: `bundle-stats/index.html`,
                gzipSize: true,
              }),
            ]
          : []),
      ],
    },
  },
  define: {
    "process.env": {},
  },
}));
