#  XEpg 框架详细使用说明

## 一、框架简介

XEPG 是一个专门为电视盒子/机顶盒设计的JavaScript框架，主要用于开发EPG（电子节目指南）界面。框架封装了遥控器按键处理、焦点管理、区域导航、页面跳转等常用功能，开发者可以快速开发电视应用。

### 主要特性

- 自动处理遥控器方向键导航
- 支持区域批量绑定元素
- 支持焦点和失去焦点的样式切换
- 内置文字滚动功能
- 支持页面跳转和历史记录
- 支持Cookie存储
- 提供Base64和MD5加密工具
- 兼容多种机顶盒型号

---

## 二、快速开始

### 第一步：引入库文件

在HTML文件的`<head>`或`<body>`标签中引入xepg.min.js：

```html
<script src="path/to/xepg.min.js"></script>
```

### 第二步：准备HTML结构

```html
<div id="nav1_0" class="item" title="节目1">节目1</div>
<div id="nav1_1" class="item" title="节目2">节目2</div>
<div id="nav1_2" class="item" title="节目3">节目3</div>
<div id="nav1_3" class="item" title="节目4">节目4</div>
<div id="nav1_4" class="item" title="节目5">节目5</div>
```

**重要说明**：
- 元素ID命名格式为：`区域ID_下标索引`
- 下标索引从0开始
- 所有可交互元素需要唯一的ID

### 第三步：初始化配置

```javascript
// 页面加载完成后执行
window.onload = function() {
    // 初始化页面配置
    XEpg.My.init({
        currentId: "nav1_0",      // 初始焦点的元素ID
        pageMark: "index"        // 页面标识，用于历史记录
    });
  
    // 配置区域
    XEpg.area("nav1")
        .setColumn(3)            // 一行显示3列
        .setRow(2)               // 显示2行
        .subFocus({"class": "item item_focus"})  // 获得焦点时的样式
        .subBlur({"class": "item"})              // 失去焦点时的样式
        .subClick({"url": "detail.html"})        // 点击跳转
        .run();                   // 生效（必须调用）
  
    // 显示焦点
    XEpg.My.pageLoadShowFocus();
};
```

---

## 三、核心类详解

XEpg框架包含以下主要类：

| 类名   | 命名空间  | 功能说明                       |
| ------ | --------- | ------------------------------ |
| 配置类 | XEpg.My   | 页面初始化、焦点管理、页面跳转 |
| 区域类 | XEpg.area | 区域批量管理元素，网格布局     |
| 元素类 | XEpg.$    | 单个元素操作，事件绑定         |
| 导航类 | XEpg.Nav  | 处理遥控器按键事件             |
| 工具类 | XEpg.Util | 通用工具方法                   |

---

## 四、区域类

区域类用于批量管理一个网格区域内的多个元素。

### 4.1 创建和配置区域

#### 基本语法

```javascript
XEpg.area("区域ID").setColumn(列数).setRow(行数).run();
```

#### 配置方法

| 方法                  | 参数     | 说明                        |
| --------------------- | -------- | --------------------------- |
| setColumn(number)     | 列数     | 设置区域显示的列数          |
| setRow(number)        | 行数     | 设置区域显示的行数          |
| setStartIndex(number) | 起始索引 | 设置元素的起始下标，默认为0 |
| setSelectId(string)   | 元素ID   | 预设选中的元素ID            |
| run()                 | 无       | 执行配置，必须调用才能生效  |
| getColumn()           | 无       | 获取列数                    |
| getRow()              | 无       | 获取行数                    |

#### 示例

```javascript
// 配置一个3列2行的区域，共6个元素
XEpg.area("nav1")
    .setColumn(3)
    .setRow(2)
    .setStartIndex(0)    // 从nav1_0开始
    .run();
```

对应的HTML元素：
```html
<!-- 第一行 -->
<div id="nav1_0">元素0</div>
<div id="nav1_1">元素1</div>
<div id="nav1_2">元素2</div>
<!-- 第二行 -->
<div id="nav1_3">元素3</div>
<div id="nav1_4">元素4</div>
<div id="nav1_5">元素5</div>
```

### 4.2 区域边界跳转

当焦点移动到区域边界时，可以设置跳转到其他区域或执行特定方法。

#### 方向上键跳转（up）

