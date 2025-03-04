import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    nodePolyfills() // ✅ Correct usage of the polyfill plugin
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // Fix missing 'global'
      }
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill() // ✅ Ensure this is used properly
      ]
    }
  }
});
