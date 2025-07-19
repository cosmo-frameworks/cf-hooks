import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(() => ({
  plugins: [dts()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ReactHooksLib",
      fileName: (format) => `react-hooks-lib.${format}.js`,
    },
    rollupOptions: {
      external: ["react"],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/setupTests.ts",
        "**/index.ts",
        "**/*.d.ts",
        "**/*.config.*",
        "dist/",
        "build/",
      ],
    },
  },
}));