```javascript
XEpg.area("nav1").up(配置对象);
```

**参数格式**：

```javascript
// 格式1：跳转到指定区域
{"area": {"id": "目标区域ID", "indexs": [索引数组], "isMemory": true/false}}

// 格式2：跳转到指定元素ID
{"id": "目标元素ID"}

// 格式3：执行自定义函数
{"func": 函数引用}

// 格式4：组合操作（推荐使用数组格式）
[
    {"area": {"id": "nav2", "indexs": [0,0,0,1,1,1], "isMemory": true}},
    {"func": myFunction}
]
```

**参数详解**：

- `id`：目标区域ID
- `indexs`：一个数组，定义当前区域每个位置跳转到目标区域的哪个位置
- `isMemory`：是否记忆上次跳转到的位置，true表示记忆，false或默认不记忆
- `func`：要执行的函数

**示例**：

```javascript
// 当前区域3列2行（共6个元素），向上跳转到nav2区域
XEpg.area("nav1")
    .setColumn(3)
    .setRow(2)
    .up({
        "area": {
            "id": "nav2",
            "indexs": [0, 1, 2, 3, 4, 5],  // 可简写为 [0,0,0,1,1,1]
            "isMemory": true  // 记忆位置
        }
    })
    .run();
```

#### 方向下键跳转（down）

```javascript
XEpg.area("nav1").down(配置对象);
```

#### 方向左键跳转（left）

```javascript
XEpg.area("nav1").left(配置对象);
```

#### 方向右键跳转（right）

```javascript
XEpg.area("nav1").right(配置对象);
```

### 4.3 子元素事件绑定

#### 获得焦点事件（subFocus）

```javascript
XEpg.area("nav1").subFocus(配置对象);
```

**参数格式**：

```javascript
// 改变class
{"class": "item item_focus"}

// 改变style
{"style": "left:70px; top:10px"}

// 执行函数
{"func": myFunction}

// 组合（推荐使用数组）
[
    {"func": myFunction},
    {"class": "item item_focus"},
    {"style": "left:70px"}
]
```

#### 失去焦点事件（subBlur）

```javascript
XEpg.area("nav1").subBlur(配置对象);
```

#### 点击事件（subClick）

```javascript
XEpg.area("nav1").subClick(配置对象);
```

**参数格式**：

```javascript
// 跳转到指定URL
{"url": "detail.html"}

// 根据元素的title属性值跳转
{"titleUrl": ""}

// 执行函数
{"func": myFunction}

// 组合
[
    {"func": myFunction},
    {"url": "detail.html"}
]
```

#### 文字滚动（subScrollText）

```javascript
XEpg.area("nav1").subScrollText(配置对象);
```

**参数格式**：

```javascript
{
    "enTextLen": 28,          // 显示区域可容纳的英文字符数
    "enSingleWidth": 12,      // 单个字符宽度，等于fontSize/2
    "moveSpacing": 2,         // 移动间隔，默认为2
    "timeSpacing": 150        // 滚动时间间隔，默认150ms
}
```

**说明**：
- 中文字符算2个英文字符长度
- 当文字长度超过enTextLen时，焦点移上去会自动滚动

#### 区域内部方向键事件

可以自定义区域内部元素按方向键时的行为：

```javascript
// 上键事件
XEpg.area("nav1").subUp({"func": myFunction});

// 下键事件
XEpg.area("nav1").subDown({"func": myFunction});

// 左键事件
XEpg.area("nav1").subLeft({"func": myFunction});

// 右键事件
XEpg.area("nav1").subRight({"func": myFunction});
```

### 4.4 区域其他方法

#### 清理绑定（clearObj）

```javascript
// 清理区域内的元素绑定
XEpg.area("nav1").clearObj();
```

#### 删除区域（deleteObj）

```javascript
// 删除区域和元素
XEpg.area("nav1").deleteObj();
```

#### 动态更新区域

当需要动态更新区域内容时：

```javascript
// 1. 清理原有绑定
XEpg.area("nav1").clearObj();

// 2. 重新设置配置并运行
XEpg.area("nav1")
    .setColumn(5)
    .setRow(3)
    .run();
```

---

## 五、元素类

元素类用于操作单个DOM元素。

### 5.1 获取元素对象

```javascript
var ele = XEpg.$("元素ID");
```

