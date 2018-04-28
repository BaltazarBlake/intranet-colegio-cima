// https://github.com/michael-ciniawsky/postcss-load-config

// const brw = require('package.json');

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      "browsers": [
        "> 1%",
        "last 2 versions",
        "not ie <= 8"
      ]
    }
  }
}
