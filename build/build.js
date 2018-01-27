const fs = require('fs')
const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const cpr = require('cpr').cpr
const execSync = require('child_process').execSync
const fis3 = require('fis3')
const uglifyjs = require('uglify-js')
const CleanCSS = require('clean-css')
const cssMinify = new CleanCSS()
const crypto = require('crypto')
const config = require('../config')
const pkg = require('../package.json')
const pkgName = pkg.name


const spinner = ora('building for production... \n')
spinner.start()

rm(path.resolve(__dirname, '../dist'), err => {
  if (err) {
    throw err
    spinner.stop()
    process.exit()
  }
  cpr(path.resolve(__dirname, '../src/apps/assets/'), path.resolve(__dirname, '../dist/' + pkgName + '/assets/'), {}, err => {
    if (err) {
      throw err
      spinner.stop()
      process.exit()
    }
    // 通过fis3将vue文件产出为js
    // execSync('fis3 release -d ./dist/' + pkgName + '/output')
    fis3.cli.run({
      _: ['release'],
      d: './dist/' + pkgName + '/output'

    }, {
      cwd: path.resolve(__dirname, '../'),
      configPath: path.resolve(__dirname, '../fis-conf.js'),
    })

    const buildFun = function (lang) {
      // 遍历pages下面的index.js，将对应的文件合并
      const srcBasePath = __dirname + '/../src/apps/pages'
      let langStr = lang ? '/' + lang : '';
      const distBasePath = __dirname + '/../dist/' + pkgName + langStr
      const distPagesBasePath = __dirname + '/../dist/' + pkgName + langStr + '/pages'
      const distCommonBasePath = __dirname + '/../dist/' + pkgName + langStr + '/common'
      const outputBasePath = __dirname + '/../dist/' + pkgName + '/output' + langStr
      const outputPagesBasePath = __dirname + '/../dist/' + pkgName + '/output' + langStr + '/pages'
      let relObj = {} // 用于产出config.js
      relArr = relObj[pkgName] = {}
      relArr.curLang = lang ? lang : '';
      relArr['routers'] = []

      const parsePagesFile = function (curPath, name) {
        let filePath = path.join(srcBasePath, curPath, name)
        let state = fs.statSync(filePath)
        if (state.isDirectory()) {
          let dir = fs.readdirSync(filePath)
          if (name.length > 0) {
            curPath = curPath + '/' + name
          }
          dir.forEach((index) => {
            if (index != 'src')
              parsePagesFile(curPath, index)
          })
        } else if (name === 'index.js') {
          // console.log('get index.js in ' + curPath)
          buildPagesFile(curPath)
        }
      }
      const buildPagesFile = function (curPath) {
        // 合并目录下的文件
        let jsPath = path.join(distPagesBasePath, curPath + '.js')
        let cssPath = path.join(distPagesBasePath, curPath + '.css')

        fs.writeFileSync(jsPath, '')
        fs.writeFileSync(cssPath, '')
        concatFile(curPath, '', 'js')
        concatFile(curPath, '', 'css')
        // 压缩产出的js及css
        // let md5jsFileName = minJsFun(distPagesBasePath, curPath)
        // let md5cssFileName = minCssFun(distPagesBasePath, curPath)
        let md5jsFileName = md5Fun(distPagesBasePath, curPath, 'js')
        let md5cssFileName = md5Fun(distPagesBasePath, curPath, 'css')
        // 记录路由与js css的对应关系
        let routerFile = require(path.join(srcBasePath, curPath, 'index.js'))
        relArr[curPath.slice(1)] = {}
        relArr[curPath.slice(1)]['js'] = md5jsFileName.slice(1)
        relArr[curPath.slice(1)]['css'] = md5cssFileName.slice(1)
        for (let i in routerFile.routes) {
          let oldComponent = routerFile.routes[i]['component'];
          if (oldComponent.indexOf('.') === 0) {
            oldComponent = oldComponent.substring(1);
          }
          routerFile.routes[i]['realComponent'] = curPath.slice(1) + oldComponent;
          routerFile.routes[i]['pkgName'] = pkgName
          routerFile.routes[i]['curPage'] = curPath.slice(1)
        }
        relArr['routers'] = relArr['routers'].concat(routerFile.routes)
      }


      const concatFile = function (srcBasePath, curPath, type) {
        let filePath = path.join(outputPagesBasePath, srcBasePath, curPath)
        let state = fs.statSync(filePath)
        if (state.isDirectory()) {
          let dir = fs.readdirSync(filePath)
          dir.forEach((index) => {
            concatFile(srcBasePath, curPath + '/' + index, type)
          })
        } else {
          if (endsWith(filePath, type) && !endsWith(curPath, 'index.js')) {
            // console.log('get (' + type + ') at :' + filePath)
            // console.log('srcBasePath:' + srcBasePath + '\n\n')
            let c = fs.readFileSync(filePath)
            let p
            if (type === 'js') {
              p = path.join(distPagesBasePath, srcBasePath + '.js')
            } else if (type === 'css') {
              p = path.join(distPagesBasePath, srcBasePath + '.css')
            }
            let b = fs.readFileSync(p)
            fs.writeFileSync(p, b.toString() + ' \n ' + c.toString())
          }
        }
      }
      const minJsFun = function (basePath, name) {
        let b = fs.readFileSync(path.join(basePath, name + '.js'))
        let minJs = uglifyjs.minify(b.toString())
        let md5js = crypto.createHash('md5')
        let md5jsStr = md5js.update(minJs.code).digest('hex')
        let md5jsFileName = name + '.' + md5jsStr + '.js'
        fs.writeFileSync(path.join(basePath, md5jsFileName), minJs.code)
        return md5jsFileName
      }

      const minCssFun = function (basePath, name) {
        let data = fs.readFileSync(path.join(basePath, name + '.css'))
        let minCss = cssMinify.minify(data.toString())
        let md5css = crypto.createHash('md5')
        let md5cssStr = md5css.update(minCss.styles).digest('hex')
        let md5cssFileName = name + '.' + md5cssStr + '.css'
        fs.writeFileSync(path.join(basePath, md5cssFileName), minCss.styles)
        return md5cssFileName
      }

      const md5Fun = function (basePath, name, type) {
        let b = fs.readFileSync(path.join(basePath, name + '.' + type))
        let md5js = crypto.createHash('md5')
        let md5jsStr = md5js.update(b.toString()).digest('hex')
        let md5jsFileName = name + '.' + md5jsStr + '.' + type
        fs.writeFileSync(path.join(basePath, md5jsFileName), b.toString())
        return md5jsFileName
      }
      const endsWith = function (str, endStr) {
        return str.slice(-endStr.length) == endStr
      }
      try{
        fs.mkdirSync(path.resolve(distBasePath))
      }catch(e){
        
      }
      fs.mkdirSync(path.resolve(distPagesBasePath))
      fs.mkdirSync(path.resolve(distPagesBasePath + '/base'))
      fs.mkdirSync(path.resolve(distPagesBasePath + '/busi'))
      fs.mkdirSync(path.resolve(distPagesBasePath + '/sale'))
      // 处理output产出的pages
      parsePagesFile('', '')

      // 处理output其他的产出
      const parseOtherFile = function (curPath, name) {
        let filePath = path.join(outputBasePath, curPath, name)
        if (curPath === '/pages')
          return
        let state = fs.statSync(filePath)
        if (state.isDirectory()) {
          let dir = fs.readdirSync(filePath)
          if (name.length > 0) {
            curPath = curPath + '/' + name
          }
          dir.forEach((index) => {
            parseOtherFile(curPath, index)
          })
        } else {
          let c = fs.readFileSync(filePath)
          let p
          if (endsWith(filePath, 'js')) {
            p = path.join(distCommonBasePath, '/index.js')
          } else if (endsWith(filePath, 'css')) {
            p = path.join(distCommonBasePath, '/index.css')
          }
          if (p) {
            let b = fs.readFileSync(p)
            fs.writeFileSync(p, b.toString() + ' \n ' + c.toString())
          }

        }
      }
      fs.mkdirSync(path.resolve(distCommonBasePath))
      let commonJsPath = path.join(distCommonBasePath, '/index.js')
      let commonCssPath = path.join(distCommonBasePath, '/index.css')
      fs.writeFileSync(commonJsPath, '')
      fs.writeFileSync(commonCssPath, '')
      parseOtherFile('', '')

      // 压缩产出的js及css
      // let md5jsFileName = minJsFun(distCommonBasePath, '/index')
      // let md5cssFileName = minCssFun(distCommonBasePath, '/index')
      let md5jsFileName = md5Fun(distCommonBasePath, '/index', 'js')
      let md5cssFileName = md5Fun(distCommonBasePath, '/index', 'css')
      relArr['common'] = {}
      relArr['common']['js'] = md5jsFileName.slice(1)
      relArr['common']['css'] = md5cssFileName.slice(1)

      fs.writeFileSync(distBasePath + '/config.js', JSON.stringify(relObj))

      //调用rm存在问题因此直接调用系统命令
      // execSync('rm -rf ./dist/output')
      const emptyDir = function (fileUrl) {
        let files = fs.readdirSync(fileUrl); //读取该文件夹
        files.forEach(function (file) {
          let stats = fs.statSync(fileUrl + '/' + file);
          if (stats.isDirectory()) {
            emptyDir(fileUrl + '/' + file);
          } else {
            fs.unlinkSync(fileUrl + '/' + file);
            //  console.log("删除文件"+fileUrl+'/'+file+"成功");
          }
        });
      }
      const rmEmptyDir = function (fileUrl) {
        let files = fs.readdirSync(fileUrl);
        if (files.length > 0) {
          let tempFile = 0;
          files.forEach(function (fileName) {
            tempFile++;
            rmEmptyDir(fileUrl + '/' + fileName);
          });
          if (tempFile == files.length) { //删除母文件夹下的所有字空文件夹后，将母文件夹也删除
            fs.rmdirSync(fileUrl);
            // console.log('删除空文件夹'+fileUrl+'成功');
          }
        } else {
          fs.rmdirSync(fileUrl);
          // console.log('删除空文件夹'+fileUrl+'成功');
        }
      }
      emptyDir(path.resolve(__dirname, '../dist/' + pkgName + '/output' + langStr + '/'));
      rmEmptyDir(path.resolve(__dirname, '../dist/' + pkgName + '/output' + langStr + '/'));
      console.log('Build completed' + lang);
    }

    let langues = config.build.languages;

    if (langues.length > 0) {
      for (let i = 0; i < langues.length; i++) {
        buildFun(langues[i]);
      }
    } else {
      buildFun();
    }


    spinner.stop()
    process.exit()
  });


});