// @ts-check

import { typescript } from "@betterer/typescript";
import { BettererConstraintResult, smaller, bigger } from "@betterer/constraints";
import { eslint } from "@betterer/eslint";
import eslintPluginUnicorn, { rules } from "eslint-plugin-unicorn";

const unicornRules = eslintPluginUnicorn.configs["flat/recommended"];
const eslintConfig = {};
for (let r of Object.keys(unicornRules.rules)) {
  eslintConfig[r] = "error";
}

export default {
  "no more debuggers": () =>
    eslint({
      "no-console": "error",
    }).include("./src/**/*.ts"),

  "stricter compilation": () =>
    typescript("./tsconfig.json", {
      strict: true,
      noEmit: true,
    })
      .include("./src/**/*.ts")
      //enforce enhancement
      .constraint((result, expected) => {
        const current = result.getIssues().length;
        const previous = expected.getIssues().length;
        if (current < previous) {
          return BettererConstraintResult.better;
        }
        return BettererConstraintResult.worse;
      }),
};
