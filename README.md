# webpack-react-typescript-init-project

使用react可以直接引入js文件，打开html文件就能看到效果，也可以使用create-react-app去快速的构建react开发环境。在这想自己使用webpack启动react项目，也算是练习下项目搭建。

先介绍一下前面两种使用方式，当然菜鸟教程上也有。

#### 1、引入js文件方式
引入三个库：

react：核心库，包含生成虚拟dom的react.createElement函数以及继承的Component类
react-dom：核心功能是将虚拟dom渲染成实际的dom
babel-eslint：es6转es5，兼容不支持es6的浏览器，并且babel内嵌了对JSX的支持
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Hello React!</title>
<link rel="stylesheet" type="text/css" href="">
<script src="https://cdn.staticfile.org/react/16.4.0/umd/react.development.js"></script>
<script src="https://cdn.staticfile.org/react-dom/16.4.0/umd/react-dom.development.js"></script>
<script src="https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"></script>
</head>
<body>

<div id="root"></div>
<script type="text/babel">
class MainTodoList extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}
	render() {
		return (
			<div>hello world</div>
		)
	}
}
ReactDOM.render(
 	<MainTodoList />,
	document.getElementById("root")
)
</script>
</body>
</html>
```
### 2、create-react-app
create-react-app 是来自于 Facebook，install下载之后，使用create-react-app创建项目，创建的项目是基于webpack+ES6。so easy

```js
npm install create-react-app
create-react-app my-app
cd my-app
npm start
```
在package.json文件中，可以看到使用了react-scripts模块进行启动。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190815104819822.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1NDIzNDMx,size_16,color_FFFFFF,t_70)
走到node_modules文件里的react-scripts文件里，看bin下文件：
处理传进来的参数，根据script变量判断我们跑的命令是哪个，然后走scripts文件下的相应文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190815105821255.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1NDIzNDMx,size_16,color_FFFFFF,t_70)
可以看下这篇文章[create-react-app 源码解析之react-scripts](https://juejin.im/post/5af98aaf518825426d2d4142)
### 3、自主搭建
下面开始我们手把手自己创建项目。

##### 1）模块安装
 - **react相关模板**

```js
npm install react react-dom --save-dev
npm install -D @types/react @types/react-dom
```
在使用webpack+react+typescript时，想进行production编译，但是提示找不到@types react和@types react-dom，所以需要安装这两模块。

 - **webpack模块**
```js
npm install -D webpack webpack-cli webpack-dev-server
```

 - **安装typescript**
```js
npm install -D typescript
```

 - **如果需要使用 Sass 和 SCSS，我们需要其他的 loader**
```js
npm i node-sass sass-loader style-loader css-loader --save-dev
```

 - **将ts代码编译成js代码模块**
```js
npm install -D awesome-typescript-loader
```

 - **babel模块**
```js
npm install -D babel babel-core babel-preset-latest babel-preset-react
```

 - **初始化**
 
 下载模块之后，生成node_modules和package-lock.json文件，需要手动生成package.json文件。生成tsconfig.json文件。
```js
npm init
tsc --init
```

##### 2）创建项目+配置文件

 - **webpack配置**
 
 新建webpack.config.js文件

```js
const path = require("path")
const webpack = require("webpack")
const  HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
// 入口文件
  entry: './src/index.tsx',
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
      // 解析jsx文件类型
        test:/\.jsx?$/,
        // 
        use:{
          loader:"babel-loader",
          options:{
           presets:["@babel/env","@babel/react"]
       	  }
        }
      },
      //配置sass
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
  // 文件引用不需要后缀名 import xx from 'xxx'
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    // @代表src路径
    alias: {
      '@': path.join(__dirname, './src')
    }
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

  //   // new webpack.HotModuleReplacementPlugin() // 引用这个插件配合hot实现热更新
  // ],
  mode: "development"
}
```

 - **tsconfig配置**
 
 tsconfig里指定JSX版本，`"jsx": "react"`配置项注释放出来，将模块处理方式改为用node来处理，`"moduleResolution": "node"`配置项注释放出来
 
 - **.babelrc** 
 
bable主要是支持浏览器兼容问题，低版本浏览器不支持的ES6的新特性语法（eg：let、class...），会通过babel编译成兼容的代码。babel编译会从根目录下的.babelrc 文件读取配置

babel-preset-latest：支持现有所有ECMAScript版本的新特性。

> **es2015**：Babel团队为了方便，将同属ES2015的几十个Transform Plugins集合到babel-preset-es2015一个Preset中，es2015一个配置就可以完成全部ES2015语法的支持。

> **stage-0**：官方预设(preset), 有两种，一个是按年份(babel-preset-es2017)，一个是按阶段(babel-preset-stage-0/1/2/3/4)。stage-0包含1234的内容。

**①、新建.babelrc 文件**，配置如下：

```js
{
  "presets": ["react", "es2015", "stage-0"]
}
```
**②、和webpack配合使用：**

babel作用是转换代码，需要loader去转换，需要配置babel-loader，安装之前，需要先安装babel-core，babel编译器的核心。这个之前我们已经安装了，webpack里也配置了，就在这说明一下为啥安装这些，看看就好，不需要动手。

 - **实例**
 
 项目结构
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190816104444506.png)
配置了typescript，使用tsx后缀

index.tsx
```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/index'

ReactDOM.render (
  <App/>,
  document.getElementById("root")
)
```

components index.tsx

```js
import React,{Component} from 'react'
import Hello from './hello'

export default class App extends Component {
  constructor(props:any){
    super(props);
    this.state={}
  }

  render(){
    return (
      <Hello
        name="typescript"
        amout={3}
      />
    )
  }
}
```
hello.tsx
```js
import React,{Component} from 'react'
import { tsImportEqualsDeclaration } from '@babel/types';

export interface ChildProps {
  amout: number,
  name: string
}
export default class Hello extends Component<ChildProps, {}> {
  constructor(props:any){
    super(props);
    this.state={}
  }

  render(){
    return (
      <div>{this.props.amout}{this.props.name}</div>
    )
  }
}
```
如果修改name: string为name: number，报错。而且父组件在给子组件传参是也会有错误提示，不能讲string类型分配给number类型。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190816104832174.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190816104900427.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1NDIzNDMx,size_16,color_FFFFFF,t_70)
 - **启动**

在package.json文件里配置启动命令：

```js
"scripts": {
    "start": "webpack-dev-server --config webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
执行`npm run start`，就能看到新开浏览器，项目启动完成。start是自己起名，dev也行。
