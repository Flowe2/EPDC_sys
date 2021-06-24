# EPCD sys
> @author: 孔华钦  
> @git addr: `git@github.com:Flowe2/EQM_sys.git`

## Usage

> 由于开发阶段使用本地数据库, clone后并不能正常使用, 除非使用相同数据库  

* FrontEnd  
  > 进入前端项目文件夹: `cd vue_app`  
  > 启动npm脚本: `npm run serve`  
  > 访问: `http://localhost:8080`

* BackEnd  
  > 进入后端项目文件夹: `cd backEnd`  
  > 启动npm脚本: `npm run start` 或 `npm run debug` 以**nodemon**启动
  > 服务端地址: `http://localhost:3000`

* 数据库(本地)
  > MongoDB
  > 服务地址: `localhost:27017`
  > 数据库名: `epdc_sys_db`
  > user: `root`
  > psw: `root`
  > 集合名: `adminlist`, `userlist`, `syslog`
  > 具体可查看本仓库根目录下 [需求分析](./需求分析.md)


## 项目描述
* **EQM sys** - Examination questions management  system  
* 帮助各科老师提升出题时的便捷性，解决试卷出题时可能遇到的试题重复的问题，协助老师降低试卷试题重复率
* 目录说明: `backEnd`为**后端系统目录**, `vue_app`为**前端系统目录**, `composedPaperTemplate.json`为**导出试卷模板**, `questionTemplates.js`为**各题型模板**, `testData.json`为**后端数据库测试数据**
 
### 技术栈
* Front End
  * Vue.js
  * Vue-Router
  * Vue-axios
  * Element-Plus
  * Echarts
  * vuedraggable
  * particles-bg-vue
* Back End
  * Node.js
  * Express
  * jsonwebtoken
  * mongodb
  * multer
  * cors

### 要求环境
Vue.js - 3.x 及以上
node.js - 14.x 及以上
MongoDB - 4.x 及以上

### 功能介绍
* 主要功能: 
  * 试题题库管理 - 上传/删除试题
  * 分类筛选及预览
  * 组卷: 设置分值, 题型顺序(支持拖动排序)
* 后台功能:
  * 维护帐号
  * 管理注册
  * 日志审计
  * 背景/接口管理等

## 使用指导
* 前端设计时遵循Element的四大原则
  * **Consistency | Feedback | Efficiency | Controllability**
* 保障易用性, 部分稍复杂的功能配备帮助, 通常为`❓`按钮, 点击即可查看帮助文档

### For Further 
* 系统计划但未实现部分:
  * 试题上传功能
    > 题目内容目前使用简单文本输入, 计划使用Markdown/Latex方便公式编辑  
  * 查重功能
    > 上传试题时, 先查重, 再由用户决定是否上传或修改后上传  
    > 组卷时, 先查重, 根据本试卷所选试题, 进行查重, 再由用户决定是否导出或修改后下载  
  * 组卷导出功能
    > 导出时更多格式选择, 本来已计划word类型, 时间没有做, 网络上已有较成熟解决方案, 可以对markdown和word等更多格式提供支持  
  * 组卷历史功能
    > 每次组卷后保存本次组卷结果, 可进行展示, 并提供二次下载功能  
  * 修改题目功能
    > 感觉鸡肋所以没做
  * 接口功能
    > 使用公私钥, 弃用提前秘密共享的方案
* 系统实现但不完善部分: 
  * 登录功能
    > 登录时后端验证, 提升安全性, 目前仅有前端验证  
  * 题库统计功能
    > 目前稍显鸡肋, 没有进行进一步细分的统计和展示, 用户热力图组件存在小bug(可能是echarts配置问题)  
  * 接口功能
    > 对于其启停功能, 仅在数据库做关键字修改, 并未对实际token进行无效化处理  
  * 后端数据库
    > 未使用索引, 当数据量积累后, 或影响系统效率  

## 技术支持
> [📪联系我](mailto:954827899@qq.com)
<!-- U2FsdGVkX18gWlsS5niNFgmMcBO9MJqS+u+pVsoXe0A9MrKCvYAmB9HjraWJypyR/mWEsCejz6W2sO4hiG2JZr7v23kLVpUj -->