### 5.2 基础操作方法

| 方法              | 参数         | 返回值               | 说明                |
| ----------------- | ------------ | -------------------- | ------------------- |
| show()            | 无           | EleClass对象         | 显示元素            |
| hide()            | 无           | EleClass对象         | 隐藏元素            |
| html(string)      | html内容或无 | EleClass对象或字符串 | 设置或获取HTML内容  |
| value(string)     | 值或无       | EleClass对象或字符串 | 设置或获取input的值 |
| style(string)     | CSS样式或无  | EleClass对象或字符串 | 设置或获取style     |
| className(string) | 类名或无     | EleClass对象或字符串 | 设置或获取className |

#### 示例

```javascript
// 获取元素
var ele = XEpg.$("myDiv");

// 显示/隐藏
ele.show();
ele.hide();

// 设置和获取HTML
ele.html("<span>新内容</span>");
var content = ele.html();

// 设置和获取值
ele.value("test");
var val = ele.value();

// 设置和获取样式
ele.style("left:100px; top:50px");
var style = ele.style();

// 设置和获取类名
ele.className("item item_selected");
var className = ele.className();
```

### 5.3 样式操作方法

#### 累加/移除样式

```javascript
// 累加style
XEpg.$("myDiv").addStyle("left:100px");

// 移除style
XEpg.$("myDiv").removeStyle("left:100px");

// 累加class
XEpg.$("myDiv").addClassName("item_selected");

// 移除class
XEpg.$("myDiv").removeClassName("item_selected");
```

#### 操作单个style属性

```javascript
// 设置style属性
XEpg.$("myDiv").styleAttr("left", "100px");

// 获取style属性
var left = XEpg.$("myDiv").styleAttr("left");

// 使用数字（自动加px）
XEpg.$("myDiv").styleAttrNumber("left", 100);
var leftNum = XEpg.$("myDiv").styleAttrNumber("left");

// 使用自定义单位
XEpg.$("myDiv").styleAttrNumber("left", 50, "%");
```

#### 移除多个style属性

```javascript
XEpg.$("myDiv").removeStyleAttr("left", "top");
```

### 5.4 属性操作

```javascript
// 设置属性
XEpg.$("myDiv").attr("title", "提示文本");

// 获取属性
var title = XEpg.$("myDiv").attr("title");
```

### 5.5 事件绑定

#### 方向键事件

```javascript
XEpg.$("myDiv")
    .up({"id": "prevId"})
    .down({"id": "nextId"})
    .left({"id": "leftId"})
    .right({"id": "rightId"});
```

#### 点击和焦点事件

```javascript
XEpg.$("myDiv")
    .click({"url": "detail.html"})
    .focus({"class": "item item_focus"})
    .blur({"class": "item"});
```

#### 文字滚动

```javascript
XEpg.$("myDiv").scrollText({
    "enTextLen": 28,
    "enSingleWidth": 12
});
```

### 5.6 检查元素状态

```javascript
// 检查元素是否存在且可见
var isActive = XEpg.$("myDiv").isActive();  // 返回true或false
```

### 5.7 手动触发事件

```javascript
// 手动触发事件
XEpg.$("myDiv").onUp();      // 触发上键事件
XEpg.$("myDiv").onDown();    // 触发下键事件
XEpg.$("myDiv").onLeft();    // 触发左键事件
XEpg.$("myDiv").onRight();   // 触发右键事件
XEpg.$("myDiv").onClick();   // 触发点击事件
XEpg.$("myDiv").onFocus();   // 触发焦点事件
XEpg.$("myDiv").onBlur();    // 触发失去焦点事件
```

### 5.8 清理和删除

```javascript
// 清理缓存（HTML内容改变后需要调用）
XEpg.$("myDiv").clearObj();

// 删除元素（从DOM中移除）
XEpg.$("myDiv").deleteObj();

// 删除元素并调整父容器位置
XEpg.$("myDiv").deleteObj({
    "direction": "left",
    "val": 20
});
```

---

## 六、个性化配置类

配置类用于管理页面的整体配置、焦点状态、页面跳转等。

### 6.1 初始化配置

```javascript
XEpg.My.init(配置对象);
```

**配置参数**：

