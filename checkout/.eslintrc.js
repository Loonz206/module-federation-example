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
    "next",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 8,
    sourceType: "module",
  },
  plugins: ["react", "sonarjs", "prettier", "jsx-a11y", "react-hooks"],
  rules: {},
  settings: {
    react: {
      version: "detect",
    },
  },
};
