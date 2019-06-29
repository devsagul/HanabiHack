var path = require('path');
var webpack = require('webpack');
var glob = require('glob');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var entries = {};
var chunks = [];
getEntriesAndChunks();

var config = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      assets: path.join(__dirname,'/app/assets'),
      components: path.join(__dirname,'/app/components'),
      common: path.join(__dirname, '/app/common'),
      root: path.join(__dirname, 'node_modules')
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/vendors.js',
      chunks: chunks,
      minChunks: chunks.length
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/main.css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        "window.jQuery": "jquery"
    })
  ],
  devServer: {
    historyApiFallback: false,
    noInfo: true,
    port: 8002,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/api' : ''}
      }
    },
  },
  devtool: '#eval-source-map',
  performance: {
    hints: false
  }
};

var pages = getHtmls();
pages.forEach(function (pathname) {
  // filename
  var conf = {
    filename: pathname.substring(6, pathname.length - 4) + '/index.html',
    template: 'app/' + pathname + '.html',
  };
  var chunk = pathname.substring(6, pathname.length);
  if (chunks.indexOf(chunk) > -1) {
    conf.inject = 'body';
    conf.chunks = ['vendors', chunk];
  }
  if (process.env.NODE_ENV === 'production') {
    conf.hash = true;
  }
  config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;

function getEntriesAndChunks() {
  glob.sync('./app/pages/**/*.js').forEach(function (name) {
    var n = name.slice(name.lastIndexOf('app/') + 10, name.length -3);
    entries[n] = [name];
    chunks.push(n);
  });
}

function getHtmls() {
  var htmls = [];
  glob.sync('./app/pages/**/*.html').forEach(function (name) {
    var n = name.slice(name.lastIndexOf('app/') + 4, name.length - 5);
    htmls.push(n);
  });
  return htmls;
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]);
}