| 参数            | 类型    | 必填 | 说明                                             |
| --------------- | ------- | ---- | ------------------------------------------------ |
| currentId       | string  | 否   | 初始焦点元素ID                                   |
| currentAreaId   | string  | 否   | 当前区域ID                                       |
| pageMark        | string  | 否   | 页面标识，用于历史记录                           |
| isQuitSaveCooke | boolean | 否   | 是否在离开页面时保存历史记录，默认true           |
| backType        | number  | 否   | 返回方式：1使用浏览器history.back()，2使用栈方式 |

**示例**：

```javascript
XEpg.My.init({
    currentId: "nav1_0",
    currentAreaId: "nav1",
    pageMark: "index",
    isQuitSaveCooke: true,
    backType: 2
});
```

### 6.2 焦点管理

#### 显示焦点

```javascript
// 页面加载时显示焦点（通常在init后调用）
XEpg.My.pageLoadShowFocus();
```

#### 移动焦点到指定元素

```javascript
XEpg.My.onFocusById("nav1_3");
```

### 6.3 页面跳转

#### 跳转到指定页面

```javascript
XEpg.My.gotoPage("detail.html");
XEpg.My.gotoPage("detail.html?id=1&name=test");
```

#### 返回上一页

```javascript
XEpg.My.backPage();
```

### 6.4 历史记录获取

#### 获取历史ID

页面加载时，如果是从其他页面跳转过来的，会自动获取之前保存的历史焦点：

```javascript
// init后会自动调用getHistory()
var historyId = XEpg.My.historyId;  // 上次离开时的焦点ID
```

#### 设置历史记录

```javascript
XEpg.My.setHistory();
```

#### 自定义历史记录参数

如果需要在跳转时传递额外参数：

```javascript
// 改写默认方法
XEpg.My.pageQuitSetHistoryUrl = function(obj) {
    var url = window.location.href.split("?")[0];
    var params = [];
    params.push("historyId=" + this.currentId);
    params.push("currentAreaId=" + this.currentAreaId);
  
    // 添加自定义参数
    if (obj) {
        for (var k in obj) {
            params.push(k + "=" + obj[k]);
        }
    }
  
    return url + "?" + params.join("&");
};

// 使用
XEpg.My.gotoPage("detail.html");
// 或者传递参数
XEpg.My.gotoPage("detail.html?id=1");
```

### 6.5 其他方法

#### 获取元素ID中的数字索引

```javascript
// nav1_5 返回 5
var index = XEpg.My.getIdIndex("nav1_5");

// 默认使用当前焦点ID
var index = XEpg.My.getIdIndex();
```

---

## 七、导航类

导航类处理遥控器按键事件，一般情况下无需手动调用，框架会自动处理。

### 7.1 支持的按键

| 按键      | 键值         | 说明         |
| --------- | ------------ | ------------ |
| 方向上    | 38, 1        | 移动焦点     |
| 方向下    | 40, 2        | 移动焦点     |
| 方向左    | 37, 3        | 移动焦点     |
| 方向右    | 39, 4        | 移动焦点     |
| 确认键    | 13           | 执行点击事件 |
| 返回键    | 8, 340, 1249 | 返回上一页   |
| 数字键0-9 | 48-57        | 数字输入     |
| 上页键    | 33           | 翻页         |
| 下页键    | 34           | 翻页         |
| 红键      | 275          | 彩色键       |
| 绿键      | 276          | 彩色键       |
| 黄键      | 277, 65      | 彩色键       |
| 蓝键      | 278          | 彩色键       |

### 7.2 重写按键事件

可以通过重写以下方法来自定义按键行为：

```javascript
// 上键
XEpg.Nav.key_up_event = function() {
    // 自定义逻辑
};

// 下键
XEpg.Nav.key_down_event = function() {
    // 自定义逻辑
};

// 左键
XEpg.Nav.key_left_event = function() {
    // 自定义逻辑
};

// 右键
XEpg.Nav.key_right_event = function() {
    // 自定义逻辑
};

// 确认键
XEpg.Nav.key_ok_event = function() {
    // 自定义逻辑
};

// 返回键
XEpg.Nav.key_back_event = function() {
    // 自定义逻辑
};

// 红键
XEpg.Nav.key_red_event = function() {
    // 跳转到直播页
};

// 绿键
XEpg.Nav.key_green_event = function() {
    // 跳转到回看页
};

// 黄键
XEpg.Nav.key_yellow_event = function() {
    // 跳转到点播页
};

// 蓝键
XEpg.Nav.key_blue_event = function() {
    // 跳转到服务页
};
```

