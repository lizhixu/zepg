# XEpg 速查表

## 一、初始化模板

```javascript
window.onload = function() {
    XEpg.My.init({currentId: "nav1_0", pageMark: "page"});
    XEpg.area("nav1").setColumn(5).setRow(3)
        .subFocus({"class": "item item_focus"})
        .subBlur({"class": "item"})
        .run();
    XEpg.My.pageLoadShowFocus();
};
```

---

## 二、区域类 XEpg.area("id")

### 基础配置

| 方法 | 参数 | 说明 |
|------|------|------|
| setColumn(n) | 数字 | 设置列数 |
| setRow(n) | 数字 | 设置行数 |
| setStartIndex(n) | 数字 | 设置起始索引，默认0 |
| setSelectId(id) | 字符串 | 预设选中ID |
| run() | 无 | 执行配置（必须调用） |
| getColumn() | 无 | 获取列数 |
| getRow() | 无 | 获取行数 |
| getSelectId() | 无 | 获取选中ID |
| clearObj() | 无 | 清理绑定 |
| deleteObj() | 无 | 删除区域 |

### 子元素事件

| 方法 | 参数格式 | 说明 |
|------|----------|------|
| subFocus() | `{"class": "item focus"}` | 获得焦点 |
|  | `{"style": "left:10px"}` | 改变样式 |
|  | `{"func": fn}` | 执行函数 |
|  | `[{}, {}]` | 组合操作（推荐） |
| subBlur() | 同上 | 失去焦点 |
| subClick() | `{"url": "page.html"}` | 跳转URL |
|  | `{"titleUrl": ""}` | 使用title跳转 |
|  | `{"func": fn}` | 执行函数 |
| subScrollText() | `{"enTextLen": 28, "enSingleWidth": 12}` | 文字滚动 |
|  | `{"moveSpacing": 2, "timeSpacing": 150}` | 可选参数 |
| subUp() | `{"func": fn}` | 内部上键 |
| subDown() | `{"func": fn}` | 内部下键 |
| subLeft() | `{"func": fn}` | 内部左键 |
| subRight() | `{"func": fn}` | 内部右键 |

### 边界跳转

| 方法 | 参数格式 | 说明 |
|------|----------|------|
| up() | `{"area": {"id": "nav2", "indexs": [0,1,2], "isMemory": true}}` | 跳转区域 |
|  | `{"id": "nav2_0"}` | 跳转元素 |
|  | `{"func": fn}` | 执行函数 |
|  | `[{}, {}]` | 组合操作 |
| down() | 同上 | 下边界 |
| left() | 同上 | 左边界 |
| right() | 同上 | 右边界 |

---

## 三、元素类 XEpg.$("id")

### DOM操作

| 方法 | 读取 | 写入 | 说明 |
|------|------|------|------|
| html() | `.html()` | `.html("内容")` | HTML内容 |
| value() | `.value()` | `.value("值")` | 表单值 |
| style() | `.style()` | `.style("left:10px")` | 样式 |
| className() | `.className()` | `.className("item")` | 类名 |
| attr(key, val) | `.attr("title")` | `.attr("title", "值")` | 属性 |
| addHtml(val, before) | - | `.addHtml("内容", true)` | 累加HTML |
| addValue(val, before) | - | `.addValue("值", true)` | 累加值 |
| addStyle(val) | - | `.addStyle("left:10px")` | 累加样式 |
| removeStyle(val) | - | `.removeStyle("left:10px")` | 移除样式 |
| addClassName(val) | - | `.addClassName("focus")` | 累加类名 |
| removeClassName(val) | - | `.removeClassName("focus")` | 移除类名 |

### 样式属性操作

| 方法 | 读取 | 写入 | 说明 |
|------|------|------|------|
| styleAttr(key, val) | `.styleAttr("left")` | `.styleAttr("left", "10px")` | 单个样式 |
| styleAttrNumber(key, val, unit) | `.styleAttrNumber("left")` | `.styleAttrNumber("left", 10)` | 数字样式 |
| removeStyleAttr(...keys) | - | `.removeStyleAttr("left", "top")` | 移除多个 |

### 显示控制

| 方法 | 说明 |
|------|------|
| show() | 显示元素 |
| hide() | 隐藏元素 |
| isActive() | 检查是否存在且可见 |
| getObj() | 获取DOM对象 |

### 事件绑定

| 方法 | 参数格式 | 说明 |
|------|----------|------|
| up() | `{"id": "nav1_0"}` | 上键 |
| down() | `{"id": "nav1_1"}` | 下键 |
| left() | `{"id": "nav1_2"}` | 左键 |
| right() | `{"id": "nav1_3"}` | 右键 |
| click() | `{"url": "page.html"}` | 点击 |
| focus() | `{"class": "item focus"}` | 焦点 |
| blur() | `{"class": "item"}` | 失焦 |
| scrollText() | `{"enTextLen": 28, "enSingleWidth": 12}` | 滚动 |

