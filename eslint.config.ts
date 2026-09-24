import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import boundaries, { Config } from "eslint-plugin-boundaries";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const eslintBoundariesConfig: Config = {
    languageOptions: {
        parser: tsParser,
    },
    plugins: { boundaries },
    settings: {
        ...boundaries.configs.recommended.settings,
        // @ts-expect-error  Type is missing
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
        ...boundaries.configs.recommended.rules,
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
                        message:
                            "Domain層でApplication層をimportしてはいけません",
                    },
                    {
                        from: { element: { type: "domain" } },
                        disallow: {
                            to: {
                                element: { type: "infrastructure" },
                            },
                        },
                        message:
                            "Domain層でInfrastructure層をimportしてはいけません",
                    },
                    {
                        from: { element: { type: "domain" } },
                        disallow: {
                            to: {
                                element: { type: "presentation" },
                            },
                        },
                        message:
                            "Domain層でPresentation層をimportしてはいけません",
                    },
                    // Application層のルール
                    {
                        from: { element: { type: "application" } },
                        disallow: {
                            to: {
                                element: { type: "infrastructure" },
                            },
                        },
                        message:
                            "Application層でInfrastructure層をimportしてはいけません",
                    },
                    {
                        from: { element: { type: "application" } },
                        disallow: {
                            to: {
                                element: { type: "presentation" },
                            },
                        },
                        message:
                            "Application層でPresentation層をimportしてはいけません",
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

export default defineConfig([
    globalIgnores(["dist", "dev-dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            eslintBoundariesConfig,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: tsParser,
            parserOptions: {
                projectService: {
                    allowDefaultProject: ["eslint.config.ts"],
                },
            },
        },
        rules: {
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/strict-boolean-expressions": "error",
            "@typescript-eslint/unbound-method": "error",
        },
    },
]);