### 7.3 启用/禁用按键

```javascript
// 启用数字键
XEpg.Nav.canPressNumber = true;

// 启用彩色键
XEpg.Nav.canPressColor = true;

// 启用确认键
XEpg.Nav.canPressOk = true;
```

---

## 八、工具类

工具类提供了各种实用的方法和工具函数。

### 8.1 字符串处理

#### 获取字符串真实长度

```javascript
// 中文算2个字符长度
var len = XEpg.Util.getStrRealLen("test测试");  // 返回8
```

#### 子字符串截取

```javascript
// 截取字符串
var str = XEpg.Util.getSubStr("test测试", 5);           // 返回 "test测"
var str = XEpg.Util.getSubStr("test测试", 5, true);     // 返回 "test..."

// 中文算2个字符长度
```

#### 数字补零

```javascript
var str = XEpg.Util.numSupplyZero("0000", "112");  // 返回 "0112"
```

### 8.2 Cookie操作

#### 设置Cookie

```javascript
XEpg.Util.setCookie("key", "value");
```

#### 获取Cookie

```javascript
var val = XEpg.Util.getCookie("key");
```

#### 删除Cookie

```javascript
XEpg.Util.delCookie("key");
```

### 8.3 URL操作

#### 获取URL参数

```javascript
// 获取单个参数
var param = XEpg.Util.getUrlParam("id", "test.html?id=1&name=test");
// 返回 "1"

// 不传url则使用当前页面URL
var param = XEpg.Util.getUrlParam("id");
```

#### 获取URL参数对象

```javascript
var obj = XEpg.Util.getUrlParameterObj("test.html?id=1&name=test");
// 返回 {id: "1", name: "test"}
```

#### 替换URL参数

```javascript
var url = XEpg.Util.replaceUrlParams("test.html?id=1", "id", "2");
// 返回 "test.html?id=2"

// 如果参数不存在，则添加
var url = XEpg.Util.replaceUrlParams("test.html", "id", "1");
// 返回 "test.html?id=1"
```

#### 页面跳转

```javascript
XEpg.Util.gotoPage("detail.html");
```

### 8.4 Ajax请求

#### GET请求

```javascript
// 异步请求
XEpg.Util.ajaxGet("api/getData", function(data) {
    console.log(data);
});

// 同步请求（不推荐，会阻塞线程）
var data = XEpg.Util.ajaxGet("api/getData");
```

#### POST请求

```javascript
// 异步请求
XEpg.Util.ajaxPost("api/saveData", '{"name":"test"}', function(data) {
    console.log(data);
});

// 同步请求
var data = XEpg.Util.ajaxPost("api/saveData", '{"name":"test"}');
```

### 8.5 JSONP请求

#### 创建JSONP请求

```javascript
XEpg.Util.createJsonp("jsonpId", "http://example.com/api?callback=myCallback");
```

#### 删除JSONP

```javascript
XEpg.Util.deleteJsonp("jsonpId");
```

### 8.6 数据处理

#### 分页计算

```javascript
// 计算总页数
var totalPage = XEpg.Util.getPageTotal(112, 10);  // 返回 12

// 获取当前页数据
var currentPageData = XEpg.Util.getSliceList(dataArray, 2, 10);  // 获取第2页，每页10条
```

#### JSON对象转字符串

```javascript
var str = XEpg.Util.objectToStr({id: "1", name: "test"});
// 返回 "{'id':'1','name':'test'}"
```

#### 数组判断

```javascript
var isArr = XEpg.Util.isArray([1,2,3]);  // 返回 true
```

### 8.7 时间格式化

```javascript
var timeStr = XEpg.Util.timeFormat(5700);
// 返回 "01:35:00"
```

### 8.8 导航记录

#### 导航压栈

```javascript
XEpg.Util.addNavigationUrl("page1.html");
XEpg.Util.addNavigationUrl("page2.html");
```

#### 获取上一个导航地址（不删除）

```javascript
var url = XEpg.Util.getLastNavigationUrl();
```

#### 获取并弹出上一个导航地址（删除）

