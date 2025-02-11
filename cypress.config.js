const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.bankofcanada.ca/valet",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: false
  }
});