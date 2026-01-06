import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import jsdoc from "eslint-plugin-jsdoc";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["dist/**", ".docs/**", "src/data/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  sonarjs.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    rules: {
      // ===== SonarJS Rules =====

      // Complexity
      "sonarjs/cognitive-complexity": ["error", 15],
      "sonarjs/cyclomatic-complexity": ["error", { threshold: 10 }],
      "sonarjs/nested-control-flow": ["error", { maximumNestingLevel: 4 }],
      "sonarjs/expression-complexity": ["error", { max: 3 }],

      // Code size
      "sonarjs/max-lines-per-function": ["error", { maximum: 200 }],

      // Code quality
      "sonarjs/no-duplicate-string": ["error", { threshold: 3 }],
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-redundant-boolean": "error",
      "sonarjs/no-collapsible-if": "error",
      "sonarjs/no-duplicated-branches": "error",
      "sonarjs/no-identical-conditions": "error",
      "sonarjs/no-inverted-boolean-check": "error",
      "sonarjs/no-gratuitous-expressions": "error",
      "sonarjs/no-nested-switch": "error",
      "sonarjs/no-small-switch": "error",
      "sonarjs/prefer-single-boolean-return": "error",
      "sonarjs/prefer-immediate-return": "error",
      "sonarjs/prefer-object-literal": "error",
      "sonarjs/prefer-while": "error",

      // Best practices
      "sonarjs/no-ignored-return": "error",
      "sonarjs/no-collection-size-mischeck": "error",
      "sonarjs/no-element-overwrite": "error",
      "sonarjs/no-empty-collection": "error",
      "sonarjs/no-extra-arguments": "error",
      "sonarjs/no-use-of-empty-return-value": "error",
      "sonarjs/non-existent-operator": "error",
    },
  },
  {
    files: ["src/**/*.ts"],
    plugins: { jsdoc },
    extends: ["jsdoc/flat/recommended-typescript-error"],
    rules: {
      // ===== JSDoc Rules =====

      // Require JSDoc for public APIs
      "jsdoc/require-jsdoc": [
        "error",
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
        },
      ],

      // Content requirements
      "jsdoc/require-description": "error",
      "jsdoc/require-param": "error",
      "jsdoc/require-param-description": "error",
      "jsdoc/require-returns": "error",
      "jsdoc/require-returns-description": "error",

      // Validation
      "jsdoc/check-param-names": "error",
      "jsdoc/check-tag-names": "error",
      "jsdoc/check-types": "error",

      // Formatting
      "jsdoc/check-alignment": "error",
      "jsdoc/check-indentation": "error",
      "jsdoc/check-line-alignment": ["error", "never"],
      "jsdoc/tag-lines": ["error", "any", { startLines: 1 }],

      // TypeScript-specific: no types in JSDoc (use TS types)
      "jsdoc/no-types": "error",
    },
  },
]);
