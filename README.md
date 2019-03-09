# React Typescript Admin 开发说明文档

该项目由 [Create React App](https://github.com/facebook/create-react-app) 提供技术支持

## 🔨 运行环境

* node >= 8.9.0
* typescript >= 3.0
* yarn >= 1.14.0 or npm >= 6.7.0
* git >= 2.10.1

## 🔧 开发环境

* [VS Code](https://code.visualstudio.com/)
* [Chrome](https://www.google.com/chrome/)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en-US)
* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en-US)
* [Node](https://nodejs.org/en/)
* [Typescript](https://github.com/Microsoft/TypeScript)
* [Mac命令行工具](https://zhuanlan.zhihu.com/p/53380250)

## ✨ VSCode插件推荐

* [GitLens](https://gitlens.amod.io)
* [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
* [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
* [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
* [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)
* [Path Autocomplete](https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete)
* [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
* [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

## 👣 可运行的命令

在该项目目录下, 你可以运行以下命令:

`yarn start` or `npm start`

以开发模式运行该项目
然后打开Chrome浏览器访问[http://localhost:3000](http://localhost:3000).

`yarn test` or `npm test`

以监控模式运行Jest测试用例，编写测试的时候可以用此命令
相关详情请阅读[running tests](https://facebook.github.io/create-react-app/docs/running-tests)

`yarn jest` or `npm jest`

以普通模式运行Jest测试用例

`yarn build` or `npm run build`

构建生产资源到 `build` 目录, 此时环境变量为`production`
相关详情请阅读 [deployment](https://facebook.github.io/create-react-app/docs/deployment)

`yarn check` or `npm run check`

TSLint 语法检查，检查Typescript文件是否符合 tslint.json 配置规范
相关详情请阅读 [TSLint Rules](https://github.com/palantir/tslint/tree/master/test/rules)

`yarn tslint` or `npm run tslint`

自动修复不符合tslint.json规范的代码，遇到`git commit`提交报tslint错误时，可以运行此命令修复

## 🏯项目架构说明

### 项目目录结构

``` Typescript
.
├── mock/                         # 模拟数据服务
│   └── ...
├── public/                       # 静态资源文件（包括css, images, fonts, index.html等）
│   └── ...
├── src/
│   ├── components/               # 公用React组件
│   │   └── ...
│   ├── models/                   # Dva数据Store层
│   │   └── ...
│   ├── pages/                    # 页面模块
│   │   └── ...
│   ├── routes/                   # App页面路由配置
│   │   └── ...
│   ├── services/                 # API请求服务
│   │   └── ...
│   ├── style/                    # 通用CSS样式
│   │   └── ...
│   ├── utils/                    # 通用工具模块
│   │   └── ...
│   ├── App.css                   # App 页面CSS样式
│   ├── App.tsx                   # App 全局页面
│   ├── App.test.tsx              # App 页面Jest测试用例
│   ├── ent.ts                    # App 环境变量配置
│   ├── index.css                 # 全局CSS样式
│   ├── index.tsx                 # React入口文件
│   ├── logo.svg                  # App logo
│   ├── Page.tsx                  # 全局页面路由
│   │
├── build/                        # 生成环境静态资源文件
├── .gitignore                    # Git ignore 配置（禁止随意篡改配置!!!）
├── .editorconfig                 # 编辑器配置（禁止随意篡改配置!!!）
├── config-overrides.js           # Webpack 默认配置覆盖操作
├── tsconfig.json                 # Typescript规则配置（禁止随意篡改规则）
├── tslint.json                   # tslint规则配置（禁止随意篡改规则）
└── package.json                  # 构建脚本和依赖配置（禁止随意篡改配置）
└── yarn.lock                     # Yarn文件

```

### 技术栈

[`React`](https://github.com/facebook/react) [`Create React App`](https://facebook.github.io/create-react-app/docs/getting-started) [`Typescript`](https://github.com/Microsoft/TypeScript) [`React Router`](https://github.com/ReactTraining/react-router) [`Redux`](https://github.com/reduxjs/redux) [`Dva`](https://github.com/dvajs/dva)
 [`Ant Design`](https://github.com/ant-design/ant-design) [`Jest`](https://github.com/facebook/jest) [`ECharts`](https://github.com/apache/incubator-echarts) [`Mock.js`](https://github.com/nuysoft/Mock) [`React Hot Loader`](https://github.com/gaearon/react-hot-loader) [`React Loadable`](https://github.com/jamiebuilds/react-loadable)
 [`Webpack`](https://github.com/webpack/webpack) [`Babel`](https://github.com/babel/babel) [`enzyme`](https://github.com/airbnb/enzyme)

### React Typescript编写规范

[react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide)

### 引入资源说明

1. 图片资源需放入`public/images/`下, 在组件和CSS中引入图片资源时, 需用[create react app 环境变量](https://facebook.github.io/create-react-app/docs/using-the-public-folder) `process.env.PUBLIC_URL` 来引入, 避免大量的图片资源在TS中import

### CSS样式说明

1. CSS样式推荐采用的方式来写，Create React App原生支持

   * 可以避免全局样式和局部样式的冲突
   * JS和CSS可以共享变量，支持局部作用域和全局作用域
   * 可以与Sass或Less灵活搭配使用

2. 编写CSS样式时需结构清晰, 避免嵌套过深, 特别是在写Sass或Less的时候, 尤其容易层级嵌套过深，层级最好不大于4级, 尽量使用`AntDesign`原生的布局组件和样式. 样式需适当的空行, 例如:

   ```CSS
    .exampleWrapper {
        background-color: #f2f2f2;

        .exampleChild1 {
            color: #666666;
        }

        .exampleChild2 {
            font-size: 16px;
        }
    }
   ```

3. 每一个组件或页面需要有独立的CSS文件, 常用页面或组件样式可以写成全局的CSS样式模块, 对于样式相对较少的组件或页面, 可以以JS对象的形式编写在组件内
4. CSS的类名和ID命名需语义清晰, 避免含糊不清的命名, 类名的英文单词和简写需符合常用英文语法习惯, 禁止自造英文单词和不那么规范的简写形式
5. 禁止在css中使用*选择器和`!important`
    * *选择器因为需要遍历页面的所有元素，所以编译的时候会非常消耗时间
    * `!important`会覆盖所以样式, 破坏CSS样式的权重关系, 导致样式难以维护

更多CSS规范请求阅读 [CSS编码规范](https://github.com/fex-team/styleguide/blob/master/css.md)

#### CSS相关学习资源

[CSS Modules 详解及 React 中实践](https://github.com/camsong/blog/issues/5)
[Sass中文文档](http://sass.bootcss.com/docs/sass-reference/)

## 🌿Git分支管理说明

```Git
git-flow 是目前流传最广的 Git 分支管理实践。git-flow 围绕的核心概念是版本发布（release)
git-flow 流程中包含 5 类分支，分别是 master、develop、新功能分支（feature）、发布分支（release）和 hotfix
```

### 相关分支说明

| 分支类型 | 命名规范 | 创建自 | 合并到 | 说明 |
| ------ | ------ | ------ | ------ | ------ |
| feature | feature/* | develop | develop | 新功能 |
| release | release/* | develop | develop 和 master | 新版本发布 |
| hotfix | hotfix/* | master 或 release | release 和 master | production 或 release 中bug修复 |

1. `master` 是部署到生产环境中的代码, 一般不允许随意合并其他分支到此分支上
2. `develop`为开发分支, 是一个进行代码集成的分支, 该分支会及时合并最新代码, 新需求的开发都从此分支上创建
3. `feature/my-awesome-feature` 为新功能分支, 开发新需求时, 需从`develop`分支创建
4. `hotfix/fix-bug` 为热修复bug分支, 主要是针对`release`或`master`分支测试出现的bug进行修复
5. `release/0.0.1`分支为部署到持续集成服务器上进行测试的分支, 是一个相对稳定的可供测试的分支

### `feature`分支创建流程

1. 从 `develop`分支创建一个新的`feature`分支, 如`feature/my-awesome-feature`
2. 在该`feature`分支上进行开发相关需求，完成后提交代码并 push 到远端仓库
3. 当代码完成之后，提`pull request`, 代码审核通过后合并到`develop`分支, 之后可删除当前`feature`分支

### `hotfix`分支创建流程

1. 从`develop`分支创建一个新的`release`分支，如 `release/0.0.1`
2. 把`release`分支部署到持续集成服务器上, 并交给相关测试人员进行测试
3. 对于测试中发现的问题，直接在`release`分支上创建`hotfix/fix-bug`分支, 进行相关的bug修复
4. 合并`hotfix/fix-bug`分支到`release`分支, 再次部署并交给测试人员进行测试

### 代码提交说明

[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

## 🔭 学习更多

想获取更多信息，可以访问[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

想学习更多React内容，可访问React官方网站 [React documentation](https://reactjs.org/).
