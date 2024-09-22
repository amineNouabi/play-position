// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "@tanstack/query"],
  rules: {
    // turn on errors for prettier
    "prettier/prettier": "error",
  },
};
