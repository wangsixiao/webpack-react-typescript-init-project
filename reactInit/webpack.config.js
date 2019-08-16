const path = require("path")
const webpack = require("webpack")
const  HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test:/\.jsx?$/,
        use:{
             loader:"babel-loader",
             options:{
                    presets:["@babel/env","@babel/react"]
                    }
            }
      },
      {
        test: /\.s(a|c)ss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }],
       },
       {
         test: /\.ts(x?)$/,
         use: [
           {
             loader: 'awesome-typescript-loader',
             options: {}
           }
         ]
       }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'] // 文件引用不需要后缀名
  },
  devServer: {
    inline: true, //实时刷新
    hot: true, // 模块热替换机制
    host: '0.0.0.0', //设置服务器的主机号，默认是localhost
    port: 9000,
    compress: true,
    open: true // 打开浏览器，默认false
  },
  // plugins: [
  //   new HtmlWebpackPlugin({ //打包输出HTML
  //     filename: './index.html',
  //     template: 'index.html'
  //   }),
  //   // new webpack.HotModuleReplacementPlugin()
  // ],
  mode: "development"
}