# react redux webpack  项目

## 目录
<!-- MarkdownTOC depth=4 autolink=true bracket=round -->

- [开发环境](#开发环境)
    - [开发环境搭建](#开发环境搭建)
- [项目开发](#项目开发)
	- [规范及约定](#规范及约定)
        - [目录规范](#目录规范)
        - [文件规范](#文件规范)
        - [注释规范](#注释规范)

<!-- /MarkdownTOC -->


****************

<span id="开发环境"></span>
## 开发环境
本项目采用react开发，构建工具是webpack，路由采用react-router 4.0，状态的管理采用redux，这些工具都是当前最新版本的，@dateTime 2018-02-07

<span id="开发环境搭建"></span>
### 开发环境搭建
* node.js安装
可以去[node.js官网](https://nodejs.org/en/download/){:target="_blank"}下载安装包进行安装。

* npm使用
安装了node.js以后，即可使用npm包管理器安装node.js模块。

* webpack全局安装
打开命令提示符，执行`npm install webpack -g`

* 初始化开发环境
在根目录下执行`npm install`即可自动安装构建工具, 需要用到的模块已在package.json配置好。也可根据自己需要自行安装其它模块。（注：如安装报错，可尝试直接再次执行`npm install`）

<span id="项目开发"></span>
## 项目开发


<span id="规范及约定"></span>
### 规范及约定

为提高工作效率，减少重复造轮子的工作，本项目推崇组件化开发模式。另外，因项目参与人员过多，为便于维护管理，现做约定如下：

<span id="目录规范"></span>
#### 目录规范
##### I. 公共目录
项目有个公共文件夹 用于存放本项目相关的公共文件

1. ** /public/src ** 目录为公共文件源码目录，此目录下的文件可以通过更改webpack.public里面的配置编译压缩成static里面的静态文件

2. ** /public/static ** 目录为公共静态文件目录，用于存放编译过的公共文件和公共的组件等

##### II. 项目目录
项目目录位于** /src/ **。此处约定源文件目录规范（src目录），项目结构后面会提到

1. ** src/css ** 目录为样式表存放目录，所有的样式表均存放于此目录

2. ** src/js ** 目录为js文件存放目录。

3. ** src/img ** 目录为img文件存放目录。

<span id="文件规范"></span>
#### 文件规范
1. 项目文件命名统一采用驼峰式，如：lightBeauty.html。

2. **js入口文件必须命名为index.{js}，以便构建工具自动识别。示例：index.js。**

3. css文件可用@import导入公共文件，随后webpck构建工具将自动合并。

4. 组件开发时，尽可能考虑其复用性。对于通用性较高的组件，可提取为公共组件，并提升至** public/src/static **目录。

<span id="注释规范"></span>
#### 注释规范
1. 函数或方法的注释采用如下格式，用sublime的可以尝试DocBlockr插件。
	/**
	* [foo description]
	* @param  {[type]} arg1 [description]
	* @param  {[type]} arg2 [description]
	* @return {[type]}      [description]
	*/
	function foo(arg1, arg2){
	}

2. react组件的注释采用如下格式：
	/**
	* [MyComponent description]
	* @prop {[type]}  prop1  [description]
	* @prop {[type]}  prop2  [description]
	*/
	var MyComponent = React.createClass({
	});

<span id="项目构建及发布"></span>
### 项目构建及发布待更新。。。