```javascript
var url = XEpg.Util.getBackNavigationUrl();
```

#### 跳转回上一个页面

```javascript
XEpg.Util.gotoBackNavigationUrl();
```

### 8.9 数组和对象遍历

```javascript
XEpg.Util.each([1,2,3], function(index, item) {
    console.log(index, item);
});

XEpg.Util.each({a:1, b:2}, function(key, value) {
    console.log(key, value);
});
```

### 8.10 模板渲染

```javascript
// 渲染单个对象
var tpl = '<div class="name">{{name}}</div><div class="age">{{age}}</div>';
var html = XEpg.Util.renderTpl({name: "张三", age: 25}, tpl);

// 渲染数组
var list = [
    {name: "张三", age: 25},
    {name: "李四", age: 30}
];
var tpl = '<div>{{name}} - {{age}}</div>';
var html = XEpg.Util.renderTpl(list, tpl);
// 返回 "<div>张三 - 25</div><div>李四 - 30</div>"
```

### 8.11 JSON解析

```javascript
var obj = XEpg.Util.parseJSON('{"id":1,"name":"test"}');
```

---

## 九、附加工具

### 9.1 Base64编码解码

```javascript
// 编码
var encoded = base64.encode("hello world");

// 解码
var decoded = base64.decode("aGVsbG8gd29ybGQ=");
```

### 9.2 MD5加密

```javascript
var hash = MD5("hello");
```

---

## 十、完整示例

### 示例1：简单的列表页

```html
<!DOCTYPE html>
<html>
<head>
    <title>示例列表页</title>
    <style>
        .item {
            width: 200px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            margin: 10px;
            background: #333;
            color: #fff;
            float: left;
        }
        .item_focus {
            background: #f60;
            border: 2px solid #fff;
        }
        .item_select {
            background: #06f;
        }
    </style>
</head>
<body>
    <div>
        <!-- 第一行 -->
        <div id="nav1_0" class="item" title="detail.html?id=0">节目0</div>
        <div id="nav1_1" class="item" title="detail.html?id=1">节目1</div>
        <div id="nav1_2" class="item" title="detail.html?id=2">节目2</div>
        <!-- 第二行 -->
        <div id="nav1_3" class="item" title="detail.html?id=3">节目3</div>
        <div id="nav1_4" class="item" title="detail.html?id=4">节目4</div>
        <div id="nav1_5" class="item" title="detail.html?id=5">节目5</div>
    </div>

    <script src="xepg.min.js"></script>
    <script>
        window.onload = function() {
            // 初始化页面
            XEpg.My.init({
                currentId: "nav1_0",
                pageMark: "list"
            });
          
            // 配置区域
            XEpg.area("nav1")
                .setColumn(3)
                .setRow(2)
                .subFocus({"class": "item item_focus"})
                .subBlur({"class": "item"})
                .subClick({"titleUrl": ""})  // 使用title属性值跳转
                .up({"id": "header_0"})       // 向上跳转到header
                .down(null)                   // 向下不动
                .left(null)                   // 向左不动
                .right(null)                  // 向右不动
                .run();
          
            // 显示焦点
            XEpg.My.pageLoadShowFocus();
        };
    </script>
</body>
</html>
```

### 示例2：多区域导航

```html
<!DOCTYPE html>
<html>
<head>
    <title>多区域示例</title>
    <style>
        .item {
            width: 150px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            margin: 5px;
            background: #333;
            color: #fff;
            float: left;
        }
        .item_focus {
            background: #f60;
        }
    </style>
</head>
<body>
    <!-- 上部导航栏 -->
    <div>
        <div id="header_0" class="item">首页</div>
        <div id="header_1" class="item">分类</div>
        <div id="header_2" class="item">搜索</div>
    </div>
  
    <!-- 主内容区 -->
    <div>
        <div id="content_0" class="item" title="detail.html?id=0">节目0</div>
        <div id="content_1" class="item" title="detail.html?id=1">节目1</div>
        <div id="content_2" class="item" title="detail.html?id=2">节目2</div>
        <div id="content_3" class="item" title="detail.html?id=3">节目3</div>
        <div id="content_4" class="item" title="detail.html?id=4">节目4</div>
        <div id="content_5" class="item" title="detail.html?id=5">节目5</div>
    </div>

    <script src="xepg.min.js"></script>
    <script>
        window.onload = function() {
            XEpg.My.init({
                currentId: "header_0",
                pageMark: "home"
            });
          
            // 配置header区域
            XEpg.area("header")
                .setColumn(3)
                .setRow(1)
                .subFocus({"class": "item item_focus"})
                .subBlur({"class": "item"})
                .up(null)  // 顶部不动
                .down({
                    // 向下跳转到content区域的对应位置
                    "area": {
                        "id": "content",
                        "indexs": [0, 1, 2],
                        "isMemory": true
                    }
                })
                .run();
          
            // 配置content区域
            XEpg.area("content")
                .setColumn(3)
                .setRow(2)
                .subFocus({"class": "item item_focus"})
                .subBlur({"class": "item"})
                .subClick({"titleUrl": ""})
                .up({
                    "area": {
                        "id": "header",
                        "indexs": [0, 0, 0, 1, 1, 1],
                        "isMemory": true
                    }
                })
                .run();
          
            XEpg.My.pageLoadShowFocus();
        };
    </script>
</body>
</html>
```

