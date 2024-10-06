import globals from "globals";
import path from "node:path";
import tsParser from "@typescript-eslint/parser";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("@pertrack/eslint-config/base.js"), {
    languageOptions: {
        globals: {
            ...globals.node,
        },
        parser: tsParser,
    },
}];