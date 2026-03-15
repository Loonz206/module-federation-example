module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react-hooks/recommended",
    "standard",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:sonarjs/recommended",
    "plugin:@typescript-eslint/recommended",
    "next",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["react", "sonarjs", "prettier", "jsx-a11y", "react-hooks", "@typescript-eslint"],
  rules: {},
  settings: {
    react: {
      version: "detect",
    },
  },
};
