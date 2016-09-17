var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
    devtool: 'eval',
    entry: [
      <% if (hotLoading) { %>
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
      <% } %>'./app/index.js'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'<% if (hotLoading) { %>, 
        publicPath: '/static/'
        <% } %>  
    },
    module : {
        loaders : [
          <% if (cssModules) { %>
            {
                test : /\.css$/,
                include : APP_DIR + '/',
                loader: 'style!css?module!postcss'
            },
          <% } %>
            {
                test : /\.js$/,
                include : APP_DIR + '/',
                loader: 'babel'
            }
        ]
    },
    plugins: [
        <% if (cssModules) { %>new webpack.HotModuleReplacementPlugin(),<%}%>
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
};

module.exports = config;
