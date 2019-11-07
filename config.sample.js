module.exports = cy => {
  return {
    urls: [
      {
        url: 'https://www.google.com',
        beforeScreenshot: () => {},
        afterScreenshot: () => {}
      }
    ]
  }
}
