const js = require("@eslint/js");

module.exports = [
  {
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        localStorage: "readonly",
        navigator: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        IntersectionObserver: "readonly",
        MutationObserver: "readonly",
        Event: "readonly",
        Node: "readonly",
        Element: "readonly",
        HTMLElement: "readonly",
        CSS: "readonly",
        fetch: "readonly",
        Response: "readonly",
        self: "readonly",
        performance: "readonly",
        URL: "readonly",
        location: "readonly",
        caches: "readonly",
      },
    },
    files: ["**/*.js"],
    rules: {
      // Add or override rules here if needed
    },
  },
];
