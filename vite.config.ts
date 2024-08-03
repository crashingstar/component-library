import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { peerDependencies, dependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ jsxRuntime: "classic" }),
    dts({
      include: ["src/**/*"],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src", "index.ts"),
        buttons: resolve(__dirname, "src/components/Button.tsx"),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        `components/${entryName}/${entryName}.${
          format === "cjs" ? "cjs" : "es.js"
        }`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies),
      ],
      output: { preserveModules: true, exports: "named" },
    },
    target: "esnext",
    sourcemap: true,
  },
});
