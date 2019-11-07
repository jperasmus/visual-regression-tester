const path = require('path')
const fs = require('fs-extra')
const looksSame = require('looks-same')
const getConfig = require('./config')
const { urlToFileName } = require('./helpers')

const SCREENSHOT_BASE_PATH = 'screenshots/tester.js/'

console.log('Starting to compare screenshots...')

const dirs = fs
  .readdirSync(SCREENSHOT_BASE_PATH, { withFileTypes: true })
  .reduce((acc, dirent) => {
    if (dirent.isDirectory()) {
      acc.push(dirent.name)
    }
    return acc
  }, [])
  .sort()
  .reverse()

const latestDir = dirs[0]
const previousDir = dirs[1]

if (!latestDir || !previousDir) {
  console.warn('Nothing to compare')
  process.exit(0)
}

const config = getConfig()

config.urls.forEach(({ url, diffThreshold = 0.5 }) => {
  try {
    const fileName = `${urlToFileName(url)}.png`
    const imgLatest = path.join(SCREENSHOT_BASE_PATH, latestDir, fileName)
    const imgPrevious = path.join(SCREENSHOT_BASE_PATH, previousDir, fileName)
    const diffDir = `screenshots/diff/${previousDir}-${latestDir}`
    const diffFileName = `${diffDir}/${urlToFileName(url)}.png`

    looksSame(imgLatest, imgPrevious, function(error, { equal } = {}) {
      if (error) {
        return console.error(error)
      }

      if (equal) {
        return console.log(`✅ - "${url}"`)
      }

      if (equal === undefined) {
        return console.log(`⚠️ - failed to read "${url}"`)
      }

      console.log(`❌ - "${url}"`)

      fs.ensureDirSync(diffDir)

      looksSame.createDiff(
        {
          reference: imgPrevious,
          current: imgLatest,
          diff: diffFileName,
          highlightColor: '#ff00ff', // color to highlight the differences
          strict: false, // strict comparsion
          tolerance: 2.5,
          antialiasingTolerance: 0,
          ignoreAntialiasing: true, // ignore antialising by default
          ignoreCaret: true // ignore caret by default
        },
        function(diffError) {
          if (diffError) {
            return console.error(diffError)
          }
        }
      )
    })

    // fs.outputFileSync(diffFileName, PNG.sync.write(diff))
  } catch (error) {
    console.error(error)
  }
})
