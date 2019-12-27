module.exports = {
    root: true,
    extends: [
        "@sharegate/eslint-config-recommended",
        "@sharegate/eslint-config-lodash",
    ],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2018
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    rules: {
        "linebreak-style": ["warn", "unix"]
    }
};
