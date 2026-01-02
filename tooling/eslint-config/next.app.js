import {
  common,
  browser,
  node,
  typescript,
  react,
  edge,
  next,
  prettier,
} from "eslint-config-neon";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["**/dist/*", "**/.next/*", "**/next-env.d.ts"],
  },
  ...common,
  ...browser,
  ...node,
  ...typescript,
  ...react,
  ...edge,
  ...next,
  ...prettier,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
];
