## post到后端的数据
router.post()方法中
1. 处理时 `let data = JSON.stringify(req.body);` 可简单转为string
   > 此时数据格式如下: `{"name":"David","age":"21"}`
   > 不可直接用 `data.name` 之类的操作
   > 但符合mongodb数据要求

2. 再使用 `data = JSON.parse(data)` 可转化为JSON
   > 此时数据格式如下: `{ name: 'David', age: '21' }`
   > 能进行 `data.name` 之类的操作
   > 符合Vue的数据格式, 不过返回前端后还是会变成上面那样