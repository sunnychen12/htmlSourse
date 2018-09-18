const path = require("path");
const fs = require("fs");
const rm = require('rimraf');
const UglifyJS = require('uglify-js');
const mkp = require('mkp');
const concatFiles = require('concat-files');

const prepareFiles=function(){
  mkp([
          './dist/css',
          './dist/js',
          './dist/assets/js'
      ], (er) => {
          
          if (er) console.error(er)
          else{
              /*
              common 公共框架合成与压缩
              */
              //合并文件js
              concatFiles(
                  [
                     './src/assets/js/zepto.min.js',
                     './src/assets/js/sm-config.js',
                     './src/assets/js/sm.min.js'
                  ], './dist/js/common.js', function(err) {
                      if (err) throw err
                      else {
                          fs.writeFileSync("./dist/js/common.min.js", UglifyJS.minify({
                              "common.min.js": fs.readFileSync("./dist/js/common.js", "utf8")
                          }).code, "utf8");
                      }
                  }
              )

              fs.writeFileSync("./dist/js/commonLab.min.js", UglifyJS.minify({
                  "commonLab.js": fs.readFileSync("./src/js/commonLab.js", "utf8")
              }).code, "utf8");
              
          }
          
      })


  //合并文件css
  concatFiles(
      [
         './src/assets/css/sm.min.css',
         './src/assets/css/sm-extend.min.css',
         './src/assets/js/crop4/cropper.css'
      ], './dist/css/common.css'
  )
}

module.exports = isProduction => {
  if(isProduction){
    rm(path.resolve(__dirname,'dist'), (err) => {
        if (err) throw err;
        else{
            prepareFiles();
        }
    });
  }
  else{
    prepareFiles();
  }
};