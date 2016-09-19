var generators = require('yeoman-generator');
var str = require('underscore.string');

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);
  },
  prompting: function () {
    var cb = this.async();
    
    return this.prompt([{
      type    : 'input',
      name    : 'title',
      message : 'What is the name of your app?',
      default : this.appname
    },{
      type    : 'confirm',
      name    : 'cssModules',
      message : 'Would you like to enable css Modules?'
    },{
      type    : 'confirm',
      name    : 'hotLoading',
      message : 'Would you like to enable hotloading?'
    },{
      type    : 'confirm',
      name    : 'devTool',
      message : 'Would you like to enable React Dev Tool?'
    }], function (answers) {
      // this._createIndexFile(answer.name);
      this.title = answers.title;
      this.cssModules = answers.cssModules;
      this.hotLoading = answers.hotLoading;
      this.devTool = answers.devTool;
      cb();
    }.bind(this));
  },
  createPackageJson: function () {
    this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {title: str.dasherize(this.title)}
    )
  },
  writeReducerJs: function () {
    this.fs.copyTpl(
        this.templatePath('app/reducers/index.js'),
        this.destinationPath('app/reducers/index.js')
    )
  },
  createDistDir: function () {
    this.fs.copyTpl(
        this.templatePath('_empty.txt'),
        this.destinationPath('dist/.gitkeep')
    )
  },
  installRedux: function () {
    this.npmInstall(['react', 'react-dom', 'redux', 'react-redux'], {'saveDev': true});
    this.npmInstall(['webpack', 'babel-loader', 'babel-preset-es2015', 'babel-preset-react'], {'saveDev': true});
  },
  createBabelRc: function () {
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'),
      {hotLoading: this.hotLoading}
    );
  },
  installCssModules: function () {
    if (this.cssModules) {
      this.npmInstall(['style-loader','css-loader', 'postcss-loader'], {'saveDev': true});
    }
  },
  writeCssFiles: function () {
    if (this.cssModules) {
      this.fs.copyTpl(
        this.templatePath('_empty.txt'),
        this.destinationPath('app/components/App/style.css')
      );
      this.fs.copyTpl(
        this.templatePath('_empty.txt'),
        this.destinationPath('app/components/Title/style.css')
      );
    }
  },
  writeComponents: function () {
    this.fs.copyTpl(
      this.templatePath('app/components/App/index.js'),
      this.destinationPath('app/components/App/index.js'),
      {cssModules: this.cssModules}
    );
    this.fs.copyTpl(
      this.templatePath('app/components/Title/index.js'),
      this.destinationPath('app/components/Title/index.js'),
      {cssModules: this.cssModules}
    );
  },
  
  installHotLoading: function () {
    if (this.cssModules) {
      this.npmInstall(['react-hot-loader@^1.0.0'], {'saveDev': true});
    }
  },
  createServer: function () {
    this.npmInstall(['webpack-dev-server'], {'saveDev': true});
    this.fs.copyTpl(
        this.templatePath('server.js'),
        this.destinationPath('server.js'),
        {hotLoading: this.hotLoading}
    );
  },
  createWebpackConfig: function () {
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {cssModules: this.cssModules, hotLoading: this.hotLoading}
    );
  },
  createIndexHtml: function () {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      { title: this.title, hotLoading: this.hotLoading}
    );
  },
  writeAppJs: function () {
    this.fs.copyTpl(
        this.templatePath('app/index.js'),
        this.destinationPath('app/index.js'),
        {devTool: this.devTool}
    );
  },
  installReduxDevTool: function () {
    this.npmInstall(['redux-devtools'], {'saveDev': true});
  }
  
});
