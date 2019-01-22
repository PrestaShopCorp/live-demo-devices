// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': (browser) => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#logo')

      // Shop displays FO by default. We expect to see the switch on BO
      .assert.elementCount('.btn-explore-bo', 1)
      .assert.visible('.btn-explore-bo')

      // Acces to FO is hidden by default
      .assert.elementCount('.btn-explore-front', 1)
      .assert.hidden('.btn-explore-front')

      // Start now button
      .assert.elementCount('.btn-download', 1)

      .assert.elementCount('.change-device', 4)
      .end();
  },
};
