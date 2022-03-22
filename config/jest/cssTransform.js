"use strict";

// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/en/webpack.html

const fs = require("fs");
const path = require("path");
module.exports = {
  process(src, filename) {
    // NOTE: Jest only run process once
    // console.log("cssTransform");
    // console.log("src", src);
    // console.log("filename", filename);
    if (!fs.existsSync("./node_modules/.cache/jest-preview-dom")) {
      fs.mkdirSync("./node_modules/.cache/jest-preview-dom", {
        recursive: true,
      });
    }
    fs.writeFileSync(
      `./node_modules/.cache/jest-preview-dom/${path.basename(filename)}`,
      src,
      {
        flag: "w",
      }
    );
    return "module.exports = {};";
  },
  // TODO: MEDIUM PRIORITY To research about getCacheKey
  // Reference:
  // - https://jestjs.io/docs/code-transformation#writing-custom-transformers
  // - https://github.com/swc-project/jest/blob/17cf883b46c050a485975d8ce96a05277cf6032f/index.ts#L37-L52
  // getCacheKey(src, filename) {
  //   // The output is always the same.
  //   return filename;
  // },
};