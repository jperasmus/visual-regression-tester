/// <reference types="Cypress" />
const getConfig = require('../../config')

const config = getConfig(cy)

context('Visual Regression Tester', () => {
  const folderName = Date.now()

  config.urls.forEach(({ url, beforeScreenshot, afterScreenshot }) => {
    it(`screenshot url - ${url}`, () => {
      cy.visit(url)

      const fileName = `${folderName}/${url.replace(/\//g, '___')}`

      if (typeof beforeScreenshot === 'function') {
        beforeScreenshot(cy)
      }

      cy.screenshot(fileName, {
        capture: 'fullPage',
        disableTimersAndAnimations: true
      })

      if (typeof afterScreenshot === 'function') {
        afterScreenshot(cy)
      }
    })
  })
})