### 示例3：带文字滚动的列表

```html
<!DOCTYPE html>
<html>
<head>
    <title>文字滚动示例</title>
    <style>
        .item {
            width: 300px;
            height: 50px;
            line-height: 50px;
            padding: 10px;
            margin: 5px;
            background: #333;
            color: #fff;
            overflow: hidden;
            position: relative;
        }
        .item_focus {
            background: #f60;
        }
        .item_text {
            position: absolute;
            left: 0;
            white-space: nowrap;
        }
    </style>
</head>
<body>
    <div id="nav1_0" class="item">
        <span id="nav1_0_txt" class="item_text">这是一段很长的文字，焦点移上来会滚动</span>
    </div>
    <div id="nav1_1" class="item">
        <span id="nav1_1_txt" class="item_text">节目二的标题</span>
    </div>
    <div id="nav1_2" class="item">
        <span id="nav1_2_txt" class="item_text">节目三的标题也是非常长的</span>
    </div>

    <script src="xepg.min.js"></script>
    <script>
        window.onload = function() {
            XEpg.My.init({
                currentId: "nav1_0"
            });
          
            XEpg.area("nav1")
                .setColumn(1)
                .setRow(3)
                .subFocus({"class": "item item_focus"})
                .subBlur({"class": "item"})
                .subScrollText({
                    "enTextLen": 28,
                    "enSingleWidth": 12
                })
                .run();
          
            XEpg.My.pageLoadShowFocus();
        };
    </script>
</body>
</html>
```

### 示例4：带省略号的文字滚动

使用`$$`分隔符，默认显示省略号版本，焦点移上显示完整版本并滚动：

```html
<div id="nav1_0" class="item" title="这是一段很长的文字...$$这是一段很长的文字，焦点移上来会滚动显示完整内容">
    <span id="nav1_0_txt" class="item_text">这是一段很长的文字...</span>
</div>
```

### 示例5：动态加载数据

```javascript
window.onload = function() {
    XEpg.My.init({
        currentId: "nav1_0",
        pageMark: "list"
    });
  
    // 初始配置
    XEpg.area("nav1")
        .setColumn(5)
        .setRow(3)
        .subFocus({"class": "item item_focus"})
        .subBlur({"class": "item"})
        .run();
  
    XEpg.My.pageLoadShowFocus();
};

// 加载更多数据
function loadMoreData(startIndex) {
    // 清理旧的绑定
    XEpg.area("nav1").clearObj();
  
    // 更新HTML内容
    var html = "";
    for (var i = 0; i < 15; i++) {
        var index = startIndex + i;
        html += '<div id="nav1_' + index + '" class="item" title="detail.html?id=' + index + '">节目' + index + '</div>';
    }
    document.getElementById("contentDiv").innerHTML = html;
  
    // 重新绑定
    XEpg.area("nav1")
        .setStartIndex(startIndex)
        .run();
  
    // 焦点移到第一个
    XEpg.My.onFocusById("nav1_" + startIndex);
}
```

### 示例6：自定义红色键

```javascript
// 重写红色键事件
XEpg.Nav.key_red_event = function() {
    // 判断当前页面
    var currentPath = window.location.href;
    if (currentPath.indexOf("live.html") == -1) {
        // 不在直播页，跳转到直播
        currentPath = currentPath.split("page")[0];
        window.location.href = currentPath + "page/live.html?returnUrl=index.html";
    }
};
```

