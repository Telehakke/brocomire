import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { default as react, reactCompilerPreset } from "@vitejs/plugin-react";
import type { Config } from "eslint-plugin-boundaries";
import { recommended } from "eslint-plugin-boundaries/config";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig, lazyPlugins } from "vite-plus";

const eslintBoundariesConfig: Config = {
  settings: {
    ...recommended.settings,
    // @ts-ignore
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    "boundaries/elements": [
      { type: "domain", pattern: "src/domain/**" },
      { type: "application", pattern: "src/application/**" },
      { type: "infrastructure", pattern: "src/infrastructure/**" },
      { type: "presentation", pattern: "src/presentation/**" },
    ],
    "boundaries/files": [{ category: "test", pattern: "**/*.test.ts" }],
  },
  rules: {
    ...recommended.rules,
    "boundaries/dependencies": [
      "error",
      {
        default: "allow",
        policies: [
          // Domain層のルール
          {
            from: { element: { type: "domain" } },
            disallow: {
              to: {
                element: { type: "application" },
              },
            },
            message: "Domain層でApplication層をimportしてはいけません",
          },
          {
            from: { element: { type: "domain" } },
            disallow: {
              to: {
                element: { type: "infrastructure" },
              },
            },
            message: "Domain層でInfrastructure層をimportしてはいけません",
          },
          {
            from: { element: { type: "domain" } },
            disallow: {
              to: {
                element: { type: "presentation" },
              },
            },
            message: "Domain層でPresentation層をimportしてはいけません",
          },
          // Application層のルール
          {
            from: { element: { type: "application" } },
            disallow: {
              to: {
                element: { type: "infrastructure" },
              },
            },
            message: "Application層でInfrastructure層をimportしてはいけません",
          },
          {
            from: { element: { type: "application" } },
            disallow: {
              to: {
                element: { type: "presentation" },
              },
            },
            message: "Application層でPresentation層をimportしてはいけません",
          },
          // テストファイルは依存の向きを制限しない
          {
            from: { file: { categories: "test" } },
            allow: { to: { element: { type: "*" } } },
          },
        ],
      },
    ],
  },
};

// https://vite.dev/config/
export default defineConfig({
  fmt: {
    sortTailwindcss: true,
    ignorePatterns: ["dev-dist/**", "docs/**"],
  },
  lint: {
    plugins: ["react", "typescript", "oxc"],
    settings: {
      ...eslintBoundariesConfig.settings,
    },
    rules: {
      "react/rules-of-hooks": "error",
      "react/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
      "vite-plus/prefer-vite-plus-imports": "error",
      "typescript/explicit-function-return-type": "error",
      "typescript/strict-boolean-expressions": "error",
      "typescript/unbound-method": "error",
      ...eslintBoundariesConfig.rules,
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
      "eslint-plugin-boundaries",
    ],
    ignorePatterns: ["dev-dist/**", "docs/**"],
  },
  // @ts-ignore
  plugins: lazyPlugins(() => [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    VitePWA({
      includeAssets: ["favicon.svg"],
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      manifest: {
        name: "ブラコミリ",
        short_name: "ブラコミリ",
        theme_color: "#ffffff",
        display: "fullscreen",
        lang: "ja",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ]),
  build: {
    outDir: "docs",
    rolldownOptions: {
      output: {
        codeSplitting: {
          minSize: 20000,
          groups: [{ name: "vendor", test: /node_modules/ }],
        },
      },
    },
  },
  server: { host: true },
  base: "/brocomire",
});
