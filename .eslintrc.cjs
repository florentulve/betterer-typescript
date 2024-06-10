/* eslint-env node */
module.exports = {
  plugins: ["@typescript-eslint", "unicorn"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:unicorn/recommended",
  ],
  root: true,
};