### 手动触发

| 方法 | 说明 |
|------|------|
| onUp() | 触发上键 |
| onDown() | 触发下键 |
| onLeft() | 触发左键 |
| onRight() | 触发右键 |
| onClick() | 触发点击 |
| onFocus() | 触发焦点 |
| onBlur() | 触发失焦 |

### 清理

| 方法 | 说明 |
|------|------|
| clearObj() | 清理缓存 |
| deleteObj(locationObj) | 删除元素 |

---

## 四、配置类 XEpg.My

### 初始化

```javascript
XEpg.My.init({
    currentId: "nav1_0",        // 初始焦点ID
    currentAreaId: "nav1",      // 当前区域ID
    pageMark: "index",          // 页面标识
    isQuitSaveCooke: true,      // 保存历史
    backType: 2                 // 1=history.back, 2=栈
});
```

### 方法

| 方法 | 说明 |
|------|------|
| pageLoadShowFocus() | 显示焦点 |
| onFocusById(id) | 移动焦点 |
| gotoPage(url) | 跳转页面 |
| backPage() | 返回上一页 |
| getIdIndex(id) | 获取ID数字索引 |
| setHistory() | 设置历史 |
| getHistory() | 获取历史 |
| parseUrl(url) | 解析URL参数 |

### 属性

| 属性 | 说明 |
|------|------|
| currentId | 当前焦点ID |
| previousId | 前一个焦点ID |
| currentAreaId | 当前区域ID |
| historyId | 历史焦点ID |
| historyObj | 历史参数对象 |
| pageMark | 页面标识 |

### 可重写方法

| 方法 | 说明 |
|------|------|
| pageQuitSetHistoryUrl(obj) | 自定义历史URL |
| pageQuitSetHistoryParameter() | 自定义历史参数 |

---

## 五、导航类 XEpg.Nav

### 按键键值

| 按键 | 键值 | 按键 | 键值 |
|------|------|------|------|
| 上 | 38, 1 | 下 | 40, 2 |
| 左 | 37, 3 | 右 | 39, 4 |
| 确认 | 13 | 返回 | 8, 340, 1249 |
| 0-9 | 48-57 | 上页 | 33 |
| 下页 | 34 | 删除 | 46 |
| 红键 | 275, 1108 | 绿键 | 276, 1110 |
| 黄键 | 277, 1109, 65 | 蓝键 | 278, 1112, 262 |
| 音量+ | 259, 81 | 音量- | 260, 87 |
| 静音 | 261, 69 | 声道 | 286 |

### 可重写事件

| 方法 | 说明 | 方法 | 说明 |
|------|------|------|------|
| key_up_event() | 上键 | key_down_event() | 下键 |
| key_left_event() | 左键 | key_right_event() | 右键 |
| key_ok_event() | 确认 | key_back_event() | 返回 |
| key_pageUp_event() | 上页 | key_pageDown_event() | 下页 |
| key_del_event() | 删除 | key_number_event(n) | 数字 |
| key_red_event() | 红键 | key_green_event() | 绿键 |
| key_yellow_event() | 黄键 | key_blue_event() | 蓝键 |
| key_volUp_event() | 音量+ | key_volDown_event() | 音量- |
| key_mute_event() | 静音 | key_audioChannel_event() | 声道 |
| key_default_event(code) | 其他键 | - | - |

### 开关

| 属性 | 说明 |
|------|------|
| canPressOk | 启用确认键 |
| canPressNumber | 启用数字键 |
| canPressColor | 启用彩色键 |

### 其他方法

| 方法 | 说明 |
|------|------|
| keyBind() | 绑定按键（自动调用） |
| keyHandle(keyCode) | 处理按键 |

---

## 六、工具类 XEpg.Util

### 字符串

| 方法 | 说明 |
|------|------|
| getStrRealLen(str) | 获取真实长度（中文=2） |
| getSubStr(str, len, isSuffix) | 截取字符串 |
| numSupplyZero(initStr, numStr) | 数字补零 |
| timeFormat(seconds) | 时间格式化 hh:mm:ss |
| jsonTrim(str) | 清除换行回车 |
| trim(str) | 清除首尾空格 |

### Cookie

| 方法 | 说明 |
|------|------|
| setCookie(key, val) | 设置Cookie |
| getCookie(key) | 获取Cookie |
| delCookie(key) | 删除Cookie |

### URL

| 方法 | 说明 |
|------|------|
| getUrlParam(key, url) | 获取URL参数 |
| getUrlParameterObj(url) | 获取参数对象 |
| replaceUrlParams(url, key, val) | 替换URL参数 |
| gotoPage(url) | 页面跳转 |