---

## 十一、常见问题解决

### 1. 焦点不显示

**问题**：设置好区域后，焦点不显示

**解决**：
- 确保调用了`run()`方法
- 确保调用了`XEpg.My.pageLoadShowFocus()`
- 检查元素ID格式是否正确（区域ID_数字）
- 确保CSS中focus样式正确

```javascript
XEpg.area("nav1")
    .setColumn(3)
    .setRow(2)
    .run();  // 必须调用

XEpg.My.pageLoadShowFocus();  // 必须调用
```

### 2. 边界跳转不生效

**问题**：按方向键到边界时不能跳转

**解决**：

- 检查目标元素是否存在
- 检查目标元素是否可见（display不为none）
- 检查indexs数组长度是否正确

### 3. 历史记录丢失

**问题**：从详情页返回后焦点位置不对

**解决**：
- 确保`pageMark`设置正确
- 确保`isQuitSaveCooke`为true
- 某些机顶盒可能不支持cookie，可尝试使用`backType: 2`

```javascript
XEpg.My.init({
    currentId: "nav1_0",
    pageMark: "list",          // 页面标识
    isQuitSaveCooke: true,     // 保存历史
    backType: 2                // 使用栈方式
});
```

### 4. 动态更新内容后焦点无法移动

**问题**：动态更新HTML内容后，按方向键没反应

**解决**：
更新HTML内容后需要调用`clearObj()`清理缓存

```javascript
// 1. 更新HTML
document.getElementById("container").innerHTML = newHtml;

// 2. 清理旧绑定
XEpg.area("nav1").clearObj();

// 3. 重新绑定
XEpg.area("nav1").setColumn(5).setRow(3).run();
```

### 5. 文字不滚动

**问题**：设置了scrollText但文字不滚动

**解决**：
- 检查元素ID格式是否为`区域ID_数字_txt`
- 文字长度必须超过`enTextLen`
- 确保焦点在该元素上

### 6. 低端机顶盒兼容问题

**问题**：某些操作在低端机顶盒不生效

**解决**：
- 推荐使用数组格式传递参数
- 避免使用过于复杂的逻辑

```javascript
// 推荐写法
XEpg.area("nav1").subClick([
    {"func": myFunction},
    {"url": "detail.html"}
]);

// 不推荐写法
XEpg.area("nav1").subClick({
    "func": myFunction,
    "url": "detail.html"
});
```

### 7. 跳转后页面不刷新

**问题**：跳转到同一个页面但参数不同时，页面不刷新

**解决**：
- 可以在URL后添加时间戳
- 或者手动刷新页面

```javascript
// 添加时间戳
var url = "detail.html?id=" + id + "&t=" + new Date().getTime();
XEpg.My.gotoPage(url);
```

### 8. 内存泄漏

**问题**：长时间运行后页面变慢

**解决**：
- 页面销毁时调用`deleteObj()`
- 清理不使用的事件监听

```javascript
window.onunload = function() {
    XEpg.area("nav1").deleteObj();
};
```

### 9. 按键不响应

**问题**：按遥控器键没反应

**解决**：
- 检查键盘绑定是否正确
- 某些按键可能被禁用

```javascript
// 启用确认键
XEpg.Nav.canPressOk = true;

// 启用彩色键
XEpg.Nav.canPressColor = true;
```

### 10. 页面加载顺序问题

**问题**：页面初始化完成后焦点不正确

**解决**：
确保在`window.onload`中执行初始化

```javascript
window.onload = function() {
    XEpg.My.init({...});
    XEpg.area("nav1")...run();
    XEpg.My.pageLoadShowFocus();
};
```

---

**总结**：

XEPG框架为电视应用开发提供了完整的解决方案，开发者只需要按照规范编写HTML和配置代码，框架会自动处理复杂的焦点管理和导航逻辑。使用时注意：

1. 元素ID必须遵循`区域ID_数字`的格式
2. 区域配置后必须调用`run()`方法
3. 页面初始化后调用`pageLoadShowFocus()`
4. 动态更新内容后调用`clearObj()`
5. 使用数组格式传递参数保证兼容性