### Ajax

| 方法 | 说明 |
|------|------|
| ajaxGet(url, callback) | GET请求 |
| ajaxPost(url, data, callback) | POST请求 |
| createJsonp(id, url) | 创建JSONP |
| deleteJsonp(id) | 删除JSONP |

### 数据处理

| 方法 | 说明 |
|------|------|
| isArray(obj) | 判断是否数组 |
| argumentsToArray(args) | arguments转数组 |
| getPageTotal(total, size) | 计算总页数 |
| getSliceList(arr, page, size) | 获取分页数据 |
| objectToStr(obj) | 对象转字符串 |
| parseJSON(str) | JSON解析 |
| each(obj, callback) | 遍历 |
| renderTpl(data, tpl) | 模板渲染 {{key}} |

### 导航记录

| 方法 | 说明 |
|------|------|
| addNavigationUrl(url) | 添加导航记录 |
| getLastNavigationUrl() | 获取上一个URL（不删） |
| getBackNavigationUrl() | 获取并删除上一个URL |
| gotoBackNavigationUrl() | 跳转回上一页 |

---

## 七、加密工具

### Base64

| 方法 | 说明 |
|------|------|
| base64.encode(str) | Base64编码 |
| base64.decode(str) | Base64解码 |

### MD5

| 方法 | 说明 |
|------|------|
| MD5(str) | MD5加密（大写） |

---

## 八、全局函数

| 函数 | 说明 |
|------|------|
| _$(id) | 快捷获取DOM元素 |
| window.focus() | 窗口获得焦点 |

---

## 九、HTML命名规范

| 类型 | 格式 | 示例 |
|------|------|------|
| 区域元素ID | 区域ID_数字 | nav1_0, nav1_1 |
| 文字滚动ID | 元素ID_txt | nav1_0_txt |
| 区域ID | 字母开头 | nav1, content |

---

## 十、String扩展方法

| 方法 | 说明 |
|------|------|
| trim() | 清除空格 |
| jsonTrim() | 清除\r\n |
| replaceAll(s1, s2) | 批量替换 |

---

## 十一、常见参数格式

### 事件参数格式

```javascript
// 单个操作
{"class": "item focus"}
{"style": "left:10px"}
{"func": myFunction}
{"id": "nav1_0"}
{"url": "page.html"}
{"titleUrl": ""}

// 组合操作（推荐数组）
[
    {"func": myFunction},
    {"class": "item focus"},
    {"style": "left:10px"}
]

// 区域跳转
{
    "area": {
        "id": "nav2",
        "indexs": [0, 1, 2],
        "isMemory": true
    }
}
```

### 文字滚动参数

```javascript
{
    "enTextLen": 28,          // 必填：显示英文字符数
    "enSingleWidth": 12,      // 必填：字符宽度=fontSize/2
    "moveSpacing": 2,         // 可选：移动间隔
    "timeSpacing": 150        // 可选：时间间隔ms
}
```

---

## 十二、调试技巧

### 查看状态

```javascript
console.log(XEpg.My.currentId);        // 当前焦点
console.log(XEpg.My.currentAreaId);    // 当前区域
console.log(XEpg.My.historyId);        // 历史焦点
console.log(AreaArrayObj);             // 所有区域对象
console.log(EleArrayObj);              // 所有元素对象
```

### 手动操作

```javascript
XEpg.My.onFocusById("nav1_5");         // 移动焦点
XEpg.$("nav1_0").onFocus();            // 显示焦点
XEpg.$("nav1_0").onBlur();             // 失去焦点
XEpg.Nav.keyHandle(38);                // 模拟按键
```

---

## 十三、常见问题检查清单

| 问题 | 检查项 |
|------|--------|
| 焦点不显示 | ✓ 调用run() ✓ 调用pageLoadShowFocus() ✓ CSS正确 |
| 按键无响应 | ✓ ID格式正确 ✓ 元素可见 ✓ 事件已绑定 |
| 边界跳转失败 | ✓ 目标存在 ✓ indexs长度正确 ✓ 目标可见 |
| 动态更新失效 | ✓ 调用clearObj() ✓ 重新run() |
| 文字不滚动 | ✓ ID格式_txt ✓ 文字超长 ✓ 焦点在元素上 |

---

## 十四、性能优化

| 建议 | 说明 |
|------|------|
| 批量操作DOM | 先拼接HTML再innerHTML |
| 及时清理 | 不用的对象调用deleteObj() |
| 使用区域配置 | 避免单个元素配置 |
| 缓存对象 | 重复使用的对象缓存 |
| 使用数组参数 | 兼容性更好 |

---